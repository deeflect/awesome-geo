#!/usr/bin/env tsx
import { Command } from 'commander';
import * as cheerio from 'cheerio';
import robotsParser from 'robots-parser';
import { AI_BOTS, AiBotKey, AccessState, LinkType, rateLimitedFetch } from './lib.js';

type CheckResult = {
  siteUrl: string;
  sampleProfile: string;
  timestamp: string;
  robots: {
    robotsUrl: string;
    fetched: boolean;
    aiAccess: AiAccessMap;
    error?: string;
  };
  links: {
    outboundLinksFound: number;
    nofollowLinks: number;
    dofollowLinks: number;
    linkType: LinkType;
    profileLinkDofollow: boolean | null;
    error?: string;
  };
  indexability: {
    statusCode: number | null;
    statusOk: boolean | null;
    xRobotsTag: string | null;
    metaRobots: string | null;
    noindexDetected: boolean | null;
    indexable: boolean | null;
    error?: string;
  };
  authority: {
    domain: string;
    openPageRank: {
      score: number | null;
      rank: string | null;
      error?: string;
    };
    tranco: {
      rank: number | null;
      error?: string;
    };
    dr: number | null;
  };
};

type Fetcher = (input: string | URL, init?: RequestInit) => Promise<Response>;
type AiAccessMap = Record<AiBotKey, AccessState>;

async function fetchWithUserAgent(input: string | URL, init?: RequestInit): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      'user-agent': 'awesome-geo-verifier/1.0 (+https://github.com/deeflect/awesome-geo)',
      ...(init?.headers || {})
    }
  });
}

async function fetchRobotsCheckWithFetcher(siteUrl: string, targetUrl: string, fetcher: Fetcher) {
  const robotsTarget = targetUrl || siteUrl;
  const url = new URL(robotsTarget);
  const robotsUrl = `${url.origin}/robots.txt`;
  const aiAccess = {} as AiAccessMap;

  try {
    const res = await fetcher(robotsUrl, { signal: AbortSignal.timeout(10_000) });
    if (res.status === 404 || res.status === 410) {
      for (const bot of AI_BOTS) {
        aiAccess[bot.key] = 'allowed';
      }
      return { robotsUrl, fetched: true, aiAccess };
    }

    if (!res.ok) throw new Error(`robots.txt status ${res.status}`);

    const body = await res.text();
    const parsed = (robotsParser as unknown as (url: string, robotstxt: string) => { isAllowed(url: string, ua?: string): boolean | undefined })(robotsUrl, body);
    for (const bot of AI_BOTS) {
      const allowed = parsed.isAllowed(targetUrl, bot.ua);
      aiAccess[bot.key] = allowed === null ? 'unknown' : allowed ? 'allowed' : 'blocked';
    }

    return { robotsUrl, fetched: true, aiAccess };
  } catch (error: any) {
    for (const bot of AI_BOTS) aiAccess[bot.key] = 'unknown';
    return { robotsUrl, fetched: false, aiAccess, error: error?.message || 'Unknown robots.txt error' };
  }
}

export async function fetchRobotsCheck(siteUrl: string, targetUrl: string) {
  return fetchRobotsCheckWithFetcher(siteUrl, targetUrl, rateLimitedFetch);
}

export async function fetchAiAccess(siteUrl: string, targetUrl: string) {
  return fetchRobotsCheckWithFetcher(siteUrl, targetUrl, fetchWithUserAgent);
}

async function fetchProfileChecks(sampleProfile: string): Promise<Pick<CheckResult, 'links' | 'indexability'>> {
  const links: CheckResult['links'] = {
    outboundLinksFound: 0,
    nofollowLinks: 0,
    dofollowLinks: 0,
    linkType: 'unknown',
    profileLinkDofollow: null
  };
  const indexability: CheckResult['indexability'] = {
    statusCode: null,
    statusOk: null,
    xRobotsTag: null,
    metaRobots: null,
    noindexDetected: null,
    indexable: null
  };

  try {
    const res = await rateLimitedFetch(sampleProfile, { signal: AbortSignal.timeout(10_000) });
    indexability.statusCode = res.status;
    indexability.statusOk = res.ok;
    indexability.xRobotsTag = res.headers.get('x-robots-tag');

    if (!res.ok) {
      if (res.status === 404 || res.status === 410) indexability.indexable = false;
      throw new Error(`profile fetch status ${res.status}`);
    }

    const contentType = res.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    if (contentType && contentType !== 'text/html' && contentType !== 'application/xhtml+xml') {
      throw new Error(`profile response is ${contentType}`);
    }

    const html = await res.text();
    if (!html.trim()) throw new Error('empty profile response');
    const $ = cheerio.load(html);
    const base = new URL(res.url || sampleProfile);

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;
      let absolute: URL;
      try {
        absolute = new URL(href, base);
      } catch {
        return;
      }
      if (!['http:', 'https:'].includes(absolute.protocol)) return;
      if (absolute.hostname === base.hostname) return;

      links.outboundLinksFound++;
      const rel = ($(el).attr('rel') || '').toLowerCase();
      if (rel.split(/\s+/).includes('nofollow')) links.nofollowLinks++;
      else links.dofollowLinks++;
    });

    if (links.nofollowLinks && links.dofollowLinks) links.linkType = 'mixed';
    else if (links.nofollowLinks) links.linkType = 'nofollow';
    else if (links.dofollowLinks) links.linkType = 'dofollow';

    if (links.outboundLinksFound === 1) links.profileLinkDofollow = links.dofollowLinks === 1;

    indexability.metaRobots = $('meta[name="robots"]').attr('content') || null;
    indexability.noindexDetected = [indexability.xRobotsTag, indexability.metaRobots]
      .some((value) => value?.toLowerCase().includes('noindex'));
    indexability.indexable = !indexability.noindexDetected;
  } catch (error: any) {
    links.error = error?.message || 'Unknown profile check error';
    indexability.error = links.error;
  }

  return { links, indexability };
}

export async function fetchAuthority(siteUrl: string) {
  const domain = new URL(siteUrl).hostname.replace(/^www\./, '');

  let openPageRankScore: number | null = null;
  let openPageRankRank: string | null = null;
  let openPageRankError: string | undefined;

  const apiKey = process.env.OPENPAGERANK_API_KEY;
  if (!apiKey) {
    openPageRankError = 'OPENPAGERANK_API_KEY not set';
  } else {
    try {
      const res = await rateLimitedFetch(`https://openpagerank.com/api/v1.0/getPageRank?domains%5B0%5D=${encodeURIComponent(domain)}`, {
        headers: { 'API-OPR': apiKey }
      });
      if (!res.ok) throw new Error(`OpenPageRank status ${res.status}`);
      const json: any = await res.json();
      const first = json?.response?.[0];
      openPageRankScore = Number.isFinite(first?.page_rank_decimal) ? Number(first.page_rank_decimal) : Number.isFinite(first?.page_rank_integer) ? Number(first.page_rank_integer) : null;
      openPageRankRank = first?.rank ?? null;
    } catch (error: any) {
      openPageRankError = error?.message || 'OpenPageRank error';
    }
  }

  let trancoRank: number | null = null;
  let trancoError: string | undefined;
  try {
    const res = await rateLimitedFetch(`https://tranco-list.eu/api/ranks/domain/${encodeURIComponent(domain)}`);
    if (!res.ok) throw new Error(`Tranco status ${res.status}`);
    const json: any = await res.json();
    const ranks = Array.isArray(json?.ranks) ? json.ranks : [];
    const latest = ranks.find((entry: any) => Number.isFinite(entry?.rank));
    trancoRank = Number.isFinite(latest?.rank) ? Number(latest.rank) : null;
  } catch (error: any) {
    trancoError = error?.message || 'Tranco API error';
  }

  const dr = openPageRankScore != null ? Math.round(openPageRankScore * 10) : null;

  return {
    domain,
    openPageRank: { score: openPageRankScore, rank: openPageRankRank, ...(openPageRankError ? { error: openPageRankError } : {}) },
    tranco: { rank: trancoRank, ...(trancoError ? { error: trancoError } : {}) },
    dr
  };
}

export async function runSiteChecks(siteUrl: string, sampleProfile: string): Promise<CheckResult> {
  const publicSurfaceUrl = sampleProfile || siteUrl;
  const robots = await fetchRobotsCheck(siteUrl, publicSurfaceUrl);
  const page = await fetchProfileChecks(publicSurfaceUrl);
  const authority = await fetchAuthority(siteUrl);

  return {
    siteUrl,
    sampleProfile: publicSurfaceUrl,
    timestamp: new Date().toISOString(),
    robots: robots as CheckResult['robots'],
    ...page,
    authority
  };
}

const program = new Command();
program
  .name('check-site')
  .description('Run all checks for a platform')
  .requiredOption('--url <url>', 'Site root URL')
  .requiredOption('--sample-profile <url>', 'Sample profile URL')
  .option('--pretty', 'Pretty-print JSON output', true);

if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse(process.argv);
  const opts = program.opts();
  runSiteChecks(opts.url, opts.sampleProfile)
    .then((result) => {
      const json = opts.pretty ? JSON.stringify(result, null, 2) : JSON.stringify(result);
      console.log(json);
    })
    .catch((error) => {
      console.error(JSON.stringify({ error: error?.message || String(error) }, null, 2));
      process.exit(1);
    });
}
