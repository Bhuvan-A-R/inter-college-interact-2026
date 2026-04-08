import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { z } from "zod";

// Initialize Upstash Redis client (safe)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken 
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

// Zod schema for validation
const verifyOtpSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validation = verifyOtpSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, errors: validation.error.errors },
                { status: 400 }
            );
        }

        const { email, otp } = validation.data;

        if (!redis) {
            return NextResponse.json(
                { success: false, message: "Redis unavailable" },
                { status: 503 }
            );
        }

        // Retrieve OTP from Redis
        const storedOtp = await redis.get<string>(`otp:${email}`);

        // Debug Logs
        console.log(`Stored OTP for ${email}: ${storedOtp}`);
        console.log(`Received OTP for ${email}: ${otp}`);
        console.log("In verifyOtp/route.ts");

        if (!storedOtp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "OTP has expired or does not exist.",
                },
                { status: 401 }
            );
        }

        if (storedOtp !== otp) {
            return NextResponse.json(
                { success: false, message: "Invalid OTP provided." },
                { status: 401 }
            );
        }

        // OTP is valid, delete it from Redis
        await redis.del(`otp:${email}`);

        return NextResponse.json(
            { success: true, message: "OTP verified successfully." },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
