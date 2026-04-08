import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await deleteSession();
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
    return NextResponse.json({ success: true });
}
