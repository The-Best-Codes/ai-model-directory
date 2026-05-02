import { fetchText } from "../lib/http.ts";
import {
  integerGreaterThanZero,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

type FireworksMoney = {
  units?: string;
  nanos?: number;
};

type FireworksSkuInfo = {
  sku?: string;
  amount?: FireworksMoney;
};

type FireworksTimestamp = {
  seconds?: string;
};

type FireworksBaseModelDetails = {
  parameterCount?: string;
  moe?: boolean;
};

type FireworksModel = {
  name: string;
  displayName?: string;
  public?: boolean;
  kind?: number;
  contextLength?: number;
  supportsImageInput?: boolean;
  supportsTools?: boolean;
  supportsServerless?: boolean;
  tunable?: boolean;
  supportsLora?: boolean;
  closedSourceModel?: boolean;
  huggingFaceUrl?: string;
  githubUrl?: string;
  skuInfos?: FireworksSkuInfo[];
  createTime?: FireworksTimestamp;
  updateTime?: FireworksTimestamp;
  baseModelDetails?: FireworksBaseModelDetails;
};

const allModalities: readonly ModelModality[] = [
  "text",
  "image",
  "audio",
  "video",
  "file",
];

function timestampFromFireworks(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.replace(/^\$n/, "");
  return /^\d+$/.test(normalized) ? normalized : undefined;
}

function priceFromMoney(
  amount: FireworksMoney | undefined,
): number | undefined {
  if (!amount) {
    return undefined;
  }

  const unitsValue = amount.units?.replace(/^\$n/, "") ?? "0";
  const whole = Number(unitsValue);
  const nanos = (amount.nanos ?? 0) / 1_000_000_000;
  const total = whole + nanos;

  return Number.isFinite(total) && total >= 0 ? total : undefined;
}

function extractModelsArray(html: string): FireworksModel[] {
  const marker = '\\"models\\":[';
  const start = html.indexOf(marker);

  if (start === -1) {
    throw new Error("Fireworks model catalog not found in page source");
  }

  const arrayStart = html.indexOf("[", start);

  if (arrayStart === -1) {
    throw new Error("Fireworks model catalog array start not found");
  }

  let depth = 0;
  let inString = false;
  let escaped = false;
  let arrayEnd = -1;

  for (let index = arrayStart; index < html.length; index += 1) {
    const character = html[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (character === "\\") {
      escaped = true;
      continue;
    }

    if (character === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (character === "[") {
      depth += 1;
      continue;
    }

    if (character === "]") {
      depth -= 1;

      if (depth === 0) {
        arrayEnd = index + 1;
        break;
      }
    }
  }

  if (arrayEnd === -1) {
    throw new Error("Fireworks model catalog array end not found");
  }

  const escapedJson = html.slice(arrayStart, arrayEnd);
  const json = escapedJson.replace(/\\\"/g, '"').replace(/\\\\/g, "\\");
  const parsed = JSON.parse(json);

  if (!Array.isArray(parsed)) {
    throw new Error("Fireworks model catalog did not decode to an array");
  }

  return parsed as FireworksModel[];
}

function collectPricing(skuInfos: FireworksSkuInfo[] | undefined) {
  const pricing: NonNullable<ModelRecord["pricing"]> = {};

  for (const entry of skuInfos ?? []) {
    const sku = entry.sku?.toLowerCase() ?? "";
    const value = priceFromMoney(entry.amount);

    if (value === undefined) {
      continue;
    }

    if (sku.includes("input tokens (uncached)")) {
      pricing.input = value;
      continue;
    }

    if (sku.includes("input tokens (cached)")) {
      pricing.cache_read = value;
      continue;
    }

    if (sku.includes("output tokens")) {
      pricing.output = value;
      continue;
    }

    if (sku.includes("embedding input tokens")) {
      pricing.input = value;
      continue;
    }

    if (sku.includes("input tokens") && pricing.input === undefined) {
      pricing.input = value;
      continue;
    }

    if (sku.includes("tokens") && pricing.input === undefined) {
      pricing.input = value;
    }
  }

  return compactObject(pricing);
}

function collectModalities(model: FireworksModel): ModelRecord["modalities"] {
  const name = model.name.toLowerCase();
  const input = new Set<ModelModality>();
  const output = new Set<ModelModality>();
  const isEmbeddingLike =
    model.kind === 10 ||
    name.includes("embedding") ||
    name.includes("reranker");
  const isImageGenerationLike =
    model.kind === 4 || model.kind === 5 || name.includes("flux");
  const isTextGenerationLike =
    !isEmbeddingLike &&
    (model.kind === 1 ||
      name.includes("instruct") ||
      name.includes("chat") ||
      name.includes("reasoning") ||
      name.includes("thinking") ||
      name.includes("deepseek") ||
      name.includes("kimi") ||
      name.includes("glm") ||
      name.includes("llama") ||
      name.includes("qwen") ||
      name.includes("minimax"));

  if (isEmbeddingLike) {
    input.add("text");
  }

  if (isTextGenerationLike) {
    input.add("text");
    output.add("text");
  }

  if (model.supportsImageInput) {
    input.add("image");
  }

  if (isImageGenerationLike) {
    input.add("text");
    output.add("image");
  }

  return compactObject({
    input:
      input.size > 0
        ? allModalities.filter((entry) => input.has(entry))
        : undefined,
    output:
      output.size > 0
        ? allModalities.filter((entry) => output.has(entry))
        : undefined,
  });
}

function toModelRecord(model: FireworksModel): ModelRecord {
  const modalities = collectModalities(model);
  const inputModalities = modalities?.input ?? [];
  const outputModalities = modalities?.output ?? [];

  return compactObject({
    id: model.name,
    name: model.displayName ?? model.name,
    release_date: timestampFromFireworks(model.createTime?.seconds),
    last_updated: timestampFromFireworks(model.updateTime?.seconds),
    open_weights:
      model.closedSourceModel === undefined
        ? undefined
        : !model.closedSourceModel,
    features: compactObject({
      attachment:
        inputModalities.some((entry) => entry !== "text") ||
        outputModalities.some((entry) => entry !== "text") ||
        undefined,
      tool_call: model.supportsTools,
    }),
    pricing: collectPricing(model.skuInfos),
    limit: compactObject({
      context: integerGreaterThanZero(model.contextLength),
    }),
    modalities,
  }) as ModelRecord;
}

export const fireworksAiProvider: ProviderDefinition = {
  name: "fireworks-ai",
  outputDirectory: "data/providers/fireworks-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const html = await fetchText("https://app.fireworks.ai/models?filter=All", {
      init: { redirect: "follow" },
      label: "Fireworks model library error",
    });

    const models = extractModelsArray(html)
      .filter((model) => model.public !== false)
      .map(toModelRecord);

    progress?.tick(
      `app.fireworks.ai/models?filter=All (${models.length})`,
      true,
    );

    return models;
  },
};
