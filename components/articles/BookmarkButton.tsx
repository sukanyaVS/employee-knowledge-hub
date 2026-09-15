 "use client";

import { useEffect, useState } from "react";

type BookmarkButtonProps = {
  articleId: number;
};

export default function BookmarkButton({
  articleId,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedArticles") || "[]"
    );

    setBookmarked(bookmarks.includes(articleId));
  }, [articleId]);

  const toggleBookmark = () => {
    const bookmarks: number[] = JSON.parse(
      localStorage.getItem("bookmarkedArticles") || "[]"
    );

    let updatedBookmarks: number[];

    if (bookmarks.includes(articleId)) {
      updatedBookmarks = bookmarks.filter(
        (id) => id !== articleId
      );
      setBookmarked(false);
    } else {
      updatedBookmarks = [...bookmarks, articleId];
      setBookmarked(true);
    }

    localStorage.setItem(
      "bookmarkedArticles",
      JSON.stringify(updatedBookmarks)
    );
  };

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      className="rounded-md border px-4 py-2 transition hover:bg-gray-100"
    >
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}