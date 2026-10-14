/* Repair integration; shared controls initialize once per document. */
(()=>{
if(window.ETPRepair)return;
const script=document.currentScript,root=new URL('../',script.src).pathname;
const url=p=>root+p;
const themeKey='etp-theme';
let themeMode='off';
try{const prior=localStorage.getItem(themeKey);const reader=JSON.parse(localStorage.getItem('ie-reader:v2')||'{}');themeMode=prior||reader.theme||(localStorage.getItem('etp-lights-mode')==='on'?'on':'off')}catch{}
function setTheme(mode,persist=true){
 if(!['off','on','warm','gray'].includes(mode))mode='off';
 const changed=document.body.dataset.etpTheme&&document.body.dataset.etpTheme!==mode;
 themeMode=mode;const light=mode!=='off';document.body.dataset.etpTheme=mode;document.body.dataset.comfortShade=mode;
 document.body.classList.toggle('lights-on',mode==='on');document.body.classList.toggle('etp-lights-on',light);
 if(changed){document.getElementById('read-stop')?.click();window.speechSynthesis?.cancel()}
 if(persist)try{localStorage.setItem(themeKey,mode);localStorage.setItem('etp-lights-mode',light?'on':'off');const prefs=JSON.parse(localStorage.getItem('ie-reader:v2')||'{}');prefs.theme=mode;localStorage.setItem('ie-reader:v2',JSON.stringify(prefs))}catch{}
 document.querySelectorAll('[data-etp-lights-label]').forEach(n=>n.textContent=light?'Lights On':'Lights Off');
 document.querySelectorAll('[data-etp-action="lights"]').forEach(n=>n.setAttribute('aria-label',light?'Lights On':'Lights Off'));
 document.querySelectorAll('[data-shade]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.shade===mode)));
 document.dispatchEvent(new CustomEvent('etp-theme-change',{detail:mode}));
}
window.ETPTheme={set:setTheme,get:()=>themeMode,toggle:()=>setTheme(themeMode==='off'?'on':'off')};setTheme(themeMode,false);
const brandCSS=document.createElement('link');brandCSS.rel='stylesheet';brandCSS.href=url('assets/brand-v65.css?v=65');brandCSS.dataset.etpBrand='65';document.head.append(brandCSS);
window.addEventListener('storage',e=>{if(e.key===themeKey)setTheme(e.newValue,false)});

function stopMusic(){window.ETPExperience?.stopPlayer();document.querySelectorAll('audio,video').forEach(a=>a.pause());document.querySelectorAll('.etp-jukebox-overlay iframe').forEach(f=>{f.src='';});try{sessionStorage.setItem('etp-music-playing','off')}catch{}}
let readerLoading=false;
function enableReader(){
 const main=document.querySelector('main');
 if(readerLoading||!main||document.getElementById('page-tools')||!document.querySelector('.lesson-grid,[data-lesson-id],article[data-article],.article-body,.guide-body,main[data-etp-reading]'))return;
 readerLoading=true;document.body.dataset.reader='true';document.querySelector('.etp-reader')?.remove();
 for(const name of ['read-aloud.css','page-tools.css','reader-comfort.css']){const l=document.createElement('link');l.rel='stylesheet';l.href=url('assets/'+name+'?v=65');document.head.append(l)}
 const bar=document.createElement('aside');bar.id='page-tools';bar.innerHTML='<button class="light-toggle" type="button">Comfort</button><div class="reader-utilities"></div><div class="reader-right"></div>';document.body.append(bar);
 function load(name){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url('assets/'+name+'?v=65');s.onload=resolve;s.onerror=reject;document.head.append(s)})}
 load('read-aloud.js').then(()=>load('reader-comfort.js')).then(()=>{
 document.head.append(brandCSS);setTheme(themeMode,false);const settings=document.getElementById('read-settings');if(!settings)return;
 const restart=document.createElement('button');restart.type='button';restart.id='read-restart';restart.textContent='Restart';restart.onclick=()=>{document.getElementById('read-stop').click();document.getElementById('read-play').click()};settings.append(restart);
 ['read-play','read-here','read-restart'].forEach(id=>document.getElementById(id)?.addEventListener('click',stopMusic,{capture:true}));
 document.querySelectorAll('audio').forEach(a=>a.addEventListener('play',()=>document.getElementById('read-stop')?.click()));
 const update=()=>{const foot=document.querySelector('#etpSiteFooter,#game-shell-footer,body>footer'),height=bar.getBoundingClientRect().height;const overlap=foot?Math.max(0,innerHeight-foot.getBoundingClientRect().top):0;bar.style.setProperty('--tools-footer-offset',Math.min(overlap,innerHeight-height)+'px');document.documentElement.style.setProperty('--etp-reader-height',height+'px')};
 window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);new ResizeObserver(update).observe(bar);update();
 }).catch(()=>{bar.remove();readerLoading=false;console.error('Reading bar could not load')});
}
function refreshHeader(){const header=document.getElementById('etpSiteHeader')||document.querySelector('#game-shell-nav header');if(header&&!header.dataset.repairObserved){header.dataset.repairObserved='true';const resize=()=>document.documentElement.style.setProperty('--etp-header-height',header.getBoundingClientRect().height+'px');new ResizeObserver(resize).observe(header);resize()}}
window.ETPRepair={stopMusic,enableReader,refreshHeader};
function boot(){
 const dock=document.createElement('div');dock.className='etp-media-dock';dock.setAttribute('aria-label','Music controls');dock.innerHTML='<button type="button" data-etp-action="jukebox">Music / Media</button><button type="button" id="music-stop">Music Off</button>';document.body.append(dock);
 dock.querySelector('#music-stop').onclick=stopMusic;
 // Game pages and ordinary pages share one explicit-choice player.
 dock.querySelector('[data-etp-action]').addEventListener('click',()=>{if(!window.ETPExperience)console.warn('Music player is still loading')});
 document.querySelectorAll('audio').forEach(a=>{a.autoplay=false;a.removeAttribute('autoplay');a.pause();a.addEventListener('play',()=>{document.querySelectorAll('audio,video').forEach(other=>{if(other!==a)other.pause()});document.querySelectorAll('.etp-jukebox-overlay iframe').forEach(f=>f.src='')})});
 let previous=null;try{previous=sessionStorage.getItem('etp-last-page');if(previous!==location.href)sessionStorage.setItem('etp-last-page',location.href)}catch{}
 if(/\/(maps|timeline)\/(?:index\.html)?$/.test(location.pathname)){
 const nav=document.createElement('nav');nav.className='etp-return';nav.setAttribute('aria-label','Return navigation');const back=document.createElement('a');back.textContent='‹ Back';back.href=previous&&new URL(previous).origin===location.origin&&previous!==location.href?previous:url('');const home=document.createElement('a');home.textContent='Home';home.href=url('');nav.append(back,home);nav.dataset.etpTransition='none';const header=document.getElementById('etpSiteHeader');if(header)header.after(nav);else document.body.prepend(nav);
 }
 document.querySelectorAll('.etp-icon-nav a').forEach(a=>{const label=a.parentElement.querySelector('.etp-tip')?.textContent;if(label)a.setAttribute('aria-label',label)});
 // Old globe routes now resolve to the standalone working pages.
 const aliases={'resources/learning-styles':'teacher-tools/learning-styles/','on-this-day-in-history':'today/','interactive-timeline':'timeline/','resources/blooms-taxonomy':'teacher-tools/blooms-taxonomy/','historical-maps':'maps/','resources/current-event-article-analysis':'current-events/','resources/teaching-movie-lessons':'teacher-tools/movies-in-the-classroom/'};
 document.querySelectorAll('a[href]').forEach(a=>{try{const u=new URL(a.href);if(/^(www\.)?examinethepast\.com$/.test(u.hostname)){const key=u.pathname.replace(/^\//,'').replace(/\/$/,'');const dest=aliases[key]||(/^(games|lessons|maps|timeline|today|teacher-tools)(\/|$)/.test(key)?key+'/':null);if(dest){a.href=url(dest);a.removeAttribute('target')}}}catch{}});
 document.querySelectorAll('.nav-star').forEach(a=>{a.setAttribute('data-etp-transition','globe');a.removeAttribute('target');a.addEventListener('click',e=>{if(matchMedia('(hover: none)').matches&&!a.classList.contains('tap-active')){e.preventDefault();document.querySelectorAll('.nav-star').forEach(x=>x.classList.remove('tap-active'));a.classList.add('tap-active')}});a.addEventListener('focus',()=>{if(!matchMedia('(hover: none)').matches)a.classList.add('tap-active')});a.addEventListener('pointerdown',()=>{if(!matchMedia('(hover: none)').matches)a.classList.add('tap-active')})});
 document.querySelectorAll('.globe-stage+*,.globe-hint,.hero-hint').forEach(n=>{if(/hover/i.test(n.textContent)&&n.textContent.length<180)n.textContent='Tap a light to see its label; tap again to explore. You can also select with a keyboard.'});
 // Reserve sticky header height for lesson progress and anchor destinations.
 refreshHeader();
 enableReader();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('pagehide',()=>{stopMusic();window.speechSynthesis?.cancel()});
})();
