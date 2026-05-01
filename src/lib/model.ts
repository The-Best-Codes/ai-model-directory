import Decimal from "decimal.js";
import { parse, stringify } from "smol-toml";
import { ZodError } from "zod";

import { compactObject, hasOwnValue } from "./object.ts";
import {
  type ModelModality,
  type ModelOverride,
  type ModelRecord,
  featuresSchema,
  limitSchema,
  modelOverrideSchema,
  modelSchema,
  modalitiesSchema,
  pricingSchema,
} from "../schema.ts";

const modalityOrder: readonly ModelModality[] = [
  "audio",
  "file",
  "image",
  "text",
  "video",
];

const featureOrder = [
  "attachment",
  "reasoning",
  "structured_output",
  "temperature",
  "tool_call",
] as const;

const pricingOrder = [
  "cache_read",
  "cache_write",
  "input",
  "input_audio",
  "output",
  "output_audio",
  "reasoning",
] as const;

const limitOrder = ["context", "input", "output"] as const;
const topLevelOrder = [
  "id",
  "knowledge_cutoff",
  "last_updated",
  "name",
  "open_weights",
  "release_date",
  "features",
  "limit",
  "modalities",
  "pricing",
] as const;

function dedupeAndSortModalities(
  values: ModelModality[] | undefined,
): ModelModality[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  const unique = new Set(values);
  return modalityOrder.filter((entry) => unique.has(entry));
}

function emptyToUndefined<T extends Record<string, unknown>>(
  value: T,
): T | undefined {
  return Object.keys(value).length > 0 ? value : undefined;
}

export function timestampFromUnixSeconds(
  value: number | null | undefined,
): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return Number.isInteger(value) && value >= 0 ? String(value) : undefined;
}

export function timestampFromDateInput(
  value: string | Date | null | undefined,
  options: { rejectEpoch?: boolean } = {},
): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "string" && /^(0|[1-9]\d*)$/.test(value)) {
    if (options.rejectEpoch && value === "0") {
      return undefined;
    }

    return value;
  }

  const date = value instanceof Date ? value : new Date(value);
  const timestamp = Math.trunc(date.getTime() / 1000);

  if (!Number.isFinite(timestamp) || timestamp < 0) {
    return undefined;
  }

  if (options.rejectEpoch && timestamp === 0) {
    return undefined;
  }

  return String(timestamp);
}

export function nonNegativeNumber(
  value: number | null | undefined,
): number | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return Number.isFinite(value) && value >= 0 ? value : undefined;
}

export function nonNegativeInteger(
  value: number | null | undefined,
): number | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return Number.isInteger(value) && value >= 0 ? value : undefined;
}

export function pricePerMillion(
  value: string | number | null | undefined,
): number | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  try {
    const result = new Decimal(value).mul(1_000_000).toNumber();

    return Number.isFinite(result) && result >= 0 ? result : undefined;
  } catch {
    return undefined;
  }
}

export function normalizeModelId(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseModelToml(text: string): ModelRecord {
  return normalizeModel(modelSchema.parse(parse(text)));
}

export function parseModelOverrideToml(text: string): ModelOverride {
  return normalizeModelOverride(modelOverrideSchema.parse(parse(text)));
}

export function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");
}

export function normalizeModel(input: ModelRecord): ModelRecord {
  const parsed = modelSchema.parse(input);

  const features = emptyToUndefined(
    compactObject(featuresSchema.parse(parsed.features ?? {})) as Record<
      string,
      unknown
    >,
  ) as ModelRecord["features"];

  const pricing = emptyToUndefined(
    compactObject(pricingSchema.parse(parsed.pricing ?? {})) as Record<
      string,
      unknown
    >,
  ) as ModelRecord["pricing"];

  const limit = emptyToUndefined(
    compactObject(limitSchema.parse(parsed.limit ?? {})) as Record<
      string,
      unknown
    >,
  ) as ModelRecord["limit"];

  const modalitiesValue = modalitiesSchema.parse(parsed.modalities ?? {});
  const modalities = emptyToUndefined(
    compactObject({
      input: dedupeAndSortModalities(modalitiesValue.input),
      output: dedupeAndSortModalities(modalitiesValue.output),
    }),
  ) as ModelRecord["modalities"];

  return compactObject({
    id: parsed.id,
    name: parsed.name,
    knowledge_cutoff: parsed.knowledge_cutoff,
    release_date: parsed.release_date,
    last_updated: parsed.last_updated,
    open_weights: parsed.open_weights,
    features,
    pricing,
    limit,
    modalities,
  }) as ModelRecord;
}

export function normalizeModelOverride(input: ModelOverride): ModelOverride {
  const parsed = modelOverrideSchema.parse(input);

  return compactObject({
    id: parsed.id,
    name: parsed.name,
    knowledge_cutoff: parsed.knowledge_cutoff,
    release_date: parsed.release_date,
    last_updated: parsed.last_updated,
    open_weights: parsed.open_weights,
    features: parsed.features
      ? compactObject(featuresSchema.partial().parse(parsed.features))
      : undefined,
    pricing: parsed.pricing
      ? compactObject(pricingSchema.partial().parse(parsed.pricing))
      : undefined,
    limit: parsed.limit
      ? compactObject(limitSchema.partial().parse(parsed.limit))
      : undefined,
    modalities: parsed.modalities
      ? compactObject({
          input: dedupeAndSortModalities(parsed.modalities.input),
          output: dedupeAndSortModalities(parsed.modalities.output),
        })
      : undefined,
  }) as ModelOverride;
}

export function applyModelOverride(
  model: ModelRecord,
  override: ModelOverride | null,
): ModelRecord {
  if (!override) {
    return model;
  }

  const merged = compactObject({
    id: hasOwnValue(override, "id") ? override.id : model.id,
    name: hasOwnValue(override, "name") ? override.name : model.name,
    knowledge_cutoff: hasOwnValue(override, "knowledge_cutoff")
      ? override.knowledge_cutoff
      : model.knowledge_cutoff,
    release_date: hasOwnValue(override, "release_date")
      ? override.release_date
      : model.release_date,
    last_updated: hasOwnValue(override, "last_updated")
      ? override.last_updated
      : model.last_updated,
    open_weights: hasOwnValue(override, "open_weights")
      ? override.open_weights
      : model.open_weights,
    features:
      override.features || model.features
        ? compactObject({
            ...(model.features ?? {}),
            ...(override.features ?? {}),
          })
        : undefined,
    pricing:
      override.pricing || model.pricing
        ? compactObject({
            ...(model.pricing ?? {}),
            ...(override.pricing ?? {}),
          })
        : undefined,
    limit:
      override.limit || model.limit
        ? compactObject({ ...(model.limit ?? {}), ...(override.limit ?? {}) })
        : undefined,
    modalities:
      override.modalities || model.modalities
        ? compactObject({
            ...(model.modalities ?? {}),
            ...(override.modalities ?? {}),
          })
        : undefined,
  }) as ModelRecord;

  return normalizeModel(merged);
}

function orderEntries<T extends object, K extends readonly (keyof T)[]>(
  value: T | undefined,
  keys: K,
): Partial<T> | undefined {
  if (!value) {
    return undefined;
  }

  const ordered = {} as Partial<T>;

  for (const key of keys) {
    const entry = value[key];

    if (entry !== undefined) {
      ordered[key] = entry;
    }
  }

  return Object.keys(ordered).length > 0 ? ordered : undefined;
}

export function serializeModelToml(model: ModelRecord): string {
  const normalized = normalizeModel(model);
  const ordered = {} as Record<string, unknown>;

  for (const key of topLevelOrder) {
    if (key === "features") {
      const entry = orderEntries(normalized.features, featureOrder);

      if (entry) {
        ordered.features = entry;
      }

      continue;
    }

    if (key === "pricing") {
      const entry = orderEntries(normalized.pricing, pricingOrder);

      if (entry) {
        ordered.pricing = entry;
      }

      continue;
    }

    if (key === "limit") {
      const entry = orderEntries(normalized.limit, limitOrder);

      if (entry) {
        ordered.limit = entry;
      }

      continue;
    }

    if (key === "modalities") {
      const entry = orderEntries(normalized.modalities, ["input", "output"]);

      if (entry) {
        ordered.modalities = entry;
      }

      continue;
    }

    const entry = normalized[key];

    if (entry !== undefined) {
      ordered[key] = entry;
    }
  }

  return stringify(ordered);
}
