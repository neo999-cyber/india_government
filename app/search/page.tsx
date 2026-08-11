import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger, provenance, series } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, formatDateRange } from '@/lib/format';
import { CaveatRow, RecordMarks } from '@/components/marks';
import { ListingFacets } from '@/components/ListingFacets';

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
 * **THE COST IS PAGE WEIGHT AND IT IS STATED RATHER THAN HIDDEN.** 679 records with every
 * declaration in full is a large page, and it is cut everywhere it need not be: **`data-text`
 * matches IDS AND TITLES ONLY.** It first carried every summary, note and whatChanged — a full
 * second copy of prose the page never renders, sitting in an attribute — which was a large share
 * of the transfer for no reading benefit. A reader searching the body of a summary is searching
 * the corpus, which is what `/data/v1/` is published for. **Measured: 1,799 KB raw / 416 KB gzipped
 * before, 1,153 / 178 after** — on a par with the ledger index at 172.
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
    marks?: React.ReactNode;
    caveat?: React.ReactNode;
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
      marks: <RecordMarks record={s} deferCaveat />,
      caveat: <CaveatRow record={s} colSpan={4} />,
    })),
    ...ledger.map((l) => ({
      id: l.id,
      layer: 'ledger' as const,
      href: `/ledger/${l.id}/`,
      title: l.title,
      meta: `${formatDateRange(l.date, l.dateEnd)} · ${ASSESSMENT_LABELS[l.assessment]}`,
      domains: l.domains,
      text: `${l.id} ${l.title}`,
      marks: <RecordMarks record={l} deferCaveat />,
      caveat: <CaveatRow record={l} colSpan={4} />,
    })),
    ...provenance.map((p) => ({
      id: p.id,
      layer: 'provenance' as const,
      href: `/provenance/${p.id}/`,
      title: p.title,
      meta: `${p.when} · ${p.directionOfBias}`,
      domains: p.affectsDomains.filter((x): x is Exclude<typeof x, 'all'> => x !== 'all'),
      text: `${p.id} ${p.title}`,
    })),
  ];

  const opts = <T extends string>(values: T[], label: (v: T) => string) =>
    [...new Set(values)].sort().map((v) => ({ value: v, label: label(v) }));

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / find
      </p>
      <h1 className="page-lead">Find a record</h1>
      <p className="lede">
        All {rows.length} records — {series.length} series, {ledger.length} ledger entries and{' '}
        {provenance.length} measurement disputes — on one page. Every one is already here; the
        controls hide rows rather than fetching them, so the list works with scripting off and every
        declaration a record carries is on the page whether or not it is showing.
      </p>

      <ListingFacets
        target="search-table"
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

      <div className="table-wrap">
        <table id="search-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Record</th>
              <th>Layer</th>
              <th>Detail</th>
            </tr>
          </thead>
          {rows.map((r) => (
            <tbody
              key={`${r.layer}-${r.id}`}
              data-row
              data-f-layer={r.layer}
              data-f-domain={r.domains.join('|')}
              data-text={r.text}
            >
              <tr>
                <td className="mono">
                  <Link href={r.href}>{r.id}</Link>
                </td>
                <td>
                  <Link href={r.href}>{r.title}</Link>
                  {r.marks}
                </td>
                <td className="t-note">{r.layer}</td>
                <td className="t-note">{r.meta}</td>
              </tr>
              {r.caveat}
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
