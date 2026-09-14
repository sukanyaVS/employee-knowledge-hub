import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Article Not Found
      </h2>

      <p className="mt-3 text-gray-600">
        The article you're looking for doesn't exist.
      </p>

      <Link
        href="/articles"
        className="mt-6 rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        Back to Articles
      </Link>
    </div>
  );
}