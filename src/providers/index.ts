import type { ProviderDefinition } from "./types.ts";
import { ai302Provider } from "./302ai.ts";
import { abacusProvider } from "./abacus.ts";
import { alibabaCnProvider } from "./alibaba-cn.ts";
import { aihubmixProvider } from "./aihubmix.ts";
import { anthropicProvider } from "./anthropic.ts";
import { basetenProvider } from "./baseten.ts";
import { cerebrasProvider } from "./cerebras.ts";
import { chutesProvider } from "./chutes.ts";
import { cohereProvider } from "./cohere.ts";
import { cortecsProvider } from "./cortecs.ts";
import { deepinfraProvider } from "./deepinfra.ts";
import { deepseekProvider } from "./deepseek.ts";
import { fastrouterProvider } from "./fastrouter.ts";
import { fireworksAiProvider } from "./fireworks-ai.ts";
import { friendliProvider } from "./friendli.ts";
import { googleProvider } from "./google.ts";
import { huggingfaceProvider } from "./huggingface.ts";
import { inceptionProvider } from "./inception.ts";
import { kiloProvider } from "./kilo.ts";
import { openaiProvider } from "./openai.ts";
import { openrouterProvider } from "./openrouter.ts";

export const providers: ProviderDefinition[] = [
  ai302Provider,
  abacusProvider,
  alibabaCnProvider,
  aihubmixProvider,
  anthropicProvider,
  basetenProvider,
  cerebrasProvider,
  chutesProvider,
  cohereProvider,
  cortecsProvider,
  deepinfraProvider,
  deepseekProvider,
  fastrouterProvider,
  fireworksAiProvider,
  friendliProvider,
  googleProvider,
  huggingfaceProvider,
  inceptionProvider,
  kiloProvider,
  openaiProvider,
  openrouterProvider,
];
