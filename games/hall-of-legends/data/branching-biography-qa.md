# Hall of Legends — biography reading, source navigation, and branching QA
**Date:** November 4, 2026

## Published changes
- All 141 Bio Activity readers display an expanded, sectioned biography reading layout instead of repeating the overview paragraph.
- The first link under **Sources and further research** now points to Examine the Past for every figure:
  - Four existing complete Hero Lessons: Queen Makeda, Piye, Taharqa, and Sundiata.
  - The other 137 figures use a genuine, live dynamic internal profile page at `lessons/black-history-heroes/figure/?id=...`, explicitly marked as an introductory profile, not a finished comprehensive classroom lesson.
- Smaller external scholarly and institutional references appear in an optional collapsed panel, retaining Smithsonian and Harvard as research starting points.
- The Hall's existing consolidated source section and the Historical Research Atlas remain at the entrance/bottom of the upward-scrolling Hall.
- The Phase 3 Alliance activity is now a three-step branching historical investigation: choose an investigative path, evaluate evidence, and answer a figure-specific scored question. Different selections show different contextual material and consequences. Retry works; scoring is awarded only on successful completion of the final question.
- One Alliance maximum per figure; existing local browser progress and Hall score totals are unchanged.

## Code/data QA
- JavaScript syntax check passed.
- 141 unique profiles matched to 141 figures and 141 Alliance questions; no orphan ID.
- Both Hall views reference the current script and CSS versions.
- Four actual existing lessons and one generic internal figure profile route cover all 141 internal lesson/profile destinations.
- No credits or era seals awarded by this work.

## Limitations to address before describing as fully complete
- Each Hall bio is a **sectioned introductory biography**, not a carefully source-verified, 300–500 word long-form historical essay. Individual research and expanded narratives remain substantial editorial work.
- Branching scenarios are **historical-investigation choices** with changing consequences and a figure-specific final assessment. They are not yet 141 separately authored, immersive historical role-play narratives.
- Some legacy catalogue URLs were preliminary. Cards show more restricted institutional/publisher research URLs, while the wider catalog is linked separately.
- Live mobile/browser interaction, destination-link availability, and assistive-technology QA have not yet been independently performed.
