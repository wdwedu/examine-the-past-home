# Grade 10 Civics and Government — Full Editorial / Assessment Audit
Date: November 23, 2026

## Decision
**Complete: repository editorial / structural revision. Not approved for classroom deployment pending item-level provenance and browser QA.**

The user specifically requested that Unit 10.1 be rechecked as part of a full Grade 10 completion. **Unit 10.1 was revised first and reaudited with all 30 other lessons**; its three lesson checks were kept because they are specific and structurally valid. No unit was exempted as perfect.

## Completed Grade 10 lesson data
- 31 lessons over nine units (10.1–10.9).
- 93 *unique* lesson-check prompts; no repeated stems remain. All checks have three distinct answer choices and keyed answers within range.
- 31 lesson-specific third-panel source investigations; the 28 remaining repetitive templates were replaced. The first three Unit 10.1 lessons had previously been individually rewritten.
- 31 sets of three investigations. The first and second repetitive procedure prompts in Units 10.2–10.9 were replaced with specific legal or institutional questions.
- 108 reference records with title, creator, date/period, document type, HTTPS URL and explanation. These refer to 35 distinct URL strings, including original founding documents, court opinions and amendments and secondary official guides.
- Additional subject-specific sources include Article V from the National Archives, veto process and Article I, the Supreme Court's *Tinker* opinion, Thirteenth/Fifteenth Amendments, Maryland legislative procedures and Congressional Research Service guidance.
- Grade 10 lesson loader and engine parse; refreshed cache versions to retrieve the latest JSON.

## Formal nine-unit assessment audit
- 9 unit assessments (10.1–10.9).
- Per unit: 3-source evidence packet, six multiple-choice questions, three document-matching prompts, three source-inquiry steps, three supported-conclusion statements and a writing task.
- 54 MCQ keys: valid; 27 matching target indices: valid; 27 inquiry answer indices: in range; 27 conclusion key entries are booleans and match the specific rewritten conclusion statements.
- Corrected inaccurate display claims of a **fourth 'Document D'** and of **three authentic primary records plus one secondary text**. The packets actually have **three records and mixed types**. Some entries are research collection gateways, not individual primary records.
- All 9 inquiry prompts, 27 inquiry steps, 27 conclusion statements, and nine writing tasks replaced with subject-specific material.
- Corrected 10.7 Document A: actual Twelfth Amendment transcription and label, rather than pointing to the original Constitution while claiming the Twelfth text was at that URL.
- Source labels corrected: original primary legal text, judicial opinion, institutional context and records-collection gateways distinguished. Packets state explicitly that descriptions are **paraphrases, not direct quotations**.
- Units 10.1–10.9 assessment page script versions refreshed in all nine entry pages.

## Historical and standards checks
- National Archives founding document transcript confirms Article V constitutional amendment rules, a procedure distinct from passage of an ordinary bill.
- National Archives original constitutional text and Maryland General Assembly materials confirm checks/veto procedures and state legislative distinctions.
- The federal U.S. Reports version of *Tinker v. Des Moines* documents the specific 1969 school-expression case; do not generalize it to every student-speech situation.
- Locke's *Second Treatise* is linked from Project Gutenberg; bibliographic edition dating ranges between 1689 and 1690 across sources, so avoid falsely precise assertions without specifying edition.
- Abigail Adams's March 31, 1776 letter is linked to Founders Online, with a corroborating historical document presentation.
- Maryland High School American Government framework **revised June 2025** is a real official framework; *precise indicator-to-lesson mapping* has NOT been independently certified in this pass.
- No claims were made that historical policy outcomes follow automatically from the passage of a law or that court opinions apply to every hypothetical scenario.

## Remaining academic / technical blockers
1. **Source quality:** 108 reference entries reuse 35 URL strings; many broad government portals are valid contextual references but **not exact source pages for a lesson-specific claim**. Before teaching from the packet, choose dated source items and specific passages/sections. Do not describe 108 references as 108 independently reviewed primary documents.
2. **Runtime:** No live Chrome/mobile manual pass has been performed. Assessment scoring, matching/order interactions, response copy, timer, media and accessibility require checks in a deployed browser.
3. **Exact standards:** Map each of 31 lesson objectives to current Maryland framework indicators and confirm scope and grade placement; this audit establishes framework availability only.
4. **Formal assessment sources:** Unit 10.1 uses a framework as contextual source C, not an additional original founding-era text. Unit 10.8 and 10.9 use records or data gateways. Upgrade to item-level examples for top rigor.
5. **Source paraphrases:** Existing summaries and teacher explanations must not be presented as quotations or as substitutes for original legal clauses.
6. **Accuracy/currency:** Constitutional law changes through case law; examples and administrative rules need dates and current verification before presentation as current practice. No independent constitutional-law specialist has signed off on all hypothetical scenarios.

## Next recommended builds
- **Grade 11**: full curriculum audit and rewrites across 40 lessons, replacing generic question and investigation structures and improving direct historical records, alternative perspectives and human voice.
- **Grade 12**: parallel standard across 20 advanced lessons, including deeper original document comparison, research design and provenance.
- Separate cross-grade (9–12) **live browser + item-level source verification** gate after editorial work. Do not equate structural JSON QA with academic final certification.

### Files changed
- `assets/grade10-grade5-matched-data.json`
- `assets/grade10-grade5-matched-engine.js`
- `assets/grade10-civics-assessments-data.json`
- `assets/grade10-civics-assessments.js`
- `assets/history-hub-lesson.js`
- All nine `lessons/curriculum/grade-10-civics-government/unit-10-{1..9}-assessment/index.html`

Change management: preserved Grade 5-matched lesson architecture and established visual design. No redesign or new feature.
