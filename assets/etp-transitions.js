(()=>{if(window.ETPTransitions)return;let sound=true;const contexts=new Set();function stopSounds(){for(const c of contexts)c.close().catch(()=>{});contexts.clear()}function ctx(){const c=new (window.AudioContext||window.webkitAudioContext)();contexts.add(c);setTimeout(()=>{c.close().catch(()=>{});contexts.delete(c)},1450);return c}function tone(c,f,d,t='sine',g=.05,w=0,to){const o=c.createOscillator(),a=c.createGain();o.type=t;o.frequency.setValueAtTime(f,c.currentTime+w);if(to)o.frequency.exponentialRampToValueAtTime(to,c.currentTime+w+d);a.gain.setValueAtTime(.0001,c.currentTime+w);a.gain.exponentialRampToValueAtTime(g,c.currentTime+w+.02);a.gain.exponentialRampToValueAtTime(.0001,c.currentTime+w+d);o.connect(a);a.connect(c.destination);o.start(c.currentTime+w);o.stop(c.currentTime+w+d+.03)}/* Gentle spiral of air, never a pitch-bending bloop. The existing transition visuals are unchanged.
   Filtered pink-like noise, swept left to right and back with smooth fades. */
function softWind(c,duration=.62){
 const sampleRate=c.sampleRate,frames=Math.ceil(sampleRate*duration),buffer=c.createBuffer(1,frames,sampleRate);
 const data=buffer.getChannelData(0);let low=0;
 for(let i=0;i<frames;i++){
  low=.94*low+.06*(Math.random()*2-1);
  const t=i/sampleRate;
  data[i]=low*(.75+.25*Math.sin(t*17));
 }
 const start=c.currentTime+.005;
 for(let layer=0;layer<2;layer++){
  const src=c.createBufferSource();src.buffer=buffer;
  const high=c.createBiquadFilter();high.type="highpass";high.frequency.value=layer?140:110;
  const filter=c.createBiquadFilter();filter.type="lowpass";filter.Q.value=.22;
  filter.frequency.setValueAtTime(layer?780:610,start);
  filter.frequency.linearRampToValueAtTime(layer?1170:960,start+duration*.42);
  filter.frequency.linearRampToValueAtTime(layer?500:410,start+duration);
  const amp=c.createGain();const level=layer?.085:.11;
  amp.gain.setValueAtTime(.0001,start);
  amp.gain.linearRampToValueAtTime(level,start+duration*.20);
  amp.gain.setValueAtTime(level,start+duration*.48);
  amp.gain.linearRampToValueAtTime(.0001,start+duration);
  src.connect(high);high.connect(filter);filter.connect(amp);
  if(c.createStereoPanner){
   const pan=c.createStereoPanner();
   pan.pan.setValueAtTime(layer?.52:-.60,start);
   pan.pan.linearRampToValueAtTime(layer?-.48:.55,start+duration*.52);
   pan.pan.linearRampToValueAtTime(layer?.10:-.10,start+duration);
   amp.connect(pan);pan.connect(c.destination);
  }else amp.connect(c.destination);
  src.start(start);src.stop(start+duration+.01);
 }
}
function sfx(n){
 if(!sound)return;
 let c;try{c=ctx()}catch(e){return}
 if(n==="gold"){tone(c,392,.28,"sine",.022);tone(c,587,.35,"sine",.016,.08);return}
 if(n==="tap"){tone(c,215,.035,"sine",.008);return}
 softWind(c,n==="wind"||n==="time"||n==="timeline"?.67:.54);
}
function ensure(){let o=document.getElementById('etpTransitionOverlay');if(o)return o;o=document.createElement('div');o.id='etpTransitionOverlay';o.setAttribute('aria-hidden','true');o.innerHTML='<div class="etp-fx"></div>';document.body.appendChild(o);return o}
let pending=false,travelTimer=null,cleanupTimer=null,warpInterval=null;
const quiet=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('comfort-still');
function reset(){stopSounds();clearTimeout(travelTimer);clearTimeout(cleanupTimer);clearInterval(warpInterval);pending=false;const o=document.getElementById('etpTransitionOverlay');if(o){o.classList.remove('active');o.setAttribute('aria-hidden','true');o.firstElementChild.replaceChildren()}}
function go(url,type){if(pending)return;pending=true;const o=ensure();o.firstElementChild.className='etp-fx etp-'+type;o.classList.add('active');if(!quiet())sfx(type);travelTimer=setTimeout(()=>{window.ETPRepair?.stopMusic();location.assign(url)},quiet()?0:420);cleanupTimer=setTimeout(reset,1400)}
function dateWarp(selected,from){reset();const o=ensure(),fx=o.firstElementChild;fx.className='etp-fx etp-date-warp';const center=document.createElement('strong'),dates=document.createElement('span');center.textContent=selected.toLocaleDateString('en-US',{month:'long',day:'numeric'});dates.className='etp-warp-dates';fx.append(center,dates);o.setAttribute('aria-hidden','false');o.classList.add('active');if(!quiet()){sfx('wind');const begin=performance.now(),start=from.getTime(),end=selected.getTime();warpInterval=setInterval(()=>{const t=Math.min(1,(performance.now()-begin)/900);dates.textContent=new Date(start+(end-start)*t).toLocaleDateString('en-US',{month:'short',day:'numeric'})},70)}cleanupTimer=setTimeout(reset,quiet()?180:1050)}
window.ETPTransitions={setSound:v=>sound=!!v,navigate:(url,type='page')=>go(url,type),clickSound:n=>sfx(n||'tap'),dateWarp,reset};
try{sound=localStorage.getItem('etp-sfx')!=='off'}catch{}
document.addEventListener('click',e=>{const a=e.target.closest('a[data-etp-transition]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;e.preventDefault();go(a.href,a.dataset.etpTransition||'page')});window.addEventListener('pageshow',reset);window.addEventListener('pagehide',reset);
})();