"use server";
import "server-only";
import db from "@/lib/db";
import { auth } from "@/auth";
import Account from "@/models/Account";

export default async function myAllAccount() {
    try {
        const session = await auth()
        if (!session) { return false }
        const { _id } = session.user
        await db()
        return await Account.find({ userId: _id }).lean() //VVI for security
    } catch (err) {
        console.error('Something went wrong', err)
        return false
    }
}