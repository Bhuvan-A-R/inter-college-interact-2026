import { Prisma } from "@prisma/client";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { utapi } from "../uploadthing/uploadthing";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const session = await verifySession();
        if (!session?.id) {
            redirect("/auth/signin");
        }
        const userId = session.id as string;
        const registrantIds: string[] = body.registrantIds;

        if (!Array.isArray(registrantIds) || registrantIds.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No registrant IDs provided",
                },
                { status: 400 }
            );
        }

        // Initialize an array to collect all file URLs to delete
        const filesToDelete: string[] = [];

        await prisma.$transaction(async (tx) => {
            // 1. Get all registrants with their event registrations and file URLs
            const foundRegistrants = await tx.registrants.findMany({
                where: {
                    id: { in: registrantIds },
                    userId: userId,
                },
                include: {
                    eventRegistrations: true,
                },
            });

            // Validate that all requested registrants exist for this user
            if (foundRegistrants.length !== registrantIds.length) {
                throw new Error(
                    "Some registrants were not found for this user"
                );
            }

            // 2. Collect all file URLs from the found registrants
            foundRegistrants.forEach((registrant) => {
                // Assuming the registrant has fields like photoUrl, idcardUrl, etc.
                const fileFields = [
                    registrant.photoUrl,
                    registrant.idcardUrl,
                ];

                fileFields.forEach((fileUrl) => {
                    if (fileUrl) {
                        filesToDelete.push(fileUrl);
                    }
                });
            });

            // 3. Decrement events for each found registrant
            for (const registrant of foundRegistrants) {
                for (const eventReg of registrant.eventRegistrations) {
                    if (eventReg.type === "PARTICIPANT") {
                        await tx.events.update({
                            where: { id: eventReg.eventId },
                            data: { registeredParticipant: { decrement: 1 } },
                        });
                    }
                }
            }

            // 4. Delete the registrants in bulk
            await tx.registrants.deleteMany({
                where: { id: { in: registrantIds } },
            });
        });

        // After successful transaction, delete files from Uploadthing
        if (filesToDelete.length > 0) {
            try {
                const deleteStatus = await utapi.deleteFiles(filesToDelete);
                console.log("Files deleted from Uploadthing:", deleteStatus);
            } catch (fileDeletionError) {
                console.error(
                    "Error deleting files from Uploadthing:",
                    fileDeletionError
                );
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Registrants deleted, but failed to delete some files.",
                    },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json(
            {
                success: true,
                message: "Registrants and their files deleted successfully.",
            },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2002":
                    return NextResponse.json(
                        {
                            success: false,
                            message: `Unique constraint failed on the field: ${err.meta?.target}`,
                        },
                        { status: 400 }
                    );
                case "P2025":
                    return NextResponse.json(
                        { success: false, message: "Record not found" },
                        { status: 404 }
                    );
                default:
                    return NextResponse.json(
                        {
                            success: false,
                            message: `Prisma error: ${err.message}`,
                        },
                        { status: 500 }
                    );
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json(
                { success: false, message: `Validation error: ${err.message}` },
                { status: 400 }
            );
        } else if (err instanceof Error) {
            return NextResponse.json(
                { success: false, message: err.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "An unexpected error occurred" },
                { status: 500 }
            );
        }
    }
}
