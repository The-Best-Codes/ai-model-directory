import { loadDirectoryData, type DirectoryData } from "#/directory-data";
import { modelFeatureLabels } from "#/lib/format";
import { canonicalModelSlug, comparisonSlug } from "#/lib/model-slug";

type ProviderRecord = DirectoryData[string];
type ModelRecord = ProviderRecord["models"][string];

export type ModelOffering = {
  providerId: string;
  providerName: string;
  model: ModelRecord;
};

export type ModelGroup = {
  slug: string;
  name: string;
  providerCount: number;
  offerings: ModelOffering[];
};

export type PriceQuote = {
  price: number;
  providerName: string;
};

export type ModelSummary = {
  cheapestInput?: PriceQuote;
  cheapestOutput?: PriceQuote;
  maxContext?: number;
  maxOutput?: number;
  releaseDate?: string;
  openWeights: boolean;
  features: string[];
  modalitiesInput: string[];
  modalitiesOutput: string[];
};

export type ModelComparison = {
  slug: string;
  models: [ModelGroup, ModelGroup];
};

type ModelIndex = {
  groups: Map<string, ModelGroup>;
  ranked: ModelGroup[];
  comparisons: Map<string, ModelComparison>;
};

export const comparisonModelCount = 100;
const relatedComparisonCount = 6;

function pickGroupName(offerings: ModelOffering[]): string {
  const counts = new Map<string, number>();

  for (const offering of offerings) {
    const name = offering.model.name ?? offering.model.id;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }

  return [...counts].sort(
    ([nameA, countA], [nameB, countB]) =>
      countB - countA || nameA.length - nameB.length,
  )[0]![0];
}

function computeModelIndex(directory: DirectoryData): ModelIndex {
  const offeringsBySlug = new Map<string, ModelOffering[]>();

  for (const provider of Object.values(directory)) {
    for (const model of Object.values(provider.models)) {
      const slug = canonicalModelSlug(model.id);

      if (!slug) {
        continue;
      }

      const offerings = offeringsBySlug.get(slug) ?? [];
      offerings.push({
        providerId: provider.id,
        providerName: provider.name ?? provider.id,
        model,
      });
      offeringsBySlug.set(slug, offerings);
    }
  }

  const groups = new Map<string, ModelGroup>();

  for (const [slug, offerings] of offeringsBySlug) {
    groups.set(slug, {
      slug,
      name: pickGroupName(offerings),
      providerCount: new Set(offerings.map((offering) => offering.providerId))
        .size,
      offerings,
    });
  }

  const ranked = [...groups.values()].sort(
    (a, b) => b.providerCount - a.providerCount || a.slug.localeCompare(b.slug),
  );
  const comparisons = new Map<string, ModelComparison>();
  const comparable = ranked.slice(0, comparisonModelCount);

  for (const [index, left] of comparable.entries()) {
    for (const right of comparable.slice(index + 1)) {
      const comparison = createComparison(left, right);
      comparisons.set(comparison.slug, comparison);
    }
  }

  return { groups, ranked, comparisons };
}

function createComparison(a: ModelGroup, b: ModelGroup): ModelComparison {
  return {
    slug: comparisonSlug(a.slug, b.slug),
    models: a.slug < b.slug ? [a, b] : [b, a],
  };
}

let cachedModelIndex: ModelIndex | undefined;

export async function loadModelIndex(): Promise<ModelIndex> {
  cachedModelIndex ??= computeModelIndex(await loadDirectoryData());
  return cachedModelIndex;
}

export async function getModelGroup(slug: string) {
  return (await loadModelIndex()).groups.get(slug);
}

export async function getComparison(slug: string) {
  const { groups, comparisons } = await loadModelIndex();
  const known = comparisons.get(slug);

  if (known) {
    return known;
  }

  for (const match of slug.matchAll(/-vs-/g)) {
    const left = groups.get(slug.slice(0, match.index));
    const right = groups.get(slug.slice(match.index + 4));

    if (left && right && left !== right) {
      return comparisons.get(comparisonSlug(left.slug, right.slug)) ??
        createComparison(left, right);
    }
  }

  return undefined;
}

export async function getRelatedComparisons(group: ModelGroup) {
  const { ranked, comparisons } = await loadModelIndex();

  return ranked
    .slice(0, comparisonModelCount)
    .filter((other) => other !== group)
    .map((other) => comparisons.get(comparisonSlug(group.slug, other.slug)))
    .filter((comparison) => comparison !== undefined)
    .slice(0, relatedComparisonCount);
}

function cheapest(
  offerings: ModelOffering[],
  getPrice: (model: ModelRecord) => number | undefined,
): PriceQuote | undefined {
  let best: PriceQuote | undefined;

  for (const offering of offerings) {
    const price = getPrice(offering.model);

    if (price !== undefined && (!best || price < best.price)) {
      best = { price, providerName: offering.providerName };
    }
  }

  return best;
}

function largest(values: (number | undefined)[]) {
  const defined = values.filter((value) => value !== undefined);
  return defined.length > 0 ? Math.max(...defined) : undefined;
}

function mostlyTrue(values: (boolean | undefined)[]) {
  return values.filter(Boolean).length * 2 >= values.length;
}

function commonValues(lists: string[][]) {
  const counts = new Map<string, number>();

  for (const value of lists.flatMap((list) => [...new Set(list)])) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts]
    .filter(([, count]) => count * 2 >= lists.length)
    .map(([value]) => value)
    .sort();
}

export function summarizeModelGroup(group: ModelGroup): ModelSummary {
  const models = group.offerings.map((offering) => offering.model);
  const releaseDates = models
    .map((model) => model.release_date)
    .filter((value) => value !== undefined && Number.isFinite(Number(value)))
    .sort((a, b) => Number(a) - Number(b));

  return {
    cheapestInput: cheapest(group.offerings, (model) => model.pricing?.input),
    cheapestOutput: cheapest(group.offerings, (model) => model.pricing?.output),
    maxContext: largest(models.map((model) => model.limit?.context)),
    maxOutput: largest(models.map((model) => model.limit?.output)),
    releaseDate: releaseDates[0],
    openWeights: mostlyTrue(models.map((model) => model.open_weights)),
    features: modelFeatureLabels({
      id: group.slug,
      features: {
        reasoning: mostlyTrue(models.map((model) => model.features?.reasoning)),
        tool_call: mostlyTrue(models.map((model) => model.features?.tool_call)),
        structured_output: mostlyTrue(
          models.map((model) => model.features?.structured_output),
        ),
        attachment: mostlyTrue(
          models.map((model) => model.features?.attachment),
        ),
        temperature: mostlyTrue(
          models.map((model) => model.features?.temperature),
        ),
      },
    }),
    modalitiesInput: commonValues(
      models.map((model) => model.modalities?.input ?? []),
    ),
    modalitiesOutput: commonValues(
      models.map((model) => model.modalities?.output ?? []),
    ),
  };
}
