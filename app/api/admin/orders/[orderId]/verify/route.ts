import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin, successResponse, errorResponse } from "@/lib/apiHelpers";

type RouteContext = { params: Promise<{ orderId: string }> };

// POST /api/admin/orders/:orderId/verify — Verify payment and create registrations
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { orderId } = await context.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            Team: {
              include: {
                members: { select: { userId: true } },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return errorResponse("Order not found.", 404);
    }

    if (order.status !== "PAYMENT_SUBMITTED") {
      return errorResponse(
        `Order cannot be verified. Current status: ${order.status}.`,
        400
      );
    }

    // Verify payment and create registrations in a transaction
    await prisma.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: "VERIFIED",
          verifiedAt: new Date(),
          verifiedBy: auth.session.id,
        },
      });

      // Create registrations for each order item
      for (const item of order.orderItems) {
        if (item.Team && item.Team.members.length > 0) {
          // Team event: register all team members
          for (const member of item.Team.members) {
            await tx.registration.upsert({
              where: {
                userId_eventId: {
                  userId: member.userId,
                  eventId: item.eventId,
                },
              },
              create: {
                userId: member.userId,
                eventId: item.eventId,
                teamId: item.teamId,
              },
              update: {}, // Already registered — no-op
            });
          }
        } else {
          // Solo event: register the order owner
          await tx.registration.upsert({
            where: {
              userId_eventId: {
                userId: order.userId,
                eventId: item.eventId,
              },
            },
            create: {
              userId: order.userId,
              eventId: item.eventId,
              teamId: null,
            },
            update: {},
          });
        }
      }

      // Audit log
      await tx.auditLog.create({
        data: {
          userId: auth.session.id,
          action: "PAYMENT_VERIFIED",
          entityType: "Order",
          entityId: orderId,
          details: {
            orderUserId: order.userId,
            totalAmount: order.totalAmount.toString(),
            itemCount: order.orderItems.length,
          },
        },
      });
    });

    return successResponse({
      message: "Payment verified and registrations created.",
    });
  } catch (error) {
    console.error("[POST /api/admin/orders/:orderId/verify]", error);
    return errorResponse("Internal server error.", 500);
  }
}
