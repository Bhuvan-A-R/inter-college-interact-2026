import { NextRequest, NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/schemas/newAuth";
import prisma from "@/lib/db";
import { randomBytes, createHash } from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

const TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

// Always return the same response regardless of whether the email exists
const SAFE_RESPONSE = NextResponse.json({
  success: true,
  data: { message: "Reset link sent if email exists." },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = forgotPasswordSchema.safeParse(body);
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

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    // Return same response whether or not email exists (prevents enumeration)
    if (!user) return SAFE_RESPONSE;

    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MS);

    // Invalidate any existing tokens for this email
    await prisma.passwordResetToken.deleteMany({ where: { email } });

    await prisma.passwordResetToken.create({
      data: {
        id: randomBytes(16).toString("hex"),
        email,
        tokenHash,
        expiresAt,
      },
    });

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "https://vtufestinteract.com";
    const resetUrl = `${appUrl}/reset-password?token=${rawToken}`;

    await sendPasswordResetEmail(email, resetUrl);

    return SAFE_RESPONSE;
  } catch (error) {
    console.error("[auth/forgot-password]", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error." } },
      { status: 500 }
    );
  }
}
