# The AI Model Directory

The AI model directory is the most comprehensive, automatically updated directory of AI models.

## Why Does This Exist?

When building [AgentOne](https://www.agent-one.dev), I needed a comprehensive list of AI models and their metadata - costs, context windows, supported features, etc. - so AgentOne could allow easy access to _all_ models an AI model provider had.
I was frustrated with the existing options:

- Models.dev is not comprehensive (it's opinionated), and it often takes anywhere from a few days to weeks for frontier models to be added across all providers
- LiteLLM is much more comprehensive, but the data is fragmented and harder to work with
- Other catalogs are often developed with a certain product or service in mind, so they wind up being non-agnostic, comprehensive, or always up-to-date

The AI model registry aims to be easy to use (like Models.dev), truly comprehensive across all providers it includes, and [securely](#security) automatically updated.

## How Does It Work?

It works by doing something. ABC. Write this later.

## Security

Because the directory is updated automatically based on JSON fetched from third-party providers, we inherently can not guarantee the integrity of the data we provide. However, we have several measures in place to mitigate major vulnerabilities:

(Write about them here).
