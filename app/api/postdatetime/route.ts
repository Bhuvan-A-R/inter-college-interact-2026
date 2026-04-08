import { saveDateTimeOfArrival } from "@/app/prismaClient/queryFunction";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session) {
        return NextResponse.json(
            { success: false, message: "unauthorized" },
            { status: 401 }
        );
    }

    const userId = session.id as string;
    const { dateOfArrival, timeOfArrival } = await request.json();

    if (!dateOfArrival) {
        return NextResponse.json(
            { success: false, message: "date is missing" },
            { status: 400 }
        );
    }

    try {
        await saveDateTimeOfArrival(userId, dateOfArrival, timeOfArrival || "");
        return NextResponse.json(
            { success: true, message: "saved successfully" },
            { status: 200 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        return NextResponse.json(
            { success: false, message },
            { status: 400 }
        );
    }
}
