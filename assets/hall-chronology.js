(()=>{"use strict";
const $=id=>document.getElementById(id);
const mk=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
const container=$("hv-journey"),overlay=$("hv-demo-overlay");
const siteRoot=document.body.dataset.siteRoot||"../../../",hallData=document.body.dataset.hallData||"../data/";
const reduceMotion=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function jumpTo(id){const el=$(id);if(el)el.scrollIntoView({behavior:reduceMotion()?"instant":"smooth",block:id==="hv-summit"?"start":"end"});}
for(const [button,target] of [["hv-jump-top","hv-summit"],["hv-jump-bottom","hv-entrance"]]){const b=$(button);if(b)b.addEventListener("click",()=>jumpTo(target));}
let lastFocus=null,closeTimer=null,profileMap=new Map(),sourceMap=new Map();
function appendBioSection(target,heading,paragraph){
 const section=mk("section","hv-bio-section");
 section.append(mk("h3","",heading),mk("p","",paragraph));
 target.append(section);
}
function addResearchLink(target,label,url){
 if(!/^https:\/\//.test(url))return;
 const link=mk("a","hv-bio-source",label);link.href=url;link.target="_blank";link.rel="noopener noreferrer";target.append(link);
}
function renderBiography(target,profile,personName){
 appendBioSection(target,"Historical significance",profile.significance);
 const inquiry=mk("section","hv-bio-inquiry");
 inquiry.append(mk("h3","","Think like a historian"),mk("p","",profile.question));
 target.append(inquiry);
 const sources=mk("section","hv-bio-sources");
 sources.append(mk("h3","","Sources and further research"));
 const listed=sourceMap.get(profile.id)||[];
 for(const [i,url] of listed.entries())addResearchLink(sources,"Research reference "+(i+1),url);
 addResearchLink(sources,"Smithsonian African American History Collection","https://americanhistory.si.edu/explore/topics/african-american-history");
 addResearchLink(sources,"Dictionary of African Biography — Harvard","https://hutchinscenter.fas.harvard.edu/DAB");
 sources.append(mk("small","hv-bio-editor-note","These are research collections and available catalogue references, not a claim that every biography has been independently verified against each collection. Ancient and traditional accounts require extra care."));
 target.append(sources);
 const notice=mk("small","hv-reward-pending","The biography is open to read. Interactive Alliance scoring will be activated in a later phase.");
 target.append(notice);
}
function openBioWithTimeWarp(args){
 if(reduceMotion()){openPreview(args);return}
 window.ETPTransitions?.clickSound?.("time");
 const old=document.getElementById("hv-bio-time-warp");if(old)old.remove();
 const warp=mk("div","hv-bio-time-warp");warp.id="hv-bio-time-warp";warp.setAttribute("aria-hidden","true");
 warp.append(mk("div","etp-fx etp-time"));document.body.append(warp);
 setTimeout(()=>{warp.remove();openPreview(args)},430);
}
function finishClose(){
 clearTimeout(closeTimer);closeTimer=null;overlay.hidden=true;
 overlay.classList.remove("hv-overlay-leaving");
 document.body.classList.remove("hv-demo-modal-open");
 if(lastFocus?.isConnected)lastFocus.focus();
}
function closePreview(){
 if(overlay.hidden||overlay.classList.contains("hv-overlay-leaving"))return;
 if(reduceMotion()){finishClose();return}
 overlay.classList.add("hv-overlay-leaving");
 closeTimer=setTimeout(finishClose,260);
}
function openPreview({title,dates,description,file,kind="bio",reward="",profile=null}){
 clearTimeout(closeTimer);closeTimer=null;
 lastFocus=document.activeElement;
 overlay.classList.remove("hv-overlay-leaving");
 overlay.dataset.kind=kind;
 $("hv-demo-name").textContent=title;
 $("hv-demo-dates").textContent=dates;
 $("hv-demo-desc").textContent=description;
 const tag=overlay.querySelector(".hv-demo-dialog .hv-tag");
 if(tag)tag.textContent=kind==="bio"?"Historical Biography · Hall of Legends":kind==="era"?"Era Challenge · Seal":"Legacy Credit Challenge";
 const img=$("hv-demo-image");
 if(img){img.hidden=!file;if(file){img.src=siteRoot+"assets/hall-of-legends/portraits/"+file;img.alt="Illustrated portrait of "+title;img.onerror=()=>{img.hidden=true}}}
 const info=$("hv-demo-activity");
 if(info){
  info.replaceChildren();
  if(kind==="bio"&&profile){renderBiography(info,profile,title);}
  else{
  info.append(mk("h3","",kind==="bio"?"Biography Under Review":kind==="era"?"Your Era Seal":"Your Legacy Credits"));
  info.append(mk("p","",kind==="bio"?"A branching scenario will invite you to weigh evidence, make choices, and explore their consequences.":kind==="era"?"Complete a chapter review to earn this Era Seal.":"Complete this historical challenge to earn five Legacy Credits."));
  if(reward)info.append(mk("strong","hv-reward-note",reward));
  info.append(mk("small","hv-reward-pending","Coming soon · No achievements awarded yet"));
  }
 }
 overlay.hidden=false;
 document.body.classList.add("hv-demo-modal-open");
 $("hv-demo-close").focus();
}
for(const id of ["hv-demo-close","hv-demo-back"])$(id).addEventListener("click",closePreview);
overlay.addEventListener("click",e=>{if(e.target===overlay)closePreview()});
document.addEventListener("keydown",e=>{
 if(overlay.hidden)return;
 if(e.key==="Escape"){e.preventDefault();closePreview();return}
 if(e.key!=="Tab")return;
 const list=[...overlay.querySelectorAll("button:not([disabled])")];
 if(!list.length)return;
 if(e.shiftKey&&document.activeElement===list[0]){e.preventDefault();list.at(-1).focus()}
 else if(!e.shiftKey&&document.activeElement===list.at(-1)){e.preventDefault();list[0].focus()}
});
function figureDates(f){
 const life=String(f.lifespan_or_period||"").trim();
 const death=String(f.display_date||"").trim();
 // Modern biographical ranges represent birth and death years, unlike ancient reigns.
 const match=life.match(/^(c\\.\\s*)?(\\d{3,4})\\s*[–-]\\s*(c\\.\\s*)?(\\d{3,4})(?=\\s|$|·)/);
 if(match && !/reign|regency|service|term/i.test(life)){
  return "Born "+(match[1]||"")+match[2]+" · Died "+(match[3]||"")+match[4];
 }
 if(/^Born\\s/i.test(life)){
  return life+(death&&!life.includes(death)?" · "+death:"");
 }
 if(life && death && life!==death)return life+" · "+death;
 return life||death||"Dates not established";
}
function person(f,slot){
 const c=mk("article","hv-person hv-person--"+f.side),
       unit=mk("div","hv-frame-unit"),
       face=mk("button","hv-portrait-button"),
       name=mk("b","hv-person-name",f.name),
       date=mk("small","hv-person-date",figureDates(f)),
       bio=mk("button","hv-bio-link","Bio Activity");
 c.dataset.figureId=f.id;if(f.id==="bh-121")c.id="hv-queen-start";
 c.style.setProperty("--bottom",slot.bottom_px+"px");
 face.type="button";face.setAttribute("aria-label","Highlight portrait of "+f.name);face.setAttribute("aria-pressed","false");
 const img=mk("img","hv-image");
 img.src=siteRoot+"assets/hall-of-legends/portraits/"+f.source_artwork;
 img.loading="lazy";img.decoding="async";img.alt="Illustrated portrait of "+f.name;
 img.onerror=()=>{img.replaceWith(mk("span","hv-avatar","◈"))};
 face.append(img);
 face.addEventListener("click",()=>{
  const active=!c.classList.contains("hv-person--active");
  document.querySelectorAll(".hv-person--active").forEach(el=>{el.classList.remove("hv-person--active");el.querySelector(".hv-portrait-button")?.setAttribute("aria-pressed","false")});
  if(active){c.classList.add("hv-person--active");face.setAttribute("aria-pressed","true")}
 });
 bio.type="button";bio.setAttribute("aria-label","Open biography activity for "+f.name);
 bio.addEventListener("click",()=>openPreview({
  title:f.name,dates:figureDates(f),
  description:"Discover this figure's life, choices, and historical legacy. A researched biography and interactive branching scenario will be available here.",
  file:f.source_artwork,kind:"bio",reward:"1 Alliance upon successful completion"
 }));
 unit.append(face,name,date,bio);c.append(unit);return c;
}
function makeMarker(sc,slot,meta){
 const isEra=slot.type==="era",kind=isEra?"era":"legacy";
 const b=mk("button","hv-floor-marker hv-floor-marker--"+kind+" hv-floor-marker--"+slot.lane);
 b.type="button";b.style.bottom=slot.bottom_px+"px";b.dataset.challengeId=slot.id;
 b.append(mk("span","hv-marker-title",isEra?"Era Challenge":slot.title));
 b.append(mk("span","hv-marker-reward",isEra?"Era Seal "+slot.seal_number:"+5 Legacy Credits"));
 b.setAttribute("aria-label",(isEra?"Era Challenge, Seal "+slot.seal_number:slot.title+", five Legacy Credits")+" — coming soon");
 b.addEventListener("click",()=>openPreview({
  title:isEra?"Era Challenge — "+sc.title:slot.title,
  dates:isEra?"Chapter "+sc.id+" · Era Seal "+slot.seal_number:"Chapter "+sc.id+" · 5 Legacy Credits",
  description:isEra?"Review the people, evidence, and turning points of this chapter. The chapter challenge will be available soon.":meta?.description||"Explore this historical activity when it opens.",
  kind,reward:isEra?"1 Era Seal upon successful completion":"5 Legacy Credits upon successful completion"
 }));
 return b;
}
function scene(sc,geo,activityMap){
 const s=mk("section","hv-scene hv-chronology");
 s.setAttribute("aria-label",sc.title);s.dataset.chapter=sc.id;
 for(const [prop,val] of [["--h-sky",sc.palette.sky],["--h-wall",sc.palette.walls],["--h-ground",sc.palette.ground]])s.style.setProperty(prop,val);
 const light=mk("div","hv-vignette");light.setAttribute("aria-hidden","true");s.append(light);
 const head=mk("header","hv-head");
 head.append(mk("h2","",sc.title));
 const direction=mk("span","hv-chapter-up","↑");direction.setAttribute("aria-hidden","true");head.append(direction);
 const stops=mk("div","hv-stops");stops.style.height=geo.scene_height_px+"px";
 const figures=new Map(sc.portraits.map(f=>[f.id,f]));
 for(const slot of geo.slots){
  if(slot.type==="portrait"){
   const f=figures.get(slot.id);
   if(!f)throw Error("Unmapped portrait "+slot.id);
   stops.append(person(f,slot));
  }else{
   const meta=activityMap.get(slot.id);
   if(!meta)throw Error("Unmapped activity "+slot.id);
   stops.append(makeMarker(sc,slot,meta));
  }
 }
 s.append(stops,head);return s;
}
function activateMarkerGlow(){
 const markers=[...container.querySelectorAll(".hv-floor-marker")];
 if(!("IntersectionObserver" in window)){markers.forEach(m=>m.classList.add("hv-marker--arrived"));return}
 const observer=new IntersectionObserver(entries=>{
  for(const e of entries){if(e.isIntersecting){e.target.classList.add("hv-marker--arrived");observer.unobserve(e.target)}}
 },{threshold:.3,rootMargin:"-10% 0px -10% 0px"});
 markers.forEach(m=>observer.observe(m));
}
function goToBeginning(smooth=false){
 const q=$("hv-queen-start");
 if(q)q.scrollIntoView({behavior:smooth&&!reduceMotion()?"smooth":"instant",block:"center"});
}
function goToEntrance(){
 const entrance=$("hv-entrance");
 if(entrance)entrance.scrollIntoView({behavior:"instant",block:"start"});
}
$("hv-begin").addEventListener("click",()=>goToBeginning(true));
document.querySelectorAll("[data-mode]").forEach(b=>b.addEventListener("click",()=>{
 const mode=b.getAttribute("data-mode");document.body.classList.toggle("hv-mobile",mode==="mobile");
 document.querySelectorAll("[data-mode]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
}));
const getJson=url=>fetch(url).then(r=>{if(!r.ok)throw Error("Hall resource unavailable: "+url);return r.json()});
Promise.all([
 getJson(hallData+"death-chronology.json?v=20261103-hall-v9"),
 getJson(hallData+"gallery-geometry.json?v=20261103-hall-v9"),
 getJson(hallData+"activity-placement.json?v=20261103-hall-v9"),
 getJson(hallData+"biographies-01.json?v=20261104-bios-v1"),
 getJson(hallData+"biographies-02.json?v=20261104-bios-v1"),
 getJson(hallData+"biographies-03.json?v=20261104-bios-v1"),
 getJson(hallData+"phase1-catalog.json?v=20261104-bios-v1")
]).then(([data,geometry,activities,biographies1,biographies2,biographies3,catalog])=>{
 const profiles=[...biographies1.entries,...biographies2.entries,...biographies3.entries];
 const expectedIds=new Set(data.scenes.flatMap(sc=>sc.portraits.map(f=>f.id)));
 if(profiles.length!==141||new Set(profiles.map(p=>p.id)).size!==141||
   profiles.some(p=>!expectedIds.has(p.id)||!p.overview||!p.significance||!p.question))
   throw Error("Hall biographies missing, duplicated or incomplete");
 profileMap=new Map(profiles.map(p=>[p.id,p]));
 sourceMap=new Map(catalog.figures.map(f=>[f.id,(f.date_sources||[]).filter(u=>/^https:\/\//.test(u))]));
 const scs=data.scenes,gs=geometry.scenes;
 if(scs.length!==12||gs.length!==12||scs.reduce((n,s)=>n+s.figure_count,0)!==141||
    activities.legacy_activities.length!==20||activities.era_challenges.length!==8||
    activities.legacy_activities.reduce((n,x)=>n+x.credits,0)!==100)
  throw Error("Hall activity and portrait totals do not match");
 const slots=gs.flatMap(g=>g.slots);
 if(slots.filter(x=>x.type==="portrait").length!==141||slots.filter(x=>x.type==="legacy").length!==20||
    slots.filter(x=>x.type==="era").length!==8)throw Error("Hall placement geometry incomplete");
 const map=new Map([...activities.legacy_activities,...activities.era_challenges].map(x=>[x.id,x]));
 const refs=$("hv-references-list");refs.replaceChildren();
 for(const item of data.reference_sources){
  const li=mk("li",""),link=mk("a","hv-source",item.label);
  link.href=item.url;link.target="_blank";link.rel="noopener noreferrer";li.append(link);refs.append(li);
 }
 container.replaceChildren();
 for(let i=scs.length-1;i>=0;i--){
  if(scs[i].id!==gs[i].id)throw Error("Chapter layout mismatch");
  container.append(scene(scs[i],gs[i],map));
 }
 activateMarkerGlow();
 const nav=performance.getEntriesByType("navigation")[0];
 const initial=!location.hash&&(!nav||nav.type!=="back_forward");
 if(initial){
  let interacted=false;
  const stop=()=>{interacted=true};
  window.addEventListener("wheel",stop,{once:true,passive:true});
  window.addEventListener("touchstart",stop,{once:true,passive:true});
  const start=()=>{if(!interacted)goToEntrance()};
  requestAnimationFrame(()=>requestAnimationFrame(start));
  if(document.readyState!=="complete")window.addEventListener("load",start,{once:true});
 }
}).catch(e=>{
 container.replaceChildren(mk("div","hv-explainer","The Hall is temporarily unavailable. Please try reloading this page."));
 console.error(e);
});
})();
