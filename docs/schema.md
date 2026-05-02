# Schema reference

This document describes the data shape used throughout the directory and how each file on disk fits together. The TypeScript / Zod source of truth lives in [`src/schema.ts`](../src/schema.ts).

## Pipeline overview

```diagram
╭──────────────────────╮     ╭───────────────╮     ╭──────────────────╮     ╭─────────────╮
│ Provider TS adapter  │────▶│  index.toml   │────▶│ build-all.ts     │────▶│  all.json   │
│ (fetch + validate)   │     │ (raw API data)│     │ (apply metadata) │     │ (consumers) │
╰──────────────────────╯     ╰───────────────╯     ╰────────▲─────────╯     ╰─────────────╯
                                                            │
                                                  ╭─────────┴─────────╮
                                                  │  metadata.toml    │
                                                  │ (optional sidecar)│
                                                  ╰───────────────────╯
```

1. A provider adapter under `src/providers/<provider>.ts` fetches data from the upstream API or docs.
2. Each model is validated against the [model schema](#model-record) and written as the raw API snapshot to `data/providers/<provider>/models/<model>/index.toml`.
3. An optional `metadata.toml` sidecar in the same directory describes manual overrides, inheritance, and merge priorities.
4. `src/build-all.ts` reads every `index.toml` + `metadata.toml`, merges them according to the configured priorities, and writes the merged result to `data/all.json`.

The `index.toml` is always overwritten on refresh. `metadata.toml` is human-edited and never modified by the updater.

## Directory layout

```
data/
└── providers/
    └── <provider>/
        ├── index.toml                  # provider info (see ProviderInfo)
        └── models/
            └── <model>/
                ├── index.toml          # raw model record (see ModelRecord)
                └── metadata.toml       # optional sidecar (see Metadata)
```

The `<provider>` directory name is the provider id used as the top-level key in `all.json`. The `<model>` directory name is the [normalized](#normalization) model id.

## Model record

Each model `index.toml` follows the `modelSchema` in `schema.ts`:

| Field              | Type                              | Required | Notes                                           |
| ------------------ | --------------------------------- | -------- | ----------------------------------------------- | ---------------------------------- |
| `id`               | string (1–200 chars, no controls) | yes      | Provider's canonical model identifier           |
| `name`             | string (1–500 chars, no controls) | no       | Human-readable display name                     |
| `knowledge_cutoff` | unix timestamp string             | no       | `^(0                                            | [1-9]\d\*)$` — seconds since epoch |
| `release_date`     | unix timestamp string             | no       | Same format as `knowledge_cutoff`               |
| `last_updated`     | unix timestamp string             | no       | Same format as `knowledge_cutoff`               |
| `open_weights`     | boolean                           | no       | `true` if the weights are publicly downloadable |
| `features`         | [Features](#features)             | no       | Capability flags                                |
| `pricing`          | [Pricing](#pricing)               | no       | Costs in USD per million tokens                 |
| `limit`            | [Limits](#limits)                 | no       | Token limits                                    |
| `modalities`       | [Modalities](#modalities)         | no       | Supported input/output media types              |

Unknown top-level keys are rejected (`strict` Zod schema).

### Features

| Field               | Type    | Notes                                                 |
| ------------------- | ------- | ----------------------------------------------------- |
| `attachment`        | boolean | Whether the model accepts non-text attachments        |
| `reasoning`         | boolean | Whether the model exposes reasoning / thinking tokens |
| `tool_call`         | boolean | Native function / tool-calling support                |
| `structured_output` | boolean | JSON / structured output support                      |
| `temperature`       | boolean | Whether `temperature` is honored                      |

### Pricing

All values are USD per **one million** tokens, non-negative numbers.

| Field          | Notes                       |
| -------------- | --------------------------- |
| `input`        | Standard input tokens       |
| `output`       | Standard output tokens      |
| `reasoning`    | Reasoning / thinking tokens |
| `cache_read`   | Cached input tokens (read)  |
| `cache_write`  | Cached input tokens (write) |
| `input_audio`  | Audio input tokens          |
| `output_audio` | Audio output tokens         |

### Limits

Non-negative integers.

| Field     | Notes                              |
| --------- | ---------------------------------- |
| `context` | Total context window in tokens     |
| `input`   | Maximum input tokens, if separate  |
| `output`  | Maximum output tokens, if separate |

### Modalities

Each list contains values from the modality enum: `text`, `image`, `audio`, `video`, `file`. Lists are deduplicated and sorted on write.

```toml
[modalities]
input = ["text", "image"]
output = ["text"]
```

## Provider info

`data/providers/<provider>/index.toml` follows `providerInfoSchema`:

| Field                    | Type     | Required | Notes                                                     |
| ------------------------ | -------- | -------- | --------------------------------------------------------- |
| `name`                   | string   | yes      | Display name                                              |
| `website`                | string   | no       | Marketing site URL                                        |
| `apiBaseUrl`             | string   | no       | Base URL for the provider's API                           |
| `aiSdk.npmPackage`       | string   | no       | Recommended Vercel AI SDK package                         |
| `aiSdk.defaultApiKeyEnv` | string[] | no       | Environment variables conventionally used for the API key |

A directory without an `index.toml` is ignored by `build-all.ts`.

## Metadata sidecar

`metadata.toml` is optional. When present it controls how the merged model is built and whether the directory is preserved across refreshes. Schema: `metadataSchema` in `schema.ts`.

```toml
preserve = true
priorities = ["manual_data", "api", "extends"]

[extends]
path = "openrouter/openai-gpt-5-5"

[manual_data]
name = "My override name"

[manual_data.features]
attachment = false

[manual_data.pricing]
input = 1.5
```

### Fields

| Field         | Type                                     | Notes                                                                                          |
| ------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `preserve`    | boolean                                  | If `true`, the model directory is kept on refresh even if the API no longer returns it.        |
| `priorities`  | array of source names (see below)        | Determines per-field precedence when merging. Defaults to `["manual_data", "api", "extends"]`. |
| `extends`     | table with `path = "<provider>/<model>"` | Inherit fields from another model in `data/providers/`.                                        |
| `manual_data` | partial [Model record](#model-record)    | Hand-written overrides. All fields and sub-fields are optional.                                |

#### `preserve`

Replaces the previous `.keep` marker file. When the upstream API stops returning a model id, the updater normally removes its directory. Setting `preserve = true` keeps the directory and any data inside it.

#### `priorities`

An ordered array of the three sources that contribute to the final merged record:

- `manual_data` — values from `[manual_data]` in this file.
- `api` — values from `index.toml` (the most recent provider snapshot).
- `extends` — values resolved from the referenced model in `[extends]`.

The default `["manual_data", "api", "extends"]` means manual edits win over upstream API data, and both win over inherited values. You can reorder this if, for example, you want the API to always win over inherited data but never override manual edits, or if you want extends to take precedence over the API for a specific model.

The list must contain at least one entry, and any source you omit will be skipped entirely when merging.

#### `extends`

```toml
[extends]
path = "<provider-id>/<model-directory>"
```

`path` points at another `data/providers/<provider>/models/<model>/` directory. The referenced model is fully resolved first (its own `extends` chain is followed), then its merged record is supplied as the `extends` source for this model.

Cycles are detected and raise an error during `build-all`. The path may only contain lowercase letters, digits, and `-`, joined by a single `/`.

#### `manual_data`

A partial model record. Top-level scalar fields (`id`, `name`, `knowledge_cutoff`, …) win or lose as a whole. Nested groups (`features`, `pricing`, `limit`, `modalities`) merge **per sub-field**, so you can override `pricing.input` without disturbing `pricing.output`.

```toml
[manual_data.features]
attachment = false

[manual_data.modalities]
input = ["text"]
```

## Merge semantics

For each source in `priorities`, the merger collects whatever is present:

- **Scalar fields** (`id`, `name`, timestamps, `open_weights`): the first source in `priorities` that defines the field wins.
- **Nested groups** (`features`, `pricing`, `limit`, `modalities`): merged sub-field by sub-field. The first source in `priorities` that defines a sub-field wins for that sub-field.

A source is "missing" if its value is `undefined` or the source itself is not present (no `manual_data`, no `extends`, etc.).

After merging, the result is run through `normalizeModel` again — invalid combinations cause `build-all.ts` to fail loudly instead of writing bad data.

## Normalization

Model directory names are derived from the model id via `normalizeModelId`:

- Lower-cased
- Non-alphanumeric runs collapsed to `-`
- Leading and trailing `-` stripped

If two distinct model ids normalize to the same directory name, the updater logs a collision and the last-seen entry wins. Empty normalized names are rejected.

## Files at a glance

| File                                                     | Owner   | Purpose                                     |
| -------------------------------------------------------- | ------- | ------------------------------------------- |
| `data/providers/<provider>/index.toml`                   | human   | Provider metadata                           |
| `data/providers/<provider>/models/<model>/index.toml`    | updater | Latest validated snapshot from the provider |
| `data/providers/<provider>/models/<model>/metadata.toml` | human   | Optional overrides, inheritance, retention  |
| `data/all.json`                                          | updater | Aggregated, merged result for end consumers |
