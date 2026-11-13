/* Examine the Past — Learning Inventory depth and live perspective chart.
   Self-reported preferences, not standardized aptitude or diagnostic scores. */
(()=>{'use strict';if(window.ETPLearningDepth)return;window.ETPLearningDepth=true;
const $=(s,root=document)=>root.querySelector(s),profile=$('#profile'),side=$('#questionSide');
if(!profile||!side||typeof totals!=='function')return;
const types=[
 {id:'V',name:'Visual',color:'#71C4ED',strategy:'Use labeled diagrams, maps and timelines; then reconstruct the information without looking.'},
 {id:'A',name:'Aural',color:'#D788CE',strategy:'Explain ideas aloud, listen carefully, then recall the ideas without a recording.'},
 {id:'R',name:'Verbal',color:'#BBA2F2',strategy:'Write short summaries, draft questions and explain evidence in precise words.'},
 {id:'K',name:'Physical',color:'#F2A663',strategy:'Work with models, simulations and demonstrations, then explain the principle behind the action.'},
 {id:'L',name:'Logical',color:'#F0D66E',strategy:'Build cause-and-effect chains, sort evidence, check assumptions and test patterns.'},
 {id:'S',name:'Social',color:'#7CE8A8',strategy:'Discuss contrasting interpretations and teach someone else, then check your individual recall.'},
 {id:'I',name:'Independent',color:'#81B5FA',strategy:'Make independent plans and reflections, with occasional external feedback to check your thinking.'},
 {id:'F',name:'Flexible',color:'#A7EBCB',strategy:'Switch methods when evidence shows the first method is not working; choose methods for the task.'}
];
function el(tag,cls,txt){const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x}
function addScaleGuide(){
const help=$('.etp-lab-help',side);if(help){
help.innerHTML='<strong>Rate how much each statement describes you:</strong> Use 1 = Not like me at all, 2 = Slightly like me, 3 = Somewhat like me, 4 = Mostly like me, 5 = Very much like me. Answer what you generally do, not what sounds ideal. Choose one rating for every statement; Continue moves you to the next section and Back lets you revise.';
const legend=el('div','etp-scale-guide');legend.setAttribute('aria-label','Rating scale from one to five');
['1 · Not like me at all','2 · Slightly like me','3 · Somewhat like me','4 · Mostly like me','5 · Very much like me'].forEach(t=>legend.append(el('span','',t)));
help.after(legend);
}
side.querySelectorAll('.scale-labels').forEach(labels=>{const spans=labels.querySelectorAll('span');if(spans.length>1){spans[0].textContent='1 · Not like me at all';spans[spans.length-1].textContent='5 · Very much like me';}});
}
function coverage(){
const counts=Object.fromEntries(types.map(t=>[t.id,0]));
const possible=Object.fromEntries(types.map(t=>[t.id,0]));
for(const [si,q] of questions.entries())for(const [qi,item] of q.items.entries()){
if(possible[item[1]]!==undefined)possible[item[1]]++;
if(answers['q'+si+'_'+qi]&&counts[item[1]]!==undefined)counts[item[1]]++;
}
return {counts,possible};
}
function safeScores(){try{return totals()}catch{return {}}}
function makeChart(){
const wrap=el('section','etp-live-visual');
wrap.setAttribute('aria-label','Live profile preferences: scores are self-reported rather than abilities');
wrap.innerHTML='<h3>Discover your learning pattern</h3><p>Watch the dimensions respond as you answer. The columns are an illustrative perspective view of your ratings, not a psychological or aptitude measurement. Unanswered dimensions remain unscored.</p>';
const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 840 305');svg.setAttribute('role','img');svg.setAttribute('aria-label','Eight colored perspective bars showing currently answered learning preference ratings');
wrap.append(svg);const list=el('div','etp-dimension-list');types.forEach(t=>{let item=el('span','',t.name);item.append(el('b','—'));item.dataset.id=t.id;list.append(item)});wrap.append(list);
return {wrap,svg,list};
}
addScaleGuide();const live=makeChart();const labBody=$('.lab-body',profile),reportSide=$('.report-side',profile);
if(labBody&&reportSide)labBody.insertBefore(live.wrap,reportSide);else side.append(live.wrap);
function hexToRgb(hex){let a=hex.replace('#','');return [parseInt(a.slice(0,2),16),parseInt(a.slice(2,4),16),parseInt(a.slice(4,6),16)]}
function colorShift(hex,k){return '#'+hexToRgb(hex).map(c=>Math.max(0,Math.min(255,Math.round(c*k))).toString(16).padStart(2,'0')).join('')}
function polygon(points,fill){return '<polygon points="'+points.map(p=>p.join(',')).join(' ')+'" fill="'+fill+'"/>'}
function renderChart(target,score,isReport=false){
const {svg,list}=target;const baseline=238,x0=57,spacing=94,bar=53,depth=11,dy=9,scale=1.7;
const coverageData=coverage();const lines=['<rect x="0" y="0" width="840" height="305" fill="transparent"/>'];
for(let g=0;g<=4;g++){let y=baseline-g*40;lines.push('<line x1="40" x2="818" y1="'+y+'" y2="'+y+'" stroke="#4e6856" stroke-width="1" stroke-dasharray="4 9" opacity=".6"/>')}
types.forEach((type,i)=>{
let answered=coverageData.counts[type.id]||0,valid=answered>0,h=valid?Math.max(6,(Number(score[type.id])||0)*scale):5,x=x0+i*spacing,y=baseline-h;
let bright=valid?type.color:'#415448';let front=polygon([[x,y],[x+bar,y],[x+bar,baseline],[x,baseline]],bright);
let top=polygon([[x,y],[x+depth,y-dy],[x+bar+depth,y-dy],[x+bar,y]],colorShift(bright,1.24));
let right=polygon([[x+bar,y],[x+bar+depth,y-dy],[x+bar+depth,baseline-dy],[x+bar,baseline]],colorShift(bright,.54));
lines.push('<g>'+front+top+right+'<text x="'+(x+bar/2)+'" y="'+(valid?Math.max(19,y-16):210)+'" font-family="Georgia,serif" font-size="15" font-weight="700" text-anchor="middle" fill="#f4f8ef">'+(valid?Math.round(score[type.id])+'%':'—')+'</text><text x="'+(x+bar/2)+'" y="263" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="700" fill="#eef7e8">'+type.id+'</text></g>');
});
lines.push('<text x="420" y="295" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#c4d6c3">Current average self-ratings · updates with each response</text>');
svg.innerHTML=lines.join('');
if(list)types.forEach(t=>{const node=list.querySelector('[data-id="'+t.id+'"] b');if(node)node.textContent=coverageData.counts[t.id]?Math.round(score[t.id])+'% · '+coverageData.counts[t.id]+'/'+coverageData.possible[t.id]:'Not yet rated'});
}
let displayed=Object.fromEntries(types.map(t=>[t.id,0]));let plotId=0;
function redraw(){const actual=safeScores(),from={...displayed},start=performance.now(),duration=matchMedia('(prefers-reduced-motion:reduce)').matches?0:360;if(plotId)cancelAnimationFrame(plotId);
function step(now){const t=duration?Math.min(1,(now-start)/duration):1,e=t*t*(3-2*t),v={};types.forEach(type=>{v[type.id]=from[type.id]+((actual[type.id]||0)-from[type.id])*e});renderChart(live,v);if(t<1)plotId=requestAnimationFrame(step);else{displayed={...actual};plotId=0}}plotId=requestAnimationFrame(step)}
let scheduled=false;function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;redraw()})}
document.addEventListener('etp-learning-score-change',schedule);
side.addEventListener('change',e=>{if(e.target.matches('input[type=radio]'))schedule()});
function extraReport(){
const report=$('#finalReport');if(!report?.classList.contains('show')||report.dataset.etpExpanded==='yes')return;
report.dataset.etpExpanded='yes';const score=safeScores(),ranked=types.filter(t=>t.id!=='F').sort((a,b)=>(score[b.id]||0)-(score[a.id]||0));
const top=ranked.slice(0,3),social=score.S||0,solitary=score.I||0;
const reportChart=makeChart();reportChart.wrap.querySelector('h3').textContent='Your eight learning dimensions';
reportChart.wrap.querySelector('p').textContent='Higher columns represent stronger reported preferences on the 1–5 scale, not higher ability or a prediction of success.';
renderChart(reportChart,score,true);report.prepend(reportChart.wrap);
function section(title,paras,items=[]){const box=el('section','etp-report-growth');box.append(el('h4','',title));for(const txt of paras)box.append(el('p','',txt));if(items.length){let ul=el('ul');items.forEach(t=>ul.append(el('li','',t)));box.append(ul)}report.append(box);return box}
section('How to read your results',[
'These scores are the averages of your selected 1–5 ratings, shown on a 0–100 display scale. They reflect your self-description at this moment; they are not percent-correct results, cognitive test scores, intelligence, aptitude, or validated personality measures.',
'Your strongest reported preferences: '+top.map(t=>t.name).join(', ')+'. Experiment with these as entry points, but judge what helps by later recall, application and meaningful progress.'
]);
section('Academic learning and history investigations',[
'In history, combine a timeline or map with a source-based question, a short explanation of causes and consequences, and a delayed retrieval check. Compare historical perspectives rather than simply memorizing a narrative.',
'In sciences and mathematics, pair clear models with practice problems, explanations and testing. In reading and writing, summarize, question a source, draft an argument and revisit the work later.'
],top.map(t=>t.strategy));
section('Working with others, communication and friendship',[
'These responses offer conversation starters about conditions you enjoy, but cannot determine whether two people are compatible or which personality you have.',
Math.abs(social-solitary)<12?'Your social and independent preferences are close: consider alternating group discussion with private reflection.':social>solitary?'You currently rate collaborative learning more highly than private work. Make time for independent thinking and reflection alongside discussions.':'You currently rate independent learning more highly than collaboration. You may enjoy a private preparation period before group feedback or joint projects.',
'When someone approaches a task differently, try agreeing on the goal, choosing a communication format both understand, and asking for feedback rather than assuming your approaches are incompatible.'
]);
section('Motivation, frustration and emotional context',[
'Notice when your preferred methods help you begin, and when frustration or overload suggests you should change the task, break it down, take a break or ask for support.',
'This inventory does not measure mental health, emotions, resilience, or interpersonal traits. Treat its results as prompts for reflection, not diagnostic conclusions.'
],['When a difficult task feels unmanageable, write the next small action.','Set a short feedback loop: try a strategy, check recall, and revise.','Choose adequate breaks, accessibility supports and collaborative help when useful.']);
const pursuits=top.map(t=>({V:'visual communication, mapping, design, archival visualization',A:'facilitation, interviews, spoken explanation, training',R:'writing, editing, documentation, research communication',K:'hands-on prototyping, museum demonstrations, applied projects',L:'data analysis, systems investigation, policy research',S:'collaborative projects, mentoring, community outreach',I:'independent archival research, long-form writing, self-directed project work'})[t.id]);
section('Work and career activities to explore—not career predictions',[
'Your reported preferences may suggest activities you would enjoy trying: '+pursuits.join('; ')+'. Explore these through short projects, conversations and real experiences rather than assuming this inventory identifies a suitable job.',
'Career decisions also require interests, abilities, values, knowledge, opportunities and work experience. No combination of these ratings can establish job aptitude, predict success or determine who you should work with.'
]);
section('A practical 30-day learning experiment',[
'Week 1: Pick a real subject and test one method you already enjoy. Quiz yourself afterward.',
'Week 2: Add a second method suited to the material, such as a historical map plus a short written argument.',
'Week 3: Discuss or teach the idea to someone else, then check what you can recall independently.',
'Week 4: Compare retention, motivation and time invested. Keep what works, adapt what does not. Record your own evidence instead of accepting a fixed label.'
]);
const email=report.querySelector('.email-gate');
if(email){email.innerHTML='<div class="eyebrow">KEEP YOUR LEARNING PROFILE</div><h4 style="font:700 19px Georgia,serif;margin:8px 0">Print or save your full report</h4><p>Choose <strong>Save as PDF / Print</strong> and select “Save as PDF” in your browser print dialog. You can also download a standalone HTML copy. No email address is needed.</p><div class="report-actions"><button type="button" class="btn btn-primary" id="etp-save-pdf" onclick="printReport()">Save as PDF / Print</button><button type="button" class="btn" onclick="downloadReport()">Download HTML report</button></div><p class="etp-print-note">This inventory is educational self-reflection. Scores are not standardized or validated to diagnose learning abilities.</p>'}
}
const report=$('#finalReport');if(report){new MutationObserver(()=>{if(report.classList.contains('show')&&!report.dataset.etpExpanded){setTimeout(extraReport,0)}if(!report.classList.contains('show'))report.dataset.etpExpanded='no'}).observe(report,{childList:true,subtree:false,attributes:true,attributeFilter:['class']})}
const originalPrint=window.printReport;
const originalDownload=window.downloadReport;
document.addEventListener('click',e=>{const target=e.target.closest('#etp-save-pdf');if(target){target.dataset.action='browser-print'}});
const styleNav=$('.nav a.lab-nav');if(styleNav){styleNav.textContent='Take Assessment';styleNav.href='#profile'}
const heroActions=$('.hero-actions');if(heroActions){const links=heroActions.querySelectorAll('a');if(links.length>1){links[0].textContent='Explore Learning Styles ↓';links[1].textContent='Skip to the Learning Styles Assessment →';links[1].href='#profile';}}
const historySection=$('#science');if(historySection){
historySection.setAttribute('aria-label','History of learning-styles ideas and present-day evidence');
const historyWrap=historySection.querySelector('.shell');
if(historyWrap&&!historySection.querySelector('.etp-style-history')){const timeline=el('div','etp-style-history');
timeline.innerHTML='<h3>How learning-styles thinking changed</h3><ol><li><b>1980s:</b> Experiential learning frameworks, including David Kolb’s 1984 work, helped popularize reflection on different learning approaches.</li><li><b>1987–1992:</b> Neil Fleming developed VARK as a way to prompt reflection on visual, aural, reading/writing, and kinesthetic preferences; Fleming and Colleen Mills published on it in 1992.</li><li><b>2008:</b> A research review by Pashler and colleagues found insufficient evidence that matching instruction to a declared style reliably improves learning.</li><li><b>Today:</b> Evidence-informed teaching emphasizes content-appropriate formats, retrieval, practice, explanation, and flexible strategies—not fixed learner labels.</li></ol><p><a href="https://pubmed.ncbi.nlm.nih.gov/26162104/" target="_blank" rel="noopener">Research review</a> · <a href="https://vark-learn.com/articles/" target="_blank" rel="noopener">History of VARK</a></p>';
historyWrap.append(timeline)}}

const methods=[...document.querySelectorAll('.method-grid .method')];if(methods.length){const head=methods[0].closest('section')?.querySelector('.section-head h2');if(head)head.textContent='Use learning preferences as a doorway, not a box.'}

/* Optional real-world scenario choices add reflection without distorting the seven-dimension scores. */
const reflections=[
{index:2,prompt:'A group is planning a history exhibit. How would you prefer to begin?',choices:['Sketch a shared timeline or map','Discuss interpretations with teammates','Review sources independently first','Create a small prototype to test an idea']},
{index:7,prompt:'You are stuck on a difficult historical argument. What would you try next?',choices:['Draw a cause-and-effect diagram','Talk through the evidence aloud','Draft a written claim and revise it','Check the sources and compare the competing explanations']},
{index:10,prompt:'You receive feedback that challenges your project. Which response would you try?',choices:['Ask the reviewer clarifying questions','Reflect alone, then revisit the work','Test the feedback on a small example','Compare it with the assignment criteria and evidence']},
{index:12,prompt:'You are joining a new interdisciplinary project. Which task would you enjoy exploring first?',choices:['Organize the visual plan and milestones','Develop the written narrative','Build a demonstration or prototype','Investigate patterns and supporting evidence']}
];
const sessionKey='etp-learning-profile-20261113';
const scenarioKey='etp-learning-scenarios-20261113';
function getSession(key){try{return JSON.parse(sessionStorage.getItem(key)||'null')}catch{return null}}
function putSession(key,obj){try{sessionStorage.setItem(key,JSON.stringify(obj))}catch{}}
function addScenarioCards(){reflections.forEach(item=>{
const step=side.querySelector('.q-step[data-step="'+item.index+'"]');if(!step||step.querySelector('.etp-scenario'))return;
const card=el('fieldset','etp-scenario');card.setAttribute('aria-label','Optional scenario reflection');const legend=el('legend','','Optional scenario · Real-world choice');card.append(legend,el('p','',item.prompt));
const group=el('div','etp-scenario-choices');const saved=getSession(scenarioKey)||{};
item.choices.forEach((choice,i)=>{const label=el('label');const input=el('input');input.type='radio';input.name='etp-scenario-'+item.index;input.value=String(i);input.checked=saved[item.index]===i;
const span=el('span','',choice);label.append(input,span);group.append(label)});
card.append(group,el('small','','This choice is for your reflection and will not alter your learning-preference scores.'));
step.querySelector('.step-actions')?.before(card);
})}
addScenarioCards();
side.addEventListener('change',event=>{const radio=event.target.closest('input[name^="etp-scenario-"]');if(radio){const key=radio.name.split('-').pop(),saved=getSession(scenarioKey)||{};saved[key]=Number(radio.value);putSession(scenarioKey,saved)}else if(event.target.matches('.q-step input[type="radio"]')){putSession(sessionKey,answers)}});
document.addEventListener('click',event=>{const b=event.target.closest('button');if(!b||!/retake assessment|restart|start over/i.test(b.textContent))return;try{sessionStorage.removeItem(sessionKey);sessionStorage.removeItem(scenarioKey)}catch{}},true);
function restoreProfile(){
const saved=getSession(sessionKey);if(!saved||typeof saved!=='object')return;
let restored=0;Object.entries(saved).forEach(([key,value])=>{if(!/^q\d+_\d+$/.test(key)||!value||!Number.isInteger(Number(value.value))||Number(value.value)<1||Number(value.value)>5)return;answers[key]=value;restored++});
if(!restored)return;
buildSteps();addScenarioCards();updateLive();profile.classList.add('etp-lab-started');
const firstIncomplete=questions.findIndex((q,i)=>q.items.some((_,j)=>!answers['q'+i+'_'+j]));
if(firstIncomplete<0){currentStep=questions.length-1;generateReport()}else{currentStep=firstIncomplete;showStep()}
}
restoreProfile();

redraw();
})();