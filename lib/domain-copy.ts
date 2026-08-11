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
 * **CORRECTED 2026-08-11, AND THE DEFECT THIS FILE WARNED ABOUT HAD ALREADY HAPPENED IN IT.** The
 * `macro` 2014–2016 period read *"Two things in this period were settled rather than argued.
 * Flexible inflation targeting was adopted in 2015 and given statutory form the following year, and
 * the Fourteenth Finance Commission raised the states’ share of the divisible pool from 32 to 42 per
 * cent — the single record in this area assessed as having worked."* **L-0014 was rescored from
 * `worked` to `contested` on 2026-08-06**, five days before this prose was audited, and calling a
 * contested record *settled rather than argued* is the prose shadow exactly as described three
 * paragraphs below. It was found by a probe over the `from` lists, not by reading — which is the
 * argument for keeping those lists complete.
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
 * **Five of fourteen are written**, and the count is restated here on every change because a
 * coverage line that goes stale is a claim about the past in the present tense — the defect this
 * repository has already paid for in its own session-cost section. `macro` is the pattern;
 * `education` and `environment` followed on 2026-08-11, `infrastructure` and `employment` the same
 * day. **The other nine render the same page without the periods block** — not a stub, not a
 * placeholder: the section simply is not there, which is honest, where a heading over generated
 * filler would not be.
 *
 * Period spans are chosen by what changed and are NOT uniform across areas. `education` opens at
 * 2010 because the Right to Education Act's own numbers are what the first period is about;
 * `environment` and `employment` take three rather than four because nothing in either divides at
 * the fourth point; and `employment`'s first period exists to say that no national survey covers
 * it. **A period count is a reading of the area, never a template.**
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
        'One thing in this period is settled and one is not, and they are easily read as a pair. The Fourteenth Finance Commission raised the states’ share of the divisible pool from 32 to 42 per cent, and is the single record in this area assessed as having worked. Flexible inflation targeting was adopted in 2015 and given statutory form the following year — the framework exists, inflation fell, and the record is nonetheless contested, because the object it announced was anchoring expectations and no series here measures a state of belief. Almost everything else announced here did not survive contact with its own target: the 25 per cent manufacturing share, the discom rescue, and the note withdrawal of November 2016 are all scored failed, the last of them on the limb its own announcement led with.',
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

  education: [
    {
      years: '2010 — 2016',
      heading: 'The Act set numbers, and the bodies enforcing it argued from something else',
      body:
        'The Right to Education Act carries binding figures and the record is that they were not the figures used. Section 26 caps teaching vacancies at ten per cent and none of the four Standing Committee reports retrieved cites it, arguing instead from adequacy and from the spirit of the Act; the 30:1 ratio everyone quotes, including the Committee about its own governing statute, is not in the Act at all, whose Schedule sets a slab that permits a single-teacher school. Both are scored failed. The 25 per cent private-school quota works partly — states pay first and claim later, and approvals ran at 70.6 per cent of claims in FY2020-21. Two things stopped being visible in this period rather than stopping: the national teacher-vacancy statistic was tabled for a decade and then withdrawn behind a Concurrent-List formulation, and public education spending acquired two official numerators moving in opposite directions, so the gap to the 6 per cent target is 1.9 points or 3.3 depending on a choice nobody states when they invoke it.',
      from: ['L-0095', 'L-0106', 'L-0098', 'L-0094', 'L-0102'],
    },
    {
      years: '2017 — 2019',
      heading: 'The courts decided who may teach, and one recruitment was annulled entire',
      body:
        'The untrained-teacher deadline of 31 March 2015 was not extended: the 2017 Act inserted a second proviso and left the original on the statute book unamended and permanently unmet, which is why this record is contested rather than closed. In Devesh Sharma the Supreme Court removed the B.Ed. as a primary-teaching qualification, then declined to unseat those already appointed and ordered a bridge course — scored failed on the qualification limb, with the remedy live. The West Bengal panel of 2016 was annulled in full, and the findings the Court adopted are why no untainted candidate could be separated out: the OMR sheets had been destroyed by the Commission’s own decision, with no scanned mirror preserved. Karnataka’s neighbourhood rule, and the collapse in quota participation that followed it, is contested on whether the rule caused the collapse.',
      from: ['L-0096', 'L-0097', 'L-0108', 'L-0099'],
    },
    {
      years: '2020 — 2022',
      heading: 'The schools closed, and every instrument that would measure it changed at once',
      body:
        'Closure was state-decided and grade-differentiated, which is why it is filed as an episode rather than a shock: across a 775-day window India spent 173 days fully closed and 476 in a single undifferentiated partially-open bucket. What makes this period hard is not the closure but what happened to the measuring. The last complete literacy enumeration remains 2011 and sample surveys cannot supply the sub-district granularity that is missing. Contract teaching is collected for every teacher and published for none. AISHE stopped being timely — collection closed in March 2024 and the report appeared 28 months later, the constraint sitting between scrutiny and publication. And UDISE+ moved to individual student records, 1.7 crore enrolments disappeared, and the Ministry named three indicators as not strictly comparable while not naming pupil-teacher ratio, whose numerator is the re-based count.',
      from: ['L-0091', 'L-0105', 'L-0107', 'L-0103', 'L-0093'],
    },
    {
      years: '2023 — today',
      heading: 'Arithmetic recovered and reading did not, and the same ministry said it twice',
      body:
        'The 2024 round is the clearest evidence in this area and it points two ways at once: arithmetic exceeded its 2018 level at every grade while reading recovered to 2018 at none — Standard III reading went 27.3 to 20.5 to 27.1, Standard III arithmetic 28.2 to 25.9 to 33.7. The recovery record is scored partly on exactly that split. Six months apart the Ministry published two framings of the same round, the later one with three 2022 figures removed, which is contested here rather than characterised. Higher-education enrolment is the denominator trap of the area: the projected 18–23 population fell 1,282,000 in a year, male enrolment was flat, and holding the denominator still turns 30.0 into 29.77. Funding is the live dispute — Samagra Shiksha releases withheld from states that have not adopted NEP 2020, with Tamil Nadu allocated 2,151.59 crore and released 362.81 crore of it a year late.',
      from: ['L-0090', 'L-0092', 'L-0104', 'L-0101', 'L-0179'],
    },
  ],

  environment: [
    {
      years: '2014 — 2019',
      heading: 'Capacity was built, and the word for it changed twice',
      body:
        'Renewable capacity expansion and railway electrification are both scored partly, and for opposite reasons: electrification was delivered close to fully and its announced emissions limb is unmeasured, while renewable capacity grew and the thing being counted moved underneath it. In March 2019 large hydro was reclassified as renewable — the dams already existed and the definition changed — and “renewable” now has at least four concurrent official boundaries in Indian government publications. Ujjwala delivered connections at scale and ahead of target and is scored partly on refills, which the auditor put at 3.66 a year for the first cohort. Two things in this area are entered with no target to score at all: groundwater depletion in the grain belt, and the foodgrain production record.',
      from: ['L-0052', 'L-0047', 'L-0034', 'L-0071', 'L-0073'],
    },
    {
      years: '2020 — 2022',
      heading: 'Five climate commitments were announced, and they cannot be scored the same way',
      body:
        'The Glasgow set is the reason this area needs four verdicts rather than one. The non-fossil capacity limb was reached early and the government said so — 50.08 per cent against 49.92 at 30 June 2025 — and the record is partly, because capacity is not generation: half the fleet produced under a third of the electricity. Two limbs state an absolute tonnage and a date with no outturn retrievable for either, and are contested. The emissions-intensity limb is the only one with a reported outturn and is too-early. Net zero by 2070 is one sentence with a year and no statement of what is being zeroed, which is too-early on the clock rather than on the evidence. In the same period the commitment to stop thermal coal imports in FY2023-24 failed on both limbs and in the opposite direction — and the record was corrected in 2026 because the figure first used, 264.53 MT, was the total column including coking coal, which India cannot substitute domestically.',
      from: ['L-0221', 'L-0224', 'L-0223', 'L-0225', 'L-0222'],
    },
    {
      years: '2023 — today',
      heading: 'The traps here are definitional, and three of them sit under one chart',
      body:
        'Nothing in this area has been announced recently that a later document can be held against; what has changed is what the measurements will bear. A rule guarantees that no renewable capacity is backed down and the plan built on it does not carry the guarantee through, modelling about 1 per cent of renewable generation unabsorbed in 2026-27 rising to 3.3 per cent in 2031-32 — contested, on the government’s own document. Underneath every generation figure here, renewable generation was imputed rather than metered up to FY2013-14, so the basis changes at the seam and a comparison across it measures the change of method as well as the change in generation. The generation series also joins two CEA documents at FY2024-25 with no overlap year. The Indus Waters Treaty was put in abeyance in April 2025 and is scored partly.',
      from: ['L-0226', 'L-0216'],
    },
  ],

  infrastructure: [
    {
      years: '2012 — 2016',
      heading: 'Building genuinely accelerated, and the headline figure measures something else',
      body:
        'This area opens on a failure of the existing plant — the July 2012 grid collapse, entered as baseline context rather than as anything announced. What followed was announced at scale and mostly delivered at scale. Highway construction roughly tripled its pace and four-laning went up two and a half times; the network figure quoted alongside it, 91,287 km to 146,342 km, is mostly reclassification of existing state roads. Freight corridors cut coal transit on the eastern route from 35 hours to 20 and haulage from 95 to 45 paise per tonne-kilometre. Metro assets were built and the ridership was not: most systems carry 25 to 30 per cent of the projections their approvals rested on, and the return those approvals promised is not published. Ports are one of the few places where output and utilisation improved together. Everything in this period is scored partly, and each for its own reason.',
      from: ['L-0001', 'L-0044', 'L-0048', 'L-0055', 'L-0053'],
    },
    {
      years: '2017 — 2019',
      heading: 'A connection is not a supply, and the second half of each chain is the part not published',
      body:
        'Three schemes in this period delivered a countable thing very fast and left the thing it was for unmeasured. Household electrification connected at extraordinary speed, and around 53 per cent of villages received under twelve hours of domestic supply a day — supply-hours as a continuous national series is not published. Jal Jeevan Mission expanded coverage faster than almost anything here, and the Ministry’s own 2024 functionality assessment across 19,812 certified villages opens a wedge between 98 per cent with a tap and 76 per cent with safe water. Housing is the clearest case of the pattern and the reason this instrument marks absences at all: sanctioned and completed are both published for Pradhan Mantri Awas Yojana and occupancy is not, so the published chain stops one step before the question. Bharatmala awarded about 26,425 km and built roughly 55 per cent of target, with completion slipping to 2027-28.',
      from: ['L-0050', 'L-0036', 'L-0037', 'L-0045'],
    },
    {
      years: '2020 — 2022',
      heading: 'Spending scaled and execution did not, and one milestone is true of the fleet and not of the output',
      body:
        'The capital-expenditure push is contested here rather than scored, because the two things it is judged on moved in opposite directions: spending scaled dramatically while delayed central-sector projects rose from 27.1 per cent of those monitored in March 2019 to 41.6 per cent in March 2024. The non-fossil capacity milestone was reached early and announced as such — 50.08 per cent against 49.92 at 30 June 2025 — and is scored partly for a reason that belongs in this area as much as in energy: half the fleet produced under a third of the electricity, because capacity is what is installed and generation is what is used. Discom reform is the one record here scored failed: losses fell from 23.7 per cent to 15.4, then rose again to 16.12 in FY2023-24, the first increase in five years.',
      from: ['L-0057', 'L-0221', 'L-0051'],
    },
    {
      years: '2023 — today',
      heading: 'What is newest was announced without a schedule anything can be held against',
      body:
        'Four of the five records entered here since 2023 carry no objective that can fall due, and the reason is a property of the announcements rather than of the work. The decision to fence the entire 1,643 km Myanmar border states a total with no date, no phasing and no annual target, which is why it takes undated-commitment: progress against it is reportable and it can never fall due. Nineteen months after the IMEC memorandum the corridor has no published schedule to measure. Electricity exports to Bangladesh were published as a measure of cooperation, and the Ministry of Power’s account of neighbourhood cooperation lists capacities rather than flows. One record here is a finding about a plant that ran: Punatsangchhu-II exported power to India for nearly seven months before it was commissioned.',
      from: ['L-0209', 'L-0213', 'L-0211', 'L-0208', 'L-0207'],
    },
  ],

  employment: [
    {
      years: '2014 — 2016',
      heading: 'The period with no survey in it',
      body:
        'There is no national employment survey covering these years. The quinquennial Employment-Unemployment Survey last ran in 2011-12 and the Periodic Labour Force Survey begins in 2017-18, so the first three years of this record are measured by scheme administration and by peer panels rather than by a household survey of India. What is entered is structural and none of it announces a target: the vulnerable-employment share — own-account and contributing family workers — stayed the highest in the peer panel at about 72 per cent, employment elasticity stayed low, and female graduates faced 34.5 per cent unemployment against male graduates at 26.4. The scale of competition for formal work is visible where administration does publish: 1.8 crore applicants for about 78,000 government posts in FY2020-21. MGNREGA is the one large programme with a continuous count, and it is contested on what the count means.',
      from: ['L-0065', 'L-0063', 'L-0040'],
    },
    {
      years: '2017 — 2019',
      heading: 'A new survey began, and the figures either side of it are not the same measurement',
      body:
        'The Periodic Labour Force Survey replaced the Employment-Unemployment Survey from 2017-18 with changed sampling, stratification and definitions, and eight series in this area carry a declared break at that point. What changed is not only the instrument: the PLFS counts unpaid helpers in household enterprises as employed and counts subsidiary activity of thirty days over a 365-day recall, so an unemployment rate on this definition falls when people are absorbed into unpaid family work. That is what makes the fall contested rather than reported. Beneath it the composition moved the other way — the self-employed share rose to 58.4 per cent and unpaid helpers from 13.3 to 17.3, while regular wage and salaried employment stayed flat at 21 to 23. Female participation rose steeply and the same composition question sits under it. Formalisation is scored partly on the same distinction: EPFO net additions count members re-joining after a gap and members switching employers, so of 4.86 crore net additions across FY2020 to FY2023 one analysis finds roughly 2.27 crore genuinely new payroll entries and about 42 lakh of net formalisation. The first round was itself withheld past its release date and two members of the National Statistical Commission resigned; the four labour codes were passed in 2019 and are scored too-early.',
      from: ['L-0058', 'L-0059', 'L-0060', 'L-0062', 'L-0061'],
    },
    {
      years: '2020 — today',
      heading: 'A second redesign, and the two largest events of the period were not recorded',
      body:
        'From January 2025 the PLFS was substantially redesigned again — first-stage units from 12,800 to 22,692 and the sample to about 2.72 lakh households — so the series carries a second seam at FY2025-26 and breaks against itself, not only against what preceded it. The two largest employment events of the period have no measurement at all. On the 2020 exodus, 4,611 Shramik Special trains carried about 63 lakh workers and the Labour Ministry told Parliament that no data was maintained on deaths during it or on job losses. MGNREGA money to West Bengal was stopped under section 27 in March 2022, contested on the ground given; the scheme was then repealed in December 2025, which is too-early. Where a private instrument exists it disagrees in direction rather than in level: over 2017-18 to 2021-22 the PLFS records employment growth of 4.55 per cent and CMIE a fall.',
      from: ['L-0064', 'L-0168', 'L-0169'],
    },
  ],
};

/**
 * THE EVIDENCE GRADE, WHERE IT IS THE SUBJECT RATHER THAN A CAVEAT UNDER ONE.
 *
 * Two areas are published almost entirely as approximations, and in both the reason is the
 * publication channel rather than a weakness in this record. Saying so at the top of the page is
 * the difference between information and an apology, and an area that buries it under a chart has
 * hidden the most useful thing it knows about itself.
 *
 * **THE COUNTS ARE NOT WRITTEN HERE.** The page derives them from the series it is rendering, so a
 * sentence about the evidence cannot go stale against the evidence — which is the failure mode this
 * repository has already paid for in the one section written to prevent it.
 *
 * Only two areas carry a note, and that is the point: an evidence line on all fourteen would be
 * boilerplate, and boilerplate is read past. **`macro`, `education` and `environment` deliberately
 * have none** — their grades are mixed and unremarkable, and a note saying so would say nothing.
 */
export const DOMAIN_EVIDENCE: Partial<Record<Domain, string>> = {
  infrastructure:
    'Almost nothing in this area is published exactly, and that is a fact about how India publishes rather than a gap in this record. These figures come from ministry dashboards, scheme reporting and annual reports — running totals, revised as they run — and not from closed statistical series. A reader arriving to ask whether things were built will find that a great deal was, and that the published quantity is usually a progress figure rather than a final one. Approximate by publication, not by omission.',
  employment:
    'No observation in this area is verified, and the reason is that India measures employment by sample survey. A survey estimate carries a sampling error by construction, so an approximate status here is the honest grade for a correctly published figure and not a mark against it. What does bear on comparability is that the instrument changed twice — the Employment-Unemployment Survey gave way to the Periodic Labour Force Survey at FY2017-18, and the PLFS was redesigned again from January 2025 — so the series carries two seams and no line is drawn across either.',
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
