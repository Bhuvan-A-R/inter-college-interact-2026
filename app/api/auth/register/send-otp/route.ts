import { NextRequest, NextResponse } from "next/server";
import { sendOtpSchema } from "@/lib/schemas/newAuth";
import prisma from "@/lib/db";
import { sendOtpEmail } from "@/lib/email";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const OTP_EXPIRY_MS =
  parseInt(process.env.OTP_EXPIRY_MINUTES ?? "10") * 60 * 1000;
const RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds
const MAX_RESENDS = 3;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = sendOtpSchema.safeParse(body);
    if (!input.success) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Invalid input", issues: input.error.issues },
        },
        { status: 400 }
      );
    }

    const { email } = input.data;

    // Reject if already fully registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: { message: "Email is already registered." } },
        { status: 409 }
      );
    }

    // Check existing pending record for cooldown / max resend
    const existing = await prisma.pendingRegistration.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.lastResendAt) {
        const elapsed = Date.now() - existing.lastResendAt.getTime();
        if (elapsed < RESEND_COOLDOWN_MS) {
          const waitSec = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000);
          return NextResponse.json(
            {
              success: false,
              error: {
                message: `Please wait ${waitSec} seconds before requesting another OTP.`,
              },
            },
            { status: 429 }
          );
        }
      }
      if (existing.resendCount >= MAX_RESENDS) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message:
                "Maximum OTP requests reached. Please try again after some time.",
            },
          },
          { status: 429 }
        );
      }
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MS);
    const now = new Date();

    await prisma.pendingRegistration.upsert({
      where: { email },
      create: {
        email,
        otpCode: otp,
        otpExpiresAt,
        otpVerifiedAt: null,
        lastResendAt: now,
        resendCount: 0,
        attemptCount: 0,
      },
      update: {
        otpCode: otp,
        otpExpiresAt,
        otpVerifiedAt: null,
        lastResendAt: now,
        resendCount: { increment: 1 },
        attemptCount: 0,
      },
    });

    await sendOtpEmail(email, otp);

    return NextResponse.json({
      success: true,
      data: { message: "OTP sent to your email." },
    });
  } catch (error) {
    console.error("[auth/register/send-otp]", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error." } },
      { status: 500 }
    );
  }
}
