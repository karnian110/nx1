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
