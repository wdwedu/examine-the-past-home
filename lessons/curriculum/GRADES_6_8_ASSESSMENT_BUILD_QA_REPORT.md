# Examine the Past — Grade 6–8 Assessment Build Report
Date: 2026-11-18
Status: **Built and repository-verified; final interactive / pedagogical QA pending.**

## Scope
- Grade 6: 6 unit assessments, coordinated with 20 lesson pages.
- Grade 7: 6 unit assessments, coordinated with 19 lesson pages.
- Grade 8: 8 unit assessments, coordinated with 31 lesson pages.
- Total: **20 assessment pages and 70 referenced lessons**. All 90 files were checked through the connected GitHub repository.
- Shared engine: `assets/middle-school-assessments.js`
- Shared design: `assets/middle-school-assessments.css`
- Lesson-aligned assessment data: `assets/middle-school-assessments-data.json`
- Main template reference: `lessons/curriculum/grade-5-early-american-history/unit-5-1-assessment/index.html`
- Assessment links installed in each Grade 6, 7, and 8 course index.

## Unit inventory
| Unit | Historical focus | Referenced lessons | Points | Skills |
| --- | --- | ---: | --- | --- |
| 6.1 | Geography and Historical Investigation | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 6.2 | Origins of Civilizations | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 6.3 | River Valley Civilizations | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 6.4 | Ancient Government and Culture | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 6.5 | Trade, Migration, and Exchange | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 6.6 | People and Their Environments | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 7.1 | World Regions and Cultural Identity | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 7.2 | Migration and Settlement | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 7.3 | Trade Networks and Connections | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 7.4 | Government and Economic Systems | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 7.5 | Culture, Religion, and Society | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 7.6 | Human-Environment Relationships | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 8.1 | Colonial Foundations | 3 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 8.2 | Revolution and Independence | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 8.3 | Constitution and Government | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 8.4 | The Early Republic | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 8.5 | Expansion and Reform | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 8.6 | Slavery and Sectional Conflict | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 8.7 | The Civil War | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |
| 8.8 | Reconstruction | 4 | 6 + 3 + 3 + 3 + 12 | Source-based checks, inquiry, writing, creation extension |

## Automated/repository tests performed
- 20/20 assessment pages exist and refer to the correct unit identifiers and the v2 shared assessment engine.
- 20/20 assessment links exist in their grade-level course directories.
- 70/70 referenced lesson HTML paths exist.
- Shared JavaScript passes a syntax-compile test (does not equal complete interactive browser testing).
- Every unit includes exactly 6 multiple-choice questions and all answer indices are in range.
- Each unit contains 3 source matching prompts, 3 distinct inquiry positions, and 3 evidence judgments with 2 supported and 1 unsupported claim.
- Correct evidence-judgment positions vary by unit; engine reads per-unit answer keys.
- All unit scoring maxima are 27 points: 6+3+3+3+12, with an 80% target of 22/27.
- Written rubric remains four criteria x 0–3 and below writing area; model response has a two-click reveal after completed scoring.
- Writing points are expressly self-reported until independently teacher-checked.
- Creation and optional collaboration task are outside the 27-point score.
- Grade progression increases reading excerpt length and writing complexity, using grade-differentiated expectations.

## Standards references and limitations
Maryland 2025 Grades 6–7 Framework: https://msde.maryland.gov/media/17925
Maryland Social Studies Frameworks, including middle school U.S. history: https://msde.maryland.gov/academics-0/curriculum-academic-standards/social-studies
Literacy in grades 6–8 history/social studies: https://www.thecorestandards.org/ELA-Literacy/RH/6-8/

The alignment is broad to Standard 6.0 Inquiry Arc and historical reasoning; **this does not certify exact Maryland indicator-by-indicator alignment**. Some course topic sequences may diverge from the 2025 Maryland framework, and curriculum decisions require a separate crosswalk.

The evidence packet contains **adapted instructional lesson excerpts**, not quoted or authenticated primary sources. Each original unit-data source link is a context reference and does not establish provenance of every claim. Authentic, attributed source materials, maps, artifacts and nation/community-informed perspectives should be added during final editorial review.

## Important limitations before classroom-ready approval
- No deployed Chrome/mobile browser was used; live interactions, visual layout, print dialog, clipboard permissions, keyboard access, focus management, deployment caching, and end-to-end scoring must be tested.
- Scoring math/answer keys were structurally checked; a live DOM-based test suite has not run.
- Source excerpts and lesson answer options were imported from existing instructional lesson data, not each independently adjudicated by historians. All correct answers and distractors need a final editorial/historical review, especially for higher-order validity.
- Activity mechanics currently share the same five sections; subject matter, prompt order and evidence vary. Future refinement should rotate the mechanics of matching/inquiry within the approved visual and scoring template so units do not feel identical.
- Reading complexity is adjusted by instructional excerpt length and response expectations, but has not been quantified with a full readability/complexity audit.
- The task does not certify individual student creation skills or group collaboration by an auto-score; optional creation requires separate observation and rubric.

## Final QA acceptance gate (before moving to high school)
1. Open and complete each of the 20 assessments in desktop Chrome and on a mobile viewport.
2. Test full-credit, all-incorrect, partial-complete, missing written response, reset, writing edit, rubric changes and locked/unlocked sample access.
3. Verify copy/print and modals via keyboard and mobile touch.
4. Run explicit item-by-item historical fact checks and source provenance checks.
5. Crosswalk all unit objectives and tasks to current applicable Maryland framework indicators and discipline literacy expectations.
6. Repair the most superficial distractors or source-matching tasks and add actual primary-source images/map extracts where available.
7. Confirm 27-point reports distinguish self-review from teacher scoring, and test all links live.
8. Only then designate these assessments classroom-ready and begin high school templates.
