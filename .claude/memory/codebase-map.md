# AI Model Directory: Codebase Map

## Purpose

This repository is a Bun + TypeScript data pipeline that normalizes model metadata from many providers into:

- provider model TOML files in `data/providers/<provider>/models/*/index.toml`
- flattened JSON artifacts in `data/all.json` and `data/all.min.json`

It is not a runtime API server and it is not an MCP server.

## Runtime and Tooling

- Runtime: Bun
- Language: TypeScript
- Validation: Zod
- TOML parser: smol-toml
- Price math: decimal.js

## Main Flow

1. `src/index.ts`
   - loads selected providers from `src/providers/index.ts`
   - calls `writeProviderModels()` for each provider
2. `src/io.ts`
   - fetches provider models via adapter `fetchModels()`
   - normalizes and validates records
   - merges `metadata.toml` (`manual_data`, `extends`, `priorities`)
   - writes `index.toml`
   - removes stale model directories unless `preserve = true`
3. `src/build-all.ts`
   - reads `data/providers/*/index.toml` + model TOML files
   - writes `data/all.json` and `data/all.min.json`

## Critical Schema

`src/schema.ts` defines `ModelRecord` and metadata schema.

Required-by-issue-5 completeness focus fields:

- `name`
- `limit.context`
- `pricing.input`
- `pricing.output`
- `features.attachment`
- `features.tool_call`
- `modalities.input`
- `modalities.output`

## Metadata Override Pattern

`metadata.toml` supports:

- `manual_data`: direct field overrides
- `extends`: copy from another model path under `data/providers/`
- `priorities`: source precedence
- `preserve`: keep local directory if provider stops listing model

Use metadata for safe localized fixes when provider adapters cannot reliably fetch full metadata.

## Useful Commands

- refresh providers: `bun src/index.ts`
- refresh one provider: `bun src/index.ts -p <provider>`
- rebuild flattened JSON: `bun src/build-all.ts`
- typecheck: `bunx --bun tsc -b`
- format: `bunx prettier . -w`

## Current Constraint

On this machine session, `OPENAI_API_KEY` is unset, so local provider refresh for OpenAI cannot be executed right now.
