import Link from 'next/link';
import { getSeries, ledger, series } from '@/lib/data';
import { RecordMarks } from '@/components/marks';
import { RecordConstellation } from '@/components/RecordConstellation';
import { AREAS } from '@/lib/constellation';
import { RecordLandscape } from '@/components/RecordLandscape';
import { archiveYears, landscapeSubjects } from '@/lib/landscape';
import { YEARS } from '@/lib/years';

const WAY_RECORDS = [
  'res-capacity-share',
  'coal-production',
  'schools-above-rte-ptr-primary-dise',
] as const;


export default function HomePage() {
  const wayRecords = WAY_RECORDS.map((id) => {
    const record = getSeries(id);
    if (!record) throw new Error(`homepage: missing required series ${id}`);
    return record;
  });

  /* Density is derived from the archive; location inside the outline remains deliberately
     conceptual. A multi-domain ledger record belongs to every area it declares. */
  const areaCounts = Object.fromEntries(
    AREAS.map((area) => [
      area.id,
      area.domains.reduce(
        (count, domain) =>
          count +
          series.filter((record) => record.domain === domain).length +
          ledger.filter((record) => record.domains.includes(domain)).length,
        0,
      ),
    ]),
  );

  return (
    <>
      {/* THE LANDSCAPE IS THE DOOR — operator decision 2026-08-27, option D of four mocked.
          **WITHDRAWN: the four `home-paths` cards.** They handed a first-time reader a TOOL each —
          a timeline, a filter, a story, a search box — and a reader who does not yet know what the
          archive contains cannot choose between tools. Fourteen named subjects is what they wanted.
          Every one of those four destinations is still one click away in the masthead and in the
          footer directory, so nothing became unreachable; `link-check` walks them all. */}
      <RecordLandscape
        subjects={landscapeSubjects()}
        totals={{ series: series.length, records: ledger.length }}
        years={YEARS}
        yearTotals={archiveYears()}
      >
        <section className="home-intro" aria-labelledby="home-title">
          <p className="home-kicker mono">India, on the record &middot; May 2014 onward</p>
          <h1 id="home-title" className="home-lead">
            What we can actually know about how India changed
          </h1>
          <p className="lede">
            Built from India&rsquo;s published statistics and official documents. Every figure leads
            back to its source; every change of basis, disagreement and declared gap stays attached
            to the record it qualifies.
          </p>
        </section>
      </RecordLandscape>

      {/* THE CONSTELLATION KEEPS ITS PLACE, SMALLER, AND THE REASON IS NOT SENTIMENT.
          It is the only picture on this site built on India&rsquo;s real outline, and it declares its
          own positions conceptual. That declaration is what lets the landscape above be invented
          terrain without a reader taking it for geography. Remove this and the landscape becomes
          the site&rsquo;s only picture of India, which it must never be. */}
      <RecordConstellation counts={areaCounts} compact />

      <section className="ways" aria-labelledby="ways-h">
        <div className="home-section-head">
          <p className="home-kicker mono">How to read the archive</p>
          <h2 id="ways-h" className="ways-h">Three ways the record speaks</h2>
          <p>These are evidence shapes, not grades. The underlying records carry the detail.</p>
        </div>

        <div className="ways-grid">
          <article className="way">
            <span className="way-n mono">01</span>
            <h3>Clear trend</h3>
            <p>
              Renewables excluding large hydro rose from an eighth of installed electricity
              capacity to roughly a third across a continuous published series.
            </p>
            <RecordMarks record={wayRecords[0]} />
            <p className="source-line">
              <Link href="/series/res-capacity-share/">Open the renewable-capacity record →</Link>
            </p>
          </article>

          <article className="way">
            <span className="way-n mono">02</span>
            <h3>Two truths</h3>
            <p>
              Renewables grew and coal production grew. A transition and an expansion can occupy
              the same decade; the archive carries both instead of selecting the easier story.
            </p>
            <RecordMarks record={wayRecords[1]} />
            <p className="source-line">
              <Link href="/series/coal-production/">Open the coal-production record →</Link>
            </p>
          </article>

          <article className="way">
            <span className="way-n mono">03</span>
            <h3>The record ends</h3>
            <p>
              The school-level pupil-teacher series stopped after 2015-16 even though its successor
              system still holds the inputs. The full reason remains visible with the record.
            </p>
            <RecordMarks record={wayRecords[2]} />
            <p className="source-line">
              <Link href="/series/schools-above-rte-ptr-primary-dise/">
                Open the discontinued school record →
              </Link>
            </p>
          </article>
        </div>
      </section>

      <aside className="home-next" aria-label="Continue exploring">
        <div>
          <span className="home-kicker mono">Next view</span>
          <h2>Put every topic on the same years</h2>
          <p>
            The Atlas turns the archive into a coordinated visual overview while keeping every
            series, caveat and source link intact.
          </p>
        </div>
        <Link href="/overview/">Open the Atlas →</Link>
      </aside>
    </>
  );
}
