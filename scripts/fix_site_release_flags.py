#!/usr/bin/env python3
"""Conservative Examine the Past flags cleanup. Run static audit after changes."""
from pathlib import Path
from html.parser import HTMLParser
import re,html,json
ROOT=Path(".")
changes=[]
def record(path,kind,count=1):changes.append({"path":str(path),"fix":kind,"count":count})
def fragment(path):return path.as_posix() in ("games/assets/footer.html","games/assets/nav.html")
def make_description(title,path):
 title=html.unescape(re.sub(r"<[^>]+>","",title)).strip()
 title=re.sub(r"\s*[|—-]\s*(?:Examine the Past|History Unlocked)\s*$","",title,flags=re.I).strip(" .|-—")
 if not title: return ""
 # Avoid unsupported claims: describe the area without asserting completion or features.
 if path.parts[0]=="games":
  return f"Explore {title} in Examine the Past's interactive history games collection."
 if path.parts[0]=="lessons":
  return f"Explore {title} through Examine the Past's history learning resources."
 if path.parts[0]=="teacher-tools":
  return f"Discover {title} in Examine the Past's teacher resource collection."
 return f"Explore {title} at Examine the Past, featuring historical learning and resources."
for path in sorted(ROOT.rglob("*.html")):
 if ".git" in path.parts or fragment(path):continue
 txt=path.read_text(encoding="utf-8",errors="replace");old=txt
 # Insert meta after existing title to avoid touching scripts, styles or layout markup.
 head=re.search(r"<head\b[^>]*>(.*?)</head\s*>",txt,re.I|re.S)
 if head and not re.search(r"<meta\s+[^>]*name\s*=\s*['\"]description['\"]",head.group(1),re.I):
  title=re.search(r"<title\b[^>]*>(.*?)</title\s*>",head.group(1),re.I|re.S)
  if title:
   desc=make_description(title.group(1),path)
   if desc:
    pos=head.start(1)+title.end()
    txt=txt[:pos]+'<meta name="description" content="'+html.escape(desc,quote=True)+'">'+txt[pos:]
    record(path,"meta_description")
 # Only update anchors with target _blank and missing noopener; preserve existing rel tokens.
 def secure(m):
  tag=m.group(0)
  if not re.search(r"\btarget\s*=\s*(['\"])_blank\1",tag,re.I):return tag
  rel=re.search(r"\brel\s*=\s*(['\"])(.*?)\1",tag,re.I|re.S)
  if rel:
   tokens=rel.group(2).split()
   if "noopener" in tokens:return tag
   new=' '.join(tokens+["noopener"])
   return tag[:rel.start(2)]+new+tag[rel.end(2):]
  return tag[:-1]+' rel="noopener">' if tag.endswith(">") else tag
 before=txt
 txt=re.sub(r"<a\b[^>]*>",secure,txt,flags=re.I|re.S)
 if txt!=before:record(path,"noopener_links")
 if path.as_posix()=="index.html":
  # Keep the hero #top anchor. The body id is redundant and invalid when duplicated.
  txt,n=re.subn(r"(<body\b[^>]*?)\s+id\s*=\s*(['\"])top\2",r"\1",txt,count=1,flags=re.I)
  if n:record(path,"duplicate_top_id")
 if txt!=old:path.write_text(txt,encoding="utf-8")
out=Path("audit/release-fixes.json");out.parent.mkdir(exist_ok=True)
out.write_text(json.dumps({"changes":changes,"counts":{k:sum(x["count"] for x in changes if x["fix"]==k) for k in set(x["fix"] for x in changes)}},indent=2))
print(json.dumps({"changed_files":len(set(x["path"] for x in changes)),"counts":{k:sum(x["count"] for x in changes if x["fix"]==k) for k in set(x["fix"] for x in changes)}}))
