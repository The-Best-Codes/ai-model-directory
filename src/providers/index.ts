import type { ProviderDefinition } from "./types.ts";
import { ai302Provider } from "./302ai.ts";
import { abacusProvider } from "./abacus.ts";
import { alibabaCnProvider } from "./alibaba-cn.ts";
import { aihubmixProvider } from "./aihubmix.ts";
import { anthropicProvider } from "./anthropic.ts";
import { basetenProvider } from "./baseten.ts";
import { cerebrasProvider } from "./cerebras.ts";
import { chutesProvider } from "./chutes.ts";
import { cortecsProvider } from "./cortecs.ts";
import { deepinfraProvider } from "./deepinfra.ts";
import { fastrouterProvider } from "./fastrouter.ts";
import { friendliProvider } from "./friendli.ts";
import { huggingfaceProvider } from "./huggingface.ts";
import { inceptionProvider } from "./inception.ts";
import { kiloProvider } from "./kilo.ts";
import { openaiProvider } from "./openai.ts";
import { openrouterProvider } from "./openrouter.ts";

export const providers: ProviderDefinition[] = [
  ai302Provider,
  openrouterProvider,
  openaiProvider,
  anthropicProvider,
  abacusProvider,
  alibabaCnProvider,
  aihubmixProvider,
  basetenProvider,
  cerebrasProvider,
  chutesProvider,
  cortecsProvider,
  deepinfraProvider,
  friendliProvider,
  fastrouterProvider,
  huggingfaceProvider,
  inceptionProvider,
  kiloProvider,
];
