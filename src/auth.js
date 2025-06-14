import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
    // Next auth takes an Object
    //Provider is 1st method which is an array
    providers: [
        // Provider takes list of methods as array element Credential is one of them
        Credentials({
            //Credentials takes authorize function as method
            authorize: async (credentials) => {
                const { name, email, _id } = credentials
                return { name, email, _id }
            },
            //

        }),
        // 2 nd provider may be google or git hub
    ],
    // after Provider it comes Callbacks, callback is 2 nd method of NextAuth object
    callbacks: {
        //this is 1st method of callback object : jwt
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name
                token.email = user.email
                token._id = user._id
            }
            return token
        },
        //this is 2nd method of callback object : session
        async session({ session, token }) {
            if (token) {
                session.user.email = token.email
                session.user._id = token._id
                session.user.name = token.name
            }
            return session
        }

    }
})