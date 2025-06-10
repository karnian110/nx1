import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        // 1 st provider
        Credentials({
            //Options for credential provider
            authorize: async (credentials) => {
                const { name, email } = credentials
                return { name, email }
            }
        }),
        // 2 nd provider may be google or git hub
    ]
})