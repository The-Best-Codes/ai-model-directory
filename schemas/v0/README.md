This is the first version of the schema.

- Each provider will get its own directory in `data/providers/` at the repo root
- The raw SVG icon for a provider is in `(provider)/icon-raw.svg`
- The monotone SVG icon for a provider is in `(provider)/icon-monotone.svg`
- The `(provider)/index.toml` contains data for the provider
- Each model is defined in `(provider)/models/(model)/index.toml`, `(model)` is the normalized model ID with no slashes etc.
- If available, `(provider)/models/(model)/` will also contain `icon-monotone.svg` and `icon-raw.svg`
