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
 * cent — the single record in this topic assessed as having worked."* **L-0014 was rescored from
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
 * **All fourteen are written.**, and the count is restated here on every change because a
 * coverage line that goes stale is a claim about the past in the present tense — the defect this
 * repository has already paid for in its own session-cost section. `macro` is the pattern;
 * `education`, `environment`, `infrastructure`, `employment`, `welfare`, `human-development`,
 * `banking`, `poverty`, `federalism`, `foreign`, `governance`, `defence` and `kashmir` followed
 * on 2026-08-11. **The set is closed.** If a fifteenth area is ever opened it gets periods in the
 * batch that opens it, or its page renders without the block — not a stub and not a placeholder:
 * the section simply is not there, which is honest where a heading over generated filler would not
 * be.
 *
 * Period spans are chosen by what changed and are NOT uniform across areas. `education` opens at
 * 2010 because the Right to Education Act's own numbers are what the first period is about;
 * `environment` and `employment` take three rather than four because nothing in either divides at
 * the fourth point; and `employment`'s first period exists to say that no national survey covers
 * it. `human-development` takes three on eight records because its last period carries the
 * comparability argument that is the whole area, not because three is a floor; **`poverty` takes
 * ONE, over 2004 to today**; and `governance` takes four over 110 records, opening at 2010 because
 * the scrutiny practices its first period is about were already moving before 2014. Two were drafted and the first had no ledger record behind it —
 * it was about a SERIES that stopped — so it cited a record it only pointed forward to. **A period
 * with nothing behind it is the thing the `from` list exists to prevent**, and the honest repair
 * was one period rather than a citation added to justify a second.
 * **A period count is a reading of the area, never a template.**
 *
 * **`defence` AND `kashmir` WERE WRITTEN AS ONE BODY OF MATERIAL, AND THE PAGES DO NOT DUPLICATE.** Measured 2026-08-11: **9 of its 10 ledger records are also `kashmir` records, and all
 * 13 of its series carry the kashmir lens.** The one exception is L-0009, the Depsang incursion,
 * which is also `foreign` and is written there. Writing `defence` alone would write the Kashmir
 * page under another heading twice over. **So the split is by subject: `defence` carries the
 * conflict counts and the disputes about what they count; `kashmir` carries the institutional and
 * rights records — detentions, shutdowns, commissions, statehood, domicile, land.** Each page names
 * what belongs to it and neither restates the other. **The domain is not procurement** — the filing rule sends acquisition to `macro`
 * and indigenisation to `foreign`, leaving `defence` as armed conflict and counter-insurgency,
 * which in this corpus is J&K.
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
        'One thing in this period is settled and one is not, and they are easily read as a pair. The Fourteenth Finance Commission raised the states’ share of the divisible pool from 32 to 42 per cent, and is the single record in this topic assessed as having worked. Flexible inflation targeting was adopted in 2015 and given statutory form the following year — the framework exists, inflation fell, and the record is nonetheless contested, because the object it announced was anchoring expectations and no series here measures a state of belief. Almost everything else announced here did not survive contact with its own target: the 25 per cent manufacturing share, the discom rescue, and the note withdrawal of November 2016 are all scored failed, the last of them on the limb its own announcement led with.',
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
        'The pandemic year is the largest single discontinuity in this topic, and how much of it was the virus and how much the lockdown design is contested here rather than settled. The three farm laws are the corpus’s only reversed record: passed, protested, repealed. Underneath both, a quieter pattern — the compensation cess extended past the compensation, a new agriculture cess levied at a rate the Union called revenue-neutral, and a fund that received nothing in its first year.',
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
        'The 2024 round is the clearest evidence in this topic and it points two ways at once: arithmetic exceeded its 2018 level at every grade while reading recovered to 2018 at none — Standard III reading went 27.3 to 20.5 to 27.1, Standard III arithmetic 28.2 to 25.9 to 33.7. The recovery record is scored partly on exactly that split. Six months apart the Ministry published two framings of the same round, the later one with three 2022 figures removed, which is contested here rather than characterised. Higher-education enrolment is the denominator trap of the topic: the projected 18–23 population fell 1,282,000 in a year, male enrolment was flat, and holding the denominator still turns 30.0 into 29.77. Funding is the live dispute — Samagra Shiksha releases withheld from states that have not adopted NEP 2020, with Tamil Nadu allocated 2,151.59 crore and released 362.81 crore of it a year late.',
      from: ['L-0090', 'L-0092', 'L-0104', 'L-0101', 'L-0179'],
    },
  ],

  environment: [
    {
      years: '2014 — 2019',
      heading: 'Capacity was built, and the word for it changed twice',
      body:
        'Renewable capacity expansion and railway electrification are both scored partly, and for opposite reasons: electrification was delivered close to fully and its announced emissions limb is unmeasured, while renewable capacity grew and the thing being counted moved underneath it. In March 2019 large hydro was reclassified as renewable — the dams already existed and the definition changed — and “renewable” now has at least four concurrent official boundaries in Indian government publications. Ujjwala delivered connections at scale and ahead of target and is scored partly on refills, which the auditor put at 3.66 a year for the first cohort. Two things in this topic are entered with no target to score at all: groundwater depletion in the grain belt, and the foodgrain production record.',
      from: ['L-0052', 'L-0047', 'L-0034', 'L-0071', 'L-0073'],
    },
    {
      years: '2020 — 2022',
      heading: 'Five climate commitments were announced, and they cannot be scored the same way',
      body:
        'The Glasgow set is the reason this topic needs four verdicts rather than one. The non-fossil capacity limb was reached early and the government said so — 50.08 per cent against 49.92 at 30 June 2025 — and the record is partly, because capacity is not generation: half the fleet produced under a third of the electricity. Two limbs state an absolute tonnage and a date with no outturn retrievable for either, and are contested. The emissions-intensity limb is the only one with a reported outturn and is too-early. Net zero by 2070 is one sentence with a year and no statement of what is being zeroed, which is too-early on the clock rather than on the evidence. In the same period the commitment to stop thermal coal imports in FY2023-24 failed on both limbs and in the opposite direction — and the record was corrected in 2026 because the figure first used, 264.53 MT, was the total column including coking coal, which India cannot substitute domestically.',
      from: ['L-0221', 'L-0224', 'L-0223', 'L-0225', 'L-0222'],
    },
    {
      years: '2023 — today',
      heading: 'The traps here are definitional, and three of them sit under one chart',
      body:
        'Nothing in this topic has been announced recently that a later document can be held against; what has changed is what the measurements will bear. A rule guarantees that no renewable capacity is backed down and the plan built on it does not carry the guarantee through, modelling about 1 per cent of renewable generation unabsorbed in 2026-27 rising to 3.3 per cent in 2031-32 — contested, on the government’s own document. Underneath every generation figure here, renewable generation was imputed rather than metered up to FY2013-14, so the basis changes at the seam and a comparison across it measures the change of method as well as the change in generation. The generation series also joins two CEA documents at FY2024-25 with no overlap year. The Indus Waters Treaty was put in abeyance in April 2025 and is scored partly.',
      from: ['L-0226', 'L-0216'],
    },
  ],

  infrastructure: [
    {
      years: '2012 — 2016',
      heading: 'Building genuinely accelerated, and the headline figure measures something else',
      body:
        'This topic opens on a failure of the existing plant — the July 2012 grid collapse, entered as baseline context rather than as anything announced. What followed was announced at scale and mostly delivered at scale. Highway construction roughly tripled its pace and four-laning went up two and a half times; the network figure quoted alongside it, 91,287 km to 146,342 km, is mostly reclassification of existing state roads. Freight corridors cut coal transit on the eastern route from 35 hours to 20 and haulage from 95 to 45 paise per tonne-kilometre. Metro assets were built and the ridership was not: most systems carry 25 to 30 per cent of the projections their approvals rested on, and the return those approvals promised is not published. Ports are one of the few places where output and utilisation improved together. Everything in this period is scored partly, and each for its own reason.',
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
        'The capital-expenditure push is contested here rather than scored, because the two things it is judged on moved in opposite directions: spending scaled dramatically while delayed central-sector projects rose from 27.1 per cent of those monitored in March 2019 to 41.6 per cent in March 2024. The non-fossil capacity milestone was reached early and announced as such — 50.08 per cent against 49.92 at 30 June 2025 — and is scored partly for a reason that belongs in this topic as much as in energy: half the fleet produced under a third of the electricity, because capacity is what is installed and generation is what is used. Discom reform is the one record here scored failed: losses fell from 23.7 per cent to 15.4, then rose again to 16.12 in FY2023-24, the first increase in five years.',
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
        'The Periodic Labour Force Survey replaced the Employment-Unemployment Survey from 2017-18 with changed sampling, stratification and definitions, and eight series in this topic carry a declared break at that point. What changed is not only the instrument: the PLFS counts unpaid helpers in household enterprises as employed and counts subsidiary activity of thirty days over a 365-day recall, so an unemployment rate on this definition falls when people are absorbed into unpaid family work. That is what makes the fall contested rather than reported. Beneath it the composition moved the other way — the self-employed share rose to 58.4 per cent and unpaid helpers from 13.3 to 17.3, while regular wage and salaried employment stayed flat at 21 to 23. Female participation rose steeply and the same composition question sits under it. Formalisation is scored partly on the same distinction: EPFO net additions count members re-joining after a gap and members switching employers, so of 4.86 crore net additions across FY2020 to FY2023 one analysis finds roughly 2.27 crore genuinely new payroll entries and about 42 lakh of net formalisation. The first round was itself withheld past its release date and two members of the National Statistical Commission resigned; the four labour codes were passed in 2019 and are scored too-early.',
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

  welfare: [
    {
      years: '2013 — 2016',
      heading: 'A statutory entitlement inherited, and a wave of schemes that count what they hand out',
      body:
        'The National Food Security Act is entered as baseline context: a statutory entitlement already in force in 2013, against which what followed is read. What followed counts deliveries. Jan Dhan, Aadhaar and UPI are scored partly and are the topic’s clearest success at the thing they measure, which is accounts opened and transactions cleared. Swachh Bharat, Pradhan Mantri Awas Yojana, the crop-insurance scheme and Ujjwala are all partly, and all four publish a cumulative figure for the thing handed over. The one record here scored failed is the commitment to double farmers’ income by 2022 — a dated, quantified target announced in 2016 and not met, and the MSP guarantee demand beside it takes undated-commitment because it states a quantity with no date and cannot fall due. That record carries the topic’s sharpest measurement question: the 2018-19 claim of setting minimum support prices at 1.5 times cost used A2+FL — paid-out costs plus imputed family labour — and not C2, the comprehensive basis the Swaminathan recommendation specified, with the announcement silent on which. It is the same shape as capacity against generation in energy and a stock against a flow in fiscal reporting: two official constructions of one word, the promise kept on one and not on the other, and nothing in the announcement saying which was meant. Three areas have now produced it, which makes it a property of how commitments are announced rather than a quirk of any one of them.',
      from: ['L-0007', 'L-0029', 'L-0035', 'L-0037', 'L-0067', 'L-0069'],
    },
    {
      years: '2017 — 2019',
      heading: 'The published quantity is the connection, and the metric for the scheme stops',
      body:
        'This is the area’s defining shape and Ujjwala is the sharpest case of it. Connections are published cumulatively and are still running; refills — which this record holds to be the metric for the scheme, not connections — stop at FY2018-19, sourced to a CAG report finding the first cohort averaged 3.66 a year against a general-consumer benchmark of roughly six, with 17.61 per cent never returning for a second cylinder. The publisher of the useful number stopped and the publisher of the flattering one did not. The same shape runs through the rest: household electrification connected at speed while supply-hours are not published as a national series, Jal Jeevan Mission expanded coverage while its own functionality assessment opens a wedge between a tap and safe water, and housing publishes sanctioned and completed while occupancy is declared not published. All four are scored partly, and in each the limb they fall short on is the used half rather than the delivered one. PM-KISAN is scored failed against the income-doubling objective it was announced to serve.',
      from: ['L-0034', 'L-0050', 'L-0036', 'L-0037', 'L-0041'],
    },
    {
      years: '2020 — 2022',
      heading: 'Free foodgrain at scale, and transfers that stopped for reasons the records contest',
      body:
        'PMGKAY put free foodgrain on top of the statutory entitlement and is scored partly, with the NFSA exclusion — those outside the Act’s coverage — the limb it does not reach. Against that, three records in this period are about money not moving. Centrally sponsored scheme releases to West Bengal fell 67 per cent; MGNREGA funds to the same state were stopped under section 27 in March 2022 on stated grounds of misappropriation and non-compliance; and both are contested, on the ground given rather than on the fact of the stoppage. The 2020 exodus sits here too and has no measurement at all: the Labour Ministry told Parliament no data was maintained on deaths during it or on job losses.',
      from: ['L-0038', 'L-0178', 'L-0168', 'L-0064'],
    },
    {
      years: '2023 — today',
      heading: 'A claim about exit from poverty, and the repeal of the largest programme here',
      body:
        'Two records, and they point opposite ways. The multidimensional poverty exit claim is contested — the index, its cut-offs and what an exit from it means are the dispute, not the arithmetic. And in December 2025 MGNREGA was repealed, with the unskilled wage moving off a 100 per cent Central share; it is scored too-early, which is a statement about the clock rather than about the repeal. Nothing else has been entered since 2023, which is itself a fact about the period rather than about the schemes.',
      from: ['L-0043', 'L-0169'],
    },
  ],

  'human-development': [
    {
      years: '2014 — 2016',
      heading: 'Two survey rounds are what this topic has, and the first of them is here',
      body:
        'This is a small area and most of its records file their subject elsewhere — road safety under infrastructure, educated youth unemployment under employment — and appear here because the human outcome is what this page is about. Its own measurement is thin and periodic: child stunting, wasting and anaemia are read from National Family Health Survey rounds 4 and 5, which is two points, and the fourth round is the one in this period. Sanitation runs annually and improves throughout. Farmer suicides run annually from 2014 and are contested, on what the classification counts rather than on the count. Swachh Bharat is scored partly and belongs to the same input-against-outcome question the next period makes explicit.',
      from: ['L-0042', 'L-0070', 'L-0046', 'L-0063', 'L-0035'],
    },
    {
      years: '2017 — 2019',
      heading: 'The inputs improved substantially and the outcomes they are meant to produce did not',
      body:
        'The clearest finding in this topic is a divergence rather than a level. Immunisation, institutional delivery, sanitation and clean-fuel access all improved substantially over the survey interval, while the nutritional outcomes those inputs are meant to produce improved only marginally or went backwards — anaemia in children rose, and severe wasting rose from 7.5 to 7.7 per cent. That record is contested rather than scored against anyone, because the improvement in inputs is real and the mechanism connecting them is what is in dispute. Ayushman Bharat PM-JAY was announced in 2018 and is scored partly; what it publishes is cards created and admissions authorised, both cumulative.',
      from: ['L-0042', 'L-0039'],
    },
    {
      years: '2020 — today',
      heading: 'The last authoritative reading is the round that straddles the pandemic, and there is no round after it',
      body:
        'Every comparison across 2020 in this topic is a question rather than a subtraction, and the reason is specific: the second and last point of anaemia, stunting and wasting is NFHS-5, whose fieldwork ran 2019-21 and overlapped COVID. The record does not resolve that by drawing a line through it. It says the overlap confounds attribution, and that the anaemia increase is too large to be attributed to the pandemic alone because the pre-pandemic phase of the same fieldwork already showed the trend — a confound accepted in part, not a shock used to explain the finding away. NFHS-6 fieldwork has been delayed and its publication status is uncertain as of mid-2026, so this is not a gap waiting to close on a known date. Seven of the eight records here declare an exposure to COVID and they adjudicate it four different ways, from refused to accepted. The one record entered since is Vaccine Maitri, presented as a gift, where the doses the government gave and the doses it sold are not the same quantity.',
      from: ['L-0042', 'L-0215'],
    },
  ],

  banking: [
    {
      years: '2014 — 2016',
      heading: 'The bad loans were recognised, not created — and the ratio that shows it is four ratios',
      body:
        'The Asset Quality Review is the hinge of this topic. Reported public-sector gross NPAs rose from 4.97 per cent in March 2015 to a peak of 14.58 in March 2018, and the record is explicit that the rise was driven by recognition rather than by deterioration: the loans already existed and the review made banks name them. That peak figure is not one number. It is 14.58 per cent for public-sector banks on a global-operations basis and 11.46 for scheduled commercial banks on a domestic one, and the two are different populations rather than different estimates of one. Four NPA ratio series are carried here and each states its basis in its own title, one of them as *basis not stated*, because a figure that does not say which population it counts cannot be set against one that does. Beside the review, and all three scored partly: the Insolvency and Bankruptcy Code, recapitalisation, and — scored failed — the note withdrawal of November 2016 — the last of these scored failed on the limb its own announcement led with, since 99.3 per cent of the notes came back.',
      from: ['L-0023', 'L-0024', 'L-0026', 'L-0011'],
    },
    {
      years: '2017 — 2019',
      heading: 'The peak, and the fall that has three causes',
      body:
        'The gross NPA ratio has fallen every year since 2018 and the reasons are not the same reason. Write-offs peaked at ₹2.36 lakh crore in FY2018-19 and a substantial share of the headline decline is attributed to them rather than to recovery — which is why any view of the gross ratio here offers the adjusted line, gross NPAs plus cumulative write-offs over the same denominator. The denominator is the second cause: credit grew through the period, so a constant stock of bad loans falls as a share without anything being resolved. Genuine resolution is the third and the smallest of them. Two records in this period announce nothing and are entered for what they show: bank frauds, where aggregate value doubled to ₹1.85 trillion in FY2020, and the IL&FS collapse.',
      from: ['L-0025', 'L-0032', 'L-0027'],
    },
    {
      years: '2020 — 2022',
      heading: 'A bank reconstructed, and a privatisation that has not happened',
      body:
        'Yes Bank was reconstructed under an RBI moratorium and is typed as an episode rather than a shock, because the record’s subject is the state’s response and not the failure. The privatisation programme announced in February 2021 is the topic’s second record scored failed: five years on, no public sector bank has been privatised, and the IDBI sale — where the government’s holding is 30.48 per cent and LIC’s 30.24 — is still advancing rather than done. Underneath both, the recapitalisation of the previous period delivered on the limb it is scored partly for: public-sector banks swung from an aggregate loss of about ₹85,390 crore in FY2017-18 to profit.',
      from: ['L-0028', 'L-0030', 'L-0026'],
    },
    {
      years: '2023 — today',
      heading: 'The composition of credit changed, and the next accounting change is not yet due',
      body:
        'What is contested here is where the credit went. The RBI raised risk weights on unsecured consumer credit from 100 to 125 per cent in November 2023 and added 25 points on lending to NBFCs, rolling part of it back in February 2025 — a supervisor acting on a shift it had identified, with the readings differing on whether the shift is a risk or a normalisation. The Expected Credit Loss transition is entered and announces no date this record can hold it to. Recovery through the Code continues to weaken: cumulative realisation stands at 30.56 per cent of admitted claims in March 2026, against 32.76 a year earlier and around 45 in the early years.',
      from: ['L-0031', 'L-0033', 'L-0024'],
    },
  ],

  poverty: [
    {
      years: '2004 — today',
      heading: 'The last official headcount was measured for 2011-12, and everything since is measured on something else',
      body:
        'India’s last official poverty headcount was measured for 2011-12 on the Tendulkar methodology, and the published series ends there. Nothing comparable has been published since, so there is no line to draw across the period this instrument covers and none is drawn. This topic is small because of that, not because poverty is a small subject — three ledger records and two series, one of which is the headcount that stopped. Doubling farmers’ income by 2022 is scored failed, and the reasoning turns on the same absence: the verdict rests on the trajectory because the terminal year does not exist. The two Situation Assessment Surveys give ₹6,426 a month in 2012-13 and ₹10,218 in 2018-19 — about 59 per cent nominal and roughly 16 real, with net crop receipts up 22.6 per cent nominal — and the survey has not been repeated since 2018-19, so 2022 was never measured. The multidimensional poverty exit claim is contested for a related reason: it rests on a different index with its own cut-offs, and what an exit from it means is the dispute rather than the arithmetic. Free foodgrain under PMGKAY sits between them, scored partly on the NFSA exclusion.',
      from: ['L-0067', 'L-0043', 'L-0038'],
    },
  ],

  federalism: [
    {
      years: '2014 — 2016',
      heading: 'The states won a bigger share of a pool that was getting smaller',
      body:
        'Two movements ran in opposite directions and were announced years apart by different bodies, which is why almost nobody holds them together. The Fourteenth Finance Commission raised the states’ share of the divisible pool from 32 to 42 per cent and it stayed there for the whole award — the single record in this topic scored worked, and one of very few anywhere in this instrument. At the same time the divisible pool itself shrank, from 89.1 per cent of gross tax revenue in 2014-15 to a 74-80 per cent range, because cesses and surcharges are levied outside it and are not shared. Forty-two per cent of a smaller thing can be less than thirty-two per cent of a bigger one. The Sixteenth Finance Commission holds both ends in one sentence at para 7.67 — cesses and surcharges having cut the pool from 89.1 per cent of gross tax revenue to a 74-80 per cent range, it finds there is no room for cutting the states’ share in it — but it sets no figure for that share beside the pool’s, and no source retrieved here computes the joint effect. CORRECTED 13 August 2026: this clause read “and no document sets the two numbers side by side”, which is a claim about what exists rather than about what the sources contain, and L-0150 — already cited by this period — quotes the document that comes closest to falsifying it. Underneath, the cesses were not reaching the funds they were levied for: 35 cesses collected ₹2,74,592 crore in FY2018-19 against ₹1,64,322 crore transferred, a record scored failed.',
      from: ['L-0151', 'L-0150', 'L-0156'],
    },
    {
      years: '2017 — 2019',
      heading: 'One tax, a guarantee priced above any defensible projection, and an arbiter never built',
      body:
        'GST began on 1 July 2017 and is scored partly. The compensation guarantee written to make it acceptable — 14 per cent growth on a 2015-16 base — is contested, and the record is precise about why: the rate was deliberately set above any defensible projection of nominal growth, so the shortfall it produced was arithmetic rather than misfortune. Article 279A(11) requires the Council to establish a mechanism for adjudicating disputes between the Union and the states. It has never been constituted, through repeated requests minuted at the 37th, 38th and 39th meetings, which is why that record is scored failed against a duty imposed on the Council rather than one it announced. In the same period the Union withheld GST transaction data from its own constitutional auditor.',
      from: ['L-0012', 'L-0158', 'L-0162', 'L-0172'],
    },
    {
      years: '2020 — 2022',
      heading: 'The rupture, and a cess that outlived the thing it was created to fund',
      body:
        'The compensation shortfall of 2020 produced the Attorney-General’s opinion and the two-bucket split, and it is contested here rather than settled. What followed is cleaner: the guarantee ended on 30 June 2022 and the cess did not — it continues, servicing about ₹2.69 lakh crore of principal and ₹51,561 crore of interest on the borrowing that covered the shortfall, so an instrument created to fund a guarantee now funds the debt raised because the guarantee was unfunded. Separately, 42 became 41: the Fifteenth Finance Commission adjusted for Jammu and Kashmir and Ladakh leaving the states, keeping the balance broadly equivalent for the remaining twenty-eight. And money stopped moving to particular states — centrally sponsored scheme releases to West Bengal fell 67 per cent, and MGNREGA funds were halted under section 27.',
      from: ['L-0159', 'L-0160', 'L-0152', 'L-0178', 'L-0168'],
    },
    {
      years: '2023 — today',
      heading: 'Three numbers for the same money, and the next award is not yet due',
      body:
        'What this topic now records most often is that the same quantity has more than one official value. Released, received and passed on are three numbers for one transfer and only one of them is audited. Asked what cesses and surcharges come to, the Union has given Parliament three different answers — the Department of Economic Affairs putting surcharge at 1.50 per cent of gross tax revenue for FY2021-22 in 2023, and the Department of Revenue giving a different figure for the same year in 2026. The most-quoted number in Indian fiscal argument — what a state gets back for every rupee it contributes — is entered as not collected, because the Union says consistently that it does not compile it. The Sixteenth Finance Commission has reported and is scored too-early, which is a statement about the clock.',
      from: ['L-0174', 'L-0175', 'L-0183', 'L-0153'],
    },
  ],

  foreign: [
    {
      years: '2013 — 2016',
      heading: 'Two inherited episodes, and the one target here that fell due and was missed',
      body:
        'The area opens on two records entered as baseline context rather than as anything announced — the Depsang incursion and the Khobragade episode — against which what follows is read. Make in India is the one commitment in this topic with a number and a date: a 25 per cent manufacturing share of GDP, scored failed. The 2016 Rafale agreement bought 36 aircraft off the shelf and dropped what the earlier tender had carried, and is contested on what the comparison between the two is worth. Half of this topic announces nothing that can be scored at all — 21 of its 42 records take no-objective — because most of what is entered is the external environment acting on India, or a disagreement about what a figure measures.',
      from: ['L-0009', 'L-0008', 'L-0016', 'L-0203'],
    },
    {
      years: '2017 — 2019',
      heading: 'Arrangements both governments know and neither publishes',
      body:
        'The S-400 is the clearest case of a shape this topic produces repeatedly. India has not been sanctioned under CAATSA and no waiver has been published either, so the absence of a sanction is not evidence of a decision. The delivery schedule exists and both governments hold it: the Russian side withheld it on an identifiable refusal and the Indian side simply has not published it, which are two different absences and are recorded separately. Neither is a dispute about a figure, because no figure was offered. The RCEP withdrawal of 2019 is contested on a counterfactual — what trade under the agreement would have looked like — and no observation of that exists for anyone.',
      from: ['L-0199', 'L-0202', 'L-0018'],
    },
    {
      years: '2020 — 2023',
      heading: 'One trade flow, two official values, and neither side is wrong',
      body:
        'The India-China merchandise deficit has two values because both governments publish it and they do not agree, and this instrument carries both rather than picking or averaging. That is a differentFacts pair: the same quantity, the same period, two instruments. It is not the same thing as calendar 2025, where there is an Indian figure and no Chinese one — one side publishing and the other not is a single-sided absence and not a pair, and the two are filed differently on purpose. Beside them, three quantities are called indigenisation and only one has a defined formula, and emergency procurement is scored partly against a stated clock.',
      from: ['L-0190', 'L-0191', 'L-0198', 'L-0200'],
    },
    {
      years: '2024 — today',
      heading: 'Where the independent evidence comes from is the other side',
      body:
        'Tariffs arrived from outside and are entered as facts about the external environment: a reciprocal rate stacking with a Russian-oil tranche to 50 per cent until an Executive Order of February 2026, and duties whose legal authority is itself disputed. Four trade agreements are concluded or in force with commitments that have not fallen due, scored too-early. What makes this topic unusual is where its strongest evidence sits. Nine records here cite a foreign government primary — the tier this instrument had to create because a non-Indian national government is neither Indian official nor multilateral — and on the independence test a counterparty’s own ministry is independent of the Indian body being assessed in a way that an Indian release cannot be. Punatsangchhu-II is the case: two Indian releases describe the partnership, and it is the Royal Government of Bhutan’s own energy ministry that establishes the commissioning date the verdict turns on. Where the other side publishes, the record gets independent evidence; where it does not — half the neighbourhood does not report its trade — it gets a named absence instead.',
      from: ['L-0184', 'L-0204', 'L-0207', 'L-0193'],
    },
  ],

  governance: [
    {
      years: '2010 — 2016',
      heading: 'The largest topic in the corpus, and the one with the least to count',
      body:
        'This topic holds 110 ledger records against 131 published observations — the widest gap in the instrument between things written about and things counted. That is a fact about what governance contains rather than a reticence about scoring it. Only 17 per cent of these records are reforms; 72 per cent are episodes or institutional facts — a court ruling, a commission wound up, a scrutiny practice changing — and an episode announces no target that a later document can be held against. Across the corpus the share of reforms in a topic predicts its evaluative rate closely, and governance sits where that relationship says it should. An empty verdict column here means there was nothing announced to score, not that this record declined to look. What the period does record is a scrutiny practice thinning: bills referred to Parliamentary Standing Committees fell from 71 per cent in the 15th Lok Sabha to 25 in the 16th and about 16 in the 17th, which held 274 sittings and never elected a Deputy Speaker; Union audit reports tabled by the CAG fell from a 2015 peak of 55 to 14 in 2020. The NJAC was struck down in 2015 and the Memorandum of Procedure it was to replace has not been settled since.',
      from: ['L-0087', 'L-0089', 'L-0084'],
    },
    {
      years: '2017 — 2019',
      heading: 'Enforcement grew fast, and the ratio between cases and convictions is the finding',
      body:
        'Two enforcement statutes carry the clearest numbers in this topic and both are contested rather than scored, because what the numbers mean is the dispute. Under the Prevention of Money Laundering Act the Enforcement Directorate initiated 5,892 cases between January 2015 and June 2025 and secured 15 convictions across eight orders. Under the UAPA, 8,947 persons were arrested over 2018 to 2022 with a published conviction rate running between 18.2 and 39.7 per cent on a completed-trial basis — and the two denominators are not the same thing, which is why the record carries both rather than a rate. Electoral bonds were introduced through a Finance Act as a Money Bill in 2017, amending five other statutes, and are scored failed. The RTI Amendment of 2019 moved Information Commissioners’ tenure and salary from statute into central government rules.',
      from: ['L-0074', 'L-0083', 'L-0077', 'L-0085'],
    },
    {
      years: '2020 — 2022',
      heading: 'The operative check in this period is a court, and it does not always hold',
      body:
        'Where something was tested in these years it was usually tested in litigation rather than in Parliament. The Supreme Court upheld the PMLA’s search, attachment, reverse burden and twin bail conditions in July 2022, which settled the architecture the previous period’s numbers run through. It kept sedition in abeyance in May 2022 and recorded cases fell from 76 in 2021 to 20 in 2022, before the section was removed from the penal code and re-enacted in altered form. Internet shutdowns are scored partly against the compliance the Court required in Anuradha Bhasin, and the Union keeps no count of them because police is a State subject. The three farm laws are the corpus’s only record scored reversed: passed, protested, repealed.',
      from: ['L-0075', 'L-0082', 'L-0081', 'L-0066'],
    },
    {
      years: '2023 — today',
      heading: 'Struck down, re-enacted, and the appointment question left open',
      body:
        'The pattern of this period is a measure struck down and the ground reoccupied. The IT Rules fact-check unit was struck down and is scored failed; electoral bonds were struck down in 2024, seven years after introduction. Where the Court directed a process for appointing Election Commissioners — a panel of the Prime Minister, the Leader of the Opposition and the Chief Justice, until Parliament legislated — Parliament legislated differently, and that record is contested. The Delhi services holding of a Constitution Bench was overturned by statute in eight days. One record here is entered as awaiting adjudication rather than scored: the DPDP Act’s amendment to section 8(1)(j) of the RTI Act, whose effect on the exemption is before a court.',
      from: ['L-0080', 'L-0077', 'L-0088', 'L-0165', 'L-0086'],
    },
  ],

  defence: [
    {
      years: '2013 — 2018',
      heading: 'One word, several quantities, and no target behind any of them',
      body:
        'This domain is armed conflict and counter-insurgency, not procurement — acquisition files under macro and indigenisation under foreign — and in this corpus that means Jammu and Kashmir. Nine of its ten records are also Kashmir records and all thirteen of its series are J&K conflict counts; the tenth is the Depsang incursion of 2013, entered as baseline context and filed under foreign as well. Nothing here is scored against an announced target because nothing here announces one: five records take no-objective, four are contested, one is baseline context, and not a single verdict is evaluative. What the records are about is the counting. Infiltration is three different quantities published under one word — attempts, net estimated infiltration, and a third — with no target attached to any. The MHA count of civilians killed to 31 July 2016 has a boundary that decides the number, and the boundary is not stated where the number is. Local recruitment into militancy is the quantity most often cited and the one least clearly defined.',
      from: ['L-0009', 'L-0119', 'L-0113', 'L-0117'],
    },
    {
      years: '2019 — 2020',
      heading: 'Two findings established against the state’s own account, by the state’s own bodies',
      body:
        'Whether militancy declined after August 2019 is contested here, and the reason is that the answer depends on which of several published series is read: the corpus carries three civilians-killed series on three bases, two security-forces-killed series from two publishers, and two terrorist-incident series that do not cover the same thing. Against that, two records in this period are unusually well established, and both were established from inside. Amshipora was a staged encounter and the Army itself established it, through its own summary of evidence. The burial of encounter dead away from their home districts is documented, and who declares a body unclaimed is the contested part rather than whether the practice occurred.',
      from: ['L-0110', 'L-0115', 'L-0116'],
    },
    {
      years: '2021 — today',
      heading: 'The column changed meaning, and both readings stay in the record',
      body:
        'Three records in this period are about a published series ceasing to mean what it meant. MHA’s ‘Civilians killed’ column changed basis in 2023 and the earlier and later figures are not the same measurement, so both are carried rather than joined. The J&K incident count has three published figures for 2018 alone. The cumulative thirty-year conflict toll rests on two different populations and the totals in circulation do not say which. None of these is a dispute about whether a number is right; each is a dispute about what the number counts, which is why they take no-objective rather than a verdict.',
      from: ['L-0112', 'L-0111', 'L-0120'],
    },
  ],

  kashmir: [
    {
      years: '2009 — 2016',
      heading: 'A count that already did not fit the thing it counted',
      body:
        'The inherited record is of quantities that resist being counted and bodies that tried. Thirteen years of detenu counts arrive in one undifferentiated cell. The State Human Rights Commission’s unmarked-graves report is entered as baseline context. Two bodies review the same detention orders and one confirms almost all of them. The clearest case is the pellet record: MHA published a month-by-month table of seventeen protesters killed over three calendar years and refused the injury count, the munitions expended and the metallurgy under a single national-security exemption on the same afternoon. What is known about the injuries was measured by government doctors and published in a peer-reviewed journal — 777 patients with pellet-related ocular injuries in one Srinagar hospital in four months, 82.4 per cent of eyes at counting-fingers vision or worse. Twenty-six days before the Union refused, the Jammu and Kashmir Chief Minister had given the Legislative Assembly a bounded injury aggregate. Both facts are on the record and neither cancels the other.',
      from: ['L-0135', 'L-0004', 'L-0132', 'L-0114'],
    },
    {
      years: '2017 — July 2019',
      heading: 'The routes by which a figure could be extracted, closing one at a time',
      body:
        'Under section 7 of the AFSPA as it applied to J&K, fifty sanction requests were made over three decades and none was granted; both the ministry and army headquarters have attested that no written criteria for granting or refusing exist. Two J&K security quantities lost their only legislative route in 2018 when the assembly was suspended — the route that had produced the pellet aggregate. The power to hold a J&K detenu anywhere in India creates an information barrier of its own and is entered as awaiting adjudication. Internet shutdowns are scored partly against the compliance the Supreme Court required in Anuradha Bhasin, and they are one of the few things in this topic with a verdict at all.',
      from: ['L-0122', 'L-0123', 'L-0134', 'L-0081'],
    },
    {
      years: 'August 2019 — 2020',
      heading: 'The bodies that could have produced an independent count were wound up',
      body:
        'The constitutional change of 5 and 6 August 2019 is contested on the mechanism — who supplied the concurrence, and in what capacity. What followed is a matter of record and is the centre of this topic. Seven commissions were wound up by seven consecutive orders on one day. The State Human Rights Commission, which had produced the only severity taxonomy in existence, was abolished, and the body said to replace it may not investigate the CRPF at all. Deaths in Army and central-force custody have no cell in any official form. The instruments that had ever named a perpetrator for a civilian death are gone. Ten official figures across five different objects were given for the August 2019 detentions, and four defensible durations exist for the communications blackout. Permanent residence was replaced by domicile and the land law was repealed by executive order five days before the power to do so lapsed.',
      from: ['L-0125', 'L-0149', 'L-0148', 'L-0121', 'L-0133', 'L-0144', 'L-0145'],
    },
    {
      years: '2021 — today',
      heading: 'An undertaking with no date, and a publisher that no longer exists',
      body:
        'The undertaking to restore statehood has produced six statements over seven years and no date, and is entered as awaiting adjudication rather than scored. Delimitation produced one Commission table and three different readings of it. Turnout in the 2024 election has four official values for one quantity. The Review Committee’s findings were refused as exempt and then ordered disclosed. The 2024 Suspension Rules are narrow, timed and reason-bearing, and are too-early — the first thing in this topic for some years that could be tested later against its own terms. And the shutdown series ends where it does because the venue in which J&K published its suspension orders no longer exists, which is a fact about the publisher and not about the shutdowns.',
      from: ['L-0127', 'L-0141', 'L-0137', 'L-0142', 'L-0139', 'L-0140'],
    },
  ],
};

/**
 * THE EVIDENCE GRADE, WHERE IT IS THE SUBJECT RATHER THAN A CAVEAT UNDER ONE.
 *
 * Two areas are published almost entirely as approximations, and in both the reason is the
 * publication channel rather than a weakness in this record. Saying so at the top of the page is
 * the difference between information and an apology, and a topic that buries it under a chart has
 * hidden the most useful thing it knows about itself.
 *
 * THE COUNTS ARE NOT WRITTEN HERE. The page derives them from the series it is rendering, so a
 * sentence about the evidence cannot go stale against the evidence — which is the failure mode this
 * repository has already paid for in the one section written to prevent it.
 *
 * Only six areas carry a note, and that is the point: an evidence line on all fourteen would be
 * boilerplate, and boilerplate is read past. **`macro`, `education`, `environment`,
 * `human-development`, `poverty`, `foreign`, `governance` and `defence` deliberately have none** — their grades are mixed and unremarkable, and a
 * note saying so would say nothing.
 *
 * **`federalism` IS THE ONLY NOTE EXPLAINING A HIGH GRADE, AND THAT IS WHY IT EXISTS.** At 100 per
 * cent it would be easy to argue no note is needed — nothing looks wrong. It is here because the
 * grade invites a false inference in the other direction: a reader who sees *fully verified* may
 * take the area to be settled, when its problem is comprehension rather than documentation. **A
 * note earns its place by stopping a misreading, and a misreading can run either way.**
 *
 * **`kashmir` TAKES ONE AND IT EXPLAINS AN ABSENCE OF GRADE RATHER THAN A GRADE.** It files zero
 * series of its own, so a reader meeting 46 records and no series column would take the area for
 * unmeasured — the strongest available misreading of the page, and one the page itself produces.
 * **The note says where its 184 observations actually live**, across thirty series read through its
 * lens and filed under governance, defence and federalism. The derived line beside it counts that
 * lensed set for the same reason; counting the topic's own series would have printed *0 of 0* and
 * asserted the misreading the note exists to stop.
 *
 * **`defence` WAS TESTED AND TAKES NONE.** 83 per cent over 98 observations is unremarkable. Its
 * distinctive fact is that several of its series count the SAME quantity on different bases — three
 * civilians-killed, two security-forces-killed, two incident series — **which is a comparability
 * fact, not a grade one**, and it is what its periods are about.
 *
 * **`governance` WAS TESTED AND TAKES NONE.** At 76 per cent over 131 observations its grade is
 * unremarkable. Its distinctive fact is the RECORD-TO-COUNT GAP — 110 records against 131
 * observations, the widest in the corpus — **which is not a fact about the evidence grade at all**,
 * and it is the first thing its periods say.
 *
 * **`foreign` WAS TESTED AND TAKES NONE.** At 42 per cent over 26 observations its grade is
 * unremarkable and the n is small. Its distinctive evidentiary fact is not the grade but WHERE the
 * evidence comes from — nine records rest on a foreign government primary, and on the independence
 * test a counterparty's ministry is independent of the Indian body in a way an Indian release is
 * not. **That is a period subject, and it is in the periods.**
 *
 * **`human-development` WAS TESTED AGAINST THIS RULE AND FAILED IT, WHICH IS WHY THE DECISION IS
 * WRITTEN DOWN RATHER THAN LEFT AS AN OMISSION.** It is 33 per cent verified — mixed, and
 * unremarkable beside infrastructure's nought. What IS distinctive about it is cadence and
 * cross-filing: five of its seven series carry two points or fewer because they are survey rounds,
 * and five of its eight records are mainly about another topic. **Neither is a fact about the
 * evidence GRADE**, so both belong in the period prose, where they are, and not in a note whose
 * whole job is to explain a grade.
 */
export const DOMAIN_EVIDENCE: Partial<Record<Domain, string>> = {
  infrastructure:
    'Almost nothing in this topic is published exactly, and that is a fact about how India publishes rather than a gap in this record. These figures come from ministry dashboards, scheme reporting and annual reports — running totals, revised as they run — and not from closed statistical series. A reader arriving to ask whether things were built will find that a great deal was, and that the published quantity is usually a progress figure rather than a final one. Approximate by publication, not by omission.',
  banking:
    'Three per cent of the observations here are verified, the lowest share in the corpus, and the reason is the route the figures travel rather than their quality. Ten of the twenty-two series in this topic are cited to an RBI figure RELAYED — through a PIB release, an RTI response or a Parliamentary answer — and only three are cited directly to an RBI publication, one of them the Financial Stability Report. Under this instrument’s mirror rule a relayed figure is an account of the release and not the release, so it is graded approximate however sound the underlying number is. That is a statement about what this record holds, not about the RBI: the figures are published, and what is mostly held here is somebody else’s report of them.',
  federalism:
    'Every observation in this topic is verified — 236 of 236, the only topic in the corpus at 100 per cent — and the reason is the class of document these figures come from. Finance Commission reports, CAG certificates and Union Budget annexes are statutory publications with fixed formats and numbered tables; they exist to be cited, and a figure taken from one can be pointed at precisely. Nothing else in this instrument is published that way. THE NOTE IS HERE TO STOP A READING RATHER THAN TO EXPLAIN A WEAKNESS: verified means the figure is the one the document gives, and it does not mean the thing is understood or agreed. This is the best-documented topic in the corpus and the one whose central movements — a rising share of a shrinking pool — almost nobody could state. A high grade is not a settled question.',
  kashmir:
    'Nothing is filed under Kashmir as a topic, and a reader meeting a page of 46 records with no indicators of its own would reasonably take it for unmeasured. It is not. Thirty indicators are read through Kashmir as a lens, and each is filed under the topic it is mainly about — fifteen under governance, thirteen under defence, two under federalism — because a count of detentions or encounters or devolution is about those things, and Jammu and Kashmir is the territory it counts them over. THE FIGURES BESIDE THIS NOTE ARE THOSE THIRTY. What Kashmir holds in its own right is records rather than counts: institutional facts, episodes, and disputes about what a published quantity includes. Most of those counts come from the state — MHA annual reports above all. Where a count bears AGAINST the state, it tends to come from somewhere else: a hospital ophthalmology series in a peer-reviewed journal, a civil-society register, a commission that has since been wound up.',
  welfare:
    'The low verified share here is a fact about what a scheme publishes rather than about how well it is run. Welfare schemes report a CUMULATIVE RUNNING TOTAL — houses sanctioned to date, cards created to date, connections released to date — which is one number republished as it grows, not a series that can be differenced into annual figures. Nine of the nineteen series in this topic therefore carry a single observation, against four of twenty-four in infrastructure and three of twenty-three in employment, and six say cumulative in their own title or note. A cumulative total is a real quantity and it answers a different question from the one a reader usually brings: it says how much has been handed out since the scheme began, and not how much was handed out last year.',
  employment:
    'No observation in this topic is verified, and the reason is that India measures employment by sample survey. A survey estimate carries a sampling error by construction, so an approximate status here is the honest grade for a correctly published figure and not a mark against it. What does bear on comparability is that the instrument changed twice — the Employment-Unemployment Survey gave way to the Periodic Labour Force Survey at FY2017-18, and the PLFS was redesigned again from January 2025 — so the series carries two seams and no line is drawn across either.',
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
  macro: 'Prices, growth, the deficit and the tax base — and more basis changes than any other topic, which is why comparisons here carry seams.',
  banking: 'The bad-loan cycle and its cleanup, where the headline ratio falls for three different reasons at once and the write-offs are the largest of them.',
  employment: 'Participation and its composition. Almost every figure here is an approximation, and the survey that produces them changed in 2017.',
  poverty: 'India’s last official poverty headcount was measured for 2011-12. The area is small because nothing comparable has been published since.',
  'human-development': 'Health, sanitation and nutrition, measured mostly by survey rounds years apart rather than by an annual series.',
  infrastructure: 'Roads, power and housing — announced in targets and reported in progress, with completion published far more often than use.',
  welfare: 'Delivery schemes and support prices, where sanctioned, released and reaching are three different numbers and rarely all three are published.',
  education: 'Enrolment, spending and learning — the richest topic for measurement disputes, and the one where two national instruments disagree about whether children can read.',
  governance: 'Institutions, appointments, enforcement and the courts. The largest topic by record count and the one with the fewest announced targets to score.',
  kashmir: 'A lens rather than a topic. Nothing is filed here: its thirty indicators are filed under defence, governance and federalism and are read through Kashmir as well, which is why the count below separates the two. Its figures come largely from courts, hospitals and commissions.',
  federalism: 'Who collects and who spends. Every figure here has two defensible values depending on which side of the transfer is doing the accounting.',
  foreign: 'Trade, agreements and the external account, where the counterparty’s figure and India’s own frequently do not agree.',
  defence: 'Procurement, indigenisation and armed conflict — ten records, few of them announcing anything a later document can be held against.',
  environment: 'Energy capacity, generation and emissions. Well measured and definitionally treacherous: the same word names three different shares.',
};
