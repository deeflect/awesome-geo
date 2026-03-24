#!/usr/bin/env tsx
import { applyGeoScore, inferEffort, readSitesFile, toDateString, writeSitesFile } from './lib.js';
import { runSiteChecks } from './check-site.js';

(async () => {
  const data = await readSitesFile();
  const changed: Array<{ name: string; fields: string[] }> = [];

  for (const site of data.sites) {
    if (!site.url) continue;

    const sampleProfile = site.sampleProfile || site.url;
    const checks = await runSiteChecks(site.url, sampleProfile);

    const nextAiAccess = {
      oaiSearchBot: checks.robots.aiAccess.oaiSearchBot,
      gptBot: checks.robots.aiAccess.gptBot,
      chatgptUser: checks.robots.aiAccess.chatgptUser,
      claudeBot: checks.robots.aiAccess.claudeBot,
      perplexityBot: checks.robots.aiAccess.perplexityBot,
      googleExtended: checks.robots.aiAccess.googleExtended,
      bytespider: checks.robots.aiAccess.bytespider
    };
    const nextLinkType = checks.links.linkType === 'unknown' ? 'mixed' : checks.links.linkType;
    const nextEffort = inferEffort(nextLinkType);
    const nextDr = checks.authority.dr;
    const nextTrancoRank = checks.authority.tranco.rank;

    const fields: string[] = [];
    const oldAi = JSON.stringify(site.aiAccess || {});
    const newAi = JSON.stringify(nextAiAccess);
    if (oldAi !== newAi) {
      site.aiAccess = nextAiAccess;
      fields.push('aiAccess');
    }

    if (site.indexable !== checks.indexability.indexable) {
      site.indexable = checks.indexability.indexable;
      fields.push('indexable');
    }

    if (nextDr != null && site.dr !== nextDr) {
      site.dr = nextDr;
      fields.push('dr');
    }

    if (nextTrancoRank != null && site.trancoRank !== nextTrancoRank) {
      site.trancoRank = nextTrancoRank;
      fields.push('trancoRank');
    }

    if (site.linkType !== nextLinkType) {
      site.linkType = nextLinkType;
      fields.push('linkType');
    }

    if (site.effort !== nextEffort) {
      site.effort = nextEffort;
      fields.push('effort');
    }

    if (site.profileLinkDofollow !== checks.links.profileLinkDofollow) {
      site.profileLinkDofollow = checks.links.profileLinkDofollow;
      fields.push('profileLinkDofollow');
    }

    if (site.verified !== true) {
      site.verified = true;
      fields.push('verified');
    }

    site.lastVerified = toDateString();
    const rescored = applyGeoScore(site);
    const previousGeo = JSON.stringify({
      aiCrawled: site.aiCrawled,
      geoScore: site.geoScore,
      geoTier: site.geoTier,
      geoSignals: site.geoSignals
    });
    const nextGeo = JSON.stringify({
      aiCrawled: rescored.aiCrawled,
      geoScore: rescored.geoScore,
      geoTier: rescored.geoTier,
      geoSignals: rescored.geoSignals
    });
    if (previousGeo !== nextGeo) {
      site.aiCrawled = rescored.aiCrawled;
      site.geoScore = rescored.geoScore;
      site.geoTier = rescored.geoTier;
      site.geoSignals = rescored.geoSignals;
      fields.push('geoScore');
    }

    if (fields.length > 0) {
      changed.push({ name: site.name, fields });
    }
  }

  await writeSitesFile(data);

  console.log(JSON.stringify({
    total: data.sites.length,
    changed: changed.length,
    details: changed
  }, null, 2));
})();
