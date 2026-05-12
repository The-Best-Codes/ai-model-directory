import Decimal from "decimal.js";
import type {
  CostBreakdown,
  CostRequest,
  FlatModel,
  ModelPricing,
} from "./types.ts";

function priceForTokens(
  rate: number | undefined,
  tokens: number,
  perMillion: boolean = true
): number {
  if (rate === undefined || tokens === 0) return 0;
  const d = new Decimal(rate);
  const t = new Decimal(tokens);
  return perMillion ? d.mul(t).div(1_000_000).toNumber() : d.mul(t).toNumber();
}

export function calculateCostForModel(
  model: FlatModel,
  request: CostRequest
): CostBreakdown {
  const p: ModelPricing = model.pricing ?? {};

  const input = priceForTokens(p.input, request.inputTokens);
  const output = priceForTokens(p.output, request.outputTokens);
  const reasoning = priceForTokens(p.reasoning, request.reasoningTokens ?? 0);
  const cacheRead = priceForTokens(p.cache_read, request.cacheReadTokens ?? 0);
  const cacheWrite = priceForTokens(
    p.cache_write,
    request.cacheWriteTokens ?? 0
  );
  const inputAudio = priceForTokens(
    p.input_audio,
    request.inputAudioTokens ?? 0
  );
  const outputAudio = priceForTokens(
    p.output_audio,
    request.outputAudioTokens ?? 0
  );

  const total = new Decimal(input)
    .plus(output)
    .plus(reasoning)
    .plus(cacheRead)
    .plus(cacheWrite)
    .plus(inputAudio)
    .plus(outputAudio)
    .toNumber();

  return {
    input,
    output,
    reasoning,
    cacheRead,
    cacheWrite,
    inputAudio,
    outputAudio,
    total,
  };
}

export function estimateRequestCost(
  inputPricePerMillion: number | undefined,
  outputPricePerMillion: number | undefined,
  inputTokens: number,
  outputTokens: number
): number {
  const input = priceForTokens(inputPricePerMillion, inputTokens);
  const output = priceForTokens(outputPricePerMillion, outputTokens);
  return new Decimal(input).plus(output).toNumber();
}
