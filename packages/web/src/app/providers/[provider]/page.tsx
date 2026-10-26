import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconExternalLink } from "@tabler/icons-react";

import { DataNotice } from "#/components/data-notice";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { ModelTable } from "#/components/model-table";
import { loadDirectoryData } from "#/directory-data";
import { getProviderSeo } from "#/provider-seo";

export const ensureStatic = "navigation";

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
    <main className="mx-auto flex w-full flex-1 max-w-6xl flex-col gap-8 px-6 py-8">
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
      <DataNotice>
        These listings come from {entry.name ?? entry.id}&apos;s own API and
        docs and are refreshed daily. We aren&apos;t affiliated with{" "}
        {entry.name ?? entry.id} and don&apos;t test or vouch for its
        performance, uptime, output quality, or data handling. Confirm pricing
        and limits on the provider&apos;s site before relying on them.
      </DataNotice>
      <section className="flex h-[70vh] min-h-96 flex-col">
        <ModelTable directory={{ [entry.id]: entry }} providerId={entry.id} />
      </section>
    </main>
  );
}
