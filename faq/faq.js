/* Progressive FAQ: all answers remain available without JavaScript. */
(() => {
 const page=document.querySelector('.faq-page');if(!page)return;
 const search=document.getElementById('faqSearch'),clear=document.getElementById('faqClear'),more=document.getElementById('faqMore'),count=document.getElementById('faqCount'),empty=document.getElementById('faqEmpty'),heading=document.getElementById('faqResultsTitle');
 const topics=[...document.querySelectorAll('.faq-topic')],items=[...document.querySelectorAll('.faq-item')];
 const norm=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’‘]/g,"'");
 const records=items.map(item=>({item,text:norm(item.textContent+' '+item.dataset.keywords+' '+item.dataset.topic)}));
 let topic='All',limit=8;
 page.classList.add('faq-js');
 function setOpen(item,open){item.classList.toggle('is-open',open);item.querySelector('.faq-question').setAttribute('aria-expanded',String(open));item.querySelector('.faq-answer').inert=!open;}
 function render(){
  const terms=norm(search.value).trim().split(/\s+/).filter(Boolean),filtered=topic!=='All'||terms.length;
  const matches=records.filter(r=>(topic==='All'||r.item.dataset.topic===topic)&&terms.every(term=>r.text.includes(term)));
  const visible=matches.slice(0,filtered?matches.length:limit).map(r=>r.item);
  items.forEach(item=>{item.hidden=!visible.includes(item);if(item.hidden)setOpen(item,false)});
  topics.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.topic===topic)));
  heading.textContent=terms.length?'Search results':topic!=='All'?topic:'Quick answers';
  count.textContent=matches.length?(visible.length===matches.length?matches.length+' answers':visible.length+' of '+matches.length+' answers'):'0 answers';
  more.hidden=!!filtered||limit>=matches.length;more.textContent='Show more questions ('+Math.min(8,Math.max(0,matches.length-limit))+')';
  empty.hidden=!!matches.length;clear.hidden=!search.value;
 }
 items.forEach(item=>{setOpen(item,false);item.querySelector('.faq-question').addEventListener('click',()=>{const open=!item.classList.contains('is-open');items.forEach(i=>setOpen(i,i===item&&open));if(open)history.replaceState(history.state,'','#'+item.id);else history.replaceState(history.state,'',location.pathname+location.search);});});
 search.addEventListener('input',()=>{limit=8;render()});clear.addEventListener('click',()=>{search.value='';limit=8;render();search.focus()});
 topics.forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.topic;limit=8;render()}));
 more.addEventListener('click',()=>{const previous=limit;limit+=8;render();const next=items.filter(i=>!i.hidden)[previous];next?.querySelector('.faq-question').focus({preventScroll:true});});
 function route(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const item=items.find(i=>i.id===id);if(!item)return;topic='All';search.value='';limit=Math.max(8,items.indexOf(item)+1);render();items.forEach(i=>setOpen(i,i===item));item.scrollIntoView({block:'start',behavior:'auto'});}
 render();if(location.hash)route();window.addEventListener('hashchange',route);
})();
