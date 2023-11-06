import { NavLink } from "react-router-dom";
import { Image } from "@mantine/core";

export function SideNav() {
  return (
    <nav className="fixed top-32 ml-10 w-fit rounded bg-white pl-4 pr-4 pt-10 shadow-sm">
      {/* <h1 className="pr-14 text-2xl font-bold">LOGO HERE</h1> */}
      <ul className="flex w-full flex-col gap-2 pb-10  text-lg font-normal">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex w-full cursor-pointer flex-row place-items-center gap-2 rounded transition hover:bg-[#f4f5f9] ${
                isActive ? "bg-[#dbdeeb]" : "bg-white"
              } py-3 pl-4 pr-14`
            }
          >
            <Image src="./home.svg" alt="home" h={20} w={20} />
            <p>Beranda</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              `flex w-full cursor-pointer flex-row place-items-center gap-2 rounded transition hover:bg-[#f4f5f9] ${
                isActive ? "bg-[#dbdeeb]" : "bg-white"
              } py-3 pl-4 pr-14`
            }
          >
            <Image src="./user.svg" alt="home" h={20} w={20} />
            <p>Profil</p>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to={"/bookmark"}
            className={({ isActive }) =>
              `flex w-full cursor-pointer flex-row place-items-center gap-2 rounded transition hover:bg-[#dbdeeb] ${
                isActive ? "bg-[#f4f5f9]" : "bg-white"
              } py-3 pl-4 `
            }
          >
            <Image src="./bookmark.svg" alt="home" h={20} w={20} />
            <p className="text-base">Post Tersimpan</p>
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}
