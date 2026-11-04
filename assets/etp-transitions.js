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

/* Five original Examine the Past cinematic transition experiences.
   The existing 'time' and other transition types remain available. */
const cinematic={
 "warp-tunnel":{duration:1460,sound:"warp-tunnel"},
 "temporal-spiral":{duration:1390,sound:"temporal-spiral"},
 "rotating-library":{duration:1610,sound:"rotating-library"},
 "earth-portal":{duration:1530,sound:"earth-portal"},
 "keyhole-passage":{duration:1430,sound:"keyhole-passage"}
};
function cinematicAudio(name){
 if(!sound||quiet())return;
 let c;try{c=ctx()}catch{return}
 const now=c.currentTime;
 function sweep(f1,f2,start,duration,level=.021,kind="sine"){
  const o=c.createOscillator(),a=c.createGain(),filter=c.createBiquadFilter();
  o.type=kind;filter.type="lowpass";filter.frequency.value=1550;
  o.frequency.setValueAtTime(Math.max(20,f1),now+start);
  o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),now+start+duration);
  a.gain.setValueAtTime(.0001,now+start);
  a.gain.exponentialRampToValueAtTime(level,now+start+Math.min(.085,duration*.27));
  a.gain.exponentialRampToValueAtTime(.0001,now+start+duration);
  o.connect(filter);filter.connect(a);a.connect(c.destination);
  o.start(now+start);o.stop(now+start+duration+.02);
 }
 if(name==="warp-tunnel"){
  timeWarp(c,true);sweep(88,460,.12,.73,.018);sweep(195,750,.37,.58,.012);
 }else if(name==="temporal-spiral"){
  timeWarp(c,true);sweep(330,190,.08,.56,.013);sweep(190,700,.29,.75,.017);
 }else if(name==="rotating-library"){
  sweep(120,148,.02,.66,.024,"triangle");sweep(240,185,.34,.58,.012);
  tone(c,440,.36,"sine",.018,.66);tone(c,587,.44,"sine",.011,.78);
 }else if(name==="earth-portal"){
  sweep(70,165,.02,1.01,.028);sweep(260,480,.35,.69,.011);
  tone(c,392,.56,"sine",.014,.64);tone(c,587,.48,"sine",.010,.79);
 }else if(name==="keyhole-passage"){
  tone(c,270,.10,"triangle",.019,.02);
  sweep(90,570,.20,.73,.024);sweep(230,860,.54,.48,.012);
 }
}
function makeCinematic(fx,name){
 const stage=document.createElement("div");stage.className="etp-cine-stage";
 stage.setAttribute("aria-hidden","true");
 const part=(klass,parent=stage)=>{
  const el=document.createElement("span");el.className=klass;parent.append(el);return el;
 };
 if(name==="warp-tunnel"){
  part("etp-cine-core");
  for(let i=0;i<9;i++){const ring=part("etp-cine-ring");ring.style.setProperty("--i",i);}
  for(let i=0;i<23;i++){const ray=part("etp-cine-streak");ray.style.setProperty("--a",(i*360/23)+"deg");ray.style.setProperty("--i",i);}
 }else if(name==="temporal-spiral"){
  part("etp-cine-spiral-core");
  for(let i=0;i<7;i++){const ribbon=part("etp-cine-ribbon");ribbon.style.setProperty("--i",i);}
  for(let i=0;i<14;i++){const spark=part("etp-cine-spiral-spark");spark.style.setProperty("--a",(i*360/14)+"deg");spark.style.setProperty("--i",i);}
 }else if(name==="rotating-library"){
  const room=part("etp-cine-room");
  for(let i=0;i<5;i++){const panel=part("etp-cine-shelf",room);panel.style.setProperty("--i",i);
   for(let j=0;j<9;j++){const book=part("etp-cine-book",panel);book.style.setProperty("--j",j);}
  }
  part("etp-cine-library-light");
 }else if(name==="earth-portal"){
  const earth=part("etp-cine-earth");part("etp-cine-earth-continent",earth);
  part("etp-cine-earth-glow");
  for(let i=0;i<6;i++){const orbit=part("etp-cine-orbit");orbit.style.setProperty("--i",i);}
  part("etp-cine-earth-center");
 }else if(name==="keyhole-passage"){
  part("etp-cine-door-left");part("etp-cine-door-right");
  part("etp-cine-keyhole");part("etp-cine-keyhole-light");
  for(let i=0;i<7;i++){const beam=part("etp-cine-key-beam");beam.style.setProperty("--i",i);}
 }
 fx.append(stage);
}
function ensure(){let o=document.getElementById('etpTransitionOverlay');if(o)return o;o=document.createElement('div');o.id='etpTransitionOverlay';o.setAttribute('aria-hidden','true');o.innerHTML='<div class="etp-fx"></div>';document.body.appendChild(o);return o}
let pending=false,travelTimer=null,cleanupTimer=null,warpInterval=null;
const quiet=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('comfort-still');
function reset(){stopSounds();clearTimeout(travelTimer);clearTimeout(cleanupTimer);clearInterval(warpInterval);pending=false;const o=document.getElementById('etpTransitionOverlay');if(o){o.classList.remove('active');o.setAttribute('aria-hidden','true');o.firstElementChild.className='etp-fx';o.firstElementChild.replaceChildren()}}
function showCinematic(type){
 const o=ensure(),fx=o.firstElementChild;
 fx.replaceChildren();fx.className="etp-fx etp-"+type;
 makeCinematic(fx,type);o.setAttribute("aria-hidden","true");o.classList.add("active");
 if(!quiet())cinematicAudio(type);
 return cinematic[type].duration;
}
function go(url,type){
 if(pending)return;pending=true;
 const isCine=Object.hasOwn(cinematic,type),duration=isCine?showCinematic(type):420;
 if(!isCine){const o=ensure();o.firstElementChild.className="etp-fx etp-"+type;o.classList.add("active");if(!quiet())sfx(type);}
 travelTimer=setTimeout(()=>{window.ETPRepair?.stopMusic();location.assign(url)},quiet()?0:duration);
 cleanupTimer=setTimeout(reset,isCine?duration+700:1400);
}
function preview(type){if(!Object.hasOwn(cinematic,type))return false;reset();if(quiet())return false;showCinematic(type);cleanupTimer=setTimeout(reset,cinematic[type].duration+250);return true;}
function dateWarp(selected,from){reset();const o=ensure(),fx=o.firstElementChild;fx.className='etp-fx etp-date-warp';const center=document.createElement('strong'),dates=document.createElement('span');center.textContent=selected.toLocaleDateString('en-US',{month:'long',day:'numeric'});dates.className='etp-warp-dates';fx.append(center,dates);o.setAttribute('aria-hidden','false');o.classList.add('active');if(!quiet()){sfx('date-warp');const begin=performance.now(),start=from.getTime(),end=selected.getTime();warpInterval=setInterval(()=>{const t=Math.min(1,(performance.now()-begin)/900);dates.textContent=new Date(start+(end-start)*t).toLocaleDateString('en-US',{month:'short',day:'numeric'})},70)}cleanupTimer=setTimeout(reset,quiet()?180:1050)}
window.ETPTransitions={setSound:v=>sound=!!v,navigate:(url,type='page')=>go(url,type),clickSound:n=>sfx(n||'tap'),dateWarp,reset,preview,cinematicTypes:Object.keys(cinematic)};
try{sound=localStorage.getItem('etp-sfx')!=='off'}catch{}
document.addEventListener('click',e=>{const a=e.target.closest('a[data-etp-transition]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;e.preventDefault();go(a.href,a.dataset.etpTransition||'page')});window.addEventListener('pageshow',reset);window.addEventListener('pagehide',reset);
})();