import { Link } from "react-router-dom";

import { Avatar, Image } from "@mantine/core";

import Like from "../assets/like.svg?react";
import AddBookmark from "../assets/add-bookmark.svg?react";

import { statusColors, statusTranslate } from "../utils/statusUtilss";

import dayjs from "dayjs";
import { useCookies } from "react-cookie";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../configs/url";

type TimelinePostCardProps = {
  _id: string;
  title: string;
  description: string;
  keterangan?: string;
  username?: string;
  totalUpvotes?: number;
  status?: "pending" | "in progress" | "resolved";
  createdAt: string;
  imageUrl?: string | null;
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
  status = "pending",
  createdAt,
  imageUrl = null,
}: TimelinePostCardProps) {
  const [cookies] = useCookies(["token"]);

  const queryClient = useQueryClient();

  const upVote = useMutation({
    mutationFn: async () => {
      const res = await axios.put(`${SERVER_URL}/api/upvote/${_id}`, null, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return res.status;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allComplaints", "search"]);
    },
  });

  return (
    <div className="h-fit w-full rounded-md bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <Avatar size={"lg"} />

          <div className="pl-2">
            <p className="font-semibold">{username}</p>
            <p className="text-sm text-gray-500">
              {dayjs(createdAt).format("DD-MM-YYYY || HH:ss")}
            </p>
            {/* <p>{createdAt}</p> */}
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p>Status : </p>
          <div
            className={` rounded px-2 py-1 capitalize text-white ${statusColors[status]}`}
          >
            {statusTranslate[status]}
          </div>
        </div>
      </div>
      <Link to={`/detail?id=${_id}`}>
        <p className="px-2 py-4 text-xl font-semibold">{title}</p>

        <p className="truncate py-4 pl-2 pr-36">{description}</p>
        <div className="max-h-20">
          <Image src={imageUrl} className="h-full object-contain" />
        </div>
      </Link>
      <div className="flex flex-row items-center gap-2 pl-2 pt-4">
        <button
          className="group"
          disabled={cookies?.token == undefined}
          type="button"
          onClick={() => upVote.mutate()}
        >
          <Like className=" h-6 w-6 transition-colors group-enabled:hover:stroke-blue-500 group-enabled:active:stroke-blue-600" />
        </button>
        <p className="cursor-default rounded bg-gray-200 p-1 text-sm">
          {totalUpvotes}
        </p>
        <button
          type="button"
          disabled={cookies?.token == undefined}
          className="group rotate-180"
        >
          <Like className=" h-6 w-6  transition-colors group-enabled:hover:stroke-red-500 group-enabled:active:stroke-red-600" />
        </button>
        <button type="button">
          <AddBookmark className="" />
        </button>
      </div>
    </div>
  );
}
