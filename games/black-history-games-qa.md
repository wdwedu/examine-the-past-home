# Black History Games — Five-game build review
Date: November 4, 2026

## Public pages
- Black History home: `/lessons/black-history/` — Hall, Lessons, Course retained; five games linked below.
- `/games/black-history-bingo/` — shuffle of 24 of 141 Hall portraits + central free square, historical clues, five-in-row win detection. Correct click sounds a short original tone and makes yellow/green/white confetti. FREE tile black and gold, white inner line, hover bounce, four dark-gradient card colors.
- `/games/black-history-challenge/` — 25 category clues, 5 columns, point scoring and portrait reveal, original start/success cues, celebratory confetti.
- `/games/black-history-who-am-i/` — 10 mysteries, four progressive clues, blurred illustrated portrait, up to 400 points per correct identity.
- `/games/black-history-timeline-shuffle/` — 11 curated dated event options, six shuffled per game; drag/drop or up/down controls; answers reveal chronological dates.
- `/games/black-history-connections/` — six historically meaningful pairing topics, 12 Hall portraits and explanation after matching a pair.
- Added common `assets/black-history-game-fx.js` with original brief sound cues and a yellow/green/white confetti renderer. Existing `etp-sfx` off preference is respected; reduced-motion users do not see confetti.

## Editorial and usability
- Removed repetitive free-to-play footer notes from Bingo and Challenge Board.
- Bingo instructions shortened; illustrated-portrait status is not repeated on the game page. The original collection's historical accuracy notice remains in its underlying data/research context.
- Deferred: user's observation that the existing reading/audio interaction on the category board may not read answer choices. Deliberately unchanged.
- No copyrighted Jeopardy music or original television sound effects used. New tones are original UI signals.

## Static QA — passed
- Five game scripts and shared effects script parse as JavaScript.
- All five navigation links appear on the Black History home.
- 141 portrait IDs remain present.
- All 25 category clues refer to figure IDs present in Hall data.
- 11 timeline events use figure IDs present in Hall data.
- Six matching pairs are encoded.
- Bingo correctly awards marked squares only when the selected ID matches the current clue; the central square is pre-counted; row, column, and both diagonal combinations are considered.
- Marked squares and awarded points are session-local only. No login or remote storage introduced.

## Important limits
- No real-browser testing of touch devices, image loading, browser-generated audio, animation or accessibility occurred. Static parsing cannot establish the quality of the sound, image load success, or complete usability.
- Browser autoplay rules may prevent sound until the user first interacts with a game.
- Short or broad biographical clues can still benefit from editorial rewriting, stronger distractors, and independent historical source verification before a production-quality classroom release.
- Audio narration of answer choices needs separate follow-up, without disrupting current game behavior.

## Checked historical reference examples
- Phillis Wheatley's 1773 published poems: Smithsonian Libraries and Library of Congress.
- Robert Smalls's May 1862 escape: National Park Service and Naval History and Heritage Command.
- Other event descriptions require the same individual source review in a further editorial QA pass.
