/* Shared Grade 5/6 sticky dock and Grade 5 history visualization enrichment. */
(()=>{'use strict';const current=location.pathname;
if(!/\/lessons\/curriculum\/grade-[5678]-/.test(current))return;
const grade5=/\/grade-5-/.test(current),$=s=>document.querySelector(s);
const diagrams={
'indigenous-nations-cultures-and-communities':['compare','Haudenosaunee','Community voices','Pueblo communities'],
'land-resources-and-systems-of-governance':['flow','Land & resources','Collective decision','Rights & responsibility'],
'why-did-europeans-cross-the-atlantic':['cause','Trade interests','Political rivalry','Voyages & encounters'],
'first-encounters-and-competing-perspectives':['venn','European records','Shared encounter','Indigenous accounts'],
'the-columbian-exchange-and-its-consequences':['network','Americas','Atlantic contact','Afro-Eurasia'],
'life-in-the-thirteen-colonies':['compare','New England','Colonial regions','Chesapeake'],
'colonial-economies-labor-and-enslavement':['flow','Forced labor','Colonial production','Atlantic profits'],
'religion-identity-and-colonial-society':['venn','Official promises','Actual practice','Exclusions'],
'colonial-maryland-and-the-chesapeake':['network','Indigenous homelands','Chesapeake waterways','Atlantic trade'],
'competing-empires-in-north-america':['network','British claims','Indigenous nations','French claims'],
'the-french-and-indian-war':['timeline','Ohio Valley war','1763 settlement','Lasting tensions'],
'taxes-representation-and-colonial-protest':['timeline','New taxes','Petitions & protest','Imperial crisis'],
'why-did-the-colonies-declare-independence':['cause','Colonial grievances','Rights arguments','Declaration'],
'turning-points-of-the-revolutionary-war':['timeline','Saratoga 1777','Alliance 1778','Yorktown 1781'],
'patriots-loyalists-women-and-black-americans':['venn','Patriot positions','Conflicting interests','Loyalist positions'],
'did-the-revolution-deliver-liberty-for-everyone':['compare','Liberty promised','Unequal outcomes','Rights contested'],
'america-s-first-national-government':['flow','Articles of Confederation','Limited federal powers','Coordination problems'],
'debating-the-constitution':['venn','Federalists','Ratification debates','Anti-Federalists'],
'the-bill-of-rights-and-individual-liberty':['timeline','Debates 1787–88','Ratification 1791','Later interpretations'],
'george-washington-and-the-presidency':['compare','Constitutional duties','Executive precedents','Later practices'],
'the-emergence-of-political-parties':['venn','Federalist ideas','Federal power debate','Republican ideas'],
'challenges-facing-the-new-republic':['cause','Domestic challenges','Federal responses','Foreign relations'],
'north-america-before-european-colonization':['compare','Indigenous nations','Regional diversity','Evidence & voices']
};
let activeDock=null,lastOffset=-1,lastHeight=-1,raf=0,observer=null,visualDone=false;
const reduce=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
function recalc(){
const dock=$('.g5-toolbar')||$('.lesson-progress');if(!dock)return;
const header=$('#etpSiteHeader'),nav=$('.etp-page-nav'),hr=header?.getBoundingClientRect(),nr=nav?.getBoundingClientRect();
let offset=Math.max(0,Math.ceil(hr?.bottom||0));
if(nr&&nr.bottom>offset&&nr.top<=offset+14&&nr.bottom>0)offset=Math.ceil(nr.bottom);
offset=Math.max(0,offset+3);
let height=Math.ceil(dock.getBoundingClientRect().height);
if(offset!==lastOffset||height!==lastHeight||dock!==activeDock){
document.documentElement.style.setProperty('--etp-lesson-dock-top',offset+'px');
document.documentElement.style.setProperty('--etp-lesson-dock-height',height+'px');
document.documentElement.style.setProperty('--g5-top',offset+'px');
document.documentElement.style.setProperty('--lesson-dock-top',offset+'px');
lastOffset=offset;lastHeight=height;activeDock=dock;
}
}
function schedule(){if(raf)return;raf=requestAnimationFrame(()=>{raf=0;recalc()})}
function bindDock(){
const dock=$('.g5-toolbar')||$('.lesson-progress');if(!dock)return;
if(dock.dataset.etpDockReady==='yes')return;
dock.dataset.etpDockReady='yes';recalc();
if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(schedule);observer.observe(dock);const h=$('#etpSiteHeader'),n=$('.etp-page-nav');if(h)observer.observe(h);if(n)observer.observe(n)}
dock.addEventListener('click',event=>{const link=event.target.closest('a[href^="#"]');if(!link)return;
const id=link.getAttribute('href').slice(1),target=document.getElementById(id);if(!target)return;
event.preventDefault();recalc();
const y=window.scrollY+target.getBoundingClientRect().top-(lastOffset+lastHeight+15);
window.scrollTo({top:Math.max(0,y),behavior:reduce()?'auto':'smooth'});
history.replaceState(null,'','#'+id);
},true);
}
function pretty(t,max=25){t=String(t||'').trim();return t.length>max?t.slice(0,max-1).trimEnd()+'…':t}
function draw(spec){
const [kind,a,b,c]=spec,w=900,h=260,colors=['#9fee8c','#9cceef','#f2d580'],labels=[a,b,c].map(x=>pretty(x,29));
const text=(x,y,label,color='#edf4e6',sz=16)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" fill="'+color+'" font-size="'+sz+'" font-family="Georgia,serif">'+escapeHTML(label)+'</text>';
const node=(x,y,i)=>'<circle cx="'+x+'" cy="'+y+'" r="49" fill="'+['#164032','#1d3650','#4b3a1c'][i]+'" stroke="'+colors[i]+'" stroke-width="4"/>'+text(x,y+6,i+1,'#fff200',22)+text(x,y+70,labels[i]);
let shapes='<rect x="0" y="0" width="'+w+'" height="'+h+'" rx="16" fill="#071a15"/>';
if(kind==='venn'||kind==='compare'){
shapes+='<circle cx="350" cy="117" r="93" fill="#276243" opacity=".45" stroke="#9fee8c" stroke-width="2"/><circle cx="551" cy="117" r="93" fill="#1f5674" opacity=".40" stroke="#9cceef" stroke-width="2"/>';
shapes+=node(170,115,0)+node(450,115,1)+node(729,115,2);
}else if(kind==='timeline'){
shapes+='<path d="M85 125H816" stroke="#d2b96c" stroke-width="6"/><path d="M816 125l-17 -13v26Z" fill="#d2b96c"/>'+node(155,125,0)+node(450,125,1)+node(742,125,2);
}else if(kind==='network'){
shapes+='<path d="M200 125Q450 30 690 125M200 125Q450 218 690 125" fill="none" stroke="#77a5b7" stroke-width="6" stroke-dasharray="10 8"/>'+node(160,125,0)+node(450,125,1)+node(739,125,2);
}else{
shapes+='<path d="M185 125H710" stroke="#d4b76a" stroke-width="6"/><path d="M710 125l-16 -11v22Z" fill="#d4b76a"/>'+node(160,125,0)+node(450,125,1)+node(740,125,2);
}
return '<svg viewBox="0 0 900 260" role="img" aria-label="'+escapeHTML(kind+' diagram: '+labels.join('; '))+'" xmlns="http://www.w3.org/2000/svg">'+shapes+'</svg>';
}
function escapeHTML(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function slug(){return $('[data-lesson-slug]')?.dataset.lessonSlug||current.split('/').filter(Boolean).slice(-1)[0]}
async function addVisual(){
if(!grade5||visualDone)return;
const d=slug(),spec=diagrams[d];if(!spec)return;
const target=$('#discover');if(!target||target.querySelector('.g5-visual-inquiry'))return;
visualDone=true;
let prompts=[];
try{
const root=$('[data-root]')?.dataset.root||'../../../../';
const res=await fetch(root+'assets/grade5-lessons-data.json?v=20261109-grade5-v5');
if(res.ok){const o=await res.json();prompts=o.lessons?.[d]?.investigation||[]}
}catch{}
if(!prompts.length)prompts=['Identify what each feature represents within the historical context.','Compare the three features and distinguish a relationship from a proven cause.','Name an appropriate primary or institutional source that could check this interpretation.'];
const panel=document.createElement('section');panel.className='g5-activity g5-visual-inquiry';
panel.innerHTML='<h3>Visual History Lab · '+escapeHTML(({timeline:'Timeline and Sequence',network:'Connections and Exchange',compare:'Historical Comparison',venn:'Compare Perspectives',cause:'Causes and Consequences',flow:'Historical Process'})[spec[0]]||'Historical Evidence')+'</h3><p>Explore this lesson-specific SVG and explain the evidence behind each relationship.</p>'+draw(spec)+'<div class="g5-viz-choice">'+spec.slice(1).map((x,i)=>'<button type="button" data-g5-viz="'+i+'" aria-pressed="false">'+escapeHTML(x)+'</button>').join('')+'</div><p class="g5-viz-result" role="status">Choose one part of the diagram to explore its historical significance.</p><p class="g5-viz-disclaimer">Original instructional schematic, not a scaled historical map, original source, or quantitative chart. Use the sources in this lesson to confirm any interpretation.</p>';
panel.querySelectorAll('[data-g5-viz]').forEach(btn=>btn.addEventListener('click',()=>{
panel.querySelectorAll('[data-g5-viz]').forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));
panel.querySelector('.g5-viz-result').textContent=prompts[Number(btn.dataset.g5Viz)]||prompts[0];
}));
target.append(panel);
schedule();
}
const obs=new MutationObserver(()=>{bindDock();if(grade5&&$('#discover'))addVisual()});
obs.observe(document.documentElement,{subtree:true,childList:true});
document.addEventListener('DOMContentLoaded',()=>{bindDock();addVisual();schedule()});
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
document.fonts?.ready?.then(schedule).catch(()=>{});
setTimeout(()=>{bindDock();addVisual();schedule()},0);
})();