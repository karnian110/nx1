import { NextResponse } from "next/server";
import Account from "@/models/Account";
import db from "@/lib/db";
import { nanoid } from "nanoid";
const addAccount = async (data) => {
    try {
        await db()
        const newAccount = { ...data, reference: nanoid(16) }
        const res = await Account.findOneAndUpdate(
            {}, // find filter
            { $push: { accounts: newAccount } },
            { new: true, upsert: true }
        )
        return NextResponse.json({ success: true, message: 'Account added', timestamp: new Date().toISOString() },
            { status: 200 });
    } catch (err) {
        console.error('Something went wrong', err)
    }

}


export async function POST(req) {
    const data = await req.json()
    await addAccount(data)
    return NextResponse.json({ resData: {}, success: true, message: 'Request resolved', timestamp: new Date().toISOString() },
        { status: 200 });
}

export async function GET(req) {
    try {
        const res = await Account.findOne({}).select('accounts')
        const accountList = res.accounts
        return NextResponse.json({ resData: { accountList }, success: true, message: 'Request resolved', timestamp: new Date().toISOString() },
            { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, message: 'Internal server error', timestamp: new Date().toISOString() },
            { status: 500 });
    }
}