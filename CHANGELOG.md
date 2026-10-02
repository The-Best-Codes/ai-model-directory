# Changelog

## Run at 1790907020

### Summary

- **Total models currently tracked: 12521** across 73 providers
- Providers with changes this run: 70
- Total models added: 215
- Total models removed: 118
- Total field changes: 1407

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 4 |
| `release_date` | 0 | 0 | 617 |
| `features.attachment` | 1 | 0 | 2 |
| `features.reasoning` | 0 | 0 | 2 |
| `features.structured_output` | 1 | 0 | 6 |
| `features.tool_call` | 0 | 0 | 3 |
| `pricing.input` | 0 | 0 | 268 |
| `pricing.output` | 0 | 0 | 234 |
| `pricing.reasoning` | 2 | 1 | 0 |
| `pricing.cache_read` | 12 | 2 | 129 |
| `pricing.cache_write` | 0 | 44 | 23 |
| `limit.context` | 2 | 0 | 28 |
| `limit.output` | 0 | 0 | 22 |
| `modalities.input` | 1 | 0 | 2 |
| `modalities.output` | 1 | 0 | 0 |

<details>
<summary><strong>Full details</strong></summary>

<details>
<summary><strong>302ai</strong> — 686 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 686
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>aigateway</strong> — 1183 models, 6 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 1183
- Models added: 6
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (6)</summary>

- `ideogram/v4.5`
- `ideogram/v4.5/edit`
- `pixelcut/looping-video`
- `swiss-ai/apertus-v1.5-8b`
- `utter-project/eurollm-9b-it`
- `veed/clean-audio`

</details>

</details>

<details>
<summary><strong>abacus</strong> — 184 models, 89 added, 45 removed, 26 field changes</summary>

#### Summary

- Models currently tracked: 184
- Models added: 89
- Models removed: 45
- Total field changes: 26

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 3 |
| `features.attachment` | 0 | 0 | 2 |
| `pricing.input` | 0 | 0 | 3 |
| `pricing.output` | 0 | 0 | 4 |
| `pricing.cache_read` | 0 | 0 | 1 |
| `limit.context` | 1 | 0 | 9 |
| `limit.output` | 0 | 0 | 1 |
| `modalities.input` | 0 | 0 | 2 |

</details>

<details>
<summary>Added models (89)</summary>

- `MiniMaxAI/MiniMax-M2.7`
- `MiniMaxAI/MiniMax-M3`
- `Qwen/Qwen3-Coder-480B-A35B-Instruct`
- `Qwen/Qwen3.8-27B`
- `Qwen/Qwen3.8-Flash-Next`
- `abacusai/Smaug-Flash`
- `claude-fable-5`
- `claude-fable-5-1`
- `claude-opus-4-8`
- `claude-opus-5`
- `claude-opus-5-5`
- `claude-sonnet-5`
- `claude-sonnet-5-5`
- `deepseek-ai/DeepSeek-V4-Flash-0731`
- `deepseek-ai/DeepSeek-V4-Flash-Vision-Exp`
- `deepseek-ai/DeepSeek-V4-Pro-0813`
- `deepseek-ai/DeepSeek-V4.1-Flash`
- `flux3`
- `gemini-3-pro-image`
- `gemini-3.1-flash-image`
- `gemini-3.5-flash`
- `gemini-3.5-flash-lite`
- `gemini-3.6-flash`
- `gemini-3.7-flash`
- `gemini-3.8-flash`
- `gemini_omni_flash`
- `gemini_omni_flash11`
- `gpt-4o`
- `gpt-4o-mini-transcribe`
- `gpt-4o-transcribe`
- `gpt-5.6-luna`
- `gpt-5.6-sol`
- `gpt-5.6-terra`
- `gpt-6-astra`
- `gpt-6-luna`
- `gpt-6-sol`
- `gpt-6.1-sol`
- `gpt-audio-1.5`
- `gpt-audio-mini`
- `gpt-realtime-whisper`
- `gpt-transcribe`
- `gpt_image15_edit`
- `gpt_image25`
- `gpt_image25_edit`
- `grok-4.5`
- `grok-4.6`
- `grok-4.7`
- `grok_imagine_image2`
- `grok_imagine_image_quality`
- `grok_imagine_video15`
- `higgsfield_genjutsu`
- `ideogram45`
- `kling_ai_v3_motion`
- `meta_muse_image`
- `mimo-v2.6-pro`
- `minimax_h3`
- `minimax_tts`
- `moonshotai/Kimi-K2-Instruct`
- `moonshotai/Kimi-K2.6`
- `moonshotai/Kimi-K2.7-Code`
- `moonshotai/Kimi-K3`
- `muse-spark-1.1`
- `muse-spark-1.2`
- `muse-spark-1.3`
- `muse-spark-1.3-contributor`
- `nano_banana25`
- `nano_banana_lite`
- `qwen3.7-max`
- `qwen3.8-max`
- `recraft_vectorize`
- `route-llm-code`
- `route-llm-code-low`
- `seed_audio`
- `seed_speech`
- `seedance20_mini`
- `seedance25`
- `seedream5_lite`
- `seedream5_pro`
- `thinkingmachines/Inkling`
- `vibevoice`
- `wan27_video`
- `wan30_video`
- `zai-org/GLM-4.6`
- `zai-org/GLM-4.7`
- `zai-org/GLM-5`
- `zai-org/GLM-5.1`
- `zai-org/GLM-5.2`
- `zai-org/GLM-5.3`
- `zai-org/GLM-5.3-Flash`

</details>

<details>
<summary>Removed models (45)</summary>

- `Qwen/QwQ-32B`
- `Qwen/Qwen2.5-72B-Instruct`
- `Qwen/Qwen3-235B-A22B-Instruct-2507`
- `chat-latest`
- `claude-opus-4-1-20250805`
- `claude-opus-4-7-xhigh`
- `deepseek-ai/DeepSeek-R1`
- `deepseek-ai/DeepSeek-V3.1-Terminus`
- `deepseek-ai/DeepSeek-V3.2`
- `deepseek-v4-flash`
- `deepseek-v4-pro`
- `deepseek/deepseek-v3.1`
- `gemini-3-pro-image-preview`
- `gemini-3.1-flash-image-preview`
- `gpt-4o-2024-11-20`
- `gpt-4o-audio-preview-2025-06-03`
- `gpt-4o-mini-audio-preview-2024-12-17`
- `gpt-5-codex`
- `gpt-5.1-chat-latest`
- `gpt-5.1-codex`
- `gpt-5.2-chat-latest`
- `gpt-5.2-codex`
- `gpt-5.3-chat-latest`
- `gpt-5.3-codex-xhigh`
- `grok-2-1212`
- `grok-3-mini`
- `grok-4.20-beta-0309-non-reasoning`
- `imagen`
- `kimi-k2-turbo-preview`
- `kimi-k2.5`
- `kimi-k2.6`
- `llama-3.3-70b-versatile`
- `m2.7`
- `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`
- `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`
- `meta-llama/Meta-Llama-3.1-8B-Instruct`
- `qwen/qwen3-coder-480b-a35b-instruct`
- `qwen3.6-plus`
- `veo`
- `veo3`
- `zai-org/glm-4.5`
- `zai-org/glm-4.6`
- `zai-org/glm-4.7`
- `zai-org/glm-5`
- `zai-org/glm-5.1`

</details>

</details>

<details>
<summary><strong>alibaba-cn</strong> — 100 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 100
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>ambient</strong> — 4 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 4
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>api-airforce</strong> — 610 models, 1 added, 2 removed, 599 field changes</summary>

#### Summary

- Models currently tracked: 610
- Models added: 1
- Models removed: 2
- Total field changes: 599

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 599 |

</details>

<details>
<summary>Added models (1)</summary>

- `grok-4.1-fast`

</details>

<details>
<summary>Removed models (2)</summary>

- `deepseek-v4.1-flash`
- `rnj-1`

</details>

</details>

<details>
<summary><strong>aihubmix</strong> — 901 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 901
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>anthropic</strong> — 13 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 13
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>avian</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
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
<summary><strong>berget</strong> — 59 models, 0 added, 0 removed, 82 field changes</summary>

#### Summary

- Models currently tracked: 59
- Models added: 0
- Models removed: 0
- Total field changes: 82

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 46 |
| `pricing.output` | 0 | 0 | 36 |

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
<summary><strong>chutes</strong> — 14 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 14
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
<summary><strong>cortecs</strong> — 109 models, 0 added, 1 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 109
- Models added: 0
- Models removed: 1
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Removed models (1)</summary>

- `minimax-m2.7`

</details>

</details>

<details>
<summary><strong>deepinfra</strong> — 183 models, 0 added, 4 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 183
- Models added: 0
- Models removed: 4
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 1 |

</details>

<details>
<summary>Removed models (4)</summary>

- `Qwen/Qwen-Image-Edit`
- `black-forest-labs/FLUX.1-Kontext-dev`
- `nvidia/Nemotron-3-Nano-30B-A3B`
- `tencent/Hy3`

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
<summary><strong>empiriolabs</strong> — 216 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 216
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastrouter</strong> — 206 models, 1 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 206
- Models added: 1
- Models removed: 0
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.reasoning` | 0 | 0 | 1 |
| `pricing.reasoning` | 2 | 1 | 0 |

</details>

<details>
<summary>Added models (1)</summary>

- `openai/gpt-6.1-sol`

</details>

</details>

<details>
<summary><strong>fireworks-ai</strong> — 293 models, 1 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 293
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

- `accounts/fireworks/models/mimo-v2p6-pro-rl`

</details>

</details>

<details>
<summary><strong>friendli</strong> — 7 models, 3 added, 2 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 7
- Models added: 3
- Models removed: 2
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 4 |

</details>

<details>
<summary>Added models (3)</summary>

- `google/gemma-4-31B-it`
- `zai-org/GLM-5.3`
- `zai-org/GLM-5.3-Flash`

</details>

<details>
<summary>Removed models (2)</summary>

- `LGAI-EXAONE/K-EXAONE-236B-A23B`
- `Qwen/Qwen3-235B-A22B-Instruct-2507`

</details>

</details>

<details>
<summary><strong>github-copilot</strong> — 56 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 56
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>google</strong> — 61 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 61
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>groq</strong> — 11 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 11
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
<summary><strong>huggingface</strong> — 135 models, 4 added, 2 removed, 12 field changes</summary>

#### Summary

- Models currently tracked: 135
- Models added: 4
- Models removed: 2
- Total field changes: 12

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 5 |
| `features.tool_call` | 0 | 0 | 3 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 2 |
| `limit.context` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (4)</summary>

- `XiaomiMiMo/MiMo-V2.6-Flash-RL`
- `XiaomiMiMo/MiMo-V2.6-Pro-RL`
- `zai-org/GLM-4.6-FP8`
- `zai-org/GLM-5.1-FP8`

</details>

<details>
<summary>Removed models (2)</summary>

- `CohereLabs/command-a-translate-08-2025`
- `zai-org/GLM-4.7-FP8`

</details>

</details>

<details>
<summary><strong>hyper</strong> — 23 models, 0 added, 0 removed, 3 field changes</summary>

#### Summary

- Models currently tracked: 23
- Models added: 0
- Models removed: 0
- Total field changes: 3

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>impossibl</strong> — 140 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 140
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inception</strong> — 2 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 2
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>inceptron</strong> — 6 models, 0 added, 0 removed, 9 field changes</summary>

#### Summary

- Models currently tracked: 6
- Models added: 0
- Models removed: 0
- Total field changes: 9

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `release_date` | 0 | 0 | 6 |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 0 | 0 | 1 |

</details>

</details>

<details>
<summary><strong>io-net</strong> — 38 models, 0 added, 0 removed, 56 field changes</summary>

#### Summary

- Models currently tracked: 38
- Models added: 0
- Models removed: 0
- Total field changes: 56

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 20 |
| `pricing.output` | 0 | 0 | 18 |
| `pricing.cache_read` | 0 | 0 | 18 |

</details>

</details>

<details>
<summary><strong>jiekou</strong> — 187 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 187
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>kenari</strong> — 90 models, 0 added, 1 removed, 194 field changes</summary>

#### Summary

- Models currently tracked: 90
- Models added: 0
- Models removed: 1
- Total field changes: 194

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 57 |
| `pricing.output` | 0 | 0 | 57 |
| `pricing.cache_read` | 0 | 0 | 57 |
| `pricing.cache_write` | 0 | 0 | 23 |

</details>

<details>
<summary>Removed models (1)</summary>

- `gemini-2-5-flash-lite`

</details>

</details>

<details>
<summary><strong>kilo</strong> — 399 models, 2 added, 0 removed, 36 field changes</summary>

#### Summary

- Models currently tracked: 399
- Models added: 2
- Models removed: 0
- Total field changes: 36

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 8 |
| `pricing.output` | 0 | 0 | 6 |
| `pricing.cache_read` | 0 | 1 | 9 |
| `limit.context` | 0 | 0 | 4 |
| `limit.output` | 0 | 0 | 8 |

</details>

<details>
<summary>Added models (2)</summary>

- `apodex/apodex-1.1-mini:free`
- `unbiased/pareto-26.10-preview`

</details>

</details>

<details>
<summary><strong>kiosapi</strong> — 84 models, 4 added, 3 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 84
- Models added: 4
- Models removed: 3
- Total field changes: 4

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 3 |

</details>

<details>
<summary>Added models (4)</summary>

- `apodex-1.1-mini`
- `gpt-image-2.5`
- `gpt-image-2.5-flare`
- `gpt-image-2.5-sunburst`

</details>

<details>
<summary>Removed models (3)</summary>

- `codex-auto-review`
- `gpt-image-2-5-flare`
- `gpt-image-2-5-sunburst`

</details>

</details>

<details>
<summary><strong>llmgateway</strong> — 296 models, 0 added, 0 removed, 6 field changes</summary>

#### Summary

- Models currently tracked: 296
- Models added: 0
- Models removed: 0
- Total field changes: 6

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 0 | 0 | 6 |

</details>

</details>

<details>
<summary><strong>llmtr</strong> — 353 models, 4 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 353
- Models added: 4
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (4)</summary>

- `together/tev1-4b-experimental`
- `unbiased/pareto`
- `voyageai/rerank-3`
- `voyageai/rerank-3-lite`

</details>

</details>

<details>
<summary><strong>mistral</strong> — 45 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 45
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>modelscope</strong> — 35 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 35
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>moark</strong> — 224 models, 0 added, 0 removed, 170 field changes</summary>

#### Summary

- Models currently tracked: 224
- Models added: 0
- Models removed: 0
- Total field changes: 170

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 94 |
| `pricing.output` | 0 | 0 | 76 |

</details>

</details>

<details>
<summary><strong>nearai</strong> — 57 models, 23 added, 6 removed, 32 field changes</summary>

#### Summary

- Models currently tracked: 57
- Models added: 23
- Models removed: 6
- Total field changes: 32

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.reasoning` | 0 | 0 | 1 |
| `pricing.input` | 0 | 0 | 2 |
| `pricing.output` | 0 | 0 | 3 |
| `pricing.cache_read` | 10 | 0 | 14 |
| `limit.context` | 0 | 0 | 1 |
| `limit.output` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (23)</summary>

- `Qwen/Qwen3.8-27B`
- `anthropic/claude-fable-5`
- `anthropic/claude-fable-5-1`
- `anthropic/claude-opus-4-8`
- `anthropic/claude-opus-5`
- `anthropic/claude-opus-5-5`
- `anthropic/claude-sonnet-5`
- `anthropic/claude-sonnet-5-5`
- `deepseek/deepseek-v3.2`
- `deepseek/deepseek-v4.1-flash`
- `google/gemini-3.8-flash`
- `moonshotai/kimi-k3`
- `openai/gpt-5.6-luna`
- `openai/gpt-5.6-sol`
- `openai/gpt-6-astra`
- `openai/gpt-6-luna`
- `openai/gpt-6-sol`
- `openai/gpt-6.1-sol`
- `qwen/qwen3.5-397b-a17b`
- `typesafe/jev-1.13`
- `x-ai/grok-4.6`
- `x-ai/grok-4.7`
- `z-ai/glm-5.3-flash`

</details>

<details>
<summary>Removed models (6)</summary>

- `Qwen/Qwen3.5-122B-A10B`
- `Qwen/Qwen3.6-27B-FP8`
- `deepseek-ai/DeepSeek-V4-Flash`
- `google/gemma-4-31B-it`
- `openai/gpt-oss-120b`
- `zai-org/GLM-5.1-FP8`

</details>

</details>

<details>
<summary><strong>nano-gpt</strong> — 628 models, 4 added, 1 removed, 2 field changes</summary>

#### Summary

- Models currently tracked: 628
- Models added: 4
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
<summary>Added models (4)</summary>

- `llmtech/decider-0.8b-fp8`
- `llmtech/decider-2b-fp8`
- `llmtech/decider-4b-nvfp4`
- `unbiased/pareto-26.10-preview`

</details>

<details>
<summary>Removed models (1)</summary>

- `TEE/qwen3.8-27b-uncensored`

</details>

</details>

<details>
<summary><strong>neon</strong> — 36 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 36
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>neuralwatt</strong> — 28 models, 6 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 28
- Models added: 6
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `features.structured_output` | 0 | 0 | 1 |

</details>

<details>
<summary>Added models (6)</summary>

- `nw-flash`
- `nw-flash-flex`
- `nw-large`
- `nw-large-flex`
- `nw-small`
- `nw-small-flex`

</details>

</details>

<details>
<summary><strong>novita</strong> — 121 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 121
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `apodex/apodex-1.1-mini`

</details>

</details>

<details>
<summary><strong>ollama-cloud</strong> — 17 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 17
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>nvidia</strong> — 81 models, 0 added, 0 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 81
- Models added: 0
- Models removed: 0
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `name` | 0 | 0 | 1 |
| `features.attachment` | 1 | 0 | 0 |
| `features.structured_output` | 1 | 0 | 0 |
| `modalities.input` | 1 | 0 | 0 |
| `modalities.output` | 1 | 0 | 0 |

</details>

</details>

<details>
<summary><strong>ofox</strong> — 150 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 150
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openai</strong> — 133 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 133
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>opencode-zen</strong> — 85 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 85
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `fledge-alpha-free`

</details>

</details>

<details>
<summary><strong>ovhcloud</strong> — 24 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 24
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>fastino</strong> — 26 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 26
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>poe</strong> — 343 models, 2 added, 0 removed, 1 field changes</summary>

#### Summary

- Models currently tracked: 343
- Models added: 2
- Models removed: 0
- Total field changes: 1

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `limit.context` | 1 | 0 | 0 |

</details>

<details>
<summary>Added models (2)</summary>

- `mimo-v2.6-flash`
- `mimo-v2.6-pro`

</details>

</details>

<details>
<summary><strong>qiniu</strong> — 79 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 79
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>openrouter</strong> — 464 models, 2 added, 0 removed, 60 field changes</summary>

#### Summary

- Models currently tracked: 464
- Models added: 2
- Models removed: 0
- Total field changes: 60

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 18 |
| `pricing.output` | 0 | 0 | 13 |
| `pricing.cache_read` | 0 | 1 | 17 |
| `limit.context` | 0 | 0 | 4 |
| `limit.output` | 0 | 0 | 7 |

</details>

<details>
<summary>Added models (2)</summary>

- `apodex/apodex-1.1-mini:free`
- `unbiased/pareto-26.10-preview`

</details>

</details>

<details>
<summary><strong>orcarouter</strong> — 205 models, 2 added, 1 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 205
- Models added: 2
- Models removed: 1
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (2)</summary>

- `anthropic/claude-sonnet-5.5`
- `openai/gpt-6.1-sol`

</details>

<details>
<summary>Removed models (1)</summary>

- `openai/gpt-oss-120b`

</details>

</details>

<details>
<summary><strong>requesty</strong> — 749 models, 0 added, 0 removed, 68 field changes</summary>

#### Summary

- Models currently tracked: 749
- Models added: 0
- Models removed: 0
- Total field changes: 68

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 8 |
| `pricing.output` | 0 | 0 | 8 |
| `pricing.cache_read` | 0 | 0 | 8 |
| `pricing.cache_write` | 0 | 44 | 0 |

</details>

</details>

<details>
<summary><strong>routing-run</strong> — 39 models, 39 added, 49 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 39
- Models added: 39
- Models removed: 49
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (39)</summary>

- `claude-fable-5.1`
- `claude-haiku-4.5`
- `claude-opus-4.6`
- `claude-opus-4.7`
- `claude-opus-4.8`
- `claude-opus-5`
- `claude-sonnet-4.6`
- `claude-sonnet-5`
- `deepseek-v4-flash`
- `deepseek-v4-flash-0731`
- `deepseek-v4-flash-0731-fast`
- `deepseek-v4-pro`
- `deepseek-v4-pro-0813`
- `deepseek-v4.1-flash`
- `gemini-3.5-flash-lite`
- `gemini-3.8-flash`
- `glm-5.2`
- `glm-5.3`
- `glm-5.3-flash`
- `gpt-5.3-codex`
- `gpt-5.4`
- `gpt-5.4-mini`
- `gpt-5.4-nano`
- `gpt-5.5`
- `gpt-5.6-luna`
- `gpt-5.6-sol`
- `gpt-5.6-terra`
- `gpt-6-astra`
- `gpt-oss-120b`
- `grok-4.3`
- `grok-4.5`
- `kimi-k2.6`
- `kimi-k2.7-code`
- `kimi-k3`
- `minimax-m3`
- `mistral-small-4`
- `qwen3-coder`
- `qwen3.8-flash`
- `qwen3.8-max`

</details>

<details>
<summary>Removed models (49)</summary>

- `route/FLUX.2-pro`
- `route/cohere-embed-v3-english-3`
- `route/cohere-embed-v3-multilingual-3`
- `route/cohere-rerank-v4.0-pro`
- `route/deepseek-v3.2`
- `route/deepseek-v4-flash`
- `route/deepseek-v4-pro`
- `route/eleven-flash-v2`
- `route/eleven-flash-v2.5`
- `route/eleven-multilingual-v2`
- `route/eleven-v3`
- `route/flux-1-schnell`
- `route/gemma-4-31b`
- `route/gemma-4-31b-it`
- `route/glm-5.1`
- `route/glm-5.2`
- `route/gpt-oss-120`
- `route/hunyuan-image-3`
- `route/kimi-k2.5`
- `route/kimi-k2.6`
- `route/llama3.1-8b`
- `route/mimo-v2.5`
- `route/mimo-v2.5-pro`
- `route/minimax-m2.5`
- `route/minimax-m2.5-highspeed`
- `route/minimax-m2.7`
- `route/minimax-m2.7-highspeed`
- `route/minimax-m3`
- `route/mistral-large-3`
- `route/mistral-medium-2505`
- `route/mistral-small-2503`
- `route/nemotron-nano-9b-v2`
- `route/poolside-laguna-m.1`
- `route/poolside-laguna-xs.2`
- `route/qwen-3-235b-a22b-instruct-2507`
- `route/qwen-image-2512`
- `route/qwen3-embedding-8b`
- `route/qwen3.6-27b`
- `route/qwen3.6-27b-202k`
- `route/scribe-v1`
- `route/scribe-v2`
- `route/scribe-v2-realtime`
- `route/step-3.5-flash`
- `route/step-3.5-flash-2603`
- `route/step-3.7-flash`
- `route/stepfun-3.5-flash`
- `route/stepfun-3.7-flash`
- `route/whisper-large-v3`
- `route/zai-glm-4.7`

</details>

</details>

<details>
<summary><strong>sakana</strong> — 6 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 6
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

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
<summary><strong>tokenrouter</strong> — 146 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 146
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>togetherai</strong> — 263 models, 0 added, 0 removed, 8 field changes</summary>

#### Summary

- Models currently tracked: 263
- Models added: 0
- Models removed: 0
- Total field changes: 8

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 3 |
| `pricing.output` | 0 | 0 | 3 |
| `pricing.cache_read` | 0 | 0 | 2 |

</details>

</details>

<details>
<summary><strong>trustedrouter</strong> — 643 models, 6 added, 0 removed, 4 field changes</summary>

#### Summary

- Models currently tracked: 643
- Models added: 6
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
<summary>Added models (6)</summary>

- `system1models-eu/s1-fast`
- `system1models-eu/s1-pro`
- `system1models-eu/s1-vision`
- `system1models/s1-fast`
- `system1models/s1-pro`
- `system1models/s1-vision`

</details>

</details>

<details>
<summary><strong>venice</strong> — 128 models, 1 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 128
- Models added: 1
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (1)</summary>

- `abliteration-abliterated-model-large-v2`

</details>

</details>

<details>
<summary><strong>vercel</strong> — 406 models, 10 added, 1 removed, 5 field changes</summary>

#### Summary

- Models currently tracked: 406
- Models added: 10
- Models removed: 1
- Total field changes: 5

<details>
<summary>Changed fields</summary>

| Field | Lost | Gained | Changed |
| --- | ---: | ---: | ---: |
| `pricing.input` | 0 | 0 | 1 |
| `pricing.output` | 0 | 0 | 1 |
| `pricing.cache_read` | 2 | 0 | 1 |

</details>

<details>
<summary>Added models (10)</summary>

- `convaiinnovations/laya`
- `convaiinnovations/laya-free`
- `microsoft/mai-transcribe-1.5`
- `microsoft/mai-transcribe-2`
- `microsoft/mai-transcribe-2-streaming`
- `microsoft/mai-voice-2`
- `microsoft/mai-voice-2-flash`
- `microsoft/mai-voice-2.1`
- `microsoft/mai-voice-2.1-flash`
- `spacexai/grok-imagine-video-1.5-lite`

</details>

<details>
<summary>Removed models (1)</summary>

- `stealth/pixel-canary`

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
<summary><strong>wandb</strong> — 29 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 29
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xai</strong> — 43 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 43
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

<details>
<summary><strong>xpersona</strong> — 19 models, 3 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 19
- Models added: 3
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

<details>
<summary>Added models (3)</summary>

- `gpt-6`
- `muse-spark-1.3-contributor`
- `xpersona-auto`

</details>

</details>

<details>
<summary><strong>zenmux</strong> — 201 models, 0 added, 0 removed, 0 field changes</summary>

#### Summary

- Models currently tracked: 201
- Models added: 0
- Models removed: 0
- Total field changes: 0

_No field-level changes among existing models._

</details>

</details>
