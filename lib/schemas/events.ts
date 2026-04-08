import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  type: z.enum(["SOLO", "TEAM"]),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be non-negative"),
  date: z.string().datetime().optional(),
  time: z.string().optional(),
  venue: z.string().optional(),
  imageUrl: z.string().url().optional(),
  rules: z.string().optional(),
  minTeamSize: z.number().int().min(1).optional(),
  maxTeamSize: z.number().int().min(1).optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateEventSchema = createEventSchema.partial();
