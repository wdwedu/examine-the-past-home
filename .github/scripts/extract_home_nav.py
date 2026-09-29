from pathlib import Path
import re

html = Path("index.html").read_text(encoding="utf-8", errors="ignore")

# Capture the primary navigation block that contains nav-item.
nav_match = re.search(r'(<nav\b[^>]*>.*?class=["\'][^"\']*nav-item[^"\']*["\'].*?</nav>)', html, re.S|re.I)
if not nav_match:
    # broader fallback: section around first nav-item
    pos = html.find("nav-item")
    if pos < 0:
        raise SystemExit("nav-item not found")
    start = html.rfind("<nav", 0, pos)
    end = html.find("</nav>", pos)
    nav = html[start:end+6]
else:
    nav = nav_match.group(1)

# Capture style rules relevant to the main nav and sound control.
rules = []
for style in re.findall(r'<style[^>]*>(.*?)</style>', html, re.S|re.I):
    for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', style, re.S):
        sel = m.group(1).strip()
        body = m.group(2).strip()
        key = sel.lower()
        if any(k in key for k in [
            "nav-item","nav-label","nav-inner","nav-center","site-nav","main-nav",
            "image-nav","sound-btn","music","nav-glow","emoji-icon","blooms-symbol",
            "timeline-line-icon","nav-star"
        ]):
            rules.append(f"{sel}{{{body}}}")

out = "=== NAV HTML ===\n" + nav + "\n\n=== NAV CSS ===\n" + "\n".join(rules)
Path(".github/home-nav-snapshot.txt").write_text(out, encoding="utf-8")
print("Wrote home nav snapshot", len(out))
