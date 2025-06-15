'use client'
import axiosInstance from "@/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
export default function DeleteAccountBtn({ account }) {
    const router = useRouter()
    //useForm hook
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm()
    //
    const handleSubmitFunc = async () => {
        try {
            const endPoint = '/api/accounts/delete'
            const response = await axiosInstance.post(endPoint, account)
            console.log(response)
            if (response.data.success) {
                router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/u/accounts`)
            }
        } catch (err) {
            console.error('Something went wrong', err)
        }
    };
    //
    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitFunc)} >
                <Button variant={'destructive'} disabled={isSubmitting} type="submit" >{isSubmitting ? 'Please Wait' : 'Delete'}</Button>
            </form>
        </>
    );
}