from pathlib import Path
import re
changed=[]
for p in Path(".").rglob("*.html"):
    if p.name=="index.html" and p.parent==Path("."):
        continue
    text=p.read_text(encoding="utf-8",errors="ignore")
    new=re.sub(r'(site-shell\.(?:css|js))(?:\?v=\d+)?',r'\1?v=42',text)
    new=re.sub(r'(lesson-template\.(?:css|js))(?:\?v=\d+)?',r'\1?v=42',new)
    if new!=text:
        p.write_text(new,encoding="utf-8")
        changed.append(str(p))
print("changed",len(changed))
