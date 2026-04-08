import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { submitPaymentSchema } from "@/lib/schemas/orders";

type RouteContext = { params: Promise<{ orderId: string }> };

// POST /api/orders/:orderId/payment — Submit payment
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const { orderId } = await context.params;

    const parsed = await parseBody(req, submitPaymentSchema);
    if (parsed.error) return parsed.error;

    const { upiTransactionId, paymentScreenshotUrl } = parsed.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            Team: { select: { id: true, leaderId: true } },
          },
        },
      },
    });

    if (!order) {
      return errorResponse("Order not found.", 404);
    }

    if (order.userId !== auth.session.id) {
      return errorResponse("Forbidden.", 403);
    }

    if (order.status === "REJECTED") {
      return errorResponse(
        "This order has been rejected. Payment resubmission is not allowed.",
        400
      );
    }

    if (order.status !== "PENDING_PAYMENT") {
      return errorResponse(
        `Payment cannot be submitted. Current status: ${order.status}.`,
        400
      );
    }

    const teamItems = order.orderItems.filter((item) => item.Team !== null);
    for (const item of teamItems) {
      if (item.Team && item.Team.leaderId !== auth.session.id) {
        return errorResponse(
          "Only the team leader can submit payment for team events.",
          403
        );
      }
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        upiTransactionId,
        paymentScreenshotUrl,
        paymentSubmittedAt: new Date(),
        status: "PAYMENT_SUBMITTED",
      },
    });

    return successResponse({
      order: {
        id: updated.id,
        status: updated.status,
        paymentSubmittedAt: updated.paymentSubmittedAt,
      },
      message: "Payment submitted successfully.",
    });
  } catch (error) {
    console.error("[POST /api/orders/:orderId/payment]", error);
    return errorResponse("Internal server error.", 500);
  }
}
