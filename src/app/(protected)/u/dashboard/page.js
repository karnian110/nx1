"use server";
import "server-only";
import AddAccount from "@/components/reusableComponent/AddAccount";
import SignOutButton from "@/components/SignoutBtn";
import EditAccount from "@/components/reusableComponent/EditAccount";
import myAllAccount from "@/controller/myAllAccount.controller";
//Imports

export default async function page({ params, searchParams }) {
  try {
    const accountList = await myAllAccount()
    return (
      <>
        <ul className="flex justify-around"  >
          {accountList.map((e, i) => (
            <li key={i} >
              <div>
                <div>
                  <h2>{e.accountName}</h2>
                  <EditAccount account={e} />
                </div>
                <p>BAL {e.balance}</p>
                <p>{e.accountType}</p>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <AddAccount />
        </div>
        <SignOutButton />
      </>
    );
  } catch (err) {
    console.error('Something went wrong', err)
  }
}
