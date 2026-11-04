(()=>{"use strict";
const $=id=>document.getElementById(id);
const mk=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
const container=$("hv-journey"),overlay=$("hv-demo-overlay");
const siteRoot=document.body.dataset.siteRoot||"../../../",hallData=document.body.dataset.hallData||"../data/";
const markerTitles=["Legacy Reflection","Artifact Detective","Historical Crossroads","Evidence Vault","Chronology Check","Voices of Change","Connections Challenge","Primary Source Spotlight","Turning Point","Legacy Link","Cause & Consequence","History in Context"];
let lastFocus=null,installed=false;
function closePreview(){overlay.hidden=true;document.body.classList.remove("hv-demo-modal-open");lastFocus?.focus()}
function openPreview(name,dates,description,file){lastFocus=document.activeElement;$("hv-demo-name").textContent=name;$("hv-demo-dates").textContent=dates;$("hv-demo-desc").textContent=description;const img=$("hv-demo-image");if(img){img.hidden=!file;if(file){img.src=siteRoot+"assets/hall-of-legends/portraits/"+file;img.alt="Illustrated portrait of "+name;img.onerror=()=>{img.hidden=true}}}overlay.hidden=false;document.body.classList.add("hv-demo-modal-open");$("hv-demo-close").focus()}
for(const id of ["hv-demo-close","hv-demo-back"])$(id).addEventListener("click",closePreview);
overlay.addEventListener("click",e=>{if(e.target===overlay)closePreview()});
document.addEventListener("keydown",e=>{if(overlay.hidden)return;if(e.key==="Escape"){e.preventDefault();closePreview()}if(e.key==="Tab"){const list=[...overlay.querySelectorAll("button:not([disabled])")];if(e.shiftKey&&document.activeElement===list[0]){e.preventDefault();list.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===list.at(-1)){e.preventDefault();list[0].focus()}}});
function person(f,bottom){
 const c=mk("article","hv-person hv-person--"+f.side),face=mk("button","hv-portrait-button"),name=mk("b","hv-person-name",f.name),date=mk("small","hv-person-date",f.display_date),bio=mk("button","hv-bio-link","Bio");
 c.dataset.figureId=f.id;if(f.id==="bh-121")c.id="hv-queen-start";
 c.style.setProperty("--bottom",bottom+"px");
 face.type="button";face.setAttribute("aria-label","Highlight portrait of "+f.name);face.setAttribute("aria-pressed","false");
 if(installed){const img=mk("img","hv-image");img.src=siteRoot+"assets/hall-of-legends/portraits/"+f.source_artwork;img.loading="lazy";img.decoding="async";img.alt="Illustrated portrait of "+f.name;img.onerror=()=>{img.replaceWith(mk("span","hv-avatar","◈"))};face.append(img)}else face.append(mk("span","hv-avatar","◈"));
 face.addEventListener("click",()=>{const active=!c.classList.contains("hv-person--active");document.querySelectorAll(".hv-person--active").forEach(el=>{el.classList.remove("hv-person--active");el.querySelector(".hv-portrait-button")?.setAttribute("aria-pressed","false")});if(active){c.classList.add("hv-person--active");face.setAttribute("aria-pressed","true")}});
 bio.type="button";bio.setAttribute("aria-label","Read biography of "+f.name);bio.addEventListener("click",()=>openPreview(f.name,f.lifespan_or_period+" · "+f.display_date,"This is the Bio Activity preview. The complete researched biography and individual Alliance Challenge are still in development. This preview awards no points or Alliances. The artwork is an illustration, not necessarily an authenticated historical likeness.",f.source_artwork));
 c.append(face,name,date,bio);return c;
}
function makeMarker(sc,kind,label,bottom){
 const button=mk("button","hv-floor-marker hv-floor-marker--"+kind,label);
 button.type="button";button.style.bottom=bottom+"px";
 button.setAttribute("aria-label",label+" — preview only, not yet active");
 button.addEventListener("click",()=>openPreview(kind==="era"?"Era Challenge — "+sc.title:label,kind==="era"?"One of eight Era Challenges · Legacy Credits":"Hall of Legends · Gallery "+sc.id,"This challenge marker is installed in the central museum corridor. The historical activity and scoring will be activated in a later build. No points, seals, or Alliances are awarded by this preview."));
 return button;
}
function scene(sc){
 const s=mk("section","hv-scene hv-chronology");s.setAttribute("aria-label",sc.title);
 for(const [prop,val] of [["--h-sky",sc.palette.sky],["--h-wall",sc.palette.walls],["--h-ground",sc.palette.ground]])s.style.setProperty(prop,val);
 const light=mk("div","hv-vignette");light.setAttribute("aria-hidden","true");s.append(light);
 const head=mk("header","hv-head");head.append(mk("div","hv-count","Gallery "+sc.id+" · "+sc.figure_count+" figures"),mk("h2","",sc.title),mk("p","",sc.ground));s.append(head);
 const stops=mk("div","hv-stops");let bottom=48,previous=null;
 const bonusAfter=Math.max(2,Math.floor(sc.figure_count/3)-1);
 const eraAfter=Math.max(bonusAfter+2,Math.floor(sc.figure_count*2/3)-1);
 for(let i=0;i<sc.portraits.length;i++){
  const f=sc.portraits[i];
  if(previous!==null){bottom+=188;const diff=f.sort_year-previous;if(diff>12)bottom+=Math.min(68,Math.round(Math.log2(diff+1)*8));else if(diff>3)bottom+=14}
  stops.append(person(f,bottom));
  if(i===bonusAfter){stops.append(makeMarker(sc,"bonus",markerTitles[sc.id-1],bottom+246));bottom+=126}
  if(sc.challenge_marker&&i===eraAfter){stops.append(makeMarker(sc,"era","Era Challenge",bottom+246));bottom+=126}
  previous=f.sort_year;
 }
 stops.style.height=(bottom+284)+"px";s.append(stops);return s;
}
function activateMarkerGlow(){
 const markers=[...document.querySelectorAll(".hv-floor-marker")];
 if(!("IntersectionObserver" in window)){markers.forEach(m=>m.classList.add("hv-marker--arrived"));return}
 const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add("hv-marker--arrived");observer.unobserve(e.target)}}},{threshold:.3,rootMargin:"-10% 0px -10% 0px"});
 markers.forEach(m=>observer.observe(m));
}
function goToBeginning(smooth=false){const q=$("hv-queen-start");if(q)q.scrollIntoView({behavior:smooth&&!matchMedia("(prefers-reduced-motion: reduce)").matches?"smooth":"instant",block:"center"})}
$("hv-begin").addEventListener("click",()=>goToBeginning(true));
document.querySelectorAll("[data-mode]").forEach(b=>b.addEventListener("click",()=>{const mode=b.getAttribute("data-mode");document.body.classList.toggle("hv-mobile",mode==="mobile");document.querySelectorAll("[data-mode]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)))}));
Promise.all([
 fetch(hallData+"death-chronology.json?v=20261103-v3").then(r=>{if(!r.ok)throw Error("Chronology unavailable");return r.json()}),
 fetch(siteRoot+"assets/hall-of-legends/portrait-manifest.json?v=20261103-replaced").then(r=>r.ok?r.json():null).catch(()=>null)
]).then(([data,manifest])=>{
 installed=manifest?.files?.length===141;
 if(data.scenes.length!==12||data.scenes.reduce((n,s)=>n+s.figure_count,0)!==141||data.scenes.filter(s=>s.challenge_marker).length!==8)throw Error("Incomplete 141-figure chronology");
 const refs=$("hv-references-list");refs.replaceChildren();for(const item of data.reference_sources){const li=mk("li",""),a=mk("a","hv-source",item.label);a.href=item.url;a.target="_blank";a.rel="noopener noreferrer";li.append(a);refs.append(li)}
 container.replaceChildren();for(let i=data.scenes.length-1;i>=0;i--)container.append(scene(data.scenes[i]));activateMarkerGlow();
 const nav=performance.getEntriesByType("navigation")[0],initial=!location.hash&&(!nav||nav.type!=="back_forward");
 if(initial){let interacted=false;const stop=()=>{interacted=true};window.addEventListener("wheel",stop,{once:true,passive:true});window.addEventListener("touchstart",stop,{once:true,passive:true});const start=()=>{if(!interacted)goToBeginning(false)};requestAnimationFrame(()=>requestAnimationFrame(start));if(document.readyState!=="complete")window.addEventListener("load",start,{once:true})}
}).catch(e=>{container.replaceChildren(mk("div","hv-explainer","The chronological Hall layout could not load. Please return to the Hall of Legends entrance."));console.error(e)});
})();
