import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-gray-700">
        Oops! Halaman tidak ditemukan
      </h1>
      <p className="mb-8 text-gray-600">
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="rounded bg-[#4c62f0] px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}
