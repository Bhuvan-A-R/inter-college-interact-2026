import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/authCookie";

export async function POST() {
  await clearAuthCookie();
  return NextResponse.json({
    success: true,
    data: { message: "Logged out successfully." },
  });
}
