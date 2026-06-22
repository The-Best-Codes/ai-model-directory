import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality } from "../schema.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const textOutput: ModelModality[] = ["text"];

const configModelSchema = z.object({
  slug: z.string(),
  display_name: z.string(),
  context_window: z.number().int().nonnegative().optional(),
  supported_reasoning_levels: z.array(z.unknown()).optional(),
  input_modalities: z.array(z.string()).optional(),
  supports_parallel_tool_calls: z.boolean().optional(),
});

const configSchema = z.object({ models: z.array(configModelSchema) });

type PricingInfo = {
  input?: number;
  output?: number;
  cache_read?: number;
};

function parsePrice(value: string): number | undefined {
  const match = value.match(/\$+\s*([0-9]+(?:\.[0-9]+)?)/);

  if (!match?.[1]) {
    return undefined;
  }

  const result = new Decimal(match[1]).toNumber();
  return Number.isFinite(result) && result >= 0 ? result : undefined;
}

function parsePricing(html: string): Map<string, PricingInfo> {
  const result = new Map<string, PricingInfo>();
  const section = html.match(
    /children\\?":\\?"Fugu Ultra[\s\S]*?children\\?":\\?"Usage field details/,
  )?.[0];

  if (!section) {
    return result;
  }

  const pricing: PricingInfo = {};
  const rows = [
    { key: "input", label: "Input" },
    { key: "output", label: "Output" },
    { key: "cache_read", label: "Cached input" },
  ] as const;

  for (const row of rows) {
    const match = section.match(
      new RegExp(
        `children\\\\?":\\\\?"${row.label}[\\s\\S]*?children\\\\?":\\\\?"(\\$+[^"\\\\]+)`,
      ),
    );
    const price = parsePrice(match?.[1] ?? "");

    if (price !== undefined) {
      pricing[row.key] = price;
    }
  }

  if (Object.keys(pricing).length > 0) {
    result.set("fugu-ultra", pricing);
  }

  return result;
}

async function fetchPricing(): Promise<Map<string, PricingInfo>> {
  const html = await fetchText("https://console.sakana.ai/pricing", {
    label: "Sakana pricing page error",
  });
  return parsePricing(html);
}

export const sakanaProvider: ProviderDefinition = {
  name: "sakana",
  outputDirectory: "data/providers/sakana/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const config = await fetchJson(
      "https://raw.githubusercontent.com/SakanaAI/fugu/refs/heads/main/configs/files/fugu.json",
      { schema: configSchema, label: "Sakana Fugu config error" },
    );
    progress?.tick(`fugu.json (${config.models.length})`, true);

    const pricing = await fetchPricing();
    progress?.tick(`pricing (${pricing.size})`, pricing.size > 0);

    return config.models.map((model) => {
      const input = filterModalities(
        model.input_modalities ?? ["text", "image"],
      );

      return compactObject({
        id: model.slug,
        name: model.display_name,
        features: {
          attachment: hasAttachmentSupport(input),
          reasoning: (model.supported_reasoning_levels?.length ?? 0) > 0,
          tool_call: model.supports_parallel_tool_calls,
        },
        limit: compactObject({ context: model.context_window }),
        modalities: compactObject({ input, output: textOutput }),
        pricing: pricing.get(model.slug),
      });
    });
  },
};
