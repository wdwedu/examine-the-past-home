# Black History Hall — Phase 3 Alliance Activities QA
Date: 2026-11-04

## Shipped
- 141 biography-associated, four-choice historical account-matching questions in `alliance-activities.json`.
- Figure-specific correct answers and historical explanations sourced from the authored Phase 1-2 introductory biography entries.
- Incorrect responses: distinct visual feedback, a hint to compare accounts, and immediate retry without losing Hall position.
- Correct responses: 1 Alliance awarded once per figure; follow-up visits show earned status, correct answer and explanation.
- Stored earned IDs in browser localStorage key `etp.hall.alliances.v1` (no user accounts or server).
- Live updates to the sticky status ledger, summit certificate Alliance count, and entrance scorecard. 100 Legacy Credits and 8 Era Seals remain unaffected.
- Reduced-motion handling, keyboard-operable buttons, and polite answer feedback via ARIA live region.
- Existing shared Time Warp biography entrance and return-to-Hall retained.

## Static QA — Passed
- 141 unique question IDs match 141 unique biography and portrait IDs.
- Four unique answer choices and valid correct-answer index for each question.
- Each correct answer is linked to the matching biography's historical overview.
- Correct index distribution: 35, 36, 35, 35 across A–D.
- JavaScript syntax passes parsing; both live and scene-blueprint Hall pages load the new script and CSS.
- Wrong answers do not call the award function; repeat correct answers check the earned-ID set before awarding again.
- Inaccessible or disabled localStorage falls back to session-only progress with a warning.

## Editorial/acceptance limitations
- Questions are **one scored evidence-matching step per figure** with retry/feedback, not yet multi-turn branching historical simulations.
- Distractors are drawn from other figures in the same Hall chapter. This is suitable for introductory recognition and comparison but **does not constitute a full historical decision-based scenario**.
- These questions inherit the Phase 1-2 biography draft's fact-checking limitations. Individual scholarly verification still needs to be completed before treating the package as a fully sourced historical encyclopedia.
- No physical phone, tablet, or browser interaction test has been completed; manual visual/audio testing is still required.
- Browser-only localStorage data may be deleted if site data are cleared or the site runs in private browsing.
- The other reward systems, certificate unlocking and printable named certificate remain later-phase work.

## Manual acceptance checks
1. Hard-refresh the Hall, open a bio and answer incorrectly. Confirm no score increase and feedback offers retry.
2. Answer correctly; Alliance count should increase by 1 in status bar, entrance and certificate.
3. Close and reopen same bio; verify the achievement persists but does not increase.
4. Refresh browser; verify achievement persists in the same browser.
5. Test portrait text/interactive choices and up/down controls at desktop and narrow mobile widths.
6. Verify Legacy Credits and Era Seals stay at zero in this phase.
