import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "#/components/ui/button";
import { getDocMetadata, getDocPath, getDocSlugs } from "#/lib/docs";

export const dynamic = "force-static";
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

type MdxModule = {
  default: React.ComponentType;
};

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({
    slug: slug ? slug.split("/") : undefined,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join("/") ?? "";
  const docPath = getDocPath(slug);

  if (!docPath) {
    return {
      title: "Docs | AI Model Directory",
      description: "Documentation for AI Model Directory.",
    };
  }

  return getDocMetadata(docPath);
}

export default async function Page({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join("/") ?? "";
  const docPath = getDocPath(slug);

  if (!docPath) {
    notFound();
  }

  const { default: Doc } = (await import(
    `../../../docs/${docPath}`
  )) as MdxModule;

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
