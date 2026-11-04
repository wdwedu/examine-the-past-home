(()=>{"use strict";
if(document.getElementById("hv-guide-layer"))return;
const reduced=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
const steps=[
 {selector:'.hv-scene[data-chapter="1"] .hv-title-row',title:"Begin at Ancient Courts",message:"Start here with Queen Makeda, Piye and Shabaka. Follow the green arrow upward."},
 {selector:'.hv-scene[data-chapter="1"] #hv-queen-start .hv-bio-link',title:"Open Bio Activity",message:"Select Bio Activity to discover a person's story and explore their historical choices."},
 {selector:'.hv-scene[data-chapter="1"] [data-challenge-id="legacy-01"]',title:"Legacy Reflection",message:"Look for activities along the center of the floor. New challenges will appear here."},
 {selector:'#hv-scorebar .hv-score-title',title:"Your Legacy Ledger",message:"Track Alliances, Credits and Seals in the thin bar above the Hall. Use the arrows to move around."}
];
let current=-1,open=false;
const layer=document.createElement("div");layer.id="hv-guide-layer";layer.hidden=true;
layer.innerHTML='<section class="hv-guide-bubble" role="dialog" aria-label="How to explore the Hall" aria-modal="false" tabindex="-1"><button type="button" class="hv-guide-exit" aria-label="Close guide" title="Close guide">×</button><div class="hv-guide-counter"></div><div class="hv-guide-title"></div><p class="hv-guide-message"></p><div class="hv-guide-controls"><button type="button" class="hv-guide-next">Next</button></div></section>';
document.body.append(layer);const bubble=layer.querySelector(".hv-guide-bubble"),link=()=>document.getElementById("hv-guide-launch");
function rectFor(){const e=document.querySelector(steps[current]?.selector||"");return e?.getBoundingClientRect();}
function position(){if(!open)return;const r=rectFor();if(!r)return;const vw=innerWidth,vh=innerHeight,w=Math.min(290,vw-24);bubble.style.width=w+"px";
const bh=bubble.offsetHeight||170,spaceBelow=vh-r.bottom,spaceAbove=r.top;
let y,side;
if(spaceBelow>=bh+20){y=r.bottom+13;side="above"}
else if(spaceAbove>=bh+20){y=r.top-bh-13;side="below"}
else{y=Math.max(12,Math.min(vh-bh-12,r.top+(r.height/2)-bh/2));side="side"}
const x=Math.max(12,Math.min(vw-w-12,r.left+r.width/2-w/2));
bubble.style.left=x+"px";bubble.style.top=y+"px";bubble.dataset.pointer=side;
bubble.style.setProperty("--pointer-x",Math.max(18,Math.min(w-18,r.left+r.width/2-x))+"px");
}
function display(index){const e=document.querySelector(steps[index].selector);if(!e){end();return}current=index;open=true;layer.hidden=false;
const item=steps[index];layer.querySelector(".hv-guide-counter").textContent=(index+1)+" / "+steps.length;layer.querySelector(".hv-guide-title").textContent=item.title;layer.querySelector(".hv-guide-message").textContent=item.message;layer.querySelector(".hv-guide-next").textContent=index===steps.length-1?"Finish":"Next";
const rect=e.getBoundingClientRect();const visible=rect.bottom>78&&rect.top<innerHeight-62;
 if(!visible){e.scrollIntoView({block:index===0?"end":"center",behavior:reduced()?"instant":"smooth"});setTimeout(position,reduced()?30:410)}else position();
 requestAnimationFrame(position);bubble.focus({preventScroll:true});
}
function end(){open=false;layer.hidden=true;current=-1;link()?.focus({preventScroll:true});}
function start(){display(0);}
layer.querySelector(".hv-guide-next").addEventListener("click",()=>current===steps.length-1?end():display(current+1));
layer.querySelector(".hv-guide-exit").addEventListener("click",end);
document.addEventListener("click",e=>{if(e.target.closest("#hv-guide-launch")){e.preventDefault();start()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&open){e.preventDefault();end()}});
window.addEventListener("resize",position);
window.addEventListener("scroll",()=>{if(open)requestAnimationFrame(position)},{passive:true});
})();
