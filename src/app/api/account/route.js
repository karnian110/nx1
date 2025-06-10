import { NextResponse } from "next/server";
import Account from "@/models/Account";
import db from "@/lib/db";
import { nanoid } from "nanoid";
//Imports

//Business Logic
//Adding account
const addAccount = async (data) => {
    try {
        await db()
        const newAccount = { ...data, reference: nanoid(16) }
        await Account.findOneAndUpdate(
            {}, // find filter
            { $push: { accounts: newAccount } },
            { new: true, upsert: true }
        )
        return true
    } catch (err) {
        console.error('Something went wrong', err)
        return false
    }

}
//Updating Account information
const updateAccountInfo = async (data) => {
    try {
        await db();

        const result = await Account.updateOne(
            {}, // ✅ Find doc containing that reference
            {
                $set: {
                    "accounts.$[filter].accountName": data.accountName,
                    "accounts.$[filter].balance": data.balance,
                    "accounts.$[filter].accountType": data.accountType,
                },
            },
            {
                arrayFilters: [{ "filter.reference": data.reference }],
                runValidators: true,
            }
        );

        if (result.modifiedCount === 0) {
            console.warn('No matching account found to update');
            return false;
        }

        return true;
    } catch (err) {
        console.error("Something went wrong", err);
        return false;
    }
};

//Route handlers
//POST
export async function POST(req) {
    const data = await req.json()
    try {
        await addAccount(data)
        return NextResponse.json({ success: true, message: 'Account added successfully', timestamp: new Date().toISOString() },
            { status: 200 });
    } catch (err) {
        console.error('Something went wrong', err)
    }
}

//GET
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

//Update
export async function PATCH(req) {
    const data = await req.json()
    try {
        await updateAccountInfo(data)
        return NextResponse.json({ success: true, message: 'Successfully updated', timestamp: new Date().toISOString() },
            { status: 200 });
    } catch (err) {
        console.error('Something went wrong', err)
        return NextResponse.json({success: false, message: 'Something went wrong', timestamp: new Date().toISOString() },
            { status: 500 });
    }
}