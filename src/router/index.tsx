import { SideNav } from "../components/navbar";
import { TopHeader } from "../components/header";
import { TimelinePostCard } from "../components/cards";
import "../App.css";

import { useState, useEffect } from "react";

import { Textarea, Avatar, Image, FileInput } from "@mantine/core";

// import { useSearchParams } from "react-router-dom";

import { useCookies } from "react-cookie";

import axios from "axios";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useInView } from "react-intersection-observer";

import { AllComplaints, ViralComplaints } from "../types/home.type";

import { SERVER_URL } from "../configs/url";

export default function Home() {
  // const [searchParams] = useSearchParams();

  const [cookies] = useCookies(["token"]);

  const infiniteComplaints = useInfiniteQuery({
    queryKey: ["infiniteComplaints"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${SERVER_URL}/api/complaints?page=${pageParam}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );

      return response.data.complaints as AllComplaints[];
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 5) {
        return undefined;
      }

      return pages.length + 1;
    },
  });

  const [ref] = useInView({
    onChange: (inView) => {
      if (inView) {
        infiniteComplaints.fetchNextPage();
      }
    },
  });

  return (
    <div className="min-h-[100vh] bg-[#f4f5f9] pb-8">
      {cookies?.token != undefined && <SideNav />}

      <TopHeader />
      <main className="mr-10 h-full pl-64 pt-10">
        <div className="flex w-full flex-row gap-4 pt-6">
          <div className="flex w-4/5 flex-shrink-0 flex-col gap-4 ">
            {cookies?.token != undefined && <CreatePost />}

            {infiniteComplaints.isSuccess &&
              infiniteComplaints.data.pages.map((data) => {
                return data.map((complaint, index) => {
                  return (
                    <TimelinePostCard
                      key={index}
                      _id={complaint.complaint._id}
                      description={complaint.complaint.description}
                      title={complaint.complaint.title}
                      totalUpvotes={complaint.complaint.totalUpvotes}
                      status={complaint.complaint.status}
                      username={complaint.username}
                      createdAt={complaint.complaint.createdAt}
                      imageUrl={complaint.complaint.urlComplaint}
                      profileImageUrl={complaint.urlUser}
                      is_upvote={complaint.feedback.is_upvote}
                      is_downvote={complaint.feedback.is_downvote}
                    />
                  );
                });
              })}
            {infiniteComplaints.isLoading && (
              <>
                <div className="h-52 w-full animate-pulse rounded-md bg-gray-400"></div>
                <div className="h-52 w-full animate-pulse rounded-md bg-gray-400"></div>
                <div className="h-52 w-full animate-pulse rounded-md bg-gray-400"></div>
              </>
            )}

            {/* <button
              type="button"
              onClick={() => infiniteComplaints.fetchNextPage()}
              disabled={!infiniteComplaints.hasNextPage}
              className={`${
                infiniteComplaints.isLoading && "invisible"
              } transition hover:text-[#4c62f0]`}
            >
              {infiniteComplaints.isFetchingNextPage
                ? "Memuat..."
                : infiniteComplaints.hasNextPage
                ? "Klik untuk lihat lebih banyak"
                : "Akhir dari halaman"}
            </button> */}
            <p
              ref={ref}
              className={`${
                infiniteComplaints.isLoading && "invisible"
              } text-center transition hover:text-[#4c62f0]`}
            >
              {infiniteComplaints.isFetchingNextPage
                ? "Memuat lebih banyak..."
                : infiniteComplaints.hasNextPage
                ? ""
                : "Akhir dari halaman"}
            </p>

            {/* {!searchParams.has("section") ? (
              <p className="text-4xl font-bold ">Ini Latest Home</p>
            ) : (
              <p className="text-4xl font-bold ">Ini Trending Home</p>
            )} */}
          </div>

          <ViralComplaints />
        </div>
      </main>
    </div>
  );
}

import { notifications } from "@mantine/notifications";

type CreatePostProps = {
  title: string;
  description: string;
  urlComplaint?: string;
};

function CreatePost() {
  const [post, setPost] = useState<CreatePostProps>({
    title: "",
    description: "",
  });

  const [cookies] = useCookies(["token", "profile"]);

  const queryClient = useQueryClient();

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(photo);
    } else {
      setPhotoUrl(null);
    }
    return () => {
      setPhotoUrl(null);
    };
  }, [photo]);

  const uploadPhoto = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("image", photo as Blob);
      const response = await axios.post(
        `${SERVER_URL}/api/upload-complaint`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      return response.data;
    },
    onError: () => alert("Upload foto gagal"),
    onSuccess: (data) => {
      // alert("Upload foto berhasil");
      // console.log(data);
      createPost.mutate(data.urlComplaint);
    },
  });

  const createPost = useMutation({
    mutationFn: async (urlComplaint) => {
      let postData = { ...post };
      if (typeof urlComplaint == "string") {
        postData = { ...post, urlComplaint };
      }
      const response = await axios.post(
        `${SERVER_URL}/api/complaints`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      return response.data;
    },
    onError: () => alert("Terjadi kesalahan"),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["infiniteComplaints"]);
      setPost({ title: "", description: "" });
      setPhoto(null);
      notifications.show({
        title: "Berhasil",
        message: "Aduan berhasil dibuat",
        color: "white",
        icon: <img src="/success.gif" alt="success" />,
      });
    },
  });

  return (
    <div className="h-fit w-full rounded-md bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-row gap-2">
        <Avatar size={"lg"} src={cookies.profile.urlUser} />
        <div className="flex w-full flex-col gap-2">
          <Textarea
            placeholder="Tulis judul aduan disini"
            value={post.title}
            autosize
            minRows={1}
            style={{ width: "100%" }}
            classNames={{ input: "text-xl font-semibold" }}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

          <Textarea
            placeholder="Tulis deskripsi aduan disini"
            value={post.description}
            autosize
            minRows={2}
            style={{ width: "100%" }}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
          <div className="max-h-96">
            {photoUrl && (
              <Image src={photoUrl} className="h-full object-contain" />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 pt-4">
        <FileInput
          value={photo}
          onChange={setPhoto}
          placeholder="Tambah foto"
          accept="image/png,image/jpeg"
          clearable
          clearButtonProps={{ "aria-label": "Remove photo" }}
          classNames={{ input: "border-[#4c62f0]" }}
        />
        <button
          type="button"
          className=" rounded-lg bg-[#4c62f0] px-4 py-2 text-white disabled:opacity-90"
          // onClick={() => createPost.mutate()}
          onClick={() => {
            if (photo === null) {
              createPost.mutate();
            } else {
              uploadPhoto.mutate();
            }
          }}
          disabled={createPost.isLoading || uploadPhoto.isLoading}
        >
          {createPost.isLoading || uploadPhoto.isLoading ? (
            <Image
              src="./spinner.svg"
              alt="loading"
              className="h-6 w-6 animate-spin "
            />
          ) : (
            "Buat Aduan"
          )}
        </button>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

function ViralComplaints() {
  const complaintsFetch = useQuery({
    queryKey: ["viralComplaints"],
    queryFn: async () => {
      const response = await axios.get(`${SERVER_URL}/api/complaints/viral`);
      return response.data as ViralComplaints;
    },
  });
  return (
    <div className="h-fit w-1/5 rounded bg-white px-4 py-6 shadow-sm">
      <p className="border-b-2 border-b-[#4c62f0] text-lg font-medium">
        Anda Mungkin Tertarik :{" "}
      </p>
      <ul className="flex flex-col items-center gap-4 pt-4">
        {complaintsFetch.isSuccess &&
          complaintsFetch.data.virals.map((complaint) => {
            return (
              <li key={complaint._id} className="w-full">
                <Link
                  to={`/detail?id=${complaint._id}`}
                  className="flex flex-row gap-3"
                >
                  <div className=" h-8 w-12 flex-shrink-0 rounded bg-[#4c62f0] px-1 text-center text-white">
                    {complaint.totalUpvotes}
                  </div>
                  <p>{complaint.title}</p>
                </Link>
              </li>
            );
          })}
        {complaintsFetch.isLoading && (
          <>
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-400"></div>
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-400"></div>
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-400"></div>
          </>
        )}
      </ul>
    </div>
  );
}
