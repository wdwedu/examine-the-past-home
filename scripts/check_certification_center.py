#!/usr/bin/env python3
"""Structural regression tests for the Examine the Past 5941 preparation center.

Run from the repository root:
    python scripts/check_certification_center.py
No third-party dependencies required.
"""
from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "teacher-tools" / "certification-prep"
EXAMS = ("foundations", "readiness", "final")
FILES = (
    "questions-world-early.json",
    "questions-world-modern.json",
    "questions-us-early.json",
    "questions-us-modern.json",
)
failures: list[str] = []


def check(condition: bool, message: str) -> None:
    if not condition:
        failures.append(message)
        print(f"FAIL {message}")


def normalized(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


def read(path: Path) -> str:
    if not path.exists():
        failures.append(f"missing file: {path}")
        return ""
    return path.read_text(encoding="utf-8")


seen_ids: set[str] = set()
seen_stems: set[str] = set()
all_items: list[dict] = []
for exam in EXAMS:
    questions: list[dict] = []
    for domain, filename in enumerate(FILES):
        path = ROOT / exam / filename
        try:
            items = json.loads(read(path))
        except (ValueError, OSError) as e:
            failures.append(f"{path}: invalid JSON: {e}")
            continue
        check(len(items) == 30, f"{exam}/{filename}: expected 30 items")
        for item in items:
            question_id = item.get("id", "")
            stem = item.get("stem", "")
            opts = item.get("options", [])
            check(question_id not in seen_ids, f"duplicate question ID {question_id}")
            check(normalized(stem) not in seen_stems, f"duplicate stem: {question_id}")
            seen_ids.add(question_id)
            seen_stems.add(normalized(stem))
            check(item.get("domain") == domain, f"{question_id}: incorrect domain")
            check(isinstance(opts, list) and len(opts) == 4, f"{question_id}: 4 choices expected")
            if isinstance(opts, list):
                check(len(set(map(normalized, opts))) == 4, f"{question_id}: choice duplication")
            check(item.get("answer") in (0, 1, 2, 3), f"{question_id}: invalid answer key")
            check(len(item.get("explanation", "")) >= 45, f"{question_id}: explanation too short")
            check(bool(item.get("skill")), f"{question_id}: missing thinking skill")
            questions.append(item)
            all_items.append(item)
    check(len(questions) == 120, f"{exam}: expected 120 questions, got {len(questions)}")
    check(Counter(q["domain"] for q in questions) == Counter({0: 30, 1: 30, 2: 30, 3: 30}),
          f"{exam}: expected four balanced history domains")

check(len(all_items) == 360, f"expected 360 questions, got {len(all_items)}")
hub = read(ROOT / "index.html")
for exam in EXAMS:
    check(f'href="{exam}/"' in hub, f"Prep Center does not link to {exam}")

foundation = read(ROOT / "foundations" / "index.html")
check("localStorage.setItem(KEY" in foundation, "foundations: automatic saving missing")
check("download-backup" in foundation and "restore-file" in foundation, "foundations: progress backup missing")
check("certificate-score" in foundation and "print-cert" in foundation, "foundations: certificate missing")
check("answered()<N" in foundation, "foundations: certificate completion rule missing")

for exam in ("readiness", "final"):
    page = read(ROOT / exam / "index.html")
    check("const N=120,TIME=120*60*1000" in page, f"{exam}: timer configuration missing")
    check("deadline=Date.now()+TIME" in page, f"{exam}: wall-clock deadline missing")
    check("if(remaining<=0)submit(true)" in page, f"{exam}: auto-submit missing")
    check("localStorage" not in page and "sessionStorage" not in page,
          f"{exam}: timed exam must not save/resume")
    check("body.print-certificate #results>:not(.cert)" in page,
          f"{exam}: certificate-only print CSS missing")
    check("window.print()" in page, f"{exam}: print PDF action missing")
    check("../" in page and "../../../assets/site-shell.js" in page,
          f"{exam}: return navigation or shared footer/header missing")

print(f"Checked {len(all_items)} original questions in {len(EXAMS)} exam banks.")
if failures:
    print(f"{len(failures)} validation problem(s):")
    for error in failures:
        print(" •", error)
    sys.exit(1)
print("PASS: question banks, links, saving rules, timer controls and print selectors")
