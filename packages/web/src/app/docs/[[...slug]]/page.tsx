import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { IconMenu2 } from "@tabler/icons-react";

import { Button } from "#/components/ui/button";
import { DocsSidebar } from "#/components/docs/docs-sidebar";
import { Separator } from "#/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";
import {
  getDoc,
  getDocMetadata,
  getDocPages,
  getDocPath,
  getDocSlugs,
} from "#/lib/docs";

export const dynamic = "force-static";
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug?: string[] }>;
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
  const doc = getDoc(slug);

  if (!doc) {
    notFound();
  }

  const pages = getDocPages();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 lg:py-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon" variant="outline">
                <IconMenu2 data-icon="inline-start" />
                <span className="sr-only">Open docs navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader>
                <SheetTitle>Docs</SheetTitle>
                <SheetDescription>
                  AI Model Directory documentation
                </SheetDescription>
              </SheetHeader>
              <Separator />
              <div className="p-2">
                <DocsSidebar pages={pages} currentSlug={slug} />
              </div>
            </SheetContent>
          </Sheet>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </div>
        <Button asChild variant="outline">
          <Link href="/list">Model List</Link>
        </Button>
      </header>
      <Separator className="my-6" />
      <div className="grid flex-1 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-10 flex flex-col gap-3">
            <p className="px-2.5 text-sm font-medium">Docs</p>
            <DocsSidebar pages={pages} currentSlug={slug} />
          </div>
        </aside>
        <article className="prose prose-neutral max-w-none pb-16 dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary prose-pre:rounded-lg">
          <MDXRemote source={doc.content} />
        </article>
      </div>
    </main>
  );
}
