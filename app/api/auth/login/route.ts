import { NextRequest, NextResponse } from "next/server";
import { newLoginSchema } from "@/lib/schemas/newAuth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { setAuthCookie } from "@/lib/authCookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = newLoginSchema.safeParse(body);
    if (!input.success) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Invalid input", issues: input.error.issues },
        },
        { status: 400 }
      );
    }

    const { email, password } = input.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        photoUrl: true,
        role: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Email isn't registered. Please create an account first.",
            code: "EMAIL_NOT_FOUND",
          },
        },
        { status: 404 }
      );
    }

    const passwordToCompare = user.password ?? "$2b$12$invalidhashpadding000000000000000000000000000000000000";
    const passwordMatch = await bcrypt.compare(password, passwordToCompare);

    if (!user.password || !passwordMatch) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid email or password." } },
        { status: 401 }
      );
    }

    await setAuthCookie({ id: user.id, email: user.email, role: user.role });

    return NextResponse.json({
      success: true,
      data: {
        message: "Login successful.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          photoUrl: user.photoUrl,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("[auth/login]", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error." } },
      { status: 500 }
    );
  }
}
