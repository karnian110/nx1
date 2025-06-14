'use server'
import 'server-only'
import db from '@/lib/db';
export default async function getAllAccounts() {
    await db()
    const uri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/account`;
    const res = await fetch(uri, {
        method: "GET",
        cache: "no-store",
    });
    const data = await res.json() ;  // parse JSON body
    if (data.success) {
        return data.resData.accountList
    } if (!data.success) {
        throw new Error()
    }
}