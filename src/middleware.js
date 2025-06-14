import { NextResponse } from 'next/server'
import { auth } from '@/auth'

// Match exactly /signin or /signup
const authRoute = /^\/(signin|signup)$/

// Match /u and any subpaths like /u/dashboard, /u/settings
const protectedRoutes = /^\/u(\/.*)?$/

export async function middleware(request) {
    const pathname = request.nextUrl.pathname

    // Redirect root (/) to dashboard
    if (pathname === '/') { return NextResponse.redirect(new URL('/u/dashboard', request.url)) }

    const session = await auth()

    const isAuthRoute = authRoute.test(pathname)
    const isProtectedRoute = protectedRoutes.test(pathname)

    // User not logged in and trying to access a protected route
    if (!session && isProtectedRoute) { return NextResponse.redirect(new URL('/signin', request.url)) }

    // User already logged in and visiting auth page
    if (session && isAuthRoute) { return NextResponse.redirect(new URL('/u/dashboard', request.url)) }

    // Allow the request to continue
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',            // root redirect
        '/signin',      // login page
        '/signup',      // register page
        '/u/:path*'     // any /u route (including nested)
    ]
}
