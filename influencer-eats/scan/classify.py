"""
Classify scanned profiles into: roster candidate, venue, review, or excluded.

THE PROPERTY THIS MODULE GUARANTEES
    Every scanned handle lands in exactly one bucket, and the bucket counts sum to the number
    of handles scanned. `reconcile()` asserts it and the CLI refuses to write a report that
    fails. The defect step 1 exists to close is a silently short result set — 40 profiles
    checked out of 1,288, with nothing in the output saying so — and a classifier that can
    drop a row on the floor reintroduces exactly that defect one stage later.

THE DECISION IS A SHORTLIST, NOT A VERDICT
    Buckets are ordered by what a human then has to do:

      candidate  — food + UAE + professional + not a venue. Add to the roster.
      review     — one signal present and one missing. A person reads these; there are tens,
                   not hundreds, and each row carries the bio and the matched terms.
      venue      — a place, not an endorser. Feeds `places`, never `influencers`.
      excluded   — no food signal at all, or food with a clear non-UAE geography.
      failed     — the fetch did not succeed. Re-runnable, and never counted as "checked".

    `review` exists because the alternative is tuning the lexicon until the middle disappears,
    which does not remove the uncertainty — it hides it behind terms chosen to fit the accounts
    that happened to be inspected.

WHAT IS MATCHED, AND WHAT IS NOT
    Matching runs over `full_name + biography + category_name + business_category_name`, plus
    the city recorded in `business_address_json` where there is one.

    The USERNAME IS DELIBERATELY NOT MATCHED. Handle-keyword screening is the method that
    produced the coverage gap being fixed here: it found `foodfindsuae` and missed `bocasu_`.
    Reading the profile instead of the handle is the entire point of the exercise, and leaving
    the handle in the matched text would quietly restore the old method's blind spot while
    appearing to have replaced it.
"""

from __future__ import annotations

import csv
import json
import re
from dataclasses import dataclass, field
from typing import Iterable, Optional

import lexicon


BUCKETS = ("candidate", "review", "venue", "excluded", "failed")


def _boundary_pattern(term: str) -> re.Pattern:
    """
    Word-boundary matcher for one term.

    A boundary is attached only where the adjacent character of the TERM is itself a word
    character. `\bu.a.e\b` would never match, because the trailing `.` is not a word character
    and `\b` after it asserts a transition that cannot occur.
    """
    escaped = re.escape(term)
    prefix = r"\b" if term[:1].isalnum() else ""
    suffix = r"\b" if term[-1:].isalnum() else ""
    return re.compile(prefix + escaped + suffix, re.IGNORECASE)


Compiled = list[tuple[str, "re.Pattern[str]"]]


def compile_terms(terms: Iterable[str]) -> Compiled:
    """Compile a term set once, sorted so evidence lists are stable between runs."""
    return [(term, _boundary_pattern(term)) for term in sorted(terms)]


# Compiled once at import, by name. An earlier version cached inside `matched_terms` keyed on a
# label rather than on the terms themselves; a caller passing a different set under a label the
# cache already held silently got the FIRST set back, and the visible symptom was a UAE food
# account classified as having stated no geography. Naming the compiled sets removes the
# possibility rather than documenting it.
FOOD = compile_terms(lexicon.FOOD_TERMS)
UAE = compile_terms(lexicon.UAE_TERMS)
OTHER_GEO = compile_terms(lexicon.OTHER_GEO_TERMS)
RECIPE = compile_terms(lexicon.RECIPE_TERMS)
VENUE = compile_terms(lexicon.VENUE_TERMS)


def matched_terms(text: str, compiled: Compiled) -> list[str]:
    """Return every term from a compiled set that occurs in `text`, as report evidence."""
    return [term for term, pattern in compiled if pattern.search(text)]


@dataclass
class Decision:
    username: str
    bucket: str
    reason: str
    followers: Optional[int] = None
    category: Optional[str] = None
    full_name: str = ""
    biography: str = ""
    is_professional: bool = False
    food_terms: list[str] = field(default_factory=list)
    uae_terms: list[str] = field(default_factory=list)
    other_geo_terms: list[str] = field(default_factory=list)
    recipe_terms: list[str] = field(default_factory=list)
    venue_terms: list[str] = field(default_factory=list)

    @property
    def evidence(self) -> str:
        parts = []
        for label, terms in (
            ("food", self.food_terms), ("uae", self.uae_terms),
            ("othergeo", self.other_geo_terms), ("recipe", self.recipe_terms),
            ("venue", self.venue_terms),
        ):
            if terms:
                parts.append(f"{label}={'|'.join(terms[:6])}")
        return "; ".join(parts)


def _searchable_text(profile: dict) -> str:
    """Assemble the text the lexicons run over. See the module docstring on the username."""
    pieces = [
        profile.get("full_name") or "",
        profile.get("biography") or "",
        profile.get("category_name") or "",
        profile.get("business_category_name") or "",
    ]
    address = profile.get("business_address") or {}
    if isinstance(address, dict):
        for key in ("city_name", "street_address", "region_name"):
            value = address.get(key)
            if isinstance(value, str):
                pieces.append(value)
    return "\n".join(pieces)


def _is_venue_category(category: Optional[str]) -> bool:
    if not category:
        return False
    lowered = category.strip().lower()
    if lowered in lexicon.CREATOR_CATEGORY_EXACT:
        return False
    if lowered in lexicon.VENUE_CATEGORY_EXACT:
        return True
    return any(fragment in lowered for fragment in lexicon.VENUE_CATEGORY_SUBSTRINGS)


def classify(profile: dict) -> Decision:
    """
    Bucket one scanned profile.

    Order is load-bearing and each step says why it comes where it does.
    """
    username = profile.get("username") or "?"
    category = profile.get("category_name")
    text = _searchable_text(profile)

    base = dict(
        username=username,
        followers=profile.get("followers"),
        category=category,
        full_name=profile.get("full_name") or "",
        biography=profile.get("biography") or "",
        is_professional=bool(profile.get("is_professional_account")),
    )

    # 0. A fetch failure is not a classification. It must stay visibly distinct from "checked
    #    and rejected", or a re-runnable gap gets banked as a finished decision.
    if profile.get("error"):
        return Decision(
            bucket="failed",
            reason=f"fetch failed: {profile.get('error_kind') or 'error'}",
            **base,
        )

    food = matched_terms(text, FOOD)
    uae = matched_terms(text, UAE)
    if lexicon.UAE_EMOJI in text:
        uae = uae + ["\U0001F1E6\U0001F1EA"]
    other_geo = matched_terms(text, OTHER_GEO)
    recipe = matched_terms(text, RECIPE)
    venue = matched_terms(text, VENUE)

    signals = dict(
        food_terms=food, uae_terms=uae, other_geo_terms=other_geo,
        recipe_terms=recipe, venue_terms=venue,
    )

    # 1. Venue before everything else. A Dubai restaurant matches food AND geo AND is
    #    professional, so any later ordering would file it as a candidate — and a venue in the
    #    influencer table is an account endorsing itself.
    if _is_venue_category(category):
        return Decision(bucket="venue", reason=f"category_name={category!r}", **base, **signals)
    if len(venue) >= 2 and food and (category or "").strip().lower() not in lexicon.CREATOR_CATEGORY_EXACT:
        return Decision(
            bucket="venue",
            reason=f"venue vocabulary in bio ({len(venue)} terms) and no creator category",
            **base, **signals,
        )

    # 2. No food signal at all — the large majority of a 1,288-account following list.
    #    Recipe vocabulary counts as a food signal here even though it never reaches the roster:
    #    a bio reading "easy recipes and meal prep" plainly IS a food account, and filing it
    #    under "no food signal" would be a true bucket reached by a false reason. The routing
    #    that keeps recipe accounts off the roster happens at steps 4 and 6, where it is visible.
    if not food and not recipe:
        return Decision(bucket="excluded", reason="no food signal in name, bio or category",
                        **base, **signals)

    # 3. Food, but not a professional account. `business_discovery` cannot read it at all, so
    #    it is ineligible however good it is. Kept in `review` rather than `excluded` because
    #    the account holder can switch to a Creator account, and because the handoff records
    #    exactly this case (`kokumandkari`).
    if not profile.get("is_professional_account"):
        return Decision(
            bucket="review",
            reason="food signal but NOT a professional account — ineligible for business_discovery",
            **base, **signals,
        )

    # 4. Food + a UAE marker + professional. The roster.
    if uae:
        place_vocabulary = ("restaurant", "restaurants", "restaurant review", "restaurant reviews",
                            "eatery", "eateries", "food spots", "best spots", "hidden gems",
                            "where to eat", "dining", "new openings", "must try", "must-try")
        if recipe and not any(term in food for term in place_vocabulary):
            return Decision(
                bucket="review",
                reason="UAE food account, but recipe/nutrition vocabulary — may not recommend places",
                **base, **signals,
            )
        return Decision(bucket="candidate", reason="food + UAE + professional account",
                        **base, **signals)

    # 5. Food, professional, and an explicit non-UAE geography. Reached only when NO UAE term
    #    matched, so "Indian food in Dubai" cannot land here.
    if other_geo:
        return Decision(
            bucket="excluded",
            reason=f"food account with non-UAE geography ({', '.join(other_geo[:3])})",
            **base, **signals,
        )

    # 6. Food, professional, no geography stated either way. This is the bucket the old
    #    handle-keyword method could not produce at all, and the one most likely to contain a
    #    missed influencer. A person reads it.
    if recipe:
        return Decision(bucket="review",
                        reason="recipe/nutrition account, no geography stated", **base, **signals)
    return Decision(bucket="review", reason="food + professional, but no geography stated",
                    **base, **signals)


# ---------------------------------------------------------------------------
# Reconciliation and reporting
# ---------------------------------------------------------------------------

def reconcile(decisions: list[Decision], expected_total: int) -> dict:
    """
    Count the buckets and prove nothing was lost.

    Raises rather than warns. A report that quietly covers 1,200 of 1,288 accounts looks
    exactly like a report that covers all of them, which is how the original gap survived.
    """
    counts = {bucket: 0 for bucket in BUCKETS}
    for decision in decisions:
        if decision.bucket not in counts:
            raise ValueError(f"{decision.username}: unknown bucket {decision.bucket!r}")
        counts[decision.bucket] += 1

    total = sum(counts.values())
    if total != expected_total:
        raise AssertionError(
            f"bucket totals ({total}) do not match handles scanned ({expected_total}) — "
            "a profile was dropped"
        )

    seen = [d.username for d in decisions]
    if len(set(seen)) != len(seen):
        raise AssertionError("the same handle was classified more than once")

    return counts


# The seven verified in the previous session. Used only as a recall check on a REAL scan:
# if any of them fails to land in `candidate`, the classifier is wrong, not the roster.
KNOWN_ROSTER = (
    "foodfindsuae", "varietyfoodie", "foodieshamsi", "thehungrydentistt",
    "bedouinfoodie", "mohamedeatss", "deliciousstation_ae",
)


def roster_check(decisions: list[Decision]) -> list[str]:
    """Report every known-good handle that did NOT land in `candidate`, with the bucket it got."""
    by_name = {d.username.lower(): d for d in decisions}
    problems = []
    for handle in KNOWN_ROSTER:
        decision = by_name.get(handle.lower())
        if decision is None:
            problems.append(f"{handle}: not present in the scan output")
        elif decision.bucket != "candidate":
            problems.append(f"{handle}: landed in {decision.bucket!r} — {decision.reason}")
    return problems


def near_misses(decisions: list[Decision]) -> list[Decision]:
    """
    A cross-cut over `excluded`, not a bucket — reconciliation stays exact.

    These are professional accounts with a UAE marker and NO food term anywhere in name, bio or
    category. They are excluded correctly by the rule, and they are also the one shape the rule
    cannot see: a Dubai food account whose bio says "Licensed Vlogger" and nothing else. The
    handoff records `varietyfoodie` as exactly that — its bio quote carries the geography and the
    permit number and no food word at all.

    The list is bounded (a following list has far more Dubai accounts than food accounts, but not
    unmanageably more) and it is the honest place to spend review attention, because everything
    else in `excluded` failed on a signal the classifier could actually observe.
    """
    return [
        d for d in decisions
        if d.bucket == "excluded"
        and d.is_professional
        and d.uae_terms
        and not d.food_terms
        and not d.recipe_terms
    ]


CSV_COLUMNS = [
    "username", "bucket", "reason", "followers", "category", "is_professional",
    "full_name", "biography", "evidence",
]


def write_csv(path: str, decisions: list[Decision]) -> int:
    ordered = sorted(decisions, key=lambda d: (-(d.followers or 0), d.username))
    with open(path, "w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(CSV_COLUMNS)
        for decision in ordered:
            writer.writerow([
                decision.username, decision.bucket, decision.reason,
                decision.followers if decision.followers is not None else "",
                decision.category or "", "yes" if decision.is_professional else "no",
                decision.full_name,
                " ".join((decision.biography or "").split()),
                decision.evidence,
            ])
    return len(ordered)


def load_profiles(path: str) -> list[dict]:
    profiles = []
    with open(path, "r", encoding="utf-8") as handle:
        for line_number, line in enumerate(handle, start=1):
            line = line.strip()
            if not line:
                continue
            try:
                profiles.append(json.loads(line))
            except json.JSONDecodeError as exc:
                raise ValueError(f"{path}:{line_number} is not valid JSON — {exc}") from exc
    return profiles


def main(argv: Optional[list[str]] = None) -> int:
    import argparse
    import os

    parser = argparse.ArgumentParser(description="Classify scanned Instagram profiles.")
    parser.add_argument("--profiles", default="data/profiles.jsonl",
                        help="JSONL written by scan_following.py")
    parser.add_argument("--out-dir", default="data/report",
                        help="directory for the CSV shortlists and summary")
    args = parser.parse_args(argv)

    profiles = load_profiles(args.profiles)
    decisions = [classify(p) for p in profiles]
    counts = reconcile(decisions, len(profiles))

    os.makedirs(args.out_dir, exist_ok=True)
    for bucket in BUCKETS:
        rows = [d for d in decisions if d.bucket == bucket]
        if rows:
            write_csv(os.path.join(args.out_dir, f"{bucket}.csv"), rows)
    write_csv(os.path.join(args.out_dir, "all.csv"), decisions)

    misses = near_misses(decisions)
    if misses:
        write_csv(os.path.join(args.out_dir, "near_miss.csv"), misses)

    problems = roster_check(decisions)

    lines = [
        "# Influencer scan — classification summary",
        "",
        f"Profiles classified: **{len(profiles)}**",
        "",
        "| bucket | count | what to do with it |",
        "|---|---:|---|",
        f"| candidate | {counts['candidate']} | add to the roster |",
        f"| review | {counts['review']} | read these by hand |",
        f"| venue | {counts['venue']} | `places`, never `influencers` |",
        f"| excluded | {counts['excluded']} | no food signal, or non-UAE |",
        f"| failed | {counts['failed']} | re-run the scan for these |",
        f"| **total** | **{sum(counts.values())}** | reconciles to profiles classified |",
        "",
        f"Cross-cut over `excluded`: **{len(misses)}** near misses "
        "(professional + UAE marker + no food word anywhere) in `near_miss.csv`. "
        "Skim these — a Dubai food account whose bio never says \"food\" is the one shape "
        "no term list can catch.",
        "",
    ]
    if problems:
        lines += ["## Roster recall check — FAILED", ""] + [f"- {p}" for p in problems] + [""]
        lines += ["The classifier is wrong about a handle already verified by hand. "
                  "Fix the rule in `classify.py` before trusting any other bucket.", ""]
    else:
        lines += ["## Roster recall check", "",
                  "All seven previously verified handles landed in `candidate`.", ""]

    summary = "\n".join(lines)
    with open(os.path.join(args.out_dir, "summary.md"), "w", encoding="utf-8") as handle:
        handle.write(summary)
    print(summary)
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
