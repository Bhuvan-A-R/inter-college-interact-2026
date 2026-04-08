import { z } from "zod";

export const addToCartSchema = z.object({
  eventId: z.string().uuid("Invalid event ID"),
  teamId: z.string().uuid("Invalid team ID").nullable().optional(),
});
