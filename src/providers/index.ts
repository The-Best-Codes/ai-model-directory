import type { ProviderDefinition } from "./types.ts";
import { ai302Provider } from "./302ai.ts";
import { abacusProvider } from "./abacus.ts";
import { aboveProvider } from "./above.ts";
import { agentrouterProvider } from "./agentrouter.ts";
import { agnesProvider } from "./agnes.ts";
import { aiandProvider } from "./aiand.ts";
import { aigatewayProvider } from "./aigateway.ts";
import { aihubmixProvider } from "./aihubmix.ts";
import { aionProvider } from "./aion.ts";
import { alibabaCnProvider } from "./alibaba-cn.ts";
import { ambientProvider } from "./ambient.ts";
import { antLingProvider } from "./ant-ling.ts";
import { anthropicProvider } from "./anthropic.ts";
import { anyapiProvider } from "./anyapi.ts";
import { apiAirforceProvider } from "./api-airforce.ts";
import { avianProvider } from "./avian.ts";
import { basetenProvider } from "./baseten.ts";
import { bazaarlinkProvider } from "./bazaarlink.ts";
import { bergetProvider } from "./berget.ts";
import { bigmodelProvider } from "./bigmodel.ts";
import { bothubProvider } from "./bothub.ts";
import { cerebrasProvider } from "./cerebras.ts";
import { chutesProvider } from "./chutes.ts";
import { clineProvider } from "./cline.ts";
import { cloudflareWorkersAiProvider } from "./cloudflare-workers-ai.ts";
import { cohereProvider } from "./cohere.ts";
import { cortecsProvider } from "./cortecs.ts";
import { crossmodelProvider } from "./crossmodel.ts";
import { daoxeProvider } from "./daoxe.ts";
import { deepinfraProvider } from "./deepinfra.ts";
import { deepseekProvider } from "./deepseek.ts";
import { edenaiProvider } from "./edenai.ts";
import { electronhubProvider } from "./electronhub.ts";
import { empiriolabsProvider } from "./empiriolabs.ts";
import { engyProvider } from "./engy.ts";
import { fastinoProvider } from "./fastino.ts";
import { fastrouterProvider } from "./fastrouter.ts";
import { fireworksAiProvider } from "./fireworks-ai.ts";
import { friendliProvider } from "./friendli.ts";
import { githubCopilotProvider } from "./github-copilot.ts";
import { googleProvider } from "./google.ts";
import { groqProvider } from "./groq.ts";
import { heliconeProvider } from "./helicone.ts";
import { huggingfaceProvider } from "./huggingface.ts";
import { hyperProvider } from "./hyper.ts";
import { impossiblProvider } from "./impossibl.ts";
import { inceptionProvider } from "./inception.ts";
import { inceptronProvider } from "./inceptron.ts";
import { incoProvider } from "./inco.ts";
import { inferenceProvider } from "./inference.ts";
import { ioNetProvider } from "./io-net.ts";
import { jiekouProvider } from "./jiekou.ts";
import { kenariProvider } from "./kenari.ts";
import { kiloProvider } from "./kilo.ts";
import { kiosapiProvider } from "./kiosapi.ts";
import { kosmikProvider } from "./kosmik.ts";
import { literouterProvider } from "./literouter.ts";
import { llmgatewayProvider } from "./llmgateway.ts";
import { llmtechProvider } from "./llmtech.ts";
import { llmtrProvider } from "./llmtr.ts";
import { lowrouterProvider } from "./lowrouter.ts";
import { meganovaProvider } from "./meganova.ts";
import { metaProvider } from "./meta.ts";
import { mistralProvider } from "./mistral.ts";
import { mixlayerProvider } from "./mixlayer.ts";
import { mnnProvider } from "./mnn.ts";
import { moarkProvider } from "./moark.ts";
import { modelisProvider } from "./modelis.ts";
import { modelscopeProvider } from "./modelscope.ts";
import { nagaProvider } from "./naga.ts";
import { nanoGptProvider } from "./nano-gpt.ts";
import { nararouterProvider } from "./nararouter.ts";
import { nearaiProvider } from "./nearai.ts";
import { nebiusProvider } from "./nebius.ts";
import { neonProvider } from "./neon.ts";
import { neuralwattProvider } from "./neuralwatt.ts";
import { nousPortalProvider } from "./nous-portal.ts";
import { novitaProvider } from "./novita.ts";
import { nvidiaProvider } from "./nvidia.ts";
import { obscurifyAiProvider } from "./obscurify-ai.ts";
import { ofoxProvider } from "./ofox.ts";
import { ollamaCloudProvider } from "./ollama-cloud.ts";
import { openaiProvider } from "./openai.ts";
import { opencodeZenProvider } from "./opencode-zen.ts";
import { openrouterProvider } from "./openrouter.ts";
import { opperProvider } from "./opper.ts";
import { orcarouterProvider } from "./orcarouter.ts";
import { ovhcloudProvider } from "./ovhcloud.ts";
import { perplexityProvider } from "./perplexity.ts";
import { poeProvider } from "./poe.ts";
import { primeProvider } from "./prime.ts";
import { qihangAiProvider } from "./qihang-ai.ts";
import { qiniuProvider } from "./qiniu.ts";
import { quiverProvider } from "./quiver.ts";
import { requestyProvider } from "./requesty.ts";
import { routingRunProvider } from "./routing-run.ts";
import { sakanaProvider } from "./sakana.ts";
import { seaLionProvider } from "./sea-lion.ts";
import { sensenovaTokenPlanProvider } from "./sensenova-token-plan.ts";
import { spekaProvider } from "./speka.ts";
import { standardcomputeProvider } from "./standardcompute.ts";
import { syntheticProvider } from "./synthetic.ts";
import { tetrateProvider } from "./tetrate.ts";
import { theGridAiProvider } from "./the-grid-ai.ts";
import { tinfoilProvider } from "./tinfoil.ts";
import { togetheraiProvider } from "./togetherai.ts";
import { tokenrouterProvider } from "./tokenrouter.ts";
import { trustedrouterProvider } from "./trustedrouter.ts";
import { typhoonProvider } from "./typhoon.ts";
import { umansAiProvider } from "./umans-ai.ts";
import { unorouterProvider } from "./unorouter.ts";
import { vancineProvider } from "./vancine.ts";
import { veniceProvider } from "./venice.ts";
import { vercelProvider } from "./vercel.ts";
import { visparkProvider } from "./vispark.ts";
import { vivgridProvider } from "./vivgrid.ts";
import { voidAiProvider } from "./void-ai.ts";
import { vultrProvider } from "./vultr.ts";
import { waferAiProvider } from "./wafer-ai.ts";
import { wandbProvider } from "./wandb.ts";
import { xaiProvider } from "./xai.ts";
import { xiaomiProvider } from "./xiaomi.ts";
import { xpersonaProvider } from "./xpersona.ts";
import { zaiProvider } from "./zai.ts";
import { zenifraProvider } from "./zenifra.ts";
import { zenmuxProvider } from "./zenmux.ts";
import { zyloProvider } from "./zylo.ts";

export const providers: ProviderDefinition[] = [
  ai302Provider,
  abacusProvider,
  aboveProvider,
  agentrouterProvider,
  agnesProvider,
  aiandProvider,
  aigatewayProvider,
  aihubmixProvider,
  aionProvider,
  alibabaCnProvider,
  ambientProvider,
  antLingProvider,
  anthropicProvider,
  anyapiProvider,
  apiAirforceProvider,
  avianProvider,
  basetenProvider,
  bazaarlinkProvider,
  bergetProvider,
  bigmodelProvider,
  bothubProvider,
  cerebrasProvider,
  chutesProvider,
  clineProvider,
  cloudflareWorkersAiProvider,
  cohereProvider,
  cortecsProvider,
  crossmodelProvider,
  daoxeProvider,
  deepinfraProvider,
  deepseekProvider,
  edenaiProvider,
  electronhubProvider,
  empiriolabsProvider,
  engyProvider,
  fastinoProvider,
  fastrouterProvider,
  fireworksAiProvider,
  friendliProvider,
  githubCopilotProvider,
  googleProvider,
  groqProvider,
  heliconeProvider,
  huggingfaceProvider,
  hyperProvider,
  impossiblProvider,
  inceptionProvider,
  inceptronProvider,
  incoProvider,
  inferenceProvider,
  ioNetProvider,
  jiekouProvider,
  kenariProvider,
  kiloProvider,
  kiosapiProvider,
  kosmikProvider,
  literouterProvider,
  llmgatewayProvider,
  llmtechProvider,
  llmtrProvider,
  lowrouterProvider,
  meganovaProvider,
  metaProvider,
  mistralProvider,
  mixlayerProvider,
  mnnProvider,
  moarkProvider,
  modelisProvider,
  modelscopeProvider,
  nagaProvider,
  nanoGptProvider,
  nararouterProvider,
  nearaiProvider,
  nebiusProvider,
  neonProvider,
  neuralwattProvider,
  nousPortalProvider,
  novitaProvider,
  nvidiaProvider,
  obscurifyAiProvider,
  ofoxProvider,
  ollamaCloudProvider,
  openaiProvider,
  opencodeZenProvider,
  openrouterProvider,
  opperProvider,
  orcarouterProvider,
  ovhcloudProvider,
  perplexityProvider,
  poeProvider,
  primeProvider,
  qihangAiProvider,
  qiniuProvider,
  quiverProvider,
  requestyProvider,
  routingRunProvider,
  sakanaProvider,
  seaLionProvider,
  sensenovaTokenPlanProvider,
  spekaProvider,
  standardcomputeProvider,
  syntheticProvider,
  tetrateProvider,
  theGridAiProvider,
  tinfoilProvider,
  togetheraiProvider,
  tokenrouterProvider,
  trustedrouterProvider,
  typhoonProvider,
  umansAiProvider,
  unorouterProvider,
  vancineProvider,
  veniceProvider,
  vercelProvider,
  visparkProvider,
  vivgridProvider,
  voidAiProvider,
  vultrProvider,
  waferAiProvider,
  wandbProvider,
  xaiProvider,
  xiaomiProvider,
  xpersonaProvider,
  zaiProvider,
  zenifraProvider,
  zenmuxProvider,
  zyloProvider,
];
