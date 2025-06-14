import { NextResponse } from "next/server";
import User from "@/models/User";
import { signupSchema } from '@/lib/schemas'

import db from "@/lib/db";
import bcrypt from 'bcryptjs'
import { signIn } from "@/auth";

export async function POST(req) {
    try {
        const __data = await req.json()
        //input validation check
        const _data = await signupSchema.safeParseAsync(__data)

        //When input is wrong 0
        if (!_data.success) {
            return NextResponse.json({ resData: { ..._data }, success: false, code: 0, message: 'Invalid input', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        const { name, email, password } = _data.data
        //When Email is registered 1

        await db()
        const isUser = await User.findOne({ email })
        if (isUser) {
            return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Email already registered', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        //Now add to database
        const hPass = await bcrypt.hash(password, await bcrypt.genSalt(10))
        const res = await User.create({ name, email, passwordHash: hPass })
        await signIn('credentials', {
            redirect: false,
            name,
            email,
            _id: res._id
        });
        //when everything is ok
        return NextResponse.json({ resData: {}, success: true, code: 1, message: 'Sign in successful', timestamp: new Date().toISOString() },
            { status: 200 });
    } catch (err) {
        //when failed to login 3
        console.error('Something went wrong', err)
        return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Internal server error failed to sign up', timestamp: new Date().toISOString() },
            { status: 500 });
    }
    //End of post
}