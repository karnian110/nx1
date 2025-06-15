"use server";
import "server-only";
import { accountTypeEnum } from '@/lib/siteStates'
import { Settings2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,  // <- imported
  DialogTrigger,
} from "@/components/ui/dialog";
import db from "@/lib/db";
import { auth } from "@/auth";
import Account from "@/models/Account";
import EditAccountForm from "@/components/formComponents/EditAccountForm";
import AddAccount from "@/components/reusableComponent/AddAccount";
import SignOutButton from "@/components/SignoutBtn";
import EditAccount from "@/components/reusableComponent/EditAccount";
//Imports

export default async function page({ params, searchParams }) {
  try {
    const session = await auth()
    if (!session) {
      //Redirect to signin
    }
    const { _id } = session.user
    await db()
    const accountList = await Account.find({ userId: _id }) //VVI for security
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
