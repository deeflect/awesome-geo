# Schema sameAs Quality

`sameAs` links should identify the same real-world entity across authoritative public profiles. More links are not always better.

## Prioritize

- Official and controlled profiles.
- Profiles that are populated, crawlable, and consistent with the entity home.
- Profiles that link back to the canonical site or repeat the same core facts.
- Knowledge graph identifiers such as Wikidata, when the item is accurate and well sourced.
- Work or artifact profiles that prove the entity's role, such as GitHub, Hugging Face, package registries, author pages, or publication profiles.

## Avoid

- Empty profiles created only for a backlink.
- Unclaimed directory pages with wrong facts.
- Duplicate or abandoned handles.
- Low-quality directories that do not help disambiguation.
- Adding every profile you can find just to inflate the count.

## Practical Tiers

| Tier | Examples | Use |
|------|----------|-----|
| Tier 1 | Entity home, Wikidata, LinkedIn, GitHub, Google Developer Profile, ORCID, Crunchbase | Strong identity and disambiguation signals. |
| Tier 2 | Medium, Substack, Hugging Face, Product Hunt, Muck Rack, Behance, Dribbble, Stack Overflow | Useful when populated and relevant to the entity. |
| Tier 3 | Small directories, social mirrors, inactive profiles | Include only when they are accurate, maintained, and cross-linked. |

Review `sameAs` links periodically. Removing stale or contradictory profiles can improve clarity.
