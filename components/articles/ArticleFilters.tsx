import Link from "next/link";

type ArticleFiltersProps = {
  categories: {
    id: number;
    name: string;
  }[];

  authors: {
    id: number;
    name: string;
  }[];

  search?: string;
  category?: string;
  author?: string;
};

export default function ArticleFilters({
  categories,
  authors,
  search = "",
  category = "",
  author = "",
}: ArticleFiltersProps) {
  return (
    <form
      method="GET"
      className="mb-8 rounded-lg border border-gray-200 bg-black-50 p-4 text-gray-600"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div>
          <label
            htmlFor="search"
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            Search Articles
          </label>

          <input
            id="search"
            name="search"
            type="text"
            defaultValue={search}
            placeholder="Search by title or description..."
            className="w-full rounded-md border border-gray-300 bg-black px-3 py-1.5 text-sm text-gray-600 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            Category
          </label>

          <select
            id="category"
            name="category"
            defaultValue={category}
            className="w-full rounded-md border border-gray-300 bg-black px-3 py-1.5 text-sm text-gray-600"
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div>
          <label
            htmlFor="author"
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            Author
          </label>

          <select
            id="author"
            name="author"
            defaultValue={author}
            className="w-full rounded-md border border-gray-300 bg-black px-3 py-1.5 text-sm text-gray-600"
          >
            <option value="">All Authors</option>

            {authors.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Search
        </button>

        <Link
          href="/articles"
          className="rounded-md border border-gray-300 bg-black px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}