import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  eventId: z.string().uuid("Invalid event ID"),
});

const inviteIdentifierSchema = z.object({
  identifier: z.string().min(1, "Invitee identifier is required"),
});

const inviteEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const inviteUserSchema = z.union([
  inviteIdentifierSchema,
  inviteEmailSchema,
]);

export const respondInviteSchema = z.object({
  action: z.enum(["ACCEPT", "REJECT"]),
});
