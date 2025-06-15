'use server'

import { signOut } from '@/auth' // Auth.js / NextAuth v5
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { redirect } from 'next/navigation'

export async function signOutAction() {
  try {
    await signOut({ redirect: false })

    // Perform the redirect manually
    redirect(`${process.env.NEXT_PUBLIC_SITE_URL}`)
  } catch (err) {
    if (isRedirectError(err)) {
      throw err // Let Next.js handle redirect errors
    }

    console.error('Sign-out error:', err)
    return { success: false, error: err.message }
  }
}
