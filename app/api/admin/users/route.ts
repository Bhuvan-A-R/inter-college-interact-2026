import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin, successResponse, errorResponse } from "@/lib/apiHelpers";

// GET /api/admin/users — Admin only: list all users with search/filter
export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const role = searchParams.get("role");
    const college = searchParams.get("college");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (role) {
      where.role = role;
    }
    if (college) {
      where.collegeName = { contains: college, mode: "insensitive" };
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          collegeName: true,
          collegeIdNumber: true,
          photoUrl: true,
          role: true,
          emailVerified: true,
          createdAt: true,
          // aadhaar intentionally excluded
          _count: {
            select: {
              registrations: true,
              orders: true,
              teamMemberships: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return successResponse({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/admin/users]", error);
    return errorResponse("Internal server error.", 500);
  }
}
