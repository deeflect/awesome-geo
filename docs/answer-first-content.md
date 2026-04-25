# Answer-First Content

Answer-first content is written so humans and retrieval systems can extract the core claim without reading the whole page.

## Page Pattern

- Use a question-style H2 for the query you want to answer.
- Put a direct 30-60 word answer immediately under the heading.
- Follow with evidence, examples, definitions, and caveats.
- Use tables for comparisons and bullets for fact lists.
- Add FAQ sections only when the questions are real follow-ups, not keyword filler.
- Include `datePublished` and `dateModified` when the page is time-sensitive.

## Structured Data

Use JSON-LD that matches the visible page:

- `Article` for guides, research, and analysis.
- `FAQPage` when the page has a real FAQ section.
- `Person`, `Organization`, `Product`, or `SoftwareApplication` for entity pages.
- `ProfilePage` with `mainEntity` when the page is primarily about a person or organization profile.

## Entity Density

Named entities help answer engines understand context: people, organizations, products, standards, places, publications, and concepts with clear public meanings.

Use entity density as a quality check, not as stuffing:

- Prefer 2-4 relevant named entities per 100 words on research and comparison pages.
- Link important entities when a trusted canonical page exists.
- Avoid repeating entity names unnaturally.
- Keep the page's main entity unambiguous through title, heading, schema, and internal links.
