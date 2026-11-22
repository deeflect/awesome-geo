import { readFile } from 'node:fs/promises';

const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
const markdown = readme.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1\s*$/gm, '');
const anchors = new Set<string>();

// shortcut: Covers plain ATX headings and inline fragment links in this README. Use a GFM parser if the template uses richer markup for either.
for (const [, heading] of markdown.matchAll(/^#{1,6} (.+)$/gm)) {
  const base = heading.toLowerCase().replace(/ /g, '-').replace(/[^\p{L}\p{M}\p{N}_-]/gu, '');
  let anchor = base;
  for (let suffix = 1; anchors.has(anchor); suffix++) anchor = `${base}-${suffix}`;
  anchors.add(anchor);
}

const broken = [...markdown.matchAll(/\]\(#([^\s)]+)\)/g)].filter(([, anchor]) => !anchors.has(anchor));
if (broken.length) throw new Error(`Broken README links: ${broken.map(([, anchor]) => `#${anchor}`).join(', ')}`);
console.log('README section links are valid');
