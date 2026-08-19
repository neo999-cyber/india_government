"""
Tests for the HTTP layer.

Every test asserts the SPECIFIC failure it is about — the exception type and the branch — never
merely that something went wrong. The whole value of this module is that a 400 from the known
Instagram asset bug is distinguishable from a 429; a test satisfied by "it raised" would pass
just as happily if the two were collapsed.
"""

import os
import sys
import unittest
from unittest import mock

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import ig_client  # noqa: E402


class FakeResponse:
    def __init__(self, status_code, text="", payload=None):
        self.status_code = status_code
        self.text = text
        self._payload = payload

    def json(self):
        if self._payload is None:
            raise ValueError("no json")
        return self._payload


def payload_for(username, **user):
    base = {
        "username": username,
        "id": "12345",
        "full_name": "Test Account",
        "biography": "bio text",
        "category_name": "Blogger",
        "is_professional_account": True,
        "edge_followed_by": {"count": 1000},
        "edge_follow": {"count": 50},
        "edge_owner_to_timeline_media": {"count": 300},
    }
    base.update(user)
    return {"data": {"user": base}}


def client_returning(*responses):
    """A client whose transport replays a fixed sequence, with no sleeping and no network."""
    session = ig_client.PoliteSession(min_delay=0, max_delay=0, sleep=lambda _: None)
    session.get = mock.Mock(side_effect=list(responses))
    return ig_client.IGWebClient(cookie="sessionid=x", session=session), session


class TestErrorClassification(unittest.TestCase):
    ASSET_BUG_BODY = (
        '{"message":"Asset asset://laser.provider/ig_business_category_subvertical '
        'has been deleted"}'
    )

    def test_asset_bug_is_retried_exactly_once_then_raises_its_own_type(self):
        client, session = client_returning(
            FakeResponse(400, self.ASSET_BUG_BODY),
            FakeResponse(400, self.ASSET_BUG_BODY),
        )
        with self.assertRaises(ig_client.AssetBugError):
            client.web_profile_info("someone")
        self.assertEqual(session.get.call_count, 2, "the handoff specifies retry-once")

    def test_asset_bug_that_clears_on_retry_returns_the_profile(self):
        client, session = client_returning(
            FakeResponse(400, self.ASSET_BUG_BODY),
            FakeResponse(200, payload=payload_for("someone")),
        )
        payload = client.web_profile_info("someone")
        self.assertEqual(payload["data"]["user"]["username"], "someone")
        self.assertEqual(session.get.call_count, 2)

    def test_asset_bug_is_not_a_rate_limit(self):
        # The distinction that matters: mistaking it for a throttle aborts a scan that should
        # have continued, and the run then under-reports coverage with no sign it did.
        client, _ = client_returning(
            FakeResponse(400, self.ASSET_BUG_BODY), FakeResponse(400, self.ASSET_BUG_BODY))
        with self.assertRaises(ig_client.AssetBugError):
            client.web_profile_info("someone")
        self.assertFalse(issubclass(ig_client.AssetBugError, ig_client.RateLimited))

    def test_plain_400_is_not_treated_as_the_asset_bug(self):
        client, session = client_returning(FakeResponse(400, '{"message":"something else"}'))
        with self.assertRaises(ig_client.ProfileNotFound):
            client.web_profile_info("someone")
        self.assertEqual(session.get.call_count, 1, "an unrelated 400 must not be retried")

    def test_429_raises_rate_limited(self):
        client, _ = client_returning(FakeResponse(429, "slow down"))
        with self.assertRaises(ig_client.RateLimited):
            client.web_profile_info("someone")

    def test_throttle_wording_in_a_200_body_is_caught(self):
        # Instagram sometimes answers 200 with "Please wait a few minutes before you try again."
        client, _ = client_returning(
            FakeResponse(200, "Please wait a few minutes before you try again."))
        with self.assertRaises(ig_client.RateLimited):
            client.web_profile_info("someone")

    def test_401_and_403_are_auth_errors(self):
        for status in (401, 403):
            client, _ = client_returning(FakeResponse(status, "login required"))
            with self.assertRaises(ig_client.AuthError):
                client.web_profile_info("someone")

    def test_404_is_profile_not_found(self):
        client, _ = client_returning(FakeResponse(404, "not found"))
        with self.assertRaises(ig_client.ProfileNotFound):
            client.web_profile_info("someone")

    def test_200_with_empty_user_object_is_not_found(self):
        client, _ = client_returning(FakeResponse(200, payload={"data": {"user": None}}))
        with self.assertRaises(ig_client.ProfileNotFound):
            client.web_profile_info("someone")


class TestProfileVsRunFailures(unittest.TestCase):
    """
    `profile()` converts per-profile failures into records and lets run-level failures raise.
    That split is what lets the scan account for every handle while still stopping when
    continuing would manufacture false negatives.
    """

    def test_per_profile_failure_becomes_a_record(self):
        client, _ = client_returning(FakeResponse(404, "gone"))
        result = client.profile("vanished")
        self.assertEqual(result.username, "vanished")
        self.assertEqual(result.error_kind, "ProfileNotFound")
        self.assertIsNotNone(result.fetched_at)

    def test_auth_failure_still_raises(self):
        client, _ = client_returning(FakeResponse(401, "login required"))
        with self.assertRaises(ig_client.AuthError):
            client.profile("someone")

    def test_rate_limit_still_raises(self):
        client, _ = client_returning(FakeResponse(429, ""))
        with self.assertRaises(ig_client.RateLimited):
            client.profile("someone")


class TestParsing(unittest.TestCase):
    def test_fields_the_classifier_and_the_pipeline_need(self):
        payload = payload_for(
            "acct",
            id="998877",
            full_name="Dubai Eats",
            biography="food finds",
            category_name="Digital creator",
            business_category_name=None,
            is_verified=True,
            external_url="https://example.com",
        )
        profile = ig_client.parse_profile("acct", payload, "2026-08-19T00:00:00Z")
        self.assertEqual(profile.ig_user_id, "998877")
        self.assertEqual(profile.followers, 1000)
        self.assertEqual(profile.media_count, 300)
        self.assertTrue(profile.is_verified)
        self.assertEqual(profile.external_url, "https://example.com")

    def test_business_address_json_string_is_parsed(self):
        payload = payload_for(
            "venue", business_address_json='{"city_name": "Dubai, United Arab Emirates"}')
        profile = ig_client.parse_profile("venue", payload, "t")
        self.assertEqual(profile.business_address["city_name"], "Dubai, United Arab Emirates")

    def test_unparseable_business_address_is_kept_not_discarded(self):
        payload = payload_for("venue", business_address_json="{not json")
        profile = ig_client.parse_profile("venue", payload, "t")
        self.assertEqual(profile.business_address, {"unparsed": "{not json"})

    def test_missing_counts_are_none_not_zero(self):
        # A blank is unreported, not zero. Reporting 0 followers for an unreported count would
        # sort the account to the bottom of every shortlist as though it were measured.
        payload = {"data": {"user": {"username": "x", "id": "1"}}}
        profile = ig_client.parse_profile("x", payload, "t")
        self.assertIsNone(profile.followers)
        self.assertIsNone(profile.media_count)

    def test_to_json_can_omit_the_raw_payload(self):
        profile = ig_client.parse_profile("x", payload_for("x"), "t")
        self.assertIn("raw", profile.to_json())
        self.assertNotIn("raw", profile.to_json(include_raw=False))


class TestPacing(unittest.TestCase):
    def test_sleeps_between_requests_but_not_before_the_first(self):
        slept = []
        session = ig_client.PoliteSession(min_delay=0.3, max_delay=0.3, sleep=slept.append)
        session.session.get = mock.Mock(return_value=FakeResponse(200, payload={}))
        session.get("https://example.com")
        self.assertEqual(slept, [], "no delay is owed before the first request")
        session.get("https://example.com")
        self.assertEqual(len(slept), 1)
        self.assertGreater(slept[0], 0)

    def test_rejects_an_inverted_delay_range(self):
        with self.assertRaises(ValueError):
            ig_client.PoliteSession(min_delay=1.0, max_delay=0.5)

    def test_5xx_is_retried_then_raises_transient(self):
        session = ig_client.PoliteSession(min_delay=0, max_delay=0, sleep=lambda _: None,
                                          max_transient_retries=2)
        session.session.get = mock.Mock(return_value=FakeResponse(503, "bad gateway"))
        with self.assertRaises(ig_client.TransientError):
            session.get("https://example.com")
        self.assertEqual(session.session.get.call_count, 3, "initial attempt plus two retries")

    def test_5xx_that_recovers_returns_the_response(self):
        session = ig_client.PoliteSession(min_delay=0, max_delay=0, sleep=lambda _: None)
        session.session.get = mock.Mock(side_effect=[
            FakeResponse(502, "bad"), FakeResponse(200, payload={"ok": True})])
        self.assertEqual(session.get("https://example.com").status_code, 200)


class TestCookieHandling(unittest.TestCase):
    def test_bare_sessionid_is_normalised(self):
        with mock.patch.dict(os.environ, {"IG_COOKIE": "abc123%3Adef"}, clear=False):
            self.assertEqual(ig_client.IGWebClient.load_cookie(), "sessionid=abc123%3Adef")

    def test_full_header_line_is_accepted(self):
        with mock.patch.dict(os.environ, {"IG_COOKIE": "Cookie: sessionid=a; csrftoken=b"}):
            self.assertEqual(ig_client.IGWebClient.load_cookie(), "sessionid=a; csrftoken=b")

    def test_authenticated_is_false_without_a_sessionid(self):
        self.assertFalse(ig_client.IGWebClient(cookie="csrftoken=b").authenticated)
        self.assertTrue(ig_client.IGWebClient(cookie="sessionid=a; csrftoken=b").authenticated)

    def test_app_id_header_is_always_sent(self):
        # Without `x-ig-app-id` the endpoint 404s regardless of the session, which reads as
        # "handle does not exist" and would silently empty the scan.
        client = ig_client.IGWebClient(cookie="sessionid=a")
        self.assertEqual(client.polite.session.headers["x-ig-app-id"], ig_client.DEFAULT_APP_ID)


if __name__ == "__main__":
    unittest.main(verbosity=2)
