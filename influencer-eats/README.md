# influencer-eats — Step 1: the influencer scan

Restaurant discovery scoped to a roster of food influencers, for Dubai. This directory holds
**step 1 of the handoff plan only**: read every account the user follows and decide which are
UAE food influencers eligible for Meta's `business_discovery`.

Nothing here calls the Meta Graph API, stores restaurant data, or touches the app. Those are
steps 2 onward.

## The problem this closes

The previous pass checked **~40 profiles**, drawn from a **129-handle keyword shortlist**, out of
**1,288 followed accounts** — and the shortlist was built by matching food words in *handles*.
An influencer whose handle carries no food word was invisible to that method, and would never
show up in its output as a gap. The handoff names three plausible misses: `bocasu_`, `un.sul`,
`galousti`.

This scan checks all 1,288, classifies on **profile text rather than handle**, and proves the
coverage: every scanned handle lands in exactly one bucket, and the buckets are asserted to sum
to the number scanned. A report that covers 1,200 of 1,288 looks identical to one that covers
all of them, so the totals are checked rather than trusted.

## Running it

You need a logged-in Instagram session — `web_profile_info` returns 401/403 to anonymous
callers. Two paths, same output file, same field names (there is a test that holds them equal).

### Path A — the browser console (recommended)

Borrows the session in place. No credential is copied to disk.

1. Open <https://www.instagram.com/> in a logged-in tab, DevTools → Console.
2. Paste all of `scan/browser_scan.js`, press Enter.
3. `igScan.pickFile()` → choose your `following.json`
4. `igScan.run()` → ~7–9 minutes for 1,288 handles
5. `igScan.save()` → downloads `profiles.jsonl`

Resumable in the same tab: `igScan.run()` again continues where it stopped. It does **not**
survive navigating away, so `igScan.save()` before closing the tab.

### Path B — Python

```bash
pip install -r scan/requirements.txt
export IG_COOKIE='sessionid=...; csrftoken=...; ds_user_id=...'   # DevTools → Application → Cookies
cd scan
python3 scan_following.py --following ../data/following.json --out ../data/profiles.jsonl --dry-run
python3 scan_following.py --following ../data/following.json --out ../data/profiles.jsonl
```

Resumable across runs — the output is append-only JSONL keyed by handle and a re-run skips what
is already there. `--retry-failed` re-queues handles whose previous attempt errored.

### Then classify

```bash
python3 classify.py --profiles ../data/profiles.jsonl --out-dir ../data/report
```

Writes `candidate.csv`, `review.csv`, `venue.csv`, `excluded.csv`, `failed.csv`, `near_miss.csv`,
`all.csv` and `summary.md`. Exit code is non-zero if the roster recall check fails.

## Reading the output

| bucket | meaning | what to do |
|---|---|---|
| `candidate` | food + UAE + professional account | add to the roster |
| `review` | one signal present, one missing — no geography stated, recipe/nutrition vocabulary, or not a professional account | **read these by hand**, tens of rows |
| `venue` | a place, not an endorser | feeds `places`; never `influencers` |
| `excluded` | no food signal, or food with an explicit non-UAE geography | nothing |
| `failed` | the fetch did not succeed | re-run for these; never counted as checked |

Plus `near_miss.csv`, a **cross-cut over `excluded`** (not a bucket, so the totals still
reconcile): professional accounts with a UAE marker and no food word anywhere. This is the one
shape no term list can catch — the handoff records `varietyfoodie`'s bio as *"Dubai Licensed
Vlogger | Media Permit 4957719"*, which names the city and a permit number and never says food.
Skim it.

Every row carries the bio and the exact terms that were matched, so a wrong bucket traces to a
term in `lexicon.py` rather than to a judgement call you cannot see.

## Design notes worth knowing before editing

**The username is deliberately not matched.** Handle-keyword screening is the method that
produced the gap being fixed here. Matching runs over `full_name + biography + category_name +
business_category_name` and the city in `business_address_json`. Leaving the handle in the
matched text would restore the old blind spot while appearing to have replaced it.

**Ordering in `classify()` is load-bearing.** A Dubai restaurant matches food *and* geography
*and* is professional; only the venue check coming first keeps it out of the roster. A bio
reading "the best Indian food in Dubai" matches both `india` and `dubai`; only checking UAE
terms before foreign ones keeps it in. Both cases have tests.

**Per-profile failures are recorded; run-level failures stop the run.** A 404 or the known
Instagram asset bug becomes a record with `error` set, so the handle is still accounted for. An
expired cookie or a throttle raises and halts — continuing would turn every remaining handle
into a false "checked and found nothing".

**Instagram serves throttling as HTTP 200** with "Please wait a few minutes before you try
again." Both clients check that wording *before* the success branch. Reading it as a malformed
200 makes it a non-fatal error, and the scan then runs the rest of the list into a wall.

**`category_name` is Instagram's own classifier** and the handoff is right that it is the best
venue signal available — "Restaurant", "Dessert shop", "Blogger", "Reel creator" come straight
off the profile. It is treated as decisive for venues, with a creator-category override so an
influencer writing "book now" in a paid post is not reclassified as a restaurant.

## Tests

```bash
cd scan && python3 -m unittest discover -s tests -t .
```

61 tests, no network. Three are worth knowing about:

- **`test_shape_parity`** reads the field list out of `browser_scan.js` and compares it to the
  Python `Profile`. If they drift, `classify.py` reads the missing fields as empty and reports a
  1,288-account scan that found no food accounts — reconciling perfectly while being entirely
  wrong. Verified to fail on real drift, not just to pass.
- **`test_roster_recall_is_not_proof`** stops the roster fixtures being mistaken for evidence.
  See the caveat below.
- **`test_reconcile_raises_when_a_profile_is_dropped`** — the totals check fails rather than
  warns.

## What is verified, and what is not

**Verified in this session:** the export parses to exactly 1,288 unique handles; the decision
rules behave as specified against text of a given shape; the two clients emit identical record
shapes; the classifier's totals reconcile; the whole pipeline runs end to end on synthetic
profiles.

**Not verified:** any real account's classification. `www.instagram.com` is blocked by the
network policy of the environment this was written in (403 on CONNECT, confirmed from two
independent clients), so no profile was retrieved. The roster fixtures in
`tests/test_classify.py` use bio text quoted from the handoff table, and a **constructed
`full_name`** — which was never recorded there, and which for three of the seven is what carries
the food signal. Strip it and they fall out of `candidate`; `test_roster_recall_is_not_proof`
asserts exactly that, so the caveat cannot quietly stop being true.

So the first real run is also the first real test. `classify.py` exits non-zero if any of the
seven known handles fails to land in `candidate` — if that fires, the classifier is wrong, not
the roster.

## Files

```
data/following.json     your export — GITIGNORED, see below
data/profiles.jsonl     scan output — GITIGNORED
data/report/            classification output — GITIGNORED
scan/ig_client.py       IG web client; PoliteSession is reused by the ingestion worker
scan/scan_following.py  CLI: export -> profiles.jsonl
scan/lexicon.py         the term lists, and why each one is there
scan/classify.py        bucketing, reconciliation, reports
scan/browser_scan.js    console path, same output shape
scan/tests/             61 tests, no network
```

## ⚠️ This directory sits in a public repository

`neo999-cyber/india_government` is public, and it is also an unrelated project — a research
instrument on Indian government policy. Two consequences:

1. **`following.json` and every scan output are gitignored and must stay that way.** The export
   is a personal social graph: 1,288 accounts by handle, with the timestamp each was followed.
   The scan output adds the bio, follower count and category of all of them. None of it is
   needed in git — the code reproduces it from an export held locally. A cookie file is
   gitignored for the same reason, more urgently.
2. **This is not where the project should live.** The handoff (§9) is explicit that building
   belongs on the personal laptop under `~/influencer-eats`, for clean IP provenance. This tree
   is self-contained and touches nothing else in the repository, so `cp -r influencer-eats
   ~/influencer-eats` moves it with no untangling. Worth doing before step 2, which is where API
   keys and a Meta app registration start to accumulate.
