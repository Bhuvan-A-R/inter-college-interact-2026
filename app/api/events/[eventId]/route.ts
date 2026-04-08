import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  requireAdmin,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { updateEventSchema } from "@/lib/schemas/events";

type RouteContext = { params: Promise<{ eventId: string }> };

// GET /api/events/:eventId
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { eventId } = await context.params;

    // Check if user is admin
    const authResult = await requireAuth();
    const isAdmin = !authResult.error && authResult.session.role === "SUPER_ADMIN";

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        category: true,
        price: true,
        date: true,
        time: true,
        venue: true,
        imageUrl: true,
        rules: true,
        minTeamSize: true,
        maxTeamSize: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!event) {
      return errorResponse("Event not found.", 404);
    }

    // Non-admins can only see active events
    if (!isAdmin && !event.isActive) {
      return errorResponse("Event not found.", 404);
    }

    return successResponse({ event });
  } catch (error) {
    console.error("[GET /api/events/:eventId]", error);
    return errorResponse("Internal server error.", 500);
  }
}

// PATCH /api/events/:eventId — Admin only
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { eventId } = await context.params;

    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (!existing) {
      return errorResponse("Event not found.", 404);
    }

    const parsed = await parseBody(req, updateEventSchema);
    if (parsed.error) return parsed.error;

    const updateData: Record<string, unknown> = { ...parsed.data };
    if (updateData.date) {
      updateData.date = new Date(updateData.date as string);
    }

    const event = await prisma.event.update({
      where: { id: eventId },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.session.id,
        action: "EVENT_UPDATED",
        entityType: "Event",
        entityId: event.id,
        details: { updatedFields: Object.keys(parsed.data) },
      },
    });

    return successResponse({ event });
  } catch (error) {
    console.error("[PATCH /api/events/:eventId]", error);
    return errorResponse("Internal server error.", 500);
  }
}

// DELETE /api/events/:eventId — Admin only
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { eventId } = await context.params;

    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (!existing) {
      return errorResponse("Event not found.", 404);
    }

    await prisma.event.delete({ where: { id: eventId } });

    await prisma.auditLog.create({
      data: {
        userId: auth.session.id,
        action: "EVENT_DELETED",
        entityType: "Event",
        entityId: eventId,
        details: { name: existing.name },
      },
    });

    return successResponse({ message: "Event deleted successfully." });
  } catch (error) {
    console.error("[DELETE /api/events/:eventId]", error);
    return errorResponse("Internal server error.", 500);
  }
}
