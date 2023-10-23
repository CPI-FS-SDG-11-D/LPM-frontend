import { Link } from "react-router-dom";

import { Avatar } from "@mantine/core";

import Like from "../assets/like.svg?react";
import AddBookmark from "../assets/add-bookmark.svg?react";

type TimelinePostCardProps = {
  _id: string;
  title: string;
  description: string;
  keterangan?: string;
  username?: string;
  totalUpvotes?: number;
  status?: string;
  // downvotes: number;
  // vote_flag: string;
};

const defaultProps = {
  _id: "1",
  title: "Judul",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, incidunt. Ipsum doloribus, consequatur et praesentium itaque recusandae enim, quisquam ad voluptates obcaecati alias, aliquid expedita excepturi sed deleniti optio nam.",
  keterangan: "Keterangan",
  username: "Username",
  totalUpvotes: 0,

  vote_flag: "0",
};

export function TimelinePostCard({
  username = defaultProps.username,
  description = defaultProps.description,
  title = defaultProps.title,
  totalUpvotes = defaultProps.totalUpvotes,
  _id = defaultProps._id,
  status = "Belum Tuntas",
}: TimelinePostCardProps) {
  return (
    <div className="h-fit w-full rounded-md bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <Avatar size={"lg"} />

          <div className="pl-2">
            <p className="font-semibold">{username}</p>
            <p className="text-sm text-gray-500">1 jam lalu</p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p>Status : </p>
          <div className=" rounded bg-[#4c62f0] px-2 py-1 capitalize text-white">
            {status}
          </div>
        </div>
      </div>
      <Link to={`/detail?id=${_id}`}>
        <p className="px-2 py-4 text-xl font-semibold">{title}</p>

        <p className="truncate py-4 pl-2 pr-36">{description}</p>
      </Link>
      <div className="flex flex-row items-center gap-2 pl-2 pt-4">
        <button type="button">
          <Like className=" h-6 w-6  transition-colors hover:stroke-blue-500 active:stroke-blue-600" />
        </button>
        <p className="rounded bg-gray-200 p-1 text-sm ">{totalUpvotes}</p>
        <button type="button" className="rotate-180">
          <Like className=" h-6 w-6  transition-colors hover:stroke-red-500 active:stroke-red-600" />
        </button>
        <button type="button">
          <AddBookmark className="" />
        </button>
      </div>
    </div>
  );
}
