'use server'
import 'server-only'
import Account from '@/models/Account';
import AddAccount from '@/components/reusableComponent/AddAccount';
import Link from 'next/link';
import db from '@/lib/db';
import { auth } from '@/auth';
export default async function page({ params, searchParams }) {
  try {
    const session = await auth()
    if (!session) {
      //Redirect to signin
    }
    const { _id } = session.user
    await db()
    const accountList = await Account.find({ userId: _id })
    //UI return
    return (
      <>
        <div className='grid grid-cols-12 ' >
          <div className='col-start-1 col-end-4' >
            <h1>Accounts</h1>
            <AddAccount/>
          </div>
          <ul className='col-start-4 col-end-10' >
            {accountList.map((e, i) => {
              return <Link key={i} href={`${process.env.NEXT_PUBLIC_SITE_URL}/u/accounts/${e._id}`} >
                <li className='flex justify-between' >
                  <div>{e.accountName}</div>
                  <div>{e.accountType}</div>
                  <div>{e.balance}</div>
                </li>
              </Link>
            })}
          </ul>
        </div>
      </>
    );
  } catch (err) {

  }
}