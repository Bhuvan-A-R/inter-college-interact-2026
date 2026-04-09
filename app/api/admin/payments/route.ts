import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin, successResponse, errorResponse } from "@/lib/apiHelpers";

// GET /api/admin/payments — List orders filtered by status
// ?status=PAYMENT_SUBMITTED (default) | VERIFIED | REJECTED
export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const skip = (page - 1) * limit;

    const validStatuses = ["PAYMENT_SUBMITTED", "VERIFIED", "REJECTED"] as const;
    type ValidStatus = (typeof validStatuses)[number];
    const rawStatus = searchParams.get("status") ?? "PAYMENT_SUBMITTED";
    const status: ValidStatus = (validStatuses as readonly string[]).includes(rawStatus)
      ? (rawStatus as ValidStatus)
      : "PAYMENT_SUBMITTED";

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { status },
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
        orderBy: { paymentSubmittedAt: "asc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { status } }),
    ]);

    return successResponse({
      orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[GET /api/admin/payments]", error);
    return errorResponse("Internal server error.", 500);
  }
}
