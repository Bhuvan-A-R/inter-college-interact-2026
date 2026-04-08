import prisma from "@/lib/db";
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

    return successResponse(
      { items: orders },
      200,
      "Orders retrieved successfully."
    );
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return errorResponse("Internal server error.", 500);
  }
}
