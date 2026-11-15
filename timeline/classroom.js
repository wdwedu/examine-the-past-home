/* Browser-local teacher collections and formative practice for the history timeline. */
(() => {
  'use strict';
  const VERSION = '20261114-classroom-1';
  const storageKey = 'etp.timeline.classroom.v1';
  const buttons = [...document.querySelectorAll('main.timeline .explore')];
  const moments = buttons.map((button, i) => ({id: 't' + String(i + 1).padStart(3, '0'), number: i + 1,
    title: button.closest('.event').querySelector('h3').textContent, button,
    era: button.closest('.era').id, eraTitle: button.closest('.era').querySelector('h2').textContent}));
  const byId = new Map(moments.map(m => [m.id, m]));
  const byTitle = new Map(moments.map(m => [m.title, m]));
  const validGrades = ['6–8', '9–12', 'Mixed / teacher adapted'];
  const el = (tag, cls, text) => {const n = document.createElement(tag); if(cls)n.className=cls; if(text!==undefined)n.textContent=text; return n;};
  const action = (text, fn, cls='classroom-button') => {const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
  const labelled = (name, field) => {field.setAttribute('aria-label',name);const l=el('label','classroom-label',name);l.append(field);return l;};
  const state = {collections:[], active:'', earned:{}};
  let durable = true, currentTopic = null, dataPromise;
  try {
    const raw=JSON.parse(localStorage.getItem(storageKey)||'null');
    if(raw && typeof raw==='object') {
      state.collections=(Array.isArray(raw.collections)?raw.collections:[]).slice(0,15).filter(c=>c && typeof c.id==='string' && /^[\w-]{1,80}$/.test(c.id)).map(c=>({id:c.id,name:String(c.name||'Teaching collection').slice(0,120),grade:validGrades.includes(c.grade)?c.grade:'6–8',aim:String(c.aim||'').slice(0,500),items:[...new Set(Array.isArray(c.items)?c.items:[])].filter(id=>byId.has(id)).slice(0,50)}));
      state.active=state.collections.some(c=>c.id===raw.active)?raw.active:state.collections[0]?.id||'';
      if(raw.earned && typeof raw.earned==='object') for(const m of moments) for(const kind of ['Knowledge','Evidence']) if(raw.earned[m.id+'-'+kind]===true)state.earned[m.id+'-'+kind]=true;
    }
  } catch {durable=false;}
  const workspace=el('section','classroom-workspace');workspace.setAttribute('aria-label','Teacher collections and history tokens');
  const intro=el('div','classroom-intro');intro.append(el('div','', 'Build a learning journey'),el('p','', 'Collect moments for a lesson, then investigate and earn history tokens.'));
  const board=el('details','token-board');const boardSummary=el('summary');const boardBody=el('div','token-era-grid');board.append(boardSummary,el('p','classroom-note','Practice progress stays in this browser. Tokens are formative feedback, not a final assessment or verified grade.'),boardBody);
  const teacher=el('details','teacher-collections');teacher.id='teacherCollections';teacher.append(el('summary','','Teacher collection creator'));
  const panel=el('div','collection-panel');teacher.append(panel);
  const storageNote=el('p','classroom-note');
  const announcement=el('p','classroom-status');announcement.setAttribute('role','status');
  const shareBox=el('div','collection-share');shareBox.hidden=true;
  workspace.append(intro,board,teacher,storageNote,announcement,shareBox);
  workspace.id='timelineJourney';workspace.hidden=true;workspace.setAttribute('role','dialog');
  const journeyToggle=document.querySelector('.timeline-journey-toggle');
  const journeyNav=document.querySelector('nav[aria-label="Timeline eras"]');
  const closeJourney=action('×',()=>setJourney(false,true),'journey-close');closeJourney.setAttribute('aria-label','Close learning journey');
  workspace.prepend(closeJourney);document.body.append(workspace);
  function positionJourney(){workspace.style.top=(journeyNav.getBoundingClientRect().bottom+6)+'px';}
  function setJourney(open,restore=false){
    if(open){journeyNav.classList.remove('eras-open');journeyNav.querySelector('.timeline-era-toggle').setAttribute('aria-expanded','false');}
    workspace.hidden=!open;journeyToggle.setAttribute('aria-expanded',String(open));
    if(open){positionJourney();closeJourney.focus({preventScroll:true});}
    else if(restore){(journeyToggle.getClientRects().length?journeyToggle:journeyNav.querySelector('.timeline-era-toggle')).focus({preventScroll:true});}
  }
  journeyToggle.addEventListener('click',()=>setJourney(workspace.hidden));
  document.addEventListener('click',event=>{if(!workspace.hidden&&!event.composedPath().includes(workspace)&&!event.composedPath().includes(journeyToggle))setJourney(false);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!workspace.hidden){event.preventDefault();setJourney(false,true);}});
  window.addEventListener('resize',()=>{if(!workspace.hidden)positionJourney();});
  const tools=el('section','moment-classroom');tools.setAttribute('aria-label','Collection and self-check');
  document.getElementById('modalChart').after(tools);
  const active=()=>state.collections.find(c=>c.id===state.active);
  const tell=text=>{announcement.textContent=text;};
  function save(){
    try {localStorage.setItem(storageKey,JSON.stringify(state));durable=true;} catch {durable=false;}
    storageNote.textContent=durable?'Saved only in this browser. Share or print collections to keep a portable copy. No student names or accounts are needed.':'Browser saving is unavailable. Changes work for this visit; share or print collections before leaving.';
  }
  function renderBoard(){
    const total=Object.keys(state.earned).length;
    boardSummary.textContent='My history tokens · '+total+' / '+moments.length*2;
    boardBody.replaceChildren();
    for(const era of [...new Set(moments.map(m=>m.era))]){
      const group=moments.filter(m=>m.era===era),max=group.length*2;
      const earned=group.reduce((n,m)=>n+['Knowledge','Evidence'].filter(k=>state.earned[m.id+'-'+k]).length,0);
      const badge=el('div','era-token'+(earned===max?' complete':''));
      badge.append(el('span','token-coin',earned===max?'★':'ETP'),el('strong','',group[0].eraTitle),el('span','',earned+' / '+max+' tokens'));
      boardBody.append(badge);
    }
  }
  function makeCollection(){
    if(state.collections.length>=15){tell('You can keep up to 15 collections in this browser. Reuse an existing collection.');return;}
    const c={id:'c'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),name:'Teaching collection '+(state.collections.length+1),grade:'6–8',aim:'',items:[]};
    state.collections.push(c);state.active=c.id;save();renderCollections();return c;
  }
  function chooseCollection(select){
    select.replaceChildren();
    if(!state.collections.length){const o=el('option','','No collection yet');o.value='';select.append(o);}
    for(const c of state.collections){const o=el('option','',c.name);o.value=c.id;select.append(o);}
    select.value=state.active;
  }
  function addMoment(id){
    const c=active()||makeCollection();if(!c)return;
    if(c.items.includes(id)){tell('This moment is already in '+c.name+'.');return;}
    if(c.items.length>=50){tell('This collection has 50 moments. Create another collection for the next part of the journey.');return;}
    c.items.push(id);save();renderCollections();tell('Added '+byId.get(id).title+' to '+c.name+'.');
    refreshCollector();
  }
  let collector;
  function refreshCollector(){
    if(!collector||!currentTopic)return;
    const m=byTitle.get(currentTopic.cardTitle);collector.replaceChildren(el('h4','','Teach with this moment'));
    const select=el('select');select.setAttribute('aria-label','Collection for this moment');chooseCollection(select);
    select.addEventListener('change',()=>{state.active=select.value;save();renderCollections();refreshCollector();});
    const exists=active()?.items.includes(m.id);
    const add=action(exists?'Added to collection ✓':'Add this moment',()=>addMoment(m.id));add.disabled=!!exists;
    const row=el('div','collection-actions');row.append(select,add);collector.append(row);
    const status=el('p','classroom-note',exists?'Saved in '+active().name+'.':'Choose a collection, or add this moment to create your first one.');status.setAttribute('role','status');collector.append(status);
  }
  function renderCollections(){
    panel.replaceChildren();shareBox.hidden=true;
    const select=el('select');select.setAttribute('aria-label','Active teaching collection');chooseCollection(select);
    select.addEventListener('change',()=>{state.active=select.value;save();renderCollections();refreshCollector();});
    const toolbar=el('div','collection-actions');toolbar.append(select,action('+ New collection',()=>{makeCollection();refreshCollector();}));panel.append(toolbar);
    const c=active();
    if(!c){panel.append(el('p','classroom-note','Create a collection, then open any timeline moment and choose “Add this moment.”'));return;}
    const name=el('input');name.value=c.name;name.maxLength=120;
    const grade=el('select');for(const v of validGrades){const o=el('option','',v);o.value=v;grade.append(o);}grade.value=c.grade;
    const aim=el('textarea');aim.value=c.aim;aim.maxLength=500;aim.rows=2;aim.placeholder='What should students investigate?';
    const editor=el('div','collection-editor');editor.append(labelled('Collection title',name),labelled('Teaching grade band',grade),labelled('Essential question or teacher notes',aim));
    editor.append(action('Save collection details',()=>{c.name=name.value.trim()||'Teaching collection';c.grade=grade.value;c.aim=aim.value.trim();save();renderCollections();refreshCollector();tell('Collection details saved.');}));panel.append(editor);
    panel.append(el('p','classroom-note',c.items.length+' / 50 moments · Use the arrows to set your teaching order.'));
    const list=el('ol','collection-list');
    c.items.forEach((id,index)=>{
      const m=byId.get(id),li=el('li');
      const open=action(m.title,()=>{setJourney(false);m.button.click();},'collection-open');
      const up=action('↑',()=>{[c.items[index-1],c.items[index]]=[c.items[index],c.items[index-1]];save();renderCollections();tell('Moved '+m.title+' earlier.');});up.setAttribute('aria-label','Move '+m.title+' earlier');up.disabled=index===0;
      const down=action('↓',()=>{[c.items[index+1],c.items[index]]=[c.items[index],c.items[index+1]];save();renderCollections();tell('Moved '+m.title+' later.');});down.setAttribute('aria-label','Move '+m.title+' later');down.disabled=index===c.items.length-1;
      const remove=action('Remove',()=>{c.items=c.items.filter(v=>v!==id);save();renderCollections();refreshCollector();tell('Removed '+m.title+' from this collection.');});remove.setAttribute('aria-label','Remove '+m.title);
      const controls=el('div','collection-item-actions');controls.append(up,down,remove);li.append(open,controls);list.append(li);
    });panel.append(list);
    const footer=el('div','collection-actions');const share=action('Share collection link',()=>shareCollection(c));const print=action('Print teaching plan',()=>printPlan(c));share.disabled=print.disabled=!c.items.length;const remove=action('Remove collection',()=>{
      const index=state.collections.indexOf(c);state.collections=state.collections.filter(item=>item.id!==c.id);state.active=state.collections[0]?.id||'';
      save();renderCollections();refreshCollector();tell('Collection removed. ');
      announcement.append(action('Undo',()=>{if(state.collections.some(item=>item.id===c.id))return;state.collections.splice(index,0,c);state.active=c.id;save();renderCollections();refreshCollector();tell('Collection restored.');}));
    });footer.append(share,print,remove);panel.append(footer);
  }
  async function shareCollection(c){
    const payload=JSON.stringify({v:1,name:c.name,grade:c.grade,aim:c.aim,items:c.items});
    const encoded=btoa(String.fromCharCode(...new TextEncoder().encode(payload))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
    const url=new URL(location.href);url.hash='collection='+encoded;
    const field=el('textarea');field.readOnly=true;field.value=url.href;field.rows=3;field.setAttribute('aria-label','Collection share link');
    shareBox.replaceChildren(el('h3','','Your collection link'),el('p','classroom-note','Anyone with this link can see the collection title, notes, and chosen moments. Student answers and tokens are not included.'),field);
    shareBox.hidden=false;
    try {await navigator.clipboard.writeText(url.href);tell('Collection link copied. It includes the current saved collection.');}catch {field.focus();field.select();tell('Copy the collection link from the box below.');}
  }
  function readShared(){
    workspace.querySelector('.shared-collection')?.remove();
    const encoded=new URLSearchParams(location.hash.slice(1)).get('collection');if(!encoded)return;
    try {
      if(encoded.length>15000)throw new Error('size');
      const json=new TextDecoder().decode(Uint8Array.from(atob(encoded.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0)));
      const c=JSON.parse(json);
      if(c.v!==1||typeof c.name!=='string'||c.name.length>120||!validGrades.includes(c.grade)||typeof c.aim!=='string'||c.aim.length>500||!Array.isArray(c.items)||c.items.length>50||!c.items.every(id=>byId.has(id)))throw new Error('invalid');
      const banner=el('section','shared-collection');banner.append(el('h3','','Shared collection: '+c.name),el('p','',c.grade+(c.aim?' · '+c.aim:'')));
      const list=el('ol');for(const id of [...new Set(c.items)])list.append(el('li','',byId.get(id).title));banner.append(list);
      banner.append(action('Save shared collection in this browser',()=>{
        const local=makeCollection();if(!local)return;local.name=c.name;local.grade=c.grade;local.aim=c.aim;local.items=[...new Set(c.items)];save();renderCollections();refreshCollector();teacher.open=true;banner.remove();tell('Shared collection saved. Open it in the collection creator.');
      }));workspace.prepend(banner);if(!new URLSearchParams(location.hash.slice(1)).has('moment'))setJourney(true);
    }catch {tell('This shared collection link is invalid or incomplete. Ask the teacher for a new link.');}
  }
  const data=()=>dataPromise||=(fetch('media/classroom-data.json?v='+VERSION).then(r=>{if(!r.ok)throw Error('Classroom resources unavailable');return r.json();}));
  const printHost=el('section','timeline-print-plan');document.body.append(printHost);
  async function printPlan(c){
    const snapshot={...c,items:[...c.items]};
    try {
      const [content,media]=await Promise.all([data(),window.ETPTimelineDetails.catalog]);printHost.replaceChildren(el('h1','','Examine the Past · '+snapshot.name),el('p','', 'Grade band: '+snapshot.grade));
      if(snapshot.aim)printHost.append(el('p','', 'Essential question / teaching notes: '+snapshot.aim));
      printHost.append(el('p','', 'Suggested pathway: preview → watch an excerpt → compare sources → complete the two-item self-check. Tokens are practice feedback, separate from final assessment.'));
      const list=el('ol');for(const id of snapshot.items){const m=byId.get(id),t=content.topics.find(t=>t.id===id),li=el('li');li.append(el('h2','',m.title),el('p','', 'Viewing guidance: '+(snapshot.grade==='9–12'?t.viewing.upper:t.viewing.middle)),el('p','', 'Preview: '+t.viewing.note),el('p','', 'Investigate: '+t.viewing.focus));
        const resource=media.topics.find(t=>t.cardTitle===m.title);
        for(const source of resource.sources){const a=el('a','',source.title+' · '+source.url);a.href=source.url;const line=el('p');line.append(a);li.append(line);}
        for(const id of resource.videoIds){const v=media.videos[id],url=v.watchUrl||'https://www.youtube.com/watch?v='+v.id;const a=el('a','',v.title+' · '+url);a.href=url;const line=el('p');line.append(a);li.append(line);}
        list.append(li);}printHost.append(list,el('p','', 'Timeline: '+location.origin+location.pathname));document.body.classList.add('printing-timeline-plan');window.print();
    }catch {tell('The print plan could not load. Try again after the learning resources finish loading.');}
  }
  window.addEventListener('afterprint',()=>document.body.classList.remove('printing-timeline-plan'));
  function orderOptions(check,number,index){
    // Stable variation in answer position; retries never change the question’s order.
    const offset=(number+index)%check.options.length;
    return check.options.map((_,i)=>(i+offset)%check.options.length);
  }
  function selfCheck(topic){
    const section=el('section','moment-self-check');section.append(el('h4','','Short self-check · earn two history tokens'),el('p','classroom-note','One Knowledge token and one Evidence token per moment. Try again after feedback; repeated practice does not add duplicate tokens.'));
    topic.checks.forEach((check,index)=>{
      const key=topic.id+'-'+check.kind,fieldset=el('fieldset','check-question');const legend=el('legend','',check.kind+' · '+check.prompt);fieldset.append(legend);
      const choices=el('div','check-options'),feedback=el('p','check-feedback');feedback.setAttribute('role','status');
      let complete=!!state.earned[key];
      const choiceButtons=[];
      orderOptions(check,topic.number,index).forEach(optionIndex=>{
        const b=action(check.options[optionIndex],()=>{
          if(complete)return;
          if(optionIndex===check.correct){
            complete=true;state.earned[key]=true;save();renderBoard();choiceButtons.forEach(item=>item.disabled=true);b.classList.add('answer-correct');feedback.textContent='Token earned ✓ '+check.explanation;feedback.className='check-feedback correct';
          }else {b.classList.add('answer-retry');b.disabled=true;feedback.textContent='Not yet. '+check.explanation+' Try another answer.';}
        },'check-option');
        if(complete){b.disabled=true;if(optionIndex===check.correct)b.classList.add('answer-correct');}
        choiceButtons.push(b);choices.append(b);
      });
      if(complete){feedback.textContent='Token already earned ✓ '+check.explanation;feedback.classList.add('correct');}
      fieldset.append(choices,feedback);section.append(fieldset);
    });return section;
  }
  let renderCount=0;
  function clear(){currentTopic=null;++renderCount;tools.replaceChildren();document.querySelector('.viewing-guide')?.remove();}
  async function render(topic){
    clear();currentTopic=topic;const thisRender=renderCount;
    collector=el('section','moment-collector');tools.append(collector);refreshCollector();
    const loading=el('p','classroom-note','Loading self-check and viewing guidance…');tools.append(loading);
    try {
      const content=await data();if(thisRender!==renderCount)return;
      const t=content.topics.find(t=>t.title===topic.cardTitle);if(!t)throw Error('Topic missing');
      const guide=el('details','viewing-guide');guide.append(el('summary','','Grade-level viewing guidance · '+t.viewing.suggestedBand),el('p','classroom-note','Editorial teaching suggestions, not official publisher age ratings. Preview the complete selection before classroom use.'),el('p','', 'Before viewing: '+t.viewing.note),el('p','', 'Grades 6–8: '+t.viewing.middle),el('p','', 'Grades 9–12: '+t.viewing.upper),el('p','', 'Viewing focus: '+t.viewing.focus));
      document.querySelector('.learning-video-grid').before(guide);
      document.querySelectorAll('.learning-video').forEach(card=>{
        const pub=card.querySelector('.video-publisher').textContent;
        if(/CrashCourse/.test(pub))card.append(el('p','classroom-note','Fast-paced overview: use short sections and pause for vocabulary and evidence checks.'));
        if(/The Met|National Geographic/.test(pub))card.append(el('p','classroom-note','Preview the running time and choose a focused excerpt for your lesson.'));
      });
      loading.remove();tools.append(selfCheck(t));
    }catch {if(thisRender===renderCount)loading.textContent='Self-check and viewing guidance are unavailable right now. The overview, videos, and sources remain available.';}
  }
  save();renderBoard();renderCollections();readShared();
  window.addEventListener('hashchange',readShared);
  window.ETPClassroom={render,clear};
})();
