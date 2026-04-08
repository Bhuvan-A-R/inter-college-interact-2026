import { z } from "zod";
export const EventSchema = z.array(
    z.object({
        eventNo: z.number({ message: "eventNo is required" }),
        eventName: z.string({ message: "eventName is required" }),
        maxParticipant: z.number({ message: "max participant is required" }),
        category: z.string({ message: "category of event is required" }),
        amount: z.number({ message: "amount is required" }).min(0),
        teamCount: z.number().int().min(1).optional(),
    })
);

export const participantFormSchema = z.object({
    name: z.string().min(1, "Name required"),
    usn: z.string().min(1, "USN required"),
    phone: z
        .string()
        .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
    email: z.string().email(),
    events: z
        .array(
            z.object({
                eventId: z.string().min(1, "Event id is required"),
                eventName: z.string(),
                eventNo: z.number(),
                teamNumber: z.number().int().min(1).optional(),
                type: z.enum(["PARTICIPANT"]),
            })
        )
        .min(1, "Select at least one event"),
    gender: z.string().nullable().optional(),
    blood: z.string().nullable().optional(),
    documents: z
        .object({
            photo: z.string().nullable().optional(),
            idCard: z.string().nullable().optional(),
        })
        .optional(),
});



