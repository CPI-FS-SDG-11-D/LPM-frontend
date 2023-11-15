import {
  Link,
  useSearchParams,
  // useLocation,
  useNavigate,
} from "react-router-dom";
import { Image, Menu, Avatar } from "@mantine/core";

import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export function TopHeader() {
  const [searchParams] = useSearchParams();
  // const location = useLocation();
  const navigate = useNavigate();

  const [cookies, , removeCookie] = useCookies(["token", "profile"]);

  const [isLoggedIn, setIsLoggedin] = useState(
    cookies.profile != undefined || cookies.profile != null,
  );

  useEffect(() => {
    if (cookies.profile == undefined || cookies.profile == null) {
      setIsLoggedin(false);
    }
  }, [cookies.profile]);

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between rounded-lg bg-white px-20 shadow-sm">
      <div className="flex flex-row items-center gap-8">
        <Link to={"/"} className=" bg-[#4c62f0] px-2 py-2 text-white ">
          BR
        </Link>
        {/* {location.pathname === "/" && (
          <ul className="flex flex-row items-center  pb-2">
            <li>
              <button
                className={`rounded-lg px-3 py-1 underline-offset-8 ${
                  !searchParams.has("section")
                    ? "underline decoration-[#4c62f0] decoration-2"
                    : "decoration-2 hover:underline hover:decoration-blue-500"
                }  `}
                onClick={() => setSearchParams({})}
              >
                Berita Terkini
              </button>
            </li>
            <li>
              <button
                className={`rounded-lg px-3 py-1 underline-offset-8 ${
                  searchParams.has("section")
                    ? "underline decoration-[#4c62f0] decoration-2"
                    : "decoration-2 hover:underline hover:decoration-blue-500"
                }  `}
                onClick={() => setSearchParams({ section: "trending" })}
              >
                Sedang Tren
              </button>
            </li>
          </ul>
        )} */}
      </div>
      <form action="/jelajah" className="w-1/3 pl-10">
        <input
          type="text"
          name="cari"
          defaultValue={searchParams.get("cari") ?? ""}
          className="w-11/12 rounded-lg border-2 border-[#dbdeeb] py-2 pl-4 pr-8 outline-none focus-visible:border-[#4c62f0] "
          placeholder="Cari disini"
        />
        <button type="submit" className="invisible">
          Cari
        </button>
      </form>
      {/* {location.pathname !== "/" && (
        <form action="/jelajah" className="w-1/3">
          <input
            type="text"
            name="cari"
            defaultValue={searchParams.get("cari") ?? ""}
            className="w-11/12 rounded-lg border-2 border-[#dbdeeb] py-2 pl-4 pr-8 outline-none focus-visible:border-[#4c62f0] "
            placeholder="Cari disini"
          />
          <button type="submit" className="invisible">
            Cari
          </button>
        </form>
      )} */}

      <div className="flex items-center gap-4">
        {/* {location.pathname === "/" && (
          <form action="/jelajah">
            <input
              type="text"
              name="cari"
              className="rounded-lg border-2 border-[#dbdeeb] py-2 pl-4 pr-8 outline-none focus-visible:border-[#4c62f0] "
              placeholder="Cari disini"
            />
            <button type="submit" className="invisible">
              Cari
            </button>
          </form>
        )} */}
        {isLoggedIn ? (
          <Menu
            withArrow
            position="bottom-end"
            classNames={{
              arrow: "border border-blue-400",
              item: "hover:bg-gray-200",
            }}
          >
            <Menu.Target>
              <div className="flex cursor-pointer flex-row items-center gap-2">
                <p className="pointer-events-none">
                  Halo, {cookies?.profile?.username}
                </p>
                <Avatar size={"md"} src={cookies?.profile?.urlUser} />
                <Image src="./arrow-down.svg" alt="home" h={15} w={15} />
              </div>
            </Menu.Target>
            <Menu.Dropdown classNames={{ dropdown: "border border-blue-400" }}>
              <Menu.Item>
                <Link to={"/profile"}>Profile</Link>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  removeCookie("profile");
                  removeCookie("token");
                  navigate(0);
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <>
            <Link
              to={"/login"}
              className="rounded-lg bg-[#4c62f0] px-4 py-2 text-white"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="rounded-lg border border-[#dbdeeb] px-4 py-2 "
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
