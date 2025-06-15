"use server";
import "server-only";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,  // <- imported
    DialogTrigger,
} from "@/components/ui/dialog";
import DeleteAccountBtn from "@/components/DeleteAccountBtn";
export default async function DeleteAccount({ account }) {
    const _account = await account
    const plainAccount = { _id: _account._id.toString() }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure </DialogTitle>
                        <DialogDescription>
                            Account will be deleted permanently. Can not be recovered later.
                        </DialogDescription>
                    </DialogHeader>
                    <DeleteAccountBtn account={plainAccount} />
                </DialogContent>
            </Dialog>
        </>
    );
}