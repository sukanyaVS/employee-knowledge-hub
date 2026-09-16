import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedArticle } from "@/lib/articles";
import BookmarkButton from "@/components/articles/BookmarkButton";

type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const articleId = Number(id);

  if (!Number.isInteger(articleId)) {
    return {};
  }

  const article = await getPublishedArticle(articleId);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Employee Knowledge Hub`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : undefined,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articleId = Number(id);

  if (!Number.isInteger(articleId)) {
    notFound();
  }

  const article = await getPublishedArticle(articleId);

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
      <div className="mt-6">
  <BookmarkButton articleId={article.id} />
</div>
      <p className="mt-8 text-lg text-gray-600">{article.description}</p>
      <div className="mt-8 whitespace-pre-wrap leading-7">{article.content}</div>
    </main>
  );
}
