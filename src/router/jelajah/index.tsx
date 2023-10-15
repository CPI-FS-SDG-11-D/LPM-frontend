import { useSearchParams } from "react-router-dom";

import { TopHeader } from "../../components/header";
import { TimelinePostCard } from "../../components/cards";

export default function Search() {
  const [searchParams] = useSearchParams();

  return (
    <div className=" h-full bg-[#f4f5f9] pb-8">
      <TopHeader />
      <main className="mr-10 h-full pl-64 pt-10">
        <h1 className="pb-8 text-xl font-medium">
          Hasil Pencarian untuk{" "}
          <span className="font-semibold">{searchParams.get("cari")}</span>
        </h1>
        <div className="flex w-4/5 flex-col gap-4 ">
          <TimelinePostCard postId="200" />
          <TimelinePostCard postId="300" />
          <TimelinePostCard postId="asdasdasd" />
          <TimelinePostCard postId="asd123sada" />
        </div>
      </main>
    </div>
  );
}
