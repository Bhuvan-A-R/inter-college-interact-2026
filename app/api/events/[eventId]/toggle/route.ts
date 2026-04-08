import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin, successResponse, errorResponse } from "@/lib/apiHelpers";

type RouteContext = { params: Promise<{ eventId: string }> };

// PATCH /api/events/:eventId/toggle — Admin only: toggle isActive
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { eventId } = await context.params;

    const existing = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, isActive: true, name: true },
    });

    if (!existing) {
      return errorResponse("Event not found.", 404);
    }

    const event = await prisma.event.update({
      where: { id: eventId },
      data: { isActive: !existing.isActive },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.session.id,
        action: "EVENT_UPDATED",
        entityType: "Event",
        entityId: eventId,
        details: {
          toggled: "isActive",
          from: existing.isActive,
          to: !existing.isActive,
        },
      },
    });

    return successResponse({
      event: { id: event.id, name: event.name, isActive: event.isActive },
      message: `Event ${event.isActive ? "activated" : "deactivated"}.`,
    });
  } catch (error) {
    console.error("[PATCH /api/events/:eventId/toggle]", error);
    return errorResponse("Internal server error.", 500);
  }
}
