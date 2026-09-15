import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function NewArticlePage() {

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
          Create Article
        </h1>
      </div>

      <ArticleForm
        categories={categories}
        authors={authors}
      />
    </div>
  );
}