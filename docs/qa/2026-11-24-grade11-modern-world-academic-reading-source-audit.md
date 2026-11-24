# Grade 11 Modern World History — 40-Lesson Academic, Reading and Source Audit
Date: November 24, 2026
Decision: **Grade 11 repository editorial and structural pass COMPLETE; historical-source release certification and live-browser acceptance remain OPEN.**

## Reading level: what Grade 11 actually requires

Reviewed against **CCSS RH.11–12.1 / .6 / .8 / .10**, **WHST.11–12**, Maryland disciplinary-literacy expectations and AP World History: Modern historical-thinking skills (as a rigor benchmark, NOT as an assertion this is an AP-certified course).

The grade-level distinction is **disciplinary complexity**, not longer words or an unverified readability score:
- Relate a primary source's **specific evidence** to its overall argument, considering author, audience, dating, purpose and translated language.
- Analyze **conflicting interpretations** and whether corroborating sources were independently produced.
- Use **causation, comparison, continuity/change and geography**, not merely memorized event order.
- Assess the limits of a contemporary political claim, eyewitness account, archaeological artifact, quantitative reconstruction and retrospective museum essay as different evidence genres.
- Write a **qualified historical thesis** with counterinterpretation, evidence and stated uncertainty.
- Include perspectives from colonized or enslaved peoples, Indigenous communities, African and Asian political leaders and other affected groups; avoid implicitly centering only European or American narrators.

### Reading quantity and access limitations
- All 40 lessons retain the established **three reading panels**, now **207–233 words combined** (mean ~218). They function as high-level **historical context and analysis**, not as a complete independent textbook chapter.
- The more challenging required reading is the linked historical document or archival material. Length alone cannot certify a text at Grade 11; we **did not assign unmeasured Lexile/grade-equivalent scores**.
- Instructors must assign **exact primary-source excerpts** (rather than just museum homepages), plus the existing investigations. Some excerpts need accessible translations, glossaries and provenance/date notes.
- The approach is appropriate as a scaffolded grades 11–12 inquiry **once those documents are actually curated and checked**. Without them, short context panels alone do not fully meet independent 11–12 historical reading demands.

## Repository changes completed
- 40 lessons across Units **11.1–11.11**, preserving three reading panels and existing Grade 5-matched lesson architecture.
- All 120 lesson multiple-choice checks rewritten to be topic-specific, answer-key validated, and balanced across positions (40/39/41).
- 40 topic-specific historical essential questions, three source-investigation tasks per lesson, a developed written performance task, and advanced research-workshop deliverables/rubric.
- Replaced standard repeated openings, 'interpretive challenge' endings and generic 'best method' knowledge checks. No identified old template stems remain in the 40 lesson readings/checks.
- Expanded middle reading panels with topic-specific context and historiographical limitations, rather than simply increasing word difficulty.
- Added/curated original evidence and credible period-grounded institutional works: Mamluk manuscript, Yuan pottery, African/Edo artifacts, Raphael commission, Luther's 1517 theses, Westphalia treaty, 1494 Tordesillas agreement, Haitian independence declaration, Bolívar letter, 1833 Parliamentary debate/Factory Act, SlaveVoyages reconstructions, 1914 ultimatum, Versailles treaty, Nuremberg Laws and Wannsee record, Ghana 1957 Nkrumah speech, Indonesian proclamation, Truman speech, 1931 Federal Reserve records, Soviet declassified records, 1994 WTO treaty, contemporaneous UN migration reporting.
- Removed some demonstrably off-topic broad institutional links, especially U.S. African-American history museum homepage used as default for colonialism in Asia and Africa.
- **132 attributed reference entries** representing **64 distinct URL strings**. Every lesson now has at least two references and at least one period-source anchor (period document, recorded speech, report, or identifiable material artifact). **These are reference metadata records, not 132 independently verified source excerpts**.
- Grade 11 lesson loader and formal assessment loader refreshed with current JSON versions.
- Fixed shared upper-secondary unit number ordering: `11.10` and `11.11` no longer sort indistinguishably from `11.1` by JavaScript's numeric coercion. Shared implementation also benefits Grade 12.
- Grade 11 and Grade 12 assessment entry-point HTML files refreshed to use the fixed shared script.

## Static QA results
| Test | Result |
|---|---|
| Lesson records | 40 / 40 |
| Units | 11 |
| Three panels/investigations/checks per lesson | PASS |
| Source records with required attribution, date, type, HTTPS URL | PASS |
| Lesson check prompt uniqueness | 120 / 120 |
| Answer indices and three distinct options | PASS |
| Correct answer position distribution | 40 / 39 / 41 |
| Grade 11 formal unit assessment bank | 11 units, 33 questions, all 33 distinct and structurally valid |
| JS parsing: shared lesson engine, assessment engine, hub loader | PASS |
| Shared 11.10/11.11 sorting correction | PASS |

## Material remaining before 'classroom-ready' signoff
1. **External link-level QA:** 64 unique URLs were not all individually opened and tested in deployed Chrome/mobile. Some are translated sources, broad museum exhibit pages, period-artifact catalogs, or research gateways. Verify precise item, page, translation version and actual availability.
2. **Historical peer review:** Independent subject-specific review of all claims, translated primary excerpts and contested interpretations remains undone. Particular care: Holocaust, Atlantic enslavement, colonial violence, wartime atomic bombing, partition and decolonization.
3. **Readability and accessibility:** No student usability/reading-comprehension study, Lexile calculation or accessibility acceptance test was performed. Add excerpt-level vocabulary support and alternative text for document images.
4. **Formal assessment depth:** The shared question bank has only **three formal multiple-choice items per Grade 11 unit** (33 in all), distinct from the 120 embedded lesson checks. Review whether this is enough for reliable summative coverage, and assess score behavior and open-response rubrics in browser.
5. **Video and enrichment:** 11 unit video records still show explicit verification-pending placeholders. No playable video guarantee.
6. **Site runtime:** Desktop/mobile Chrome, navigation, sticky timer, loading, assessment feedback/scoring, bookmarking, source links and responsive layout must still be tested.
7. **Standards mapping:** The grade 11–12 literacy benchmark is used to shape tasks; precise local district/state standard-to-lesson alignment and formal approval remain pending.

## Next recommended build
**Grade 12, all 20 advanced elective lessons:** carry over higher reading and evidence demands, with greater independent research and source choice, historiography, methodology, extended argument and inquiry products. Do not accept repeated generic assessment patterns.

Then perform a **cross-grade 9–12 release audit** emphasizing exact source-to-claim citation, copyright and accessibility, deployed browser acceptance and Maryland standard-level mapping. Neither Grade 11 nor Grades 9–10 should be declared 'error-free' on the basis of static QA.
