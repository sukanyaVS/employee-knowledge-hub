import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
    },
    include: {
      category: true,
      author: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 3,
  });

  const announcements = await prisma.announcement.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold">
          Welcome to Knowledge Hub
        </h1>

        <p className="mt-3 text-gray-600">
          Explore company knowledge, technical articles,
          and latest announcements.
        </p>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Recent Articles
          </h2>

          <Link
            href="/articles"
            className="text-blue-600"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-lg border p-6"
            >
              <p className="text-sm text-blue-600">
                {article.category.name}
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {article.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {article.description}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                By {article.author.name}
              </p>

              <Link
                href={`/articles/${article.id}`}
                className="mt-4 inline-block font-medium text-blue-600"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Latest Announcements
        </h2>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="rounded-lg border p-5"
            >
              <h3 className="font-semibold">
                {announcement.title}
              </h3>

              <p className="mt-2 text-gray-600">
                {announcement.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}