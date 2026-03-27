#!/usr/bin/env tsx
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { normalizeUrl, RepoType } from './lib.js';

type SiteRecord = {
  name?: string;
  url?: string;
  category?: string;
  description?: string;
  sampleProfile?: string;
};

type RepoRecord = {
  name?: string;
  repo?: string;
  url?: string;
  category?: string;
  description?: string;
  stars?: number;
  type?: RepoType;
  maintained?: boolean;
};

type Issue = {
  location: string;
  message: string;
};

const DATA_DIR = path.resolve(process.cwd(), 'data');
const SITE_DIR = path.join(DATA_DIR, 'sites');
const REPO_DIR = path.join(DATA_DIR, 'repos');
const SITE_REQUIRED_FIELDS = ['name', 'url', 'category', 'description'] as const;
const REPO_REQUIRED_FIELDS = ['name', 'repo', 'url', 'category', 'description'] as const;
const VALID_REPO_TYPES = new Set<RepoType>(['tool', 'library', 'research', 'reference', 'standard', 'skill', 'framework']);

function issueAt(issues: Issue[], location: string, message: string): void {
  issues.push({ location, message });
}

function makeLocation(filePath: string, index: number): string {
  return `${path.relative(process.cwd(), filePath)}[${index + 1}]`;
}

function readYamlArray<T>(raw: string): T[] {
  const parsed = YAML.parse(raw);
  return Array.isArray(parsed) ? (parsed as T[]) : [];
}

function safeNormalizedUrl(url: string): string {
  try {
    return normalizeUrl(url).toLowerCase();
  } catch {
    return url.trim().toLowerCase();
  }
}

function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

async function loadCategoryIds(filePath: string): Promise<Set<string>> {
  const raw = await readFile(filePath, 'utf8');
  const parsed = readYamlArray<Array<{ id?: string }>[number]>(raw);
  return new Set(parsed.map((entry) => entry.id).filter((value): value is string => Boolean(value)));
}

async function validateSites(issues: Issue[]): Promise<void> {
  const categoryIds = await loadCategoryIds(path.join(DATA_DIR, 'categories.yaml'));
  const files = (await readdir(SITE_DIR))
    .filter((file) => file.endsWith('.yaml'))
    .sort();
  const seenNames = new Map<string, string>();
  const seenUrls = new Map<string, string>();

  for (const filename of files) {
    const filePath = path.join(SITE_DIR, filename);
    const expectedCategory = filename.replace(/\.ya?ml$/i, '');
    const raw = await readFile(filePath, 'utf8');
    const entries = readYamlArray<SiteRecord>(raw);

    if (!categoryIds.has(expectedCategory)) {
      issueAt(issues, path.relative(process.cwd(), filePath), `Unknown site category file "${expectedCategory}"`);
    }

    for (const [index, site] of entries.entries()) {
      const location = makeLocation(filePath, index);

      for (const field of SITE_REQUIRED_FIELDS) {
        const value = site[field];
        if (typeof value !== 'string' || value.trim() === '') {
          issueAt(issues, location, `Missing required field "${field}"`);
        }
      }

      if (site.category && site.category !== expectedCategory) {
        issueAt(issues, location, `Category "${site.category}" does not match file "${expectedCategory}"`);
      }

      if (site.category && !categoryIds.has(site.category)) {
        issueAt(issues, location, `Unknown category "${site.category}"`);
      }

      if (site.url && !validateUrl(site.url)) {
        issueAt(issues, location, `Invalid url "${site.url}"`);
      }

      if (site.sampleProfile && !validateUrl(site.sampleProfile)) {
        issueAt(issues, location, `Invalid sampleProfile "${site.sampleProfile}"`);
      }

      if (site.name) {
        const key = `${expectedCategory}::${site.name.trim().toLowerCase()}`;
        const firstSeen = seenNames.get(key);
        if (firstSeen) {
          issueAt(issues, location, `Duplicate site name in category; first seen at ${firstSeen}`);
        } else {
          seenNames.set(key, location);
        }
      }

      if (site.url) {
        const key = `${expectedCategory}::${safeNormalizedUrl(site.url)}`;
        const firstSeen = seenUrls.get(key);
        if (firstSeen) {
          issueAt(issues, location, `Duplicate site url in category; first seen at ${firstSeen}`);
        } else {
          seenUrls.set(key, location);
        }
      }
    }
  }
}

async function validateRepos(issues: Issue[]): Promise<void> {
  const categoryIds = await loadCategoryIds(path.join(DATA_DIR, 'repo-categories.yaml'));
  const files = (await readdir(REPO_DIR))
    .filter((file) => file.endsWith('.yaml'))
    .sort();
  const seenNames = new Map<string, string>();
  const seenRepos = new Map<string, string>();

  for (const filename of files) {
    const filePath = path.join(REPO_DIR, filename);
    const expectedCategory = filename.replace(/\.ya?ml$/i, '');
    const raw = await readFile(filePath, 'utf8');
    const entries = readYamlArray<RepoRecord>(raw);

    if (!categoryIds.has(expectedCategory)) {
      issueAt(issues, path.relative(process.cwd(), filePath), `Unknown repo category file "${expectedCategory}"`);
    }

    for (const [index, repo] of entries.entries()) {
      const location = makeLocation(filePath, index);

      for (const field of REPO_REQUIRED_FIELDS) {
        const value = repo[field];
        if (typeof value !== 'string' || value.trim() === '') {
          issueAt(issues, location, `Missing required field "${field}"`);
        }
      }

      if (repo.category && repo.category !== expectedCategory) {
        issueAt(issues, location, `Category "${repo.category}" does not match file "${expectedCategory}"`);
      }

      if (repo.category && !categoryIds.has(repo.category)) {
        issueAt(issues, location, `Unknown category "${repo.category}"`);
      }

      if (repo.url && !validateUrl(repo.url)) {
        issueAt(issues, location, `Invalid url "${repo.url}"`);
      }

      if (repo.type && !VALID_REPO_TYPES.has(repo.type)) {
        issueAt(issues, location, `Invalid repo type "${repo.type}"`);
      }

      if (repo.stars != null && !Number.isFinite(repo.stars)) {
        issueAt(issues, location, `Invalid stars value "${String(repo.stars)}"`);
      }

      if (repo.maintained != null && typeof repo.maintained !== 'boolean') {
        issueAt(issues, location, 'Field "maintained" must be a boolean');
      }

      if (repo.name) {
        const key = repo.name.trim().toLowerCase();
        const firstSeen = seenNames.get(key);
        if (firstSeen) {
          issueAt(issues, location, `Duplicate repo name; first seen at ${firstSeen}`);
        } else {
          seenNames.set(key, location);
        }
      }

      if (repo.repo) {
        const key = repo.repo.trim().toLowerCase();
        const firstSeen = seenRepos.get(key);
        if (firstSeen) {
          issueAt(issues, location, `Duplicate repo slug; first seen at ${firstSeen}`);
        } else {
          seenRepos.set(key, location);
        }
      }
    }
  }
}

async function main(): Promise<void> {
  const issues: Issue[] = [];
  await validateSites(issues);
  await validateRepos(issues);

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(`- ${issue.location}: ${issue.message}`);
    }
    console.error(`\n❌ Data validation failed with ${issues.length} issue(s)`);
    process.exit(1);
  }

  console.log('✅ Data files validated');
}

await main();
