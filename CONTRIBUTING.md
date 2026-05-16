# Contributing

Thanks for your interest in helping out! This directory only stays comprehensive because people add providers, fix wrong metadata, and report missing models. This document covers everything you need to know to make a useful pull request.

If you have a question that isn't answered here, [join us on Discord](https://www.agent-one.dev/discord) or open an issue.

## Table of Contents

- [Project Setup](#project-setup)
- [Useful Commands](#useful-commands)
- [Repository Layout](#repository-layout)
- [Refreshing The Data Locally](#refreshing-the-data-locally)
- [The Model Schema](#the-model-schema)
- [Customizing A Model With `metadata.toml`](#customizing-a-model-with-metadatatoml)
  - [`manual_data`](#manual_data)
  - [`extends`](#extends)
  - [`priorities`](#priorities)
  - [`preserve`](#preserve)
- [Adding A New Provider](#adding-a-new-provider)
- [Coding Guidelines](#coding-guidelines)
- [Pull Request Checklist](#pull-request-checklist)

## Project Setup

This repository uses [Bun](https://bun.com) as the runtime and package manager. You need a recent version of Bun installed.

```bash
bun install
cp .env.example .env # fill in any provider keys you need to test against
```

Most providers can be refreshed without an API key (they expose public catalog endpoints). Providers that do need a key are listed in `.env.example`; the GitHub Action wires the matching repo secret in `.github/workflows/update-model-lists.yml`.

## Useful Commands

| Command                                | What it does                                                            |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `bun src/index.ts`                     | Refresh data for every provider, then write the changelog.              |
| `bun src/index.ts -p openai,anthropic` | Refresh only the listed providers (`--providers` / `--only` also work). |
| `bun src/index.ts --no-changelog`      | Refresh providers without updating `CHANGELOG.md`.                      |
| `bun src/build-all.ts`                 | Re-build `data/all.json` and `data/all.min.json` from the TOML tree.    |
| `bunx --bun tsc -b`                    | Typecheck the project.                                                  |
| `bunx prettier . -w`                   | Format the project.                                                     |

## Refreshing The Data Locally

After making changes to a provider adapter or to a `metadata.toml` file, regenerate the affected model files:

```bash
bun src/index.ts -p <provider>
bun src/build-all.ts
```

Re-run the typechecker and formatter before opening a PR:

```bash
bunx --bun tsc -b
bunx prettier . -w
```

## Customizing A Model With `metadata.toml`

`metadata.toml` lives next to the generated `index.toml` and is the only supported way to influence what the updater writes. It supports four top-level keys: `manual_data`, `extends`, `priorities`, and `preserve`.

```toml
preserve = true
priorities = ["manual_data", "api", "extends"]
extends = { path = "openrouter/models/openai-gpt-5", omit = ["pricing", "limit.context"] }

[manual_data]
name = "GPT-5 (Custom Routing)"

[manual_data.features]
tool_call = true

[manual_data.pricing]
input = 1.25
output = 10
```

### `manual_data`

A partial `ModelRecord` that is merged on top of fetched data. By default `manual_data` wins over both `api` and `extends`. Use it to:

- correct wrong metadata returned by a provider's API
- fill in fields the provider doesn't expose at all
- give a model a friendlier display name

Only include the fields you want to override. Anything you omit falls through to the next source.

### `extends`

Pulls missing fields from another model that already exists in this repository. It takes:

- `path`: required. A slash-separated path under `data/providers/`, e.g. `openrouter/models/openai-gpt-5`. Validated to lowercase letters, digits, and `-` per segment, so it cannot reach outside the data tree.
- `omit`: optional. An array of fields to drop from the source before merging.

`omit` accepts top-level field names (`"name"`, `"open_weights"`, `"features"`, `"pricing"`, `"limit"`, `"modalities"`, etc.) and dotted paths into nested objects (`"features.attachment"`, `"pricing.input"`, `"limit.context"`, `"modalities.output"`, etc.). The full set of accepted values is defined by `extendsOmitFieldSchema` in [`src/schema.ts`](./src/schema.ts). `id` cannot be omitted.

```toml
extends = { path = "openrouter/models/openai-gpt-5", omit = ["pricing", "limit.context"] }
```

After omission the remaining fields are merged into the final model according to `priorities`. This is useful when a host re-serves a model under a different price, context window, or feature flag than the original.

### `priorities`

Reorders how `manual_data`, `api`, and `extends` sources are combined. The default is `["manual_data", "api", "extends"]` (manual wins, then API, then extends fills gaps). Provide all three values; entries earlier in the list win for scalar fields, and nested objects (`features`, `pricing`, `limit`, `modalities`) are merged key-by-key with the same precedence.

### `preserve`

Set `preserve = true` to keep this model directory even if the provider stops listing the model on a future refresh. Without it the directory is removed automatically when it disappears upstream.

## Adding A New Provider

Before writing a new adapter, **read at least four existing providers** so your adapter follows the same style and reuses the helpers. Good starting points are:

- [`src/providers/openai.ts`](./src/providers/openai.ts)
- [`src/providers/anthropic.ts`](./src/providers/anthropic.ts)
- [`src/providers/openrouter.ts`](./src/providers/openrouter.ts)
- [`src/providers/aihubmix.ts`](./src/providers/aihubmix.ts)

Then:

1. Create `src/providers/<provider>.ts` exporting a `ProviderDefinition` (`name`, `outputDirectory`, `fetchModels`).
2. Use [`fetchJson`](./src/lib/http.ts) for HTTP calls so you get the 60s timeout and Zod validation for free.
3. Use the helpers in [`src/providers/helpers.ts`](./src/providers/helpers.ts) and [`src/lib/pricing.ts`](./src/lib/pricing.ts) for parsing modalities, attachments, and per-million prices.
4. Add the provider to the `providers` array in [`src/providers/index.ts`](./src/providers/index.ts).
5. Create `data/providers/<provider>/index.toml` with the provider's `name`, `website`, `apiBaseUrl`, and (when applicable) Vercel AI SDK info.
6. If the provider needs a credential, add the env variable to `.env.example` and to the workflow in `.github/workflows/update-model-lists.yml`.
7. Run `bun src/index.ts -p <provider>` and inspect the generated TOML files. Add `metadata.toml` overrides for any fields the API can't supply.
8. Run `bun src/build-all.ts`, `bunx --bun tsc -b`, and `bunx prettier . -w`.

`outputDirectory` should be `"data/providers/<provider>/models"`.

## Coding Guidelines

These come from [`AGENTS.md`](./AGENTS.md) and apply to humans too:

- **Always use `decimal.js`** for any arithmetic on prices, token counts, monetary values, or anywhere JS floating-point math could cause drift.
- **Keep code self-documenting.** Avoid comments; prefer descriptive names and small helpers.
- **Make surgical edits.** Don't reformat or refactor files that aren't related to your change.
- **Follow the existing provider conventions.** When in doubt, mirror what the closest existing provider does.
- If you're an AI agent: Please note your agent type, model, and other relevant details to fast-track getting your PRs reviewed and merged.

## Pull Request Checklist

Before opening a PR, please make sure:

- [ ] `bunx --bun tsc -b` passes.
- [ ] `bunx prettier . -w` has been run.
- [ ] If you added or changed an adapter, you ran `bun src/index.ts -p <provider>` and reviewed the generated diff.
- [ ] If you added a provider, you also added `data/providers/<provider>/index.toml` and registered it in `src/providers/index.ts`.
- [ ] If you added or changed metadata, you ran `bun src/build-all.ts` so `data/all.json` and `data/all.min.json` are in sync.
- [ ] You did not commit secrets, API keys, or `.env`.

Thanks again for contributing! ❤️
