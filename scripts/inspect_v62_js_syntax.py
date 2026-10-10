from pathlib import Path
import re,subprocess,json,tempfile,os
targets=[
"today/today-v62.js",
"assets/etp-transitions.js",
"assets/etp-experience-v50.js",
"assets/site-shell.js",
"maps/index.html"
]
out={}
for path in targets:
    p=Path(path)
    if not p.exists(): continue
    text=p.read_text(encoding="utf-8",errors="ignore")
    chunks=[]
    if path.endswith(".html"):
        for i,m in enumerate(re.finditer(r"<script(?:\s[^>]*)?>([\s\S]*?)</script>",text,re.I)):
            code=m.group(1).strip()
            if code: chunks.append((f"inline-{i}",code))
    else:
        chunks=[("file",text)]
    results=[]
    for label,code in chunks:
        tmp=Path("/tmp/check.js");tmp.write_text(code,encoding="utf-8")
        cp=subprocess.run(["node","--check",str(tmp)],capture_output=True,text=True)
        results.append({"chunk":label,"ok":cp.returncode==0,"stderr":cp.stderr[-4000:]})
    out[path]=results
Path("audit/v62-js-syntax-inspect.json").write_text(json.dumps(out,indent=2),encoding="utf-8")
print(json.dumps(out,indent=2))
