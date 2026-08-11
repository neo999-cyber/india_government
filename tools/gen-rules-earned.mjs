#!/usr/bin/env node
/**
 * gen-rules-earned — split CLAUDE.md's rule blocks into a keyed evidence file, VERBATIM.
 *
 * WHY THIS IS GENERATED AND NOT HAND-WRITTEN. `docs/rules-earned.md` exists so that a rule can be
 * traced to what produced it after the evidence stops being resident in every turn. If the evidence
 * were retyped it would drift from what was actually written when the rule was earned, and a
 * paraphrase of the reason is exactly what lets a future pass rationalise the rule away — which has
 * nearly happened twice. So the reasons are COPIED, byte for byte, and this script asserts it.
 *
 * THE KEY IS STABLE BY CONTENT, NOT BY POSITION. A block's key is derived from its own lead text,
 * so inserting a rule does not renumber every key after it and invalidate every pointer in
 * CLAUDE.md. Position-based keys were tried first and rejected for that reason.
 *
 * Run: `node tools/gen-rules-earned.mjs <source.md>` — the source is passed explicitly because after
 * the split CLAUDE.md is the DIGEST, not the origin, and regenerating from the digest would erase
 * the evidence. The one-time source is the pre-split file, recovered from git.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const source = process.argv[2];
if (!source) { console.error('usage: gen-rules-earned.mjs <source.md>'); process.exit(2); }
const src = readFileSync(source, 'utf8');

const paras = src.split(/\n\n/);
const opens = (p) => /^#{1,3} /.test(p) || /^\*\*/.test(p) || /^\d+[a-z]?\. \*\*/.test(p) || /^> /.test(p) || /^\| /.test(p) || /^- \*\*/.test(p);
const blocks = [];
let section = '(preamble)';
for (const p of paras) {
  if (/^#{1,3} /.test(p)) section = p.replace(/^#+\s*/, '').trim();
  if (!blocks.length || opens(p)) blocks.push({ section, paras: [p] });
  else blocks[blocks.length - 1].paras.push(p);
}

const key = (b) => {
  const flat = b.paras[0].replace(/\s+/g, ' ').replace(/[*`#>|]/g, '').trim();
  return 'R-' + createHash('sha1').update(flat.slice(0, 160)).digest('hex').slice(0, 6);
};

const seen = new Set();
const out = [];
out.push('# Rules earned — the evidence behind CLAUDE.md');
out.push('');
out.push('**This file is not read at session start.** It is the other half of CLAUDE.md: every rule in');
out.push('that file was earned by a defect, a measurement or an operator ruling, and this is where that');
out.push('evidence lives now. CLAUDE.md keeps the imperative and one line of why, and points here by key.');
out.push('');
out.push('**Nothing here is a paraphrase.** Every block below is the text as it stood in CLAUDE.md');
out.push('immediately before the split of 2026-08-11, copied byte for byte and asserted by');
out.push('`tools/gen-rules-earned.mjs`. **A rule with no recorded reason gets rationalised away by a');
out.push('future pass — that has nearly happened twice — so the reasons must remain findable, and');
out.push('findable means verbatim rather than remembered.**');
out.push('');
out.push('Keys are derived from a block\'s own opening text, so inserting a rule does not renumber the');
out.push('rest. To trace a rule: take its `[R-xxxxxx]` key from CLAUDE.md and search it here.');
out.push('');
out.push('---');
out.push('');

let lastSection = null;
for (const b of blocks) {
  let k = key(b);
  while (seen.has(k)) k += 'a';
  seen.add(k);
  b.key = k;
  if (b.section !== lastSection) { out.push(`## ${b.section}`); out.push(''); lastSection = b.section; }
  out.push(`### [${k}]`);
  out.push('');
  out.push(b.paras.join('\n\n'));
  out.push('');
}

const text = out.join('\n');
// ASSERT BEFORE WRITE: every source block must appear in the output verbatim.
let missing = 0;
for (const b of blocks) if (!text.includes(b.paras.join('\n\n'))) missing++;
if (missing) { console.error(`gen-rules-earned FAILED — ${missing} block(s) did not round-trip verbatim`); process.exit(1); }

writeFileSync('docs/rules-earned.md', text);
writeFileSync('docs/rules-earned.keys.json', JSON.stringify(
  blocks.map((b) => ({ key: b.key, section: b.section, lead: b.paras[0].replace(/\s+/g, ' ').slice(0, 120), bytes: b.paras.join('\n\n').length })), null, 1) + '\n');
console.log(`gen-rules-earned OK — ${blocks.length} block(s), ${text.length} B written, all verbatim`);
