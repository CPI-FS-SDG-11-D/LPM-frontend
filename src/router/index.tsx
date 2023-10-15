import { SideNav } from "../components/navbar";
import { TopHeader } from "../components/header";
import { TimelinePostCard } from "../components/cards";

import { Textarea } from "@mantine/core";

import { useSearchParams } from "react-router-dom";

import { useCookies } from "react-cookie";

export default function Home() {
  const [searchParams] = useSearchParams();

  const [cookies] = useCookies(["token"]);

  return (
    <div className=" h-full bg-[#f4f5f9] pb-8">
      <SideNav />

      <TopHeader />
      <main className="mr-10 h-full pl-64 pt-10">
        <div className="flex w-full flex-row gap-20 pt-6">
          <div className="flex w-4/5 flex-col gap-4 ">
            {cookies?.token != undefined && (
              <div className="h-fit w-full rounded-md bg-white px-6 py-4 shadow-sm">
                <div className="flex flex-row gap-2">
                  {/* <Avatar size={"lg"} /> */}
                  <Textarea
                    placeholder="Write here"
                    autosize
                    minRows={2}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    className=" rounded-lg bg-[#4c62f0] px-4 py-2 text-white"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            )}

            <TimelinePostCard postId="200" />
            <TimelinePostCard postId="300" />
            <TimelinePostCard postId="asdasdasd" />
            <TimelinePostCard postId="asd123sada" />

            {!searchParams.has("section") ? (
              <p className="text-4xl font-bold ">Ini Latest Home</p>
            ) : (
              <p className="text-4xl font-bold ">Ini Trending Home</p>
            )}
          </div>
          <div className="w-1/5 rounded bg-white shadow-sm"></div>
        </div>
      </main>
    </div>
  );
}
