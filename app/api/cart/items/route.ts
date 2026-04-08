import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { addToCartSchema } from "@/lib/schemas/cart";

// POST /api/cart/items — Add event to cart
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const parsed = await parseBody(req, addToCartSchema);
    if (parsed.error) return parsed.error;

    const { eventId, teamId } = parsed.data;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, isActive: true, type: true },
    });

    if (!event || !event.isActive) {
      return errorResponse("Event not found or not available.", 404);
    }

    const existing = await prisma.cartItem.findUnique({
      where: { userId_eventId: { userId: auth.session.id, eventId } },
    });

    if (existing) {
      return errorResponse("Event already in cart.", 409);
    }

    if (event.type === "TEAM") {
      if (!teamId) {
        return errorResponse("Team ID is required for team events.", 400);
      }

      const team = await prisma.team.findUnique({
        where: { id: teamId },
        select: { id: true, leaderId: true, eventId: true },
      });

      if (!team) {
        return errorResponse("Team not found.", 404);
      }

      if (team.eventId !== eventId) {
        return errorResponse("Team does not belong to this event.", 400);
      }

      if (team.leaderId !== auth.session.id) {
        return errorResponse("Only the team leader can add this item.", 403);
      }
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId: auth.session.id,
        eventId,
        teamId: teamId ?? null,
      },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            type: true,
            category: true,
            price: true,
          },
        },
        team: { select: { id: true, name: true } },
      },
    });

    return successResponse({ cartItem }, 201);
  } catch (error) {
    console.error("[POST /api/cart/items]", error);
    return errorResponse("Internal server error.", 500);
  }
}
