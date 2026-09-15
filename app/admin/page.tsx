import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const articles = await prisma.article.findMany({
    include: {
      category: true,
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage knowledge hub articles.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + New Article
        </Link>
      </div>

      {/* Statistics */}
      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <p className="text-sm text-gray-500">
            Total Articles
          </p>

          <p className="mt-2 text-3xl font-bold">
            {articles.length}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <p className="text-sm text-gray-500">
            Published
          </p>

          <p className="mt-2 text-3xl font-bold">
            {articles.filter(
              (article) => article.published
            ).length}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <p className="text-sm text-gray-500">
            Drafts
          </p>

          <p className="mt-2 text-3xl font-bold">
            {articles.filter(
              (article) => !article.published
            ).length}
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="rounded-lg border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            Manage Articles
          </h2>
        </div>

        {articles.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              No articles available.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b text-left text-sm">
                  <th className="px-6 py-4 font-medium">
                    Title
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Author
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Published
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b last:border-b-0"
                  >
                    {/* Title */}
                    <td className="px-6 py-4">
                      <div className="font-medium">
                        {article.title}
                      </div>

                      <div className="mt-1 max-w-md truncate text-sm text-gray-500">
                        {article.description}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      {article.category.name}
                    </td>

                    {/* Author */}
                    <td className="px-6 py-4">
                      {article.author.name}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {article.published ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Published
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {article.publishedAt
                        ? new Date(
                            article.publishedAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>

                        <Link
                          href={`/articles/${article.id}`}
                          target="_blank"
                          className="text-gray-600 hover:underline"
                        >
                          View
                        </Link>

                        <button
                          type="button"
                          disabled
                          className="text-red-400"
                          title="Delete will be enabled with Server Actions"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}