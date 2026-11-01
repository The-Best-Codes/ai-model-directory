import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { IconMenu2 } from "@tabler/icons-react";
import type { RehypeShikiCoreOptions } from "@shikijs/rehype/core";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

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
import shikiHighlighter from "#/lib/shiki";

export const ensureStatic = "navigation";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({
    slug: slug ? slug.split("/") : [],
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
      title: "Docs",
      description: "Documentation for AI Model Directory.",
    };
  }

  return getDocMetadata(docPath);
}

export default async function Page({ params }: PageProps) {
  "use cache";
  cacheLife("max");

  const { slug: slugArray } = await params;
  const slug = slugArray?.join("/") ?? "";
  const doc = getDoc(slug);

  if (!doc) {
    notFound();
  }

  const pages = getDocPages();
  const highlighter = await shikiHighlighter;

  return (
    <main className="mx-auto flex w-full flex-1 max-w-6xl flex-col px-6 py-6 lg:py-10">
      <div className="mb-6 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <IconMenu2 data-icon="inline-start" />
              Docs menu
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
      </div>
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 flex flex-col gap-3">
            <p className="px-2.5 text-sm font-medium">Docs</p>
            <DocsSidebar pages={pages} currentSlug={slug} />
          </div>
        </aside>
        <article className="prose prose-neutral max-w-none pb-16 dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary prose-pre:rounded-lg">
          <MDXRemote
            source={doc.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  [
                    rehypeShikiFromHighlighter,
                    highlighter,
                    {
                      themes: {
                        light: "light-plus",
                        dark: "dark-plus",
                      },
                    } as RehypeShikiCoreOptions,
                  ],
                ],
              },
            }}
          />
        </article>
      </div>
    </main>
  );
}
