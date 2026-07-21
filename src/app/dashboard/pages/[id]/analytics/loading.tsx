export function AnalyticsSkeleton() {
  return (
    <div className="p-6 sm:p-8">
      <div className="h-8 w-36 animate-pulse rounded bg-muted" />
      <div className="mt-1 h-4 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
      <div className="mt-6 h-64 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}
