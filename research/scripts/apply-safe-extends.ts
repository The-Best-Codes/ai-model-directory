import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import {
  applyExtendsOmit,
  mergeModelSources,
  parseMetadataToml,
  parseModelToml,
  serializeModelToml,
} from "../../src/lib/model.ts";

type ModelRecordLike = Record<string, unknown>;

type ProviderBucket = {
  id: string;
  models: Record<string, ModelRecordLike>;
};

type Dataset = Record<string, ProviderBucket>;

type CandidateType =
  | "openrouter-complete"
  | "prefix-complete"
  | "prefix-partial-xai";

type Candidate = {
  provider: string;
  modelId: string;
  providerModelDir: string;
  sourceProvider: string;
  sourceModelId: string;
  sourceModelDir: string;
  sourcePath: string;
  type: CandidateType;
  missingFields: string[];
  sourceMissingFields: string[];
};

type Report = {
  generatedAt: string;
  totalCandidates: number;
  byType: Record<string, number>;
  byProvider: Record<string, number>;
  writtenMetadataFiles: number;
  updatedIndexFiles: number;
  unchangedIndexFiles: number;
};

const requiredFields = [
  "name",
  "limit.context",
  "pricing.input",
  "pricing.output",
  "features.attachment",
  "features.tool_call",
  "modalities.input",
  "modalities.output",
] as const;

function normalizeModelId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getNestedValue(input: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let cursor: unknown = input;

  for (const part of parts) {
    if (
      cursor &&
      typeof cursor === "object" &&
      Object.prototype.hasOwnProperty.call(cursor, part)
    ) {
      cursor = (cursor as Record<string, unknown>)[part];
      continue;
    }

    return undefined;
  }

  return cursor;
}

function missingRequiredFields(model: Record<string, unknown>): string[] {
  return requiredFields.filter(
    (field) => getNestedValue(model, field) === undefined,
  );
}

function isComplete(model: Record<string, unknown>): boolean {
  return missingRequiredFields(model).length === 0;
}

function loadDataset(rootDirectory: string): Dataset {
  return JSON.parse(
    readFileSync(join(rootDirectory, "data", "all.min.json"), "utf8"),
  ) as Dataset;
}

function buildOpenRouterIndex(dataset: Dataset) {
  const openrouterBucket = dataset.openrouter;

  if (!openrouterBucket) {
    throw new Error("openrouter provider is missing from data/all.min.json");
  }

  const map = new Map<string, { id: string; model: ModelRecordLike }>();

  for (const [modelId, model] of Object.entries(openrouterBucket.models)) {
    map.set(normalizeModelId(modelId), { id: modelId, model });
  }

  return map;
}

function candidateMetadataPath(
  rootDirectory: string,
  provider: string,
  providerModelDir: string,
): string {
  return join(
    rootDirectory,
    "data",
    "providers",
    provider,
    "models",
    providerModelDir,
    "metadata.toml",
  );
}

function modelIndexPath(
  rootDirectory: string,
  provider: string,
  providerModelDir: string,
): string {
  return join(
    rootDirectory,
    "data",
    "providers",
    provider,
    "models",
    providerModelDir,
    "index.toml",
  );
}

function sourceIndexPath(rootDirectory: string, sourcePath: string): string {
  return join(rootDirectory, "data", "providers", sourcePath, "index.toml");
}

function upsertCandidate(
  candidates: Candidate[],
  seenKeys: Set<string>,
  candidate: Candidate,
): void {
  const key = `${candidate.provider}|${candidate.modelId}`;

  if (seenKeys.has(key)) {
    return;
  }

  seenKeys.add(key);
  candidates.push(candidate);
}

function findBestSourceModel(
  sourceModels: Record<string, ModelRecordLike>,
  sourceIdHint: string,
): { sourceModelId: string; sourceModel: ModelRecordLike } | null {
  const normalized = normalizeModelId(sourceIdHint);

  for (const [sourceModelId, sourceModel] of Object.entries(sourceModels)) {
    if (normalizeModelId(sourceModelId) === normalized) {
      return { sourceModelId, sourceModel };
    }
  }

  return null;
}

function buildCandidates(rootDirectory: string, dataset: Dataset): Candidate[] {
  const candidates: Candidate[] = [];
  const seenKeys = new Set<string>();
  const openrouterIndex = buildOpenRouterIndex(dataset);

  for (const [provider, providerBucket] of Object.entries(dataset)) {
    if (provider === "openrouter") {
      continue;
    }

    for (const [modelId, model] of Object.entries(providerBucket.models)) {
      const missingFields = missingRequiredFields(model);

      if (missingFields.length === 0) {
        continue;
      }

      const providerModelDir = normalizeModelId(modelId);
      const metadataPath = candidateMetadataPath(
        rootDirectory,
        provider,
        providerModelDir,
      );

      if (existsSync(metadataPath)) {
        continue;
      }

      const openrouterMatch = openrouterIndex.get(providerModelDir);

      if (openrouterMatch && isComplete(openrouterMatch.model)) {
        const sourceModelDir = normalizeModelId(openrouterMatch.id);
        const sourcePath = `openrouter/models/${sourceModelDir}`;

        if (existsSync(sourceIndexPath(rootDirectory, sourcePath))) {
          upsertCandidate(candidates, seenKeys, {
            provider,
            modelId,
            providerModelDir,
            sourceProvider: "openrouter",
            sourceModelId: openrouterMatch.id,
            sourceModelDir,
            sourcePath,
            type: "openrouter-complete",
            missingFields,
            sourceMissingFields: [],
          });
        }

        continue;
      }

      const slashIndex = modelId.indexOf("/");

      if (slashIndex <= 0) {
        continue;
      }

      const sourceProvider = modelId.slice(0, slashIndex).toLowerCase();
      const sourceIdHint = modelId.slice(slashIndex + 1);

      if (!dataset[sourceProvider]) {
        continue;
      }

      const sourceMatch = findBestSourceModel(
        dataset[sourceProvider].models,
        sourceIdHint,
      );

      if (!sourceMatch) {
        continue;
      }

      const sourceMissing = missingRequiredFields(sourceMatch.sourceModel);
      const sourceModelDir = normalizeModelId(sourceMatch.sourceModelId);
      const sourcePath = `${sourceProvider}/models/${sourceModelDir}`;

      if (!existsSync(sourceIndexPath(rootDirectory, sourcePath))) {
        continue;
      }

      if (sourceMissing.length === 0) {
        upsertCandidate(candidates, seenKeys, {
          provider,
          modelId,
          providerModelDir,
          sourceProvider,
          sourceModelId: sourceMatch.sourceModelId,
          sourceModelDir,
          sourcePath,
          type: "prefix-complete",
          missingFields,
          sourceMissingFields: sourceMissing,
        });
      }
    }
  }

  const perplexityBucket = dataset.perplexity;
  const xaiBucket = dataset.xai;

  if (perplexityBucket && xaiBucket) {
    for (const [modelId, model] of Object.entries(perplexityBucket.models)) {
      if (!modelId.startsWith("xai/")) {
        continue;
      }

      const missingFields = missingRequiredFields(model);

      if (!missingFields.includes("name")) {
        continue;
      }

      const providerModelDir = normalizeModelId(modelId);
      const metadataPath = candidateMetadataPath(
        rootDirectory,
        "perplexity",
        providerModelDir,
      );

      if (existsSync(metadataPath)) {
        continue;
      }

      const sourceIdHint = modelId.slice(4);
      const sourceMatch = findBestSourceModel(xaiBucket.models, sourceIdHint);

      if (!sourceMatch) {
        continue;
      }

      const sourceMissing = missingRequiredFields(sourceMatch.sourceModel);
      const sourceModelDir = normalizeModelId(sourceMatch.sourceModelId);
      const sourcePath = `xai/models/${sourceModelDir}`;

      if (!existsSync(sourceIndexPath(rootDirectory, sourcePath))) {
        continue;
      }

      upsertCandidate(candidates, seenKeys, {
        provider: "perplexity",
        modelId,
        providerModelDir,
        sourceProvider: "xai",
        sourceModelId: sourceMatch.sourceModelId,
        sourceModelDir,
        sourcePath,
        type: "prefix-partial-xai",
        missingFields,
        sourceMissingFields: sourceMissing,
      });
    }
  }

  candidates.sort((a, b) => {
    const providerCompare = a.provider.localeCompare(b.provider);

    if (providerCompare !== 0) {
      return providerCompare;
    }

    return a.modelId.localeCompare(b.modelId);
  });

  return candidates;
}

function writeCandidateFiles(rootDirectory: string, candidates: Candidate[]): void {
  const researchDirectory = join(rootDirectory, "research");
  const allFile = join(
    researchDirectory,
    "issue-5-safe-extends-candidates-all.tsv",
  );

  const lines = [
    "provider\tmodel_id\tprovider_model_dir\tsource_provider\tsource_model_id\tsource_model_dir\tsource_path\ttype\tmissing_fields\tsource_missing_fields",
    ...candidates.map((candidate) =>
      [
        candidate.provider,
        candidate.modelId,
        candidate.providerModelDir,
        candidate.sourceProvider,
        candidate.sourceModelId,
        candidate.sourceModelDir,
        candidate.sourcePath,
        candidate.type,
        candidate.missingFields.join(","),
        candidate.sourceMissingFields.join(","),
      ].join("\t"),
    ),
  ];

  writeFileSync(allFile, `${lines.join("\n")}\n`);
}

function writeMetadataFiles(rootDirectory: string, candidates: Candidate[]): number {
  let written = 0;

  for (const candidate of candidates) {
    const metadataPath = candidateMetadataPath(
      rootDirectory,
      candidate.provider,
      candidate.providerModelDir,
    );

    if (existsSync(metadataPath)) {
      continue;
    }

    mkdirSync(dirname(metadataPath), { recursive: true });
    writeFileSync(
      metadataPath,
      `extends = { path = \"${candidate.sourcePath}\" }\n`,
    );
    written += 1;
  }

  return written;
}

function applyToIndexFiles(
  rootDirectory: string,
  candidates: Candidate[],
): { updated: number; unchanged: number } {
  let updated = 0;
  let unchanged = 0;

  for (const candidate of candidates) {
    const indexPath = modelIndexPath(
      rootDirectory,
      candidate.provider,
      candidate.providerModelDir,
    );
    const metadataPath = candidateMetadataPath(
      rootDirectory,
      candidate.provider,
      candidate.providerModelDir,
    );

    if (!existsSync(indexPath) || !existsSync(metadataPath)) {
      continue;
    }

    const metadata = parseMetadataToml(readFileSync(metadataPath, "utf8"));
    const apiModel = parseModelToml(readFileSync(indexPath, "utf8"));

    let extendsTarget = null;

    if (metadata.extends) {
      const targetPath = sourceIndexPath(rootDirectory, metadata.extends.path);

      if (!existsSync(targetPath)) {
        throw new Error(
          `Extends target missing: ${metadata.extends.path} for ${candidate.provider}/${candidate.modelId}`,
        );
      }

      const parsedTarget = parseModelToml(readFileSync(targetPath, "utf8"));
      extendsTarget = applyExtendsOmit(parsedTarget, metadata.extends.omit);
    }

    const merged = mergeModelSources({
      api: apiModel,
      manual_data: metadata.manual_data ?? null,
      extends: extendsTarget,
      priorities: metadata.priorities,
    });
    const next = serializeModelToml(merged);
    const prev = readFileSync(indexPath, "utf8");

    if (next !== prev) {
      writeFileSync(indexPath, next);
      updated += 1;
    } else {
      unchanged += 1;
    }
  }

  return { updated, unchanged };
}

function buildReport(
  candidates: Candidate[],
  writtenMetadataFiles: number,
  updateStats: { updated: number; unchanged: number },
): Report {
  const byType: Record<string, number> = {};
  const byProvider: Record<string, number> = {};

  for (const candidate of candidates) {
    byType[candidate.type] = (byType[candidate.type] ?? 0) + 1;
    byProvider[candidate.provider] = (byProvider[candidate.provider] ?? 0) + 1;
  }

  return {
    generatedAt: new Date().toISOString(),
    totalCandidates: candidates.length,
    byType,
    byProvider,
    writtenMetadataFiles,
    updatedIndexFiles: updateStats.updated,
    unchangedIndexFiles: updateStats.unchanged,
  };
}

function writeReport(rootDirectory: string, report: Report): void {
  const reportPath = join(
    rootDirectory,
    "research",
    "issue-5-safe-extends-apply-report.json",
  );

  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
}

function main(): void {
  const rootDirectory = process.cwd();
  const dataset = loadDataset(rootDirectory);
  const candidates = buildCandidates(rootDirectory, dataset);

  writeCandidateFiles(rootDirectory, candidates);

  const writtenMetadataFiles = writeMetadataFiles(rootDirectory, candidates);
  const updateStats = applyToIndexFiles(rootDirectory, candidates);
  const report = buildReport(candidates, writtenMetadataFiles, updateStats);

  writeReport(rootDirectory, report);

  console.log(
    JSON.stringify(
      {
        totalCandidates: report.totalCandidates,
        writtenMetadataFiles,
        updatedIndexFiles: updateStats.updated,
        unchangedIndexFiles: updateStats.unchanged,
        byType: report.byType,
      },
      null,
      2,
    ),
  );
}

main();
