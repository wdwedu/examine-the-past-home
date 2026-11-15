# Examine the Past interface contract

- Preserve the approved black, yellow, green and Georgia identity. Make bounded edits.
- All pages, including playable games, use `assets/site-shell.js` for header and footer. Do not restore the separate legacy game shell markup.
- The unboxed three-line menu is the last header control, on the right. Its panel opens on the right. Keep shortcut icons visible.
- Install App is at the top of the menu and after All Lessons in the footer. Lighting is at the bottom of the menu with a bulb and Lights On/Off label.
- Close and installation buttons use solid bright yellow with black text, without an orange gradient.
- Shared footer logos and links come from the homepage shell. Keep official InAct credit artwork.
- YouTube music is still video: minimizing must keep the same player visible at least 200 × 200 pixels. Closing stops it. Do not implement hidden YouTube playback.
- Run the shared shell migration, `.github/scripts/check_shell.py`, and JavaScript syntax checks before publishing. Check menu placement and minimize/restore behavior when changing shared controls.

## Grade 5–8 lesson contract
- Before revising a lesson, compare it with `lessons/curriculum/grade-5-early-american-history/north-america-before-european-colonization/index.html`. Preserve that approved reference.
- Use Goals for Learning (Standards, Essential Questions, Objectives, Pacing Options), Introduction, Guided Practice, Independent / Group Practice, Assessment, Closure, Extensions, Sources.
- Keep green / blue / red / purple / green / gold / blue / gray sections and matching active navigation. Nested cards remain in their section family or black. Entry fields are white with black Georgia text.
- Preserve lesson-specific readings, media and activities. Grade 5–6 include explicit vocabulary and reading scaffolds; Grade 7–8 increase independent corroboration and argument demands. Do not claim certified reading levels without measurement.
- All pathways require the same objectives and individual exit evidence. Unit assessments use the approved green mixed-format model with a reviewable writing rubric; automated writing estimates are provisional.
- Update all relevant renderers and validate route/data coverage before declaring a grade complete.
