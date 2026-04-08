import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { Redis } from "@upstash/redis"; // Use Upstash Redis

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET ?? "";
  return new TextEncoder().encode(secret);
}

async function verifyToken(
  token: string
): Promise<{ id: string; email: string; role: string; paymentUrl?: boolean | string | null } | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    });
    const p = payload as Record<string, unknown>;
    if (typeof p.id !== "string") return null;
    return {
      id: p.id as string,
      email: (p.email as string) ?? "",
      role: (p.role as string) ?? "",
      paymentUrl: p.paymentUrl as boolean | string | null | undefined,
    };
  } catch {
    return null;
  }
}

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
  console.warn("[Redis] Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN. Rate limiting disabled.");
}

const redis = redisUrl && redisToken 
  ? new Redis({ 
      url: redisUrl, 
      token: redisToken 
    })
  : null;

const GLOBAL_RATE_LIMIT_WINDOW = 60; // Time window in seconds
const GLOBAL_RATE_LIMIT_MAX = 100; // Maximum requests allowed per window
const OTP_RATE_LIMIT_WINDOW = 60; // Time window in seconds for OTP
const OTP_RATE_LIMIT_MAX = 5; // Maximum OTP requests per window

const protectedRoutes: string[] = [
    "/api/register",
    "/api/getallregister",
    "/api/eventsregister",
    "/api/getalleventregister",
    "/api/deleteeventregister",
    "/api/postdatetime",
    "/api/updateregisterdetails",
    "/api/updateregisterfiles",
    "/api/updateroleinevent",
    "/api/deleteregistrantevent",
    "/api/addeventregister",
    "/register",
    "/register/documentupload",
    "/register/eventregister",
    "/register/getallregister",
    "/register/getregister",
    "/register/updateregister",
    "/api/getPaymentInfo",
];

const adminRoutes: string[] = [
    "/admin",
    "/api/admin",
];


export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Extract IP address
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-real-ip") ||
        "unknown";

    // Apply OTP-specific rate limiting (skip if Redis unavailable)
    if (path === "/api/sendOtp" && redis) {
        try {
            const otpRedisKey = `otp-rate-limit:${ip}`;
            const currentOtpRequests = await redis.incr(otpRedisKey);
            if (currentOtpRequests === 1) {
                await redis.expire(otpRedisKey, OTP_RATE_LIMIT_WINDOW);
            }

            if (currentOtpRequests > OTP_RATE_LIMIT_MAX) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Too many OTP requests, please try again later.",
                    },
                    { status: 429 }
                );
            }
        } catch (error) {
            console.error("[Redis OTP Error]", error);
        }
    }

    // Apply global rate limiting for all routes (skip if Redis unavailable)
    let currentGlobalRequests = 1;
    if (redis) {
        try {
            const globalRedisKey = `rate-limit:${ip}:${path}`;
            currentGlobalRequests = await redis.incr(globalRedisKey);
            if (currentGlobalRequests === 1) {
                await redis.expire(globalRedisKey, GLOBAL_RATE_LIMIT_WINDOW);
            }
        } catch (error) {
            console.error("[Redis Rate Limit Error]", error);
            // Continue without rate limiting
        }
    }

    if (currentGlobalRequests > GLOBAL_RATE_LIMIT_MAX) {
        return NextResponse.json(
            {
                success: false,
                message: "Too many requests, please try again later.",
            },
            { status: 429 }
        );
    }

    const sessionToken = request.cookies.get("session")?.value;
    const authToken = request.cookies.get("auth_token")?.value;
    const legacySession = sessionToken ? await verifyToken(sessionToken) : null;
    const newSession = authToken ? await verifyToken(authToken) : null;

    const session = newSession || legacySession;

    // Admin-only routes
    if (adminRoutes.some(route => path.startsWith(route))) {
        if (!session?.id) {
            return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
        }
        if (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        }
    }


    if(protectedRoutes.includes(path) && session?.id && session?.paymentUrl){
        return NextResponse.redirect(new URL("/auth/countdown", request.nextUrl));
    }
    
    if (protectedRoutes.includes(path) && !session?.id) {
        return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/api/register",
        "/api/getallregister",
        "/api/sendEmailOtp",
        "/api/eventsregister",
        "/register",
        "/register/documentupload",
        "/register/eventregister",
        "/register/getallregister",
        "/register/getregister",
        "/register/updateregister",
        "/admin/:path*",
        "/api/admin/:path*",
    ],
};

