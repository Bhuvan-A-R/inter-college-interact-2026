import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAuth, successResponse, errorResponse } from "@/lib/apiHelpers";

type RouteContext = { params: Promise<{ inviteId: string }> };

// POST /api/invites/:inviteId/reject — Reject invite
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const { inviteId } = await context.params;

    const invite = await prisma.teamInvite.findUnique({
      where: { id: inviteId },
      select: { id: true, invitedUserId: true, status: true },
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

    await prisma.teamInvite.update({
      where: { id: inviteId },
      data: { status: "REJECTED", respondedAt: new Date() },
    });

    return successResponse({ message: "Invite rejected." });
  } catch (error) {
    console.error("[POST /api/invites/:inviteId/reject]", error);
    return errorResponse("Internal server error.", 500);
  }
}
