import Link from 'next/link';
import { ledger, series } from '@/lib/data';
import { RecordConstellation } from '@/components/RecordConstellation';
import { AREAS } from '@/lib/constellation';
import { RecordLandscape } from '@/components/RecordLandscape';
import { archiveYears, landscapeSubjects } from '@/lib/landscape';
import { YEARS } from '@/lib/years';

export default function HomePage() {
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

      {/* THE SECOND ROOM, NAMED AS ONE — operator reading, 2026-09-01: readers "are overwhelmed
          with records and text", so this page is the picture and the dense surfaces sit one step
          behind it. Two doors, not four: the Atlas for the fourteen topics with their lines, and
          `/in-short/` for the same record in plain language — which is now where the three
          evidence-shape examples live, having been lifted off this page in the same commit.

          It says what is BEHIND each door rather than naming a tool. The four `home-paths` cards
          withdrawn in August failed for exactly that reason: a reader who does not yet know what
          the archive contains cannot choose between a timeline, a filter, a story and a search. */}
      <aside className="home-next" aria-label="Continue exploring">
        <div>
          <span className="home-kicker mono">Go deeper</span>
          <h2>Two ways in from here</h2>
          <p>
            The <strong>Atlas</strong> puts all fourteen topics on the same years, each leading with
            one real series. <strong>In short</strong> is the same record in plain language, with
            what it cannot tell you stated alongside.
          </p>
        </div>
        <div className="home-next-go">
          <Link href="/overview/">Open the Atlas →</Link>
          <Link href="/in-short/">Read it in short →</Link>
        </div>
      </aside>
    </>
  );
}
