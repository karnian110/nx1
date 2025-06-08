'use server'
import "server-only";
import {accountTypeEnum} from '@/models/Accounts'
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAccountForm from "@/components/highlevelComponents/AddAccountForm";
//Imports
const accountList = [
  { name: "Cash", balance: 0, accountType: "General", reference: nanoid(16) },
];

//UI return
export default async function AccountList({ params, searchParams }) {
  return (
    <>
      <ul>
        {accountList.map((e, i) => {
          return (
            <li key={e.reference}>
              <div>
                <h2>{e.name}</h2>
                <p>BAL {e.balance}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an account</DialogTitle>
            </DialogHeader>
            <AddAccountForm accountTypeEnum={accountTypeEnum} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
