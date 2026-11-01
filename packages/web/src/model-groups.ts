import { loadDirectoryData, type DirectoryData } from "#/directory-data";
import { modelFeatureLabels } from "#/lib/format";
import { canonicalModelSlug, comparisonSlug } from "#/lib/model-slug";
import { normalizeSearchText } from "#/lib/search-text";

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
  openWeights?: boolean;
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
  aliases: Map<string, string>;
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

function createGroup(slug: string, offerings: ModelOffering[]): ModelGroup {
  return {
    slug,
    name: pickGroupName(offerings),
    providerCount: new Set(offerings.map((offering) => offering.providerId))
      .size,
    offerings,
  };
}

function sharesNameToken(group: ModelGroup, nameText: string) {
  const nameTokens = new Set(nameText.split(" "));
  return group.slug.split("-").some((token) => nameTokens.has(token));
}

function mergeGroupsByName(groups: ModelGroup[]) {
  const clusters = new Map<string, ModelGroup[]>();

  for (const group of groups) {
    const nameText = normalizeSearchText(group.name);

    if (sharesNameToken(group, nameText)) {
      const cluster = clusters.get(nameText) ?? [];
      cluster.push(group);
      clusters.set(nameText, cluster);
    }
  }

  const merged = new Map(groups.map((group) => [group.slug, group]));
  const aliases = new Map<string, string>();

  for (const cluster of clusters.values()) {
    if (cluster.length < 2) {
      continue;
    }

    const [primary, ...duplicates] = cluster.toSorted(
      (a, b) =>
        b.providerCount - a.providerCount || a.slug.length - b.slug.length,
    );

    for (const duplicate of duplicates) {
      merged.delete(duplicate.slug);
      aliases.set(duplicate.slug, primary!.slug);
    }

    merged.set(
      primary!.slug,
      createGroup(
        primary!.slug,
        cluster.flatMap((group) => group.offerings),
      ),
    );
  }

  return { groups: merged, aliases };
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

  const { groups, aliases } = mergeGroupsByName(
    [...offeringsBySlug].map(([slug, offerings]) =>
      createGroup(slug, offerings),
    ),
  );

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

  return { groups, aliases, ranked, comparisons };
}

function resolveModelGroup(index: ModelIndex, slug: string) {
  return index.groups.get(index.aliases.get(slug) ?? slug);
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
  return resolveModelGroup(await loadModelIndex(), slug);
}

export async function getComparison(slug: string) {
  const index = await loadModelIndex();
  const known = index.comparisons.get(slug);

  if (known) {
    return known;
  }

  for (const match of slug.matchAll(/-vs-/g)) {
    const left = resolveModelGroup(index, slug.slice(0, match.index));
    const right = resolveModelGroup(index, slug.slice(match.index + 4));

    if (left && right && left !== right) {
      return (
        index.comparisons.get(comparisonSlug(left.slug, right.slug)) ??
        createComparison(left, right)
      );
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

const batchPricing = /(^|[/:_.-])batch([/:_.-]|$)/i;

function lowestPrice(
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

function cheapest(
  offerings: ModelOffering[],
  getPrice: (model: ModelRecord) => number | undefined,
): PriceQuote | undefined {
  const realtime = offerings.filter(
    (offering) => !batchPricing.test(offering.model.id),
  );

  return lowestPrice(realtime, getPrice) ?? lowestPrice(offerings, getPrice);
}

function largest(values: (number | undefined)[]) {
  const defined = values.filter((value) => value !== undefined);
  return defined.length > 0 ? Math.max(...defined) : undefined;
}

function mostlyTrue(values: (boolean | undefined)[]) {
  const known = values.filter((value) => value !== undefined);

  if (known.length === 0) {
    return undefined;
  }

  return known.filter(Boolean).length * 2 >= known.length;
}

function commonValues(lists: string[][]) {
  const known = lists.filter((list) => list.length > 0);
  const counts = new Map<string, number>();

  for (const value of known.flatMap((list) => [...new Set(list)])) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts]
    .filter(([, count]) => count * 2 >= known.length)
    .map(([value]) => value)
    .sort();
}

const featureKeys = [
  "reasoning",
  "tool_call",
  "structured_output",
  "attachment",
  "temperature",
] as const satisfies (keyof NonNullable<ModelRecord["features"]>)[];

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
      features: Object.fromEntries(
        featureKeys.map((key) => [
          key,
          mostlyTrue(models.map((model) => model.features?.[key])),
        ]),
      ),
    }),
    modalitiesInput: commonValues(
      models.map((model) => model.modalities?.input ?? []),
    ),
    modalitiesOutput: commonValues(
      models.map((model) => model.modalities?.output ?? []),
    ),
  };
}
