import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/authCookie";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: "Not authenticated." } },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        collegeName: true,
        collegeIdNumber: true,
        photoUrl: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: "User not found." } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { user } });
  } catch (error) {
    console.error("[auth/me]", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error." } },
      { status: 500 }
    );
  }
}
