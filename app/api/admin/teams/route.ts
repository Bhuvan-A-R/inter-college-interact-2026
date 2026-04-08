import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin, successResponse, errorResponse } from "@/lib/apiHelpers";

// GET /api/admin/teams — Admin only: list all teams with filters
export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (eventId) {
      where.eventId = eventId;
    }
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const [teams, total] = await Promise.all([
      prisma.team.findMany({
        where,
        include: {
          event: {
            select: { id: true, name: true, type: true, category: true },
          },
          leader: {
            select: { id: true, name: true, email: true },
          },
          members: {
            include: {
              user: {
                select: { id: true, name: true, email: true, collegeName: true },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.team.count({ where }),
    ]);

    return successResponse({
      teams,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/admin/teams]", error);
    return errorResponse("Internal server error.", 500);
  }
}
