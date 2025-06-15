'use server'
import { auth } from "@/auth"
import db from "@/lib/db"
import Account from "@/models/Account"

const myAccount = async (accountID) => {
    try {
        const session = await auth()
        await db()
        const response = await Account.findOne({ _id: accountID, userId: session.user._id }); //VVI for security
        if (!response) { return false }
        //Second Layer check
        if (response.userId.toString() === session.user._id.toString()) { return response }
        return false
    } catch (err) {
        console.error('Something went wrong', err)
        return false
    }
}

export default myAccount