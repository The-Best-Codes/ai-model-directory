import type {
  FlatModel,
  ModelFeatures,
  ModelModality,
  RouteQuery,
  RouteResult,
} from "./types.ts";
import { loadFlatModels } from "./store.ts";

function matchesInputModality(
  model: FlatModel,
  modalities: ModelModality[]
): boolean {
  if (!model.modalities?.input) return false;
  return modalities.every((m) => model.modalities!.input!.includes(m));
}

function matchesOutputModality(
  model: FlatModel,
  modalities: ModelModality[]
): boolean {
  if (!model.modalities?.output) return false;
  return modalities.every((m) => model.modalities!.output!.includes(m));
}

function matchesFeatures(
  model: FlatModel,
  features: Partial<ModelFeatures>
): boolean {
  if (!model.features) return false;
  for (const [key, value] of Object.entries(features)) {
    if (value === true && model.features[key as keyof ModelFeatures] !== true) {
      return false;
    }
  }
  return true;
}

function sortModels(
  models: FlatModel[],
  field: RouteQuery["sort"],
  order: RouteQuery["order"]
): FlatModel[] {
  if (!field) return models;

  const mult = order === "desc" ? -1 : 1;

  return [...models].sort((a, b) => {
    let va: number | string;
    let vb: number | string;

    switch (field) {
      case "id":
        va = a.id;
        vb = b.id;
        return mult * va.localeCompare(vb);
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
      default:
        return 0;
    }

    return mult * ((va as number) - (vb as number));
  });
}

export function route(query: RouteQuery): RouteResult {
  let models = loadFlatModels();

  if (query.provider) {
    const lower = query.provider.toLowerCase();
    models = models.filter((m) => m.provider.toLowerCase() === lower);
  }

  if (query.inputModalities && query.inputModalities.length > 0) {
    models = models.filter((m) =>
      matchesInputModality(m, query.inputModalities!)
    );
  }

  if (query.outputModalities && query.outputModalities.length > 0) {
    models = models.filter((m) =>
      matchesOutputModality(m, query.outputModalities!)
    );
  }

  if (query.features) {
    models = models.filter((m) => matchesFeatures(m, query.features!));
  }

  if (query.minContext !== undefined) {
    models = models.filter((m) => (m.limit?.context ?? 0) >= query.minContext!);
  }

  if (query.maxInputPrice !== undefined) {
    models = models.filter(
      (m) =>
        m.pricing?.input !== undefined &&
        m.pricing.input <= query.maxInputPrice!
    );
  }

  if (query.maxOutputPrice !== undefined) {
    models = models.filter(
      (m) =>
        m.pricing?.output !== undefined &&
        m.pricing.output <= query.maxOutputPrice!
    );
  }

  if (query.openWeights !== undefined) {
    models = models.filter((m) => m.open_weights === query.openWeights);
  }

  if (query.sort) {
    models = sortModels(models, query.sort, query.order);
  }

  const total = models.length;
  const limit = query.limit ?? 50;
  const offset = query.offset ?? 0;
  const paged = models.slice(offset, offset + limit);
  const hasMore = offset + limit < total;

  return { models: paged, total, hasMore };
}
