import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/schemas/auth";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { createSession, SessionPayload } from "@/lib/session";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // validate the request body
        const input = loginSchema.safeParse(body);
        if (!input.success) {
            return NextResponse.json({
                success: false,
                message: "Invalid email or password schema",
            });
        }
        // check db for user using email
        const db = await prisma.users.findUnique({
            where: {
                email: input.data.email,
            },
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
                paymentUrl : true,
            },
        });

        // verify the password
        if (!db || !(await bcrypt.compare(input.data.password, db.password))) {
            return NextResponse.json({
                success: false,
                message: "Invalid email or password provided",
            });
        }

        // create a stateless session
        const token: SessionPayload = {
            id: db.id,
            email: db.email,
            role: db.role,
            paymentUrl : db.paymentUrl? true : false
        };
        await createSession(token);

        // all good return success
        return NextResponse.json({
            success: true,
            message: "Login successful",
            role: db.role,
        });

        // Unexpected error
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Server error try again later",
        });
    }
}
