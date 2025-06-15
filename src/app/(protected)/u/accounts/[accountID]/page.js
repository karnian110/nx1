'use server'
import DeleteAccount from '@/components/reusableComponent/DeleteAccount'
import EditAccount from '@/components/reusableComponent/EditAccount'
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
        <ul>
          <li>Account Name : {accountDetails.accountName}</li>
          <li>Balance {accountDetails.balance}</li>
          <li>{accountDetails.accountType}</li>
        </ul>
        <div>
          <EditAccount account={accountDetails} />
          <DeleteAccount account={accountDetails} />
        </div>
      </div>
    </>
  );
}