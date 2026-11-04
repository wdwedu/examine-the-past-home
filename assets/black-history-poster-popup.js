/* 45-second Black History Heroes poster popup. Site-wide, once per tab session.
   Uses the same artwork and destination everywhere; no external dependencies. */
(()=>{'use strict';
if(window.__etpPosterPopupLoaded)return;window.__etpPosterPopupLoaded=true;
const ROOT=(()=>{const script=document.currentScript;return script?.src?new URL('../',script.src).pathname:'/'})();
const KEY='etp-black-history-poster-v1';
const START=KEY+'-first-seen';
const WAIT=45000;
const DEST='https://examinethepast.etsy.com/listing/1853851411';
let seen=false;try{seen=sessionStorage.getItem(KEY)==='seen'}catch(e){}
if(seen)return;
let started=Date.now();try{const previous=Number(sessionStorage.getItem(START));if(previous>0&&previous<=Date.now())started=previous;else sessionStorage.setItem(START,String(started))}catch(e){}
let popup=null,previousFocus=null;
function markSeen(){try{sessionStorage.setItem(KEY,'seen')}catch(e){}}
function close(){if(!popup)return;popup.hidden=true;markSeen();document.removeEventListener('keydown',onKey);if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true})}
function onKey(event){if(event.key==='Escape'){event.preventDefault();close()}else if(event.key==='Tab'&&popup&&!popup.hidden){const controls=[...popup.querySelectorAll('button,a')];const first=controls[0],last=controls[controls.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}}
function show(){if(popup||document.querySelector('.etp-poster-promo'))return;try{if(sessionStorage.getItem(KEY)==='seen')return}catch(e){}
previousFocus=document.activeElement;
popup=document.createElement('div');popup.className='etp-poster-promo';
popup.setAttribute('role','presentation');
popup.innerHTML='<section class="etp-poster-promo-card" role="dialog" aria-modal="true" aria-labelledby="etp-poster-title">'+
'<button type="button" class="etp-poster-promo-close" aria-label="Close poster advertisement" title="Close">×</button>'+
'<p class="etp-poster-promo-kicker">Examine the Past · Featured Poster</p>'+
'<h2 id="etp-poster-title" class="etp-poster-promo-title">Black History Heroes</h2>'+
'<img class="etp-poster-promo-image" alt="Black History Heroes glossy portrait collection poster" src="'+ROOT+'assets/promos/black-history-heroes-glossy-poster.webp">'+
'<div class="etp-poster-promo-fallback">Explore the Black History Heroes poster on Etsy</div>'+
'<p class="etp-poster-promo-copy">A striking collection of Black history portraits, brought together in one glossy wall display.</p>'+
'<a class="etp-poster-promo-cta" href="'+DEST+'" target="_blank" rel="noopener noreferrer">View on Etsy ↗</a></section>';
document.body.append(popup);
popup.querySelector('img').addEventListener('error',e=>{e.currentTarget.hidden=true});
popup.querySelector('.etp-poster-promo-close').addEventListener('click',close);
popup.querySelector('.etp-poster-promo-cta').addEventListener('click',()=>{markSeen();close()});
popup.addEventListener('click',e=>{if(e.target===popup)close()});
document.addEventListener('keydown',onKey);
popup.querySelector('.etp-poster-promo-close').focus({preventScroll:true});
markSeen();
}
function start(){setTimeout(show,Math.max(0,WAIT-(Date.now()-started)))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
