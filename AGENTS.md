# Examine the Past interface contract

- Preserve the approved black, yellow, green and Georgia identity. Make bounded edits.
- All pages, including playable games, use `assets/site-shell.js` for header and footer. Do not restore the separate legacy game shell markup.
- The unboxed three-line menu is the last header control, on the right. Its panel opens on the right. Keep shortcut icons visible.
- Install App is at the top of the menu and after All Lessons in the footer. Lighting is at the bottom of the menu with a bulb and Lights On/Off label.
- Close and installation buttons use solid bright yellow with black text, without an orange gradient.
- Shared footer logos and links come from the homepage shell. Keep official InAct credit artwork.
- YouTube music is still video: minimizing must keep the same player visible at least 200 × 200 pixels. Closing stops it. Do not implement hidden YouTube playback.
- Run the shared shell migration, `.github/scripts/check_shell.py`, and JavaScript syntax checks before publishing. Check menu placement and minimize/restore behavior when changing shared controls.
