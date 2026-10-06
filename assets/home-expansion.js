(()=>{document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const id=a.getAttribute('href');if(!id||id==='#')return;const el=document.querySelector(id);if(!el)return;e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',id);});});})();
(()=>{if(document.querySelector('.etp-home-mobile-shell'))return;
const shell=document.createElement('div');shell.className='etp-home-mobile-shell';
shell.innerHTML=`<button class="etp-home-menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
<div class="etp-home-mobile-menu" hidden>
<div class="etp-home-mobile-row"><a href="#top">🏠 <b>Home</b></a><a href="#about-us">ℹ️ <b>About</b></a></div>
<div class="etp-home-mobile-heading">HISTORY HUB</div>
<div class="etp-home-mobile-grid">
<a href="#us-history">🇺🇸 <b>U.S. History</b></a><a href="#world-history">🌍 <b>World History</b></a>
<a href="#civics-government">🏛️ <b>Civics & Government</b></a><a href="#geography">🗺️ <b>Geography</b></a>
<a href="#black-history">✊🏾 <b>Black History</b></a><a href="#world-religions">🕊️ <b>World Religions</b></a>
</div>
<div class="etp-home-mobile-heading">EXPLORE</div>
<div class="etp-home-mobile-grid"><a href="#timeline">⏳ <b>Timeline</b></a><a href="#history-maps">🗺️ <b>History Maps</b></a><a href="#today-history">📅 <b>Today in History</b></a><a href="#history-unlocked">🎮 <b>History Unlocked</b></a></div>
<div class="etp-home-mobile-heading">TEACHER TOOLS</div>
<div class="etp-home-mobile-grid"><a href="#blooms-taxonomy">🧠 <b>Bloom's Taxonomy</b></a><a href="#movies-classroom">🎬 <b>Movies</b></a><a href="#classroom-management">🏫 <b>Classroom Management</b></a><a href="#learner-supports">👥 <b>Learner Supports</b></a></div>
<div class="etp-home-mobile-row etp-home-mobile-last"><a href="#hidden-treasures">🛍️ <b>Shop History</b></a><a href="#community">👥 <b>Community</b></a><a href="#contact-section">📧 <b>Contact Us</b></a></div>
</div>`;
document.body.prepend(shell);
const t=shell.querySelector('.etp-home-menu-toggle'),m=shell.querySelector('.etp-home-mobile-menu');
const close=()=>{m.hidden=true;t.classList.remove('open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open navigation')};
t.addEventListener('click',()=>{const open=m.hidden;m.hidden=!open;t.classList.toggle('open',open);t.setAttribute('aria-expanded',String(open));t.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
m.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();