"use server";
import AccountList from "@/components/AccountList";

import "server-only";
export default async function page({ params, searchParams }) {
  return (
    <>
      <div> this is from Dashboard </div>
      <AccountList />
    </>
  );
}
