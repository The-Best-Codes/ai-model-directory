import { afterEach, expect, test } from "bun:test";

import { normalizeModel } from "../lib/model.ts";
import { bazaarlinkProvider } from "./bazaarlink.ts";
import { meganovaProvider } from "./meganova.ts";
import { nagaProvider } from "./naga.ts";
import type { ProviderDefinition } from "./types.ts";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

async function models(provider: ProviderDefinition) {
  const body = await Bun.file(
    new URL(`./fixtures/${provider.name}.json`, import.meta.url),
  ).text();
  globalThis.fetch = Object.assign(
    async () =>
      new Response(body, { headers: { "Content-Type": "application/json" } }),
    { preconnect: originalFetch.preconnect },
  ) as typeof fetch;
  return new Map(
    (await provider.fetchModels()).map((model) => [
      model.id,
      normalizeModel(model),
    ]),
  );
}

test("MegaNova prices already use dollars per million tokens", async () => {
  const data = await models(meganovaProvider);
  expect(data.get("deepseek-ai/DeepSeek-V3.1")?.pricing).toMatchObject({
    input: 0.19,
    output: 0.79,
  });
});

test("MegaNova minute pricing and non-chat parameter templates do not create token prices or chat features", async () => {
  const data = await models(meganovaProvider);
  const transcription = data.get("Systran/faster-whisper-large-v3");
  expect(transcription?.pricing).toBeUndefined();
  expect(transcription?.modalities).toEqual({
    input: ["audio"],
    output: ["text"],
  });
  for (const id of [
    "Systran/faster-whisper-large-v3",
    "BAAI/bge-reranker-v2-m3",
    "Alibaba/wan2.6-t2v",
  ]) {
    expect(data.get(id)?.features?.reasoning).toBeUndefined();
    expect(data.get(id)?.features?.temperature).toBeUndefined();
  }
});

test("Naga assigns speech output token prices to audio pricing", async () => {
  const data = await models(nagaProvider);
  const speech = data.get("gpt-4o-mini-tts");
  expect(speech?.pricing).toEqual({ input: 0.3, output_audio: 6 });
  expect(speech?.features?.structured_output).toBeUndefined();
  expect(data.get("qwen-image-2512")?.pricing).toBeUndefined();
});

test("BazaarLink converts token prices and omits video placeholder rates", async () => {
  const data = await models(bazaarlinkProvider);
  expect(data.get("gpt-4o")?.pricing).toEqual({ input: 2.5, output: 10 });
  expect(data.get("alibaba/wan3.0-text-to-video")?.pricing).toBeUndefined();
  expect(data.get("auto")?.pricing).toBeUndefined();
  expect(data.get("auto:free")?.pricing).toEqual({ input: 0, output: 0 });
});
