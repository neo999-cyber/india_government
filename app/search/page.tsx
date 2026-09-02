import Link from '@/components/Link';
import { ContentsRail } from '@/components/ContentsRail';
import { ContestedSection } from '@/components/ContestedSection';
import { ExposureSection } from '@/components/ExposureSection';
import type { Metadata } from 'next';
import { ledger, provenance, series } from '@/lib/data';
import { ASSESSMENT_LABELS, DIRECTION_OF_BIAS_LABELS, DOMAIN_LABELS, formatDateRange } from '@/lib/format';
import { CaveatFlag, RecordMarks } from '@/components/marks';
import { SERIES_FINDINGS } from '@/lib/series-copy';
import { ListingFacets } from '@/components/ListingFacets';
import { SearchSort } from '@/components/SearchSort';
import { SectionNav } from '@/components/SectionNav';

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
 * **RE-MEASURED 2026-08-19 AFTER THE ACCESSIBILITY/PERFORMANCE PASS.** The complete page moved
 * from 2,027,004 bytes raw / 325,148 gzipped to 1,769,903 / 262,878: 12.7% less raw and 19.2% less
 * compressed. The cut removes descriptive excerpts, which duplicated prose available on each
 * record page, and replaces three inline CSS sort ranks with one date. Sorting now moves the DOM,
 * so visual, keyboard and screen-reader order agree. Caveats and declared absences remain in full;
 * they are the page's irreducible weight under rule 3a.
 *
 * The alternative — a client index of titles alone — would be smaller again and would drop every
 * caveat and absence from a surface that lists records, which is the trade rule 4b exists to refuse.
 */
/**
 * ============================ THE WEIGHT OF THIS PAGE, MEASURED ===============================
 *
 * 2,472 KB of HTML after `/contested/` and `/exposure/` folded in on 2026-09-01, and the surface
 * audit named it as the page to watch. Measured rather than assumed, the same day:
 *
 *   on the wire      190 KB brotli · 436 KB gzip   (Vercel serves brotli)
 *   on a phone       519 ms to DOMContentLoaded at 4x CPU throttle, 375px, cold, median of three
 *   in the DOM       10,866 nodes
 *
 * That is half a second on a slow device, and the transfer is the size of one large image. The raw
 * figure is DOM weight, not cost to a reader, and nothing moves on its account. **If a future
 * measurement disagrees, it is the measurement that governs, not the 2.4 MB.**
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
    /** THE OUTCOME TRACK. Series only — a ledger record has no authored finding, and the
        outcome-track decision for that layer is recorded in the forty-ninth log entry. */
    outcome?: string;
    /** A sortable date retained once per card; the server document is already newest-first. */
    sortDate: string;
    marks?: React.ReactNode;
    /** The caveat's own text. Rendered IN FULL on the card — see the note at the card markup. */
    caveatText?: string;
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
      outcome: SERIES_FINDINGS[s.id]?.finding,
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
      sortDate: String(p.when),
    })),
  ].sort((a, b) => b.sortDate.localeCompare(a.sortDate) || a.title.localeCompare(b.title));

  const LAYER_LABEL: Record<Row['layer'], string> = {
    series: 'series',
    ledger: 'ledger record',
    provenance: 'measurement dispute',
  };

  const opts = <T extends string>(values: T[], label: (v: T) => string) =>
    [...new Set(values)].sort().map((v) => ({ value: v, label: label(v) }));

  return (
    <>
      <p className="crumb">
        <Link prefetch={false} href="/">instrument</Link> / find a record
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
      {/* THE THREE LAYERS, NAMED HERE BECAUSE THEIR OWN INDEXES ARE GONE.
          `/search/?layer=ledger`, `/search/?layer=series` and `/search/?layer=provenance` were merged into this page on 2026-09-01: each
          listed a subset this page already lists in full, reachable by one filter. What they held
          that a filter does not is the sentence each used to open with, and those are here. */}
      <dl className="layer-key">
        <div>
          <dt>
            <Link href="/search/?layer=series">Series</Link>
          </dt>
          <dd>
            Every series names its calendar and never mixes calendars internally; every break is
            carried as a seam rather than smoothed away. Their spans are drawn together on{' '}
            <Link href="/seams/#spans">the span strip</Link>.
          </dd>
        </div>
        <div>
          <dt>
            <Link href="/search/?layer=ledger">Reforms, events and episodes</Link>
          </dt>
          <dd>
            Each carries its own assessment, its sources with tiers, and &mdash; where scored &mdash;
            the strongest good-faith case on both sides.
          </dd>
        </div>
        <div>
          <dt>
            <Link href="/search/?layer=provenance">Measurement disputes</Link>
          </dt>
          <dd>
            First-class citizens of the instrument: where a dispute exists it travels with every
            number it touches rather than sitting in a footnote.
          </dd>
        </div>
      </dl>
      <SectionNav section="records" />
      <ContentsRail items={[
        { id: 'search-cards', label: 'Every record' },
        { id: 'contested', label: 'Contested' },
        { id: 'exposure', label: 'Exposure' },
      ]} />

      {/* THE MOBILE FILTER DRAWER. `open` in the markup, so with scripting off — and above 640px,
          where CSS hides the summary — the facets are simply present. A drawer that starts closed
          would put the controls behind a tap that does not work without JavaScript. */}
      <details className="facet-drawer" open>
        <summary>Filters</summary>
      <ListingFacets
        target="search-cards"
        noun="records"
        initialTotal={rows.length}
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

      <SearchSort />

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
      <div className="scards" id="search-cards">
        {rows.map((r) => (
          <article
            key={`${r.layer}-${r.id}`}
            className="scard"
            data-row
            data-f-layer={r.layer}
            data-f-domain={r.domains.join('|')}
            data-text={r.text}
            data-sort-date={r.sortDate}
          >
            <h2 className="scard-title">
              <Link prefetch={false} href={r.href}>{r.title}</Link>
            </h2>
            <p className="scard-chips">
              <span className="tag">{LAYER_LABEL[r.layer]}</span>
              {r.domains.map((d) => (
                <span key={d} className="tag">
                  {DOMAIN_LABELS[d as keyof typeof DOMAIN_LABELS] ?? d}
                </span>
              ))}
              <span className="scard-id mono">
                {r.id}
              </span>
            </p>
            {r.marks}
            {/* THE SHARED RENDERER, not a hand-rolled one. The first cut of this card wrote its
                own `<p className="caveat-inline">Caveat: …</p>` and `listing-marks` failed 232 —
                the same ad-hoc-normaliser defect found in `PeerSlope`, which had also hand-rolled a
                caveat. One renderer, or the two drift and only the gate that happens to bind the
                shape notices. */}
            {/* THE TWO TRACKS ON A CARD. Same order as the tables: what the measured result
                did, then what is known about the measurement. Nothing is emitted when either
                is absent — see `OutcomeRow` for why neither empty case takes a placeholder. */}
            {r.outcome ? (
              <p className="scard-outcome">
                <span className="outcome-label">Outcome</span> {r.outcome}
              </p>
            ) : null}
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




      {/* ============ TWO READINGS OF THE LEDGER, FOLDED IN ON 2026-09-01 ==================
          `/search/#contested` (68 records) and `/search/#exposure` (76) were both already 100% present on this
          page: every id they name is in the grid above. What they are NOT is a filter — they carry
          35,047 and 6,451 words arguing what a contested verdict and an exogenous defence MEAN, and
          an argument has nowhere to live in a facet.

          **THIS WAS THE WEAKEST OF THE FIFTEEN AND THE AUDIT SAID SO BEFORE IT WAS DONE.** It is
          done because the operator read that and asked for all fifteen. The cost is weight on the
          site's heaviest page, measured and stated in the commit rather than discovered later. Both
          keep their prose, their groupings and their own record lists. */}
      <ContestedSection />
      <ExposureSection />
    </>
  );
}
