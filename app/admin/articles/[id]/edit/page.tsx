import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPage({
  params,
}: Props) {

  const { id } = await params;

  const article =
    await prisma.article.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!article) {
    notFound();
  }

  const categories =
    await prisma.category.findMany();

  const authors =
    await prisma.user.findMany();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      <div className="mb-8">
        <Link href="/admin">
          ← Back
        </Link>

        <h1 className="mt-4 text-4xl font-bold">
          Edit Article
        </h1>
      </div>

      <ArticleForm
        categories={categories}
        authors={authors}
        initialData={article}
      />
    </div>
  );
}