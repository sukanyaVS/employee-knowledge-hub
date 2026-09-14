import Link from "next/link";

type ArticleCardProps = {
  article: {
    id: number;
    title: string;
    description: string;
    publishedAt: Date;
    category: {
      name: string;
    };
    author: {
      name: string;
    };
  };
};

export default function ArticleCard({
  article,
}: ArticleCardProps) {
  return (
    <article className="flex flex-col rounded-lg border border-gray-300 p-6 transition hover:shadow-md">
      {/* Category */}
      <div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {article.category.name}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-xl font-semibold">
        {article.title}
      </h2>

      {/* Description */}
      <p className="mt-3 flex-1 text-gray-600">
        {article.description}
      </p>

      {/* Author + Date */}
      <div className="mt-6 border-t pt-4 text-sm text-gray-500">
        <p>
          <span className="font-medium">Author:</span>{" "}
          {article.author.name}
        </p>

        <p className="mt-1">
          <span className="font-medium">Published:</span>{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Read More */}
      <Link
        href={`/articles/${article.id}`}
        className="mt-5 inline-block font-medium text-blue-600 hover:underline"
      >
        Read More →
      </Link>
    </article>
  );
}