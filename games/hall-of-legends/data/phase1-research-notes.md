# Hall of Legends — Phase 1 historical research and artwork audit
**Prepared:** 2026-11-03  
**Status:** Artwork inventory and preliminary historical sequence complete. Individual biographical fact-checking and illustrated likeness review remain open. **Do not treat this document or the planning sequence as a published, verified historical encyclopedia.**

## 1. Verified inputs and de-duplication
- **Main BLACK HISTORY FIGURES (8.5 x 11 in).zip:** 120 figure illustrations.
- **African Black HISTORY Heroes.zip:** 35 PNGs; 3 supporting files (BHH Bingo Cover.png; Heroes in Order.png; 2.png) and 32 figure illustrations.
- **11 historical subjects** occur in both packs: Sundiata Keita, Mansa Musa, Afonso I of Kongo, Queen Amina of Zazzau, Queen Nzinga, Ayuba Suleiman Diallo, Shaka Zulu, Haile Selassie I, Jomo Kenyatta, Kwame Nkrumah, Patrice Lumumba.
- **21 additional African subjects** occur only in the African-focused pack. See `phase1-catalog.json` for their exact source image names.
- **Result: 141 distinct named portrait subjects**, of which some are figures known mainly through tradition and require careful historicity labels. All 152 figure illustrations are retained in the mapping, as possible alternate artwork. No original images are to be destructively cropped.
- The **120 + 32 - 11 = 141** count refers to unique named entries, *not* 141 verified independent archaeological or historical identities.

## 2. Editorial chronological framework (not a list of verified individual dates)
1. Ancient Africa and the Nile Valley.
2. African Kingdoms, Empires and Scholarship.
3. African Kingdoms and the Atlantic World.
4. Enslavement, Resistance and Freedom.
5. Emancipation, Empire and New Institutions.
6. Modern Movements, Arts and Innovation.
7. Civil Rights, Independence and Global Change.
8. Modern Legacies and New Possibilities.

**Important:** The `editorial_anchor` field in the JSON is a coarse, provisional year used only to order the collection during production. It is not necessarily a birth date, death date, battle date, or firmly verified contribution year. Recheck exact dates, overlaps, period boundaries, geographic framing and historical sequence for every figure before any public biography or challenge is published. The reader-facing atlas uses only era labels rather than these unverified anchor years.

## 3. Critical source questions and classification safeguards
- **Queen Makeda / Queen of Sheba:** Treat Ethiopian tradition and the `Kebra Nagast` as traditions, not independently substantiated exact chronology or authenticated likeness. Distinguish the literary Queen of Sheba from the archaeological history of Saba, Ethiopia and the Red Sea region.
- **Moremi Ajasoro:** Yoruba historical memory and oral tradition; avoid unsupported exact biographies/dates.
- **Tenkamenin:** Traditional account, with identity/chronology requiring specialist verification.
- **Zoskales:** Study ancient external accounts, likely `Periplus of the Erythraean Sea`, and disputed identifications before drawing conclusions.
- **All illustrated ancient/medieval rulers:** Treat as contemporary artistic interpretations unless a specific authenticated historical depiction is cited.
- **Portrait letters overlap some African leaders' faces:** Plan separately reconstructed, text-free versions for gameplay; preserve the original illustrated PNGs as artwork and do not call re-creations documentary portraits.
- **Editorial naming corrections** from original filenames include Billie Holiday, Medgar Evers, Fannie Lou Hamer, Althea Gibson, Marvin Gaye, Malcolm X, Mary Church Terrell, Roger Arliner Young, George Washington Carver, and Pelé (Edson Arantes do Nascimento). Each needs standard authoritative biographical confirmation as part of individual review.

## 4. Source foundation: prioritize historians and historical evidence
These are **research sources to consult**, not claims that every person has already been individually sourced.

- **UNESCO**, *General History of Africa*: multi-volume scholarship produced with extensive leadership by African historians including Joseph Ki-Zerbo, Djibril Tamsir Niane, J. F. Ade Ajayi and A. Adu Boahen. https://www.unesco.org/en/general-history-africa
- **Emmanuel K. Akyeampong and Henry Louis Gates, Jr.**, eds., *Dictionary of African Biography*, Hutchins Center / Oxford University Press: https://hutchinscenter.fas.harvard.edu/DAB
- **Smithsonian National Museum of African American History and Culture**, educators' primary-source and learning collections: https://nmaahc.si.edu/learn/educators/resources
- **Library of Congress**, African American history manuscripts and primary-source collections: https://guides.loc.gov/african-american-history-online/online-resources
- **The Metropolitan Museum of Art**, *Visualizing a Sahelian Past*: explains how subsequent historical artwork may translate rather than reproduce Sahelian imagery and cautions against projecting modern forms backward. https://www.metmuseum.org/pt/perspectives/visualizing-a-sahelian-past
- **The Metropolitan Museum of Art**, *The Trans-Saharan Gold Trade*: Ghana, Mali, Sundiata, Mansa Musa, long-distance trade and evidence limitations. https://www.metmuseum.org/es/essays/the-trans-saharan-gold-trade-7th-14th-century
- **S. Canós Donnay**, *The Empire of Mali*, Oxford Research Encyclopedia of African History (open version at UCL), for an archaeological and source-critical perspective: https://discovery.ucl.ac.uk/id/eprint/10070150/
- **The Metropolitan Museum of Art**, *Shabti of Taharqo*, object evidence of Taharqo's reign 690–664 BCE: https://www.metmuseum.org/art/collection/search/544883
- **Dictionary of African Christian Biography**, *Makeda*, for the distinction between Ethiopian tradition and modern historical inquiry: https://dacb.org/stories/ethiopia/makeda/

### Required source standard for every later biography
Record: individual canonical name; era and geographic setting; reputable biographical sources including African/African-diaspora scholarship where applicable; primary-source or material-evidence link when available; claims checked; uncertain claims disclosed; approximate versus documented dates; source URL/title/author; artistic-portrait disclosure; one short evidence-based challenge. Use respectful language and age-appropriate treatments of violence and enslavement. Avoid hero worship, one-sided narratives, and unsupported universal claims.

## 5. Phase 1 to Phase 2 handoff
- **Complete:** Original filename inventory; 141-subject de-duplication; 11 image-alternative mappings; 8-era preliminary ordering; research source registry; caution flags; portal and basic atlas routes.
- **To verify in focused historical review:** Individual dates, birth/death names, geography, active period, source notes, identification of unusual filenames, copyright/right-to-use status, and any disputed tradition. These remain explicitly marked `pending_individual_review` in the catalog.
- **Next phase:** Establish a single historically specific visual environment with a mobile-first scene, upward pathway, left/right portraits and sensible reduced-motion behavior, before generating dozens of images.
- **Next prototype:** Six fully researched profiles, three mini-challenge formats and source links per figure, not 141 full lessons at once.

**Page routes:**
- Black History entrance: `/lessons/black-history/`
- Hall of Legends Phase 1 atlas: `/games/hall-of-legends/`
- Existing Heroes Lessons: `/lessons/black-history-heroes/`
- Unified Black History Lessons: `/lessons/black-history/lessons/`
- Full chronological course roadmap: `/lessons/black-history/course/`


## 2026-11-03 chronology extension — research-stage output
- All **141 entries now have a date label** in `phase1-catalog.json` and original 1–120 artwork positions are preserved.
- The dates mix life spans, regnal periods, and activity periods by design; do not compare all labels as identical date types.
- A **preliminary reading order** follows each person's influential activity or contribution, not birth year. This avoids placing all African people before the Americas regardless of chronology.
- The atlas renders earliest material at the **bottom**; each era's displayed list is deliberately reversed in the DOM so moving **up** advances forward in time.
- Twenty entries have initial individually relevant reference URLs in the catalog. **The other 121 entries still need individual source checks** before any final bio/challenge is authored. A source link is not, by itself, full historical verification.
- **12 provisional scenery segments** now encompass all 141 unique named subjects with counts 10, 7, 11, 14, 12, 11, 13, 13, 14, 14, 14, 8; adjacent segments are grouped into **6 conceptual panoramic pairs**. These are artwork planning assignments only, not final chronology sign-off.
- The source archives have been inspected programmatically and contain 120 + 35 PNGs. In the African archive, 3 are nonportrait support images, 11 portraits overlap, and 21 introduce new named entries. Nothing was deleted.
- Historical claims **not resolved**: identities and chronology of Makeda, Tenkamenin, Moremi Ajasoro, Zoskales, and contested dates for Amina of Zazzau; region and contribution dates for numerous modern biographies; publisher rights for provided imagery.
- Individual visual portrait recreation and **the 141 personal Alliance activities, 8 Era Challenges, 100-credit system, local progress and certificates** remain later build phases and have **not** been presented as completed features.

### Additional sources checked during this audit
- **Smithsonian Libraries**: Ackson M. Kanduza, *Labotsibeni (c. 1858–1925): queen mother of Swaziland, 1890–1899; queen regent, 1899–1921*. https://www.si.edu/object/siris_sil_818547
- **Smithsonian Libraries**: A. Adu Boahen and Emmanuel Akyeampong, *Yaa Asantewaa and the Asante-British War of 1900–1*. https://collections.si.edu/search/detail/edanmdm%3Asiris_sil_739224
- **Cambridge University Press**: Richard Vokes, *Ghosts of Kanungu*, chapter on Nyabingi and Muhumuza. https://www.cambridge.org/core/books/abs/ghosts-of-kanungu/on-fertility-misfortune/8AD566389F33E26932260BCE5EFFDF46
- **Oxford Dictionary of National Biography**: John D. Omer-Cooper, Shaka and Queen Nandi. https://academic.oup.com/oxford-dictionary-of-national-biography/reference/63486/reference-article-abstract/582570474
- **Kenyan Presidential Library**: Jomo Kenyatta, uncertain birth circa 1895. https://www.presidentiallibrary.go.ke/index.php/presidents/he-mzee-jomo-kenyatta
- **Cécile Fromont**: Kongo chapter in *Great Kingdoms of Africa*, demonstrating 1506 accession for Afonso. https://thecrucibleinstitute.org/wp-content/uploads/2025/02/Great-Kingdoms-of-Africa_John-Parker.pdf

### Reviewer release gate
Before a profile earns a historical-verification mark, require a vetted source supporting dates and place, accurate attribution of actions, a note on disputed claims, portrayal of the figure in context, and a valid source link. Do not describe these 141 individual biographies as fully fact-checked at this stage.
