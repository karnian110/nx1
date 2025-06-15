'use server'
import myAccount from '@/controller/myAccount.controller'
import 'server-only'
export default async function page({ params, searchParams }) {
  const _params = await params
  const { accountID } = _params
  const accountDetails = await myAccount(accountID)
  if (!accountDetails) {
    throw new Error('The link is broken or can not be accessed')
  }
  return (
    <>
      <div>
        <div>Account Name : {accountDetails.accountName}</div>
        <div>Balance {accountDetails.balance}</div>
        <div>{accountDetails.accountType}</div>
      </div>
    </>
  );
}