# Grades 9–12 lesson source/media inventory and assessment data audit — 2026-11-23

## Scope and method
Inspected the committed lesson JSON records and corresponding Grade 9, Grade 10, and Grade 11/12 rendering engines. This is a repository-data and code-path audit, **not** a browser, network playback, or teacher content-validation pass.

| Grade | Lesson records | Explicit lesson-level video IDs | Lessons with references | Lessons with at least one reference labeled Primary | Lesson-check questions | Structurally invalid lesson-check questions |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 9 | 45 | 0 | 4 before this build; 6 after | 0 before; 2 after | 135 | 0 |
| 10 | 31 | 31 | 31 | 31 | 93 | 0 |
| 11 | 40 | 0 | 40 | 13 | 120 | 0 |
| 12 | 20 | 0 | 20 | 0 | 60 | 0 |
| Total | 136 | 31 | 97 before; 99 after | 44 before; 46 after | 408 | 0 |

A record labeled Primary or containing a URL is **not proof** that the link works, that the item matches its description, or that the document corroborates each lesson's claims. The Grade 9 engine also has two unit-level candidate video IDs (Units 9.3 and 9.9), which are not individually assigned to lesson records or playback-tested. It would be misleading to call all 45 Grade 9 lessons devoid of any media options.

## Source integration corrections in this build
- Grade 9 Reconstruction's Unfinished Legacy: National Archives Fourteenth Amendment, creator and 1868 date recorded.
- Grade 9 The Spanish-American War: William McKinley message to Congress, April 11, 1898, and congressional declaration of war, April 25, 1898.
- Grade 9, Grade 10 and upper-secondary (Grades 11–12) lesson engines now display lesson-specific attributed source details in their existing Sources sections. The eight instructional sections, existing page structure, and lesson navigation remain unchanged.

## Remaining blockers
1. **High-priority individual records:** Grade 9: 39 lesson records still lack lesson-specific references; Grade 11: 27 lessons lack a reference explicitly classified as a primary source; Grade 12: all 20 lack an explicitly classified primary source. Grade 10 has primary-labeled sources, but specific claim-level verification is still needed.
2. **Media:** Grade 9: 0 per-lesson IDs, two unit-level candidates; Grade 10: 31 per-lesson IDs, with identity, license/age fit, region and embedding not yet verified; Grades 11–12: 0 per-lesson IDs. Never infer availability from the presence of a YouTube ID.
3. **Assessment editorial quality:** All 408 lesson-check items have answer indices in range and no duplicate choices within an item. Yet 31 Grade 10 checks and all 180 Grade 11–12 checks match formulaic evidence-method wording. These need varied, substantive, lesson-specific evidence checks, not merely syntactically valid items.
4. **Unit assessments:** The previously reported 16 upper-grade unit assessments and 48 new auto-scored items are **not** validated by this lesson-check audit. Full scoring, selection state, feedback, reset, persistence, and teacher-reviewed parts still require separate unit-assessment inspection.
5. **Browser QA:** Desktop/mobile runtime, dynamic loading, media playback, embed failures, timers, and controls were not browser-tested. Do not label release ready.

## Required next passes
- Source pass: add 1–2 dated named documents/artifacts/datasets per lesson, distinguish primary evidence from institutional gateways and educator summaries, verify factual relevance, and preserve multiple perspectives.
- Media pass: independently verify identity and embedding for each candidate, add only legitimate age-appropriate video IDs, and retain text-first alternatives.
- Assessments: inspect unit assessment engines/data, vary formulaic checks, validate expected scoring and human-review distinctions, then perform live Chrome desktop/mobile tests.
- Release review only after these blockers are resolved and documented.
