import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";
import { requireAuth, successResponse, errorResponse } from "@/lib/apiHelpers";

// GET /api/orders — List orders for authenticated user
export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const orders = await prisma.order.findMany({
      where: { userId: auth.session.id },
      include: {
        orderItems: {
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
            Team: {
              select: { id: true, name: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse({ orders });
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return errorResponse("Internal server error.", 500);
  }
}

// POST /api/orders — Checkout: create order from cart items
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: auth.session.id },
      include: {
        event: {
          select: { id: true, price: true, type: true, isActive: true },
        },
      },
    });

    if (cartItems.length === 0) {
      return errorResponse("Cart is empty.", 400);
    }

    // Verify all events are still active
    const inactiveEvents = cartItems.filter((item) => !item.event.isActive);
    if (inactiveEvents.length > 0) {
      return errorResponse(
        "Some events in your cart are no longer available. Please remove them first.",
        400
      );
    }

    // For team events in cart, verify user is leader (leader-only checkout for team events)
    for (const item of cartItems) {
      if (item.event.type === "TEAM" && item.teamId) {
        const team = await prisma.team.findUnique({
          where: { id: item.teamId },
          select: { leaderId: true },
        });
        if (team && team.leaderId !== auth.session.id) {
          return errorResponse(
            "Only the team leader can checkout team events.",
            403
          );
        }
      }
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum.add(item.event.price),
      new Decimal(0)
    );

    // Create order + order items + clear cart in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: auth.session.id,
          totalAmount,
          status: "PENDING_PAYMENT",
          orderItems: {
            create: cartItems.map((item) => ({
              eventId: item.eventId,
              teamId: item.teamId,
              price: item.event.price,
            })),
          },
        },
        include: {
          orderItems: {
            include: {
              event: {
                select: { id: true, name: true, type: true, price: true },
              },
            },
          },
        },
      });

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: auth.session.id },
      });

      return newOrder;
    });

    return successResponse({ order }, 201);
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return errorResponse("Internal server error.", 500);
  }
}
