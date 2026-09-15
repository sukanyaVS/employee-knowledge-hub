import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type EditArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  const articleId = Number(id);

  if (Number.isNaN(articleId)) {
    notFound();
  }

  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
    include: {
      category: true,
      author: true,
    },
  });

  if (!article) {
    notFound();
  }

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
          Edit Article
        </h1>

        <p className="mt-2 text-gray-600">
          Update the article information.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">
          {article.title}
        </h2>

        <p className="mt-2 text-gray-600">
          {article.description}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Category: {article.category.name}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Author: {article.author.name}
        </p>

        <p className="mt-6 text-gray-500">
          Edit form.
        </p>
      </div>
    </div>
  );
}