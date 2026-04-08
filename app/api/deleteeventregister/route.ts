import prisma from "@/lib/db";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request : Request){
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    // verify the jwt
    if (!session) {
        return NextResponse.json(
            { success: false, message: "unauthorized" },
            { status: 401 }
        );
    }

    const {eventId} = await request.json();

    if(!eventId){
        return NextResponse.json(
            {success: false, message: "No event selected"},
            {status: 400}
        );
    }  

    try{
        const result = await prisma.events.deleteMany({
            where: {
                id: String(eventId),
                userId: session.id as string,
            },
        });
        if (result.count === 0) {
            return NextResponse.json(
                { success: false, message: "Event not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, message: "Event Deleted" },
            { status: 200 }
        );
    }
    catch(err){
        return NextResponse.json(
            { success: false, message: (err as Error).message ?? "Delete failed" },
            { status: 400 }
        );
    }
}