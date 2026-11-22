import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import YAML from 'yaml';
import type { SiteEntry } from './lib.js';

test('weekly verification updates only evidenced page measurements', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'verify-all-'));
  try {
    const sites: SiteEntry[] = ['blocked', 'empty', 'missing', 'mixed', 'offline', 'public', 'rate-limited', 'unlinked'].map((name) => ({
      name, url: `https://${name}.example.org/`, category: 'example',
      linkType: 'dofollow', effort: 'low', profileLinkDofollow: true,
      indexable: true, verified: false, lastVerified: '2026-01-01'
    }));
    const sitesPath = join(directory, 'data/sites/example.yaml');
    await mkdir(join(directory, 'data/sites'), { recursive: true });
    await writeFile(join(directory, 'data/categories.yaml'), '- id: example\n  name: Example\n  description: Example sites\n');
    await writeFile(sitesPath, YAML.stringify(sites));

    const mockFetch = `
      let now = Date.now();
      Date.now = () => now += 1000;
      globalThis.fetch = async (input, init) => {
        const url = new URL(input);
        if (url.pathname === '/robots.txt') return new Response(null, { status: 404 });
        if (url.hostname === 'tranco-list.eu') return Response.json({ ranks: [] });
        if (url.hostname === 'blocked.example.org') return new Response(null, { status: 403 });
        if (url.hostname === 'rate-limited.example.org') return new Response(null, { status: 429 });
        if (url.hostname === 'empty.example.org') return new Response(null, { status: 204 });
        if (url.hostname === 'missing.example.org') return new Response(null, { status: 410 });
        if (url.hostname === 'offline.example.org') throw new TypeError('Mock transport failure');
        if (init?.method === 'HEAD') return new Response(null, { status: 403 });
        const headers = { 'content-type': 'text/html' };
        if (url.hostname === 'public.example.org') {
          headers['x-robots-tag'] = 'noindex';
          return new Response('<a rel="nofollow" href="https://other.example.org">Example</a>', { headers });
        }
        if (url.hostname === 'mixed.example.org') {
          return new Response('<a rel="nofollow" href="https://one.example.org">One</a><a href="https://two.example.org">Two</a>', { headers });
        }
        if (url.hostname === 'unlinked.example.org') return new Response('<p>Profile</p>', { headers });
        throw new Error('Unexpected request: ' + url);
      };
    `;
    const script = new URL('./verify-all.ts', import.meta.url).href;
    const result = spawnSync(process.execPath, [
      '--import', import.meta.resolve('tsx'), '--input-type=module', '--eval',
      `${mockFetch}\nawait import(${JSON.stringify(script)});`
    ], { cwd: directory, encoding: 'utf8', env: { ...process.env, OPENPAGERANK_API_KEY: '' } });
    assert.equal(result.status, 0, result.stderr);

    const updated = YAML.parse(await readFile(sitesPath, 'utf8')) as SiteEntry[];
    function evidence(site: SiteEntry) {
      const { indexable, linkType, effort, profileLinkDofollow, verified, lastVerified } = site;
      return { indexable, linkType, effort, profileLinkDofollow, verified, lastVerified };
    }
    const today = new Date().toISOString().slice(0, 10);
    assert.deepEqual(updated.map(evidence), [
      evidence(sites[0]),
      evidence(sites[1]),
      { ...evidence(sites[2]), indexable: false },
      { ...evidence(sites[3]), linkType: 'mixed', effort: 'medium', verified: true, lastVerified: today },
      evidence(sites[4]),
      { indexable: false, linkType: 'nofollow', effort: 'hard', profileLinkDofollow: false, verified: true, lastVerified: today },
      evidence(sites[6]),
      { ...evidence(sites[7]), verified: true, lastVerified: today }
    ]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
