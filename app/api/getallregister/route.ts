import { getRegistrantsByCollege } from "@/app/prismaClient/queryFunction";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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
    // get all the registerants with the userId of the signup

    // return the result
    try {
        const registrant = await getRegistrantsByCollege(userId);
        return NextResponse.json(
            { success: true, registrant },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err },
            { status: 500 }
        );
    }

    // use effect on the post must be made so that we can fetch the jwt
}
