import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { respondInviteSchema } from "@/lib/schemas/teams";

type RouteContext = { params: Promise<{ inviteId: string }> };

// POST /api/invites/:inviteId/respond — Accept or reject invite
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const { inviteId } = await context.params;

    const parsed = await parseBody(req, respondInviteSchema);
    if (parsed.error) return parsed.error;

    const { action } = parsed.data;

    const invite = await prisma.teamInvite.findUnique({
      where: { id: inviteId },
      include: {
        Team: {
          include: {
            event: { select: { id: true, maxTeamSize: true } },
            members: { select: { id: true } },
          },
        },
      },
    });

    if (!invite) {
      return errorResponse("Invite not found.", 404);
    }

    // Only the invited user can respond
    if (invite.invitedUserId !== auth.session.id) {
      return errorResponse("Forbidden.", 403);
    }

    if (invite.status !== "PENDING") {
      return errorResponse("This invite has already been responded to.", 400);
    }

    if (action === "REJECT") {
      await prisma.teamInvite.update({
        where: { id: inviteId },
        data: { status: "REJECTED", respondedAt: new Date() },
      });
      return successResponse({ message: "Invite rejected." });
    }

    // action === "ACCEPT"

    // Re-check one-team-per-event at acceptance time
    const existingMembership = await prisma.teamMember.findFirst({
      where: {
        userId: auth.session.id,
        team: { eventId: invite.Team.event.id },
      },
    });

    if (existingMembership) {
      // Auto-reject this invite since user already joined another team
      await prisma.teamInvite.update({
        where: { id: inviteId },
        data: { status: "REJECTED", respondedAt: new Date() },
      });
      return errorResponse(
        "You are already in a team for this event. Invite has been auto-rejected.",
        409
      );
    }

    // Check team size
    if (
      invite.Team.event.maxTeamSize &&
      invite.Team.members.length >= invite.Team.event.maxTeamSize
    ) {
      return errorResponse("Team has reached maximum size.", 400);
    }

    // Accept: add member + update invite in transaction
    await prisma.$transaction([
      prisma.teamMember.create({
        data: {
          teamId: invite.teamId,
          userId: auth.session.id,
          role: "MEMBER",
        },
      }),
      prisma.teamInvite.update({
        where: { id: inviteId },
        data: { status: "ACCEPTED", respondedAt: new Date() },
      }),
    ]);

    return successResponse({ message: "Invite accepted. You have joined the team." });
  } catch (error) {
    console.error("[POST /api/invites/:inviteId/respond]", error);
    return errorResponse("Internal server error.", 500);
  }
}
