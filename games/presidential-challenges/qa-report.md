# Presidential Challenges collection — build and QA
Date: November 4, 2026

## Website structure
- `/games/` now introduces **Presidential Challenges** and links to `/games/presidential-challenges/`.
- The six-card collection includes:
  1. **Presidential Portrait Challenge** — existing 10-round, 200-question multiple-choice game preserved at `/games/presidential-challenge/`. Renamed to avoid conflation with the whole collection.
  2. **Presidential Bingo** — `/games/presidential-challenges/bingo/`. Shuffle, portrait-based clue matching, free square, 5-in-a-row win checks.
  3. **Who Am I?** — `/games/presidential-challenges/who-am-i/`. Blurred portraits, progressive clues, 10 rounds and point scoring.
  4. **Presidential Timeline Shuffle** — `/games/presidential-challenges/timeline-shuffle/`. Six randomly selected presidencies, drag/drop or accessible arrow reordering, date verification.
  5. **Presidential Connections** — `/games/presidential-challenges/connections/`. Six curated historical relationship pairs including family relations and vice presidential service.
  6. **Presidential Challenge Board** — `/games/presidential-challenges/challenge-board/`. Five historical-era categories, 25 point-value clues and selectable names.
- Return links on the original quiz and five new games point to the six-card Presidential Challenges hub.
- Existing `data.js` and `challenges.js` and portrait assets are reused; the original quiz's gameplay and its saved scores are not replaced.

## Static integrity checks
- All six hub links and the main Games tile are present.
- 47 presidential office entries representing 45 distinct people in the original data.
- Original challenge bank: 10 rounds × 20 questions = 200; all question answers correspond to known president names.
- Verified 47 files, 01.webp through 47.webp, exist in `assets/presidents/portraits/`; the new pages use these images, consistent with the original portrait quiz.
- The shared presidential game script parses and all five new game pages load it, `data.js`, `challenges.js` and shared game effects.
- All five modes share a consistent dark brand palette and yellow/green accents; modes have separate game URLs.
- Original celebratory cues in the shared game effects remain subject to the user's sound-off preference.

## Remaining QA and editorial limitations
- Actual browser/mobile gameplay and audio playback were not tested; syntax and repository file integrity do not confirm functioning live user interactions.
- Some questions are generic president identification prompts rather than individually researched long-form teaching scenarios; further editorial fact-checking and distractor refinement are appropriate.
- The category board uses era-based categories derived from existing questions and the original question bank. A more richly authored category board could later replace it without changing the hub.
- The user's prior concern about reading multiple-choice answers aloud has not been changed here.
