(()=>{if(window.__ETP_EXPERIENCE_V52)return;window.__ETP_EXPERIENCE_V52=true;
let sfx=true,utterance=null,readerSpeed=1;const LIGHT_KEY="etp-lights-mode";
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
function setSfx(v){sfx=!!v;if(window.ETPTransitions)window.ETPTransitions.setSound(sfx);document.querySelectorAll("[data-etp-sfx-state]").forEach(n=>n.textContent=sfx?"On":"Off")}
function ensureJukebox(){let o=document.querySelector(".etp-jukebox-overlay");if(o)return o;
o=document.createElement("div");o.className="etp-jukebox-overlay";o.hidden=true;
o.innerHTML='<section class="etp-jukebox-card" role="dialog" aria-modal="true" aria-label="History Jukebox"><button class="etp-jukebox-min" aria-label="Minimize jukebox">—</button><button class="etp-jukebox-close" aria-label="Close jukebox and stop media">×</button><div class="etp-jukebox-kicker">Music • Memory • Historical Context</div><h2>History Jukebox</h2><p>Choose a category, browse the collection, then choose what you want to hear or watch. Selections are curated for historical connections and classroom-friendly exploration.</p><div class="etp-jukebox-player-shell"><div class="etp-jukebox-now"><div><strong>Choose a track</strong><span>The selected video will play here.</span></div></div><div class="etp-video-wrap"><iframe title="History Jukebox video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div><div class="etp-track-note">Choose a category below to open its track list.</div></div><div class="etp-genre-grid"></div><div class="etp-track-library"><div class="etp-track-heading"><strong>Collection</strong><span>Choose a category above.</span></div><div class="etp-track-list"></div></div><div class="etp-jukebox-bottom"><button class="etp-sfx-toggle" type="button">Sound Effects: <span data-etp-sfx-state>On</span></button><div class="etp-jukebox-source">Embedded videos are streamed from YouTube and remain the property of their respective rights holders. Preview selections before assigning them to younger learners.</div></div></section>';
document.body.appendChild(o);
const grid=o.querySelector(".etp-genre-grid"),frame=o.querySelector("iframe"),note=o.querySelector(".etp-track-note"),list=o.querySelector(".etp-track-list"),heading=o.querySelector(".etp-track-heading strong"),sub=o.querySelector(".etp-track-heading span"),nowStrong=o.querySelector(".etp-jukebox-now strong"),nowSpan=o.querySelector(".etp-jukebox-now span");
function play(track,btn){list.querySelectorAll(".etp-track-choice").forEach(x=>x.classList.remove("active"));if(btn)btn.classList.add("active");const id=track.id||track.fallback;frame.src="https://www.youtube.com/embed/"+id+"?autoplay=1&rel=0";nowStrong.textContent=track.title;nowSpan.textContent=track.note;note.innerHTML="<strong>"+track.title+"</strong><br>"+track.note}
function renderGenre(genre,button){grid.querySelectorAll("button").forEach(x=>x.classList.remove("active"));if(button)button.classList.add("active");heading.textContent=genre;const tracks=library[genre]||[];sub.textContent=tracks.length+" selection"+(tracks.length===1?"":"s");list.innerHTML="";tracks.forEach(track=>{const b=document.createElement("button");b.type="button";b.className="etp-track-choice";b.innerHTML='<span class="etp-track-play">▶</span><span class="etp-track-meta"><strong></strong><span></span></span>';b.querySelector("strong").textContent=track.title;b.querySelector(".etp-track-meta span").textContent=track.note;b.addEventListener("click",()=>play(track,b));list.appendChild(b)})}
Object.keys(library).forEach((genre,i)=>{const b=document.createElement("button");b.className="etp-genre-btn";b.type="button";b.textContent=genre;b.addEventListener("click",()=>renderGenre(genre,b));grid.appendChild(b);if(i===0)setTimeout(()=>renderGenre(genre,b),0)});
function close(){o.hidden=true;frame.src="";nowStrong.textContent="Choose a track";nowSpan.textContent="The selected video will play here."}
function minimize(){o.hidden=true}
o.querySelector(".etp-jukebox-min").addEventListener("click",minimize);o.querySelector(".etp-jukebox-close").addEventListener("click",close);o.addEventListener("click",e=>{if(e.target===o)close()});o.querySelector(".etp-sfx-toggle").addEventListener("click",()=>setSfx(!sfx));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!o.hidden)minimize()});return o}
function openJukebox(){ensureJukebox().hidden=false}
function syncLightLabels(){const on=document.body.classList.contains("etp-lights-on");document.querySelectorAll("[data-etp-lights-label]").forEach(n=>n.textContent=on?"Lights Off":"Lights On");document.querySelectorAll('[data-etp-action="lights"]').forEach(n=>n.setAttribute("aria-label",on?"Turn lights off":"Turn lights on"))}
function toggleLights(){document.body.classList.toggle("etp-lights-on");try{localStorage.setItem(LIGHT_KEY,document.body.classList.contains("etp-lights-on")?"on":"off")}catch(e){}syncLightLabels()}
function extractReaderText(){const main=document.querySelector("main")||document.querySelector("article")||document.body,clone=main.cloneNode(true);clone.querySelectorAll("nav,button,script,style,textarea,input,select,.toc,.progress,.etp-reader").forEach(n=>n.remove());return clone.innerText.replace(/\s+/g," ").trim()}
function enableReader(){if(document.querySelector(".etp-reader")||!("speechSynthesis" in window))return;const w=document.createElement("div");w.className="etp-reader";w.innerHTML='<button class="etp-reader-toggle" type="button" aria-label="Read this page aloud">🔊</button><div class="etp-reader-panel" hidden><div class="etp-reader-title">Read This Page</div><div class="etp-reader-actions"><button type="button" data-read="play">▶ Read</button><button type="button" data-read="pause">⏸ Pause</button><button type="button" data-read="stop">■ Stop</button><button type="button" data-read="restart">↻ Restart</button></div><select class="etp-reader-speed" aria-label="Reading speed"><option value=".85">Slower</option><option value="1" selected>Normal</option><option value="1.15">Faster</option><option value="1.3">Fast</option></select></div>';document.body.appendChild(w);const panel=w.querySelector(".etp-reader-panel");function stop(){speechSynthesis.cancel();utterance=null}function speak(restart){if(restart)stop();if(speechSynthesis.paused){speechSynthesis.resume();return}if(speechSynthesis.speaking)return;utterance=new SpeechSynthesisUtterance(extractReaderText());utterance.rate=readerSpeed;speechSynthesis.speak(utterance)}w.querySelector(".etp-reader-toggle").addEventListener("click",()=>panel.hidden=!panel.hidden);w.querySelector('[data-read="play"]').addEventListener("click",()=>speak(false));w.querySelector('[data-read="pause"]').addEventListener("click",()=>{if(speechSynthesis.speaking)speechSynthesis.pause()});w.querySelector('[data-read="stop"]').addEventListener("click",stop);w.querySelector('[data-read="restart"]').addEventListener("click",()=>speak(true));w.querySelector(".etp-reader-speed").addEventListener("change",e=>{readerSpeed=parseFloat(e.target.value)||1;if(speechSynthesis.speaking)speak(true)})}
document.addEventListener("click",e=>{const a=e.target.closest("[data-etp-action]");if(!a)return;const k=a.dataset.etpAction;if(k==="jukebox"){e.preventDefault();openJukebox()}if(k==="lights"){e.preventDefault();toggleLights()}});try{if(localStorage.getItem(LIGHT_KEY)==="on")document.body.classList.add("etp-lights-on")}catch(e){}syncLightLabels();window.ETPExperience={openJukebox,toggleLights,setSfx,enableReader};function auto(){if(document.querySelector(".lesson-grid,[data-lesson-id],article[data-article],.article-body"))enableReader()}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",auto);else auto()})();