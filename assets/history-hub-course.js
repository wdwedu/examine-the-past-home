(()=>{"use strict";
function prepareUnits(){
 document.querySelectorAll("body.etp-curriculum details.etp-unit>summary").forEach(summary=>{
  if(summary.querySelector(".etp-unit-count"))return;
  const title=summary.textContent.trim();
  const match=title.match(/^(.*?)\s*[·|–-]\s*(\d+\s+(?:planned\s+)?lessons?)$/i);
  if(!match)return;
  const name=document.createElement("span");name.className="etp-unit-title";name.textContent=match[1].trim();
  const count=document.createElement("span");count.className="etp-unit-count";count.textContent=match[2];
  summary.replaceChildren(name,count);
 });
}
function reveal(){
 if(!location.hash||!location.hash.startsWith("#unit-"))return;
 let el;try{el=document.getElementById(decodeURIComponent(location.hash.slice(1)))}catch{return}
 if(!el||el.tagName!=="DETAILS")return;
 el.open=true;
 requestAnimationFrame(()=>el.scrollIntoView({block:"start",behavior:"auto"}));
}
function init(){prepareUnits();reveal()}
window.addEventListener("hashchange",reveal);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
})();