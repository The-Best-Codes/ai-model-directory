import * as cheerio from "cheerio";
import type Decimal from "decimal.js";

import { parseScaledNumber } from "../lib/docs.ts";
import { fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  convertCurrencyAmount,
  fetchCurrencyExchangeRate,
} from "../lib/pricing.ts";
import type { ModelModality } from "../schema.ts";
import { hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const docsBaseUrl = "https://developer.ant-ling.com/en/docs/models";

type TableRow = Record<string, cheerio.Cheerio<any>>;

function parseTables(html: string): TableRow[][] {
  const $ = cheerio.load(html);

  return $("table")
    .toArray()
    .map((table) => {
      const headers = $(table)
        .find("tr")
        .first()
        .children()
        .map((_, cell) => $(cell).text().trim().toLowerCase())
        .get();

      return $(table)
        .find("tr")
        .slice(1)
        .toArray()
        .map((row) =>
          Object.fromEntries(
            $(row)
              .children()
              .toArray()
              .map((cell, index) => [headers[index] ?? "", $(cell)]),
          ),
        );
    });
}

function currentPrice(
  cell: cheerio.Cheerio<any> | undefined,
  exchangeRate: Decimal,
): number | undefined {
  if (!cell) return undefined;

  const discounted = cell.find("span").last().text();
  const value = parseScaledNumber((discounted || cell.text()).replace("¥", ""));

  return convertCurrencyAmount(value, exchangeRate);
}

function columnStartingWith(row: TableRow, prefix: string) {
  return Object.entries(row).find(([header]) => header.startsWith(prefix))?.[1];
}

export const antLingProvider: ProviderDefinition = {
  name: "ant-ling",
  outputDirectory: "data/providers/ant-ling/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 3);
    const exchangeRatePromise = fetchCurrencyExchangeRate("cny", "usd");
    const [pricingTable] = parseTables(
      await fetchText(`${docsBaseUrl}/price`, {
        label: "Ant Ling pricing docs error",
      }),
    );

    if (!pricingTable) throw new Error("Ant Ling pricing table not found");

    progress?.tick(`${docsBaseUrl}/price (${pricingTable.length})`, true);
    const overview = new Map(
      (
        parseTables(
          await fetchText(`${docsBaseUrl}/ling`, {
            label: "Ant Ling model docs error",
          }),
        )[0] ?? []
      ).map((row) => [row.model?.text().trim() ?? "", row]),
    );
    progress?.tick(`${docsBaseUrl}/ling (${overview.size})`, true);
    const exchangeRate = await exchangeRatePromise;
    progress?.tick(`cny->usd exchange rate (${exchangeRate.toString()})`, true);

    return pricingTable.flatMap((row) => {
      const id = row.model?.text().trim();

      if (!id) return [];

      const details = overview.get(id);
      const description = [
        row["use case"]?.text(),
        details?.positioning?.text(),
      ].join(" ");
      const input: ModelModality[] = /-VL$/i.test(id)
        ? ["text", "image", "video"]
        : ["text"];

      return [
        compactObject({
          id,
          open_weights: true,
          limit: compactObject({
            context: parseScaledNumber(details?.context?.text() ?? ""),
          }),
          modalities: { input, output: ["text" as const] },
          features: compactObject({
            attachment: hasAttachmentSupport(input),
            reasoning:
              id.startsWith("Ring-") || /reasoning/i.test(description)
                ? true
                : undefined,
            temperature: true,
          }),
          pricing: compactObject({
            input: currentPrice(columnStartingWith(row, "input"), exchangeRate),
            output: currentPrice(
              columnStartingWith(row, "output"),
              exchangeRate,
            ),
            cache_read: currentPrice(
              columnStartingWith(row, "cache read"),
              exchangeRate,
            ),
          }),
        }),
      ];
    });
  },
};
