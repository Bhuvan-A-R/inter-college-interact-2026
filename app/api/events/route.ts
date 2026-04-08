import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  requireAdmin,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { createEventSchema } from "@/lib/schemas/events";

// GET /api/events — List events
// Admins see all; participants/public see only isActive=true
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // Check if user is admin (don't fail if not authenticated)
    const authResult = await requireAuth();
    const isAdmin = !authResult.error && authResult.session.role === "SUPER_ADMIN";

    const where: Record<string, unknown> = {};
    if (!isAdmin) {
      where.isActive = true;
    }
    if (category) {
      where.category = category;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { createdAt: "desc" },
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
      },
    });

    return successResponse({ events });
  } catch (error) {
    console.error("[GET /api/events]", error);
    return errorResponse("Internal server error.", 500);
  }
}

// POST /api/events — Admin only: create event
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const parsed = await parseBody(req, createEventSchema);
    if (parsed.error) return parsed.error;

    const data = parsed.data;

    const event = await prisma.event.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        category: data.category,
        price: data.price,
        date: data.date ? new Date(data.date) : null,
        time: data.time,
        venue: data.venue,
        imageUrl: data.imageUrl,
        rules: data.rules,
        minTeamSize: data.minTeamSize,
        maxTeamSize: data.maxTeamSize,
        isActive: data.isActive ?? true,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: auth.session.id,
        action: "EVENT_CREATED",
        entityType: "Event",
        entityId: event.id,
        details: { name: event.name },
      },
    });

    return successResponse({ event }, 201);
  } catch (error) {
    console.error("[POST /api/events]", error);
    return errorResponse("Internal server error.", 500);
  }
}
