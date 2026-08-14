export type ProviderSeo = {
  title: string;
  description: string;
  intro: string;
};

export const providersSeo: ProviderSeo = {
  title: "AI Model Providers",
  description:
    "Browse every AI model provider in the directory, with per-model pricing, context limits, modalities, and capabilities for each one.",
  intro:
    "The AI Model Directory tracks models from providers spanning frontier labs, open-weight hubs, cloud gateways, and specialized inference platforms. Pick a provider to compare every model it offers. Compare per-million-token pricing, context window sizes, input and output limits, supported modalities, features like reasoning and tool calling, and more.",
};

type ProviderSeoEntry = ProviderSeo;

export const providerSeo: Record<string, ProviderSeoEntry> = {
  openai: {
    title: "OpenAI Models Pricing, Context Window, and Capabilities",
    description:
      "OpenAI model pricing, context limits, and capabilities. Compare GPT-5.x, o-series reasoning, gpt-image, gpt-audio, and embedding models.",
    intro:
      "OpenAI is the frontier lab behind the GPT line of models and the platform most developers build against first. This page covers every OpenAI model in the directory, including the GPT-5 family, the o-series reasoning models (o3, o4-mini), realtime and transcription models, image generation with gpt-image, audio and speech models, and the text-embedding family. Complete with per-million-token pricing, context window limits, output caps, and supported modalities.",
  },
  anthropic: {
    title: "Anthropic Models, Pricing, and More",
    description:
      "Claude model pricing, context limits, and capabilities. Compare Claude Fable, Opus, Sonnet, Haiku, and more across the full Anthropic lineup.",
    intro:
      "Anthropic builds the Claude family of models, known for long-context understanding, nuanced reasoning, and strong tool use. This page lists every Claude model in the directory. This includes Fable, Opus, Sonnet, and Haiku, with pricing per million tokens, context window sizes, output limits, and features like extended thinking and structured outputs.",
  },
  google: {
    title: "Google Models Pricing and Information",
    description:
      "Google model pricing, context limits, and capabilities. Compare Gemini Flash, Pro, image, video, Gemma models, and more.",
    intro:
      "Google's Gemini models power a broad catalog spanning text, images, video, audio, and speech - from the fast and cheap Flash tier to the premium Pro tier, plus dedicated generation models like Imagen and Veo and the open Gemma family. This page lists every Google model in the directory with per-million-token pricing, context window sizes, output limits, and the full set of input and output modalities.",
  },
  deepseek: {
    title: "DeepSeek Models, Pricing, Capabilities, and More",
    description:
      "DeepSeek model pricing, context limits, and capabilities. Compare DeepSeek V4 models at their famously low per-token prices.",
    intro:
      "DeepSeek made waves with open-weight models that deliver frontier-class performance at a fraction of the usual cost. This page covers the DeepSeek models in the directory, including the V4 family, with per-million-token pricing, context window limits, output caps, and features like reasoning support and open weights.",
  },
  mistral: {
    title: "Mistral Models and Pricing",
    description:
      "Mistral model pricing, context limits, and capabilities. Compare Mistral Large, Small, Medium, Codestral, OCR, and Voxtral models.",
    intro:
      "Mistral offers an efficient, open-minded line of models from Europe, ranging from compact edge models to large frontier-class systems. This page lists every Mistral model in the directory. This includes Mistral Large, Small, and Medium, the Codestral coding family, Mistral OCR, the Voxtral audio models, and embedding models, all complete with per-million-token pricing, context windows, and supported features and modalities.",
  },
  xai: {
    title: "xAI Models and Pricing Metadata",
    description:
      "xAI Grok model pricing, context limits, and capabilities. Compare Grok reasoning and non-reasoning models across the lineup.",
    intro:
      "xAI builds the Grok family of models, including dedicated reasoning variants, non-reasoning fast tiers, and code-focused models. This page lists every Grok model in the directory with per-million-token pricing, context window sizes, output limits, and the features each model supports, including reasoning and multi-agent variants.",
  },
  cohere: {
    title: "Cohere Models and Pricing Details",
    description:
      "Cohere model pricing, context limits, and capabilities. Compare Command, Aya, and Embed models for enterprise AI.",
    intro:
      "Cohere focuses on enterprise-grade language models, multilingual Aya models, and high-quality embeddings. This page lists every Cohere model in the directory - the Command chat family, the Aya multilingual line, and the Embed models - with per-million-token pricing, context limits, and supported modalities and features.",
  },
  groq: {
    title: "Groq Models, Pricing, Context Window Sizes, and More",
    description:
      "Groq model pricing, context limits, and capabilities. Compare Llama, Qwen, and Whisper models served at blazing speed.",
    intro:
      "Groq serves open-weight models on custom LPU hardware for extremely fast inference. This page lists every model Groq exposes in the directory - Llama, Qwen, Whisper, and more - with per-million-token pricing, context window sizes, output limits, and features like tool calling and structured output.",
  },
  togetherai: {
    title: "Together AI Models and Pricing Metadata",
    description:
      "Together AI model pricing, context limits, and capabilities. Compare open-source models, images, video, and audio on one platform.",
    intro:
      "Together AI is one of the largest catalogs of open and open-weight models, spanning chat, reasoning, coding, image generation, video, speech, and embeddings. This page lists every Together AI model in the directory - including DeepSeek, Llama, Qwen, Flux, and Veo families - with per-million-token pricing, context limits, and the full range of modalities.",
  },
  openrouter: {
    title: "OpenRouter Models and Pricing",
    description:
      "OpenRouter model pricing, context limits, and capabilities. Compare thousands of models from every major provider in one API.",
    intro:
      "OpenRouter is an aggregator that exposes thousands of models from nearly every provider through a single OpenAI-compatible API. This page lists every OpenRouter route in the directory - GPT, Claude, Gemini, Grok, Llama, Qwen, DeepSeek, and many more - with per-million-token pricing, context limits, output caps, and features, so you can compare providers side by side.",
  },
  huggingface: {
    title: "Hugging Face Models and Pricing",
    description:
      "Hugging Face model pricing, context limits, and capabilities. Compare the open-weight catalog from the community's home.",
    intro:
      "Hugging Face is the home of the open-source ML community and serves a massive catalog of open-weight models through its Inference Providers API. This page lists the Hugging Face models in the directory - Llama, Qwen, DeepSeek, GLM, Gemma, and more - with per-million-token pricing, context window sizes, output limits, and supported features and modalities.",
  },
  nvidia: {
    title: "Nvidia NIM Models and Pricing",
    description:
      "Nvidia model pricing, context limits, and capabilities. Compare Nemotron, Llama, Qwen, and more on Nvidia NIM.",
    intro:
      "Nvidia's NIM platform serves optimized, enterprise-ready inference for a wide range of open and proprietary models. This page lists every Nvidia model in the directory - the Nemotron family, Llama, Qwen, Mistral, embedding models, and speech models - with per-million-token pricing, context window sizes, output limits, and supported modalities.",
  },
  perplexity: {
    title: "Perplexity Sonar Models and Pricing",
    description:
      "Perplexity model pricing, context limits, and capabilities. Compare Sonar and hosted frontier models for answer engines.",
    intro:
      "Perplexity operates the Sonar family of models built for grounded search and answer generation, and also serves hosted frontier models from Anthropic, OpenAI, Google, and others. This page lists every Perplexity model in the directory with per-million-token pricing, context window sizes, output limits, and the features each model supports.",
  },
  cerebras: {
    title: "Cerebras Models and Pricing",
    description:
      "Cerebras model pricing, context limits, and capabilities. Compare Llama and open models at record inference speed.",
    intro:
      "Cerebras runs open-weight models on the Wafer-Scale Engine for among the fastest inference in the industry. This page lists the Cerebras models in the directory with per-million-token pricing, context window sizes, output limits, and supported features.",
  },
  vercel: {
    title: "Vercel AI Gateway Models and Pricing",
    description:
      "Vercel AI Gateway model pricing, context limits, and capabilities. Compare models available through the AI SDK gateway.",
    intro:
      "Vercel AI Gateway routes requests to many model providers through a single endpoint with caching, rate limiting, and observability. This page lists the models available through the gateway in the directory with per-million-token pricing, context window sizes, output limits, and the AI SDK integration details.",
  },
  "ollama-cloud": {
    title: "Ollama Cloud Models and Pricing",
    description:
      "Ollama Cloud model pricing, context limits, and capabilities. Compare open models served through the Ollama platform.",
    intro:
      "Ollama Cloud brings the simple, local-first Ollama experience to hosted open-weight models. This page lists the models available on Ollama Cloud in the directory with per-million-token pricing, context window sizes, output limits, and supported features and modalities.",
  },
  "github-copilot": {
    title: "GitHub Copilot Models and Pricing",
    description:
      "GitHub Copilot model pricing, context limits, and capabilities. Compare models available through Copilot's model catalog.",
    intro:
      "GitHub Copilot exposes a catalog of models - from Anthropic, OpenAI, Google, and others - for coding and agentic workflows inside GitHub's ecosystem. This page lists the Copilot models in the directory with per-million-token pricing, context window sizes, output limits, and supported features.",
  },
  deepinfra: {
    title: "deepinfra Models and Pricing",
    description:
      "deepinfra model pricing, context limits, and capabilities. Compare affordable open and proprietary models on serverless GPU inference.",
    intro:
      "deepinfra provides low-cost, serverless inference for a broad mix of open-weight and partner models. This page lists every deepinfra model in the directory with per-million-token pricing, context window sizes, output limits, and the features and modalities each model supports.",
  },
  venice: {
    title: "Venice Models and Pricing",
    description:
      "Venice model pricing, context limits, and capabilities. Compare private, uncensored open-weight model inference.",
    intro:
      "Venice offers private, API-first inference for open-weight models with a focus on user privacy and freedom. This page lists the Venice models in the directory with per-million-token pricing, context window sizes, output limits, and supported features.",
  },
};

export function getProviderSeo(
  providerId: string,
  providerName: string,
  modelCount: number,
  modelNames: string[],
): ProviderSeo {
  const custom = providerSeo[providerId];

  if (custom) {
    return custom;
  }

  const featured = modelNames.slice(0, 4).join(", ");
  const modelNoun = modelCount === 1 ? "model" : "models";

  return {
    title: `${providerName} Models and Pricing`,
    description: `${providerName} model pricing, context limits, and capabilities. Compare all ${modelCount} ${providerName} ${modelNoun} in the AI Model Directory.`,
    intro: `${providerName} offers ${modelCount} ${modelNoun} tracked in the AI Model Directory, covering chat, coding, reasoning, and embedding workloads. Compare per-million-token pricing, context window sizes, output limits, and supported features and modalities side by side${
      featured ? ` - including ${featured}` : ""
    }.`,
  };
}
