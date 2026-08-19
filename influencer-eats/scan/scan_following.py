"""
Scan every account in an Instagram `following.json` export and record its profile metadata.

WHAT PROBLEM THIS SOLVES
    The previous pass checked ~40 profiles from a 129-handle keyword shortlist out of 1,288
    followed accounts, and the shortlist was built from handles. A food influencer whose handle
    carries no food word — the handoff names `bocasu_`, `un.sul`, `galousti` — was invisible to
    that method and would never appear in its output as a gap. This script checks all of them.

RESUMABILITY IS THE POINT, NOT A CONVENIENCE
    The output is append-only JSONL keyed by handle, and a re-run skips handles already
    written. A scan that must complete in one uninterrupted pass will be restarted from zero
    after the first throttle, and the natural response to that is to reduce the input — which
    is how a coverage gap gets reintroduced by someone acting reasonably.

STOPPING vs SKIPPING — the distinction the exit codes carry
    A per-profile failure (404, the known asset bug) is recorded and the run continues.
    A run-level failure (expired cookie, throttling) STOPS the run, because continuing turns
    every remaining handle into a false "checked and found nothing".

USAGE
    export IG_COOKIE='sessionid=...; csrftoken=...; ds_user_id=...'
    python3 scan_following.py --following ../data/following.json --out ../data/profiles.jsonl

    Getting the cookie: log in to instagram.com, DevTools → Application → Cookies, copy the
    `sessionid` value. Or skip the cookie entirely and use `browser_scan.js`, which runs in the
    page and borrows the session you are already logged in with.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from typing import Optional

from ig_client import (
    AuthError,
    IGWebClient,
    PoliteSession,
    RateLimited,
)


def read_following(path: str) -> list[str]:
    """
    Extract handles from an Instagram data export.

    Tolerates the two shapes the export has used — a top-level object keyed
    `relationships_following`, and a bare list — because the format is Meta's to change and a
    hard failure here is a stop for something the script can simply recognise.
    """
    with open(path, "r", encoding="utf-8") as handle:
        payload = json.load(handle)

    if isinstance(payload, dict):
        entries = payload.get("relationships_following")
        if entries is None:
            for value in payload.values():
                if isinstance(value, list):
                    entries = value
                    break
    else:
        entries = payload

    if not isinstance(entries, list):
        raise ValueError(f"{path}: could not find a list of followed accounts")

    handles: list[str] = []
    for entry in entries:
        name = None
        if isinstance(entry, dict):
            name = entry.get("title") or None
            if not name:
                items = entry.get("string_list_data") or []
                if items and isinstance(items[0], dict):
                    name = items[0].get("value") or _handle_from_href(items[0].get("href"))
        elif isinstance(entry, str):
            name = entry
        if name:
            handles.append(name.strip().lstrip("@"))

    if not handles:
        raise ValueError(f"{path}: parsed 0 handles — the export shape is not recognised")

    # Preserve first-seen order; the export is newest-follow first and that ordering is useful
    # when a run is interrupted, since recent follows are the likeliest new influencers.
    seen = set()
    ordered = []
    for handle in handles:
        key = handle.lower()
        if key not in seen:
            seen.add(key)
            ordered.append(handle)
    return ordered


def _handle_from_href(href: Optional[str]) -> Optional[str]:
    if not href:
        return None
    return href.rstrip("/").rsplit("/", 1)[-1] or None


def already_scanned(path: str) -> set[str]:
    """Handles already present in the output, so a re-run costs nothing for them."""
    if not os.path.exists(path):
        return set()
    done = set()
    with open(path, "r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                record = json.loads(line)
            except json.JSONDecodeError:
                continue
            name = record.get("username")
            if name:
                done.add(name.lower())
    return done


def main(argv: Optional[list[str]] = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    parser.add_argument("--following", default="data/following.json")
    parser.add_argument("--out", default="data/profiles.jsonl")
    parser.add_argument("--cookie-file", default=None,
                        help="file holding the Cookie header; otherwise IG_COOKIE is read")
    parser.add_argument("--limit", type=int, default=0, help="stop after N new handles (0 = all)")
    parser.add_argument("--min-delay", type=float, default=0.25)
    parser.add_argument("--max-delay", type=float, default=0.40)
    parser.add_argument("--no-raw", action="store_true",
                        help="omit the full API payload from the output (smaller, less re-usable)")
    parser.add_argument("--retry-failed", action="store_true",
                        help="re-fetch handles whose previous attempt recorded an error")
    parser.add_argument("--dry-run", action="store_true",
                        help="parse the export and report the work, fetch nothing")
    args = parser.parse_args(argv)

    handles = read_following(args.following)
    print(f"{args.following}: {len(handles)} followed accounts")

    done = already_scanned(args.out)
    if args.retry_failed and os.path.exists(args.out):
        keep, retried = [], set()
        with open(args.out, "r", encoding="utf-8") as handle:
            for line in handle:
                if not line.strip():
                    continue
                record = json.loads(line)
                if record.get("error"):
                    retried.add((record.get("username") or "").lower())
                else:
                    keep.append(line.rstrip("\n"))
        if retried:
            with open(args.out, "w", encoding="utf-8") as handle:
                handle.write("\n".join(keep) + ("\n" if keep else ""))
            done -= retried
            print(f"--retry-failed: {len(retried)} previously failed handles queued again")

    pending = [h for h in handles if h.lower() not in done]
    if args.limit:
        pending = pending[: args.limit]

    print(f"already scanned: {len(done)}  |  to fetch now: {len(pending)}")
    if args.dry_run:
        estimate = len(pending) * (args.min_delay + args.max_delay) / 2
        print(f"dry run — would fetch {len(pending)} profiles, roughly {estimate / 60:.1f} min")
        return 0
    if not pending:
        print("nothing to do.")
        return 0

    cookie = IGWebClient.load_cookie(args.cookie_file)
    client = IGWebClient(
        cookie=cookie,
        session=PoliteSession(min_delay=args.min_delay, max_delay=args.max_delay),
    )
    if not client.authenticated:
        print(
            "WARNING: no `sessionid` in the cookie. Instagram answers this endpoint with 401/403\n"
            "         when logged out, so the run will almost certainly stop on the first call.\n"
            "         Set IG_COOKIE, pass --cookie-file, or use browser_scan.js instead.",
            file=sys.stderr,
        )

    started = time.time()
    counts = {"ok": 0, "error": 0}
    stop_reason = None

    with open(args.out, "a", encoding="utf-8") as sink:
        for index, handle in enumerate(pending, start=1):
            try:
                profile = client.profile(handle)
            except AuthError as exc:
                stop_reason = (
                    f"session rejected on {handle} ({exc}). Refresh the cookie and re-run — "
                    "everything fetched so far is saved."
                )
                break
            except RateLimited as exc:
                stop_reason = (
                    f"throttled on {handle} ({exc}). Wait, then re-run — the scan resumes where "
                    "it stopped."
                )
                break

            sink.write(json.dumps(profile.to_json(include_raw=not args.no_raw),
                                  ensure_ascii=False) + "\n")
            sink.flush()

            if profile.error:
                counts["error"] += 1
                print(f"  [{index}/{len(pending)}] {handle}: {profile.error_kind} — {profile.error}",
                      file=sys.stderr)
            else:
                counts["ok"] += 1

            if index % 50 == 0 or index == len(pending):
                rate = index / max(time.time() - started, 1e-6)
                remaining = (len(pending) - index) / max(rate, 1e-6)
                print(f"  [{index}/{len(pending)}] ok={counts['ok']} err={counts['error']} "
                      f"~{remaining / 60:.1f} min left")

    elapsed = time.time() - started
    print(f"\nfetched {counts['ok'] + counts['error']} in {elapsed / 60:.1f} min "
          f"(ok={counts['ok']}, per-profile errors={counts['error']})")
    print(f"output: {args.out}")

    if stop_reason:
        print(f"\nSTOPPED: {stop_reason}", file=sys.stderr)
        scanned = len(already_scanned(args.out))
        print(f"coverage so far: {scanned}/{len(handles)} followed accounts", file=sys.stderr)
        return 2

    scanned = len(already_scanned(args.out))
    print(f"coverage: {scanned}/{len(handles)} followed accounts")
    if scanned < len(handles):
        print(f"  {len(handles) - scanned} still unscanned — re-run to finish.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
