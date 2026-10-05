(()=>{if(document.getElementById('etpSiteHeader'))return;const s=document.currentScript;const root=s?.dataset?.etpRoot||'./';const href=p=>root+p;
const header=document.createElement('header');header.id='etpSiteHeader';header.innerHTML=`
<div class="etp-header-inner">
<a class="etp-home-mark" href="${href('')}"><span class="etp-mark">EP</span><span>Examine the Past</span></a>
<button class="etp-mobile-toggle" aria-label="Open navigation">☰</button>
<nav class="etp-icon-nav" aria-label="Site navigation">
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#home">🏠</a><span class="etp-tip">Home</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#about">ℹ️</a><span class="etp-tip">About</span></div>
<div class="etp-nav-item"><button class="etp-icon-btn" aria-label="History Hub">🎓</button><span class="etp-tip">History Hub</span><div class="etp-drop">
<a href="${href('')}#us-history">🇺🇸 U.S. History</a><a href="${href('')}#world-history">🌍 World History</a><a href="${href('')}#civics-government">🏛️ Civics & Government</a><a href="${href('')}#geography">🗺️ Geography</a><a href="${href('')}#black-history">✊🏾 Black History</a><a href="${href('')}#world-religions">🕊️ World Religions</a></div></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#timeline">⏳</a><span class="etp-tip">Timeline</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#history-maps">🗺️</a><span class="etp-tip">History Maps</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#today-history">📅</a><span class="etp-tip">Today in History</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#history-unlocked">🎮</a><span class="etp-tip">History Unlocked</span></div>
<div class="etp-nav-item"><button class="etp-icon-btn" aria-label="Teacher Tools">🧰</button><span class="etp-tip">Teacher Tools</span><div class="etp-drop">
<a href="${href('')}#blooms-taxonomy">🧠 Bloom's Taxonomy</a><a href="${href('')}#movies-classroom">🎬 Movies in the Classroom</a><a href="${href('')}#classroom-management">🏫 Classroom Management</a><a href="${href('')}#learner-supports">👥 Learner Supports</a></div></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#hidden-treasures">🛍️</a><span class="etp-tip">Shop History</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#contact">✉️</a><span class="etp-tip">Contact Us</span></div>
<button class="etp-sound-btn" aria-label="Toggle sound" title="Sound">🔊</button>
</nav></div>`;
document.body.prepend(header);
const footer=document.createElement('footer');footer.id='etpSiteFooter';footer.innerHTML=`
<div class="etp-footer-grid">
<div><div class="etp-footer-brand">EXAMINE THE PAST</div><div>Interactive history lessons, maps, timelines, games, and teacher resources.</div><div class="etp-community"><a href="${href('')}#contact" title="YouTube">▶</a><a href="${href('')}#contact" title="TikTok">♪</a><a href="${href('')}#contact" title="Instagram">◎</a><a href="${href('')}#contact" title="Facebook">f</a><a href="${href('')}#contact" title="Pinterest">p</a><a href="${href('')}#contact" title="X">𝕏</a></div></div>
<div><div class="etp-footer-title">History Hub</div><a href="${href('lessons/us-history/')}">U.S. History</a><a href="${href('lessons/world-history/')}">World History</a><a href="${href('lessons/civics-government/')}">Civics & Government</a><a href="${href('lessons/geography/')}">Geography</a><a href="${href('lessons/black-history/')}">Black History</a><a href="${href('lessons/world-religions/')}">World Religions</a></div>
<div><div class="etp-footer-title">Explore</div><a href="${href('timeline/')}">Interactive Timeline</a><a href="${href('maps/')}">History Maps</a><a href="${href('today/')}">Today in History</a><a href="${href('games/')}">History Unlocked</a></div>
<div><div class="etp-footer-title">Teacher Tools</div><a href="${href('teacher-tools/blooms-taxonomy/')}">Bloom's Taxonomy</a><a href="${href('teacher-tools/movies-in-the-classroom/')}">Movies in the Classroom</a><a href="${href('teacher-tools/classroom-management/')}">Classroom Management</a><a href="${href('teacher-tools/learning-styles/')}">Learner Supports</a></div>
<div><div class="etp-footer-title">Lessons</div><a href="${href('lessons/')}">All Lessons</a><a href="${href('lessons/master-template/')}">Lesson Experience</a><a href="${href('games/source-lab/')}">Source Lab</a><a href="${href('games/map-quest/')}">Map Quest</a></div>
<div><div class="etp-footer-title">Site</div><a href="${href('shop/')}">Explore Hidden Treasures</a><a href="${href('')}#about">About</a><a href="${href('')}#contact">Contact</a><a href="${href('')}#privacy">Privacy</a><a href="${href('')}#terms">Terms</a></div>
</div><div class="etp-footer-bottom">Examine the Past • An educational experience from InAct Entertainment LLC.</div>`;
document.body.append(footer);
const inner=header.querySelector('.etp-header-inner'), mobile=header.querySelector('.etp-mobile-toggle');mobile.addEventListener('click',()=>inner.classList.toggle('mobile-open'));
header.querySelectorAll('.etp-nav-item>button').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();b.parentElement.classList.toggle('open')}));
const snd=header.querySelector('.etp-sound-btn');let sound=true;snd.addEventListener('click',()=>{sound=!sound;snd.textContent=sound?'🔊':'🔇';window.ETPTransitions?.setSound(sound)});
})();