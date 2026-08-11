import type { Domain } from '@/lib/types';

/**
 * AUTHORED DOMAIN COPY — the part of a domain page that cannot be generated.
 *
 * WHAT THIS IS FOR. The domain pages contained everything and said nothing: three stacked tables of
 * series, records and disputes, complete and unreadable. **Completeness is not a publication.** The
 * periods below are fourteen pieces of writing, one set per area, and they are the difference.
 *
 * ============================ THE RULES THIS COPY IS WRITTEN UNDER ============================
 *
 * **IT IS WRITTEN FROM THE RECORDS IN THE AREA AND CITES THEM.** Every period names the ids it
 * draws on. A sentence with no id behind it is a sentence about the author's impression, which is
 * what this instrument exists not to publish.
 *
 * **IT DOES NOT RESTATE A VERDICT IT DOES NOT HOLD.** Where a record is `contested` the prose says
 * the question is contested; it does not pick a side, and it does not soften a `failed` either.
 * The point-of-change rule binds here: **if one of the cited records is rescored, this prose is a
 * prose shadow and must be corrected in the same operation.** No gate can see that — the ids are
 * findable, the claims are not — so the ids are listed per period to make the sweep possible.
 *
 * **IT IS NOT A SUMMARY OF THE AREA.** It is what changed, by period, from what is entered. An area
 * whose records are thin gets short periods rather than padded ones.
 *
 * ============================ COVERAGE, STATED =================================================
 *
 * **One of fourteen is written.** `macro` is the pattern. The other thirteen render the same page
 * without the periods block — not a stub, not a placeholder: the section simply is not there, which
 * is honest, where a heading over generated filler would not be.
 */
export type Period = {
  /** Displayed as given — a span, not a term. Periods are chosen by what changed, not by election. */
  years: string;
  heading: string;
  body: string;
  /** Ledger ids this period is written from. Required: prose with no record behind it is opinion. */
  from: string[];
};

export const DOMAIN_PERIODS: Partial<Record<Domain, Period[]>> = {
  macro: [
    {
      years: '2014 — 2016',
      heading: 'A price target got a statute, and the states got a bigger share',
      body:
        'Two things in this period were settled rather than argued. Flexible inflation targeting was adopted in 2015 and given statutory form the following year, and the Fourteenth Finance Commission raised the states’ share of the divisible pool from 32 to 42 per cent — the single record in this area assessed as having worked. Almost everything else announced here did not survive contact with its own target: the 25 per cent manufacturing share, the discom rescue, and the note withdrawal of November 2016 are all scored failed, the last of them on the limb its own announcement led with.',
      from: ['L-0014', 'L-0151', 'L-0016', 'L-0051', 'L-0011'],
    },
    {
      years: '2017 — 2019',
      heading: 'One tax replaced many, and the guarantee attached to it started running out',
      body:
        'The Goods and Services Tax began on 1 July 2017 and is assessed partly: the tax exists, collections are published monthly, and the revenue-neutral rate it was designed around was never reached. The compensation guarantee written to make it acceptable to the states — 14 per cent growth on a 2015-16 base — is contested in this record and is the thread that runs into the next period. The corporate rate cut of 2019 is scored failed on the investment response it was announced to produce, which no series here measures.',
      from: ['L-0012', 'L-0158', 'L-0013'],
    },
    {
      years: '2020 — 2022',
      heading: 'A contraction, a repeal, and cesses that outlived their purpose',
      body:
        'The pandemic year is the largest single discontinuity in this area, and how much of it was the virus and how much the lockdown design is contested here rather than settled. The three farm laws are the corpus’s only reversed record: passed, protested, repealed. Underneath both, a quieter pattern — the compensation cess extended past the compensation, a new agriculture cess levied at a rate the Union called revenue-neutral, and a fund that received nothing in its first year.',
      from: ['L-0020', 'L-0066', 'L-0160', 'L-0157', 'L-0176'],
    },
    {
      years: '2023 — today',
      heading: 'The measuring instrument changed, and most of what is new cannot be scored yet',
      body:
        'On 27 February 2026 the national accounts moved to a 2022-23 base — the third base in the period this record covers, with no spliced back-series for either revision, which is why three GDP regimes render side by side wherever growth appears. Most of what else has been entered since 2023 is trade: tariffs arriving from outside, and four agreements concluded or in force whose commitments have not yet fallen due. They are scored too-early, which is a statement about the clock and not about the agreements.',
      from: ['L-0022', 'L-0021', 'L-0194', 'L-0204', 'L-0205'],
    },
  ],
};

/**
 * A one-line character per area for the domains index, and the lead figure comes from the data
 * beside it.
 *
 * WHY AUTHORED AND NOT DERIVED. The index was fourteen identical boxes with counts, which told a
 * reader nothing about any of them — and no count can, because the interesting thing about an area
 * is what KIND of thing it holds. These say that. They are claims about the corpus, not about
 * India, and each is checkable against the area's own page in one click.
 */
export const DOMAIN_CHARACTER: Record<Domain, string> = {
  macro: 'Prices, growth, the deficit and the tax base — and more basis changes than any other area, which is why comparisons here carry seams.',
  banking: 'The bad-loan cycle and its cleanup, where the headline ratio falls for three different reasons at once and the write-offs are the largest of them.',
  employment: 'Participation and its composition. Almost every figure here is an approximation, and the survey that produces them changed in 2017.',
  poverty: 'India’s last official poverty headcount was measured for 2011-12. The area is small because nothing comparable has been published since.',
  'human-development': 'Health, sanitation and nutrition, measured mostly by survey rounds years apart rather than by an annual series.',
  infrastructure: 'Roads, power and housing — announced in targets and reported in progress, with completion published far more often than use.',
  welfare: 'Delivery schemes and support prices, where sanctioned, released and reaching are three different numbers and rarely all three are published.',
  education: 'Enrolment, spending and learning — the richest area for measurement disputes, and the one where two national instruments disagree about whether children can read.',
  governance: 'Institutions, appointments, enforcement and the courts. The largest area by record count and the one with the fewest announced targets to score.',
  kashmir: 'A lens rather than a subject: its thirty series are filed under defence, governance and federalism, and its counts come largely from courts, hospitals and commissions.',
  federalism: 'Who collects and who spends. Every figure here has two defensible values depending on which side of the transfer is doing the accounting.',
  foreign: 'Trade, agreements and the external account, where the counterparty’s figure and India’s own frequently do not agree.',
  defence: 'Procurement, indigenisation and armed conflict — ten records, few of them announcing anything a later document can be held against.',
  environment: 'Energy capacity, generation and emissions. Well measured and definitionally treacherous: the same word names three different shares.',
};
