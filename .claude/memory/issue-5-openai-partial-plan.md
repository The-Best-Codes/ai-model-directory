# Issue #5: OpenAI Partial Fix Memory

## Objective

Partially reduce issue #5 missing fields with a low-risk, low-assumption change.

## Why OpenAI First

- OpenAI has many date-suffixed model IDs where canonical base IDs already contain complete metadata.
- This can be solved safely with `metadata.toml` `extends` links, no speculative web inference required.

## Candidate Pattern

If model ID is `base-YYYY-MM-DD` and `base` exists with complete required fields, add:

```toml
extends = { path = "openai/models/<base-normalized>" }
```

Example:

- `gpt-4o-2024-11-20` extends `openai/models/gpt-4o`

## Current Candidate Count

Detected safe candidate mappings: 40

Examples:

- `gpt-4-turbo-2024-04-09 -> gpt-4-turbo`
- `gpt-4.1-2025-04-14 -> gpt-4.1`
- `gpt-4o-2024-05-13 -> gpt-4o`
- `gpt-5-2025-08-07 -> gpt-5`
- `o3-2025-04-16 -> o3`

## Expected Impact (from current baseline)

- Each candidate currently misses 7 required fields
- If all 40 are patched via extends, expected reduction:
  - missing cells: about 280
  - models with any missing: about 40

## Implementation Status (this session)

- Added 40 `metadata.toml` files under `data/providers/openai/models/*` using `extends` to the corresponding base OpenAI model path.
- Applied metadata merge logic offline to current OpenAI `index.toml` files (without provider API fetch), then rebuilt flattened files with `bun src/build-all.ts`.
- Ran typecheck with `bunx --bun tsc -b`.
- Wrote candidate mapping list to `research/issue-5-openai-extends-candidates.tsv`.
- Wrote measured result snapshot to `research/issue-5-openai-partial-results.json`.

## Required Validation Steps

After adding metadata files:

1. `bun src/index.ts -p openai`
2. `bun src/build-all.ts`
3. recompute issue #5 summary counts
4. `bunx --bun tsc -b`

## Environment Constraint

Current session has `OPENAI_API_KEY=unset`.

Without this key, step 1 cannot run locally here.

## Measured Impact (after offline apply)

Observed after offline metadata apply + `build-all`:

- touched models: 40
- expected models with any missing: 3434 -> 3394
- expected missing-count deltas:
  - `limit.context`: 1730 -> 1690
  - `pricing.input`: 1283 -> 1243
  - `pricing.output`: 1372 -> 1332
  - `features.attachment`: 1113 -> 1073
  - `features.tool_call`: 1368 -> 1328
  - `modalities.input`: 956 -> 916
  - `modalities.output`: 1700 -> 1660

## Follow-up Status

This OpenAI partial work is now subsumed by the broader no-key safe rollout:

- additional safe extends applied across multiple providers
- all 5 missing-name models resolved via targeted perplexity -> xai prefix mapping
- current canonical post-rollout metrics are in `research/issue-5-safe-extends-results.json`

## Testing Note

No first-party API tests are needed for this repository, this is a data pipeline repo.

Validation is file-generation and completeness-diff based.
