#!/usr/bin/env python3
"""Read-only smoke test of published HTML routes and key media assets."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
from urllib.request import Request,urlopen
from urllib.error import HTTPError,URLError
from collections import Counter
import json,datetime,time
base="https://examinethepast.com/"
paths=sorted(p.as_posix()[:-10] for p in Path(".").rglob("index.html") if ".git" not in p.parts)
paths=["" if x=="index.html" else x for x in paths]
paths+=["assets/visual-history/visual-history-intro.mp4","assets/etp-transitions.js","assets/site-shell.js","games/hall-of-legends/data/gallery-geometry.json"]
def get(path):
 url=base+path
 for method in ("HEAD","GET"):
  try:
   req=Request(url,method=method,headers={"User-Agent":"ExamineThePast-QA/1.0"})
   with urlopen(req,timeout=16) as r:
    code=r.status;loc=r.geturl();ct=r.headers.get("Content-Type","")
    if method=="HEAD" and code in (403,405):continue
    if path.endswith(".mp4") and "video/" not in ct: return {"path":path,"code":code,"error":"Expected video MIME but got "+ct,"url":loc}
    if (path.endswith("/") or path=="") and "text/html" not in ct: return {"path":path,"code":code,"error":"Expected HTML but got "+ct,"url":loc}
    return {"path":path,"code":code,"url":loc,"content_type":ct}
  except HTTPError as e:
   if method=="HEAD" and e.code in (403,405):continue
   return {"path":path,"code":e.code,"error":"HTTP error"}
  except Exception as e:
   if method=="HEAD":continue
   return {"path":path,"code":0,"error":str(e)[:160]}
 return {"path":path,"code":0,"error":"No response"}
with ThreadPoolExecutor(max_workers=8) as pool:results=sorted([x.result() for x in [pool.submit(get,p) for p in paths]],key=lambda v:v["path"])
fail=[r for r in results if r.get("code")!=200 or "error" in r]
report={"timestamp_utc":datetime.datetime.now(datetime.timezone.utc).isoformat(),"checked":len(results),"passed":len(results)-len(fail),"fail_count":len(fail),"failures":fail,"results":results}
Path("audit").mkdir(exist_ok=True)
Path("audit/live-route-audit.json").write_text(json.dumps(report,indent=2),encoding="utf8")
md=["# Live deployed website HTTP smoke test","",f"Routes checked: {len(results)}; passed: {len(results)-len(fail)}; failures: {len(fail)}","","## Failures"]
md+=[f"- `{r['path']}`: {r.get('code')} {r.get('error','')}" for r in fail] or ["- None"]
md+=["","This checks the deployed URLs and response MIME types, not animations, mobile layout, game functionality, content accuracy, or external destinations."]
Path("audit/live-route-audit.md").write_text("\n".join(md),encoding="utf8")
print(json.dumps({"checked":len(results),"passed":len(results)-len(fail),"failures":fail[:30]}))
