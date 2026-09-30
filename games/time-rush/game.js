const ROUNDS=[
{
 title:"Rivers Build Civilizations",
 study:"Long before modern cities, many early civilizations grew near rivers. In Mesopotamia, people farmed between the Tigris and Euphrates Rivers. In Egypt, the Nile flooded each year and left rich soil. Farming created food surpluses, which helped villages grow into cities and supported governments, trade, and writing.",
 studySeconds:28, playSeconds:48,
 hint:"Think from the basic need first: reliable farming came before large cities and writing systems.",
 events:[
  {id:"farm",label:"River farming expands",detail:"People use river water and fertile soil to grow more food."},
  {id:"surplus",label:"Food surpluses grow",detail:"Communities produce more food than they need each day."},
  {id:"cities",label:"Villages become cities",detail:"Larger populations gather around farms and trade."},
  {id:"writing",label:"Writing develops",detail:"Leaders and merchants need ways to record goods, taxes, and laws."}
 ]
},
{
 title:"Egypt and the Pharaohs",
 study:"Ancient Egypt developed along the Nile River. Around 3100 BCE, Upper and Lower Egypt were united under one ruler. Pharaohs became powerful kings and religious leaders. Centuries later, Egyptians built huge pyramids as royal tombs, including the Great Pyramid at Giza.",
 studySeconds:27, playSeconds:48,
 hint:"Unity comes before the strongest pharaoh state, and the pyramids come after Egypt had powerful rulers.",
 events:[
  {id:"villages",label:"Nile villages grow",detail:"Farming communities spread along the Nile."},
  {id:"unite",label:"Egypt is united",detail:"Upper and Lower Egypt become one kingdom."},
  {id:"pharaoh",label:"Pharaohs rule",detail:"Kings gain political and religious power."},
  {id:"pyramid",label:"Great pyramids are built",detail:"Royal tombs show the wealth and organization of the kingdom."}
 ]
},
{
 title:"Mesopotamia and Law",
 study:"Mesopotamia was home to many city-states, including Sumer and Babylon. Sumerians developed cuneiform writing to keep records. Much later, King Hammurabi ruled Babylon. He ordered a collection of laws to be written down so people could know the rules and punishments of the kingdom.",
 studySeconds:26, playSeconds:46,
 hint:"The writing system had to exist before a king could publish a large written law code.",
 events:[
  {id:"cities",label:"Sumerian city-states rise",detail:"Independent cities grow across Mesopotamia."},
  {id:"cuneiform",label:"Cuneiform writing spreads",detail:"Scribes record trade, taxes, stories, and government business."},
  {id:"babylon",label:"Babylon becomes powerful",detail:"Babylon grows into an important Mesopotamian kingdom."},
  {id:"hammurabi",label:"Hammurabi's Code is written",detail:"A famous collection of laws is carved for the kingdom."}
 ]
},
{
 title:"Ancient India",
 study:"One of the world's earliest urban civilizations grew in the Indus River Valley. Cities such as Harappa and Mohenjo-daro had planned streets and drainage systems. After that civilization declined, new groups and traditions developed across South Asia. Over time, Hindu traditions grew, and centuries later Buddhism began with the teachings of Siddhartha Gautama.",
 studySeconds:25, playSeconds:44,
 hint:"The planned Indus cities are earliest. Buddhism begins much later than the first river-valley cities.",
 events:[
  {id:"indus",label:"Indus cities flourish",detail:"Harappa and Mohenjo-daro become major planned cities."},
  {id:"decline",label:"Indus cities decline",detail:"The old urban system weakens and changes."},
  {id:"hindu",label:"Hindu traditions develop",detail:"Religious traditions grow over many centuries in South Asia."},
  {id:"buddha",label:"Buddhism begins",detail:"Siddhartha Gautama teaches a path for understanding suffering."},
  {id:"ashoka",label:"Ashoka supports Buddhism",detail:"A powerful Mauryan emperor helps spread Buddhist ideas."}
 ]
},
{
 title:"Early China",
 study:"Ancient Chinese civilization developed near the Huang He, or Yellow River. The Shang dynasty used bronze tools and weapons and left early Chinese writing on oracle bones. The Zhou later replaced the Shang and explained their rule through the Mandate of Heaven. Much later, Qin Shi Huang united China under one emperor.",
 studySeconds:24, playSeconds:43,
 hint:"Shang comes before Zhou. The first emperor belongs much later, after the age of competing kingdoms.",
 events:[
  {id:"river",label:"Yellow River communities grow",detail:"Farming communities expand along the Huang He."},
  {id:"shang",label:"Shang dynasty rules",detail:"Bronze work and oracle-bone writing become important."},
  {id:"zhou",label:"Zhou replaces Shang",detail:"The Mandate of Heaven is used to explain political rule."},
  {id:"warring",label:"Warring States compete",detail:"Regional states fight for power."},
  {id:"qin",label:"Qin unites China",detail:"Qin Shi Huang becomes the first emperor of a unified China."}
 ]
},
{
 title:"Greece and New Ideas",
 study:"Greek civilization grew around the Aegean Sea. City-states such as Athens and Sparta developed different governments and ways of life. Athens experimented with democracy for male citizens. Greek city-states later fought Persia, then fought one another in the Peloponnesian War. Afterward, Alexander the Great built a huge empire and spread Greek culture widely.",
 studySeconds:23, playSeconds:42,
 hint:"The Persian Wars happen before Athens and Sparta fight each other. Alexander comes after the age of the classical city-states.",
 events:[
  {id:"polis",label:"Greek city-states develop",detail:"Independent poleis such as Athens and Sparta become powerful."},
  {id:"democracy",label:"Athens expands democracy",detail:"Male citizens gain a larger role in government."},
  {id:"persia",label:"Greeks fight Persia",detail:"Several Greek city-states unite against Persian invasions."},
  {id:"pelop",label:"Peloponnesian War",detail:"Athens and Sparta fight for control of the Greek world."},
  {id:"alex",label:"Alexander conquers an empire",detail:"Macedonian armies spread Greek influence across three continents."}
 ]
},
{
 title:"Rome: Republic to Empire",
 study:"Rome began as a small settlement in Italy. The Romans created a republic in which elected officials shared power. As Rome expanded, conflict grew inside the republic. Julius Caesar became extremely powerful and was assassinated. After more civil war, Octavian became Augustus, Rome's first emperor.",
 studySeconds:22, playSeconds:40,
 hint:"Republic comes before Caesar. Caesar's death comes before Augustus becomes emperor.",
 events:[
  {id:"settle",label:"Rome grows as a settlement",detail:"Communities expand around the Tiber River."},
  {id:"republic",label:"Roman Republic begins",detail:"Romans replace kings with a republican government."},
  {id:"expand",label:"Rome conquers the Mediterranean",detail:"Roman territory and military power grow."},
  {id:"caesar",label:"Julius Caesar is assassinated",detail:"Political conflict reaches a breaking point."},
  {id:"augustus",label:"Augustus becomes emperor",detail:"The Roman Empire begins under its first emperor."}
 ]
},
{
 title:"Africa and the Americas",
 study:"Powerful civilizations also developed beyond the Mediterranean and Asia. Kush grew south of Egypt along the Nile and became an important trading kingdom. Aksum later became a major commercial power in East Africa. Across the Atlantic, the Olmec built large ceremonial centers in Mesoamerica. Centuries later, Maya cities became centers of writing, mathematics, religion, and astronomy.",
 studySeconds:21, playSeconds:39,
 hint:"The Olmec appear before the great Maya city period. In Africa, Kush rises before Aksum becomes a major trading power.",
 events:[
  {id:"olmec",label:"Olmec centers flourish",detail:"Large ceremonial centers develop in ancient Mesoamerica."},
  {id:"kush",label:"Kingdom of Kush rises",detail:"A Nile kingdom grows south of Egypt."},
  {id:"aksum",label:"Aksum becomes a trade power",detail:"East African trade connects the Red Sea and Indian Ocean worlds."},
  {id:"maya",label:"Maya cities flourish",detail:"Major Maya centers advance writing, mathematics, and astronomy."},
  {id:"connections",label:"Long-distance trade expands",detail:"Regional networks carry goods, beliefs, and technologies farther."}
 ]
},
{
 title:"The Ancient World Connects",
 study:"By the late ancient world, large empires and trade routes connected distant regions. The Persian Empire built roads across Southwest Asia. Alexander's conquests linked Greek, Egyptian, Persian, and South Asian lands. The Roman Empire connected much of the Mediterranean. Farther east, the Han dynasty strengthened China. Trade routes later called the Silk Roads carried goods and ideas across Eurasia.",
 studySeconds:20, playSeconds:38,
 hint:"Persia comes before Alexander. Rome and Han become major powers after Alexander, and Silk Road trade grows as those regions connect.",
 events:[
  {id:"persia",label:"Persian Empire builds roads",detail:"Royal roads help govern and connect a huge empire."},
  {id:"alex",label:"Alexander links regions",detail:"Conquests connect Greek, Egyptian, Persian, and Asian lands."},
  {id:"rome",label:"Rome dominates the Mediterranean",detail:"Roman rule connects Europe, North Africa, and Southwest Asia."},
  {id:"han",label:"Han China grows powerful",detail:"The Han strengthen government and trade in East Asia."},
  {id:"silk",label:"Silk Road trade expands",detail:"Goods and ideas move across long-distance Eurasian networks."},
  {id:"exchange",label:"Cultures influence one another",detail:"Religion, art, technology, and knowledge travel with merchants and travelers."}
 ]
}
];

let roundIndex=0,totalCorrect=0,totalPossible=0,placed=[],timer=null,timeLeft=0,phase="intro",audioCtx=null;

const $=s=>document.querySelector(s);
const els={
 main:$("#mainPanel"),action:$("#primaryAction"),secondary:$("#secondaryAction"),time:$("#timeValue"),
 round:$("#roundValue"),score:$("#scoreValue"),hint:$("#hintBox"),result:$("#resultBox"),
 slots:$("#timelineSlots"),progress:$("#progressBar"),completion:$("#completion"),badgeRank:$("#badgeRank"),
 badgeScore:$("#badgeScore")
};

function audioReady(){
 if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
 if(audioCtx.state==="suspended") audioCtx.resume();
}
function tone(freq,dur=.08,type="sine",vol=.18,delay=0){
 audioReady();const o=audioCtx.createOscillator(),g=audioCtx.createGain();
 o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,audioCtx.currentTime+delay);
 g.gain.linearRampToValueAtTime(vol,audioCtx.currentTime+delay+.01);
 g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+delay+dur);
 o.connect(g);g.connect(audioCtx.destination);o.start(audioCtx.currentTime+delay);o.stop(audioCtx.currentTime+delay+dur+.03);
}
function sfx(name){
 if(name==="click") tone(240,.05,"square",.11);
 if(name==="place"){tone(520,.08,"sine",.16);tone(780,.09,"sine",.12,.06);}
 if(name==="warning") tone(150,.11,"sawtooth",.16);
 if(name==="correct"){tone(523,.12,"sine",.18);tone(659,.12,"sine",.18,.09);tone(784,.18,"sine",.19,.18);}
 if(name==="wrong"){tone(210,.18,"sawtooth",.16);tone(155,.22,"sawtooth",.13,.12);}
 if(name==="win"){[392,523,659,784,1046].forEach((f,i)=>tone(f,.25,"sine",.2,i*.11));}
}
document.addEventListener("pointerdown",audioReady,{once:true});

function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function fmt(n){return "0:"+String(Math.max(0,n)).padStart(2,"0")}
function stopTimer(){if(timer){clearInterval(timer);timer=null}}
function runTimer(seconds,onDone){
 stopTimer();timeLeft=seconds;els.time.textContent=fmt(timeLeft);
 timer=setInterval(()=>{
   timeLeft--;els.time.textContent=fmt(timeLeft);
   if(phase==="arrange"&&timeLeft<=5&&timeLeft>0)sfx("warning");
   if(phase==="arrange"&&timeLeft===Math.floor(seconds/2)){els.hint.hidden=false;els.hint.innerHTML="<strong>Hint:</strong> "+ROUNDS[roundIndex].hint;}
   if(timeLeft<=0){stopTimer();onDone();}
 },1000);
}
function renderProgress(){
 els.progress.innerHTML=ROUNDS.map((_,i)=>'<div class="progress-dot '+(i<roundIndex?"done":i===roundIndex?"current":"")+'">'+(i+1)+'</div>').join("");
 els.round.textContent=(roundIndex+1)+"/"+ROUNDS.length;
}
function renderTimeline(){
 const r=ROUNDS[roundIndex],count=r.events.length;
 els.slots.style.gridTemplateColumns='repeat('+count+',minmax(70px,1fr))';
 els.slots.innerHTML=Array.from({length:count},(_,i)=>{
   const id=placed[i],ev=r.events.find(e=>e.id===id);
   return '<button class="timeline-slot '+(ev?"filled":"empty")+'" data-index="'+i+'" '+(ev?'title="Tap to remove"':'disabled')+'><span class="node"></span><span class="timeline-label">'+(ev?ev.label:"")+'</span></button>';
 }).join("");
 els.slots.querySelectorAll(".filled").forEach(b=>b.addEventListener("click",()=>{
   sfx("click");placed.splice(Number(b.dataset.index),1);renderArrangeCards();renderTimeline();syncSubmit();
 }));
}
function renderArrangeCards(){
 const r=ROUNDS[roundIndex];
 const order=window._currentShuffle||r.events;
 els.main.innerHTML='<h2>Arrange the Timeline</h2><p class="board-note">Tap the events in the order you believe they happened. They will light up on the timeline above. Tap a timeline event to remove it and try again.</p><div class="card-grid" id="cardGrid"></div>';
 const grid=$("#cardGrid");
 grid.innerHTML=order.map(ev=>'<button class="event-card '+(placed.includes(ev.id)?"placed":"")+'" data-id="'+ev.id+'"><strong>'+ev.label+'</strong><small>'+ev.detail+'</small></button>').join("");
 grid.querySelectorAll(".event-card:not(.placed)").forEach(b=>b.addEventListener("click",()=>{
   if(placed.length>=r.events.length)return;
   sfx("place");placed.push(b.dataset.id);renderArrangeCards();renderTimeline();syncSubmit();
 }));
}
function syncSubmit(){els.action.disabled=placed.length!==ROUNDS[roundIndex].events.length}
function showIntro(){
 phase="intro";renderProgress();els.time.textContent="—";els.score.textContent=totalCorrect;
 els.hint.hidden=true;els.result.hidden=true;els.secondary.hidden=true;
 els.main.innerHTML='<h2>Ancient Worlds: Time Rush</h2><div class="study-card"><h3>How to Play</h3><p>Each round begins with a short history reading. Study it before the clock runs out. Then the reading disappears and you must place the events in chronological order. Complete all nine rounds to earn your Ancient Worlds badge and unlock the next Time Rush game.</p></div>';
 els.action.textContent="Start Game";els.action.disabled=false;
}
function beginStudy(){
 sfx("click");phase="study";placed=[];window._currentShuffle=null;renderProgress();renderTimeline();
 const r=ROUNDS[roundIndex];els.hint.hidden=true;els.result.hidden=true;els.secondary.hidden=true;
 els.main.innerHTML='<h2>Study the Past</h2><div class="study-card"><div class="study-timer">Study Time · '+r.studySeconds+' seconds</div><h3>'+r.title+'</h3><p>'+r.study+'</p></div>';
 els.action.textContent="I'm Ready";els.action.disabled=false;
 runTimer(r.studySeconds,beginArrange);
}
function beginArrange(){
 stopTimer();phase="arrange";const r=ROUNDS[roundIndex];window._currentShuffle=shuffle(r.events);placed=[];
 renderArrangeCards();renderTimeline();els.hint.hidden=true;els.result.hidden=true;els.secondary.hidden=false;els.secondary.textContent="Clear Timeline";
 els.secondary.onclick=()=>{sfx("click");placed=[];renderArrangeCards();renderTimeline();syncSubmit();};
 els.action.textContent="Submit Timeline";els.action.disabled=true;
 runTimer(r.playSeconds,()=>submitRound(true));
}
function submitRound(auto=false){
 if(phase!=="arrange")return;stopTimer();phase="feedback";
 const r=ROUNDS[roundIndex],correctIds=r.events.map(e=>e.id);
 let correct=0;correctIds.forEach((id,i)=>{if(placed[i]===id)correct++});
 totalCorrect+=correct;totalPossible+=r.events.length;els.score.textContent=totalCorrect;
 const perfect=correct===r.events.length;
 perfect?sfx("correct"):sfx("wrong");
 const pct=Math.round(correct/r.events.length*100);
 els.result.hidden=false;els.hint.hidden=true;els.secondary.hidden=true;
 els.result.innerHTML='<strong>'+(perfect?"Perfect Timeline!":auto?"Time ran out.":"Round complete.")+'</strong><br>'+correct+' of '+r.events.length+' events are in the correct position ('+pct+'%).<ol class="feedback-order">'+r.events.map(e=>'<li>'+e.label+'</li>').join("")+'</ol>';
 // Show the correct timeline after feedback.
 placed=[...correctIds];renderTimeline();
 els.action.disabled=false;els.action.textContent=roundIndex===ROUNDS.length-1?"Claim Badge":"Next Round";
}
function advance(){
 if(roundIndex===ROUNDS.length-1){finishGame();return}
 roundIndex++;beginStudy();
}
function finishGame(){
 stopTimer();phase="complete";sfx("win");
 const pct=Math.round(totalCorrect/Math.max(1,totalPossible)*100);
 const rank=pct>=95?"Master Chronologist":pct>=85?"Expert Chronologist":pct>=70?"Skilled Chronologist":"Ancient Worlds Explorer";
 localStorage.setItem("etp_time_rush_ancient_worlds_complete","1");
 localStorage.setItem("etp_time_rush_presidents_unlocked","1");
 localStorage.setItem("etp_time_rush_ancient_worlds_score",String(pct));
 els.badgeRank.textContent=rank;els.badgeScore.textContent=pct+"% timeline accuracy";
 els.completion.classList.add("show");
}
els.action.addEventListener("click",()=>{
 audioReady();
 if(phase==="intro")beginStudy();
 else if(phase==="study")beginArrange();
 else if(phase==="arrange")submitRound(false);
 else if(phase==="feedback")advance();
});
$("#playAgain").addEventListener("click",()=>location.reload());
$("#vaultReturn").addEventListener("click",()=>location.href="../");
showIntro();renderTimeline();