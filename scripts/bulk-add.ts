#!/usr/bin/env tsx
import { readFile } from 'node:fs/promises';
import { Command } from 'commander';
import { parse } from 'csv-parse/sync';
import { applyGeoScore, inferEffort, normalizeUrl, readSitesFile, sleep, toDateString, writeSitesFile } from './lib.js';
import { runSiteChecks } from './check-site.js';

type SeedRow = {
  name: string;
  url: string;
  category: string;
  sampleProfile: string;
  description: string;
};

async function loadInput(inputPath: string): Promise<SeedRow[]> {
  const raw = await readFile(inputPath, 'utf8');
  if (inputPath.endsWith('.json')) return JSON.parse(raw) as SeedRow[];
  const records = parse(raw, { columns: true, skip_empty_lines: true, trim: true });
  return records as SeedRow[];
}

const program = new Command();
program
  .requiredOption('--input <path>', 'Path to CSV or JSON seed file')
  .option('--delay-ms <n>', 'Delay between items in ms (default 1500)', '1500');

program.parse(process.argv);
const opts = program.opts();

(async () => {
  const rows = await loadInput(opts.input);
  const data = await readSitesFile();
  const validCategories = new Set(data.categories.map((c: any) => c.id));
  const existing = new Set(data.sites.map((s) => {
    try { return normalizeUrl(s.url); } catch { return s.url; }
  }));

  let added = 0;
  let skipped = 0;
  const delayMs = Number(opts.delayMs) || 1500;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!validCategories.has(row.category)) {
      skipped++;
      console.log(`[${i + 1}/${rows.length}] SKIP invalid category: ${row.name} (${row.category})`);
      continue;
    }

    let normalized = row.url;
    try { normalized = normalizeUrl(row.url); } catch {}

    if (existing.has(normalized)) {
      skipped++;
      console.log(`[${i + 1}/${rows.length}] SKIP duplicate: ${row.name}`);
      continue;
    }

    console.log(`[${i + 1}/${rows.length}] CHECK ${row.name}...`);
    const checks = await runSiteChecks(row.url, row.sampleProfile);
    const aiAccess = checks.robots.aiAccess;
    const linkType = checks.links.linkType === 'unknown' ? 'mixed' : checks.links.linkType;

    data.sites.push(applyGeoScore({
      name: row.name,
      url: row.url,
      category: row.category,
      sampleProfile: row.sampleProfile,
      dr: checks.authority.dr,
      trancoRank: checks.authority.tranco.rank,
      linkType,
      effort: inferEffort(linkType),
      description: row.description,
      verified: true,
      lastVerified: toDateString(),
      aiAccess: {
        oaiSearchBot: aiAccess.oaiSearchBot,
        gptBot: aiAccess.gptBot,
        chatgptUser: aiAccess.chatgptUser,
        claudeBot: aiAccess.claudeBot,
        perplexityBot: aiAccess.perplexityBot,
        googleExtended: aiAccess.googleExtended,
        bytespider: aiAccess.bytespider
      },
      indexable: checks.indexability.indexable,
      profileLinkDofollow: checks.links.profileLinkDofollow
    }));

    existing.add(normalized);
    added++;
    await sleep(delayMs);
  }

  await writeSitesFile(data);
  console.log(JSON.stringify({ total: rows.length, added, skipped }, null, 2));
})();
