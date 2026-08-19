"""
Tests for the bucketing rules.

WHAT THESE FIXTURES ARE, AND WHAT THEY ARE NOT
    Instagram is unreachable from the environment these were written in, so no profile here was
    re-retrieved. Bio text and categories are taken from the handoff's roster table, which
    records them as read via `web_profile_info` in the previous session; `full_name` was NOT
    recorded there and is constructed.

    So: these assert that the DECISION RULES behave as specified against text of a given shape.
    They do not assert that any real account classifies correctly. The only check that can do
    that is `roster_check()` run against a real scan, and `test_roster_recall_is_not_proof`
    below exists to stop this file being mistaken for it.
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import classify  # noqa: E402


def profile(**kwargs) -> dict:
    base = {
        "username": "someone",
        "full_name": "",
        "biography": "",
        "category_name": None,
        "business_category_name": None,
        "is_professional_account": True,
        "followers": 1000,
        "error": None,
    }
    base.update(kwargs)
    return base


class TestBoundaryMatching(unittest.TestCase):
    def test_word_boundary_prevents_substring_false_positives(self):
        # "eat" inside "theatre", "bar" inside "barber" — the reason substring matching was
        # rejected for this job.
        decision = classify.classify(profile(biography="Theatre and barber content, Dubai"))
        self.assertEqual(decision.food_terms, [])
        self.assertEqual(decision.bucket, "excluded")

    def test_term_with_trailing_punctuation_still_matches(self):
        # `\bu.a.e\b` can never match; the pattern builder must attach boundaries only where the
        # adjacent character of the term is a word character.
        hits = classify.matched_terms("Based in the U.A.E", classify.compile_terms({"u.a.e"}))
        self.assertEqual(hits, ["u.a.e"])

    def test_uae_flag_emoji_counts_as_geography(self):
        decision = classify.classify(profile(biography="food finds \U0001F1E6\U0001F1EA"))
        self.assertIn("\U0001F1E6\U0001F1EA", decision.uae_terms)
        self.assertEqual(decision.bucket, "candidate")


class TestOrdering(unittest.TestCase):
    def test_uae_restaurant_is_a_venue_not_a_candidate(self):
        # It matches food AND geography AND is professional. Only the ordering keeps it out of
        # the roster, so this is the test that ordering is load-bearing.
        decision = classify.classify(profile(
            username="eattori.ae",
            full_name="Tori",
            biography="Japanese yakitori, Wasl 51, Dubai. Book now.",
            category_name="Japanese restaurant",
        ))
        self.assertEqual(decision.bucket, "venue")

    def test_indian_cuisine_in_dubai_is_not_excluded_as_non_uae(self):
        # "india" and "dubai" both match; the UAE term must win. Getting this backwards would
        # silently drop a chunk of the roster in a city where most food is someone else's.
        decision = classify.classify(profile(
            biography="The best Indian food in Dubai. India-born, Dubai-based.",
            category_name="Blogger",
        ))
        self.assertEqual(decision.bucket, "candidate")
        self.assertTrue(decision.uae_terms)
        self.assertTrue(decision.other_geo_terms)

    def test_creator_category_survives_venue_vocabulary(self):
        # Influencers write "book now" in paid posts. A creator category must override.
        decision = classify.classify(profile(
            biography="Dubai food guide. Book now, reservations via link. Visit us at the popup.",
            category_name="Digital creator",
        ))
        self.assertEqual(decision.bucket, "candidate")


class TestBuckets(unittest.TestCase):
    def test_non_professional_food_account_goes_to_review_not_excluded(self):
        # business_discovery cannot read it — but the owner can switch account type, so this is
        # a decision for a person, not a rejection.
        decision = classify.classify(profile(
            username="kokumandkari",
            biography="Dubai food and kitchen notes",
            is_professional_account=False,
        ))
        self.assertEqual(decision.bucket, "review")
        self.assertIn("business_discovery", decision.reason)

    def test_food_without_any_geography_goes_to_review(self):
        decision = classify.classify(profile(biography="Restaurant reviews and hidden gems"))
        self.assertEqual(decision.bucket, "review")
        self.assertIn("no geography", decision.reason)

    def test_food_with_foreign_geography_is_excluded(self):
        decision = classify.classify(profile(
            username="spoonsofdilli",
            full_name="Spoons of Dilli",
            biography="Delhi street food and hidden gems",
            category_name="Digital creator",
        ))
        self.assertEqual(decision.bucket, "excluded")
        self.assertIn("non-UAE", decision.reason)

    def test_uae_nutritionist_goes_to_review_not_roster(self):
        # Food-adjacent, does not recommend places. The handoff excludes this class explicitly.
        decision = classify.classify(profile(
            username="nutritionbysim",
            biography="Dubai nutritionist. Easy recipes and meal prep, macros made simple.",
            category_name="Digital creator",
        ))
        self.assertEqual(decision.bucket, "review")
        self.assertIn("recipe", decision.reason)

    def test_uae_food_writer_with_recipe_word_but_place_vocabulary_stays_a_candidate(self):
        # The negative control for the rule above: recipe vocabulary must not evict an account
        # that plainly reviews restaurants.
        decision = classify.classify(profile(
            biography="Dubai food writer. Restaurant reviews, hidden gems, and the odd recipe.",
            category_name="Blogger",
        ))
        self.assertEqual(decision.bucket, "candidate")

    def test_fetch_failure_is_never_a_classification(self):
        decision = classify.classify(profile(
            biography="", error="HTTP 400 asset bug", error_kind="AssetBugError"))
        self.assertEqual(decision.bucket, "failed")

    def test_username_is_not_matched(self):
        # The handle-keyword method is what produced the coverage gap. A food word in the
        # handle and nowhere else must NOT create a candidate.
        decision = classify.classify(profile(
            username="dubaifoodieeats", full_name="", biography="", category_name=None))
        self.assertEqual(decision.food_terms, [])
        self.assertEqual(decision.bucket, "excluded")


class TestNearMiss(unittest.TestCase):
    def test_uae_professional_with_no_food_word_is_surfaced(self):
        # The `varietyfoodie` shape as the handoff records it: bio carries the city and a media
        # permit number, and no food word at all. Correctly excluded by the rule — and this is
        # the cross-cut that puts it back in front of a human.
        decision = classify.classify(profile(
            username="varietyfoodie",
            full_name="",
            biography="Dubai Licensed Vlogger | Media Permit 4957719",
            category_name="Reel creator",
        ))
        self.assertEqual(decision.bucket, "excluded")
        self.assertEqual(classify.near_misses([decision]), [decision])

    def test_non_uae_excluded_rows_are_not_near_misses(self):
        decision = classify.classify(profile(biography="Photographer in Lisbon",
                                             category_name="Photographer"))
        self.assertEqual(classify.near_misses([decision]), [])


class TestReconciliation(unittest.TestCase):
    def test_every_profile_lands_in_exactly_one_bucket(self):
        profiles = [
            profile(username=f"acct{i}", biography=bio, category_name=cat)
            for i, (bio, cat) in enumerate([
                ("Dubai food guide", "Blogger"),
                ("Delhi food", "Blogger"),
                ("nothing relevant here", None),
                ("Japanese food, Dubai", "Restaurant"),
                ("food reviews", "Blogger"),
            ])
        ]
        decisions = [classify.classify(p) for p in profiles]
        counts = classify.reconcile(decisions, len(profiles))
        self.assertEqual(sum(counts.values()), len(profiles))

    def test_reconcile_raises_when_a_profile_is_dropped(self):
        # The check must FAIL, not warn. A report covering 1,200 of 1,288 looks identical to one
        # covering all of them.
        decisions = [classify.classify(profile(username="a", biography="Dubai food"))]
        with self.assertRaises(AssertionError) as caught:
            classify.reconcile(decisions, 2)
        self.assertIn("dropped", str(caught.exception))

    def test_reconcile_raises_on_duplicate_handles(self):
        decisions = [classify.classify(profile(username="a", biography="Dubai food"))] * 2
        with self.assertRaises(AssertionError):
            classify.reconcile(decisions, 2)


class TestRosterRecall(unittest.TestCase):
    """
    The seven verified handles, with the handoff's bio text and a constructed `full_name`.
    """

    ROSTER = [
        dict(username="foodfindsuae", full_name="Food Finds UAE",
             biography="Trending food spots around UAE", category_name="Blogger"),
        dict(username="varietyfoodie", full_name="Variety Foodie",
             biography="Dubai Licensed Vlogger | Media Permit 4957719",
             category_name="Reel creator"),
        dict(username="foodieshamsi", full_name="Foodie Shamsi",
             biography="UAE", category_name="Digital creator"),
        dict(username="thehungrydentistt", full_name="The Hungry Dentist",
             biography="Licensed Blogger in the UAE", category_name="Blogger"),
        dict(username="bedouinfoodie", full_name="Bedouin Foodie",
             biography="Dubai based food writer & blogger | NMA permit 4854045",
             category_name="Blogger"),
        dict(username="mohamedeatss", full_name="Mohamed Eats",
             biography="UAE — sharing new places worth trying", category_name="Blogger"),
        dict(username="deliciousstation_ae", full_name="Delicious Station",
             biography="UAE Bloggers | real food gems", category_name="Blogger"),
    ]

    def test_all_seven_land_in_candidate(self):
        decisions = [classify.classify(profile(**entry)) for entry in self.ROSTER]
        self.assertEqual(classify.roster_check(decisions), [])

    def test_roster_recall_is_not_proof(self):
        """
        `full_name` is constructed, and for three of the seven it is what carries the food
        signal. Strip it and they fall out — which is a true statement about the rules and an
        unknown about the real accounts until a real scan runs.
        """
        stripped = [classify.classify(profile(**{**entry, "full_name": ""}))
                    for entry in self.ROSTER]
        fell_out = classify.roster_check(stripped)
        self.assertTrue(
            fell_out,
            "if nothing falls out when full_name is removed, this caveat can be deleted",
        )

    def test_roster_check_reports_the_bucket_it_actually_got(self):
        decisions = [classify.classify(profile(username="foodfindsuae",
                                               biography="Delhi street food",
                                               category_name="Blogger"))]
        problems = classify.roster_check(decisions)
        self.assertTrue(any("excluded" in p for p in problems), problems)

    def test_roster_check_flags_a_handle_missing_from_the_scan(self):
        problems = classify.roster_check([])
        self.assertEqual(len(problems), len(classify.KNOWN_ROSTER))
        self.assertTrue(all("not present" in p for p in problems))


if __name__ == "__main__":
    unittest.main(verbosity=2)
