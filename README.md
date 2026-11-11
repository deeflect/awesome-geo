# Awesome GEO [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of **157 free platforms** and **65 open-source repos & tools** for **Generative Engine Optimization (GEO)** — SEO for the AI era.

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
| Total platforms | 157 |
| Open-source repos & tools | 65 |
| Automated checks completed | 157 |
| Representative public pages seeded | 98 |
| Root-fallback checks | 59 |
| AI-discoverable (at least 1 major crawler allowed) | 136 |
| 🟢 High GEO value (75+) | 75 |
| 🟡 Medium GEO value (50-74) | 68 |
| 🔴 Low GEO value (<50) | 14 |

## Quick Start

```bash
npm install
npm run validate
```

This repo is data-first: `data/sites/*.yaml` and `data/repos/*.yaml` are the source of truth, and `README.md` is generated from them.

Useful commands:

- `npm run validate` — typecheck, validate YAML data integrity, regenerate `README.md`
- `npm run verify-all` — re-check all platform entries live
- `npm run refresh-authority` — refresh Open PageRank and Tranco metrics
- `npm run refresh-ai-access` — refresh robots.txt crawler access signals

Environment:

- `OPENPAGERANK_API_KEY` is required for authority verification workflows

## Contents

- [Developer Profiles](#developer-profiles) (29)
- [Business Directories](#business-directories) (27)
- [Content Syndication](#content-syndication) (24)
- [Community Platforms](#community-platforms) (13)
- [Social Profiles](#social-profiles) (27)
- [Knowledge Bases](#knowledge-bases) (8)
- [Design Portfolios](#design-portfolios) (9)
- [Niche Directories](#niche-directories) (12)
- [Social Bookmarking](#social-bookmarking) (8)
- [Open-Source Repos & Tools](#open-source-repos--tools)
  - [Research & Frameworks](#research-frameworks) (10)
  - [llms.txt Ecosystem](#llms-txt-ecosystem) (12)
  - [AI Crawler Management](#ai-crawler-management) (4)
  - [GEO Monitoring & Tracking](#geo-monitoring-tracking) (9)
  - [Structured Data & Schema](#structured-data-schema) (6)
  - [GEO Toolkits](#geo-toolkits) (9)
  - [Agent-Readable Content](#agent-readable-content) (2)
  - [Agent Skills & MCP Servers](#agent-skills-mcp-servers) (13)
- [AI Discoverability](#ai-discoverability)
- [Research & Reading](#research--reading)
- [Contributing](#contributing)

---

## Platforms

> Core signals are checked automatically. Authority is a normalized Open PageRank score, and popularity is based on Tranco rank. GEO score is a reference-likelihood model weighted toward crawl access, popularity, query fit, indexability, authority, and link value.
>
> Representative public pages are currently seeded for **98/157** platforms. Remaining entries fall back to the platform root until a better public page is sourced.
> 
> Legend: ✅ Open (all major crawlers checked) · ⚠️ Partial · ❌ Blocked

### Developer Profiles

> Technical platforms with profile pages

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [GitHub](https://github.com) | 86 | dofollow | low | ✅ Open | 98/100 | Profile README + pinned repos. Tier 1 asset for developers. |
| [SourceForge](https://sourceforge.net) | 69 | mixed | medium | ✅ Open | 91/100 | Open source project hosting. |
| [HuggingFace](https://huggingface.co) | 63 | dofollow | low | ✅ Open | 91/100 | AI/ML model hosting with profile pages. |
| [Bitbucket](https://bitbucket.org) | 62 | mixed | medium | ✅ Open | 90/100 | Atlassian git hosting with public profiles. |
| [GitLab](https://gitlab.com) | 62 | dofollow | low | ✅ Open | 87/100 | Alternative to GitHub with profile pages. |
| [DEV.to](https://dev.to) | 61 | nofollow | low | ✅ Open | 89/100 | Publish articles with canonical URLs back to your site. |
| [JSFiddle](https://jsfiddle.net) | 57 | mixed | medium | ✅ Open | 85/100 | JavaScript playground with user profiles. |
| [PyPI](https://pypi.org) | 55 | dofollow | low | ✅ Open | 89/100 | Python package index with project URLs. |
| [NuGet](https://www.nuget.org) | 54 | mixed | medium | ✅ Open | 87/100 | .NET package registry. |
| [RubyGems](https://rubygems.org) | 54 | mixed | medium | ✅ Open | 85/100 | Ruby package registry with profile pages. |
| [Packagist](https://packagist.org) | 53 | mixed | medium | ✅ Open | 88/100 | PHP/Composer package registry. |
| [Replit](https://replit.com) | 53 | nofollow | low | ✅ Open | 87/100 | Online IDE with public project profiles. |
| [Kaggle](https://www.kaggle.com) | 51 | mixed | medium | ✅ Open | 78/100 | Data science competition platform. |
| [LeetCode](https://leetcode.com) | 51 | mixed | medium | ✅ Open | 78/100 | Coding challenge platform. |
| [Observable](https://observablehq.com) | 50 | mixed | medium | ✅ Open | 83/100 | Data visualization notebooks. |
| [CodeSandbox](https://codesandbox.io) | 49 | mixed | medium | ✅ Open | 83/100 | Online IDE with public projects. |
| [Hashnode](https://hashnode.com) | 49 | dofollow | low | ✅ Open | 84/100 | Dev blog platform with custom domain support. |
| [Read the Docs](https://readthedocs.org) | 49 | mixed | medium | ✅ Open | 86/100 | Documentation hosting platform. |
| [Exercism](https://exercism.org) | 42 | mixed | medium | ✅ Open | 79/100 | Coding exercises with public profiles. |

<details>
<summary>🟡 Medium GEO Value (8 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Stack Overflow](https://stackoverflow.com) | 69 | nofollow | medium | — | 63/100 | Profile link + answer quality builds authority. |
| [Docker Hub](https://hub.docker.com) | 62 | mixed | medium | ✅ Open | 73/100 | Container image registry with profiles. |
| [CodePen](https://codepen.io) | 61 | nofollow | low | ⚠️ 2/5 | 68/100 | Frontend demo platform with profile links. |
| [Codeberg](https://codeberg.org) | 56 | mixed | medium | ❌ Blocked | 57/100 | Non-profit git hosting. |
| [Launchpad](https://launchpad.net) | 55 | mixed | medium | ❌ Blocked | 59/100 | Ubuntu/Canonical project hosting. |
| [crates.io](https://crates.io) | 53 | nofollow | low | ✅ Open | 74/100 | Rust package registry with author profiles. |
| [Google Developers](https://developers.google.com/program) | 49 | nofollow | low | ✅ Open | 70/100 | Google developer profile with custom URL. |
| [Gitea](https://gitea.com) | 43 | mixed | medium | ⚠️ 1/5 | 58/100 | Self-hosted git with public instances. |
</details>

<details>
<summary>🔴 Low GEO Value (2 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [npm](https://www.npmjs.com) | 64 | nofollow | low | — | 49/100 | Package author page links to homepage. |
| [HackerRank](https://www.hackerrank.com) | 49 | mixed | medium | ❌ Blocked | 43/100 | Developer skills platform. |
</details>

### Business Directories

> Company and professional directories

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [LinkedIn Company](https://linkedin.com) | 100 | nofollow | low | ⚠️ 1/5 | 80/100 | Company page with website link. |
| [Foursquare](https://foursquare.com) | 62 | mixed | medium | ⚠️ 4/5 | 86/100 | Location-based business listings. |
| [Product Hunt](https://producthunt.com) | 62 | nofollow | low | ✅ Open | 79/100 | Launch products and build maker profile. |
| [TrustPilot](https://www.trustpilot.com) | 62 | mixed | medium | ✅ Open | 81/100 | Consumer review platform. |
| [Crunchbase](https://crunchbase.com) | 59 | nofollow | medium | ⚠️ 2/5 | 78/100 | Person and company profiles for startups. |
| [Better Business Bureau](https://www.bbb.org) | 58 | mixed | medium | ✅ Open | 88/100 | Business accreditation directory. |
| [G2](https://www.g2.com) | 58 | mixed | medium | ✅ Open | 78/100 | Software review platform. |
| [Capterra](https://www.capterra.com) | 57 | mixed | medium | ✅ Open | 77/100 | Software comparison directory. |
| [Manta](https://www.manta.com) | 53 | mixed | medium | ✅ Open | 75/100 | Small business directory. |
| [AngelList / Wellfound](https://wellfound.com) | 50 | dofollow | medium | ✅ Open | 88/100 | Startup ecosystem profiles. |
| [Bing Places](https://www.bing.com/forbusiness) | 48 | mixed | medium | ✅ Open | 76/100 | Bing business listings. |
| [Chamber of Commerce](https://www.chamberofcommerce.com) | 47 | mixed | medium | ✅ Open | 81/100 | Business membership directory. |

<details>
<summary>🟡 Medium GEO Value (13 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Google Business](https://business.google.com) | 67 | nofollow | medium | ✅ Open | 64/100 | Local business listing in Google ecosystem. |
| [Yelp](https://www.yelp.com) | 66 | mixed | medium | ❌ Blocked | 61/100 | Local business reviews. |
| [Glassdoor](https://www.glassdoor.com) | 60 | mixed | medium | ⚠️ 2/5 | 69/100 | Company reviews and salaries. |
| [F6S](https://f6s.com) | 49 | dofollow | low | ⚠️ 2/5 | 63/100 | Startup directory with founder profiles. |
| [Alignable](https://www.alignable.com) | 47 | mixed | medium | ❌ Blocked | 51/100 | Small business networking. |
| [DesignRush](https://www.designrush.com) | 47 | mixed | medium | ✅ Open | 73/100 | Agency directory for design/dev. |
| [Apple Business Connect](https://business.apple.com) | 46 | mixed | medium | ✅ Open | 69/100 | Apple Maps business listings. |
| [GoodFirms](https://goodfirms.co) | 46 | dofollow | medium | ✅ Open | 72/100 | Service provider review directory. |
| [BizSugar](https://bizsugar.com) | 42 | mixed | medium | ✅ Open | 73/100 | Small business content sharing. |
| [Sortlist](https://www.sortlist.com) | 41 | mixed | medium | ✅ Open | 69/100 | Agency matching platform. |
| [Kompass](https://www.kompass.com) | 39 | mixed | medium | ⚠️ 4/5 | 67/100 | International business directory. |
| [AppFutura](https://www.appfutura.com) | 37 | mixed | medium | ✅ Open | 59/100 | App development directory. |
| [TopDevelopers](https://www.topdevelopers.co) | 35 | mixed | medium | ✅ Open | 71/100 | Developer company directory. |
</details>

<details>
<summary>🔴 Low GEO Value (2 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Clutch](https://clutch.co) | 54 | dofollow | medium | — | 48/100 | Agency and service provider directory. |
| [Yellow Pages](https://www.yellowpages.com) | 50 | mixed | medium | — | 47/100 | Classic business directory. |
</details>

### Content Syndication

> Platforms for republishing content

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [LinkedIn Articles](https://linkedin.com) | 100 | nofollow | low | ✅ Open | 98/100 | Professional audience, high authority domain. |
| [Blogger](https://www.blogger.com) | 70 | mixed | medium | ✅ Open | 87/100 | Google blogging platform. |
| [Tumblr](https://www.tumblr.com) | 70 | mixed | medium | ⚠️ 3/5 | 80/100 | Microblogging platform. |
| [Issuu](https://issuu.com) | 69 | mixed | medium | ✅ Open | 85/100 | Digital publication platform. |
| [SlideShare](https://www.slideshare.net) | 68 | mixed | medium | ⚠️ 4/5 | 81/100 | Presentation sharing platform. |
| [WordPress.com](https://wordpress.com) | 66 | mixed | medium | ✅ Open | 86/100 | Hosted WordPress blogs. |
| [Notion](https://www.notion.com) | 65 | mixed | medium | ✅ Open | 84/100 | Published Notion pages. |
| [Scribd](https://www.scribd.com) | 65 | mixed | medium | ⚠️ 4/5 | 81/100 | Document sharing platform. |
| [CSS-Tricks](https://css-tricks.com) | 60 | mixed | medium | ✅ Open | 81/100 | Frontend dev resource. |
| [Smashing Magazine](https://www.smashingmagazine.com) | 60 | mixed | medium | ✅ Open | 83/100 | Web dev publication accepting articles. |
| [Substack](https://substack.com) | 60 | dofollow | low | ✅ Open | 88/100 | Newsletter platform with web presence. |
| [freeCodeCamp](https://www.freecodecamp.org) | 58 | mixed | medium | ✅ Open | 81/100 | Coding education with contributor profiles. |
| [Telegraph](https://telegra.ph) | 58 | mixed | medium | ✅ Open | 82/100 | Instant publishing by Telegram. |
| [Ghost](https://ghost.org) | 57 | mixed | medium | ✅ Open | 82/100 | Modern publishing platform. |
| [Vocal.media](https://vocal.media) | 54 | mixed | medium | ✅ Open | 79/100 | General content platform with payouts. |
| [Newsbreak](https://www.newsbreak.com) | 51 | mixed | medium | ✅ Open | 82/100 | Local news content platform. |

<details>
<summary>🟡 Medium GEO Value (7 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Medium](https://medium.com) | 76 | nofollow | low | ⚠️ 3/5 | 70/100 | Set canonical URL to your original post. |
| [Hacker Noon](https://hackernoon.com) | 57 | mixed | medium | ⚠️ 2/5 | 70/100 | Tech blog platform with author profiles. |
| [SitePoint](https://www.sitepoint.com) | 57 | mixed | medium | ⚠️ 3/5 | 62/100 | Web dev articles platform. |
| [Hacker News](https://news.ycombinator.com) | 54 | nofollow | low | ✅ Open | 73/100 | Tech audience, very high impact if frontpaged. |
| [LogRocket Blog](https://blog.logrocket.com) | 48 | mixed | medium | ✅ Open | 63/100 | Frontend monitoring blog accepting posts. |
| [Thinkers360](https://thinkers360.com) | 43 | dofollow | medium | ✅ Open | 66/100 | Thought leadership platform with rankings. |
| [ArticleBiz](https://www.articlebiz.com) | 38 | mixed | medium | ⚠️ 2/5 | 54/100 | Article directory. |
</details>

<details>
<summary>🔴 Low GEO Value (1 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Quora Spaces](https://www.quora.com) | 68 | mixed | medium | ⚠️ 1/5 | 48/100 | Q&A platform with content spaces. |
</details>

### Community Platforms

> Forums and community sites

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Slashdot](https://slashdot.org) | 55 | mixed | medium | ✅ Open | 84/100 | Tech news discussion. |
| [Warrior Forum](https://www.warriorforum.com) | 47 | mixed | medium | ✅ Open | 77/100 | Digital marketing forum. |
| [XenForo Community](https://xenforo.com/community) | 47 | mixed | medium | ✅ Open | 79/100 | Forum software community. |
| [Digital Point](https://www.digitalpoint.com) | 43 | mixed | medium | ✅ Open | 75/100 | Webmaster forum. |

<details>
<summary>🟡 Medium GEO Value (6 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Reddit](https://reddit.com) | 80 | nofollow | low | ❌ Blocked | 59/100 | Subreddit participation, profile links. |
| [DZone](https://dzone.com) | 55 | mixed | medium | ✅ Open | 73/100 | Developer content zone. |
| [Spiceworks](https://community.spiceworks.com) | 48 | mixed | medium | ⚠️ 2/5 | 54/100 | IT professional community. |
| [GrowthHackers](https://growthhackers.com) | 47 | mixed | medium | ✅ Open | 72/100 | Growth marketing community. |
| [WebmasterWorld](https://www.webmasterworld.com) | 46 | mixed | medium | ⚠️ 4/5 | 72/100 | SEO and webmaster forum. |
| [SitePoint](https://community.sitepoint.com) | 33 | mixed | medium | ✅ Open | 53/100 | Web dev community forums. |
</details>

<details>
<summary>🔴 Low GEO Value (3 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Quora](https://quora.com) | 68 | nofollow | low | ⚠️ 1/5 | 49/100 | Q&A platform with profile and answer links. |
| [IndieHackers](https://www.indiehackers.com) | 48 | mixed | medium | ❌ Blocked | 47/100 | Builder community with product listings. |
| [Lobsters](https://lobste.rs) | 42 | mixed | medium | ❌ Blocked | 45/100 | Invite-only tech link aggregator. |
</details>

### Social Profiles

> Social media and portfolio sites

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [YouTube](https://youtube.com) | 100 | nofollow | low | ✅ Open | 89/100 | Channel and video description links. |
| [Vimeo](https://vimeo.com) | 83 | mixed | medium | ⚠️ 2/5 | 77/100 | Video hosting with profiles. |
| [Flickr](https://flickr.com) | 79 | mixed | medium | ⚠️ 2/5 | 75/100 | Photo sharing with profile links. |
| [Telegram](https://t.me) | 79 | mixed | medium | ✅ Open | 86/100 | Messaging with public channels. |
| [Linktree](https://linktr.ee) | 76 | mixed | medium | ✅ Open | 86/100 | Link-in-bio platform. |
| [Discord](https://discord.com) | 75 | mixed | medium | ✅ Open | 86/100 | Community platform with server listings. |
| [Twitch](https://twitch.tv) | 75 | mixed | medium | ✅ Open | 76/100 | Streaming platform with bio links. |
| [Goodreads](https://www.goodreads.com) | 65 | mixed | medium | ⚠️ 4/5 | 80/100 | Book reviews with author profiles. |
| [About.me](https://about.me) | 62 | dofollow | low | ✅ Open | 84/100 | Simple personal landing page. |
| [Gravatar](https://gravatar.com) | 62 | dofollow | low | ⚠️ 3/5 | 78/100 | Universal avatar with verified profile links. |
| [Dribbble](https://dribbble.com) | 61 | nofollow | low | ✅ Open | 82/100 | Design showcase platform. |
| [Carrd](https://carrd.com) | 47 | mixed | medium | ✅ Open | 79/100 | One-page personal sites. |

<details>
<summary>🟡 Medium GEO Value (13 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Instagram](https://instagram.com) | 100 | mixed | medium | ❌ Blocked | 60/100 | Photo/video with bio link. |
| [Pinterest](https://pinterest.com) | 85 | mixed | medium | ❌ Blocked | 58/100 | Visual bookmarking with profile links. |
| [TikTok](https://tiktok.com) | 85 | mixed | medium | ❌ Blocked | 58/100 | Short video with bio link. |
| [Bluesky](https://bsky.app) | 68 | mixed | medium | ✅ Open | 74/100 | Decentralized microblogging. |
| [WhatsApp Channels](https://whatsapp.com/channel) | 68 | mixed | medium | ⚠️ 1/5 | 57/100 | Meta messaging channels. |
| [Behance](https://behance.net) | 67 | nofollow | low | ⚠️ 2/5 | 72/100 | Adobe design portfolio platform. |
| [Threads](https://www.threads.com) | 65 | mixed | medium | ❌ Blocked | 53/100 | Meta microblogging platform. |
| [Mastodon](https://mastodon.social) | 61 | mixed | medium | ⚠️ 2/5 | 72/100 | Federated social profile |
| [Letterboxd](https://letterboxd.com) | 56 | mixed | medium | ⚠️ 2/5 | 60/100 | Film reviews with profiles. |
| [Bio.link](https://bio.link) | 51 | mixed | medium | ✅ Open | 68/100 | Link-in-bio alternative. |
| [Daily.dev](https://daily.dev) | 45 | mixed | medium | ✅ Open | 74/100 | Developer news with profiles. |
| [Peerlist](https://peerlist.io) | 44 | mixed | medium | ✅ Open | 59/100 | Professional profiles for devs. |
| [Mesh](https://me.sh) | 43 | mixed | medium | ✅ Open | 69/100 | Personal CRM, formerly Clay. |
</details>

<details>
<summary>🔴 Low GEO Value (2 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [X / Twitter](https://x.com) | 89 | nofollow | low | ❌ Blocked | 47/100 | Bio link, high social signal. |
| [Spotify for Creators](https://creators.spotify.com) | 62 | mixed | medium | ❌ Blocked | 36/100 | Podcast hosting with profiles, formerly Spotify for Podcasters. |
</details>

### Knowledge Bases

> Wikis and reference platforms

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [ResearchGate](https://www.researchgate.net) | 73 | mixed | medium | ✅ Open | 81/100 | Academic social network. |
| [Academia.edu](https://www.academia.edu) | 61 | mixed | medium | ⚠️ 2/5 | 78/100 | Academic paper sharing. |
| [Wikipedia](https://wikipedia.org) | 61 | nofollow | hard | ✅ Open | 93/100 | Requires notability. Highest impact for AI. |
| [ORCID](https://orcid.org) | 59 | mixed | medium | ✅ Open | 86/100 | Researcher identifier system. |
| [Semantic Scholar](https://www.semanticscholar.org) | 54 | mixed | medium | ✅ Open | 86/100 | AI-powered research tool. |
| [Wikidata](https://wikidata.org) | 54 | nofollow | medium | ✅ Open | 84/100 | Create entity — directly feeds AI knowledge graphs. |

<details>
<summary>🟡 Medium GEO Value (2 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Wikimedia Commons](https://commons.wikimedia.org) | 68 | nofollow | medium | ✅ Open | 70/100 | Image hosting with attribution links. |
| [Google Scholar](https://scholar.google.com) | 62 | mixed | medium | ✅ Open | 71/100 | Academic profile with citations. |
</details>

### Design Portfolios

> Design galleries and portfolio platforms

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Awwwards](https://www.awwwards.com) | 55 | mixed | medium | ✅ Open | 78/100 | Web design awards directory. |
| [Cargo](https://cargo.site) | 45 | mixed | medium | ✅ Open | 76/100 | Designer portfolio platform. |

<details>
<summary>🟡 Medium GEO Value (5 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Coroflot](https://www.coroflot.com) | 48 | mixed | medium | ⚠️ 2/5 | 60/100 | Design portfolio and jobs. |
| [Muzli](https://muz.li) | 45 | mixed | medium | ✅ Open | 74/100 | Design inspiration platform. |
| [CSS Design Awards](https://www.cssdesignawards.com) | 43 | mixed | medium | ✅ Open | 69/100 | CSS/web design awards. |
| [Carbonmade](https://carbonmade.com) | 41 | mixed | medium | ✅ Open | 66/100 | Online portfolio builder. |
| [Dunked](https://dunked.com) | 39 | mixed | medium | ✅ Open | 64/100 | Portfolio hosting for creatives. |
</details>

<details>
<summary>🔴 Low GEO Value (2 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Figma Community](https://figma.com/community) | 65 | mixed | medium | ❌ Blocked | 44/100 | Design file sharing. |
| [SiteInspire](https://www.siteinspire.com) | 42 | mixed | medium | ⚠️ 2/5 | 48/100 | Web design showcase. |
</details>

### Niche Directories

> Specialized expert and industry directories

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Contra](https://contra.com) | 46 | mixed | medium | ✅ Open | 76/100 | Freelance portfolio platform. |

<details>
<summary>🟡 Medium GEO Value (11 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Toptal](https://www.toptal.com) | 59 | mixed | medium | ✅ Open | 74/100 | Top freelancer network. |
| [MuckRack](https://muckrack.com) | 54 | mixed | medium | ⚠️ 2/5 | 63/100 | PR and journalist platform. |
| [Maven](https://maven.com) | 47 | mixed | medium | ✅ Open | 73/100 | Expert teaching platform. |
| [Clarity.fm](https://clarity.fm) | 46 | mixed | medium | ✅ Open | 73/100 | Expert call marketplace. |
| [Gun.io](https://gun.io) | 45 | mixed | medium | ✅ Open | 70/100 | Developer freelance platform. |
| [Arc.dev](https://arc.dev) | 42 | mixed | medium | ✅ Open | 73/100 | Remote developer jobs. |
| [Featured.com](https://featured.com) | 40 | mixed | medium | ✅ Open | 60/100 | Expert source for journalists. |
| [SourceBottle](https://www.sourcebottle.com) | 39 | mixed | medium | ✅ Open | 64/100 | Journalist query platform. |
| [MentionMatch](https://mentionmatch.com) | 38 | mixed | medium | ✅ Open | 64/100 | B2B content expert matching, formerly Help a B2B Writer. |
| [Qwoted](https://app.qwoted.com) | 37 | dofollow | low | ⚠️ 2/5 | 54/100 | Expert quote platform. |
| [HARO](https://www.helpareporter.com) | 36 | mixed | medium | ✅ Open | 54/100 | Free daily journalist source requests, now run by Featured. |
</details>

### Social Bookmarking

> Content curation and bookmarking platforms

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Digg](https://digg.com) | 61 | mixed | medium | ✅ Open | 79/100 | News aggregator. |
| [Pearltrees](https://www.pearltrees.com) | 56 | mixed | medium | ✅ Open | 76/100 | Visual bookmarking platform. |
| [Wakelet](https://wakelet.com) | 52 | mixed | medium | ✅ Open | 76/100 | Content curation platform. |

<details>
<summary>🟡 Medium GEO Value (3 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Flipboard](https://flipboard.com) | 56 | mixed | medium | ⚠️ 3/5 | 61/100 | Content curation magazines. |
| [Raindrop.io](https://raindrop.io) | 52 | mixed | medium | ✅ Open | 74/100 | Bookmark manager with public collections. |
| [Start.me](https://start.me) | 49 | mixed | medium | ✅ Open | 62/100 | Start page with public bookmarks. |
</details>

<details>
<summary>🔴 Low GEO Value (2 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Diigo](https://www.diigo.com) | 66 | mixed | medium | ❌ Blocked | 48/100 | Social bookmarking and annotation. |
| [StumbleUpon / Mix](https://mix.com) | 47 | mixed | medium | ❌ Blocked | 42/100 | Content discovery platform. |
</details>

---

## Open-Source Repos & Tools

> GitHub repositories, libraries, and tools for GEO optimization — sorted by stars.

### Research & Frameworks

> Academic research, benchmarks, and foundational GEO frameworks

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [Awesome Generative Engine Optimization](https://github.com/amplifying-ai/awesome-generative-engine-optimization) | ⭐ 540 | 📚 Reference | — | Curated guide to GEO resources — guides, tools, and research for AI search visibility. |
| [GEO (Princeton)](https://github.com/GEO-optim/GEO) | ⭐ 350 | 🔬 Research | Python | Original GEO research from Princeton — KDD '24 paper with GEO-BENCH benchmark. Proves 40% visibility boost. |
| [AutoGEO](https://github.com/cxcscmu/AutoGEO) | ⭐ 238 | 🔬 Research | Python | ICLR '26 framework that learns generative-engine preferences and rewrites web content for higher visibility while preserving utility. |
| [Awesome GEO (luka2chat)](https://github.com/luka2chat/awesome-geo) | ⭐ 132 | 📚 Reference | — | Broad curated GEO resource list covering research papers, tools, AI search engines, analytics, communities, and checklists. |
| [Awesome GEO (Research)](https://github.com/DavidHuji/Awesome-GEO) | ⭐ 128 | 📚 Reference | — | Curated collection of GEO research papers and academic resources. |
| [E-GEO](https://github.com/psbagga17/E-GEO) | ⭐ 51 | 🔬 Research | Python | E-commerce GEO benchmark with 7,000+ product queries and experiments on rewriting heuristics for generative shopping engines. |
| [AgenticGEO](https://github.com/AIcling/agentic_geo) | ⭐ 46 | 🔬 Research | Python | Self-evolving agentic GEO system using strategy memory and a surrogate critic to adapt content optimization to black-box engines. |
| [MAGEO](https://github.com/Wu-beining/MAGEO) | ⭐ 37 | 🔬 Research | Python | ACL '26 multi-agent GEO framework that learns reusable, engine-specific optimization strategies with fidelity-aware evaluation. |
| [GEO Research Hub](https://github.com/Wu-beining/generative-engine-optimization-research-hub) | ⭐ 31 | 📚 Reference | TeX | Maintained GEO/AEO/AIO/GSEO research hub covering papers, benchmarks, code repos, platform rules, and research agendas. |
| [C-SEO Bench](https://github.com/parameterlab/c-seo-bench) | ⭐ 20 | 🔬 Research | Jupyter Notebook | NeurIPS D&B '25 benchmark testing whether conversational SEO techniques improve rankings in AI-mediated search and recommendations. |

### llms.txt Ecosystem

> Tools and references for the llms.txt standard

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [Firecrawl](https://github.com/firecrawl/firecrawl) | ⭐ 200.9k | 🔧 Tool | TypeScript | Web data API for AI — turn websites into LLM-ready markdown. llms.txt generation built in. |
| [llms.txt Specification](https://github.com/AnswerDotAI/llms-txt) | ⭐ 2.7k | 📐 Standard | Jupyter Notebook | The official llms.txt spec by Jeremy Howard. The standard for making your site AI-readable. |
| [llms-txt-hub](https://github.com/thedaviddias/llms-txt-hub) | ⭐ 926 | 📚 Reference | TypeScript | Largest directory of sites implementing llms.txt — reference list and tooling. |
| [vitepress-plugin-llms](https://github.com/okineadev/vitepress-plugin-llms) | ⭐ 415 | 📦 Library | TypeScript | VitePress plugin that generates llms.txt, llms-full.txt, and Markdown versions of each docs page at build time. |
| [create-llmstxt-py](https://github.com/firecrawl/create-llmstxt-py) | ⭐ 327 | 🔧 Tool | Python | Firecrawl Python generator for producing llms.txt files from websites. |
| [Nuxt LLMs](https://github.com/nuxt-content/nuxt-llms) | ⭐ 171 | 📦 Library | TypeScript | Nuxt module that generates and prerenders /llms.txt and optional /llms-full.txt documentation. |
| [llmstxt](https://github.com/dotenvx/llmstxt) | ⭐ 149 | 🔧 Tool | JavaScript | CLI that converts sitemap.xml entries into llms.txt markdown links. |
| [mkdocs-llmstxt](https://github.com/pawamoy/mkdocs-llmstxt) | ⭐ 132 | 📦 Library | Python | MkDocs plugin for generating /llms.txt and optional llms-full.txt from documentation sections. |
| [Dualmark](https://github.com/dodopayments/dualmark) | ⭐ 123 | 🔧 Tool | TypeScript | Serves Markdown versions of pages to AI agents alongside HTML, chosen by HTTP content negotiation. |
| [sphinx-llms-txt](https://github.com/jdillard/sphinx-llms-txt) | ⭐ 33 | 📦 Library | Python | Sphinx extension that generates a summary llms.txt and a combined llms-full.txt from the docs. |
| [agentmarkup](https://github.com/agentmarkup/agentmarkup) | ⭐ 27 | 📦 Library | TypeScript | Build-time llms.txt, JSON-LD, Markdown mirrors, and AI crawler robots.txt rules for Vite, Astro, Next.js, and Nuxt, plus a CLI for any static output and a live audit tool. |
| [llms-generator](https://github.com/Francesco-Fera/llms-generator) | ⭐ 26 | 🔧 Tool | TypeScript | Free no-code tool for generating llms.txt files for LLM SEO compliance. |

### AI Crawler Management

> Control and monitor AI bot access to your content

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [ai.robots.txt](https://github.com/ai-robots-txt/ai.robots.txt) | ⭐ 4.3k | 📚 Reference | Python | Community-maintained list of AI bots to block. Generates robots.txt, .htaccess, nginx, HAProxy configs. |
| [GEOInflow](https://github.com/yaojingang/GEOInflow) | ⭐ 836 | 🔧 Tool | TypeScript | Self-hosted analytics for AI crawler visits, AI search referrals, server crawl logs and content coverage. |
| [AI Training Opt-Out](https://github.com/healsdata/ai-training-opt-out) | ⭐ 160 | 📚 Reference | HTML | Reference repo for AI training opt-out tags, headers, robots.txt directives, and .well-known patterns. |
| [geo-monitor](https://github.com/tianpengg/geo-monitor) | ⭐ 99 | 🔧 Tool | HTML | Self-hosted AI crawler monitor that reads Nginx or OpenResty access logs and verifies crawler sources. README mostly in Chinese. |

### GEO Monitoring & Tracking

> Track brand visibility across AI search engines

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [Elmo](https://github.com/elmohq/elmo) | ⭐ 593 | 🔧 Tool | TypeScript | Self-hosted AI visibility platform. Tracks how ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews mention and cite a brand, with share of voice and citation analysis. |
| [GEOrank](https://github.com/yaojingang/GEORank) | ⭐ 536 | 🔧 Tool | Python | Self-hosted GEO workbench. Diagnoses site and brand visibility in AI search (schema, meta, readability, citation signals) and turns results into Q&A, action plans, and keyword lists. Chinese and English docs. |
| [Limelit Open](https://github.com/limelit-co/open) | ⭐ 442 | 🔧 Tool | Go | Self-hosted AI visibility tracker for ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews and AI Mode. Single Go binary with SQLite and an MCP server. |
| [GetCito](https://github.com/ai-search-guru/getcito-worlds-first-open-source-aio-aeo-or-geo-tool) | ⭐ 427 | 🔧 Tool | TypeScript | Open-source AI search optimization tool for AIO, AEO, and GEO visibility workflows. |
| [GEO/AEO Tracker](https://github.com/danishashko/geo-aeo-tracker) | ⭐ 326 | 🔧 Tool | TypeScript | Self-hosted AI visibility tracker with a dashboard, MCP server, and CLI. Scores brand mentions, position, citations, and sentiment in ChatGPT, Perplexity, Gemini, and Google AI Mode; collects answers through paid Bright Data calls. |
| [Searchstack AEO](https://github.com/alexpospekhov/searchstack-aeo) | ⭐ 115 | 🔧 Tool | Python | CLI stack for monitoring visibility across Google, AI Overviews, ChatGPT, Perplexity, Claude, and Grok with markdown reports. |
| [gego](https://github.com/AI2HU/gego) | ⭐ 109 | 🔧 Tool | Go | Open-source GEO tracker — schedules prompts across LLMs, extracts keywords, tracks visibility over time. |
| [AiCMO](https://github.com/AICMO/ai-cmo) | ⭐ 57 | 🔧 Tool | Vue | Open-source AI SEO platform. Monitor brand visibility across ChatGPT, Claude, Perplexity, Gemini. Self-hostable. |
| [SEO & AI Search Dashboard](https://github.com/codyschneiderx/seo-ai-search-dashboard) | ⭐ 32 | 🔧 Tool | HTML | Open-source dashboard template for SEO and AI-search performance, with GA4, Search Console, Ads, and AI referral panels. |

### Structured Data & Schema

> Schema.org, JSON-LD, and structured data tools

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [Schema.org](https://github.com/schemaorg/schemaorg) | ⭐ 6.3k | 📐 Standard | HTML | Official Schema.org schemas and supporting software — the foundational vocabulary for JSON-LD structured data. |
| [schema-org (Spatie)](https://github.com/spatie/schema-org) | ⭐ 1.5k | 📦 Library | PHP | Fluent PHP builder for all Schema.org types and JSON-LD generation. Battle-tested. |
| [schema-dts](https://github.com/google/schema-dts) | ⭐ 1.3k | 📦 Library | TypeScript | TypeScript types for Schema.org JSON-LD vocabulary, useful for type-safe structured data generation. |
| [react-schemaorg](https://github.com/google/react-schemaorg) | ⭐ 523 | 📦 Library | TypeScript | Type-checked Schema.org JSON-LD components for React applications. |
| [Structured Data JSON-LD](https://github.com/JayHoltslander/Structured-Data-JSON-LD) | ⭐ 279 | 📚 Reference | — | Ready-to-use JSON-LD snippets in Google-preferred format for every common schema type. |
| [SEO Graph](https://github.com/jdevalk/seo-graph) | ⭐ 50 | 📦 Library | TypeScript | Agent-ready Schema.org JSON-LD graph builder for JavaScript with an Astro integration. |

### GEO Toolkits

> CLI tools, libraries, and automation for GEO optimization

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [Open SEO](https://github.com/every-app/open-seo) | ⭐ 27.4k | 🔧 Tool | TypeScript | Self-hosted open-source SEO tool — keyword research, competitor analysis, backlink tracking, technical audits. AI-native. |
| [The Website Specification](https://github.com/jdevalk/specification.website) | ⭐ 923 | 📚 Reference | TypeScript | Sourced, platform-agnostic website spec covering HTML, accessibility, security, SEO and agent-readiness, including llms.txt. Has an MCP server. |
| [SEOnaut](https://github.com/StJudeWasHere/seonaut) | ⭐ 867 | 🔧 Tool | Go | Open-source SEO audit tool — crawls sites for broken links, redirects, missing meta tags, heading issues. Self-hostable. |
| [GeoLook](https://github.com/aigclink/geolook) | ⭐ 814 | 🔧 Tool | Python | Self-hosted GEO platform that samples AI engine answers, audits a site, and turns gaps into tickets and verification runs. |
| [SEOBuild Onpage](https://github.com/gbessoni/seobuild-onpage) | ⭐ 265 | 🔧 Tool | Python | AI agent that writes pages for Google ranking and LLM citation, formerly SEO AGI. Built on DeerFlow with competitive analysis and entity consensus. |
| [geo-optimizer](https://github.com/geo-team-red/geo-optimizer) | ⭐ 103 | ⚙️ Framework | Go | Pluggable Go framework for GEO optimization strategies with built-in tactics and custom strategy registration. |
| [SEO Audit Console](https://github.com/houtini-ai/seo-audit) | ⭐ 101 | 🔧 Tool | TypeScript | MCP server that gathers raw technical SEO audit data from Google Search Console, a first-party crawl, DataForSEO and Majestic. Replaces houtini SEO Crawler MCP and GEO Analyzer. |
| [ai-seo-tools (RivalSee)](https://github.com/RivalSee/ai-seo-tools) | ⭐ 20 | 🔧 Tool | — | Open-source tools and prompts for AI crawler optimization by RivalSee. |
| [AEO God Mode](https://github.com/AEO-God-Mode/aeo-god-mode) | ⭐ 15 | 🔧 Tool | PHP | WordPress plugin for AI-search readiness with schema, llms.txt, AI crawler logs, content gaps, and citation tracking. |

### Agent-Readable Content

> Markdown serving and content negotiation for AI agents

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [accept-md](https://github.com/slick-enterprises/accept-md) | ⭐ 44 | 📦 Library | TypeScript | Serves Markdown versions of Next.js and SvelteKit pages when clients send Accept: text/markdown, converted from the rendered HTML with meta tags as YAML frontmatter. |
| [NGINX Markdown for Agents](https://github.com/cnkang/nginx-markdown-for-agents) | ⭐ 25 | 🔧 Tool | Python | NGINX module that converts HTML to Markdown at the edge for clients that send Accept: text/markdown or for chosen user agents. Rust converter. |

### Agent Skills & MCP Servers

> Skills, plugins, and MCP servers for SEO and GEO work in coding agents

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [claude-seo](https://github.com/AgriciDaniel/claude-seo) | ⭐ 28.2k | 🤖 Skill | Python | 13 sub-skills, 7 subagents for Claude Code — technical SEO, E-E-A-T, GEO/AEO, DataForSEO integration. |
| [geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude) | ⭐ 11.6k | 🤖 Skill | Python | GEO-first SEO skill for Claude Code — citability scoring, AI crawler analysis, schema markup, PDF reports. |
| [notfair-plugin](https://github.com/nowork-studio/notfair-plugin) | ⭐ 4.1k | 🤖 Skill | — | Open-source SEO, GEO, and marketing skills for AI agents, formerly toprank. |
| [GTM Engineer Skills](https://github.com/onvoyage-ai/gtm-engineer-skills) | ⭐ 1.4k | 🤖 Skill | HTML | Claude Code skill for website AEO/GEO audits with foundational checks, intelligence dimensions, and framework-specific fixes. |
| [geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) | ⭐ 1.3k | 🤖 Skill | Python | GEO audit and optimization skill for making websites visible to ChatGPT, Perplexity, Claude, and Gemini. |
| [seo-geo-claude-skills](https://github.com/aaron-he-zhu/seo-geo-claude-skills) | ⭐ 242 | 🤖 Skill | — | 20 SEO & GEO skills for Claude Code, Cursor, Codex. CORE-EEAT + CITE frameworks. |
| [GEO Content Optimizer Skill](https://github.com/liangdabiao/GEO-Content-Optimizer-Skill) | ⭐ 238 | 🤖 Skill | Python | Claude Code skill that analyzes a URL against Google AI Overview and search summaries, then writes content optimization reports. |
| [eGEOagents](https://github.com/mverab/eGEOagents) | ⭐ 218 | 🤖 Skill | Python | Agent skills for optimizing content across ChatGPT, Perplexity, Claude, and Gemini. |
| [Akii SEO & AI Search Optimizer](https://github.com/akii-technologies-ltd/akii-seo-ai-search-optimizer) | ⭐ 80 | 🤖 Skill | Markdown | Claude Code plugin with 12 skills, 5 agents, and 3 commands for site audits, content planning, schema generation, link checks, and estimated AI visibility. |
| [seo-skill-bench](https://github.com/aleclindz/seo-skill-bench) | ⭐ 43 | 🔬 Research | JavaScript | Benchmark that runs Claude Code SEO skills headless against fixture sites with planted defects and scores detection, trap avoidance, and judgment. The maintainer's own skill is an entrant. |
| [Google Search Console MCP](https://github.com/surendranb/google-search-console-mcp) | ⭐ 40 | 🔧 Tool | Python | MCP server for Google Search Console: search performance, keyword rankings, sitemaps, and indexing health for AI agents. |
| [Foundvia Discovery](https://github.com/ronaldships/foundvia-discovery) | ⭐ 29 | 🤖 Skill | Python | Python auditor and coding-agent skill that finds what blocks public SaaS pages on Google and ChatGPT, formerly SEO + GEO Playbook. |
| [Search Console MCP](https://github.com/FlorianBruniaux/google-search-console-mcp) | ⭐ 24 | 🔧 Tool | Python | MCP server with 96 tools for Google Search Console, Bing, GA4, and CrUX, plus 15 shared Claude and Codex SEO playbooks. |

---

## AI Discoverability

### Structured Data

| What | Why | Resources |
|------|-----|-----------|
| JSON-LD Schema | Helps AI understand your entity | [Schema.org](https://schema.org), [Google Rich Results Test](https://search.google.com/test/rich-results) |
| Person Schema | "Who are you" for LLMs | `@type: Person` with sameAs links |
| Organization Schema | "What is your company" | `@type: Organization` with founder, URL |
| Article Schema | Helps AI cite your content | `@type: Article` with author, datePublished |

### AI-Specific Standards

| Standard | What it does | Adoption |
|----------|-------------|----------|
| [llms.txt](https://llmstxt.org) | Markdown summary that helps agents and users find AI-readable site context. [v2 of the proposal](https://llmstxt.org/changes.html) (September 2026) adds `rel="alternate"` / `rel="describedby"` link relations and path-scoped files | Proposal; Chrome Lighthouse [audits it](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt); little evidence AI engines fetch it |
| [llms-full.txt](https://llmstxt.org) | Expanded markdown content for deeper manual or agent ingestion | Emerging |
| robots.txt AI rules | Control which AI bots can crawl | Standard |
| [Content Signals](https://contentsignals.org) | robots.txt `Content-Signal` line stating preferences for `search`, `ai-input`, and `ai-train` | Cloudflare proposal |
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
| [OpenAI](https://developers.openai.com/api/docs/bots) | `OAI-SearchBot` | Surfaces sites in ChatGPT search results |
| OpenAI | `GPTBot` | Collects content for model training |
| OpenAI | `ChatGPT-User` | Fetches pages for user actions in ChatGPT and Custom GPTs |
| OpenAI | `OAI-AdsBot` | Checks landing pages of ads submitted to ChatGPT |
| [Anthropic](https://support.claude.com/en/articles/8896518) | `ClaudeBot` | Collects content for model training |
| Anthropic | `Claude-SearchBot` | Improves search result quality for Claude |
| Anthropic | `Claude-User` | Fetches pages when a Claude user asks |
| [Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | `Google-Extended` | *robots.txt only*: Gemini training and grounding; no effect on Google Search |
| Google | `Google-CloudVertexBot` | Crawls requested by site owners for Vertex AI Agents |
| [Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers) | `Google-Agent` | Agents on Google infrastructure acting on a user's request |
| [Microsoft](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0) | `Bingbot` | Bing's standard crawler; handles most of Bing's crawling |
| [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) | `PerplexityBot` | Surfaces sites in Perplexity search results; not used for training |
| Perplexity | `Perplexity-User` | Fetches pages when a Perplexity user asks |
| [Apple](https://support.apple.com/en-us/119829) | `Applebot` | Search in Spotlight, Siri, and Safari; may also ground Apple AI answers |
| Apple | `Applebot-Extended` | *robots.txt only*: opts content out of Apple's AI training |
| [Meta](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers) | `Meta-ExternalAgent` | Training and indexing for Meta AI products |
| Meta | `meta-webindexer` | Indexing for Meta AI search citations |
| Meta | `Meta-ExternalFetcher` | Fetches pages on user request |
| [Amazon](https://developer.amazon.com/docs/amazonbot/amazonbot.html) | `Amazonbot` | General crawling; content may be used for training |
| Amazon | `Amzn-SearchBot` | Search experiences such as Alexa |
| Amazon | `Amzn-User` | Live fetches on behalf of users |
| [Mistral](https://docs.mistral.ai/robots) | `MistralAI-User` | User-requested fetches; no automatic crawling or training |
| [DuckDuckGo](https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot) | `DuckAssistBot` | Fetches sources for AI-assisted answers |
| [Common Crawl](https://commoncrawl.org/ccbot) | `CCBot` | Builds Common Crawl's open web archive |
| ByteDance | `Bytespider` | Widely reported AI crawler; no official vendor doc found |

**Preference signals.** An [IETF draft](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/) defines a `__usage_ai-training` robots.txt group that states a preference about AI training across providers. [Anthropic](https://support.claude.com/en/articles/8896518) recognizes it as of October 30, 2026, and rules that name ClaudeBot take priority. [Bing](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/) will honor it from February 1, 2027, plus page-level `ai-training` and `ai-grounding` meta preferences. [Google](https://developers.google.com/search/blog/2026/10/ai-training-control) aims to support the shared token in 2027 and treats an opt-out as a Google-Extended disallow when Google-Extended is not named.

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
| [The SEO-to-GEO Gap](https://ssrn.com/abstract=6476021) | 2026 | Compares traditional SEO and GEO ranking-factor evidence and argues for a reweighting model rather than SEO replacement |
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

Add an entry to the appropriate `data/sites/*.yaml` file and submit a PR. CI automatically verifies authority, AI crawler access, link type, and calculates a GEO score.

### Add a repo or tool

Add an entry to the appropriate `data/repos/*.yaml` file and submit a PR. CI verifies the repo exists, checks star count, age, and flags archived or forked repos.

### Or just open an issue

Use our [issue templates](https://github.com/deeflect/awesome-geo/issues/new/choose) to submit a platform or repo — no YAML editing required.

---

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related rights to this work.

---

### Curated by

Curated by [Dee](https://deeflect.com) — designer turned AI engineer, currently obsessed with whether ChatGPT actually mentions you when someone searches.

Submit a platform, fix an entry, or just star it if you found something useful. CC0 — take it, fork it, ship it.

Working on GEO and want this built into your stack? [dee.agency](https://dee.agency?utm_source=awesomegeo&utm_medium=readme).

[deeflect.com](https://deeflect.com) · [Wikidata](https://www.wikidata.org/entity/Q138828544) · [LinkedIn](https://www.linkedin.com/in/dkargaev/) · [X](https://x.com/deeflectcom)
