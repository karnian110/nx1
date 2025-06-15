'use client'
import axiosInstance from "@/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from '@/lib/schemas';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function SignupForm() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signinSchema)
    });

    const handleSubmitFunc = async (data) => {
        const sign_up_end_point = '/api/authorize/signin'
        try {
            const response = await axiosInstance.post(sign_up_end_point, data)
            if (response.data.success === true) {
                router.push('/u/dashboard')
            }
        } catch (err) {
            const message = err?.response?.data?.message || "Signin failed";
            const code = err?.response?.data?.code
            if (code === 11) { setError('email', { type: "server", message }) }
            if (code === 13) { setError('password', { type: "server", message }) }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitFunc)} className="space-y-4">

                <div className="grid gap-1">
                    <label htmlFor="email">{errors.email ? <p className="text-red-500">{errors.email.message}</p> : "Email"}</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        {...register('email')}
                    />
                </div>

                <div className="grid gap-1">
                    <label htmlFor="password">{errors.password ? <p className="text-red-500">{errors.password.message}</p> : "Password"}</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a strong password"
                        {...register('password')}
                    />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Please wait..' : 'Sign In'}
                </Button>
            </form>
            <div>Don not have and account ? <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/signup`} >Signup</Link> here </div>
        </>

    );
}
