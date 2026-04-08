import prisma from "@/lib/db";
import { requireAuth, successResponse, errorResponse } from "@/lib/apiHelpers";

// GET /api/invites — List pending invites for authenticated user
export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const invites = await prisma.teamInvite.findMany({
      where: {
        invitedUserId: auth.session.id,
        status: "PENDING",
      },
      include: {
        Team: {
          include: {
            event: {
              select: {
                id: true,
                name: true,
                type: true,
                category: true,
              },
            },
            leader: {
              select: { id: true, name: true, email: true },
            },
            members: {
              select: { id: true },
            },
          },
        },
        User_TeamInvite_invitedByIdToUser: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = invites.map((inv) => ({
      id: inv.id,
      team: {
        id: inv.Team.id,
        name: inv.Team.name,
        memberCount: inv.Team.members.length,
        event: inv.Team.event,
        leader: inv.Team.leader,
      },
      invitedBy: inv.User_TeamInvite_invitedByIdToUser,
      status: inv.status,
      createdAt: inv.createdAt,
    }));

    return successResponse({ invites: formatted });
  } catch (error) {
    console.error("[GET /api/invites]", error);
    return errorResponse("Internal server error.", 500);
  }
}
