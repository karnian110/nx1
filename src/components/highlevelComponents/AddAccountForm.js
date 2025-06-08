"use client";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddAccountForm({ accountTypeEnum }) {
  // Schema
  const addAccountSchema = z.object({
    accountName: z
      .string()
      .min(2, "Account name must be at least 2 characters")
      .transform((str) => str.trim()),
    balance: z.coerce.number({ invalid_type_error: "Balance must be a number" }),
    accountType: z.enum(accountTypeEnum),
  });

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addAccountSchema),
    defaultValues: {
      balance: 0,
    },
  });

  const formSubmit = async (data) => {
    try {
      console.log("Submitting", data);
    } catch (err) {
      console.error("Submission failed", err);
      setError("root", { message: "Unexpected error occurred" });
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="accountName">Account name</Label>
        <Input
          id="accountName"
          {...register("accountName")}
          type="text"
          placeholder="Account name"
        />
        {errors.accountName && <p className="text-red-500">{errors.accountName.message}</p>}
      </div>

      <div>
        <Label htmlFor="balance">Initial balance</Label>
        <Input
          id="balance"
          {...register("balance")}
          type="text"
          placeholder="Initial balance"
        />
        {errors.balance && <p className="text-red-500">{errors.balance.message}</p>}
      </div>

      <div>
        <Label htmlFor="accountType">Account Type</Label>
        <Controller
          name="accountType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Account Type</SelectLabel>
                  {accountTypeEnum.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.accountType && <p className="text-red-500">{errors.accountType.message}</p>}
      </div>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}

      <Button variant="outline" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : "Add"}
      </Button>
    </form>
  );
}
