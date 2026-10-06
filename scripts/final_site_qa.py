from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote
import json,re,posixpath

ROOT=Path(".")
BASE="/examine-the-past-home/"
VALID_TRANS={"time","compass","map","page","film","timeline","ink","globe","mosaic","shutter","gold"}

class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links=[]; self.ids=set(); self.scripts=[]; self.styles=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if "id" in d: self.ids.add(d["id"])
        if tag=="a" and "href" in d: self.links.append((d["href"],d.get("data-etp-transition")))
        if tag=="script" and "src" in d: self.scripts.append(d["src"])
        if tag=="link" and d.get("rel")=="stylesheet" and "href" in d: self.styles.append(d["href"])

files={p.as_posix():p for p in ROOT.rglob("*") if p.is_file()}
htmls=[p for p in ROOT.rglob("*.html") if ".git" not in p.parts]
parsers={}
for p in htmls:
    parser=P()
    try: parser.feed(p.read_text(encoding="utf-8",errors="ignore"))
    except Exception: pass
    parsers[p.as_posix()]=parser

def resolve(from_path,href):
    if not href or href.startswith(("http://","https://","mailto:","tel:","javascript:","data:")): return None,None
    frag=None
    if "?" in href:
        href=href.split("?",1)[0]
    if "#" in href:
        href,frag=href.split("#",1)
    href=unquote(href)
    if href.startswith(BASE):
        rel=href[len(BASE):]
    elif href.startswith("/"):
        return "__OUTSIDE__",frag
    elif href=="":
        rel=from_path
    else:
        rel=posixpath.normpath(posixpath.join(posixpath.dirname(from_path),href))
    if rel.endswith("/"): rel += "index.html"
    elif "." not in posixpath.basename(rel): rel += "/index.html"
    return rel,frag

errors=[]; warnings=[]; stats={"html_pages":len(htmls),"links_checked":0,"cross_page_links":0,"transition_links":0,"dead_placeholders":0}
for p in htmls:
    key=p.as_posix(); parser=parsers[key]
    if key!="index.html" and not key.startswith("games/"):
        txt=p.read_text(encoding="utf-8",errors="ignore")
        if "site-shell.js" not in txt and "phase3-mini-lab-engine.js" not in txt:
            errors.append({"type":"missing_shell","page":key})
    for href,tr in parser.links:
        stats["links_checked"]+=1
        if href=="#":
            stats["dead_placeholders"]+=1
            warnings.append({"type":"placeholder_href","page":key,"href":"#"})
            continue
        target,frag=resolve(key,href)
        if target is None: continue
        if target=="__OUTSIDE__":
            warnings.append({"type":"absolute_outside_base","page":key,"href":href}); continue
        if target!=key: stats["cross_page_links"]+=1
        if target not in files:
            errors.append({"type":"broken_internal_link","page":key,"href":href,"resolved":target})
            continue
        if frag and target.endswith(".html") and target in parsers and frag not in parsers[target].ids:
            errors.append({"type":"missing_fragment","page":key,"href":href,"target":target,"fragment":frag})
        if target!=key and target.endswith(".html"):
            if tr:
                stats["transition_links"]+=1
                if tr not in VALID_TRANS:
                    errors.append({"type":"invalid_transition","page":key,"href":href,"transition":tr})
            elif key.startswith(("lessons/","teacher-tools/")) or key in ("timeline/index.html","maps/index.html","today/index.html","shop/index.html"):
                warnings.append({"type":"missing_transition","page":key,"href":href})
    for src in parser.scripts+parser.styles:
        target,_=resolve(key,src)
        if target and target!="__OUTSIDE__" and target not in files:
            errors.append({"type":"missing_asset","page":key,"src":src,"resolved":target})

route_pat=re.compile(r'["\\\'](/examine-the-past-home/[^"\\\'#?]*)')
for p in list(ROOT.rglob("*.html"))+list(ROOT.rglob("*.js")):
    txt=p.read_text(encoding="utf-8",errors="ignore")
    for m in route_pat.finditer(txt):
        u=m.group(1); rel=u[len(BASE):] if u.startswith(BASE) else None
        if rel is None: continue
        if u==BASE: rel="index.html"
        if u.endswith("/games/assets/"): continue
        if rel.endswith("/"): rel+="index.html"
        elif "." not in posixpath.basename(rel): rel+="/index.html"
        if rel not in files:
            errors.append({"type":"broken_hardcoded_route","page":p.as_posix(),"route":u,"resolved":rel})

shell=Path("assets/site-shell.js").read_text(encoding="utf-8",errors="ignore")
home=parsers.get("index.html")
required={"top","about-us","us-history","world-history","civics-government","geography","black-history","world-religions","timeline","history-maps","today-history","history-unlocked","blooms-taxonomy","movies-classroom","classroom-management","learner-supports","hidden-treasures","community","contact-section","current-events","careers","licensing","faq","contact"}
if home:
    for frag in sorted(required):
        if ("#"+frag) in shell and frag not in home.ids:
            errors.append({"type":"missing_home_anchor","page":"index.html","fragment":frag})

data_txt=Path("assets/phase3-mini-labs-data.js").read_text(encoding="utf-8")
data=json.loads(data_txt.removeprefix("window.ETP_PHASE3_LESSONS=").rstrip(";"))
for p in htmls:
    if p.stat().st_size<2000:
        txt=p.read_text(encoding="utf-8",errors="ignore")
        m=re.search(r'data-lesson-id="([^"]+)"',txt)
        if m and m.group(1) not in data:
            errors.append({"type":"missing_phase3_data","page":p.as_posix(),"lesson_id":m.group(1)})

def dedupe(xs):
    seen=set(); out=[]
    for x in xs:
        s=json.dumps(x,sort_keys=True)
        if s not in seen: seen.add(s); out.append(x)
    return out

errors=dedupe(errors); warnings=dedupe(warnings)
report={"stats":stats,"error_count":len(errors),"warning_count":len(warnings),"errors":errors,"warnings":warnings}
Path("audit").mkdir(exist_ok=True)
Path("audit/final-qa-report.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
md=["# Examine the Past - Final Structural QA","","## Summary",
    "- HTML pages: %s"%stats["html_pages"],
    "- Links checked: %s"%stats["links_checked"],
    "- Errors: %s"%len(errors),
    "- Warnings: %s"%len(warnings),""]
md+=["## Errors"]+([f"- **{e['type']}** - `{e}`" for e in errors] or ["- None"])
md+=["","## Warnings"]+([f"- **{w['type']}** - `{w}`" for w in warnings[:300]] or ["- None"])
Path("audit/final-qa-report.md").write_text("\n".join(md),encoding="utf-8")
print(json.dumps({"errors":len(errors),"warnings":len(warnings),"stats":stats}))
if errors:
    print("FIRST_ERRORS")
    for e in errors[:30]: print(e)
