# Contributing to Awesome GEO

Thanks for helping improve Awesome GEO. You can contribute **platforms** (sites where you build GEO presence) or **repos & tools** (open-source projects for GEO optimization).

This repo is the source of truth for the catalog: data files, verification scripts, and the generated README.

## Quick start

1. Pick the right data file
2. Add your entry at the bottom
3. Run `npm ci` and `npm run validate` (typecheck, data check, README regeneration)
4. Submit a PR
5. CI automatically verifies your submission
6. Maintainer reviews + merges

`README.md` is generated from `data/` by `scripts/generate-readme.ts`. Don't edit it by hand; CI regenerates it after merge.

Or just [open an issue](https://github.com/deeflect/awesome-geo/issues/new/choose) — we have templates for both platforms and repos.

---

## Adding a Platform

### Data structure

- `data/categories.yaml` — category definitions
- `data/sites/*.yaml` — one YAML array per category

### Required fields

```yaml
- name: Platform Name
  url: https://example.com
  category: developer-profiles    # must match filename
  description: One-line summary
  sampleProfile: https://example.com/user/someone   # real public page, not homepage
```

### Optional fields

`dr`, `linkType`, `effort`, `verified`, `lastVerified`, `geoScore`, `geoTier`, `geoSignals`, `aiAccess`, `indexable`, `profileLinkDofollow`, `aiCrawled`

You don't need to fill these — CI calculates them automatically.

### What CI checks (platforms)

| Check | What happens |
|-------|-------------|
| Robots.txt | AI bot access detected for 7 crawlers |
| Authority | Normalized authority via OpenPageRank, plus Tranco rank |
| Link type | Dofollow/nofollow analysis on sample page |
| Indexability | HTTP status, noindex tags, meta robots |
| GEO Score | Composite score calculated (0-100) |

CI posts a verification report as a PR comment. Results: ✅ Verified, ⚠️ Low GEO value, ❌ Failed.

### Platform guidelines

- Free platforms only
- One platform per PR preferred
- Use a real public listing/profile URL for `sampleProfile`, not the homepage
- No spammy or low-value directories
- Keep descriptions short and factual
- Don't remove unrelated entries

---

## Adding a Repo or Tool

### Data structure

- `data/repo-categories.yaml` — category definitions
- `data/repos/*.yaml` — one YAML array per category

### Categories

| ID | Name |
|----|------|
| `geo-research` | Research & Frameworks |
| `llms-txt` | llms.txt Ecosystem |
| `ai-crawler-management` | AI Crawler Management |
| `geo-monitoring` | GEO Monitoring & Tracking |
| `structured-data` | Structured Data & Schema |
| `geo-toolkits` | GEO Toolkits & Skills |

### Required fields

```yaml
- name: Project Name
  repo: owner/repo-name               # GitHub slug
  url: https://github.com/owner/repo-name
  category: geo-toolkits              # must match filename
  description: One-line summary of what it does
  stars: 150                          # approximate, CI verifies
  language: Python                    # primary language (or null)
  type: tool                          # see types below
  maintained: true
```

### Valid types

| Type | Use for |
|------|---------|
| `tool` | Standalone tools, CLI utilities, web apps |
| `library` | Importable packages/libraries |
| `research` | Academic research code, papers with code |
| `reference` | Curated lists, directories, snippet collections |
| `standard` | Specifications, protocols, standards |
| `skill` | AI agent skills (Claude Code, Cursor, etc.) |
| `framework` | Frameworks and boilerplates |

### What CI checks (repos)

| Check | Criteria |
|-------|----------|
| Exists | Repo is public and accessible |
| Stars | Minimum 10 stars |
| Age | At least 7 days old |
| Not archived | Must be actively available |
| Not a fork | Must be the original repo |
| Activity | Warns if no commits in 365+ days |
| Star accuracy | Flags if claimed stars are wildly off |

CI posts a verification report as a PR comment. Results: ✅ Verified, ⚠️ Review, ❌ Failed.

### Repo guidelines

- GitHub repos only
- Must be related to GEO / AI SEO / AI search optimization
- Minimum 10 stars (proves real usage)
- Not archived, not a fork (link to the original)
- One repo per PR preferred
- Keep descriptions factual — no marketing language
- Don't remove unrelated entries
- Disclose if it's your own repo

---

## Decision tree for maintainers

```
New submission PR arrives
  │
  ├─ CI runs automatically
  │   ├─ ✅ All checks pass → review description, merge
  │   ├─ ⚠️ Warnings → check if issues are dealbreakers
  │   └─ ❌ Failed → close or request fixes
  │
  ├─ Is it relevant to GEO?
  │   ├─ Yes → continue
  │   └─ No → close with comment
  │
  ├─ Is it spam / self-promotion with no value?
  │   ├─ Yes → close
  │   └─ No → continue
  │
  └─ Merge ✅
```

## License

By contributing, you agree that your contributions will be licensed under CC0 1.0.
