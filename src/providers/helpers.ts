import { mergeModelSources } from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";

export const allModalities: readonly ModelModality[] = [
  "text",
  "image",
  "audio",
  "video",
  "file",
];

const modalitySet = new Set<ModelModality>(allModalities);

export function filterModalities(
  values: readonly string[] | null | undefined,
): ModelModality[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  const unique = new Set<ModelModality>();

  for (const value of values) {
    const normalized = value.trim().toLowerCase() as ModelModality;

    if (modalitySet.has(normalized)) {
      unique.add(normalized);
    }
  }

  return unique.size > 0
    ? allModalities.filter((value) => unique.has(value))
    : undefined;
}

export function hasAttachmentSupport(
  modalities: readonly ModelModality[] | undefined,
): boolean | undefined {
  if (!modalities) {
    return undefined;
  }

  return modalities.some((value) => value !== "text");
}

export function hasAttachmentSource(
  values: readonly string[] | null | undefined,
): boolean | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  return values.some((value) => {
    const normalized = value.trim().toLowerCase();

    return (
      normalized === "file" || normalized === "pdf" || normalized !== "text"
    );
  });
}

export function hasAnyString(
  values: readonly string[] | null | undefined,
  ...expected: string[]
): boolean {
  if (!values || values.length === 0) {
    return false;
  }

  const set = new Set(values.map((value) => value.trim().toLowerCase()));
  return expected.some((value) => set.has(value.trim().toLowerCase()));
}

export function parseCommaSet(value: string | null | undefined): Set<string> {
  if (!value) {
    return new Set();
  }

  return new Set(
    value
      .split(",")
      .map((entry) => entry.trim().toLowerCase())
      .filter((entry) => entry.length > 0),
  );
}

export function mergeModelLists(
  primary: readonly ModelRecord[],
  fallback: readonly ModelRecord[],
): ModelRecord[] {
  const fallbackById = new Map(fallback.map((model) => [model.id, model]));
  const primaryIds = new Set(primary.map((model) => model.id));

  return [
    ...primary.map((model) =>
      mergeModelSources({
        api: model,
        extends: fallbackById.get(model.id) ?? null,
      }),
    ),
    ...fallback.filter((model) => !primaryIds.has(model.id)),
  ];
}
