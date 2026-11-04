# Hall of Legends — Chronological Wall Placement QA

**Production stage:** Portrait installation and 141-figure wall layout, prior to final panoramic museum artwork.

## Verified on repository data (not a live-device visual test)
- Replaced the original 141 portrait WebPs **in place** using the uploaded product-matched artwork pack; its original upload filename was `hall-of-legends-upload (1).zip`. Installer recognized it, installed the replacements, and removed the temporary ZIP. Current manifest SHA-256 entries match the approved upload pack, including portraits 001 and 141.
- All **141 portrait files** have unique, mapped filenames. 32 are replaced from the user's new name-free source illustrations; 109 retained; 23 flagged originals were approved without alteration.
- Portraits render with `object-fit: contain` in square wall spaces; no additional CSS face/head crop. These are original product illustrations, not full silhouette transparent cutouts.
- Exactly **two wall columns** (left/right), with individually positioned portraits and variable vertical spacing based on the chronological gap. No rigid shared row grid.
- Default gallery travel goes **upward**, from Queen Makeda of Sheba (traditional/uncertain date) to James Earl Jones (died 2024). 141 people ordered by **death year**, not year of their achievement.
- Where the death year is not established, `death-chronology.json` clearly labels a *traditional placement*, *approximate period*, *end of reign*, or *unknown date*. Do not present the proxy sort year as a verified death.
- **Ties within the same death year are provisional**, sorted by earlier career anchor; exact month/day chronology awaits individual source verification.
- Eight Era Challenge preview markers occupy their own bays in the central passage. **No credits are awarded by the preview.**
- Clicking a portrait toggles a glow and faces it forward; clicking separate white **Bio** text opens an accessible in-page modal with a larger image and X/Return controls.
- White Georgia names, dates, and Bio labels have dark shadows/outlines for legibility over later artwork. On mobile, portrait tap produces the same highlight without depending on hover.
- Landing scroll targets **Queen Makeda** on initial navigation (but not on browser back/forward or when a URL hash is present), after the scene data has loaded.
- General research references are separate from the portrait cards; the original Phase 1 research atlas is preserved at `/games/hall-of-legends/research-atlas/`.
- Main `/games/hall-of-legends/` URL now displays the actual chronological museum layout. The older `/scene-blueprint/` route remains as a layout review.

## Historical art-direction change
The previous Phase 2 environment allocations were based on the year of each person's major contribution. The user has now requested an ascent by **death date**, so the 12 galleries have been redistributed into approximately equal numbers of portraits. Do **not** reuse the previous scene-art assignment uncritically. New gallery architecture and exhibit contents must be researched for the **lives and achievements of the people now grouped together**, not only their passing dates. The entire journey remains **inside one continuous museum hall** with changing wall exhibits, flooring and lighting.

## QA gates still pending
- [ ] Inspect rendered mobile layout on 320, 360, 390, and 430 px devices, including safe areas and sticky navigation.
- [ ] Inspect desktop perspective, overlap, and image loading at 1366 and 1920 px.
- [ ] Verify live GitHub Pages deployment and initial scroll under the production site shell (repository script/data checks passed).
- [ ] Verify historical death dates and same-year ordering against reliable sources; ancient traditions must not be passed off as documented biographies.
- [ ] Build complete researched multi-page Bio Activities, varied Alliance Challenges and eight Era Challenges.
- [ ] Create final connected interior museum backgrounds **after** approving portrait positions and scene heights.

## Phase 6 — Interactive museum presentation (2026-11-03)
- Left portrait frames rotate **+26° clockwise** and slightly in 3D; right frames rotate **−26° counterclockwise**. Hover/focus/tap brings the frame to a full front-facing angle, lifts it and brightens the glow. Names, dates and Bio remain upright.
- Replaced perspective triangle floor with a continuous **46%-width parallel-sided floor** and fixed 27% wall boundaries through all 12 galleries; no vanishing-point transformation between scenes.
- Positioned **12 individually titled historical challenge buttons** and **8 Era Challenge buttons** in dedicated central-floor gaps. Their yellow transparent lettering glows continuously and pulses once when approached, using IntersectionObserver; no achievements are awarded by previews.
- Added a slim **sticky Legacy Ledger** directly beneath the site's shared navigation: Alliances 0/141, Legacy Credits 0/100, Era Seals 0/8. It replaces the shared reading controls on Hall pages only. Entrance repeats these three totals.
- Built a complete **visual certificate template** at the very top of the Hall with a recipient-name placeholder, score fields and eight unearned seals. Watermark says PREVIEW / NOT YET EARNED. The certificate is **not** awarded or downloadable until scoring is implemented.
- Moved contextual notes and consolidated historical references into a collapsed research section at the entrance, preserving the source-links-at-bottom rule.
- Modal preview overlay sits above both sticky navigation and scorebar. Reduced-motion visitors do not receive flashing arrival animation.
- Static integrity tests passed: 141 mapped unique portraits, ascending chronological order, 20 markers including eight Era Challenges, eight certificate seals, JS syntax and HTML div balance on both Hall routes.

**Still pending:** rendered desktop/mobile browser QA, final scenery, historical source validation for approximate dates, and the actual activity/scoring/certificate-award logic.
