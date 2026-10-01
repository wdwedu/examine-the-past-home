(()=>{
const cfg=window.CASE_FILE_CONFIG;
if(!cfg)return;
const stage=document.getElementById("caseStage");
const evCount=document.getElementById("evidenceCount");
const pointValue=document.getElementById("pointValue");
const strengthValue=document.getElementById("strengthValue");
const phaseValue=document.getElementById("phaseValue");
const soundBtn=document.getElementById("soundToggle");
const state={phase:"Briefing",current:0,solved:new Map(),points:0,theory:null,picks:new Set(),sound:true};
let audioCtx=null;

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
function updateStatus(){
 evCount.textContent=state.solved.size+"/"+cfg.evidence.length;
 pointValue.textContent=state.points;
 phaseValue.textContent=state.phase;
 strengthValue.textContent=state.solved.size===cfg.evidence.length?"Ready":state.solved.size>=3?"Building":"Locked";
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function setPhase(p){state.phase=p;updateStatus()}
function renderBrief(){
 setPhase("Briefing");
 stage.innerHTML=`
 <div class="stage-head"><div><h2>Case Briefing</h2><p>Read the file, learn the rules, then open the evidence locker.</p></div><button class="case-btn" id="openCase">Open Case File</button></div>
 <div class="brief-grid">
  <article class="brief-card">
   <h3>Incident Summary</h3>
   <p>${esc(cfg.brief)}</p>
   <div class="question">${esc(cfg.question)}</div>
  </article>
  <aside class="brief-side">
   <h3>Your Assignment</h3>
   <p>This is not a trivia round. You are building an argument from incomplete historical evidence.</p>
   <div class="rules">
    <div class="rule"><span class="rule-num">1</span><div>Open all six evidence files and interpret each clue.</div></div>
    <div class="rule"><span class="rule-num">2</span><div>Separate direct evidence from later inference and archaeology.</div></div>
    <div class="rule"><span class="rule-num">3</span><div>Choose a theory and pin three pieces of evidence that support it.</div></div>
    <div class="rule"><span class="rule-num">4</span><div>Your final report is judged by reasoning, not by pretending the mystery is solved.</div></div>
   </div>
  </aside>
 </div>`;
 document.getElementById("openCase").addEventListener("click",()=>{stamp();renderInvestigation(0)});
}
function evidenceTab(e,i){
 const solved=state.solved.has(e.id), active=i===state.current;
 return `<button class="evidence-tab ${solved?"solved":""} ${active?"active":""}" data-ev="${i}"><span class="num">${esc(e.num)}</span><strong>${esc(e.title)}</strong></button>`;
}
function solvedViewer(e){
 const rec=state.solved.get(e.id);
 const choices=e.choices.map((c,i)=>`<button class="choice ${i===e.answer?"correct":(i===rec.choice&&i!==e.answer?"wrong":"")}" disabled>${esc(c)}</button>`).join("");
 return `
 <div class="viewer-top"><div><div class="eyebrow">${esc(e.num)}</div></div><span class="source-badge">${esc(e.sourceType)}</span></div>
 <article class="evidence-paper"><h3>${esc(e.title)}</h3><div class="date">${esc(e.date)}</div><p>${esc(e.text)}</p><p class="observation">${esc(e.observation)}</p></article>
 <div class="analysis-box"><h4>Investigator Question</h4><div class="choice-list">${choices}</div>
 <div class="feedback good"><b>Filed:</b> ${esc(e.explain)}</div>
 ${state.solved.size===cfg.evidence.length?'<button class="case-btn" id="buildTheory" style="margin-top:12px">Build Final Theory</button>':'<button class="case-btn secondary" id="nextEvidence" style="margin-top:12px">Open Next Unfiled Evidence</button>'}
 </div>`;
}
function unsolvedViewer(e){
 const choices=e.choices.map((c,i)=>`<button class="choice" data-choice="${i}">${esc(c)}</button>`).join("");
 return `
 <div class="viewer-top"><div><div class="eyebrow">${esc(e.num)}</div></div><span class="source-badge">${esc(e.sourceType)}</span></div>
 <article class="evidence-paper"><h3>${esc(e.title)}</h3><div class="date">${esc(e.date)}</div><p>${esc(e.text)}</p><p class="observation">${esc(e.observation)}</p></article>
 <div class="analysis-box"><h4>${esc(e.question)}</h4><div class="choice-list">${choices}</div><div class="feedback">Select the interpretation best supported by the evidence. You only get one first-read judgment.</div></div>`;
}
function renderInvestigation(index){
 state.current=Math.max(0,Math.min(cfg.evidence.length-1,index));
 setPhase("Investigating");
 const e=cfg.evidence[state.current];
 const notes=[...state.solved.keys()].map(id=>cfg.evidence.find(x=>x.id===id)).filter(Boolean).map(x=>`<div class="note-row"><b>${esc(x.num)}:</b> ${esc(x.observation)}</div>`).join("")||'<div class="note-row">No evidence filed yet.</div>';
 stage.innerHTML=`
 <div class="stage-head"><div><h2>Evidence Locker</h2><p>Open each file. Your notebook fills as you make evidence-based judgments.</p></div><button class="case-btn secondary" id="briefBtn">Review Briefing</button></div>
 <div class="investigation-grid">
  <aside class="evidence-locker"><div class="locker-title">Case Materials</div><div class="evidence-list">${cfg.evidence.map(evidenceTab).join("")}</div>
   <div class="notebook"><h3>Investigator Notebook</h3>${notes}</div>
  </aside>
  <section class="viewer">${state.solved.has(e.id)?solvedViewer(e):unsolvedViewer(e)}</section>
 </div>`;
 document.getElementById("briefBtn").addEventListener("click",renderBrief);
 stage.querySelectorAll("[data-ev]").forEach(b=>b.addEventListener("click",()=>{stamp();renderInvestigation(Number(b.dataset.ev))}));
 stage.querySelectorAll("[data-choice]").forEach(b=>b.addEventListener("click",()=>{
   const choice=Number(b.dataset.choice), correct=choice===e.answer;
   state.solved.set(e.id,{choice,correct});
   state.points+=correct?100:45;
   correct?success():tone(150,.12,"sawtooth",.018);
   updateStatus();
   renderInvestigation(state.current);
 }));
 const next=document.getElementById("nextEvidence");
 if(next)next.addEventListener("click",()=>{
  const idx=cfg.evidence.findIndex(x=>!state.solved.has(x.id));
  renderInvestigation(idx<0?state.current:idx);
 });
 const build=document.getElementById("buildTheory");
 if(build)build.addEventListener("click",()=>{success();renderBoard()});
}
function renderBoard(){
 setPhase("Theory Board");
 const theories=cfg.theories.map(t=>`
  <label class="theory-card"><input type="radio" name="theory" value="${t.id}" ${state.theory===t.id?"checked":""}><strong>${esc(t.title)}</strong><span>${esc(t.desc)}</span></label>`).join("");
 const picks=cfg.evidence.map(e=>`
  <label class="pick"><input type="checkbox" value="${e.id}" ${state.picks.has(e.id)?"checked":""}><span><b>${esc(e.num)} — ${esc(e.title)}</b><small>${esc(e.observation)}</small></span></label>`).join("");
 stage.innerHTML=`
 <div class="stage-head"><div><h2>Evidence Board</h2><p>Choose one working theory, then pin exactly three pieces of evidence that best support it.</p></div><button class="case-btn secondary" id="backEvidence">Back to Evidence</button></div>
 <div class="board">
  <section class="theory-panel"><h3>Competing Theories</h3><p>A strong theory explains more evidence while admitting what it cannot prove.</p><div class="theory-list">${theories}</div></section>
  <section class="evidence-panel"><h3>Pin Your Evidence</h3><p id="pickHelp">Choose 3 files. Selected: ${state.picks.size}/3</p><div class="evidence-picks">${picks}</div></section>
 </div>
 <div class="case-footer-actions"><button class="case-btn" id="submitTheory" ${!state.theory||state.picks.size!==3?"disabled":""}>Submit Case Theory</button><button class="case-btn danger" id="clearBoard">Clear Board</button></div>`;
 document.getElementById("backEvidence").addEventListener("click",()=>renderInvestigation(state.current));
 stage.querySelectorAll('input[name="theory"]').forEach(r=>r.addEventListener("change",()=>{state.theory=r.value;stamp();renderBoard()}));
 stage.querySelectorAll('.evidence-picks input').forEach(c=>c.addEventListener("change",()=>{
   if(c.checked&&state.picks.size>=3){c.checked=false;tone(130,.08,"square",.015);return}
   c.checked?state.picks.add(c.value):state.picks.delete(c.value);
   stamp();renderBoard();
 }));
 document.getElementById("clearBoard").addEventListener("click",()=>{state.theory=null;state.picks.clear();renderBoard()});
 const submit=document.getElementById("submitTheory");
 if(submit&&!submit.disabled)submit.addEventListener("click",()=>{success();renderReport()});
}
function renderReport(){
 setPhase("Case Report");
 const theory=cfg.theories.find(t=>t.id===state.theory);
 const selected=[...state.picks].map(id=>cfg.evidence.find(e=>e.id===id));
 const fit=selected.filter(e=>theory.strong.includes(e.id)).length;
 const reading=Math.round((state.points/(cfg.evidence.length*100))*55);
 const reasoning=Math.round((fit/3)*45);
 const score=Math.min(100,reading+reasoning);
 const rank=score>=90?"Archive Master":score>=75?"Lead Historical Investigator":"Historical Investigator";
 const quality=fit===3?"Your three pinned clues form a coherent evidence chain for this theory.":fit===2?"Two of your clues strongly support the theory; one is better treated as contextual or competing evidence.":"Your theory is possible, but the evidence chain needs stronger direct support.";
 stage.innerHTML=`
 <div class="stage-head"><div><h2>Final Case Report</h2><p>The mystery remains historically unresolved. Your score measures how carefully you interpreted and connected the surviving evidence.</p></div></div>
 <div class="final-report">
  <aside class="verdict-seal"><div class="seal-ring"><span>CASE<br>REVIEWED</span></div><h3>${esc(rank)}</h3><p>Evidence Reasoning Score: <b>${score}/100</b></p></aside>
  <article class="report-paper"><h3>${esc(theory.title)}</h3><p>${esc(theory.summary)}</p><p><b>Evidence chain:</b></p><ul>${selected.map(e=>`<li><b>${esc(e.title)}</b> — ${esc(e.observation)}</li>`).join("")}</ul><p><b>Assessment:</b> ${esc(quality)}</p><p><b>Historian's caution:</b> The surviving record does not definitively establish one fate for all 117 colonists. A responsible conclusion must distinguish plausible reconstruction from proof.</p></article>
 </div>
 <div class="case-footer-actions"><button class="case-btn" id="reopen">Reopen Case</button><button class="case-btn secondary" id="vault">Return to Game Vault</button></div>`;
 document.getElementById("reopen").addEventListener("click",()=>{state.phase="Briefing";state.current=0;state.solved.clear();state.points=0;state.theory=null;state.picks.clear();updateStatus();renderBrief()});
 document.getElementById("vault").addEventListener("click",()=>{window.location.href="/examine-the-past-home/games/"});
}
soundBtn.addEventListener("click",()=>{state.sound=!state.sound;soundBtn.textContent=state.sound?"Sound: On":"Sound: Off";if(state.sound)tone(360,.06)});
updateStatus();
renderBrief();
})();