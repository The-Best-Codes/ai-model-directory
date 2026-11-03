export function PageFallback() {
  return (
    <main className="mx-auto flex w-full flex-1 max-w-6xl flex-col gap-8 px-6 py-8">
      <div className="space-y-4">
        <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-full max-w-3xl animate-pulse rounded-md bg-muted" />
      </div>
      <div className="h-96 animate-pulse rounded-md bg-muted" />
    </main>
  );
}
