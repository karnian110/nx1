import { NextResponse } from "next/server";
import User from "@/models/User";
import { signupSchema } from '@/lib/schemas'
import db from "@/lib/db";
import bcrypt from 'bcryptjs'
import { signIn } from "@/auth";
//Handlers
export async function POST(req) {
    const __data = await req.json()
    //input validation check
    const _data = await signupSchema.safeParseAsync(__data)

    //When input is wrong 0
    if (!_data.success) {
        return NextResponse.json({ response: { ..._data }, errorcode: 0, success: false, message: 'WrongInput', timestamp: new Date().toISOString() },
            { status: 400 });
    }
    const { name, email, password } = _data.data
    //When Email is registered 1
    try {
        await db()
        const isUser = await User.findOne({ email })
        if (isUser) {
            return NextResponse.json({ success: false, errorcode: 1, message: 'Email already registered', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        //Now add to database
        const hPass = await bcrypt.hash(password, await bcrypt.genSalt(10))
        await User.create({ name, email, password: hPass })
        await signIn('credentials', {
            redirect: false,
            name,
            email,
            password: hPass,
        });
        //when everything is ok
        return NextResponse.json({ success: true, message: 'Sussecfully registered', timestamp: new Date().toISOString() },
            { status: 200 });
    } catch (err) {
        //when failed to login 3
        console.error('Something went wrong', err)
        return NextResponse.json({ success: false, errorcode: 3, message: 'Failed so signup', timestamp: new Date().toISOString() },
            { status: 400 });
    }
}