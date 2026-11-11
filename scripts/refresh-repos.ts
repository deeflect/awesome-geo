#!/usr/bin/env tsx
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { fetchGitHubRepo } from './lib.js';

// Refreshes stars, language, license and pushedAt from the GitHub API.
// Edits the YAML text line by line so header comments, entry order and field order survive.
const REPOS_DIR = path.resolve(process.cwd(), 'data', 'repos');
const scalar = (value: unknown) => YAML.stringify(value).trimEnd();

const skipped: string[] = [];
let updated = 0;

for (const filename of (await readdir(REPOS_DIR)).filter((f) => f.endsWith('.yaml')).sort()) {
  const filePath = path.join(REPOS_DIR, filename);
  const chunks = (await readFile(filePath, 'utf8')).split(/\n(?=- name:)/);

  for (const [i, chunk] of chunks.entries()) {
    const slug = chunk.match(/^ {2}repo: (.+)$/m)?.[1].trim();
    if (!slug) continue;

    const gh = await fetchGitHubRepo(slug);
    if (!gh) { skipped.push(`${slug}: not found`); continue; }
    if (gh.full_name?.toLowerCase() !== slug.toLowerCase()) { skipped.push(`${slug}: renamed to ${gh.full_name}`); continue; }
    if (gh.archived) { skipped.push(`${slug}: archived`); continue; }

    const spdx = gh.license?.spdx_id;
    const license = spdx && spdx !== 'NOASSERTION' ? spdx : null;
    const pushedAt = String(gh.pushed_at).slice(0, 10);

    chunks[i] = chunk
      .replace(/^ {2}stars: .*$/m, `  stars: ${gh.stargazers_count}`)
      .replace(/^ {2}language: .*$/m, `  language: ${scalar(gh.language ?? null)}`)
      .replace(/^ {2}(license|pushedAt): .*\n?/gm, '')
      .replace(/^ {2}maintained: .*$/m, `$&\n  license: ${scalar(license)}\n  pushedAt: ${scalar(pushedAt)}`);
    updated++;
  }

  await writeFile(filePath, chunks.join('\n'), 'utf8');
}

console.log(JSON.stringify({ updated, skipped }, null, 2));
