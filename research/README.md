AI Model Directory research outputs

This folder was generated during a deep analysis session focused on:

1. Does the repo already have an API?
2. Does the repo already have an MCP server?
3. What models are mentioned in currently open GitHub issues?
4. Based on open issue requirements, which models are missing required metadata fields?

Generated artifacts:

- `open-issues-scan.json`: Open issue scan with issue metadata and model mention extraction.
- `open-issues-models-recognized.txt`: Deduplicated model IDs found in open issues and matched against dataset IDs.
- `missing-fields-summary.json`: Summary counts for required fields from issue #5.
- `missing-fields-by-provider.tsv`: Provider-level missing-field totals and completeness rates.
- `missing-fields-by-model.tsv`: Model-level missing fields list (full list).
- `repo-api-mcp-verdict.md`: Yes/No verdict with in-repo evidence paths.
- `open-issues-models-list.md`: Human-readable issue scan and model list result.
- `web-evidence/web-research-api-mcp-options.md`: External web research and implementation options.
- `issue-5-openai-extends-candidates.tsv`: low-risk OpenAI date-suffixed model mappings to base models for `metadata.toml` extends.
- `issue-5-openai-partial-results.json`: baseline vs post-partial-fix completeness counts for the OpenAI extends remediation.
- `issue-5-safe-extends-candidates-all.tsv`: full no-key safe extends candidate list with source/provider/type.
- `issue-5-safe-extends-apply-report.json`: machine-readable apply report for generated metadata + index updates.
- `issue-5-safe-extends-results.json`: measured baseline vs after metrics for full safe rollout.
- `issue-5-safe-attachment-from-modalities-candidates.tsv`: models eligible for deterministic attachment inference.
- `issue-5-safe-attachment-results.json`: measured impact of attachment inference rollout.
- `issue-5-remaining-best-opportunities.tsv`: residual best-gain opportunities after major safe passes.
- `issue-5-remaining-opportunities-results.json`: measured impact of applying residual best-gain opportunities.
- `scripts/apply-safe-extends.ts`: reproducible script for generating/applying no-key safe extends.

Data source used for missing-field analysis:

- `data/all.min.json`

Issue basis used for missing-field analysis:

- `https://github.com/The-Best-Codes/ai-model-directory/issues/5`
