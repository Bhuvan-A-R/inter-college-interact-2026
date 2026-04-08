import { NextResponse } from "next/server";
import { z } from "zod";
import { Redis } from "@upstash/redis";
import nodemailer from "nodemailer";

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
    console.warn("[SendEmailOtp Redis] Missing env vars, rate limiting & storage skipped.");
}

// Zod schema for validation
const emailOtpSchema = z.object({
    email: z.string().email("Invalid email address"),
});

// Utility to generate a 6-digit OTP
const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validation = emailOtpSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, errors: validation.error.errors },
                { status: 400 }
            );
        }

        const { email } = validation.data;

        // Rate limiting logic
        if (redis) {
            try {
                const rateLimitKey = `email-otp-rate-limit:${email}`;
                const rateLimitValue = await redis.incr(rateLimitKey);

                if (rateLimitValue === 1) {
                    await redis.expire(rateLimitKey, 60);
                }

                if (rateLimitValue > 5) {
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Too many OTP requests, please try again later.",
                        },
                        { status: 429 }
                    );
                }

                // Generate OTP
                const otp = generateOtp();

                // Save OTP to Redis
                await redis.set(`otp:${email}`, otp, { ex: 300 });
            } catch (error) {
                console.error("[Redis SendEmailOtp]", error);
                // Continue sending email without rate limit/OTP storage
            }
        }

        // Always generate OTP for email (even without Redis)
        const otp = generateOtp();
        if (!redis) {
            console.warn(`[SendEmailOtp] OTP ${otp} sent without Redis storage (add UPSTASH_* env vars for persistence).`);
        }

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587", 10),
            secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email content with updated CSS theme and copy button for OTP
        const mailOptions = {
            from: process.env.SMTP_EMAIL, // Sender email address
            to: email, // Receiver email address
            subject: "Your OTP for Verification",
            html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your OTP for Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff; /* Changed body background to white */
    }
    .container {
      font-family: 'Inter', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #262626;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #CFA000; /* Dark yellow border */
      border-radius: 8px;
      background-color: #FFF9DB; /* Light yellow background for inner container */
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      background-color: #FFC107;
      padding: 10px 20px;
      border-radius: 8px;
      display: inline-block;
      letter-spacing: 3px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 style="margin-bottom:16px;">Your OTP for Verification</h2>
    <p style="margin-bottom:16px;">Use the following One-Time Password (OTP) to complete your verification process:</p>
    <div style="margin-bottom:16px; text-align: center;">
      <span class="otp">${otp}</span>
    </div>
    <p style="margin-bottom:16px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    <p style="margin-top:20px; font-size:14px; color:#6c757d;">If you did not request this, please ignore this email.</p>
  </div>
  <!-- Removed JavaScript as email clients do not support JS -->
</body>
</html>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "OTP sent successfully!" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error sending OTP:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
