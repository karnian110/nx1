"use server";
import "server-only";
import Link from "next/link";
import { navItems } from "@/siteStates";
export default async function Navbar({ params, searchParams }) {
  return (
    <>
      <nav>
        <ul className="flex justify-around" >
          {navItems.map((e, i) => {
            return (
              <li key={e}> {<Link href={`${process.env.SITE_URL}/${e.toLocaleLowerCase()}`}>{e}</Link>} </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
