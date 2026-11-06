(()=>{"use strict";
const wrap=document.querySelector(".mk-wrap"),sections=[...document.querySelectorAll(".mk-step[id]")];if(!wrap||!sections.length)return;
document.body.classList.add("mk-interactive");
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const dock=document.createElement("div");dock.id="mk-progress-dock";dock.className="mk-progress-dock";
dock.innerHTML='<div class="mk-unified-row"><div class="mk-progress-group"><span id="mk-progress-label">Lesson progress</span><div id="mk-progress-track" class="mk-progress-track" role="progressbar" aria-label="Lesson reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="mk-progress-fill" class="mk-progress-fill"></span></div><strong id="mk-progress-percent">0%</strong></div><div class="mk-unified-timer"><label for="mk-timer-duration">Timer</label><select id="mk-timer-duration" aria-label="Set countdown duration"></select><output id="mk-timer-clock" aria-label="Time remaining" role="timer">01:00</output><button type="button" id="mk-timer-start">Start</button><button type="button" id="mk-timer-reset">Reset</button><button id="mk-audio-toggle" type="button" aria-label="Toggle lesson and timer sounds">Sound: On</button></div></div><p id="mk-timer-status" class="mk-timer-status" aria-live="polite"></p>';
const siteHeader=document.getElementById("etpSiteHeader");
if(siteHeader){siteHeader.insertAdjacentElement("afterend",dock)}else{document.body.prepend(dock)}
const positionDock=()=>{document.documentElement.style.setProperty("--mk-dock-top",(document.getElementById("etpSiteHeader")?.getBoundingClientRect().height||0)+"px")};
positionDock();addEventListener("resize",positionDock);if(window.ResizeObserver&&siteHeader)new ResizeObserver(positionDock).observe(siteHeader);
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
const choices=[15,20,...Array.from({length:10},(_,i)=>(i+1)*60),12*60,15*60,20*60,25*60,30*60,35*60,40*60,45*60];
const duration=document.getElementById("mk-timer-duration"),clock=document.getElementById("mk-timer-clock"),startButton=document.getElementById("mk-timer-start"),resetButton=document.getElementById("mk-timer-reset"),timerStatus=document.getElementById("mk-timer-status");
for(const seconds of choices){const opt=document.createElement("option");opt.value=String(seconds);opt.textContent=seconds<60?seconds+" sec":seconds/60+" min";duration.append(opt)}
duration.value="60";
let remaining=60,deadline=0,timerRunning=false,interval=null;
const renderClock=()=>{clock.textContent=String(Math.floor(remaining/60)).padStart(2,"0")+":"+String(remaining%60).padStart(2,"0")};
function stop(){if(interval!==null)clearInterval(interval);interval=null;timerRunning=false;startButton.textContent="Start";startButton.setAttribute("aria-label","Start or resume countdown")}
const reset=()=>{stop();remaining=Number(duration.value);renderClock();timerStatus.textContent="";dock.classList.remove("mk-time-expired")};
function timerDone(){stop();remaining=0;renderClock();timerStatus.textContent="Time is up!";dock.classList.add("mk-time-expired");cue("timer")}
function tick(){remaining=Math.max(0,Math.ceil((deadline-performance.now())/1000));renderClock();if(remaining===0)timerDone()}
startButton.addEventListener("click",()=>{if(timerRunning){tick();stop();timerStatus.textContent="Paused.";return}if(remaining<=0)remaining=Number(duration.value);
try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();if(ctx.state==="suspended")ctx.resume()}catch{}
deadline=performance.now()+remaining*1000;timerRunning=true;startButton.textContent="Pause";timerStatus.textContent="";dock.classList.remove("mk-time-expired");interval=setInterval(tick,200);renderClock()});
resetButton.addEventListener("click",reset);duration.addEventListener("change",reset);renderClock();
for(const [id,seconds] of [["lesson-start",20],["reading-one",8*60],["reading-two",8*60],["branch-one",2*60],["branch-two",2*60],["synthesis",8*60],["finish",5*60]]){
 const section=document.getElementById(id);if(!section)continue;
 const target=section.querySelector(".mk-question,.mk-branch-controls,.mk-response,#mk-final-test");
 if(!target)continue;
 const note=document.createElement("p");note.className="mk-timer-suggestion";note.textContent="Suggested timer: "+(seconds<60?seconds+" seconds":seconds/60+" minutes")+" · Use the timer in the toolbar above.";
 target.before(note);
}
addEventListener("pagehide",()=>{stop();if(ctx)ctx.close().catch(()=>{})});
})();