'use client'
import { useActionState } from 'react'
import { signOutAction } from '@/action/signOutAction'
import { Button } from '@/components/ui/button'
export default function SignOutButton() {
    const [state, Action, isPending] = useActionState(signOutAction, { success: false, error: null })
    return (
        <>
            <form action={Action} >
                <Button type='submit' disabled={isPending}>{isPending ? 'Please wait' : 'Sign Out'}</Button>
            </form>
        </>
    )
}
