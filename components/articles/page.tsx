import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/articles/ArticleCard";

export default async function ArticlesPage() {
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
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Articles
        </h1>

        <p className="mt-3 text-gray-600">
          Explore technical articles and company knowledge.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500">
          No articles found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      )}
    </div>
  );
}