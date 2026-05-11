# Issue #5 Baseline Memory

## Source

- Open issue: `https://github.com/The-Best-Codes/ai-model-directory/issues/5`
- Basis dataset: `data/all.min.json`
- Prior scan artifacts:
  - `research/open-issues-scan.json`
  - `research/missing-fields-summary.json`
  - `research/missing-fields-by-provider.tsv`
  - `research/missing-fields-by-model.tsv`

## Open Issues Snapshot

- Open issue count: 1
- Only open issue: #5
- Explicit model mentions in issue body/comments: none

## Completeness Snapshot (required fields)

- Total providers: 50
- Total models: 7226
- Models with any missing required field: 3434

Missing counts by field:

- `name`: 5
- `limit.context`: 1730
- `pricing.input`: 1283
- `pricing.output`: 1372
- `features.attachment`: 1113
- `features.tool_call`: 1368
- `modalities.input`: 956
- `modalities.output`: 1700

## Highest Missing-Cell Providers

- aihubmix: 2255
- poe: 759
- moark: 719
- deepinfra: 717
- nvidia: 714
- togetherai: 536
- openai: 447
- modelscope: 441

## Heavily Incomplete Models (missing_count >= 6)

Top providers by model count in this bucket:

- nvidia: 79
- deepinfra: 66
- modelscope: 63
- openai: 55
- togetherai: 32
- moark: 30
- google: 24
- vercel: 17
- aihubmix: 12
- perplexity: 5

## Known Local Working Tree Context

Before additional edits, local status already included:

- modified: `data/all.json`
- modified: `packages/npm/src/generated-data.ts`
- modified: `packages/npm/src/generated-provider-exports.ts`
- untracked: `.claude/`
- untracked: `research/`

Treat those as pre-existing local work unless user asks to reset or isolate.

## Partial Remediation Applied (OpenAI)

In this session, a low-risk partial fix was added for OpenAI:

- 40 new `metadata.toml` files under date-suffixed OpenAI model directories
- each uses `extends` from a complete base OpenAI model
- candidate list saved in `research/issue-5-openai-extends-candidates.tsv`

Important: full effect on generated `index.toml` files requires an OpenAI refresh run (`bun src/index.ts -p openai`), which needs `OPENAI_API_KEY`.

## Full No-Key Safe Remediation Applied

A broader safe pass has now been executed without provider API keys:

- generated and applied `extends` metadata where source models are complete
- source types:
  - openrouter complete mappings
  - same-prefix provider complete mappings
  - targeted xai -> perplexity partial mappings for the 5 missing-name models

Measured aggregate result after this pass:

- `models_with_any_missing`: 3394 -> 3109
- `name`: 5 -> 0
- see `research/issue-5-safe-extends-results.json` and `research/issue-5-safe-extends-apply-report.json`

## Deterministic Attachment Inference Applied

A second no-key safe pass inferred `features.attachment` from `modalities.input` where input modalities were already present:

- rule: `attachment = true` if any input modality is not `text`, else `false`
- applied to 332 models (6 providers)

Measured result for this pass:

- `models_with_any_missing`: 3109 -> 2911
- `features.attachment`: 1005 -> 673
- see `research/issue-5-safe-attachment-results.json`

## Residual Best-Gain Opportunities Applied

After the attachment pass, a residual opportunity sweep was executed from `research/issue-5-remaining-best-opportunities.tsv`:

- 63 additional metadata extends applied
- result:
  - `models_with_any_missing`: 2911 -> 2878
  - `limit.context`: 1616 -> 1604
  - `pricing.input`: 1174 -> 1165
  - `pricing.output`: 1263 -> 1254
  - `features.attachment`: 673 -> 656
  - `features.tool_call`: 1117 -> 1112
  - `modalities.input`: 823 -> 805
  - `modalities.output`: 1549 -> 1502

See `research/issue-5-remaining-opportunities-results.json`.
