import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAuth, successResponse, errorResponse } from "@/lib/apiHelpers";

type RouteContext = { params: Promise<{ cartItemId: string }> };

// DELETE /api/cart/:cartItemId — Remove item from cart
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const { cartItemId } = await context.params;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      select: { id: true, userId: true },
    });

    if (!cartItem) {
      return errorResponse("Cart item not found.", 404);
    }

    if (cartItem.userId !== auth.session.id) {
      return errorResponse("Forbidden.", 403);
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    return successResponse({ message: "Item removed from cart." });
  } catch (error) {
    console.error("[DELETE /api/cart/:cartItemId]", error);
    return errorResponse("Internal server error.", 500);
  }
}
