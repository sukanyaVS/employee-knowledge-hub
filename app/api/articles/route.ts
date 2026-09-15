import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category") || "";
    const author = searchParams.get("author") || "";

    const page = Math.max(
      Number(searchParams.get("page")) || DEFAULT_PAGE,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || DEFAULT_LIMIT,
        1
      ),
      100
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

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          publishedAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.article.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("GET /api/articles error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch articles",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      content,
      image,
      categoryId,
      authorId,
      published,
    } = body;

    if (
      !title ||
      !description ||
      !content ||
      !categoryId ||
      !authorId
    ) {
      return NextResponse.json(
        {
          message:
            "Title, description, content, categoryId and authorId are required",
        },
        {
          status: 400,
        }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        description,
        content,
        image: image || null,
        categoryId: Number(categoryId),
        authorId: Number(authorId),
        published:
          published !== undefined ? Boolean(published) : true,
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Article created successfully",
        data: article,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/articles error:", error);

    return NextResponse.json(
      {
        message: "Failed to create article",
      },
      {
        status: 500,
      }
    );
  }
}