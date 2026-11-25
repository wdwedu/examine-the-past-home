# Examine the Past — Grades 9–12 Final Release Audit
**Audit date:** November 24, 2026
**Overall decision: EDITORIAL AND REPOSITORY STATIC QA PASSED; FULL CLASSROOM RELEASE NOT CERTIFIED.**

The word "final" means this is the final consolidated audit after the Grade 12 editorial build, **not** that unresolved source, accessibility, Maryland indicator mapping or live-browser gates have passed.

## Follow-up build · November 24, 2026

- All 16 Grade 11–12 units now have six Part A questions each (66 Grade 11, 30 Grade 12). The three added questions per unit assess interpretation, application or evidence selection. Previous response positions and answer keys carry over.
- The 12-point teacher rubric now describes the evidence for each score level. Parts B and C are assessed separately from the automatic Part A score. Grade 12 retains the documented senior research product.
- Static validation passed for 96 distinct prompts and answer keys. A simulated-DOM test exercised scoring, feedback, saved responses, copying and clearing across all 16 units. Desktop and mobile classroom acceptance and assistive-technology testing remain release gates.
- The source ledger records four passage- or record-level findings. The scarcity lesson now links the relevant opportunity-cost textbook section. The Maryland crosswalk identifies four exact objectives and the evidence still needed for full alignment.
- The four courses remain interactive drafts. Full source verification, official alignment review, accessibility, and summative validity remain open.

### Source verification and browser follow-up · November 24, 2026

- Reviewed nine additional claims. Eight are supported at the scope described in the [source ledger](2026-11-24-grades9-12-source-to-claim-ledger.md). The Soviet Union row is partial because the departure chronology is documented and the evidence needed to compare economic and political causes is incomplete.
- Added item-level readings to four lessons. These cover the 1938 Fair Labor Standards Act, the Versailles treaty clauses, the market equilibrium model and the demographic balancing equation.
- In public desktop Chromium, Grade 9 Unit 9.9 and Grade 10 Unit 10.7 rendered their forms and reported incomplete submissions with a pending total. The Grade 11 picker moved from 11.10 to 11.11 and updated the address. These checks used the current deployment.
- Added a Playwright check for the review branch covering assessment scoring and reset across 36 units at desktop and mobile widths, plus saved responses, unit isolation and desktop clipboard for Grades 11–12. All 36 unit assessments passed at both viewport settings in [GitHub Actions run 45517830828](https://github.com/wdwedu/examine-the-past-home/actions/runs/45517830828) on the review build. It does not cover iOS Safari, screen readers, or lesson reading accessibility.

### Maryland alignment follow-up · November 24, 2026

Grade 11 Units 11.8–11.10 (World War I through the Cold War) now connect 12 lessons to 11 specific objectives in the Maryland Modern World History Framework. The Standards and Objectives panels name what students are expected to learn. Closure asks them to demonstrate it. The three unit assessments add a written argument and guidance for teachers on what to look for. The [standards crosswalk](2026-11-24-grades9-12-maryland-standards-crosswalk-queue.md) identifies the cases assessed and the ones still needed.

The [browser check](https://github.com/wdwedu/examine-the-past-home/actions/runs/45519906121) passed at desktop and phone widths on the review build. It verified that the 12 lesson pages display the Maryland objectives and exit tickets and that the three unit assessments display the new writing prompts, source links and teacher guidance. The 36 assessment behavior checks also passed.

This update does not close the Maryland release gate. The 28 other Grade 11 lessons and the remaining Grades 9, 10 and 12 objectives still need lesson-level review. That includes district or local elective expectations where appropriate.

### Maryland alignment follow-up · November 25, 2026

Units 11.5–11.7 and 11.11 add 15 Grade 11 lesson maps, each with a Maryland objective and a matching student task. Four unit assessments add focused written arguments. The running total is 27 of 40 Grade 11 lessons and seven of 11 Grade 11 unit assessments. The [standards crosswalk](2026-11-24-grades9-12-maryland-standards-crosswalk-queue.md#progress-and-remaining-work--november-25-2026) lists the 13 remaining Grade 11 lessons by unit, exact work by grade, and the course-level coverage gaps to check after lesson mapping.

The [desktop and phone-width browser checks](https://github.com/wdwedu/examine-the-past-home/actions/runs/45613777281) passed for all 36 unit assessments and the objectives and closing tasks in all 27 mapped Grade 11 lessons. The written arguments and teacher guidance were also checked in all seven mapped units.

The source ledger currently has 123 open claims, five partly verified claims, and eight supported claims. This mapping batch supplements the lesson readings. Full source verification remains open.

The scorecard and gates below record the original audit baseline.

## Executive scorecard
| Grade | Lessons | Units | Distinct lesson checks | Source records | Mean context-panel reading |
|---|---:|---:|---:|---:|---:|
| 9 US History | 45 | 11 | 135 | 101 | 178 words |
| 10 Civics/Government | 31 | 9 | 93 | 108 | 185 words |
| 11 Modern World | 40 | 11 | 120 | 132 | 218 words |
| 12 Social Studies Electives | 20 | 5 | 60 | 65 | 220 words |
| **TOTAL** | **136** | **36** | **408** | **406** | — |

**Unique reference URL strings across all four grades:** 209. This is the count of distinct link strings, NOT 209 links confirmed live and NOT 209 item-level source passages verified.

### Static pass (confirmed from the committed repository)
- 136/136 lessons have three narrative panels, three investigation steps, three check questions and at least one attributed source record.
- 408/408 lesson-check prompts are unique within each grade; all have three distinct options, numeric answer index 0–2 and no detected duplicate response options.
- All 406 source records contain title, creator, date or dating note, source type and an HTTPS URL. This is metadata completeness, not documentary accuracy.
- Shared upper-secondary lesson loader, formal assessment loader, and history-hub loader parse as JavaScript. Grade 11 unit ordering for 11.10 and 11.11 was corrected earlier.
- Grade 12 gained 20 individualized historical/social-science reading sets and 60 distinct knowledge checks, rather than templated explanations, plus 700–1,000-word extended inquiry expectation (or an equivalent documented product), source dossier, alternate explanation and revision.
- Formal Grade 12 assessments now ask for **three** attributed records from at least two independent origins; teacher review remains mandatory.

## Release gate 1: Exact source-to-claim verification — **OPEN / NOT CERTIFIED**
Tracking document: `docs/qa/2026-11-24-grades9-12-source-to-claim-ledger.md`, with **136 lesson-specific review rows**.

A machine check can confirm metadata and link syntax, not that an original passage supports a lesson claim. Each row needs:
1. Original item-level page / document / statute section / treaty article or dataset code;
2. Original creator, date, translation/edition and accurate source genre;
3. Passage or record identity that supports the specific claim, not only related general background;
4. A second independently produced source or explanation for corroboration and diverse perspectives;
5. Usable student link, image/text alternative and copyright/reuse assessment;
6. An editor's dated decision with correction where required.

**Limited actual public source spot checks:** 
- U.S. National Archives *Brown v. Board of Education* page displays May 17, 1954, original opinion and explicit Fourteenth Amendment reasoning. This corroborates a Grade 9 claim about the decision. It does not establish immediate compliance across every district.
- National Archives Amendments 11–27 page contains the Twelfth Amendment and its June 15, 1804 ratification. It corroborates the Grade 10 correction regarding elector balloting, but not current election administration.
- United Nations Charter page and a Founders Online Abigail Adams record could not be fetched via the available public web retrieval method (403 or restricted). This is **unverified access**, not proof the links are broken.
- World Bank indicator NY.GDP.PCAP.KD is *GDP per capita in constant 2015 US$*, and therefore is **not a purchasing-power-parity series** or an individual income distribution. Grade 12 claims must not conflate them.
- Museum collections, research portals, translated historical texts and documentary guides still need item-level checking before classroom publication as primary records.

**Decision:** BLOCKED pending exact source-level signoff; the source ledger is an actionable queue, not an assertion that all 136 claims were validated.

## Release gate 2: Reading level and accessibility — **PARTIAL / OPEN**
- Distinct depth expectations are in the reading tasks: Grades 9–10 guided evidence and knowledge building; Grade 11 competing interpretations and corroboration; Grade 12 independent investigation, method critique and longer written argument.
- Narrative context panel length by grade is 178, 185, 218 and 220 words on average respectively. The context panels **are not intended to be the total assigned historical reading**.
- Grade 12's higher rigor resides in primary/secondary readings and capstone tasks, **not merely its word count**. No Lexile, comprehension study or controlled student usability study has been done.
- A full WCAG 2.2 AA check has **not** been performed. Test keyboard-only completion, visible focus, logical headings, form labels, fieldset/legend grouping, error announcements, timer accessibility, zoom/reflow at 200% and 400%, contrast, alt text, captions and mobile screen-reader navigation.
- The site's JavaScript generates fieldsets, labels and status regions in some assessment components; this is a positive static indication, **not** WCAG conformance proof.
- Sensitive Holocaust, slavery, forced migration, racism and war materials need age-appropriate excerpts and safe, accurate presentation.

**Decision:** OPEN for independent reader/accessibility and live device tests.

## Release gate 3: Maryland standard-by-standard alignment — **PARTIAL / OPEN**
Tracking document: `docs/qa/2026-11-24-grades9-12-maryland-standards-crosswalk-queue.md`, with **136 proposed domain rows**.

Relevant official sources:
- Maryland Social Studies standards page: `https://msde.maryland.gov/academics-0/curriculum-academic-standards/social-studies`.
- Maryland Curriculum & Academic Standards includes the **2025 social studies frameworks**, with American Government and high-school Modern World History.
- Maryland grades 9–12 disciplinary literacy: `https://marylandpublicschools.org/programs/documents/ela/disciplinaryliteracystandards/grades9-12disciplinaryliteracyframeworkreadinghistorysocialstudies.pdf`.
- Common Core RH.11–12 / WHST.11–12 define independent source reading, evaluation of conflicting claims and evidence-based writing.

The crosswalk currently offers **broad topical domains only** (History, Civics, Geography, Economics, Skills and Processes). **No claim of exact indicator-by-indicator state or Charles County approval** is made. The Grade 12 elective structure may need local-course expectations rather than being treated as one statewide stand-alone Grade 12 curriculum.

**Decision:** OPEN until each objective and assessment is mapped to a verified current framework indicator and teacher/district approver signs off.

## Release gate 4: Browser functionality — **PARTIAL PUBLIC REACHABILITY; INTERACTIVE QA OPEN**
Direct public web retrieval results:
- `https://examinethepast.com/` loads as the home page.
- Grade 9 course page `https://examinethepast.com/lessons/curriculum/grade-9-united-states-history/` loads, listing 11 units and 45 lessons.
- The individual Spanish-American War lesson HTML loads, but the retrieved output says **'Enable JavaScript to view the complete learning objectives and lesson navigation.'** The web retrieval method did not execute the interactive app.
- A Grade 9 assessment page responds with a loading shell only via the crawler.
- Direct public retrieval of the Grade 10/11/12 course paths and upper-secondary assessment paths failed in this environment; this is not sufficient evidence of 404 or a working browser page.
- Therefore **no real end-to-end user interaction, score validation, storage persistence, touch/mobile or keyboard acceptance test has been completed**. Do not claim these have passed.

Required manual/Cloud Browser acceptance script, executed for **each of Grades 9–12**:
1. Open course page; navigate first, middle and last lesson and unit using header, back, forward and course directory.
2. Confirm three panels, sources, vocabulary, visuals, timing, tasks, answer selection and feedback load without console or network errors.
3. In assessment center, select first, middle and last unit; check that 11.10 and 11.11 appear in correct order.
4. Enter known correct and incorrect multiple-choice answers; verify feedback and score, and confirm writing is NOT automatically scored as teacher-level mastery.
5. Save, refresh, revisit, copy and reset answers; check persistence in the same browser and nonpersistence in a new browser profile.
6. Test desktop Chrome, mobile Chrome and Safari, keyboard-only, screen reader, text scaling, landscape and reduced-motion settings.
7. Open at least two real external source links per sampled unit and test alternate access for blocked institutions.
8. Exercise home/course/lesson/back navigation and all page transition effects at normal and reduced motion.

**Decision:** BROWSER RELEASE BLOCKER — runtime interactions not independently verified.

## Release gate 5: Assessments — **STATIC PASS; CONTENT AND RUNTIME ACCEPTANCE OPEN**
- Grade 9: 135 distinct embedded lesson checks; 11 unit assessment entry points are linked on the public course directory, but their full end-to-end question coverage and score behavior were not exhaustively tested in this audit.
- Grade 10: nine formal unit assessments with six MCQs each (**54**), three source-match prompts each, inquiry and supported-conclusion tasks. Source packet count corrected from fictional four items to actual three attributed mixed-type records.
- Grade 11: 11 formal units with **three** unique summative MCQs each (**33**), then source investigation and teacher-reviewed writing.
- Grade 12: five formal units with **three** MCQs each (**15**), plus 3-source dossier and a documented senior argument. This is **too few automatically scored questions per unit for a reliable stand-alone summative judgment**. The written/research rubric is central, not optional; future version should broaden content coverage or use a defensible performance-assessment scoring model.
- Grade 11 also needs more extensive formal assessment item coverage or validated written rubrics to judge mastery reliably.
- Automated answer-key structure passed for all 54 Grade 10, 33 Grade 11 and 15 Grade 12 formal MCQs. This is **not an independent test of every item's content validity or browser scoring**.
- For all grades, verify distractor plausibility, differing difficulty, standards distribution, scoring security, copy/save/reset, keyboard access, teacher rubric usability and any disabled controls.

**Decision:** OPEN for summative validity, content review, live scoring and consistency.

## Practical prioritized corrections before a certified classroom release
**P0 / required:** complete source-to-claim ledger, correct sources that are merely gateways or irrelevant; fix any live console/score failures and navigation errors; certify rights, accessibility and sensitive-material handling.
**P1 / academic:** exact Maryland indicator mapping; expand 11–12 unit assessment coverage and calibrate performance rubrics; review 9–10 lesson text complexity with authentic source excerpts.
**P2 / enrichment:** verify Grade 11/12 video placeholders and additional media; check print/download opportunities and long-form study aids.

## What was NOT established by this audit
- No 209-link live URL crawl with HTTP outcomes.
- No 136-lesson independent professional historical fact check.
- No officially approved Maryland/Charles County curriculum certification.
- No WCAG 2.2 AA certification.
- No successful end-to-end deployed Chrome/Safari/mobile browser acceptance test.

## Release recommendation
**Content revision: complete for Grades 9–12. Repository static QA: pass. Public release certification: HOLD pending P0 and P1 gates.** The web page can remain publicly accessible as an *interactive draft pending review* with no representation that it is error-free, officially aligned or independently validated.
