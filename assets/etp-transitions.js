(()=>{if(window.ETPTransitions)return;let sound=true;const contexts=new Set();function stopSounds(){for(const c of contexts)c.close().catch(()=>{});contexts.clear()}function ctx(){const c=new (window.AudioContext||window.webkitAudioContext)();contexts.add(c);setTimeout(()=>{c.close().catch(()=>{});contexts.delete(c)},1450);return c}function tone(c,f,d,t='sine',g=.05,w=0,to){const o=c.createOscillator(),a=c.createGain();o.type=t;o.frequency.setValueAtTime(f,c.currentTime+w);if(to)o.frequency.exponentialRampToValueAtTime(to,c.currentTime+w+d);a.gain.setValueAtTime(.0001,c.currentTime+w);a.gain.exponentialRampToValueAtTime(g,c.currentTime+w+.02);a.gain.exponentialRampToValueAtTime(.0001,c.currentTime+w+d);o.connect(a);a.connect(c.destination);o.start(c.currentTime+w);o.stop(c.currentTime+w+d+.03)}/* Restored original time-warp character: rising, layered temporal sweeps rather
   than the filtered wind used in the previous revision. Existing visuals unchanged. */
function timeWarp(c,extended=false){
 const base=c.currentTime;
 const pulseCount=extended?3:2;
 for(let i=0;i<pulseCount;i++){
  const offset=i*(extended?.27:.20);
  const duration=extended?.29:.26;
  const oscillator=c.createOscillator(),amp=c.createGain(),filter=c.createBiquadFilter();
  oscillator.type="sine";
  oscillator.frequency.setValueAtTime(75,base+offset);
  oscillator.frequency.exponentialRampToValueAtTime(650,base+offset+duration);
  filter.type="lowpass";filter.frequency.value=900;
  amp.gain.setValueAtTime(.0001,base+offset);
  amp.gain.exponentialRampToValueAtTime(.034,base+offset+.05);
  amp.gain.exponentialRampToValueAtTime(.0001,base+offset+duration);
  oscillator.connect(filter);filter.connect(amp);amp.connect(c.destination);
  oscillator.start(base+offset);oscillator.stop(base+offset+duration+.03);
 }
}
function sfx(n){
 if(!sound)return;
 let c;try{c=ctx()}catch(e){return}
 if(n==="gold"){tone(c,392,.28,"sine",.022);tone(c,587,.35,"sine",.016,.08);return}
 if(n==="tap"){tone(c,215,.035,"sine",.008);return}
 timeWarp(c,n==="time"||n==="timeline"||n==="warp"||n==="date-warp");
}
function ensure(){let o=document.getElementById('etpTransitionOverlay');if(o)return o;o=document.createElement('div');o.id='etpTransitionOverlay';o.setAttribute('aria-hidden','true');o.innerHTML='<div class="etp-fx"></div>';document.body.appendChild(o);return o}
let pending=false,travelTimer=null,cleanupTimer=null,warpInterval=null;
const quiet=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('comfort-still');
function reset(){stopSounds();clearTimeout(travelTimer);clearTimeout(cleanupTimer);clearInterval(warpInterval);pending=false;const o=document.getElementById('etpTransitionOverlay');if(o){o.classList.remove('active');o.setAttribute('aria-hidden','true');o.firstElementChild.replaceChildren()}}
function go(url,type){if(pending)return;pending=true;const o=ensure();o.firstElementChild.className='etp-fx etp-'+type;o.classList.add('active');if(!quiet())sfx(type);travelTimer=setTimeout(()=>{window.ETPRepair?.stopMusic();location.assign(url)},quiet()?0:420);cleanupTimer=setTimeout(reset,1400)}
function dateWarp(selected,from){reset();const o=ensure(),fx=o.firstElementChild;fx.className='etp-fx etp-date-warp';const center=document.createElement('strong'),dates=document.createElement('span');center.textContent=selected.toLocaleDateString('en-US',{month:'long',day:'numeric'});dates.className='etp-warp-dates';fx.append(center,dates);o.setAttribute('aria-hidden','false');o.classList.add('active');if(!quiet()){sfx('date-warp');const begin=performance.now(),start=from.getTime(),end=selected.getTime();warpInterval=setInterval(()=>{const t=Math.min(1,(performance.now()-begin)/900);dates.textContent=new Date(start+(end-start)*t).toLocaleDateString('en-US',{month:'short',day:'numeric'})},70)}cleanupTimer=setTimeout(reset,quiet()?180:1050)}
window.ETPTransitions={setSound:v=>sound=!!v,navigate:(url,type='page')=>go(url,type),clickSound:n=>sfx(n||'tap'),dateWarp,reset};
try{sound=localStorage.getItem('etp-sfx')!=='off'}catch{}
document.addEventListener('click',e=>{const a=e.target.closest('a[data-etp-transition]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;e.preventDefault();go(a.href,a.dataset.etpTransition||'page')});window.addEventListener('pageshow',reset);window.addEventListener('pagehide',reset);
})();