# Share cards — scoping report, 2026-08-11

**Report before building, as instructed. Nothing here is built.** Three findings, one of which
kills the obvious mechanism and one of which is a rule conflict that has to be settled before any
card exists.

---

## 1. THE MECHANISM. The obvious one does not work here, and this was tested rather than assumed.

**`next/og`'s `ImageResponse` is unavailable under `output: 'export'`.** Probed at `99754d0` by
adding a minimal `app/data/opengraph-image.tsx` and running the build:

```
Error: Failed to collect page data for /data/opengraph-image
  at Object.<anonymous> (.next/server/app/data/opengraph-image/route.js:5:3)
```

`ImageResponse` is a runtime API. A static export has no runtime, so the route cannot be collected
at all — it does not degrade, it fails the build. The probe was removed; the tree is clean.

**The four remaining options, with what each costs.**

| mechanism | works for an unfurler | cost | verdict |
|---|---|---|---|
| `next/og` at build time | — | — | **UNAVAILABLE. Tested, fails the build.** |
| Satori + resvg in a build script | yes, real PNGs | two new dependencies, a font pipeline, ~700 KB of WASM | viable, heaviest |
| Static SVG generated at build | **no** | none — string templating, palette already tokenised | **rejected: WhatsApp, Slack and Twitter do not render SVG in `og:image`.** The one job it has, it cannot do |
| Client-side canvas | **no** — unfurlers run no JS | small | only serves a *download this card* button, not sharing |
| **Text-only OG tags, no image** | yes, everywhere | **none** | **the recommendation — see §3** |

**The recommendation is text-only, and it is not the cheap answer dressed up.** It is the only
option that can carry a caveat, which §3 shows is the binding constraint. If an image is wanted
later, Satori is the mechanism and it can be added without changing the wording model.

---

## 2. WHAT A CARD CARRIES — the six the scope names, and where each comes from

| element | source | note |
|---|---|---|
| one finding | authored per card | never a bare figure — see §3 |
| enough context to prevent misreading | the record's `caveat`, or its absence | the whole difficulty |
| the period | `points[]` first and last, through `periodLabel` | |
| the source | `source.name`, or `sources[0].name` | not the tier: a tier without the ladder misleads |
| a stable URL | the record's own route | already permanent |
| **a visible distinction between an absence and a measured outcome** | `unmeasured[]` present | §5a vocabulary, verbatim |

**The absence vocabulary is not paraphrased for a card.** §5a's table is the corpus's hardest-won
distinction and a card is where it is most likely to be lost: *"The published series ends in
2019."* is not *"No data after 2019."*, and *"Not located."* is not *"Not published."* A card
carrying an absence uses the permitted wording exactly as the record does, or it does not carry
that record.

---

## 3. THE RULE CONFLICT, AND IT IS THE REASON TO SCOPE BEFORE BUILDING

**A card is a fixed frame. A caveat may not be truncated. 128 of 269 series and 103 of 223 ledger
records carry one, the longest at 1,320 characters, median 364.** Six hundred characters will not
sit legibly on a 1200×630 image, and cutting it to fit is precisely what rule 3a forbids — *a
half-read caveat is worse than none, because it looks like the whole of it.*

**Three ways out, and only the third survives.**

1. *Cards only for records with no caveat.* Excludes roughly half the corpus, including every
   record interesting enough to share. Rejected.
2. *Card carries the figure plus a "this record is qualified" marker.* This is truncation wearing a
   badge: the reader has the number and not the qualification, and the badge tells them a
   qualification exists somewhere else. **This is the exact shape of the defect the homepage was
   just corrected for**, where a takeaway reported a rise and the caveat beneath said half of it was
   the denominator. Rejected.
3. **THE CARD STATES A FINDING THAT IS TRUE WITHOUT THE CAVEAT, or it states the qualification
   INSTEAD of the figure.** Not the number plus a warning — a sentence that does not need the
   warning.

**Worked, on the case that prompted this.** A card reading *"Higher-education enrolment: 30% of
18–23s, up from 21% in 2011-12"* would be the site publishing the thing it exists to catch. The
card that is honest and is also the better hook: **"Roughly half the rise in India's higher-education
enrolment ratio is the 18–23 population shrinking, not more students."** Shorter, more interesting,
and it needs no caveat because it *is* the caveat's finding.

**This is why text-only is the recommendation rather than a fallback.** A finding stated that way
is one or two sentences — which an `og:description` carries in full, on every platform, with no
image pipeline and no truncation. The constraint that kills the image also removes the need for it.

---

## 4. ONE THING THE OPERATOR SHOULD DECIDE, BECAUSE IT IS NOT A DESIGN QUESTION

**`vercel.json` serves `X-Robots-Tag: noindex, nofollow` on every route.** Share cards are described
in the scope as the growth mechanic. They will work for a link pasted into WhatsApp, Slack or
Signal, which fetch OG tags directly. They will do nothing for search discovery, because the site
tells every crawler not to index it.

That is not a contradiction to resolve by building differently — it is two settings that were made
at different times for different reasons, and only the operator can say which is intended. **Stated
here rather than quietly assumed either way.**

---

## 5. WHAT BUILDING IT WOULD BE, IF APPROVED

One `generateMetadata` per record route emitting `og:title`, `og:description`, `og:url` and
`twitter:card`, with the description composed by a single shared function so the §5a vocabulary and
the §3 rule live in one place rather than at every call site. **`evaluability-wording`'s lesson
applies**: a gate can bind the literal forbidden phrasings and cannot bind the claim, so the rule in
§3 is a reading owed to a human on every card, and the function's header must say so.

Roughly 670 record routes, no new dependency, no build-time image work, and nothing added to the
gate chain except a wording check if one is wanted.
