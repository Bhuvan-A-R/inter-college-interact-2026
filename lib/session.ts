import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRE;
const encodedKey = new TextEncoder().encode(secretKey);

function parseTimeString(timeStr: string): number {
    const units: Record<string, number> = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
    };

    const match = timeStr.match(/^(\d+)([smhd])$/);
    if (!match) {
        throw new Error(
            'Invalid time format. Use format like "2h", "1d", "30m", "60s"'
        );
    }

    const [, value, unit] = match;
    return parseInt(value) * units[unit];
}

export type SessionPayload = {
    id: string;
    email: string;
    role: string;
    paymentUrl : boolean;
};

export async function encrypt(payload: SessionPayload) {
    if (!secretKey || !expiresIn) {
        throw new Error("JWT_SECRET or JWT_EXPIRE is not defined");
    }
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error: unknown) {
        console.log("Failed to verify token", error);
    }
}

// Utility function to parse time strings like "2h", "1d" into milliseconds

export async function createSession(token: SessionPayload) {
    if (!expiresIn) {
        throw new Error("JWT_EXPIRE is not defined");
    }

    const session = await encrypt(token);
    const expiresInMs = parseTimeString(expiresIn);
    const expires = new Date(Date.now() + expiresInMs);

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires,
    });
}

export const verifySession = cache(async () => {
    // console.log("verifying session is called");
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.id) {
        return null;
    }
    return session;
});

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}

// export async function updateSession() {
//     const session = (await cookies()).get("session")?.value;
//     const payload = await decrypt(session);
//     if (!session || !payload) {
//         console.log("Could not update session");
//         return null;
//     }
//     const cookieStore = await cookies();
//     cookieStore.set("session", session, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "lax",
//         path: "/",
//     });
// }

// write a function to try out decrypt and encrypt
export async function testEncryptDecrypt() {
    const token = {
        id: "123",
        email: "jaime",
        role: "admin",
        paymentUrl : false
    };
    const session = await encrypt(token);
    console.log("encrypted", session);
    const payload = await decrypt(session);
    console.log("decrypted", payload);
}
