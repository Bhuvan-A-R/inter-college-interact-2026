import {
    getRegistrant,
    updateRegistrant,
} from "@/app/prismaClient/queryFunction";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { usn, eventId } = await request.json();

    if (!usn) {
        return NextResponse.json(
            { success: false, message: "usn is missing" },
            { status: 400 }
        );
    }

    const registrant = await getRegistrant(usn as string);

    if (!registrant) {
        return NextResponse.json(
            { success: false, error: "registrant not found" },
            { status: 404 }
        );
    }

    const eventFilter = registrant.eventRegistrations.find(
        (x) => x.eventId === eventId
    );

    if (!eventFilter) {
        return NextResponse.json(
            { success: false, message: "no event found" },
            { status: 404 }
        );
    }

    try {
        const res = await updateRegistrant(
            usn as string,
            eventFilter.id as string
        );

        return NextResponse.json(
            { success: true, message: `marked attendence ${res}` },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
