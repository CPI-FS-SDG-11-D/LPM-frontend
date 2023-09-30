import { SideNav } from "../../components/navbar";

export default function Profile() {
  return (
    <div className="h-screen bg-[#f4f5f9] ">
      <SideNav />

      <main>
        <p className="pt-10 text-center text-4xl font-bold ">
          Ini Profile kali ya
        </p>
      </main>
    </div>
  );
}
