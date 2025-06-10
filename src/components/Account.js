'use server'
import "server-only";
import { accountTypeEnum } from '@/siteStates'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,  // <- imported
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAccountForm from "@/components/formComponents/AddAccountForm";
import db from "@/lib/db";

// UI component
export default async function Account({ params, searchParams }) {
  await db()
  const uri = `${process.env.SITE_URL}/api/account`;
  const res = await fetch(uri, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();  // parse JSON body
  const accountList = data.resData.accountList
  //UI Return
  return (
    <>
      <ul className="flex justify-around"  >
        {accountList.map((e) => (
          <li key={e.reference} >
            <div>
              <h2>{e.accountName}</h2>
              <p>BAL {e.balance}</p>
              <p>{e.accountType}</p>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an account</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new account.
              </DialogDescription>
            </DialogHeader>
            <AddAccountForm accountTypeEnum={accountTypeEnum} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
