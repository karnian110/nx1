import { NextResponse } from "next/server";
import User from "@/models/User";
import { signinSchema } from '@/lib/schemas'
import db from "@/lib/db";
import bcrypt from 'bcryptjs'
import { signIn } from "@/auth";

export async function POST(req) {
    try {
        const __data = await req.json()
        //input validation check
        const _data = await signinSchema.safeParseAsync(__data)

        //When input is wrong 0
        if (!_data.success) {
            return NextResponse.json({ resData: { ..._data }, success: false, code: 0, message: 'Invalid input', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        //Input is correct
        const { email, password } = _data.data

        //is email exists

        await db()
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ resData: {}, success: false, code: 11, message: 'Email not found', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        //email found
        const isPass = await bcrypt.compare(password, user.passwordHash)
        if (!isPass) {
            return NextResponse.json({ resData: {}, success: false, code: 13, message: 'Invalid password', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        //Password also matched
        await signIn('credentials', {
            redirect: false,
            name: user.name,
            email,
            _id: user._id
        });
        return NextResponse.json({ resData: {}, success: true, code: 1, message: 'Login successful', timestamp: new Date().toISOString() },
            { status: 200 });
    } catch (err) {
        console.error('Something went wrong', err)
        return NextResponse.json({ resData: {}, success: false, code: 15, message: 'Internal server error', timestamp: new Date().toISOString() },
            { status: 500 });
    }
//END of POST
}