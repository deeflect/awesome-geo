# LLMO Citation Matrix

Different answer engines cite different kinds of sources. Treat this as a planning heuristic, not a stable ranking formula.

| Engine | Often-cited surfaces | Practical implication |
|--------|----------------------|-----------------------|
| ChatGPT Search | Wikipedia, editorial sites, high-authority explainers, brand/service pages | Build corroborated entity pages and earn mentions from sources that summarize facts clearly. |
| Perplexity | Reddit, fresh web pages, cited articles, technical/community discussions | Keep canonical pages crawlable and participate where niche questions are already being discussed. |
| Google AI Overviews | Google-indexed pages, entity graph signals, YouTube, Reddit, Quora, LinkedIn | Traditional SEO still matters; pair it with structured data, answer-first sections, and entity consistency. |
| Claude with web search | High-authority editorial and documentation-style pages | Favor well-sourced, conservative claims over aggressive promotional copy. |
| Gemini | Mixed retrieval from Google's index, community surfaces, and entity-rich pages | Use the same foundations as AI Overviews, then reinforce with public corroboration. |

## What To Optimize

- Publish pages that answer common entity and product questions directly.
- Use semantic HTML, descriptive headings, and JSON-LD for people, organizations, articles, products, and FAQs.
- Keep key facts consistent across controlled profiles, directories, bylines, and community accounts.
- Add `lastModified` dates and update important pages when facts change.
- Monitor cited URLs, not only brand mentions. The cited page often matters more than the domain.

## What Not To Infer

- A high citation rate for one platform does not mean that platform is training-data dominant.
- `llms.txt` is useful defensive infrastructure, but it should not replace crawlable pages, structured data, or real third-party corroboration.
- Entity and citation studies are usually vendor or benchmark snapshots. Re-check before making large strategic decisions.
