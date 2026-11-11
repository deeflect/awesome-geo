# Awesome GEO

Status: active
Category: research
Type: resource
One-liner: Curated GEO platforms, repositories, and verification scripts.

## Source Of Truth

Canonical path: `/Volumes/dee/Coding/Projects/awesome-geo`
Project id: `awesome-geo`
Registry: `/Volumes/dee/Coding/project-registry/projects.yaml`
Related projects: measured-geo, geo.deeflect.com

## Aliases

- none

## How To Run

```bash
npm ci
npm run validate        # typecheck + check-data + regenerate README.md
npm run verify-all      # optional live re-check of all sites; needs OPENPAGERANK_API_KEY
```

Data lives in `data/`; `README.md` is generated, never hand-edited. The website (geo.deeflect.com) is not in this repo.

## Current State

Working:
- `npm run validate` passes; README regenerated from data (2026-11-10).
- CI: Update README on push to main, Verify PR on data PRs.

Broken:
- Weekly Re-verification failed every run (read-only token at the create-pull-request push). Write permissions added to the workflow 2026-11-10, not yet confirmed by a CI run; may also need the repo setting "Allow GitHub Actions to create and approve pull requests".

Next:
- Trigger Weekly Re-verification by hand and confirm it opens a PR.

## Notes For Agents

- Read this file before editing this project.
- Keep generated dependencies and build artifacts out of git and Syncthing.
- If this folder is renamed, update `/Volumes/dee/Coding/project-registry/path-aliases.json` and `/Volumes/dee/Coding/project-registry/projects.yaml`.
