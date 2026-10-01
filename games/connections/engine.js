(()=>{
const cfg=window.CONNECTIONS_CONFIG;if(!cfg)return;
const stage=document.getElementById("connectionsStage");
const roundEl=document.getElementById("roundValue");
const scoreEl=document.getElementById("scoreValue");
const streakEl=document.getElementById("streakValue");
const linksEl=document.getElementById("linksValue");
const phaseEl=document.getElementById("phaseValue");
const soundBtn=document.getElementById("soundToggle");
const state={round:0,score:0,streak:0,totalLinks:0,selectedLeft:null,selectedRight:null,matches:new Map(),wrong:0,sound:true,challengeDone:false};
let ctx=null,burstTimer=null;
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function tone(freq=440,dur=.06,type="sine",gain=.024){if(!state.sound)return;try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(ctx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+dur);o.stop(ctx.currentTime+dur)}catch(e){}}
function good(){tone(440,.06);setTimeout(()=>tone(660,.08),70)}
function bad(){tone(150,.09,"square",.015)}
function burst(emo,title,sub){const old=document.querySelector(".cx-burst");if(old)old.remove();const d=document.createElement("div");d.className="cx-burst";d.innerHTML='<div class="emo">'+emo+'</div><b>'+esc(title)+'</b><span>'+esc(sub||"")+'</span>';document.body.appendChild(d);clearTimeout(burstTimer);burstTimer=setTimeout(()=>d.remove(),1300)}
function update(phase){if(roundEl)roundEl.textContent=(state.round+1)+"/"+cfg.rounds.length;if(scoreEl)scoreEl.textContent=state.score;if(streakEl)streakEl.textContent=state.streak;if(linksEl)linksEl.textContent=state.totalLinks;if(phaseEl&&phase)phaseEl.textContent=phase}
function renderIntro(){update("Briefing");stage.innerHTML=`
<div class="cx-head"><div><h2>Connection Briefing</h2><p>${esc(cfg.brief)}</p></div><button class="cx-btn" id="startConnections">Start Connecting</button></div>
<div class="cx-intro"><section class="cx-panel"><h3>How This Game Thinks</h3><p>${esc(cfg.question)}</p><div class="cx-rules">
<div class="cx-rule"><i>1</i><span>Tap one item on the left, then the matching historical connection on the right.</span></div>
<div class="cx-rule"><i>2</i><span>Correct links lock in and reveal why the relationship matters.</span></div>
<div class="cx-rule"><i>3</i><span>Build streaks for bonus points. Wrong links do not end the game—they sharpen the pattern.</span></div>
<div class="cx-rule"><i>4</i><span>A surprise cross-link challenge tests whether you can connect ideas across rounds.</span></div></div></section>
<aside class="cx-panel"><h3>Winning the Web</h3><p>Do not just memorize pairs. Look for the deeper relationship: cause and effect, exchange, leadership, alliance, migration, reform, or influence.</p><p><b>Goal:</b> complete every web and finish with the strongest possible Connection Score.</p></aside></div>`;
document.getElementById("startConnections").addEventListener("click",()=>{burst("🔗","Network Activated","Round 1 unlocked.");renderRound()})}
function current(){return cfg.rounds[state.round]}
function pairFor(leftId){return current().links[leftId]}
function node(side,item){
 const matched=[...state.matches.keys()].includes(item.id)||[...state.matches.values()].includes(item.id);
 const selected=side==="left"?state.selectedLeft===item.id:state.selectedRight===item.id;
 return `<button class="cx-node ${matched?"matched":""} ${selected?"selected":""}" data-side="${side}" data-id="${esc(item.id)}" ${matched?"disabled":""}><strong>${esc(item.label)}</strong><small>${esc(item.detail||"")}</small></button>`
}
function renderRound(){
 update("Connecting");state.selectedLeft=null;state.selectedRight=null;
 const r=current();
 const links=[...state.matches.entries()].map(([l,rid])=>{
  const a=r.left.find(x=>x.id===l),b=r.right.find(x=>x.id===rid),ex=r.links[l].explain;
  return `<div class="cx-link-row"><b>${esc(a.label)}</b><span class="arrow">↔</span><b>${esc(b.label)}</b><div class="cx-explain">${esc(ex)}</div></div>`
 }).join("");
 stage.innerHTML=`
 <div class="cx-head"><div><h2>${esc(r.title)}</h2><p>${esc(r.prompt)}</p></div><button class="cx-btn secondary" id="restartRound">Clear Selection</button></div>
 <div class="cx-columns">
  <section class="cx-column"><h3>${esc(r.leftLabel||"Connect From")}</h3><div class="cx-list">${r.left.map(x=>node("left",x)).join("")}</div></section>
  <section class="cx-column"><h3>${esc(r.rightLabel||"Connect To")}</h3><div class="cx-list">${r.right.map(x=>node("right",x)).join("")}</div></section>
 </div>
 <div class="cx-links"><h3>Connections Built: ${state.matches.size}/${r.left.length}</h3>${links||'<div class="cx-feedback">No links built yet. Choose one item from each side.</div>'}</div>
 ${state.matches.size===r.left.length?'<div class="cx-actions"><button class="cx-btn" id="nextRound">'+(state.round===cfg.rounds.length-1?"Finish Web":"Continue")+'</button></div>':""}`;
 stage.querySelectorAll(".cx-node[data-side]").forEach(b=>b.addEventListener("click",()=>selectNode(b.dataset.side,b.dataset.id)));
 document.getElementById("restartRound").addEventListener("click",()=>{state.selectedLeft=null;state.selectedRight=null;renderRound()});
 const next=document.getElementById("nextRound");if(next)next.addEventListener("click",advance);
}
function selectNode(side,id){
 if(side==="left")state.selectedLeft=state.selectedLeft===id?null:id;else state.selectedRight=state.selectedRight===id?null:id;
 if(state.selectedLeft&&state.selectedRight){checkPair();return}
 renderRound();
}
function checkPair(){
 const r=current(),p=r.links[state.selectedLeft],ok=p&&p.right===state.selectedRight;
 if(ok){
  state.matches.set(state.selectedLeft,state.selectedRight);state.totalLinks++;state.streak++;
  const bonus=Math.max(0,(state.streak-1)*5);state.score+=100+bonus;good();
  burst(state.streak>=4?"⚡":"🔗",state.streak>=4?"Connection Combo x"+state.streak:"Connection Locked",bonus?"+100 + "+bonus+" combo bonus":"+100 points");
 }else{
  state.wrong++;state.streak=0;state.score+=20;bad();burst("🧠","Pattern Check","+20 learning points — try a different relationship.");
 }
 state.selectedLeft=null;state.selectedRight=null;update("Connecting");renderRound();
}
function advance(){
 if(state.round===2&&cfg.challenge&&!state.challengeDone){renderChallenge();return}
 if(state.round<cfg.rounds.length-1){state.round++;state.matches.clear();burst("🕸️","New Web","A new relationship pattern is opening.");renderRound()}else renderSummary()
}
function renderChallenge(){
 update("Cross-Link");const q=cfg.challenge;
 stage.innerHTML=`<div class="cx-challenge"><div class="big">🧩</div><h3>Cross-Link Challenge</h3><p>${esc(q.question)}</p><div class="cx-options">${q.choices.map((c,i)=>'<button class="cx-option" data-opt="'+i+'">'+esc(c)+'</button>').join("")}</div><div id="challengeFeedback" class="cx-feedback hidden"></div><button class="cx-btn hidden" id="challengeNext" style="margin-top:13px">Continue Web</button></div>`;
 stage.querySelectorAll("[data-opt]").forEach(b=>b.addEventListener("click",()=>{
  if(state.challengeDone)return;state.challengeDone=true;const i=Number(b.dataset.opt),ok=i===q.answer;
  stage.querySelectorAll("[data-opt]").forEach((x,j)=>{x.disabled=true;if(j===q.answer)x.classList.add("correct")});b.classList.add(ok?"correct":"wrong");
  state.score+=ok?200:75;state.streak=ok?state.streak+1:0;ok?good():bad();
  burst(ok?"🌟":"📚",ok?"Deep Connection":"+75 Context Points",ok?"+200 bonus points":"Correct relationship revealed.");
  const fb=document.getElementById("challengeFeedback");fb.classList.remove("hidden");fb.classList.toggle("good",ok);fb.innerHTML=esc(q.explain);
  document.getElementById("challengeNext").classList.remove("hidden");update("Cross-Link");
 }));
 document.getElementById("challengeNext").addEventListener("click",()=>{state.round++;state.matches.clear();renderRound()});
}
function renderSummary(){
 update("Complete");
 const maxLinks=cfg.rounds.reduce((n,r)=>n+r.left.length,0),maxBase=maxLinks*100+200;
 const accuracy=Math.max(45,Math.round((maxLinks/(maxLinks+state.wrong))*100));
 const score=Math.min(100,Math.round((state.score/maxBase)*75)+Math.round(accuracy*.25));
 const rank=score>=92?"Master Connector":score>=82?"Network Historian":score>=70?"Pattern Builder":"Connection Explorer";
 stage.innerHTML=`<div class="cx-head"><div><h2>Web of History Complete</h2><p>You connected ${maxLinks} historical relationships across ${cfg.rounds.length} rounds.</p></div></div>
 <div class="cx-summary"><aside class="cx-score"><div class="cx-ring"><span>${score}</span></div><h3>${rank}</h3><p>Connection Score · ${accuracy}% first-pattern accuracy</p></aside>
 <article class="cx-report"><h3>${esc(cfg.title)}</h3><p>${esc(cfg.closing)}</p><ul>${cfg.takeaways.map(x=>'<li>'+esc(x)+'</li>').join("")}</ul><p><b>What this game measured:</b> your ability to recognize historically meaningful relationships—not just isolated facts.</p></article></div>
 <div class="cx-actions"><button class="cx-btn" id="playAgain">Play Again</button><button class="cx-btn secondary" id="vaultBtn">Return to Game Vault</button></div>`;
 document.getElementById("playAgain").addEventListener("click",()=>{state.round=0;state.score=0;state.streak=0;state.totalLinks=0;state.matches.clear();state.wrong=0;state.challengeDone=false;renderIntro()});
 document.getElementById("vaultBtn").addEventListener("click",()=>location.href="/examine-the-past-home/games/");
}
if(soundBtn)soundBtn.addEventListener("click",()=>{state.sound=!state.sound;soundBtn.textContent=state.sound?"Sound: On":"Sound: Off";if(state.sound)tone(380,.06)});
update("Briefing");renderIntro();
})();