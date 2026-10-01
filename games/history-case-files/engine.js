(()=>{
const cfg=window.CASE_FILE_CONFIG;
if(!cfg)return;
const stage=document.getElementById("caseStage");
const evCount=document.getElementById("evidenceCount");
const pointValue=document.getElementById("pointValue");
const strengthValue=document.getElementById("strengthValue");
const phaseValue=document.getElementById("phaseValue");
const streakValue=document.getElementById("streakValue");
const soundBtn=document.getElementById("soundToggle");
const state={phase:"Briefing",current:0,solved:new Map(),points:0,streak:0,theory:null,picks:new Set(),sound:true,twistSeen:false,crossDone:false,confidence:"Strong"};
let audioCtx=null,burstTimer=null;

function tone(freq=420,dur=.07,type="sine",gain=.025){
 if(!state.sound)return;
 try{
  audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
  const o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type=type;o.frequency.value=freq;g.gain.value=gain;
  o.connect(g);g.connect(audioCtx.destination);o.start();
  g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);
  o.stop(audioCtx.currentTime+dur);
 }catch(e){}
}
function stamp(){tone(120,.08,"square",.018);setTimeout(()=>tone(180,.06,"square",.012),65)}
function success(){tone(440,.08,"sine",.025);setTimeout(()=>tone(660,.1,"sine",.02),90)}
function burst(icon,title,sub){
 const old=document.querySelector(".clue-burst");if(old)old.remove();
 const d=document.createElement("div");d.className="clue-burst";d.setAttribute("role","status");
 d.innerHTML='<div class="burst-icon">'+icon+'</div><b>'+esc(title)+'</b><span>'+esc(sub||"")+'</span>';
 document.body.appendChild(d);clearTimeout(burstTimer);burstTimer=setTimeout(()=>d.remove(),1500);
}
function updateStatus(){
 if(evCount)evCount.textContent=state.solved.size+"/"+cfg.evidence.length;
 if(pointValue)pointValue.textContent=state.points;
 if(phaseValue)phaseValue.textContent=state.phase;
 if(streakValue){streakValue.textContent=state.streak;streakValue.classList.toggle("streak-fire",state.streak>=3)}
 if(strengthValue)strengthValue.textContent=state.solved.size===cfg.evidence.length?"Ready":state.solved.size>=Math.ceil(cfg.evidence.length/2)?"Building":"Locked";
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function setPhase(p){state.phase=p;updateStatus()}
function sourceLinks(){
 if(!cfg.sources||!cfg.sources.length)return "";
 return '<div class="source-strip"><b>Case sources:</b><br>'+cfg.sources.map(s=>'<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.label)+'</a>').join(" · ")+"</div>";
}
function renderBrief(){
 setPhase("Briefing");
 stage.innerHTML=`
 <div class="stage-head"><div><h2>Case Briefing</h2><p>Read the file, learn the rules, then open the evidence locker.</p></div><button class="case-btn" id="openCase">Open Case File</button></div>
 <div class="brief-grid">
  <article class="brief-card"><h3>Incident Summary</h3><p>${esc(cfg.brief)}</p><div class="question">${esc(cfg.question)}</div></article>
  <aside class="brief-side"><h3>Your Assignment</h3><p>${esc(cfg.assignment||"Build an argument from incomplete historical evidence. Strong investigators separate what the evidence proves from what it only suggests.")}</p>
   <div class="rules">
    <div class="rule"><span class="rule-num">1</span><div>Open every evidence file and make a first-read judgment.</div></div>
    <div class="rule"><span class="rule-num">2</span><div>Watch for evidence that supports more than one explanation.</div></div>
    <div class="rule"><span class="rule-num">3</span><div>Survive the case twist and cross-examination.</div></div>
    <div class="rule"><span class="rule-num">4</span><div>Build a final theory using exactly three evidence files.</div></div>
   </div>
  </aside>
 </div>`;
 document.getElementById("openCase").addEventListener("click",()=>{stamp();burst("🗂️","Case Opened","Evidence locker unlocked.");renderInvestigation(0)});
}
function evidenceTab(e,i){
 const solved=state.solved.has(e.id),active=i===state.current;
 return `<button class="evidence-tab ${solved?"solved":""} ${active?"active":""}" data-ev="${i}"><span class="num">${esc(e.num)}</span><strong>${esc(e.title)}</strong></button>`;
}
function viewer(e,solved){
 const rec=state.solved.get(e.id);
 const choices=e.choices.map((c,i)=>{
  const cls=solved?(i===e.answer?"correct":(rec&&i===rec.choice&&i!==e.answer?"wrong":"")):"";
  return `<button class="choice ${cls}" ${solved?"disabled":'data-choice="'+i+'"'}>${esc(c)}</button>`;
 }).join("");
 return `
 <div class="viewer-top"><div><div class="eyebrow">${esc(e.num)}</div></div><span class="source-badge">${esc(e.sourceType)}</span></div>
 <article class="evidence-paper"><h3>${esc(e.title)}</h3><div class="date">${esc(e.date)}</div><p>${esc(e.text)}</p><p class="observation">${esc(e.observation)}</p></article>
 <div class="analysis-box"><h4>${esc(e.question)}</h4><div class="choice-list">${choices}</div>
 ${solved?'<div class="feedback good"><b>Filed:</b> '+esc(e.explain)+'</div>':'<div class="feedback">Choose the interpretation best supported by this file. Your first judgment affects the score.</div>'}
 ${solved?(state.solved.size===cfg.evidence.length?'<button class="case-btn" id="buildTheory" style="margin-top:12px">Advance to Case Analysis</button>':'<button class="case-btn secondary" id="nextEvidence" style="margin-top:12px">Open Next Unfiled Evidence</button>'):""}
 </div>`;
}
function renderInvestigation(index){
 state.current=Math.max(0,Math.min(cfg.evidence.length-1,index));setPhase("Investigating");
 const e=cfg.evidence[state.current];
 const notes=[...state.solved.keys()].map(id=>cfg.evidence.find(x=>x.id===id)).filter(Boolean).map(x=>`<div class="note-row"><b>${esc(x.num)}:</b> ${esc(x.observation)}</div>`).join("")||'<div class="note-row">No evidence filed yet.</div>';
 stage.innerHTML=`
 <div class="stage-head"><div><h2>Evidence Locker</h2><p>Open every file. Correct interpretations build an insight streak and unlock bonus points.</p></div><button class="case-btn secondary" id="briefBtn">Review Briefing</button></div>
 <div class="investigation-grid">
  <aside class="evidence-locker"><div class="locker-title">Case Materials</div><div class="evidence-list">${cfg.evidence.map(evidenceTab).join("")}</div>
   <div class="notebook"><h3>Investigator Notebook</h3>${notes}</div>
  </aside>
  <section class="viewer">${viewer(e,state.solved.has(e.id))}</section>
 </div>`;
 document.getElementById("briefBtn").addEventListener("click",renderBrief);
 stage.querySelectorAll("[data-ev]").forEach(b=>b.addEventListener("click",()=>{stamp();renderInvestigation(Number(b.dataset.ev))}));
 stage.querySelectorAll("[data-choice]").forEach(b=>b.addEventListener("click",()=>{
   if(state.solved.has(e.id))return;
   const choice=Number(b.dataset.choice),correct=choice===e.answer;
   state.solved.set(e.id,{choice,correct});
   if(correct){state.streak++;const bonus=Math.max(0,(state.streak-1)*10);state.points+=100+bonus;success();burst(state.streak>=3?"🔥":"🔎",state.streak>=3?"Insight Streak x"+state.streak:"Clue Filed",bonus?"+100 + "+bonus+" streak bonus":"+100 insight points")}
   else{state.streak=0;state.points+=45;tone(150,.12,"sawtooth",.018);burst("🧠","Evidence Reframed","+45 points — explanation added to your notebook.")}
   updateStatus();
   if(state.solved.size===Math.ceil(cfg.evidence.length/2)&&cfg.midCaseTwist&&!state.twistSeen){setTimeout(renderTwist,450)}else renderInvestigation(state.current);
 }));
 const next=document.getElementById("nextEvidence");
 if(next)next.addEventListener("click",()=>{const idx=cfg.evidence.findIndex(x=>!state.solved.has(x.id));renderInvestigation(idx<0?state.current:idx)});
 const build=document.getElementById("buildTheory");
 if(build)build.addEventListener("click",()=>{success();if(cfg.crossExam&&!state.crossDone)renderCrossExam();else renderBoard()});
}
function renderTwist(){
 state.twistSeen=true;setPhase("Case Twist");stamp();
 stage.innerHTML=`<div class="twist-card"><div class="twist-icon">${esc(cfg.midCaseTwist.icon||"⚠️")}</div><h3>${esc(cfg.midCaseTwist.title||"Case Twist")}</h3><p>${esc(cfg.midCaseTwist.text)}</p><button class="case-btn" id="continueTwist">Continue Investigation</button></div>`;
 document.getElementById("continueTwist").addEventListener("click",()=>{burst("🧩","Pattern Updated","New context added to the case.");const idx=cfg.evidence.findIndex(x=>!state.solved.has(x.id));renderInvestigation(idx<0?state.current:idx)});
}
function renderCrossExam(){
 setPhase("Cross-Examination");
 const q=cfg.crossExam;
 stage.innerHTML=`<div class="cross-card"><div class="cross-icon">⚖️</div><h3>Cross-Examination</h3><p>${esc(q.question)}</p><div class="cross-choices">${q.choices.map((c,i)=>'<button class="cross-choice" data-cross="'+i+'">'+esc(c)+'</button>').join("")}</div><div id="crossFeedback" class="feedback hidden"></div><button class="case-btn hidden" id="crossContinue" style="margin-top:14px">Build Evidence Board</button></div>`;
 stage.querySelectorAll("[data-cross]").forEach(b=>b.addEventListener("click",()=>{
  if(state.crossDone)return;state.crossDone=true;
  const i=Number(b.dataset.cross),ok=i===q.answer;
  b.classList.add(ok?"correct":"wrong");
  stage.querySelectorAll("[data-cross]").forEach((x,j)=>{x.disabled=true;if(j===q.answer)x.classList.add("correct")});
  state.points+=ok?125:50;state.streak=ok?state.streak+1:0;updateStatus();
  const fb=document.getElementById("crossFeedback");fb.classList.remove("hidden");fb.classList.toggle("good",ok);fb.innerHTML=(ok?"<b>Strong challenge response.</b> ":"<b>Important correction.</b> ")+esc(q.explain);
  const go=document.getElementById("crossContinue");go.classList.remove("hidden");
  ok?burst("⚖️","Cross-Exam Passed","+125 points"):burst("📚","Context Added","+50 points");
 }));
 document.getElementById("crossContinue").addEventListener("click",renderBoard);
}
function renderBoard(){
 setPhase("Theory Board");
 const theories=cfg.theories.map(t=>`<label class="theory-card"><input type="radio" name="theory" value="${t.id}" ${state.theory===t.id?"checked":""}><strong>${esc(t.title)}</strong><span>${esc(t.desc)}</span></label>`).join("");
 const picks=cfg.evidence.map(e=>`<label class="pick"><input type="checkbox" value="${e.id}" ${state.picks.has(e.id)?"checked":""}><span><b>${esc(e.num)} — ${esc(e.title)}</b><small>${esc(e.observation)}</small></span></label>`).join("");
 const confidences=["Tentative","Strong","Very Strong"];
 stage.innerHTML=`
 <div class="stage-head"><div><h2>Evidence Board</h2><p>Choose one working theory, then pin exactly three files that best support it. Strong historians also state how confident they are.</p></div><button class="case-btn secondary" id="backEvidence">Back to Evidence</button></div>
 <div class="board">
  <section class="theory-panel"><h3>Competing Theories</h3><p>Choose the explanation that best accounts for the available evidence.</p><div class="theory-list">${theories}</div><div class="board-tip">🧭 A good historical theory explains evidence and acknowledges uncertainty. Do not confuse “possible” with “proven.”</div></section>
  <section class="evidence-panel"><h3>Pin Your Evidence</h3><p>Choose 3 files. Selected: ${state.picks.size}/3</p><div class="evidence-picks">${picks}</div><div class="confidence-row">${confidences.map(c=>'<button class="confidence-btn '+(state.confidence===c?"active":"")+'" data-conf="'+c+'">'+c+'</button>').join("")}</div></section>
 </div>
 <div class="case-footer-actions"><button class="case-btn" id="submitTheory" ${!state.theory||state.picks.size!==3?"disabled":""}>Submit Case Theory</button><button class="case-btn danger" id="clearBoard">Clear Board</button></div>`;
 document.getElementById("backEvidence").addEventListener("click",()=>renderInvestigation(state.current));
 stage.querySelectorAll('input[name="theory"]').forEach(r=>r.addEventListener("change",()=>{state.theory=r.value;stamp();burst("🧩","Theory Selected",r.closest("label").querySelector("strong").textContent);renderBoard()}));
 stage.querySelectorAll('.evidence-picks input').forEach(c=>c.addEventListener("change",()=>{if(c.checked&&state.picks.size>=3){c.checked=false;burst("📌","Board Full","Remove one clue before pinning another.");return}c.checked?state.picks.add(c.value):state.picks.delete(c.value);stamp();renderBoard()}));
 stage.querySelectorAll("[data-conf]").forEach(b=>b.addEventListener("click",()=>{state.confidence=b.dataset.conf;renderBoard()}));
 document.getElementById("clearBoard").addEventListener("click",()=>{state.theory=null;state.picks.clear();renderBoard()});
 const submit=document.getElementById("submitTheory");if(submit&&!submit.disabled)submit.addEventListener("click",()=>{success();burst("✅","Case Theory Submitted","Generating final report…");setTimeout(renderReport,350)});
}
function renderReport(){
 setPhase("Case Report");
 const theory=cfg.theories.find(t=>t.id===state.theory);
 const selected=[...state.picks].map(id=>cfg.evidence.find(e=>e.id===id)).filter(Boolean);
 const fit=selected.filter(e=>theory.strong.includes(e.id)).length;
 const maxEvidence=cfg.evidence.length*100 + Math.max(0,(cfg.evidence.length*(cfg.evidence.length-1)/2)*10) + (cfg.crossExam?125:0);
 const evidenceScore=Math.min(55,Math.round((state.points/maxEvidence)*55));
 const reasoning=Math.round((fit/3)*45);
 const score=Math.min(100,evidenceScore+reasoning);
 const rank=score>=92?"Chief Archive Investigator":score>=80?"Lead Historical Investigator":score>=65?"Historical Investigator":"Evidence Apprentice";
 const quality=fit===3?"Your three pinned clues form a coherent evidence chain for this theory.":fit===2?"Two clues strongly support the theory; one is better treated as context or counterevidence.":"Your explanation is possible, but the evidence chain needs stronger direct support.";
 const caution=cfg.closingCaution||"The available evidence supports interpretation, but historical claims should not go beyond what the sources can establish.";
 stage.innerHTML=`
 <div class="stage-head"><div><h2>Final Case Report</h2><p>Your report scores evidence reading, counterevidence, and the fit between your theory and the clues you pinned.</p></div></div>
 <div class="final-report">
  <aside class="verdict-seal"><div class="seal-ring"><span>CASE<br>REVIEWED</span></div><h3>${esc(rank)}</h3><p>Evidence Reasoning Score: <b>${score}/100</b></p><div class="report-scorebar"><span style="width:${score}%"></span></div><p>Confidence declared: <b>${esc(state.confidence)}</b></p></aside>
  <article class="report-paper"><h3>${esc(theory.title)}</h3><p>${esc(theory.summary)}</p><p><b>Evidence chain:</b></p><ul>${selected.map(e=>`<li><b>${esc(e.title)}</b> — ${esc(e.observation)}</li>`).join("")}</ul><p><b>Assessment:</b> ${esc(quality)}</p><p><b>Historian's caution:</b> ${esc(caution)}</p></article>
 </div>
 ${sourceLinks()}
 <div class="case-footer-actions"><button class="case-btn" id="reopen">Reopen Case</button><button class="case-btn secondary" id="vault">Return to Game Vault</button></div>`;
 document.getElementById("reopen").addEventListener("click",()=>{state.phase="Briefing";state.current=0;state.solved.clear();state.points=0;state.streak=0;state.theory=null;state.picks.clear();state.twistSeen=false;state.crossDone=false;state.confidence="Strong";updateStatus();renderBrief()});
 document.getElementById("vault").addEventListener("click",()=>{window.location.href="/examine-the-past-home/games/"});
}
if(soundBtn)soundBtn.addEventListener("click",()=>{state.sound=!state.sound;soundBtn.textContent=state.sound?"Sound: On":"Sound: Off";if(state.sound)tone(360,.06)});
updateStatus();renderBrief();
})();