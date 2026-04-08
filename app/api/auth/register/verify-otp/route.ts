import { NextRequest, NextResponse } from "next/server";
import { verifyOtpSchema } from "@/lib/schemas/newAuth";
import prisma from "@/lib/db";

const MAX_ATTEMPTS = parseInt(process.env.OTP_MAX_ATTEMPTS ?? "5");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = verifyOtpSchema.safeParse(body);
    if (!input.success) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Invalid input", issues: input.error.issues },
        },
        { status: 400 }
      );
    }

    const { email, otp } = input.data;

    const pending = await prisma.pendingRegistration.findUnique({
      where: { email },
    });

    if (!pending) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "No OTP request found for this email. Please request a new OTP.",
          },
        },
        { status: 400 }
      );
    }

    if (pending.otpVerifiedAt) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "Email already verified. Please proceed to complete registration.",
          },
        },
        { status: 400 }
      );
    }

    if (pending.otpExpiresAt < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "OTP has expired. Please request a new one." },
        },
        { status: 400 }
      );
    }

    if (pending.attemptCount >= MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "Too many failed attempts. Please request a new OTP.",
          },
        },
        { status: 429 }
      );
    }

    if (pending.otpCode !== otp) {
      await prisma.pendingRegistration.update({
        where: { email },
        data: { attemptCount: { increment: 1 } },
      });
      return NextResponse.json(
        {
          success: false,
          error: { message: "Invalid OTP. Please try again." },
        },
        { status: 400 }
      );
    }

    // Mark as verified
    await prisma.pendingRegistration.update({
      where: { email },
      data: { otpVerifiedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      data: { message: "Email verified successfully. Please complete your registration." },
    });
  } catch (error) {
    console.error("[auth/register/verify-otp]", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error." } },
      { status: 500 }
    );
  }
}
