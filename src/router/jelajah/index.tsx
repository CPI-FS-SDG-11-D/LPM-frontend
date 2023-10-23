import { useSearchParams } from "react-router-dom";

import { TopHeader } from "../../components/header";
import { TimelinePostCard } from "../../components/cards";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "../../configs/url";

type SearchData = {
  username: string | null;
  complaints: {
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
  }[];
};

export default function Search() {
  const [searchParams] = useSearchParams();

  const searchFetch = useQuery({
    queryKey: ["search", searchParams.get("cari")],
    queryFn: async () => {
      const data = await axios.get(
        `${SERVER_URL}/api/complaints/search?title=${searchParams.get("cari")}`,
      );
      return data.data as SearchData;
    },
  });

  return (
    <div className=" min-h-[100vh] bg-[#f4f5f9] pb-8">
      <TopHeader />
      <main className="mr-10 h-full pl-64 pt-10">
        <h1 className="pb-8 text-xl font-medium">
          Hasil Pencarian untuk{" "}
          <span className="font-semibold">{searchParams.get("cari")}</span>
        </h1>
        <div className="flex w-4/5 flex-col gap-4 ">
          {searchFetch.isSuccess &&
            searchFetch.data.complaints.map((complaint) => {
              return (
                <TimelinePostCard
                  key={complaint._id}
                  _id={complaint._id}
                  description={complaint.description}
                  title={complaint.title}
                  totalUpvotes={complaint.totalUpvotes}
                  status={complaint.status}
                />
              );
            })}
          {/* <TimelinePostCard />
          <TimelinePostCard />
          <TimelinePostCard />
          <TimelinePostCard /> */}
          {searchFetch.isLoading && (
            <>
              <div className="h-36 w-full animate-pulse rounded-md bg-gray-400 px-6 py-4 shadow-sm"></div>
              <div className="h-36 w-full animate-pulse rounded-md bg-gray-400 px-6 py-4 shadow-sm"></div>
              <div className="h-36 w-full animate-pulse rounded-md bg-gray-400 px-6 py-4 shadow-sm"></div>
            </>
          )}
          {searchFetch.isError && (
            <p
              className="text-center
             text-3xl font-bold"
            >
              Pencarian Tidak Ditemukan
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
