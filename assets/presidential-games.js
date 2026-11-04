(()=>{"use strict";
const $=id=>document.getElementById(id),mode=document.body.dataset.presidentialGame,DATA=PRESIDENT_DATA;
const names=DATA.names,terms=DATA.terms,unique=names.map((name,i)=>({name,n:i+1,term:terms[i]})).filter((p,i,a)=>a.findIndex(x=>x.name===p.name)===i);
const portrait=n=>"../../../assets/presidents/portraits/"+String(n).padStart(2,"0")+".webp";
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a};
const node=(tag,cls,txt)=>{let e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const celebrate=(big=false)=>{window.BHGameFX?.sound(big?"win":"success");window.BHGameFX?.confetti(document.body,big?65:30)};
const facts=[...new Map(PRESIDENT_CHALLENGES.flatMap(ch=>ch.questions).map(q=>[q.q,q])).values()].filter(q=>q.n&&q.q&&q.answer&&q.explanation);
const named=new Map();for(const q of facts)if(!named.has(q.answer))named.set(q.answer,q);
const people=unique.filter(p=>named.has(p.name));
function say(t){$("status").textContent=t}
function putPortrait(where,p){const img=node("img");img.src=portrait(p.n);img.alt="Illustration of "+p.name;img.loading="lazy";where.append(img);return img}
function option(label,act,cls="bhg-answer"){const b=node("button",cls,label);b.type="button";b.addEventListener("click",act);return b}
function bingo(){
 let picks=[],card=[],marked=new Set(),active=null,win=false,locked=false;
 const clue=q=>q.q.replace(/Which president|Who|Whose|Which U\.S\. president/i,"Which president");
 const next=()=>{const left=picks.filter(p=>!marked.has(p.n));active=left.length?left[Math.floor(Math.random()*left.length)]:null;$("clue").textContent=active?clue(named.get(active.name)):"All portraits found! Shuffle for a new card.";};
 const lines=()=>{let yes=card.map(p=>p===null||marked.has(p.n));let checks=[];for(let i=0;i<5;i++){checks.push([0,1,2,3,4].map(k=>i*5+k));checks.push([0,1,2,3,4].map(k=>k*5+i));}checks.push([0,6,12,18,24],[4,8,12,16,20]);return checks.some(c=>c.every(i=>yes[i]));};
 function draw(){const b=$("board");b.replaceChildren();card.forEach(p=>{let tile=node("button","bhg-card"+(p===null?" free":marked.has(p.n)?" marked":""),p===null?"FREE":undefined);tile.type="button";if(p){putPortrait(tile,p);tile.append(node("span","",p.name));tile.disabled=marked.has(p.n);tile.addEventListener("click",()=>{if(!active||locked)return;if(p.n!==active.n){say("Not quite. Use the clue to choose the president.");return;}locked=true;marked.add(p.n);say("Correct — "+p.name+"!");celebrate();draw();if(lines()&&!win){win=true;say("BINGO! Five in a row!");celebrate(true);}setTimeout(()=>{locked=false;next();},900)});}else tile.addEventListener("click",()=>say("FREE is already marked."));b.append(tile)});$("score").textContent=marked.size+" / 24 found";}
 function start(){picks=shuffle(people).slice(0,24);card=[...picks.slice(0,12),null,...picks.slice(12)];marked=new Set();win=false;locked=false;draw();next();say("Find the portrait described above.");window.BHGameFX?.sound("start")}
 $("restart").addEventListener("click",start);start();
}
function who(){
 let rounds=[],index=0,step=0,score=0,finished=false,options=[];
 function start(){rounds=shuffle(people).slice(0,10);index=0;score=0;show();window.BHGameFX?.sound("start")}
 function show(){if(index>=rounds.length){$("clue").textContent="Finished! Score: "+score;$("answers").replaceChildren();$("hint").hidden=true;$("next").hidden=true;return;}step=0;finished=false;let p=rounds[index];options=shuffle([p,...shuffle(unique.filter(x=>x.n!==p.n)).slice(0,3)]);$("round").textContent="Round "+(index+1)+" / 10";$("score").textContent="Score: "+score;$("portrait").src=portrait(p.n);$("portrait").alt="Mystery president portrait";$("image").classList.remove("revealed");$("hint").hidden=false;$("next").hidden=true;say("");draw()}
 function draw(){let p=rounds[index],fact=named.get(p.name);const clues=["Presidential term: "+p.term,"Historical clue: "+fact.q.replaceAll(p.name,"this president"),"Additional evidence: "+fact.explanation.replaceAll(p.name,"this president"),"Final clue: Look closely at the portrait."];const text="Clue "+(step+1)+" of 4 · "+(400-step*100)+" points. "+clues[step];$("clue").textContent=text;$("portrait").style.setProperty("--blur",(18-step*5)+"px");$("hint").disabled=step===3;$("answers").replaceChildren();for(let q of options){$("answers").append(option(q.name,b=>{if(finished)return;if(q.n!==p.n){say("Not quite. Try another answer or open another clue.");return;}finished=true;score+=400-step*100;celebrate();$("score").textContent="Score: "+score;$("image").classList.add("revealed");$("portrait").style.setProperty("--blur","0px");say("Correct — "+p.name+"!");$("hint").hidden=true;$("next").hidden=false;for(let el of $("answers").children){el.disabled=true;if(el.textContent===p.name)el.classList.add("right");}}));}}
 $("hint").addEventListener("click",()=>{if(!finished&&step<3){step++;draw()}});$("next").addEventListener("click",()=>{index++;show()});$("restart").addEventListener("click",start);start();
}
function timeline(){
 let cards=[],checked=false,drag=null;
 const year=p=>Number((p.term||"").match(/\d{4}/)?.[0])||0;
 function start(){cards=shuffle(unique.filter(p=>year(p)>0)).slice(0,6).sort(()=>Math.random()-.5);checked=false;$("check").hidden=false;$("reveal").hidden=true;say("Put the earliest presidency first.");draw();window.BHGameFX?.sound("start")}
 function move(i,j){if(checked||j<0||j>=cards.length)return;const [p]=cards.splice(i,1);cards.splice(j,0,p);draw()}
 function draw(){const host=$("list");host.replaceChildren();cards.forEach((p,i)=>{const row=node("article","bhg-timeline-choice");row.style.cssText="display:flex;align-items:center;gap:12px;margin:9px 0";row.draggable=!checked;const img=putPortrait(row,p);img.style.cssText="width:65px;height:72px;object-fit:contain";const name=node("span","",(i+1)+". "+p.name+(checked?" · "+p.term:""));name.style.flex="1";row.append(name);for(const [txt,delta] of [["↑",-1],["↓",1]]){const b=option(txt,()=>move(i,i+delta),"bhg-action");b.disabled=checked||i+delta<0||i+delta>=cards.length;b.setAttribute("aria-label","Move "+p.name+(delta<0?" earlier":" later"));row.append(b)}row.addEventListener("dragstart",()=>drag=i);row.addEventListener("dragover",e=>{if(!checked)e.preventDefault()});row.addEventListener("drop",e=>{e.preventDefault();if(drag!==null)move(drag,i);drag=null});host.append(row)})}
 $("check").addEventListener("click",()=>{if(checked)return;checked=true;const ordered=[...cards].sort((a,b)=>year(a)-year(b));const ok=ordered.every((p,i)=>p.n===cards[i].n);say(ok?"Perfect historical order!":"Check the dates, then reveal the correct order.");if(ok)celebrate(true);$("reveal").hidden=ok;draw()});
 $("reveal").addEventListener("click",()=>{cards.sort((a,b)=>year(a)-year(b));say("Correct chronological order shown.");$("reveal").hidden=true;draw()});
 $("restart").addEventListener("click",start);start();
}
const pairDefs=[
 ["John Adams","John Quincy Adams","Father and son — both served as president."],
 ["George H. W. Bush","George W. Bush","Father and son — both served as president."],
 ["William Henry Harrison","Benjamin Harrison","Grandfather and grandson — both held the presidency."],
 ["Theodore Roosevelt","Franklin D. Roosevelt","Distant cousins from the Roosevelt family."],
 ["Barack Obama","Joe Biden","Biden served as vice president under Obama."],
 ["George Washington","John Adams","Adams served as Washington's vice president before succeeding him."]
];
function connections(){
 const pairs=pairDefs.map(([a,b,why])=>({a:unique.find(p=>p.name===a),b:unique.find(p=>p.name===b),why}));
 if(pairs.some(p=>!p.a||!p.b))throw Error("President family pair missing");
 let order=[],round=0,found=new Set(),chosen=[],busy=false;
 function start(){order=shuffle(pairs.flatMap(p=>[p.a,p.b]));round=0;found=new Set();chosen=[];busy=false;draw();window.BHGameFX?.sound("start")}
 function draw(){const cur=pairs[round];$("clue").textContent=cur?"Find the pair: "+cur.why:"All six connections found!";$("score").textContent="Connections: "+round+" / 6";$("next").hidden=true;$("board").replaceChildren();for(const p of order){const b=node("button","bhg-card"+(found.has(p.n)?" marked":chosen.includes(p.n)?" selected":""));b.type="button";b.disabled=found.has(p.n)||busy||!cur;putPortrait(b,p);b.append(node("span","",p.name));b.addEventListener("click",()=>select(p));$("board").append(b)}}
 function select(p){if(busy||chosen.includes(p.n))return;chosen.push(p.n);if(chosen.length===1){say("Choose the connected president.");draw();return;}const cur=pairs[round];if(chosen.includes(cur.a.n)&&chosen.includes(cur.b.n)){found.add(cur.a.n);found.add(cur.b.n);say("Connection found! "+cur.why);celebrate();$("next").hidden=false;for(const b of $("board").children)b.disabled=true;}else{say("Those presidents do not form this pair. Try again.");busy=true;setTimeout(()=>{busy=false;chosen=[];draw()},750)}}
 $("next").addEventListener("click",()=>{round++;chosen=[];draw();if(round===6){say("All connections completed!");celebrate(true)}});
 $("restart").addEventListener("click",start);start();
}
function board(){
 const categories=["Founding Era","19th Century","Reconstruction & Reform","20th Century","Modern Presidency"];
 const pools=[facts.filter(x=>x.n<=6),facts.filter(x=>x.n>=7&&x.n<=16),facts.filter(x=>x.n>=17&&x.n<=27),facts.filter(x=>x.n>=28&&x.n<=39),facts.filter(x=>x.n>=40)];
 const fallback=shuffle(facts),deck=pools.map((pool,i)=>{let selected=shuffle(pool).slice(0,5);for(const f of fallback)if(selected.length<5&&!selected.some(x=>x.q===f.q))selected.push(f);return selected});
 let used=new Set(),score=0,active=null;
 function render(){$("board").replaceChildren();for(const name of categories)$("board").append(node("div","bhg-category",name));for(let row=0;row<5;row++)for(let col=0;col<5;col++){let id=col+"-"+row,b=option((row+1)*100,()=>open(col,row),"bhg-cell");b.disabled=used.has(id);b.setAttribute("aria-label",categories[col]+" for "+((row+1)*100)+" points");$("board").append(b)}$("score").textContent="Score: "+score;$("remaining").textContent=(25-used.size)+" clues left"}
 function open(col,row){active={col,row,id:col+"-"+row,q:deck[col][row]};$("board").hidden=true;$("question").hidden=false;$("question-title").textContent=categories[col]+" · "+((row+1)*100)+" points";$("clue").textContent=active.q.q;const options=shuffle([unique.find(x=>x.name===active.q.answer),...shuffle(unique.filter(p=>p.name!==active.q.answer)).slice(0,3)]).filter(Boolean);$("answers").replaceChildren();$("reveal").replaceChildren();say("Select the president.");for(const p of options){$("answers").append(option(p.name,()=>pick(p)))}$("return").textContent="Skip & Return to Board";window.BHGameFX?.sound("start")}
 function pick(p){if(!active||used.has(active.id))return;const a=active;used.add(a.id);const good=p.name===a.q.answer;if(good){score+=(a.row+1)*100;celebrate();say("Correct! +"+((a.row+1)*100)+" points.")}else say("The correct answer is "+a.q.answer+".");for(let b of $("answers").children){b.disabled=true;if(b.textContent===a.q.answer)b.classList.add("right");else if(b.textContent===p.name&&!good)b.classList.add("wrong")}const winner=unique.find(x=>x.name===a.q.answer);if(winner)putPortrait($("reveal"),winner);$("reveal").append(node("p","",a.q.explanation));$("return").textContent="Return to Board";}
 $("return").addEventListener("click",()=>{if(active&&!used.has(active.id))used.add(active.id);active=null;$("question").hidden=true;$("board").hidden=false;render();if(used.size===25){say("Board complete!");celebrate(true)}});
 $("restart").addEventListener("click",()=>{used=new Set();score=0;active=null;$("question").hidden=true;$("board").hidden=false;render()});render();
}
try{if(mode==="bingo")bingo();else if(mode==="who")who();else if(mode==="timeline")timeline();else if(mode==="connections")connections();else if(mode==="board")board();else throw Error("Unknown game mode");}catch(e){console.error(e);say("This game could not start. Please reload the page.")}
})();