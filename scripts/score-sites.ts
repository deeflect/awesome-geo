#!/usr/bin/env tsx
import { applyGeoScore, readSitesFile, writeSitesFile } from './lib.js';

const { categories, sites } = await readSitesFile();

let highCount = 0;
let medCount = 0;
let lowCount = 0;

for (let index = 0; index < sites.length; index += 1) {
  sites[index] = applyGeoScore(sites[index]);
  const tier = sites[index].geoTier;
  if (tier === 'high') highCount += 1;
  else if (tier === 'medium') medCount += 1;
  else lowCount += 1;
}

await writeSitesFile({ categories, sites });

console.log(`✅ GEO scores calculated for ${sites.length} sites`);
console.log(`   🟢 High (75+): ${highCount}`);
console.log(`   🟡 Medium (50-74): ${medCount}`);
console.log(`   🔴 Low (<50): ${lowCount}`);
