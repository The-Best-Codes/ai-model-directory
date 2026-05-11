import { Hono } from "hono";
import { loadProviders, loadFlatModels } from "../store.ts";

const meta = new Hono();

meta.get("/", (c) => {
  const providers = loadProviders();
  const models = loadFlatModels();

  const providerCount = providers.length;
  const modelCount = models.length;

  let modelsWithContext = 0;
  let modelsWithInputPricing = 0;
  let modelsWithOutputPricing = 0;
  let modelsWithToolCall = 0;
  let modelsWithAttachment = 0;
  let modelsWithInputModalities = 0;
  let modelsWithOutputModalities = 0;

  const inputModalityCounts: Record<string, number> = {};
  const outputModalityCounts: Record<string, number> = {};
  const featureCounts: Record<string, number> = {};

  for (const model of models) {
    if (model.limit?.context) modelsWithContext++;
    if (model.pricing?.input !== undefined) modelsWithInputPricing++;
    if (model.pricing?.output !== undefined) modelsWithOutputPricing++;
    if (model.features?.tool_call) modelsWithToolCall++;
    if (model.features?.attachment) modelsWithAttachment++;
    if (model.modalities?.input?.length) modelsWithInputModalities++;
    if (model.modalities?.output?.length) modelsWithOutputModalities++;

    if (model.modalities?.input) {
      for (const m of model.modalities.input) {
        inputModalityCounts[m] = (inputModalityCounts[m] ?? 0) + 1;
      }
    }
    if (model.modalities?.output) {
      for (const m of model.modalities.output) {
        outputModalityCounts[m] = (outputModalityCounts[m] ?? 0) + 1;
      }
    }
    if (model.features) {
      for (const [key, value] of Object.entries(model.features)) {
        if (value) featureCounts[key] = (featureCounts[key] ?? 0) + 1;
      }
    }
  }

  const providerBreakdown = providers.map((p) => ({
    id: p.id,
    name: p.name,
    model_count: Object.keys(p.models).length,
  }));

  return c.json({
    data: {
      providers: providerCount,
      models: modelCount,
      completeness: {
        context_window: modelsWithContext,
        input_pricing: modelsWithInputPricing,
        output_pricing: modelsWithOutputPricing,
        tool_call: modelsWithToolCall,
        attachment: modelsWithAttachment,
        input_modalities: modelsWithInputModalities,
        output_modalities: modelsWithOutputModalities,
      },
      input_modality_counts: inputModalityCounts,
      output_modality_counts: outputModalityCounts,
      feature_counts: featureCounts,
      provider_breakdown: providerBreakdown,
    },
  });
});

export { meta };
