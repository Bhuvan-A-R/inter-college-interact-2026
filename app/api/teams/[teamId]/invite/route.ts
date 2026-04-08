import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { inviteUserSchema } from "@/lib/schemas/teams";
import { randomUUID } from "crypto";

type RouteContext = { params: Promise<{ teamId: string }> };

// POST /api/teams/:teamId/invite — Leader invites a user by email
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const { teamId } = await context.params;

    const parsed = await parseBody(req, inviteUserSchema);
    if (parsed.error) return parsed.error;

    const identifier =
      "identifier" in parsed.data ? parsed.data.identifier : parsed.data.email;

    // Verify team exists
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        event: {
          select: { id: true, maxTeamSize: true },
        },
        members: { select: { id: true } },
      },
    });

    if (!team) {
      return errorResponse("Team not found.", 404);
    }

    // Only leader can invite
    if (team.leaderId !== auth.session.id) {
      return errorResponse("Only the team leader can send invites.", 403);
    }

    // Check team size limit
    if (team.event.maxTeamSize && team.members.length >= team.event.maxTeamSize) {
      return errorResponse("Team has reached maximum size.", 400);
    }

    // Find the invitee
    const invitee = await prisma.user.findUnique({
      where: identifier.includes("@")
        ? { email: identifier }
        : { phone: identifier },
      select: { id: true, name: true, email: true },
    });

    if (!invitee) {
      return errorResponse("No user found with this identifier.", 404);
    }

    // Can't invite yourself
    if (invitee.id === auth.session.id) {
      return errorResponse("You cannot invite yourself.", 400);
    }

    // Check if invitee is already in a team for this event (one-team-per-event)
    const existingMembership = await prisma.teamMember.findFirst({
      where: {
        userId: invitee.id,
        team: { eventId: team.event.id },
      },
    });

    if (existingMembership) {
      return errorResponse(
        "This user is already in a team for this event.",
        409
      );
    }

    // Check if invite already exists
    const existingInvite = await prisma.teamInvite.findUnique({
      where: {
        teamId_invitedUserId: { teamId, invitedUserId: invitee.id },
      },
    });

    if (existingInvite && existingInvite.status === "PENDING") {
      return errorResponse("An invite is already pending for this user.", 409);
    }

    // Create or upsert the invite (if previously rejected, allow re-invite)
    const invite = await prisma.teamInvite.upsert({
      where: {
        teamId_invitedUserId: { teamId, invitedUserId: invitee.id },
      },
      create: {
        id: randomUUID(),
        teamId,
        invitedUserId: invitee.id,
        invitedById: auth.session.id,
        status: "PENDING",
      },
      update: {
        status: "PENDING",
        respondedAt: null,
        invitedById: auth.session.id,
      },
    });

    return successResponse(
      {
        invite: {
          id: invite.id,
          teamId: invite.teamId,
          invitedUser: invitee,
          status: invite.status,
        },
        message: "Invite sent successfully.",
      },
      201
    );
  } catch (error) {
    console.error("[POST /api/teams/:teamId/invite]", error);
    return errorResponse("Internal server error.", 500);
  }
}
