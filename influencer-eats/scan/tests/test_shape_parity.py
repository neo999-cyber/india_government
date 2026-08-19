"""
The Python client and the browser scanner must write the same record shape.

WHY THIS IS A TEST AND NOT A COMMENT
    `classify.py` reads its fields with `.get()`. A field the browser path spells differently —
    or stops emitting — does not raise: it reads as absent, which the classifier interprets as
    an empty bio and an empty category. The visible symptom is a scan of 1,288 accounts that
    finds no food influencers at all, and the report reconciles perfectly while saying it.

    So the failure mode of a drift here is a clean-looking, completely wrong answer, which is
    the same class of defect the whole of step 1 exists to remove. It gets a check.

HOW IT CHECKS
    The JS field list is read out of `browser_scan.js` itself, not retyped here. A list retyped
    in the test agrees with whatever the author believed at the time and stops tracking the file
    the moment someone edits it.
"""

import os
import re
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import ig_client  # noqa: E402

SCAN_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BROWSER_SCRIPT = os.path.join(SCAN_DIR, "browser_scan.js")


def js_profile_fields() -> set[str]:
    """Parse the keys of the object literal `parseProfile` returns."""
    with open(BROWSER_SCRIPT, encoding="utf-8") as handle:
        source = handle.read()
    start = source.index("function parseProfile")
    body = source[start:]
    open_at = body.index("return {")
    depth, end = 0, None
    for index in range(open_at + len("return "), len(body)):
        char = body[index]
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                end = index
                break
    assert end is not None, "could not find the end of parseProfile's return literal"
    literal = body[open_at + len("return {"): end]
    # Top-level keys only: skip anything nested inside a deeper brace.
    fields, depth = set(), 0
    for line in literal.splitlines():
        stripped = line.strip()
        if depth == 0:
            match = re.match(r"^([A-Za-z_][A-Za-z0-9_]*)\s*:", stripped)
            if match:
                fields.add(match.group(1))
        depth += stripped.count("{") - stripped.count("}")
    return fields


class TestShapeParity(unittest.TestCase):
    def test_browser_and_python_emit_the_same_fields(self):
        python_fields = set(ig_client.Profile(username="x").to_json().keys())
        self.assertEqual(
            js_profile_fields(),
            python_fields,
            "browser_scan.js and ig_client.Profile have drifted — classify.py would read the "
            "missing fields as empty and report a scan that found nothing",
        )

    def test_the_parser_actually_found_fields(self):
        # The positive control. Without it, a parser that silently returns an empty set on both
        # sides would make the comparison above pass by finding nothing at all.
        fields = js_profile_fields()
        self.assertGreater(len(fields), 10)
        for expected in ("username", "biography", "category_name", "is_professional_account"):
            self.assertIn(expected, fields)

    def test_the_fields_classify_reads_are_all_present(self):
        # Named explicitly, because these are the ones whose absence changes a verdict rather
        # than merely losing information.
        python_fields = set(ig_client.Profile(username="x").to_json().keys())
        for field in ("username", "full_name", "biography", "category_name",
                      "business_category_name", "is_professional_account", "followers",
                      "business_address", "error", "error_kind"):
            self.assertIn(field, python_fields)
            self.assertIn(field, js_profile_fields())


if __name__ == "__main__":
    unittest.main(verbosity=2)
