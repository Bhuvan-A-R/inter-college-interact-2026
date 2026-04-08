import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { createTeamSchema } from "@/lib/schemas/teams";

// GET /api/teams — List teams the authenticated user belongs to
export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const memberships = await prisma.teamMember.findMany({
      where: { userId: auth.session.id },
      include: {
        team: {
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
              include: {
                user: {
                  select: { id: true, name: true, email: true },
                },
              },
            },
          },
        },
      },
    });

    const teams = memberships.map((m) => ({
      ...m.team,
      myRole: m.role,
    }));

    return successResponse({ items: teams }, 200, "Teams retrieved successfully.");
  } catch (error) {
    console.error("[GET /api/teams]", error);
    return errorResponse("Internal server error.", 500);
  }
}

// POST /api/teams — Create a team for an event
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const parsed = await parseBody(req, createTeamSchema);
    if (parsed.error) return parsed.error;

    const { name, eventId } = parsed.data;

    // Verify event exists, is active, and is a TEAM event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, isActive: true, type: true, name: true },
    });

    if (!event || !event.isActive) {
      return errorResponse("Event not found or not available.", 404);
    }

    if (event.type !== "TEAM") {
      return errorResponse("Teams can only be created for team events.", 400);
    }

    // Enforce one team per event per user (check if user is already in a team for this event)
    const existingMembership = await prisma.teamMember.findFirst({
      where: {
        userId: auth.session.id,
        team: { eventId },
      },
    });

    if (existingMembership) {
      return errorResponse(
        "You are already in a team for this event.",
        409
      );
    }

    // Create team + add creator as leader member in a transaction
    const team = await prisma.$transaction(async (tx) => {
      const newTeam = await tx.team.create({
        data: {
          name,
          eventId,
          leaderId: auth.session.id,
        },
      });

      await tx.teamMember.create({
        data: {
          teamId: newTeam.id,
          userId: auth.session.id,
          role: "LEADER",
        },
      });

      return tx.team.findUnique({
        where: { id: newTeam.id },
        include: {
          event: {
            select: { id: true, name: true, type: true },
          },
          leader: {
            select: { id: true, name: true, email: true },
          },
          members: {
            include: {
              user: {
                select: { id: true, name: true, email: true },
              },
            },
          },
        },
      });
    });

    return successResponse({ team }, 201);
  } catch (error) {
    console.error("[POST /api/teams]", error);
    return errorResponse("Internal server error.", 500);
  }
}
