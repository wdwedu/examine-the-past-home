#!/usr/bin/env python3
"""History Hub release QA. Run locally from the repository root.
Verifies build structure and navigation; historical and browser review remain separate.
"""
from pathlib import Path
from collections import Counter
import json,re,sys
ROOT=Path(__file__).resolve().parent.parent
CAT=ROOT/"assets/history-hub-catalog.json"
HUB=ROOT/"lessons/index.html"
errors=[]
if not CAT.exists() or not HUB.exists():
 raise SystemExit("Missing curriculum catalog or History Hub")
data=json.loads(CAT.read_text(encoding="utf-8"))
courses=data["courses"]
hub=HUB.read_text(encoding="utf-8")
cards=len(re.findall(r'<article class="etp-card">',hub))
if cards!=12: errors.append(f"History Hub must have 12 cards; found {cards}")
if len(courses)!=14: errors.append(f"Expected 14 course/pathway pages; found {len(courses)}")
all_lessons=[]
unit_count=0
for course in courses:
 course_dir=ROOT/"lessons/curriculum"/course["id"]
 index=course_dir/"index.html"
 if not index.is_file(): errors.append(f"Missing course: {index}")
 if course.get("imageStatus")!="temporary_site_asset_pending_original_art":
  errors.append(f"Unexpected artwork state: {course['id']}")
 if not (ROOT/course["image"]).is_file(): errors.append(f"Missing image: {course['image']}")
 units=course.get("units",[])
 unit_count+=len(units)
 page=index.read_text(encoding="utf-8") if index.is_file() else ""
 for unit in units:
  target="unit-"+re.sub(r"\\W","-",unit["number"])
  if f'id="{target}"' not in page: errors.append(f"Missing anchor {target} in {course['id']}")
  for lesson in unit["lessons"]:
   lpath=course_dir/lesson["slug"]/"index.html"
   if not lpath.is_file(): errors.append(f"Missing lesson route: {lpath}")
   else:
    markup=lpath.read_text(encoding="utf-8")
    if "Lesson in Development" not in markup: errors.append(f"Unlabeled unfinished lesson: {lpath}")
   expected="/lessons/curriculum/"+course["id"]+"/"+lesson["slug"]+"/"
   if lesson["canonicalUrl"]!=expected: errors.append(f"Canonical mismatch: {lesson['id']}")
   all_lessons.append(expected)
if len(all_lessons)!=309: errors.append(f"Expected 309 planned lessons; found {len(all_lessons)}")
if unit_count!=83: errors.append(f"Expected 83 total unit and pathway outlines; found {unit_count}")
dup=[path for path,count in Counter(all_lessons).items() if count>1]
if dup: errors.append("Duplicate lesson paths: "+str(dup))
if not (ROOT/"lessons/black-history-heroes/index.html").is_file():errors.append("Existing Black History Heroes collection missing")
if not (ROOT/"games/hall-of-legends/index.html").is_file():errors.append("Hall of Legends missing")
print(f"History Hub: {cards} cards; {len(courses)} course pages; {unit_count} unit/pathway outlines; {len(all_lessons)} preview routes")
print(f"Result: {'FAIL' if errors else 'STRUCTURAL PASS'}")
for e in errors: print("ERROR:",e)
print("EXCLUDED: live browser testing, factual source verification, image originality and Maryland indicator-by-indicator alignment.")
sys.exit(bool(errors))
