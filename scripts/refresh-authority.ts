#!/usr/bin/env tsx
import { applyGeoScore, readSitesFile, writeSitesFile } from './lib.js';
import { fetchAuthority } from './check-site.js';

(async () => {
  const data = await readSitesFile();
  const changed: Array<{ name: string; fields: string[] }> = [];

  for (const site of data.sites) {
    if (!site.url) continue;

    const authority = await fetchAuthority(site.url);
    const fields: string[] = [];

    if (authority.dr != null && site.dr !== authority.dr) {
      site.dr = authority.dr;
      fields.push('dr');
    }

    if (authority.tranco.rank != null && site.trancoRank !== authority.tranco.rank) {
      site.trancoRank = authority.tranco.rank;
      fields.push('trancoRank');
    }

    const rescored = applyGeoScore(site);
    const previousGeo = JSON.stringify({
      geoScore: site.geoScore,
      geoTier: site.geoTier,
      geoSignals: site.geoSignals
    });
    const nextGeo = JSON.stringify({
      geoScore: rescored.geoScore,
      geoTier: rescored.geoTier,
      geoSignals: rescored.geoSignals
    });

    if (previousGeo !== nextGeo) {
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
