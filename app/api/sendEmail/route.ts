import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, college, message } = await req.json();
    
    if (!name || !email || !phone || !college || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

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
      from: process.env.SMTP_EMAIL, // Sender's email
      to: process.env.EMAIL_TO, // Receiver's email from .env
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        College: ${college}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>College:</strong> ${college}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
