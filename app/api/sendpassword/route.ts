import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Zod schema for validation
const sendPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validation = sendPasswordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, errors: validation.error.errors },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

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

        // Email content
        const mailOptions = {
            from: process.env.SMTP_EMAIL, // Sender email address
            to: email, // Receiver email address
            subject: "Your Account Password",
            text: `Your account has been created successfully. Your password is: ${password}. Please change it after logging in.`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Password sent successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending password email:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
