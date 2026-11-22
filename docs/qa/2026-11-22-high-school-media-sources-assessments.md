# High-school media, source, and assessment QA — November 22, 2026

## Scope
Grades 9–12, with publication focus on Grades 11–12 lesson resources and unit evidence assessments. This report distinguishes repository rendering from actual Chrome browser verification.

## Committed improvements
- **Grade 11:** 40 of 40 lesson records have a curated additional historical source or evidence collection. One extra methods reference was added in Unit 11.2. All 40 show at least two listed resources (some are research gateways, not individual primary documents).
- **Grade 12:** 20 of 20 lessons have a curated research method, ethical guidance, institutional reference, or named dataset relevant to the unit. All 20 show at least two listed resources.
- **Assessments:** Replaced generic automatically graded Grade 11–12 question sets with 48 original, unit-specific items across all 16 units, three per unit. Each item has three options, validated answer index, and written explanation. Correct answer positions are balanced (16 A / 16 B / 16 C).
- **Explanatory feedback:** Checking Part A now produces per-question explanations. Parts B and C remain teacher-reviewed; no automated written-work grade is claimed.
- **Release:** Updated lesson-loader versions on all 60 Grade 11–12 lesson pages and assessment-engine versions on both assessment centers.

## Repository QA passed
- 40/40 Grade 11 and 20/20 Grade 12 records render the complete eight-section lesson navigation.
- 60/60 show a source section, research workshop, and unit-assessment link.
- All 60 preserve three reading panels.
- All 60 have at least two source/reference links.
- JavaScript syntax checks passed for the common lesson loader, upper-secondary lesson engine, and upper-secondary assessment engine.
- Assessment JSON: 16 complete units; 48 valid items with explanations.

## Known incomplete release items
1. **Live browser QA:** Full Chrome checks (desktop/mobile, caching, dynamic script loading, timer, active section navigation, copy/save/clear controls, media playback, animations) could not be conducted using the available web-checking service. Do not mark complete.
2. **Video selection:** Grade 9 still lacks assigned YouTube IDs in four Unit 9.11 lessons. Grade 10 has 31 IDs but not every video has been independently verified for identity, region and embeddability. Grades 11–12 have no individually assigned video IDs. Do not replace these with guessed embeds.
3. **Individual source QA:** Curated institutional collections have been linked, but most lesson-level claims still need citations to a *specific* dated document, artifact, dataset/version, or page. A research gateway is not proof of a factual claim.
4. **Assessment validation:** New Grade 11–12 questions are editorial drafts. Teacher review, pedagogical balancing, item-level checking against exact documentary evidence, accessibility and real-browser functionality are pending. Grade 10 and Grade 9 assessment systems need separate end-to-end interactions review.

## Recommended next build
- Select and independently verify 1–2 actual named primary documents or records for each high-school lesson, with date, creator, reason for inclusion, citation and content suitability.
- Add verified, age-appropriate video references, checking direct playback and embed restrictions; retain text-first alternative.
- Browser-test selected lessons from each grade and unit assessments on desktop and mobile; resolve any exposed runtime blockers.
