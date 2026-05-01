import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { parse, stringify } from "smol-toml";
import { z } from "zod";

import { ProgressBar, type ProgressReporter } from "./progress.ts";
import {
  FeaturesSchema,
  LimitSchema,
  ModalitiesSchema,
  OptionalScalars,
  PricingSchema,
  type ProviderModel,
  RequiredFields,
} from "./schema.ts";
import {
  fetchModels as fetchAbacusModels,
  outputDirectory as abacusOutputDirectory,
} from "./updaters/abacus.ts";
import {
  fetchModels as fetchAIHubMixModels,
  outputDirectory as aihubmixOutputDirectory,
} from "./updaters/aihubmix.ts";
import {
  fetchModels as fetchAnthropicModels,
  outputDirectory as anthropicOutputDirectory,
} from "./updaters/anthropic.ts";
import {
  fetchModels as fetchChutesModels,
  outputDirectory as chutesOutputDirectory,
} from "./updaters/chutes.ts";
import {
  fetchModels as fetchCortecsModels,
  outputDirectory as cortecsOutputDirectory,
} from "./updaters/cortecs.ts";
import {
  fetchModels as fetchDeepInfraModels,
  outputDirectory as deepInfraOutputDirectory,
} from "./updaters/deepinfra.ts";
import {
  fetchModels as fetchOpenAIModels,
  outputDirectory as openAIOutputDirectory,
} from "./updaters/openai.ts";
import {
  fetchModels as fetchOpenRouterModels,
  outputDirectory as openRouterOutputDirectory,
} from "./updaters/openrouter.ts";

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
 * Recursively sort object keys alphabetically so that TOML output
 * has a stable, deterministic ordering across runs.
 * Arrays are preserved in their original order.
 */
function sortKeysDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => sortKeysDeep(item)) as unknown as T;
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);

    // TOML requires scalar keys to appear before any table keys at the
    // same level — otherwise scalars after a [table] header would be
    // parsed as part of that table. So we sort scalars first (alphabetical),
    // then tables (alphabetical).
    const isTable = (v: unknown): boolean =>
      v !== null &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      !(v instanceof Date);

    entries.sort(([a, av], [b, bv]) => {
      const aTable = isTable(av);
      const bTable = isTable(bv);

      if (aTable !== bTable) return aTable ? 1 : -1;

      return a.localeCompare(b);
    });

    const sorted: Record<string, unknown> = {};

    for (const [key, v] of entries) {
      sorted[key] = sortKeysDeep(v);
    }

    return sorted as T;
  }

  return value;
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
 * Parse an existing TOML file into a ProviderModel.
 * Fields that don't match the schema are silently dropped.
 */
function parseExistingToml(raw: string): ProviderModel | null {
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
  }) as ProviderModel;
}

/**
 * Merge a ProviderModel (incoming from updater) into an existing ProviderModel.
 *
 * Rules:
 *   - Required fields are always taken from the incoming model (validated).
 *   - Optional fields: incoming valid value wins; existing preserved if incoming absent/invalid.
 *   - Table fields: merge field-by-field using the same rule.
 */
function mergeModel(
  existing: ProviderModel | null,
  incoming: ProviderModel,
): ProviderModel | null {
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
  }) as ProviderModel;
}

// Provider runner
type Updater = {
  name: string;
  fetchModels: (progress?: ProgressReporter) => Promise<ProviderModel[]>;
  outputDirectory: string;
};

type RunResult = { written: number; errors: number };

async function runUpdater(
  rootDirectory: string,
  updater: Updater,
  progress: ProgressBar,
): Promise<RunResult> {
  const models = await updater.fetchModels(progress);
  const absOutputDir = join(rootDirectory, updater.outputDirectory);

  await mkdir(absOutputDir, { recursive: true });

  // Check for normalized directory collisions before writing anything
  const seen = new Map<string, string>();

  for (const model of models) {
    if (!model.id) continue;

    const dir = normalizeDirectoryName(model.id);
    const prev = seen.get(dir);

    if (prev !== undefined && prev !== model.id) {
      progress.log(
        `⚠ Directory collision: "${prev}" and "${model.id}" -> "${dir}" (skipping latter)`,
      );
      continue;
    }

    seen.set(dir, model.id);
  }

  // Materialize the writable subset so we know the phase total upfront
  const toWrite = models.filter(
    (m) => m.id && seen.get(normalizeDirectoryName(m.id)) === m.id,
  );

  progress.beginPhase("writing", toWrite.length);

  let written = 0;
  let errors = 0;

  for (const model of toWrite) {
    const dir = normalizeDirectoryName(model.id);
    const modelDir = join(absOutputDir, dir);
    const modelFile = join(modelDir, "index.toml");

    try {
      await mkdir(modelDir, { recursive: true });

      // Read existing TOML if present
      const existingFile = Bun.file(modelFile);
      let existing: ProviderModel | null = null;

      if (await existingFile.exists()) {
        existing = parseExistingToml(await existingFile.text());
      }

      // Merge and validate
      const merged = mergeModel(existing, model);

      if (merged === null) {
        errors++;
        progress.log(
          `⚠ Skipping "${model.id}": failed required field validation`,
        );
        progress.tick(model.id, false);
        continue;
      }

      await Bun.write(
        modelFile,
        stringify(sortKeysDeep(merged) as Record<string, unknown>),
      );
      written++;
      progress.tick(model.id, true);
    } catch (error) {
      errors++;
      progress.log(
        `⚠ Error writing "${model.id}": ${error instanceof Error ? error.message : String(error)}`,
      );
      progress.tick(model.id, false);
    }
  }

  return { written, errors };
}

// Main
const UPDATERS: Updater[] = [
  {
    name: "openrouter",
    fetchModels: fetchOpenRouterModels,
    outputDirectory: openRouterOutputDirectory,
  },
  {
    name: "openai",
    fetchModels: fetchOpenAIModels,
    outputDirectory: openAIOutputDirectory,
  },
  {
    name: "anthropic",
    fetchModels: fetchAnthropicModels,
    outputDirectory: anthropicOutputDirectory,
  },
  {
    name: "abacus",
    fetchModels: fetchAbacusModels,
    outputDirectory: abacusOutputDirectory,
  },
  {
    name: "aihubmix",
    fetchModels: fetchAIHubMixModels,
    outputDirectory: aihubmixOutputDirectory,
  },
  {
    name: "chutes",
    fetchModels: fetchChutesModels,
    outputDirectory: chutesOutputDirectory,
  },
  {
    name: "cortecs",
    fetchModels: fetchCortecsModels,
    outputDirectory: cortecsOutputDirectory,
  },
  {
    name: "deepinfra",
    fetchModels: fetchDeepInfraModels,
    outputDirectory: deepInfraOutputDirectory,
  },
];

/**
 * Parse `--providers <list>` / `--providers=<list>` (also `--only`)
 * from process.argv. List items are comma- or space-separated.
 * Returns null if no flag was passed (meaning: run all).
 */
function parseProviderFilter(argv: string[]): Set<string> | null {
  const items: string[] = [];
  let seen = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === undefined) continue;

    if (arg === "--providers" || arg === "--only" || arg === "-p") {
      seen = true;
      const next = argv[i + 1];

      if (next !== undefined && !next.startsWith("-")) {
        items.push(...next.split(","));
        i++;
      }
      continue;
    }

    const eqMatch = arg.match(/^(?:--providers|--only|-p)=(.*)$/);

    if (eqMatch) {
      seen = true;
      items.push(...(eqMatch[1] ?? "").split(","));
    }
  }

  if (!seen) return null;

  const cleaned = items
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);

  return new Set(cleaned);
}

async function main() {
  const rootDirectory = import.meta.dir;
  const progress = new ProgressBar();
  const summaries: string[] = [];

  const filter = parseProviderFilter(process.argv.slice(2));
  const known = new Set(UPDATERS.map((u) => u.name));

  if (filter !== null) {
    const unknown = [...filter].filter((n) => !known.has(n));

    if (unknown.length > 0) {
      console.error(
        `Unknown provider(s): ${unknown.join(", ")}\n` +
          `Available: ${[...known].join(", ")}`,
      );
      process.exit(1);
    }
  }

  const selected = UPDATERS.filter(
    (u) => filter === null || filter.has(u.name),
  );

  if (selected.length === 0) {
    console.log("No providers selected.");
    return;
  }

  try {
    for (let i = 0; i < selected.length; i++) {
      const updater = selected[i]!;
      const providerName = updater.name;

      progress.beginProvider(i + 1, selected.length, providerName);

      try {
        const { written, errors } = await runUpdater(
          rootDirectory,
          updater,
          progress,
        );

        summaries.push(
          `✓ ${providerName}: wrote ${written} models to ${updater.outputDirectory}` +
            (errors > 0 ? ` (${errors} errors)` : ""),
        );
      } catch (error) {
        summaries.push(
          `✗ ${providerName}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  } finally {
    progress.stop();
  }

  for (const line of summaries) {
    console.log(line);
  }
}

await main();
