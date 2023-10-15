import { Link } from "react-router-dom";

import Arrow from "../assets/arrow-down.svg?react";
import AddBookmark from "../assets/add-bookmark.svg?react";

export function TimelinePostCard({ postId }: { postId: string }) {
  return (
    <div className="h-fit w-full rounded-md bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-row justify-between">
        <div className="pl-2">
          <p className="font-semibold">Name Here</p>
          <p className="text-sm text-gray-500">1 jam lalu</p>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p>Status : </p>
          <div className=" rounded bg-[#4c62f0] px-2 py-1 text-white">
            Belum Tuntas
          </div>
        </div>
      </div>
      <Link to={`/detail?id=${postId}`}>
        <p className="px-2 py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
          dolores expedita, repellat voluptatum repudiandae iste eveniet optio
          obcaecati vitae nulla! Cupiditate adipisci fugiat, autem magni
          reprehenderit pariatur corporis reiciendis enim!
        </p>
      </Link>
      <div className="flex flex-row gap-2 pl-2 pt-4">
        <button type="button" className="rotate-180">
          <Arrow className=" stroke-black stroke-2 transition-colors hover:stroke-blue-500 active:stroke-blue-600" />
        </button>
        <p className="rounded bg-gray-200 p-1 text-sm ">1,2k</p>
        <button type="button">
          <Arrow className="  stroke-black stroke-2 transition-colors hover:stroke-red-500 active:stroke-red-600" />
        </button>
        <button type="button">
          <AddBookmark className="" />
        </button>
      </div>
    </div>
  );
}
