import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articleId = Number(id);

  if (!Number.isInteger(articleId)) {
    notFound();
  }

  const article = await prisma.article.findFirst({
    where: {
      id: articleId,
      published: true,
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
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/articles" className="text-blue-600">
        Back to articles
      </Link>
      <p className="mt-8 text-sm text-blue-600">{article.category.name}</p>
      <h1 className="mt-2 text-4xl font-bold">{article.title}</h1>
      <p className="mt-4 text-sm text-gray-500">By {article.author.name}</p>
      <p className="mt-8 text-lg text-gray-600">{article.description}</p>
      <div className="mt-8 whitespace-pre-wrap leading-7">{article.content}</div>
    </main>
  );
}
