# Grade 9 Comprehensive Consistency Audit / Grade 10 Handoff
Date: 2026-11-23
Release state: **Editorial / structural QA PASS; independent academic + browser verification NOT YET CLEARED**

## Grade 9: Full 45-lesson audit after Units 9.10–9.11 revision

- 45 lessons in Units 9.1–9.11; 135 multiple-choice lesson checks.
- Every lesson includes 3 reading panels, 3 source-based investigation tasks, 3 multiple-choice questions and ≥1 attributed historical or institutional source.
- 101 source entries representing 95 distinct URL strings; all entries contain HTTPS links and title, creator, date/period, type and contextual summary.
- 135 unique question prompts; no within-question duplicate answers or out-of-range answer indices. No remaining identified mass-generated generic check stems or three recurring generic reading directives.
- Units 9.10–9.11: 8 lessons rewritten, 18 reference entries, 24 assessments and 24 inquiry tasks. Grade 9 engine, shared lesson loader and Grade 9 assessment HTML were refreshed to retrieve final revised JSON.

### Critical academic caveat: 'source-linked' is NOT the same as 'item-level citation verified'
Some Grade 9 sources are collection gateways, original documents embedded in museum explanations, later research studies rather than primary texts, or dated government statistical reports. The Grade 9 source *metadata and structural coverage* checks are complete; the following cannot yet be certified:
1. Independently opening **all 95** distinct links in the actual deployed page and checking redirects/status and readability.
2. Matching every claim against original passages/page numbers and attributing translated texts correctly.
3. Ensuring at least two independently authored original records in every historical topic. Some lessons have only secondary institutional accounts or two records from one institution.
4. Ensuring sensitive source selection, content guidance and appropriate excerpts in Holocaust, slavery, racial violence, Japanese American incarceration and September 11 lessons.
5. Checking unit-assessment runtime behavior, school device accessibility, copyright/image reuse, video playback and mobile layout.
6. Commissioning specialist/editorial peer review, particularly on topics with contested causal interpretations.

### Document-type cautions
- The 9/11 Commission's 2004 Executive Summary is an official **retrospective investigation**, not an eyewitness record created on September 11.
- Reagan's 1981 economic speech expresses policy claims; the enacted Economic Recovery Tax Act states legal changes, not measured macroeconomic results.
- State Department accounts about 1989/1991 are **secondary**, not original Eastern European protest records.
- Federal NTIA 2011 and 2014 studies provide dated empirical measures; figures cannot be treated as 2026 adoption levels.
- NAFTA entered into force January 1, 1994, but was superseded by USMCA in 2020. Modern U.S. trade policy must be separately dated.
- Paris Agreement adopted December 2015: distinguish adoption from subsequent participation/implementation.

## Grade 10: diagnostic before full editorial sweep

**Grade 10 total**: 31 lessons, 93 lesson-check questions, 95 references representing just 22 distinct URLs. Reuse of a small number of broad civic sources is **not proof** that a given source is relevant to each lesson.
- All 31 lessons have source metadata.
- Original audit found *identical* second and third question stems in all 31 lessons, with repeated answer alternatives. This is a **major AI-looking/editorial quality blocker**.
- First batch committed on this date: the first three Unit 10.1 lessons (Enlightenment Ideas; Declaration of Independence; Democratic Government Principles) have unique, concept-driven question sets and investigation tasks.
- Primary original texts added: John Locke's *Second Treatise* (Project Gutenberg reproduction, edition dating caution) and Abigail Adams's March 31, 1776 letter (Founders Online/NARA).
- After initial Grade 10 batch, 28 lessons remain with duplicated question stems (56 duplicated question items).
- Grade 10 introduction now compares original texts against their claims and limits rather than using only generic 'verify sources' selections.
- Grade 10 lesson engine and shared lesson loader parse and have refreshed asset cache versions.
- These are lesson checks: formal Grade 10 **nine-unit assessments** must be audited separately for source validity, scoring, feedback, written self-ratings, and mobile controls.

## Immediate next work
1. Replace the other 28 Grade 10 lessons' repeated generic questions and investigation templates **individually**, matching the governing constitutional provisions, institutions and legal limits.
2. Audit full Grade 10 unit assessments (9 units) against the new source-specific lesson checks; ensure scoring doesn't confuse self-assessed writing with teacher-graded proficiency.
3. Perform an external-link and claim-level Grade 9 primary-source verification sweep, with named record, creator, date, stable URL, and precise passage/record ID. Corrections should be committed rather than assumed.
4. Complete cross-device live regression of Grades 9–10 and curriculum navigation.
5. Only after those gates pass proceed to academic release approval. Continue the same review standard for Grades 11–12.

**No assertion of an 'error-free' final release is warranted by data parsing or text improvements alone.**
