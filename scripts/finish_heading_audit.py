#!/usr/bin/env python3
"""Accessible H1 for game screens that show a visual image or H2 instead of H1."""
from pathlib import Path
import re,html,json
files=[Path("games/presidential-challenge/index.html"),*sorted(Path("games/time-rush").rglob("index.html"))]
changed=[]
for p in files:
 s=p.read_text(encoding="utf-8")
 if re.search(r"<h1\b",s,re.I):continue
 title=re.search(r"<title[^>]*>(.*?)</title>",s,re.I|re.S)
 main=re.search(r"<main\b[^>]*>",s,re.I|re.S)
 if not title or not main:raise SystemExit(f"Missing main/title on {p}; refusing unreviewed changes")
 label=html.unescape(re.sub(r"<[^>]+>","",title.group(1))).split(" — ")[0].split(" | ")[0].strip()
 label=label.replace(" — Examine the Past","")
 # Screen-reader only: preserve the approved graphical banner and responsive layout.
 h='<h1 class="etp-visually-hidden">'+html.escape(label)+'</h1>'
 s=s[:main.end()]+h+s[main.end():]
 style='<style id="etp-h1-accessibility">.etp-visually-hidden{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}</style>'
 s=s.replace("</head>",style+"</head>",1)
 p.write_text(s,encoding="utf-8")
 changed.append({"path":str(p),"heading":label})
Path("audit/game-h1-fixes.json").write_text(json.dumps(changed,indent=2),encoding="utf-8")
print(json.dumps({"games_fixed":len(changed),"games":changed}))
