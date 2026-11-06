(()=>{"use strict";
const $=id=>document.getElementById(id);
const mk=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
const container=$("hv-journey"),overlay=$("hv-demo-overlay");
const siteRoot=document.body.dataset.siteRoot||"../../../",hallData=document.body.dataset.hallData||"../data/";
const reduceMotion=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function jumpTo(id){const el=$(id);if(el)el.scrollIntoView({behavior:reduceMotion()?"instant":"smooth",block:id==="hv-summit"?"start":"end"});}
for(const [button,target] of [["hv-jump-top","hv-summit"],["hv-jump-bottom","hv-entrance"]]){const b=$(button);if(b)b.addEventListener("click",()=>jumpTo(target));}
let lastFocus=null,closeTimer=null,profileMap=new Map(),sourceMap=new Map();
let allianceMap=new Map(), earnedAlliances=new Set(), allianceStorageAvailable=true;
const ALLIANCE_STORE="etp.hall.alliances.v1";
function restoreAlliances(allowed){
 try{
  const raw=localStorage.getItem(ALLIANCE_STORE),stored=raw?JSON.parse(raw):[];
  if(!Array.isArray(stored))throw Error("Invalid achievement format");
  earnedAlliances=new Set(stored.filter(id=>typeof id==="string"&&allowed.has(id)));
 }catch(err){allianceStorageAvailable=false;earnedAlliances=new Set();}
 updateAllianceDisplays();
}
function updateAllianceDisplays(){
 const score=earnedAlliances.size;
 const ledger=document.querySelector("#hv-scorebar .hv-score-item b");
 if(ledger){if(ledger.firstChild&&ledger.firstChild.nodeType===3)ledger.firstChild.nodeValue=String(score);else ledger.textContent=score+" / 141";}
 const cert=document.querySelector(".hv-cert-stats span:first-child b");
 if(cert)cert.textContent=score+" / 141";
 const entrance=document.querySelector(".hv-entrance-ledger .hv-ledger-values span:first-child strong");
 if(entrance)entrance.textContent=score+" / 141";
 document.querySelectorAll(".hv-person[data-figure-id]").forEach(card=>{
  const done=earnedAlliances.has(card.dataset.figureId);
  card.classList.toggle("hv-person--allied",done);
  const btn=card.querySelector(".hv-bio-link");
  if(btn)btn.setAttribute("aria-label",(done?"Alliance earned. Review Bio Activity for ":"Open biography activity for ")+card.querySelector(".hv-person-name")?.textContent);
 });
}
function awardAlliance(id){
 if(earnedAlliances.has(id))return false;
 earnedAlliances.add(id);
 if(allianceStorageAvailable)try{localStorage.setItem(ALLIANCE_STORE,JSON.stringify([...earnedAlliances]));}
 catch(err){allianceStorageAvailable=false;}
 updateAllianceDisplays();return true;
}
let featuredProfiles=new Map();
function phaseVisual(target,phase,tone){
 target.dataset.phase=phase;target.dataset.tone=tone;
 const stage=target.querySelector(".hv-branch-stage");
 if(stage){stage.classList.remove("hv-branch-revealed");void stage.offsetWidth;stage.classList.add("hv-branch-revealed");}
}
function featuredBioParagraphs(target,feature){
 for(const entry of feature.biography)appendBioSection(target,entry.heading,entry.text);
 const note=mk("p","hv-feature-factcheck","Historical note: This biography is based on NPS, Maryland and National Archives research. The interactive choices are educational simulations, not documented conversations.");
 target.append(note);
}
function renderTubmanActivity(target,profile,feature){
 const wrap=mk("section","hv-alliance-activity hv-branching-activity hv-tubman-activity");
 wrap.setAttribute("aria-label","Harriet Tubman historical decision investigation");
 const heading=mk("h3","hv-alliance-heading",feature.title);
 const intro=mk("p","hv-alliance-instructions","Three different historical investigations. Your choices change the evidence you uncover. Revisit your decisions before the final challenge.");
 const progress=mk("p","hv-branch-progress","");
 const stage=mk("div","hv-branch-stage");
 const feedback=mk("div","hv-alliance-feedback");feedback.setAttribute("role","status");feedback.setAttribute("aria-live","polite");
 const trail=mk("div","hv-branch-trail");trail.setAttribute("aria-label","Investigation progress");
 wrap.append(heading,intro,progress,trail,stage,feedback);target.append(wrap);
 const visited=new Set();
 let selected=null;
 const setStage=(phase,tone,title,body)=>{
  wrap.dataset.phase=phase;wrap.dataset.tone=tone;
  stage.replaceChildren(mk("h4","hv-branch-title",title),mk("p","hv-branch-context",body));
  stage.classList.remove("hv-branch-revealed");void stage.offsetWidth;stage.classList.add("hv-branch-revealed");
  feedback.replaceChildren();feedback.className="hv-alliance-feedback";
 };
 const button=(label,action,tone="blue")=>{
  const el=mk("button","hv-alliance-choice hv-branch-choice",label);
  el.type="button";el.dataset.tone=tone;
  el.addEventListener("click",()=>{
   if(el.disabled)return;
   el.classList.add("hv-choice-selected");
   el.setAttribute("aria-pressed","true");
   stage.querySelectorAll("button").forEach(x=>x.disabled=true);
   setTimeout(action,reduceMotion()?0:190);
  });
  return el;
 };
 function updateTrail(){
  trail.replaceChildren();
  feature.scenarios.forEach(sc=>{
   const pill=mk("span","hv-branch-trail-pill"+(visited.has(sc.id)?" hv-visited":""),(visited.has(sc.id)?"✓ ":"○ ")+sc.title);
   trail.append(pill);
  });
 }
 function enterHub(){
  progress.textContent="Choose your historical investigation";
  setStage("explore","blue","A history that changes with what you investigate","Choose an exhibit question. Each route opens a different historical situation and changes what you learn. You can explore more than one.");
  updateTrail();
  for(const sc of feature.scenarios)stage.append(button(sc.title+" →",()=>enterScenario(sc)));
  stage.append(button("I am ready for the final challenge",enterFinal,"gold"));
 }
 function enterScenario(sc){
  selected=sc;
  progress.textContent="Investigate · "+sc.title;
  setStage("decision","red",sc.title,sc.context);
  stage.append(mk("p","hv-branch-question",sc.prompt));
  for(const ch of sc.choices)stage.append(button(ch.label,()=>enterConsequence(sc,ch),ch.tone));
  stage.append(button("← Choose a different investigation",enterHub,"blue"));
 }
 function enterConsequence(sc,ch){
  visited.add(sc.id);updateTrail();
  progress.textContent="Your decision changed the exhibit";
  setStage("consequence",ch.tone,ch.tone==="red"?"A missing piece of the story":"New evidence unlocked",ch.consequence);
  const insight=ch.tone==="red"?"Try a different source or decision to recover the missing historical context.":"Your choice brings the exhibit closer to a careful historical interpretation.";
  stage.append(mk("p","hv-branch-insight",insight));
  stage.append(button("Investigate another decision",()=>enterScenario(sc),"blue"));
  stage.append(button("Explore another history path",enterHub,"green"));
  stage.append(button("Move to the final challenge →",enterFinal,"gold"));
 }
 function enterFinal(){
  progress.textContent="Final challenge · 1 Alliance";
  setStage("reward","gold","Prove what you discovered",feature.final.prompt);
  const options=mk("div","hv-alliance-options");stage.append(options);
  const choices=[];
  const result=()=>{
   choices.forEach((b,i)=>{b.disabled=true;b.classList.toggle("hv-alliance-right",i===feature.final.correct)});
   feedback.className="hv-alliance-feedback hv-alliance-success";
   feedback.replaceChildren(mk("strong","","Alliance earned for Harriet Tubman ✓"),mk("p","",feature.final.explanation));
  };
  feature.final.options.forEach((option,i)=>{
   const btn=mk("button","hv-alliance-choice",String.fromCharCode(65+i)+". "+option);btn.type="button";
   btn.addEventListener("click",()=>{
    if(earnedAlliances.has(profile.id)){result();return;}
    if(i===feature.final.correct){
     const fresh=awardAlliance(profile.id);
     result();
     if(fresh)window.ETPTransitions?.clickSound?.("gold");
    }else{
     choices.forEach(x=>x.classList.remove("hv-alliance-wrong"));
     btn.classList.add("hv-alliance-wrong");
     feedback.className="hv-alliance-feedback hv-alliance-try";
     feedback.replaceChildren(mk("strong","","Not quite. Revisit the evidence."),mk("p","","Tubman's work included rescue journeys, collective support networks, and Civil War service. Try again."));
    }
   });choices.push(btn);options.append(btn);
  });
  if(earnedAlliances.has(profile.id))result();
  stage.append(button("← Explore the different investigation paths",enterHub,"green"));
 }
 if(earnedAlliances.has(profile.id))enterFinal();else enterHub();
 if(!allianceStorageAvailable)wrap.append(mk("small","hv-alliance-storage-note","This browser cannot save progress. Your score will not persist when the page closes."));
}

function renderAllianceActivity(target,profile){
 const feature=featuredProfiles.get(profile.id);
 if(feature){renderTubmanActivity(target,profile,feature);return;}
 const challenge=allianceMap.get(profile.id);
 if(!challenge)return;
 const wrap=mk("section","hv-alliance-activity hv-branching-activity");
 wrap.setAttribute("aria-label","Branching Alliance Activity for this historical figure");
 const heading=mk("h3","hv-alliance-heading","Bio Activity · Historical Investigation");
 const intro=mk("p","hv-alliance-instructions","You are a historical researcher preparing a new exhibit. Your decisions change what you investigate next. Follow the evidence to complete the Alliance challenge.");
 const progress=mk("p","hv-branch-progress","Step 1 of 3 · Choose your investigation");
 const stage=mk("div","hv-branch-stage");
 const feedback=mk("div","hv-alliance-feedback");feedback.setAttribute("role","status");feedback.setAttribute("aria-live","polite");
 wrap.append(heading,intro,progress,stage,feedback);
 const makeChoice=(label,action)=>{
  const button=mk("button","hv-alliance-choice hv-branch-choice",label);
  button.type="button";button.addEventListener("click",action);return button;
 };
 const setStage=(title,description)=>{
  stage.replaceChildren(mk("h4","hv-branch-title",title),mk("p","hv-branch-context",description));
  feedback.replaceChildren();feedback.className="hv-alliance-feedback";
  phaseVisual(wrap,wrap.dataset.phase||"explore",wrap.dataset.tone||"blue");
 };
 const paths=[
  {title:"Follow the actions",button:"Investigate what this figure did",next:"Look for evidence of specific actions and how contemporaries described them.",result:profile.overview},
  {title:"Understand the historical setting",button:"Explore why the story matters",next:"Put this person's actions alongside the wider social and political circumstances.",result:profile.significance},
  {title:"Test the historical record",button:"Question how the story was recorded",next:"Ask where the account comes from and which details can be independently established.",result:profile.question}
 ];
 function stageOne(){
  wrap.dataset.phase="explore";wrap.dataset.tone="blue";
  progress.textContent="Step 1 of 3 · Choose your investigation";
  setStage("The exhibit needs a historical focus","You have space for one opening panel. What should visitors investigate first?");
  for(const path of paths)stage.append(makeChoice(path.button,()=>stageTwo(path)));
 }
 function stageTwo(path){
  wrap.dataset.phase="decision";wrap.dataset.tone="green";
  progress.textContent="Step 2 of 3 · Evaluate your evidence";
  setStage(path.title,path.next);
  const evidence=mk("blockquote","hv-branch-excerpt",path.result);stage.append(evidence);
  stage.append(mk("p","hv-branch-context","What is the most responsible next step before making a claim about this history?"));
  stage.append(makeChoice("Compare evidence and acknowledge its limits",()=>stageConsequence(path,true)));
  stage.append(makeChoice("Use this one account as the complete explanation",()=>stageConsequence(path,false)));
  stage.append(makeChoice("← Choose a different investigation",stageOne));
 }
 function stageConsequence(path,responsible){
  wrap.dataset.phase="consequence";wrap.dataset.tone=responsible?"green":"red";
  progress.textContent="Step 2 of 3 · Your decision's consequence";
  setStage(responsible?"A stronger historical interpretation":"An incomplete historical interpretation",
   responsible?"Comparing sources and identifying uncertainties builds a defensible interpretation. You can now test your understanding.":"A single account can omit important context or reflect a particular perspective. Revise your approach by checking evidence before drawing a conclusion.");
  stage.append(mk("p","hv-branch-context","Revisit the historical question: "+profile.question));
  stage.append(makeChoice("Continue to the evidence challenge →",stageThree));
  stage.append(makeChoice("← Reconsider the evidence",()=>stageTwo(path)));
 }
 function stageThree(){
  wrap.dataset.phase="reward";wrap.dataset.tone="gold";
  progress.textContent="Step 3 of 3 · Earn your Alliance";
  setStage("Historical evidence challenge",challenge.prompt);
  const answers=mk("div","hv-alliance-options");stage.append(answers);
  let finished=earnedAlliances.has(profile.id);
  const choiceButtons=[];
  function showComplete(newAward){
   choiceButtons.forEach((b,i)=>{b.disabled=true;b.classList.toggle("hv-alliance-right",i===challenge.correct);b.classList.remove("hv-alliance-wrong")});
   feedback.className="hv-alliance-feedback hv-alliance-success";
   feedback.replaceChildren(mk("strong","",newAward?"Alliance earned! +1":"Alliance already earned · review completed"),mk("p","",challenge.explanation));
   stage.append(makeChoice("Review another research path",stageOne));
  }
  challenge.options.forEach((option,i)=>{
   const button=makeChoice(String.fromCharCode(65+i)+". "+option,()=>{
    if(earnedAlliances.has(profile.id)){showComplete(false);return;}
    if(i===challenge.correct){
     const fresh=awardAlliance(profile.id);
     showComplete(fresh);
     if(fresh)window.ETPTransitions?.clickSound?.("gold");
    }else{
     choiceButtons.forEach(b=>b.classList.remove("hv-alliance-wrong"));
     button.classList.add("hv-alliance-wrong");
     feedback.className="hv-alliance-feedback hv-alliance-try";
     feedback.replaceChildren(mk("strong","","Not yet — review the biography and try again."),mk("p","","Compare the claims against the life, setting, and contributions described above. Incorrect responses do not reduce your score."));
    }
   });
   choiceButtons.push(button);answers.append(button);
  });
  if(finished)showComplete(false);
 }
 if(earnedAlliances.has(profile.id)){
  stageThree();
 }else{stageOne();}
 if(!allianceStorageAvailable)wrap.append(mk("small","hv-alliance-storage-note","Progress is available for this session, but browser storage is not available for saving it."));
 target.append(wrap);
}

function appendBioSection(target,heading,paragraph){
 const section=mk("section","hv-bio-section");
 section.append(mk("h3","",heading),mk("p","",paragraph));
 target.append(section);
}
function addResearchLink(target,label,url,featured=false){
 if(!/^https:\/\//.test(url)&&!/^\.\.?\//.test(url))return;
 const link=mk("a",featured?"hv-bio-source hv-bio-source-primary":"hv-bio-source",label);
 link.href=url;
 if(/^https:\/\//.test(url)){link.target="_blank";link.rel="noopener noreferrer";}
 target.append(link);
}
function heroLessonUrl(id){
 const expanded={"bh-121":"queen-makeda","bh-122":"piye","bh-123":"shabaka","bh-124":"taharqa","bh-001":"sundiata"};
 return expanded[id]
  ?siteRoot+"lessons/black-history-heroes/"+expanded[id]+"/"
  :siteRoot+"lessons/black-history-heroes/figure/?id="+encodeURIComponent(id);
}
function renderBiography(target,profile,personName){
 const completedHeroLessons=new Set(["bh-121","bh-122","bh-123","bh-124","bh-001"]);
 if(completedHeroLessons.has(profile.id)){
  const lessonLink=mk("a","hv-complete-hero-lesson","Open Full Hero Lesson →");
  lessonLink.href=heroLessonUrl(profile.id);
  lessonLink.setAttribute("aria-label","Open the completed Hero Lesson for "+personName);
  target.append(lessonLink);
 }
 const featured=featuredProfiles.get(profile.id);
 if(featured){featuredBioParagraphs(target,featured);}else{appendBioSection(target,"Life and historical context",profile.overview);
 appendBioSection(target,"Why this history matters",profile.significance);}
 const expanded=mk("section","hv-bio-section hv-bio-interpretation");
 expanded.append(mk("h3","","Reading history with care"));
 expanded.append(mk("p","","Historical biographies are built by comparing records, context, and interpretations. A person's influence is not limited to a single event, and later accounts can disagree about what happened or why."));
 expanded.append(mk("p","",profile.id.match(/^bh-1(?:2[1-9]|3[0-5])$/)?"For early historical and traditional accounts, the evidence may be incomplete. Reigns, legends, and approximate historical periods are not confirmed birth and death dates.":"As you read this account, distinguish documented actions from the interpretations that historians and later generations give them."));
 target.append(expanded);
 const inquiry=mk("section","hv-bio-inquiry");
 inquiry.append(mk("h3","","Think like a historian"),mk("p","",profile.question));target.append(inquiry);
 renderAllianceActivity(target,profile);
 const sources=mk("section","hv-bio-sources");
 sources.append(mk("h3","","Sources and further research"));
 addResearchLink(sources,"Examine the Past · "+(new Set(["bh-121","bh-122","bh-123","bh-124","bh-001"]).has(profile.id)?"Open the complete Hero Lesson":"Read the "+personName+" profile"),heroLessonUrl(profile.id),true);
 const details=mk("details","hv-bio-research-details"),summary=mk("summary","","Other historical references");details.append(summary);
 const listed=sourceMap.get(profile.id)||[];
 const featuredSources={
  "bh-027":[["National Park Service — Harriet Tubman","https://www.nps.gov/articles/harriet-tubman-and-the-underground-railroad.htm"],["National Archives — Harriet Tubman","https://www.archives.gov/research/african-americans/individuals/harriet-tubman"]],
  "bh-107":[["National Library of Medicine — Patricia Bath","https://www.nlm.nih.gov/exhibition/changing-the-face-of-medicine/physicians/biography_patricia-bath.html?id=item-25"]],
  "bh-109":[["NASA — Katherine Johnson Biography","https://www.nasa.gov/centers-and-facilities/langley/katherine-johnson-biography/"]]
 };
 for(const [label,url] of featuredSources[profile.id]||[])addResearchLink(details,label,url);
 for(const [i,url] of listed.entries())addResearchLink(details,"Figure research reference "+(i+1),url);
 addResearchLink(details,"Smithsonian — African American History","https://americanhistory.si.edu/explore/topics/african-american-history");
 addResearchLink(details,"Dictionary of African Biography — Harvard","https://hutchinscenter.fas.harvard.edu/DAB");
 details.append(mk("small","hv-bio-editor-note","These links are research resources, not a claim of completed individual scholarly verification."));
 sources.append(details);
 addResearchLink(sources,"Return to Hall of Legends",siteRoot+"games/hall-of-legends/");
 target.append(sources);
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
 $("hv-demo-desc").textContent=kind==="bio"&&profile?"Explore the life, historical context, evidence, and interpretations behind this figure’s legacy. Then follow a branching investigation to test your understanding.":description;
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
 const list=[...overlay.querySelectorAll("button:not([disabled]),a[href]")];
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
 bio.addEventListener("click",()=>{
  const profile=profileMap.get(f.id);
  openBioWithTimeWarp({
   title:f.name,dates:figureDates(f),
   description:profile?.overview||"This biography is undergoing individual historical source review.",
   file:f.source_artwork,kind:"bio",profile
  });
 });
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
 if(sc.id===1){const tour=mk("button","hv-guide-launch","How to Explore the Hall");tour.id="hv-guide-launch";tour.type="button";tour.setAttribute("aria-label","Show the Hall of Legends guided tour");head.append(tour);}
 const line=mk("div","hv-title-row");line.append(mk("h2","",sc.title));
 const direction=mk("span","hv-chapter-up","↑");direction.setAttribute("aria-hidden","true");line.append(direction);head.append(line);
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
 const q=document.querySelector(".hv-scene[data-chapter=\"1\"] .hv-head")||$("hv-queen-start");
 if(q)q.scrollIntoView({behavior:smooth&&!reduceMotion()?"smooth":"instant",block:"end"});
}
function goToEntrance(){
 const entrance=$("hv-entrance");
 if(entrance)entrance.scrollIntoView({behavior:"instant",block:"start"});
}
$("hv-begin")?.addEventListener("click",()=>goToBeginning(true));
document.querySelectorAll("[data-mode]").forEach(b=>b.addEventListener("click",()=>{
 const mode=b.getAttribute("data-mode");document.body.classList.toggle("hv-mobile",mode==="mobile");
 document.querySelectorAll("[data-mode]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
}));
const getJson=url=>fetch(url).then(r=>{if(!r.ok)throw Error("Hall resource unavailable: "+url);return r.json()});
Promise.all([
 getJson(hallData+"death-chronology.json?v=20261103-hall-v9"),
 getJson(hallData+"gallery-geometry.json?v=20261104-start-floor-v1"),
 getJson(hallData+"activity-placement.json?v=20261103-hall-v9"),
 getJson(hallData+"biographies-01.json?v=20261104-bios-v1"),
 getJson(hallData+"biographies-02.json?v=20261104-bios-v1"),
 getJson(hallData+"biographies-03.json?v=20261104-bios-v1"),
 getJson(hallData+"phase1-catalog.json?v=20261104-bios-v1"),
 getJson(hallData+"alliance-activities.json?v=20261104-alliance-v2"),
 getJson(hallData+"harriet-tubman-feature.json?v=20261104-color-branch-v1")
]).then(([data,geometry,activities,biographies1,biographies2,biographies3,catalog,alliances,harrietFeature])=>{
 const profiles=[...biographies1.entries,...biographies2.entries,...biographies3.entries];
 const expectedIds=new Set(data.scenes.flatMap(sc=>sc.portraits.map(f=>f.id)));
 if(profiles.length!==141||new Set(profiles.map(p=>p.id)).size!==141||
   profiles.some(p=>!expectedIds.has(p.id)||!p.overview||!p.significance||!p.question))
   throw Error("Hall biographies missing, duplicated or incomplete");
 if(alliances.entries.length!==141||new Set(alliances.entries.map(q=>q.id)).size!==141||
    alliances.entries.some(q=>!expectedIds.has(q.id)||!Array.isArray(q.options)||q.options.length!==4||
    new Set(q.options).size!==4||!Number.isInteger(q.correct)||q.correct<0||q.correct>3||!q.explanation))
    throw Error("Alliance activity question bank incomplete or malformed");
 allianceMap=new Map(alliances.entries.map(q=>[q.id,q]));
 if(harrietFeature.figure_id!=="bh-027"||harrietFeature.scenarios.length!==3||harrietFeature.biography.length<4||harrietFeature.scenarios.some(q=>q.choices.length!==3))throw Error("Harriet historical feature invalid");
 featuredProfiles.set(harrietFeature.figure_id,harrietFeature);
 restoreAlliances(expectedIds);
 profileMap=new Map(profiles.map(p=>[p.id,p]));
 sourceMap=new Map(catalog.figures.map(f=>[f.id,(f.date_sources||[]).filter(u=>
  /^https:\/\//.test(u)&&
  /^https:\/\/(?:[^/]+\.)?(?:si\.edu|metmuseum\.org|nm\.cz|libretexts\.org|ebsco\.com|dacb\.org|dw\.com|oup\.com|cambridge\.org|presidentiallibrary\.go\.ke)(?:\/|$)/i.test(u)
 )]));
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
 updateAllianceDisplays();
 document.dispatchEvent(new CustomEvent("etp-hall-ready"));
 const nav=performance.getEntriesByType("navigation")[0];
 const initial=!location.hash&&(!nav||nav.type!=="back_forward");
 if(initial){
  let interacted=false;
  const stop=()=>{interacted=true};
  window.addEventListener("wheel",stop,{once:true,passive:true});
  window.addEventListener("touchstart",stop,{once:true,passive:true});
  const start=()=>{if(!interacted)goToBeginning(false)};
  requestAnimationFrame(()=>requestAnimationFrame(start));
  if(document.readyState!=="complete")window.addEventListener("load",start,{once:true});
 }
}).catch(e=>{
 container.replaceChildren(mk("div","hv-explainer","The Hall is temporarily unavailable. Please try reloading this page."));
 console.error(e);
});
})();
