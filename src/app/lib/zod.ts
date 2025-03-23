import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(7, "Password must be more than 7 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const updateUserSchema = z.object({
  name: z.string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
    .optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(7, "Password must be at least 7 characters"),
  newPassword: z.string().min(7, "Password must be at least 7 characters"),
  confirmPassword: z.string(),
})

export const changePasswordByEmailSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    newPassword: z.string().min(7, "Password must be at least 7 characters"),
    confirmPassword: z.string(),
  })

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(7, "Password must be more than 7 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const jobApplicationSchema = z.object({
  company: z.string({ required_error: "Company name is required" })
    .min(1, "Company name is required"),
  notes: z.string().optional(),
  position: z.string({ required_error: "Position is required" })
    .min(1, "Position is required"),
  location: z.string({ required_error: "Location is required" }),
  status: z.enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED", "WITHDRAWN"]),
  dateApplied: z.date().optional(),
  lastUpdated: z.date().optional(),
  userId: z.string(),
});
