(()=>{if(window.__ETP_EXPERIENCE_V52)return;window.__ETP_EXPERIENCE_V52=true;
let stopPlayer=()=>{};
let sfx=(()=>{try{return localStorage.getItem("etp-sfx")!=="off"}catch{return true}})(),utterance=null,readerSpeed=1,currentTracks=[],currentIndex=-1,isPlaying=false;const LIGHT_KEY="etp-lights-mode";
const library={
"Rock / Pop":[
{id:"eFTLKWw542g",title:"Billy Joel — We Didn't Start the Fire",note:"A rapid-fire survey of postwar people, events, culture, conflict, and change."}
],
"Hip-Hop":[
{id:"HUZOKvYcx_o",title:"Common & John Legend — Glory",note:"A modern Civil Rights-era connection through the story and memory of Selma."}
],
"Soul / R&B":[
{id:"wEBlaMOmKV4",title:"Sam Cooke — A Change Is Gonna Come",note:"A landmark Civil Rights-era song about hope, inequality, and social change."},
{id:"A134hShx_gw",title:"Aretha Franklin — Respect",note:"A song closely associated with Civil Rights, women's rights, dignity, and social change."}
],
"Reggae":[
{id:"uMUQMSXLlHM",title:"Bob Marley & The Wailers — Buffalo Soldier",note:"A musical doorway into Black military history, displacement, memory, and identity."}
],
"Jazz":[
{id:"zqNTltOGh5c",title:"Miles Davis — So What",note:"Modal jazz and the sound of postwar American musical experimentation."},
{id:"ej6gfL4yF4E",title:"John Coltrane — My Favorite Things",note:"A familiar melody transformed through improvisation during a major era of modern jazz."},
{id:"rBrd_3VMC3c",title:"Louis Armstrong — What a Wonderful World",note:"A late-career recording by one of the foundational figures in the history of jazz."}
],
"Folk":[
{id:"9ywYohqoM60",title:"Bob Dylan — The Times They Are A-Changin'",note:"Folk music as a voice for generational change, reform, and 1960s protest culture."}
],
"Afrobeat":[
{id:"Qj5x6pbJMyU",title:"Fela Kuti — Zombie",note:"Afrobeat used as political resistance and criticism of military power in Nigeria."}
],
"Country":[
{id:"bSTJR2VgwCE",title:"Johnny Cash — The Ballad of Ira Hayes",note:"A country narrative about Indigenous military service, public memory, and the costs of war."}
],
"Historical Songs":[
{id:"M3tKJ8gSKSk",title:"Fisk Jubilee Singers — Wade in the Water",note:"An African American spiritual with deep roots in Black religious, cultural, and musical history."},
{id:"wEBlaMOmKV4",title:"Sam Cooke — A Change Is Gonna Come",note:"Civil Rights-era music that can be paired with the history of protest, segregation, and social change.",fallback:"wEBlaMOmKV4"}
],
"Great American Songbook":[
{id:"SmAs3262L9c",title:"Fred Astaire — Cheek to Cheek",note:"A popular standard tied to American film, dance, entertainment, and interwar popular culture."}
],
"Spirituals & Gospel":[
{id:"haRTx76mmgY",title:"Bill McAdoo & Pete Seeger — Wade in the Water",note:"A Smithsonian Folkways recording connecting spiritual traditions, folk preservation, and Black musical history."}
],
"History Stories":[
{id:"6E9WU9TGrec",title:"Crash Course U.S. History #1",note:"A fast overview of Native societies, Spanish colonization, and the problem of the 'Black Legend.'"},
{id:"iIoYdC1Gkq8",title:"History of the Fourth of July",note:"A short history-focused video on the date, the Declaration, and traditions around Independence Day."}
]};
function setSfx(v){sfx=!!v;try{localStorage.setItem("etp-sfx",sfx?"on":"off")}catch(e){}if(window.ETPTransitions)window.ETPTransitions.setSound(sfx);document.querySelectorAll("[data-etp-sfx-state]").forEach(n=>n.textContent=sfx?"On":"Off")}
const documentaries=[
 {id:'DQYzHIIQ1O4',title:'The March — Full Film',note:'National Archives restoration of James Blue’s film documenting the 1963 March on Washington.',source:'https://www.archives.gov/news/topics/african-american-history'},
 {id:'yjpYzFtxfjU',title:'The Gilded Age — Full Documentary',note:'American Experience / PBS documentary on the late nineteenth-century United States.',source:'https://www.wpbstv.org/the-gilded-age-full-documentary-american-experience-pbs/'}
];
const speeches=[
 {id:'NwM6s55no6U',title:'John F. Kennedy — Inaugural Address',note:'January 20, 1961. Recording published by The Kennedy Center.',source:'https://www.youtube.com/watch?v=NwM6s55no6U'},
 {id:'7xd8MpR-5Ko',title:'Franklin D. Roosevelt — Day of Infamy',note:'FDR Library’s annotated “Pop-Up Video” of the address to Congress.',source:'https://www.youtube.com/watch?v=7xd8MpR-5Ko'}
];
function ensureJukebox(){let o=document.querySelector('.etp-jukebox-overlay');if(o)return o;
 o=document.createElement('div');o.className='etp-jukebox-overlay';o.id='etp-jukebox';o.hidden=true;
 const root=new URL('../',document.querySelector('script[src*="etp-experience-v50.js"]').src).pathname;
 o.innerHTML=`<section class="etp-jukebox-card" role="dialog" aria-modal="true" aria-label="Examine the Past Jukebox"><div class="etp-jukebox-top"><span class="etp-mini-title"></span><div class="etp-jukebox-actions"><button type="button" class="etp-jukebox-min" aria-label="Minimize jukebox">—</button><button type="button" class="etp-jukebox-close" aria-label="Close jukebox and stop media">×</button></div><div class="etp-jukebox-brand"><img src="${root}assets/extracted/2c5f625ea6f72201aca6.webp" alt="Examine the Past Earth"><div><span>Examine the Past</span><h2>Jukebox</h2></div></div></div><svg class="etp-spectrum" viewBox="0 0 600 24" preserveAspectRatio="none" aria-hidden="true"><path class="etp-spectrum-base" d="M0 12H600"/><path class="etp-spectrum-wave" d="M0 12H30L36 8L42 16L48 3L54 21L60 8L66 12H110L116 5L122 19L128 9L134 15L140 12H190L196 7L202 17L208 2L214 22L220 9L226 12H280L286 5L292 19L298 9L304 15L310 12H360L366 8L372 16L378 3L384 21L390 8L396 12H450L456 5L462 19L468 9L474 15L480 12H540L546 7L552 17L558 3L564 21L570 12H600"/></svg><button type="button" class="etp-juke-back" hidden>‹ Back</button><div class="etp-jukebox-player-shell" hidden><div class="etp-jukebox-now"><strong></strong><span></span></div><div class="etp-video-wrap"><iframe title="Examine the Past Jukebox player" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div><div class="etp-player-controls"><button type="button" data-player="prev">‹ Previous</button><button type="button" data-player="toggle">Pause</button><button type="button" data-player="next">Next ›</button><button type="button" data-player="stop">Stop</button></div><details class="etp-selection-details"><summary>About This Selection</summary><div class="etp-track-note"></div></details><a class="etp-watch-source" target="_blank" rel="noopener">Open on YouTube ↗</a></div><div class="etp-juke-screen"></div><p class="etp-juke-message" role="status"></p><div class="etp-juke-footer"><img src="${root}assets/ie-credit.png" alt="InAct Entertainment logo"><span>Brought to you by InAct Entertainment LLC<br>© 2026 InAct Entertainment LLC</span></div></section>`;
 document.body.append(o);
 const screen=o.querySelector('.etp-juke-screen'),back=o.querySelector('.etp-juke-back'),frame=o.querySelector('iframe'),player=o.querySelector('.etp-jukebox-player-shell'),toggle=o.querySelector('[data-player="toggle"]'),message=o.querySelector('.etp-juke-message');
 let lastBrowse='root',lastGenre='',shuffled=false,repeated=false;let view='root',genre='',collection=[],index=-1,playing=false,active=null,returnFocus=null,playlist=[];
 try{playlist=JSON.parse(localStorage.getItem('etp-playlist')||'[]');if(!Array.isArray(playlist))playlist=[];playlist=playlist.filter(t=>/^[\w-]{11}$/.test(t.id)&&typeof t.title==='string')}catch{}
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function save(){try{localStorage.setItem('etp-playlist',JSON.stringify(playlist));message.textContent='Playlist saved in this browser.'}catch{message.textContent='Playlist is available for this page; browser storage is unavailable.'}}
 function communicate(command){try{frame.contentWindow.postMessage(JSON.stringify({event:'command',func:command,args:[]}), 'https://www.youtube.com')}catch{}}
 function setPlaying(v){playing=v;toggle.textContent=v?'Pause':'Play';toggle.setAttribute('aria-label',v?'Pause selection':'Play selection')}
 stopPlayer=()=>{frame.removeAttribute('src');setPlaying(false);if(o.dataset.minimized==='true'){setMini(false);o.hidden=true;}};
 function choose(track,i){if(view!=='player'){lastBrowse=view;lastGenre=genre;}view='player';o.dataset.browse='player';o.querySelector('.etp-jukebox-card').dataset.browse='player';screen.hidden=true;back.hidden=false;window.ETPRepair?.stopMusic();document.getElementById('read-stop')?.click();active=track;index=i;player.hidden=false;frame.src='https://www.youtube.com/embed/'+track.id+'?autoplay=1&rel=0&enablejsapi=1'+(repeated?'&loop=1&playlist='+track.id:'');setPlaying(true);o.querySelector('.etp-jukebox-now strong').textContent=track.title;o.querySelector('.etp-jukebox-now span').textContent=track.note||'';o.querySelector('.etp-track-note').textContent=track.note||'';o.querySelector('.etp-watch-source').href='https://www.youtube.com/watch?v='+track.id;try{sessionStorage.setItem('etp-last-track',JSON.stringify(track))}catch{}renderRows();player.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'})}
 function renderRows(){const rows=screen.querySelector('.etp-juke-rows');if(!rows)return;rows.innerHTML=collection.map((t,i)=>`<div class="etp-juke-row ${active?.id===t.id?'active':''}"><button type="button" class="etp-juke-track" data-index="${i}"><strong>▶ ${esc(t.title)}</strong><span>${esc(t.note)}</span></button><button type="button" class="etp-playlist-add" data-save="${i}" aria-label="${playlist.some(p=>p.id===t.id)?'Remove from':'Add to'} My Playlist">${playlist.some(p=>p.id===t.id)?'✓ Saved · Remove':'+ My Playlist'}</button></div>`).join('');rows.querySelectorAll('[data-index]').forEach(b=>b.onclick=()=>choose(collection[Number(b.dataset.index)],Number(b.dataset.index)));rows.querySelectorAll('[data-save]').forEach(b=>b.onclick=()=>{const t=collection[Number(b.dataset.save)];if(playlist.some(p=>p.id===t.id))playlist=playlist.filter(p=>p.id!==t.id);else playlist.push({...t});save();if(view==='playlist'){collection=playlist.slice();index=collection.findIndex(t=>t.id===active?.id);render()}else renderRows()});}
 function render(){o.dataset.browse=view;o.querySelector('.etp-jukebox-card').dataset.browse=view;screen.hidden=view==='player';player.hidden=view!=='player';back.hidden=view==='root';if(view==='player')return;screen.replaceChildren();message.textContent='';
  if(view==='root'){screen.innerHTML='<div class="etp-juke-categories"><button type="button" class="etp-juke-category" data-view="music">Music</button><button type="button" class="etp-juke-category" data-view="documentaries">Documentaries</button><button type="button" class="etp-juke-category" data-view="speeches">Speeches</button></div><details class="x-playlists"><summary>My playlists</summary><button type="button" class="etp-playlist-open" data-view="playlist">Open My Playlist · '+playlist.length+'</button></details><a class="etp-history-link" href="'+root+'games/">History Unlocked</a>';screen.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;genre='';render();back.focus()});return;}
  if(view==='music'){
   screen.innerHTML='<h3 class="etp-juke-heading">Music</h3><button type="button" class="etp-genre-open" aria-expanded="false" aria-controls="etp-juke-genres">'+esc(genre||'Choose a genre')+' ▾</button><div class="etp-genre-grid" id="etp-juke-genres" hidden></div>';
   const menu=screen.querySelector('.etp-genre-grid'),trigger=screen.querySelector('.etp-genre-open');Object.keys(library).forEach(name=>{const b=document.createElement('button');b.type='button';b.className='etp-genre-btn';b.textContent=name;b.onclick=()=>{genre=name;collection=library[name];index=collection.findIndex(t=>t.id===active?.id);render();screen.querySelector('.etp-genre-open').focus()};menu.append(b)});trigger.onclick=()=>{menu.hidden=!menu.hidden;trigger.setAttribute('aria-expanded',String(!menu.hidden))};if(!genre){collection=[];return;}
  }else{collection=view==='documentaries'?documentaries:view==='speeches'?speeches:playlist.slice();screen.innerHTML='<h3 class="etp-juke-heading">'+({documentaries:'Documentaries',speeches:'Speeches',playlist:'My Playlist'})[view]+'</h3>';}
  if(!collection.length){screen.insertAdjacentHTML('beforeend','<p>Your playlist is empty. Open a category and use “+ My Playlist” beside a selection.</p>');return;}
  const rows=document.createElement('div');rows.className='etp-juke-rows';screen.append(rows);renderRows();
  if(view==='documentaries'||view==='speeches')screen.insertAdjacentHTML('beforeend','<p>Recordings are presented as historical sources. Examine their context, perspective, and evidence.</p>');
 }
 back.onclick=()=>{if(view==='player'){stopPlayer();view=lastBrowse;genre=lastGenre;}else{view='root';genre='';}player.hidden=true;render();screen.querySelector('button')?.focus()};
 o.querySelector('[data-player="prev"]').onclick=()=>{if(collection.length){index=(index-1+collection.length)%collection.length;choose(collection[index],index)}};
 o.querySelector('[data-player="next"]').onclick=()=>{if(collection.length){index=shuffled&&collection.length>1?(index+1+Math.floor(Math.random()*(collection.length-1)))%collection.length:(index+1)%collection.length;choose(collection[index],index)}};
 toggle.onclick=()=>{if(!active)return;if(!frame.getAttribute('src')){choose(active,index);return}communicate(playing?'pauseVideo':'playVideo');setPlaying(!playing)};
 o.querySelector('[data-player="stop"]').onclick=()=>stopPlayer();
 const controls=o.querySelector('.etp-player-controls');
 for(const name of ['Shuffle','Repeat']){const b=document.createElement('button');b.type='button';b.textContent=name;b.setAttribute('aria-pressed','false');b.onclick=()=>{if(name==='Shuffle')shuffled=!shuffled;else{repeated=!repeated;if(active&&frame.getAttribute('src')){const u=new URL(frame.src);if(repeated){u.searchParams.set('loop','1');u.searchParams.set('playlist',active.id);}else{u.searchParams.delete('loop');u.searchParams.delete('playlist');}frame.src=u.href;}}b.setAttribute('aria-pressed',String(name==='Shuffle'?shuffled:repeated));};controls.append(b);}

 function setMini(value){
 o.dataset.minimized=String(value);o.querySelector('.etp-jukebox-card').setAttribute('aria-modal',String(!value));
 const button=o.querySelector('.etp-jukebox-min');button.textContent=value?'↗':'—';button.setAttribute('aria-label',value?'Expand jukebox':'Minimize jukebox');button.title=value?'Expand jukebox':'Minimize jukebox';
 o.querySelector('.etp-mini-title').textContent=active?.title||'Examine the Past';
}
 function minimize(){
 // Every catalog entry is a YouTube video, including Music. Keep its player visible.
 // With no loaded video, dismiss the panel without creating an empty mini player.
 if(o.dataset.minimized==='true'){restore();return;}
 if(frame.getAttribute('src')){setMini(true);o.querySelector('.etp-jukebox-min').focus();return;}
 o.hidden=true;returnFocus?.focus({preventScroll:true});
 }
 function restore(){setMini(false);o.hidden=false;o.querySelector('.etp-jukebox-min').focus();}
 function close(){stopPlayer();setMini(false);o.hidden=true;returnFocus?.focus({preventScroll:true})}
 o.querySelector('.etp-jukebox-min').onclick=minimize;o.querySelector('.etp-jukebox-close').onclick=close;o.addEventListener('click',e=>{if(e.target===o)close()});

 o.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close()}if(e.key==='Tab'&&o.dataset.minimized!=='true'){const items=[...o.querySelectorAll('button,a[href],iframe')].filter(n=>!n.closest('[hidden]'));const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 o.open=()=>{returnFocus=document.activeElement;setMini(false);o.hidden=false;render();o.querySelector('.etp-jukebox-close').focus();setSfx(sfx)};document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){communicate('pauseVideo');setPlaying(false);}});render();setSfx(sfx);return o;
}
function openJukebox(){ensureJukebox().open()}

function syncLightLabels(){const on=document.body.classList.contains("etp-lights-on");document.querySelectorAll("[data-etp-lights-label]").forEach(n=>n.textContent=on?"Lights On":"Lights Off");document.querySelectorAll('[data-etp-action="lights"]').forEach(n=>n.setAttribute("aria-label",on?"Lights On":"Lights Off"))}
function toggleLights(){window.ETPTheme?.toggle();syncLightLabels()}
function extractReaderText(){const main=document.querySelector("main")||document.querySelector("article")||document.body,clone=main.cloneNode(true);clone.querySelectorAll("nav,button,script,style,textarea,input,select,.toc,.progress,.etp-reader").forEach(n=>n.remove());return clone.innerText.replace(/\s+/g," ").trim()}
function enableReader(){window.ETPRepair?.enableReader()}

document.addEventListener("click",e=>{const a=e.target.closest("[data-etp-action]");if(a){const k=a.dataset.etpAction;if(k==="jukebox"){e.preventDefault();openJukebox()}if(k==="lights"){e.preventDefault();toggleLights()}if(window.ETPTransitions?.clickSound)window.ETPTransitions.clickSound("tap");return}const b=e.target.closest("button");if(b&&!b.closest(".etp-jukebox-overlay")&&!b.closest(".etp-reader")&&window.ETPTransitions?.clickSound)window.ETPTransitions.clickSound("tap")});syncLightLabels();window.ETPExperience={openJukebox,toggleLights,setSfx,enableReader,stopPlayer:()=>stopPlayer()};setSfx(sfx);function auto(){if(document.querySelector(".lesson-grid,[data-lesson-id],article[data-article],.article-body,main[data-etp-reading]"))enableReader()}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",auto);else auto()})();
