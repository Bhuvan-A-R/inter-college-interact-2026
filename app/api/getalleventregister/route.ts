import { getAllEventsByUser } from "@/app/prismaClient/queryFunction";
import { verifySession } from "@/lib/session";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET() {
    // do i need to decrypt the cookie?
    const session = await verifySession();
    if (!session) {
        redirect("/auth/signin");
    }
    const userId: string = session.id as string;
    try {
        const userEvents = await getAllEventsByUser(userId);
        return NextResponse.json({ success: true, userEvents });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ success: false, message: err });
    }
}
