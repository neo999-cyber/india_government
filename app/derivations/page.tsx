import Link from 'next/link';
import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Fragment, type ReactNode } from 'react';

export const metadata: Metadata = { title: 'Derivations' };

/**
 * WHY THIS PAGE EXISTS. `docs/derivations.md` recomputes, from public `/data`, the counts that
 * L-0218, L-0219 and L-0220 assert about the corpus itself. It was written so those records could
 * cite a derivation instead of the repository — and then it sat in `docs/`, which nothing on the
 * site links to and which no reader can reach, because the repository is private. Citing it in
 * that state would have swapped one unreachable source for another. The operator's principle is
 * that no record stands on a source that is not credibly independent of what it establishes; a
 * derivation a reader can re-run is the closest a self-audit gets, and it only counts once the
 * reader can actually open it.
 *
 * The markdown is READ AT BUILD TIME FROM THE GENERATED FILE, never retyped. `npm run derivations`
 * regenerates that file from `/data` and this page renders whatever it says — so the page cannot
 * drift from the derivation, which is the same discipline `/method` follows by counting its own
 * figures rather than carrying typed ones.
 *
 * The renderer below is deliberately small and covers exactly the constructs the generator emits
 * (headings, paragraphs, fenced code, GFM tables, unordered lists, bold, inline code, links).
 * This repository carries no dependency beyond next and react, and one page is not a reason to
 * take on a markdown library; if the generator ever emits a construct this does not handle it
 * renders as plain text rather than as markup, which is visible rather than silent.
 */
const SRC = readFileSync(join(process.cwd(), 'docs', 'derivations.md'), 'utf8');

/** `**bold**`, `` `code` `` and `[text](url)` — applied in that order, non-nesting. */
function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${i++}`;
    if (m[1] !== undefined) out.push(<strong key={k}>{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<code key={k}>{m[2]}</code>);
    else
      out.push(
        <a key={k} href={m[4]}>
          {m[3]}
        </a>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function render(md: string): ReactNode[] {
  const lines = md.split('\n');
  const out: ReactNode[] = [];
  let i = 0;
  let n = 0;
  const key = () => `b${n++}`;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith('```')) body.push(lines[i++]);
      i += 1;
      out.push(
        <pre key={key()}>
          <code>{body.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const k = key();
      const text = inline(h[2], k);
      if (h[1].length === 1) out.push(<h1 key={k}>{text}</h1>);
      else if (h[1].length === 2) out.push(<h2 key={k}>{text}</h2>);
      else out.push(<h3 key={k}>{text}</h3>);
      i += 1;
      continue;
    }

    // GFM table: a header row, an alignment row, then body rows.
    if (line.startsWith('|') && i + 1 < lines.length && /^\|[\s:|-]+\|$/.test(lines[i + 1])) {
      const cells = (r: string) =>
        r
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim());
      const head = cells(line);
      const align = cells(lines[i + 1]).map((a) => (a.endsWith(':') ? 'num' : undefined));
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(cells(lines[i++]));
      const k = key();
      out.push(
        <div className="table-wrap" key={k}>
          <table>
            <thead>
              <tr>
                {head.map((c, x) => (
                  <th key={x} className={align[x]}>
                    {inline(c, `${k}h${x}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, y) => (
                <tr key={y}>
                  {r.map((c, x) => (
                    <td key={x} className={align[x]}>
                      {inline(c, `${k}c${y}-${x}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, ''));
      const k = key();
      out.push(
        <ul key={k}>
          {items.map((it, x) => (
            <li key={x}>{inline(it, `${k}i${x}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // A paragraph, and THE LOOP MUST ALWAYS ADVANCE. The first draft consumed lines only while
    // they did not start with a block character, so a line starting with one that had matched no
    // block branch above — a `|` row with no alignment row under it, a stray backtick — left the
    // paragraph empty and `i` where it was. That is an infinite loop, and it presented as the
    // static export dying on an out-of-memory rather than as anything resembling a parse error.
    const para: string[] = [lines[i++]];
    while (i < lines.length && lines[i].trim() && !/^[-*#|`]/.test(lines[i])) para.push(lines[i++]);
    const k = key();
    out.push(<p key={k}>{inline(para.join(' '), k)}</p>);
  }
  return out;
}

export default function DerivationsPage() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / derivations
      </p>
      {render(SRC).map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
      <p className="prose-note">
        This page is generated from <code>/data</code> by <code>tools/gen-derivations.mjs</code> and
        rendered from the generated file, so it cannot state a figure the derivation does not
        produce. It exists because three records — L-0218, L-0219 and L-0220 — asserted counts about
        this corpus and cited the corpus as their evidence, at a repository URL that returned 404 to
        every reader. On 6 August 2026 they left the ledger: a source is not independent of what it
        establishes when it <em>is</em> what it establishes, so this is method rather than a scored
        finding. Section 3 names what no derivation over <code>/data</code> can settle and section 5
        names what a derivation cannot carry that a record could; neither is presented as resolved.
        The <Link href="/method/">method</Link> page states the standard the three were removed
        under.
      </p>
    </>
  );
}
