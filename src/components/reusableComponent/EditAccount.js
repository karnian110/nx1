'use server'
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
import EditAccountForm from "@/components/formComponents/EditAccountForm";
export default async function EditAccount({account }) {
    const _account = await account
    const plainAccount = {
        _id: _account._id.toString(),
        accountName: _account.accountName,
        accountType: _account.accountType,
        balance: _account.balance
    }
    return (
        <>
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
                        account={plainAccount}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}