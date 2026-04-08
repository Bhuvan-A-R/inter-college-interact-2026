import { NextRequest, NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/schemas/newAuth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { createHash } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = resetPasswordSchema.safeParse(body);
    if (!input.success) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Invalid input", issues: input.error.issues },
        },
        { status: 400 }
      );
    }

    const { token, newPassword } = input.data;

    const tokenHash = createHash("sha256").update(token).digest("hex");

    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    const isInvalid =
      !record || record.usedAt !== null || record.expiresAt < new Date();

    if (isInvalid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "This reset link is invalid or has expired. Please request a new one.",
          },
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email: record.email },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { tokenHash },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        message: "Password reset successfully. You can now log in.",
      },
    });
  } catch (error) {
    console.error("[auth/reset-password]", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error." } },
      { status: 500 }
    );
  }
}
