import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  requireAuth,
  parseBody,
  successResponse,
  errorResponse,
} from "@/lib/apiHelpers";
import { updateProfileSchema } from "@/lib/schemas/profile";

// GET /api/profile — Return authenticated user's profile
export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const user = await prisma.user.findUnique({
      where: { id: auth.session.id },
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
        // aadhaarNumber intentionally excluded
      },
    });

    if (!user) {
      return errorResponse("User not found.", 404);
    }

    return successResponse({ user });
  } catch (error) {
    console.error("[GET /api/profile]", error);
    return errorResponse("Internal server error.", 500);
  }
}

// PATCH /api/profile — Update profile fields
export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const parsed = await parseBody(req, updateProfileSchema);
    if (parsed.error) return parsed.error;

    const data = parsed.data;

    // Check for duplicate phone if being updated
    if (data.phone) {
      const dupPhone = await prisma.user.findUnique({
        where: { phone: data.phone },
        select: { id: true },
      });
      if (dupPhone && dupPhone.id !== auth.session.id) {
        return errorResponse("Phone number already registered.", 409);
      }
    }

    // Check for duplicate aadhaar if being updated
    if (data.aadhaarNumber) {
      const dupAadhaar = await prisma.user.findUnique({
        where: { aadharNumber: data.aadhaarNumber },
        select: { id: true },
      });
      if (dupAadhaar && dupAadhaar.id !== auth.session.id) {
        return errorResponse("Aadhaar number already registered.", 409);
      }
    }

    // Build update object, mapping aadhaarNumber to the Prisma field name
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.collegeName !== undefined) updateData.collegeName = data.collegeName;
    if (data.collegeIdNumber !== undefined)
      updateData.collegeIdNumber = data.collegeIdNumber;
    if (data.aadhaarNumber !== undefined)
      updateData.aadharNumber = data.aadhaarNumber; // Prisma field is aadharNumber
    if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl;

    const user = await prisma.user.update({
      where: { id: auth.session.id },
      data: updateData,
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
      },
    });

    return successResponse({ user });
  } catch (error) {
    console.error("[PATCH /api/profile]", error);
    return errorResponse("Internal server error.", 500);
  }
}
