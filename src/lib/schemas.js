import { z } from "zod";
import { accountTypeEnum } from "@/siteStates";
//imports
export const addAccountSchema = z.object({
    accountName: z
        .string()
        .min(2, "Account name must be at least 2 characters")
        .transform((str) => str.trim()),
    balance: z.coerce.number({ invalid_type_error: "Balance must be a number" }),
    accountType: z.enum(accountTypeEnum),
});


export const signupSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters long")
            .max(100, "Name cannot exceed 100 characters")
            .refine((val) => val !== '', {
                message: "Name is required",
            }),

        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .max(100, "Email cannot exceed 100 characters")
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .max(100, "Password cannot exceed 100 characters")
            .refine((val) => /[A-Za-z]/.test(val), {
                message: "Password must contain at least one letter",
            })
            .refine((val) => /\d/.test(val), {
                message: "Password must contain at least one number",
            })
            .refine((val) => /[@$!%*?&]/.test(val), {
                message: "Password must contain at least one special character (@, $, !, %, *, ?, &)",
            }),

        confirmPassword: z
            .string()
            .min(6, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // attach error to this field
    });
