(()=>{"use strict";const KEY="etp.hall.guide-seen.v1",reduce=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;let step=0,visible=false,previous=null;
const steps=[
 {target:".hv-scene[data-chapter='1'] .hv-head",title:"Welcome to Ancient Courts",message:"Begin here and travel upward through twelve chapters of Black history.",point:"bottom"},
 {target:".hv-scene[data-chapter='1'] .hv-bio-link",title:"Meet a Historical Figure",message:"Choose Bio Activity below a portrait to explore the person's history and make decisions.",point:"bottom"},
 {target:".hv-scene[data-chapter='1'] .hv-head",title:"Continue Upward",message:"Scroll upward to explore earlier and later historical connections across the Hall.",point:"bottom"},
 {target:"#hv-scorebar .hv-score-title",title:"Your Legacy Ledger",message:"Keep track of earned Alliances here. Use the small arrows at the right to jump around the Hall.",point:"bottom"}
];
const overlay=document.createElement("div");overlay.id="hv-guide-layer";overlay.hidden=true;overlay.innerHTML='<div class="hv-guide-bubble" role="dialog" aria-modal="false" aria-label="Hall introduction" tabindex="-1"><div class="hv-guide-step-count"></div><h3 class="hv-guide-title"></h3><p class="hv-guide-message"></p><div class="hv-guide-actions"><button type="button" class="hv-guide-skip">End Guide</button><button type="button" class="hv-guide-next">Next →</button></div></div>';document.body.append(overlay);
const bubble=overlay.querySelector(".hv-guide-bubble");
function position(){if(!visible)return;let target=document.querySelector(steps[step].target);if(!target)return;const rect=target.getBoundingClientRect(),width=Math.min(355,innerWidth-28);bubble.style.width=width+"px";const top=rect.bottom+16;const h=bubble.offsetHeight;const maxTop=Math.max(10,innerHeight-h-18);const placeBelow=top<=maxTop;let y=placeBelow?top:Math.max(12,rect.top-h-18),x=Math.max(12,Math.min(innerWidth-width-12,rect.left+rect.width/2-width/2));bubble.style.left=x+"px";bubble.style.top=y+"px";bubble.dataset.arrow=placeBelow?"above":"below";}
function show(i){step=i;let t=document.querySelector(steps[i].target);if(!t){finish();return}visible=true;overlay.hidden=false;const d=steps[i];overlay.querySelector(".hv-guide-step-count").textContent="HOW TO EXPLORE · "+(i+1)+" / "+steps.length;overlay.querySelector(".hv-guide-title").textContent=d.title;overlay.querySelector(".hv-guide-message").textContent=d.message;overlay.querySelector(".hv-guide-next").textContent=i===steps.length-1?"Start Exploring ✓":"Next →";if(i!==3)t.scrollIntoView({behavior:reduce()?"auto":"smooth",block:"center"});setTimeout(()=>{position();bubble.focus({preventScroll:true})},reduce()?0:380);}
function finish(){visible=false;overlay.hidden=true;document.body.classList.remove("hv-guide-active");try{localStorage.setItem(KEY,"yes")}catch{};const first=document.querySelector(".hv-scene[data-chapter=\"1\"] .hv-head");if(first){first.setAttribute("tabindex","-1");first.focus({preventScroll:true});}}
function begin(){previous=document.activeElement;document.body.classList.add("hv-guide-active");show(0)}
overlay.querySelector(".hv-guide-skip").addEventListener("click",finish);
overlay.querySelector(".hv-guide-next").addEventListener("click",()=>step===steps.length-1?finish():show(step+1));
document.addEventListener("keydown",e=>{if(!visible)return;if(e.key==="Escape"){e.preventDefault();finish()}});
window.addEventListener("resize",position);
window.addEventListener("scroll",()=>{if(visible)requestAnimationFrame(position)},{passive:true});
let launched=false;
document.addEventListener("etp-hall-ready",()=>{if(launched)return;launched=true;const entrance=document.querySelector("#hv-entrance");if(entrance&&!document.querySelector("#hv-guide-launch")){const btn=document.createElement("button");btn.type="button";btn.id="hv-guide-launch";btn.className="hv-guide-launch";btn.textContent="How to Explore the Hall";btn.addEventListener("click",begin);entrance.prepend(btn);}
let seen=false;try{seen=localStorage.getItem(KEY)==="yes"}catch{}
if(!seen&&!location.hash){setTimeout(()=>{if(!visible)begin()},800)}
});
})();