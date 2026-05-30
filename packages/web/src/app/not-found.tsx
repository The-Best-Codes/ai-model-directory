import Link from "next/link";
import { Button } from "#/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="text-lg text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <Button asChild size="lg">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/list">Browse all models</Link>
        </Button>
      </div>
    </main>
  );
}
