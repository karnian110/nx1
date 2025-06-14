import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";
import Account from "@/models/Account";
export async function GET(req) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Something went wrong', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        const { _id } = session.user
        await db()
        const response = await Account.find({ userId: _id })
        console.log(response)
        return NextResponse.json({ resData: { response }, success: true, code: 10, message: 'Account Created', timestamp: new Date().toISOString() },
            { status: 200 });
        //Catch block
    } catch (err) {
        console.error('Something went wrong', err)
        return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Internal server Error', timestamp: new Date().toISOString() },
            { status: 500 });
    }
}