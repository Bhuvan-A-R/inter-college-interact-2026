import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),
  collegeName: z.string().min(2, "College name is required").optional(),
  collegeIdNumber: z.string().min(1, "College ID number is required").optional(),
  aadhaarNumber: z
    .string()
    .regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits")
    .optional(),
  photoUrl: z.string().url("A valid photo URL is required").optional(),
});
