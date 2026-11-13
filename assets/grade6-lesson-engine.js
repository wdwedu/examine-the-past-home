/* ETP Grade 6 Ancient World · 20 original interactive lesson drafts.
   All geographic diagrams are explicitly schematic, not cartographic reconstructions. */
(()=>{'use strict';
const page=document.querySelector('main[data-lesson-course="grade-6-ancient-world-history"]');if(!page)return;
const root=page.dataset.root||'../../../../',slug=page.dataset.lessonSlug;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const Q=(s,base=page)=>base.querySelector(s),QA=(s,base=page)=>[...base.querySelectorAll(s)];
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const maps={
'mesopotamia-and-the-first-cities':{title:'Mesopotamia • river and city relationships',labels:['Tigris River','Euphrates River','Uruk','Ur'],colors:['#75c8ef','#80c8ec']},
'ancient-egypt-and-the-nile':{title:'Egypt • river valley from south to north',labels:['Upper Nile (south)','Nile Valley','Delta (north)','Mediterranean Sea'],colors:['#75c8ef','#80c8ec']},
'the-indus-valley-civilization':{title:'Indus region • river and urban sites',labels:['Indus River','Harappa','Mohenjo-daro','Arabian Sea'],colors:['#75c8ef','#80c8ec']},
'early-chinese-civilizations':{title:'Early China • river and archaeological setting',labels:['Yellow River','Shang centers','Anyang','Bronze and inscriptions'],colors:['#75c8ef','#80c8ec']},
'the-silk-roads-and-cultural-exchange':{title:'Silk Roads • network schematic',labels:['East Asian exchanges','Central Asian oasis towns','Iranian plateau','Western Asian markets'],colors:['#c8ac74','#d5ca85']},
'ancient-greece-and-the-origins-of-democracy':{title:'Greek world • polis relationships',labels:['Aegean Sea','Greek city-states','Athens','Other poleis'],colors:['#71b6de','#8ecadd']},
'rome-republic-empire-and-legacy':{title:'Rome • Mediterranean connections',labels:['Italian peninsula','Rome','Mediterranean sea lanes','Empire-wide provinces'],colors:['#a5b7db','#b5c6e6']},
'geography-and-human-settlement':{title:'Settlement decision map',labels:['Fresh water','Fertile land','Routes','Flood risk'],colors:['#71c9cc','#afd889']}
};
const sourceMap={0:[4,5],1:[0,5],2:[0,1,2],3:[0,4,5],4:[3,4],5:[0,3,4]};
const supplementalSources={
"from-hunting-and-gathering-to-agriculture":[["National Geographic Education · Early Agricultural Communities","https://education.nationalgeographic.org/resource/early-agricultural-communities/6th-grade/"]],
"why-did-early-cities-develop":[["National Geographic Education · Life in Ancient Cities","https://education.nationalgeographic.org/resource/life-ancient-cities/6th-grade/"]],
"the-indus-valley-civilization":[["National Geographic Education · Life in Ancient Cities","https://education.nationalgeographic.org/resource/life-ancient-cities/6th-grade/"]],
"ancient-greece-and-the-origins-of-democracy":[["British Museum · A Question for the People (Ancient Athens)","https://www.britishmuseum.org/sites/default/files/2019-10/BM_Aquestionforthepeople_2019.pdf"]],
"rome-republic-empire-and-legacy":[["British Museum · The Roman Empire Collections","https://www.britishmuseum.org/sites/default/files/2019-09/british_museum_roman_empire.pdf"]],
"farming-technology-and-environmental-change":[["National Geographic Education · Early Agricultural Communities","https://education.nationalgeographic.org/resource/early-agricultural-communities/6th-grade/"]]
};
function getSources(d,data){
const common=data.sources[4];
const direct=supplementalSources[d.slug]||[];
const selected=/mesopotamia|cities|surplus/.test(d.slug)?[data.sources[0],data.sources[5]]:/egypt|nile/.test(d.slug)?[data.sources[1]]:/chinese|shang/.test(d.slug)?[data.sources[2]]:/silk|trade|migration/.test(d.slug)?[data.sources[3]]:[];
return [common,...selected,...direct].filter((x,i,a)=>a.findIndex(y=>y[1]===x[1])===i);
}
function svgRegionalMap(d){
const title=(maps[d.slug]?.title)||d.title;
const top='<svg viewBox="0 0 840 350" role="img" aria-label="'+esc(title)+' — conceptual geographic orientation, not to scale" xmlns="http://www.w3.org/2000/svg"><rect width="840" height="350" rx="14" fill="#0a1d18"/><path d="M30 310H810" stroke="#4b6454" stroke-width="2"/>';
const dot=(x,y,label,color='#fff200')=>'<g><circle cx="'+x+'" cy="'+y+'" r="7" fill="'+color+'" stroke="#06110a" stroke-width="2"/><text x="'+(x+13)+'" y="'+(y+5)+'" fill="#f1f4e8" font-size="17" font-family="Georgia,serif">'+esc(label)+'</text></g>';
const text=(x,y,label,color='#bceec5')=>'<text x="'+x+'" y="'+y+'" font-size="17" fill="'+color+'" font-family="Georgia,serif">'+esc(label)+'</text>';
let draw='';
switch(d.slug){
case 'ancient-egypt-and-the-nile':
draw='<path d="M375 286Q355 240 380 195T380 115Q332 73 295 47M380 115Q428 72 465 48" stroke="#74c5ee" fill="none" stroke-width="15"/>'+text(290,29,'NORTH ↑ Mediterranean Sea')+dot(375,108,'Nile Delta')+dot(378,208,'Nile Valley')+text(225,291,'Upper Nile · upstream south')+text(524,267,'Eastern Desert')+text(73,183,'Western Desert');
break;
case 'mesopotamia-and-the-first-cities':
draw='<path d="M272 36Q298 101 266 166T300 310M505 33Q470 95 500 174T465 315" stroke="#74c5ee" stroke-width="13" fill="none"/>'+text(88,55,'Tigris')+text(565,55,'Euphrates')+dot(400,232,'Uruk')+dot(420,293,'Ur')+text(328,22,'NORTH ↑')+text(63,306,'Southern alluvial plain');
break;
case 'the-indus-valley-civilization':
draw='<path d="M353 36Q310 100 359 157T334 279L299 312" stroke="#73bfe8" stroke-width="16" fill="none"/>'+dot(353,93,'Harappa')+dot(333,233,'Mohenjo-daro')+text(330,24,'NORTH ↑')+text(330,333,'Arabian Sea ↓')+text(518,157,'Indus region');
break;
case 'early-chinese-civilizations':
draw='<path d="M160 100Q300 65 380 109T590 104Q655 106 725 73" fill="none" stroke="#77c4ee" stroke-width="16"/>'+dot(430,138,'Anyang · Shang center')+text(350,36,'NORTH ↑')+text(86,160,'Yellow River (Huang He)')+text(426,293,'Central and northern China');
break;
case 'the-silk-roads-and-cultural-exchange':
draw='<path d="M85 188Q300 87 420 162T760 182M84 203Q270 281 480 217T754 198" fill="none" stroke="#daa75f" stroke-width="5" stroke-dasharray="14 10"/>'+dot(86,188,'West Asian markets')+dot(286,154,'Iranian plateau')+dot(486,195,'Central Asian oases')+dot(716,184,'East Asia')+text(270,40,'Multiple directions · land and sea connections');
break;
case 'ancient-greece-and-the-origins-of-democracy':
draw='<path d="M325 72Q279 139 314 203T265 290M575 76Q519 137 566 203T539 277" stroke="#6fb2dd" stroke-width="10" fill="none" opacity=".8"/>'+dot(298,181,'Athens')+text(320,27,'Greek mainland and Aegean')+text(610,286,'Islands and poleis')+text(40,300,'Mediterranean connections');
break;
case 'rome-republic-empire-and-legacy':
draw='<ellipse cx="420" cy="170" rx="285" ry="90" fill="#194a5e" opacity=".8" stroke="#78b4cc" stroke-width="4"/>'+dot(349,111,'Rome')+text(245,170,'Mediterranean Sea')+text(170,42,'Europe · north')+text(150,318,'North Africa · south')+text(604,69,'Eastern provinces');
break;
case 'geography-and-human-settlement':
draw='<path d="M330 32Q364 101 336 167T376 311" stroke="#7fc6eb" stroke-width="16" fill="none"/>'+dot(430,115,'High ground')+dot(375,203,'River access')+dot(584,248,'Trade path')+text(65,275,'Floodplain and farmland')+text(90,43,'Environment and settlement choices');
break;
default:return '';
}
return top+draw+text(252,345,'Schematic · relationships only · not a scaled historical map','#d4e7d8')+'</svg>';
}
function svgDiagram(d){
const visual=d.visual;const special=maps[d.slug];const labels=(special?.labels||visual.labels).map(esc);
const title=esc(special?.title||d.title+' • historical systems diagram');
const nodeColors=['#a8f27a','#9cd5f5','#f5d279','#dfacdb'],paths=[];
let art='';
if(special){
const river=/River|Nile|Indus|Egypt|Mesopotamia|China/.test(special.title);
if(river){
art='<path d="M160 25 Q220 80 166 137 T223 249 T164 325" fill="none" stroke="#72c5eb" stroke-width="21" opacity=".65"/><path d="M448 22 Q389 104 447 177 T411 326" fill="none" stroke="#7bc1ec" stroke-width="17" opacity=".52"/>';
}else{art='<path d="M80 170 Q210 52 305 136 T520 154 T720 92" fill="none" stroke="#c9ab6b" stroke-width="6" stroke-dasharray="13 10"/>'}
}else{
art='<path d="M110 175H710" stroke="#678a70" stroke-width="5"/><path d="M275 174Q355 55 450 174" fill="none" stroke="#a1c77c" opacity=".55" stroke-width="3"/>';
}
const xy=[[130,75],[310,245],[510,75],[705,245]];
xy.forEach(([x,y],i)=>{
const fill=nodeColors[i];paths.push('<g><circle cx="'+x+'" cy="'+y+'" r="38" fill="#0e241c" stroke="'+fill+'" stroke-width="3"/><text x="'+x+'" y="'+(y+6)+'" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="20" fill="'+fill+'">'+(i+1)+'</text><text x="'+x+'" y="'+(y+55)+'" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#f2f5e9">'+labels[i]+'</text></g>');
});
return '<svg viewBox="0 0 840 355" role="img" aria-label="'+title+'" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="840" height="355" rx="18" fill="#091b17"/><path d="M35 324H800" stroke="#2e4d41" stroke-width="3"/>'+art+paths.join('')+'<text x="420" y="27" text-anchor="middle" font-size="17" font-family="Georgia,serif" fill="#fff200">'+title+'</text></svg>';
}
function h(level,text){const node=el(level,'',text);return node}
function panel(id,title){const s=el('section','g6-panel');s.id=id;s.append(h('h2',title));return s}
function p(text,cls){return el('p',cls||'',text)}
function link(url,label){const a=el('a','',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
function list(items,ordered=false){const l=el(ordered?'ol':'ul');for(const x of items)l.append(el('li','',x));return l}
function pathFor(slug){return '../'+slug+'/'}
function getIcon(i){return ['🧭','🔎','📜','🏺','🌿','✨'][i%6]}
function build(d,data){
page.classList.add('g6-site');const course='Grade 6 · Ancient World History & Geography';
const lessons=Object.values(data.lessons);const index=lessons.findIndex(x=>x.slug===d.slug);
const sequence=lessons.filter(x=>x.unit===d.unit);const last=sequence[sequence.length-1].slug===d.slug;
const unitTitle=data.units[d.unit];const stateKey='etp-grade6-'+d.slug;
const getSave=()=>{try{return JSON.parse(localStorage.getItem(stateKey)||'{}')}catch{return {}}};
const save=getSave(),scores=new Map(),attempts=new Map();
const store=()=>{try{localStorage.setItem(stateKey,JSON.stringify({answers:Object.fromEntries(scores),essay:Q('#g6-writing')?.value??save.essay??'',activity:save.activity||-1}))}catch{}};
page.replaceChildren();
const back=el('a','etp-path','← Grade 6 Course Directory');back.href='../';page.append(back);
const hero=el('header','g6-hero');hero.append(el('div','g6-kicker',course+' · Unit '+(d.unit+1)+' · '+unitTitle),h('h1',d.title),p(d.question));const tags=el('div','g6-pills');
['Independent or classroom study','Approx. 45–60 minutes','Original history inquiry','Interactive draft · Review'].forEach(t=>tags.append(el('span','',t)));hero.append(tags);page.append(hero);
document.title=(d.lessonTitle||d.slug.replaceAll('-',' '))+' | '+course+' | Examine the Past';
const toolbar=el('nav','g6-toolbar');toolbar.setAttribute('aria-label','Lesson quick navigation');
[['Discover','#g6-read'],['Visual evidence','#g6-visual'],['Investigate','#g6-investigate'],['Check understanding','#g6-check'],['Write & reflect','#g6-reflect'],['Teacher guide','#g6-teach']].forEach(([txt,href])=>{const a=el('a','',txt);a.href=href;toolbar.append(a)});
const timer=el('button','','Start 10-min focus');timer.type='button';let timerId=null,remaining=600;
timer.onclick=()=>{if(timerId){clearInterval(timerId);timerId=null;timer.textContent='Resume focus';return}timerId=setInterval(()=>{remaining--;timer.textContent='Focus '+Math.floor(remaining/60)+':'+String(remaining%60).padStart(2,'0');if(remaining<=0){clearInterval(timerId);timerId=null;timer.textContent='Focus complete ✓'}},1000);timer.textContent='Focus 10:00'};
toolbar.append(timer);const progress=el('span','g6-progress','Inquiry seals · 0/3');toolbar.append(progress);page.append(toolbar);
const wrap=el('div','g6-layout'),main=el('div','g6-main'),aside=el('aside','g6-aside');wrap.append(main,aside);page.append(wrap);
const read=panel('g6-read','Discover · Historical context');read.append(p(d.reading[0]),p(d.reading[1]));if(d.extension)read.append(h('h3','Look deeper · People, evidence, and change'),p(d.extension[0]));read.append(h('h3','Key vocabulary'));const terms=el('div','g6-keywords');d.terms.forEach(w=>terms.append(el('span','',w)));read.append(terms);main.append(read);
const vis=panel('g6-visual','Explore · Visual history');vis.append(p('Explore the relationships shown here, then compare them with a dated archaeological or historical source. This is an original instructional schematic, not a geographically scaled historical map or a measured statistical chart.'));
const fig=el('figure','g6-visual');fig.innerHTML=maps[d.slug]?svgRegionalMap(d):svgDiagram(d);fig.append(el('figcaption','','Schematic teaching diagram. Relationships and sequence are emphasized; positions, scale, and routes are not evidence of historical distances.'));vis.append(fig);
const meanings=el('div','g6-choices');const output=el('p','g6-activity-result','Choose a numbered feature to reveal its significance.');
d.visual.labels.forEach((name,i)=>{const b=el('button','',String(i+1)+' · '+name);b.type='button';b.onclick=()=>{QA('button',meanings).forEach(n=>n.setAttribute('aria-pressed',String(n===b)));output.textContent=d.visual.descriptions[i]};meanings.append(b)});vis.append(meanings,output);main.append(vis);
const inquiry=panel('g6-investigate','Investigate · History from evidence');inquiry.append(h('h3',getIcon(d.unit)+' '+d.title));const topic=p(d.case,'g6-note');inquiry.append(topic);
const challenge=p('Historical thinking challenge: '+d.task);inquiry.append(challenge);if(d.extension)inquiry.append(p('Apply it: '+d.extension[1],'g6-note'));
const evidence=el('div','g6-choices');const views=['What we can observe','What we might infer','What remains uncertain','What further source would help?'];
const viewResponse=el('p','g6-activity-result','Choose an investigation lens to work through the evidence.');
views.forEach((name,i)=>{const b=el('button','',name);b.type='button';b.onclick=()=>{QA('button',evidence).forEach(n=>n.setAttribute('aria-pressed',String(n===b)));viewResponse.textContent=[d.case,'Possible interpretation: '+d.reading[1].slice(0,210)+'…','Limitation: '+d.caution,'Investigate: '+d.sourceType+'. Verify chronology and context, and distinguish evidence from inference.'][i]};evidence.append(b)});
inquiry.append(evidence,viewResponse);main.append(inquiry);
const checks=panel('g6-check','Check your understanding · Three challenges');checks.append(p('These practice checks reward careful thinking. You can retry; they are not a final grade. Each correct answer earns one Ancient World Inquiry Seal.'));
const methods=['tiles','decision','evidence'];const categories=['Historical knowledge','Evidence detective','Context and interpretation'];
d.checks.forEach((q,i)=>{
const area=el('div','g6-quiz');area.dataset.style=methods[(index+i)%3];area.dataset.check=i;area.append(h('h3',getIcon(index+i)+' '+categories[i]+' · '+q.prompt));
const opts=el('div','g6-options');const response=el('p','g6-response','Choose the strongest historical answer.');
// Rotate the order between questions without introducing randomized grading or changing text.
const order=[[0,2,1],[1,0,2],[2,1,0]][(index+i)%3];
order.forEach(n=>{const b=el('button','',q.options[n]);b.type='button';b.onclick=()=>{
QA('button',opts).forEach(k=>k.setAttribute('aria-pressed',String(k===b)));
const ok=n===q.answer;scores.set(i,ok);attempts.set(i,(attempts.get(i)||0)+1);updateProgress();
response.textContent=ok?'✓ Correct: '+q.options[q.answer]+'. Explain your evidence in your own words.':'Try another answer. '+d.caution+' Use the reading and visual evidence, then reconsider.';store();
};opts.append(b)});
area.append(opts,response);checks.append(area);
});
const badge=el('div','g6-reward');const rewardNames=['Compass Points','Settlement Stones','River Runes','Civic Laurels','Caravan Tokens','Adaptation Leaves'];badge.append(el('strong','','Earn '+rewardNames[d.unit]));const seals=el('div','g6-seals');
categories.forEach((c,i)=>{const span=el('span','g6-seal','○ '+c);span.dataset.seal=i;seals.append(span)});badge.append(seals,el('small','','Earn up to three seals per lesson. Results are practice feedback; unit assessment is separate.'));checks.append(badge);
function updateProgress(){let correct=0;categories.forEach((name,i)=>{const s=Q('[data-seal="'+i+'"]',seals);const earned=scores.get(i)===true;if(earned)correct++;s.classList.toggle('earned',earned);s.textContent=(earned?'✓ ':'○ ')+name});progress.textContent='Inquiry seals · '+correct+'/3';store()}
if(save.answers){Object.entries(save.answers).forEach(([k,v])=>{if(Number(k)<3)scores.set(Number(k),v)})}updateProgress();main.append(checks);
const reflect=panel('g6-reflect','Create · Claim, evidence, and reasoning');
reflect.append(p('Write a claim answering the essential question. Support it with two accurate historical details; explain what each detail demonstrates and identify one limitation or uncertainty.'));
const ta=el('textarea','g6-write');ta.id='g6-writing';ta.placeholder='My historical claim is… One supporting detail is… Another detail is… A limitation of this evidence is…';ta.value=save.essay||'';ta.addEventListener('input',store);reflect.append(ta);
const actions=el('div','g6-actions');const copy=el('button','g6-action','Copy response');copy.type='button';copy.onclick=async()=>{if(!ta.value.trim()){copy.textContent='Write a response first';return}try{await navigator.clipboard.writeText(ta.value);copy.textContent='Copied ✓'}catch{ta.focus();ta.select();copy.textContent='Select and copy'}setTimeout(()=>copy.textContent='Copy response',2200)};actions.append(copy);
const print=el('button','g6-action','Print study page');print.type='button';print.onclick=()=>window.print();actions.append(print);reflect.append(actions,p('For a stronger answer, compare the diagram with verified sources and explain why the evidence supports your conclusion. Adults can extend this by weighing competing interpretations.','g6-small'));main.append(reflect);
const teacher=panel('g6-teach','Teacher and independent learner guide');
const guide=el('details','g6-guide');guide.open=true;const summ=el('summary','','Instructions, pacing and flexible pathways');guide.append(summ);
const inside=el('div');inside.append(p('Essential question: '+d.question),p('Learning targets: identify accurate historical context, interpret specific evidence with limitations, and defend a reasoned claim.'));
const paths=el('div','g6-paths');[
'30 minutes · 4-minute hook, 10-minute reading, 8-minute investigation, 5-minute checks, 3-minute exit claim.',
'45–60 minutes · 5-minute launch, 12-minute context, 12-minute source comparison, 10-minute interactive inquiry, 10-minute checks and writing, review.',
'90 minutes · Add a group source comparison, map or artifact study, debate, and full evidence-based writing conference.',
'Independent/adult pathway · Read both contexts, evaluate a museum source, complete checks, write an expanded argument and revisit it later.',
'Access supports · Use the vocabulary chips, read aloud when supported by your device, provide a printed diagram, allow oral planning before writing, and check the same historical goal.'
].forEach(t=>paths.append(el('span','',t)));inside.append(paths);
inside.append(h('h3','Teacher assessment guidance'),p('Use the three checks as ungraded formative feedback and the writing response as evidence of reasoning. Look for specificity, source context, a defensible claim, and acknowledgment of uncertainty. Align locally to applicable grade-six social-studies standards before teaching.'));
guide.append(inside);teacher.append(guide);main.append(teacher);
const sources=panel('g6-sources','Sources, context, and historical responsibility');sources.append(p('Original lesson explanations are educational summaries; the following reputable resources support further investigation. No reconstructed diagram is presented as an original ancient map, and no invented ancient quotation is used.'));const ul=el('ul','g6-source-list');getSources(d,data).forEach(([name,url])=>{const li=el('li');li.append(link(url,name));ul.append(li)});sources.append(ul,p('Lesson topic for additional research: '+d.sourceType+'. Source selection should be checked for date, authorship, cultural context, and grade suitability.','g6-small'));main.append(sources);
if(last){
const final=el('section','g6-final');final.id='g6-unit';final.append(h('h2','Unit '+(d.unit+1)+' Evidence Challenge'));final.append(p('This checkpoint draws on lessons from the entire unit. It is distinct from the three ungraded inquiry seals in each lesson.'));
const progressUnit=el('p','g6-status','Answer each question and consider the evidence.');
const unitChecks=sequence.map(s=>({slug:s.slug,q:s.checks[0]}));let correct=0;const unitResults=new Map();
unitChecks.forEach((entry,i)=>{
const box=el('div','g6-quiz');box.dataset.style=methods[i%3];box.append(h('h3','Unit challenge '+(i+1)+' · '+entry.q.prompt));
const options=el('div','g6-options'),fb=el('p','g6-response','Select your answer.');
const order=[[1,0,2],[2,1,0],[0,2,1]][i%3];order.forEach(n=>{const label=entry.q.options[n];const b=el('button','',label);b.type='button';b.onclick=()=>{QA('button',options).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const ok=n===entry.q.answer;unitResults.set(i,ok);fb.textContent=ok?'Correct. Now explain why this evidence fits.':'Review this lesson’s evidence and try again.';progressUnit.textContent='Unit challenge · '+[...unitResults.values()].filter(Boolean).length+' / '+unitChecks.length+' correct';};options.append(b)});box.append(options,fb);final.append(box)});
final.append(progressUnit);main.append(final);
}
const reward=panel('g6-learning','Your investigation toolkit');
reward.append(p('As you work: identify the question, examine the source, compare evidence, and explain what is uncertain. The same skills support Grade 6 coursework, adult historical literacy, and independent learning.'));aside.append(reward);
const notebook=panel('g6-overview','Historical thinking lens');notebook.append(p(d.question));notebook.append(p('Sources to investigate: '+d.sourceType,'g6-small'));notebook.append(p('Careful-history reminder: '+d.caution,'g6-small'));aside.append(notebook);
const method=panel('g6-connections','Make the connection');method.append(p('This is Unit '+(d.unit+1)+' of 6: '+unitTitle+'. Try comparing this inquiry to another society or time period instead of treating the ancient world as one culture.'));method.append(h('h3','Explore the next idea'));const cross=lessons[index+1];if(cross){const a=el('a','',cross.slug.replaceAll('-',' '));a.href=pathFor(cross.slug);method.append(a)}aside.append(method);
const footer=el('nav','g6-footer');footer.setAttribute('aria-label','Course and lesson sequence');
if(lessons[index-1]){const a=el('a','','← Previous lesson');a.href=pathFor(lessons[index-1].slug);footer.append(a)}
const courseLink=el('a','','Return to Grade 6 units');courseLink.href='../#unit-6-'+(d.unit+1);footer.append(courseLink);
if(lessons[index+1]){const a=el('a','','Next lesson →');a.href=pathFor(lessons[index+1].slug);footer.append(a)}page.append(footer);
}
Promise.all([fetch(root+'assets/grade6-lessons-data.json?v=20261113-build-v2').then(r=>{if(!r.ok)throw Error('Grade 6 content unavailable');return r.json()}),fetch(root+'assets/history-hub-catalog.json').then(r=>{if(!r.ok)throw Error('Course catalog unavailable');return r.json()})]).then(([data,catalog])=>{
const d=data.lessons[slug];if(!d)throw Error('Unknown lesson '+slug);const found=catalog.courses.find(c=>c.id==='grade-6-ancient-world-history');const named=found?.units.flatMap(u=>u.lessons)?.find(l=>l.slug===slug);d.title=named?.title||d.title;build(d,data)
}).catch(err=>{console.error('Grade 6 lesson error:',err);const panel=Q('.etp-preview-label');if(panel)panel.textContent='Lesson content could not be loaded. Refresh this page or return to the Grade 6 directory.'});
})();