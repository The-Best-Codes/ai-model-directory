import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "#/components/ui/button";
import { IconBook, IconExternalLink } from "@tabler/icons-react";

import { loadDirectoryData } from "#/directory-data";
import { loadModelIndex } from "#/model-groups";

const title = "AI Model Directory: Compare LLM Pricing, Context, and Providers";
const description =
  "Compare AI model pricing, context windows, output limits, modalities, and features across every major LLM provider. Free, open source, and updated daily.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description },
};

const popularModelCount = 8;

export default async function Page() {
  const [directory, { ranked }] = await Promise.all([
    loadDirectoryData(),
    loadModelIndex(),
  ]);
  const providerCount = Object.keys(directory).length;
  const listingCount = ranked.reduce(
    (total, group) => total + group.offerings.length,
    0,
  );
  const popularModels = ranked.slice(0, popularModelCount);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Model Directory",
    url: "https://www.modeldirectory.dev",
    description,
  };

  return (
    <main className="mx-auto flex w-full flex-1 max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          AI Model Directory
        </h1>
        <p className="text-lg text-muted-foreground">
          Compare pricing, context windows, output limits, modalities, and
          features for {ranked.length.toLocaleString()} unique AI models, with{" "}
          {listingCount.toLocaleString()} listings across{" "}
          {providerCount.toLocaleString()} providers. Find the cheapest provider
          for any LLM, refreshed daily from each provider&apos;s own API and
          docs.
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <Button asChild size="lg">
          <Link href="/list">Browse all models</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/providers">Browse providers</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/docs">
            <IconBook />
            Docs
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a
            href="https://github.com/The-Best-Codes/ai-model-directory"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <IconExternalLink />
          </a>
        </Button>
      </div>
      <nav aria-labelledby="popular-models" className="space-y-2">
        <h2
          id="popular-models"
          className="text-sm font-medium text-muted-foreground"
        >
          Most widely available models
        </h2>
        <ul className="flex flex-wrap gap-2">
          {popularModels.map((group) => (
            <li key={group.slug}>
              <Button asChild size="sm" variant="outline">
                <Link href={`/models/${group.slug}`}>{group.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
