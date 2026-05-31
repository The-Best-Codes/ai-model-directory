import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine-oniguruma.mjs";
import { bundledLanguages } from "shiki/langs";
import darkPlus from "shiki/themes/dark-plus.mjs";
import lightPlus from "shiki/themes/light-plus.mjs";
import wasm from "shiki/wasm";

const globalRef = globalThis as unknown as {
  __shikiHighlighter?: ReturnType<typeof createHighlighterCore>;
};

const highlighter = (globalRef.__shikiHighlighter ??= createHighlighterCore({
  themes: [darkPlus, lightPlus],
  langs: Object.values(bundledLanguages),
  engine: createOnigurumaEngine(wasm),
}));

export default highlighter;
