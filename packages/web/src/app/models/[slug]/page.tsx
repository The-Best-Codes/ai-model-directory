import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { DataNotice } from "#/components/data-notice";
import { PriceQuoteValue, TagList } from "#/components/model-details";
import { OfferingsTable, type OfferingRow } from "#/components/offerings-table";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
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

function toOfferingRow(offering: ModelOffering): OfferingRow {
  return {
    providerId: offering.providerId,
    providerName: offering.providerName,
    modelId: offering.model.id,
    input: offering.model.pricing?.input,
    output: offering.model.pricing?.output,
    cacheRead: offering.model.pricing?.cache_read,
    context: offering.model.limit?.context,
    outputLimit: offering.model.limit?.output,
  };
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

  if (group.slug !== slug) {
    permanentRedirect(`/models/${group.slug}`);
  }

  const summary = summarizeModelGroup(group);
  const offerings = group.offerings.toSorted(compareOfferings);
  const relatedComparisons = await getRelatedComparisons(group);

  return (
    <main className="mx-auto flex w-full flex-1 max-w-6xl flex-col gap-8 px-6 py-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
          <Badge variant="secondary">
            {providerLabel(group.providerCount)}
          </Badge>
        </div>
        <p className="max-w-3xl text-muted-foreground">
          {describeModel(group, summary)}
        </p>
      </section>
      <section>
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
        <DataNotice>
          Listings come from each provider&apos;s own API and docs and are
          refreshed daily, so they can be out of date or wrong. We don&apos;t
          test or vouch for any provider: speed, uptime, rate limits, output
          quality, data handling, and whether you get the full-precision model
          can all differ. Some listings are resellers, free tiers, or quantized
          versions. Check the provider&apos;s own pricing and terms before
          relying on them.
        </DataNotice>
        <OfferingsTable rows={offerings.map(toOfferingRow)} />
      </section>
      {relatedComparisons.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            Compare {group.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedComparisons.map((comparison) => {
              const other = comparison.models.find((model) => model !== group)!;

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
