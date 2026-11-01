import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { DataNotice } from "#/components/data-notice";
import { PriceQuoteValue, TagList } from "#/components/model-details";
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
  formatTokenCount,
  formatUnixDate,
} from "#/lib/format";
import {
  getComparison,
  loadModelIndex,
  summarizeModelGroup,
  type ModelSummary,
} from "#/model-groups";

export const ensureStatic = "navigation";

type PageProps = {
  params: Promise<{ pair: string }>;
};

export async function generateStaticParams() {
  const { comparisons } = await loadModelIndex();

  return [...comparisons.keys()].map((pair) => ({ pair }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const comparison = await getComparison(pair);

  if (!comparison) {
    return {
      title: "Comparison Not Found",
      description: "The requested model comparison does not exist.",
    };
  }

  const [left, right] = comparison.models;
  const title = `${left.name} vs ${right.name}: Pricing and Providers`;
  const description = `Compare ${left.name} and ${right.name} side by side: cheapest prices, context window, output limits, features, and which providers offer each model.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

const rows: {
  label: string;
  render: (summary: ModelSummary, providerCount: number) => ReactNode;
}[] = [
  { label: "Providers", render: (_, providerCount) => providerCount },
  {
    label: "Cheapest input ($/M)",
    render: (summary) => <PriceQuoteValue quote={summary.cheapestInput} />,
  },
  {
    label: "Cheapest output ($/M)",
    render: (summary) => <PriceQuoteValue quote={summary.cheapestOutput} />,
  },
  {
    label: "Max context",
    render: (summary) => formatTokenCount(summary.maxContext),
  },
  {
    label: "Max output",
    render: (summary) => formatTokenCount(summary.maxOutput),
  },
  {
    label: "Released",
    render: (summary) => formatUnixDate(summary.releaseDate),
  },
  {
    label: "Open weights",
    render: (summary) => formatBoolean(summary.openWeights),
  },
  {
    label: "Features",
    render: (summary) => <TagList values={summary.features} />,
  },
  {
    label: "Input modalities",
    render: (summary) => (
      <TagList
        values={summary.modalitiesInput}
        formatLabel={formatBadgeLabel}
      />
    ),
  },
  {
    label: "Output modalities",
    render: (summary) => (
      <TagList
        values={summary.modalitiesOutput}
        formatLabel={formatBadgeLabel}
      />
    ),
  },
];

export default async function Page({ params }: PageProps) {
  const { pair } = await params;
  const comparison = await getComparison(pair);

  if (!comparison) {
    notFound();
  }

  if (comparison.slug !== pair) {
    redirect(`/compare/${comparison.slug}`);
  }

  const models = comparison.models.map((group) => ({
    group,
    summary: summarizeModelGroup(group),
  }));
  const [left, right] = comparison.models;

  return (
    <main className="mx-auto flex w-full flex-1 max-w-6xl flex-col gap-8 px-6 py-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {left.name} vs {right.name}
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          A side-by-side comparison of {left.name} and {right.name}, using the
          lowest price and highest limits found across every provider that
          offers each model.
        </p>
      </section>
      <div className="rounded-md border tabular-nums">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              {models.map(({ group }) => (
                <TableHead key={group.slug}>
                  <Link href={`/models/${group.slug}`}>{group.name}</Link>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="text-muted-foreground">
                  {row.label}
                </TableCell>
                {models.map(({ group, summary }) => (
                  <TableCell key={group.slug} className="whitespace-normal">
                    {row.render(summary, group.providerCount)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataNotice>
        Each figure is the best value listed by any single provider, so prices
        and limits in the same column can come from different providers,
        resellers, or free tiers. We don&apos;t test or vouch for provider
        performance, uptime, or output quality. Check each provider before
        relying on these numbers.
      </DataNotice>
    </main>
  );
}
