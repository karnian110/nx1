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
//Imports

export default async function page({ params, searchParams }) {
  try {
    const session = await auth()
    if (!session) {
      //Redirect to signin
    }
    const { _id } = session.user
    await db()
    const accountList = await Account.find({ userId: _id })
    return (
      <>
        <ul className="flex justify-around"  >
          {accountList.map((e, i) => (
            <li key={i} >
              <div>
                <div className="flex justify-around" >
                  <h2>{e.accountName}</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Settings2 className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit your account</DialogTitle>
                        <DialogDescription>
                          {/* Reference number of this account */}
                        </DialogDescription>
                      </DialogHeader>
                      <EditAccountForm
                        accountTypeEnum={accountTypeEnum}
                        previousData={
                          {
                            accountName: e.accountName,
                            balance: e.balance,
                            accountType: e.accountType,
                            reference: e.reference
                          }
                        }
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <p>BAL {e.balance}</p>
                <p>{e.accountType}</p>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <AddAccount goto={`${process.env.NEXT_PUBLIC_SITE_URL}/u/dashboard`} />
        </div>
        <SignOutButton />
      </>
    );
  } catch (err) {
    console.error('Something went wrong', err)
  }
}
