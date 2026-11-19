# Examine the Past — Assessment Build Lock, Grades 6–9
**Date:** November 19, 2026
**Code/Data baseline:** LOCKED FOR BUILD — do not redesign or alter unless a verified QA defect or deliberate approved curricular change requires it.
**Classroom-grade certification:** NOT YET CLAIMED. Browser-interaction and teacher/historian signoff are separate final release gates.

## Inventory
- Grade 6: six unit assessments (6.1–6.6).
- Grade 7: six unit assessments (7.1–7.6).
- Grade 8: eight unit assessments (8.1–8.8), plus separate 1877–1890 bridge lab.
- Grade 9: eleven unit assessments (9.1–9.11); 9.1 is bridge review, 9.2 is first formal high school-history unit per Maryland's 2025 framework.
- Total assessment pages: **31**; multiple-choice items: **186**; source entries: **114**; lesson references: **115**.

## Reviewed locked asset versions
- Middle school JS: `assets/middle-school-assessments.js?v=20261119-locked1`.
- Middle school JSON: `assets/middle-school-assessments-data.json?v=20261119-locked1`.
- Grade 9 JS: `assets/high-school-assessments.js?v=20261119-locked1`.
- Grade 9 JSON: `assets/high-school-assessments-data.json?v=20261119-locked1`.
- CSS shared presentation: `assets/middle-school-assessments.css?v=20261119-locked1`.

## Snapshot GitHub blob identifiers
- Middle school data: `3326548f313fd5c0e102453c4ed88852d10004d9`
- Grade 9 data: `e5a14776f0012429453be01cf2f3196166a6f21f`
- Middle school engine: `30482fa1e3ace19e528f2d9867243912c0c256c9`
- Grade 9 engine: `89e14ec23c96fa66a27e9ed6e3e3d247097cfa80`

## Internal QA: PASS
- 31/31 assessment pages point to their correct unit and current shared script.
- 20 middle school and 11 Grade 9 unit records.
- 186/186 multiple-choice correct-answer indices valid; six distinct prompts in each unit.
- Three source matches, three distinct inquiry ordering answers, and three evidence judgments with two supported and one unsupported conclusion per unit.
- 27-point score limit per assessment (6 + 3 + 3 + 3 + 12), 22/27 as 80% target.
- Shared JS engines and Node QA test script pass syntax compilation.
- All 36 Grade 6 multiple-choice questions and 28 Grade 7–8 questions were rewritten to increase evidence analysis and plausibility of answer choices.
- Grade 9.3–9.11: 54 unique source-analysis questions replaced generic prototypes.
- 2025 Maryland framework consulted for sequence; 1877–1890 Grade 8 to Grade 9 bridge recognized.
- Grade 9 documents include linked National Archives, Library of Congress, federal presidential library and 9/11 Memorial source collections; originals and modern secondary lesson summaries explicitly distinguished.
- Fixed the Library of Congress population-density map's *publication* date to 1892 while it depicts 1890 census data.

## Not certified / not silently re-described as PASS
1. **Real-browser execution** on deployed public URLs for each assessment (JS data fetch, actual options rendered, scoring clicks, incomplete input, keyboard/touch, modal focus, printing, copy and sample-answer gating). The text-only web viewer does not run the application; the local browser has no outside network access. No false claims of deployed E2E testing.
2. **Independent source-level historical accuracy and exact indicator/assessment-limit alignment** of *each question* to Maryland's latest standards. Original-source links are available, but inclusion of a link does not itself prove a text or item is validated.
3. **Independent teacher review of extended writing**. Self-scoring remains transparently labeled as provisional reflection, not verified teacher proficiency.
4. **Production usability** testing across supported Chrome desktop and mobile breakpoints, including linked external resources and publication caching.

## Release decision
**Approved:** Repository build and static/schema QA baseline for Grades 6–9, locked.
**Not approved:** Definitive classroom-summative certification. Do not represent student self-rated writing total as independently verified passing status.
**Next curricular build:** Grade 10 Civics & Government, but its lesson content is currently draft preview material. Develop full lesson evidence, then assessments, without duplicating generic unit questions.

## Repeatable checks
- `node tests/assessment-data.test.cjs` in a repository checkout; GitHub workflow at `.github/workflows/assessment-qa.yml`.
- Review reports: `GRADES_6_8_QA_RELEASE_GATE_2026_11_18.md` and `HIGH_SCHOOL_ASSESSMENT_ROLLOUT_9_TO_12.md`.
