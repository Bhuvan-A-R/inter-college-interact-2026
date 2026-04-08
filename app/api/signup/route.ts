
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import { Redis } from "@upstash/redis";
import { signupSchema } from "@/lib/schemas/auth";
import { generatePassword } from "@/lib/generator";
import nodemailer from "nodemailer";
import { emailList } from "@/data/emailList";

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
    console.warn("[Signup Redis] Missing env vars, OTP verification skipped.");
}

// Function to map Zod errors to field-level error object
function mapZodErrors(zodError: z.ZodError): Record<string, string> {
    const fieldErrors: Record<string, string> = {};
    zodError.errors.forEach((err) => {
        const fieldName = err.path[0];
        if (fieldName && !fieldErrors[fieldName]) {
            fieldErrors[fieldName] = err.message;
        }
    });
    return fieldErrors;
}

// Function to verify OTP internally
async function verifyOtp(
    email: string,
    otp: string
): Promise<{ success: boolean; message: string }> {
    if (!redis) {
        console.warn("[Redis OTP] Skipped due to unavailable client.");
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
        const validation = signupSchema.safeParse(body);

        if (validation.success === false) {
            const fieldErrors = mapZodErrors(validation.error);
            return NextResponse.json({ success: false, errors: fieldErrors });
        }

        const { email, phone, otp, collegeCode, collegeName, region } =
            validation.data;
        console.log(collegeName, email, otp, phone);

        // Removed emailList check - allow any valid email
        // const checkEmail = emailList.findIndex(
        //     (value: string) => value === email
        // );

        // if (checkEmail === -1) {
        //     return NextResponse.json(
        //         { success: false, errors:{email: "email is not registered in our database. please contact support to register"} },
        //         { status: 400 }
        //     );
        // }

        // Check if the user already exists in the database (by email or phone)
        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [{ email }, { phone }, { collegeName }],
            },
        });
        console.log("the existing user", existingUser);

        if (existingUser) {
            return NextResponse.json({
                success: false,
                errors: {
                    email: "A user with this email or phone number and the college Name already exists.",
                },
            });
        }

        // Verify OTP entered by the user
        // Skip OTP validation for testing - always pass
        // const otpValidation = await verifyOtp(email, otp);
        // if (!otpValidation.success) {
        //     return NextResponse.json({
        //         success: false,
        //         errors: {
        //             otp: otpValidation.message,
        //         },
        //     });
        // }
        // console.log("the otp is success", otpValidation.success);

        const password: string = generatePassword(12) as string;
        // Hash the user's provided password
        const hashedPassword = await bcrypt.hash(password, 13);

        // console.log("hashed password", hashedPassword);

        // Create the user in the database
        const newUser = await prisma.users.create({
            data: {
                collegeName: collegeName,
                email,
                phone,
                password: hashedPassword, // Store the hashed password
                deptCode: collegeCode,
                region: region,
            },
        });

        if (newUser) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "587", 10),
                secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.SMTP_EMAIL,
                to: email,
                subject:
                    "Login Credentials for Interact-2025 Registration Portal",
                html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Registration Successful</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
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
      background-color: #FFF9DB; /* Light yellow background */
    }
  </style>
</head>
<body>
  <div class="container">
    <p style="margin-bottom: 16px;">Respect Principal,</p>
    <p style="margin-bottom: 16px;"><strong>${newUser.collegeName}</strong></p>
    <p style="margin-bottom: 16px;">Greetings from Global Academy of Technology.</p>
    <p style="margin-bottom: 16px;">
      We are pleased to inform you that your institution’s registration on the official website for Interact-2025 – The 24th VTU Youth Fest has been successfully created.
      Below are your login credentials to access the portal:
    </p>
    <ul style="margin-bottom: 16px; padding-left: 20px;">
      <li style="margin-bottom: 8px;"><strong>Username:</strong> ${newUser.email}</li>
      <li><strong>Password:</strong> ${password}</li>
    </ul>
    <p style="margin-bottom: 16px;">Please use these credentials to log in and complete the participant registration process for the fest.</p>
    <p style="margin-bottom: 16px;">
      <strong>Website Link:</strong>
      <a href="https://vtufestinteract.com" target="_blank" style="color: #2563eb; text-decoration: none;">
        vtufestinteract.com
      </a>
    </p>
    <p style="margin-bottom: 16px;">
      We look forward to your institution’s active participation in this grand cultural event.
      Should you require any assistance, feel free to reach out to us.
    </p>
    <p style="margin-bottom: 16px;">
      For any queries, contact:<br/>
      • Mr. Abhishek, Junior Cultural Coordinator – 📞 <a href="tel:8660041943">8660041943</a><br/>
      • Akshith M, Student Convener – 📞 <a href="tel:9945864767">9945864767</a>
    </p>
    <p style="margin-bottom: 16px;">Thank you for your support and cooperation.</p>
    <p style="margin-bottom: 0;">Warm regards,<br/>Team Interact<br/>Global Academy of Technology</p>
  </div>
</body>
</html>
                `,
            };

            await transporter.sendMail(mailOptions);
        }

        // Return successful response
        return NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    phone: newUser.phone,
                    collegeName: newUser.collegeName,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        try {
            console.error("Error in registration process:", error);
        } catch (logError) {
            console.error("Failed to log error:", logError);
        }
        return NextResponse.json(
            { success: false, errors: { general: "Internal Server Error" } },
            { status: 500 }
        );
    }
}
