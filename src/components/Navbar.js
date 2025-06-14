"use server";
import "server-only";
import Link from "next/link";
import { navItems } from "@/lib/siteStates";
export default async function Navbar({ params, searchParams }) {
  return (
    <>
      <nav>
        <ul className="flex justify-around" >
          {navItems.map((e, i) => {
            return (
              <li key={e}> {<Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/u/${e.toLocaleLowerCase()}`}>{e}</Link>} </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
