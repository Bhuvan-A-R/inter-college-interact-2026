import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAdmin,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { z } from "zod";

type RouteContext = { params: Promise<{ userId: string }> };

const updateUserSchema = z.object({
  role: z.enum(["PARTICIPANT", "SUPER_ADMIN"]).optional(),
  name: z.string().min(1).optional(),
  phone: z.string().regex(/^\d{10}$/).optional(),
  collegeName: z.string().min(2).optional(),
  collegeIdNumber: z.string().min(1).optional(),
});

// GET /api/admin/users/:userId — User detail with registrations, orders, teams
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { userId } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
        updatedAt: true,
        registrations: {
          include: {
            event: {
              select: { id: true, name: true, type: true, category: true },
            },
          },
        },
        orders: {
          select: {
            id: true,
            totalAmount: true,
            status: true,
            createdAt: true,
            paymentSubmittedAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
        teamMemberships: {
          include: {
            team: {
              include: {
                event: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return errorResponse("User not found.", 404);
    }

    return successResponse({ user });
  } catch (error) {
    console.error("[GET /api/admin/users/:userId]", error);
    return errorResponse("Internal server error.", 500);
  }
}

// PATCH /api/admin/users/:userId — Update user details/role
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { userId } = await context.params;

    const existing = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!existing) {
      return errorResponse("User not found.", 404);
    }

    const parsed = await parseBody(req, updateUserSchema);
    if (parsed.error) return parsed.error;

    // Check phone uniqueness if being changed
    if (parsed.data.phone) {
      const dup = await prisma.user.findUnique({
        where: { phone: parsed.data.phone },
        select: { id: true },
      });
      if (dup && dup.id !== userId) {
        return errorResponse("Phone number already registered.", 409);
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        collegeName: true,
        role: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.session.id,
        action: "USER_UPDATED",
        entityType: "User",
        entityId: userId,
        details: { updatedFields: Object.keys(parsed.data) },
      },
    });

    return successResponse({ user });
  } catch (error) {
    console.error("[PATCH /api/admin/users/:userId]", error);
    return errorResponse("Internal server error.", 500);
  }
}
