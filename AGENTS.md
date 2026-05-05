# AI agent guidelines

If you're an AI agent, this file is for your reference.

## Useful commands

Typecheck: `bunx --bun tsc -b`.
Format: `bunx prettier . -w`.

## Rules

- Always use decimal.js for any arithmetic on prices, token counts, monetary values, and more where JS float point math could cause issues.
- Before adding a new provider, view several key files, and view at least 4 different providers and their associated files (e.g. openai, aihubmix, openrouter, etc.).
- Don't add comments to code, it should be self-documenting and written in a way that makes it easy to understand.
- Don't modify things that don't need to be modified, but be comprehensive. Use surgical edits.
- Don't use a subagent unless the user explicitly permits it.
- Add `agent-made:` to the start of your PR title to fast-track getting your PRs reviewed and merged.
