import { z } from "zod";

import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const pageSize = 50;
const endpoint =
  "https://modelstudio-us-va-cs.data.alibabacloud.com/data/api.json?action=IntlBroadScopeAspnGateway&product=sfm_bailian&api=zeldaHttp.dashscopeModel./zelda/api/v1/modelCenter/listFoundationModels";

const priceSchema = z.object({
  price: z.string(),
  type: z.string(),
});

const priceGroupSchema = z.object({
  rangeEnd: z.number().optional(),
  prices: z.array(priceSchema),
});

const modelSchema = z.object({
  model: z.string(),
  name: z.string(),
  openSource: z.boolean().optional(),
  updateAt: z.string().optional(),
  latestOnlineAt: z.string().optional(),
  features: z.array(z.string()).optional(),
  capabilities: z.array(z.string()).optional(),
  serviceSites: z.array(z.string()).optional(),
  prices: z.array(priceSchema).optional(),
  multiPrices: z.array(priceGroupSchema).optional(),
  inferenceMetadata: z
    .object({
      request_modality: z.array(z.string()).optional(),
      response_modality: z.array(z.string()).optional(),
    })
    .optional(),
  modelInfo: z
    .object({
      contextWindow: z.number().optional(),
      maxInputTokens: z.number().optional(),
      maxOutputTokens: z.number().optional(),
      maxReasoningTokens: z.number().optional(),
      reasoningMaxInputTokens: z.number().optional(),
      reasoningMaxOutputTokens: z.number().optional(),
    })
    .optional(),
  contextWindow: z.number().optional(),
  maxInputTokens: z.number().optional(),
  maxOutputTokens: z.number().optional(),
});

const responseSchema = z.object({
  data: z.object({
    DataV2: z.object({
      data: z.object({
        code: z.string(),
        success: z.boolean(),
        message: z.string().optional(),
        data: z
          .object({
            total: z.number(),
            pageNo: z.number(),
            pageSize: z.number(),
            list: z.array(modelSchema),
          })
          .optional(),
      }),
    }),
  }),
});

function buildBody(pageNo: number) {
  return new URLSearchParams({
    params: JSON.stringify({
      Api: "zeldaHttp.dashscopeModel./zelda/api/v1/modelCenter/listFoundationModels",
      Data: {
        input: {
          pageNo,
          pageSize,
          queryPrice: true,
          group: false,
        },
        cornerstoneParam: {
          xsp_lang: "en-US",
        },
      },
    }),
  });
}

async function fetchPage(pageNo: number) {
  const response = await fetch(endpoint, {
    method: "POST",
    body: buildBody(pageNo),
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(
      `Alibaba Cloud API error (page ${pageNo}): ${response.status} ${response.statusText}`,
    );
  }

  const parsed = responseSchema.parse(await response.json());
  const data = parsed.data.DataV2.data;

  if (!data.success || data.code !== "200" || !data.data) {
    throw new Error(
      `Alibaba Cloud API error (page ${pageNo}): ${data.message ?? data.code}`,
    );
  }

  return data.data;
}

function selectPriceGroup(model: z.infer<typeof modelSchema>) {
  const groups = model.multiPrices;

  if (!groups || groups.length === 0) {
    return undefined;
  }

  return [...groups].sort((left, right) => {
    const leftEnd = left.rangeEnd ?? Number.POSITIVE_INFINITY;
    const rightEnd = right.rangeEnd ?? Number.POSITIVE_INFINITY;
    return leftEnd - rightEnd;
  })[0];
}

function priceMap(model: z.infer<typeof modelSchema>) {
  const entries = selectPriceGroup(model)?.prices ?? model.prices ?? [];
  return new Map(
    entries.map((entry) => [
      entry.type,
      nonNegativeNumber(Number(entry.price)),
    ]),
  );
}

function modalityMap(values: string[] | undefined) {
  return filterModalities(values?.map((value) => value.toLowerCase()));
}

export const alibabaCnProvider: ProviderDefinition = {
  name: "alibaba-cn",
  outputDirectory: "data/providers/alibaba-cn/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const firstPage = await fetchPage(1);
    const models = [...firstPage.list];
    const pageCount = Math.max(
      1,
      Math.ceil(firstPage.total / firstPage.pageSize),
    );

    progress?.tick(
      `modelstudio-us-va-cs.data.alibabacloud.com page 1/${pageCount} (${firstPage.list.length})`,
      true,
    );

    if (pageCount > 1) {
      progress?.beginPhase("details", pageCount - 1);

      for (let pageNo = 2; pageNo <= pageCount; pageNo += 1) {
        try {
          const page = await fetchPage(pageNo);
          models.push(...page.list);
          progress?.tick(
            `modelstudio-us-va-cs.data.alibabacloud.com page ${pageNo}/${pageCount} (${page.list.length})`,
            true,
          );
        } catch {
          progress?.tick(
            `modelstudio-us-va-cs.data.alibabacloud.com page ${pageNo}/${pageCount} (0)`,
            false,
          );
        }
      }
    }

    return models.map((model) => {
      const prices = priceMap(model);
      const features = model.features ?? [];
      const capabilities = model.capabilities ?? [];
      const input = modalityMap(model.inferenceMetadata?.request_modality);
      const output = modalityMap(model.inferenceMetadata?.response_modality);

      return compactObject({
        id: model.model,
        name: model.name,
        open_weights: model.openSource,
        release_date: timestampFromDateInput(
          model.latestOnlineAt ?? model.updateAt,
          { rejectEpoch: true },
        ),
        last_updated: timestampFromDateInput(model.updateAt, {
          rejectEpoch: true,
        }),
        features: compactObject({
          attachment:
            hasAttachmentSource(model.inferenceMetadata?.request_modality) ??
            undefined,
          reasoning:
            hasAnyString(capabilities, "reasoning") ||
            hasAnyString(features, "thinking")
              ? true
              : undefined,
          tool_call: hasAnyString(features, "function-calling") || undefined,
          structured_output:
            hasAnyString(features, "structured-outputs") || undefined,
        }),
        pricing: compactObject({
          input: prices.get("input_token"),
          output: prices.get("output_token"),
          cache_read:
            prices.get("input_token_cache_read") ??
            prices.get("thinking_input_token_cache_read") ??
            prices.get("input_token_cache"),
          cache_write:
            prices.get("input_token_cache_creation_5m") ??
            prices.get("thinking_input_token_cache_creation_5m"),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(
            model.modelInfo?.contextWindow ?? model.contextWindow,
          ),
          input: integerGreaterThanZero(
            model.modelInfo?.maxInputTokens ?? model.maxInputTokens,
          ),
          output: integerGreaterThanZero(
            model.modelInfo?.maxOutputTokens ?? model.maxOutputTokens,
          ),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
