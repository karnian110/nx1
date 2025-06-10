'use server'
import 'server-only'
import getAllAccounts from '@/helpers/getAllAccounts';
import AddAccount from '@/components/reusableComponent/AddAccount';
import Link from 'next/link';
export default async function page({ params, searchParams }) {
  const accountList = await getAllAccounts()

  //UI return
  return (
    <>
      <div className='grid grid-cols-12 ' >
        <div className='col-start-1 col-end-4' >
          <h1>Accounts</h1>
          <AddAccount goto={`/accounts`} />
        </div>
        <ul className='col-start-4 col-end-10' >
          {accountList.map((e, i) => {
            return <Link key={e.reference} href={`${process.env.SITE_URL}/accounts/${e.reference}`} >
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
}