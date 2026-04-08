import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";

interface RegisterEvent {
    eventNo: number;
    eventName: string;
    category: string;
    maxParticipant: number;
    amount: number;
}

interface ReplaceRegistrationsRequest {
    userId: string;
    events: RegisterEvent[];
}

export async function PUT(request: Request) {
    const session = await verifySession();
    if (!session) {
        return NextResponse.redirect("/auth/signin");
    }
    const body: ReplaceRegistrationsRequest = await request.json();
    const { events } = body;
    const userId = session.id as string;
    const user = await prisma.users.findUnique({
        where: { id: userId },
        select: { deptCode: true },
    });

    if (!userId || !Array.isArray(events)) {
        return NextResponse.json(
            { message: "Invalid request data." },
            { status: 400 }
        );
    }

    try {
        await prisma.$transaction(async (tx) => {
            // Get existing events
            const existingEvents = await tx.events.findMany({
                where: { userId },
                select: { eventNo: true },
            });
            const existingEventNos = new Set(
                existingEvents.map((e) => e.eventNo)
            );
            const newEventNos = new Set(events.map((e) => e.eventNo));

            // Find events to delete (exist in DB but not in new list)
            const eventNosToDelete = [...existingEventNos].filter(
                (x) => !newEventNos.has(x)
            );
            if (eventNosToDelete.length > 0) {
                await tx.events.deleteMany({
                    where: {
                        userId,
                        eventNo: { in: eventNosToDelete },
                    },
                });
            }

            // Find events to add (exist in new list but not in DB)
            const eventsToAdd = events.filter(
                (e) => !existingEventNos.has(e.eventNo)
            );
            if (eventsToAdd.length > 0) {
                await tx.events.createMany({
                    data: eventsToAdd.map((evt) => ({
                        userId,
                        eventNo: evt.eventNo,
                        eventName: evt.eventName,
                        category: evt.category,
                        maxParticipant: evt.maxParticipant,
                        amount: evt.amount,
                        registeredParticipant: 0,
                        teamNumber: 1,
                        deptCode: user?.deptCode ?? null,
                    })),
                    skipDuplicates: true,
                });
            }
        });

        return NextResponse.json({
            message: "Events registered successfully.",
        });
    } catch (error) {
        console.error("Error replacing registrations:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}
