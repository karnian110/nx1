'use server'
import 'server-only'
export default async function page({ params, searchParams }) {
    const {reference} = await params
    return (
        <>
            <div> {reference}  </div>
        </>
    );
}