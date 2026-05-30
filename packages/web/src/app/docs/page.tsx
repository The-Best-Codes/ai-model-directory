import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "#/components/ui/button";
import Doc from "#/docs/index.mdx";

export const metadata: Metadata = {
  title: "Docs | AI Model Directory",
  description: "Documentation for AI Model Directory.",
};

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <nav className="flex items-center justify-between gap-4">
        <Button asChild variant="secondary">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild>
          <Link href="/list">Browse all models</Link>
        </Button>
      </nav>
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <Doc />
      </article>
    </main>
  );
}
