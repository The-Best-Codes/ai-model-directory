import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PriceQuoteValue, TagList } from "#/components/model-details";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import {
  formatBadgeLabel,
  formatBoolean,
  formatPrice,
  formatTokenCount,
  formatUnixDate,
} from "#/lib/format";
import {
  getModelGroup,
  getRelatedComparisons,
  loadModelIndex,
  summarizeModelGroup,
  type ModelGroup,
  type ModelOffering,
  type ModelSummary,
} from "#/model-groups";

export const ensureStatic = "navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { ranked } = await loadModelIndex();

  return ranked.map((group) => ({ slug: group.slug }));
}

function providerLabel(count: number) {
  return `${count} ${count === 1 ? "provider" : "providers"}`;
}

function describeModel(group: ModelGroup, summary: ModelSummary) {
  const parts = [
    `${group.name} is available from ${providerLabel(group.providerCount)}.`,
  ];

  if (summary.cheapestInput) {
    parts.push(
      `The lowest input price is ${formatPrice(summary.cheapestInput.price)} per million tokens from ${summary.cheapestInput.providerName}.`,
    );
  }

  if (summary.maxContext) {
    parts.push(
      `It supports up to ${formatTokenCount(summary.maxContext)} tokens of context.`,
    );
  }

  return parts.join(" ");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = await getModelGroup(slug);

  if (!group) {
    return {
      title: "Model Not Found",
      description: "The requested model does not exist.",
    };
  }

  const title = `${group.name} Pricing, Providers, and Context Window`;
  const description = describeModel(group, summarizeModelGroup(group));

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

function compareOfferings(a: ModelOffering, b: ModelOffering) {
  const priceA = a.model.pricing?.input ?? Number.POSITIVE_INFINITY;
  const priceB = b.model.pricing?.input ?? Number.POSITIVE_INFINITY;

  if (priceA !== priceB) {
    return priceA < priceB ? -1 : 1;
  }

  return a.providerName.localeCompare(b.providerName);
}

function SummaryItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1 rounded-md border p-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const group = await getModelGroup(slug);

  if (!group) {
    notFound();
  }

  const summary = summarizeModelGroup(group);
  const offerings = group.offerings.toSorted(compareOfferings);
  const relatedComparisons = await getRelatedComparisons(group);

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
          <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
          <Badge variant="secondary">{providerLabel(group.providerCount)}</Badge>
        </div>
        <p className="max-w-3xl text-muted-foreground">
          {describeModel(group, summary)}
        </p>
      </section>
      <section>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem label="Cheapest input ($/M)">
            <PriceQuoteValue quote={summary.cheapestInput} />
          </SummaryItem>
          <SummaryItem label="Cheapest output ($/M)">
            <PriceQuoteValue quote={summary.cheapestOutput} />
          </SummaryItem>
          <SummaryItem label="Max context">
            {formatTokenCount(summary.maxContext)}
          </SummaryItem>
          <SummaryItem label="Max output">
            {formatTokenCount(summary.maxOutput)}
          </SummaryItem>
          <SummaryItem label="Released">
            {formatUnixDate(summary.releaseDate)}
          </SummaryItem>
          <SummaryItem label="Open weights">
            {formatBoolean(summary.openWeights)}
          </SummaryItem>
          <SummaryItem label="Input modalities">
            <TagList
              values={summary.modalitiesInput}
              formatLabel={formatBadgeLabel}
            />
          </SummaryItem>
          <SummaryItem label="Output modalities">
            <TagList
              values={summary.modalitiesOutput}
              formatLabel={formatBadgeLabel}
            />
          </SummaryItem>
        </dl>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Features</h2>
        <TagList values={summary.features} />
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Providers offering {group.name}
        </h2>
        <div className="rounded-md border tabular-nums">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Model ID</TableHead>
                <TableHead>Input ($/M)</TableHead>
                <TableHead>Output ($/M)</TableHead>
                <TableHead>Cache Read ($/M)</TableHead>
                <TableHead>Context</TableHead>
                <TableHead>Output Limit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offerings.map((offering) => (
                <TableRow key={`${offering.providerId}/${offering.model.id}`}>
                  <TableCell>
                    <Link href={`/providers/${offering.providerId}`}>
                      {offering.providerName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {offering.model.id}
                  </TableCell>
                  <TableCell>
                    {formatPrice(offering.model.pricing?.input)}
                  </TableCell>
                  <TableCell>
                    {formatPrice(offering.model.pricing?.output)}
                  </TableCell>
                  <TableCell>
                    {formatPrice(offering.model.pricing?.cache_read)}
                  </TableCell>
                  <TableCell>
                    {formatTokenCount(offering.model.limit?.context)}
                  </TableCell>
                  <TableCell>
                    {formatTokenCount(offering.model.limit?.output)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      {relatedComparisons.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            Compare {group.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedComparisons.map((comparison) => {
              const other = comparison.models.find(
                (model) => model !== group,
              )!;

              return (
                <Button key={comparison.slug} asChild variant="outline">
                  <Link href={`/compare/${comparison.slug}`}>
                    vs {other.name}
                  </Link>
                </Button>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
