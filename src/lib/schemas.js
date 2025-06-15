import { z } from "zod";
import { accountTypeEnum } from "@/lib/siteStates";
//imports
export const addAccountSchema = z.object({
    accountName: z.string().min(1, { message: 'Account name is required' }),
    accountType: z.enum(accountTypeEnum).optional().default('General'),
    balance: z
        .union([z.string(), z.number()])
        .optional()
        .refine(
            (val) =>
                val === undefined || // allow default
                (!isNaN(Number(val)) && val !== ''), // must be a number
            {
                message: 'Balance must be a valid number',
            }
        )
        .transform((val) => (val === undefined ? 0 : Number(val))),
});


export const editAccountSchema = z
    .object({
        _id: z.string().min(1, { message: 'Invalid Id' }),

        accountName: z
            .string()
            .min(1, { message: 'Account name is required' })
            .optional(),

        accountType: z
            .enum(accountTypeEnum)
            .optional(),

        balance: z
            .union([z.string(), z.number()])
            .optional()
            .refine(
                (val) =>
                    val === undefined || (!isNaN(Number(val)) && val !== ''),
                {
                    message: 'Balance must be a valid number',
                }
            )
            .transform((val) => (val === undefined ? 0 : Number(val))),
    })
    .strict();


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


export const signinSchema = z
    .object({
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
    });



export const transactionSchema = z.object({
    accountId: z.string().min(1, { message: 'Select account' }).regex(/^[a-f\d]{24}$/i, 'Invalid accountId'),
    type: z.enum(['income', 'expense', 'transfer']),
    amount: z.coerce.number({
        invalid_type_error: 'Amount must be a number',
        required_error: 'Amount is required'
    }).positive('Amount must be positive'),
    category: z.string().max(500, { message: 'Text too long' }).optional(),
    description: z.string().max(500, { message: 'Text too long' }).optional(),
    relatedAccount: z
        .string()
        .min(1, { message: 'Select account' })
        .regex(/^[a-f\d]{24}$/i, 'Invalid relatedAccount')
        .optional()
}).refine((data) => {
    if (data.type === 'transfer') {
        return data.relatedAccount && data.relatedAccount !== data.accountId;
    }
    return true;
}, {
    message: 'Cant transfer between same account',
    path: ['relatedAccount']
});
