# AI agent guidelines

If you're an AI agent, this file is for your reference.

## Useful commands

Typecheck: `bunx --bun tsc -b`.
Format: `bunx prettier . -w`.

## Rules

- Before adding a new provider, view several key files, and view at least 4 different providers and their associated files (e.g. openai, aihubmix, openrouter, etc.).
- Don't add comments to code, it should be self-documenting and written in a way that makes it easy to understand.
- Don't modify things that don't need to be modified, but be comprehensive. Use surgical edits.
- Don't use a subagent unless the user explicitly permits it.
