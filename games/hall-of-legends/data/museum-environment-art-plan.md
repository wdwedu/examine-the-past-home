# Hall of Legends — Connected Museum Environment Art Plan

**Status:** Approved layout geometry and challenge placements are installed. **The detailed historical environment illustrations are NOT yet generated.** This is the production brief for building the wall/floor artwork behind the existing 141 original-product portraits.

## Locked design and learning system

- 141 individually framed portraits, 12 chapters, 20 named Legacy Credit challenges at **5 credits each**, and 8 end-of-chapter Era Challenges. One earned Alliance per completed figure-specific branching Bio Activity; one seal per successfully completed Era Challenge. **No score awards are active yet.**
- Gallery ascent is by year of passing, with historically uncertain ancient dates clearly qualified. Queen Makeda is the entrance; James Earl Jones is the summit.
- Square portrait artwork remains the original product illustration and uses `object-fit: contain`. Do not regenerate faces, bake portrait artwork into walls, or change the geometric gold/green Afrocentric-inspired SVG frame.
- Portrait, name, date, and Bio remain one DOM element that lifts and glows. The Bio pop-up opens with a short portal-style transition and will eventually contain the branching Alliance scenario. No separate Lesson button in the Hall.
- Background must depict a **single uninterrupted indoor museum corridor**, with parallel walls and floor. No triangular floor, forced vanishing point, disconnected scene cards, or major road-width change between chapters.
- Chapter themes are **museum exhibit motifs**, not a claim that all historical people lived in the same geography. Use figure-specific, verified evidence and art cues; avoid invented quotations, misleading artifacts, or implying that artistic portraits are authenticated likenesses.

## Single-source placement coordinates

The exact coordinates are in [gallery-geometry.json](gallery-geometry.json) and are used directly by the live renderer.

- **Canvas reference:** 1530 px wide desktop layout. Each chapter's `scene_height_px` below is the exact vertical span of its portrait/challenge mounting area. The header is separate above that span.
- **Desktop:** left wall x = 0–27%; central floor x = 27–73% (46%); right wall x = 73–100%. Frames sit on the side walls with square image region and nameplate beneath. Typical frame width is CSS `clamp(145px,16vw,190px)`.
- **Mobile (850 px and below):** walls widen to 34% each and the floor narrows to 32% to keep frames fully on the wall; frame width `clamp(98px,31vw,205px)`. Challenge signs may extend slightly across the empty floor bays for legibility but must not overlap portrait frames.
- Each portrait has a stable `id`, `side`, `bottom_px`, and `source_artwork` in the geometry file. Each challenge has its own `bottom_px`, `lane`, and reward. **All visual decoration must be aligned to these anchors.**
- Reserve a clear margin of at least **28 px** around each framed portrait at rest and at least **50 px** around its hover/tap glow. Keep labels, decorative artifacts, and wall reliefs outside that clearance.
- Challenge bays should remain uncluttered within **100 px above and below** their marker center; markers are staggered west/east within the corridor, not placed in a rigid vertical column. The Era Challenge belongs above the chapter's final portrait.
- At chapter boundaries, match floor width, wall joints, lighting perspective and border tones. Blend texture and lighting over ~128–180 px, without moving portrait coordinates.

## Production layers (do not flatten them)

1. **Architectural base:** two wall panels, one continuous parallel-sided floor, ceiling lighting and subtle perspective. This is the repeatable, responsive foundation.
2. **Chapter material pass:** seamless stone, plaster, wood, tile or museum wall material with period-appropriate accents. Use soft crossfades; keep floor/wall geometry identical.
3. **Figure-specific wall vignettes:** localized wall exhibits anchored to each portrait's coordinate (engraving, map, sourced document, artifact case, lighting pool, or architectural niche). These should wrap *around* the framed person and blend into neighboring vignettes rather than appearing as separate pasted cards. A figure can have a different vignette from others who died in the same year.
4. **Foreground interactive layer:** existing portrait frames, names/dates, Bio buttons, Legacy activities and Era Challenges. They must remain sharp and accessible above the environment art.
5. **UI layer:** the sticky Legacy Ledger, modal transitions and summit certificate. Never bake these into background images.

**Recommended asset strategy:** Do not export one 35,000-pixel-tall image. Use reusable lightweight wall/floor textures, with chapter art in independently compressed WebP segments (target ~1536×1200 or 1536×1600 each, blended at seams). Keep figure-specific ornaments as separately positioned transparent WebP/SVG overlays that can reposition responsively. Export at two sizes only when needed; test memory/performance on phones before raising resolution.

## Chapter-by-chapter visual direction

| Chapter | Portraits | Mounting height | Wall exhibit theme | Examples |
|---|---:|---:|---|---|
| 1. Ancient Courts and First Kingdoms | 11 | 3168 px | Nubian and Aksumite courts — Stone columns, river trade routes, inscriptions and restrained metalwork; label the Queen of Sheba's tradition as uncertain | Queen Makeda · Taharqa · Amanirenas |
| 2. African Kingdoms and Atlantic Crossroads | 12 | 3264 px | Kingdoms and Atlantic crossroads — Sahelian architecture, Kongo textiles, royal court archives and trade maps; respectful memorial treatment of the Atlantic slave trade | Sundiata Keita · Mansa Musa · Queen Nzinga |
| 3. Revolution, Resistance and Emancipation | 12 | 3088 px | Resistance and the struggle for freedom — Haitian revolutionary documents, maps, early Black enterprise, African resistance and freedom records | Toussaint Louverture · Benjamin Banneker · Elizabeth Freeman |
| 4. Abolition, Reconstruction and New Paths | 12 | 2864 px | Abolition, reconstruction and new paths — Abolition print rooms, emancipation records, maritime heritage, sculpture and early scientific institutions | Frederick Douglass · Harriet Tubman · Alice Augusta Ball |
| 5. New Institutions and Early Innovation | 11 | 2704 px | Institutions, invention and leadership — Laboratories, aviation, Black-owned enterprises, newspapers, university buildings and anti-colonial campaigns | Madam C.J. Walker · Bessie Coleman · Ida B. Wells |
| 6. Arts, Discovery and Midcentury Change | 12 | 3040 px | Arts, discovery and midcentury change — Art Deco gallery with literature, jazz, polar exploration, civic education and African independence | Billie Holiday · Zora Neale Hurston · Patrice Lumumba |
| 7. The Movement and a Changing World | 12 | 2656 px | Civil rights and cultural transformation — Civic architecture, sourced march imagery, archival microphones, jazz venues and memorial exhibits | Medgar Evers · Malcolm X · Martin Luther King Jr. |
| 8. New Voices and Global Horizons | 12 | 2992 px | Global horizons and new voices — Midcentury terrazzo, sport and music exhibits, Pan-African politics and global independence displays | Jackie Robinson · Fannie Lou Hamer · Bob Marley |
| 9. Culture, Achievement and New Generations | 11 | 2672 px | Culture, achievement and new generations — Law, medicine, stage and athletics galleries with original archival objects and carefully credited imagery | James Baldwin · Thurgood Marshall · Wilma Rudolph |
| 10. A World in Transition | 12 | 2992 px | A changing world — Hip-hop and film exhibits, civil rights remembrance, armed-service archives and cultural performance | Tupac Shakur · Rosa Parks · Shirley Chisholm |
| 11. Legacies of the New Century | 12 | 2800 px | Legacies of the new century — Books, performance, scientific computing, medical advances, anti-apartheid history and human rights | Nelson Mandela · Maya Angelou · Patricia Bath |
| 12. Living Memory and Enduring Influence | 12 | 2992 px | Living memory and enduring influence — Space science, voting rights, theater, sport, peace and public-service exhibitions with a dignified certificate summit | Katherine Johnson · John Lewis · James Earl Jones |

## Chapter activity signage

The 20 five-credit activities are staggered between portraits; their order, `after_figure_id`, and west/east lane are locked in [activity-placement.json](activity-placement.json). The eight seal milestones are immediately **after the last figure of chapters 1, 3, 4, 6, 8, 10, 11 and 12**.

| Chapter | Five-credit activities | Seal |
|---|---|---|
| 1 | Legacy Reflection | Seal 1 |
| 2 | Artifact Detective / Map the Moment | — |
| 3 | Historical Crossroads / Timeline Tangle | Seal 2 |
| 4 | Evidence Vault | Seal 3 |
| 5 | Chronology Check / Cause & Effect Match | — |
| 6 | Voices of Change / Who Said It? | Seal 4 |
| 7 | Connections Challenge | — |
| 8 | Primary Source Spotlight / Fact or Fiction? | Seal 5 |
| 9 | Turning Point / Visual Evidence | — |
| 10 | Legacy Link / Hidden History | Seal 6 |
| 11 | Cause & Consequence | Seal 7 |
| 12 | History in Context / The Legacy Question | Seal 8 |

## Image alignment and quality assurance

1. Render geometry without art at desktop widths 1366 and 1920 px and mobile widths 320, 360, 390, 430 and 768 px. Confirm no portrait/nameplate extends beyond its wall, no floor sign overlaps a frame, and no sideways scrolling.
2. Build one pilot environment chapter (Chapter 1) with two or three portrait vignettes, then check a second pilot (Chapter 12) to validate the contrast between ancient and contemporary materials.
3. Confirm backgrounds are **independent of portrait coordinates** and that the original square artwork remains perfectly sharp at the mounted frame size.
4. Verify the glow, lift, Bio modal transition, screen-reader labels, keyboard access and reduced-motion settings over both light and dark textures.
5. Verify chapter seams: wall edges at 27/73% desktop and 34/66% mobile, uninterrupted floor boards/stone joints, no sudden vanishing-point shifts.
6. Only after the two pilot chapters pass should all remaining wall vignette layers be produced. Research figure-specific artifact references and rights before drawing or displaying any archival material.
7. Bio scenario writing is a separate historical learning-design phase. Build evidence-based choices, feedback and retry behavior per figure, then award **exactly one Alliance** upon passing. The 20 Legacy Credit challenges award **exactly five credits** each, and the eight Era Challenges award **one seal** each. Never award by merely opening a modal.

## Current limitations

The corridor and frame layout, all 28 challenge markers, the modal transitions, and the geometry data are in the repository. **Detailed historical wall artwork, completed biographies, branching scenarios, scored activities, and earned certificates remain future builds.** Do not represent placeholder interactions as completed lessons.
