"""
Instagram web client — profile metadata lookups.

WHAT THIS IS FOR
    Step 1 of the influencer-eats plan: read every account the user follows and pull enough
    profile metadata (bio, category, professional flag, follower count) to decide which are
    UAE food influencers.

WHY IT IS A MODULE AND NOT A SCRIPT
    The handoff is explicit that this is not throwaway code. `PoliteSession` — the pacing,
    retry and error-classification layer — is the part the ingestion worker reuses; only
    `IGWebClient` is specific to the web profile endpoint. Step 2's Meta Graph API client
    (`business_discovery`) is a DIFFERENT endpoint on a DIFFERENT auth model and belongs in
    its own module built on the same `PoliteSession`.

AUTHENTICATION
    `web_profile_info` needs a logged-in session. Supply the browser cookie header via the
    IG_COOKIE environment variable or --cookie-file. Nothing here logs in, stores credentials,
    or touches the password flow.

    A cookie is a live credential. Do not commit one. `.gitignore` in this directory covers
    the conventional filenames, which is a backstop and not a substitute for care.

ERROR CLASSIFICATION — the point of this module
    The handoff records an Instagram-side bug worth naming: some profiles return HTTP 400 with
    "Asset asset://laser.provider/ig_business_category_subvertical has been deleted". That is
    NOT a rate limit and NOT a ban signal, and treating it as one would abort a scan that
    should continue. It gets its own exception type, one retry, then a logged skip.

    Distinguishing the failure modes is what lets the scan run unattended and still be trusted:
    a run that cannot tell "this profile is broken" from "you have been throttled" produces a
    silently short result set, which is precisely the coverage defect step 1 exists to close.
"""

from __future__ import annotations

import json
import os
import random
import time
from dataclasses import dataclass, asdict, field
from typing import Any, Optional

import requests


# Instagram's public web app id. Sent as `x-ig-app-id`; without it the endpoint 404s.
DEFAULT_APP_ID = "936619743392459"

DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

PROFILE_URL = "https://www.instagram.com/api/v1/users/web_profile_info/"

# The substring that identifies the Instagram-side asset bug described in the handoff.
ASSET_BUG_MARKER = "laser.provider/ig_business_category_subvertical"


# ---------------------------------------------------------------------------
# Exceptions — one per failure mode the caller must treat differently.
# ---------------------------------------------------------------------------

class IGError(Exception):
    """Base for everything this module raises."""


class AuthError(IGError):
    """Session cookie missing, expired or rejected. The run must stop — retrying makes it worse."""


class RateLimited(IGError):
    """HTTP 429, or a 'Please wait a few minutes' body. The run must back off."""


class AssetBugError(IGError):
    """The known Instagram-side 400. Skip this profile and continue; not a throttle signal."""


class ProfileNotFound(IGError):
    """404 — handle deleted, renamed, or blocked. Skip and continue."""


class TransientError(IGError):
    """5xx / network. Retried internally; raised only after retries are exhausted."""


# ---------------------------------------------------------------------------
# Normalised profile record
# ---------------------------------------------------------------------------

@dataclass
class Profile:
    """
    The subset of `web_profile_info` the classifier and the later pipeline actually need.

    `ig_user_id` is kept because Step 2 (`business_discovery`) and the ingestion worker key
    on it — a handle can be renamed, the numeric id cannot.

    `raw` keeps the full API response so classification can be re-run, and new fields mined,
    without re-fetching. The same reasoning as `posts.raw_json` in the main data model.
    """

    username: str
    ig_user_id: Optional[str] = None
    full_name: str = ""
    biography: str = ""
    category_name: Optional[str] = None
    business_category_name: Optional[str] = None
    is_professional_account: bool = False
    is_business_account: bool = False
    is_verified: bool = False
    is_private: bool = False
    followers: Optional[int] = None
    following: Optional[int] = None
    media_count: Optional[int] = None
    external_url: Optional[str] = None
    business_address: Optional[dict] = None
    fetched_at: Optional[str] = None
    error: Optional[str] = None
    error_kind: Optional[str] = None
    raw: dict = field(default_factory=dict, repr=False)

    def to_json(self, include_raw: bool = True) -> dict:
        d = asdict(self)
        if not include_raw:
            d.pop("raw", None)
        return d


def parse_profile(username: str, payload: dict, fetched_at: str) -> Profile:
    """
    Map a `web_profile_info` payload onto `Profile`.

    Kept separate from the HTTP layer so it can be tested against recorded payloads with no
    network, and so a shape change in Instagram's response is a one-function fix.
    """
    user = (payload.get("data") or {}).get("user") or {}
    if not user:
        raise ProfileNotFound(f"{username}: payload contained no user object")

    def count(key: str) -> Optional[int]:
        node = user.get(key)
        if isinstance(node, dict) and isinstance(node.get("count"), int):
            return node["count"]
        return None

    address = None
    raw_address = user.get("business_address_json")
    if isinstance(raw_address, str) and raw_address.strip():
        try:
            address = json.loads(raw_address)
        except json.JSONDecodeError:
            address = {"unparsed": raw_address}
    elif isinstance(raw_address, dict):
        address = raw_address

    return Profile(
        username=user.get("username") or username,
        ig_user_id=user.get("id"),
        full_name=user.get("full_name") or "",
        biography=user.get("biography") or "",
        category_name=user.get("category_name"),
        business_category_name=user.get("business_category_name"),
        is_professional_account=bool(user.get("is_professional_account")),
        is_business_account=bool(user.get("is_business_account")),
        is_verified=bool(user.get("is_verified")),
        is_private=bool(user.get("is_private")),
        followers=count("edge_followed_by"),
        following=count("edge_follow"),
        media_count=count("edge_owner_to_timeline_media"),
        external_url=user.get("external_url"),
        business_address=address,
        fetched_at=fetched_at,
        raw=payload,
    )


# ---------------------------------------------------------------------------
# Pacing + retry layer — reused by the ingestion worker
# ---------------------------------------------------------------------------

class PoliteSession:
    """
    A requests session that will not hammer a host.

    Pacing is measured from the END of the previous request, not from a fixed schedule, so a
    slow response does not stack a delay on top of it. The delay is jittered because a
    perfectly periodic request pattern is itself a bot signal.
    """

    def __init__(
        self,
        min_delay: float = 0.25,
        max_delay: float = 0.40,
        timeout: float = 20.0,
        user_agent: str = DEFAULT_USER_AGENT,
        max_transient_retries: int = 2,
        rng: Optional[random.Random] = None,
        sleep=time.sleep,
    ) -> None:
        if min_delay > max_delay:
            raise ValueError("min_delay must not exceed max_delay")
        self.min_delay = min_delay
        self.max_delay = max_delay
        self.timeout = timeout
        self.max_transient_retries = max_transient_retries
        self._rng = rng or random.Random()
        self._sleep = sleep
        self._last_request_ended: Optional[float] = None
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": user_agent,
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9",
        })

    def wait_turn(self) -> None:
        if self._last_request_ended is None:
            return
        elapsed = time.monotonic() - self._last_request_ended
        target = self._rng.uniform(self.min_delay, self.max_delay)
        if elapsed < target:
            self._sleep(target - elapsed)

    def get(self, url: str, **kwargs) -> requests.Response:
        """GET with pacing and transient-failure retry. HTTP status is NOT interpreted here."""
        attempt = 0
        while True:
            self.wait_turn()
            try:
                response = self.session.get(url, timeout=self.timeout, **kwargs)
            except requests.RequestException as exc:
                self._last_request_ended = time.monotonic()
                attempt += 1
                if attempt > self.max_transient_retries:
                    raise TransientError(f"network failure after {attempt} attempts: {exc}") from exc
                self._sleep(2 ** attempt)
                continue

            self._last_request_ended = time.monotonic()

            if response.status_code >= 500:
                attempt += 1
                if attempt > self.max_transient_retries:
                    raise TransientError(f"HTTP {response.status_code} after {attempt} attempts")
                self._sleep(2 ** attempt)
                continue

            return response


class IGWebClient:
    """Profile metadata via Instagram's web endpoint."""

    def __init__(
        self,
        cookie: Optional[str] = None,
        app_id: str = DEFAULT_APP_ID,
        session: Optional[PoliteSession] = None,
        **session_kwargs,
    ) -> None:
        self.polite = session or PoliteSession(**session_kwargs)
        self.app_id = app_id
        self.cookie = (cookie or "").strip()
        headers = {
            "x-ig-app-id": self.app_id,
            "x-requested-with": "XMLHttpRequest",
            "Referer": "https://www.instagram.com/",
        }
        if self.cookie:
            headers["Cookie"] = self.cookie
        self.polite.session.headers.update(headers)

    # -- authentication ---------------------------------------------------

    @property
    def authenticated(self) -> bool:
        return "sessionid=" in self.cookie

    @staticmethod
    def load_cookie(cookie_file: Optional[str] = None, env_var: str = "IG_COOKIE") -> str:
        """
        Read a cookie header from a file or the environment.

        Accepts either a raw `Cookie:` header line ("sessionid=...; csrftoken=...") or a bare
        sessionid value, which is normalised. Anything else is passed through untouched — this
        deliberately does not try to be clever about formats it has not seen.
        """
        raw = ""
        if cookie_file:
            with open(cookie_file, "r", encoding="utf-8") as handle:
                raw = handle.read()
        elif os.environ.get(env_var):
            raw = os.environ[env_var]

        raw = raw.strip()
        if not raw:
            return ""
        if raw.lower().startswith("cookie:"):
            raw = raw.split(":", 1)[1].strip()
        if "=" not in raw:
            # A bare sessionid value.
            raw = f"sessionid={raw}"
        return raw

    # -- the one call -----------------------------------------------------

    def web_profile_info(self, username: str) -> dict:
        """
        Fetch the raw payload for one handle.

        Raises a specific exception per failure mode. The known asset bug is retried once
        before being surfaced, per the handoff.
        """
        for attempt in (1, 2):
            response = self.polite.get(PROFILE_URL, params={"username": username})
            status = response.status_code
            body = response.text or ""

            # Throttling is checked BEFORE the 200 branch, because Instagram delivers it as a
            # 200 carrying "Please wait a few minutes before you try again." Read as a 200 that
            # failed to parse, that becomes a TransientError — which does not stop the run, so
            # the scan keeps calling while throttled and banks every remaining handle as a
            # failure. The order of these two branches is the difference between a run that
            # stops and a run that produces a plausible, wrong answer.
            if status == 429 or "wait a few minutes" in body.lower():
                raise RateLimited(f"{username}: HTTP {status} — throttled")

            if status == 200:
                try:
                    payload = response.json()
                except ValueError as exc:
                    raise TransientError(f"{username}: HTTP 200 with non-JSON body") from exc
                if not (payload.get("data") or {}).get("user"):
                    raise ProfileNotFound(f"{username}: HTTP 200 with empty user object")
                return payload

            if status in (401, 403):
                # 403 on this endpoint is the logged-out response, not a per-profile block.
                raise AuthError(
                    f"{username}: HTTP {status} — session cookie missing, expired or rejected"
                )

            if status == 404:
                raise ProfileNotFound(f"{username}: HTTP 404")

            if status == 400 and ASSET_BUG_MARKER in body:
                if attempt == 1:
                    continue  # the handoff's documented retry-once
                raise AssetBugError(f"{username}: HTTP 400 — Instagram asset bug, skipped")

            if status == 400:
                raise ProfileNotFound(f"{username}: HTTP 400 — {body[:160]}")

            raise TransientError(f"{username}: unexpected HTTP {status} — {body[:160]}")

        raise TransientError(f"{username}: retry loop exhausted")  # pragma: no cover

    def profile(self, username: str) -> Profile:
        """
        Fetch and normalise one profile, converting per-profile failures into a `Profile`
        carrying `error`/`error_kind` rather than an exception.

        Why failures become records: every one of the followed handles must land in exactly one
        output bucket. A handle that raised and was dropped is invisible in the totals, and an
        invisible drop is the exact defect this scan exists to fix. `AuthError` and `RateLimited`
        still raise — they are properties of the RUN, not of the profile, and the caller must stop.
        """
        fetched_at = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        try:
            payload = self.web_profile_info(username)
        except (AuthError, RateLimited):
            raise
        except IGError as exc:
            return Profile(
                username=username,
                fetched_at=fetched_at,
                error=str(exc),
                error_kind=type(exc).__name__,
            )
        try:
            return parse_profile(username, payload, fetched_at)
        except IGError as exc:
            return Profile(
                username=username,
                fetched_at=fetched_at,
                error=str(exc),
                error_kind=type(exc).__name__,
            )
