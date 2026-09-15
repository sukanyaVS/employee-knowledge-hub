import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type ArticleRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: ArticleRouteContext
) {
  try {
    const { id } = await params;

    const articleId = Number(id);

    if (Number.isNaN(articleId)) {
      return NextResponse.json(
        {
          message: "Invalid article ID",
        },
        {
          status: 400,
        }
      );
    }

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
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

    if (!article) {
      return NextResponse.json(
        {
          message: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      data: article,
    });
  } catch (error) {
    console.error(
      "GET /api/articles/[id] error:",
      error
    );

    return NextResponse.json(
      {
        message: "Failed to fetch article",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: ArticleRouteContext
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const articleId = Number(id);

    if (Number.isNaN(articleId)) {
      return NextResponse.json(
        {
          message: "Invalid article ID",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const {
      title,
      description,
      content,
      image,
      categoryId,
      published,
    } = body;

    const existingArticle =
      await prisma.article.findUnique({
        where: {
          id: articleId,
        },
      });

    if (!existingArticle) {
      return NextResponse.json(
        {
          message: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    const article = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(image !== undefined && { image }),
        ...(categoryId !== undefined && {
          categoryId: Number(categoryId),
        }),
        ...(published !== undefined && {
          published: Boolean(published),
        }),
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

    return NextResponse.json({
      message: "Article updated successfully",
      data: article,
    });
  } catch (error) {
    console.error(
      "PUT /api/articles/[id] error:",
      error
    );

    return NextResponse.json(
      {
        message: "Failed to update article",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: ArticleRouteContext
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const articleId = Number(id);

    if (Number.isNaN(articleId)) {
      return NextResponse.json(
        {
          message: "Invalid article ID",
        },
        {
          status: 400,
        }
      );
    }

    const existingArticle =
      await prisma.article.findUnique({
        where: {
          id: articleId,
        },
      });

    if (!existingArticle) {
      return NextResponse.json(
        {
          message: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.article.delete({
      where: {
        id: articleId,
      },
    });

    return NextResponse.json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE /api/articles/[id] error:",
      error
    );

    return NextResponse.json(
      {
        message: "Failed to delete article",
      },
      {
        status: 500,
      }
    );
  }
}