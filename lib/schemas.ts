import { z } from "zod";

export const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size <= 256 * 1024, {
        message: "File size should be less than 300KB",
    })
    .refine(
        (file) =>
            ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
        {
            message: "Invalid file type. Only JPEG, PNG, and PDF are allowed.",
        }
    );

export const eventSchema = z.object({
    name: z.string().min(1, "Event name cannot be empty"),
    attended: z.boolean().default(false),
});

export const registrantSchema = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    usn: z.string().min(1, "Usn cannot be empty"),
    type: z.enum(["PARTICIPANT"], "Invalid type"),
    events: z.array(eventSchema),
    photo: fileSchema,
    aadhar: fileSchema,
    sslc: fileSchema,
    puc: fileSchema,
    admission: fileSchema,
    idcard: fileSchema,
});
