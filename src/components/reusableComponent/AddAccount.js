"use server";
import "server-only";
import { accountTypeEnum } from '@/siteStates'
import { Button } from "@/components/ui/button";
import { Settings2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,  // <- imported
    DialogTrigger,
} from "@/components/ui/dialog";
import AddAccountForm from "@/components/formComponents/AddAccountForm";
export default async function AddAccount({ goto }) {
    return (
        <>
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
                    <AddAccountForm accountTypeEnum={accountTypeEnum} goto={goto} />
                </DialogContent>
            </Dialog>
        </>
    );
}