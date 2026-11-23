# Examine the Past — Grades 9–12 Release Readiness Review
**Date:** 2026-11-23  
**Decision:** NOT CLEARED FOR FINAL RELEASE  
**Method:** Repository data and JavaScript parse inspection; targeted external document/video identity lookups. No real Chrome or mobile playback test.

## Inventory
| Grade | Lessons | Lessons with reference links | Lessons with a reference labeled Primary or a primary-type collection | Explicit lesson video IDs |
|:--|--:|--:|--:|--:|
| 9 | 45 | 10 | 6 | 2 |
| 10 | 31 | 31 | 31 | 31 |
| 11 | 40 | 40 | 15 | 0 |
| 12 | 20 | 20 | 1 | 0 |
| **Total** | **136** | **101** | **63** | **33** |

**CAUTION:** Primary-type collection records count in the column above even where no individual dated record is selected; these are not release-level proof. A link is not a verified claim-level citation. Grade 9 has two additional unit-level fallback video IDs, assigned to units 9.3 and 9.9 in its engine. YouTube identity confirmation is not playback/embedding confirmation.

## Changes made
- Added directly attributed Grade 9 legal/historical records for Reconstruction, the Spanish-American War, women's suffrage, *Brown v. Board of Education*, the Civil Rights Act, and Executive Order 9066.
- Added documented Grade 11 French Revolution rights declaration, 1945 UN Charter, and 1948 Genocide Convention; improved attribution for an existing Universal Declaration of Human Rights record.
- Corrected a Grade 12 Universal Declaration of Human Rights record to identify its primary document status and adoption date.
- Made the existing Grade 9–12 lesson Sources sections show individual source title, creator, date, type, summary and outbound link. No navigation or layout redesign.
- Assigned two identifiable Crash Course history video references to relevant Grade 9 lesson records. Their titles/IDs were corroborated from external listings; embed availability remains untested.
- Updated Grade 9 code to prefer lesson-specific media over older unit-level defaults; removed misleading 'verified' wording from video link.
- Repaired upper-secondary unit assessment Copy so it includes Part A multiple-choice answers as well as Parts B/C, with clipboard-unavailable handling.
- Refreshed curriculum engine/data cache query keys.
- Detected and repaired two JS syntax errors introduced during the Sources panel change before finishing the build.

## Verified repository tests
- All six inspected runtime JS files parse: history-hub-lesson.js, grade9-grade5-matched-engine.js, grade10-grade5-matched-engine.js, upper-secondary-grade5-matched-engine.js, upper-secondary-unit-assessments.js, grade10-civics-assessments.js.
- All 408 lesson-check questions across 136 lessons were previously structurally reviewed with no invalid answer indices or within-question duplicate choices.
- Grade 10 assessment data: 9 units, each 6 multiple-choice, 3 matches, 3 ordering steps and 3 supported-conclusion judgments; all MC and matching indices checked in bounds.
- Grade 11–12 unit assessment bank: 16 units, 48 multiple-choice items; all with answer indices in bounds and explanations.
- Automated grading does **not** certify written work. Grade 10 uses clearly labeled student self-ratings; Grades 11–12 require teacher review for written work.

## Open release blockers
1. **Document coverage:** Grade 9 has 35 lesson records without lesson-specific links. Grade 11 and Grade 12 often link gateways or collections rather than named dated primary records. Grades 9–12 still require claim-level corroboration, provenance, full source suitability, and two contrasting perspectives where appropriate.
2. **Video:** Grade 9 two lesson video IDs and two unit-level fallback candidates; Grade 10 31 lesson IDs; Grades 11/12 none. Video IDs require individual YouTube availability, title/age fit, region, captions and embed-permission checks in a browser before release. Maintain text-first alternatives.
3. **Assessment pedagogy:** 211 lesson-check items follow formulaic evidence-method patterns (31 in Grade 10, 120 in Grade 11, 60 in Grade 12). Content diversification and item-level alignment with named documents remain outstanding.
4. **Functional browser checks:** Live desktop/mobile Chrome testing of unit selection, radio/checkbox interactions, matching, ordering, scored feedback, writing, copy/save/clear/reset, browser storage, navigation, timers, transitions and responsive layouts is outstanding.
5. **Release integrity:** An actual deployment and CDN/cache check after repository updates is still needed.

## Recommended order, without new feature work
1. Complete one or two evidence-backed, dated, attributed primary records per remaining lesson; inspect each linked source.
2. Verify and add only actual permitted educational video embeds and text alternatives.
3. Review formulaic assessment questions against those verified documents; validate answer keys and teacher-scored components.
4. Execute full Chrome desktop/mobile regression tests and record results.
5. Only then mark the final curriculum release review as PASS.

**Do not equate repository structure or JavaScript syntax validation with successful student-facing runtime tests.**
