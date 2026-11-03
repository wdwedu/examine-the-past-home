# Hall of Legends — Phase 2: historical visual design map
**Date:** 2026-11-03  
**Status:** Scene sequence, figure positions, landscape concepts, ground transitions, panoramic pairing and responsive layout specified. **Final background artwork is NOT generated.** Phase 1 source verification is still in progress.

## What is built
- A working, responsive [Phase 2 design preview](../scene-blueprint/) linked from the [Hall of Legends](../).
- [Machine-readable scene blueprint](phase2-visual-blueprint.json): complete left/right, bottom-to-top assignments for **all 141 figures**, dates, source-artwork indices and scene design palettes.
- 12 contiguous scene sections, arranged in **six connected panorama pairs**. Actual historical portraits will be separate WebP layers, not permanently embedded into scenery.
- Maintains Examine the Past brand (black, yellow, green, Georgia); the Hall backgrounds use historically appropriate contrasting local color palettes.

## Scenery sequence — from **BOTTOM** to **TOP**
| Scene | Figures | Scenic environment | Ground and path | Connected master |
|---|---:|---|---|---:|
| 1. Nile Valley and Red Sea Worlds | 10 | Kushite Nile landscape, Meroë, later Aksumite stelae as distinct vignettes | River gravel → worn sandstone | 1 |
| 2. Sahelian Kingdoms and Scholarship | 7 | Sahelian political courts, trade routes, earthen architectural forms, learning | Pressed earth → compacted laterite | 1 |
| 3. African Courts and Atlantic Crossroads | 11 | Kongo and West/Central African settings, ports and Atlantic world | Forest earth → timber → coastal stone | 2 |
| 4. Paths of Resistance and Freedom | 14 | Distinct African, Caribbean and North American stories of resistance and organizing | Woodland trail → cobblestone street | 2 |
| 5. Reconstruction and African Resistance | 12 | Schools, workshops, civic buildings; separate African resistance contexts | Brick walkways → packed road | 3 |
| 6. New Institutions and Invention | 11 | Educational institutions, printing, early industry, research, governance | Wooden boards → institutional tile | 3 |
| 7. Jazz, Flight and Literary Awakening | 13 | Aviation, urban streets, writing, art studios and stages | Brick streets → stage floorboards | 4 |
| 8. War, Work and Boundaries Broken | 13 | Wartime service, labs, sport, public life, industry | Industrial concrete → urban pavement | 4 |
| 9. Movement, Rights and Independence | 14 | Community organizing, civic streets, distinct African independence settings | City sidewalks → civic steps | 5 |
| 10. New Nations and Expanding Horizons | 14 | Global independence, social change, science, cultural exchange | Granite plazas → public pavement | 5 |
| 11. Voices, Organizing and Global Change | 14 | Neighborhood institutions, newsrooms, laboratories, cultural stages | Civic paving → smooth concrete | 6 |
| 12. New Possibilities and Living Memory | 8 | Contemporary research, art, leadership, broad summit overlook | Smooth stone → open terrace | 6 |
| **Total** | **141** | | | **6 masters / 12 scene exports** |

This is a period-by-period exhibition collage, **not** a literal roadway crossing one African city, the Atlantic, and America. Historical landmarks must be placed with geographically accurate context and period labels. For example, the Great Mosque of Djenné standing today was rebuilt in 1907; do not depict its contemporary construction unchanged during 13th-century Mali.

## Final artwork production budget
- **6 master vertical connected environment images**, each representing a coordinated **two-scene panorama**.
- Export each master as **2 separately optimized WebP background scene slices**, giving **12 public scene files**.
- **2 additional bookend environments**: welcome/entrance near the bottom, summit/certificate terrace near the top.
- **Total anticipated authored environment compositions = 8**; **optimized backgrounds served = 14** (12 scene slices plus 2 bookends). Additional mobile compositions only if cropping cannot preserve the central path.
- **141 independent portrait assets** (optimized WebP). The **11 duplicate illustration choices** remain as alternate artwork, not extra people. Scenery never includes final figures, faces, names, or words as part of the pixel image.
- Sample dimensions for artwork tests, not a permanent vendor constraint: master pair ~2400px wide and 4000px tall, scene exports ~1600–2000px wide depending verified quality/performance; keep background bandwidth low via WebP/AVIF and lazy decoding. Test actual crop at 360/390px mobile and 1366/1920px desktop before committing to an export ratio.

## Consistent perspective & seams
1. The main ascending path is visible in the **center** of every scene (desktop ~38–62% width). It narrows toward the distant vanishing point rather than becoming a flat 2D stripe.
2. Use an identical camera horizon convention, spatial vanishing-point geometry, and continuous ground edge in each **paired master**.
3. Blend roughly 10% at the join between adjacent sections; use a shared color/texture overlap, lighting direction and architecture silhouette continuation.
4. **Ground transforms visibly:** gravel → sandstone → earth/laterite → wood/stone → brick → industrial/civic paving → modern stone.
5. **Desktop edge scenery** spans the outer ~20% per side. Portrait locations sit in safe columns around ~20–38% and 62–80%; the center stays open as the journey.
6. **Mobile background cropping** must be allowed to remove wide scenic edges while still conveying the central path and era. If cropping destroys key context, export a dedicated mobile crop. Never depend on scenery to display portrait names or essential historical details.
7. Face layer/tap cards stay physically consistent: desktop about 128–176 CSS px, mobile 126–148px, at least 44px effective interactive targets. Portrait name and lifespan/reign/active period display as HTML text, not embedded pixels.
8. On mobile, 2 columns of faces can appear in the same landscape tier; each scene will use **4–7 vertical tiers**, based on 7–14 figures.
9. The scene transition should not cover the visitor's existing header, footer, controls or eventual pop-up. Respect `prefers-reduced-motion`.

## Era boundaries, historical safeguards and sources
- **Documented landscape sources:** UNESCO Meroë/Kush (https://whc.unesco.org/en/list/1336/), UNESCO Aksum (https://whc.unesco.org/en/list/15), UNESCO Djenné (https://whc.unesco.org/en/list/116/).
- **African macro-history sources:** UNESCO *General History of Africa* (https://www.unesco.org/en/general-history-africa), emphasizing African authors and regional contexts.
- **American history approach:** Smithsonian National Museum of African American History and Culture exhibitions (https://www.si.edu/newsdesk/factsheets/national-museum-of-african-american-history-and-culture-inaugural-exhibitions) and Smithsonian Reconstruction resources (https://www.si.edu/exhibitions/make-good-promises-reconstruction-and-its-legacies%3Aevent-exhib-6538).
- All historical foreground buildings, flags, textiles and instruments must be checked before public display. A modern photo can inform architectural materials but should not be copied into anachronistic reconstructed scenes.
- Queen Makeda, Moremi Ajasoro, Tenkamenin and similar subjects are associated with oral or written traditions rather than secure dates; clearly separate such traditions from documented political events.
- Avoid decorative chains or dramatized suffering as a game mechanic; represent difficult histories rigorously, respectfully and age-appropriately.

## Acceptance tests before Phase 3 image production
- [x] 141 figures mapped once, no omitted/duplicate named heroes.
- [x] 12 sections, grouped as 6 master pairs.
- [x] Each person has one proposed side and vertical tier.
- [x] HTML face tiles have captions and dates, responsive desktop/mobile.
- [x] Both directions of travel and full-site navigation preserved.
- [x] Artwork can be cropped without destroying the figure overlays.
- [ ] Person-by-person chronology and sources signed off (Phase 1 follow-through).
- [ ] A **single two-scene connected artwork sample** approved for composition, detail and seam quality (beginning Phase 3).
- [ ] Actual background images optimized and performance measured.
- [ ] Final portrait crops and the unique Alliance interactions implemented.

**Note:** The preview contains simplified color-and-ground placeholders for assessing geometry and cropping—not final scenic illustrations. Do not present those placeholders as completed artwork.
