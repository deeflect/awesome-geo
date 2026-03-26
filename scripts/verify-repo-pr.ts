#!/usr/bin/env tsx
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import YAML from 'yaml';
import { rateLimitedFetch, RepoEntry } from './lib.js';

type Repo = RepoEntry & Record<string, any>;

const REQUIRED_FIELDS = ['name', 'repo', 'url', 'category', 'description'] as const;
const VALID_TYPES = ['tool', 'library', 'research', 'reference', 'standard', 'skill', 'framework'];
const MIN_STARS = 10;
const MIN_REPO_AGE_DAYS = 7;

type CheckResult = {
  repo: Repo;
  status: 'pass' | 'fail' | 'warn';
  issues: string[];
  liveStars: number | null;
  liveData: {
    description: string | null;
    language: string | null;
    archived: boolean;
    fork: boolean;
    created_at: string | null;
    pushed_at: string | null;
    open_issues: number;
    license: string | null;
  } | null;
};

function safeGitShow(filePath: string): Repo[] {
  try {
    const content = execSync(`git show origin/main:${filePath}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return (YAML.parse(content) || []) as Repo[];
  } catch {
    return [];
  }
}

async function fetchGitHubRepo(repoSlug: string): Promise<any | null> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await rateLimitedFetch(`https://api.github.com/repos/${repoSlug}`, { headers });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
}

async function checkRepo(repo: Repo): Promise<CheckResult> {
  const issues: string[] = [];

  // 1. Required fields
  for (const field of REQUIRED_FIELDS) {
    if (!repo[field]) issues.push(`Missing required field: ${field}`);
  }

  // 2. Valid type
  if (repo.type && !VALID_TYPES.includes(repo.type)) {
    issues.push(`Invalid type "${repo.type}" — must be one of: ${VALID_TYPES.join(', ')}`);
  }

  // 3. URL format
  if (repo.url && !repo.url.startsWith('https://github.com/')) {
    issues.push('URL must be a GitHub repository link');
  }

  // 4. Repo slug matches URL
  if (repo.repo && repo.url) {
    const expectedUrl = `https://github.com/${repo.repo}`;
    if (repo.url !== expectedUrl) {
      issues.push(`repo slug "${repo.repo}" doesn't match url "${repo.url}"`);
    }
  }

  // 5. Fetch live GitHub data
  const ghData = repo.repo ? await fetchGitHubRepo(repo.repo) : null;

  if (!ghData) {
    issues.push('Could not fetch repo from GitHub API — may not exist or be private');
    return { repo, status: 'fail', issues, liveStars: null, liveData: null };
  }

  const liveStars = ghData.stargazers_count ?? 0;
  const liveData = {
    description: ghData.description,
    language: ghData.language,
    archived: ghData.archived ?? false,
    fork: ghData.fork ?? false,
    created_at: ghData.created_at,
    pushed_at: ghData.pushed_at,
    open_issues: ghData.open_issues_count ?? 0,
    license: ghData.license?.spdx_id ?? null,
  };

  // 6. Star count check
  if (liveStars < MIN_STARS) {
    issues.push(`Only ${liveStars} stars (minimum: ${MIN_STARS})`);
  }

  // 7. Archived check
  if (liveData.archived) {
    issues.push('Repository is archived');
  }

  // 8. Fork check
  if (liveData.fork) {
    issues.push('Repository is a fork — prefer the original');
  }

  // 9. Repo age check
  if (liveData.created_at) {
    const age = daysSince(liveData.created_at);
    if (age < MIN_REPO_AGE_DAYS) {
      issues.push(`Repo is only ${age} days old (minimum: ${MIN_REPO_AGE_DAYS})`);
    }
  }

  // 10. Last push freshness (warn if >365 days)
  if (liveData.pushed_at) {
    const stale = daysSince(liveData.pushed_at);
    if (stale > 365) {
      issues.push(`No commits in ${stale} days — possibly abandoned`);
    }
  }

  // 11. Star count accuracy — flag if claimed stars are wildly off
  if (repo.stars != null && liveStars > 0) {
    const ratio = repo.stars / liveStars;
    if (ratio > 2 || ratio < 0.3) {
      issues.push(`Claimed ${repo.stars} stars but repo has ${liveStars} — update star count`);
    }
  }

  // 12. README check — description shouldn't be empty on GitHub
  if (!liveData.description && !ghData.description) {
    issues.push('Repo has no description on GitHub — likely low effort');
  }

  // Determine status
  const hardFails = issues.filter((i) =>
    i.includes('Missing required') ||
    i.includes('not exist') ||
    i.includes('archived') ||
    i.includes('is a fork') ||
    i.includes('must be a GitHub') ||
    i.startsWith(`Only ${liveStars} stars`)
  );

  let status: 'pass' | 'fail' | 'warn';
  if (hardFails.length > 0) {
    status = 'fail';
  } else if (issues.length > 0) {
    status = 'warn';
  } else {
    status = 'pass';
  }

  return { repo, status, issues, liveStars, liveData };
}

// --- Main ---

const changedFilePath = path.resolve(process.cwd(), 'changed_files.txt');
let changedFiles: string[] = [];

try {
  const changedRaw = await readFile(changedFilePath, 'utf8');
  changedFiles = changedRaw.split('\n').map((s) => s.trim()).filter((s) => s.includes('data/repos/') && s.endsWith('.yaml'));
} catch {
  const fromGit = execSync(`git diff --name-only origin/main...HEAD -- 'data/repos/*.yaml'`, { encoding: 'utf8' });
  changedFiles = fromGit.split('\n').map((s) => s.trim()).filter((s) => s.endsWith('.yaml'));
}

const newEntries: Array<{ file: string; repo: Repo }> = [];

for (const file of changedFiles) {
  const current = (YAML.parse(await readFile(path.resolve(process.cwd(), file), 'utf8')) || []) as Repo[];
  const base = safeGitShow(file);

  const baseRepos = new Set(base.map((r) => r.repo));
  const baseNames = new Set(base.map((r) => r.name));

  for (const repo of current) {
    if (!baseRepos.has(repo.repo) && !baseNames.has(repo.name)) {
      newEntries.push({ file, repo });
    }
  }
}

const rows: string[] = [];
let failCount = 0;

for (const entry of newEntries) {
  const result = await checkRepo(entry.repo);
  const stars = result.liveStars != null ? `⭐ ${result.liveStars}` : '—';
  const archived = result.liveData?.archived ? ' 📦 archived' : '';
  const fork = result.liveData?.fork ? ' 🍴 fork' : '';
  const flags = `${archived}${fork}`.trim();

  let statusIcon: string;
  if (result.status === 'pass') statusIcon = '✅ Verified';
  else if (result.status === 'warn') statusIcon = '⚠️ Review';
  else {
    statusIcon = '❌ Failed';
    failCount += 1;
  }

  const issueList = result.issues.length > 0 ? result.issues.join('; ') : '—';
  rows.push(`| [${entry.repo.name}](${entry.repo.url}) | ${stars} | ${entry.repo.type ?? '—'} | ${statusIcon} | ${issueList}${flags ? ` ${flags}` : ''} |`);
}

const report = [
  '## 🔍 Repo Verification Report',
  '',
  '| Repository | Stars | Type | Status | Notes |',
  '|------------|-------|------|--------|-------|',
  ...(rows.length ? rows : ['| _No new repos detected_ | — | — | ✅ Nothing to verify | — |'])
].join('\n');

await writeFile(path.resolve(process.cwd(), 'verify-repo-report.md'), `${report}\n`, 'utf8');
console.log(report);

if (failCount > 0) {
  console.error(`\n❌ ${failCount} repo(s) failed verification`);
  process.exit(1);
}
