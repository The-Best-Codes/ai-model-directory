import type { ProviderDefinition } from "./types.ts";
import { ai302Provider } from "./302ai.ts";
import { abacusProvider } from "./abacus.ts";
import { alibabaCnProvider } from "./alibaba-cn.ts";
import { aihubmixProvider } from "./aihubmix.ts";
import { anthropicProvider } from "./anthropic.ts";
import { avianProvider } from "./avian.ts";
import { basetenProvider } from "./baseten.ts";
import { bergetProvider } from "./berget.ts";
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
import { ioNetProvider } from "./io-net.ts";
import { jiekouProvider } from "./jiekou.ts";
import { kiloProvider } from "./kilo.ts";
import { llmgatewayProvider } from "./llmgateway.ts";
import { mistralProvider } from "./mistral.ts";
import { modelscopeProvider } from "./modelscope.ts";
import { moarkProvider } from "./moark.ts";
import { nanoGptProvider } from "./nano-gpt.ts";
import { novitaProvider } from "./novita.ts";
import { ollamaCloudProvider } from "./ollama-cloud.ts";
import { nvidiaProvider } from "./nvidia.ts";
import { openaiProvider } from "./openai.ts";
import { ovhcloudProvider } from "./ovhcloud.ts";
import { perplexityProvider } from "./perplexity.ts";
import { poeProvider } from "./poe.ts";
import { openrouterProvider } from "./openrouter.ts";
import { requestyProvider } from "./requesty.ts";
import { syntheticProvider } from "./synthetic.ts";
import { tetrateProvider } from "./tetrate.ts";
import { togetheraiProvider } from "./togetherai.ts";
import { veniceProvider } from "./venice.ts";
import { vercelProvider } from "./vercel.ts";
import { wandbProvider } from "./wandb.ts";
import { xaiProvider } from "./xai.ts";
import { zenmuxProvider } from "./zenmux.ts";

export const providers: ProviderDefinition[] = [
  ai302Provider,
  abacusProvider,
  alibabaCnProvider,
  aihubmixProvider,
  anthropicProvider,
  avianProvider,
  basetenProvider,
  bergetProvider,
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
  ioNetProvider,
  jiekouProvider,
  kiloProvider,
  llmgatewayProvider,
  mistralProvider,
  modelscopeProvider,
  moarkProvider,
  nanoGptProvider,
  novitaProvider,
  ollamaCloudProvider,
  nvidiaProvider,
  openaiProvider,
  ovhcloudProvider,
  perplexityProvider,
  poeProvider,
  openrouterProvider,
  requestyProvider,
  syntheticProvider,
  tetrateProvider,
  togetheraiProvider,
  veniceProvider,
  vercelProvider,
  wandbProvider,
  xaiProvider,
  zenmuxProvider,
];
