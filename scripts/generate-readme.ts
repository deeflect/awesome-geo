#!/usr/bin/env tsx
import { formatAiAccessLabel, readSitesFile, readReposFile } from './lib.js';

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

## Why GEO?

**Generative Engine Optimization** is SEO for the AI era. As ChatGPT, Perplexity, Gemini, and AI Overviews replace traditional search, your online presence needs to be discoverable by machines — not just humans.

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
| [llms.txt](https://llmstxt.org) | Markdown summary for LLM crawlers | 844K+ sites |
| [llms-full.txt](https://llmstxt.org) | Full content dump for deep indexing | Growing |
| robots.txt AI rules | Control which AI bots can crawl | Standard |

### AI Crawler User-Agents

| Bot | Company | User-Agent |
|-----|---------|------------|
| OAI-SearchBot | OpenAI | \`OAI-SearchBot\` |
| GPTBot | OpenAI | \`GPTBot\` |
| ChatGPT-User | OpenAI | \`ChatGPT-User\` |
| Google-Extended | Google | \`Google-Extended\` |
| ClaudeBot | Anthropic | \`ClaudeBot\` |
| PerplexityBot | Perplexity | \`PerplexityBot\` |
| Bytespider | ByteDance | \`Bytespider\` |

---

## Research & Reading

### Academic Papers

| Paper | Year | Key Finding |
|-------|------|-------------|
| [GEO: Generative Engine Optimization](https://arxiv.org/abs/2311.09735) | 2024 (KDD) | The foundational GEO paper — GEO-BENCH benchmark proves 40% visibility boost via statistics and citation addition |
| [How to Dominate AI Search](https://arxiv.org/abs/2509.08919) | 2025 | AI search has systematic bias toward earned media over brand-owned content; engine-specific strategies needed |
| [Role-Augmented Intent-Driven G-SEO](https://arxiv.org/abs/2508.11158) | 2025 | Extends GEO-BENCH with intent modeling across informational roles; introduces G-Eval 2.0 |
| [E-GEO: GEO for E-Commerce](https://arxiv.org/abs/2511.20867) | 2025 | First e-commerce GEO benchmark — 7,000+ consumer product queries with rich intent and constraints |
| [Beyond SEO: Transformer-Based Web Content Optimisation](https://arxiv.org/abs/2507.03169) | 2025 | Fine-tuned BART transformer for domain-specific GEO content optimization |
| [LLMs Generating Text with Citations](https://arxiv.org/abs/2305.14627) | 2023 (EMNLP) | ALCE benchmark for automatic citation evaluation — fluency, correctness, and citation quality |

### Industry Studies

- [Semrush: Do Backlinks Still Matter in AI Search?](https://www.semrush.com/blog/backlinks-ai-search-study/) — 1,000 domain study on authority vs. AI citation correlation
- [Otterly.AI: The AI Citation Economy](https://otterly.ai/blog/the-ai-citations-report-2026/) — 1M+ data points on visibility in 2026; community platforms capture 52.5% of citations
- [ALM Corp: Google AI Mode Cites Itself in 17%](https://almcorp.com/blog/google-ai-mode-cites-itself-organic-links-seo-2026/) — 1.3M citations across 68K keywords; Google self-citation tripled in 9 months
- [ALM Corp: ChatGPT Citations Study](https://almcorp.com/blog/chatgpt-citations-study-44-percent-first-third-content/) — 44% of all ChatGPT citations come from the first third of content
- [ALM Corp: LinkedIn Is #2 Most Cited in AI Search](https://almcorp.com/blog/linkedin-ai-search-citations-2026/) — 325K prompts reveal platform citation distribution
- [Superlines: 60+ AI Search Statistics](https://www.superlines.io/articles/ai-search-statistics/) — Verified data points on visibility, citations, and traffic across ChatGPT, Perplexity, and AI Mode
- [Superlines: State of GEO Q1 2026](https://www.superlines.io/articles/the-state-of-geo-in-q1-2026) — Quarterly benchmarks and market data

### Standards & Specifications

- [llms.txt Specification](https://llmstxt.org) — Jeremy Howard's proposed standard for making sites AI-readable (844K+ adopters)
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
`;

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const readmePath = fileURLToPath(new URL('../README.md', import.meta.url));
await writeFile(readmePath, md);
console.log(`✅ README.md generated with ${totalSites} platforms across ${grouped.size} categories`);
