'use server'
import 'server-only'
import RecordsForm from '../formComponents/RecordsForm';
import myAllAccount from '@/controller/myAllAccount.controller';
import { serializeMongoDoc } from '@/lib/serializeMongoDoc';
export default async function AddRecords({ params, searchParams }) {
    const accountList = await myAllAccount()
    return (
        <>
            <RecordsForm accounts={serializeMongoDoc(accountList)} />

        </>
    );
}