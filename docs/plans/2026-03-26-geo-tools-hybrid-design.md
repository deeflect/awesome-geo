# GEO Tools Hybrid Audit Design

**Date:** 2026-03-26

## Goal

Turn the tools area into a clearer product suite:

- one serious flagship `Full Visibility Audit`
- separate specialist checker tools
- generators that still exist, but no longer pretend to be validators
- a hybrid fetch model that uses client-side parsing where it helps and server-side fetches where browser limits make results unreliable

## Product Shape

### 1. Full Visibility Audit

The current `AI Visibility Checker` becomes `Full Visibility Audit`.

Primary use case:

- a user enters a page URL
- the tool checks overall GEO readiness
- the tool returns a score, severity-ranked findings, and concrete next steps

Audit sections:

- page fetch and reachability
- canonical and indexability
- meta tags
- JSON-LD / structured data presence
- `robots.txt`
- `llms.txt`
- sitemap discovery
- crawler access summary
- final readiness score with prioritized recommendations

The audit should feel like a real checklist, not a loose pile of diagnostics.

### 2. Specialist Checkers

Separate tools remain available for focused work:

- `Schema Checker`
- `llms.txt Checker / Generator`
- `robots.txt Checker / Generator`
- `Meta Tag Checker / Generator`

The point is speed and specificity:

- users who already know the problem should not have to run the full audit
- users who want broad readiness can use the flagship audit

### 3. Tools Index Categories

The tools index should be grouped into explicit buckets:

- `Audit`
- `Checkers`
- `Generators`
- `Utilities`

This removes the current flat-card ambiguity and helps users self-select quickly.

## Technical Direction

### Hybrid Fetch Model

Use client-side checks for things the browser can inspect directly:

- page HTML already fetched in-browser
- visible metadata on pasted HTML
- pasted schema / pasted `robots.txt` / pasted `llms.txt`
- local parsing and validation

Use server-side/API fetches for things the browser is bad at:

- `robots.txt`
- `llms.txt`
- sitemap discovery and parsing
- response headers / redirect chains
- CORS-blocked resources
- consistent URL-level network checks

This keeps the browser useful without lying about what client-only fetches can prove.

## Scoring Model for Full Audit

The full audit score should be recommendation-oriented, not pseudo-scientific.

Suggested sections:

- `crawlability`
- `indexability`
- `entity markup`
- `metadata quality`
- `discovery files`
- `source hygiene`

Each section produces:

- status
- short explanation
- fix suggestions

The final score is only a summary of these sections.

## Schema Checker Scope

The separate schema tool should support two modes:

- `Paste schema`
- `Check page URL`

Checks:

- valid JSON
- valid JSON-LD script tags
- recognized Schema.org types
- required field coverage for common types
- warnings for weak or suspicious properties
- preview of detected entities and types

It should tell users what is present, what is missing, and what likely matters.

## llms.txt and robots.txt Tools

These should become dual-purpose pages:

- generator
- checker

For `llms.txt`:

- paste content
- fetch from URL
- validate section structure
- detect missing base URL / sparse content / malformed links

For `robots.txt`:

- paste content
- fetch from URL
- check common crawler directives
- explain effective access by bot
- highlight dangerous broad blocks

## Constraints

- keep the Astro site simple
- avoid overengineering with a heavy app framework
- server endpoints should be narrow and explicit
- results must degrade cleanly when a site blocks access

## Expected Outcome

After this pass:

- the flagship audit feels like a product, not a toy
- the specialist tools are useful on their own
- the tools index explains itself
- the network model is honest and consistent
