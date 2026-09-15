import Link from "next/link";

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-4 text-4xl font-bold">
          Create Article
        </h1>

        <p className="mt-2 text-gray-600">
          Add a new knowledge hub article.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <p className="text-gray-500">
          Article form.
        </p>
      </div>
    </div>
  );
}