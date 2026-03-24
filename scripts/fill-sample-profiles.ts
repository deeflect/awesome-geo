#!/usr/bin/env tsx
import { readFile } from 'node:fs/promises';
import { readSitesFile, writeSitesFile } from './lib.js';

type SeedRow = {
  name: string;
  url: string;
  category: string;
  sampleProfile: string;
};

function entryKey(category: string, name: string, url: string): string {
  return `${category}::${name}::${url}`;
}

function parseSeedCsv(raw: string): SeedRow[] {
  const lines = raw.trim().split(/\r?\n/);
  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = '';
    let quoted = false;

    for (const char of line) {
      if (char === '"') {
        quoted = !quoted;
        continue;
      }

      if (char === ',' && !quoted) {
        values.push(current);
        current = '';
        continue;
      }

      current += char;
    }

    values.push(current);

    return {
      name: values[0] || '',
      url: values[1] || '',
      category: values[2] || '',
      sampleProfile: values[3] || '',
    };
  });
}

const MANUAL_SAMPLE_PROFILES: Record<string, string> = {
  'business-directories::Capterra::https://www.capterra.com': 'https://www.capterra.com/p/186221/Slack/',
  'business-directories::Clutch::https://clutch.co': 'https://clutch.co/profile/toptal',
  'business-directories::DesignRush::https://www.designrush.com': 'https://www.designrush.com/agency/profile/toptal',
  'business-directories::G2::https://www.g2.com': 'https://www.g2.com/products/openai-chatgpt/reviews',
  'business-directories::Glassdoor::https://www.glassdoor.com': 'https://www.glassdoor.com/Overview/Working-at-OpenAI-EI_IE2890724.11,17.htm',
  'business-directories::GoodFirms::https://goodfirms.co': 'https://www.goodfirms.co/company/toptal',
  'business-directories::LinkedIn Company::https://linkedin.com': 'https://www.linkedin.com/company/openai',
  'business-directories::Sortlist::https://www.sortlist.com': 'https://www.sortlist.com/agency/toptal',
  'business-directories::TopDevelopers::https://www.topdevelopers.co': 'https://www.topdevelopers.co/profile/toptal',
  'business-directories::TrustPilot::https://www.trustpilot.com': 'https://www.trustpilot.com/review/openai.com',

  'community-platforms::Digital Point::https://www.digitalpoint.com': 'https://forums.digitalpoint.com/members/shaun.1/',
  'community-platforms::IndieHackers::https://indiehackers.com': 'https://www.indiehackers.com/courtland',
  'community-platforms::IndieHackers::https://www.indiehackers.com': 'https://www.indiehackers.com/courtland',
  'community-platforms::Lobsters::https://lobste.rs': 'https://lobste.rs/u/jcs',
  'community-platforms::Quora::https://quora.com': 'https://www.quora.com/topic/OpenAI',
  'community-platforms::Reddit::https://reddit.com': 'https://www.reddit.com/r/OpenAI/',
  'community-platforms::Slashdot::https://slashdot.org': 'https://slashdot.org/~samzenpus',
  'community-platforms::XenForo Community::https://xenforo.com/community': 'https://xenforo.com/community/members/mike.1/',

  'content-syndication::Blogger::https://www.blogger.com': 'https://blogger.googleblog.com/',
  'content-syndication::CSS-Tricks::https://css-tricks.com': 'https://css-tricks.com/almanac/',
  'content-syndication::freeCodeCamp::https://www.freecodecamp.org': 'https://www.freecodecamp.org/news/tag/openai/',
  'content-syndication::Ghost::https://ghost.org': 'https://ghost.org/resources/',
  'content-syndication::Hacker News::https://news.ycombinator.com': 'https://news.ycombinator.com/user?id=pg',
  'content-syndication::Hacker Noon::https://hackernoon.com': 'https://hackernoon.com/tagged/openai',
  'content-syndication::LinkedIn Articles::https://linkedin.com': 'https://www.linkedin.com/pulse/openai-announces-gpt-4o-openai',
  'content-syndication::Medium::https://medium.com': 'https://medium.com/@OpenAI',
  'content-syndication::Notion::https://notion.so': 'https://www.notion.so/product',
  'content-syndication::Quora Spaces::https://www.quora.com': 'https://www.quora.com/q/ai',
  'content-syndication::Scribd::https://www.scribd.com': 'https://www.scribd.com/document/678344023/GPT-4-Technical-Report',
  'content-syndication::SitePoint::https://www.sitepoint.com': 'https://www.sitepoint.com/openai-api-tutorial/',
  'content-syndication::Substack::https://substack.com': 'https://www.oneusefulthing.org/',
  'content-syndication::Telegraph::https://telegra.ph': 'https://telegra.ph/FAQ-07-31',
  'content-syndication::Thinkers360::https://thinkers360.com': 'https://www.thinkers360.com/tl/profiles/view/10018',
  'content-syndication::Tumblr::https://www.tumblr.com': 'https://staff.tumblr.com',
  'content-syndication::WordPress.com::https://wordpress.com': 'https://wordpress.com/blog/',

  'design-portfolios::Awwwards::https://www.awwwards.com': 'https://www.awwwards.com/sites/openai',
  'design-portfolios::SiteInspire::https://www.siteinspire.com': 'https://www.siteinspire.com/websites/8312-openai',

  'developer-profiles::CodePen::https://codepen.io': 'https://codepen.io/chriscoyier',
  'developer-profiles::CodeSandbox::https://codesandbox.io': 'https://codesandbox.io/u/codesandbox',
  'developer-profiles::Codeberg::https://codeberg.org': 'https://codeberg.org/forgejo/forgejo',
  'developer-profiles::Docker Hub::https://hub.docker.com': 'https://hub.docker.com/u/library',
  'developer-profiles::Glitch::https://glitch.com': 'https://glitch.com/@glitch',
  'developer-profiles::HackerRank::https://www.hackerrank.com': 'https://www.hackerrank.com/hackerrank',
  'developer-profiles::HuggingFace::https://huggingface.co': 'https://huggingface.co/openai',
  'developer-profiles::Kaggle::https://www.kaggle.com': 'https://www.kaggle.com/organizations/openai',
  'developer-profiles::Launchpad::https://launchpad.net': 'https://launchpad.net/~ubuntu-core-dev',
  'developer-profiles::LeetCode::https://leetcode.com': 'https://leetcode.com/u/leetcode/',
  'developer-profiles::NuGet::https://www.nuget.org': 'https://www.nuget.org/profiles/dotnetfoundation',
  'developer-profiles::Observable::https://observablehq.com': 'https://observablehq.com/@mbostock',
  'developer-profiles::Packagist::https://packagist.org': 'https://packagist.org/packages/laravel/framework',
  'developer-profiles::PyPI::https://pypi.org': 'https://pypi.org/project/openai/',
  'developer-profiles::Read the Docs::https://readthedocs.org': 'https://readthedocs.org/projects/pip/',
  'developer-profiles::Replit::https://replit.com': 'https://replit.com/@replit',
  'developer-profiles::RubyGems::https://rubygems.org': 'https://rubygems.org/profiles/429',
  'developer-profiles::SourceForge::https://sourceforge.net': 'https://sourceforge.net/u/vorburger/profile/',
  'developer-profiles::Stack Overflow::https://stackoverflow.com': 'https://stackoverflow.com/users/22656/jon-skeet',
  'developer-profiles::npm::https://www.npmjs.com': 'https://www.npmjs.com/~sindresorhus',

  'knowledge-bases::ORCID::https://orcid.org': 'https://orcid.org/0000-0002-1825-0097',
  'knowledge-bases::ResearchGate::https://www.researchgate.net': 'https://www.researchgate.net/profile/Geoffrey-Hinton',
  'knowledge-bases::Semantic Scholar::https://www.semanticscholar.org': 'https://www.semanticscholar.org/author/Geoffrey-E.-Hinton/1741104',
  'knowledge-bases::Wikidata::https://wikidata.org': 'https://www.wikidata.org/wiki/Q42',
  'knowledge-bases::Wikimedia Commons::https://commons.wikimedia.org': 'https://commons.wikimedia.org/wiki/File:OpenAI_Logo.svg',
  'knowledge-bases::Wikipedia::https://wikipedia.org': 'https://en.wikipedia.org/wiki/OpenAI',

  'niche-directories::Clarity.fm::https://clarity.fm': 'https://clarity.fm/sahil-lavingia',
  'niche-directories::MuckRack::https://muckrack.com': 'https://muckrack.com/taylor-lorenz',
  'niche-directories::Toptal::https://www.toptal.com': 'https://www.toptal.com/resume/michael-ciosek',

  'social-bookmarking::Diigo::https://www.diigo.com': 'https://www.diigo.com/profile/diigoblog',
  'social-bookmarking::Flipboard::https://flipboard.com': 'https://flipboard.com/@openai',
  'social-bookmarking::Pearltrees::https://www.pearltrees.com': 'https://www.pearltrees.com/openai',
  'social-bookmarking::Start.me::https://start.me': 'https://start.me/p/GE7rEj/artificial-intelligence',

  'social-profiles::About.me::https://about.me': 'https://about.me/ev',
  'social-profiles::Bento::https://bento.me': 'https://bento.me/brian',
  'social-profiles::Bio.link::https://bio.link': 'https://bio.link/mkbhd',
  'social-profiles::Bluesky::https://bsky.app': 'https://bsky.app/profile/openai.com',
  'social-profiles::Carrd::https://carrd.co': 'https://ajlkn.carrd.co/',
  'social-profiles::Daily.dev::https://daily.dev': 'https://app.daily.dev/daily',
  'social-profiles::Dribbble::https://dribbble.com': 'https://dribbble.com/simplebits',
  'social-profiles::Flickr::https://flickr.com': 'https://www.flickr.com/people/whitehouse/',
  'social-profiles::Goodreads::https://www.goodreads.com': 'https://www.goodreads.com/author/show/3389.Stephen_King',
  'social-profiles::Gravatar::https://gravatar.com': 'https://gravatar.com/automattic',
  'social-profiles::Instagram::https://instagram.com': 'https://www.instagram.com/openai/',
  'social-profiles::Letterboxd::https://letterboxd.com': 'https://letterboxd.com/demiadejuyigbe/',
  'social-profiles::Linktree::https://linktr.ee': 'https://linktr.ee/openai',
  'social-profiles::Peerlist::https://peerlist.io': 'https://peerlist.io/peerlist',
  'social-profiles::Pinterest::https://pinterest.com': 'https://www.pinterest.com/pinterest/',
  'social-profiles::Spotify for Podcasters::https://podcasters.spotify.com': 'https://podcasters.spotify.com/pod/show/lexfridman',
  'social-profiles::Threads::https://www.threads.net': 'https://www.threads.net/@openai',
  'social-profiles::TikTok::https://tiktok.com': 'https://www.tiktok.com/@openai',
  'social-profiles::Twitch::https://twitch.tv': 'https://www.twitch.tv/openai',
  'social-profiles::Vimeo::https://vimeo.com': 'https://vimeo.com/openai',
  'social-profiles::YouTube::https://youtube.com': 'https://www.youtube.com/@OpenAI',
};

async function main() {
  const data = await readSitesFile();
  const seedCsv = await readFile(new URL('../data/seed.csv', import.meta.url), 'utf8');
  const seedRows = parseSeedCsv(seedCsv);
  const seedProfiles = new Map<string, string>();

  for (const row of seedRows) {
    if (!row.sampleProfile) continue;
    seedProfiles.set(entryKey(row.category, row.name, row.url), row.sampleProfile);
  }

  const filled: Array<{ name: string; sampleProfile: string }> = [];

  for (const site of data.sites) {
    if (site.sampleProfile) continue;

    const key = entryKey(site.category, site.name, site.url);
    const directSeed = seedProfiles.get(key);
    const manual = MANUAL_SAMPLE_PROFILES[key];
    const legacyLinkedInSeed = site.url === 'https://linkedin.com'
      ? seedProfiles.get(entryKey('business-directories', 'LinkedIn', 'https://linkedin.com'))
      : undefined;

    const sampleProfile = manual || directSeed || legacyLinkedInSeed;
    if (!sampleProfile) continue;

    site.sampleProfile = sampleProfile;
    filled.push({ name: site.name, sampleProfile });
  }

  await writeSitesFile(data);

  console.log(JSON.stringify({
    total: data.sites.length,
    filled: filled.length,
    details: filled
  }, null, 2));
}

await main();
