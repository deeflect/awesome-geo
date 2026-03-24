#!/usr/bin/env tsx
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

type Category = { id: string; name: string; description: string };
type Site = Record<string, any> & { category: string };

const root = path.resolve(process.cwd());
const oldFile = path.join(root, 'data', 'sites.yaml');
const categoriesFile = path.join(root, 'data', 'categories.yaml');
const sitesDir = path.join(root, 'data', 'sites');

const categoryDefaults: Record<string, Category> = {
  'developer-profiles': { id: 'developer-profiles', name: 'Developer Profiles', description: 'Technical platforms with profile pages' },
  'business-directories': { id: 'business-directories', name: 'Business Directories', description: 'Company and professional directories' },
  'content-syndication': { id: 'content-syndication', name: 'Content Syndication', description: 'Platforms for republishing content' },
  'community-platforms': { id: 'community-platforms', name: 'Community Platforms', description: 'Forums and community sites' },
  'social-profiles': { id: 'social-profiles', name: 'Social Profiles', description: 'Social media and portfolio sites' },
  'knowledge-bases': { id: 'knowledge-bases', name: 'Knowledge Bases', description: 'Wikis and reference platforms' },
  'design-portfolios': { id: 'design-portfolios', name: 'Design Portfolios', description: 'Design galleries and portfolio platforms' },
  'niche-directories': { id: 'niche-directories', name: 'Niche Directories', description: 'Specialized expert and industry directories' },
  'social-bookmarking': { id: 'social-bookmarking', name: 'Social Bookmarking', description: 'Content curation and bookmarking platforms' }
};

const desiredOrder = Object.keys(categoryDefaults);

const raw = await readFile(oldFile, 'utf8');
const parsed = YAML.parse(raw) || {};
const sites: Site[] = parsed.sites || [];
const oldCategories: Category[] = parsed.categories || [];

const categoryMap = new Map<string, Category>();
for (const c of oldCategories) categoryMap.set(c.id, c);
for (const site of sites) {
  if (!categoryMap.has(site.category)) {
    categoryMap.set(site.category, categoryDefaults[site.category] || {
      id: site.category,
      name: site.category.split('-').map((x) => x[0].toUpperCase() + x.slice(1)).join(' '),
      description: 'Category of GEO platforms'
    });
  }
}

const categories = desiredOrder
  .map((id) => categoryMap.get(id) || categoryDefaults[id])
  .filter(Boolean) as Category[];

await mkdir(sitesDir, { recursive: true });
for (const id of desiredOrder) {
  const filePath = path.join(sitesDir, `${id}.yaml`);
  const category = categories.find((c) => c.id === id) || categoryDefaults[id];
  const items = sites
    .filter((s) => s.category === id)
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  const content = `# ${category.name} — ${category.description}\n# To add a new site, append an entry and submit a PR.\n\n${YAML.stringify(items, { indent: 2 })}`;
  await writeFile(filePath, content, 'utf8');
}

await writeFile(categoriesFile, YAML.stringify(categories, { indent: 2 }), 'utf8');
await rm(oldFile);

console.log(`✅ Split ${sites.length} sites into ${desiredOrder.length} category files`);
