from pathlib import Path
p=Path("timeline/index.html")
s=p.read_text(encoding="utf-8",errors="ignore")
s=s.replace('href="#" id="modalSourceLink"','href="#top" id="modalSourceLink"')
p.write_text(s,encoding="utf-8")
print("Patched dynamic Timeline source-link fallback.")
