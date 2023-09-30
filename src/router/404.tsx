import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-gray-700">
        Oops! Page not found
      </h1>
      <p className="mb-8 text-gray-600">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="rounded bg-[#4c62f0] px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Go back to homepage
      </Link>
    </div>
  );
}
