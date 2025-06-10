'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from '@/lib/schemas'
import { Eye, EyeOff } from 'lucide-react';
//Imports
export default function SignupForm() {
    //use state hook
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //use form hook 
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signupSchema)
    });
    //use form hook 
    //handleSubmitFunc
    const handleSubmitFunc = async (data) => {
        console.log(data)
    };
    //UI return
    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitFunc)}>
                <div className="grid" >
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        {...register('name')}
                        placeholder="Your full name"
                    />
                    {errors.name && (<p className="text-red-500" >{errors.name.message}</p>)}
                </div>
                <div className="grid" >
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        {...register('email')}
                        placeholder="you@example.com"
                    />
                    {errors.email && (<p className="text-red-500" >{errors.email.message}</p>)}
                </div>
                <div className="grid" >
                    <label htmlFor="password">Password</label>
                    <div>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            {...register('password')}
                            placeholder="Create a strong password"
                        />
                        <button
                            type="button"
                            onClick={() => { setShowPassword((pre) => { return !pre }) }}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {errors.password && (<p className="text-red-500" >{errors.password.message}</p>)}
                </div>
                <div className="grid" >
                    <label htmlFor="confirmPassword">Enter your password again</label>
                    <div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            {...register('confirmPassword')}
                            placeholder="Re-enter your password"

                        />
                        {errors.confirmPassword && (<p className="text-red-500" >{errors.confirmPassword.message}</p>)}
                        <button
                            type="button"
                            onClick={() => { setShowConfirmPassword((pre) => { return !pre }) }}
                        >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>
                <button type="submit">Signup</button>
            </form>
        </>
    );
}