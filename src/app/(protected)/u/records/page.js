'use server'
import 'server-only'
import AddRecords from '@/components/reusableComponent/AddRecords';
export default async function page({ params, searchParams }) {
  return (
    <>
      <AddRecords />
    </>
  );
}