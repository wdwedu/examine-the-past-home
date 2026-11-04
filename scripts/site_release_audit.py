#!/usr/bin/env python3
"""Full-repository HTML link, asset and readiness audit: no site changes."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter,defaultdict
from urllib.parse import urlsplit,unquote
import json,re,posixpath,subprocess,datetime
ROOT=Path(".")
class Scan(HTMLParser):
 def __init__(self):
  super().__init__(convert_charrefs=True);self.anchors=[];self.assets=[];self.ids=[];self.images=[];self.iframe=[];self.forms=[];self.title=[];self.desc=[];self.heading=[];self.a_nohref=0;self.links_external=[];self.video=[];self.lang=False
 def handle_starttag(self,t,attrs):
  d=dict(attrs)
  if t=="html":self.lang=bool(d.get("lang"))
  if "id" in d:self.ids.append(d["id"])
  if t=="title":self._title_capture=True
  if t=="a":
   if "href" not in d:self.a_nohref+=1
   else:self.anchors.append((d["href"],d.get("data-etp-transition"),d.get("target"),d.get("rel")))
  if t in ("img","source","video","audio","iframe","script") and "src" in d:self.assets.append((t,d["src"]))
  if t=="link" and d.get("href") and d.get("rel") in ("stylesheet","icon","manifest"):self.assets.append((t,d["href"]))
  if t=="img":self.images.append(d)
  if t=="iframe":self.iframe.append(d)
  if t=="video":self.video.append(d)
  if t=="form":self.forms.append(d)
  if t=="meta" and d.get("name")=="description":self.desc.append(d.get("content",""))
  if t in ("h1","h2","h3"):self.heading.append(t)
  if t=="script" and "src" not in d:self._inline= True
 def handle_data(self,data):
  if getattr(self,"_title_capture",False) and data.strip():self.title.append(data.strip())
 def handle_endtag(self,t):
  if t=="title":self._title_capture=False
def resolve(from_path,url):
 p=urlsplit(url)
 if p.scheme or url.startswith("//"):return None,p
 raw=unquote(p.path)
 if not raw and p.fragment:resolved=from_path
 elif raw.startswith("/examine-the-past-home/"):resolved=raw[len("/examine-the-past-home/"):]
 elif raw.startswith("/"):resolved=raw.lstrip("/")
 else:resolved=posixpath.normpath(posixpath.join(posixpath.dirname(from_path),raw))
 if not resolved or resolved==".":resolved="index.html"
 if resolved.endswith("/") or "." not in posixpath.basename(resolved):resolved=resolved.rstrip("/")+"/index.html"
 return resolved,p
files={p.as_posix():p for p in ROOT.rglob("*") if p.is_file() and ".git" not in p.parts}
htmls=sorted(p for p in files if p.endswith(".html") and not p.startswith("audit/"))
scan={};errors=[];warnings=[];external=Counter();assets_checked=0;links_checked=0
def issue(severity,code,path,detail): (errors if severity=="error" else warnings).append({"code":code,"path":path,"detail":str(detail)[:260]})
for path in htmls:
 doc=Scan();scan[path]=doc
 try: doc.feed(files[path].read_text(encoding="utf-8",errors="replace"))
 except Exception as e:issue("error","html_parser_error",path,e)
for path,doc in scan.items():
 page_text=files[path].read_text(encoding="utf-8",errors="replace")
 if not doc.lang:issue("warning","missing_html_lang",path,"No html lang attribute")
 if not doc.title:issue("warning","missing_title",path,"No <title>")
 if not doc.desc:issue("warning","missing_meta_description",path,"No meta description")
 if not doc.heading or "h1" not in doc.heading:issue("warning","missing_h1",path,"No h1")
 for k,c in Counter(doc.ids).items():
  if c>1:issue("error","duplicate_id",path,k+" appears "+str(c)+" times")
 for img in doc.images:
  if "alt" not in img:issue("warning","image_missing_alt",path,img.get("src","inline"))
 for href,transition,target,rel in doc.anchors:
  links_checked+=1;parts=urlsplit(href)
  if href.strip() in ("","#","javascript:void(0)","javascript:;"):issue("warning","placeholder_link",path,href);continue
  if parts.scheme in ("http","https") or href.startswith("//"):
   external[parts.netloc]+=1
   if target=="_blank" and (not rel or "noopener" not in rel):issue("warning","external_blank_no_noopener",path,href)
   continue
  if parts.scheme in ("mailto","tel","sms","data","blob"):continue
  resolved,url=resolve(path,href)
  if resolved and resolved not in files:issue("error","broken_internal_link",path,href+" -> "+resolved)
  elif url.fragment and resolved in scan and url.fragment not in scan[resolved].ids:
   issue("warning","missing_anchor_fragment",path,href+" -> #"+url.fragment)
 for tag,src in doc.assets:
  assets_checked+=1
  if not src.strip():issue("warning","empty_asset_src",path,tag);continue
  resolved,url=resolve(path,src)
  if resolved and resolved not in files:issue("error","missing_asset",path,tag+": "+src+" -> "+resolved)
  if tag=="iframe" and src.startswith("http:"):issue("warning","insecure_iframe",path,src)
 if path.startswith("lessons/") and "site-shell.js" not in page_text and "location.replace" not in page_text:issue("warning","missing_shared_shell",path,"Lesson may not display shared navigation/footer")
 if path.startswith("games/") and "coming" in page_text.lower() and "button" in page_text.lower():pass
js_results=[]
for path in sorted(p for p in files if p.endswith(".js") and not p.startswith("audit/")):
 try:
  r=subprocess.run(["node","--check",path],capture_output=True,text=True,timeout=12)
  if r.returncode:issue("error","javascript_syntax",path,r.stderr[-320:])
 except Exception as e:issue("warning","javascript_test_unavailable",path,e)
 js_results.append(path)
summary={"timestamp_utc":datetime.datetime.now(datetime.timezone.utc).isoformat(),"files":len(files),"html_pages":len(htmls),"js_checked":len(js_results),"links_checked":links_checked,"asset_refs_checked":assets_checked,"error_count":len(errors),"warning_count":len(warnings),"external_domains":external.most_common(35),"issue_counts":Counter(x["code"] for x in errors+warnings)}
report={"summary":summary,"errors":errors,"warnings":warnings}
out=ROOT/"audit";out.mkdir(exist_ok=True)
(out/"site-release-audit.json").write_text(json.dumps(report,indent=2,default=dict),encoding="utf8")
md=["# Examine the Past · Release QA audit","",f"Checked {len(htmls)} HTML pages, {links_checked} anchor links, {assets_checked} asset references, {len(js_results)} JavaScript files.","",f"**Errors:** {len(errors)} · **Warnings:** {len(warnings)}","", "## Issues by type",""]
md += [f"- {k}: {v}" for k,v in sorted(summary["issue_counts"].items(),key=lambda i:-i[1])]
md+=["","## Critical errors (first 300)",""]
md += [f"- **{x['code']}** · `{x['path']}` · {x['detail']}" for x in errors[:300]] or ["- None"]
md+=["","## Warnings (first 300)",""]
md += [f"- **{x['code']}** · `{x['path']}` · {x['detail']}" for x in warnings[:300]] or ["- None"]
md+=["","## External link destinations (NOT verified live)",""]
md += [f"- {k}: {v}" for k,v in external.most_common(40)]
md+=["","## Limits","- This is static repository QA, not a browser audit of interactivity, page rendering or mobile gestures.","- External destinations are inventoried but are not checked for availability.","- All published routes and asset references should also be tested against the deployed domain."]
(out/"site-release-audit.md").write_text("\n".join(md),encoding="utf8")
print(json.dumps({"summary":summary,"top_errors":errors[:18],"top_warnings":warnings[:14]},default=dict))
