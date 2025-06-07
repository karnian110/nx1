"use server";
import "server-only";
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
        <ul>
          {navItems.map((e, i) => {
            return <li key={e}>{e}</li>;
          })}
        </ul>
      </nav>
    </>
  );
}
