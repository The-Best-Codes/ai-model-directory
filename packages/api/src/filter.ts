import type { FlatModel, ModelModality } from "./types.ts";

type ModelFilter = {
  provider?: string;
  search?: string;
  inputModality?: ModelModality;
  outputModality?: ModelModality;
  feature?: string;
  minContext?: number;
  maxInputPrice?: number;
  openWeights?: boolean;
  sort?: string;
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
};

type FilterResult = {
  data: FlatModel[];
  total: number;
};

const VALID_FEATURES = new Set([
  "attachment",
  "reasoning",
  "tool_call",
  "structured_output",
  "temperature",
]);

const VALID_SORT_FIELDS = new Set([
  "id",
  "name",
  "context",
  "input_price",
  "output_price",
  "output_limit",
]);

function matchesSearch(model: FlatModel, query: string): boolean {
  const lower = query.toLowerCase();
  if (model.id.toLowerCase().includes(lower)) return true;
  if (model.name && model.name.toLowerCase().includes(lower)) return true;
  return false;
}

function matchesFeature(model: FlatModel, feature: string): boolean {
  if (!VALID_FEATURES.has(feature)) return false;
  return model.features?.[feature as keyof typeof model.features] === true;
}

function sortModels(
  models: FlatModel[],
  field: string,
  order: "asc" | "desc"
): FlatModel[] {
  const multiplier = order === "desc" ? -1 : 1;

  return models.sort((a, b) => {
    let va: number | string;
    let vb: number | string;

    switch (field) {
      case "id":
        va = a.id;
        vb = b.id;
        break;
      case "name":
        va = a.name ?? a.id;
        vb = b.name ?? b.id;
        break;
      case "context":
        va = a.limit?.context ?? 0;
        vb = b.limit?.context ?? 0;
        break;
      case "input_price":
        va = a.pricing?.input ?? Infinity;
        vb = b.pricing?.input ?? Infinity;
        break;
      case "output_price":
        va = a.pricing?.output ?? Infinity;
        vb = b.pricing?.output ?? Infinity;
        break;
      case "output_limit":
        va = a.limit?.output ?? 0;
        vb = b.limit?.output ?? 0;
        break;
      default:
        return 0;
    }

    if (typeof va === "string" && typeof vb === "string") {
      return multiplier * va.localeCompare(vb);
    }

    return multiplier * ((va as number) - (vb as number));
  });
}

export function filterModels(
  models: FlatModel[],
  filter: ModelFilter
): FilterResult {
  let result = models;

  if (filter.provider) {
    const providerLower = filter.provider.toLowerCase();
    result = result.filter((m) => m.provider.toLowerCase() === providerLower);
  }

  if (filter.search) {
    result = result.filter((m) => matchesSearch(m, filter.search!));
  }

  if (filter.inputModality) {
    result = result.filter(
      (m) => m.modalities?.input?.includes(filter.inputModality!) ?? false
    );
  }

  if (filter.outputModality) {
    result = result.filter(
      (m) => m.modalities?.output?.includes(filter.outputModality!) ?? false
    );
  }

  if (filter.feature) {
    const features = filter.feature.split(",").map((f) => f.trim());
    for (const feature of features) {
      if (VALID_FEATURES.has(feature)) {
        result = result.filter((m) => matchesFeature(m, feature));
      }
    }
  }

  if (filter.minContext !== undefined) {
    result = result.filter(
      (m) => (m.limit?.context ?? 0) >= filter.minContext!
    );
  }

  if (filter.maxInputPrice !== undefined) {
    result = result.filter((m) => {
      const price = m.pricing?.input;
      return price !== undefined && price <= filter.maxInputPrice!;
    });
  }

  if (filter.openWeights !== undefined) {
    result = result.filter((m) => m.open_weights === filter.openWeights);
  }

  if (filter.sort && VALID_SORT_FIELDS.has(filter.sort)) {
    result = sortModels(result, filter.sort, filter.order ?? "asc");
  }

  const total = result.length;
  const offset = filter.offset ?? 0;
  const limit = filter.limit ?? 50;
  const clampedLimit = Math.min(limit, 200);

  const data = result.slice(offset, offset + clampedLimit);

  return { data, total };
}

export type { ModelFilter, FilterResult };
