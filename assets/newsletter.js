/* One invitation across the shared site shell; no account or student data stored. */
(() => {
  'use strict';
  if(window.ETPNewsletter)return;
  const policy=window.ETPNewsletterPolicy;if(!policy)return;
  const ownScript=document.currentScript,root=new URL('../',ownScript.src);
  const formURL='https://docs.google.com/forms/d/e/1FAIpQLSdzBD9SO-4cd-7THFb1xu3bX8GP0Ox90YPHdlEyeWpujNuaXw/viewform';
  const key='etp.newsletter.invitation.v1',lockKey='etp.newsletter.invitation-lock.v1';
  const owner=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
  let memory=policy.initial(),available=true,opener=null,lastTick=Date.now(),savedOverflow='';
  function read(){try{return policy.normalize(JSON.parse(localStorage.getItem(key)||'null'),Date.now());}catch{available=false;return memory;}}
  function save(s){memory=s;try{localStorage.setItem(key,JSON.stringify(s));available=true;}catch{available=false;}}
  function lock(){try{return JSON.parse(localStorage.getItem(lockKey)||'null');}catch{return null;}}
  function claim(){const l=lock(),now=Date.now();if(l&&l.owner!==owner&&l.until>now)return false;try{localStorage.setItem(lockKey,JSON.stringify({owner,until:now+15000,dialog:false}));}catch{}return true;}
  function release(){try{if(lock()?.owner===owner)localStorage.removeItem(lockKey);}catch{}}
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const dialog=el('dialog','etp-newsletter');dialog.id='etpNewsletter';dialog.setAttribute('aria-labelledby','etpNewsletterTitle');
  const card=el('div','etp-newsletter-card'),close=el('button','etp-newsletter-close','×');close.type='button';close.setAttribute('aria-label','Close email invitation');
  const eyebrow=el('p','etp-newsletter-eyebrow','EXAMINE THE PAST');
  const title=el('h2','','Keep discovering the past.');title.id='etpNewsletterTitle';
  const copy=el('p','etp-newsletter-copy','Get new history resources and classroom tools.');
  const join=el('button','etp-newsletter-join','Join the Email List');join.type='button';
  const done=el('button','etp-newsletter-done','Already subscribed');done.type='button';
  const body=el('div','etp-newsletter-form');body.hidden=true;
  const status=el('p','etp-newsletter-status');status.setAttribute('role','status');
  const browserNote=el('p','etp-newsletter-note');browserNote.hidden=true;
  card.append(close,eyebrow,title,copy,join,body,done,status,browserNote);dialog.append(card);document.body.append(dialog);
  function showForm(){
    title.textContent='Join the Email List';copy.textContent='Enter your email and select the permission option in the form.';join.hidden=true;body.hidden=false;done.textContent="I’ve finished signing up";
    if(!body.firstChild){const iframe=el('iframe');iframe.src=formURL+'?embedded=true';iframe.title='Examine the Past email signup';iframe.width='760';iframe.height='720';body.append(iframe);const a=el('a','','Open form in a new tab ↗');a.href=formURL;a.target='_blank';a.rel='noopener noreferrer';body.append(a);}
    dialog.classList.add('with-form');
  }
  function open(manual=false){
    if(dialog.open)return;
    if(!manual&&(!policy.eligible(read(),Date.now())||busy()))return;
    if(!manual&&!claim())return;
    opener=document.activeElement;savedOverflow=document.body.style.overflow;
    if(manual){const menu=document.querySelector('.etp-mobile-panel');if(menu&&!menu.hidden)document.querySelector('.etp-mega-close')?.click();}
    if(!manual)save(policy.opened(read(),Date.now()));
    try{localStorage.setItem(lockKey,JSON.stringify({owner,until:Date.now()+120000,dialog:true}));}catch{}
    dialog.showModal();document.body.style.overflow='hidden';close.focus();
    browserNote.hidden=available;browserNote.textContent='Browser saving is unavailable. Dismissal preferences will last for this page visit.';
  }
  function dismiss(){if(dialog.open)dialog.close('dismiss');}
  function subscribed(){save(policy.suppress(read(),Date.now()));if(dialog.open)dialog.close('subscribed');}
  close.addEventListener('click',dismiss);join.addEventListener('click',showForm);done.addEventListener('click',subscribed);
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dismiss();});
  dialog.addEventListener('close',()=>{
    if(dialog.returnValue!=='subscribed')save(policy.dismissed(read(),Date.now()));
    release();document.body.style.overflow=savedOverflow;
    // Remove an unfinished form between openings; never treat iframe load as a signup confirmation.
    body.replaceChildren();body.hidden=true;join.hidden=false;done.textContent='Already subscribed';dialog.classList.remove('with-form');
    title.textContent='Keep discovering the past.';copy.textContent='Get new history resources and classroom tools.';
    opener?.focus?.({preventScroll:true});
  });
  function visible(node){return node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden';}
  function busy(){
    if(document.visibilityState!=='visible'||!document.hasFocus())return true;
    const path=location.pathname.slice(root.pathname.length);
    // Never automatically interrupt lessons, games, or assessments. Manual signup stays available.
    if(/^(?:lessons\/|games\/|assessments?\/)/.test(path))return true;
    if(document.activeElement?.matches('input,textarea,select,[contenteditable="true"]'))return true;
    if([...document.querySelectorAll('dialog[open],[role="dialog"],.modal.open,.etp-mobile-panel:not([hidden])')].some(n=>n!==dialog&&visible(n)))return true;
    if([...document.querySelectorAll('video,audio')].some(n=>!n.paused&&!n.ended))return true;
    if([...document.querySelectorAll('iframe')].some(n=>/youtube|youtu\.be|vimeo|brightcove/i.test(n.src)&&visible(n)))return true;
    return false;
  }
  function tick(){
    const now=Date.now(),elapsed=Math.min(5000,Math.max(0,now-lastTick));lastTick=now;
    if(dialog.open){try{localStorage.setItem(lockKey,JSON.stringify({owner,until:now+120000,dialog:true}));}catch{}return;}
    if(busy())return;
    const state=read();if(state.suppressed||state.cooldownUntil)return;
    if(!claim())return;
    const advanced=policy.advance(state,elapsed,now);save(advanced);
    if(policy.eligible(advanced,now))open();
  }
  let interval=setInterval(tick,5000);
  window.addEventListener('pagehide',()=>{clearInterval(interval);release();});
  window.addEventListener('pageshow',event=>{if(event.persisted){lastTick=Date.now();interval=setInterval(tick,5000);}});
  window.addEventListener('storage',e=>{if(e.key===key&&read().suppressed&&dialog.open)dialog.close('subscribed');});
  function addOpenButton(parent,cls){if(!parent||parent.querySelector('[data-etp-newsletter]'))return;const b=el('button',cls,'Join the Email List');b.type='button';b.setAttribute('data-etp-newsletter','');parent.append(b);}
  addOpenButton(document.querySelector('.etp-map-first-column .etp-map-column-links'),'etp-map-link');
  addOpenButton(document.querySelector('#etpSiteFooter .etp-footer-grid>div:last-child'),'etp-newsletter-footer');
  document.addEventListener('click',event=>{if(event.target.closest('[data-etp-newsletter]')){event.preventDefault();open(true);}});
  window.ETPNewsletter={open:()=>open(true)};
  if(location.hash==='#timelineSignup')open(true); // Retain previously shared signup bookmarks.
})();
