import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

const ARTICLE_REVALIDATION_SECONDS = 60;

export const getPublishedArticles = unstable_cache(
  async (
    search: string,
    categoryId: number | undefined,
    authorId: number | undefined,
    page: number,
    pageSize: number
  ) => {
    console.log("[articles cache] Fetching article list from database");

    const where = {
      published: true,
      ...(search
        ? {
            OR: [
              { title: { contains: search } },
              { description: { contains: search } },
              { content: { contains: search } },
            ],
          }
        : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(authorId ? { authorId } : {}),
    };

    return Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: true,
          author: true,
        },
        orderBy: {
          publishedAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.article.count({ where }),
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
  },
  ["published-articles"],
  { revalidate: ARTICLE_REVALIDATION_SECONDS }
);

export const getPublishedArticle = unstable_cache(
  async (articleId: number) => {
    console.log(
      `[articles cache] Fetching article ${articleId} from database`
    );

    return prisma.article.findFirst({
      where: {
        id: articleId,
        published: true,
      },
      include: {
        category: true,
        author: true,
      },
    });
  },
  ["published-article"],
  { revalidate: ARTICLE_REVALIDATION_SECONDS }
);