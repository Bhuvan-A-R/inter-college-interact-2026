import { verifySession } from "@/lib/session";
import { getAuthSession } from "@/lib/authCookie";
import { NextResponse } from "next/server";

export async function GET() {
    const legacyToken = await verifySession();
    const newToken = await getAuthSession();
    const session = newToken || legacyToken;

    if (!session?.id) {
        return NextResponse.json({
            success: false,
            message: "Not authenticated",
            role: null,
        });
    }
    return NextResponse.json({
        success: true,
        message: "Authenticated",
        role: session.role ?? null,
    });
}
