import { useSearchParams } from "react-router-dom";

import { TopHeader } from "../../components/header";

import Like from "../../assets/like.svg?react";
import AddBookmark from "../../assets/add-bookmark.svg?react";

import { Avatar, Image, Select } from "@mantine/core";

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useCookies } from "react-cookie";

import { SERVER_URL } from "../../configs/url";
import { statusColors, statusTranslate } from "../../utils/statusUtilss";

type PostDetailData = {
  username: string;
  urlUser: string;
  complaint: {
    _id: string;
    userID: string;
    title: string;
    description: string;
    status: "pending" | "in progress" | "resolved";
    totalUpvotes: number;
    totalDownvotes: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
    urlComplaint: string;
  };
  isComplaintOwner: boolean;
  feedback: {
    is_upvote: boolean;
    is_downvote: boolean;
  };
};

export default function PostDetail() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");

  const queryClient = useQueryClient();

  const [cookies] = useCookies(["token"]);

  const postDetail = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: async () => {
      const data = await axios.get(`${SERVER_URL}/api/complaints/${postId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return data.data as PostDetailData;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async (status: string) => {
      const res = await axios.put(
        `${SERVER_URL}/api/complaints/${postId}/update-status`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      return res.data;
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postDetail", postId]);
    },
  });

  return (
    <div className=" min-h-[100vh] bg-[#f4f5f9] pb-8">
      <TopHeader />
      <main className="mr-10 pl-64 pt-16">
        {postDetail.isSuccess && (
          <div
            id="timeline-post-card"
            className="h-fit w-4/5 rounded-md bg-white px-6 py-4 shadow-sm"
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-1">
                <Avatar size={"lg"} src={postDetail?.data?.urlUser} />

                <div className="pl-2">
                  <p className="font-semibold">{postDetail?.data?.username}</p>
                  <p className="text-sm text-gray-500">1 jam lalu</p>
                </div>
              </div>
              {postDetail.data.isComplaintOwner ? (
                <Select
                  allowDeselect={false}
                  onChange={(e) => updateStatus.mutate(e as string)}
                  data={[
                    {
                      value: "resolved",
                      label: "Selesai",
                    },
                    {
                      value: "in progress",
                      label: "Dalam Proses",
                    },
                    {
                      value: "pending",
                      label: "Menunggu",
                    },
                  ]}
                  defaultValue={postDetail.data.complaint.status}
                  w={"15%"}
                  classNames={{
                    input: "border-[#4c62f0]",
                    dropdown: "border-[#4c62f0]",
                    option:
                      "hover:bg-[#4c62f0] hover:text-white transition-all",
                  }}
                />
              ) : (
                <div
                  className={`rounded px-3 py-2 capitalize text-white ${
                    statusColors[postDetail.data.complaint.status]
                  }`}
                >
                  {statusTranslate[postDetail.data.complaint.status]}
                </div>
              )}
            </div>

            <p className="px-2 py-4 text-xl font-semibold">
              {postDetail.data.complaint.title}
            </p>

            <p className="px-2 py-4">{postDetail.data.complaint.description}</p>
            <Image src={postDetail.data.complaint.urlComplaint} />
            <div className="flex flex-row items-center gap-2 pl-2 pt-4">
              <button type="button">
                <Like
                  className={`h-6 w-6 transition-colors hover:stroke-blue-500 ${
                    postDetail?.data?.feedback?.is_upvote && "stroke-blue-600"
                  }`}
                />
              </button>
              <p className="rounded bg-gray-200 p-1 text-sm ">
                {postDetail.data.complaint.totalUpvotes}
              </p>
              <button type="button" className="rotate-180">
                <Like
                  className={`h-6 w-6 transition-colors hover:stroke-red-500 ${
                    postDetail?.data?.feedback?.is_downvote && "stroke-red-600"
                  }`}
                />
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
