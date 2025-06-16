'use server'
import 'server-only'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,  // <- imported
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import RecordsForm from '../formComponents/RecordsForm';
import myAllAccount from '@/controller/myAllAccount.controller';
import { serializeMongoDoc } from '@/lib/serializeMongoDoc';
export default async function AddRecords({ params, searchParams }) {
    const accountList = await myAllAccount()
    return (
        <>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Record</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New record</DialogTitle>
                        <DialogDescription>
                            Add details of your record.
                        </DialogDescription>
                    </DialogHeader>
                    <RecordsForm accounts={serializeMongoDoc(accountList)} />
                </DialogContent>
            </Dialog>
        </>
    );
}