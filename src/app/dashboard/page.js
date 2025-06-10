"use server";
import "server-only";
import { accountTypeEnum } from '@/siteStates'
import { Settings2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,  // <- imported
  DialogTrigger,
} from "@/components/ui/dialog";
import getAllAccounts from "@/helpers/getAllAccounts";
import EditAccountForm from "@/components/formComponents/EditAccountForm";
import AddAccount from "@/components/reusableComponent/AddAccount";
//Imports

export default async function page({ params, searchParams }) {
  const accountList = await getAllAccounts()
  //UI Return
  return (
    <>
      <ul className="flex justify-around"  >
        {accountList.map((e) => (
          <li key={e.reference} >
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
        <AddAccount goto={'/dashboard'} />
      </div>
    </>
  );
}
