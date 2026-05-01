There's an example model toml file in `./.schemas/v0/data/providers/openrouter/models/openai-gpt-5/index.toml`. That schema is supposed to be exhaustive - provider updates should extract as much of that data as possible, but add no extra stuff.
Before adding a new provider or updater, view at least 3 provider files, 3 updater files, the progress.ts file, and the index.ts file.
