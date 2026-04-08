import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAdmin,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { rejectPaymentSchema } from "@/lib/schemas/orders";

type RouteContext = { params: Promise<{ orderId: string }> };

// POST /api/admin/payments/:orderId/reject — Reject payment (blocks resubmission)
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { orderId } = await context.params;

    const parsed = await parseBody(req, rejectPaymentSchema);
    if (parsed.error) return parsed.error;

    const { rejectionReason } = parsed.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, status: true, userId: true, totalAmount: true },
    });

    if (!order) {
      return errorResponse("Order not found.", 404);
    }

    if (order.status !== "PAYMENT_SUBMITTED") {
      return errorResponse(
        `Order cannot be rejected. Current status: ${order.status}.`,
        400
      );
    }

    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: "REJECTED",
          rejectionReason,
          verifiedBy: auth.session.id,
          verifiedAt: new Date(),
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: auth.session.id,
          action: "PAYMENT_REJECTED",
          entityType: "Order",
          entityId: orderId,
          details: {
            orderUserId: order.userId,
            totalAmount: order.totalAmount.toString(),
            reason: rejectionReason,
          },
        },
      }),
    ]);

    return successResponse({ message: "Payment rejected." });
  } catch (error) {
    console.error("[POST /api/admin/payments/:orderId/reject]", error);
    return errorResponse("Internal server error.", 500);
  }
}
