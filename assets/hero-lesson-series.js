/* Examine the Past — source-led Hero Lesson series interactions */
(()=>{"use strict";
const main=document.querySelector(".mk-wrap[data-hero-key]");if(!main)return;
const escape=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
for(const box of main.querySelectorAll(".mk-question")){
 const button=box.querySelector(".mk-check"),feedback=box.querySelector(".mk-feedback");
 if(!button||!feedback)continue;
 button.addEventListener("click",()=>{
  const selected=[...box.querySelectorAll("input")].flatMap((x,i)=>x.checked?[i]:[]);
  if(!selected.length){feedback.textContent="Choose an answer before checking.";box.dataset.checked="false";return}
  const expected=box.dataset.answer.split(",").map(Number);
  const ok=selected.length===expected.length&&selected.every(x=>expected.includes(x));
  box.dataset.checked="true";box.dataset.passed=String(ok);
  feedback.textContent=(ok?"Correct. ":"Review the evidence and try again. ")+box.dataset.explain;
 });
}
for(const button of main.querySelectorAll(".mk-branch")){
 button.addEventListener("click",()=>{
  const group=button.closest(".mk-step"),answer=group.querySelector(".mk-branch-outcome");
  if(!answer)return;
  const buttons=[...group.querySelectorAll(".mk-branch")];for(const b of buttons)b.setAttribute("aria-pressed",String(b===button));
  const heading=document.createElement("h3"),body=document.createElement("p"),prompt=document.createElement("p");
  heading.textContent=button.dataset.title||"Evidence-based decision";
  body.textContent=button.dataset.outcome||"Evaluate the consequences and uncertainty.";
  prompt.textContent=button.dataset.prompt||"Which evidence supports your decision?";
  answer.replaceChildren(heading,body,prompt);answer.hidden=false;answer.focus({preventScroll:true});
  answer.scrollIntoView({block:"nearest",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 });
}
const field=document.getElementById("mk-reflection"),save=document.getElementById("mk-save"),clear=document.getElementById("mk-clear"),status=document.getElementById("mk-save-status");
if(field&&save&&clear&&status){
 const key="etp.hero.lesson."+main.dataset.heroKey+".reflection.v1";
 try{field.value=localStorage.getItem(key)||""}catch{status.textContent="Local saving is unavailable. Copy your answer for safekeeping."}
 save.addEventListener("click",()=>{try{localStorage.setItem(key,field.value);status.textContent="Saved in this browser only. No answer was submitted online."}catch{status.textContent="Could not save. Copy your answer instead."}});
 clear.addEventListener("click",()=>{field.value="";try{localStorage.removeItem(key)}catch{}status.textContent="Local reflection cleared."});
}
const score=document.getElementById("mk-score"),result=document.getElementById("mk-score-result");
if(score&&result)score.addEventListener("click",()=>{
 const questions=[...main.querySelectorAll("#mk-final-test .mk-question")];
 const checked=questions.filter(q=>q.dataset.checked==="true");
 if(checked.length<questions.length){result.textContent="Check all five answers first ("+checked.length+"/5 checked).";return}
 const correct=questions.filter(q=>q.dataset.passed==="true").length;
 result.textContent=correct+"/5 correct. "+(correct>=4?"Knowledge target met. Complete your evidence-based claim and reflect on the rubric.":"Revisit the readings and explanations, then revise your answers.");
});
/* LOCKED LESSON TEMPLATE: six real section jumps, sticky-header safe. */
const stepNav=main.querySelector(".mk-steps-nav");
if(stepNav){
 const links=[...stepNav.querySelectorAll('a[href^="#"]')];
 const resolve=a=>{try{return document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)))}catch{return null}};
 const headerOffset=()=>Math.ceil((document.getElementById("etpSiteHeader")?.getBoundingClientRect().height||0)+(document.getElementById("mk-progress-dock")?.getBoundingClientRect().height||0)+16);
 const jump=(target,smooth=false)=>{
  const y=Math.max(0,window.scrollY+target.getBoundingClientRect().top-headerOffset());
  // An explicit target Y is essential: default hash navigation can hide the heading under both sticky bars.
  window.scrollTo({top:y,behavior:smooth&&!matchMedia("(prefers-reduced-motion: reduce)").matches?"smooth":"instant"});
 };
 for(const a of links){
  const target=resolve(a);
  if(!target){a.setAttribute("aria-disabled","true");continue}
  a.addEventListener("click",e=>{
   if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
   e.preventDefault();
   jump(target,false);
   history.replaceState(history.state,"",a.getAttribute("href"));
   for(const item of links){if(item===a)item.setAttribute("aria-current","location");else item.removeAttribute("aria-current")}
  });
 }
 // Support bookmarked sections and browser back/forward navigation.
 const onHash=()=>{if(!location.hash)return;const id=decodeURIComponent(location.hash.slice(1)),target=document.getElementById(id);if(target&&main.contains(target))requestAnimationFrame(()=>jump(target,false))};
 window.addEventListener("hashchange",onHash);
 if(location.hash)window.addEventListener("load",onHash,{once:true});
 // Mark current section as scrolling progresses without changing the user's URL.
 let queued=false;window.addEventListener("scroll",()=>{
  if(queued)return;queued=true;requestAnimationFrame(()=>{
   queued=false;let active=links[0];const offset=headerOffset()+28;
   for(const a of links){const section=resolve(a);if(section&&section.getBoundingClientRect().top<=offset)active=a}
   for(const a of links){if(a===active)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current")}
  })
 },{passive:true});
}
})();
