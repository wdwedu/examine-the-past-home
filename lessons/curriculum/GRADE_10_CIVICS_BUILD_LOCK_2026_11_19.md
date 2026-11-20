# Grade 10 — Civics & Government Build Baseline
**Build date:** November 19, 2026
**Status:** FULL CODE/DATA BUILD COMPLETE; repository and simulated rendering QA PASSED; real public-browser checks and independent classroom signoff NOT yet performed.

## Built
- Nine Grade 10 units, maintaining the existing course directory and unit order.
- Thirty-one substantive, authored civic lessons replacing the prior generic preview output. Each contains two explanatory readings, an essential inquiry, original-source/official-reference links, a source-comparison response, a scored formative question, a written civic argument and lesson navigation.
- Four Presidents Challenge optional brain breaks with a new-tab link, return-and-verify-a-fact prompt, and no impact on unit scores.
- Nine source-backed civic assessments, one linked per unit; six MC questions per unit (54 total), three source matches, three inquiry steps, three evidence judgments, 12-point written response rubric (27 total). Four-paragraph grade-appropriate sample responses gated behind completed self-review.
- Navy/deep red/white Grade 10 visual theme, on Examine the Past black, retaining Georgia type, bold yellow headings and the established rubric placement.
- Current Maryland 2025 American Government Framework cited: https://www.marylandpublicschools.org/about/Documents/DCAA/SocialStudies/Framework/AmericanGovernment-A.pdf . Additional original constitutional documents, law/court opinions, official agencies and Maryland/Charles County sources linked in each unit.

## Repository QA passed
- 9/9 units and 31/31 lessons and 9/9 assessments present and linked.
- 31/31 lesson page HTML scripts refreshed to use the specialized Grade 10 renderer.
- 31/31 lesson records dynamically rendered in a synthetic DOM harness without exceptions; source evidence, civic scenario and reflection sections present.
- 9/9 assessment records dynamically rendered in a synthetic DOM harness without exceptions; six question fieldsets and the existing writing rubric present.
- 54/54 MC answer indices valid, with nonduplicate prompts and three options each.
- All nine assessment max scores: 27 points; inquiry positions are 0,1,2 and two of three evidence conclusions are supported.
- All nine sample answers now 4 developed paragraphs each.
- All 31 formative answer choices redistributed rather than always marking A correct.
- Nine-unit source registers: 27 linked original/official/secondary records or interpretive references. These are a mix; not all are primary.
- JavaScript syntax checks passed for the lesson engine, assessment engine and existing lesson router.
- Added `tests/grade10-civics.test.cjs` and `.github/workflows/grade10-civics-qa.yml`.

## Files
- `assets/grade10-civics-course-data.json`
- `assets/grade10-civics-lesson.js`
- `assets/grade10-civics-assessments-data.json`
- `assets/grade10-civics-assessments.js`
- `assets/grade10-civics.css`
- `lessons/curriculum/grade-10-civics-government/index.html`

## Explicit limits
- The hosted website could not be reached in the available text web viewer; there is no deployed Chrome/mobile E2E claim. A synthetic DOM render is a useful code check but does not verify actual CSS, touch, focus, printing, clipboard or network fetch in a browser.
- The linked documents come from official or authoritative sites where identified, but each of the 27 links has not been independently verified for current HTTP status and historical claim-level provenance.
- Standards alignment is course/topic-level, not a certified exact indicator-by-indicator crosswalk or state assessment-limit validation.
- Writing points are student self-rated until teacher-reviewed. The assessment's 80% result is not independently verified proficiency.
- This is a locked build candidate, not independently classroom-certified summative assessment.

## Next stage
1. Verify the live deployment of selected lesson and assessment routes; test desktop/mobile, keyboard, source links, scoring, reset, modal, copy and print.
2. Review all nine unit questions against exact Maryland American Government indicators and limits and verify source provenance.
3. Mark Grade 10 as classroom-certified only after verified independent review; then begin Grade 11 Modern World History.


## Mandatory corrective build — November 20, 2026

**The November 19 simplified lesson layout was NOT compliant with the approved Grade 5 template and is superseded.** The previous report's lesson presentation approval is replaced by this corrected baseline. The authored civics data, unit assessments and course colors were preserved.

- **New production renderer:** `assets/grade10-grade5-matched-engine.js`, derived from the existing Grade 5/Grade 9 family of approved lesson mechanics, not the simplified `grade10-civics-lesson.js`.
- **Template-aligned content:** `assets/grade10-grade5-matched-data.json`, retaining 9 units / 31 lesson topics, developed into three-stage readings and investigative tasks.
- **Styling:** inherited `grade5-lesson-engine.css` + existing civics theme + `grade10-grade5-matched.css` (navy/red, white accents, black background, bright #fff200 headings).
- **Universal required toolbar:** sticky timer with selectable 15-second–45-minute durations, countdown, start/pause/reset, sound toggle, responsive sticky progress meter, and icon section navigation.
- **Full lesson sections:** plan and pacing; opening pre-check; vocabulary and lesson reading; embedded contextual educational video with source-comparison prompt; three-stage inquiry lab; independent/pair/group choices; five formative learning credits; civic writing and rubric; knowledge check; optional enrichment; documented source references and assessment link.
- **Media:** all 31 lessons have a verified topical Crash Course Government & Politics video assignment, with a YouTube-nocookie embed and external watch link. Video is contextual instruction, NOT primary evidence. Episode selections are unit-based and may be shared by multiple lessons; every embed's live playback has not been confirmed.
- **Presidents Challenge:** four suitable lessons retain an optional brain break and evidence-based return prompt.
- **Template regression test:** `tests/grade10-template-parity.test.cjs` checks 18 required IDs/controls against the Grade 5 baseline, nine units, 31 lessons, 31 video assignments, four game connections, and updated lesson script versions. GitHub Actions QA workflow now includes it.
- **QA performed:** All 31 lessons rendered with the full template in a synthetic DOM harness without exceptions; all 31 lesson HTML routes confirmed to request `history-hub-lesson.js?v=20261120-civics-template-v1`. 31/31 have key required toolbar, player, pre-check, inquiry, check and writing elements in their rendered markup. JavaScript syntax passes.
- **Unchanged:** Nine unit assessment data sets and their existing 27-point scoring structure; the original Grade 5 lessons and other grades were not modified by this repair.
- **Release distinction:** technical template and repository validation passed; actual deployed Chrome/mobile operation, external video playback, accessibility testing and independent classroom content certification are not represented as tested.

**Current status:** GRADE 10 LESSON TEMPLATE REPAIR COMPLETE IN REPOSITORY; preserve this working model for future grades, with a required template-parity test before approval.
