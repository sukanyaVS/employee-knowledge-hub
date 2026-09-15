"use client";

import { useState } from "react";

type Category = {
  id: number;
  name: string;
};

type Author = {
  id: number;
  name: string;
};

type ArticleFormProps = {
  categories: Category[];
  authors: Author[];

  initialData?: {
    id: number;
    title: string;
    description: string;
    content: string;
    image: string | null;
    categoryId: number;
    authorId: number;
    published: boolean;
  };
};

export default function ArticleForm({
  categories,
  authors,
  initialData,
}: ArticleFormProps) {

  const [title, setTitle] = useState(
    initialData?.title || ""
  );

  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [content, setContent] = useState(
    initialData?.content || ""
  );

  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId?.toString() || ""
  );

  const [authorId, setAuthorId] = useState(
    initialData?.authorId?.toString() || ""
  );

  const [image, setImage] = useState(
    initialData?.image || ""
  );

  const [published, setPublished] = useState(
    initialData?.published ?? true
  );

  return (
    <form className="space-y-6 rounded-lg border p-6">

      {/* Title */}
      <div>
        <label className="mb-2 block">
          Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full rounded border p-3"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full rounded border p-3"
        />
      </div>

      {/* Content */}
      <div>
        <label className="mb-2 block">
          Content
        </label>

        <textarea
          rows={10}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full rounded border p-3"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block">
          Category
        </label>

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value)
          }
          className="w-full rounded border p-3"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Author */}
      <div>
        <label className="mb-2 block">
          Author
        </label>

        <select
          value={authorId}
          onChange={(e) =>
            setAuthorId(e.target.value)
          }
          className="w-full rounded border p-3"
        >
          <option value="">
            Select Author
          </option>

          {authors.map((author) => (
            <option
              key={author.id}
              value={author.id}
            >
              {author.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image */}
      <div>
        <label className="mb-2 block">
          Image URL
        </label>

        <input
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="w-full rounded border p-3"
        />
      </div>

      {/* Published */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) =>
            setPublished(e.target.checked)
          }
        />

        <label>
          Publish Article
        </label>
      </div>

      <button
        className="rounded bg-blue-600 px-5 py-3 text-white"
      >
        Save Article
      </button>
    </form>
  );
}