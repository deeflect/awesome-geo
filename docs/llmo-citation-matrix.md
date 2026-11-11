# LLMO Citation Matrix

How each answer engine finds the pages it cites, what you control, and what research says. Rows are based on vendor docs. Studies are snapshots, so re-check them before making big decisions.

Last reviewed: 2026-11-10

## By Engine

| Engine | How it finds pages (vendor docs) | Your control | What studies found |
|--------|----------------------------------|--------------|--------------------|
| Google AI Overviews, AI Mode | Google Search index. A page must be indexed and eligible for a snippet; there are no extra requirements. Both may use "query fan-out" across subtopics ([Google](https://developers.google.com/search/docs/appearance/ai-features)) | Googlebot in robots.txt; `nosnippet`, `data-nosnippet`, `max-snippet`. `Google-Extended` does not affect Search | AI Overviews appeared on 13.7% of 55,393 queries; nearly 30% of cited domains were not in the first-page results ([IMC 2026](https://arxiv.org/abs/2605.14021)). AI Mode sidebar links had ~54% domain overlap with the top 10 ([Semrush, June 2025](https://www.semrush.com/blog/ai-mode-comparison-study/)) |
| ChatGPT search | `OAI-SearchBot` surfaces sites. Opted-out sites are not shown in answers, though they can still appear as navigational links ([OpenAI](https://developers.openai.com/api/docs/bots)). It sometimes sends rewritten queries to partner search providers, including Microsoft ([OpenAI Help](https://help.openai.com/en/articles/9237897-chatgpt-search)) | `OAI-SearchBot` for search, `GPTBot` for training, set independently | Every page ChatGPT cited was one its own search retrieved; retrieval explained 32% of variation against 2.8% for page properties ([2610.15033](https://arxiv.org/abs/2610.15033)). Pages retrieved more often are cited more often ([2610.15382](https://arxiv.org/abs/2610.15382)) |
| Perplexity | `PerplexityBot` surfaces and links sites in results and is not used for model training ([Perplexity](https://docs.perplexity.ai/guides/bots)) | `PerplexityBot`; `Perplexity-User` for user-requested fetches | Over 91% domain overlap with Google's top 10 ([Semrush, June 2025](https://www.semrush.com/blog/ai-mode-comparison-study/)) |
| Claude with web search | `Claude-SearchBot` indexes content to improve search results; blocking it may reduce visibility ([Anthropic](https://support.claude.com/en/articles/8896518)). Every response includes citations ([Claude Help](https://support.claude.com/en/articles/10684626-enabling-and-using-web-search)) | `Claude-SearchBot`, `Claude-User`, `ClaudeBot` (training) | No public study found that is specific to Claude citations |
| Microsoft Copilot, Bing | Bing and Copilot use the same crawling, indexing and ranking foundation as Bing search. Sitemaps and IndexNow support "grounding eligibility" ([Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)) | robots.txt and meta directives, sitemaps, IndexNow | No public study checked |
| Gemini app | `Google-Extended` controls whether Google-crawled content is used for Gemini training and grounding ([Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)) | `Google-Extended` (robots.txt token only) | No public study checked |

Full crawler list: [AI Crawler User-Agents](../README.md#ai-crawler-user-agents).

## Across Engines

- Engines disagree. On live pages, ChatGPT, Gemini and Grok picked the same top product for only 48.8–66.3% of brands ([LIVE-GEO](https://arxiv.org/abs/2611.01126)).
- AI search leans toward earned third-party media over brand-owned content ([2509.08919](https://arxiv.org/abs/2509.08919)).
- Brand mentions on Reddit (0.75) and on other webpages (0.70) correlate with how often AI answers name a brand. This is a correlation from a vendor study ([Ahrefs, November 2026](https://ahrefs.com/blog/mention-types-ai-visibility/)).
- Wikipedia, YouTube and Reddit were the most-linked sources in both Google AI summaries and standard results ([Pew, 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)).
- The most-cited page type differs by industry. Listicles earned 61% of citations in B2B tech services and 0% in healthcare ([DeltaV, 2026](https://www.deltavdigital.com/resources/reports/ai-citation-study/)).
- Blocking only affects crawlers that honor it. One study counted 37,642 Grok citations to a publisher that blocks AI crawlers ([Goodie, 2026](https://higoodie.com/blog/publishers-and-ai-search-study/)).

## What To Do

- Get indexed first. Every engine above cites from a search index or its own retrieval, so crawlable, indexable pages come before anything else.
- Allow the search crawlers you want to appear in (Googlebot, `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`), and decide on the training tokens separately.
- Earn mentions on third-party sites and communities where your topic is already discussed.
- Track cited URLs, not only brand mentions, and treat a single run as noise.

## What Not To Infer

- Google says you don't need new machine-readable files, AI text files or special schema to appear in AI Overviews or AI Mode ([Google](https://developers.google.com/search/docs/appearance/ai-features)). One paper found no isolated evidence that `llms.txt`-style files help AI retrieval ([2610.38361](https://arxiv.org/abs/2610.38361)). Ship `llms.txt` for agents and docs, not as a citation lever.
- A high citation share for one site in one study is a snapshot of that prompt set. The prompt corpus defines what a visibility score measures ([2609.06811](https://arxiv.org/abs/2609.06811)).
- Correlation studies don't show what causes citations.
