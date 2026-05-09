# Awesome GEO [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of **168 free platforms** and **45 open-source repos & tools** for **Generative Engine Optimization (GEO)** — SEO for the AI era.

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
| Total platforms | 168 |
| Open-source repos & tools | 45 |
| Automated checks completed | 168 |
| Representative public pages seeded | 104 |
| Root-fallback checks | 64 |
| AI-discoverable (at least 1 major crawler allowed) | 142 |
| 🟢 High GEO value (75+) | 74 |
| 🟡 Medium GEO value (50-74) | 78 |
| 🔴 Low GEO value (<50) | 16 |

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

- [Developer Profiles](#developer-profiles) (30)
- [Business Directories](#business-directories) (27)
- [Content Syndication](#content-syndication) (26)
- [Community Platforms](#community-platforms) (14)
- [Social Profiles](#social-profiles) (30)
- [Knowledge Bases](#knowledge-bases) (8)
- [Design Portfolios](#design-portfolios) (9)
- [Niche Directories](#niche-directories) (13)
- [Social Bookmarking](#social-bookmarking) (11)
- [Open-Source Repos & Tools](#open-source-repos--tools)
  - [Research & Frameworks](#research-frameworks) (8)
  - [llms.txt Ecosystem](#llms-txt-ecosystem) (10)
  - [AI Crawler Management](#ai-crawler-management) (3)
  - [GEO Monitoring & Tracking](#geo-monitoring-tracking) (5)
  - [Structured Data & Schema](#structured-data-schema) (7)
  - [GEO Toolkits & Skills](#geo-toolkits-skills) (12)
- [AI Discoverability](#ai-discoverability)
- [Research & Reading](#research--reading)
- [Contributing](#contributing)

---

## Platforms

> Core signals are checked automatically. Authority is a normalized Open PageRank score, and popularity is based on Tranco rank. GEO score is a reference-likelihood model weighted toward crawl access, popularity, query fit, indexability, authority, and link value.
>
> Representative public pages are currently seeded for **104/168** platforms. Remaining entries fall back to the platform root until a better public page is sourced.
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
| [CodePen](https://codepen.io) | 61 | nofollow | low | ✅ Open | 79/100 | Frontend demo platform with profile links. |
| [DEV.to](https://dev.to) | 61 | nofollow | low | ✅ Open | 89/100 | Publish articles with canonical URLs back to your site. |
| [PyPI](https://pypi.org) | 55 | dofollow | low | ✅ Open | 89/100 | Python package index with project URLs. |
| [NuGet](https://www.nuget.org) | 54 | mixed | medium | ✅ Open | 87/100 | .NET package registry. |
| [RubyGems](https://rubygems.org) | 54 | mixed | medium | ✅ Open | 85/100 | Ruby package registry with profile pages. |
| [Glitch](https://glitch.com) | 53 | mixed | medium | ✅ Open | 83/100 | Web app platform with project pages. |
| [Packagist](https://packagist.org) | 53 | mixed | medium | ✅ Open | 88/100 | PHP/Composer package registry. |
| [Replit](https://replit.com) | 53 | nofollow | low | ✅ Open | 87/100 | Online IDE with public project profiles. |
| [Kaggle](https://www.kaggle.com) | 51 | mixed | medium | ✅ Open | 78/100 | Data science competition platform. |
| [LeetCode](https://leetcode.com) | 51 | mixed | medium | ✅ Open | 78/100 | Coding challenge platform. |
| [Observable](https://observablehq.com) | 50 | mixed | medium | ✅ Open | 83/100 | Data visualization notebooks. |
| [CodeSandbox](https://codesandbox.io) | 49 | mixed | medium | ✅ Open | 83/100 | Online IDE with public projects. |
| [Hashnode](https://hashnode.com) | 49 | dofollow | low | ✅ Open | 84/100 | Dev blog platform with custom domain support. |
| [Read the Docs](https://readthedocs.org) | 49 | mixed | medium | ✅ Open | 86/100 | Documentation hosting platform. |

<details>
<summary>🟡 Medium GEO Value (10 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Stack Overflow](https://stackoverflow.com) | 69 | nofollow | medium | — | 63/100 | Profile link + answer quality builds authority. |
| [Docker Hub](https://hub.docker.com) | 62 | mixed | medium | ⚠️ 2/5 | 62/100 | Container image registry with profiles. |
| [JSFiddle](https://jsfiddle.net) | 57 | mixed | medium | ⚠️ 2/5 | 74/100 | JavaScript playground with user profiles. |
| [Codeberg](https://codeberg.org) | 56 | mixed | medium | ❌ Blocked | 57/100 | Non-profit git hosting. |
| [Launchpad](https://launchpad.net) | 55 | mixed | medium | ❌ Blocked | 59/100 | Ubuntu/Canonical project hosting. |
| [crates.io](https://crates.io) | 53 | nofollow | low | ✅ Open | 74/100 | Rust package registry with author profiles. |
| [Google Developers](https://g.dev) | 49 | nofollow | low | ✅ Open | 70/100 | Google developer profile with custom URL. |
| [HackerRank](https://www.hackerrank.com) | 49 | mixed | medium | ✅ Open | 73/100 | Developer skills platform. |
| [Gitea](https://gitea.com) | 43 | mixed | medium | ⚠️ 1/5 | 58/100 | Self-hosted git with public instances. |
| [Exercism](https://exercism.org) | 42 | mixed | medium | ⚠️ 2/5 | 68/100 | Coding exercises with public profiles. |
</details>

<details>
<summary>🔴 Low GEO Value (1 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [npm](https://www.npmjs.com) | 64 | nofollow | low | — | 49/100 | Package author page links to homepage. |
</details>

### Business Directories

> Company and professional directories

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [LinkedIn Company](https://linkedin.com) | 100 | nofollow | low | ⚠️ 1/5 | 80/100 | Company page with website link. |
| [Foursquare](https://foursquare.com) | 62 | mixed | medium | ⚠️ 4/5 | 86/100 | Location-based business listings. |
| [TrustPilot](https://www.trustpilot.com) | 62 | mixed | medium | ✅ Open | 81/100 | Consumer review platform. |
| [Better Business Bureau](https://www.bbb.org) | 58 | mixed | medium | ✅ Open | 88/100 | Business accreditation directory. |
| [G2](https://www.g2.com) | 58 | mixed | medium | ✅ Open | 78/100 | Software review platform. |
| [Capterra](https://www.capterra.com) | 57 | mixed | medium | ✅ Open | 77/100 | Software comparison directory. |
| [Manta](https://www.manta.com) | 53 | mixed | medium | ✅ Open | 75/100 | Small business directory. |
| [Bing Places](https://www.bingplaces.com) | 48 | mixed | medium | ✅ Open | 76/100 | Bing business listings. |
| [Chamber of Commerce](https://www.chamberofcommerce.com) | 47 | mixed | medium | ✅ Open | 81/100 | Business membership directory. |

<details>
<summary>🟡 Medium GEO Value (15 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Google Business](https://business.google.com) | 67 | nofollow | medium | ✅ Open | 64/100 | Local business listing in Google ecosystem. |
| [Yelp](https://www.yelp.com) | 66 | mixed | medium | ❌ Blocked | 61/100 | Local business reviews. |
| [Glassdoor](https://www.glassdoor.com) | 60 | mixed | medium | — | 50/100 | Company reviews and salaries. |
| [Crunchbase](https://crunchbase.com) | 59 | nofollow | medium | ⚠️ 1/5 | 63/100 | Person and company profiles for startups. |
| [AngelList / Wellfound](https://wellfound.com) | 50 | dofollow | medium | ❌ Blocked | 58/100 | Startup ecosystem profiles. |
| [F6S](https://f6s.com) | 49 | dofollow | low | ⚠️ 2/5 | 63/100 | Startup directory with founder profiles. |
| [Alignable](https://www.alignable.com) | 47 | mixed | medium | ❌ Blocked | 51/100 | Small business networking. |
| [DesignRush](https://www.designrush.com) | 47 | mixed | medium | ✅ Open | 73/100 | Agency directory for design/dev. |
| [Apple Maps Connect](https://mapsconnect.apple.com) | 46 | mixed | medium | ✅ Open | 69/100 | Apple Maps business listings. |
| [GoodFirms](https://goodfirms.co) | 46 | dofollow | medium | ✅ Open | 72/100 | Service provider review directory. |
| [BizSugar](https://bizsugar.com) | 42 | mixed | medium | ✅ Open | 73/100 | Small business content sharing. |
| [Sortlist](https://www.sortlist.com) | 41 | mixed | medium | ✅ Open | 69/100 | Agency matching platform. |
| [Kompass](https://www.kompass.com) | 39 | mixed | medium | ✅ Open | 71/100 | International business directory. |
| [AppFutura](https://www.appfutura.com) | 37 | mixed | medium | ✅ Open | 59/100 | App development directory. |
| [TopDevelopers](https://www.topdevelopers.co) | 35 | mixed | medium | ✅ Open | 71/100 | Developer company directory. |
</details>

<details>
<summary>🔴 Low GEO Value (3 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Product Hunt](https://producthunt.com) | 62 | nofollow | low | — | 49/100 | Launch products and build maker profile. |
| [Clutch](https://clutch.co) | 54 | dofollow | medium | — | 48/100 | Agency and service provider directory. |
| [Yellow Pages](https://www.yellowpages.com) | 50 | mixed | medium | — | 47/100 | Classic business directory. |
</details>

### Content Syndication

> Platforms for republishing content

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [LinkedIn Articles](https://linkedin.com) | 100 | nofollow | low | ⚠️ 1/5 | 80/100 | Professional audience, high authority domain. |
| [Blogger](https://www.blogger.com) | 70 | mixed | medium | ✅ Open | 87/100 | Google blogging platform. |
| [Tumblr](https://www.tumblr.com) | 70 | mixed | medium | ⚠️ 3/5 | 80/100 | Microblogging platform. |
| [Issuu](https://issuu.com) | 69 | mixed | medium | ✅ Open | 85/100 | Digital publication platform. |
| [SlideShare](https://www.slideshare.net) | 68 | mixed | medium | ⚠️ 4/5 | 81/100 | Presentation sharing platform. |
| [WordPress.com](https://wordpress.com) | 66 | mixed | medium | ✅ Open | 86/100 | Hosted WordPress blogs. |
| [Notion](https://notion.so) | 65 | mixed | medium | ✅ Open | 84/100 | Published Notion pages. |
| [Scribd](https://www.scribd.com) | 65 | mixed | medium | ⚠️ 4/5 | 81/100 | Document sharing platform. |
| [CSS-Tricks](https://css-tricks.com) | 60 | mixed | medium | ✅ Open | 81/100 | Frontend dev resource. |
| [Smashing Magazine](https://www.smashingmagazine.com) | 60 | mixed | medium | ✅ Open | 83/100 | Web dev publication accepting articles. |
| [Substack](https://substack.com) | 60 | dofollow | low | ✅ Open | 88/100 | Newsletter platform with web presence. |
| [freeCodeCamp](https://www.freecodecamp.org) | 58 | mixed | medium | ✅ Open | 81/100 | Coding education with contributor profiles. |
| [Telegraph](https://telegra.ph) | 58 | mixed | medium | ✅ Open | 82/100 | Instant publishing by Telegram. |
| [Ghost](https://ghost.org) | 57 | mixed | medium | ✅ Open | 82/100 | Modern publishing platform. |
| [Hacker Noon](https://hackernoon.com) | 57 | mixed | medium | ✅ Open | 81/100 | Tech blog platform with author profiles. |

<details>
<summary>🟡 Medium GEO Value (9 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Medium](https://medium.com) | 76 | nofollow | low | ⚠️ 3/5 | 70/100 | Set canonical URL to your original post. |
| [SitePoint](https://www.sitepoint.com) | 57 | mixed | medium | ✅ Open | 69/100 | Web dev articles platform. |
| [Hacker News](https://news.ycombinator.com) | 54 | nofollow | low | ✅ Open | 73/100 | Tech audience, very high impact if frontpaged. |
| [Vocal.media](https://vocal.media) | 54 | mixed | medium | ⚠️ 2/5 | 68/100 | General content platform with payouts. |
| [HubPages](https://hubpages.com) | 52 | mixed | medium | ✅ Open | 72/100 | Content network with niche sites. |
| [Newsbreak](https://www.newsbreak.com) | 51 | mixed | medium | ❌ Blocked | 52/100 | Local news content platform. |
| [LogRocket Blog](https://blog.logrocket.com) | 48 | mixed | medium | ✅ Open | 63/100 | Frontend monitoring blog accepting posts. |
| [Thinkers360](https://thinkers360.com) | 43 | dofollow | medium | ✅ Open | 66/100 | Thought leadership platform with rankings. |
| [ArticleBiz](https://www.articlebiz.com) | 38 | mixed | medium | ✅ Open | 65/100 | Article directory. |
</details>

<details>
<summary>🔴 Low GEO Value (2 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Quora Spaces](https://www.quora.com) | 68 | mixed | medium | ⚠️ 1/5 | 48/100 | Q&A platform with content spaces. |
| [EzineArticles](https://ezinearticles.com) | 47 | mixed | medium | — | 41/100 | Long-running article directory. |
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
<summary>🟡 Medium GEO Value (7 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Reddit](https://reddit.com) | 80 | nofollow | low | ❌ Blocked | 59/100 | Subreddit participation, profile links. |
| [CNET Forums](https://www.cnet.com/forums) | 64 | mixed | medium | ⚠️ 1/5 | 60/100 | Tech discussion forums. |
| [DZone](https://dzone.com) | 55 | mixed | medium | ⚠️ 4/5 | 69/100 | Developer content zone. |
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
| [IndieHackers](https://www.indiehackers.com) | 48 | mixed | medium | — | 47/100 | Builder community with product listings. |
| [Lobsters](https://lobste.rs) | 42 | mixed | medium | ❌ Blocked | 45/100 | Invite-only tech link aggregator. |
</details>

### Social Profiles

> Social media and portfolio sites

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [YouTube](https://youtube.com) | 100 | nofollow | low | ✅ Open | 89/100 | Channel and video description links. |
| [Vimeo](https://vimeo.com) | 83 | mixed | medium | ⚠️ 2/5 | 77/100 | Video hosting with profiles. |
| [Telegram](https://t.me) | 79 | mixed | medium | ✅ Open | 86/100 | Messaging with public channels. |
| [Discord](https://discord.com) | 75 | mixed | medium | ✅ Open | 86/100 | Community platform with server listings. |
| [Twitch](https://twitch.tv) | 75 | mixed | medium | ✅ Open | 76/100 | Streaming platform with bio links. |
| [Goodreads](https://www.goodreads.com) | 65 | mixed | medium | ⚠️ 4/5 | 80/100 | Book reviews with author profiles. |
| [About.me](https://about.me) | 62 | dofollow | low | ✅ Open | 84/100 | Simple personal landing page. |
| [Gravatar](https://gravatar.com) | 62 | dofollow | low | ⚠️ 3/5 | 78/100 | Universal avatar with verified profile links. |
| [Dribbble](https://dribbble.com) | 61 | nofollow | low | ✅ Open | 82/100 | Design showcase platform. |
| [Mastodon](https://mastodon.social) | 61 | mixed | medium | ⚠️ 4/5 | 79/100 | Federated social profile |
| [Bento](https://bento.me) | 53 | mixed | medium | ✅ Open | 78/100 | Developer link-in-bio. |
| [Carrd](https://carrd.co) | 47 | mixed | medium | ✅ Open | 79/100 | One-page personal sites. |

<details>
<summary>🟡 Medium GEO Value (14 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Instagram](https://instagram.com) | 100 | mixed | medium | ❌ Blocked | 60/100 | Photo/video with bio link. |
| [Pinterest](https://pinterest.com) | 85 | mixed | medium | ❌ Blocked | 58/100 | Visual bookmarking with profile links. |
| [TikTok](https://tiktok.com) | 85 | mixed | medium | ❌ Blocked | 58/100 | Short video with bio link. |
| [Flickr](https://flickr.com) | 79 | mixed | medium | ❌ Blocked | 56/100 | Photo sharing with profile links. |
| [Linktree](https://linktr.ee) | 76 | mixed | medium | ⚠️ 1/5 | 68/100 | Link-in-bio platform. |
| [Bluesky](https://bsky.app) | 68 | mixed | medium | ✅ Open | 74/100 | Decentralized microblogging. |
| [WhatsApp Channels](https://whatsapp.com/channel) | 68 | mixed | medium | ⚠️ 1/5 | 57/100 | Meta messaging channels. |
| [Behance](https://behance.net) | 67 | nofollow | low | ⚠️ 2/5 | 72/100 | Adobe design portfolio platform. |
| [Threads](https://www.threads.net) | 65 | mixed | medium | ❌ Blocked | 53/100 | Meta microblogging platform. |
| [Letterboxd](https://letterboxd.com) | 56 | mixed | medium | ⚠️ 2/5 | 60/100 | Film reviews with profiles. |
| [Bio.link](https://bio.link) | 51 | mixed | medium | ✅ Open | 68/100 | Link-in-bio alternative. |
| [Daily.dev](https://daily.dev) | 45 | mixed | medium | ✅ Open | 74/100 | Developer news with profiles. |
| [Peerlist](https://peerlist.io) | 44 | mixed | medium | ✅ Open | 59/100 | Professional profiles for devs. |
| [Clay](https://clay.earth) | 43 | mixed | medium | ✅ Open | 69/100 | Personal CRM with public profile. |
</details>

<details>
<summary>🔴 Low GEO Value (4 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [X / Twitter](https://x.com) | 89 | nofollow | low | ❌ Blocked | 47/100 | Bio link, high social signal. |
| [Spotify for Podcasters](https://podcasters.spotify.com) | 62 | mixed | medium | ❌ Blocked | 36/100 | Podcast hosting with profiles. |
| [Read.cv](https://read.cv) | 46 | mixed | medium | — | 24/100 | Minimal professional profiles. |
| [Polywork](https://www.polywork.com) | 44 | mixed | medium | — | 26/100 | Professional identity platform. |
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
<summary>🟡 Medium GEO Value (6 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Coroflot](https://www.coroflot.com) | 48 | mixed | medium | ⚠️ 2/5 | 60/100 | Design portfolio and jobs. |
| [Muzli](https://muz.li) | 45 | mixed | medium | ✅ Open | 74/100 | Design inspiration platform. |
| [CSS Design Awards](https://www.cssdesignawards.com) | 43 | mixed | medium | ✅ Open | 69/100 | CSS/web design awards. |
| [SiteInspire](https://www.siteinspire.com) | 42 | mixed | medium | ⚠️ 4/5 | 56/100 | Web design showcase. |
| [Carbonmade](https://carbonmade.com) | 41 | mixed | medium | ✅ Open | 66/100 | Online portfolio builder. |
| [Dunked](https://dunked.com) | 39 | mixed | medium | ✅ Open | 64/100 | Portfolio hosting for creatives. |
</details>

<details>
<summary>🔴 Low GEO Value (1 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Figma Community](https://figma.com/community) | 65 | mixed | medium | ⚠️ 1/5 | 48/100 | Design file sharing. |
</details>

### Niche Directories

> Specialized expert and industry directories

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Contra](https://contra.com) | 46 | mixed | medium | ✅ Open | 76/100 | Freelance portfolio platform. |

<details>
<summary>🟡 Medium GEO Value (10 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Toptal](https://www.toptal.com) | 59 | mixed | medium | ✅ Open | 74/100 | Top freelancer network. |
| [MuckRack](https://muckrack.com) | 54 | mixed | medium | ⚠️ 2/5 | 63/100 | PR and journalist platform. |
| [Maven](https://maven.com) | 47 | mixed | medium | ✅ Open | 73/100 | Expert teaching platform. |
| [Clarity.fm](https://clarity.fm) | 46 | mixed | medium | ✅ Open | 73/100 | Expert call marketplace. |
| [Gun.io](https://gun.io) | 45 | mixed | medium | ✅ Open | 70/100 | Developer freelance platform. |
| [Arc.dev](https://arc.dev) | 42 | mixed | medium | ✅ Open | 73/100 | Remote developer jobs. |
| [SourceBottle](https://www.sourcebottle.com) | 39 | mixed | medium | ✅ Open | 64/100 | Journalist query platform. |
| [Help a B2B Writer](https://helpab2bwriter.com) | 38 | mixed | medium | ✅ Open | 64/100 | B2B content expert matching. |
| [Qwoted](https://app.qwoted.com) | 37 | dofollow | low | ⚠️ 2/5 | 54/100 | Expert quote platform. |
| [HARO / Connectively](https://www.connectively.us) | 36 | mixed | medium | ✅ Open | 54/100 | Journalist source requests. |
</details>

<details>
<summary>🔴 Low GEO Value (2 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Working Not Working](https://workingnotworking.com) | 45 | mixed | medium | ⚠️ 2/5 | 49/100 | Creative freelancer directory. |
| [Featured.com](https://featured.com) | 40 | mixed | medium | — | 30/100 | Expert source for journalists. |
</details>

### Social Bookmarking

> Content curation and bookmarking platforms

#### 🟢 High GEO Value

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Diigo](https://www.diigo.com) | 66 | mixed | medium | ✅ Open | 78/100 | Social bookmarking and annotation. |
| [Digg](https://digg.com) | 61 | mixed | medium | ✅ Open | 79/100 | News aggregator. |
| [Pocket](https://getpocket.com) | 59 | mixed | medium | ✅ Open | 77/100 | Save and share articles. |
| [Pearltrees](https://www.pearltrees.com) | 56 | mixed | medium | ✅ Open | 76/100 | Visual bookmarking platform. |
| [Scoop.it](https://www.scoop.it) | 56 | mixed | medium | ✅ Open | 76/100 | Content curation for marketing. |
| [Wakelet](https://wakelet.com) | 52 | mixed | medium | ✅ Open | 76/100 | Content curation platform. |

<details>
<summary>🟡 Medium GEO Value (5 platforms)</summary>

| Platform | Authority | Link Type | Effort | AI Access | GEO Score | Notes |
|----------|-----------|-----------|--------|-----------|-----------|-------|
| [Flipboard](https://flipboard.com) | 56 | mixed | medium | ⚠️ 3/5 | 61/100 | Content curation magazines. |
| [Raindrop.io](https://raindrop.io) | 52 | mixed | medium | ✅ Open | 74/100 | Bookmark manager with public collections. |
| [Paper.li](https://paper.li) | 50 | mixed | medium | ✅ Open | 72/100 | Automated content curation. |
| [Start.me](https://start.me) | 49 | mixed | medium | ✅ Open | 62/100 | Start page with public bookmarks. |
| [StumbleUpon / Mix](https://mix.com) | 47 | mixed | medium | ⚠️ 2/5 | 61/100 | Content discovery platform. |
</details>

---

## Open-Source Repos & Tools

> GitHub repositories, libraries, and tools for GEO optimization — sorted by stars.

### Research & Frameworks

> Academic research, benchmarks, and foundational GEO frameworks

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [Awesome Generative Engine Optimization](https://github.com/amplifying-ai/awesome-generative-engine-optimization) | ⭐ 320 | 📚 Reference | — | Curated guide to GEO resources — guides, tools, and research for AI search visibility. |
| [GEO (Princeton)](https://github.com/GEO-optim/GEO) | ⭐ 246 | 🔬 Research | Python | Original GEO research from Princeton — KDD '24 paper with GEO-BENCH benchmark. Proves 40% visibility boost. |
| [Awesome GEO (luka2chat)](https://github.com/luka2chat/awesome-geo) | ⭐ 142 | 📚 Reference | — | Broad curated GEO resource list covering research papers, tools, AI search engines, analytics, communities, and checklists. |
| [AutoGEO](https://github.com/cxcscmu/AutoGEO) | ⭐ 127 | 🔬 Research | Python | ICLR '26 framework that learns generative-engine preferences and rewrites web content for higher visibility while preserving utility. |
| [Awesome GEO (Research)](https://github.com/DavidHuji/Awesome-GEO) | ⭐ 96 | 📚 Reference | — | Curated collection of GEO research papers and academic resources. |
| [E-GEO](https://github.com/psbagga17/E-GEO) | ⭐ 27 | 🔬 Research | Python | E-commerce GEO benchmark with 7,000+ product queries and experiments on rewriting heuristics for generative shopping engines. |
| [AgenticGEO](https://github.com/AIcling/agentic_geo) | ⭐ 21 | 🔬 Research | Python | Self-evolving agentic GEO system using strategy memory and a surrogate critic to adapt content optimization to black-box engines. |
| [C-SEO Bench](https://github.com/parameterlab/c-seo-bench) | ⭐ 16 | 🔬 Research | Jupyter Notebook | NeurIPS D&B '25 benchmark testing whether conversational SEO techniques improve rankings in AI-mediated search and recommendations. |

### llms.txt Ecosystem

> Tools and references for the llms.txt standard

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [Firecrawl](https://github.com/mendableai/firecrawl) | ⭐ 30.0k | 🔧 Tool | TypeScript | Web data API for AI — turn websites into LLM-ready markdown. llms.txt generation built in. |
| [llms.txt Specification](https://github.com/AnswerDotAI/llms-txt) | ⭐ 2.3k | 📐 Standard | Jupyter Notebook | The official llms.txt spec by Jeremy Howard. The standard for making your site AI-readable. |
| [MCPDoc](https://github.com/langchain-ai/mcpdoc) | ⭐ 979 | 🔧 Tool | Python | MCP server that exposes llms.txt documentation to IDEs and coding agents with auditable fetches. |
| [llms-txt-hub](https://github.com/thedaviddias/llms-txt-hub) | ⭐ 815 | 📚 Reference | TypeScript | Largest directory of sites implementing llms.txt — reference list and tooling. |
| [llmstxt Generator (Firecrawl)](https://github.com/firecrawl/llmstxt-generator) | ⭐ 519 | 🔧 Tool | TypeScript | Generate llms.txt and llms-full.txt from any URL. By the Firecrawl team (YC-backed). |
| [create-llmstxt-py](https://github.com/firecrawl/create-llmstxt-py) | ⭐ 301 | 🔧 Tool | Python | Firecrawl Python generator for producing llms.txt files from websites. |
| [Nuxt LLMs](https://github.com/nuxt-content/nuxt-llms) | ⭐ 164 | 📦 Library | TypeScript | Nuxt module that generates and prerenders /llms.txt and optional /llms-full.txt documentation. |
| [llmstxt](https://github.com/dotenvx/llmstxt) | ⭐ 143 | 🔧 Tool | JavaScript | CLI that converts sitemap.xml entries into llms.txt markdown links. |
| [mkdocs-llmstxt](https://github.com/pawamoy/mkdocs-llmstxt) | ⭐ 115 | 📦 Library | Python | MkDocs plugin for generating /llms.txt and optional llms-full.txt from documentation sections. |
| [llms-generator](https://github.com/Francesco-Fera/llms-generator) | ⭐ 50 | 🔧 Tool | TypeScript | Free no-code tool for generating llms.txt files for LLM SEO compliance. |

### AI Crawler Management

> Control and monitor AI bot access to your content

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [ai.robots.txt](https://github.com/ai-robots-txt/ai.robots.txt) | ⭐ 1.5k | 📚 Reference | — | Community-maintained list of AI bots to block. Generates robots.txt, .htaccess, nginx, HAProxy configs. |
| [AI Training Opt-Out](https://github.com/healsdata/ai-training-opt-out) | ⭐ 160 | 📚 Reference | HTML | Reference repo for AI training opt-out tags, headers, robots.txt directives, and .well-known patterns. |
| [SEO Crawler MCP](https://github.com/houtini-ai/seo-crawler-mcp) | ⭐ 50 | 🔧 Tool | TypeScript | MCP server that crawls and analyzes sites for SEO issues including AI crawler access. Works in any AI assistant or terminal. |

### GEO Monitoring & Tracking

> Track brand visibility across AI search engines

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [AiCMO](https://github.com/AICMO/ai-cmo) | ⭐ 100 | 🔧 Tool | TypeScript | Open-source AI SEO platform. Monitor brand visibility across ChatGPT, Claude, Perplexity, Gemini. Self-hostable. |
| [GetCito](https://github.com/ai-search-guru/getcito-worlds-first-open-source-aio-aeo-or-geo-tool) | ⭐ 89 | 🔧 Tool | TypeScript | Open-source AI search optimization tool for AIO, AEO, and GEO visibility workflows. |
| [Searchstack AEO](https://github.com/alexpospekhov/searchstack-aeo) | ⭐ 67 | 🔧 Tool | Python | CLI stack for monitoring visibility across Google, AI Overviews, ChatGPT, Perplexity, Claude, and Grok with markdown reports. |
| [gego](https://github.com/AI2HU/gego) | ⭐ 51 | 🔧 Tool | Go | Open-source GEO tracker — schedules prompts across LLMs, extracts keywords, tracks visibility over time. |
| [GEO Analyzer](https://github.com/houtini-ai/geo-analyzer) | ⭐ 18 | 🔧 Tool | TypeScript | Local GEO analysis powered by Claude. Content analysis for AI search visibility scoring. |

### Structured Data & Schema

> Schema.org, JSON-LD, and structured data tools

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [Schema.org](https://github.com/schemaorg/schemaorg) | ⭐ 6.0k | 📐 Standard | HTML | Official Schema.org schemas and supporting software — the foundational vocabulary for JSON-LD structured data. |
| [schema-org (Spatie)](https://github.com/spatie/schema-org) | ⭐ 1.5k | 📦 Library | PHP | Fluent PHP builder for all Schema.org types and JSON-LD generation. Battle-tested. |
| [schema-dts](https://github.com/google/schema-dts) | ⭐ 1.2k | 📦 Library | TypeScript | TypeScript types for Schema.org JSON-LD vocabulary, useful for type-safe structured data generation. |
| [react-schemaorg](https://github.com/google/react-schemaorg) | ⭐ 516 | 📦 Library | TypeScript | Type-checked Schema.org JSON-LD components for React applications. |
| [Structured Data JSON-LD](https://github.com/JayHoltslander/Structured-Data-JSON-LD) | ⭐ 500 | 📚 Reference | — | Ready-to-use JSON-LD snippets in Google-preferred format for every common schema type. |
| [Schema Generator](https://github.com/mustafapiplodi/schema-generator) | ⭐ 50 | 🔧 Tool | JavaScript | Free schema markup generator for 14 schema types with real-time validation and instant code generation. |
| [SEO Graph](https://github.com/jdevalk/seo-graph) | ⭐ 20 | 📦 Library | TypeScript | Agent-ready Schema.org JSON-LD graph builder for JavaScript with an Astro integration. |

### GEO Toolkits & Skills

> CLI tools, agent skills, and automation for GEO optimization

| Repository | Stars | Type | Language | Description |
|------------|-------|------|----------|-------------|
| [GTM Engineer Skills](https://github.com/onvoyage-ai/gtm-engineer-skills) | ⭐ 909 | 🤖 Skill | HTML | Claude Code skill for website AEO/GEO audits with foundational checks, intelligence dimensions, and framework-specific fixes. |
| [Open SEO](https://github.com/every-app/open-seo) | ⭐ 669 | 🔧 Tool | TypeScript | Self-hosted open-source SEO tool — keyword research, competitor analysis, backlink tracking, technical audits. AI-native. |
| [SEOnaut](https://github.com/StJudeWasHere/seonaut) | ⭐ 636 | 🔧 Tool | Go | Open-source SEO audit tool — crawls sites for broken links, redirects, missing meta tags, heading issues. Self-hostable. |
| [geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) | ⭐ 178 | 🤖 Skill | Python | GEO audit and optimization skill for making websites visible to ChatGPT, Perplexity, Claude, and Gemini. |
| [geo-optimizer](https://github.com/geo-team-red/geo-optimizer) | ⭐ 136 | ⚙️ Framework | Go | Pluggable Go framework for GEO optimization strategies with built-in tactics and custom strategy registration. |
| [eGEOagents](https://github.com/mverab/eGEOagents) | ⭐ 101 | 🤖 Skill | Python | Agent skills for optimizing content across ChatGPT, Perplexity, Claude, and Gemini. |
| [geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude) | ⭐ 100 | 🤖 Skill | Markdown | GEO-first SEO skill for Claude Code — citability scoring, AI crawler analysis, schema markup, PDF reports. |
| [claude-seo](https://github.com/AgriciDaniel/claude-seo) | ⭐ 100 | 🤖 Skill | Markdown | 13 sub-skills, 7 subagents for Claude Code — technical SEO, E-E-A-T, GEO/AEO, DataForSEO integration. |
| [SEO AGI](https://github.com/gbessoni/seo-agi) | ⭐ 100 | 🔧 Tool | Python | AI agent that writes pages Google ranks and LLMs cite. Built on DeerFlow with forensic competitive analysis and entity consensus. |
| [seo-geo-claude-skills](https://github.com/aaron-he-zhu/seo-geo-claude-skills) | ⭐ 50 | 🤖 Skill | Markdown | 20 SEO & GEO skills for Claude Code, Cursor, Codex. CORE-EEAT + CITE frameworks. |
| [seo-geo-toolkit](https://github.com/henu-wang/seo-geo-toolkit) | ⭐ 50 | 🔧 Tool | Python | CLI tools to optimize for both traditional and AI-powered search engines. |
| [ai-seo-tools (RivalSee)](https://github.com/RivalSee/ai-seo-tools) | ⭐ 50 | 🔧 Tool | — | Open-source tools and prompts for AI crawler optimization by RivalSee. |

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
| [llms.txt](https://llmstxt.org) | Markdown summary that helps agents and users find AI-readable site context | Emerging; useful defensive infrastructure |
| [llms-full.txt](https://llmstxt.org) | Expanded markdown content for deeper manual or agent ingestion | Emerging |
| robots.txt AI rules | Control which AI bots can crawl | Standard |

### Optimization Guides

- [LLMO Citation Matrix](docs/llmo-citation-matrix.md) — engine-specific citation surfaces and practical implications
- [Answer-First Content](docs/answer-first-content.md) — structure pages so humans and answer engines can extract claims cleanly
- [Schema sameAs Quality](docs/schema-sameas.md) — choose identity links that improve disambiguation instead of inflating profile count

### AI Crawler User-Agents

| Bot | Company | User-Agent |
|-----|---------|------------|
| OAI-SearchBot | OpenAI | `OAI-SearchBot` |
| GPTBot | OpenAI | `GPTBot` |
| ChatGPT-User | OpenAI | `ChatGPT-User` |
| Google-Extended | Google | `Google-Extended` |
| ClaudeBot | Anthropic | `ClaudeBot` |
| PerplexityBot | Perplexity | `PerplexityBot` |
| Bytespider | ByteDance | `Bytespider` |

---

## Research & Reading

### Academic Papers

| Paper | Year | Key Finding |
|-------|------|-------------|
| [GEO: Generative Engine Optimization](https://arxiv.org/abs/2311.09735) | 2024 (KDD) | The foundational GEO paper — GEO-BENCH benchmark proves 40% visibility boost via statistics and citation addition |
| [Ranking Manipulation for Conversational Search Engines](https://aclanthology.org/2024.emnlp-main.534/) | 2024 (EMNLP) | Shows how conversational search ranking can be manipulated; useful safety caveat for GEO tactics |
| [What Evidence Do Language Models Find Convincing?](https://aclanthology.org/2024.acl-long.403/) | 2024 (ACL) | Studies which evidence characteristics influence RAG-style language model answers |
| [How to Dominate AI Search](https://arxiv.org/abs/2509.08919) | 2025 | AI search has systematic bias toward earned media over brand-owned content; engine-specific strategies needed |
| [C-SEO Bench](https://arxiv.org/abs/2506.11097) | 2025 (NeurIPS D&B) | Benchmark testing whether conversational SEO methods work across QA and product recommendation settings |
| [AutoGEO](https://arxiv.org/abs/2510.11438) | 2026 (ICLR) | Learns generative-engine preferences and extracts content optimization rules |
| [Role-Augmented Intent-Driven G-SEO](https://arxiv.org/abs/2508.11158) | 2025 | Extends GEO-BENCH with intent modeling across informational roles; introduces G-Eval 2.0 |
| [E-GEO: GEO for E-Commerce](https://arxiv.org/abs/2511.20867) | 2025 | First e-commerce GEO benchmark — 7,000+ consumer product queries with rich intent and constraints |
| [AgenticGEO](https://arxiv.org/abs/2603.20213) | 2026 | Self-evolving agentic GEO system for content-conditioned optimization under black-box generative engines |
| [Beyond SEO: Transformer-Based Web Content Optimisation](https://arxiv.org/abs/2507.03169) | 2025 | Fine-tuned BART transformer for domain-specific GEO content optimization |
| [LLMs Generating Text with Citations](https://arxiv.org/abs/2305.14627) | 2023 (EMNLP) | ALCE benchmark for automatic citation evaluation — fluency, correctness, and citation quality |

### Industry Studies

- [Pew Research Center: Google users are less likely to click links when AI summaries appear](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) — 68,879-search panel study from 900 U.S. adults
- [Semrush: Do Backlinks Still Matter in AI Search?](https://www.semrush.com/blog/backlinks-ai-search-study/) — 1,000 domain study on authority vs. AI citation correlation
- [Semrush: AI Overviews Study](https://www.semrush.com/blog/semrush-ai-overviews-study/) — 10M+ keyword analysis of AI Overview trigger rates, intent patterns, and zero-click behavior
- [Semrush: Google AI Mode vs. Traditional Search & Other LLMs](https://www.semrush.com/blog/ai-mode-comparison-study/) — platform-comparison study on AI Mode, AI Overviews, ChatGPT, and Perplexity citation overlap
- [Ahrefs: AI Overviews Reduce Clicks](https://ahrefs.com/blog/?p=195053) — vendor CTR study estimating organic click loss when AI Overviews appear
- [BrightEdge: AI Overview citations and organic ranking overlap](https://www.brightedge.com/resources/weekly-ai-search-insights/rank-overlap-after-16-months-of-aio) — 16-month view of AI Overview citation overlap with organic results
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
