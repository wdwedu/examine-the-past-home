(()=>{
const cfg=window.WHO_IN_TIME_CONFIG;if(!cfg)return;
const stage=document.getElementById("whoStage");
const roundEl=document.getElementById("roundValue"),scoreEl=document.getElementById("scoreValue"),streakEl=document.getElementById("streakValue"),clueEl=document.getElementById("clueValue"),phaseEl=document.getElementById("phaseValue");
const sfxBtn=document.getElementById("sfxToggle");
const state={round:0,score:0,streak:0,clue:0,done:new Set(),confidence:"Strong",sfx:true,firstGuesses:0};
let ctx=null,timer=null;
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function tone(freq=430,dur=.06,type="sine",gain=.022){if(!state.sfx)return;try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(ctx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+dur);o.stop(ctx.currentTime+dur)}catch(e){}}
function good(){tone(440,.06);setTimeout(()=>tone(660,.08),70)} function bad(){tone(145,.09,"square",.014)}
function burst(emo,title,sub){document.querySelector(".wi-burst")?.remove();const d=document.createElement("div");d.className="wi-burst";d.innerHTML='<div class="emo">'+emo+'</div><b>'+esc(title)+'</b><span>'+esc(sub||"")+'</span>';document.body.appendChild(d);clearTimeout(timer);timer=setTimeout(()=>d.remove(),1350)}
function update(phase){if(roundEl)roundEl.textContent=(state.round+1)+"/"+cfg.people.length;if(scoreEl)scoreEl.textContent=state.score;if(streakEl)streakEl.textContent=state.streak;if(clueEl)clueEl.textContent=(state.clue+1)+"/3";if(phaseEl&&phase)phaseEl.textContent=phase}
function intro(){update("Briefing");stage.innerHTML=`
<div class="wi-head"><div><h2>Identity Briefing</h2><p>${esc(cfg.brief)}</p></div><button class="wi-btn" id="startWho">Start Investigation</button></div>
<div class="wi-intro"><section class="wi-card"><h3>How to Play</h3><p>${esc(cfg.question)}</p><div class="wi-rules">
<div class="wi-rule"><i>1</i><span>You begin with one historical clue.</span></div>
<div class="wi-rule"><i>2</i><span>Guess immediately for maximum points, or reveal more clues.</span></div>
<div class="wi-rule"><i>3</i><span>Set your confidence before guessing. Correct high-confidence guesses earn a bonus.</span></div>
<div class="wi-rule"><i>4</i><span>Build a streak across identities to earn a stronger final rank.</span></div>
</div></section><aside class="wi-card"><h3>Scoring</h3><p><b>Clue 1:</b> 150 points<br><b>Clue 2:</b> 110 points<br><b>Clue 3:</b> 80 points</p><p>A wrong guess reveals additional context but ends the streak for that identity.</p></aside></div>`;
document.getElementById("startWho").addEventListener("click",()=>{burst("🕵️","Identity File Opened","Clue 1 is live.");renderRound()})}
function renderRound(){
 update("Identify");
 const p=cfg.people[state.round],revealed=p.clues.slice(0,state.clue+1);
 const side=cfg.people.map((x,i)=>'<div class="person-dot '+(state.done.has(i)?"done":i===state.round?"active":"")+'">'+(state.done.has(i)?"✓ ":"")+ 'Identity '+(i+1)+'</div>').join("");
 stage.innerHTML=`
 <div class="wi-head"><div><h2>${esc(p.roundTitle||"Who Am I?")}</h2><p>Read the clues carefully. Guess now for more points or reveal another clue.</p></div><button class="wi-btn secondary" id="briefBtn">How to Play</button></div>
 <div class="clue-board"><aside class="round-list"><h3>Case Files</h3>${side}</aside>
 <section class="clue-panel"><div class="clue-top"><b>Identity ${state.round+1}</b><span>Clue ${state.clue+1} of 3</span></div>
 <article class="clue-card"><h3>Evidence Revealed</h3>${revealed.map((x,i)=>'<p><b>Clue '+(i+1)+':</b> '+esc(x)+'</p>').join("")}</article>
 <div class="reveal-row">${[0,1,2].map(i=>'<span class="reveal-chip '+(i<=state.clue?"active":"")+'">Clue '+(i+1)+'</span>').join("")}${state.clue<2?'<button class="wi-btn secondary" id="revealMore">Reveal Next Clue</button>':""}</div>
 <div class="guess-area"><h4>Who is it?</h4><div class="guess-grid">${p.options.map((x,i)=>'<button class="guess" data-guess="'+i+'">'+esc(x)+'</button>').join("")}</div>
 <div class="confidence"><span style="align-self:center;color:#aaa392;font-size:11px">Confidence:</span>${["Tentative","Strong","Certain"].map(c=>'<button data-conf="'+c+'" class="'+(state.confidence===c?"active":"")+'">'+c+'</button>').join("")}</div>
 <div id="whoFeedback" class="wi-feedback">Fewer clues = more possible points.</div></div></section></div>`;
 document.getElementById("briefBtn").addEventListener("click",intro);
 const more=document.getElementById("revealMore");if(more)more.addEventListener("click",()=>{state.clue++;burst("🔎","New Clue","Potential score decreases, certainty increases.");renderRound()});
 stage.querySelectorAll("[data-conf]").forEach(b=>b.addEventListener("click",()=>{state.confidence=b.dataset.conf;renderRound()}));
 stage.querySelectorAll("[data-guess]").forEach(b=>b.addEventListener("click",()=>guess(p,Number(b.dataset.guess),b)));
}
function guess(p,i,b){
 const correct=i===p.answer,base=[150,110,80][state.clue],mult=state.confidence==="Certain"?1.15:state.confidence==="Strong"?1.05:1;
 if(correct){
  const pts=Math.round(base*mult)+Math.max(0,state.streak*10);state.score+=pts;state.streak++;if(state.clue===0)state.firstGuesses++;good();b.classList.add("correct");
  stage.querySelectorAll("[data-guess]").forEach(x=>x.disabled=true);state.done.add(state.round);update("Identified");burst(state.streak>=3?"🔥":"✅",state.streak>=3?"Identity Streak x"+state.streak:"Identity Confirmed","+"+pts+" points");
  const fb=document.getElementById("whoFeedback");fb.classList.add("good");fb.innerHTML='<b>'+esc(p.name)+'</b> — '+esc(p.explain);
  const a=document.createElement("div");a.className="wi-actions";a.innerHTML='<button class="wi-btn" id="nextWho">'+(state.round===cfg.people.length-1?"Finish Investigation":"Next Identity")+'</button>';fb.after(a);
  document.getElementById("nextWho").addEventListener("click",()=>{if(state.round===cfg.people.length-1)summary();else{state.round++;state.clue=0;state.confidence="Strong";renderRound()}});
 }else{
  b.classList.add("wrong");b.disabled=true;state.streak=0;state.score=Math.max(0,state.score-15);bad();burst("🧠","Not This Person","-15 points. Re-read the evidence.");update("Identify");
  const fb=document.getElementById("whoFeedback");fb.innerHTML='<b>Not yet.</b> '+esc(p.wrong||"Compare the clues with the remaining choices.");
 }
}
function summary(){
 update("Complete");const max=cfg.people.length*173;const score=Math.min(100,Math.round((state.score/max)*80)+Math.round((state.firstGuesses/cfg.people.length)*20));
 const rank=score>=92?"Master Historical Identifier":score>=82?"Archive Detective":score>=70?"Clue Historian":"Identity Investigator";
 stage.innerHTML=`<div class="wi-head"><div><h2>Investigation Complete</h2><p>You identified all ${cfg.people.length} historical figures.</p></div></div>
 <div class="wi-summary"><aside class="wi-score"><div class="wi-ring"><span>${score}</span></div><h3>${rank}</h3><p>${state.firstGuesses} first-clue identifications</p></aside>
 <article class="wi-report"><h3>${esc(cfg.title)}</h3><p>${esc(cfg.closing)}</p><ul>${cfg.takeaways.map(x=>'<li>'+esc(x)+'</li>').join("")}</ul></article></div>
 <div class="wi-actions"><button class="wi-btn" id="again">Play Again</button><button class="wi-btn secondary" id="vault">Return to Game Vault</button></div>`;
 document.getElementById("again").addEventListener("click",()=>{state.round=0;state.score=0;state.streak=0;state.clue=0;state.done.clear();state.confidence="Strong";state.firstGuesses=0;intro()});document.getElementById("vault").addEventListener("click",()=>location.href="/examine-the-past-home/games/");
}
if(sfxBtn)sfxBtn.addEventListener("click",()=>{state.sfx=!state.sfx;sfxBtn.textContent=state.sfx?"SFX: On":"SFX: Off";if(state.sfx)tone(360,.06)});
update("Briefing");intro();
})();