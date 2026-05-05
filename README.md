> [!IMPORTANT]
> This project is currently in beta. To get involved, [join us on Discord](https://www.agent-one.dev/discord), open an issue, or submit a PR. See [CONTRIBUTING.md](./CONTRIBUTING.md) for adding providers and editing model metadata.

# The AI Model Directory

The AI model directory is the most comprehensive, automatically updated directory of AI models. Data is stored as a tree of TOML files under `data/providers/`, and a flattened `data/all.json` (and minified `data/all.min.json`) is generated on every refresh. We're working on the docs!

## Why Does This Exist?

When building [AgentOne](https://www.agent-one.dev), I needed a comprehensive list of AI models and their metadata - costs, context windows, supported features, etc. - so AgentOne could allow easy access to _all_ models an AI model provider had.
I was frustrated with the existing options:

- Models.dev is not comprehensive (it's opinionated), and it often takes anywhere from a few days to weeks for frontier models to be added across all providers
- LiteLLM is much more comprehensive, but the data is fragmented and harder to work with
- Other catalogs are often developed with a certain product or service in mind, so they wind up being non-agnostic, not comprehensive, or not always up-to-date

The AI model directory aims to be easy to use (like Models.dev), truly comprehensive across all providers it includes, and [securely](#security) automatically updated.

## How Does It Work?

A GitHub Actions workflow runs every 24 hours and re-fetches model metadata from every supported provider (OpenRouter, OpenAI, Anthropic, etc.). Each provider has its own small adapter in `src/providers/` that knows how to talk to that provider's API or read its docs, and normalizes the response into a single shared schema covering things like:

- Pricing (input, output, reasoning, cache read/write, audio in/out)
- Context, input, and output token limits
- Input and output modalities (text, image, audio, video, file)
- Feature flags (attachments, reasoning, tool calls, structured output, temperature)
- Knowledge cutoff, release date, last updated, open weights

### Repository Layout

The directory tree looks like this:

```
data/
  all.json # generated: every provider + model in one JSON document
  all.min.json # generated: minified version of all.json
  providers/
    <provider>/
      index.toml # provider info (name, website, apiBaseUrl, aiSdk)
      models/
        <model-id>/
          index.toml # generated: normalized model metadata
          metadata.toml # optional: hand-authored manual_data, extends, priorities, preserve
```

Each `models/<model-id>/index.toml` is fully managed by the updater; it gets re-written every refresh. To customize, add a sibling `metadata.toml` (see [CONTRIBUTING.md](./CONTRIBUTING.md) for the full schema).

### Customizing With `metadata.toml`

`metadata.toml` lets you influence what ends up in the generated `index.toml` without forking a provider adapter. It supports:

- `manual_data`: a partial model record that is merged on top of fetched data (highest priority by default).
- `extends`: pull missing fields from another model that has already been ingested. Supports an `omit` array to drop specific fields from the source before merging.
- `priorities`: reorder how `manual_data`, `api`, and `extends` sources are combined.
- `preserve`: keep this model directory even if the provider stops listing it.

Example: a Perplexity-hosted model that should inherit most of its metadata from the OpenRouter version but ignore that source's pricing and context limit:

```toml
extends = { path = "openrouter/models/openai-gpt-5", omit = ["pricing", "limit.context"] }
```

To provide an experience similar to `models.dev/api.json`, the build also generates `data/all.json` (pretty) and `data/all.min.json` (minified) by reading the TOML tree.

## Security

Because the directory is updated automatically based on data fetched from third-party providers, the data here is only as trustworthy as the providers it comes from. If you're using this to make billing or routing decisions, treat it as a strong default and not as gospel. We have several measures in place to mitigate major vulnerabilities:

- Provider endpoints are hardcoded in source, so providers cannot redirect the updater to arbitrary user-controlled URLs
- All fetched data is validated against a shared strict Zod schema before it is written to disk, which helps prevent malformed or unexpected fields from slipping through
- Model IDs are normalized into safe directory names before writing, and entries whose normalized directory name would be empty are rejected
- If multiple model IDs normalize to the same directory name, we resolve that deterministically instead of writing multiple conflicting directories
- Terminal output is sanitized before logging, which reduces the risk of ANSI escape sequences or control characters spoofing the updater output
- Every network fetch has a 60 second timeout so a slow or hostile provider cannot hang the update job forever
- IDs and names are length-limited and reject raw control characters, which helps defend against weird escapes, invisible junk in logs, and other malformed provider output
- Generated model directories that no longer exist upstream are removed automatically on refresh, unless their `metadata.toml` sets `preserve = true`
- `metadata.toml` overrides stay local: they only apply to the model directory they live in and are merged on top of fetched data rather than modifying provider adapters or shared code
- The `extends` field is restricted to a slash-separated path inside `data/providers/`, so it cannot reach outside the repository or into arbitrary files
- Decimal arithmetic is used for any price/token math to avoid floating-point drift on values that get serialized into the TOML files
- The updater does not execute provider-supplied code, shell commands, or HTML; it only fetches remote content, parses it, validates it, and writes normalized TOML files

That said, this is still provider-supplied metadata. A provider can lie about pricing, capabilities, limits, or release dates, and some providers expose better metadata than others. So the goal here is to make the pipeline safe and robust, not to pretend third-party metadata is perfectly trustworthy.
