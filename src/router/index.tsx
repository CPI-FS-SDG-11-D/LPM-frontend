import { SideNav } from "../components/navbar";
import { TopHeader } from "../components/header";
import { TimelinePostCard } from "../components/cards";

import { Textarea, Avatar, Image } from "@mantine/core";

import { useSearchParams } from "react-router-dom";

import { useCookies } from "react-cookie";

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { AllComplaints, ViralComplaints } from "../types/home.type";

import { SERVER_URL } from "../configs/url";

export default function Home() {
  const [searchParams] = useSearchParams();

  const [cookies] = useCookies(["token"]);

  const allComplaints = useQuery({
    queryKey: ["allComplaints"],
    queryFn: async () => {
      const response = await axios.get(`${SERVER_URL}/api/complaints`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return response.data as AllComplaints;
    },
  });

  return (
    <div className=" min-h-[100vh] bg-[#f4f5f9] pb-8">
      <SideNav />

      <TopHeader />
      <main className="mr-10 h-full pl-64 pt-10">
        <div className="flex w-full flex-row gap-4 pt-6">
          <div className="flex w-4/5 flex-shrink-0 flex-col gap-4 ">
            {cookies?.token != undefined && <CreatePost />}

            {allComplaints.isSuccess &&
              allComplaints.data.complaints.map((complaint, index) => {
                return (
                  <TimelinePostCard
                    key={index}
                    _id={complaint._id}
                    description={complaint.description}
                    title={complaint.title}
                    totalUpvotes={complaint.totalUpvotes}
                    status={complaint.status}
                    username={complaint.username}
                  />
                );
              })}

            {allComplaints.isLoading && (
              <>
                <div className="h-52 w-full animate-pulse rounded-md bg-gray-400"></div>
                <div className="h-52 w-full animate-pulse rounded-md bg-gray-400"></div>
                <div className="h-52 w-full animate-pulse rounded-md bg-gray-400"></div>
              </>
            )}

            {/* <TimelinePostCard />
            <TimelinePostCard />
            <TimelinePostCard />
            <TimelinePostCard /> */}

            {!searchParams.has("section") ? (
              <p className="text-4xl font-bold ">Ini Latest Home</p>
            ) : (
              <p className="text-4xl font-bold ">Ini Trending Home</p>
            )}
          </div>
          {/* <div className="max-h-80 w-1/5 rounded bg-white shadow-sm"></div> */}
          <ViralComplaints />
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";

function CreatePost() {
  const [post, setPost] = useState({});

  const [cookies] = useCookies(["token"]);

  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${SERVER_URL}/api/complaints`, post, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return response.data;
    },
    onError: () => alert("Terjadi kesalahan"),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["allComplaints"]);
    },
  });

  return (
    <div className="h-fit w-full rounded-md bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-row gap-2">
        <Avatar size={"lg"} />
        <div className="flex w-full flex-col gap-2">
          <Textarea
            placeholder="Tulis judul aduan disini"
            autosize
            minRows={1}
            style={{ width: "100%" }}
            classNames={{ input: "text-xl font-semibold" }}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

          <Textarea
            placeholder="Tulis deskripsi aduan disini"
            autosize
            minRows={2}
            style={{ width: "100%" }}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button
          type="button"
          className=" rounded-lg bg-[#4c62f0] px-4 py-2 text-white disabled:opacity-90"
          onClick={() => createPost.mutate()}
          disabled={createPost.isLoading}
        >
          {createPost.isLoading ? (
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
      </ul>
    </div>
  );
}
