"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { addAccountSchema } from "@/lib/schemas";
import axiosInstance from "@/lib/axiosInstance";
//Imports
export default function EditAccountForm({ accountTypeEnum, account }) {
    console.log(account)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(addAccountSchema),
        defaultValues: {
            accountType: account.accountType,
            accountName: account.accountName,
            balance: account.balance,
        },
    });
    const formSubmit = async (data) => {
        const changedData = {}
        if (data.accountType !== account.accountType) { changedData["accountType"] = data.accountType }
        if (data.accountName !== account.accountName) { changedData["accountName"] = data.accountName }
        if (data.balance !== account.balance) { changedData["balance"] = data.balance }
        //When Data is not changed
        if (Object.keys(changedData).length === 0) { return }
        try {
            const endPoint = '/api/accounts/edit'
            const response = await axiosInstance.post(endPoint, { ...changedData, _id: account._id })
            if (response.data.success) {
                router.refresh()
            }
        } catch (err) {
            console.error('Something went wrong', err)
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
                {errors.accountName && (
                    <p className="text-red-500">{errors.accountName.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="balance">Balance</Label>
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
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            {/* Fallback to empty string just in case */}
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
                {errors.accountType && (
                    <p className="text-red-500">{errors.accountType.message}</p>
                )}
            </div>

            {errors.root && <p className="text-red-500">{errors.root.message}</p>}

            <Button variant="outline" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Please wait..." : "Save"}
            </Button>
        </form>
    );
}
