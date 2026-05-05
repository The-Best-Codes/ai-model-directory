# ai-model-directory

Bundled version of [the AI Model Directory's](https://github.com/The-Best-Codes/ai-model-directory) `data/all.min.json` with a compact typed payload.

## Usage

```ts
import { openai } from "ai-model-directory";

console.log(openai.models["gpt-5.5"]?.pricing?.input);
```
