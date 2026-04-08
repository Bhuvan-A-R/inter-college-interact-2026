import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAuth, successResponse, errorResponse } from "@/lib/apiHelpers";

type RouteContext = { params: Promise<{ orderId: string }> };

// GET /api/orders/:orderId — Order details
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const { orderId } = await context.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
                imageUrl: true,
              },
            },
            Team: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!order) {
      return errorResponse("Order not found.", 404);
    }

    // Only the order owner or an admin can view
    if (
      order.userId !== auth.session.id &&
      auth.session.role !== "SUPER_ADMIN"
    ) {
      return errorResponse("Forbidden.", 403);
    }

    return successResponse({ order });
  } catch (error) {
    console.error("[GET /api/orders/:orderId]", error);
    return errorResponse("Internal server error.", 500);
  }
}
