#!/usr/bin/env tsx
import { Command } from 'commander';
import { applyGeoScore, inferEffort, normalizeUrl, readCategory, readSitesFile, toDateString, writeSitesFile } from './lib.js';
import { runSiteChecks } from './check-site.js';

const program = new Command();
program
  .name('add-site')
  .requiredOption('--name <name>', 'Platform name')
  .requiredOption('--url <url>', 'Platform URL')
  .requiredOption('--category <category>', 'Category id')
  .requiredOption('--sample-profile <url>', 'Sample profile URL')
  .requiredOption('--description <description>', 'Description');

program.parse(process.argv);
const opts = program.opts();

(async () => {
  const data = await readSitesFile();

  try {
    await readCategory(opts.category);
  } catch {
    console.error(`Unknown category: ${opts.category}. Use a file in data/sites/*.yaml`);
    process.exit(1);
  }

  const normalizedUrl = normalizeUrl(opts.url);
  const duplicate = data.sites.find((s) => {
    try {
      return normalizeUrl(s.url) === normalizedUrl;
    } catch {
      return s.url === opts.url;
    }
  });

  if (duplicate) {
    console.error(`Site already exists: ${duplicate.name} (${duplicate.url})`);
    process.exit(1);
  }

  const checks = await runSiteChecks(opts.url, opts.sampleProfile);
  const aiAccess = checks.robots.aiAccess;

  const entry = applyGeoScore({
    name: opts.name,
    url: opts.url,
    category: opts.category,
    sampleProfile: opts.sampleProfile,
    dr: checks.authority.dr,
    trancoRank: checks.authority.tranco.rank,
    linkType: checks.links.linkType === 'unknown' ? 'mixed' : checks.links.linkType,
    effort: inferEffort(checks.links.linkType === 'unknown' ? 'mixed' : checks.links.linkType),
    description: opts.description,
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
  });

  data.sites.push(entry);
  await writeSitesFile(data);

  console.log(JSON.stringify({
    status: 'added',
    site: entry,
    summary: {
      aiAccess: entry.aiAccess,
      linkType: entry.linkType,
      indexable: entry.indexable,
      dr: entry.dr
    }
  }, null, 2));
})();
