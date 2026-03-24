#!/usr/bin/env tsx
import { applyGeoScore, readSitesFile, toDateString, writeSitesFile } from './lib.js';
import { fetchAiAccess } from './check-site.js';

const BATCH_SIZE = Number(process.env.AI_ACCESS_CONCURRENCY || 8);
const CHECKPOINT_INTERVAL = Number(process.env.AI_ACCESS_CHECKPOINT_INTERVAL || 16);

type ChangeRecord = { name: string; fields: string[] };

function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

(async () => {
  const startedAt = Date.now();
  const data = await readSitesFile();
  const changed: ChangeRecord[] = [];

  for (let start = 0; start < data.sites.length; start += BATCH_SIZE) {
    const batch = data.sites.slice(start, start + BATCH_SIZE);

    const results = await Promise.all(batch.map(async (site, offset) => {
      const index = start + offset;
      if (!site.url) {
        return { index, aiAccess: null };
      }

      const crawlTarget = site.sampleProfile || site.url;
      const robots = await fetchAiAccess(site.url, crawlTarget);
      return { index, aiAccess: robots.aiAccess };
    }));

    for (const result of results) {
      if (!result.aiAccess) continue;

      const site = data.sites[result.index];
      const fields: string[] = [];
      const oldAi = JSON.stringify(site.aiAccess || {});
      const newAi = JSON.stringify(result.aiAccess);

      if (oldAi !== newAi) {
        site.aiAccess = result.aiAccess;
        fields.push('aiAccess');
      }

      site.lastVerified = toDateString();

      const previousGeo = JSON.stringify({
        aiCrawled: site.aiCrawled,
        geoScore: site.geoScore,
        geoTier: site.geoTier,
        geoSignals: site.geoSignals
      });

      const rescored = applyGeoScore(site);
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

    const processed = Math.min(start + BATCH_SIZE, data.sites.length);
    if (processed % CHECKPOINT_INTERVAL === 0 || processed === data.sites.length) {
      await writeSitesFile(data);
    }

    console.log(JSON.stringify({
      progress: `${processed}/${data.sites.length}`,
      changed: changed.length,
      elapsed: formatDuration(Date.now() - startedAt)
    }));
  }

  console.log(JSON.stringify({
    total: data.sites.length,
    changed: changed.length,
    elapsed: formatDuration(Date.now() - startedAt),
    details: changed
  }, null, 2));
})();
