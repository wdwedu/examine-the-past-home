(()=>{
const cfg=window.ESCAPE_CONFIG;if(!cfg)return;
const stage=document.getElementById("escapeStage");
const levelEl=document.getElementById("levelValue"),scoreEl=document.getElementById("scoreValue"),dangerEl=document.getElementById("dangerValue"),itemsEl=document.getElementById("itemsValue"),phaseEl=document.getElementById("phaseValue");
const sfxBtn=document.getElementById("sfxToggle");
const state={level:0,score:0,danger:0,items:[],solved:new Set(),sequence:[],attempts:0,sfx:true,finalDone:false};
let ctx=null,burstTimer=null;
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function tone(freq=420,dur=.07,type="sine",gain=.022){if(!state.sfx)return;try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(ctx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+dur);o.stop(ctx.currentTime+dur)}catch(e){}}
function good(){tone(430,.06);setTimeout(()=>tone(640,.08),70)}
function bad(){tone(145,.1,"square",.014)}
function burst(emo,title,sub){document.querySelector(".escape-burst")?.remove();const d=document.createElement("div");d.className="escape-burst";d.innerHTML='<div class="emo">'+emo+'</div><b>'+esc(title)+'</b><span>'+esc(sub||"")+'</span>';document.body.appendChild(d);clearTimeout(burstTimer);burstTimer=setTimeout(()=>d.remove(),1350)}
function update(phase){if(levelEl)levelEl.textContent=Math.min(state.level+1,cfg.stages.length)+"/"+cfg.stages.length;if(scoreEl)scoreEl.textContent=state.score;if(dangerEl)dangerEl.textContent=state.danger+"%";if(itemsEl)itemsEl.textContent=state.items.length;if(phaseEl&&phase)phaseEl.textContent=phase}
function intro(){update("Briefing");stage.innerHTML=`
<div class="escape-head"><div><h2>Mission Briefing</h2><p>${esc(cfg.brief)}</p></div><button class="escape-btn" id="beginEscape">Begin Mission</button></div>
<div class="escape-intro">
 <section class="escape-card"><h3>${esc(cfg.objectiveTitle||"Your Objective")}</h3><p>${esc(cfg.objective)}</p>
 <div class="escape-rules"><div class="escape-rule"><i>1</i><span>Read each historical clue before answering the lock.</span></div><div class="escape-rule"><i>2</i><span>Correct answers unlock an inventory item you will need at the end.</span></div><div class="escape-rule"><i>3</i><span>Wrong attempts raise the danger meter but also reveal more context.</span></div><div class="escape-rule"><i>4</i><span>Reach the final lock and use what you learned to escape.</span></div></div></section>
 <aside class="escape-card"><h3>Mission Rules</h3><p>This is an evidence-and-decision game, not a speed quiz. Your score rewards careful historical reasoning more than guessing.</p>${cfg.sensitivityNote?'<div class="sensitivity-note">'+esc(cfg.sensitivityNote)+'</div>':""}</aside>
</div>`;
document.getElementById("beginEscape").addEventListener("click",()=>{burst("🔐","Mission Started","First lock opened.");renderStage()})}
function inventory(){
 const slots=cfg.stages.map((x,i)=>{
  const got=state.items.find(y=>y.stage===i);
  return '<div class="inventory-slot '+(got?"filled":"")+'"><b>'+(got?esc(got.icon+" "+got.item):"LOCKED ITEM")+'</b>'+(got?esc(got.note):"Solve this stage to unlock.")+'</div>'
 }).join("");
 return `<aside class="inventory"><h3>Mission Inventory</h3>${slots}<div class="danger-track"><h4>Danger Meter · ${state.danger}%</h4><div class="danger-bar"><span style="width:${Math.min(100,state.danger)}%"></span></div></div></aside>`;
}
function choicePuzzle(st){
 return '<div class="choice-grid">'+st.choices.map((c,i)=>'<button class="escape-choice" data-choice="'+i+'">'+esc(c)+'</button>').join("")+'</div>';
}
function codePuzzle(st){
 return '<div class="code-row"><input class="code-input" id="codeInput" inputmode="'+(st.numeric?"numeric":"text")+'" autocomplete="off" placeholder="'+esc(st.placeholder||"Enter code")+'" aria-label="Enter lock code"><button class="escape-btn" id="submitCode">Unlock</button></div>';
}
function sequencePuzzle(st){
 return '<div class="sequence-grid">'+st.items.map((x,i)=>'<button class="sequence-item" data-seq="'+i+'">'+esc(x)+'</button>').join("")+'</div><div class="sequence-picked">Order selected: <span id="seqPicked">none</span></div><div class="escape-actions"><button class="escape-btn" id="checkSequence">Check Order</button><button class="escape-btn secondary" id="clearSequence">Clear</button></div>';
}
function renderStage(){
 const st=cfg.stages[state.level];if(!st){renderFinal();return}
 update("Locked Room");state.sequence=[];
 const puzzle=st.type==="code"?codePuzzle(st):st.type==="sequence"?sequencePuzzle(st):choicePuzzle(st);
 stage.innerHTML=`
 <div class="escape-head"><div><h2>${esc(st.title)}</h2><p>${esc(st.scene)}</p></div><button class="escape-btn secondary" id="briefBtn">Mission Brief</button></div>
 <div class="room-wrap">${inventory()}<section class="room"><div class="room-top"><b>Stage ${state.level+1} · ${esc(st.type.toUpperCase())} LOCK</b><span>${esc(st.reward.icon)} Item Ahead</span></div>
 <article class="clue-sheet"><h3>${esc(st.clueTitle)}</h3><p>${esc(st.clue)}</p><p class="hint">${esc(st.hint)}</p></article>
 <div class="puzzle"><h4>${esc(st.question)}</h4>${puzzle}<div id="stageFeedback" class="escape-feedback">Solve the lock to continue.</div></div></section></div>`;
 document.getElementById("briefBtn").addEventListener("click",intro);
 if(st.type==="choice")stage.querySelectorAll("[data-choice]").forEach(b=>b.addEventListener("click",()=>attemptChoice(st,Number(b.dataset.choice),b)));
 if(st.type==="code")document.getElementById("submitCode").addEventListener("click",()=>attemptCode(st));
 if(st.type==="sequence"){
   stage.querySelectorAll("[data-seq]").forEach(b=>b.addEventListener("click",()=>pickSequence(st,Number(b.dataset.seq),b)));
   document.getElementById("clearSequence").addEventListener("click",()=>{state.sequence=[];renderStage()});
   document.getElementById("checkSequence").addEventListener("click",()=>attemptSequence(st));
 }
}
function reward(st){
 if(state.solved.has(state.level))return;
 state.solved.add(state.level);state.items.push({stage:state.level,...st.reward});state.score+=100;good();burst(st.reward.icon||"🗝️","Item Unlocked",st.reward.item+" added to inventory.");
 update("Unlocked");
 const fb=document.getElementById("stageFeedback");fb.classList.add("good");fb.innerHTML='<b>Unlocked.</b> '+esc(st.explain);
 stage.querySelectorAll("button,input").forEach(x=>{if(x.id!=="briefBtn")x.disabled=true});
 const actions=document.createElement("div");actions.className="escape-actions";actions.innerHTML='<button class="escape-btn" id="continueStage">'+(state.level===cfg.stages.length-1?"Approach Final Lock":"Continue")+'</button>';
 fb.after(actions);document.getElementById("continueStage").addEventListener("click",()=>{state.level++;renderStage()});
}
function wrong(st,msg){
 state.attempts++;state.danger=Math.min(100,state.danger+(st.danger||12));state.score=Math.max(0,state.score-10);bad();burst("⚠️","Wrong Turn","Danger rises to "+state.danger+"%.");
 update("Locked Room");const fb=document.getElementById("stageFeedback");fb.innerHTML='<b>Not yet.</b> '+esc(msg||st.wrong||"Re-read the clue and try again.");
}
function attemptChoice(st,i,b){if(i===st.answer){b.classList.add("correct");reward(st)}else{b.classList.add("wrong");b.disabled=true;wrong(st,st.wrong)}}
function attemptCode(st){const input=document.getElementById("codeInput");const val=(input.value||"").trim().toLowerCase();const ans=String(st.answer).trim().toLowerCase();if(val===ans)reward(st);else{input.select();wrong(st,st.wrong)}}
function pickSequence(st,i,b){if(state.sequence.includes(i))return;state.sequence.push(i);b.classList.add("selected");b.disabled=true;document.getElementById("seqPicked").textContent=state.sequence.map(x=>st.items[x]).join(" → ")}
function attemptSequence(st){const ok=state.sequence.length===st.answer.length&&state.sequence.every((v,i)=>v===st.answer[i]);if(ok)reward(st);else{wrong(st,st.wrong);state.sequence=[];setTimeout(renderStage,450)}}
function renderFinal(){
 update("Final Lock");const q=cfg.finalLock;
 stage.innerHTML=`<div class="final-lock"><div class="big">${esc(q.icon||"🚪")}</div><h3>Final Lock</h3><p>${esc(q.question)}</p><div class="choice-grid">${q.choices.map((c,i)=>'<button class="escape-choice" data-final="'+i+'">'+esc(c)+'</button>').join("")}</div><div id="finalFeedback" class="escape-feedback hidden"></div></div>`;
 stage.querySelectorAll("[data-final]").forEach(b=>b.addEventListener("click",()=>{if(state.finalDone)return;const i=Number(b.dataset.final);if(i===q.answer){state.finalDone=true;state.score+=200;good();b.classList.add("correct");burst("🚪","Escape Route Open","+200 final-lock bonus");const fb=document.getElementById("finalFeedback");fb.classList.remove("hidden");fb.classList.add("good");fb.innerHTML='<b>Unlocked.</b> '+esc(q.explain);setTimeout(renderSummary,800)}else{b.classList.add("wrong");b.disabled=true;wrong(q,q.wrong||"Use the evidence collected across the mission.")}}));
}
function renderSummary(){
 update("Escaped");
 const max=cfg.stages.length*100+200;const raw=Math.round((state.score/max)*82)+(18-Math.min(18,Math.round(state.danger*.18)));const score=Math.max(40,Math.min(100,raw));
 const rank=score>=92?"Master Escape Historian":score>=82?"Archive Escape Specialist":score>=70?"Historical Problem Solver":"Evidence Pathfinder";
 stage.innerHTML=`<div class="escape-head"><div><h2>Mission Complete</h2><p>You opened every lock and escaped using historical evidence.</p></div></div>
 <div class="escape-summary"><aside class="escape-score"><div class="escape-ring"><span>${score}</span></div><h3>${rank}</h3><p>Escape Score · Danger ended at ${state.danger}%</p></aside>
 <article class="escape-report"><h3>${esc(cfg.title)}</h3><p>${esc(cfg.closing)}</p><ul>${cfg.takeaways.map(x=>'<li>'+esc(x)+'</li>').join("")}</ul><p><b>Inventory recovered:</b> ${state.items.map(x=>esc(x.icon+" "+x.item)).join(" · ")}</p></article></div>
 <div class="escape-actions"><button class="escape-btn" id="playAgain">Play Again</button><button class="escape-btn secondary" id="vaultBtn">Return to Game Vault</button></div>`;
 document.getElementById("playAgain").addEventListener("click",()=>{Object.assign(state,{level:0,score:0,danger:0,items:[],solved:new Set(),sequence:[],attempts:0,finalDone:false});intro()});
 document.getElementById("vaultBtn").addEventListener("click",()=>location.href="/examine-the-past-home/games/");
}
if(sfxBtn)sfxBtn.addEventListener("click",()=>{state.sfx=!state.sfx;sfxBtn.textContent=state.sfx?"SFX: On":"SFX: Off";if(state.sfx)tone(360,.06)});
update("Briefing");intro();
})();