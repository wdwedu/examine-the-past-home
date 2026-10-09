from pathlib import Path
import re
p=Path("index.html")
s=p.read_text(encoding="utf-8",errors="ignore")
if "home-order-v51.css" not in s:
    s=s.replace("</head>",'<link rel="stylesheet" href="assets/home-order-v51.css?v=51">\n</head>',1)
if "home-order-v51.js" not in s:
    pos=s.rfind("</body>")
    tag='<script src="assets/home-order-v51.js?v=51"></script>\n'
    s=s[:pos]+tag+s[pos:] if pos>=0 else s+tag
s=re.sub(r'assets/site-shell\.css\?v=\d+','assets/site-shell.css?v=51',s)
s=re.sub(r'assets/site-shell\.js\?v=\d+','assets/site-shell.js?v=51',s)
s=s.replace('assets/etp-experience-v50.css?v=50','assets/etp-experience-v50.css?v=51')
s=s.replace('assets/etp-experience-v50.js?v=50','assets/etp-experience-v50.js?v=51')
p.write_text(s,encoding="utf-8")
print("Injected homepage v51 order layer and cache bump.")
