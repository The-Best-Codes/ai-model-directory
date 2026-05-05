import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rootDirectory = resolve(packageDirectory, "../..");
const sourceFile = resolve(rootDirectory, "data/all.min.json");
const outputFile = resolve(packageDirectory, "src/generated-data.ts");

const modalityOrder = ["audio", "file", "image", "text", "video"];
const modalityIndex = new Map(
  modalityOrder.map((entry, index) => [entry, index]),
);
const featureKeys = [
  "attachment",
  "reasoning",
  "tool_call",
  "structured_output",
  "temperature",
];
const pricingKeys = [
  "input",
  "output",
  "reasoning",
  "cache_read",
  "cache_write",
  "input_audio",
  "output_audio",
];
const limitKeys = ["context", "input", "output"];
const modelNameSameAsId = "";

function trimTrailingNulls(values) {
  let end = values.length;

  while (end > 0 && values[end - 1] === null) {
    end -= 1;
  }

  return values.slice(0, end);
}

function encodeTimestamp(value) {
  if (value === undefined) {
    return null;
  }

  const result = Number(value);
  return Number.isFinite(result) ? result : null;
}

function encodeFeatures(value) {
  if (!value) {
    return null;
  }

  let presentMask = 0;
  let truthyMask = 0;

  for (let index = 0; index < featureKeys.length; index += 1) {
    const key = featureKeys[index];

    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      continue;
    }

    presentMask |= 1 << index;

    if (value[key]) {
      truthyMask |= 1 << index;
    }
  }

  return presentMask === 0 ? null : [presentMask, truthyMask];
}

function encodeNumberTuple(value, keys) {
  if (!value) {
    return null;
  }

  const result = keys.map((key) => value[key] ?? null);
  return result.some((entry) => entry !== null)
    ? trimTrailingNulls(result)
    : null;
}

function encodeModalityMask(value) {
  if (!value || value.length === 0) {
    return null;
  }

  let mask = 0;

  for (const entry of value) {
    const index = modalityIndex.get(entry);

    if (index !== undefined) {
      mask |= 1 << index;
    }
  }

  return mask === 0 ? null : mask;
}

function encodeModel(model) {
  return trimTrailingNulls([
    model.id,
    model.name === undefined
      ? null
      : model.name === model.id
        ? modelNameSameAsId
        : model.name,
    encodeTimestamp(model.release_date),
    encodeTimestamp(model.knowledge_cutoff),
    encodeTimestamp(model.last_updated),
    model.open_weights ?? null,
    encodeFeatures(model.features),
    encodeNumberTuple(model.pricing, pricingKeys),
    encodeNumberTuple(model.limit, limitKeys),
    model.modalities
      ? trimTrailingNulls([
          encodeModalityMask(model.modalities.input),
          encodeModalityMask(model.modalities.output),
        ])
      : null,
  ]);
}

function encodeProvider([providerId, provider]) {
  const aiSdk = provider.aiSdk
    ? trimTrailingNulls([
        provider.aiSdk.npmPackage ?? null,
        provider.aiSdk.defaultApiKeyEnv ?? null,
      ])
    : null;

  return trimTrailingNulls([
    providerId,
    provider.name,
    provider.website ?? null,
    provider.apiBaseUrl ?? null,
    aiSdk,
    Object.values(provider.models).map((model) => encodeModel(model)),
  ]);
}

const source = JSON.parse(await readFile(sourceFile, "utf8"));
const encoded = Object.entries(source).map((entry) => encodeProvider(entry));
const fileContents = `export const rawCompactModelDirectoryData = ${JSON.stringify(encoded)};\n`;
const providerExportFile = resolve(
  packageDirectory,
  "src/generated-provider-exports.ts",
);

function isIdentifier(value) {
  return /^[$A-Z_a-z][$\w]*$/.test(value);
}

const providerIds = Object.keys(source);
const namedProviderIds = providerIds.filter((providerId) =>
  isIdentifier(providerId),
);
const providerExports = `import { getModelDirectory } from "./store.js";\n\nconst modelDirectory = getModelDirectory();\n\nexport const providers = modelDirectory;\n${namedProviderIds
  .map(
    (providerId) =>
      `export const ${providerId} = modelDirectory[${JSON.stringify(providerId)}]!;`,
  )
  .join("\n")}\n`;

await writeFile(outputFile, fileContents);
await writeFile(providerExportFile, providerExports);

console.log(`Wrote ${outputFile}`);
console.log(`Wrote ${providerExportFile}`);
