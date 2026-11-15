/* Page-specific sharing in the shared return bar, including installed-site views. */
(() => {
 const nav=document.querySelector('.etp-page-nav');if(!nav)return;
 const root=new URL('../',document.currentScript.src),path=document.createElement('div');path.className='etp-page-path';
 while(nav.firstChild)path.append(nav.firstChild);nav.append(path);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='etp-page-share-toggle';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','etpPageSharePanel');toggle.setAttribute('aria-label','Share this page');
 toggle.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.5 6.6-4M8.7 13.5l6.6 4"/></svg><span>Share</span>';nav.append(toggle);
 const panel=document.createElement('div');panel.id='etpPageSharePanel';panel.className='etp-page-share-panel';panel.hidden=true;panel.setAttribute('role','group');panel.setAttribute('aria-label','Share this page');document.body.append(panel);
 let trigger=toggle;
 function close(restore=false){if(panel.hidden)return;panel.hidden=true;toggle.setAttribute('aria-expanded','false');if(restore)trigger.focus();}
 function position(){const r=toggle.getBoundingClientRect();panel.style.left=Math.max(10,Math.min(innerWidth-panel.offsetWidth-10,r.right-panel.offsetWidth))+'px';panel.style.top=Math.max(10,Math.min(innerHeight-panel.offsetHeight-10,r.bottom+8))+'px';}
 function open(source=toggle){
  trigger=source;panel.replaceChildren();
  // Page sharing deliberately omits in-page work, collection hashes, and query data.
  const url=location.origin+location.pathname,title=document.title.replace(/\s*[|—]\s*Examine the Past\s*$/i,'').trim()||'Examine the Past';
  const description=document.querySelector('meta[name="description"]')?.content||'Explore history with Examine the Past.';
  const enc=encodeURIComponent;
  const media=document.querySelector('meta[property="og:image"]')?.content;
  let pin='https://www.pinterest.com/pin/create/button/?url='+enc(url)+'&description='+enc(title+' — '+description);
  if(media){try{const m=new URL(media,location.href);if(/^https?:$/.test(m.protocol))pin+='&media='+enc(m.href);}catch{}}
  const targets=[['Facebook','facebook','https://www.facebook.com/sharer/sharer.php?u='+enc(url)],['X','x','https://twitter.com/intent/tweet?url='+enc(url)+'&text='+enc(title)],['LinkedIn','linkedin','https://www.linkedin.com/sharing/share-offsite/?url='+enc(url)],['Pinterest','pinterest',pin],['Email','email','mailto:?subject='+enc(title+' | Examine the Past')+'&body='+enc(description+'\n\n'+url)]];
  const row=document.createElement('div');row.className='etp-page-share-icons';
  function icon(node,label,name){node.className='etp-share-icon';node.title=label;node.setAttribute('aria-label',label);const img=document.createElement('img');img.src=new URL('assets/social/'+name+'.svg',root).href;img.alt='';img.width=30;img.height=30;node.append(img);}
  targets.forEach(([name,asset,href])=>{const a=document.createElement('a');a.href=href;if(name!=='Email'){a.target='_blank';a.rel='noopener noreferrer';}icon(a,'Share '+title+' '+(name==='Email'?'by email':'on '+name),asset);row.append(a);});
  const copy=document.createElement('button');copy.type='button';icon(copy,'Copy link to '+title,'copy');row.append(copy);
  const status=document.createElement('p');status.className='etp-share-status';status.setAttribute('role','status');
  const field=document.createElement('textarea');field.value=url;field.readOnly=true;field.hidden=true;field.rows=2;field.setAttribute('aria-label','Page share link');
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(url);status.textContent='Page link copied.';}catch{field.hidden=false;field.focus();field.select();status.textContent='Copy the selected link below.';}position();});
  panel.append(row,status,field);panel.hidden=false;toggle.setAttribute('aria-expanded','true');position();row.querySelector('a').focus({preventScroll:true});
 }
 toggle.addEventListener('click',()=>panel.hidden?open():close());
 document.addEventListener('click',e=>{const legacy=e.target.closest('[data-etp-share]');if(legacy){e.preventDefault();open(legacy);return;}if(!panel.hidden&&!panel.contains(e.target)&&!toggle.contains(e.target))close();});
 document.addEventListener('keydown',e=>{if(panel.hidden)return;if(e.key==='Escape'){e.preventDefault();close(true);}else if(e.key==='Tab'){const controls=[...panel.querySelectorAll('a,button,textarea:not([hidden])')];if((e.shiftKey&&document.activeElement===controls[0])||(!e.shiftKey&&document.activeElement===controls.at(-1))){close(true);if(e.shiftKey)e.preventDefault();}}else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const controls=[...panel.querySelectorAll('.etp-share-icon')],i=controls.indexOf(document.activeElement);if(i>=0){e.preventDefault();controls[(i+(e.key==='ArrowRight'?1:-1)+controls.length)%controls.length].focus();}}});
 window.addEventListener('resize',()=>close());window.addEventListener('scroll',()=>close(),{passive:true});
})();
