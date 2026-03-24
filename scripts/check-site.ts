#!/usr/bin/env tsx
import { Command } from 'commander';
import * as cheerio from 'cheerio';
import robotsParser from 'robots-parser';
import { LinkType, rateLimitedFetch } from './lib.js';

type AccessState = 'allowed' | 'blocked' | 'unknown';

type CheckResult = {
  siteUrl: string;
  sampleProfile: string;
  timestamp: string;
  robots: {
    robotsUrl: string;
    fetched: boolean;
    aiAccess: {
      oaiSearchBot: AccessState;
      gptBot: AccessState;
      chatgptUser: AccessState;
      googleExtended: AccessState;
      claudeBot: AccessState;
      perplexityBot: AccessState;
      bytespider: AccessState;
    };
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

const AI_BOTS = [
  { key: 'oaiSearchBot', ua: 'OAI-SearchBot' },
  { key: 'gptBot', ua: 'GPTBot' },
  { key: 'chatgptUser', ua: 'ChatGPT-User' },
  { key: 'googleExtended', ua: 'Google-Extended' },
  { key: 'claudeBot', ua: 'ClaudeBot' },
  { key: 'perplexityBot', ua: 'PerplexityBot' },
  { key: 'bytespider', ua: 'Bytespider' }
] as const;

type Fetcher = (input: string | URL, init?: RequestInit) => Promise<Response>;
type AiBotKey = (typeof AI_BOTS)[number]['key'];
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

async function fetchProfileLinks(sampleProfile: string) {
  try {
    const res = await rateLimitedFetch(sampleProfile);
    if (!res.ok) throw new Error(`profile fetch status ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const base = new URL(sampleProfile);

    let outboundLinksFound = 0;
    let nofollowLinks = 0;
    let dofollowLinks = 0;

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;
      let absolute: URL;
      try {
        absolute = new URL(href, sampleProfile);
      } catch {
        return;
      }
      if (!['http:', 'https:'].includes(absolute.protocol)) return;
      if (absolute.hostname === base.hostname) return;

      outboundLinksFound++;
      const rel = ($(el).attr('rel') || '').toLowerCase();
      const nofollow = rel.split(/\s+/).includes('nofollow');
      if (nofollow) nofollowLinks++;
      else dofollowLinks++;
    });

    let linkType: LinkType = 'unknown';
    if (outboundLinksFound === 0) linkType = 'unknown';
    else if (nofollowLinks === outboundLinksFound) linkType = 'nofollow';
    else if (dofollowLinks === outboundLinksFound) linkType = 'dofollow';
    else linkType = 'mixed';

    const profileLinkDofollow = outboundLinksFound === 1 ? dofollowLinks === 1 : null;

    return {
      html,
      outboundLinksFound,
      nofollowLinks,
      dofollowLinks,
      linkType,
      profileLinkDofollow
    };
  } catch (error: any) {
    return {
      html: null,
      outboundLinksFound: 0,
      nofollowLinks: 0,
      dofollowLinks: 0,
      linkType: 'unknown' as LinkType,
      profileLinkDofollow: null,
      error: error?.message || 'Unknown profile link check error'
    };
  }
}

async function checkIndexability(sampleProfile: string, html?: string | null) {
  let statusCode: number | null = null;
  let xRobotsTag: string | null = null;

  try {
    const head = await rateLimitedFetch(sampleProfile, { method: 'HEAD', redirect: 'follow' });
    statusCode = head.status;
    xRobotsTag = head.headers.get('x-robots-tag');
  } catch {
    // ignore and fallback
  }

  try {
    if (!html) {
      const res = await rateLimitedFetch(sampleProfile);
      if (statusCode == null) statusCode = res.status;
      if (!xRobotsTag) xRobotsTag = res.headers.get('x-robots-tag');
      html = await res.text();
    }

    let metaRobots: string | null = null;
    if (html) {
      const $ = cheerio.load(html);
      metaRobots = $('meta[name="robots"]').attr('content') || null;
    }

    const noindexDetected = [xRobotsTag, metaRobots].some((v) => (v || '').toLowerCase().includes('noindex'));
    const statusOk = statusCode != null ? statusCode >= 200 && statusCode < 400 : null;
    const indexable = statusOk == null ? null : statusOk && !noindexDetected;

    return {
      statusCode,
      statusOk,
      xRobotsTag,
      metaRobots,
      noindexDetected,
      indexable
    };
  } catch (error: any) {
    return {
      statusCode,
      statusOk: statusCode != null ? statusCode >= 200 && statusCode < 400 : null,
      xRobotsTag,
      metaRobots: null,
      noindexDetected: null,
      indexable: null,
      error: error?.message || 'Unknown indexability error'
    };
  }
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
  const links = await fetchProfileLinks(publicSurfaceUrl);
  const indexability = await checkIndexability(publicSurfaceUrl, links.html);
  const authority = await fetchAuthority(siteUrl);

  return {
    siteUrl,
    sampleProfile: publicSurfaceUrl,
    timestamp: new Date().toISOString(),
    robots: robots as CheckResult['robots'],
    links: {
      outboundLinksFound: links.outboundLinksFound,
      nofollowLinks: links.nofollowLinks,
      dofollowLinks: links.dofollowLinks,
      linkType: links.linkType,
      profileLinkDofollow: links.profileLinkDofollow,
      ...(links.error ? { error: links.error } : {})
    },
    indexability,
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
