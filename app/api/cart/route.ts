import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { addToCartSchema } from "@/lib/schemas/cart";

// GET /api/cart — List cart items for authenticated user
export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: auth.session.id },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            type: true,
            category: true,
            price: true,
            date: true,
            time: true,
            venue: true,
            imageUrl: true,
            isActive: true,
          },
        },
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { addedAt: "desc" },
    });

    return successResponse({ cartItems });
  } catch (error) {
    console.error("[GET /api/cart]", error);
    return errorResponse("Internal server error.", 500);
  }
}

// POST /api/cart — Add event to cart
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const parsed = await parseBody(req, addToCartSchema);
    if (parsed.error) return parsed.error;

    const { eventId, teamId } = parsed.data;

    // Verify the event exists and is active
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, isActive: true, type: true },
    });

    if (!event || !event.isActive) {
      return errorResponse("Event not found or not available.", 404);
    }

    // Enforce unique user + event (check before letting Prisma throw)
    const existing = await prisma.cartItem.findUnique({
      where: { userId_eventId: { userId: auth.session.id, eventId } },
    });

    if (existing) {
      return errorResponse("Event already in cart.", 409);
    }

    // If team event, verify team exists and user is a member
    if (teamId) {
      const teamMember = await prisma.teamMember.findFirst({
        where: { teamId, userId: auth.session.id },
      });
      if (!teamMember) {
        return errorResponse("You are not a member of this team.", 403);
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
      },
    });

    return successResponse({ cartItem }, 201);
  } catch (error) {
    console.error("[POST /api/cart]", error);
    return errorResponse("Internal server error.", 500);
  }
}
