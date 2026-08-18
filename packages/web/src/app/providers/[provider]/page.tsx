import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconExternalLink } from "@tabler/icons-react";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { ModelTable } from "#/components/model-table";
import { loadDirectoryData } from "#/directory-data";
import { getProviderSeo } from "#/provider-seo";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ provider: string }>;
};

export async function generateStaticParams() {
  const directory = await loadDirectoryData();

  return Object.keys(directory).map((provider) => ({ provider }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { provider } = await params;
  const directory = await loadDirectoryData();
  const entry = directory[provider];

  if (!entry) {
    return {
      title: "Provider Not Found",
      description: "The requested provider does not exist.",
    };
  }

  const models = Object.values(entry.models);
  const seo = getProviderSeo(
    entry.id,
    entry.name ?? entry.id,
    models.length,
    models.map((model) => model.name ?? model.id),
  );

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { provider } = await params;
  const directory = await loadDirectoryData();
  const entry = directory[provider];

  if (!entry) {
    notFound();
  }

  const models = Object.values(entry.models);
  const seo = getProviderSeo(
    entry.id,
    entry.name ?? entry.id,
    models.length,
    models.map((model) => model.name ?? model.id),
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/providers">Providers</Link>
          </Button>
        </div>
        <Button asChild variant="outline">
          <Link href="/list">Model List</Link>
        </Button>
      </header>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">
            {entry.name ?? entry.id}
          </h1>
          <Badge variant="secondary">
            {models.length} {models.length === 1 ? "model" : "models"}
          </Badge>
        </div>
        <p className="max-w-3xl text-muted-foreground">{seo.intro}</p>
        <div className="flex flex-wrap items-center gap-3">
          {entry.website ? (
            <Button asChild variant="outline" size="sm">
              <a href={entry.website} target="_blank" rel="noreferrer">
                {entry.website.replace(/^https?:\/\//, "")}
                <IconExternalLink />
              </a>
            </Button>
          ) : null}
          {entry.apiBaseUrl ? (
            <span className="text-sm text-muted-foreground">
              API base: {entry.apiBaseUrl}
            </span>
          ) : null}
        </div>
      </section>
      <section className="flex h-[70vh] min-h-96 flex-col">
        <ModelTable directory={directory} providerId={entry.id} />
      </section>
    </main>
  );
}
