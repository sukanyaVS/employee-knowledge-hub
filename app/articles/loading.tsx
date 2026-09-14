function ArticleCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-zinc-800 bg-zinc-950 p-6">
      <div className="h-6 w-3/4 rounded bg-zinc-900" />
      <div className="mt-4 h-4 w-full rounded bg-zinc-900" />
      <div className="mt-2 h-4 w-5/6 rounded bg-zinc-900" />
      <div className="mt-8 h-4 w-1/3 rounded bg-zinc-900" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12" aria-busy="true" aria-label="Loading articles">
      <div className="mb-10 animate-pulse">
        <div className="h-10 w-48 rounded bg-zinc-900" />
        <div className="mt-3 h-5 w-80 max-w-full rounded bg-zinc-900" />
      </div>

      <div className="mb-8 grid animate-pulse gap-4 md:grid-cols-3">
        <div className="h-10 rounded bg-zinc-900" />
        <div className="h-10 rounded bg-zinc-900" />
        <div className="h-10 rounded bg-zinc-900" />
      </div>

      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-zinc-900" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
