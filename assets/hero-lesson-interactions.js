(()=>{"use strict";
const wrap=document.querySelector(".mk-wrap"),sections=[...document.querySelectorAll(".mk-step[id]")];if(!wrap||!sections.length)return;
document.body.classList.add("mk-interactive");
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const dock=document.createElement("div");dock.id="mk-progress-dock";dock.className="mk-progress-dock";
dock.innerHTML='<div class="mk-progress-line"><span id="mk-progress-label">Lesson progress</span><span><strong id="mk-progress-percent">0%</strong> <button id="mk-audio-toggle" type="button" style="background:#153a28;color:#fff200;border:1px solid #94ff53;border-radius:6px;padding:5px 9px;cursor:pointer">Sound: On</button></span></div><div id="mk-progress-track" class="mk-progress-track" role="progressbar" aria-label="Lesson reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="mk-progress-fill" class="mk-progress-fill"></span></div>';
wrap.insertBefore(dock,wrap.querySelector(".mk-hero")||wrap.firstChild);
let sound=true;try{sound=localStorage.getItem("etp-sfx")!=="off"}catch{}
const toggle=document.getElementById("mk-audio-toggle");function audioLabel(){toggle.textContent=sound?"Sound: On":"Sound: Off";toggle.setAttribute("aria-pressed",String(sound))}audioLabel();
toggle.onclick=()=>{sound=!sound;audioLabel();try{localStorage.setItem("etp-sfx",sound?"on":"off")}catch{}};
let ctx;
function cue(type){
 if(!sound)return;
 try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();if(ctx.state==="suspended")ctx.resume();
 const now=ctx.currentTime;let notes=type==="correct"?[[523,0,.14,.07,523],[659,.11,.14,.08,659],[784,.23,.22,.08,1047]]:type==="wrong"?[[340,0,.19,.045,185],[220,.16,.24,.06,95]]:[[130,0,.4,.14,42],[70,.05,.3,.08,35]];
 for(const [f,t,d,volume,end] of notes){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type==="wrong"?"sawtooth":"triangle";o.frequency.setValueAtTime(f,now+t);o.frequency.exponentialRampToValueAtTime(end,now+t+d);g.gain.setValueAtTime(.001,now+t);g.gain.exponentialRampToValueAtTime(volume,now+t+.016);g.gain.exponentialRampToValueAtTime(.001,now+t+d);o.connect(g).connect(ctx.destination);o.start(now+t);o.stop(now+t+d+.02)}
 }catch{}
}
function celebrate(target){if(reduced)return;const field=document.createElement("div");field.className="mk-confetti-field";field.setAttribute("aria-hidden","true");document.body.append(field);const r=target.getBoundingClientRect(),x=r.left+r.width/2,y=Math.min(innerHeight-40,Math.max(35,r.top+20));
 for(let i=0;i<33;i++){const b=document.createElement("i");b.className="mk-confetti-bit";b.style.background=["#fff200","#94ff53","#fff"][i%3];b.style.left=x+"px";b.style.top=y+"px";const a=i*Math.PI*2/33,d=70+Math.random()*165;b.style.setProperty("--dx",Math.cos(a)*d+"px");b.style.setProperty("--dy",Math.sin(a)*d+60+"px");b.style.setProperty("--rot",Math.random()*720+"deg");field.append(b)}
 setTimeout(()=>field.remove(),1200)}
for(const q of document.querySelectorAll(".mk-question")){
 const b=q.querySelector(".mk-check"),f=q.querySelector(".mk-feedback");if(!b||!f)continue;let awarded=false;
 b.addEventListener("click",()=>queueMicrotask(()=>{
 const checked=q.querySelectorAll("input:checked").length;if(!checked){f.textContent="Choose an option before checking.";return}
 const ok=q.dataset.passed==="true";q.classList.toggle("mk-success",ok);q.classList.toggle("mk-incorrect",!ok);f.classList.toggle("mk-positive",ok);f.classList.toggle("mk-negative",!ok);
 const msg=q.dataset.explain||"Review the evidence and try again.";f.replaceChildren();const strong=document.createElement("strong");strong.textContent=ok?"✓ Correct. ":"Review the evidence and try again. ";if(ok)strong.className="mk-checkmark";f.append(strong,document.createTextNode(msg));
 if(ok&&!awarded){cue("correct");celebrate(b);awarded=true}else if(!ok)cue("wrong");
 }));
 q.querySelectorAll("input").forEach(i=>i.addEventListener("change",()=>{q.classList.remove("mk-success","mk-incorrect");f.classList.remove("mk-positive","mk-negative");q.dataset.checked="false";q.dataset.passed="false";f.textContent="Answer changed. Check again to confirm your choice.";awarded=false}));
}
let maxProgress=0;
function updateProgress(){const at=scrollY+Math.min(innerHeight*.4,300);let current=0;for(let i=0;i<sections.length;i++)if(sections[i].getBoundingClientRect().top+scrollY<=at)current=i;
 const a=sections[current].getBoundingClientRect().top+scrollY,b=sections[current+1]?.getBoundingClientRect().top+scrollY||document.documentElement.scrollHeight;
 const fraction=Math.max(0,Math.min(1,(at-a)/Math.max(1,b-a)));maxProgress=Math.max(maxProgress,Math.min(100,Math.floor(100*(current+fraction)/sections.length)));
 document.getElementById("mk-progress-label").textContent="Section "+(current+1)+" of "+sections.length;
 document.getElementById("mk-progress-percent").textContent=maxProgress+"%";document.getElementById("mk-progress-fill").style.width=maxProgress+"%";document.getElementById("mk-progress-track").setAttribute("aria-valuenow",String(maxProgress))}
addEventListener("scroll",updateProgress,{passive:true});addEventListener("resize",updateProgress);updateProgress();
const plan=[["lesson-start",2,true],["reading-one",2,true],["reading-two",2,true],["branch-one",4,false],["branch-two",4,false],["synthesis",12,false],["finish",8,false]];
let active=null,interval=null;
function stop(){if(interval)clearInterval(interval);interval=null;if(active){active.start.hidden=false;active.pause.hidden=true;active=null}}
for(const [id,min,q] of plan){const section=document.getElementById(id);if(!section)continue;let target=q?section.querySelector(".mk-question"):section.querySelector(".mk-branch-controls,.mk-response,#mk-final-test");if(!target)continue;
 const panel=document.createElement("div");panel.className="mk-timer-panel";panel.innerHTML='<div class="mk-timer-row"><strong style="color:#fff200">Optional Timer</strong><output class="mk-timer-readout" aria-label="Time remaining"></output><button class="mk-timer-start">Activate Timer</button><button class="mk-timer-pause" hidden>Pause</button><button class="mk-timer-reset">Reset</button><label style="color:#f0f4ef">Minutes <select class="mk-timer-minutes" aria-label="Choose timer duration" style="background:#eff5ed;color:#183023;border-radius:5px;padding:5px"></select></label></div><p class="mk-timer-note">Optional countdown. Answers and scoring are unaffected.</p>';
 target.before(panel);const select=panel.querySelector("select");for(const n of [1,2,3,4,5,6,8,10,12,15,20,25,30]){const o=document.createElement("option");o.value=n;o.textContent=n+" min";o.selected=n===min;select.append(o)}
 const t={left:min*60,total:min*60,panel,start:panel.querySelector(".mk-timer-start"),pause:panel.querySelector(".mk-timer-pause"),out:panel.querySelector("output"),note:panel.querySelector(".mk-timer-note")};
 const display=()=>t.out.textContent=String(Math.floor(t.left/60)).padStart(2,"0")+":"+String(t.left%60).padStart(2,"0");display();
 t.start.onclick=()=>{if(active)stop();if(!t.left)t.left=t.total;active=t;const end=performance.now()+t.left*1000;t.start.hidden=true;t.pause.hidden=false;t.panel.classList.remove("mk-time-expired");t.note.textContent="Countdown active. Keep working at your own pace.";
 interval=setInterval(()=>{t.left=Math.max(0,Math.ceil((end-performance.now())/1000));display();if(t.left===0){stop();t.panel.classList.add("mk-time-expired");t.note.textContent="Time is up. You can continue, or reset and try again.";cue("thud")}},250)};
 t.pause.onclick=()=>{if(active!==t)return;stop();t.note.textContent="Timer paused; resume when ready.";display()};
 panel.querySelector(".mk-timer-reset").onclick=()=>{if(active===t)stop();t.left=t.total;display();t.panel.classList.remove("mk-time-expired");t.note.textContent="Ready to start when you choose."};
 select.onchange=()=>{if(active===t)stop();t.total=Number(select.value)*60;t.left=t.total;display();t.panel.classList.remove("mk-time-expired")};
}
addEventListener("pagehide",()=>{stop();if(ctx)ctx.close().catch(()=>{})});
})();