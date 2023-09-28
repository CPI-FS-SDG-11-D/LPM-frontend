import { NavLink } from "react-router-dom";
import { Image } from "@mantine/core";

export function SideNav() {
  return (
    <nav className="fixed ml-10 h-96 w-fit  rounded bg-white py-10 pl-4 pr-4 shadow-md">
      <h1 className="pr-14 text-2xl font-bold">LOGO HERE</h1>
      <ul className="flex w-full flex-col gap-2 pt-8 text-lg font-normal">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex w-full cursor-pointer flex-row place-items-center gap-2 rounded transition hover:bg-[#dbdeeb] ${
                isActive ? "bg-[#f4f5f9]" : "bg-white"
              } py-3 pl-4`
            }
          >
            <Image src="./home.svg" alt="home" h={20} w={20} />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              `flex w-full cursor-pointer flex-row place-items-center gap-2 rounded transition hover:bg-[#dbdeeb] ${
                isActive ? "bg-[#f4f5f9]" : "bg-white"
              } py-3 pl-4`
            }
          >
            <Image src="./user-square.svg" alt="home" h={20} w={20} />
            <p>Profile</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
