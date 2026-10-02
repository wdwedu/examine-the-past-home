(()=>{
const cfg=window.MAP_QUEST_CONFIG;if(!cfg)return;
const stage=document.getElementById("mapQuestStage");
const roundEl=document.getElementById("roundValue"),scoreEl=document.getElementById("scoreValue"),streakEl=document.getElementById("streakValue"),pinsEl=document.getElementById("pinsValue"),phaseEl=document.getElementById("phaseValue");
const sfxBtn=document.getElementById("sfxToggle");
const state={round:0,score:0,streak:0,pins:0,wrong:0,sfx:true,challengeDone:false};
let ctx=null,burstTimer=null;
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function tone(freq=420,dur=.07,type="sine",gain=.022){if(!state.sfx)return;try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(ctx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+dur);o.stop(ctx.currentTime+dur)}catch(e){}}
function good(){tone(440,.06);setTimeout(()=>tone(660,.08),70)} function bad(){tone(150,.09,"square",.014)}
function burst(emo,title,sub){document.querySelector(".mq-burst")?.remove();const d=document.createElement("div");d.className="mq-burst";d.innerHTML='<div class="emo">'+emo+'</div><b>'+esc(title)+'</b><span>'+esc(sub||"")+'</span>';document.body.appendChild(d);clearTimeout(burstTimer);burstTimer=setTimeout(()=>d.remove(),1300)}
function update(phase){roundEl.textContent=(state.round+1)+"/"+cfg.rounds.length;scoreEl.textContent=state.score;streakEl.textContent=state.streak;pinsEl.textContent=state.pins;if(phase)phaseEl.textContent=phase}
function intro(){update("Briefing");stage.innerHTML=`
<div class="mq-head"><div><h2>Map Briefing</h2><p>${esc(cfg.brief)}</p></div><button class="mq-btn" id="startMap">Start Quest</button></div>
<div class="mq-intro"><section class="mq-panel"><h3>How to Play</h3><p>${esc(cfg.question)}</p>
<div class="mq-rules"><div class="mq-rule"><i>1</i><span>Read the geographic clue.</span></div><div class="mq-rule"><i>2</i><span>Choose the location that best matches the evidence.</span></div><div class="mq-rule"><i>3</i><span>Correct choices drop a map pin and reveal why geography mattered.</span></div><div class="mq-rule"><i>4</i><span>Build a streak, pass the Map Lens challenge, and finish with a Map Mastery score.</span></div></div></section>
<aside class="mq-panel"><h3>Map Lens</h3><p>These games are not just about naming places. You are using rivers, coasts, mountains, trade corridors, climate, distance, and strategic position as historical evidence.</p></aside></div>`;
document.getElementById("startMap").addEventListener("click",()=>{burst("🧭","Map Activated","First clue unlocked.");renderRound()})}
function renderRound(){
 const r=cfg.rounds[state.round];update("Locating");
 stage.innerHTML=`<div class="mq-head"><div><h2>${esc(r.title)}</h2><p>${esc(r.prompt)}</p></div><button class="mq-btn secondary" id="briefBtn">Map Brief</button></div>
 <section class="mq-map"><div class="compass"></div><div class="mq-clue"><b>${esc(r.clueTitle)}</b><span>${esc(r.clue)}</span></div>
 <div class="mq-grid">${r.places.map((p,i)=>`<button class="mq-place" data-place="${i}"><span class="pin">📍</span><strong>${esc(p.name)}</strong><small>${esc(p.detail)}</small></button>`).join("")}</div>
 <div id="mqFeedback" class="mq-feedback">Use the clue to place the correct pin.</div></section>`;
 document.getElementById("briefBtn").addEventListener("click",intro);
 stage.querySelectorAll("[data-place]").forEach(b=>b.addEventListener("click",()=>choose(r,Number(b.dataset.place),b)));
}
function choose(r,i,b){
 stage.querySelectorAll("[data-place]").forEach(x=>x.disabled=true);
 if(i===r.answer){b.classList.add("correct");state.streak++;state.pins++;const bonus=Math.max(0,(state.streak-1)*10);state.score+=100+bonus;good();burst(state.streak>=3?"🔥":"📍",state.streak>=3?"Map Streak x"+state.streak:"Correct Location",bonus?"+100 + "+bonus+" streak bonus":"+100 points");showResult(r,true)}
 else{b.classList.add("wrong");state.wrong++;state.streak=0;state.score+=30;bad();stage.querySelector('[data-place="'+r.answer+'"]').classList.add("correct");burst("🧠","Map Reframed","+30 learning points");showResult(r,false)}
 update("Located");
}
function showResult(r,ok){
 const fb=document.getElementById("mqFeedback");fb.classList.toggle("good",ok);fb.innerHTML=(ok?"<b>Pin placed.</b> ":"<b>Correct location revealed.</b> ")+esc(r.explain);
 const actions=document.createElement("div");actions.className="mq-actions";actions.innerHTML='<button class="mq-btn" id="nextMap">'+(state.round===cfg.rounds.length-1?"Finish Quest":"Continue")+'</button>';fb.after(actions);
 document.getElementById("nextMap").addEventListener("click",advance);
}
function advance(){
 if(state.round===1&&cfg.challenge&&!state.challengeDone){renderChallenge();return}
 if(state.round<cfg.rounds.length-1){state.round++;burst("🌍","New Region","Next map clue opened.");renderRound()}else renderSummary()
}
function renderChallenge(){
 update("Map Lens");const q=cfg.challenge;stage.innerHTML=`<div class="mq-challenge"><div class="big">🗺️</div><h3>Map Lens Challenge</h3><p>${esc(q.question)}</p><div class="mq-options">${q.choices.map((c,i)=>'<button class="mq-option" data-opt="'+i+'">'+esc(c)+'</button>').join("")}</div><div id="lensFeedback" class="mq-feedback hidden"></div><button class="mq-btn hidden" id="lensNext" style="margin-top:13px">Continue Quest</button></div>`;
 stage.querySelectorAll("[data-opt]").forEach(b=>b.addEventListener("click",()=>{if(state.challengeDone)return;state.challengeDone=true;const i=Number(b.dataset.opt),ok=i===q.answer;stage.querySelectorAll("[data-opt]").forEach((x,j)=>{x.disabled=true;if(j===q.answer)x.classList.add("correct")});b.classList.add(ok?"correct":"wrong");state.score+=ok?175:60;state.streak=ok?state.streak+1:0;ok?good():bad();burst(ok?"🌟":"📚",ok?"Map Insight":"+60 Context Points",ok?"+175 bonus points":"Correct map logic revealed.");const f=document.getElementById("lensFeedback");f.classList.remove("hidden");f.classList.toggle("good",ok);f.innerHTML=esc(q.explain);document.getElementById("lensNext").classList.remove("hidden");update("Map Lens")}));
 document.getElementById("lensNext").addEventListener("click",()=>{state.round++;renderRound()});
}
function renderSummary(){
 update("Complete");const max=cfg.rounds.length*100+175;const accuracy=Math.max(45,Math.round(cfg.rounds.length/(cfg.rounds.length+state.wrong)*100));const score=Math.min(100,Math.round((state.score/max)*78)+Math.round(accuracy*.22));const rank=score>=92?"Master Cartographer":score>=82?"Historical Geographer":score>=70?"Map Investigator":"Route Explorer";
 stage.innerHTML=`<div class="mq-head"><div><h2>Map Quest Complete</h2><p>You used geography as historical evidence across ${cfg.rounds.length} map challenges.</p></div></div><div class="mq-summary"><aside class="mq-score"><div class="mq-ring"><span>${score}</span></div><h3>${rank}</h3><p>Map Mastery · ${accuracy}% location accuracy</p></aside><article class="mq-report"><h3>${esc(cfg.title)}</h3><p>${esc(cfg.closing)}</p><ul>${cfg.takeaways.map(x=>'<li>'+esc(x)+'</li>').join("")}</ul></article></div><div class="mq-actions"><button class="mq-btn" id="again">Play Again</button><button class="mq-btn secondary" id="vault">Return to Game Vault</button></div>`;
 document.getElementById("again").addEventListener("click",()=>{Object.assign(state,{round:0,score:0,streak:0,pins:0,wrong:0,challengeDone:false});intro()});document.getElementById("vault").addEventListener("click",()=>location.href="/examine-the-past-home/games/");
}
if(sfxBtn)sfxBtn.addEventListener("click",()=>{state.sfx=!state.sfx;sfxBtn.textContent=state.sfx?"SFX: On":"SFX: Off";if(state.sfx)tone(360,.06)});
update("Briefing");intro();
})();