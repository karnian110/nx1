import { NextResponse } from "next/server";
import { addAccountSchema } from '@/lib/schemas'
import { auth } from "@/auth";
import db from "@/lib/db";
import Account from "@/models/Account";
export async function POST(req) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Something went wrong', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        const __data = await req.json()
        //input validation check
        const _data = await addAccountSchema.safeParseAsync(__data)

        //When input is wrong 0
        if (!_data.success) {
            return NextResponse.json({ resData: { ..._data }, success: false, code: 0, message: 'Invalid input', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        //Input is correct
        const { accountName, accountType, balance } = _data.data
        const { _id } = session.user
        await db()
        await Account.create({
            accountName,
            accountType,
            balance,
            userId: _id
        })
        return NextResponse.json({ resData: {}, success: true, code: 10, message: 'Account Created', timestamp: new Date().toISOString() },
            { status: 200 });
        //Catch block
    } catch (err) {
        console.error('Something went wrong', err)
        return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Internal server Error', timestamp: new Date().toISOString() },
            { status: 500 });
    }
}