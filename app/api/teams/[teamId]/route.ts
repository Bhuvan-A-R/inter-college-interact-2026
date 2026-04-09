import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAuth, successResponse, errorResponse } from "@/lib/apiHelpers";

type RouteContext = { params: Promise<{ teamId: string }> };

// GET /api/teams/:teamId — Team details with members
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const { teamId } = await context.params;

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            type: true,
            category: true,
            price: true,
            minTeamSize: true,
            maxTeamSize: true,
          },
        },
        leader: {
          select: { id: true, name: true, email: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, collegeName: true },
            },
          },
          orderBy: { joinedAt: "asc" },
        },
        TeamInvite: {
          where: { status: { in: ["PENDING", "REJECTED"] } },
          select: {
            id: true,
            invitedUserId: true,
            status: true,
            createdAt: true,
            respondedAt: true,
            User_TeamInvite_invitedUserIdToUser: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    if (!team) {
      return errorResponse("Team not found.", 404);
    }

    // Only team members or admins can view details
    const isMember = team.members.some((m) => m.userId === auth.session.id);
    if (!isMember && auth.session.role !== "SUPER_ADMIN") {
      return errorResponse("Forbidden.", 403);
    }

    return successResponse({ team });
  } catch (error) {
    console.error("[GET /api/teams/:teamId]", error);
    return errorResponse("Internal server error.", 500);
  }
}
