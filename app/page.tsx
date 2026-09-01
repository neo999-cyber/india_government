import Link from 'next/link';
import { ledger, series } from '@/lib/data';
import { EvidenceBase } from '@/components/EvidenceBase';
import { RecordLandscape } from '@/components/RecordLandscape';
import { archiveYears, landscapeSubjects } from '@/lib/landscape';
import { YEARS } from '@/lib/years';

export default function HomePage() {
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

      {/* THE CONSTELLATION LEAVES THE FRONT DOOR, AND IS NOT DELETED.
          Operator, 2026-09-01: "i dont see the point of the constellation map — no purpose — feels
          like a gimmick." The reason it read that way is structural, not cosmetic: THERE IS NO
          GEOGRAPHY IN THIS CORPUS. No series or record carries a state, region or district field;
          `country` holds only IND and the four peers; 27 of 269 series name a state at all, and
          only inside their titles. An outline over data with no places in it cannot be made to
          mean anything.

          **WITHDRAWN, and it was the argument for keeping it here:** "it is the only picture on
          this site built on India's real outline, and it declares its own positions conceptual —
          that declaration is what lets the landscape above be invented terrain without a reader
          taking it for geography." The landscape says "invented terrain, not a map" in words, and
          `/seams/` now carries the instrument's argument about what can and cannot be read. The
          declaration was doing less work than that sentence claimed.

          It remains one of the Atlas's four views, labelled "What the archive covers", which is
          where a coverage picture belongs — so nothing is lost and the Survey of India outline and
          its attribution stay on the site. */}
      <EvidenceBase />

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
