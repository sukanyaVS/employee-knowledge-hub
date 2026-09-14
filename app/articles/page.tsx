import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/articles/ArticleCard";
import ArticleFilters from "@/components/articles/ArticleFilters";
import Link from "next/link";

const PAGE_SIZE = 2;

type ArticlesPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    author?: string;
    page?: string;
  }>;
};

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;

  const search = params.search?.trim() || "";
  const category = params.category || "";
  const author = params.author || "";

  const currentPage = Math.max(
    Number(params.page) || 1,
    1
  );

  const categoryId = category
    ? Number(category)
    : undefined;

  const authorId = author
    ? Number(author)
    : undefined;

  const where = {
    published: true,

    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
            {
              content: {
                contains: search,
              },
            },
          ],
        }
      : {}),

    ...(categoryId
      ? {
          categoryId,
        }
      : {}),

    ...(authorId
      ? {
          authorId,
        }
      : {}),
  };

  const [articles, totalArticles, categories, authors] =
    await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: true,
          author: true,
        },
        orderBy: {
          publishedAt: "desc",
        },
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),

      prisma.article.count({
        where,
      }),

      prisma.category.findMany({
        orderBy: {
          name: "asc",
        },
      }),

      prisma.user.findMany({
        where: {
          articles: {
            some: {
              published: true,
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      }),
    ]);

  const totalPages = Math.ceil(
    totalArticles / PAGE_SIZE
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Page heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Articles
        </h1>

        <p className="mt-3 text-gray-600">
          Explore technical articles and company knowledge.
        </p>
      </div>

      {/* Search + Filters */}
      <ArticleFilters
        categories={categories}
        authors={authors}
        search={search}
        category={category}
        author={author}
      />

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          {totalArticles}{" "}
          {totalArticles === 1 ? "article" : "articles"} found
        </p>
      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h2 className="text-xl font-semibold">
            No articles found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          search={search}
          category={category}
          author={author}
        />
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  search,
  category,
  author,
}: {
  currentPage: number;
  totalPages: number;
  search: string;
  category: string;
  author: string;
}) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (category) {
      params.set("category", category);
    }

    if (author) {
      params.set("author", author);
    }

    params.set("page", String(page));

    return `/articles?${params.toString()}`;
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="rounded-md border px-4 py-2 hover:bg-gray-100"
        >
          ← Previous
        </Link>
      ) : (
        <span className="rounded-md border px-4 py-2 text-gray-400">
          ← Previous
        </span>
      )}

      {/* Page numbers */}
      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`rounded-md border px-4 py-2 ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="rounded-md border px-4 py-2 hover:bg-gray-100"
        >
          Next →
        </Link>
      ) : (
        <span className="rounded-md border px-4 py-2 text-gray-400">
          Next →
        </span>
      )}
    </div>
  );
}