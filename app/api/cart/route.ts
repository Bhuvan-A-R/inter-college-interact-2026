import prisma from "@/lib/db";
import {
  requireAuth,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";

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
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.event.price),
      0
    );

    return successResponse(
      { items: cartItems, subtotal },
      200,
      "Cart items retrieved successfully."
    );
  } catch (error) {
    console.error("[GET /api/cart]", error);
    return errorResponse("Internal server error.", 500);
  }
}
