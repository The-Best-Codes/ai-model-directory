import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { loadDirectoryData } from "#/directory-data";
import { providersSeo } from "#/provider-seo";

export const metadata: Metadata = {
  title: providersSeo.title,
  description: providersSeo.description,
  openGraph: {
    title: providersSeo.title,
    description: providersSeo.description,
  },
};

interface Model {
  id: string;
  name?: string;
}

interface Provider {
  id: string;
  name?: string;
  models: Record<string, Model> | Model[];
}

export default async function Page() {
  const directory = await loadDirectoryData();
  const providers = (Object.values(directory) as Provider[]).sort((a, b) =>
    (a.name ?? a.id).localeCompare(b.name ?? b.id, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-8">
      <header className="flex items-center justify-between gap-4">
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/list">Model List</Link>
        </Button>
      </header>
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          {providersSeo.title}
        </h1>
        <p className="max-w-2xl text-muted-foreground">{providersSeo.intro}</p>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        {providers.map((provider) => {
          const rawModels = provider.models;
          const modelsList = Array.isArray(rawModels)
            ? rawModels
            : Object.values(rawModels ?? {});
          const modelCount = modelsList.length;

          const getProviderDescription = (p: Provider): string => {
            const names = modelsList
              .map((m) => m.name ?? m.id)
              .filter(Boolean);

            if (names.length === 0) {
              return p.id;
            }

            if (names.length === 1) {
              return names[0];
            }

            if (names.length === 2) {
              return `${names[0]} and ${names[1]}`;
            }

            return `${names[0]}, ${names[1]}, and more`;
          };

          return (
            <Link
              key={provider.id}
              href={`/providers/${provider.id}`}
              className="flex items-center justify-between gap-4 rounded-md border p-4 transition-colors hover:bg-muted min-w-0"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {provider.name ?? provider.id}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {getProviderDescription(provider)}
                </p>
              </div>
              <Badge className="shrink-0">
                {modelCount} {modelCount === 1 ? "model" : "models"}
              </Badge>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
