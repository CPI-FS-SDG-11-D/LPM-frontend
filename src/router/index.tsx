import { SideNav } from "../components/navbar";
import { Image, Avatar, Menu } from "@mantine/core";

import { Link, useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams] = useSearchParams();

  return (
    <div className=" h-[300vh] bg-[#f4f5f9]">
      <SideNav />

      <main className="mr-10 h-full pl-64 pt-10">
        <TopHeader isLoggedin={false} />
        {!searchParams.has("section") ? (
          <p className="pt-6 text-4xl font-bold ">Ini Latest Home</p>
        ) : (
          <p className="pt-6 text-4xl font-bold ">Ini Trending Home</p>
        )}
      </main>
    </div>
  );
}

function TopHeader({ isLoggedin }: { isLoggedin: boolean }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <header className=" flex h-16 w-full items-center justify-between rounded-lg bg-white px-10 shadow-sm">
      <ul className="flex flex-row items-center gap-2">
        <li>
          <button
            className={`rounded-lg  px-3 py-1 ${
              !searchParams.has("section")
                ? "bg-[#4c62f0] text-white"
                : "hover:bg-blue-500"
            }  duration-150`}
            onClick={() => setSearchParams({})}
          >
            Latest
          </button>
        </li>
        <li>
          <button
            className={`rounded-lg  px-3 py-1 ${
              searchParams.has("section") ? "bg-[#4c62f0] text-white" : ""
            }  duration-150`}
            onClick={() => setSearchParams({ section: "trending" })}
          >
            Trending
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <input
          type="text"
          className="rounded-lg border-2 border-[#dbdeeb] px-4 py-2 outline-none focus-visible:border-[#4c62f0] "
          placeholder="Search"
        />
        {isLoggedin ? (
          <Menu withArrow>
            <Menu.Target>
              <div className="flex flex-row items-center gap-2">
                <Avatar size={"md"} />
                <Image src="./arrow-down.svg" alt="home" h={15} w={15} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <Link to={"/profile"}>Profile</Link>
              </Menu.Item>
              <Menu.Item>Logout</Menu.Item>
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
              to={"/signup"}
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
