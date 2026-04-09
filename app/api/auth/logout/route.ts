import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/authCookie";
import { deleteSession } from "@/lib/session";

export async function POST() {
  await clearAuthCookie();
  await deleteSession();
  return NextResponse.json({
    success: true,
    data: { message: "Logged out successfully." },
  });
}
