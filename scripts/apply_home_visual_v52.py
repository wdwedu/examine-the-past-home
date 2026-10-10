from pathlib import Path
import re

p=Path("index.html")
s=p.read_text(encoding="utf-8",errors="ignore")
if "home-visual-v52.css" not in s:
    s=s.replace("</head>",'<link rel="stylesheet" href="assets/home-visual-v52.css?v=52">\n</head>',1)
if "home-visual-v52.js" not in s:
    pos=s.rfind("</body>")
    tag='<script src="assets/home-visual-v52.js?v=52"></script>\n'
    s=s[:pos]+tag+s[pos:] if pos>=0 else s+tag
s=re.sub(r'assets/site-shell\.css\?v=\d+','assets/site-shell.css?v=52',s)
s=re.sub(r'assets/site-shell\.js\?v=\d+','assets/site-shell.js?v=52',s)
p.write_text(s,encoding="utf-8")

for q in Path(".").rglob("*.html"):
    txt=q.read_text(encoding="utf-8",errors="ignore")
    txt=re.sub(r'(?P<prefix>(?:\.\./)*)assets/site-shell\.css\?v=\d+',lambda m:f"{m.group('prefix')}assets/site-shell.css?v=52",txt)
    txt=re.sub(r'(?P<prefix>(?:\.\./)*)assets/site-shell\.js\?v=\d+',lambda m:f"{m.group('prefix')}assets/site-shell.js?v=52",txt)
    q.write_text(txt,encoding="utf-8")
print("Injected homepage visual v52 and refreshed shared shell caches.")
