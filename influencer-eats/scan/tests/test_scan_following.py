"""
Tests for the export parser and the resume logic.

The resume logic is what makes a full 1,288-account pass survive a throttle, and a full pass is
the entire deliverable of step 1. If a re-run cannot pick up where it stopped, the practical
response to an interruption is to shrink the input — which recreates the coverage gap while
looking like a reasonable decision.
"""

import json
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import scan_following  # noqa: E402

REAL_EXPORT = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..", "data", "following.json")


def write(tmp, name, text):
    path = os.path.join(tmp, name)
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(text)
    return path


class TestReadFollowing(unittest.TestCase):
    def test_documented_export_shape(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = write(tmp, "f.json", json.dumps({"relationships_following": [
                {"title": "alpha", "string_list_data": [{"href": "x", "timestamp": 1}]},
                {"title": "beta", "string_list_data": [{"href": "y", "timestamp": 2}]},
            ]}))
            self.assertEqual(scan_following.read_following(path), ["alpha", "beta"])

    def test_falls_back_to_href_when_title_is_absent(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = write(tmp, "f.json", json.dumps({"relationships_following": [
                {"string_list_data": [{"href": "https://www.instagram.com/_u/gamma"}]},
            ]}))
            self.assertEqual(scan_following.read_following(path), ["gamma"])

    def test_bare_list_shape_is_accepted(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = write(tmp, "f.json", json.dumps(["alpha", "@beta"]))
            self.assertEqual(scan_following.read_following(path), ["alpha", "beta"])

    def test_export_order_is_preserved_and_duplicates_collapse(self):
        # The export is newest-follow first, and that order is worth keeping: if a run is cut
        # short, the handles most likely to be new influencers were fetched first.
        with tempfile.TemporaryDirectory() as tmp:
            path = write(tmp, "f.json", json.dumps(["c", "a", "C", "b", "a"]))
            self.assertEqual(scan_following.read_following(path), ["c", "a", "b"])

    def test_unrecognised_shape_raises_rather_than_returning_nothing(self):
        # Returning [] would report "0 accounts to scan" and exit 0 — a clean-looking run that
        # checked nobody.
        with tempfile.TemporaryDirectory() as tmp:
            path = write(tmp, "f.json", json.dumps({"something_else": {"a": 1}}))
            with self.assertRaises(ValueError):
                scan_following.read_following(path)

    @unittest.skipUnless(os.path.exists(REAL_EXPORT), "no local following.json")
    def test_against_the_real_export(self):
        handles = scan_following.read_following(REAL_EXPORT)
        self.assertEqual(len(handles), 1288, "the handoff records 1,288 followed accounts")
        self.assertEqual(len(set(h.lower() for h in handles)), 1288)
        for known in ("foodfindsuae", "varietyfoodie", "bedouinfoodie"):
            self.assertIn(known, handles)


class TestResume(unittest.TestCase):
    def test_already_scanned_reads_handles_back(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = write(tmp, "out.jsonl", "\n".join([
                json.dumps({"username": "alpha"}),
                json.dumps({"username": "Beta"}),
                "",
            ]))
            self.assertEqual(scan_following.already_scanned(path), {"alpha", "beta"})

    def test_missing_output_is_an_empty_set_not_an_error(self):
        with tempfile.TemporaryDirectory() as tmp:
            self.assertEqual(scan_following.already_scanned(os.path.join(tmp, "nope.jsonl")), set())

    def test_a_truncated_final_line_does_not_lose_the_whole_file(self):
        # An append-only file killed mid-write ends in a partial record. Refusing to read the
        # file at that point would restart a 1,288-profile scan from zero.
        with tempfile.TemporaryDirectory() as tmp:
            path = write(tmp, "out.jsonl",
                         json.dumps({"username": "alpha"}) + '\n{"username": "bet')
            self.assertEqual(scan_following.already_scanned(path), {"alpha"})


class TestDryRun(unittest.TestCase):
    def test_dry_run_reports_the_work_and_fetches_nothing(self):
        with tempfile.TemporaryDirectory() as tmp:
            following = write(tmp, "f.json", json.dumps(["a", "b", "c"]))
            out = os.path.join(tmp, "out.jsonl")
            code = scan_following.main(["--following", following, "--out", out, "--dry-run"])
            self.assertEqual(code, 0)
            self.assertFalse(os.path.exists(out), "a dry run must not create the output file")

    def test_dry_run_subtracts_what_is_already_done(self):
        with tempfile.TemporaryDirectory() as tmp:
            following = write(tmp, "f.json", json.dumps(["a", "b", "c"]))
            out = write(tmp, "out.jsonl", json.dumps({"username": "a"}) + "\n")
            code = scan_following.main(["--following", following, "--out", out, "--dry-run"])
            self.assertEqual(code, 0)
            self.assertEqual(scan_following.already_scanned(out), {"a"})


if __name__ == "__main__":
    unittest.main(verbosity=2)
