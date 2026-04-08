import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { Redis } from "@upstash/redis";
import { resetPasswordSchema } from "@/lib/schemas/auth";

// Initialize Upstash Redis client (safe)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
let redis: Redis | null = null;
if (redisUrl && redisToken) {
    redis = new Redis({
        url: redisUrl,
        token: redisToken
    });
} else {
    console.warn("[ResetPassword Redis] Missing env vars, OTP verification skipped.");
}

async function verifyOtp(
    email: string,
    otp: string
): Promise<{ success: boolean; message: string }> {
    if (!redis) {
        return { success: false, message: "Service temporarily unavailable." };
    }
    try {
        const storedOtp = await redis.get<string>(`otp:${email}`);

        // Debug Logs
        // console.log(`Stored OTP for ${email}: ${storedOtp}`);
        // console.log(`Received OTP for ${email}: ${otp}`);

        if (!storedOtp) {
            console.log("OTP has expired or does not exist.");
            return {
                success: false,
                message: "OTP has expired or does not exist.",
            };
        }

        if (storedOtp != otp) {
            console.log(
                "Invalid OTP provided. Stored OTP:",
                storedOtp,
                "Received OTP:",
                otp
            );
            return { success: false, message: "Invalid OTP provided." };
        }

        // OTP is valid, delete it from Redis
        try {
            await redis.del(`otp:${email}`);
        } catch (error: unknown) {
            console.error("Error deleting OTP from Redis:", error);
        }

        return { success: true, message: "OTP verified successfully." };
    } catch (error: unknown) {
        console.error("Error verifying OTP internally:", error);
        return { success: false, message: "Internal Server Error" };
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input with Zod schema
        const validation = resetPasswordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, errors: validation.error.errors },
                { status: 400 }
            );
        }

        const { email, otp, newPassword } = validation.data;

        // Verify OTP
        const isOtpValid = await verifyOtp(email, otp);
        if (!isOtpValid) {
            return NextResponse.json({
                success: false,
                error: "Invalid or expired OTP",
            });
        }

        // Check if the user exists
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 13);

        // Update the user's password in the database
        const updatedUser = await prisma.users.update({
            where: { email },
            data: { password: hashedPassword },
        });

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: "Password reset successful",
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error resetting password:", error);
        return NextResponse.json({
            success: false,
            error: "Internal Server Error",
        });
    }
}
