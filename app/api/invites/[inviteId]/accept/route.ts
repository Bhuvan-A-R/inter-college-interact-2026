import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAuth, successResponse, errorResponse } from "@/lib/apiHelpers";

type RouteContext = { params: Promise<{ inviteId: string }> };

// POST /api/invites/:inviteId/accept — Accept invite
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const { inviteId } = await context.params;

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

    if (invite.invitedUserId !== auth.session.id) {
      return errorResponse("Forbidden.", 403);
    }

    if (invite.status !== "PENDING") {
      return errorResponse("This invite has already been responded to.", 400);
    }

    const existingMembership = await prisma.teamMember.findFirst({
      where: {
        userId: auth.session.id,
        team: { eventId: invite.Team.event.id },
      },
    });

    if (existingMembership) {
      await prisma.teamInvite.update({
        where: { id: inviteId },
        data: { status: "REJECTED", respondedAt: new Date() },
      });
      return errorResponse(
        "You are already in a team for this event. Invite has been auto-rejected.",
        409
      );
    }

    if (
      invite.Team.event.maxTeamSize &&
      invite.Team.members.length >= invite.Team.event.maxTeamSize
    ) {
      return errorResponse("Team has reached maximum size.", 400);
    }

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
    console.error("[POST /api/invites/:inviteId/accept]", error);
    return errorResponse("Internal server error.", 500);
  }
}
