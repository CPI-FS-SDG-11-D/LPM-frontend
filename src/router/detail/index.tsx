import { useSearchParams } from "react-router-dom";

import { TopHeader } from "../../components/header";
import NotFound from "../404";

import Like from "../../assets/like.svg?react";
// import AddBookmark from "../../assets/add-bookmark.svg?react";

import { Avatar, Image, Select, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { SERVER_URL } from "../../configs/url";
import { statusColors, statusTranslate } from "../../utils/statusUtilss";

import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";

import useVote from "../../hooks/useVote";

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

  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const [cookies] = useCookies(["token"]);

  const [upVote, downVote] = useVote(postId as string, cookies);

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

  const [status, setStatus] = useState(postDetail?.data?.complaint?.status);
  useEffect(() => {
    setStatus(postDetail?.data?.complaint?.status);
  }, [postDetail?.data?.complaint?.status]);

  // if (postDetail.isSuccess) console.log(postDetail?.data);

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
      // queryClient.invalidateQueries(["postDetail", postId]);
      notifications.show({
        title: "Berhasil",
        message: "status berhasil diubah",
        color: "teal",
        icon: <img src="/success.gif" alt="success" />,
      });
    },
  });

  const deletePost = useMutation({
    mutationFn: async () =>
      await axios.delete(`${SERVER_URL}/api/complaints/${postId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }),
    onSuccess: () => {
      notifications.show({
        title: "Berhasil",
        message: "aduan berhasil dihapus",
        // color: "white",
        icon: <img src="/success.gif" alt="success" />,
      });
      navigate("/");
    },
  });

  if (!postId) {
    return <NotFound />;
  }

  return (
    <div className=" min-h-[100vh] bg-[#f4f5f9] pb-8">
      <Modal opened={opened} onClose={close} title="Menghapus Aduan">
        <p className="py-4 font-semibold">Anda yakin ingin menghapus aduan?</p>
        <div className="flex flex-row justify-end gap-6 py-2">
          <button
            type="button"
            className="rounded border border-black px-2 py-1 "
            onClick={close}
          >
            Tutup
          </button>
          <button
            type="button"
            className="rounded bg-red-500 px-2 py-1 text-white disabled:opacity-50"
            onClick={() => {
              deletePost.mutate();
            }}
            disabled={deletePost.isLoading}
          >
            Hapus
          </button>
        </div>
      </Modal>

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
                  <p className="text-sm text-gray-500">
                    {dayjs(postDetail.data.complaint.createdAt).format(
                      "DD-MM-YYYY || HH:ss",
                    )}
                  </p>
                </div>
              </div>
              {postDetail.data.isComplaintOwner ? (
                <div className="flex w-56 flex-row-reverse justify-between gap-3">
                  <Select
                    allowDeselect={false}
                    onChange={(e) => {
                      updateStatus.mutate(e as string);
                      setStatus(e as "pending" | "in progress" | "resolved");
                    }}
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
                    // w={"15%"}
                    classNames={{
                      input: "border-[#4c62f0]",
                      dropdown: "border-[#4c62f0]",
                      option:
                        "hover:bg-[#4c62f0] hover:text-white transition-all",
                    }}
                    className="w-2/3"
                  />

                  <button
                    type="button"
                    onClick={open}
                    className={`${
                      status != "pending" && "hidden"
                    } w-1/3 rounded bg-red-500 px-2 py-1 text-white`}
                  >
                    Hapus
                  </button>
                </div>
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
            {postDetail.data.complaint.urlComplaint != "null" && (
              <Image src={postDetail.data.complaint.urlComplaint} />
            )}
            <div className="flex flex-row items-center gap-2 pl-2 pt-4">
              <button
                type="button"
                className="group"
                disabled={cookies?.token == undefined}
                onClick={() => upVote.mutate()}
              >
                <Like
                  className={`h-6 w-6 transition-colors group-enabled:hover:stroke-blue-500 ${
                    postDetail.data.feedback.is_upvote && "stroke-blue-600"
                  }`}
                />
              </button>

              <p className="rounded bg-gray-200 p-1 text-sm ">
                {postDetail.data.complaint.totalUpvotes}
              </p>
              <button
                type="button"
                className="group rotate-180"
                disabled={cookies?.token == undefined}
                onClick={() => downVote.mutate()}
              >
                <Like
                  className={`h-6 w-6 transition-colors group-enabled:hover:stroke-red-500 ${
                    postDetail?.data?.feedback?.is_downvote && "stroke-red-600"
                  }`}
                />
              </button>
              {/* <button type="button">
                <AddBookmark />
              </button> */}
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
