import { z } from "zod";

export const sendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export const registerCompleteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  collegeName: z.string().min(2, "College name is required"),
  collegeIdNumber: z.string().min(1, "College ID number is required"),
  aadhaarNumber: z
    .string()
    .regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  photoUrl: z.string().url("A valid profile photo URL is required"),
});

export const newLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
