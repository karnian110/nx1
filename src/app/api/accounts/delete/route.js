import { NextResponse } from "next/server";
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
        const rawData = await req.json()
        //input validation check
        if (!rawData?._id) {
            return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Invalid Input', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        //
        await db()
        const response = await Account.findOneAndDelete({ _id: rawData._id, userId: session.user._id })
        if (!response) {
            return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Failed to delete. Something went wrong', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        return NextResponse.json({ resData: {}, success: true, code: 10, message: 'Account Deleted', timestamp: new Date().toISOString() },
            { status: 200 });
        //Catch block
    } catch (err) {
        console.error('Something went wrong', err)
        return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Internal server Error', timestamp: new Date().toISOString() },
            { status: 500 });
    }
}