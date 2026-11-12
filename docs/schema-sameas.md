# Schema sameAs Quality

Schema.org defines `sameAs` as the "URL of a reference Web page that unambiguously indicates the item's identity", for example a Wikipedia page, a Wikidata entry or the official website ([schema.org](https://schema.org/sameAs)). Google's Organization markup accepts several `sameAs` URLs, such as social media or review-site profiles ([Google](https://developers.google.com/search/docs/appearance/structured-data/organization)). More links are not always better.

Last reviewed: 2026-11-10

## What To Expect

- `sameAs` is for identity and disambiguation. We found no study showing that it raises AI citations.
- One 2026 study found structured data looked effective only when comparing different websites, not pages within one site ([2610.15033](https://arxiv.org/abs/2610.15033)).
- Google says no special structured data is needed to appear in AI Overviews or AI Mode, and markup must match what's visible on the page ([Google](https://developers.google.com/search/docs/appearance/ai-features)).

## Prioritize

- Official and controlled profiles.
- Profiles that are populated, crawlable and consistent with the entity home.
- Profiles that link back to the canonical site or repeat the same core facts.
- Knowledge graph identifiers such as Wikidata, when the item is accurate and well sourced.
- Profiles that prove the entity's work, such as GitHub, Hugging Face, package registries, author pages or publication profiles.

## Avoid

- Empty profiles created only for a backlink.
- Unclaimed directory pages with wrong facts.
- Duplicate or abandoned handles.
- Directories that don't help disambiguation.
- Adding every profile you can find just to raise the count.

## Suggested Tiers

These tiers are a judgment call, not a measured ranking.

| Tier | Examples | Use |
|------|----------|-----|
| Tier 1 | Entity home, Wikidata, Wikipedia, LinkedIn, GitHub, ORCID, Crunchbase | Strong identity and disambiguation signals |
| Tier 2 | Medium, Substack, Hugging Face, Product Hunt, Muck Rack, Behance, Dribbble, Stack Overflow | Useful when populated and relevant to the entity |
| Tier 3 | Small directories, social mirrors, inactive profiles | Include only when accurate, maintained and cross-linked |

Review `sameAs` links from time to time and remove stale or contradictory profiles.

---

Written by [Dmitry (Dee) Kargaev](https://deeflect.com), maintainer of [Awesome GEO](https://geo.deeflect.com) and author of [The SEO-to-GEO Gap](https://doi.org/10.2139/ssrn.6476021) and [SEEN](https://doi.org/10.2139/ssrn.6815500).
