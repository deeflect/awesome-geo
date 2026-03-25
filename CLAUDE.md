# Awesome GEO

## Project Overview
Open-source curated list of free platforms and tools for Generative Engine Optimization (GEO) — SEO for the AI era. GitHub repo (awesome-list) + Astro companion website.

## Architecture
- `/data/categories.yaml` + `/data/sites/*.yaml` — Source of truth for all platform listings
- `/website/` — Astro static site that reads category + site YAML files at build time
- `/README.md` — GitHub awesome-list rendered from same data
- `/scripts/` — Automation scripts (validation, README generation)

## Stack
- **Site:** Astro + Tailwind CSS
- **Hosting:** Vercel (static)
- **Data:** YAML → consumed by both README and website
- **Tools:** Client-side (no backend). Each tool = separate page.

## Website Tools
1. llms.txt Generator
2. JSON-LD Schema Generator (Person, Organization, Product)
3. Meta Tag Generator (OG, Twitter Cards)
4. robots.txt Generator (with AI bot presets)
5. Slug Generator

## Design
- Clean, minimal, developer-friendly
- Dark mode default
- Fast — static HTML, no JS frameworks for the list pages
- Tools pages use Astro islands for interactivity

## Key Files
- `data/categories.yaml` + `data/sites/*.yaml` — Platform data
- `README.md` — GitHub-facing awesome list
- `website/` — Astro project
- `CONTRIBUTING.md` — Contribution guidelines

## Owner
Dmitry Kargaev (@deeflect)
