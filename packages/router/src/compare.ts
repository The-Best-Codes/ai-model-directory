import type { ComparisonField, FlatModel, ModelComparison } from "./types.ts";
import { findModel, loadFlatModels } from "./store.ts";

export function compare(modelIds: string[]): ModelComparison {
  const models: FlatModel[] = [];
  const notFound: string[] = [];

  for (const id of modelIds) {
    const model = findModel(id);
    if (model) {
      models.push(model);
    } else {
      notFound.push(id);
    }
  }

  const fields: ComparisonField[] = [];

  if (models.length < 2) {
    return { models, fields };
  }

  const stringField = (
    name: string,
    extract: (m: FlatModel) => string | undefined
  ) => {
    const values: Record<string, string | null> = {};
    for (const m of models) {
      values[m.id] = extract(m) ?? null;
    }
    fields.push({ field: name, values });
  };

  const numberField = (
    name: string,
    extract: (m: FlatModel) => number | undefined
  ) => {
    const values: Record<string, number | null> = {};
    let best: string | undefined;
    let bestVal: number | undefined;

    for (const m of models) {
      const v = extract(m);
      values[m.id] = v ?? null;
      if (v !== undefined && (bestVal === undefined || v > bestVal)) {
        bestVal = v;
        best = m.id;
      }
    }

    const field: ComparisonField = { field: name, values };
    if (best) field.winner = best;
    fields.push(field);
  };

  stringField("provider", (m) => m.provider);
  numberField("context", (m) => m.limit?.context);
  numberField("input_price", (m) => m.pricing?.input);
  numberField("output_price", (m) => m.pricing?.output);
  numberField("reasoning_price", (m) => m.pricing?.reasoning);
  numberField("cache_read_price", (m) => m.pricing?.cache_read);
  numberField("cache_write_price", (m) => m.pricing?.cache_write);
  numberField("output_limit", (m) => m.limit?.output);

  stringField("input_modalities", (m) => m.modalities?.input?.join(", "));
  stringField("output_modalities", (m) => m.modalities?.output?.join(", "));

  const boolField = (
    name: string,
    extract: (m: FlatModel) => boolean | undefined
  ) => {
    const values: Record<string, boolean | null> = {};
    for (const m of models) {
      const v = extract(m);
      values[m.id] = v ?? null;
    }
    fields.push({ field: name, values });
  };

  boolField("tool_call", (m) => m.features?.tool_call);
  boolField("reasoning", (m) => m.features?.reasoning);
  boolField("structured_output", (m) => m.features?.structured_output);
  boolField("attachment", (m) => m.features?.attachment);
  boolField("open_weights", (m) => m.open_weights);

  return { models, fields };
}
