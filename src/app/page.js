"use server";
import Navbar from "@/components/Navbar";
import "server-only";
export default async function page({ params, searchParams }) {
  return (
    <>
      <Navbar />
    </>
  );
}
