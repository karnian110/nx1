"use server";
import "server-only";
import Link from "next/link";
const navItems = [
  "Dashboard",
  "Accounts",
  "Records",
  "Analytics",
  "Investments",
  "Imports",
];
export default async function Navbar({ params, searchParams }) {
  return (
    <>
      <nav>
        <ul className="flex justify-around" >
          {navItems.map((e, i) => {
            return (
              <li key={e}> {<Link href={e.toLocaleLowerCase()}>{e}</Link>} </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
