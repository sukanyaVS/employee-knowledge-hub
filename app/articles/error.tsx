"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-2xl font-semibold">Unable to load articles</h1>
      <p className="mt-3 text-gray-600">
        Something went wrong while loading the articles. Please try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
