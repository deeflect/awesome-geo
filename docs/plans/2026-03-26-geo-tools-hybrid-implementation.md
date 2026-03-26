# GEO Tools Hybrid Audit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the tools suite around a flagship full-site GEO audit plus separate checker tools, using a hybrid client/server fetch model.

**Architecture:** Keep Astro pages as the UI surface, add a small set of narrow server endpoints for URL-level fetches that browsers cannot perform reliably, and move the tool UX toward a categorized suite with one flagship audit and several focused validators. The audit aggregates API-backed network checks with client-side parsing so results are both inspectable and robust.

**Tech Stack:** Astro, TypeScript, client-side DOM parsing, Astro server endpoints, existing tool pages under `website/src/pages/tools/`.

---

### Task 1: Audit the current tool surfaces and define shared result shapes

**Files:**
- Modify: `website/src/pages/tools/geo-audit.astro`
- Modify: `website/src/pages/tools/json-ld.astro`
- Modify: `website/src/pages/tools/llms-txt.astro`
- Modify: `website/src/pages/tools/robots-txt.astro`
- Create: `website/src/lib/tools.ts`

**Steps:**
1. Define shared TypeScript types for tool findings, statuses, and recommendations in `website/src/lib/tools.ts`.
2. Extract a consistent status vocabulary: `pass`, `warn`, `fail`, `unknown`.
3. Document the result sections needed by the flagship audit and the specialist checkers.
4. Verify the current tools can be migrated onto these shared shapes without losing core functionality.

### Task 2: Add server-side fetch endpoints for URL-based checks

**Files:**
- Create: `website/src/pages/api/tools/fetch-text.ts`
- Create: `website/src/pages/api/tools/fetch-headers.ts`
- Create: `website/src/pages/api/tools/discovery.ts`
- Modify if needed: `website/astro.config.mjs`

**Steps:**
1. Add a text-fetch endpoint for `robots.txt`, `llms.txt`, and sitemap files.
2. Add a headers/status endpoint for URL reachability, content type, redirects, and indexing-related headers.
3. Add a discovery endpoint that tries standard file locations such as `/robots.txt`, `/llms.txt`, `/sitemap.xml`, and sitemap indexes.
4. Return normalized error states for blocked, timed out, missing, and malformed fetches.

### Task 3: Rebuild the flagship checker as `Full Visibility Audit`

**Files:**
- Modify: `website/src/pages/tools/geo-audit.astro`
- Modify: `website/src/styles/global.css`
- Create if needed: `website/src/lib/audit.ts`

**Steps:**
1. Rename the visible product copy from `AI Visibility Checker` to `Full Visibility Audit`.
2. Rework the score into sectioned findings: crawlability, indexability, schema, metadata, discovery files, and page hygiene.
3. Use client-side parsing for page HTML and API endpoints for URL-level fetches.
4. Add a severity-ranked recommendations list with direct actions, not generic prose.
5. Ensure paste mode and URL mode each clearly show what was and was not checked.

### Task 4: Add a dedicated `Schema Checker`

**Files:**
- Modify or replace: `website/src/pages/tools/json-ld.astro`
- Create if needed: `website/src/lib/schema.ts`

**Steps:**
1. Split the current schema page into two modes: `Generate` and `Check`.
2. Add URL-check mode that fetches page HTML and extracts JSON-LD scripts.
3. Add paste mode for raw schema snippets or whole-page HTML.
4. Validate syntax, detect schema types, and report missing/high-value properties for common types like `Person`, `Organization`, `Article`, `Product`, and `WebSite`.

### Task 5: Upgrade `llms.txt` and `robots.txt` into checker + generator pages

**Files:**
- Modify: `website/src/pages/tools/llms-txt.astro`
- Modify: `website/src/pages/tools/robots-txt.astro`

**Steps:**
1. Add checker mode to each page alongside the generator mode.
2. Allow users to paste content or fetch from a live URL.
3. For `llms.txt`, validate structure, links, and section usefulness.
4. For `robots.txt`, validate crawler directives and explain effective access outcomes by bot.

### Task 6: Reorganize the tools index by category

**Files:**
- Modify: `website/src/pages/tools/index.astro`

**Steps:**
1. Replace the flat tools list with grouped sections: `Audit`, `Checkers`, `Generators`, `Utilities`.
2. Promote `Full Visibility Audit` as the clear starting point.
3. Make checker/generator distinction legible from the card copy and badges.
4. Ensure the index reads as a product suite, not a random list of pages.

### Task 7: Add manual and automated verification for the tool workflows

**Files:**
- Create if needed: `website/tests/` or repo-level verification notes
- Modify if needed: `package.json`

**Steps:**
1. Add a simple verification routine for the parsing helpers and scoring helpers.
2. Define a small set of real-world manual test URLs for audit QA.
3. Verify URL mode, paste mode, blocked fetches, invalid schema, malformed `robots.txt`, and missing `llms.txt`.
4. Run `npm run build` and record any residual limitations that are still expected.

### Task 8: Update tool copy and labels to match actual behavior

**Files:**
- Modify: `website/src/pages/tools/index.astro`
- Modify: `website/src/pages/tools/geo-audit.astro`
- Modify: `README.md` if tools copy is mentioned there

**Steps:**
1. Remove or rewrite any copy that overstates live verification certainty.
2. Make it explicit when a result is from a server fetch versus pasted content.
3. Ensure all pages describe whether they are a checker, generator, or both.
4. Keep the copy terse and operator-focused.
