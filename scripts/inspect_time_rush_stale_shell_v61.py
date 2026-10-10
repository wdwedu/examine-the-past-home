from pathlib import Path
import re,json
paths=[
"games/time-rush/us-presidents/index.html",
"games/time-rush/world-wars/index.html",
"games/time-rush/inventions/index.html",
"games/time-rush/civil-rights/index.html",
"games/time-rush/revolutions/index.html",
]
out={}
pat=re.compile(r'site-shell\.(?:js|css)\?v=(?!61\b)\d+')
for path in paths:
    s=Path(path).read_text(encoding="utf-8",errors="ignore")
    arr=[]
    for m in pat.finditer(s):
        arr.append({"match":m.group(0),"context":s[max(0,m.start()-180):m.end()+180]})
    out[path]=arr
Path("audit/time-rush-stale-shell-context-v61.json").write_text(json.dumps(out,indent=2),encoding="utf-8")
print(json.dumps({k:len(v) for k,v in out.items()}))
