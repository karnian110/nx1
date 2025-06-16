'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { transactionSchema } from "@/lib/schemas";
import { expenseCategory, incomeCategory } from '@/lib/siteStates';
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
import axiosInstance from '@/lib/axiosInstance';
export default function RecordsForm({ accounts }) {
    const router = useRouter()
    //initialization of useForm
    const { register, control, watch, formState: { isSubmitting, errors }, handleSubmit } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type: 'income',
            accountId: "",
        }
    })
    const recordType = watch('type')
    //
    //Handle submit function
    const formSubmit = async (data) => {
        const urlEndpoint = `${process.env.NEXT_PUBLIC_SITE_URL}/api/records/add`
        const response = await axiosInstance.post(urlEndpoint, data)
        if (response.data.success) {
            router.refresh()
        }
    };
    //Handle submit function
    //
    return (
        <>
            <form onSubmit={handleSubmit(formSubmit)} >
                <div>
                    <label>
                        <input type="radio" value='income' {...register('type', { required: true })} />
                        Income
                    </label>
                    <label>
                        <input type="radio" value='expense' {...register('type', { required: true })} />
                        Expense
                    </label>
                    <label>
                        <input type="radio" value='transfer' {...register('type', { required: true })} />
                        Transfer
                    </label>
                </div>
                {/* Account */}
                <div>
                    <Label>{
                        errors.accountId ?
                            (<p className="text-red-500">{errors.accountId.message}</p>)
                            :
                            recordType === 'transfer' ? "From Account" : "Account"
                    }</Label>
                    <Controller
                        name="accountId"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                {/* Fallback to empty string just in case */}
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Accounts</SelectLabel>
                                        {accounts.map((acc, index) => (
                                            <SelectItem key={index} value={acc._id}>
                                                {acc.accountName}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                {/* Account */}
                {/* Transfer account */}
                <div>
                    {recordType === 'transfer' && (
                        <div>
                            <Label>{
                                errors.relatedAccount ?
                                    (<p className="text-red-500">{errors.relatedAccount.message}</p>)
                                    :
                                    'To Account'
                            }</Label>
                            <Controller
                                name="relatedAccount"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ""}>
                                        {/* Fallback to empty string just in case */}
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select account type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Accounts</SelectLabel>
                                                {accounts.map((acc, index) => (
                                                    <SelectItem key={index} value={acc._id}>
                                                        {acc.accountName}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    )}
                </div>
                {/* Transfer account */}
                <div>
                    <Label>{
                        errors.amount ?
                            (<p className="text-red-500">{errors.amount.message}</p>)
                            :
                            'Amount'
                    }</Label>
                    <Input
                        id="amount"
                        {...register("amount")}
                        type="text"
                        placeholder="Amount in BDT"
                    />
                </div>
                {recordType !== 'transfer' && (<div>
                    <Label>{
                        errors.category ?
                            (<p className="text-red-500">{errors.category.message}</p>)
                            :
                            'Category'
                    }</Label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                {/* Fallback to empty string just in case */}
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        //statement 1 
                                        recordType === 'income' && (
                                            Object.entries(incomeCategory).map(([objKey, objValueArray], index) => {
                                                return <div key={`${objKey}${index}`}>
                                                    <SelectGroup  >
                                                        <SelectLabel>{objKey}</SelectLabel>
                                                        {objValueArray.map((catName, index2) => (
                                                            <SelectItem key={`${index2}${catName}${objKey}`} value={catName}>
                                                                {catName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </div>
                                            })
                                        )
                                        //end of statement 1 
                                    }
                                    {
                                        //statement 1 
                                        recordType === 'expense' && (
                                            Object.entries(expenseCategory).map(([objKey, objValueArray], index) => {
                                                return <div key={`${objKey}${index}`}>
                                                    <SelectGroup  >
                                                        <SelectLabel>{objKey}</SelectLabel>
                                                        {objValueArray.map((catName, index2) => (
                                                            <SelectItem key={`${index2}${catName}${objKey}`} value={catName}>
                                                                {catName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </div>
                                            })
                                        )
                                        //end of statement 1 
                                    }
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>)}
                <div>
                    <Label>{
                        errors.description ?
                            (<p className="text-red-500">{errors.description.message}</p>)
                            :
                            'Description'
                    }</Label>
                    <Input
                        id="description"
                        {...register("description")}
                        type="text"
                        placeholder="Description"
                    />
                </div>
                <Button variant="outline" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Please wait..." : "Add"}
                </Button>
            </form >
        </>
    );
}