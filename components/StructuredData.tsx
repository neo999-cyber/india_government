/**
 * JSON-LD — MACHINE-READABLE IDENTITY FOR A RECORD, AND NOTHING BEYOND WHAT THE CORPUS HOLDS.
 *
 * WHY. A record page is a citable object and, until this shipped, no crawler, reference manager or
 * dataset index could tell that from the HTML. `Dataset` and `CreativeWork` are the two vocabulary
 * terms that describe what these pages actually are.
 *
 * ============================ THE RULE THAT SHAPES IT ========================================
 *
 * **STRUCTURED DATA MAY RESTATE A RELATIONSHIP THE CORPUS HOLDS AND MAY NOT INFER ONE.** This is
 * the causal-edge rejection in another file format, and the temptation is stronger here because
 * schema.org rewards richness and nothing validates the claims. So:
 *
 *   · `citation` — YES. Every entry is an element of the record's own `sources[]`.
 *   · `isPartOf` — YES. The corpus is a real container and membership is a fact.
 *   · `dateModified` — YES, and only from git, which observed it.
 *   · `about` / `sameAs` / `mentions` — **NO.** Each would assert that this record is about some
 *     external entity, or is the same thing as some external page. The corpus holds neither claim,
 *     and a plausible-looking `sameAs` to a Wikipedia article is precisely the model-opinion-as-
 *     evidence shape ruled against twice.
 *   · No `aggregateRating`, no `ratingValue`. `assessment` is a verdict on a stated objective, and
 *     rendering it as a rating turns it into the composite score refused everywhere else — a
 *     scoreboard is not less of a scoreboard for being invisible to the reader.
 *
 * A LEDGER RECORD IS `CreativeWork`, NOT `Article` OR `Report`. Both of those name a genre, and
 * the genre is exactly what this corpus does not claim: a record is neither journalism nor an
 * official report. `CreativeWork` is the honest ancestor. A series IS a `Dataset` — it is a table
 * of observations with a unit, a period and a publisher — and calling it one is a description
 * rather than a claim.
 */
import type { LedgerRecord, ProvenanceRecord, Series } from '@/lib/types';

const SITE = 'https://india-government.vercel.app';
const CORPUS = {
  '@type': 'Dataset',
  name: 'India, On the Record — corpus',
  url: `${SITE}/data/`,
};

/** Serialised into a script tag. Escaped so a `<` inside a record cannot close the element. */
function Ld({ json }: { json: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json).replace(/</g, '\\u003c'),
      }}
    />
  );
}

const cites = (sources: { name: string; url?: string }[] | undefined) =>
  (sources ?? []).map((s) => ({
    '@type': 'CreativeWork',
    name: s.name,
    ...(s.url ? { url: s.url } : {}),
  }));

export function LedgerLd({ record, modified }: { record: LedgerRecord; modified?: string }) {
  return (
    <Ld
      json={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${SITE}/ledger/${record.id}/`,
        identifier: record.id,
        name: record.title,
        abstract: record.summary,
        datePublished: record.date,
        ...(modified ? { dateModified: modified } : {}),
        isPartOf: CORPUS,
        citation: cites(record.sources),
      }}
    />
  );
}

export function ProvenanceLd({ record, modified }: { record: ProvenanceRecord; modified?: string }) {
  return (
    <Ld
      json={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${SITE}/provenance/${record.id}/`,
        identifier: record.id,
        name: record.title,
        ...(modified ? { dateModified: modified } : {}),
        isPartOf: CORPUS,
        citation: cites(record.sources),
      }}
    />
  );
}

export function SeriesLd({ series }: { series: Series }) {
  const periods = series.points.map((p) => p.period).sort();
  return (
    <Ld
      json={{
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': `${SITE}/series/${series.id}/`,
        identifier: series.id,
        name: series.title,
        ...(series.notes ? { description: series.notes } : {}),
        unitText: series.unit,
        ...(periods.length
          ? { temporalCoverage: `${periods[0]}/${periods[periods.length - 1]}` }
          : {}),
        isPartOf: CORPUS,
        ...(series.source?.name
          ? { creator: { '@type': 'Organization', name: series.source.name } }
          : {}),
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: `${SITE}/data/v1/series.json`,
        },
      }}
    />
  );
}

export function CorpusLd() {
  return (
    <Ld
      json={{
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': `${SITE}/data/`,
        name: 'India, On the Record — corpus',
        description:
          "Indicator series, ledger records of discrete reforms and events, measurement-dispute " +
          'records and paired divergent measurements, covering India from a frozen May 2014 ' +
          'baseline through the Modi-era terms.',
        url: `${SITE}/data/`,
        license: `${SITE}/data/`,
        isAccessibleForFree: true,
        distribution: ['ledger', 'series', 'provenance', 'pairs'].map((f) => ({
          '@type': 'DataDownload',
          name: `${f}.json`,
          encodingFormat: 'application/json',
          contentUrl: `${SITE}/data/v1/${f}.json`,
        })),
      }}
    />
  );
}
