import { useSearchParams } from "react-router-dom";

import { TopHeader } from "../../components/header";

import Arrow from "../../assets/arrow-down.svg?react";
import AddBookmark from "../../assets/add-bookmark.svg?react";

export default function PostDetail() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  return (
    <div className=" h-[100vh] bg-[#f4f5f9]">
      <TopHeader isLoggedin={true} />
      <main className="mr-10 pl-64 pt-10">
        <div
          id="timeline-post-card"
          className="h-fit w-4/5 rounded-md bg-white px-6 py-4 shadow-sm"
        >
          <div className="pl-2">
            <p className="font-semibold">Name Here</p>
            <p className="text-sm text-gray-500">1 hour ago</p>
          </div>
          <p className="px-2 py-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
            dolores expedita, repellat voluptatum repudiandae iste eveniet optio
            obcaecati vitae nulla! Cupiditate adipisci fugiat, autem magni
            reprehenderit pariatur corporis reiciendis enim!
          </p>
          <div className="flex flex-row gap-2 pl-2 pt-4">
            <button type="button" className="rotate-180">
              <Arrow className=" stroke-blue-500 stroke-2" />
            </button>
            <p className="rounded bg-gray-200 p-1 text-sm ">1,2k</p>
            <button type="button">
              <Arrow className=" stroke-red-500 stroke-2" />
            </button>
            <button type="button">
              <AddBookmark />
            </button>
          </div>
        </div>

        <p>ini post dengan ID : {postId}</p>
      </main>
    </div>
  );
}
