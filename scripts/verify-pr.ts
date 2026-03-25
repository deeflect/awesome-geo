#!/usr/bin/env tsx
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import YAML from 'yaml';
import { runSiteChecks } from './check-site.js';
import { applyGeoScore, formatAiAccessLabel, inferEffort, SiteEntry } from './lib.js';

type Site = SiteEntry & Record<string, any>;

function safeGitShow(filePath: string): Site[] {
  try {
    const content = execSync(`git show origin/main:${filePath}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return (YAML.parse(content) || []) as Site[];
  } catch {
    return [];
  }
}

const changedFilePath = path.resolve(process.cwd(), 'changed_files.txt');
let changedFiles: string[] = [];

try {
  const changedRaw = await readFile(changedFilePath, 'utf8');
  changedFiles = changedRaw.split('\n').map((s) => s.trim()).filter((s) => s.endsWith('.yaml'));
} catch {
  const fromGit = execSync(`git diff --name-only origin/main...HEAD -- 'data/sites/*.yaml'`, { encoding: 'utf8' });
  changedFiles = fromGit.split('\n').map((s) => s.trim()).filter((s) => s.endsWith('.yaml'));
}

const newEntries: Array<{ file: string; site: Site }> = [];

for (const file of changedFiles) {
  const current = (YAML.parse(await readFile(path.resolve(process.cwd(), file), 'utf8')) || []) as Site[];
  const base = safeGitShow(file);

  const baseUrls = new Set(base.map((s) => s.url));
  const baseNames = new Set(base.map((s) => s.name));

  for (const site of current) {
    if (!baseUrls.has(site.url) && !baseNames.has(site.name)) {
      newEntries.push({ file, site });
    }
  }
}

const rows: string[] = [];
let failCount = 0;

for (const entry of newEntries) {
  if (!entry.site.sampleProfile) {
    rows.push(`| ${entry.site.name} | — | — | — | — | ❌ Missing sampleProfile |`);
    failCount += 1;
    continue;
  }

  const sampleProfile = entry.site.sampleProfile;
  const checks = await runSiteChecks(entry.site.url, sampleProfile);
  const dr = Number(checks.authority.dr ?? entry.site.dr ?? 0);
  const linkType = checks.links.linkType === 'unknown' ? 'mixed' : checks.links.linkType;
  const candidate = applyGeoScore({
    ...entry.site,
    dr,
    trancoRank: checks.authority.tranco.rank ?? entry.site.trancoRank,
    linkType,
    effort: inferEffort(linkType),
    aiAccess: {
      oaiSearchBot: checks.robots.aiAccess.oaiSearchBot,
      gptBot: checks.robots.aiAccess.gptBot,
      chatgptUser: checks.robots.aiAccess.chatgptUser,
      claudeBot: checks.robots.aiAccess.claudeBot,
      perplexityBot: checks.robots.aiAccess.perplexityBot,
      googleExtended: checks.robots.aiAccess.googleExtended,
      bytespider: checks.robots.aiAccess.bytespider
    },
    indexable: checks.indexability.indexable,
    profileLinkDofollow: checks.links.profileLinkDofollow
  });
  const statusOk = checks.indexability.statusOk !== false;
  const spammy = dr < 5;

  let status = '✅ Verified';
  if (!statusOk || spammy) {
    status = '❌ Failed';
    failCount += 1;
  } else if ((candidate.geoScore ?? 0) < 50) {
    status = '⚠️ Low GEO value';
  }

  rows.push(`| ${entry.site.name} | ${candidate.dr ?? '—'} | ${candidate.linkType ?? '—'} | ${formatAiAccessLabel(candidate.aiAccess)} | ${candidate.geoScore ?? '—'}/100 | ${status} |`);
}

const report = [
  '## 🔍 Site Verification Report',
  '',
  '| Site | Authority | Link Type | AI Access | GEO Score | Status |',
  '|------|-----------|-----------|-----------|-----------|--------|',
  ...(rows.length ? rows : ['| _No new entries detected_ | — | — | — | — | ✅ Nothing to verify |'])
].join('\n');

await writeFile(path.resolve(process.cwd(), 'verify-report.md'), `${report}\n`, 'utf8');
console.log(report);

if (failCount > 0) {
  console.error(`\n❌ ${failCount} site(s) failed verification`);
  process.exit(1);
}
