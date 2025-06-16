import { NextResponse } from "next/server";
import { transactionSchema } from "@/lib/schemas";
import { auth } from "@/auth";
import db from "@/lib/db";
import Transaction from "@/models/Transaction";
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
        const parsedData = await transactionSchema.safeParseAsync(rawData)

        //When input is wrong 0
        if (!parsedData.success) {
            return NextResponse.json({ resData: { ..._data }, success: false, code: 0, message: 'Invalid input', timestamp: new Date().toISOString() },
                { status: 400 });
        }
        const refinedData = parsedData.data
        //Input is correct
        if (refinedData.type === 'transfer') { refinedData.category = 'transfer' }
        //Doing transaction
        if (refinedData.type === 'transfer') {
            await Account.findOneAndUpdate(
                { userId: session.user._id, _id: refinedData.accountId },
                { $inc: { balance: refinedData.amount * -1 } },
            )
            await Account.findOneAndUpdate(
                { userId: session.user._id, _id: refinedData.relatedAccount },
                { $inc: { balance: refinedData.amount } },
            )
        }
        //Doing income
        if (refinedData.type === 'income') {
            await Account.findOneAndUpdate(
                { userId: session.user._id, _id: refinedData.accountId },
                { $inc: { balance: refinedData.amount } },
            )
        }
        //Going Expense
        if (refinedData.type === 'expense') {
            await Account.findOneAndUpdate(
                { userId: session.user._id, _id: refinedData.accountId },
                { $inc: { balance: refinedData.amount * -1 } },
            )
        }
        //
        await db()
        await Transaction.create({ ...refinedData, userId: session.user._id })
        return NextResponse.json({ resData: {}, success: true, code: 10, message: 'Record added', timestamp: new Date().toISOString() },
            { status: 200 });
        //Catch block
    } catch (err) {
        console.error('Something went wrong', err)
        return NextResponse.json({ resData: {}, success: false, code: 0, message: 'Internal server Error', timestamp: new Date().toISOString() },
            { status: 500 });
    }
}