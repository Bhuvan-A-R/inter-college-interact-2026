import { getCollegeRegion } from "@/app/prismaClient/queryFunction";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    // verify the jwt
    if (!session) {
        return NextResponse.json(
            { success: false, message: "unauthorized" },
            { status: 401 }
        );
    }
    const userId: string = session.id as string;

    try {
        const region = await getCollegeRegion(userId);
        return NextResponse.json(
            { success: true, region },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err },
            { status: 500 }
        );
    }
}