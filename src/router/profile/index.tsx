import { SideNav } from "../../components/navbar";

export default function Profile() {
  return (
    <div className="h-screen bg-[#f4f5f9] pt-10">
      <SideNav />

      <main>
        <p className="text-center text-4xl font-bold ">Ini Profile kali ya</p>
      </main>
    </div>
  );
}
