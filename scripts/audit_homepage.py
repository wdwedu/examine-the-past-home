from pathlib import Path
import re, html

src = Path("index.html").read_text(encoding="utf-8", errors="ignore")
terms = [
    "History Hub","Resource Vault","On This Day","Today in History","Timeline",
    "History Map","History Maps","Games","History Unlocked","Teacher Tools",
    "Hidden Treasures","Contact","About","Home","Bloom","Movies"
]

out = []
out.append(f"index bytes: {len(src.encode('utf-8'))}")
out.append(f"index chars: {len(src)}")
out.append(f"line count: {src.count(chr(10))+1}")
out.append("")

def clean(s):
    s = re.sub(r"\s+", " ", s)
    return html.unescape(s)

for term in terms:
    out.append("="*80)
    out.append(term)
    hits = list(re.finditer(re.escape(term), src, flags=re.I))
    out.append(f"occurrences: {len(hits)}")
    for i,m in enumerate(hits[:12],1):
        start=max(0,m.start()-700); end=min(len(src),m.end()+700)
        snippet=clean(src[start:end])
        out.append(f"--- hit {i} @ {m.start()} ---")
        out.append(snippet)
    out.append("")

# Candidate clickable elements and labels
out.append("="*80)
out.append("CANDIDATE CLICKABLE ELEMENTS")
tag_re = re.compile(r"<(a|button)\b([^>]*)>(.*?)</\1>", re.I|re.S)
for idx,match in enumerate(tag_re.finditer(src)):
    attrs=match.group(2)
    inner=match.group(3)
    text=clean(re.sub(r"<[^>]+>"," ",inner)).strip()
    if text and any(t.lower() in text.lower() for t in terms):
        out.append(f"{match.group(1).upper()} text={text[:240]!r}")
        out.append(f"attrs={clean(attrs)[:800]}")
        out.append("")

# IDs/classes around nav-ish words
out.append("="*80)
out.append("NAV-LIKE IDS / CLASSES")
for m in re.finditer(r"<[^>]+(?:id|class)=[\"'][^\"']*(?:nav|menu|header|toolbar|icon|tooltip|resource|history)[^\"']*[\"'][^>]*>",src,re.I):
    out.append(clean(m.group(0))[:1200])

Path("audit").mkdir(exist_ok=True)
Path("audit/navigation-audit.txt").write_text("\n".join(out),encoding="utf-8")
