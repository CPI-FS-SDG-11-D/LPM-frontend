import { useSearchParams } from "react-router-dom";

import { TopHeader } from "../../components/header";

import Like from "../../assets/like.svg?react";
import AddBookmark from "../../assets/add-bookmark.svg?react";

import { Avatar } from "@mantine/core";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "../../configs/url";

type PostDetailData = {
  complaint: {
    _id: string;
    userID: string;
    title: string;
    description: string;
    status: string;
    totalUpvotes: number;
    totalDownvotes: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
};

export default function PostDetail() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");

  const postDetail = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: async () => {
      const data = await axios.get(`${SERVER_URL}/api/complaints/${postId}`);
      return data.data as PostDetailData;
    },
  });

  return (
    <div className=" h-[100vh] bg-[#f4f5f9]">
      <TopHeader />
      <main className="mr-10 pl-64 pt-16">
        {postDetail.isSuccess && (
          <div
            id="timeline-post-card"
            className="h-fit w-4/5 rounded-md bg-white px-6 py-4 shadow-sm"
          >
            <div className="flex flex-row items-center gap-1">
              <Avatar size={"lg"} />

              <div className="pl-2">
                <p className="font-semibold">Name Here</p>
                <p className="text-sm text-gray-500">1 jam lalu</p>
              </div>
            </div>

            <p className="px-2 py-4 text-xl font-semibold">
              {postDetail.data.complaint.title}
            </p>

            <p className="px-2 py-4">{postDetail.data.complaint.description}</p>
            <div className="flex flex-row items-center gap-2 pl-2 pt-4">
              <button type="button">
                <Like className="h-6 w-6 stroke-blue-500 " />
              </button>
              <p className="rounded bg-gray-200 p-1 text-sm ">
                {postDetail.data.complaint.totalUpvotes}
              </p>
              <button type="button" className="rotate-180">
                <Like className="h-6 w-6 stroke-red-500 " />
              </button>
              <button type="button">
                <AddBookmark />
              </button>
            </div>
          </div>
        )}
        {postDetail.isLoading && (
          <>
            <div className="h-40 w-4/5 animate-pulse rounded-md bg-gray-400 px-6 py-4 shadow-sm"></div>
          </>
        )}
      </main>
    </div>
  );
}
