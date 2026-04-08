import { registerUserEvents } from "@/app/prismaClient/queryFunction";
// import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { EventSchema } from "@/lib/schemas/register";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export interface EventCreate {
    eventNo: number;
    eventName: string;
    maxParticipant: number;
    category: string;
    amount: number;
    teamCount?: number;
}

export async function POST(request: Request) {
    const session = await verifySession();
    if (!session) {
        redirect("/auth/signin");
    }
    const { events } = await request.json();

    if (!events || (Array.isArray(events) && events.length === 0)) {
        return NextResponse.json(
            { success: false, message: "No events selected" },
            { status: 400 }
        );
    }

    const eventList = Array.isArray(events)
        ? events
        : JSON.parse(events).events;

    if (!eventList || eventList.length === 0) {
        return NextResponse.json(
            { success: false, message: "No events selected" },
            { status: 400 }
        );
    }

    const result = EventSchema.safeParse(eventList);

    if (!result.success) {
        return NextResponse.json(
            { success: false, message: result.error.message },
            { status: 400 }
        );
    }

    const userId: string = session.id as string;
    try {
        const normalizedEvents = result.data.map((event) => ({
            ...event,
            teamCount: event.teamCount ?? 1,
        }));
        await registerUserEvents(userId, normalizedEvents);
        return NextResponse.json(
            { success: true, message: "events are registered " },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err },
            { status: 400 }
        );
    }
}
