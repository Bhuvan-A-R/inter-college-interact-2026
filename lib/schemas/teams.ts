import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  eventId: z.string().uuid("Invalid event ID"),
});

export const inviteUserSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const respondInviteSchema = z.object({
  action: z.enum(["ACCEPT", "REJECT"]),
});
