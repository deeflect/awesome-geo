import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

export type AccessState = 'allowed' | 'blocked' | 'unknown';
export type LinkType = 'dofollow' | 'nofollow' | 'mixed' | 'unknown';
export type GeoTier = 'high' | 'medium' | 'low';
export type SignalOverride = 'low' | 'medium' | 'high';

export type GeoSignals = {
  crawlAccessScore: number;
  indexabilityScore: number;
  popularityScore: number;
  queryFitScore: number;
  authorityScore: number;
  linkValueScore: number;
};

export type AiSummary = {
  allowed: number;
  total: number;
  state: 'open' | 'partial' | 'blocked' | 'unknown';
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type RepoType = 'tool' | 'library' | 'research' | 'reference' | 'standard' | 'skill' | 'framework';

export type RepoEntry = {
  name: string;
  repo: string;
  url: string;
  category: string;
  description: string;
  stars: number;
  language: string | null;
  type: RepoType;
  maintained: boolean;
};

export type SiteEntry = {
  name: string;
  url: string;
  category: string;
  sampleProfile?: string;
  dr?: number | null;
  trancoRank?: number | null;
  linkType?: LinkType;
  effort?: 'low' | 'medium' | 'hard';
  description?: string;
  verified?: boolean;
  lastVerified?: string;
  geoScore?: number;
  geoTier?: GeoTier;
  geoSignals?: GeoSignals;
  queryFit?: SignalOverride;
  platformReference?: SignalOverride;
  entityStrength?: SignalOverride;
  observedVisibility?: SignalOverride;
  aiAccess?: {
    oaiSearchBot?: AccessState;
    gptBot: AccessState;
    chatgptUser?: AccessState;
    claudeBot: AccessState;
    perplexityBot: AccessState;
    googleExtended: AccessState;
    bytespider: AccessState;
  };
  indexable?: boolean | null;
  profileLinkDofollow?: boolean | null;
  aiCrawled?: boolean;
};

const DATA_DIR = path.resolve(process.cwd(), 'data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.yaml');
const SITES_DIR = path.join(DATA_DIR, 'sites');
const REPO_CATEGORIES_FILE = path.join(DATA_DIR, 'repo-categories.yaml');
const REPOS_DIR = path.join(DATA_DIR, 'repos');

let lastRequestAt = 0;
export async function rateLimitedFetch(input: string | URL, init?: RequestInit): Promise<Response> {
  const now = Date.now();
  const elapsed = now - lastRequestAt;
  const minDelay = 1000;
  if (elapsed < minDelay) {
    await sleep(minDelay - elapsed);
  }
  const response = await fetch(input, {
    ...init,
    headers: {
      'user-agent': 'awesome-geo-verifier/1.0 (+https://github.com/deeflect/awesome-geo)',
      ...(init?.headers || {})
    }
  });
  lastRequestAt = Date.now();
  return response;
}

export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function toDateString(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function fileForCategory(categoryId: string): string {
  return path.join(SITES_DIR, `${categoryId}.yaml`);
}

function sortSites(sites: SiteEntry[]): SiteEntry[] {
  return [...sites].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

export async function readSitesFile(): Promise<{ categories: Category[]; sites: SiteEntry[] }> {
  const categoriesRaw = await readFile(CATEGORIES_FILE, 'utf8');
  const categories = (YAML.parse(categoriesRaw) || []) as Category[];

  const entries = await readdir(SITES_DIR, { withFileTypes: true });
  const yamlFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.yaml'))
    .map((entry) => entry.name)
    .sort();

  const sites: SiteEntry[] = [];
  for (const filename of yamlFiles) {
    const raw = await readFile(path.join(SITES_DIR, filename), 'utf8');
    const parsed = (YAML.parse(raw) || []) as SiteEntry[];
    for (const site of parsed) {
      if (!site.category) {
        site.category = filename.replace(/\.ya?ml$/i, '');
      }
      sites.push(site);
    }
  }

  return { categories, sites };
}

export async function readCategory(categoryId: string): Promise<SiteEntry[]> {
  const raw = await readFile(fileForCategory(categoryId), 'utf8');
  const parsed = (YAML.parse(raw) || []) as SiteEntry[];
  return parsed.map((site) => ({ ...site, category: site.category || categoryId }));
}

export async function readReposFile(): Promise<{ categories: Category[]; repos: RepoEntry[] }> {
  const categoriesRaw = await readFile(REPO_CATEGORIES_FILE, 'utf8');
  const categories = (YAML.parse(categoriesRaw) || []) as Category[];

  const entries = await readdir(REPOS_DIR, { withFileTypes: true });
  const yamlFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.yaml'))
    .map((entry) => entry.name)
    .sort();

  const repos: RepoEntry[] = [];
  for (const filename of yamlFiles) {
    const raw = await readFile(path.join(REPOS_DIR, filename), 'utf8');
    const parsed = (YAML.parse(raw) || []) as RepoEntry[];
    const categoryId = filename.replace(/\.ya?ml$/i, '');
    for (const repo of parsed) {
      if (!repo.category) repo.category = categoryId;
      repos.push(repo);
    }
  }

  return { categories, repos };
}

export async function writeSitesFile(data: { categories: Category[]; sites: SiteEntry[] }): Promise<void> {
  await writeFile(CATEGORIES_FILE, YAML.stringify(data.categories, { indent: 2 }), 'utf8');

  for (const category of data.categories) {
    const filePath = fileForCategory(category.id);
    const sites = sortSites(data.sites.filter((site) => site.category === category.id));
    const content = `# ${category.name} — ${category.description}\n# To add a new site, append an entry and submit a PR.\n\n${YAML.stringify(sites, { indent: 2 })}`;
    await writeFile(filePath, content, 'utf8');
  }
}

export function normalizeUrl(url: string): string {
  const u = new URL(url);
  u.hash = '';
  if (u.pathname.endsWith('/')) u.pathname = u.pathname.slice(0, -1);
  return u.toString();
}

export function inferEffort(linkType: LinkType): 'low' | 'medium' | 'hard' {
  if (linkType === 'dofollow') return 'low';
  if (linkType === 'mixed') return 'medium';
  return 'hard';
}

const CRAWL_ACCESS_WEIGHTS = {
  oaiSearchBot: 12,
  perplexityBot: 7,
  claudeBot: 4,
  gptBot: 4,
  googleExtended: 3,
} as const;

const AUTOMATIC_CRAWLER_KEYS = [
  'oaiSearchBot',
  'gptBot',
  'claudeBot',
  'perplexityBot',
  'googleExtended',
  'bytespider',
] as const;

const DISCOVERY_CRAWLER_KEYS = [
  'oaiSearchBot',
  'gptBot',
  'claudeBot',
  'perplexityBot',
  'googleExtended',
] as const;

const QUERY_FIT_BY_CATEGORY: Record<string, number> = {
  'developer-profiles': 18,
  'business-directories': 18,
  'content-syndication': 12,
  'community-platforms': 14,
  'social-profiles': 11,
  'knowledge-bases': 16,
  'design-portfolios': 11,
  'niche-directories': 15,
  'social-bookmarking': 7,
};

const QUERY_FIT_OVERRIDE_SCORES: Record<SignalOverride, number> = {
  low: 7,
  medium: 13,
  high: 20,
};

function getAuthorityScore(site: SiteEntry): number {
  const dr = site.dr ?? 0;
  if (dr >= 95) return 15;
  if (dr >= 90) return 14;
  if (dr >= 80) return 13;
  if (dr >= 70) return 12;
  if (dr >= 60) return 10;
  if (dr >= 50) return 8;
  if (dr >= 40) return 6;
  if (dr >= 30) return 4;
  if (dr >= 20) return 2;
  if (dr >= 10) return 1;
  return 0;
}

function getLinkValueScore(site: SiteEntry): number {
  if (site.linkType === 'dofollow') return 5;
  if (site.linkType === 'mixed') return 4;
  if (site.linkType === 'nofollow') return 3;
  return 2;
}

function getCrawlAccessScore(site: SiteEntry): number {
  let score = 0;
  for (const [bot, weight] of Object.entries(CRAWL_ACCESS_WEIGHTS)) {
    if (site.aiAccess?.[bot as keyof typeof CRAWL_ACCESS_WEIGHTS] === 'allowed') score += weight;
  }
  return score;
}

function getIndexabilityScore(site: SiteEntry): number {
  if (site.indexable === true) return 10;
  if (site.indexable === false) return 0;
  return 4;
}

const PLATFORM_REFERENCE_OVERRIDES: Record<string, SignalOverride> = {
  'GitHub': 'high',
  'GitLab': 'medium',
  'Hacker News': 'high',
  'LinkedIn Articles': 'high',
  'LinkedIn Company': 'high',
  'Medium': 'high',
  'Reddit': 'high',
  'Stack Overflow': 'high',
  'Substack': 'high',
  'Wikipedia': 'high',
  'X / Twitter': 'high',
  'YouTube': 'high',
};

const QUERY_FIT_OVERRIDES: Record<string, SignalOverride> = {
  'AngelList / Wellfound': 'high',
  'Crunchbase': 'high',
  'GitHub': 'high',
  'Google Business': 'high',
  'LinkedIn Articles': 'high',
  'LinkedIn Company': 'high',
  'Medium': 'medium',
  'Reddit': 'medium',
  'Stack Overflow': 'high',
  'Substack': 'medium',
  'Wikipedia': 'high',
};

function getQueryFitOverride(site: SiteEntry): SignalOverride | undefined {
  return site.queryFit ?? site.entityStrength ?? QUERY_FIT_OVERRIDES[site.name];
}

function getQueryFitScore(site: SiteEntry): number {
  const override = getQueryFitOverride(site);
  if (override) return QUERY_FIT_OVERRIDE_SCORES[override];
  return QUERY_FIT_BY_CATEGORY[site.category] ?? 12;
}

function getPopularityScore(site: SiteEntry): number {
  const rank = site.trancoRank;
  const override = site.platformReference ?? site.observedVisibility ?? PLATFORM_REFERENCE_OVERRIDES[site.name];
  if (override === 'high') return 20;
  if (override === 'medium') return 14;
  if (override === 'low') return 8;
  if (rank == null) return 1;
  if (rank <= 100) return 20;
  if (rank <= 1_000) return 19;
  if (rank <= 5_000) return 18;
  if (rank <= 10_000) return 17;
  if (rank <= 25_000) return 15;
  if (rank <= 50_000) return 13;
  if (rank <= 100_000) return 11;
  if (rank <= 250_000) return 8;
  if (rank <= 500_000) return 5;
  if (rank <= 1_000_000) return 3;
  return 1;
}

export function calculateGeoSignals(site: SiteEntry): GeoSignals {
  return {
    crawlAccessScore: getCrawlAccessScore(site),
    indexabilityScore: getIndexabilityScore(site),
    popularityScore: getPopularityScore(site),
    queryFitScore: getQueryFitScore(site),
    authorityScore: getAuthorityScore(site),
    linkValueScore: getLinkValueScore(site),
  };
}

export function getGeoTier(score: number): GeoTier {
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

export function isAiCrawled(aiAccess?: SiteEntry['aiAccess']): boolean {
  if (!aiAccess) return false;
  return AUTOMATIC_CRAWLER_KEYS.some((bot) => aiAccess[bot] === 'allowed');
}

export function summarizeAiAccess(aiAccess?: SiteEntry['aiAccess']): AiSummary {
  if (!aiAccess) {
    return { allowed: 0, total: DISCOVERY_CRAWLER_KEYS.length, state: 'unknown' };
  }

  const states = DISCOVERY_CRAWLER_KEYS.map((bot) => aiAccess[bot]);
  const allowed = states.filter((state) => state === 'allowed').length;
  const known = states.filter((state) => state && state !== 'unknown').length;

  if (allowed === DISCOVERY_CRAWLER_KEYS.length) {
    return { allowed, total: DISCOVERY_CRAWLER_KEYS.length, state: 'open' };
  }

  if (allowed > 0) {
    return { allowed, total: DISCOVERY_CRAWLER_KEYS.length, state: 'partial' };
  }

  if (known === 0) {
    return { allowed, total: DISCOVERY_CRAWLER_KEYS.length, state: 'unknown' };
  }

  return { allowed, total: DISCOVERY_CRAWLER_KEYS.length, state: 'blocked' };
}

export function formatAiAccessLabel(aiAccess?: SiteEntry['aiAccess']): string {
  const summary = summarizeAiAccess(aiAccess);
  if (summary.state === 'open') return '✅ Open';
  if (summary.state === 'blocked') return '❌ Blocked';
  if (summary.state === 'unknown') return '—';
  return `⚠️ ${summary.allowed}/${summary.total}`;
}

export function applyGeoScore(site: SiteEntry): SiteEntry {
  const geoSignals = calculateGeoSignals(site);
  const geoScore = Object.values(geoSignals).reduce((sum, value) => sum + value, 0);
  const geoTier = getGeoTier(geoScore);
  return {
    ...site,
    geoSignals,
    geoScore,
    geoTier,
    aiCrawled: isAiCrawled(site.aiAccess),
  };
}
