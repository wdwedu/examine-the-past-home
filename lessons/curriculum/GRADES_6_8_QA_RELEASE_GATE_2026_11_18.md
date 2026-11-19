# Examine the Past — Grades 6–8 Content and Release QA
**Audit date:** 2026-11-18
**Decision:** Technical content/data corrections committed; **NOT yet approved for classroom-grade summative use**.

## What was audited and verified
- 20 grade 6–8 assessment configurations: Grade 6 (6), Grade 7 (6), Grade 8 (8).
- Original baseline (before current revision): 120 multiple-choice prompts matched existing lesson checks and answer keys. Current build: **36 Grade 6 questions are newly rewritten, source-based items**, while the other **84 Grade 7–8 items** retain their lesson-derived checks. All 120 current answer indices are structurally valid; an independent teacher/historian must still review the newly written keys and remaining distractors before summative approval.
- All 70 assessment passages were traced to the corresponding unit lesson reading text. The passages were expanded to complete sentences with a grade progression (approx. 100 words at G6, 120–130 at G7, 150–170 at G8).
- An earlier Grade 6 flaw (all 36 correct answers in option A) was repaired by deterministic choice reordering with keys updated.
- Evidence selection claims were rebuilt as complete source-grounded sentences and answer positions varied; every set has 2 supported claims and 1 unsupported universal assertion.
- The shared Grade 6–8 JavaScript compiles; configured scoring remains 6+3+3+3+12=27, threshold 22/27, and the rubric is four criteria with 0–3 ratings.
- All 90 expected GitHub file paths were checked in the preceding repository audit (20 assessments and 70 referenced lessons), and all 20 links were confirmed in the course indices.
- The rubric stays beneath the writing area; sample release is gated by complete self-review and resets on form change/reset.
- The result banner was revised to distinguish student self-check from teacher-verified proficiency.
- Every shared source excerpt links back to its full lesson, and provenance disclaimers were strengthened.

## Audit findings still blocking classroom-readiness approval

**BLOCKER 1 — historical source quality**
The evidence packets contain adapted in-house secondary instructional passages. The external unit links are frequently generic curricula, museums, or education references; they do **not** provide verified provenance, creator, date, or page-level citations for every passage. These are not primary-source sets and do not yet support an authentic primary-source assessment claim. The historical content is internally consistent with unit lessons; this is not the same as independent historical verification. For classroom-ready status, replace or supplement excerpts with properly attributed, dated, context-rich primary and reputable secondary sources and verify each claim.

**BLOCKER 2 — grade-level rigor and task validity**
Some multiple-choice distractors are implausible (e.g., 'Maps cannot contain symbols', 'Every river is salty'), so the task may reward eliminating absurd alternatives rather than analyzing sources. The three-item source matching often matches a lesson question to its obvious lesson title. The ordering task tests a generic inquiry routine. Evidence selection includes a clearly overbroad 'everyone was identical' option. These do not adequately demonstrate the full range of Bloom's applying, analyzing, evaluating, and creating. Source-based reading grew by grade, but true qualitative reading complexity, text vocabulary, document demands, and performance standards have not been calibrated using classroom-level item review. Revise items with close distractors and real, diverse sources; add multiple-part item sets and claim/evidence justifications.

**BLOCKER 3 — reporting/assessment validity**
The final result combines 15 automatically scored points and 12 student-entered rubric points. The student's self-assessment can inflate the total, so the displayed 22/27 threshold is NOT a teacher-verified measure of mastery or a validated state-like score. It is now marked as a self-check. A future formal assessment needs a teacher-verified submission and review workflow or an explicitly separate unverified self-reflection score.

**BLOCKER 4 — exact state assessment-limit alignment**
Maryland's 2025 Grade 6–7 Framework integrates inquiry across thematic study; it is not simply a fixed ancient-world/World Cultures sequence. The 2025 Middle School U.S. History framework and released 8th-grade items set individual indicators and assessment limits. Current Grade 8 unit 8.1 includes colonial history before 1763 (background, not the core 1763–1890 tested window), while the Grade 8 catalog ends with Reconstruction and does not clearly supply the complete industrial/urban 1877–1890 bridge emphasized in Maryland's middle/high school frameworks. Complete a unit-to-indicator crosswalk and resolve any missing bridge content before calling it Maryland-assessment-aligned.

**BLOCKER 5 — deployed interactive QA**
After following links from the live History Hub, the public Grade 6, Grade 7 and Grade 8 course directories were reachable, and three assessment HTML routes (6.1, 7.1 and 8.8) returned their expected page shells. Because the assessment content is injected by JavaScript, the available web viewer shows only "Loading historical thinking assessment…" and does not execute or verify the questions or interface. The public JS/data assets could not be retrieved directly through that viewer. Thus live HTML routes are **partially verified**, but print/copy, keyboard/focus, responsive layout, scoring, reset, sample gating and dynamic rendering have **not** been tested in a real interactive browser. Complete E2E tests before sign-off.

## Release decision
- **Repository infrastructure:** PASS.
- **20 unit page links:** PASS in source control.
- **Question/key consistency with original lessons:** PASS (120/120).
- **Source text relationship to lesson data:** PASS (70/70).
- **Sufficient historical source provenance:** NOT YET.
- **Strong enough assessment rigor:** NOT YET.
- **Teacher-verified proficiency reporting:** NOT YET.
- **Exact 2025 Maryland indicator/assessment limit crosswalk:** NOT YET.
- **Live page shells and course directory links:** PARTIALLY VERIFIED (sample Grade 6/7/8 routes).
- **Deployed browser/interaction validation:** NOT VERIFIED (JavaScript not executed).
- **Classroom-ready approval:** WITHHELD.

## Final acceptance work before release
1. Create per-item source registers: source creator/date/collection/URL/rights/claim backed.
2. Rewrite weak distractors, source-matching and evidence items for genuine analysis; include maps, short primary documents, data displays, and comparative source sets.
3. Crosswalk Grade 6–7 units to Maryland Standard 6.0 and content indicators, Grade 8 to 2025 Middle School U.S. History indicators and assessment limits; address 1763–1890 coverage and the industrial/urban bridge.
4. Keep student self-check separate from the teacher-verified final score; implement teacher submission or printable review packet for meaningful writing grading.
5. Test all 20 assessments in Chrome desktop/mobile: highest/lowest/partial scores, unanswered, reset, sample gating, keyboard and screen reader, printing, copying, CSS layout, and deployed cache versions.
6. A human teacher/historian should conduct a content and grade-level item read-through before classroom-certification.
7. Repeat the gate before a high-school rollout.

## Official references
- Maryland 2025 Grade 6–7 Framework: https://msde.maryland.gov/media/17925
- Maryland Middle School United States History: https://msde.maryland.gov/media/17918
- Maryland Social Studies Frameworks: https://msde.maryland.gov/academics-0/curriculum-academic-standards/social-studies
- Released Grade 8 social studies items: https://assessments.msde.maryland.gov/public/assessment-limit-examples
- Maryland High School U.S. History Framework: https://msde.maryland.gov/media/17926
- Maryland American Government released items: https://assessments.msde.maryland.gov/public/grp-standard-in-american-government
- Maryland Modern World History Framework: https://marylandpublicschools.org/about/pages/dcaa/social-studies/hsmwh.aspx

## Next phase inventory: Grades 9–12 (planning only)
- Grade 9 U.S. History: 11 units, 45 lesson links. Align with HS US History framework, beginning with industrial/urban bridge and reform.
- Grade 10 Civics & Government: 9 units, 31 lesson links. Use released American Government tasks for grade/assessment expectations.
- Grade 11 Modern World History: 11 units, 40 lesson links. Modern World History framework spans approximately 1300 to present.
- Grade 12 Social Studies Electives: 5 units, 20 lesson links. Distinct assessment blueprints by subject, research depth and performance task.
- Total high school inventory presently indexed: **36 units, 136 lessons**.
- Preserve the core approved visual identity but increase document complexity, source corroboration, argument/counterargument, DBQs, civic simulations, and original research. Do not blindly duplicate the 27-point middle-school quiz for high school.


## Release-candidate improvement addendum — 2026-11-18
- Replaced all **36 Grade 6 multiple-choice questions** with new source-referenced reasoning prompts tied to the already-authored unit passages and maintained six one-point questions per unit. These questions must not be reported as the original lesson-check prompts.
- Replaced the trivial unsupported evidence claim in all 20 units with contextual, historically specific claims requiring closer source evaluation.
- Added seven source registers of directly verified National Archives primary records to Grade 8 Units 8.2–8.8 and updated the shared renderer to present archive links with creator/date/type/limitation metadata. Grade 8.1 and Grade 6/7 unit-by-unit original-source integration remain incomplete.
- Published and linked a **Grade 8 Industrial and Urban America (1877–1890) bridge source lab** using the National Archives Sherman Act and Chinese Exclusion Act and the 1890 Library of Congress population map. This is supplemental source practice, not a complete replacement for a standards-aligned Bridge Unit.
- Added a dependency-free repository QA script at `tests/assessment-data.test.cjs`; it can be run with `node tests/assessment-data.test.cjs` in a GitHub checkout. The connector-based audit checked structural rules, but the script was not executed as a hosted CI workflow.
- Refreshed all Grade 6–8 assessment HTML files to use the latest shared script version m3.
- Classroom-ready signoff is **still withheld** until the remaining source, item-quality, exact indicators/assessment limits, validated teacher scoring and real browser checks are complete.

## Latest cross-grade scope (post-pilot)
- Grades 6–8: 20 assessments, 120 MC items, 70 source passages. Seven Grade 8 packets now offer attributed original-record links.
- Grades 9.1 and 9.2: two separate high-school pilot assessments using three traceable primary documents each plus a labeled secondary historical source, with post-review four-paragraph model answers. These are pilots, not yet summative-certified.
- Shared QA script: `node tests/assessment-data.test.cjs`; workflow: `.github/workflows/assessment-qa.yml`. Syntactic checks have passed via connector; no completed hosted workflow run is asserted.
- Grade 8 1877–1890 supplemental source bridge lab added and linked. Full state-framework crosswalk and live browser testing remain open.
