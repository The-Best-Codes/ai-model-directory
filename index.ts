import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { parse, stringify } from "smol-toml";
import { z } from "zod";

import {
  fetchModels as fetchOpenRouterModels,
  outputDirectory as openRouterOutputDirectory,
  type ProviderModel,
} from "./updaters/openrouter.ts";

// Required fields: the model is skipped entirely if they fail validation.
// Optional fields: if invalid or absent, the key is simply omitted/preserved.

const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be yyyy-mm-dd");
const Price = z.number().nonnegative();
const Modality = z.enum(["audio", "file", "image", "text", "video"]);

// Required top-level scalars
const RequiredFields = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

// Optional top-level scalars
const OptionalScalars = z.object({
  knowledge_cutoff: IsoDate.optional(),
  release_date: IsoDate.optional(),
  last_updated: IsoDate.optional(),
  open_weights: z.boolean().optional(),
});

// Optional tables
const FeaturesSchema = z.object({
  attachment: z.boolean().optional(),
  reasoning: z.boolean().optional(),
  tool_call: z.boolean().optional(),
  structured_output: z.boolean().optional(),
  temperature: z.boolean().optional(),
});

const PricingSchema = z.object({
  input: Price.optional(),
  output: Price.optional(),
  reasoning: Price.optional(),
  cache_read: Price.optional(),
  cache_write: Price.optional(),
  input_audio: Price.optional(),
  output_audio: Price.optional(),
});

const LimitSchema = z.object({
  context: z.number().int().nonnegative().optional(),
  input: z.number().int().nonnegative().optional(),
  output: z.number().int().nonnegative().optional(),
});

const ModalitiesSchema = z.object({
  input: z.array(Modality).optional(),
  output: z.array(Modality).optional(),
});

// Derived types
type RequiredFields = z.infer<typeof RequiredFields>;
type OptionalScalars = z.infer<typeof OptionalScalars>;
type FeaturesTable = z.infer<typeof FeaturesSchema>;
type PricingTable = z.infer<typeof PricingSchema>;
type LimitTable = z.infer<typeof LimitSchema>;
type ModalitiesTable = z.infer<typeof ModalitiesSchema>;

type ModelToml = RequiredFields &
  OptionalScalars & {
    features?: FeaturesTable;
    pricing?: PricingTable;
    limit?: LimitTable;
    modalities?: ModalitiesTable;
  };

// Helpers
function normalizeDirectoryName(modelId: string): string {
  return modelId
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function compact<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

/**
 * Validate a table object against a zod schema, keeping only valid fields.
 * Returns undefined if the resulting object has no keys.
 */
function validateTable<S extends z.ZodObject<z.ZodRawShape>>(
  schema: S,
  incoming: unknown,
  existing: z.infer<S> | undefined,
): z.infer<S> | undefined {
  const base: Record<string, unknown> = {};

  // Start from existing validated values
  if (existing !== undefined) {
    Object.assign(base, existing);
  }

  // Merge in each incoming field individually; skip invalid ones
  if (
    incoming !== null &&
    typeof incoming === "object" &&
    !Array.isArray(incoming)
  ) {
    for (const [key, fieldSchema] of Object.entries(schema.shape) as Array<
      [string, z.ZodTypeAny]
    >) {
      const value = (incoming as Record<string, unknown>)[key];

      if (value === undefined) continue;

      const result = fieldSchema.safeParse(value);

      if (result.success) {
        base[key] = result.data;
      }
      // else: leave existing value intact (already in base)
    }
  }

  const parsed = schema.safeParse(base);

  if (!parsed.success) return undefined;

  const cleaned = compact(parsed.data as Record<string, unknown>);

  return Object.keys(cleaned).length > 0 ? (cleaned as z.infer<S>) : undefined;
}

/**
 * Parse an existing TOML file into a ModelToml.
 * Fields that don't match the schema are silently dropped.
 */
function parseExistingToml(raw: string): ModelToml | null {
  let parsed: unknown;

  try {
    parsed = parse(raw);
  } catch {
    return null;
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }

  const record = parsed as Record<string, unknown>;

  const required = RequiredFields.safeParse(record);

  if (!required.success) return null;

  const optional = OptionalScalars.safeParse(record);

  return compact({
    ...required.data,
    ...(optional.success
      ? compact(optional.data as Record<string, unknown>)
      : {}),
    features: validateTable(FeaturesSchema, record.features, undefined),
    pricing: validateTable(PricingSchema, record.pricing, undefined),
    limit: validateTable(LimitSchema, record.limit, undefined),
    modalities: validateTable(ModalitiesSchema, record.modalities, undefined),
  }) as ModelToml;
}

/**
 * Merge a ProviderModel (incoming from updater) into an existing ModelToml.
 *
 * Rules:
 *   - Required fields are always taken from the incoming model (validated).
 *   - Optional fields: incoming valid value wins; existing preserved if incoming absent/invalid.
 *   - Table fields: merge field-by-field using the same rule.
 */
function mergeModel(
  existing: ModelToml | null,
  incoming: ProviderModel,
): ModelToml | null {
  // Validate required fields first, bail out entirely if they fail
  const required = RequiredFields.safeParse(incoming);

  if (!required.success) return null;

  // Merge optional scalars
  const baseScalars: Record<string, unknown> = { ...(existing ?? {}) };

  for (const [key, fieldSchema] of Object.entries(OptionalScalars.shape)) {
    const value = (incoming as Record<string, unknown>)[key];

    if (value === undefined) continue;

    const result = fieldSchema.safeParse(value);

    if (result.success && result.data !== undefined) {
      baseScalars[key] = result.data;
    }
  }

  return compact({
    ...baseScalars,
    ...required.data,
    features: validateTable(
      FeaturesSchema,
      incoming.features,
      existing?.features,
    ),
    pricing: validateTable(PricingSchema, incoming.pricing, existing?.pricing),
    limit: validateTable(LimitSchema, incoming.limit, existing?.limit),
    modalities: validateTable(
      ModalitiesSchema,
      incoming.modalities,
      existing?.modalities,
    ),
  }) as ModelToml;
}

// Provider runner
type Updater = {
  fetchModels: () => Promise<ProviderModel[]>;
  outputDirectory: string;
};

async function runUpdater(
  rootDirectory: string,
  updater: Updater,
): Promise<number> {
  const models = await updater.fetchModels();
  const absOutputDir = join(rootDirectory, updater.outputDirectory);

  await mkdir(absOutputDir, { recursive: true });

  // Check for normalized directory collisions before writing anything
  const seen = new Map<string, string>();

  for (const model of models) {
    if (!model.id) continue;

    const dir = normalizeDirectoryName(model.id);
    const prev = seen.get(dir);

    if (prev !== undefined && prev !== model.id) {
      console.warn(
        `⚠ Directory collision: "${prev}" and "${model.id}" -> "${dir}" (skipping latter)`,
      );
      continue;
    }

    seen.set(dir, model.id);
  }

  let written = 0;

  for (const model of models) {
    if (!model.id) continue;

    const dir = normalizeDirectoryName(model.id);

    // Skip the colliding duplicate
    if (seen.get(dir) !== model.id) continue;

    const modelDir = join(absOutputDir, dir);
    const modelFile = join(modelDir, "index.toml");

    await mkdir(modelDir, { recursive: true });

    // Read existing TOML if present
    const existingFile = Bun.file(modelFile);
    let existing: ModelToml | null = null;

    if (await existingFile.exists()) {
      existing = parseExistingToml(await existingFile.text());
    }

    // Merge and validate
    const merged = mergeModel(existing, model);

    if (merged === null) {
      console.warn(
        `⚠ Skipping "${model.id}": failed required field validation`,
      );
      continue;
    }

    await Bun.write(modelFile, stringify(merged as Record<string, unknown>));
    written++;
  }

  return written;
}

// Main
const UPDATERS: Updater[] = [
  {
    fetchModels: fetchOpenRouterModels,
    outputDirectory: openRouterOutputDirectory,
  },
];

async function main() {
  const rootDirectory = import.meta.dir;

  for (const updater of UPDATERS) {
    const providerName =
      updater.outputDirectory.split("/").at(-2) ?? updater.outputDirectory;

    console.log(`Updating ${providerName}...`);

    const written = await runUpdater(rootDirectory, updater);

    console.log(`✓ Wrote ${written} models to ${updater.outputDirectory}`);
  }
}

await main();
