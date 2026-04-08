import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin, successResponse, errorResponse } from "@/lib/apiHelpers";

// GET /api/admin/orders — Admin only: list all orders with filters
export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              collegeName: true,
            },
          },
          orderItems: {
            include: {
              event: {
                select: { id: true, name: true, type: true, category: true },
              },
              Team: {
                select: { id: true, name: true },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return successResponse({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/admin/orders]", error);
    return errorResponse("Internal server error.", 500);
  }
}
