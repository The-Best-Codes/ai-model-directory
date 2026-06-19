# Changelog

## Run at 1781831941

### Summary

- **Total models currently tracked: 7896** across 60 providers
- Providers with changes this run: 58
- Total models added: 163
- Total models removed: 46
- Total field changes: 682

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 248 |
| `features.structured_output` | 0 | 1 | 34 |
| `features.temperature` | 0 | 0 | 2 |
| `features.tool_call` | 0 | 1 | 11 |
| `pricing.input` | 0 | 0 | 166 |
| `pricing.output` | 0 | 0 | 149 |
| `pricing.cache_read` | 2 | 2 | 25 |
| `limit.context` | 0 | 0 | 17 |
| `limit.output` | 6 | 0 | 18 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 652 models, 140 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 652
- Models added: 140
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (140)</summary>

- `Pro-moonshotai-Kimi-K2-5`
- `anthropic-claude-opus-4-5-20251101`
- `anthropic-claude-sonnet-4-6`
- `anthropic-claude-sonnet-4-6-thinking`
- `baidu-ernie-4-5-8k-preview`
- `baidu-ernie-4-turbo-8k`
- `deepseek-r1-baidu`
- `deepseek-r1-huoshan`
- `deepseek-v3-0324`
- `deepseek-v3-302`
- `deepseek-v3-aliyun`
- `deepseek-v3-baidu`
- `deepseek-v3-huoshan`
- `deepseek-v3.2`
- `deepseek-v3.2-thinking`
- `doubao-pro-128k`
- `doubao-seed-2-0-code-260215`
- `doubao-seed-2-0-lite-260215`
- `doubao-seed-2-0-mini-260215`
- `doubao-seed-2-0-pro-260215`
- `expert-model-zzkj`
- `expert-model-zzkj-genetics`
- `expert-model-zzkj-lite`
- `expert-model-zzkj-think`
- `gemini-2-5-flash-lite`
- `gemini-2-flash`
- `gemini-2-flash-search`
- `gemini-3-1-pro-preview`
- `google-gemma-2-27b`
- `grok-3`
- `grok-3-mini`
- `grok-4-0709`
- `grok-4-1-fast-non-reasoning`
- `grok-4-1-fast-reasoning`
- `hunyuan-t1-20250711`
- `hunyuan-turbos-20250716`
- `meta-llama3-1-405b`
- `meta-llama3-1-70b`
- `meta-llama3-1-8b`
- `minimax-m2-5`
- `minimax-m2-5-highspeed`
- `minimax-m2-her`
- `mistral-ai-devstral-medium-2507`
- `mistral-ai-devstral-small-2507`
- `moonshot-kimi-k2-0711-preview`
- `moonshot-v1-8k`
- `openai-gpt-4o-image-generation`
- `openai-gpt-4o-mini`
- `openai-gpt-4o-mini-2024-07-18`
- `openai-gpt-5-2`
- `openai-gpt-5-2-2025-12-11`
- `openai-gpt-5-2-chat-latest`
- `openai-gpt-5-2-pro`
- `ppio-baidu-ernie-4.5-vl-28b-a3b`
- `ppio-deepseek-deepseek-ocr-2`
- `ppio-deepseek-deepseek-v3-2`
- `ppio-moonshotai-kimi-k2-5`
- `ppio-moonshotai-kimi-k2-instruct`
- `ppio-qwen-qwen3-coder-480b-a35b-instruct`
- `ppio-qwen-qwen3-coder-next`
- `ppio-zai-org-autoglm-phone-9b-multilingual`
- `ppio-zai-org-glm-4-6v`
- `qvq-max`
- `qvq-max-2025-03-25`
- `qwen-doc-turbo`
- `qwen-max`
- `qwen-mt-plus`
- `qwen-mt-turbo`
- `qwen-plus`
- `qwen-plus-2025-07-14`
- `qwen-plus-2025-12-01`
- `qwen-turbo-2024-06-24`
- `qwen-turbo-2025-02-11`
- `qwen-turbo-2025-07-15`
- `qwen-turbo-latest`
- `qwen-vl-max-2025-04-02`
- `qwen-vl-max-2025-04-08`
- `qwen-vl-plus-2025-07-10`
- `qwen2-0-5b-instruct`
- `qwen2-1-5b-instruct`
- `qwen2-5-omni-7b`
- `qwen2-5-vl-32b-instruct`
- `qwen2-5-vl-72b-instruct`
- `qwen2-57b-a14b-instruct`
- `qwen2-72b-instruct`
- `qwen3-coder-480b-a35b-instruct`
- `qwen3-coder-flash`
- `qwen3-coder-plus`
- `qwen3-coder-plus-2025-07-22`
- `qwen3.5-397b-a17b`
- `qwen3.5-flash`
- `qwen3.5-plus`
- `sense-nova-v6-pro`
- `sense-nova-v6-reasoner`
- `sense-nova-v6-turbo`
- `siliconflow-Pro-deepseek-ai-DeepSeek-V3-2`
- `siliconflow-Pro-thudm-glm-4-9b-chat`
- `siliconflow-Pro-zai-org-GLM-5`
- `siliconflow-THUDM-GLM-4.1V-9B-Thinking`
- `siliconflow-deepseek-ai-DeepSeek-V3-2`
- `siliconflow-deepseek-ai-deepseek-r1-distill-qwen-14b`
- `siliconflow-deepseek-ai-deepseek-r1-distill-qwen-7b`
- `siliconflow-deepseek-ai-deepseek-vl2`
- `siliconflow-pro-deepseek-ai-deepseek-r1`
- `siliconflow-pro-deepseek-ai-deepseek-v3`
- `siliconflow-qwen-qwen3-235b-a22b-instruct-2507`
- `siliconflow-sf-zai-org-glm-4-5-air`
- `siliconflow-thudm-glm-4-9b-chat`
- `sophnet-DeepSeek-V3-2-Fast`
- `sophnet-deepseek-r1`
- `sophnet-deepseek-r1-distill-qwen-32b`
- `sophnet-deepseek-r1-distill-qwen-7b`
- `sophnet-deepseek-v3`
- `sophnet-deepseek-v3-2`
- `sophnet-deepseek-v3-fast`
- `sophnet-kimi-k2`
- `sophnet-qwen2-5-7b-Instruct`
- `sophnet-qwen2-5-vl-32b-instruct`
- `sophnet-qwen2-5-vl-72b-instruct`
- `sophnet-qwen2-5-vl-7b-instruct`
- `sophnet-qwen2-vl-72b-instruct`
- `sophnet-qwen2-vl-7b-instruct`
- `sophnet-qwen3-14b`
- `sophnet-qwen3-235b-a22b`
- `sophnet-qwq-32b`
- `sophnet-qwq2-5-32b-instruct`
- `sophnet-qwq2-5-72b-instruct`
- `stepfun-step-2-16k`
- `stepfun-step-3-5-flash`
- `stepfun-step-r1-v-mini`
- `zhipu-codegeex-4`
- `zhipu-glm-4-6v`
- `zhipu-glm-4-6v-flash`
- `zhipu-glm-4-air-250414`
- `zhipu-glm-4-airx`
- `zhipu-glm-4-flash-250414`
- `zhipu-glm-5`
- `zhipu-glm-z1-air`
- `zhipu-glm-z1-airx`
- `zhipu-glm-z1-flash`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 91 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 91
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 15 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 15
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 778 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 778
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `alicloud-glm-5.2`
- `baidu-glm-5.2`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `gemma-3-12b-it`

</details>

</details>

<details>
<summary><strong>crof</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 173 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 173
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 170 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 170
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 270 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 270
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 17 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 17
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 128 models, 5 added, 1 removed, 16 field changes</summary>

#### Summary

- Models currently tracked: 128
- Models added: 5
- Models removed: 1
- Total field changes: 16

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 1 | 6 |
| `features.tool_call` | 0 | 1 | 8 |

</details>

<details>
<summary>Added models (5)</summary>

- `XiaomiMiMo/MiMo-V2.5-Pro`
- `google/gemma-3-12b-it`
- `google/gemma-3-4b-it`
- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16`
- `stepfun-ai/Step-3.7-Flash`

</details>

<details>
<summary>Removed models (1)</summary>

- `CohereLabs/command-a-vision-07-2025`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 29 models, 0 added, 0 removed, 41 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 41

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 15 |
| `pricing.output` | 0 | 0 | 14 |
| `pricing.cache_read` | 0 | 0 | 12 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 165 models, 0 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 165
- Models added: 0
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 3 |
| `pricing.output` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>kilo</strong> — 337 models, 4 added, 0 removed, 38 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 4
- Models removed: 0
- Total field changes: 38

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 13 |
| `features.temperature` | 0 | 0 | 1 |
| `features.tool_call` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 1 | 0 | 2 |
| `limit.context` | 0 | 0 | 6 |
| `limit.output` | 3 | 0 | 8 |

</details>

<details>
<summary>Added models (4)</summary>

- `google/gemini-3-pro-image`
- `google/gemini-3.1-flash-image`
- `poolside/laguna-m.1`
- `poolside/laguna-xs.2`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 224 models, 0 added, 0 removed, 225 field changes</summary>

#### Summary

- Models currently tracked: 224
- Models added: 0
- Models removed: 0
- Total field changes: 225

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 224 |
| `limit.context` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 59 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 57 models, 0 added, 3 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 3
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (3)</summary>

- `Qwen/QVQ-72B-Preview`
- `Qwen/Qwen3-0.6B`
- `Qwen/Qwen3-1.7B`

</details>

</details>

<details>
<summary><strong>moark</strong> — 220 models, 1 added, 39 removed, 141 field changes</summary>

#### Summary

- Models currently tracked: 220
- Models added: 1
- Models removed: 39
- Total field changes: 141

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 76 |
| `pricing.output` | 0 | 0 | 65 |

</details>

<details>
<summary>Added models (1)</summary>

- `Kimi-K2.7-Code`

</details>

<details>
<summary>Removed models (39)</summary>

- `Align-DS-V`
- `F5-TTS`
- `GLM-4.6V`
- `GLM-4.6V-Flash`
- `GLM-5-Turbo`
- `GLM-5V-Turbo`
- `HelloMeme`
- `HiDream-E1-Full`
- `Hulu-Med-14B`
- `HunyuanDiT-v1.2-Diffusers-Distilled`
- `InstantCharacter`
- `InternVL2-8B`
- `LongCat-Video`
- `OmniConsistency`
- `QwQ-32B-Preview`
- `Qwen2-72B-Instruct`
- `Qwen2-Audio-7B-Instruct`
- `Qwen2-VL-72B`
- `Qwen2.5-14B-Instruct`
- `Qwen2.5-32B-Instruct`
- `Qwen2.5-Coder-14B-Instruct`
- `Qwen2.5-Coder-32B-Instruct`
- `Qwen3-30B-A3B`
- `Wan2.1-I2V-14B-480P`
- `Wan2.1-I2V-14B-720P`
- `Wan2.1-T2V-1.3B`
- `Yi-34B-Chat`
- `Youtu-Embedding`
- `codesage-large-v2`
- `fish-speech-1.5`
- `jina-reranker-m0`
- `medgemma-4b-it`
- `moark-m1`
- `nomic-embed-code`
- `speecht5_tts`
- `stable-diffusion-3.5-large`
- `stable-diffusion-v1-4`
- `stable-diffusion-v1-5`
- `stepvideo-t2v`

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 628 models, 1 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 628
- Models added: 1
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 2 |
| `limit.context` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (1)</summary>

- `cohere/north-mini-code`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 14 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 139 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 139
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 35 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 35
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 121 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.output` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>poe</strong> — 382 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 382
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `glm-5.2-el`
- `kling-3.0-turbo`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 341 models, 4 added, 0 removed, 52 field changes</summary>

#### Summary

- Models currently tracked: 341
- Models added: 4
- Models removed: 0
- Total field changes: 52

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 15 |
| `features.temperature` | 0 | 0 | 1 |
| `features.tool_call` | 0 | 0 | 2 |
| `pricing.input` | 0 | 0 | 4 |
| `pricing.output` | 0 | 0 | 3 |
| `pricing.cache_read` | 1 | 2 | 6 |
| `limit.context` | 0 | 0 | 6 |
| `limit.output` | 3 | 0 | 9 |

</details>

<details>
<summary>Added models (4)</summary>

- `google/gemini-3-pro-image`
- `google/gemini-3.1-flash-image`
- `poolside/laguna-m.1`
- `poolside/laguna-xs.2`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 164 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 164
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 532 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 532
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `coding/claude-opus-4-20250514`
- `coding/claude-sonnet-4-20250514`

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 1 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 1
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `hf:zai-org/GLM-5.2`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tokenrouter</strong> — 106 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `ex/gpt-5.4`

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 265 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 265
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `zai-org/GLM-5.2`

</details>

</details>

<details>
<summary><strong>venice</strong> — 91 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 91
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wafer-ai</strong> — 9 models, 1 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 1
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

<details>
<summary>Added models (1)</summary>

- `GLM-5.2`

</details>

</details>

<details>
<summary><strong>wandb</strong> — 28 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 137 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 137
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1781745174

### Summary

- **Total models currently tracked: 7779** across 60 providers
- Providers with changes this run: 58
- Total models added: 65
- Total models removed: 159
- Total field changes: 640

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 7 |
| `release_date` | 1 | 0 | 249 |
| `last_updated` | 0 | 0 | 1 |
| `features.attachment` | 0 | 1 | 1 |
| `features.reasoning` | 0 | 1 | 0 |
| `features.structured_output` | 0 | 1 | 11 |
| `features.tool_call` | 0 | 1 | 4 |
| `pricing.input` | 0 | 1 | 165 |
| `pricing.output` | 0 | 1 | 148 |
| `pricing.cache_read` | 4 | 1 | 17 |
| `pricing.cache_write` | 3 | 0 | 1 |
| `pricing.input_audio` | 0 | 0 | 1 |
| `pricing.output_audio` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 6 |
| `limit.output` | 0 | 1 | 8 |
| `modalities.input` | 0 | 1 | 2 |
| `modalities.output` | 0 | 1 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 512 models, 1 added, 140 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 512
- Models added: 1
- Models removed: 140
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `last_updated` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `zhipu-glm-5-2`

</details>

<details>
<summary>Removed models (140)</summary>

- `Pro-moonshotai-Kimi-K2-5`
- `anthropic-claude-opus-4-5-20251101`
- `anthropic-claude-sonnet-4-6`
- `anthropic-claude-sonnet-4-6-thinking`
- `baidu-ernie-4-5-8k-preview`
- `baidu-ernie-4-turbo-8k`
- `deepseek-r1-baidu`
- `deepseek-r1-huoshan`
- `deepseek-v3-0324`
- `deepseek-v3-302`
- `deepseek-v3-aliyun`
- `deepseek-v3-baidu`
- `deepseek-v3-huoshan`
- `deepseek-v3.2`
- `deepseek-v3.2-thinking`
- `doubao-pro-128k`
- `doubao-seed-2-0-code-260215`
- `doubao-seed-2-0-lite-260215`
- `doubao-seed-2-0-mini-260215`
- `doubao-seed-2-0-pro-260215`
- `expert-model-zzkj`
- `expert-model-zzkj-genetics`
- `expert-model-zzkj-lite`
- `expert-model-zzkj-think`
- `gemini-2-5-flash-lite`
- `gemini-2-flash`
- `gemini-2-flash-search`
- `gemini-3-1-pro-preview`
- `google-gemma-2-27b`
- `grok-3`
- `grok-3-mini`
- `grok-4-0709`
- `grok-4-1-fast-non-reasoning`
- `grok-4-1-fast-reasoning`
- `hunyuan-t1-20250711`
- `hunyuan-turbos-20250716`
- `meta-llama3-1-405b`
- `meta-llama3-1-70b`
- `meta-llama3-1-8b`
- `minimax-m2-5`
- `minimax-m2-5-highspeed`
- `minimax-m2-her`
- `mistral-ai-devstral-medium-2507`
- `mistral-ai-devstral-small-2507`
- `moonshot-kimi-k2-0711-preview`
- `moonshot-v1-8k`
- `openai-gpt-4o-image-generation`
- `openai-gpt-4o-mini`
- `openai-gpt-4o-mini-2024-07-18`
- `openai-gpt-5-2`
- `openai-gpt-5-2-2025-12-11`
- `openai-gpt-5-2-chat-latest`
- `openai-gpt-5-2-pro`
- `ppio-baidu-ernie-4.5-vl-28b-a3b`
- `ppio-deepseek-deepseek-ocr-2`
- `ppio-deepseek-deepseek-v3-2`
- `ppio-moonshotai-kimi-k2-5`
- `ppio-moonshotai-kimi-k2-instruct`
- `ppio-qwen-qwen3-coder-480b-a35b-instruct`
- `ppio-qwen-qwen3-coder-next`
- `ppio-zai-org-autoglm-phone-9b-multilingual`
- `ppio-zai-org-glm-4-6v`
- `qvq-max`
- `qvq-max-2025-03-25`
- `qwen-doc-turbo`
- `qwen-max`
- `qwen-mt-plus`
- `qwen-mt-turbo`
- `qwen-plus`
- `qwen-plus-2025-07-14`
- `qwen-plus-2025-12-01`
- `qwen-turbo-2024-06-24`
- `qwen-turbo-2025-02-11`
- `qwen-turbo-2025-07-15`
- `qwen-turbo-latest`
- `qwen-vl-max-2025-04-02`
- `qwen-vl-max-2025-04-08`
- `qwen-vl-plus-2025-07-10`
- `qwen2-0-5b-instruct`
- `qwen2-1-5b-instruct`
- `qwen2-5-omni-7b`
- `qwen2-5-vl-32b-instruct`
- `qwen2-5-vl-72b-instruct`
- `qwen2-57b-a14b-instruct`
- `qwen2-72b-instruct`
- `qwen3-coder-480b-a35b-instruct`
- `qwen3-coder-flash`
- `qwen3-coder-plus`
- `qwen3-coder-plus-2025-07-22`
- `qwen3.5-397b-a17b`
- `qwen3.5-flash`
- `qwen3.5-plus`
- `sense-nova-v6-pro`
- `sense-nova-v6-reasoner`
- `sense-nova-v6-turbo`
- `siliconflow-Pro-deepseek-ai-DeepSeek-V3-2`
- `siliconflow-Pro-thudm-glm-4-9b-chat`
- `siliconflow-Pro-zai-org-GLM-5`
- `siliconflow-THUDM-GLM-4.1V-9B-Thinking`
- `siliconflow-deepseek-ai-DeepSeek-V3-2`
- `siliconflow-deepseek-ai-deepseek-r1-distill-qwen-14b`
- `siliconflow-deepseek-ai-deepseek-r1-distill-qwen-7b`
- `siliconflow-deepseek-ai-deepseek-vl2`
- `siliconflow-pro-deepseek-ai-deepseek-r1`
- `siliconflow-pro-deepseek-ai-deepseek-v3`
- `siliconflow-qwen-qwen3-235b-a22b-instruct-2507`
- `siliconflow-sf-zai-org-glm-4-5-air`
- `siliconflow-thudm-glm-4-9b-chat`
- `sophnet-DeepSeek-V3-2-Fast`
- `sophnet-deepseek-r1`
- `sophnet-deepseek-r1-distill-qwen-32b`
- `sophnet-deepseek-r1-distill-qwen-7b`
- `sophnet-deepseek-v3`
- `sophnet-deepseek-v3-2`
- `sophnet-deepseek-v3-fast`
- `sophnet-kimi-k2`
- `sophnet-qwen2-5-7b-Instruct`
- `sophnet-qwen2-5-vl-32b-instruct`
- `sophnet-qwen2-5-vl-72b-instruct`
- `sophnet-qwen2-5-vl-7b-instruct`
- `sophnet-qwen2-vl-72b-instruct`
- `sophnet-qwen2-vl-7b-instruct`
- `sophnet-qwen3-14b`
- `sophnet-qwen3-235b-a22b`
- `sophnet-qwq-32b`
- `sophnet-qwq2-5-32b-instruct`
- `sophnet-qwq2-5-72b-instruct`
- `stepfun-step-2-16k`
- `stepfun-step-3-5-flash`
- `stepfun-step-r1-v-mini`
- `zhipu-codegeex-4`
- `zhipu-glm-4-6v`
- `zhipu-glm-4-6v-flash`
- `zhipu-glm-4-air-250414`
- `zhipu-glm-4-airx`
- `zhipu-glm-4-flash-250414`
- `zhipu-glm-5`
- `zhipu-glm-z1-air`
- `zhipu-glm-z1-airx`
- `zhipu-glm-z1-flash`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 91 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 91
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `glm-5.2`

</details>

</details>

<details>
<summary><strong>ambient</strong> — 15 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 15
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 776 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 776
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kling-v3-omni`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 11 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 4 |

</details>

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 1 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 1
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `zai-org/GLM-5.2-TEE`

</details>

<details>
<summary>Removed models (1)</summary>

- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-TEE`

</details>

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 107 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 107
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `glm-5.2`

</details>

</details>

<details>
<summary><strong>crof</strong> — 23 models, 3 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 3
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `glm-5.2`
- `greg-2-super`
- `greg-2-ultra`

</details>

<details>
<summary>Removed models (2)</summary>

- `greg-1`
- `greg-1-super`

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 173 models, 28 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 173
- Models added: 28
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (28)</summary>

- `Bria/blur_background`
- `Bria/erase_foreground`
- `Bria/expand`
- `Bria/fibo_edit`
- `Bria/remove_background`
- `ByteDance/Seedance-1.5-Pro`
- `ByteDance/Seedance-2.0`
- `FastVideo/LTX2-Distilled-Diffusers`
- `Pixverse/Pixverse-6-T2V`
- `Pixverse/Pixverse-T2V`
- `Pixverse/Pixverse-T2V-HD`
- `PrunaAI/p-video`
- `Qwen/Qwen-Image-Edit`
- `Qwen/Qwen3-TTS`
- `Wan-AI/Wan2.2-T2V-A14B`
- `Wan-AI/Wan2.6-T2V`
- `XiaomiMiMo/MiMo-V2.5-tts`
- `black-forest-labs/FLUX-1-Redux-dev`
- `black-forest-labs/FLUX.1-Kontext-dev`
- `bosonai/HiggsAudioV2.5`
- `google/veo-3.1`
- `google/veo-3.1-fast`
- `hexgrad/Kokoro-82M`
- `inworld-ai/realtime-tts-1.5-max`
- `inworld-ai/realtime-tts-1.5-mini`
- `inworld-ai/realtime-tts-2`
- `nvidia/Cosmos3-Nano`
- `nvidia/Cosmos3-Super`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 170 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 170
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `x-ai/grok-imagine-video`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 270 models, 3 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 270
- Models added: 3
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `accounts/fireworks/models/qwen3p7-max`
- `accounts/fireworks/models/voyage-multimodal-3-5`
- `accounts/fireworks/models/voyage-rerank-2-5`

</details>

<details>
<summary>Removed models (1)</summary>

- `accounts/fireworks/models/kat-dev-72b-exp`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 17 models, 0 added, 0 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 17
- Models added: 0
- Models removed: 0
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `features.attachment` | 0 | 1 | 0 |
| `features.reasoning` | 0 | 1 | 0 |
| `features.structured_output` | 0 | 1 | 0 |
| `features.tool_call` | 0 | 1 | 0 |
| `pricing.input` | 0 | 1 | 0 |
| `pricing.output` | 0 | 1 | 0 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 124 models, 4 added, 0 removed, 17 field changes</summary>

#### Summary

- Models currently tracked: 124
- Models added: 4
- Models removed: 0
- Total field changes: 17

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.attachment` | 0 | 0 | 1 |
| `features.structured_output` | 0 | 0 | 9 |
| `features.tool_call` | 0 | 0 | 4 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `modalities.input` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (4)</summary>

- `CohereLabs/command-a-vision-07-2025`
- `zai-org/GLM-4.7-FP8`
- `zai-org/GLM-5.2`
- `zai-org/GLM-5.2-FP8`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 29 models, 0 added, 0 removed, 42 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 42

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 13 |
| `pricing.output` | 0 | 0 | 14 |
| `pricing.cache_read` | 0 | 0 | 13 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 165 models, 5 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 165
- Models added: 5
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (5)</summary>

- `claude-haiku-4-5-20251001-cc`
- `claude-opus-4-6-cc`
- `claude-opus-4-7-cc`
- `claude-opus-4-8-cc`
- `claude-sonnet-4-6-cc`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 333 models, 2 added, 1 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 333
- Models added: 2
- Models removed: 1
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 3 |
| `features.structured_output` | 0 | 0 | 1 |
| `pricing.cache_read` | 1 | 0 | 2 |
| `limit.output` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (2)</summary>

- `cohere/north-mini-code:free`
- `kilo-auto/efficient`

</details>

<details>
<summary>Removed models (1)</summary>

- `xiaomi/mimo-v2-flash`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 224 models, 1 added, 1 removed, 223 field changes</summary>

#### Summary

- Models currently tracked: 224
- Models added: 1
- Models removed: 1
- Total field changes: 223

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 223 |

</details>

<details>
<summary>Added models (1)</summary>

- `grok-imagine-video-1-5`

</details>

<details>
<summary>Removed models (1)</summary>

- `mimo-v2-flash`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 59 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 60 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 60
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `ZhipuAI/GLM-5.2`

</details>

</details>

<details>
<summary><strong>moark</strong> — 258 models, 1 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 258
- Models added: 1
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

<details>
<summary>Added models (1)</summary>

- `GLM-5.2`

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 627 models, 0 added, 4 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 627
- Models added: 0
- Models removed: 4
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 3 |
| `pricing.output` | 0 | 0 | 3 |

</details>

<details>
<summary>Removed models (4)</summary>

- `xiaomi/mimo-v2-flash`
- `xiaomi/mimo-v2-flash-original`
- `xiaomi/mimo-v2-flash-thinking`
- `xiaomi/mimo-v2-flash-thinking-original`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 14 models, 3 added, 2 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 3
- Models removed: 2
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (3)</summary>

- `glm-5.2-fast`
- `kimi-k2.7-code`
- `zai-org/GLM-5.1-FP8`

</details>

<details>
<summary>Removed models (2)</summary>

- `glm-5-fast`
- `moonshotai/Kimi-K2.7-Code`

</details>

</details>

<details>
<summary><strong>novita</strong> — 139 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 139
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 35 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 35
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 121 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `modalities.input` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 337 models, 1 added, 1 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 1
- Models removed: 1
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 4 |

</details>

<details>
<summary>Added models (1)</summary>

- `cohere/north-mini-code:free`

</details>

<details>
<summary>Removed models (1)</summary>

- `xiaomi/mimo-v2-flash`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 164 models, 1 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 164
- Models added: 1
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax/minimax-m3`

</details>

<details>
<summary>Removed models (2)</summary>

- `anthropic/claude-opus-4`
- `anthropic/claude-sonnet-4`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 534 models, 3 added, 3 removed, 7 field changes</summary>

#### Summary

- Models currently tracked: 534
- Models added: 3
- Models removed: 3
- Total field changes: 7

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 3 | 1 | 0 |
| `pricing.cache_write` | 3 | 0 | 0 |

</details>

<details>
<summary>Added models (3)</summary>

- `azure/gpt-5.4`
- `azure/gpt-5.4-mini`
- `zai/glm-5.1`

</details>

<details>
<summary>Removed models (3)</summary>

- `anthropic/claude-opus-4`
- `anthropic/claude-sonnet-4`
- `zai/GLM-5.1`

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tokenrouter</strong> — 105 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 105
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_write` | 0 | 0 | 1 |
| `pricing.input_audio` | 0 | 0 | 1 |
| `pricing.output_audio` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 264 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 264
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 1 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 91 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 91
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `tencent-hy3-preview`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 28 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `moonshotai/Kimi-K2.7-Code`

</details>

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 137 models, 2 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 137
- Models added: 2
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (2)</summary>

- `z-ai/glm-5.2`
- `z-ai/glm-5.2-free`

</details>

</details>

</details>

## Run at 1781658856

### Summary

- **Total models currently tracked: 7873** across 60 providers
- Providers with changes this run: 57
- Total models added: 55
- Total models removed: 23
- Total field changes: 679

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 1 | 1 | 311 |
| `last_updated` | 0 | 0 | 2 |
| `features.reasoning` | 0 | 1 | 0 |
| `features.structured_output` | 0 | 0 | 2 |
| `pricing.input` | 0 | 1 | 165 |
| `pricing.output` | 0 | 1 | 152 |
| `pricing.cache_read` | 1 | 2 | 23 |
| `pricing.cache_write` | 0 | 1 | 0 |
| `limit.context` | 0 | 0 | 5 |
| `limit.output` | 0 | 5 | 4 |
| `modalities.output` | 1 | 0 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 651 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 651
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `zhipu-glm-5-2`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 90 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 90
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 15 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 15
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 775 models, 1 added, 5 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 775
- Models added: 1
- Models removed: 5
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `glm-5.2`

</details>

<details>
<summary>Removed models (5)</summary>

- `claude-3-5-haiku`
- `claude-3-5-sonnet`
- `claude-3-5-sonnet-20240620`
- `claude-opus-4-0`
- `claude-sonnet-4-0`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 11 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `moonshotai/Kimi-K2.7-Code`
- `zai-org/GLM-5.2`

</details>

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 1 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 1
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kimi-k2.7-code`

</details>

<details>
<summary>Removed models (2)</summary>

- `gemini-2.0-flash-001`
- `gemini-2.0-flash-lite-001`

</details>

</details>

<details>
<summary><strong>crof</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 145 models, 2 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 145
- Models added: 2
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 1 | 0 | 1 |

</details>

<details>
<summary>Added models (2)</summary>

- `moonshotai/Kimi-K2.7-Code`
- `zai-org/GLM-5.2`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 3 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 3
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (3)</summary>

- `anthropic/claude-3-5-haiku-20241022`
- `anthropic/claude-opus-4-20250514`
- `anthropic/claude-sonnet-4-20250514`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 268 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 268
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `accounts/fireworks/models/glm-5p2`
- `accounts/fireworks/models/voyage-4`
- `accounts/fireworks/models/voyage-4-lite`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 9 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `zai-org/GLM-5.2`

</details>

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 17 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 17
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `qwen/qwen3.6-27b`

</details>

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 29 models, 1 added, 0 removed, 43 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 1
- Models removed: 0
- Total field changes: 43

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 15 |
| `pricing.output` | 0 | 0 | 16 |
| `pricing.cache_read` | 0 | 0 | 12 |

</details>

<details>
<summary>Added models (1)</summary>

- `zai-org/GLM-5.2`

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 160 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 160
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `zai-org/glm-5.2`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 332 models, 1 added, 1 removed, 17 field changes</summary>

#### Summary

- Models currently tracked: 332
- Models added: 1
- Models removed: 1
- Total field changes: 17

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 1 | 5 |
| `limit.context` | 0 | 0 | 2 |
| `limit.output` | 0 | 2 | 2 |

</details>

<details>
<summary>Added models (1)</summary>

- `z-ai/glm-5.2`

</details>

<details>
<summary>Removed models (1)</summary>

- `deepseek/deepseek-r1-distill-qwen-32b`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 224 models, 1 added, 0 removed, 223 field changes</summary>

#### Summary

- Models currently tracked: 224
- Models added: 1
- Models removed: 0
- Total field changes: 223

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 223 |

</details>

<details>
<summary>Added models (1)</summary>

- `glm-5.2`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 59 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `mistral-ocr-3`
- `mistral-ocr-3-0`

</details>

</details>

<details>
<summary><strong>modelscope</strong> — 59 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 257 models, 0 added, 0 removed, 147 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 147

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `last_updated` | 0 | 0 | 2 |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 631 models, 4 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 631
- Models added: 4
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (4)</summary>

- `TEE/glm-5.2`
- `moonshotai/kimi-k2.7-code-highspeed`
- `zai-org/glm-5.2`
- `zai-org/glm-5.2:thinking`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 13 models, 2 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 2
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (2)</summary>

- `glm-5.2`
- `moonshotai/Kimi-K2.7-Code`

</details>

</details>

<details>
<summary><strong>novita</strong> — 139 models, 1 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 139
- Models added: 1
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `zai-org/glm-5.2`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 35 models, 1 added, 8 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 35
- Models added: 1
- Models removed: 8
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `glm-5.2`

</details>

<details>
<summary>Removed models (8)</summary>

- `cogito-2.1:671b`
- `glm-4.6`
- `kimi-k2-thinking`
- `kimi-k2:1t`
- `minimax-m2`
- `qwen3-next:80b`
- `qwen3-vl:235b`
- `qwen3-vl:235b-instruct`

</details>

</details>

<details>
<summary><strong>nvidia</strong> — 121 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `glm-5.2`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 337 models, 1 added, 1 removed, 18 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 1
- Models removed: 1
- Total field changes: 18

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 4 |
| `pricing.output` | 0 | 0 | 3 |
| `pricing.cache_read` | 0 | 0 | 4 |
| `limit.context` | 0 | 0 | 2 |
| `limit.output` | 0 | 2 | 2 |

</details>

<details>
<summary>Added models (1)</summary>

- `z-ai/glm-5.2`

</details>

<details>
<summary>Removed models (1)</summary>

- `deepseek/deepseek-r1-distill-qwen-32b`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 165 models, 1 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 165
- Models added: 1
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `z-ai/glm-5.2`

</details>

<details>
<summary>Removed models (1)</summary>

- `minimax/minimax-m3`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 534 models, 21 added, 1 removed, 62 field changes</summary>

#### Summary

- Models currently tracked: 534
- Models added: 21
- Models removed: 1
- Total field changes: 62

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 62 |

</details>

<details>
<summary>Added models (21)</summary>

- `azure/gpt-5.2-codex@eastus2`
- `bedrock/gpt-5.4@us-east-1`
- `bedrock/gpt-5.4@us-east-2`
- `bedrock/gpt-5.4@us-west-2`
- `bedrock/gpt-5.5@us-east-1`
- `bedrock/gpt-5.5@us-east-2`
- `fireworks/glm-5.2`
- `nebius/deepseek-ai/deepseek-v4-pro`
- `nebius/glm-5.2`
- `nebius/google/gemma-3-27b-it`
- `nebius/minimaxi/minimax-m2.5`
- `nebius/moonshotai/kimi-k2.6`
- `nebius/nousresearch/hermes-4-70b`
- `nebius/nvidia/nemotron-3-super-120b-a12b`
- `nebius/nvidia/nemotron-3-ultra-550b-a55b`
- `nebius/qwen/qwen3-235b-a22b-instruct-2507`
- `nebius/qwen/qwen3-30b-a3b-instruct-2507`
- `nebius/qwen/qwen3-32b`
- `nebius/qwen/qwen3-next-80b-a3b-thinking`
- `nebius/qwen/qwen3.5-397b-a17b`
- `zai/glm-5.2`

</details>

<details>
<summary>Removed models (1)</summary>

- `azure/openai-responses/gpt-5.2-codex@eastus2`

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tokenrouter</strong> — 105 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 105
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `z-ai/glm-5.2`

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 264 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 264
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 1 | 1 | 0 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 92 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 92
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `e2ee-glm-5-2-p`
- `zai-org-glm-5-2`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.output` | 0 | 1 | 0 |

</details>

<details>
<summary>Added models (1)</summary>

- `zai/glm-5.2`

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 135 models, 2 added, 0 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 135
- Models added: 2
- Models removed: 0
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.reasoning` | 0 | 1 | 0 |
| `pricing.input` | 0 | 1 | 1 |
| `pricing.output` | 0 | 1 | 1 |
| `pricing.cache_read` | 0 | 1 | 1 |
| `pricing.cache_write` | 0 | 1 | 0 |
| `modalities.output` | 1 | 0 | 0 |

</details>

<details>
<summary>Added models (2)</summary>

- `google/gemini-embedding-2`
- `qwen/qwen3-vl-embedding`

</details>

</details>

</details>

## Run at 1781572748

### Summary

- **Total models currently tracked: 7841** across 60 providers
- Providers with changes this run: 58
- Total models added: 23
- Total models removed: 19
- Total field changes: 729

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 19 |
| `knowledge_cutoff` | 0 | 1 | 0 |
| `release_date` | 3 | 0 | 246 |
| `last_updated` | 0 | 0 | 2 |
| `open_weights` | 0 | 2 | 0 |
| `features.attachment` | 0 | 16 | 0 |
| `features.reasoning` | 1 | 5 | 0 |
| `features.structured_output` | 0 | 11 | 6 |
| `features.tool_call` | 0 | 9 | 4 |
| `pricing.input` | 2 | 10 | 164 |
| `pricing.output` | 2 | 10 | 150 |
| `pricing.cache_read` | 1 | 4 | 12 |
| `pricing.cache_write` | 1 | 1 | 0 |
| `limit.context` | 1 | 0 | 6 |
| `limit.output` | 4 | 0 | 2 |
| `modalities.input` | 0 | 17 | 0 |
| `modalities.output` | 0 | 17 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 652 models, 3 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 652
- Models added: 3
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `last_updated` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (3)</summary>

- `moonshot-kimi-k2-7-code`
- `qwen3.7-plus`
- `zhipu-glm-5-2`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 90 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 90
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kimi-k2.7-code`

</details>

</details>

<details>
<summary><strong>ambient</strong> — 15 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 15
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 779 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 779
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kimi-k2.7-code-highspeed`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `claude-opus-4-20250514`
- `claude-sonnet-4-20250514`

</details>

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 107 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 107
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax-m3`

</details>

</details>

<details>
<summary><strong>crof</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 143 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 143
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `MiniMaxAI/MiniMax-M2.7-Turbo`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 172 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 172
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 265 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 265
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 112 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 112

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 16 |
| `knowledge_cutoff` | 0 | 1 | 0 |
| `open_weights` | 0 | 2 | 0 |
| `features.attachment` | 0 | 16 | 0 |
| `features.reasoning` | 0 | 4 | 0 |
| `features.structured_output` | 0 | 11 | 0 |
| `features.tool_call` | 0 | 9 | 0 |
| `pricing.input` | 0 | 9 | 0 |
| `pricing.output` | 0 | 9 | 0 |
| `pricing.cache_read` | 0 | 3 | 0 |
| `modalities.input` | 0 | 16 | 0 |
| `modalities.output` | 0 | 16 | 0 |

</details>

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 0 added, 2 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 2
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 5 |
| `features.tool_call` | 0 | 0 | 4 |
| `pricing.input` | 1 | 0 | 1 |
| `pricing.output` | 1 | 0 | 1 |
| `limit.context` | 1 | 0 | 0 |

</details>

<details>
<summary>Removed models (2)</summary>

- `Qwen/Qwen2.5-VL-7B-Instruct`
- `zai-org/GLM-4.7-FP8`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 42 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 42

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 15 |
| `pricing.output` | 0 | 0 | 15 |
| `pricing.cache_read` | 0 | 0 | 12 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 159 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 159
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 332 models, 0 added, 2 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 332
- Models added: 0
- Models removed: 2
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 2 |
| `limit.output` | 2 | 0 | 1 |

</details>

<details>
<summary>Removed models (2)</summary>

- `anthropic/claude-fable-5`
- `~anthropic/claude-fable-latest`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 223 models, 4 added, 2 removed, 219 field changes</summary>

#### Summary

- Models currently tracked: 223
- Models added: 4
- Models removed: 2
- Total field changes: 219

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 219 |

</details>

<details>
<summary>Added models (4)</summary>

- `gemma-4-26b-a4b-it`
- `gemma-4-31b-it`
- `kimi-k2.7-code-highspeed`
- `qwen3.5-9b`

</details>

<details>
<summary>Removed models (2)</summary>

- `claude-opus-4-20250514`
- `claude-sonnet-4-20250514`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 59 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 257 models, 0 added, 0 removed, 146 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 146

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `last_updated` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 627 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 627
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 138 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 138
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 42 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 42
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 121 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `anthropic/claude-fable-5`

</details>

</details>

<details>
<summary><strong>poe</strong> — 379 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 379
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax-m3-t`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 337 models, 0 added, 0 removed, 13 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 0
- Models removed: 0
- Total field changes: 13

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 3 |
| `pricing.output` | 0 | 0 | 3 |
| `limit.context` | 0 | 0 | 3 |
| `limit.output` | 2 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 165 models, 3 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 165
- Models added: 3
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 3 |
| `pricing.output` | 0 | 0 | 3 |

</details>

<details>
<summary>Added models (3)</summary>

- `orcarouter/fusion`
- `orcarouter/fusion-flash`
- `orcarouter/fusion-mini`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 514 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 514
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `google/gemma-4-31b-it`
- `nvidia/nemotron-3.5-content-safety`

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tokenrouter</strong> — 104 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 104
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 264 models, 2 added, 7 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 264
- Models added: 2
- Models removed: 7
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `release_date` | 3 | 0 | 1 |

</details>

<details>
<summary>Added models (2)</summary>

- `Qwen/Qwen3.7-Plus`
- `cartesia/sonic-3.5`

</details>

<details>
<summary>Removed models (7)</summary>

- `HiDream-ai/HiDream-I1-Dev`
- `HiDream-ai/HiDream-I1-Fast`
- `HiDream-ai/HiDream-I1-Full`
- `Lykon/DreamShaper`
- `kwaivgI/kling-1.6-pro`
- `kwaivgI/kling-2.0-master`
- `stabilityai/stable-diffusion-3-medium`

</details>

</details>

<details>
<summary><strong>venice</strong> — 90 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 90
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kimi-k2-7-code`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 281 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 281
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.7-code-highspeed`

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 133 models, 2 added, 3 removed, 11 field changes</summary>

#### Summary

- Models currently tracked: 133
- Models added: 2
- Models removed: 3
- Total field changes: 11

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.reasoning` | 1 | 1 | 0 |
| `pricing.input` | 1 | 1 | 0 |
| `pricing.output` | 1 | 1 | 0 |
| `pricing.cache_read` | 1 | 1 | 0 |
| `pricing.cache_write` | 1 | 1 | 0 |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (2)</summary>

- `moonshotai/kimi-k2.7-code-highspeed`
- `qwen/qwen3-asr-flash`

</details>

<details>
<summary>Removed models (3)</summary>

- `google/gemma-3-12b-it`
- `inclusionai/ling-1t`
- `inclusionai/ring-1t`

</details>

</details>

</details>

## Run at 1781486213

### Summary

- **Total models currently tracked: 7837** across 60 providers
- Providers with changes this run: 58
- Total models added: 1
- Total models removed: 2
- Total field changes: 594

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `release_date` | 0 | 0 | 247 |
| `features.attachment` | 0 | 0 | 11 |
| `features.structured_output` | 0 | 0 | 3 |
| `features.tool_call` | 0 | 0 | 5 |
| `pricing.input` | 0 | 2 | 153 |
| `pricing.output` | 0 | 2 | 139 |
| `pricing.cache_read` | 0 | 0 | 11 |
| `limit.context` | 0 | 2 | 0 |
| `modalities.input` | 1 | 0 | 16 |
| `modalities.output` | 1 | 0 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>alibaba-cn</strong> — 89 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 15 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 15
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 778 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 778
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 142 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 142
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 172 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 172
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 265 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 265
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 122 models, 1 added, 1 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 122
- Models added: 1
- Models removed: 1
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 3 |
| `features.tool_call` | 0 | 0 | 5 |
| `pricing.input` | 0 | 2 | 0 |
| `pricing.output` | 0 | 2 | 0 |
| `limit.context` | 0 | 2 | 0 |

</details>

<details>
<summary>Added models (1)</summary>

- `Qwen/Qwen2.5-VL-7B-Instruct`

</details>

<details>
<summary>Removed models (1)</summary>

- `CohereLabs/command-a-vision-07-2025`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 39 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 39

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 14 |
| `pricing.output` | 0 | 0 | 14 |
| `pricing.cache_read` | 0 | 0 | 11 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 159 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 159
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 334 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 334
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>llmgateway</strong> — 221 models, 0 added, 0 removed, 221 field changes</summary>

#### Summary

- Models currently tracked: 221
- Models added: 0
- Models removed: 0
- Total field changes: 221

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 221 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 59 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 257 models, 0 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 627 models, 0 added, 0 removed, 27 field changes</summary>

#### Summary

- Models currently tracked: 627
- Models added: 0
- Models removed: 0
- Total field changes: 27

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.attachment` | 0 | 0 | 11 |
| `modalities.input` | 0 | 0 | 16 |

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 138 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 138
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 42 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 42
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 121 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `modalities.input` | 1 | 0 | 0 |
| `modalities.output` | 1 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 337 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>orcarouter</strong> — 162 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 162
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 512 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 512
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tokenrouter</strong> — 104 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 104
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 269 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 269
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 89 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `e2ee-glm-4-7-flash-p`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 280 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 280
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 134 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 134
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1781399636

### Summary

- **Total models currently tracked: 7838** across 60 providers
- Providers with changes this run: 58
- Total models added: 16
- Total models removed: 16
- Total field changes: 652

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 1 | 308 |
| `features.reasoning` | 1 | 0 | 0 |
| `features.structured_output` | 0 | 0 | 8 |
| `features.tool_call` | 0 | 0 | 4 |
| `pricing.input` | 2 | 1 | 155 |
| `pricing.output` | 2 | 1 | 142 |
| `pricing.cache_read` | 1 | 0 | 14 |
| `pricing.cache_write` | 1 | 0 | 0 |
| `limit.context` | 1 | 1 | 3 |
| `limit.output` | 0 | 4 | 0 |
| `modalities.input` | 0 | 0 | 2 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>alibaba-cn</strong> — 89 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 15 models, 1 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 15
- Models added: 1
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `google/gemma-4-26b-a4b-it`

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 778 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 778
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `coding-glm-5.2`
- `coding-glm-5.2-free`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 22 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kimi-k2.7-code`

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 142 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 142
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 172 models, 0 added, 1 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 172
- Models added: 0
- Models removed: 1
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 0 | 0 | 2 |

</details>

<details>
<summary>Removed models (1)</summary>

- `anthropic/claude-fable-5`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 265 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 265
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `accounts/fireworks/models/kimi-k2p7-code`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 122 models, 1 added, 0 removed, 18 field changes</summary>

#### Summary

- Models currently tracked: 122
- Models added: 1
- Models removed: 0
- Total field changes: 18

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 8 |
| `features.tool_call` | 0 | 0 | 4 |
| `pricing.input` | 1 | 1 | 0 |
| `pricing.output` | 1 | 1 | 0 |
| `limit.context` | 1 | 1 | 0 |

</details>

<details>
<summary>Added models (1)</summary>

- `deepseek-ai/DeepSeek-Prover-V2-671B`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 37 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 37

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 13 |
| `pricing.output` | 0 | 0 | 14 |
| `pricing.cache_read` | 0 | 0 | 10 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 159 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 159
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 334 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 334
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 2 | 0 |
| `modalities.input` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 221 models, 0 added, 1 removed, 221 field changes</summary>

#### Summary

- Models currently tracked: 221
- Models added: 0
- Models removed: 1
- Total field changes: 221

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 221 |

</details>

<details>
<summary>Removed models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 59 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 257 models, 0 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 627 models, 0 added, 8 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 627
- Models added: 0
- Models removed: 8
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (8)</summary>

- `anthropic/claude-fable-5`
- `anthropic/claude-fable-latest`
- `deepseek/deepseek-v3.2-speciale`
- `google/gemini-flash-1.5`
- `nex-agi/deepseek-v3.1-nex-n1`
- `openai/gpt-5.2-pro`
- `openai/gpt-5.4-pro`
- `zai-org/GLM-5-NVFP4-TEE`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 138 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 138
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 42 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 42
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 121 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 337 models, 0 added, 0 removed, 10 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 0
- Models removed: 0
- Total field changes: 10

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 2 | 0 |
| `modalities.input` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 162 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 162
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `anthropic/claude-fable-5`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 512 models, 8 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 512
- Models added: 8
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (8)</summary>

- `alibaba/qwen3.7-plus`
- `fireworks/kimi-k2.7-code`
- `fireworks/minimax-m3`
- `fireworks/nemotron-3-ultra-nvfp4`
- `fireworks/qwen3.7-plus`
- `moonshot/kimi-k2.7-code`
- `parasail/kimi-k2.7-code`
- `parasail/parasail-deepseek-v4-flash`

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 1 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 1
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `hf:MiniMaxAI/MiniMax-M3`

</details>

<details>
<summary>Removed models (1)</summary>

- `hf:MiniMaxAI/MiniMax-M2.5`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 1 removed, 59 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 1
- Total field changes: 59

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 59 |

</details>

<details>
<summary>Removed models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>tokenrouter</strong> — 104 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 104
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `anthropic/claude-fable-5`

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 269 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 269
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 1 | 0 |

</details>

<details>
<summary>Added models (1)</summary>

- `moonshotai/Kimi-K2.7-Code`

</details>

</details>

<details>
<summary><strong>venice</strong> — 90 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 90
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 280 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 280
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `anthropic/claude-fable-5`

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 134 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 134
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.reasoning` | 1 | 0 | 0 |
| `pricing.input` | 1 | 0 | 0 |
| `pricing.output` | 1 | 0 | 0 |
| `pricing.cache_read` | 1 | 0 | 0 |
| `pricing.cache_write` | 1 | 0 | 0 |

</details>

</details>

</details>

## Run at 1781313179

### Summary

- **Total models currently tracked: 7838** across 60 providers
- Providers with changes this run: 58
- Total models added: 35
- Total models removed: 7
- Total field changes: 614

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 244 |
| `last_updated` | 0 | 0 | 2 |
| `open_weights` | 0 | 0 | 1 |
| `features.reasoning` | 0 | 0 | 1 |
| `features.structured_output` | 0 | 0 | 6 |
| `features.tool_call` | 0 | 0 | 3 |
| `pricing.input` | 0 | 0 | 164 |
| `pricing.output` | 0 | 0 | 148 |
| `pricing.cache_read` | 1 | 2 | 20 |
| `limit.context` | 0 | 0 | 11 |
| `limit.output` | 3 | 2 | 6 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>alibaba-cn</strong> — 89 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 14 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `moonshotai/kimi-k2.7-code`
- `openai/gpt-oss-20b`
- `qwen/qwen3-next-80b-a3b-instruct`

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 776 models, 1 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 776
- Models added: 1
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kimi-k2.7-code`

</details>

<details>
<summary>Removed models (2)</summary>

- `Kimi-K2-0905`
- `aistudio_gpt-4.1-mini`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 142 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 142
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 173 models, 1 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 173
- Models added: 1
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (1)</summary>

- `minimax/minimax-m3`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 264 models, 2 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 264
- Models added: 2
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `open_weights` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (2)</summary>

- `accounts/fireworks/models/minimax-m3`
- `accounts/fireworks/models/qwen3p7-plus`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 32 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 32
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 121 models, 4 added, 1 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 4
- Models removed: 1
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 6 |
| `features.tool_call` | 0 | 0 | 3 |

</details>

<details>
<summary>Added models (4)</summary>

- `MiniMaxAI/MiniMax-M3`
- `Qwen/Qwen3.6-35B-A3B`
- `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`
- `moonshotai/Kimi-K2.7-Code`

</details>

<details>
<summary>Removed models (1)</summary>

- `deepseek-ai/DeepSeek-Prover-V2-671B`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 1 added, 0 removed, 40 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 1
- Models removed: 0
- Total field changes: 40

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 15 |
| `pricing.output` | 0 | 0 | 13 |
| `pricing.cache_read` | 0 | 0 | 12 |

</details>

<details>
<summary>Added models (1)</summary>

- `moonshotai/Kimi-K2.7-Code`

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 159 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 159
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.7-code`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 334 models, 1 added, 1 removed, 16 field changes</summary>

#### Summary

- Models currently tracked: 334
- Models added: 1
- Models removed: 1
- Total field changes: 16

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 1 | 1 |
| `limit.context` | 0 | 0 | 5 |
| `limit.output` | 1 | 1 | 3 |

</details>

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.7-code`

</details>

<details>
<summary>Removed models (1)</summary>

- `meta-llama/llama-guard-3-8b`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 222 models, 1 added, 0 removed, 221 field changes</summary>

#### Summary

- Models currently tracked: 222
- Models added: 1
- Models removed: 0
- Total field changes: 221

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 221 |

</details>

<details>
<summary>Added models (1)</summary>

- `kimi-k2.7-code`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 59 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `MiniMax/MiniMax-M3`

</details>

</details>

<details>
<summary><strong>moark</strong> — 257 models, 2 added, 0 removed, 148 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 2
- Models removed: 0
- Total field changes: 148

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `last_updated` | 0 | 0 | 2 |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |
| `limit.output` | 1 | 0 | 0 |

</details>

<details>
<summary>Added models (2)</summary>

- `TeleTTS-Bidirectional-Mandarin`
- `TeleTTS-MultiDialect`

</details>

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 635 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 635
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.7-code`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 138 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 138
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `moonshotai/kimi-k2.7-code`
- `stepfun/step-3.7-flash`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 42 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 42
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kimi-k2.7-code`

</details>

</details>

<details>
<summary><strong>nvidia</strong> — 121 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimaxai/minimax-m3`

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 3 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 3
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `kimi-k2.7-code`
- `kimi-k2.7-code-el`
- `minimax-m3-n`

</details>

<details>
<summary>Removed models (2)</summary>

- `claude-opus-4`
- `claude-sonnet-4`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 337 models, 1 added, 1 removed, 24 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 1
- Models removed: 1
- Total field changes: 24

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 5 |
| `pricing.output` | 0 | 0 | 5 |
| `pricing.cache_read` | 1 | 1 | 2 |
| `limit.context` | 0 | 0 | 5 |
| `limit.output` | 1 | 1 | 3 |

</details>

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.7-code`

</details>

<details>
<summary>Removed models (1)</summary>

- `meta-llama/llama-guard-3-8b`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 163 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 163
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `kimi/kimi-k2.7-code`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 504 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 504
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 196 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 196
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tokenrouter</strong> — 105 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 105
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `moonshotai/kimi-k2.7-code`
- `tokenrouter/gpt-5.6-mercury`

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 268 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 268
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `MiniMaxAI/MiniMax-M3`

</details>

</details>

<details>
<summary><strong>venice</strong> — 90 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 90
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax-m3-preview`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 281 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 281
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.7-code`

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 134 models, 2 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 134
- Models added: 2
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.reasoning` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (2)</summary>

- `moonshotai/kimi-k2.7-code`
- `moonshotai/kimi-k2.7-code-free`

</details>

</details>

</details>

## Run at 1781226860

### Summary

- **Total models currently tracked: 7810** across 60 providers
- Providers with changes this run: 58
- Total models added: 3
- Total models removed: 4
- Total field changes: 730

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 17 |
| `knowledge_cutoff` | 1 | 0 | 0 |
| `release_date` | 0 | 0 | 246 |
| `open_weights` | 2 | 0 | 0 |
| `features.attachment` | 16 | 0 | 0 |
| `features.reasoning` | 4 | 0 | 0 |
| `features.structured_output` | 11 | 0 | 4 |
| `features.tool_call` | 9 | 0 | 5 |
| `pricing.input` | 9 | 1 | 165 |
| `pricing.output` | 9 | 1 | 150 |
| `pricing.cache_read` | 3 | 0 | 23 |
| `limit.context` | 0 | 2 | 11 |
| `limit.output` | 2 | 0 | 5 |
| `modalities.input` | 16 | 1 | 0 |
| `modalities.output` | 16 | 1 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>alibaba-cn</strong> — 89 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 11 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 777 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 777
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 142 models, 2 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 142
- Models added: 2
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (2)</summary>

- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16`
- `stepfun-ai/Step-3.7-Flash`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 172 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 172
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 262 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 262
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 32 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 32
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 112 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 112

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 16 |
| `knowledge_cutoff` | 1 | 0 | 0 |
| `open_weights` | 2 | 0 | 0 |
| `features.attachment` | 16 | 0 | 0 |
| `features.reasoning` | 4 | 0 | 0 |
| `features.structured_output` | 11 | 0 | 0 |
| `features.tool_call` | 9 | 0 | 0 |
| `pricing.input` | 9 | 0 | 0 |
| `pricing.output` | 9 | 0 | 0 |
| `pricing.cache_read` | 3 | 0 | 0 |
| `modalities.input` | 16 | 0 | 0 |
| `modalities.output` | 16 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 118 models, 0 added, 2 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 2
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 4 |
| `features.tool_call` | 0 | 0 | 5 |
| `pricing.input` | 0 | 1 | 0 |
| `pricing.output` | 0 | 1 | 0 |
| `limit.context` | 0 | 1 | 0 |

</details>

<details>
<summary>Removed models (2)</summary>

- `Qwen/Qwen3.6-35B-A3B`
- `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 53 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 53

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 19 |
| `pricing.output` | 0 | 0 | 18 |
| `pricing.cache_read` | 0 | 0 | 16 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 158 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 158
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 334 models, 0 added, 0 removed, 11 field changes</summary>

#### Summary

- Models currently tracked: 334
- Models added: 0
- Models removed: 0
- Total field changes: 11

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 5 |
| `limit.output` | 1 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 221 models, 1 added, 0 removed, 220 field changes</summary>

#### Summary

- Models currently tracked: 221
- Models added: 1
- Models removed: 0
- Total field changes: 220

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 220 |

</details>

<details>
<summary>Added models (1)</summary>

- `wan-2-6-t2v`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 255 models, 0 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 255
- Models added: 0
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 634 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 634
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 136 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 136
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 337 models, 0 added, 0 removed, 20 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 0
- Models removed: 0
- Total field changes: 20

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 4 |
| `pricing.output` | 0 | 0 | 4 |
| `pricing.cache_read` | 0 | 0 | 4 |
| `limit.context` | 0 | 0 | 5 |
| `limit.output` | 1 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 162 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 162
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 504 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 504
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 196 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 196
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tokenrouter</strong> — 103 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 103
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 267 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 267
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 89 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 280 models, 0 added, 2 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 280
- Models added: 0
- Models removed: 2
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 1 | 0 |

</details>

<details>
<summary>Removed models (2)</summary>

- `moonshotai/kimi-k2-thinking-turbo`
- `moonshotai/kimi-k2-turbo`

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 132 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 132
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1781197784

### Summary

- **Total models currently tracked: 7811** across 60 providers
- Providers with changes this run: 57
- Total models added: 8
- Total models removed: 3
- Total field changes: 408

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 4 |
| `release_date` | 0 | 0 | 234 |
| `features.attachment` | 1 | 0 | 0 |
| `features.structured_output` | 0 | 0 | 11 |
| `features.tool_call` | 0 | 0 | 3 |
| `pricing.input` | 2 | 0 | 62 |
| `pricing.output` | 2 | 0 | 60 |
| `pricing.reasoning` | 2 | 0 | 0 |
| `pricing.cache_read` | 0 | 2 | 7 |
| `pricing.cache_write` | 0 | 0 | 1 |
| `limit.context` | 2 | 0 | 6 |
| `limit.output` | 0 | 0 | 6 |
| `modalities.input` | 1 | 0 | 1 |
| `modalities.output` | 1 | 0 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>alibaba-cn</strong> — 89 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 777 models, 1 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 777
- Models added: 1
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `gemini-3.1-flash-image`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 1 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 1
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-TEE`

</details>

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 172 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 172
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 262 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 262
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 32 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 32
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.attachment` | 1 | 0 | 0 |
| `modalities.input` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 1 added, 0 removed, 16 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 1
- Models removed: 0
- Total field changes: 16

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 7 |
| `features.tool_call` | 0 | 0 | 3 |
| `pricing.input` | 2 | 0 | 0 |
| `pricing.output` | 2 | 0 | 0 |
| `limit.context` | 2 | 0 | 0 |

</details>

<details>
<summary>Added models (1)</summary>

- `CohereLabs/command-a-vision-07-2025`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>jiekou</strong> — 158 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 158
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 334 models, 0 added, 1 removed, 20 field changes</summary>

#### Summary

- Models currently tracked: 334
- Models added: 0
- Models removed: 1
- Total field changes: 20

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 3 |
| `release_date` | 0 | 0 | 2 |
| `features.structured_output` | 0 | 0 | 3 |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.reasoning` | 2 | 0 | 0 |
| `pricing.cache_read` | 0 | 1 | 0 |
| `limit.context` | 0 | 0 | 3 |
| `limit.output` | 0 | 0 | 3 |

</details>

<details>
<summary>Removed models (1)</summary>

- `nvidia/nemotron-nano-9b-v2`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 220 models, 0 added, 0 removed, 220 field changes</summary>

#### Summary

- Models currently tracked: 220
- Models added: 0
- Models removed: 0
- Total field changes: 220

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 220 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 255 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 255
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 634 models, 1 added, 0 removed, 100 field changes</summary>

#### Summary

- Models currently tracked: 634
- Models added: 1
- Models removed: 0
- Total field changes: 100

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 50 |
| `pricing.output` | 0 | 0 | 50 |

</details>

<details>
<summary>Added models (1)</summary>

- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-TEE`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 136 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 136
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `modalities.input` | 1 | 0 | 0 |
| `modalities.output` | 1 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 337 models, 0 added, 1 removed, 15 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 0
- Models removed: 1
- Total field changes: 15

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 3 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 1 | 1 |
| `pricing.cache_write` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 3 |
| `limit.output` | 0 | 0 | 3 |

</details>

<details>
<summary>Removed models (1)</summary>

- `nvidia/nemotron-nano-9b-v2`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 162 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 162
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `google/gemini-3-pro-preview`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 504 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 504
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `bedrock/claude-fable-5@eu-west-1`
- `bedrock/claude-fable-5@us-east-1`
- `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning`

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 196 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 196
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tokenrouter</strong> — 103 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 103
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 267 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 267
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 89 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `xiaomi-mimo-v2-5`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 3 |
| `pricing.output` | 0 | 0 | 3 |
| `pricing.cache_read` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 132 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 132
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1781140306

### Summary

- **Total models currently tracked: 7703** across 59 providers
- Providers with changes this run: 58
- Total models added: 4
- Total models removed: 2
- Total field changes: 311

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `release_date` | 0 | 0 | 243 |
| `features.structured_output` | 0 | 0 | 7 |
| `features.tool_call` | 1 | 0 | 4 |
| `pricing.input` | 0 | 2 | 17 |
| `pricing.output` | 0 | 2 | 17 |
| `pricing.cache_read` | 0 | 0 | 13 |
| `limit.context` | 0 | 2 | 0 |
| `modalities.input` | 1 | 0 | 0 |
| `modalities.output` | 1 | 0 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 649 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 649
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 89 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 776 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 776
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 172 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 172
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 262 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 262
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 32 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 32
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 119 models, 0 added, 0 removed, 17 field changes</summary>

#### Summary

- Models currently tracked: 119
- Models added: 0
- Models removed: 0
- Total field changes: 17

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 7 |
| `features.tool_call` | 0 | 0 | 4 |
| `pricing.input` | 0 | 2 | 0 |
| `pricing.output` | 0 | 2 | 0 |
| `limit.context` | 0 | 2 | 0 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 35 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 35

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 13 |
| `pricing.output` | 0 | 0 | 13 |
| `pricing.cache_read` | 0 | 0 | 9 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 158 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 158
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 335 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 335
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>llmgateway</strong> — 220 models, 0 added, 0 removed, 220 field changes</summary>

#### Summary

- Models currently tracked: 220
- Models added: 0
- Models removed: 0
- Total field changes: 220

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 220 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 255 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 255
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 633 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 633
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 136 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 136
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 1 added, 1 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 1
- Models removed: 1
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `features.tool_call` | 1 | 0 | 0 |
| `modalities.input` | 1 | 0 | 0 |
| `modalities.output` | 1 | 0 | 0 |

</details>

<details>
<summary>Added models (1)</summary>

- `google/diffusiongemma-26b-a4b-it`

</details>

<details>
<summary>Removed models (1)</summary>

- `qwen/qwen3-coder-480b-a35b-instruct`

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 27 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic/claude-fable-5`

</details>

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 1 removed, 11 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 1
- Total field changes: 11

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 4 |
| `pricing.output` | 0 | 0 | 4 |
| `pricing.cache_read` | 0 | 0 | 3 |

</details>

<details>
<summary>Removed models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 338 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 338
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>orcarouter</strong> — 163 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 163
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 501 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 501
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 196 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 196
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 267 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 267
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `Qwen/Qwen3.5-35B-A3B-Lora`
- `openai/gpt-image-2`

</details>

</details>

<details>
<summary><strong>venice</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 132 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 132
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1781114846

### Summary

- **Total models currently tracked: 7701** across 59 providers
- Providers with changes this run: 58
- Total models added: 1
- Total models removed: 2
- Total field changes: 241

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `release_date` | 0 | 0 | 229 |
| `features.tool_call` | 1 | 1 | 0 |
| `pricing.input` | 1 | 0 | 2 |
| `pricing.output` | 1 | 0 | 2 |
| `limit.context` | 1 | 0 | 0 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 649 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 649
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 89 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 776 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 776
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 172 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 172
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 262 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 262
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 32 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 32
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 119 models, 0 added, 1 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 119
- Models added: 0
- Models removed: 1
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 1 | 0 | 0 |
| `pricing.output` | 1 | 0 | 0 |
| `limit.context` | 1 | 0 | 0 |

</details>

<details>
<summary>Removed models (1)</summary>

- `CohereLabs/command-a-vision-07-2025`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>jiekou</strong> — 158 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 158
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 335 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 335
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>llmgateway</strong> — 220 models, 0 added, 0 removed, 220 field changes</summary>

#### Summary

- Models currently tracked: 220
- Models added: 0
- Models removed: 0
- Total field changes: 220

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 220 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 255 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 255
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 633 models, 1 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 633
- Models added: 1
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (1)</summary>

- `xiaomi/mimo-v2.5-pro-ultraspeed`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 136 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 136
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `features.tool_call` | 1 | 1 | 0 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 338 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 338
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `moonshotai/kimi-k2.6:free`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 163 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 163
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 501 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 501
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 196 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 196
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 265 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 265
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 132 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 132
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1781110912

### Summary

- **Total models currently tracked: 7702** across 59 providers
- Providers with changes this run: 57
- Total models added: 18
- Total models removed: 10
- Total field changes: 530

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 7 |
| `release_date` | 2 | 0 | 232 |
| `features.attachment` | 0 | 0 | 1 |
| `features.reasoning` | 0 | 1 | 3 |
| `features.structured_output` | 0 | 0 | 4 |
| `features.tool_call` | 0 | 1 | 2 |
| `pricing.input` | 0 | 1 | 139 |
| `pricing.output` | 0 | 1 | 125 |
| `pricing.cache_read` | 0 | 1 | 1 |
| `limit.context` | 0 | 0 | 7 |
| `limit.output` | 0 | 0 | 1 |
| `modalities.input` | 0 | 0 | 1 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 649 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 649
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 89 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 89
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `qwen3.7-max-2026-06-08`

</details>

</details>

<details>
<summary><strong>ambient</strong> — 11 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `z-ai/glm-4.5-air`

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 776 models, 4 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 776
- Models added: 4
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (4)</summary>

- `GPT-OSS-20B`
- `Qwen2.5-VL-72B-Instruct`
- `claude-fable-5`
- `gemini-3-pro-image`

</details>

<details>
<summary>Removed models (2)</summary>

- `gpt-oss-20b`
- `qwen2.5-vl-72b-instruct`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 119 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 119

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `zai-org/GLM-5-NVFP4-TEE`

</details>

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 172 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 172
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `anthropic/claude-fable-5`
- `x-ai/grok-imagine-image`
- `x-ai/grok-imagine-image-quality`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 262 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 262
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `accounts/fireworks/models/kat-coder`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 32 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 32
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 0 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 4 |
| `features.tool_call` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 3 models, 0 added, 1 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 3
- Models added: 0
- Models removed: 1
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 3 |

</details>

<details>
<summary>Removed models (1)</summary>

- `nvidia/llama-3.3-70b-instruct-fp8`

</details>

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>jiekou</strong> — 158 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 158
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 335 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 335
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 220 models, 1 added, 0 removed, 219 field changes</summary>

#### Summary

- Models currently tracked: 220
- Models added: 1
- Models removed: 0
- Total field changes: 219

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 219 |

</details>

<details>
<summary>Added models (1)</summary>

- `minimax-hailuo-2-3`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 57 models, 0 added, 1 removed, 13 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 1
- Total field changes: 13

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 7 |
| `features.reasoning` | 0 | 0 | 3 |
| `limit.context` | 0 | 0 | 3 |

</details>

<details>
<summary>Removed models (1)</summary>

- `mistral-medium-c21211-r0-75`

</details>

</details>

<details>
<summary><strong>modelscope</strong> — 58 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `nex-agi/Nex-N2-Pro`

</details>

</details>

<details>
<summary><strong>moark</strong> — 255 models, 1 added, 0 removed, 146 field changes</summary>

#### Summary

- Models currently tracked: 255
- Models added: 1
- Models removed: 0
- Total field changes: 146

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

<details>
<summary>Added models (1)</summary>

- `MOSS-Audio-8B-Thinking`

</details>

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 632 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 632
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `zai-org/GLM-5-NVFP4-TEE`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 11 models, 0 added, 3 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 3
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 1 |

</details>

<details>
<summary>Removed models (3)</summary>

- `MiniMaxAI/MiniMax-M2.5`
- `mistralai/Devstral-Small-2-24B-Instruct-2512`
- `openai/gpt-oss-20b`

</details>

</details>

<details>
<summary><strong>novita</strong> — 136 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 136
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.tool_call` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>opencode-zen</strong> — 48 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `deepseek-v4-pro`

</details>

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `perplexity-sonar-pro`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 339 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 339
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 163 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 163
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 501 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 501
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 13 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `hf:Qwen/Qwen3-Coder-480B-A35B-Instruct`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 196 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 196
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 265 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 265
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 2 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 88 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.attachment` | 0 | 0 | 1 |
| `modalities.input` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 132 models, 1 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 132
- Models added: 1
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.reasoning` | 0 | 1 | 0 |
| `pricing.input` | 0 | 1 | 0 |
| `pricing.output` | 0 | 1 | 0 |
| `pricing.cache_read` | 0 | 1 | 0 |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `stepfun/step-3.7-flash-free`

</details>

</details>

</details>

## Run at 1781052552

### Summary

- **Total models currently tracked: 7694** across 59 providers
- Providers with changes this run: 57
- Total models added: 43
- Total models removed: 26
- Total field changes: 670

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 2 |
| `release_date` | 1 | 0 | 302 |
| `features.attachment` | 0 | 0 | 3 |
| `features.reasoning` | 0 | 0 | 2 |
| `features.structured_output` | 0 | 0 | 9 |
| `features.tool_call` | 0 | 0 | 4 |
| `pricing.input` | 0 | 0 | 164 |
| `pricing.output` | 0 | 0 | 146 |
| `pricing.cache_read` | 0 | 4 | 18 |
| `limit.context` | 0 | 0 | 6 |
| `limit.output` | 0 | 0 | 4 |
| `modalities.input` | 0 | 1 | 3 |
| `modalities.output` | 0 | 1 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 10 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.6`

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 774 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 774
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 11 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `zai-org/GLM-5-NVFP4-TEE`

</details>

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `openai/whisper-1`
- `x-ai/grok-build-0.1`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 263 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 32 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 32
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>google</strong> — 56 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `gemini-3.5-live-translate-preview`

</details>

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 0 added, 0 removed, 10 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 10

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 7 |
| `features.tool_call` | 0 | 0 | 3 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 4 models, 0 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 4 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 41 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 41

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 15 |
| `pricing.output` | 0 | 0 | 14 |
| `pricing.cache_read` | 0 | 0 | 12 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 157 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 157
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 335 models, 2 added, 3 removed, 15 field changes</summary>

#### Summary

- Models currently tracked: 335
- Models added: 2
- Models removed: 3
- Total field changes: 15

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 5 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 0 | 4 |
| `limit.context` | 0 | 0 | 2 |
| `limit.output` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (2)</summary>

- `anthropic/claude-fable-5`
- `~anthropic/claude-fable-latest`

</details>

<details>
<summary>Removed models (3)</summary>

- `arcee-ai/maestro-reasoning`
- `z-ai/glm-4-32b`
- `z-ai/glm-5v-turbo`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 219 models, 6 added, 0 removed, 213 field changes</summary>

#### Summary

- Models currently tracked: 219
- Models added: 6
- Models removed: 0
- Total field changes: 213

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 213 |

</details>

<details>
<summary>Added models (6)</summary>

- `claude-fable-5`
- `eleven-flash-v2-5`
- `eleven-multilingual-v2`
- `eleven-turbo-v2-5`
- `eleven-v3`
- `reve-create`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 57 models, 0 added, 7 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 0
- Models removed: 7
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (7)</summary>

- `deepseek-ai/DeepSeek-R1-0528`
- `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`
- `deepseek-ai/DeepSeek-R1-Distill-Llama-8B`
- `deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B`
- `deepseek-ai/DeepSeek-R1-Distill-Qwen-14B`
- `deepseek-ai/DeepSeek-R1-Distill-Qwen-32B`
- `deepseek-ai/DeepSeek-R1-Distill-Qwen-7B`

</details>

</details>

<details>
<summary><strong>moark</strong> — 254 models, 1 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 254
- Models added: 1
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

<details>
<summary>Added models (1)</summary>

- `ip-location`

</details>

</details>

<details>
<summary><strong>nearai</strong> — 40 models, 0 added, 1 removed, 13 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 1
- Total field changes: 13

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.attachment` | 0 | 0 | 3 |
| `features.reasoning` | 0 | 0 | 2 |
| `features.structured_output` | 0 | 0 | 2 |
| `features.tool_call` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 2 |
| `modalities.input` | 0 | 0 | 3 |

</details>

<details>
<summary>Removed models (1)</summary>

- `Qwen/Qwen3-30B-A3B-Instruct-2507`

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 631 models, 4 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 631
- Models added: 4
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (4)</summary>

- `TEE/deepseek-v4-flash`
- `TEE/qwen3.6-35b-a3b`
- `anthropic/claude-fable-5`
- `anthropic/claude-fable-latest`

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 14 models, 4 added, 4 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 4
- Models removed: 4
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 4 |

</details>

<details>
<summary>Added models (4)</summary>

- `glm-5.1`
- `kimi-k2.6`
- `qwen3.5-397b`
- `qwen3.6-35b`

</details>

<details>
<summary>Removed models (4)</summary>

- `Qwen/Qwen3.5-397B-A17B-FP8`
- `Qwen/Qwen3.6-35B-A3B`
- `moonshotai/Kimi-K2.6`
- `zai-org/GLM-5.1-FP8`

</details>

</details>

<details>
<summary><strong>novita</strong> — 136 models, 1 added, 1 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 136
- Models added: 1
- Models removed: 1
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `nvidia/nemotron-3-nano-30b-a3b`

</details>

<details>
<summary>Removed models (1)</summary>

- `nvidia/nvidia-nemotron-3-nano-30b-a3b-bf16`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 47 models, 2 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 47
- Models added: 2
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `claude-fable-5`
- `north-mini-code-free`

</details>

<details>
<summary>Removed models (1)</summary>

- `nemotron-3-super-free`

</details>

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 1 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 1
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-fable-5`

</details>

<details>
<summary>Removed models (1)</summary>

- `perplexity-sonar-pro`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 339 models, 2 added, 4 removed, 10 field changes</summary>

#### Summary

- Models currently tracked: 339
- Models added: 2
- Models removed: 4
- Total field changes: 10

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 2 | 1 |
| `limit.context` | 0 | 0 | 2 |
| `limit.output` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (2)</summary>

- `anthropic/claude-fable-5`
- `~anthropic/claude-fable-latest`

</details>

<details>
<summary>Removed models (4)</summary>

- `arcee-ai/maestro-reasoning`
- `z-ai/glm-4-32b`
- `z-ai/glm-4.5-air:free`
- `z-ai/glm-5v-turbo`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 163 models, 1 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 163
- Models added: 1
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic/claude-fable-5`

</details>

<details>
<summary>Removed models (1)</summary>

- `openai/gpt-5.1-codex-max`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 501 models, 6 added, 3 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 501
- Models added: 6
- Models removed: 3
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (6)</summary>

- `anthropic/claude-fable-5`
- `nvidia/nemotron-3-nano-30b-a3b`
- `nvidia/nemotron-3-super-120b-a12b`
- `nvidia/nemotron-3-ultra-550b-a55b`
- `poolside/laguna-m.1`
- `poolside/laguna-xs.2`

</details>

<details>
<summary>Removed models (3)</summary>

- `novita/meta-llama/llama-3.2-1b-instruct`
- `novita/nousresearch/hermes-2-pro-llama-3-8b`
- `novita/sao10k/l3-70b-euryale-v2.1`

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 196 models, 1 added, 0 removed, 59 field changes</summary>

#### Summary

- Models currently tracked: 196
- Models added: 1
- Models removed: 0
- Total field changes: 59

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 59 |

</details>

<details>
<summary>Added models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 265 models, 2 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 265
- Models added: 2
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `release_date` | 1 | 0 | 0 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 2 | 0 |

</details>

<details>
<summary>Added models (2)</summary>

- `zai-org/GLM-4.7-FP8`
- `zai-org/GLM-5-FP4`

</details>

</details>

<details>
<summary><strong>venice</strong> — 88 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-fable-5`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic/claude-fable-5`

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 131 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 131
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic/claude-fable-5`

</details>

</details>

</details>

## Run at 1780965792

### Summary

- **Total models currently tracked: 7677** across 59 providers
- Providers with changes this run: 57
- Total models added: 13
- Total models removed: 3
- Total field changes: 744

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 12 |
| `release_date` | 1 | 0 | 243 |
| `last_updated` | 0 | 0 | 1 |
| `features.reasoning` | 0 | 0 | 1 |
| `features.structured_output` | 0 | 0 | 10 |
| `features.tool_call` | 0 | 0 | 5 |
| `pricing.input` | 0 | 1 | 206 |
| `pricing.output` | 0 | 1 | 189 |
| `pricing.reasoning` | 11 | 0 | 0 |
| `pricing.cache_read` | 9 | 10 | 24 |
| `pricing.cache_write` | 3 | 0 | 0 |
| `pricing.input_audio` | 0 | 2 | 0 |
| `limit.context` | 0 | 1 | 6 |
| `limit.output` | 0 | 0 | 5 |
| `modalities.input` | 0 | 0 | 3 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `last_updated` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 774 models, 1 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 774
- Models added: 1
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `claude-opus-4-8-think`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 0 removed, 87 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 0
- Total field changes: 87

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 30 |
| `pricing.output` | 0 | 0 | 29 |
| `pricing.reasoning` | 7 | 0 | 0 |
| `pricing.cache_read` | 0 | 10 | 6 |
| `pricing.cache_write` | 3 | 0 | 0 |
| `pricing.input_audio` | 0 | 2 | 0 |

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 263 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 0 added, 0 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 6 |
| `features.tool_call` | 0 | 0 | 5 |
| `pricing.input` | 0 | 1 | 0 |
| `pricing.output` | 0 | 1 | 0 |
| `limit.context` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 4 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 4 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 36 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 36

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 13 |
| `pricing.output` | 0 | 0 | 12 |
| `pricing.cache_read` | 0 | 0 | 11 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 157 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 157
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 336 models, 1 added, 2 removed, 68 field changes</summary>

#### Summary

- Models currently tracked: 336
- Models added: 1
- Models removed: 2
- Total field changes: 68

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 4 |
| `features.structured_output` | 0 | 0 | 4 |
| `pricing.input` | 0 | 0 | 18 |
| `pricing.output` | 0 | 0 | 18 |
| `pricing.reasoning` | 4 | 0 | 0 |
| `pricing.cache_read` | 9 | 0 | 2 |
| `limit.context` | 0 | 0 | 3 |
| `limit.output` | 0 | 0 | 3 |
| `modalities.input` | 0 | 0 | 3 |

</details>

<details>
<summary>Added models (1)</summary>

- `nex-agi/nex-n2-pro:free`

</details>

<details>
<summary>Removed models (2)</summary>

- `minimax/minimax-m3:discounted`
- `nex-agi/deepseek-v3.1-nex-n1`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 213 models, 8 added, 0 removed, 209 field changes</summary>

#### Summary

- Models currently tracked: 213
- Models added: 8
- Models removed: 0
- Total field changes: 209

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 205 |
| `features.reasoning` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (8)</summary>

- `gemini-2.5-flash-preview-tts`
- `gemini-2.5-pro-preview-tts`
- `glm-4.7-flash-free`
- `gpt-4o-mini-tts`
- `grok-imagine-video-1-5-preview`
- `nemotron-3-ultra-550b`
- `tts-1`
- `tts-1-hd`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 253 models, 0 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 253
- Models added: 0
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

</details>

<details>
<summary><strong>nearai</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 627 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 627
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 14 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 136 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 136
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `nvidia/nvidia-nemotron-3-nano-30b-a3b-bf16`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 12 |

</details>

</details>

<details>
<summary><strong>opencode-zen</strong> — 46 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 46
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 341 models, 1 added, 1 removed, 10 field changes</summary>

#### Summary

- Models currently tracked: 341
- Models added: 1
- Models removed: 1
- Total field changes: 10

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 2 |
| `pricing.cache_read` | 0 | 0 | 2 |
| `limit.context` | 0 | 0 | 2 |
| `limit.output` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (1)</summary>

- `nex-agi/nex-n2-pro:free`

</details>

<details>
<summary>Removed models (1)</summary>

- `nex-agi/deepseek-v3.1-nex-n1`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 163 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 163
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 498 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 498
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 263 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 1 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 87 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 87
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (1)</summary>

- `tencent-hy3-preview`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 281 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 281
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 130 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 130
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1780879761

### Summary

- **Total models currently tracked: 7667** across 59 providers
- Providers with changes this run: 58
- Total models added: 0
- Total models removed: 2
- Total field changes: 636

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 3 |
| `release_date` | 0 | 1 | 235 |
| `features.attachment` | 0 | 0 | 2 |
| `features.structured_output` | 0 | 0 | 5 |
| `features.tool_call` | 1 | 0 | 7 |
| `pricing.input` | 0 | 0 | 181 |
| `pricing.output` | 0 | 0 | 154 |
| `pricing.cache_read` | 0 | 0 | 11 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 3 |
| `modalities.input` | 2 | 0 | 28 |
| `modalities.output` | 2 | 0 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 773 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 773
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>crof</strong> — 21 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 9 |
| `pricing.output` | 0 | 0 | 5 |

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 263 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 0 added, 0 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 5 |
| `features.tool_call` | 0 | 0 | 7 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 35 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 35

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 13 |
| `pricing.output` | 0 | 0 | 12 |
| `pricing.cache_read` | 0 | 0 | 10 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 157 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 157
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 337 models, 0 added, 0 removed, 16 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 0
- Models removed: 0
- Total field changes: 16

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 9 |
| `pricing.output` | 0 | 0 | 5 |
| `limit.output` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 205 models, 0 added, 0 removed, 205 field changes</summary>

#### Summary

- Models currently tracked: 205
- Models added: 0
- Models removed: 0
- Total field changes: 205

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 205 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 253 models, 0 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 253
- Models added: 0
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

</details>

<details>
<summary><strong>nearai</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 627 models, 0 added, 0 removed, 30 field changes</summary>

#### Summary

- Models currently tracked: 627
- Models added: 0
- Models removed: 0
- Total field changes: 30

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.attachment` | 0 | 0 | 2 |
| `modalities.input` | 0 | 0 | 28 |

</details>

</details>

<details>
<summary><strong>neuralwatt</strong> — 14 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 135 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 135
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 7 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 7

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 2 |
| `features.tool_call` | 1 | 0 | 0 |
| `modalities.input` | 2 | 0 | 0 |
| `modalities.output` | 2 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 46 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 46
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 341 models, 0 added, 0 removed, 19 field changes</summary>

#### Summary

- Models currently tracked: 341
- Models added: 0
- Models removed: 0
- Total field changes: 19

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 10 |
| `pricing.output` | 0 | 0 | 6 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 163 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 163
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 498 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 498
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 48 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 48
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 263 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 281 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 281
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `google/gemini-2.0-flash`
- `google/gemini-2.0-flash-lite`

</details>

</details>

<details>
<summary><strong>wafer-ai</strong> — 8 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 130 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 130
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1780867793

### Summary

- **Total models currently tracked: 7450** across 56 providers
- Providers with changes this run: 1
- Total models added: 14
- Total models removed: 0
- Total field changes: 0

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>neuralwatt</strong> — 14 models, 14 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 14
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (14)</summary>

- `MiniMaxAI/MiniMax-M2.5`
- `Qwen/Qwen3.5-397B-A17B-FP8`
- `Qwen/Qwen3.6-35B-A3B`
- `glm-5-fast`
- `glm-5.1-fast`
- `kimi-k2.5-fast`
- `kimi-k2.6-fast`
- `mistralai/Devstral-Small-2-24B-Instruct-2512`
- `moonshotai/Kimi-K2.5`
- `moonshotai/Kimi-K2.6`
- `openai/gpt-oss-20b`
- `qwen3.5-397b-fast`
- `qwen3.6-35b-fast`
- `zai-org/GLM-5.1-FP8`

</details>

</details>

</details>

## Run at 1780866418

### Summary

- **Total models currently tracked: 7436** across 55 providers
- Providers with changes this run: 1
- Total models added: 41
- Total models removed: 0
- Total field changes: 0

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>nearai</strong> — 41 models, 41 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 41
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (41)</summary>

- `Qwen/Qwen3-30B-A3B-Instruct-2507`
- `Qwen/Qwen3-Embedding-0.6B`
- `Qwen/Qwen3-Reranker-0.6B`
- `Qwen/Qwen3-VL-30B-A3B-Instruct`
- `Qwen/Qwen3.5-122B-A10B`
- `Qwen/Qwen3.6-27B-FP8`
- `Qwen/Qwen3.6-35B-A3B-FP8`
- `anthropic/claude-haiku-4-5`
- `anthropic/claude-opus-4-6`
- `anthropic/claude-opus-4-7`
- `anthropic/claude-sonnet-4-5`
- `anthropic/claude-sonnet-4-6`
- `black-forest-labs/FLUX.2-klein-4B`
- `deepseek-ai/DeepSeek-V4-Flash`
- `google/gemini-2.5-flash`
- `google/gemini-2.5-flash-lite`
- `google/gemini-2.5-pro`
- `google/gemini-3.1-flash-lite`
- `google/gemini-3.5-flash`
- `google/gemma-4-31B-it`
- `moonshotai/kimi-k2.6`
- `openai/gpt-4.1`
- `openai/gpt-4.1-mini`
- `openai/gpt-4.1-nano`
- `openai/gpt-5`
- `openai/gpt-5-mini`
- `openai/gpt-5-nano`
- `openai/gpt-5.1`
- `openai/gpt-5.2`
- `openai/gpt-5.4`
- `openai/gpt-5.4-mini`
- `openai/gpt-5.4-nano`
- `openai/gpt-5.5`
- `openai/gpt-oss-120b`
- `openai/o3`
- `openai/o3-mini`
- `openai/o4-mini`
- `openai/privacy-filter`
- `openai/whisper-large-v3`
- `qwen/qwen3.7-max`
- `zai-org/GLM-5.1-FP8`

</details>

</details>

</details>

## Run at 1780862000

### Summary

- **Total models currently tracked: 7395** across 54 providers
- Providers with changes this run: 1
- Total models added: 4
- Total models removed: 0
- Total field changes: 0

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>inceptron</strong> — 4 models, 4 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 4
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (4)</summary>

- `MiniMaxAI/MiniMax-M2.5`
- `moonshotai/Kimi-K2.6`
- `nvidia/llama-3.3-70b-instruct-fp8`
- `zai-org/GLM-5.1-FP8`

</details>

</details>

</details>

## Run at 1780860876

### Summary

- **Total models currently tracked: 7391** across 53 providers
- Providers with changes this run: 1
- Total models added: 21
- Total models removed: 0
- Total field changes: 0

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>crof</strong> — 21 models, 21 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 21
- Models added: 21
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (21)</summary>

- `deepseek-v3.2`
- `deepseek-v4-flash`
- `deepseek-v4-pro`
- `deepseek-v4-pro-lightning`
- `gemma-4-31b-it`
- `glm-4.7`
- `glm-4.7-flash`
- `glm-5`
- `glm-5.1`
- `greg-1`
- `greg-1-mini`
- `greg-1-super`
- `greg-rp`
- `kimi-k2.5`
- `kimi-k2.5-lightning`
- `kimi-k2.6`
- `mimo-v2.5-pro`
- `minimax-m2.5`
- `qwen3.5-397b-a17b`
- `qwen3.5-9b`
- `qwen3.6-27b`

</details>

</details>

</details>

## Run at 1780858068

### Summary

- **Total models currently tracked: 7370** across 52 providers
- Providers with changes this run: 1
- Total models added: 9
- Total models removed: 0
- Total field changes: 0

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>ambient</strong> — 9 models, 9 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 9
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (9)</summary>

- `ambient/large`
- `google/gemma-4-31b-it`
- `nvidia/nemotron-3-nano-30b-a3b`
- `openai/gpt-oss-120b`
- `qwen/qwen3-coder-30b-a3b-instruct`
- `qwen/qwen3.5-35b-a3b`
- `qwen/qwen3.6-27b`
- `qwen/qwen3.6-35b-a3b`
- `zai-org/GLM-5.1-FP8`

</details>

</details>

</details>

## Run at 1780808628

### Summary

- **Total models currently tracked: 7361** across 51 providers
- Providers with changes this run: 1
- Total models added: 0
- Total models removed: 0
- Total field changes: 0

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>xpersona</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1780793281

### Summary

- **Total models currently tracked: 7359** across 50 providers
- Providers with changes this run: 49
- Total models added: 4
- Total models removed: 6
- Total field changes: 539

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 2 |
| `release_date` | 0 | 0 | 219 |
| `features.structured_output` | 0 | 0 | 8 |
| `features.tool_call` | 0 | 1 | 7 |
| `pricing.input` | 1 | 0 | 151 |
| `pricing.output` | 1 | 0 | 136 |
| `pricing.cache_read` | 0 | 0 | 8 |
| `limit.context` | 1 | 0 | 0 |
| `limit.output` | 2 | 0 | 0 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 773 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 773
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 14 |
| `pricing.input` | 0 | 0 | 61 |
| `pricing.output` | 0 | 0 | 58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 263 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 0 added, 0 removed, 16 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 16

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 6 |
| `features.tool_call` | 0 | 0 | 7 |
| `pricing.input` | 1 | 0 | 0 |
| `pricing.output` | 1 | 0 | 0 |
| `limit.context` | 1 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 27 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 27

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 10 |
| `pricing.output` | 0 | 0 | 9 |
| `pricing.cache_read` | 0 | 0 | 8 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 157 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 157
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 337 models, 0 added, 3 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 337
- Models added: 0
- Models removed: 3
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `features.structured_output` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `limit.output` | 1 | 0 | 0 |

</details>

<details>
<summary>Removed models (3)</summary>

- `arcee-ai/spotlight`
- `baidu/ernie-4.5-vl-28b-a3b`
- `openai/gpt-4-1106-preview`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 205 models, 0 added, 0 removed, 205 field changes</summary>

#### Summary

- Models currently tracked: 205
- Models added: 0
- Models removed: 0
- Total field changes: 205

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 205 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 253 models, 0 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 253
- Models added: 0
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 78 |
| `pricing.output` | 0 | 0 | 67 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 627 models, 4 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 627
- Models added: 4
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (4)</summary>

- `linkup-research-high`
- `linkup-research-low`
- `linkup-research-medium`
- `linkup-research-xhigh`

</details>

</details>

<details>
<summary><strong>novita</strong> — 135 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 135
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `features.tool_call` | 0 | 1 | 0 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 46 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 46
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 341 models, 0 added, 3 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 341
- Models added: 0
- Models removed: 3
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `limit.output` | 1 | 0 | 0 |

</details>

<details>
<summary>Removed models (3)</summary>

- `arcee-ai/spotlight`
- `baidu/ernie-4.5-vl-28b-a3b`
- `openai/gpt-4-1106-preview`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 498 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 498
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 263 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 283 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 283
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 130 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 130
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1780715160

### Summary

- **Total models currently tracked: 7361** across 50 providers
- Providers with changes this run: 49
- Total models added: 0
- Total models removed: 0
- Total field changes: 216

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `release_date` | 0 | 0 | 205 |
| `features.structured_output` | 0 | 0 | 6 |
| `features.tool_call` | 0 | 0 | 2 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 773 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 773
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 263 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 6 |
| `features.tool_call` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>jiekou</strong> — 157 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 157
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 340 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 340
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>llmgateway</strong> — 205 models, 0 added, 0 removed, 205 field changes</summary>

#### Summary

- Models currently tracked: 205
- Models added: 0
- Models removed: 0
- Total field changes: 205

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 205 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 253 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 253
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 623 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 623
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>novita</strong> — 135 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 135
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `modalities.input` | 0 | 1 | 0 |
| `modalities.output` | 0 | 1 | 0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 46 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 46
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 344 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 344
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 498 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 498
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 263 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 283 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 283
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 130 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 130
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1780710703

### Summary

- **Total models currently tracked: 7361** across 50 providers
- Providers with changes this run: 1
- Total models added: 46
- Total models removed: 0
- Total field changes: 0

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>opencode-zen</strong> — 46 models, 46 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 46
- Models added: 46
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (46)</summary>

- `big-pickle`
- `claude-haiku-4-5`
- `claude-opus-4-1`
- `claude-opus-4-5`
- `claude-opus-4-6`
- `claude-opus-4-7`
- `claude-opus-4-8`
- `claude-sonnet-4`
- `claude-sonnet-4-5`
- `claude-sonnet-4-6`
- `deepseek-v4-flash`
- `deepseek-v4-flash-free`
- `gemini-3-flash`
- `gemini-3.1-pro`
- `gemini-3.5-flash`
- `glm-5`
- `glm-5.1`
- `gpt-5`
- `gpt-5-codex`
- `gpt-5-nano`
- `gpt-5.1`
- `gpt-5.1-codex`
- `gpt-5.1-codex-max`
- `gpt-5.1-codex-mini`
- `gpt-5.2`
- `gpt-5.2-codex`
- `gpt-5.3-codex`
- `gpt-5.3-codex-spark`
- `gpt-5.4`
- `gpt-5.4-mini`
- `gpt-5.4-nano`
- `gpt-5.4-pro`
- `gpt-5.5`
- `gpt-5.5-pro`
- `grok-build-0.1`
- `kimi-k2.5`
- `kimi-k2.6`
- `mimo-v2.5-free`
- `minimax-m2.5`
- `minimax-m2.7`
- `minimax-m3-free`
- `nemotron-3-super-free`
- `nemotron-3-ultra-free`
- `qwen3.5-plus`
- `qwen3.6-plus`
- `qwen3.6-plus-free`

</details>

</details>

</details>

## Run at 1780706706

### Summary

- **Total models currently tracked: 7315** across 49 providers
- Providers with changes this run: 48
- Total models added: 7
- Total models removed: 38
- Total field changes: 594

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       9 |
| `release_date`               |    0 |      0 |     219 |
| `last_updated`               |    0 |      0 |       1 |
| `features.structured_output` |    0 |      0 |       7 |
| `features.tool_call`         |    1 |      0 |       4 |
| `pricing.input`              |    1 |      0 |     162 |
| `pricing.output`             |    1 |      0 |     149 |
| `pricing.cache_read`         |    1 |      3 |      15 |
| `pricing.cache_write`        |    1 |      0 |       5 |
| `limit.context`              |    0 |      0 |       4 |
| `limit.output`               |    0 |      0 |       6 |
| `modalities.input`           |    2 |      0 |       1 |
| `modalities.output`          |    2 |      0 |       0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `last_updated` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 773 models, 3 added, 4 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 773
- Models added: 3
- Models removed: 4
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (3)</summary>

- `grok-build-0.1`
- `hy3-preview`
- `step-3.7-flash-free`

</details>

<details>
<summary>Removed models (4)</summary>

- `veo-3`
- `veo3`
- `veo3.1`
- `wan2.2-t2v-plus`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.input`       |    1 |      0 |       0 |
| `pricing.output`      |    1 |      0 |       0 |
| `pricing.cache_read`  |    1 |      0 |       0 |
| `pricing.cache_write` |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 263 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 31 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 31
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `gpt-5.2`
- `gpt-5.2-codex`

</details>

</details>

<details>
<summary><strong>github-models</strong> — 37 models, 0 added, 6 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 37
- Models added: 0
- Models removed: 6
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (6)</summary>

- `ai21-labs/ai21-jamba-1.5-large`
- `cohere/cohere-command-r-08-2024`
- `cohere/cohere-command-r-plus-08-2024`
- `microsoft/mai-ds-r1`
- `xai/grok-3`
- `xai/grok-3-mini`

</details>

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 2 added, 4 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 2
- Models removed: 4
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       7 |
| `features.tool_call`         |    0 |      0 |       4 |
| `pricing.input`              |    0 |      0 |       1 |
| `pricing.output`             |    0 |      0 |       1 |
| `limit.context`              |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (2)</summary>

- `CohereLabs/c4ai-command-r7b-12-2024`
- `meta-llama/Llama-4-Scout-17B-16E-Instruct`

</details>

<details>
<summary>Removed models (4)</summary>

- `NousResearch/Hermes-2-Pro-Llama-3-8B`
- `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`
- `Sao10K/L3-70B-Euryale-v2.1`
- `meta-llama/Llama-3.2-1B-Instruct`

</details>

</details>

<details>
<summary><strong>inception</strong> — 1 models, 0 added, 4 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1
- Models added: 0
- Models removed: 4
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (4)</summary>

- `mercury`
- `mercury-coder`
- `mercury-edit`
- `mercury-edit-2`

</details>

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 33 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 33

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      12 |
| `pricing.output`     |    0 |      0 |      12 |
| `pricing.cache_read` |    0 |      0 |       9 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 157 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 157
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 340 models, 0 added, 2 removed, 33 field changes</summary>

#### Summary

- Models currently tracked: 340
- Models added: 0
- Models removed: 2
- Total field changes: 33

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `name`                |    0 |      0 |       4 |
| `pricing.input`       |    0 |      0 |       6 |
| `pricing.output`      |    0 |      0 |       7 |
| `pricing.cache_read`  |    0 |      1 |       6 |
| `pricing.cache_write` |    0 |      0 |       5 |
| `limit.context`       |    0 |      0 |       1 |
| `limit.output`        |    0 |      0 |       3 |

</details>

<details>
<summary>Removed models (2)</summary>

- `nousresearch/hermes-2-pro-llama-3-8b`
- `sao10k/l3-euryale-70b`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 205 models, 0 added, 0 removed, 205 field changes</summary>

#### Summary

- Models currently tracked: 205
- Models added: 0
- Models removed: 0
- Total field changes: 205

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     205 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 253 models, 0 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 253
- Models added: 0
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      78 |
| `pricing.output` |    0 |      0 |      67 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 623 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 623
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `gemini-2.0-flash-001`

</details>

</details>

<details>
<summary><strong>novita</strong> — 135 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 135
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       2 |
| `pricing.output` |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 0 added, 0 removed, 7 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 0
- Total field changes: 7

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `name`               |    0 |      0 |       2 |
| `features.tool_call` |    1 |      0 |       0 |
| `modalities.input`   |    2 |      0 |       0 |
| `modalities.output`  |    2 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field              | Lost | Gained | Changed |
| ------------------ | ---: | -----: | ------: |
| `modalities.input` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 344 models, 0 added, 2 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 344
- Models added: 0
- Models removed: 2
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      1 |       0 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    0 |      0 |       3 |

</details>

<details>
<summary>Removed models (2)</summary>

- `nousresearch/hermes-2-pro-llama-3-8b`
- `sao10k/l3-euryale-70b`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 498 models, 0 added, 13 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 498
- Models added: 0
- Models removed: 13
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (13)</summary>

- `alibaba/qwen2.5-vl-32b-instruct`
- `alibaba/qwen2.5-vl-72b-instruct`
- `google/gemini-2.0-flash-001`
- `moonshot/kimi-k2-0711-preview`
- `moonshot/kimi-k2-0905-preview`
- `moonshot/kimi-k2-thinking`
- `moonshot/kimi-k2-thinking-turbo`
- `moonshot/kimi-k2-turbo-preview`
- `openai/gpt-5.4-pro`
- `openai/gpt-5.5-pro`
- `openai/o1-pro`
- `openai/o3-deep-research`
- `openai/o4-mini-deep-research`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 263 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field           | Lost | Gained | Changed |
| --------------- | ---: | -----: | ------: |
| `limit.context` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `ideogram/ideogram-4.0`

</details>

</details>

<details>
<summary><strong>venice</strong> — 86 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field           | Lost | Gained | Changed |
| --------------- | ---: | -----: | ------: |
| `name`          |    0 |      0 |       1 |
| `pricing.input` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>vercel</strong> — 283 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 283
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field  | Lost | Gained | Changed |
| ------ | ---: | -----: | ------: |
| `name` |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 130 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 130
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.cache_read` |    0 |      1 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `x-ai/grok-build-0.1`

</details>

</details>

</details>

## Run at 1780620466

### Summary

- **Total models currently tracked: 7346** across 49 providers
- Providers with changes this run: 48
- Total models added: 35
- Total models removed: 18
- Total field changes: 577

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       3 |
| `release_date`               |    2 |      0 |     219 |
| `last_updated`               |    0 |      0 |       1 |
| `features.reasoning`         |    1 |      0 |       0 |
| `features.structured_output` |    0 |      0 |       5 |
| `features.tool_call`         |    0 |      1 |       5 |
| `pricing.input`              |    1 |      1 |     158 |
| `pricing.output`             |    1 |      1 |     147 |
| `pricing.cache_read`         |    1 |      0 |      13 |
| `pricing.cache_write`        |    1 |      0 |       0 |
| `limit.context`              |    0 |      1 |       6 |
| `limit.input`                |    0 |      0 |       4 |
| `limit.output`               |    0 |      0 |       1 |
| `modalities.input`           |    0 |      1 |       1 |
| `modalities.output`          |    0 |      1 |       1 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field               | Lost | Gained | Changed |
| ------------------- | ---: | -----: | ------: |
| `last_updated`      |    0 |      0 |       1 |
| `pricing.output`    |    0 |      0 |       1 |
| `modalities.input`  |    0 |      0 |       1 |
| `modalities.output` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 88 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 774 models, 1 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 774
- Models added: 1
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `qwen3.7-plus`

</details>

<details>
<summary>Removed models (2)</summary>

- `qwen3.7-plus-preview`
- `qwen3.7-plus-preview-free`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 9 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B`

</details>

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 3 added, 7 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 3
- Models removed: 7
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (3)</summary>

- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B`
- `nvidia/Nemotron-3.5-ASR-Streaming-Multilingual-0.6b`
- `nvidia/Nemotron-Content-Safety-3.5`

</details>

<details>
<summary>Removed models (7)</summary>

- `Qwen/Qwen3.5-0.8B`
- `Qwen/Qwen3.5-122B-A10B`
- `Qwen/Qwen3.5-2B`
- `Qwen/Qwen3.5-4B`
- `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`
- `meta-llama/Meta-Llama-3.1-70B-Instruct`
- `nvidia/NVIDIA-Nemotron-Nano-9B-v2`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 263 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `accounts/fireworks/models/nemotron-3-ultra-bf16`
- `accounts/fireworks/models/nemotron-3-ultra-nvfp4`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 33 models, 0 added, 0 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 33
- Models added: 0
- Models removed: 0
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field           | Lost | Gained | Changed |
| --------------- | ---: | -----: | ------: |
| `limit.context` |    0 |      0 |       4 |
| `limit.input`   |    0 |      0 |       4 |
| `limit.output`  |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 122 models, 1 added, 0 removed, 13 field changes</summary>

#### Summary

- Models currently tracked: 122
- Models added: 1
- Models removed: 0
- Total field changes: 13

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       5 |
| `features.tool_call`         |    0 |      0 |       5 |
| `pricing.input`              |    0 |      1 |       0 |
| `pricing.output`             |    0 |      1 |       0 |
| `limit.context`              |    0 |      1 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 41 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 41

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      15 |
| `pricing.output`     |    0 |      0 |      15 |
| `pricing.cache_read` |    0 |      0 |      11 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 157 models, 5 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 157
- Models added: 5
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (5)</summary>

- `claude-haiku-4-5-20251001-r`
- `claude-opus-4-6-r`
- `claude-opus-4-7-r`
- `claude-opus-4-8-r`
- `claude-sonnet-4-6-r`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 342 models, 4 added, 2 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 342
- Models added: 4
- Models removed: 2
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `name`           |    0 |      0 |       2 |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       2 |
| `limit.context`  |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (4)</summary>

- `minimax/minimax-m3:discounted`
- `nvidia/nemotron-3-ultra-550b-a55b`
- `nvidia/nemotron-3-ultra-550b-a55b:free`
- `nvidia/nemotron-3.5-content-safety:free`

</details>

<details>
<summary>Removed models (2)</summary>

- `openai/gpt-4-0314`
- `qwen/qwen3.7-plus:free`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 205 models, 0 added, 3 removed, 205 field changes</summary>

#### Summary

- Models currently tracked: 205
- Models added: 0
- Models removed: 3
- Total field changes: 205

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     205 |

</details>

<details>
<summary>Removed models (3)</summary>

- `hermes-2-pro-llama-3-8b`
- `qwen3-30b-a3b-fp8`
- `qwen3-32b-fp8`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 253 models, 2 added, 0 removed, 145 field changes</summary>

#### Summary

- Models currently tracked: 253
- Models added: 2
- Models removed: 0
- Total field changes: 145

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      78 |
| `pricing.output` |    0 |      0 |      67 |

</details>

<details>
<summary>Added models (2)</summary>

- `TeleASR-MultiDialect`
- `TeleTTS-Mandarin`

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 624 models, 4 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 624
- Models added: 4
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (4)</summary>

- `TEE/qwen3.6-27b`
- `nex-agi/nex-n2-pro`
- `nvidia/nemotron-3-ultra-550b-a55b`
- `nvidia/nemotron-3-ultra-550b-a55b:thinking`

</details>

</details>

<details>
<summary><strong>novita</strong> — 135 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 135
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `nex-agi/nex-n2-pro`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 41 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 41
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `nemotron-3-ultra`

</details>

</details>

<details>
<summary><strong>nvidia</strong> — 120 models, 1 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 1
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `name`               |    0 |      0 |       1 |
| `features.tool_call` |    0 |      1 |       0 |
| `modalities.input`   |    0 |      1 |       0 |
| `modalities.output`  |    0 |      1 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `nvidia/nemotron-3-ultra-550b-a55b`

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 3 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 3
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (3)</summary>

- `mimo-v2-omni`
- `mimo-v2-pro`
- `qwen3-coder-480b-t`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 346 models, 3 added, 1 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 346
- Models added: 3
- Models removed: 1
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       2 |
| `limit.context`  |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (3)</summary>

- `nvidia/nemotron-3-ultra-550b-a55b`
- `nvidia/nemotron-3-ultra-550b-a55b:free`
- `nvidia/nemotron-3.5-content-safety:free`

</details>

<details>
<summary>Removed models (1)</summary>

- `openai/gpt-4-0314`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 511 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 511
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 262 models, 3 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 262
- Models added: 3
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    2 |      0 |       0 |

</details>

<details>
<summary>Added models (3)</summary>

- `nvidia/nemotron-3-asr-streaming-0.6b`
- `nvidia/nemotron-3-ultra-550b-a55b`
- `nvidia/nemotron-3.5-asr-streaming-0.6b`

</details>

</details>

<details>
<summary><strong>venice</strong> — 86 models, 1 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 1
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `nvidia-nemotron-3-ultra-550b-a55b`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 283 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 283
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `nvidia/nemotron-3-ultra-550b-a55b`

</details>

</details>

<details>
<summary><strong>wandb</strong> — 27 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B`

</details>

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 129 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `features.reasoning`  |    1 |      0 |       0 |
| `pricing.input`       |    1 |      0 |       0 |
| `pricing.output`      |    1 |      0 |       0 |
| `pricing.cache_read`  |    1 |      0 |       0 |
| `pricing.cache_write` |    1 |      0 |       0 |

</details>

</details>

</details>

## Run at 1780534492

### Summary

- **Total models currently tracked: 7329** across 49 providers
- Providers with changes this run: 48
- Total models added: 11
- Total models removed: 3
- Total field changes: 490

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       3 |
| `release_date`               |    1 |      0 |     223 |
| `last_updated`               |    0 |      0 |       2 |
| `features.attachment`        |    0 |      0 |       3 |
| `features.reasoning`         |    0 |      0 |       2 |
| `features.structured_output` |    0 |      0 |       5 |
| `features.tool_call`         |    0 |      0 |       1 |
| `pricing.input`              |    0 |      0 |     104 |
| `pricing.output`             |    0 |      1 |     101 |
| `pricing.cache_read`         |    0 |      0 |      24 |
| `pricing.cache_write`        |    0 |      0 |       8 |
| `limit.context`              |    0 |      0 |       2 |
| `limit.output`               |    4 |      0 |       0 |
| `modalities.input`           |    0 |      0 |       6 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `last_updated` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 88 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 88
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `qwen3.7-plus`
- `qwen3.7-plus-2026-05-26`

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 775 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 775
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 144 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 144
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 261 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 261
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 33 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 33
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 121 models, 0 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       5 |
| `features.tool_call`         |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 1 removed, 32 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 1
- Total field changes: 32

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      12 |
| `pricing.output`     |    0 |      0 |      11 |
| `pricing.cache_read` |    0 |      0 |       9 |

</details>

<details>
<summary>Removed models (1)</summary>

- `mistralai/Mistral-Large-Instruct-2411`

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 152 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 152
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `gpt-5.5-r`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 340 models, 1 added, 0 removed, 82 field changes</summary>

#### Summary

- Models currently tracked: 340
- Models added: 1
- Models removed: 0
- Total field changes: 82

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `name`                |    0 |      0 |       2 |
| `pricing.input`       |    0 |      0 |      29 |
| `pricing.output`      |    0 |      0 |      29 |
| `pricing.cache_read`  |    0 |      0 |      13 |
| `pricing.cache_write` |    0 |      0 |       7 |
| `limit.output`        |    2 |      0 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `qwen/qwen3.7-plus:free`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 208 models, 0 added, 0 removed, 208 field changes</summary>

#### Summary

- Models currently tracked: 208
- Models added: 0
- Models removed: 0
- Total field changes: 208

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     208 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 251 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 251
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 620 models, 2 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 620
- Models added: 2
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `features.reasoning` |    0 |      0 |       2 |
| `limit.context`      |    0 |      0 |       2 |

</details>

<details>
<summary>Added models (2)</summary>

- `xiaomi/mimo-v2.5-pro:thinking`
- `xiaomi/mimo-v2.5:thinking`

</details>

</details>

<details>
<summary><strong>novita</strong> — 134 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 134
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `baidu/cobuddy`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 40 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |       1 |
| `last_updated` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>nvidia</strong> — 119 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 119
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `nvidia/nemotron-3.5-content-safety`

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field  | Lost | Gained | Changed |
| ------ | ---: | -----: | ------: |
| `name` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 344 models, 1 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 344
- Models added: 1
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.output` |    0 |      0 |       1 |
| `limit.output`   |    2 |      0 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `qwen/qwen3.7-plus`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 511 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 511
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 259 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 259
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 85 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 85
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 0 added, 0 removed, 10 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 0
- Models removed: 0
- Total field changes: 10

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `features.attachment` |    0 |      0 |       3 |
| `pricing.output`      |    0 |      1 |       0 |
| `modalities.input`    |    0 |      0 |       6 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 26 models, 2 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 2
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `moonshotai/Kimi-K2.5`
- `zai-org/GLM-5.1`

</details>

<details>
<summary>Removed models (2)</summary>

- `nvidia/Kimi-K2.5-NVFP4`
- `zai-org/GLM-5.1-FP8`

</details>

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 129 models, 0 added, 0 removed, 7 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 0
- Models removed: 0
- Total field changes: 7

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.input`       |    0 |      0 |       2 |
| `pricing.output`      |    0 |      0 |       2 |
| `pricing.cache_read`  |    0 |      0 |       2 |
| `pricing.cache_write` |    0 |      0 |       1 |

</details>

</details>

</details>

## Run at 1780448092

### Summary

- **Total models currently tracked: 7321** across 49 providers
- Providers with changes this run: 48
- Total models added: 25
- Total models removed: 27
- Total field changes: 576

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       4 |
| `release_date`               |    0 |      3 |     222 |
| `last_updated`               |    0 |      0 |       2 |
| `features.attachment`        |    0 |      0 |       1 |
| `features.reasoning`         |    0 |      0 |       2 |
| `features.structured_output` |    0 |      0 |       7 |
| `features.tool_call`         |    1 |      0 |       4 |
| `pricing.input`              |    1 |      1 |     158 |
| `pricing.output`             |    1 |      1 |     145 |
| `pricing.cache_read`         |    0 |      3 |      13 |
| `pricing.cache_write`        |    0 |      1 |       0 |
| `limit.context`              |    1 |      0 |       0 |
| `limit.output`               |    0 |      0 |       1 |
| `modalities.input`           |    1 |      0 |       2 |
| `modalities.output`          |    1 |      0 |       0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 0 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 0
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `last_updated`   |    0 |      0 |       2 |
| `pricing.input`  |    0 |      0 |       2 |
| `pricing.output` |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 775 models, 0 added, 16 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 775
- Models added: 0
- Models removed: 16
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (16)</summary>

- `aistudio_gemini-2.0-flash`
- `gemini-2.0-flash`
- `gemini-2.0-flash-001`
- `gemini-2.0-flash-exp`
- `gemini-2.0-flash-exp-image-generation`
- `gemini-2.0-flash-exp-search`
- `gemini-2.0-flash-lite`
- `gemini-2.0-flash-lite-001`
- `gemini-2.0-flash-lite-preview-02-05`
- `gemini-2.0-flash-preview-image-generation`
- `gemini-2.0-flash-search`
- `gemini-2.0-flash-thinking-exp`
- `gemini-2.0-flash-thinking-exp-01-21`
- `gemini-2.0-flash-thinking-exp-1219`
- `gemini-2.0-pro-exp-02-05`
- `gemini-2.0-pro-exp-02-05-search`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.input`       |    0 |      1 |       0 |
| `pricing.output`      |    0 |      1 |       0 |
| `pricing.cache_read`  |    0 |      1 |       0 |
| `pricing.cache_write` |    0 |      1 |       0 |

</details>

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 1 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 1
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `Qwen/Qwen3-235B-A22B-Thinking-2507-TEE`

</details>

<details>
<summary>Removed models (1)</summary>

- `Qwen/Qwen3-235B-A22B-Thinking-2507`

</details>

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `cosmos3-super-reasoner`
- `minicpm-v-4.5`
- `qwen3.6-27b`

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 144 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 144
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `MiniMaxAI/MiniMax-M2.7`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `google/gemini-2.0-flash-001`
- `google/gemini-2.0-flash-lite-001`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 261 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 261
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 33 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 33
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 121 models, 1 added, 2 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 1
- Models removed: 2
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       7 |
| `features.tool_call`         |    0 |      0 |       4 |
| `pricing.input`              |    1 |      0 |       0 |
| `pricing.output`             |    1 |      0 |       0 |
| `limit.context`              |    1 |      0 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `Qwen/Qwen3.6-27B`

</details>

<details>
<summary>Removed models (2)</summary>

- `baidu/ERNIE-4.5-300B-A47B-Base-PT`
- `meta-llama/Llama-4-Maverick-17B-128E-Instruct`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 40 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 40

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      14 |
| `pricing.output`     |    0 |      0 |      15 |
| `pricing.cache_read` |    0 |      0 |      11 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 151 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 151
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 339 models, 2 added, 1 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 339
- Models added: 2
- Models removed: 1
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (2)</summary>

- `openrouter/fusion`
- `qwen/qwen3.7-plus`

</details>

<details>
<summary>Removed models (1)</summary>

- `baidu/ernie-4.5-300b-a47b`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 208 models, 0 added, 0 removed, 210 field changes</summary>

#### Summary

- Models currently tracked: 208
- Models added: 0
- Models removed: 0
- Total field changes: 210

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `release_date`        |    0 |      0 |     208 |
| `features.attachment` |    0 |      0 |       1 |
| `modalities.input`    |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 58 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 58
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `mistral-code-agent-latest`
- `mistral-code-fim-latest`
- `mistral-code-latest`

</details>

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 251 models, 2 added, 0 removed, 141 field changes</summary>

#### Summary

- Models currently tracked: 251
- Models added: 2
- Models removed: 0
- Total field changes: 141

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      76 |
| `pricing.output` |    0 |      0 |      65 |

</details>

<details>
<summary>Added models (2)</summary>

- `MiMo-V2.5-Pro`
- `MiniMax-M3`

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 618 models, 3 added, 2 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 618
- Models added: 3
- Models removed: 2
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `features.reasoning` |    0 |      0 |       1 |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       2 |

</details>

<details>
<summary>Added models (3)</summary>

- `minimax/minimax-m3:thinking`
- `mistral-code-agent-latest`
- `mistral-code-latest`

</details>

<details>
<summary>Removed models (2)</summary>

- `baidu/ernie-4.5-300b-a47b`
- `gemini-2.0-flash-lite`

</details>

</details>

<details>
<summary><strong>novita</strong> — 133 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 133
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 40 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 118 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `name`               |    0 |      0 |       1 |
| `features.tool_call` |    1 |      0 |       0 |
| `modalities.input`   |    1 |      0 |       0 |
| `modalities.output`  |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `qwen3.7-plus`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 343 models, 1 added, 1 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 343
- Models added: 1
- Models removed: 1
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `openrouter/fusion`

</details>

<details>
<summary>Removed models (1)</summary>

- `baidu/ernie-4.5-300b-a47b`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 511 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 511
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 259 models, 2 added, 1 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 259
- Models added: 2
- Models removed: 1
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `name`         |    0 |      0 |       1 |
| `release_date` |    0 |      3 |       0 |

</details>

<details>
<summary>Added models (2)</summary>

- `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP4`
- `zai-org/GLM-4.7-fp4`

</details>

<details>
<summary>Removed models (1)</summary>

- `xai/grok-imagine-image-pro`

</details>

</details>

<details>
<summary><strong>venice</strong> — 85 models, 1 added, 1 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 85
- Models added: 1
- Models removed: 1
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.cache_read` |    0 |      1 |       0 |
| `limit.output`       |    0 |      0 |       1 |
| `modalities.input`   |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `qwen-3-7-plus`

</details>

<details>
<summary>Removed models (1)</summary>

- `e2ee-qwen3-5-122b-a10b`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 282 models, 2 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 282
- Models added: 2
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `features.reasoning` |    0 |      0 |       1 |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      1 |       0 |

</details>

<details>
<summary>Added models (2)</summary>

- `google/gemini-3.1-flash-image`
- `xai/grok-imagine-video-1.5-preview`

</details>

</details>

<details>
<summary><strong>wandb</strong> — 26 models, 1 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 1
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field  | Lost | Gained | Changed |
| ------ | ---: | -----: | ------: |
| `name` |    0 |      0 |       2 |

</details>

<details>
<summary>Added models (1)</summary>

- `JetBrains/Mellum2-12B-A2.5B-Instruct`

</details>

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 129 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `qwen/qwen3.7-plus`

</details>

</details>

</details>

## Run at 1780361389

### Summary

- **Total models currently tracked: 7323** across 49 providers
- Providers with changes this run: 48
- Total models added: 30
- Total models removed: 14
- Total field changes: 771

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       2 |
| `release_date`               |    0 |      0 |     220 |
| `last_updated`               |    0 |      0 |       1 |
| `features.attachment`        |   37 |      4 |       8 |
| `features.reasoning`         |   37 |      2 |       8 |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |   37 |      3 |       9 |
| `pricing.input`              |    1 |      1 |     159 |
| `pricing.output`             |    1 |      1 |     145 |
| `pricing.cache_read`         |    1 |      0 |      10 |
| `limit.context`              |    1 |      1 |       6 |
| `limit.output`               |    0 |      6 |       5 |
| `modalities.input`           |   37 |      4 |      13 |
| `modalities.output`          |    0 |      2 |       0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 648 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 648
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `last_updated` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `MiniMax-M3`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 791 models, 10 added, 1 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 791
- Models added: 10
- Models removed: 1
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (10)</summary>

- `cc-minimax-m3`
- `coding-minimax-m3`
- `coding-minimax-m3-free`
- `coding-step-3.5-flash`
- `coding-step-3.5-flash-free`
- `coding-step-3.7-flash`
- `coding-step-3.7-flash-free`
- `minimax-m3`
- `mm-minimax-m3`
- `step-3.7-flash`

</details>

<details>
<summary>Removed models (1)</summary>

- `step-3.5-flash-free`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 12 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `Qwen/Qwen2.5-Coder-32B-Instruct-TEE`

</details>

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field           | Lost | Gained | Changed |
| --------------- | ---: | -----: | ------: |
| `limit.context` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>cortecs</strong> — 103 models, 0 added, 4 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 103
- Models added: 0
- Models removed: 4
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (4)</summary>

- `devstral-medium-2507`
- `devstral-small-2507`
- `mistral-large-2411`
- `pixtral-large-2411`

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 143 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 143
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 261 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 261
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `features.attachment` |    0 |      2 |       0 |
| `modalities.input`    |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 33 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 33
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 122 models, 1 added, 0 removed, 20 field changes</summary>

#### Summary

- Models currently tracked: 122
- Models added: 1
- Models removed: 0
- Total field changes: 20

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       8 |
| `features.tool_call`         |    0 |      0 |       6 |
| `pricing.input`              |    1 |      1 |       0 |
| `pricing.output`             |    1 |      1 |       0 |
| `limit.context`              |    1 |      1 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `meta-llama/Llama-4-Maverick-17B-128E-Instruct`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 38 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 38

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      14 |
| `pricing.output`     |    0 |      0 |      14 |
| `pricing.cache_read` |    0 |      0 |      10 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 151 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 151
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax/minimax-m3`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 338 models, 1 added, 2 removed, 11 field changes</summary>

#### Summary

- Models currently tracked: 338
- Models added: 1
- Models removed: 2
- Total field changes: 11

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       2 |
| `pricing.output` |    0 |      0 |       2 |
| `limit.context`  |    0 |      0 |       2 |
| `limit.output`   |    0 |      3 |       2 |

</details>

<details>
<summary>Added models (1)</summary>

- `minimax/minimax-m3`

</details>

<details>
<summary>Removed models (2)</summary>

- `google/gemini-2.0-flash-001`
- `google/gemini-2.0-flash-lite-001`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 208 models, 2 added, 1 removed, 207 field changes</summary>

#### Summary

- Models currently tracked: 208
- Models added: 2
- Models removed: 1
- Total field changes: 207

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `release_date`               |    0 |      0 |     206 |
| `features.structured_output` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (2)</summary>

- `minimax-m3`
- `qwen3.7-plus`

</details>

<details>
<summary>Removed models (1)</summary>

- `qwen37-max`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 55 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `voxtral-mini-2507`

</details>

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 249 models, 0 added, 0 removed, 141 field changes</summary>

#### Summary

- Models currently tracked: 249
- Models added: 0
- Models removed: 0
- Total field changes: 141

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      76 |
| `pricing.output` |    0 |      0 |      65 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 617 models, 3 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 617
- Models added: 3
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `features.attachment` |    0 |      0 |       1 |
| `pricing.input`       |    0 |      0 |       1 |
| `pricing.output`      |    0 |      0 |       1 |
| `limit.context`       |    0 |      0 |       1 |
| `limit.output`        |    0 |      0 |       1 |
| `modalities.input`    |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (3)</summary>

- `minimax/minimax-m3`
- `qwen3.7-plus`
- `qwen3.7-plus:thinking`

</details>

</details>

<details>
<summary><strong>novita</strong> — 133 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 133
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax/minimax-m3`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 40 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 40
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax-m3`

</details>

</details>

<details>
<summary><strong>nvidia</strong> — 118 models, 0 added, 0 removed, 7 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 7

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `name`               |    0 |      0 |       2 |
| `features.tool_call` |    0 |      1 |       0 |
| `modalities.input`   |    0 |      2 |       0 |
| `modalities.output`  |    0 |      2 |       0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 23 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `Qwen3.6-27B`

</details>

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 379 models, 2 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 379
- Models added: 2
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `grok-imgn-video-1.5`
- `minimax-m3-el`

</details>

<details>
<summary>Removed models (1)</summary>

- `topazlabs`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 343 models, 1 added, 2 removed, 16 field changes</summary>

#### Summary

- Models currently tracked: 343
- Models added: 1
- Models removed: 2
- Total field changes: 16

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       4 |
| `pricing.output`     |    0 |      0 |       4 |
| `pricing.cache_read` |    1 |      0 |       0 |
| `limit.context`      |    0 |      0 |       2 |
| `limit.output`       |    0 |      3 |       2 |

</details>

<details>
<summary>Added models (1)</summary>

- `minimax/minimax-m3`

</details>

<details>
<summary>Removed models (2)</summary>

- `google/gemini-2.0-flash-001`
- `google/gemini-2.0-flash-lite-001`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 511 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 511
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimaxi/minimax-m3`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 258 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 258
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`
- `mistralai/Voxtral-Mini-3B-2507`

</details>

</details>

<details>
<summary><strong>venice</strong> — 85 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 85
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax-m3`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 280 models, 1 added, 0 removed, 184 field changes</summary>

#### Summary

- Models currently tracked: 280
- Models added: 1
- Models removed: 0
- Total field changes: 184

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `features.attachment` |   37 |      2 |       7 |
| `features.reasoning`  |   37 |      2 |       8 |
| `features.tool_call`  |   37 |      2 |       3 |
| `modalities.input`    |   37 |      2 |      10 |

</details>

<details>
<summary>Added models (1)</summary>

- `alibaba/qwen3.7-plus`

</details>

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 128 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 128
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `minimax/minimax-m3`

</details>

</details>

</details>

## Run at 1780274948

### Summary

- **Total models currently tracked: 7307** across 49 providers
- Providers with changes this run: 47
- Total models added: 12
- Total models removed: 32
- Total field changes: 553

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       1 |
| `release_date`               |    1 |      0 |     221 |
| `features.attachment`        |    0 |      0 |       1 |
| `features.structured_output` |    1 |      0 |       8 |
| `features.tool_call`         |    1 |      0 |       7 |
| `pricing.input`              |    0 |      1 |     154 |
| `pricing.output`             |    0 |      1 |     139 |
| `pricing.cache_read`         |    0 |      1 |      13 |
| `limit.context`              |    0 |      1 |       0 |
| `limit.output`               |    0 |      0 |       1 |
| `modalities.input`           |    0 |      0 |       1 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 647 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 647
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 782 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 782
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 107 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 107
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 143 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 143
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 261 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 261
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `accounts/fireworks/models/step-3p7-flash-nvfp4`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 33 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 33
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 121 models, 0 added, 0 removed, 16 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 16

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    1 |      0 |       6 |
| `features.tool_call`         |    1 |      0 |       5 |
| `pricing.input`              |    0 |      1 |       0 |
| `pricing.output`             |    0 |      1 |       0 |
| `limit.context`              |    0 |      1 |       0 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 38 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 38

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      14 |
| `pricing.output`     |    0 |      0 |      13 |
| `pricing.cache_read` |    0 |      0 |      11 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 150 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 150
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 339 models, 1 added, 8 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 339
- Models added: 1
- Models removed: 8
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       1 |
| `features.tool_call`         |    0 |      0 |       1 |
| `pricing.input`              |    0 |      0 |       1 |
| `pricing.output`             |    0 |      0 |       1 |
| `pricing.cache_read`         |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `upstage/solar-pro-3`

</details>

<details>
<summary>Removed models (8)</summary>

- `alfredpros/codellama-7b-instruct-solidity`
- `baidu/ernie-4.5-21b-a3b`
- `mistralai/devstral-medium`
- `mistralai/devstral-small`
- `mistralai/mistral-large-2411`
- `mistralai/pixtral-large-2411`
- `xiaomi/mimo-v2-omni`
- `xiaomi/mimo-v2-pro`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 207 models, 0 added, 0 removed, 207 field changes</summary>

#### Summary

- Models currently tracked: 207
- Models added: 0
- Models removed: 0
- Total field changes: 207

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     207 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 54 models, 0 added, 9 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 54
- Models added: 0
- Models removed: 9
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (9)</summary>

- `devstral-medium-2507`
- `devstral-small-2507`
- `mistral-large-2411`
- `mistral-large-pixtral-2411`
- `mistral-ocr-2505`
- `pixtral-large-2411`
- `pixtral-large-latest`
- `voxtral-mini-2507`
- `voxtral-mini-transcribe-2507`

</details>

</details>

<details>
<summary><strong>modelscope</strong> — 64 models, 0 added, 3 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 64
- Models added: 0
- Models removed: 3
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (3)</summary>

- `Qwen/QwQ-32B`
- `Qwen/QwQ-32B-Preview`
- `Qwen/Qwen3-Coder-480B-A35B-Instruct`

</details>

</details>

<details>
<summary><strong>moark</strong> — 249 models, 0 added, 0 removed, 141 field changes</summary>

#### Summary

- Models currently tracked: 249
- Models added: 0
- Models removed: 0
- Total field changes: 141

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      76 |
| `pricing.output` |    0 |      0 |      65 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 614 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 614
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>novita</strong> — 132 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 132
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 344 models, 1 added, 10 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 344
- Models added: 1
- Models removed: 10
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       1 |
| `features.tool_call`         |    0 |      0 |       1 |
| `pricing.input`              |    0 |      0 |       1 |
| `pricing.output`             |    0 |      0 |       1 |
| `pricing.cache_read`         |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `upstage/solar-pro-3`

</details>

<details>
<summary>Removed models (10)</summary>

- `alfredpros/codellama-7b-instruct-solidity`
- `baidu/ernie-4.5-21b-a3b`
- `deepseek/deepseek-v4-flash:free`
- `minimax/minimax-m2.5:free`
- `mistralai/devstral-medium`
- `mistralai/devstral-small`
- `mistralai/mistral-large-2411`
- `mistralai/pixtral-large-2411`
- `xiaomi/mimo-v2-omni`
- `xiaomi/mimo-v2-pro`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 510 models, 7 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 510
- Models added: 7
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (7)</summary>

- `bedrock/minimax-m2.5@eu-central-1`
- `bedrock/minimax-m2.5@eu-north-1`
- `bedrock/minimax-m2.5@eu-south-1`
- `bedrock/minimax-m2.5@eu-west-1`
- `bedrock/minimax-m2.5@us-east-1`
- `bedrock/minimax-m2.5@us-east-2`
- `bedrock/minimax-m2.5@us-west-2`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 260 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 84 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 279 models, 2 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 279
- Models added: 2
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `name`               |    0 |      0 |       1 |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      1 |       0 |
| `limit.output`       |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (2)</summary>

- `minimax/minimax-m3`
- `stepfun/step-3.5-flash`

</details>

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 127 models, 0 added, 2 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 127
- Models added: 0
- Models removed: 2
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `features.attachment` |    0 |      0 |       1 |
| `modalities.input`    |    0 |      0 |       1 |

</details>

<details>
<summary>Removed models (2)</summary>

- `xiaomi/mimo-v2-omni`
- `xiaomi/mimo-v2-pro`

</details>

</details>

</details>

## Run at 1780188368

### Summary

- **Total models currently tracked: 7327** across 49 providers
- Providers with changes this run: 47
- Total models added: 4
- Total models removed: 7
- Total field changes: 562

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       1 |
| `release_date`               |    0 |      0 |     221 |
| `features.structured_output` |    0 |      1 |       7 |
| `features.tool_call`         |    0 |      1 |       8 |
| `pricing.input`              |    0 |      0 |     159 |
| `pricing.output`             |    0 |      0 |     140 |
| `pricing.cache_read`         |    0 |      4 |       8 |
| `limit.context`              |    0 |      0 |       2 |
| `limit.output`               |    4 |      4 |       0 |
| `modalities.input`           |    1 |      0 |       0 |
| `modalities.output`          |    1 |      0 |       0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 647 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 647
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `stepfun-step-3-7-flash`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 782 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 782
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 107 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 107
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 143 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 143
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 33 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 33
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 121 models, 0 added, 0 removed, 15 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 0
- Models removed: 0
- Total field changes: 15

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      1 |       7 |
| `features.tool_call`         |    0 |      1 |       6 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 28 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 28

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      10 |
| `pricing.output`     |    0 |      0 |      10 |
| `pricing.cache_read` |    0 |      0 |       8 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 150 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 150
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 346 models, 1 added, 3 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 346
- Models added: 1
- Models removed: 3
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `features.tool_call` |    0 |      0 |       1 |
| `pricing.input`      |    0 |      0 |       3 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      2 |       0 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    2 |      2 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `stepfun/step-3.7-flash:free`

</details>

<details>
<summary>Removed models (3)</summary>

- `baidu/ernie-4.5-21b-a3b-thinking`
- `mistralai/mistral-7b-instruct-v0.1`
- `upstage/solar-pro-3`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 207 models, 0 added, 0 removed, 207 field changes</summary>

#### Summary

- Models currently tracked: 207
- Models added: 0
- Models removed: 0
- Total field changes: 207

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     207 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 67 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 67
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 249 models, 0 added, 0 removed, 141 field changes</summary>

#### Summary

- Models currently tracked: 249
- Models added: 0
- Models removed: 0
- Total field changes: 141

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      76 |
| `pricing.output` |    0 |      0 |      65 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 614 models, 0 added, 1 removed, 10 field changes</summary>

#### Summary

- Models currently tracked: 614
- Models added: 0
- Models removed: 1
- Total field changes: 10

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       5 |
| `pricing.output` |    0 |      0 |       5 |

</details>

<details>
<summary>Removed models (1)</summary>

- `stepfun/step-3.7-flash`

</details>

</details>

<details>
<summary><strong>novita</strong> — 132 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 132
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 118 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field               | Lost | Gained | Changed |
| ------------------- | ---: | -----: | ------: |
| `name`              |    0 |      0 |       1 |
| `modalities.input`  |    1 |      0 |       0 |
| `modalities.output` |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 26 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic/claude-opus-4-8`

</details>

</details>

<details>
<summary><strong>poe</strong> — 378 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 353 models, 0 added, 3 removed, 13 field changes</summary>

#### Summary

- Models currently tracked: 353
- Models added: 0
- Models removed: 3
- Total field changes: 13

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `features.tool_call` |    0 |      0 |       1 |
| `pricing.input`      |    0 |      0 |       4 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      2 |       0 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    2 |      2 |       0 |

</details>

<details>
<summary>Removed models (3)</summary>

- `baidu/ernie-4.5-21b-a3b-thinking`
- `mistralai/mistral-7b-instruct-v0.1`
- `upstage/solar-pro-3`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 503 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 503
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 84 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 277 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 277
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `stepfun/step-3.7-flash`

</details>

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 129 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1780101831

### Summary

- **Total models currently tracked: 7330** across 49 providers
- Providers with changes this run: 47
- Total models added: 21
- Total models removed: 13
- Total field changes: 894

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |      74 |
| `knowledge_cutoff`           |    5 |      0 |       0 |
| `release_date`               |    1 |      0 |     280 |
| `last_updated`               |    0 |      0 |       1 |
| `features.attachment`        |   19 |      0 |       0 |
| `features.reasoning`         |    2 |      0 |       0 |
| `features.structured_output` |    5 |      0 |       6 |
| `features.tool_call`         |   31 |      0 |       6 |
| `pricing.input`              |    1 |      0 |     169 |
| `pricing.output`             |    1 |      0 |     153 |
| `pricing.cache_read`         |    1 |      2 |      18 |
| `pricing.cache_write`        |    0 |      1 |       0 |
| `limit.context`              |   16 |      0 |       7 |
| `limit.output`               |    0 |      0 |       7 |
| `modalities.input`           |   50 |      0 |       0 |
| `modalities.output`          |   38 |      0 |       0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 646 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 646
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `last_updated` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 782 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 782
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 8 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `MiniMaxAI/MiniMax-M2.5`
- `deepseek-ai/DeepSeek-V3.1`

</details>

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 107 models, 1 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 107
- Models added: 1
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `claude-opus4-8`

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 143 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 143
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic/claude-opus-4-8`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `openai/gpt-4o-realtime-preview-2025-06-03`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 33 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 33
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `text-embedding-3-small`
- `text-embedding-3-small-inference`
- `text-embedding-ada-002`

</details>

</details>

<details>
<summary><strong>google</strong> — 55 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 121 models, 1 added, 0 removed, 17 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 1
- Models removed: 0
- Total field changes: 17

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       6 |
| `features.tool_call`         |    0 |      0 |       6 |
| `pricing.input`              |    1 |      0 |       1 |
| `pricing.output`             |    1 |      0 |       1 |
| `limit.context`              |    1 |      0 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `deepseek-ai/DeepSeek-Prover-V2-671B`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 40 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 40

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      15 |
| `pricing.output`     |    0 |      0 |      13 |
| `pricing.cache_read` |    0 |      0 |      12 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 150 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 150
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-opus-4-8`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 348 models, 2 added, 3 removed, 36 field changes</summary>

#### Summary

- Models currently tracked: 348
- Models added: 2
- Models removed: 3
- Total field changes: 36

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `name`               |    0 |      0 |      21 |
| `pricing.input`      |    0 |      0 |       3 |
| `pricing.output`     |    0 |      0 |       3 |
| `pricing.cache_read` |    0 |      1 |       2 |
| `limit.context`      |    0 |      0 |       3 |
| `limit.output`       |    0 |      0 |       3 |

</details>

<details>
<summary>Added models (2)</summary>

- `stealth/claude-opus-4.8`
- `stealth/qwen3.6-plus`

</details>

<details>
<summary>Removed models (3)</summary>

- `deepseek/deepseek-v3.2-speciale`
- `moonshotai/kimi-k2.6:free`
- `openai/gpt-4o-audio-preview`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 207 models, 0 added, 0 removed, 207 field changes</summary>

#### Summary

- Models currently tracked: 207
- Models added: 0
- Models removed: 0
- Total field changes: 207

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     207 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 67 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 67
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `stepfun-ai/Step-3.7-Flash`

</details>

</details>

<details>
<summary><strong>moark</strong> — 249 models, 0 added, 0 removed, 141 field changes</summary>

#### Summary

- Models currently tracked: 249
- Models added: 0
- Models removed: 0
- Total field changes: 141

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      76 |
| `pricing.output` |    0 |      0 |      65 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 615 models, 3 added, 1 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 615
- Models added: 3
- Models removed: 1
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       4 |
| `pricing.output` |    0 |      0 |       4 |

</details>

<details>
<summary>Added models (3)</summary>

- `Unbabel/M-Prometheus-14B`
- `stepfun/step-3.7-flash`
- `stepfun/step-3.7-flash:thinking`

</details>

<details>
<summary>Removed models (1)</summary>

- `stepfun-ai/step-3.6`

</details>

</details>

<details>
<summary><strong>novita</strong> — 132 models, 1 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 132
- Models added: 1
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `xiaomimimo/mimo-v2.5`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 118 models, 0 added, 0 removed, 215 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 215

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |      50 |
| `knowledge_cutoff`           |    5 |      0 |       0 |
| `features.attachment`        |   19 |      0 |       0 |
| `features.reasoning`         |    2 |      0 |       0 |
| `features.structured_output` |    5 |      0 |       0 |
| `features.tool_call`         |   31 |      0 |       0 |
| `limit.context`              |   15 |      0 |       0 |
| `modalities.input`           |   50 |      0 |       0 |
| `modalities.output`          |   38 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 1 added, 1 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 1
- Models removed: 1
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.cache_read`  |    0 |      1 |       0 |
| `pricing.cache_write` |    0 |      1 |       0 |

</details>

<details>
<summary>Added models (1)</summary>

- `magistral-medium-el`

</details>

<details>
<summary>Removed models (1)</summary>

- `magistral-medium-2509-thinking`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 356 models, 0 added, 2 removed, 15 field changes</summary>

#### Summary

- Models currently tracked: 356
- Models added: 0
- Models removed: 2
- Total field changes: 15

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       3 |
| `pricing.output`     |    0 |      0 |       3 |
| `pricing.cache_read` |    0 |      0 |       3 |
| `limit.context`      |    0 |      0 |       3 |
| `limit.output`       |    0 |      0 |       3 |

</details>

<details>
<summary>Removed models (2)</summary>

- `deepseek/deepseek-v3.2-speciale`
- `openai/gpt-4o-audio-preview`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 503 models, 5 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 503
- Models added: 5
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (5)</summary>

- `bedrock/claude-opus-4-8`
- `bedrock/claude-opus-4-8@eu-central-1`
- `bedrock/claude-opus-4-8@eu-north-1`
- `bedrock/claude-opus-4-8@eu-west-1`
- `bedrock/claude-opus-4-8@eu-west-3`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `hf:deepseek-ai/DeepSeek-V3.2`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 0 added, 0 removed, 59 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 0
- Models removed: 0
- Total field changes: 59

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |      59 |

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 260 models, 0 added, 0 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `name`           |    0 |      0 |       2 |
| `release_date`   |    1 |      0 |       0 |
| `pricing.input`  |    0 |      0 |       3 |
| `pricing.output` |    0 |      0 |       3 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 84 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 276 models, 0 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 276
- Models added: 0
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `name`               |    0 |      0 |       1 |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    1 |      0 |       0 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 129 models, 1 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 1
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `stepfun/step-3.7-flash`

</details>

<details>
<summary>Removed models (2)</summary>

- `sapiens-ai/agnes-1.5-flash`
- `sapiens-ai/agnes-1.5-pro`

</details>

</details>

</details>

## Run at 1780015622

### Summary

- **Total models currently tracked: 7322** across 49 providers
- Providers with changes this run: 48
- Total models added: 43
- Total models removed: 6
- Total field changes: 616

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |      41 |
| `release_date`               |    1 |      2 |     280 |
| `last_updated`               |    0 |      0 |       1 |
| `open_weights`               |   24 |      0 |       0 |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |    0 |      0 |       7 |
| `pricing.input`              |   34 |      1 |      84 |
| `pricing.output`             |   29 |      1 |      80 |
| `pricing.cache_read`         |    0 |      3 |      14 |
| `limit.context`              |    0 |      1 |       1 |
| `limit.output`               |    2 |      0 |       0 |
| `modalities.input`           |    0 |      0 |       1 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 646 models, 1 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 646
- Models added: 1
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic-claude-opus-4-8`

</details>

<details>
<summary>Removed models (2)</summary>

- `anthropic-claude-opus-4-6`
- `anthropic-claude-opus-4-6-thinking`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 782 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 782
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `claude-opus-4-8`
- `qwen3.7-plus-preview`
- `qwen3.7-plus-preview-free`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 10 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-opus-4-8`

</details>

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.cache_read` |    0 |      2 |       0 |

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 142 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 142
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `Qwen/Qwen3.7-Max`
- `google/gemini-3.5-flash`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 170 models, 5 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 170
- Models added: 5
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (5)</summary>

- `anthropic/claude-opus-4.8`
- `google/gemini-3.5-flash`
- `google/imagen-4.0`
- `google/imagen-4.0-fast`
- `google/imagen-4.0-ultra`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 30 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 30
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `claude-opus-4.8`

</details>

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 55 models, 2 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 55
- Models added: 2
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    2 |      0 |       0 |
| `pricing.output` |    2 |      0 |       0 |

</details>

<details>
<summary>Added models (2)</summary>

- `gemini-3-pro-image`
- `gemini-3.1-flash-image`

</details>

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 120 models, 0 added, 1 removed, 21 field changes</summary>

#### Summary

- Models currently tracked: 120
- Models added: 0
- Models removed: 1
- Total field changes: 21

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |    0 |      0 |       7 |
| `pricing.input`              |    0 |      1 |       1 |
| `pricing.output`             |    0 |      1 |       1 |
| `limit.context`              |    0 |      1 |       0 |

</details>

<details>
<summary>Removed models (1)</summary>

- `deepseek-ai/DeepSeek-Prover-V2-671B`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 37 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 37

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      14 |
| `pricing.output`     |    0 |      0 |      12 |
| `pricing.cache_read` |    0 |      0 |      11 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 149 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 149
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 349 models, 5 added, 1 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 349
- Models added: 5
- Models removed: 1
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       1 |
| `limit.output`       |    1 |      0 |       0 |

</details>

<details>
<summary>Added models (5)</summary>

- `anthropic/claude-opus-4.8`
- `anthropic/claude-opus-4.8-fast`
- `deepseek/deepseek-v4-flash:discounted`
- `deepseek/deepseek-v4-pro:discounted`
- `stepfun/step-3.7-flash`

</details>

<details>
<summary>Removed models (1)</summary>

- `baidu/qianfan-ocr-fast`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 207 models, 1 added, 0 removed, 206 field changes</summary>

#### Summary

- Models currently tracked: 207
- Models added: 1
- Models removed: 0
- Total field changes: 206

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     206 |

</details>

<details>
<summary>Added models (1)</summary>

- `claude-opus-4-8`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 120 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 120

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `name`           |    0 |      0 |      37 |
| `open_weights`   |   24 |      0 |       0 |
| `pricing.input`  |   32 |      0 |       0 |
| `pricing.output` |   27 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 249 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 249
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `last_updated` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 613 models, 2 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 613
- Models added: 2
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       4 |
| `pricing.output` |    0 |      0 |       4 |

</details>

<details>
<summary>Added models (2)</summary>

- `anthropic/claude-opus-4.8`
- `anthropic/claude-opus-4.8:thinking`

</details>

</details>

<details>
<summary><strong>novita</strong> — 131 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 131
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.output` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 118 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `stepfun-ai/step-3.7-flash`

</details>

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field              | Lost | Gained | Changed |
| ------------------ | ---: | -----: | ------: |
| `modalities.input` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `claude-opus-4.8`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 358 models, 3 added, 1 removed, 7 field changes</summary>

#### Summary

- Models currently tracked: 358
- Models added: 3
- Models removed: 1
- Total field changes: 7

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       2 |
| `pricing.cache_read` |    0 |      1 |       1 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    1 |      0 |       0 |

</details>

<details>
<summary>Added models (3)</summary>

- `anthropic/claude-opus-4.8`
- `anthropic/claude-opus-4.8-fast`
- `stepfun/step-3.7-flash`

</details>

<details>
<summary>Removed models (1)</summary>

- `baidu/qianfan-ocr-fast`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 498 models, 5 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 498
- Models added: 5
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (5)</summary>

- `anthropic/claude-opus-4-8`
- `azure/gpt-5.4-mini@eastus2`
- `vertex/claude-opus-4-8`
- `vertex/claude-opus-4-8@eu`
- `vertex/claude-opus-4-8@us`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 15 models, 1 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 15
- Models added: 1
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `release_date`       |    0 |      0 |       1 |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `hf:Qwen/Qwen3.6-27B`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 195 models, 1 added, 0 removed, 59 field changes</summary>

#### Summary

- Models currently tracked: 195
- Models added: 1
- Models removed: 0
- Total field changes: 59

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |      59 |

</details>

<details>
<summary>Added models (1)</summary>

- `claude-opus-4-8`

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 260 models, 4 added, 0 removed, 7 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 4
- Models removed: 0
- Total field changes: 7

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `name`         |    0 |      0 |       4 |
| `release_date` |    1 |      2 |       0 |

</details>

<details>
<summary>Added models (4)</summary>

- `MiniMaxAI/MiniMax-M2.5-FP4`
- `deepseek-ai/DeepSeek-R1-0528`
- `deepseek-ai/DeepSeek-V3.1`
- `moonshotai/Kimi-K2.5-fp4`

</details>

</details>

<details>
<summary><strong>venice</strong> — 84 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `claude-opus-4-8`
- `claude-opus-4-8-fast`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 276 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 276
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic/claude-opus-4.8`

</details>

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 130 models, 1 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 130
- Models added: 1
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `anthropic/claude-opus-4.8`

</details>

<details>
<summary>Removed models (1)</summary>

- `google/gemini-3.5-flash-free`

</details>

</details>

</details>

## Run at 1779928843

### Summary

- **Total models currently tracked: 7285** across 49 providers
- Providers with changes this run: 48
- Total models added: 52
- Total models removed: 16
- Total field changes: 753

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       1 |
| `release_date`               |    0 |      1 |     220 |
| `features.structured_output` |    0 |      0 |       5 |
| `features.tool_call`         |    0 |      0 |       5 |
| `pricing.input`              |    2 |      0 |     168 |
| `pricing.output`             |    2 |      0 |     155 |
| `pricing.cache_read`         |    4 |      0 |      31 |
| `pricing.cache_write`        |  137 |      0 |       0 |
| `limit.context`              |    1 |      0 |       7 |
| `limit.input`                |    0 |      0 |       1 |
| `limit.output`               |    0 |      0 |      11 |
| `modalities.input`           |    0 |      0 |       2 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 647 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 647
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 779 models, 0 added, 0 removed, 10 field changes</summary>

#### Summary

- Models currently tracked: 779
- Models added: 0
- Models removed: 0
- Total field changes: 10

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       4 |
| `pricing.cache_read` |    0 |      0 |       4 |

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 2 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `llama3.1-8b`
- `qwen-3-235b-a22b-instruct-2507`

</details>

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 165 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 165
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `google/imagen-4.0-generate-001`
- `moonshotai/kimi-k2-thinking`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 29 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field           | Lost | Gained | Changed |
| --------------- | ---: | -----: | ------: |
| `limit.context` |    0 |      0 |       1 |
| `limit.input`   |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 53 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 53
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    1 |      0 |       0 |
| `pricing.output`     |    1 |      0 |       0 |
| `pricing.cache_read` |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 121 models, 8 added, 1 removed, 13 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 8
- Models removed: 1
- Total field changes: 13

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       5 |
| `features.tool_call`         |    0 |      0 |       5 |
| `pricing.input`              |    1 |      0 |       0 |
| `pricing.output`             |    1 |      0 |       0 |
| `limit.context`              |    1 |      0 |       0 |

</details>

<details>
<summary>Added models (8)</summary>

- `MiniMaxAI/MiniMax-M1-80k`
- `MiniMaxAI/MiniMax-M2.7`
- `baidu/ERNIE-4.5-300B-A47B-Base-PT`
- `google/gemma-4-26B-A4B-it`
- `google/gemma-4-31B-it`
- `inclusionAI/Ling-2.6-1T`
- `zai-org/GLM-4.7-FP8`
- `zai-org/GLM-5`

</details>

<details>
<summary>Removed models (1)</summary>

- `dicta-il/DictaLM-3.0-24B-Thinking`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 1 removed, 45 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 1
- Total field changes: 45

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      16 |
| `pricing.output`     |    0 |      0 |      15 |
| `pricing.cache_read` |    0 |      0 |      14 |

</details>

<details>
<summary>Removed models (1)</summary>

- `baidu/cobuddy`

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 149 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 149
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 345 models, 1 added, 1 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 345
- Models added: 1
- Models removed: 1
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.cache_read` |    1 |      0 |       3 |
| `limit.context`      |    0 |      0 |       2 |
| `limit.output`       |    0 |      0 |       5 |

</details>

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.6:free`

</details>

<details>
<summary>Removed models (1)</summary>

- `baidu/cobuddy:free`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 206 models, 0 added, 0 removed, 213 field changes</summary>

#### Summary

- Models currently tracked: 206
- Models added: 0
- Models removed: 0
- Total field changes: 213

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `release_date`       |    0 |      0 |     206 |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       2 |
| `pricing.cache_read` |    0 |      0 |       3 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field  | Lost | Gained | Changed |
| ------ | ---: | -----: | ------: |
| `name` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 249 models, 2 added, 0 removed, 139 field changes</summary>

#### Summary

- Models currently tracked: 249
- Models added: 2
- Models removed: 0
- Total field changes: 139

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      74 |
| `pricing.output` |    0 |      0 |      65 |

</details>

<details>
<summary>Added models (2)</summary>

- `HY-MT2-7B`
- `Hy-MT2-30B-A3B`

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 611 models, 0 added, 0 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 611
- Models added: 0
- Models removed: 0
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       6 |
| `pricing.output` |    0 |      0 |       6 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 131 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 131
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 117 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 117
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 377 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 377
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `llama-3.1-8b-cs`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 356 models, 1 added, 1 removed, 18 field changes</summary>

#### Summary

- Models currently tracked: 356
- Models added: 1
- Models removed: 1
- Total field changes: 18

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    2 |      0 |       3 |
| `limit.context`      |    0 |      0 |       4 |
| `limit.output`       |    0 |      0 |       6 |

</details>

<details>
<summary>Added models (1)</summary>

- `moonshotai/kimi-k2.6:free`

</details>

<details>
<summary>Removed models (1)</summary>

- `baidu/cobuddy:free`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 493 models, 40 added, 4 removed, 137 field changes</summary>

#### Summary

- Models currently tracked: 493
- Models added: 40
- Models removed: 4
- Total field changes: 137

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.cache_write` |  137 |      0 |       0 |

</details>

<details>
<summary>Added models (40)</summary>

- `alibaba/qwen2.5-vl-32b-instruct`
- `alibaba/qwen2.5-vl-72b-instruct`
- `alibaba/qwen3.6-plus`
- `deepinfra/ByteDance/Seed-1.8`
- `deepinfra/ByteDance/Seed-2.0-code`
- `deepinfra/ByteDance/Seed-2.0-mini`
- `deepinfra/ByteDance/Seed-2.0-pro`
- `deepinfra/MiniMaxAI/MiniMax-M2.5`
- `deepinfra/Qwen/Qwen3-235B-A22B-Instruct-2507`
- `deepinfra/Qwen/Qwen3-235B-A22B-Thinking-2507`
- `deepinfra/Qwen/Qwen3-Coder-480B-A35B-Instruct-Turbo`
- `deepinfra/Qwen/Qwen3-Max`
- `deepinfra/Qwen/Qwen3.5-27B`
- `deepinfra/Qwen/Qwen3.5-2B`
- `deepinfra/Qwen/Qwen3.5-35B-A3B`
- `deepinfra/Qwen/Qwen3.5-397B-A17B`
- `deepinfra/XiaomiMiMo/MiMo-V2.5`
- `deepinfra/XiaomiMiMo/MiMo-V2.5-Pro`
- `deepinfra/deepseek-ai/DeepSeek-V4-Flash`
- `deepinfra/deepseek-ai/DeepSeek-V4-Pro`
- `deepinfra/google/gemma-4-31B-it`
- `deepinfra/moonshotai/Kimi-K2.6`
- `deepinfra/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B`
- `deepinfra/nvidia/Nemotron-3-Nano-30B-A3B`
- `deepinfra/zai-org/GLM-5.1`
- `fireworks/deepseek-v4-flash`
- `fireworks/gpt-oss-120b`
- `fireworks/gpt-oss-20b`
- `novita/baichuan/baichuan-m2-32b`
- `novita/baidu/ernie-4.5-300b-a47b-paddle`
- `novita/deepseek/deepseek-v4-flash`
- `novita/inclusionai/ling-2.6-1t`
- `novita/inclusionai/ling-2.6-flash`
- `novita/inclusionai/ring-2.6-1t`
- `novita/kwaipilot/kat-coder-pro`
- `novita/minimax/minimax-m2.7-highspeed`
- `novita/xiaomimimo/mimo-v2-flash`
- `novita/xiaomimimo/mimo-v2-pro`
- `novita/zai-org/glm-5.1`
- `xai/grok-build-0.1`

</details>

<details>
<summary>Removed models (4)</summary>

- `together/Kimi K2.5`
- `together/Qwen/Qwen2.5-7B-Instruct-Turbo`
- `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`
- `together/meta-llama/Meta-Llama-3-8B-Instruct-Lite`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 14 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `hf:zai-org/GLM-5`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 194 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 194
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 256 models, 0 added, 1 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 256
- Models added: 0
- Models removed: 1
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      1 |       0 |

</details>

<details>
<summary>Removed models (1)</summary>

- `black-forest-labs/FLUX.1-krea-dev`

</details>

</details>

<details>
<summary><strong>venice</strong> — 82 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 82
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 275 models, 0 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 275
- Models added: 0
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       2 |
| `pricing.cache_read` |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 130 models, 0 added, 1 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 130
- Models added: 0
- Models removed: 1
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       2 |
| `pricing.cache_read` |    0 |      0 |       2 |
| `modalities.input`   |    0 |      0 |       2 |

</details>

<details>
<summary>Removed models (1)</summary>

- `x-ai/grok-build-0.1`

</details>

</details>

</details>

## Run at 1779842675

### Summary

- **Total models currently tracked: 7249** across 49 providers
- Providers with changes this run: 48
- Total models added: 13
- Total models removed: 25
- Total field changes: 534

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `release_date`               |    0 |      0 |     220 |
| `last_updated`               |    0 |      0 |       2 |
| `features.attachment`        |    0 |      0 |       5 |
| `features.structured_output` |    0 |      0 |       7 |
| `features.tool_call`         |    0 |      0 |       4 |
| `pricing.input`              |    0 |      2 |     113 |
| `pricing.output`             |    0 |      2 |     105 |
| `pricing.cache_read`         |    2 |     11 |      29 |
| `pricing.cache_write`        |    6 |      3 |       1 |
| `limit.context`              |    0 |      1 |       7 |
| `limit.output`               |    0 |      0 |       9 |
| `modalities.input`           |    0 |      0 |       5 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 647 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 647
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `last_updated` |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 779 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 779
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 167 models, 0 added, 2 removed, 7 field changes</summary>

#### Summary

- Models currently tracked: 167
- Models added: 0
- Models removed: 2
- Total field changes: 7

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       3 |
| `pricing.output`     |    0 |      0 |       2 |
| `pricing.cache_read` |    0 |      2 |       0 |

</details>

<details>
<summary>Removed models (2)</summary>

- `google/gemini-3.1-flash-lite-preview`
- `openai/gpt-4o-realtime-preview-2024-12-17`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 29 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 53 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 53
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 114 models, 3 added, 14 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 114
- Models added: 3
- Models removed: 14
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       7 |
| `features.tool_call`         |    0 |      0 |       4 |
| `pricing.input`              |    0 |      1 |       0 |
| `pricing.output`             |    0 |      1 |       0 |
| `limit.context`              |    0 |      1 |       0 |

</details>

<details>
<summary>Added models (3)</summary>

- `CohereLabs/command-a-vision-07-2025`
- `Qwen/Qwen3-4B-Thinking-2507`
- `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`

</details>

<details>
<summary>Removed models (14)</summary>

- `CohereLabs/c4ai-command-r7b-12-2024`
- `CohereLabs/tiny-aya-fire`
- `MiniMaxAI/MiniMax-M1-80k`
- `MiniMaxAI/MiniMax-M2.7`
- `Qwen/Qwen3-30B-A3B`
- `XiaomiMiMo/MiMo-V2-Flash`
- `baidu/ERNIE-4.5-300B-A47B-Base-PT`
- `deepseek-ai/DeepSeek-R1-Distill-Qwen-14B`
- `google/gemma-4-26B-A4B-it`
- `google/gemma-4-31B-it`
- `inclusionAI/Ling-2.6-1T`
- `meta-llama/Llama-4-Scout-17B-16E-Instruct`
- `zai-org/GLM-4.7-FP8`
- `zai-org/GLM-5`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 29 models, 0 added, 0 removed, 56 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 56

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `features.attachment` |    0 |      0 |       5 |
| `pricing.input`       |    0 |      1 |      15 |
| `pricing.output`      |    0 |      1 |      15 |
| `pricing.cache_read`  |    0 |      1 |      13 |
| `modalities.input`    |    0 |      0 |       5 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 149 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 149
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 345 models, 2 added, 2 removed, 64 field changes</summary>

#### Summary

- Models currently tracked: 345
- Models added: 2
- Models removed: 2
- Total field changes: 64

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.input`       |    0 |      0 |      18 |
| `pricing.output`      |    0 |      0 |      16 |
| `pricing.cache_read`  |    1 |      5 |      12 |
| `pricing.cache_write` |    3 |      2 |       0 |
| `limit.context`       |    0 |      0 |       3 |
| `limit.output`        |    0 |      0 |       4 |

</details>

<details>
<summary>Added models (2)</summary>

- `stealth/claude-opus-4.6`
- `stealth/claude-sonnet-4.6`

</details>

<details>
<summary>Removed models (2)</summary>

- `deepseek/deepseek-v4-flash:free`
- `x-ai/grok-code-fast-1:optimized:free`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 206 models, 0 added, 0 removed, 206 field changes</summary>

#### Summary

- Models currently tracked: 206
- Models added: 0
- Models removed: 0
- Total field changes: 206

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     206 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 247 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 247
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nano-gpt</strong> — 611 models, 2 added, 4 removed, 18 field changes</summary>

#### Summary

- Models currently tracked: 611
- Models added: 2
- Models removed: 4
- Total field changes: 18

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      10 |
| `pricing.output` |    0 |      0 |       8 |

</details>

<details>
<summary>Added models (2)</summary>

- `TEE/gemma-4-31b-it`
- `TEE/qwen3.5-122b-a10b`

</details>

<details>
<summary>Removed models (4)</summary>

- `TEE/glm-4.6`
- `TEE/kimi-k2-thinking`
- `TEE/minimax-m2.1`
- `TEE/qwen3-coder-next`

</details>

</details>

<details>
<summary><strong>novita</strong> — 131 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 131
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 117 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 117
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 378 models, 0 added, 2 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 378
- Models added: 0
- Models removed: 2
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (2)</summary>

- `gemini-2.0-flash`
- `gemini-2.0-flash-lite`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 356 models, 0 added, 1 removed, 28 field changes</summary>

#### Summary

- Models currently tracked: 356
- Models added: 0
- Models removed: 1
- Total field changes: 28

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.input`       |    0 |      0 |       4 |
| `pricing.output`      |    0 |      0 |       5 |
| `pricing.cache_read`  |    1 |      3 |       2 |
| `pricing.cache_write` |    3 |      1 |       1 |
| `limit.context`       |    0 |      0 |       3 |
| `limit.output`        |    0 |      0 |       5 |

</details>

<details>
<summary>Removed models (1)</summary>

- `arcee-ai/trinity-large-thinking:free`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 457 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 457
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `alibaba/qwen3.7-max`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 15 models, 4 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 15
- Models added: 4
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (4)</summary>

- `syn:large:text`
- `syn:large:vision`
- `syn:small:text`
- `syn:small:vision`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 194 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 194
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 257 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 82 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 82
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 275 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 275
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 131 models, 1 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 131
- Models added: 1
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field           | Lost | Gained | Changed |
| --------------- | ---: | -----: | ------: |
| `limit.context` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `x-ai/grok-build-0.1`

</details>

</details>

</details>

## Run at 1779756198

### Summary

- **Total models currently tracked: 7261** across 49 providers
- Providers with changes this run: 48
- Total models added: 39
- Total models removed: 9
- Total field changes: 562

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `release_date`               |    0 |      1 |     220 |
| `features.structured_output` |    0 |      0 |      14 |
| `features.tool_call`         |    0 |      0 |       9 |
| `pricing.input`              |    0 |      0 |     157 |
| `pricing.output`             |    0 |      0 |     142 |
| `pricing.reasoning`          |    0 |      1 |       0 |
| `pricing.cache_read`         |    1 |      1 |      11 |
| `pricing.cache_write`        |    0 |      0 |       1 |
| `limit.context`              |    0 |      0 |       2 |
| `limit.output`               |    0 |      0 |       2 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 647 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 647
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 86 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 86
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `qwen3.7-max`
- `qwen3.7-max-2026-05-20`

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 779 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 779
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 29 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 53 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 53
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 125 models, 0 added, 3 removed, 21 field changes</summary>

#### Summary

- Models currently tracked: 125
- Models added: 0
- Models removed: 3
- Total field changes: 21

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |      11 |
| `features.tool_call`         |    0 |      0 |       9 |
| `pricing.input`              |    0 |      0 |       1 |

</details>

<details>
<summary>Removed models (3)</summary>

- `CohereLabs/command-a-vision-07-2025`
- `Qwen/Qwen3-4B-Thinking-2507`
- `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 29 models, 1 added, 0 removed, 42 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 1
- Models removed: 0
- Total field changes: 42

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      16 |
| `pricing.output`     |    0 |      0 |      15 |
| `pricing.cache_read` |    0 |      0 |      11 |

</details>

<details>
<summary>Added models (1)</summary>

- `zai-org/GLM-4.5-Air`

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 149 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 149
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 345 models, 0 added, 1 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 345
- Models added: 0
- Models removed: 1
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `release_date`               |    0 |      0 |       1 |
| `features.structured_output` |    0 |      0 |       2 |
| `pricing.input`              |    0 |      0 |       2 |
| `pricing.output`             |    0 |      0 |       2 |
| `pricing.reasoning`          |    0 |      1 |       0 |
| `pricing.cache_read`         |    0 |      1 |       0 |
| `pricing.cache_write`        |    0 |      0 |       1 |
| `limit.context`              |    0 |      0 |       1 |
| `limit.output`               |    0 |      0 |       1 |

</details>

<details>
<summary>Removed models (1)</summary>

- `alibaba/tongyi-deepresearch-30b-a3b`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 206 models, 1 added, 0 removed, 205 field changes</summary>

#### Summary

- Models currently tracked: 206
- Models added: 1
- Models removed: 0
- Total field changes: 205

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     205 |

</details>

<details>
<summary>Added models (1)</summary>

- `qwen3.7-max`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 247 models, 0 added, 0 removed, 139 field changes</summary>

#### Summary

- Models currently tracked: 247
- Models added: 0
- Models removed: 0
- Total field changes: 139

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      74 |
| `pricing.output` |    0 |      0 |      65 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 613 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 613
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>novita</strong> — 131 models, 27 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 131
- Models added: 27
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field           | Lost | Gained | Changed |
| --------------- | ---: | -----: | ------: |
| `pricing.input` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (27)</summary>

- `ai_infer_test_1`
- `ai_infer_test_2`
- `ai_infer_test_3`
- `bunny`
- `deepseek/deepseek-r1`
- `deepseek/deepseek-r1/community`
- `deepseek/deepseek-v3/community`
- `deepseek/deepseek_v3`
- `dev/glm46`
- `gt-4p`
- `meta-llama/llama-3.2-1b-instruct`
- `minimax/m2-her`
- `minimax/minimax-m2.7-highspeed`
- `nousresearch/nous-hermes-llama2-13b`
- `openchat/openchat-7b`
- `qwen/qwen-2-7b-instruct`
- `qwen/qwen-2-vl-72b-instruct`
- `qwen/qwen3-4b-fp8`
- `qwen/qwen3.5-plus`
- `qwen/qwen3.6-plus`
- `teknium/openhermes-2.5-mistral-7b`
- `thudm/glm-4-32b-0414`
- `xiaomimimo/mimo-v2-pro`
- `zai-org/glm-4.7-h`
- `zai-org/glm-5-turbo`
- `zai-org/glm-5v-turbo`
- `zai-org/glm-ocr`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 117 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 117
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 357 models, 0 added, 1 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 357
- Models added: 0
- Models removed: 1
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       1 |
| `pricing.input`              |    0 |      0 |       1 |
| `pricing.output`             |    0 |      0 |       1 |
| `limit.context`              |    0 |      0 |       1 |
| `limit.output`               |    0 |      0 |       1 |

</details>

<details>
<summary>Removed models (1)</summary>

- `alibaba/tongyi-deepresearch-30b-a3b`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 456 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 456
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `deepinfra/google/gemma-4-26B-A4B-it`
- `novita/google/gemma-4-26b-a4b-it`
- `parasail/google/gemma-4-26B-A4B-it`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 194 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 194
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 257 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      1 |       0 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 82 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 82
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 275 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 275
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 130 models, 5 added, 4 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 130
- Models added: 5
- Models removed: 4
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (5)</summary>

- `openai/gpt-image-1.5`
- `openai/gpt-image-2`
- `openai/text-embedding-3-large`
- `openai/text-embedding-3-small`
- `sapiens-ai/agnes-2.0-flash`

</details>

<details>
<summary>Removed models (4)</summary>

- `moonshotai/kimi-k2-0711`
- `moonshotai/kimi-k2-0905`
- `moonshotai/kimi-k2-thinking`
- `moonshotai/kimi-k2-thinking-turbo`

</details>

</details>

</details>

## Run at 1779669868

### Summary

- **Total models currently tracked: 7231** across 49 providers
- Providers with changes this run: 48
- Total models added: 12
- Total models removed: 8
- Total field changes: 529

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `release_date`               |    0 |      0 |     218 |
| `features.reasoning`         |    0 |      0 |       1 |
| `features.structured_output` |    0 |      0 |       6 |
| `features.tool_call`         |    0 |      0 |       6 |
| `pricing.input`              |    1 |      0 |     149 |
| `pricing.output`             |    1 |      0 |     135 |
| `pricing.cache_read`         |    0 |      0 |      10 |
| `limit.context`              |    1 |      0 |       0 |
| `limit.output`               |    0 |      0 |       1 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 647 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 647
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 84 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 779 models, 1 added, 4 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 779
- Models added: 1
- Models removed: 4
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `gpt-oss-20b`

</details>

<details>
<summary>Removed models (4)</summary>

- `DeepSeek-R1-Distill-Qwen-32B`
- `DeepSeek-R1-Distill-Qwen-7B`
- `GPT-OSS-20B`
- `QwQ-32B`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 29 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 53 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 53
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 128 models, 0 added, 0 removed, 17 field changes</summary>

#### Summary

- Models currently tracked: 128
- Models added: 0
- Models removed: 0
- Total field changes: 17

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       6 |
| `features.tool_call`         |    0 |      0 |       6 |
| `pricing.input`              |    1 |      0 |       1 |
| `pricing.output`             |    1 |      0 |       1 |
| `limit.context`              |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 31 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 31

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      12 |
| `pricing.output`     |    0 |      0 |      10 |
| `pricing.cache_read` |    0 |      0 |       9 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 149 models, 5 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 149
- Models added: 5
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (5)</summary>

- `claude-opus-4-1-20250805`
- `claude-sonnet-4-20250514-dd`
- `grok-4.20-multi-agent-0309`
- `moonshotai/kimi-k2.6`
- `xiaomimimo/mimo-v2-pro`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 346 models, 1 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 346
- Models added: 1
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `stealth/claude-opus-4.7`

</details>

<details>
<summary>Removed models (1)</summary>

- `stepfun/step-3.5-flash:free`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 205 models, 1 added, 3 removed, 204 field changes</summary>

#### Summary

- Models currently tracked: 205
- Models added: 1
- Models removed: 3
- Total field changes: 204

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     204 |

</details>

<details>
<summary>Added models (1)</summary>

- `grok-build-0-1`

</details>

<details>
<summary>Removed models (3)</summary>

- `gemini-2.0-flash`
- `gemini-2.0-flash-lite`
- `gemini-3.1-flash-lite-preview`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 247 models, 0 added, 0 removed, 139 field changes</summary>

#### Summary

- Models currently tracked: 247
- Models added: 0
- Models removed: 0
- Total field changes: 139

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      74 |
| `pricing.output` |    0 |      0 |      65 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 613 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 613
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `features.reasoning` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 104 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 104
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 117 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 117
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 358 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 358
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 453 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 453
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `azure/gpt-4o-mini@eastus2`
- `azure/gpt-4o-mini@swedencentral`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 194 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 194
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 257 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 82 models, 2 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 82
- Models added: 2
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `limit.output` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (2)</summary>

- `e2ee-gemma-4-26b-a4b-uncensored-p`
- `e2ee-qwen3-6-35b-a3b-uncensored-p`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 275 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 275
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 129 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1779583413

### Summary

- **Total models currently tracked: 7227** across 49 providers
- Providers with changes this run: 48
- Total models added: 2
- Total models removed: 2
- Total field changes: 609

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       1 |
| `release_date`               |    0 |      0 |     280 |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |    0 |      0 |       6 |
| `pricing.input`              |    0 |      1 |     152 |
| `pricing.output`             |    0 |      1 |     140 |
| `pricing.cache_read`         |    0 |      0 |      14 |
| `pricing.cache_write`        |    0 |      0 |       4 |
| `limit.context`              |    0 |      1 |       0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 647 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 647
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 84 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 782 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 782
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 29 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 53 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 53
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 128 models, 0 added, 1 removed, 20 field changes</summary>

#### Summary

- Models currently tracked: 128
- Models added: 0
- Models removed: 1
- Total field changes: 20

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |    0 |      0 |       6 |
| `pricing.input`              |    0 |      1 |       1 |
| `pricing.output`             |    0 |      1 |       1 |
| `limit.context`              |    0 |      1 |       0 |

</details>

<details>
<summary>Removed models (1)</summary>

- `meta-llama/Llama-4-Maverick-17B-128E-Instruct`

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 0 added, 0 removed, 25 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 0
- Models removed: 0
- Total field changes: 25

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       9 |
| `pricing.output`     |    0 |      0 |       9 |
| `pricing.cache_read` |    0 |      0 |       7 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 144 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 144
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 346 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 346
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>llmgateway</strong> — 207 models, 0 added, 0 removed, 207 field changes</summary>

#### Summary

- Models currently tracked: 207
- Models added: 0
- Models removed: 0
- Total field changes: 207

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     207 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 247 models, 0 added, 0 removed, 139 field changes</summary>

#### Summary

- Models currently tracked: 247
- Models added: 0
- Models removed: 0
- Total field changes: 139

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      74 |
| `pricing.output` |    0 |      0 |      65 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 613 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 613
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `TEE/gemma-4-26b-a4b-uncensored`
- `TEE/qwen3.6-35b-a3b-uncensored`

</details>

</details>

<details>
<summary><strong>novita</strong> — 104 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 104
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 117 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 117
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 358 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 358
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 451 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 451
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.input`       |    0 |      0 |       1 |
| `pricing.output`      |    0 |      0 |       1 |
| `pricing.cache_read`  |    0 |      0 |       2 |
| `pricing.cache_write` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 11 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `hf:Qwen/Qwen3-235B-A22B-Thinking-2507`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 194 models, 0 added, 0 removed, 59 field changes</summary>

#### Summary

- Models currently tracked: 194
- Models added: 0
- Models removed: 0
- Total field changes: 59

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |      59 |

</details>

</details>

<details>
<summary><strong>togetherai</strong> — 257 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 80 models, 0 added, 0 removed, 16 field changes</summary>

#### Summary

- Models currently tracked: 80
- Models added: 0
- Models removed: 0
- Total field changes: 16

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `pricing.input`       |    0 |      0 |       5 |
| `pricing.output`      |    0 |      0 |       5 |
| `pricing.cache_read`  |    0 |      0 |       4 |
| `pricing.cache_write` |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>vercel</strong> — 275 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 275
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field                 | Lost | Gained | Changed |
| --------------------- | ---: | -----: | ------: |
| `name`                |    0 |      0 |       1 |
| `pricing.input`       |    0 |      0 |       1 |
| `pricing.output`      |    0 |      0 |       1 |
| `pricing.cache_read`  |    0 |      0 |       1 |
| `pricing.cache_write` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 129 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1779496957

### Summary

- **Total models currently tracked: 7227** across 49 providers
- Providers with changes this run: 48
- Total models added: 9
- Total models removed: 6
- Total field changes: 574

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `release_date`               |    0 |      0 |     221 |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |    0 |      0 |       8 |
| `pricing.input`              |    0 |      0 |     157 |
| `pricing.output`             |    0 |      0 |     144 |
| `pricing.cache_read`         |    2 |      1 |      16 |
| `limit.context`              |    0 |      0 |       7 |
| `limit.output`               |    0 |      2 |       7 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 647 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 647
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `qwen3.7-max`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 84 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 782 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 782
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 133 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 133

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |      14 |
| `pricing.input`  |    0 |      0 |      61 |
| `pricing.output` |    0 |      0 |      58 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 106 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 106
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `codellama-13b-instruct-hf`

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       2 |
| `pricing.cache_read` |    0 |      0 |       2 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 260 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 260
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `accounts/fireworks/models/nemotron-3-super-120b-a12b-bf16`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 29 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 53 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 53
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 129 models, 0 added, 0 removed, 17 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 0
- Models removed: 0
- Total field changes: 17

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |    0 |      0 |       8 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 28 models, 1 added, 0 removed, 46 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 1
- Models removed: 0
- Total field changes: 46

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      16 |
| `pricing.output`     |    0 |      0 |      16 |
| `pricing.cache_read` |    0 |      0 |      12 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `Qwen/Qwen3.6-35B-A3B`

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 144 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 144
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 346 models, 0 added, 0 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 346
- Models added: 0
- Models removed: 0
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       1 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    1 |      0 |       1 |
| `limit.context`      |    0 |      0 |       2 |
| `limit.output`       |    0 |      1 |       2 |

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 207 models, 0 added, 0 removed, 207 field changes</summary>

#### Summary

- Models currently tracked: 207
- Models added: 0
- Models removed: 0
- Total field changes: 207

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     207 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 247 models, 1 added, 0 removed, 137 field changes</summary>

#### Summary

- Models currently tracked: 247
- Models added: 1
- Models removed: 0
- Total field changes: 137

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      73 |
| `pricing.output` |    0 |      0 |      64 |

</details>

<details>
<summary>Added models (1)</summary>

- `Qwen3.7-Max`

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 611 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 611
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `command-a-plus-05-2026`

</details>

</details>

<details>
<summary><strong>novita</strong> — 104 models, 0 added, 0 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 104
- Models added: 0
- Models removed: 0
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 117 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 117
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `qwen3.7-max-t`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 358 models, 0 added, 0 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 358
- Models added: 0
- Models removed: 0
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       2 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    1 |      0 |       1 |
| `limit.context`      |    0 |      0 |       3 |
| `limit.output`       |    0 |      1 |       3 |

</details>

</details>

<details>
<summary><strong>requesty</strong> — 451 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 451
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 12 models, 0 added, 5 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 12
- Models added: 0
- Models removed: 5
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (5)</summary>

- `hf:deepseek-ai/DeepSeek-R1-0528`
- `hf:deepseek-ai/DeepSeek-V3`
- `hf:meta-llama/Llama-3.3-70B-Instruct`
- `hf:moonshotai/Kimi-K2.5`
- `hf:nvidia/Kimi-K2.5-NVFP4`

</details>

</details>

<details>
<summary><strong>tetrate</strong> — 194 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 194
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 257 models, 0 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 0
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.cache_read` |    0 |      1 |       0 |

</details>

</details>

<details>
<summary><strong>venice</strong> — 80 models, 2 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 80
- Models added: 2
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `gemini-3-5-flash`
- `qwen-3-7-max`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 275 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 275
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 129 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `qwen/qwen3.7-max`

</details>

</details>

</details>

## Run at 1779410611

### Summary

- **Total models currently tracked: 7224** across 49 providers
- Providers with changes this run: 48
- Total models added: 1
- Total models removed: 4
- Total field changes: 418

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `release_date`               |    0 |      0 |     221 |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |    0 |      0 |       6 |
| `pricing.input`              |    1 |      0 |      89 |
| `pricing.output`             |    1 |      0 |      80 |
| `pricing.cache_read`         |    0 |      0 |       9 |
| `limit.context`              |    1 |      0 |       1 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 646 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 646
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 84 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 782 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 782
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 0 added, 0 removed, 14 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 0
- Models removed: 0
- Total field changes: 14

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |      14 |

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 107 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 107
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 140 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `deepseek-ai/DeepSeek-R1-0528-Turbo`

</details>

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 259 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 259
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 29 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 53 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 53
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 129 models, 0 added, 0 removed, 20 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 0
- Models removed: 0
- Total field changes: 20

<details>
<summary>Changed fields</summary>

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |       9 |
| `features.tool_call`         |    0 |      0 |       6 |
| `pricing.input`              |    1 |      0 |       1 |
| `pricing.output`             |    1 |      0 |       1 |
| `limit.context`              |    1 |      0 |       0 |

</details>

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 33 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 33

<details>
<summary>Changed fields</summary>

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |      12 |
| `pricing.output`     |    0 |      0 |      12 |
| `pricing.cache_read` |    0 |      0 |       9 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 144 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 144
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 346 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 346
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>llmgateway</strong> — 207 models, 0 added, 0 removed, 208 field changes</summary>

#### Summary

- Models currently tracked: 207
- Models added: 0
- Models removed: 0
- Total field changes: 208

<details>
<summary>Changed fields</summary>

| Field           | Lost | Gained | Changed |
| --------------- | ---: | -----: | ------: |
| `release_date`  |    0 |      0 |     207 |
| `limit.context` |    0 |      0 |       1 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 246 models, 0 added, 0 removed, 137 field changes</summary>

#### Summary

- Models currently tracked: 246
- Models added: 0
- Models removed: 0
- Total field changes: 137

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      73 |
| `pricing.output` |    0 |      0 |      64 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 610 models, 0 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 610
- Models added: 0
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       2 |
| `pricing.output` |    0 |      0 |       2 |

</details>

</details>

<details>
<summary><strong>novita</strong> — 104 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 104
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 117 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 117
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 379 models, 0 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 379
- Models added: 0
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Removed models (1)</summary>

- `kimi-k2.5-tog`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 358 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 358
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 451 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 451
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 17 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 17
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 194 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 194
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 257 models, 1 added, 2 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 257
- Models added: 1
- Models removed: 2
- Total field changes: 2

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       1 |

</details>

<details>
<summary>Added models (1)</summary>

- `Qwen/Qwen3.7-Max`

</details>

<details>
<summary>Removed models (2)</summary>

- `meta-llama/Llama-3.3-70B-Instruct-Turbo-test`
- `moonshotai/Kimi-K2.5`

</details>

</details>

<details>
<summary><strong>venice</strong> — 78 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 78
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 275 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 275
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 128 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 128
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1779395795

### Summary

- **Total models currently tracked: 7227** across 49 providers
- Providers with changes this run: 48
- Total models added: 11
- Total models removed: 0
- Total field changes: 344

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `release_date`   |    0 |      0 |     207 |
| `pricing.input`  |    0 |      0 |      73 |
| `pricing.output` |    0 |      0 |      64 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 646 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 646
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>alibaba-cn</strong> — 84 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aihubmix</strong> — 782 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 782
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 9 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 9
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>baseten</strong> — 10 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 10
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>berget</strong> — 73 models, 11 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 73
- Models added: 11
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (11)</summary>

- `deepseek-r1`
- `glm`
- `glm-4.6`
- `glm-4.7`
- `glm4.6`
- `glm4.7`
- `unsloth/MAI-DS-R1-GGUF`
- `zai-org/GLM-4.7`
- `zai-org/GLM-4.7-FP8`
- `zai/glm-4.6`
- `zai/glm-4.7`

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>chutes</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cohere</strong> — 20 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 20
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>cortecs</strong> — 107 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 107
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepinfra</strong> — 141 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 141
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>deepseek</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 169 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 169
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fireworks-ai</strong> — 259 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 259
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>friendli</strong> — 8 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 8
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-copilot</strong> — 29 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>github-models</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 53 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 53
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 16 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 16
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>helicone</strong> — 111 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 111
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>huggingface</strong> — 129 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 129
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inception</strong> — 5 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 5
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>io-net</strong> — 27 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 27
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>jiekou</strong> — 144 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 144
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kilo</strong> — 346 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 346
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>llmgateway</strong> — 207 models, 0 added, 0 removed, 207 field changes</summary>

#### Summary

- Models currently tracked: 207
- Models added: 0
- Models removed: 0
- Total field changes: 207

<details>
<summary>Changed fields</summary>

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     207 |

</details>

</details>

<details>
<summary><strong>mistral</strong> — 63 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 63
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 66 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 66
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 246 models, 0 added, 0 removed, 137 field changes</summary>

#### Summary

- Models currently tracked: 246
- Models added: 0
- Models removed: 0
- Total field changes: 137

<details>
<summary>Changed fields</summary>

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      73 |
| `pricing.output` |    0 |      0 |      64 |

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 610 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 610
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>novita</strong> — 104 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 104
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ollama-cloud</strong> — 39 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 117 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 117
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 118 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 118
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ovhcloud</strong> — 22 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 22
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>perplexity</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 380 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 380
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 358 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 358
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>requesty</strong> — 451 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 451
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>synthetic</strong> — 17 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 17
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>tetrate</strong> — 194 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 194
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 258 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 258
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>venice</strong> — 78 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 78
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>vercel</strong> — 275 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 275
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>wandb</strong> — 25 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 25
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 68 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 68
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>zenmux</strong> — 128 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 128
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>

## Run at 1779394940

### Summary

- Providers updated: 48
- Total models added: 29
- Total models removed: 26

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `name`                       |    0 |      0 |       3 |
| `release_date`               |    1 |      0 |     209 |
| `last_updated`               |    0 |      0 |       1 |
| `features.reasoning`         |    0 |      0 |       6 |
| `features.structured_output` |    0 |      0 |      10 |
| `features.tool_call`         |    0 |      0 |       7 |
| `pricing.input`              |    0 |      1 |     132 |
| `pricing.output`             |    0 |      1 |     115 |
| `pricing.reasoning`          |    3 |      0 |       0 |
| `pricing.cache_read`         |    0 |      6 |       0 |
| `limit.context`              |    0 |      1 |       5 |
| `limit.output`               |    2 |      2 |       4 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 1 added, 0 removed</summary>

- 1 models added, 0 models removed

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `last_updated` |    0 |      0 |       1 |

<details>
<summary>Added models (1)</summary>

- `gemini-3.1-flash-lite`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 1 added, 0 removed</summary>

- 1 models added, 0 models removed
- No field-level changes among existing models

<details>
<summary>Added models (1)</summary>

- `glm-5.1`

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 1 added, 4 removed</summary>

- 1 models added, 4 models removed
- No field-level changes among existing models

<details>
<summary>Added models (1)</summary>

- `qwen3.7-max`

</details>

<details>
<summary>Removed models (4)</summary>

- `AiHubmix-Phi-4-reasoning`
- `Aihubmix-MAI-DS-R1`
- `DeepSeek-V3.2-Exp`
- `DeepSeek-V3.2-Exp-Think`

</details>

</details>

<details>
<summary><strong>anthropic</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>avian</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>baseten</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>berget</strong> — 0 added, 11 removed</summary>

- 0 models added, 11 models removed

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      50 |
| `pricing.output` |    0 |      0 |      47 |

<details>
<summary>Removed models (11)</summary>

- `deepseek-r1`
- `glm`
- `glm-4.6`
- `glm-4.7`
- `glm4.6`
- `glm4.7`
- `unsloth/MAI-DS-R1-GGUF`
- `zai-org/GLM-4.7`
- `zai-org/GLM-4.7-FP8`
- `zai/glm-4.6`
- `zai/glm-4.7`

</details>

</details>

<details>
<summary><strong>cerebras</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>chutes</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>cohere</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>cortecs</strong> — 0 added, 1 removed</summary>

- 0 models added, 1 models removed

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |       1 |
| `pricing.output` |    0 |      0 |       1 |
| `limit.context`  |    0 |      0 |       1 |

<details>
<summary>Removed models (1)</summary>

- `gemma-2-2b-it`

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>deepseek</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>fastrouter</strong> — 2 added, 0 removed</summary>

- 2 models added, 0 models removed

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `name`               |    0 |      0 |       3 |
| `release_date`       |    0 |      0 |       3 |
| `features.reasoning` |    0 |      0 |       3 |
| `pricing.reasoning`  |    3 |      0 |       0 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    0 |      0 |       1 |

<details>
<summary>Added models (2)</summary>

- `bytedance/seedance-2`
- `bytedance/seedance-2-fast`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>friendli</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>github-copilot</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>github-models</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>google</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>groq</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>helicone</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>huggingface</strong> — 3 added, 3 removed</summary>

- 3 models added, 3 models removed

| Field                        | Lost | Gained | Changed |
| ---------------------------- | ---: | -----: | ------: |
| `features.structured_output` |    0 |      0 |      10 |
| `features.tool_call`         |    0 |      0 |       7 |
| `pricing.input`              |    0 |      1 |       1 |
| `pricing.output`             |    0 |      1 |       1 |
| `limit.context`              |    0 |      1 |       0 |

<details>
<summary>Added models (3)</summary>

- `CohereLabs/command-a-vision-07-2025`
- `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`
- `zai-org/GLM-4.7-Flash`

</details>

<details>
<summary>Removed models (3)</summary>

- `CohereLabs/command-a-plus-05-2026-bf16`
- `CohereLabs/command-a-plus-05-2026-fp8`
- `CohereLabs/command-a-plus-05-2026-w4a4`

</details>

</details>

<details>
<summary><strong>inception</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>io-net</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>jiekou</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>kilo</strong> — 1 added, 1 removed</summary>

- 1 models added, 1 models removed

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       3 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      3 |       0 |
| `limit.context`      |    0 |      0 |       1 |
| `limit.output`       |    1 |      1 |       1 |

<details>
<summary>Added models (1)</summary>

- `qwen/qwen3.7-max`

</details>

<details>
<summary>Removed models (1)</summary>

- `arcee-ai/trinity-large-preview`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 1 added, 0 removed</summary>

- 1 models added, 0 models removed

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    0 |      0 |     206 |

<details>
<summary>Added models (1)</summary>

- `qwen37-max`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>modelscope</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>moark</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed

| Field            | Lost | Gained | Changed |
| ---------------- | ---: | -----: | ------: |
| `pricing.input`  |    0 |      0 |      73 |
| `pricing.output` |    0 |      0 |      64 |

</details>

<details>
<summary><strong>nano-gpt</strong> — 2 added, 2 removed</summary>

- 2 models added, 2 models removed
- No field-level changes among existing models

<details>
<summary>Added models (2)</summary>

- `qwen3.7-max`
- `qwen3.7-max:thinking`

</details>

<details>
<summary>Removed models (2)</summary>

- `THUDM/GLM-Z1-Rumination-32B-0414`
- `arcee-ai/trinity-large-preview`

</details>

</details>

<details>
<summary><strong>novita</strong> — 1 added, 1 removed</summary>

- 1 models added, 1 models removed
- No field-level changes among existing models

<details>
<summary>Added models (1)</summary>

- `qwen/qwen3.7-max`

</details>

<details>
<summary>Removed models (1)</summary>

- `qwen/qwen3-4b-fp8`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>nvidia</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>openai</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>ovhcloud</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>perplexity</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>poe</strong> — 1 added, 1 removed</summary>

- 1 models added, 1 models removed
- No field-level changes among existing models

<details>
<summary>Added models (1)</summary>

- `qwen3.7-max`

</details>

<details>
<summary>Removed models (1)</summary>

- `claude-haiku-3.5`

</details>

</details>

<details>
<summary><strong>openrouter</strong> — 1 added, 1 removed</summary>

- 1 models added, 1 models removed

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `pricing.input`      |    0 |      0 |       4 |
| `pricing.output`     |    0 |      0 |       1 |
| `pricing.cache_read` |    0 |      3 |       0 |
| `limit.context`      |    0 |      0 |       2 |
| `limit.output`       |    1 |      1 |       2 |

<details>
<summary>Added models (1)</summary>

- `qwen/qwen3.7-max`

</details>

<details>
<summary>Removed models (1)</summary>

- `arcee-ai/trinity-large-preview`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 13 added, 0 removed</summary>

- 13 models added, 0 models removed
- No field-level changes among existing models

<details>
<summary>Added models (13)</summary>

- `vertex/gemini-2.5-flash-image@europe-central2`
- `vertex/gemini-2.5-flash-image@europe-north1`
- `vertex/gemini-2.5-flash-image@europe-southwest1`
- `vertex/gemini-2.5-flash-image@europe-west1`
- `vertex/gemini-2.5-flash-image@europe-west4`
- `vertex/gemini-2.5-flash-image@europe-west8`
- `vertex/gemini-2.5-flash-image@us-central1`
- `vertex/gemini-2.5-flash-image@us-east1`
- `vertex/gemini-2.5-flash-image@us-east4`
- `vertex/gemini-2.5-flash-image@us-east5`
- `vertex/gemini-2.5-flash-image@us-south1`
- `vertex/gemini-2.5-flash-image@us-west1`
- `vertex/gemini-2.5-flash-image@us-west4`

</details>

</details>

<details>
<summary><strong>synthetic</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>tetrate</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>togetherai</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed

| Field          | Lost | Gained | Changed |
| -------------- | ---: | -----: | ------: |
| `release_date` |    1 |      0 |       0 |

</details>

<details>
<summary><strong>venice</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>vercel</strong> — 1 added, 0 removed</summary>

- 1 models added, 0 models removed
- No field-level changes among existing models

<details>
<summary>Added models (1)</summary>

- `alibaba/qwen3.7-max`

</details>

</details>

<details>
<summary><strong>wandb</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>xai</strong> — 0 added, 0 removed</summary>

- 0 models added, 0 models removed
- No field-level changes among existing models

</details>

<details>
<summary><strong>zenmux</strong> — 0 added, 1 removed</summary>

- 0 models added, 1 models removed

| Field                | Lost | Gained | Changed |
| -------------------- | ---: | -----: | ------: |
| `features.reasoning` |    0 |      0 |       3 |

<details>
<summary>Removed models (1)</summary>

- `sapiens-ai/agnes-1.5-lite`

</details>

</details>

</details>
