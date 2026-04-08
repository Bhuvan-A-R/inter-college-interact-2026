import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { Prisma } from "@prisma/client";

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

    if (!userId || !Array.isArray(events)) {
        return NextResponse.json(
            { message: "Invalid request data." },
            { status: 400 }
        );
    }

    try {
        await prisma.$transaction(async (tx) => {
            // Ensure events exist in DB and collect their ids
            const eventIds: string[] = [];
            for (const evt of events) {
                let event = await tx.event.findFirst({
                    where: { name: evt.eventName, category: evt.category },
                });
                if (!event) {
                    event = await tx.event.create({
                        data: {
                            name: evt.eventName,
                            category: evt.category,
                            type: evt.maxParticipant > 1 ? "TEAM" : "SOLO",
                            price: new Prisma.Decimal(evt.amount ?? 0),
                            minTeamSize: evt.maxParticipant > 1 ? 2 : 1,
                            maxTeamSize: evt.maxParticipant ?? 1,
                            isActive: true,
                        },
                    });
                }
                eventIds.push(event.id);
            }

            const existingRegistrations = await tx.registration.findMany({
                where: { userId },
                select: { eventId: true },
            });
            const existingEventIds = new Set(
                existingRegistrations.map((e) => e.eventId)
            );
            const newEventIds = new Set(eventIds);

            const eventIdsToDelete = [...existingEventIds].filter(
                (x) => !newEventIds.has(x)
            );
            if (eventIdsToDelete.length > 0) {
                await tx.registration.deleteMany({
                    where: {
                        userId,
                        eventId: { in: eventIdsToDelete },
                    },
                });
            }

            const eventIdsToAdd = eventIds.filter(
                (id) => !existingEventIds.has(id)
            );
            if (eventIdsToAdd.length > 0) {
                await tx.registration.createMany({
                    data: eventIdsToAdd.map((eventId) => ({
                        userId,
                        eventId,
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
