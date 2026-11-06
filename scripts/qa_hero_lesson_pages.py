#!/usr/bin/env python3
"""Examine the Past: strict QA for every generated Black History Hero lesson.
Run: python scripts/qa_hero_lesson_pages.py
This verifies structure and answer-key integrity, NOT historical accuracy.
"""
from pathlib import Path
from html import unescape
import re, sys

ROOT=Path(__file__).resolve().parent.parent
LESSONS=ROOT/"lessons"/"black-history-heroes"
REQUIRED=("lesson-start","reading-one","reading-two","branch-one","synthesis","finish")
failures=[]
results=[]
pages=sorted(LESSONS.glob("*/index.html"))
for path in pages:
 text=path.read_text(encoding="utf-8")
 issues=[]
 nav=re.search(r'<div class="mk-steps-nav"[^>]*>(.*?)</div>',text,re.S)
 if not nav: issues.append("Missing six-step lesson navigation")
 else:
  anchors=re.findall(r'<a\s+href="#([^"]+)"',nav.group(1))
  if tuple(anchors)!=REQUIRED: issues.append("Navigation IDs/order mismatch: "+str(anchors))
  for link in REQUIRED:
   if len(re.findall(r'<section\b[^>]*\bid="'+re.escape(link)+r'"',text))!=1:
    issues.append("Missing or duplicate section ID: "+link)
 quizzes=list(re.finditer(r'<div\s+class="mk-question"\b[^>]*>[\s\S]*?</div>',text))
 for idx,match in enumerate(quizzes,1):
  box=match.group(0)
  key=re.search(r'data-answer="([^"]+)"',box)
  options=len(re.findall(r'<input\b[^>]*type="(?:radio|checkbox)"',box))
  if not key or not options: issues.append("Question "+str(idx)+" missing key/options");continue
  try: correct=[int(x.strip()) for x in key.group(1).split(",")]
  except ValueError: issues.append("Question "+str(idx)+" noninteger key");continue
  if len(set(correct))!=len(correct) or any(x<0 or x>=options for x in correct):
   issues.append("Question "+str(idx)+" has unselectable/duplicate correct answers")
  types=set(re.findall(r'<input\b[^>]*type="(radio|checkbox)"',box))
  if len(correct)>1 and types!={"checkbox"}:
   issues.append("Question "+str(idx)+" has multi-key but no multi-select controls")
  if len(correct)==1 and types!={"radio"}:
   issues.append("Question "+str(idx)+" has single key but no radio controls")
 if len(quizzes)<5:issues.append("Too few assessed questions: "+str(len(quizzes)))
 if 'mk-progress-dock' not in (ROOT/"assets"/"hero-lesson-interactions.js").read_text(encoding="utf-8"):
  issues.append("Shared progress/timer engine unavailable")
 for img in re.findall(r'<img\b[^>]*src="([^"]+)"',text):
  if img.startswith("../../../assets/") and not (path.parent/img).resolve().is_file():
   issues.append("Missing image: "+img)
 results.append((str(path.relative_to(ROOT)),len(quizzes),issues))
 if issues:failures.append((str(path.relative_to(ROOT)),issues))
print("Hero pages:",len(results),"| Passed:",len(results)-len(failures),"| Failed:",len(failures))
for name,issues in failures:
 print("FAIL",name)
 for issue in issues: print(" -",issue)
print("NOTE: Historical research, sources, language, visual QA and classroom suitability need separate editorial approval.")
sys.exit(1 if failures else 0)
