import { markdownTables, parseScaledNumber } from "../lib/docs.ts";
import { fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  convertCurrencyAmount,
  fetchCurrencyExchangeRate,
} from "../lib/pricing.ts";
import type { ModelModality } from "../schema.ts";
import { allModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

type PricingRow = {
  name: string;
  context: string;
  input: string;
  output: string;
  cacheRead: string;
  modalities: ModelModality[];
};

const modalityLabels: Record<string, ModelModality> = {
  文本: "text",
  图片: "image",
  视频: "video",
  文件: "file",
};

function parseModalityLabels(value: string): ModelModality[] {
  const labels = new Set(
    value
      .split(/[、,，]/)
      .map((label) => modalityLabels[label.trim()])
      .filter((label): label is ModelModality => label !== undefined),
  );

  return allModalities.filter((modality) => labels.has(modality));
}

function parsePricingRows(text: string): PricingRow[] {
  const rows: PricingRow[] = [];

  for (const section of text.split(/^#{2,3} /m)) {
    const heading = section.split("\n")[0]?.trim() ?? "";
    const sectionModalities: ModelModality[] =
      heading === "视觉理解" ? ["text", "image"] : ["text"];

    for (const [header, ...body] of markdownTables(section)) {
      if (!header) continue;

      const column = (prefix: string) =>
        header.findIndex((cell) => cell.startsWith(prefix));
      const columns = {
        name: column("模型名称"),
        context: column("上下文"),
        input: column("输入单价"),
        output: column("输出单价"),
        cacheRead: column("缓存命中"),
        modalities: column("输入模态"),
      };

      if (columns.name < 0 || columns.input < 0) continue;

      for (const cells of body) {
        const name = cells[columns.name];

        if (!name) continue;

        rows.push({
          name,
          context: cells[columns.context] ?? "",
          input: cells[columns.input] ?? "",
          output: cells[columns.output] ?? "",
          cacheRead: cells[columns.cacheRead] ?? "",
          modalities:
            columns.modalities >= 0
              ? parseModalityLabels(cells[columns.modalities] ?? "")
              : sectionModalities,
        });
      }
    }
  }

  return rows;
}

function parsePrice(value: string): number | undefined {
  return value === "免费" ? 0 : parseScaledNumber(value);
}

function parseContext(tiers: PricingRow[]): number | undefined {
  const direct = tiers
    .map((tier) => parseScaledNumber(tier.context))
    .find((value) => value !== undefined);

  if (direct !== undefined) return direct;
  if (tiers.some((tier) => /^输入(?:长度)?\s*≥/.test(tier.context))) {
    return undefined;
  }

  const bounds = tiers
    .map(
      (tier) =>
        tier.context.match(/^输入(?:长度)?\s*\[[^,]+,\s*([\d.]+K)\)/)?.[1],
    )
    .flatMap((bound) => (bound ? (parseScaledNumber(bound) ?? []) : []));

  return bounds.length > 0 ? Math.max(...bounds) : undefined;
}

export const bigmodelProvider: ProviderDefinition = {
  name: "bigmodel",
  outputDirectory: "data/providers/bigmodel/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);
    const exchangeRatePromise = fetchCurrencyExchangeRate("cny", "usd");
    const rows = parsePricingRows(
      await fetchText("https://docs.bigmodel.cn/cn/guide/start/pricing.md", {
        label: "BigModel pricing docs error",
      }),
    );
    progress?.tick(
      `docs.bigmodel.cn/cn/guide/start/pricing (${rows.length})`,
      true,
    );
    const exchangeRate = await exchangeRatePromise;
    progress?.tick(`cny->usd exchange rate (${exchangeRate.toString()})`, true);

    const tiersByName = new Map<string, PricingRow[]>();

    for (const row of rows) {
      tiersByName.set(row.name, [...(tiersByName.get(row.name) ?? []), row]);
    }

    return [...tiersByName].map(([name, tiers]) => {
      const [base] = tiers as [PricingRow];
      const input = base.modalities;

      return compactObject({
        id: name.toLowerCase(),
        name,
        limit: compactObject({ context: parseContext(tiers) }),
        modalities: { input, output: ["text" as const] },
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: /thinking|z1/i.test(name) ? true : undefined,
          temperature: true,
        }),
        pricing: compactObject({
          input: convertCurrencyAmount(parsePrice(base.input), exchangeRate),
          output: convertCurrencyAmount(parsePrice(base.output), exchangeRate),
          cache_read: convertCurrencyAmount(
            parsePrice(base.cacheRead),
            exchangeRate,
          ),
        }),
      });
    });
  },
};
