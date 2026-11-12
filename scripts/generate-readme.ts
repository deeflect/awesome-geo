#!/usr/bin/env tsx
import { AI_BOTS, formatAiAccessLabel, readSitesFile, readReposFile } from './lib.js';

const { categories, sites } = await readSitesFile();
const { categories: repoCategories, repos } = await readReposFile();

// Build category lookup
const catMap = new Map(categories.map((c: any) => [c.id, c]));

// Group sites by category
const grouped = new Map<string, any[]>();
for (const site of sites) {
  const cat = site.category;
  if (!grouped.has(cat)) grouped.set(cat, []);
  grouped.get(cat)!.push(site);
}

// Sort each group by DR descending
for (const [, list] of grouped) {
  list.sort((a: any, b: any) => (b.dr ?? 0) - (a.dr ?? 0));
}

// Category order for the README
const categoryOrder = [
  'developer-profiles',
  'business-directories',
  'content-syndication',
  'community-platforms',
  'social-profiles',
  'knowledge-bases',
  'design-portfolios',
  'niche-directories',
  'social-bookmarking',
];

const totalSites = sites.length;
const verifiedCount = sites.filter((s: any) => s.verified).length;
const sampleProfileCount = sites.filter((s: any) => Boolean(s.sampleProfile)).length;
const rootFallbackCount = totalSites - sampleProfileCount;
const aiOpenCount = sites.filter((s: any) => {
  if (!s.aiAccess) return false;
  return ['oaiSearchBot', 'gptBot', 'claudeBot', 'perplexityBot', 'googleExtended'].some((b) => s.aiAccess[b] === 'allowed');
}).length;
const highCount = sites.filter((s: any) => s.geoTier === 'high').length;
const medCount = sites.filter((s: any) => s.geoTier === 'medium').length;
const lowCount = sites.filter((s: any) => s.geoTier === 'low').length;

// Repo stats
const totalRepos = repos.length;
const repoCatMap = new Map(repoCategories.map((c: any) => [c.id, c]));
const repoGrouped = new Map<string, any[]>();
for (const repo of repos) {
  const cat = repo.category;
  if (!repoGrouped.has(cat)) repoGrouped.set(cat, []);
  repoGrouped.get(cat)!.push(repo);
}
// Sort each repo group by stars descending
for (const [, list] of repoGrouped) {
  list.sort((a: any, b: any) => (b.stars ?? 0) - (a.stars ?? 0));
}
const repoCategoryOrder = repoCategories.map((c: any) => c.id);

let md = `# Awesome GEO [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of **${totalSites} free platforms** and **${totalRepos} open-source repos & tools** for **Generative Engine Optimization (GEO)** — SEO for the AI era.
>
> Browse it with scores, search and free tools at **[geo.deeflect.com](https://geo.deeflect.com)**.

## Why GEO?

**Generative Engine Optimization** is SEO for the AI era. ChatGPT, Perplexity, Gemini, and Google's AI Overviews and AI Mode now answer many queries directly, so your online presence needs to be discoverable by machines — not just humans.

- An [IMC 2026 measurement of Google AI Overviews](https://arxiv.org/abs/2605.14021) found them on 13.7% of 55,393 queries, and on 64.7% of question-form queries
- [Pew Research Center (2025)](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) found users clicked a traditional result in 8% of visits with an AI summary, against 15% without one

[Semrush's 2025 study](https://www.semrush.com/blog/backlinks-ai-search-study/) on 1,000 domains found:
- **Authority matters**, but correlation varies by engine and metric
- **Nofollow links still matter** and were close to follow links in observed impact
- **Threshold effects matter** more than naive linear authority scoring
- **Backlink context and surface type** matter more than raw link volume alone

This list helps you build that foundation — for free.

## Stats

| Metric | Count |
|--------|-------|
| Total platforms | ${totalSites} |
| Open-source repos & tools | ${totalRepos} |
| Automated checks completed | ${verifiedCount} |
| Representative public pages seeded | ${sampleProfileCount} |
| Root-fallback checks | ${rootFallbackCount} |
| AI-discoverable (at least 1 major crawler allowed) | ${aiOpenCount} |
| 🟢 High GEO value (75+) | ${highCount} |
| 🟡 Medium GEO value (50-74) | ${medCount} |
| 🔴 Low GEO value (<50) | ${lowCount} |

## Quick Start

\`\`\`bash
npm install
npm run validate
\`\`\`

This repo is data-first: \`data/sites/*.yaml\` and \`data/repos/*.yaml\` are the source of truth, and \`README.md\` is generated from them.

Useful commands:

- \`npm run validate\` — typecheck, validate YAML data integrity, regenerate \`README.md\`
- \`npm run verify-all\` — re-check all platform entries live
- \`npm run refresh-authority\` — refresh Open PageRank and Tranco metrics
- \`npm run refresh-ai-access\` — refresh robots.txt crawler access signals

Environment:

- \`OPENPAGERANK_API_KEY\` is required for authority verification workflows

## Contents

`;

// Table of contents
for (const catId of categoryOrder) {
  const cat = catMap.get(catId);
  const list = grouped.get(catId);
  if (!cat || !list || list.length === 0) continue;
  const anchor = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
  md += `- [${cat.name}](#${anchor}) (${list.length})\n`;
}

md += `- [Open-Source Repos & Tools](#open-source-repos--tools)\n`;
for (const catId of repoCategoryOrder) {
  const cat = repoCatMap.get(catId);
  const list = repoGrouped.get(catId);
  if (!cat || !list || list.length === 0) continue;
  const anchor = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
  md += `  - [${cat.name}](#${anchor}) (${list.length})\n`;
}
md += `- [AI Discoverability](#ai-discoverability)
- [Research & Reading](#research--reading)
- [Contributing](#contributing)
- [Maintainer](#maintainer)

---

## Platforms

> Core signals are checked automatically. Authority is a normalized Open PageRank score, and popularity is based on Tranco rank. GEO score is a reference-likelihood model weighted toward crawl access, popularity, query fit, indexability, authority, and link value.
>
> Representative public pages are currently seeded for **${sampleProfileCount}/${totalSites}** platforms. Remaining entries fall back to the platform root until a better public page is sourced.
> 
> Legend: ✅ Open (all major crawlers checked) · ⚠️ Partial · ❌ Blocked

`;

function renderTable(list: any[]): string {
  let t = `| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |\n`;
  t += `|----------|-----------|-----------|--------|-----------|-----------|-------|\n`;
  for (const site of list) {
    const dr = site.dr != null ? String(site.dr) : '—';
    const linkType = site.linkType ?? '—';
    const effort = site.effort ?? '—';
    const ai = formatAiAccessLabel(site.aiAccess);
    const geo = site.geoScore != null ? `${site.geoScore}/100` : '—';
    const desc = (site.description ?? '').replace(/\|/g, '\\|');
    t += `| [${site.name}](${site.url}) | ${dr} | ${linkType} | ${effort} | ${ai} | ${geo} | ${desc} |\n`;
  }
  return t;
}

// Generate tables per category, split by GEO tier
for (const catId of categoryOrder) {
  const cat = catMap.get(catId);
  const list = grouped.get(catId);
  if (!cat || !list || list.length === 0) continue;

  const high = list.filter((s: any) => s.geoTier === 'high');
  const medium = list.filter((s: any) => s.geoTier === 'medium');
  const low = list.filter((s: any) => s.geoTier === 'low');

  md += `### ${cat.name}\n\n`;
  md += `> ${cat.description}\n\n`;

  if (high.length > 0) {
    md += `#### 🟢 High GEO Value\n\n`;
    md += renderTable(high);
    md += `\n`;
  }

  if (medium.length > 0) {
    md += `<details>\n<summary>🟡 Medium GEO Value (${medium.length} platforms)</summary>\n\n`;
    md += renderTable(medium);
    md += `</details>\n\n`;
  }

  if (low.length > 0) {
    md += `<details>\n<summary>🔴 Low GEO Value (${low.length} platforms)</summary>\n\n`;
    md += renderTable(low);
    md += `</details>\n\n`;
  }
}

// Repos & Tools section
md += `---

## Open-Source Repos & Tools

> GitHub repositories, libraries, and tools for GEO optimization — sorted by stars.

`;

const TYPE_LABELS: Record<string, string> = {
  tool: '🔧 Tool',
  library: '📦 Library',
  research: '🔬 Research',
  reference: '📚 Reference',
  standard: '📐 Standard',
  skill: '🤖 Skill',
  framework: '⚙️ Framework',
};

function renderRepoTable(list: any[]): string {
  let t = `| Repository | Stars | Type | Language | Description |\n`;
  t += `|------------|-------|------|----------|-------------|\n`;
  for (const repo of list) {
    const stars = repo.stars != null ? (repo.stars >= 1000 ? `${(repo.stars / 1000).toFixed(1)}k` : String(repo.stars)) : '—';
    const typeLabel = TYPE_LABELS[repo.type] ?? repo.type;
    const lang = repo.language ?? '—';
    const desc = (repo.description ?? '').replace(/\|/g, '\\|');
    t += `| [${repo.name}](${repo.url}) | ⭐ ${stars} | ${typeLabel} | ${lang} | ${desc} |\n`;
  }
  return t;
}

for (const catId of repoCategoryOrder) {
  const cat = repoCatMap.get(catId);
  const list = repoGrouped.get(catId);
  if (!cat || !list || list.length === 0) continue;

  md += `### ${cat.name}\n\n`;
  md += `> ${cat.description}\n\n`;
  md += renderRepoTable(list);
  md += `\n`;
}

// Static sections
md += `---

## AI Discoverability

### Structured Data

| What | Why | Resources |
|------|-----|-----------|
| JSON-LD Schema | Helps AI understand your entity | [Schema.org](https://schema.org), [Google Rich Results Test](https://search.google.com/test/rich-results) |
| Person Schema | "Who are you" for LLMs | \`@type: Person\` with sameAs links |
| Organization Schema | "What is your company" | \`@type: Organization\` with founder, URL |
| Article Schema | Helps AI cite your content | \`@type: Article\` with author, datePublished |

### AI-Specific Standards

| Standard | What it does | Adoption |
|----------|-------------|----------|
| [llms.txt](https://llmstxt.org) | Markdown summary that helps agents and users find AI-readable site context. [v2 of the proposal](https://llmstxt.org/changes.html) (September 2026) adds \`rel="alternate"\` / \`rel="describedby"\` link relations and path-scoped files | Proposal; Chrome Lighthouse [audits it](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt); little evidence AI engines fetch it |
| [llms-full.txt](https://llmstxt.org) | Expanded markdown content for deeper manual or agent ingestion | Emerging |
| robots.txt AI rules | Control which AI bots can crawl | Standard |
| [Content Signals](https://contentsignals.org) | robots.txt \`Content-Signal\` line stating preferences for \`search\`, \`ai-input\`, and \`ai-train\` | Cloudflare proposal |
| [RSL](https://rslstandard.org/rsl) | Machine-readable licensing and payment terms for AI use of content | RSL 1.0 published December 2025 |
| [WebMCP](https://github.com/webmachinelearning/webmcp) | Lets a page expose tools that in-browser AI agents can call | W3C Community Group draft; Chrome origin trial |

### Optimization Guides

- [LLMO Citation Matrix](docs/llmo-citation-matrix.md) — how each AI engine finds and cites pages, the crawler controls, and what 2026 research found
- [Answer-First Content](docs/answer-first-content.md) — structure pages so humans and answer engines can extract claims cleanly
- [Schema sameAs Quality](docs/schema-sameas.md) — choose identity links that improve disambiguation instead of inflating profile count

### Official Guidance

- [Google: Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): Google's best practices for AI Overviews and AI Mode
- [Google: Search Console generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports): impressions in AI Overviews, AI Mode and Discover; rolled out to all websites on August 31, 2026
- [Google: Search generative AI control](https://support.google.com/webmasters/answer/16908024): Search Console setting for a site's inclusion in AI Overviews, AI Mode and Discover generative AI features
- [Bing: AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview): citations in Microsoft Copilot, Bing AI summaries and select partners (public preview, February 2026)
- [IndexNow documentation](https://www.indexnow.org/documentation): notify participating search engines of added, updated or deleted URLs, up to 10,000 per request
- [Cloudflare: What is Pay Per Crawl?](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/): set a price for AI crawler access, answered with HTTP 402 when no payment is sent (closed beta)

### Free Hosted Tools (not open source)

- [Ahrefs AI Visibility Checker](https://ahrefs.com/ai-visibility-checker): one-time snapshot of brand mentions in ChatGPT, Gemini, Perplexity, Copilot, AI Overviews and AI Mode; no signup, top 5 results per section
- [LLM Pulse Brand Mention Checker](https://llmpulse.ai/brand-mention-checker): one free report per email covering mentions, citations and sentiment in ChatGPT, Perplexity, Gemini, AI Mode and AI Overviews; submitting also subscribes you to its newsletter
- [Bing Webmaster Tools](https://www.bing.com/webmasters): free account; the AI Performance report shows citations in Copilot and Bing AI answers
- [Google Search Console generative AI reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports): impressions by page, country, device and date in AI Overviews and AI Mode, for all websites since August 31, 2026

### AI Crawler User-Agents

Tokens and purposes as stated in each vendor's docs (linked). Tokens marked *robots.txt only* never appear in request headers.

| Company | robots.txt token | Purpose |
|---------|------------------|---------|
${AI_BOTS.map((b) => `| ${b.docsUrl ? `[${b.company}](${b.docsUrl})` : b.company} | \`${b.ua}\` | ${b.robotsOnly ? '*robots.txt only*: ' : ''}${b.purpose} |`).join('\n')}

**Preference signals.** An [IETF draft](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/) defines a \`__usage_ai-training\` robots.txt group that states a preference about AI training across providers. [Anthropic](https://support.claude.com/en/articles/8896518) recognizes it as of October 30, 2026, and rules that name ClaudeBot take priority. [Bing](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/) will honor it from February 1, 2027, plus page-level \`ai-training\` and \`ai-grounding\` meta preferences. [Google](https://developers.google.com/search/blog/2026/10/ai-training-control) aims to support the shared token in 2027 and treats an opt-out as a Google-Extended disallow when Google-Extended is not named.

---

## Research & Reading

### Academic Papers

| Paper | Year | Key Finding |
|-------|------|-------------|
| [GEO: Generative Engine Optimization](https://arxiv.org/abs/2311.09735) | 2024 (KDD) | The foundational GEO paper — GEO-BENCH benchmark; reports up to 40% visibility gains from adding statistics and citations in its benchmark setting |
| [Ranking Manipulation for Conversational Search Engines](https://aclanthology.org/2024.emnlp-main.534/) | 2024 (EMNLP) | Shows how conversational search ranking can be manipulated; useful safety caveat for GEO tactics |
| [What Evidence Do Language Models Find Convincing?](https://aclanthology.org/2024.acl-long.403/) | 2024 (ACL) | Studies which evidence characteristics influence RAG-style language model answers |
| [How to Dominate AI Search](https://arxiv.org/abs/2509.08919) | 2025 | AI search has systematic bias toward earned media over brand-owned content; engine-specific strategies needed |
| [C-SEO Bench](https://arxiv.org/abs/2506.11097) | 2025 (NeurIPS D&B) | Benchmark testing whether conversational SEO methods work across QA and product recommendation settings |
| [AutoGEO](https://arxiv.org/abs/2510.11438) | 2026 (ICLR) | Learns generative-engine preferences and extracts content optimization rules |
| [Role-Augmented Intent-Driven G-SEO](https://arxiv.org/abs/2508.11158) | 2025 | Extends GEO-BENCH with intent modeling across informational roles; introduces G-Eval 2.0 |
| [E-GEO: GEO for E-Commerce](https://arxiv.org/abs/2511.20867) | 2025 (NeurIPS 2026 E&D) | First e-commerce GEO benchmark — 7,000+ consumer product queries with rich intent and constraints |
| [SAGEO Arena](https://arxiv.org/abs/2602.12187) | 2026 (KDD) | Realistic search-augmented GEO evaluation across retrieval, reranking, generation, and structured web-document signals |
| [Diagnosing and Repairing Citation Failures in GEO](https://arxiv.org/abs/2603.09296) | 2026 | Introduces citation failure modes and AgentGEO, a targeted repair system that improves citation rates with limited content edits |
| [AgenticGEO](https://arxiv.org/abs/2603.20213) | 2026 | Self-evolving agentic GEO system for content-conditioned optimization under black-box generative engines |
| [From Citation Selection to Citation Absorption](https://arxiv.org/abs/2604.25707) | 2026 | Separates citation selection from answer-level absorption across ChatGPT, Google, Gemini, and Perplexity citation data |
| [MAGEO](https://arxiv.org/abs/2604.19516) | 2026 (ACL Findings) | Multi-agent GEO framework that learns reusable, engine-specific optimization strategies with fidelity-aware evaluation |
| [Measuring Google AI Overviews](https://arxiv.org/abs/2605.14021) | 2026 (IMC) | AI Overviews appeared on 13.7% of 55,393 queries (64.7% of question-form queries); about 30% of cited domains were not in first-page results and 11.0% of claims were unsupported |
| [AI in Search Reduces Publisher Referrals](https://arxiv.org/abs/2608.18352) | 2026 | Preregistered field experiment on Google Search (N=1,100): removing AI Overviews and AI Mode raised clicks to publishers; an AI Mode-only experience lowered clicks and user trust |
| [The Impact of AI Search on the Online Content Ecosystem](https://arxiv.org/abs/2605.16428) | 2026 | Studies how Google AI Overviews changed activity on Reddit communities |
| [Critical Survey of GEO (2023–2026)](https://arxiv.org/abs/2607.14035) | 2026 | Reviews 45 studies; topical relevance and context position are the most reproducible levers, and the foundational paper's gains hold only when a source is already in the model's context |
| [What Drives AI Citations?](https://arxiv.org/abs/2610.15033) | 2026 | 158,099 answers with 468,037 citations: the engine's own retrieval explains far more variation than page properties (32% vs. 2.8%) |
| [Understanding ChatGPT Citations](https://arxiv.org/abs/2610.15382) | 2026 | Traces query rewriting, retrieval, and citation across ChatGPT 5.2–5.5 settings; pages retrieved more often are cited more often |
| [LIVE-GEO](https://arxiv.org/abs/2611.01126) | 2026 | Tests five GEO strategies on live webpages across ChatGPT, Gemini, and Grok; engines agreed on the top product for only 48.8–66.3% of brands |
| [Measuring GEO Visibility](https://arxiv.org/abs/2609.06811) | 2026 | Argues that the prompt corpus and weights behind a GEO visibility score define an "answer market" that may not match real demand |
| [Synthetic Sources?](https://arxiv.org/abs/2605.23684) | 2026 | Allaham and Diakopoulos audit 712 real queries on politics, health and environment across ChatGPT, Copilot, Gemini and Perplexity; about 16% of cited sources were AI-generated |
| [Scoring With the Engine](https://arxiv.org/abs/2609.22655) | 2026 | Single-author audit of 15 commercial prompts, 589 citations, 4 engines: 84.9% of engine pairs shared no cited URL; engine-free page scores estimate something narrower than end-to-end visibility |
| [CITECHOICE](https://arxiv.org/abs/2609.15164) | 2026 | Preprint; 113 same-call document pairs in agentic search: structured rendering adds about 0.5 citations per answer to the target without raising total citations, so it shifts credit rather than admitting more sources |
| [Manifest-Assisted Retrieval in AI Search](https://arxiv.org/abs/2610.38361) | 2026 (IEEE FLLM) | Finds no isolated evidence that llms.txt-style manifests improve AI retrieval, and evaluates their security risks |
| [Counter-GEO-Bench](https://arxiv.org/abs/2609.02316) | 2026 (EMNLP) | Benchmark of defenses against information-distorting GEO; off-the-shelf defenses cut attack success by at most 5.7% relative |
| [Position: GEO Creates Underexamined Risks](https://arxiv.org/abs/2606.12439) | 2026 (ICML Position) | Argues governance should target concentration, disclosure, and academic blind spots in GEO |
| [The SEO-to-GEO Gap](https://doi.org/10.2139/ssrn.6476021) | 2026 (SSRN) | Kargaev compares traditional SEO and GEO ranking-factor evidence and argues for a reweighting model rather than SEO replacement |
| [SEEN: A Four-Layer Framework for GEO](https://doi.org/10.2139/ssrn.6815500) | 2026 (SSRN) | Kargaev groups GEO work into four layers: Structure, Evidence, Entity and Notability |
| [Beyond SEO: Transformer-Based Web Content Optimisation](https://arxiv.org/abs/2507.03169) | 2025 | Fine-tuned BART transformer for domain-specific GEO content optimization |
| [GEO and Sponsored Search Bidding](https://ssrn.com/abstract=5365040) | 2025 | Game-theoretic model of AI Overviews, GEO investment incentives, sponsored search bidding, and search-engine revenue effects |
| [LLMs Generating Text with Citations](https://arxiv.org/abs/2305.14627) | 2023 (EMNLP) | ALCE benchmark for automatic citation evaluation — fluency, correctness, and citation quality |

### Industry Studies

- [Pew Research Center: Google users are less likely to click links when AI summaries appear](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) — 68,879-search panel study from 900 U.S. adults
- [Semrush: Do Backlinks Still Matter in AI Search?](https://www.semrush.com/blog/backlinks-ai-search-study/) — 1,000 domain study on authority vs. AI citation correlation
- [Semrush: AI Overviews Study](https://www.semrush.com/blog/semrush-ai-overviews-study/) — 10M+ keyword analysis of AI Overview trigger rates, intent patterns, and zero-click behavior
- [Semrush: Google AI Mode vs. Traditional Search & Other LLMs](https://www.semrush.com/blog/ai-mode-comparison-study/) — platform-comparison study on AI Mode, AI Overviews, ChatGPT, and Perplexity citation overlap
- [Ahrefs: AI Overviews Reduce Clicks](https://ahrefs.com/blog/ai-overviews-reduce-clicks/) — 300,000-keyword study (April 2025) linking AI Overviews to a 34.5% lower CTR for the top result
- [BrightEdge: AI Overview Citations Now 54% from Organic Rankings](https://www.brightedge.com/resources/weekly-ai-search-insights/rank-overlap-after-16-months-of-aio): vendor data across 9 industries, May 2024 to September 2025; overlap grew from 32.3% to 54.5%
- [Ahrefs: 38% of AI Overview Citations Pull From The Top 10](https://ahrefs.com/blog/ai-overview-citations-top-10/): vendor study of 863K keyword SERPs and 4M AI Overview URLs (March 2026); 37.9% of cited URLs also ranked in the top 10
- [Botify: OpenAI Has Tripled Their Crawl of the Web](https://www.botify.com/blog/openai-tripled-web-crawl): about 7B server log events from Botify's dataset, November 2024 to March 2026; OAI-SearchBot up 3.5x and GPTBot up 2.9x since August 2025, ChatGPT-User down 28%
- [Otterly.AI: The AI Citation Economy](https://otterly.ai/blog/the-ai-citations-report-2026/) — 1M+ data points on visibility in 2026; community platforms capture 52.5% of citations
- [DeltaV Digital: AI Search Citations Study](https://www.deltavdigital.com/resources/reports/ai-citation-study/) — 21,075 responses across five engines (April–July 2026); the most-cited page type differs by industry
- [Goodie: AI Citations & News Publishers](https://higoodie.com/blog/publishers-and-ai-search-study/) — 31M citations (October 2025–July 2026) and robots.txt audits of 105 publishers; blocking only affects labs that honor it
- [Superlines: 60+ AI Search Statistics](https://www.superlines.io/articles/ai-search-statistics/) — Verified data points on visibility, citations, and traffic across ChatGPT, Perplexity, and AI Mode
- [Superlines: State of GEO Q1 2026](https://www.superlines.io/articles/the-state-of-geo-in-q1-2026) — Quarterly benchmarks and market data

### Practitioner Tests

Small first-party tests on a single site; read them as anecdotes, not benchmarks.

- [The GEO Lab: ChatGPT Crawled Label vs OAI-SearchBot](https://thegeolab.net/chatgpt-crawled-label-oai-searchbot/): one site, 16 verified OAI-SearchBot visits in October 2026; the "Crawled" label did not reliably reflect the latest visit
- [LumenGeo: 12 Days of AI Crawler Logs](https://lumengeo.co/blog/ai-crawler-traffic-study-2026): one site, 2,746 AI bot fetches in June 2026; agent fetches were 48.5%, training-only crawls 23.2%

### Standards & Specifications

- [llms.txt Specification](https://llmstxt.org) — Jeremy Howard's proposed standard for making sites AI-readable; [changelog](https://llmstxt.org/changes.html) covers v2 of the proposal (September 2026)
- [Chrome Lighthouse: Agentic Browsing](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt) — Lighthouse audit category that checks llms.txt and WebMCP readiness
- [WebMCP](https://github.com/webmachinelearning/webmcp) — W3C Web Machine Learning Community Group draft for exposing page tools to in-browser agents
- [IETF AI Preferences (aipref)](https://datatracker.ietf.org/wg/aipref/about/) — working group drafting a vocabulary for AI usage preferences and how to attach it via robots.txt and HTTP
- [IETF Web Bot Auth (webbotauth)](https://datatracker.ietf.org/wg/webbotauth/about/) — working group on cryptographic authentication of bots and agents using HTTP message signatures
- [RSL 1.0](https://rslstandard.org/rsl) — Really Simple Licensing: machine-readable terms for AI use of web content (December 2025)
- [Content Signals](https://contentsignals.org) — robots.txt preferences for search, AI input, and AI training
- [MCP Registry](https://modelcontextprotocol.io/registry/about) — registry for publishing and discovering Model Context Protocol servers
- [Schema.org](https://schema.org) — Structured data vocabulary used by all major search engines and AI crawlers
- [Springer: GEO Encyclopedia Entry](https://link.springer.com/rwe/10.1007/978-3-031-75316-9_68-1) — Formal reference entry for Generative Engine Optimization

---

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

### Add a platform

Add an entry to the appropriate \`data/sites/*.yaml\` file and submit a PR. CI automatically verifies authority, AI crawler access, link type, and calculates a GEO score.

### Add a repo or tool

Add an entry to the appropriate \`data/repos/*.yaml\` file and submit a PR. CI verifies the repo exists, checks star count, age, and flags archived or forked repos.

### Or just open an issue

Use our [issue templates](https://github.com/deeflect/awesome-geo/issues/new/choose) to submit a platform or repo — no YAML editing required.

---

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related rights to this work.

No attribution is required. If you do cite the list, use the "Cite this repository" button or [CITATION.cff](CITATION.cff): Kargaev, D. (2026). *Awesome GEO*. https://github.com/deeflect/awesome-geo

---

## Maintainer

Curated by [Dmitry (Dee) Kargaev](https://deeflect.com), a design engineer and independent GEO researcher. He wrote [The SEO-to-GEO Gap](https://doi.org/10.2139/ssrn.6476021) and [SEEN: A Four-Layer Framework for Generative Engine Optimization](https://doi.org/10.2139/ssrn.6815500) (both SSRN, 2026) and runs [geo.deeflect.com](https://geo.deeflect.com), the browsable version of this list.

Submit a platform, fix an entry, or just star it if you found something useful. CC0 — take it, fork it, ship it.

Working on GEO and want this built into your stack? [dee.agency](https://dee.agency?utm_source=awesomegeo&utm_medium=readme).

[deeflect.com](https://deeflect.com) · [ORCID](https://orcid.org/0009-0001-4788-2675) · [Google Scholar](https://scholar.google.com/citations?user=gEVwv4QAAAAJ) · [SSRN](https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=10899908) · [Wikidata](https://www.wikidata.org/entity/Q138828544) · [LinkedIn](https://www.linkedin.com/in/dkargaev/) · [X](https://x.com/deeflectcom)
`;

import { writeFile } from 'node:fs/promises';
import YAML from 'yaml';
import { fileURLToPath } from 'node:url';
const readmePath = fileURLToPath(new URL('../README.md', import.meta.url));
await writeFile(readmePath, md);

// Crawler list as data for the companion website
const crawlers = AI_BOTS.map(({ ua, key, company, group, purpose, docsUrl, robotsOnly }) => ({ ua, key, company, group, purpose, docsUrl, robotsOnly }));
await writeFile(fileURLToPath(new URL('../data/crawlers.yaml', import.meta.url)), `# Generated from AI_BOTS in scripts/lib.ts by scripts/generate-readme.ts. Do not edit by hand.\n\n${YAML.stringify(crawlers)}`);
console.log(`✅ README.md generated with ${totalSites} platforms across ${grouped.size} categories`);
