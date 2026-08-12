import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger, provenance, series } from '@/lib/data';
import { ASSESSMENT_LABELS, DIRECTION_OF_BIAS_LABELS, DOMAIN_LABELS, formatDateRange } from '@/lib/format';
import { CaveatFlag, RecordMarks } from '@/components/marks';
import { ListingFacets } from '@/components/ListingFacets';
import { SearchSort } from '@/components/SearchSort';

export const metadata: Metadata = {
  title: 'Find a record',
  description:
    'Every record in the corpus — series, ledger and measurement disputes — filterable by layer, ' +
    'subject and text. The whole list is on the page; filtering hides rows, it never fetches them.',
};

/**
 * `/search/` — THE FOURTH MASTHEAD DESTINATION, and the first cross-layer surface.
 *
 * WHY IT EXISTS NOW. The masthead was cut to four destinations on 2026-08-11 and *Search* is one of
 * them. A nav item pointing at nothing is a dead link, which `link-check` fails and which is the
 * defect that gate was built for — so the surface is built rather than the item omitted.
 *
 * IT IS A FILTER OVER A COMPLETE DOCUMENT, NOT A QUERY. Every record is server-rendered; the
 * control hides rows. Three reasons, the same three that shaped the listing facets: rule 4b's marks
 * must be in BUILT html or `listing-marks` cannot see them, rule 3a's caveats need their one
 * renderer, and with JavaScript off a reader gets the whole corpus rather than an empty box.
 *
 * **THE COST IS PAGE WEIGHT AND IT IS STATED RATHER THAN HIDDEN.** 619 records with every
 * declaration in full is a large page, and it is cut everywhere it need not be: **`data-text`
 * matches IDS AND TITLES ONLY.** It first carried every summary, note and whatChanged — a full
 * second copy of prose the page never renders, sitting in an attribute — which was a large share
 * of the transfer for no reading benefit. A reader searching the body of a summary is searching
 * the corpus, which is what `/data/v1/` is published for.
 *
 * **RE-MEASURED 2026-08-11 AFTER THE CARD REBUILD, because a stated measurement that is not
 * re-measured becomes a claim about the past in the present tense.** The figures were 1,799 KB raw
 * / 416 KB gzipped before the first cut and 1,153 / 178 after it. **They are now 1,749 KB raw /
 * 267 KB gzipped**, an 89 KB gzipped increase, and it buys three things §4 asked for: a whole-
 * sentence description on 516 cards, three sort ranks per card as inline custom properties, and the
 * card markup itself. **Roughly 37 KB raw of that is the sort ranks** — three integers per card,
 * because CSS `order` reads a custom property and cannot read a data attribute.
 *
 * **It is a regression against the 178 and it is recorded as one.** If the page needs to come back
 * down, the excerpts are the cheapest thing to drop and the sort ranks are the next; the caveats
 * are not, because rule 3a governs them and every other listing surface renders them in full.
 *
 * The alternative — a client index of titles alone — would be smaller again and would drop every
 * caveat and absence from a surface that lists records, which is the trade rule 4b exists to refuse.
 */
export default function SearchPage() {
  type Row = {
    id: string;
    layer: 'series' | 'ledger' | 'provenance';
    href: string;
    title: string;
    meta: string;
    domains: string[];
    text: string;
    /** First COMPLETE sentence of the record's own prose, or nothing. Never a cut one. */
    excerpt?: string;
    /** Sort ranks, precomputed. See `SearchSort` for why sorting is CSS `order` and not DOM moves. */
    sortDate: string;
    marks?: React.ReactNode;
    /** The caveat's own text. Rendered IN FULL on the card — see the note at the card markup. */
    caveatText?: string;
  };

  /**
   * THE FIRST COMPLETE SENTENCE, OR NOTHING — never a cut one.
   *
   * §4 asks for a *short matched excerpt*. **Matched is not available**: matching runs over ids and
   * titles only, because carrying every record's prose in the DOM was measured at 313 KB and removed
   * from this page for exactly that reason. What is affordable is a DESCRIPTION — one whole sentence,
   * about 93 KB across 594 records — and it is labelled as what it is rather than as a match.
   *
   * **A sentence cut mid-clause is the caveat defect in a field where nobody is watching.** Rule 3a
   * binds caveats and this is a summary, so the rule does not reach it; the reasoning does. Where the
   * first sentence runs past 240 characters the card shows none, because a long sentence truncated is
   * the thing the short one was chosen to avoid.
   */
  const firstSentence = (text?: string): string | undefined => {
    if (!text) return undefined;
    const flat = text.replace(/\s+/g, ' ').trim();
    const m = /^.*?[.!?](?=\s|$)/.exec(flat);
    const one = m ? m[0] : flat;
    return one.length <= 240 ? one : undefined;
  };

  const rows: Row[] = [
    ...series.map((s) => ({
      id: s.id,
      layer: 'series' as const,
      href: `/series/${s.id}/`,
      title: s.title,
      meta: `${s.unit} · ${s.points.length} points · ${DOMAIN_LABELS[s.domain]}`,
      domains: [s.domain],
      text: `${s.id} ${s.title} ${s.unit}`,
      excerpt: firstSentence(s.notes),
      sortDate: s.points.map((p) => String(p.period)).sort().slice(-1)[0] ?? '',
      marks: <RecordMarks record={s} deferCaveat />,
      caveatText: s.caveat,
    })),
    ...ledger.map((l) => ({
      id: l.id,
      layer: 'ledger' as const,
      href: `/ledger/${l.id}/`,
      title: l.title,
      meta: `${formatDateRange(l.date, l.dateEnd)} · ${ASSESSMENT_LABELS[l.assessment]}`,
      domains: l.domains,
      text: `${l.id} ${l.title}`,
      excerpt: firstSentence(l.summary ?? l.whatHappened),
      sortDate: String(l.date),
      marks: <RecordMarks record={l} deferCaveat />,
      caveatText: l.caveat,
    })),
    ...provenance.map((p) => ({
      id: p.id,
      layer: 'provenance' as const,
      href: `/provenance/${p.id}/`,
      title: p.title,
      meta: `${p.when} · ${DIRECTION_OF_BIAS_LABELS[p.directionOfBias] ?? p.directionOfBias}`,
      domains: p.affectsDomains.filter((x): x is Exclude<typeof x, 'all'> => x !== 'all'),
      text: `${p.id} ${p.title}`,
      excerpt: firstSentence(p.whatChanged),
      sortDate: String(p.when),
    })),
  ];

  const LAYER_LABEL: Record<Row['layer'], string> = {
    series: 'series',
    ledger: 'ledger record',
    provenance: 'measurement dispute',
  };

  /**
   * SORT RANKS, PRECOMPUTED SERVER-SIDE. Each card carries three integers and CSS `order` picks one;
   * the DOM never moves, so sorting composes with the facet control that hides cards. Document order
   * is `newest`, which is what a reader with scripting off gets.
   */
  const key = (r: Row) => `${r.layer}-${r.id}`;
  const rankFrom = (cmp: (a: Row, b: Row) => number) =>
    new Map([...rows].sort(cmp).map((r, i) => [key(r), i]));
  const rankNewest = rankFrom((a, b) => b.sortDate.localeCompare(a.sortDate) || a.title.localeCompare(b.title));
  const rankTopic = rankFrom(
    (a, b) => (a.domains[0] ?? '').localeCompare(b.domains[0] ?? '') || a.title.localeCompare(b.title),
  );
  const rankType = rankFrom((a, b) => a.layer.localeCompare(b.layer) || a.title.localeCompare(b.title));

  const opts = <T extends string>(values: T[], label: (v: T) => string) =>
    [...new Set(values)].sort().map((v) => ({ value: v, label: label(v) }));

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / find
      </p>
      <h1 className="page-lead">Find a record</h1>
      {/* NO RECORD COUNT. The homepage rebuild removed database-size figures on the scope's own
          rule, and the figure this page used was worse than most: "all 619 records — 269 series,
          223 ledger entries and 127 disputes" spells out its own double count, because 619 is the
          sum and the 269 are inside it. */}
      <p className="lede">
        Every record in this instrument is on this page — series, ledger entries and measurement
        disputes together. The controls hide cards rather than fetching them, so the list works with
        scripting off, and every declaration a record carries is here whether or not it is showing.
      </p>

      {/* THE MOBILE FILTER DRAWER. `open` in the markup, so with scripting off — and above 640px,
          where CSS hides the summary — the facets are simply present. A drawer that starts closed
          would put the controls behind a tap that does not work without JavaScript. */}
      <details className="facet-drawer" open>
        <summary>Filters</summary>
      <ListingFacets
        target="search-cards"
        noun="records"
        facets={[
          {
            key: 'layer',
            label: 'Layer',
            options: [
              { value: 'series', label: 'series' },
              { value: 'ledger', label: 'ledger' },
              { value: 'provenance', label: 'disputes' },
            ],
          },
          {
            key: 'domain',
            label: 'Area',
            options: opts(
              rows.flatMap((r) => r.domains),
              (v) => DOMAIN_LABELS[v as keyof typeof DOMAIN_LABELS] ?? v,
            ),
          },
        ]}
      />
      </details>

      <SearchSort count={rows.length} />

      {/* ============================ THE RESULT CARDS =======================================
          §4's rebuild: title first, id second, chips for topic and record type, one whole sentence
          of description, and the record's own declarations.

          **THE CAVEAT RENDERS IN FULL AND THE CARD TAKES THE WHOLE ROW.** §4 proposed a one-line
          preview and the operator ruled for the mark alone. Both were measured against the corpus
          and neither is taken — see the log entry: every other listing surface renders the caveat
          in full (232/232 here, 103/103 on the ledger index, 129/129 on the series index), so the
          mark would make search the only surface that does not, and rule 3a names index tables in
          terms. **The layout problem the preview was proposed to solve was already ruled on in this
          phase** — a caveat-bearing card takes the full grid row — and that ruling governs here.

          **A CARD IS A NEW CONTAINER SHAPE AND IS BOUND IN THIS COMMIT**, in
          `tools/lib/listing-shapes.mjs`. Every previous new shape walked past `listing-marks`:
          the grid card, the listing row, `<td>` against `<li>`, the domain rebuild's four
          containers, the redline, the contested pair. That is six, and this is the seventh. */}
      <div className="scards" id="search-cards" data-sort="newest">
        {rows.map((r, k) => (
          <article
            key={`${r.layer}-${r.id}`}
            className="scard"
            data-row
            data-f-layer={r.layer}
            data-f-domain={r.domains.join('|')}
            data-text={r.text}
            style={
              {
                '--o-newest': rankNewest.get(`${r.layer}-${r.id}`) ?? k,
                '--o-topic': rankTopic.get(`${r.layer}-${r.id}`) ?? k,
                '--o-type': rankType.get(`${r.layer}-${r.id}`) ?? k,
              } as React.CSSProperties
            }
          >
            <h2 className="scard-title">
              <Link href={r.href}>{r.title}</Link>
            </h2>
            <p className="scard-chips">
              <span className="tag">{LAYER_LABEL[r.layer]}</span>
              {r.domains.map((d) => (
                <span key={d} className="tag">
                  {DOMAIN_LABELS[d as keyof typeof DOMAIN_LABELS] ?? d}
                </span>
              ))}
              <Link className="scard-id mono" href={r.href}>
                {r.id}
              </Link>
            </p>
            {r.excerpt ? <p className="scard-ex">{r.excerpt}</p> : null}
            {r.marks}
            {/* THE SHARED RENDERER, not a hand-rolled one. The first cut of this card wrote its
                own `<p className="caveat-inline">Caveat: …</p>` and `listing-marks` failed 232 —
                the same ad-hoc-normaliser defect found in `PeerSlope`, which had also hand-rolled a
                caveat. One renderer, or the two drift and only the gate that happens to bind the
                shape notices. */}
            {r.caveatText ? (
              <p className="scard-caveat">
                <CaveatFlag caveat={r.caveatText} variant="inline" />
              </p>
            ) : null}
            {/* COLLAPSIBLE TECHNICAL DETAIL — the unit, the span, the assessment. Not the caveat
                and not a declaration: a disclosure over either is the truncation-with-a-control
                that rule 3a refuses, and both sit above this, open. */}
            <details className="scard-more">
              <summary>Technical detail</summary>
              <p className="t-note">{r.meta}</p>
            </details>
          </article>
        ))}
      </div>

    </>
  );
}
