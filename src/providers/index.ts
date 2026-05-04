import type { ProviderDefinition } from "./types.ts";
import { ai302Provider } from "./302ai.ts";
import { abacusProvider } from "./abacus.ts";
import { alibabaCnProvider } from "./alibaba-cn.ts";
import { aihubmixProvider } from "./aihubmix.ts";
import { anthropicProvider } from "./anthropic.ts";
import { avianProvider } from "./avian.ts";
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
import { githubCopilotProvider } from "./github-copilot.ts";
import { githubModelsProvider } from "./github-models.ts";
import { googleProvider } from "./google.ts";
import { groqProvider } from "./groq.ts";
import { heliconeProvider } from "./helicone.ts";
import { huggingfaceProvider } from "./huggingface.ts";
import { inceptionProvider } from "./inception.ts";
import { kiloProvider } from "./kilo.ts";
import { mistralProvider } from "./mistral.ts";
import { novitaProvider } from "./novita.ts";
import { openaiProvider } from "./openai.ts";
import { ovhcloudProvider } from "./ovhcloud.ts";
import { perplexityProvider } from "./perplexity.ts";
import { openrouterProvider } from "./openrouter.ts";
import { tetrateProvider } from "./tetrate.ts";
import { togetheraiProvider } from "./togetherai.ts";
import { veniceProvider } from "./venice.ts";
import { vercelProvider } from "./vercel.ts";
import { wandbProvider } from "./wandb.ts";
import { xaiProvider } from "./xai.ts";

export const providers: ProviderDefinition[] = [
  ai302Provider,
  abacusProvider,
  alibabaCnProvider,
  aihubmixProvider,
  anthropicProvider,
  avianProvider,
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
  githubCopilotProvider,
  githubModelsProvider,
  googleProvider,
  groqProvider,
  heliconeProvider,
  huggingfaceProvider,
  inceptionProvider,
  kiloProvider,
  mistralProvider,
  novitaProvider,
  openaiProvider,
  ovhcloudProvider,
  perplexityProvider,
  openrouterProvider,
  tetrateProvider,
  togetheraiProvider,
  veniceProvider,
  vercelProvider,
  wandbProvider,
  xaiProvider,
];
