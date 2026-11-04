# Hall of Legends — Phase 4 portrait preparation and handoff

**Status as of 2026-11-03:** Production crops staged in conversation artifact `Hall_of_Legends_Phase4_141_Portraits_Staging.zip`, not yet uploaded to this GitHub repo. **Do not treat the asset manifest as live file existence proof.**

## Results
- 120 optimized 512 × 512 WebP portraits from the user's **original sequentially numbered** source pack. Names and source numbers preserved. Top title and bottom caption excluded through a consistent face crop.
- 21 additional African portrait crops, representing figures absent from the numbered 120, from the separate African-themed ZIP.
- 8 African extra portraits explicitly flagged **art reconstruction required** because lettering remains near or across the face, headdress, or crown: Queen Makeda of Sheba, Piye, Ezana of Aksum, Kaleb of Aksum, Askia Muhammad I, Yaa Asantewaa, Queen Muhumuza, Empress Zewditu.
- 13 other African portraits are **provisional tight crops needing individual visual approval**, not release-quality final images.
- All originals remain untouched in the user's two uploaded source archives. Some source images are artistic reconstructions of pre-photographic people; these are not authenticated contemporary likenesses.

## Staging file structure
- `portraits/001.webp` through `portraits/120.webp`: original numbered source pack in its original 1–120 source order.
- `portraits/121.webp` through `portraits/141.webp`: the 21 additional African cards in the consistent source order defined by `phase4-portrait-manifest.json`.
- `portrait_manifest.json`: exact image filename, original ZIP file, face-crop box, QA status and SHA-256 per image.
- `portrait_inventory.csv`: compact inventory.
- `qa_contact_sheet_1.jpg` through `qa_contact_sheet_4.jpg`: visual QA.
- `index.html`: local, browser-readable preview of all 141 cropped assets.

## Next technical deployment step
With an authenticated **binary asset upload mechanism**, extract the approved portrait WebPs to `assets/hall-of-legends/portraits/` in this repository, verify that 141 expected paths return HTTP 200 with WebP mime types, then update the Hall to use the new local asset manifest. The currently connected GitHub UTF-8 file operations cannot transfer the binary WebP bytes from the local staging container, so no false broken `img` URLs have been introduced to the live Hall.

Do not silently route new websites through a third-party CDN or unfamiliar vendor. Do not link `/assets/hall-of-legends/portraits/*.webp` in public HTML until the files are present.

## Original user-approved gameplay architecture — retain
- Connected indoor museum hall with historically changing walls, museum installations, ground textures, era-appropriate scenic imagery and seamless panoramic transitions.
- Independent overlay portraits, never baked into the scenery, so responsive mobile crops preserve portrait size and pop-up quality.
- Individual portrait button: **Bio Activity**. Opens in-page accessible dialog, clear close **X**, a precise multi-page researched biography, then one varied short Alliance Challenge. Passing it earns one **Alliance** out of 141, not Legacy Credits.
- Larger **Era Challenge** appears on the hall's central pathway after learning from multiple figures; these eight era challenges together can award **100 Legacy Credits**. No invented extra currency.
- Eight era achievements/seals, evolving certificate at the summit, arrows to summit and entrance, Resume Journey, settings, export/restore, and last-option Reset Journey.
- Historical sources in a **separate References** section, not direct outbound links on portrait cards. During game operation, no card should unexpectedly navigate off-site.

## Phase 4 quality gates
- [x] 141 illustrations mapped into an image file pack.
- [x] 120 original numbering and source filename mappings preserved.
- [x] All crop outputs optimized for responsive website use (512×512 WebP).
- [x] Visual contact sheets generated and checked.
- [x] Individual quality flags included.
- [x] The live atlas now uses Bio Activity popup instead of off-site research links; scene preview source references moved below the journey.
- [ ] Finish text-free reconstruction for 8 flagged images.
- [ ] Approve all 21 added African portrait crops and any portraits where a full head/headdress is needed.
- [ ] Transfer the binary artwork to GitHub and confirm live asset URL availability.
- [ ] Visual regression test on real mobile/desktop rendered site.
- [ ] Validate historical image rights and source credits.
