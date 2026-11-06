#!/usr/bin/env python3
"""Render independently authored source-led Hero Lessons as accessible static HTML."""
from pathlib import Path
import json,html,urllib.parse
ROOT=Path(__file__).resolve().parent.parent
DATA=ROOT/"lessons/black-history-heroes/lesson-data"
def e(x):return html.escape(str(x),quote=True)
def paragraphs(parts):return "".join("<p>"+e(x)+"</p>" for x in parts)
def question(q,n=None):
 assert len(q["options"])>=3
 idx=q["answer"]
 if isinstance(idx,int):idx=[idx]
 assert idx and all(isinstance(i,int) and 0<=i<len(q["options"]) for i in idx)
 kind="single" if len(idx)==1 else "multi"
 typ="radio" if kind=="single" else "checkbox"
 name="q"+str(n or "diagnostic")
 labels="".join('<label class="mk-choice"><input type="'+typ+'"'+(' name="'+name+'"' if kind=="single" else '')+'> '+e(option)+'</label>' for option in q["options"])
 return '<div class="mk-question" data-type="'+kind+'" data-answer="'+",".join(map(str,idx))+'" data-explain="'+e(q["explain"])+'"><h3>'+e(q["prompt"])+'</h3>'+labels+'<button class="mk-btn mk-check" type="button">Check & Explain</button><div class="mk-feedback" role="status" aria-live="polite"></div></div>'
def branch(b,ind):
 buttons=[]
 colors=["mk-green-btn","mk-red-btn",""]
 for i,option in enumerate(b["options"]):
  buttons.append('<button type="button" class="mk-btn mk-branch '+colors[i%3]+'" aria-pressed="false" data-title="'+e(option["title"])+'" data-outcome="'+e(option["outcome"])+'" data-prompt="'+e(option["followup"])+'">'+e(option["label"])+'</button>')
 return '<section class="mk-step '+("mk-blue" if ind==0 else "mk-green")+'" id="branch-'+("one" if ind==0 else "two")+'"><div class="mk-kicker">0'+str(5+ind)+' · Decision Room · '+e(b["type"])+'</div><h2>'+e(b["title"])+'</h2><p class="mk-cue">Formative historical inquiry · Scenario is a modern teaching simulation, not a reconstructed conversation</p><p>'+e(b["prompt"])+'</p><div class="mk-branch-controls"> '+ "".join(buttons)+'</div><div class="mk-branch-outcome" hidden tabindex="-1" role="status" aria-live="polite"></div><div class="mk-note"><strong>Debrief:</strong> '+e(b["debrief"])+'</div></section>'
def source_list(items):
 return '<ul class="mk-sources-expanded">'+ "".join('<li><strong>'+e(s["type"])+' · </strong><a href="'+e(s["url"])+'" target="_blank" rel="noopener noreferrer">'+e(s["label"])+'</a>. '+e(s["use"])+'</li>' for s in items)+'</ul>'
def build(d):
 key=d["key"];assert key in ("piye","shabaka","taharqa","sundiata")
 assert len(d["readings"])==3 and len(d["branches"])==2 and len(d["final"])==5
 assert len(d["objectives"])>=4 and len(d["sources"])>=4
 title=e(d["title"]);subtitle=e(d["subtitle"])
 stylesheet='<link rel="stylesheet" href="../../../assets/lesson-template.css?v=20261106-master"><link rel="stylesheet" href="../../../assets/lesson-backgrounds.css?v=44"><link rel="stylesheet" href="../../../assets/hero-lesson-interactions.css?v=20261106-series-v2">'
 extra="""<style>
:root{color-scheme:dark;--yellow:#fff200;--green:#94ff53;--muted:#d5dfd6}
html{scroll-behavior:smooth}body{background:#020604;color:#f5f5ed;font-family:Georgia,serif;margin:0}
.mk-wrap{width:min(1160px,calc(100% - 32px));margin:auto;padding-bottom:112px}
.mk-nav{display:flex;gap:8px;flex-wrap:wrap;margin:25px 0}.mk-nav a{padding:8px 13px;color:#94ff53;background:#112019;border:1px solid #94ff5388;border-radius:9px;text-decoration:none;font-size:13px}
.mk-hero{position:relative;min-height:390px;display:grid;grid-template-columns:minmax(0,1.4fr) minmax(180px,.75fr);gap:12px;align-items:center;border:1px solid #94ff5366;border-radius:20px;padding:clamp(22px,4vw,48px);background:radial-gradient(circle at 86% 12%,#346e7949,transparent 45%),linear-gradient(135deg,#132f4b,#081116 72%);overflow:hidden}
.mk-hero h1{font-size:clamp(35px,5vw,62px);line-height:1.08;margin:11px 0;color:#fff200}.mk-hero p{font-size:clamp(16px,1.7vw,20px);line-height:1.65;color:#f0f3e9}
.mk-hero img{display:block;max-width:100%;height:auto;max-height:390px;object-fit:contain;filter:drop-shadow(0 12px 25px #000b)}.mk-hero .mk-art-note{font:12px/1.45 Georgia,serif;color:#d2e5d7;text-align:center;margin-top:4px}
.mk-kicker{font:bold 12px Georgia,serif;letter-spacing:.12em;text-transform:uppercase;color:#94ff53}.mk-tags{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.mk-tags span{font:700 12px Georgia,serif;color:#ccfcd6;border:1px solid #94ff5350;border-radius:50px;padding:7px 11px}
.mk-skip{display:inline-block;background:linear-gradient(120deg,#1e5a36,#143454);padding:12px 18px;border:1px solid #94ff53;color:#fff200;border-radius:9px;text-decoration:none;font-weight:bold}
.mk-panels{display:grid;gap:9px;margin:22px 0 28px}.mk-panels details{padding:0;border:1px solid #8095a055;background:#111b22;border-radius:12px}.mk-panels summary{display:block;padding:17px 19px;cursor:pointer;color:#fff200;font-size:18px;font-weight:bold}.mk-panel-body{border-top:1px solid #94ff5338;padding:10px 20px 20px;color:#e4e8df;line-height:1.7}
.mk-step{scroll-margin-top:160px;border:1px solid #94ff5340;border-radius:20px;padding:clamp(18px,3vw,31px);margin:24px 0;background:linear-gradient(135deg,#172024,#10171b);box-shadow:0 14px 25px #0006}
.mk-step.mk-blue{background:linear-gradient(135deg,#162f4b,#0c1626 74%)}.mk-step.mk-green{background:linear-gradient(135deg,#183d2c,#101b19 74%)}.mk-step.mk-red{background:linear-gradient(135deg,#432435,#1c151c 75%)}.mk-step.mk-charcoal{background:linear-gradient(135deg,#252b2c,#15181b 75%)}
.mk-step h2{color:#fff200;font-size:clamp(24px,3vw,34px);margin:10px 0 15px}.mk-step h3{color:#b9ff9f;margin:20px 0 10px}.mk-step p,.mk-step li{font-size:16px;line-height:1.78;color:#e6ebe2}
.mk-cue{font-size:11px!important;color:#b9d9c6!important;text-transform:uppercase;letter-spacing:.08em}.mk-note{padding:15px 18px;border-left:3px solid #fff200;border-radius:0 10px 10px 0;background:#0005;margin:16px 0;color:#edf0e9;line-height:1.6}
.mk-choice{display:block;padding:12px 14px;margin:9px 0;border:1px solid #a4b7ad52;border-radius:10px;background:#08120ecc;color:#f6f5ed;cursor:pointer}.mk-choice input{accent-color:#94ff53;margin-right:10px}
.mk-btn{display:inline-flex;align-items:center;justify-content:center;min-height:45px;padding:11px 18px;border:1px solid #94ff53;border-radius:10px;background:linear-gradient(130deg,#173a66,#193d32);color:#fff200;font:bold 15px Georgia,serif;cursor:pointer;text-decoration:none}.mk-btn:hover,.mk-btn:focus-visible{outline:2px solid #fff200;outline-offset:2px}
.mk-btn.mk-red-btn{background:linear-gradient(125deg,#682d3b,#271c28)}.mk-btn.mk-green-btn{background:linear-gradient(125deg,#1b643a,#13332b)}
.mk-feedback{margin-top:12px;padding:13px;border-left:3px solid #94ff53;background:#0a291db5;border-radius:6px;color:#e8f5e7;line-height:1.6}.mk-feedback:empty{display:none}
.mk-branch-controls{display:flex;gap:10px;flex-wrap:wrap;margin-top:15px}.mk-branch-outcome{margin-top:18px;border:1px solid #94ff5377;border-radius:12px;padding:19px;background:#0b221b}.mk-branch-outcome[hidden]{display:none}
.mk-response{display:block;box-sizing:border-box;width:100%;min-height:170px;margin:13px 0;background:#edf0e8;color:#172420;border:2px solid #a8d29a;border-radius:9px;padding:14px;font:16px/1.5 Georgia,serif;resize:vertical}
.mk-rubric{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.mk-rubric>div{border:1px solid #94ff5358;background:#0a191a;padding:14px;border-radius:9px;font-size:14px;line-height:1.5}.mk-rubric strong{color:#fff200;display:block;margin-bottom:7px}
.mk-steps-nav{display:flex;gap:12px 24px;flex-wrap:wrap;margin:24px 0;padding:8px 0}.mk-steps-nav a{font:700 clamp(15px,1.65vw,18px)/1.5 Georgia,serif!important;color:#fff!important;text-decoration:none!important;border:0!important;padding:9px 2px!important}.mk-steps-nav a:hover,.mk-steps-nav a:focus-visible{color:#fff200!important;outline:2px solid #94ff53;outline-offset:3px;border-radius:5px}
.mk-result{font-size:19px!important;color:#fff200!important}.mk-save-note{font-size:13px!important;color:#c5d5c9!important}
.mk-video-placeholder{min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:radial-gradient(circle,#24435b,#0a1720 72%);text-align:center;padding:18px;color:#eff7e9;border-radius:10px}
.mk-video-placeholder strong{color:#fff200;font-size:18px}.mk-video-placeholder p{font-size:13px!important;margin:0;max-width:520px}.mk-video-panel .mk-video-screen{display:block}
.mk-visual-case{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}.mk-visual-case>div{border:1px solid #94ff5361;background:#0a1f27;padding:16px;border-radius:10px}.mk-visual-case strong{display:block;color:#fff200;margin-bottom:8px}
.mk-reference-note{color:#e3eee1;font-style:italic;font-size:14px!important}
@media(max-width:700px){.mk-hero{grid-template-columns:1fr}.mk-hero img{max-height:275px;margin:auto}.mk-rubric,.mk-visual-case{grid-template-columns:1fr}.mk-wrap{width:calc(100% - 18px)}}
</style>"""
 nav='<nav class="mk-nav" aria-label="Return navigation"><a href="../">← All Hero Lessons</a><a href="../../../games/hall-of-legends/">Hall of Legends</a><a href="../../black-history/">Black History Home</a></nav>'
 hero='<header class="mk-hero"><div><div class="mk-kicker">Examine the Past · Black History Heroes · Master Inquiry Lesson</div><h1>'+title+'</h1><p>'+subtitle+'</p><div class="mk-tags"><span>Grades 6–12 · Adults</span><span>45–70 min · Flexible</span><span>Historical Inquiry</span><span>'+e(d["method"])+'</span></div><a class="mk-skip" href="#lesson-start">Begin the Lesson ↓</a></div><figure><img src="../../../assets/hero-lessons/'+key+'.webp" alt="Modern artist illustration of '+title+'" fetchpriority="high"><figcaption class="mk-art-note">Contemporary artwork · not a verified historical likeness</figcaption></figure></header>'
 objectives='<ol>'+''.join('<li>'+e(x)+'</li>' for x in d["objectives"])+'</ol>'
 guide='<div class="mk-panels"><details><summary>Essential Question & Learning Objectives</summary><div class="mk-panel-body"><p><strong>Essential question:</strong> '+e(d["essential"])+'</p><p><strong>Students will be able to:</strong></p>'+objectives+'<p><strong>Success criteria:</strong> Explain two accurate historical details, examine at least one source limitation, make a supported claim, and score 4 of 5 on the post-check after review. The post-check is not a substitute for assessment of written reasoning.</p></div></details><details><summary>Teacher Guide · Pacing, Standards, UDL & Differentiation</summary><div class="mk-panel-body"><p><strong>Suggested pacing:</strong> Hook and prior knowledge 5 min; readings, source comparison and questions 18 min; two Decision Rooms 12 min; performance task and peer discussion 15 min; final check 8 min. Adjust as needed; timer buttons are voluntary.</p><p><strong>Instructional alignment:</strong> CCSS RH.6-8.1 (cite evidence), RH.6-8.2 (central ideas), RH.6-8.9 (compare sources); WHST.6-8.1 and WHST.6-8.9 (argument and evidence). Extend with grades 9–12 RH/WHST source criticism and historiography where appropriate; these are alignments, not a state endorsement.</p><p><strong>UDL options:</strong> Let students reread chunks, use device accessibility tools, write or speak a claim, annotate a timeline/map, and revisit feedback without penalties. Use visual models alongside print rather than relying on audio alone.</p><p><strong>Misconception to watch:</strong> '+e(d["misconception"])+'</p><p><strong>Discussion practice:</strong> Ask students to separate the author\'s claim, the source\'s date and purpose, and the conclusions we can support.</p><p><a href="https://udlguidelines.cast.org/" target="_blank" rel="noopener noreferrer">CAST UDL Guidelines 3.0</a> · <a href="https://www.thecorestandards.org/ELA-Literacy/RH/6-8/" target="_blank" rel="noopener noreferrer">Common Core grades 6–8 historical literacy</a></p></div></details><details><summary>Independent Learner Guide · Saving, Progress & Assessment</summary><div class="mk-panel-body"><p>Start with the diagnostic. Read the three illustrated inquiry sections. Check responses and read the explanations; revise as needed. Decision Rooms are hypothetical choices that help analyze evidence, not factual reconstructions. Complete the final claim and five-item check. The progress bar measures how far you scroll, not mastery; timers are optional and cannot lower a score.</p><p>The written reflection saves only in this browser when you press Save. Avoid personal information on shared devices. Optional video areas indicate future, carefully verified media rather than implying an unpublished video exists.</p></div></details></div>'
 chapters='<div class="mk-steps-nav" aria-label="Jump to lesson sections"><a href="#lesson-start">1 · Discover</a><a href="#reading-one">2 · The World</a><a href="#reading-two">3 · Stories & Evidence</a><a href="#branch-one">4 · Decisions</a><a href="#synthesis">5 · Apply</a><a href="#finish">6 · Demonstrate</a></div>'
 hook='<section class="mk-step mk-blue" id="lesson-start"><div class="mk-kicker">01 · Historical Hook & Diagnostic</div><h2>'+e(d["hookTitle"])+'</h2>'+paragraphs(d["hook"])+'<p class="mk-cue">Formative · Bloom: remember and understand · Do not grade the diagnostic</p>'+question(d["diagnostic"],0)+'<div class="mk-note"><strong>Evidence lens:</strong> '+e(d["lens"])+'</div></section>'
 reading=""
 for i,x in enumerate(d["readings"]):
  rid=["reading-one","reading-two","reading-three"][i]
  colors=["mk-green","mk-charcoal","mk-red"]
  reading+='<section class="mk-step '+colors[i]+'" id="'+rid+'"><div class="mk-kicker">0'+str(i+2)+' · '+e(x["label"])+'</div><h2>'+e(x["title"])+'</h2>'+paragraphs(x["paragraphs"])+'<div class="mk-note"><strong>Pause & Investigate:</strong> '+e(x["prompt"])+'</div>'
  if i==0:
   reading+='<div class="mk-visual-case"><div><strong>Evidence we have</strong>'+e(d["evidenceKnown"])+'</div><div><strong>What still needs checking</strong>'+e(d["evidenceUnknown"])+'</div></div>'
  if i<2:reading+=question(x["question"],i+1)
  if i==1:
   reading+='<div class="mk-video-panel"><h3>Watch & Examine · '+e(d["videoTitle"])+'</h3><div class="mk-video-screen"><div class="mk-video-placeholder"><strong>Video segment reserved</strong><p>A related, age-appropriate museum or scholarly video will be embedded here after editorial and timestamp verification. The lesson and assessments work without video.</p></div></div><p class="mk-save-note">Suggested future video chapter prompts: '+e(d["videoPrompts"])+'</p><p>For primary research now, open the linked museum or historical sources at the end in a separate tab.</p></div>'
  reading+='</section>'
 branches="".join(branch(b,i) for i,b in enumerate(d["branches"]))
 write='<section class="mk-step mk-charcoal" id="synthesis"><div class="mk-kicker">07 · Performance Task · Evidence-Based Claim</div><h2>'+e(d["writingTitle"])+'</h2><p>'+e(d["writingInstructions"])+'</p><ol>'+''.join('<li>'+e(x)+'</li>' for x in d["writingChoices"])+'</ol><p><strong>Every option needs:</strong> A clear claim; at least two details grounded in the readings; one acknowledgment of uncertainty; an explanation linking evidence to the conclusion.</p><textarea id="mk-reflection" class="mk-response" aria-label="Write your evidence-based response" placeholder="'+e(d["writingPlaceholder"])+'"></textarea><button class="mk-btn mk-green-btn" type="button" id="mk-save">Save Reflection in This Browser</button> <button class="mk-btn mk-red-btn" type="button" id="mk-clear">Clear Saved Reflection</button><p class="mk-save-note" id="mk-save-status" role="status" aria-live="polite"></p><div class="mk-rubric"><div><strong>Claim · 0–2</strong>Specific, historically defensible conclusion</div><div><strong>Evidence · 0–2</strong>Two accurate and relevant details</div><div><strong>Interpretation · 0–2</strong>Explains source limitations and reasoning</div></div><p class="mk-cue">Summative performance · 5–6 strong · 3–4 developing · 0–2 revise and conference</p></section>'
 final='<section class="mk-step mk-blue" id="finish"><div class="mk-kicker">08 · Independent Knowledge Check</div><h2>Show What You Know</h2><p>Answer five questions, check each explanation, and revise as necessary. Correct feedback includes a confetti burst; inaccurate selections receive red feedback. Answers stay on this device.</p><div id="mk-final-test">'+''.join(question(q,i+3) for i,q in enumerate(d["final"]))+'</div><button class="mk-btn mk-green-btn" type="button" id="mk-score">Calculate My Final Score</button><p id="mk-score-result" class="mk-result" aria-live="polite"></p><div class="mk-note"><strong>Exit ticket:</strong> '+e(d["exit"])+'</div></section>'
 extend='<section class="mk-step mk-green" id="extend"><div class="mk-kicker">09 · Independent or Group Extension</div><h2>'+e(d["extendTitle"])+'</h2><ul>'+''.join('<li>'+e(x)+'</li>' for x in d["extensions"])+'</ul></section>'
 sources='<section class="mk-step mk-charcoal" id="sources"><div class="mk-kicker">10 · Historical Sources & Research Trail</div><h2>Sources, Interpretations & Evidence Limits</h2><p>'+e(d["sourceIntro"])+'</p>'+source_list(d["sources"])+'<p class="mk-reference-note">Reading and scenarios are original educational synthesis and simulations, not quotations from these sources. External material opens in a separate tab. Verify exact wording, dates, and image permissions when assigning outside content.</p></section>'
 body='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' — Master Inquiry Lesson | Examine the Past</title><meta name="description" content="'+e(d["description"])+'">'+stylesheet+extra+'</head><body class="lesson-subject-bg subject-black-history"><main class="mk-wrap" data-hero-key="'+key+'">'+nav+hero+guide+chapters+hook+reading+branches+write+final+extend+sources+'</main><script defer src="../../../assets/hero-lesson-series.js?v=20261106-v1"></script><script defer src="../../../assets/hero-lesson-interactions.js?v=20261106-series-v1"></script><script src="../../../assets/site-shell.js?v=20261106-hero-series-v1" data-etp-root="../../../"></script></body></html>'
 out=ROOT/"lessons/black-history-heroes"/key/"index.html";out.parent.mkdir(parents=True,exist_ok=True);out.write_text(body,encoding="utf-8");return str(out.relative_to(ROOT)),len(body)
def main():
 results=[]
 for path in sorted(DATA.glob("*.json")):
  d=json.loads(path.read_text(encoding="utf-8"))
  results.append(build(d))
 print(json.dumps(results))
if __name__=="__main__":main()
