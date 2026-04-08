import { NextRequest, NextResponse } from "next/server";
import { registerCompleteSchema } from "@/lib/schemas/newAuth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { setAuthCookie } from "@/lib/authCookie";
import { randomUUID } from "crypto";

const COMPLETION_WINDOW_MS =
  parseInt(process.env.REGISTRATION_COMPLETION_WINDOW_MINUTES ?? "30") *
  60 *
  1000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = registerCompleteSchema.safeParse(body);
    if (!input.success) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Invalid input", issues: input.error.issues },
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      collegeName,
      collegeIdNumber,
      aadhaarNumber,
      password,
      photoUrl,
    } = input.data;

    // Verify OTP step was completed
    const pending = await prisma.pendingRegistration.findUnique({
      where: { email },
    });

    if (!pending || !pending.otpVerifiedAt) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "Email not verified. Please complete OTP verification first.",
          },
        },
        { status: 403 }
      );
    }

    // Enforce completion window
    const elapsed = Date.now() - pending.otpVerifiedAt.getTime();
    if (elapsed > COMPLETION_WINDOW_MS) {
      await prisma.pendingRegistration.delete({ where: { email } });
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "Registration session expired. Please start the process again.",
          },
        },
        { status: 403 }
      );
    }

    // Check for duplicate fields in parallel
    const [dupEmail, dupPhone, dupAadhaar] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { phone } }),
      prisma.user.findUnique({ where: { aadharNumber: aadhaarNumber } }),
    ]);

    if (dupEmail) {
      return NextResponse.json(
        { success: false, error: { message: "Email already registered." } },
        { status: 409 }
      );
    }
    if (dupPhone) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Phone number already registered." },
        },
        { status: 409 }
      );
    }
    if (dupAadhaar) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Aadhaar number already registered." },
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        phone,
        collegeName,
        collegeIdNumber,
        aadharNumber: aadhaarNumber,
        password: hashedPassword,
        photoUrl,
        emailVerified: true,
        role: "PARTICIPANT",
      },
    });

    // Delete the pending record — registration is complete
    await prisma.pendingRegistration.delete({ where: { email } });

    // Auto-login: issue auth_token cookie
    await setAuthCookie({ id: user.id, email: user.email, role: user.role });

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            collegeName: user.collegeName,
            photoUrl: user.photoUrl,
            role: user.role,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[auth/register/complete]", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error." } },
      { status: 500 }
    );
  }
}
