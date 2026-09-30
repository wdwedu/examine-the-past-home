from pathlib import Path
import re
html = Path("index.html").read_text(encoding="utf-8", errors="ignore")

def block(tag, marker):
    pos = html.find(marker)
    if pos < 0:
        return ""
    start = html.rfind(f"<{tag}", 0, pos)
    end = html.find(f"</{tag}>", pos)
    if start < 0 or end < 0:
        return ""
    return html[start:end+len(tag)+3]

# Top text navigation: find the nav containing "EXPLORE THE PAST"
top = block("nav", "EXPLORE THE PAST")
# Icon navigation: find primary navigation
icon = block("nav", "Primary navigation")
if not icon:
    icon = block("nav", "nav-item image-nav")
# Footer
footer_pos = html.lower().rfind("<footer")
footer = ""
if footer_pos >= 0:
    footer_end = html.lower().find("</footer>", footer_pos)
    if footer_end >= 0:
        footer = html[footer_pos:footer_end+9]

# collect relevant CSS
rules=[]
for style in re.findall(r'<style[^>]*>(.*?)</style>', html, re.S|re.I):
    for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', style, re.S):
        sel=m.group(1).strip(); body=m.group(2).strip(); key=sel.lower()
        if any(k in key for k in ["top-nav","header","site-nav","final-nav","nav-item","nav-label","footer","resource","vault-card","feature-card","sound-toggle","sound-emoji"]):
            rules.append(f"{sel}{{{body}}}")

out = "=== TOP NAV ===\n"+top+"\n\n=== ICON NAV ===\n"+icon+"\n\n=== FOOTER ===\n"+footer+"\n\n=== CSS ===\n"+"\n".join(rules)
Path(".github/site-shell-snapshot.txt").write_text(out, encoding="utf-8")
print("snapshot", len(out))
