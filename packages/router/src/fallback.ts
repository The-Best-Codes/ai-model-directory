import Decimal from "decimal.js";
import type {
  FallbackChain,
  FallbackOptions,
  FlatModel,
  ModelFeatures,
} from "./types.ts";
import { findModel, loadFlatModels } from "./store.ts";

type FeatureProfile = {
  hasToolCall: boolean;
  hasReasoning: boolean;
  hasStructuredOutput: boolean;
  hasAttachment: boolean;
};

function getFeatureProfile(model: FlatModel): FeatureProfile {
  const f = model.features;
  return {
    hasToolCall: f?.tool_call === true,
    hasReasoning: f?.reasoning === true,
    hasStructuredOutput: f?.structured_output === true,
    hasAttachment: f?.attachment === true,
  };
}

function featuresMatch(a: FeatureProfile, b: FeatureProfile): boolean {
  return (
    a.hasToolCall === b.hasToolCall &&
    a.hasReasoning === b.hasReasoning &&
    a.hasStructuredOutput === b.hasStructuredOutput &&
    a.hasAttachment === b.hasAttachment
  );
}

function modalityMatch(a: FlatModel, b: FlatModel): boolean {
  const aIn = a.modalities?.input ?? [];
  const aOut = a.modalities?.output ?? [];
  const bIn = b.modalities?.input ?? [];
  const bOut = b.modalities?.output ?? [];
  return (
    bIn.every((m) => aIn.includes(m)) && bOut.every((m) => aOut.includes(m))
  );
}

export function fallbackChain(
  modelId: string,
  options?: FallbackOptions
): FallbackChain | null {
  const original = findModel(modelId);
  if (!original) return null;

  const candidates = loadFlatModels().filter((m) => m.id !== original.id);
  const scored: { model: FlatModel; score: number }[] = [];

  const originalProfile = getFeatureProfile(original);
  const originalContext = original.limit?.context ?? 0;
  const originalInputPrice = original.pricing?.input ?? 0;

  const maxContextDiff = options?.maxContextDifference ?? Infinity;
  const maxPriceMult = options?.maxPriceMultiplier ?? 5;
  const limit = options?.limit ?? 10;

  for (const candidate of candidates) {
    let score = 0;

    if (options?.matchFeatures === true) {
      const candidateProfile = getFeatureProfile(candidate);
      if (!featuresMatch(candidateProfile, originalProfile)) continue;
    } else {
      const candidateProfile = getFeatureProfile(candidate);
      if (candidateProfile.hasToolCall && !originalProfile.hasToolCall)
        score -= 1;
      if (candidateProfile.hasToolCall === originalProfile.hasToolCall)
        score += 2;
      if (candidateProfile.hasReasoning === originalProfile.hasReasoning)
        score += 1;
    }

    if (options?.matchModalities === true) {
      if (!modalityMatch(candidate, original)) continue;
    }

    const candidateContext = candidate.limit?.context ?? 0;
    const contextDiff = Math.abs(candidateContext - originalContext);
    if (contextDiff > maxContextDiff) continue;
    if (candidateContext >= originalContext) score += 2;

    const candidateInputPrice = candidate.pricing?.input;
    if (candidateInputPrice !== undefined && originalInputPrice > 0) {
      const ratio = new Decimal(candidateInputPrice)
        .div(originalInputPrice)
        .toNumber();
      if (ratio > maxPriceMult) continue;
      if (ratio <= 1) score += 3;
      else if (ratio <= 1.5) score += 1;
    }

    if (candidate.provider === original.provider) score += 1;

    scored.push({ model: candidate, score });
  }

  scored.sort((a, b) => b.score - a.score);

  return {
    models: scored.slice(0, limit).map((s) => s.model),
    original,
  };
}
