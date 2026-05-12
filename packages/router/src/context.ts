import type { ContextFit, FlatModel } from "./types.ts";
import { findModel, loadFlatModels } from "./store.ts";

export function checkContextFit(
  modelId: string,
  inputTokens: number,
  outputTokens?: number
): ContextFit | null {
  const model = findModel(modelId);
  if (!model) return null;

  const availableContext = model.limit?.context ?? 0;
  const maxOutput = model.limit?.output ?? 0;
  const requestedTokens = inputTokens + (outputTokens ?? 0);
  const overhead = availableContext - requestedTokens;
  const fits = overhead >= 0;

  const alternatives = loadFlatModels()
    .filter((m) => m.id !== model.id)
    .filter((m) => (m.limit?.context ?? 0) > availableContext)
    .filter((m) => {
      if (
        model.pricing?.input !== undefined &&
        m.pricing?.input !== undefined
      ) {
        return m.pricing.input <= model.pricing.input * 2;
      }
      return true;
    })
    .sort((a, b) => (a.limit?.context ?? 0) - (b.limit?.context ?? 0))
    .slice(0, 5);

  return {
    fits,
    model,
    availableContext,
    requestedTokens,
    overhead,
    shouldCompact: !fits && availableContext > 0,
    betterAlternatives: alternatives,
  };
}

export function findBestContextModel(
  tokens: number,
  provider?: string
): FlatModel | null {
  const models = loadFlatModels()
    .filter((m) => (m.limit?.context ?? 0) >= tokens)
    .filter((m) => {
      if (provider) return m.provider.toLowerCase() === provider.toLowerCase();
      return true;
    })
    .sort(
      (a, b) => (a.pricing?.input ?? Infinity) - (b.pricing?.input ?? Infinity)
    );

  return models[0] ?? null;
}
