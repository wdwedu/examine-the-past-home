(()=>{if(document.getElementById('etpSiteHeader'))return;const s=document.currentScript;const root=s?.dataset?.etpRoot||'./';const href=p=>root+p;const noFooter=s?.dataset?.noFooter==='true';
const header=document.createElement('header');header.id='etpSiteHeader';header.innerHTML=`
<div class="etp-header-inner"><nav class="etp-icon-nav" aria-label="Site navigation">
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#top">🏠</a><span class="etp-tip">Home</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#about-us">ℹ️</a><span class="etp-tip">About</span></div>

<div class="etp-nav-item"><button class="etp-icon-btn" aria-label="History Hub">🎓</button><span class="etp-tip">History Hub</span><div class="etp-drop">
<a href="${href('')}#us-history">🇺🇸 U.S. History</a><a href="${href('')}#world-history">🌍 World History</a><a href="${href('')}#civics-government">🏛️ Civics & Government</a><a href="${href('')}#geography">🗺️ Geography</a><a href="${href('')}#black-history">✊🏾 Black History</a><a href="${href('')}#world-religions">🕊️ World Religions</a>
</div></div>

<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#timeline">⏳</a><span class="etp-tip">Timeline</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#history-maps">🗺️</a><span class="etp-tip">History Maps</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#today-history">📅</a><span class="etp-tip">Today in History</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#history-unlocked">🎮</a><span class="etp-tip">History Unlocked</span></div>

<div class="etp-nav-item"><button class="etp-icon-btn" aria-label="Teacher Tools">🧰</button><span class="etp-tip">Teacher Tools</span><div class="etp-drop">
<a href="${href('')}#blooms-taxonomy">🧠 Bloom's Taxonomy</a><a href="${href('')}#movies-classroom">🎬 Movies in the Classroom</a><a href="${href('')}#classroom-management">🏫 Classroom Management</a><a href="${href('')}#learner-supports">👥 Learner Supports</a>
</div></div>

<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#hidden-treasures">🛍️</a><span class="etp-tip">Shop History</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#community">👥</a><span class="etp-tip">Community</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#contact-section">📧</a><span class="etp-tip">Contact Us</span></div>
<button class="etp-sound-btn" aria-label="Toggle sound" title="Sound">🔊</button>
</nav></div>`;
document.body.prepend(header);
const mobileToggle=document.createElement('button');
mobileToggle.className='etp-mobile-toggle';
mobileToggle.type='button';
mobileToggle.setAttribute('aria-label','Open navigation');
mobileToggle.setAttribute('aria-expanded','false');
mobileToggle.innerHTML='<span></span><span></span><span></span>';
const mobilePanel=document.createElement('div');
mobilePanel.className='etp-mobile-panel';
mobilePanel.hidden=true;
mobilePanel.innerHTML=`
<div class="etp-mobile-group">
  <a href="${href('')}#top"><span>🏠</span><b>Home</b></a>
  <a href="${href('')}#about-us"><span>ℹ️</span><b>About</b></a>
</div>
<div class="etp-mobile-heading">HISTORY HUB</div>
<div class="etp-mobile-grid">
  <a href="${href('')}#us-history"><span>🇺🇸</span><b>U.S. History</b></a>
  <a href="${href('')}#world-history"><span>🌍</span><b>World History</b></a>
  <a href="${href('')}#civics-government"><span>🏛️</span><b>Civics & Government</b></a>
  <a href="${href('')}#geography"><span>🗺️</span><b>Geography</b></a>
  <a href="${href('')}#black-history"><span>✊🏾</span><b>Black History</b></a>
  <a href="${href('')}#world-religions"><span>🕊️</span><b>World Religions</b></a>
</div>
<div class="etp-mobile-heading">EXPLORE</div>
<div class="etp-mobile-grid">
  <a href="${href('')}#timeline"><span>⏳</span><b>Timeline</b></a>
  <a href="${href('')}#history-maps"><span>🗺️</span><b>History Maps</b></a>
  <a href="${href('')}#today-history"><span>📅</span><b>Today in History</b></a>
  <a href="${href('')}#history-unlocked"><span>🎮</span><b>History Unlocked</b></a>
</div>
<div class="etp-mobile-heading">TEACHER TOOLS</div>
<div class="etp-mobile-grid">
  <a href="${href('')}#blooms-taxonomy"><span>🧠</span><b>Bloom's Taxonomy</b></a>
  <a href="${href('')}#movies-classroom"><span>🎬</span><b>Movies in the Classroom</b></a>
  <a href="${href('')}#classroom-management"><span>🏫</span><b>Classroom Management</b></a>
  <a href="${href('')}#learner-supports"><span>👥</span><b>Learner Supports</b></a>
</div>
<div class="etp-mobile-group etp-mobile-last">
  <a href="${href('')}#hidden-treasures"><span>🛍️</span><b>Shop History</b></a>
  <a href="${href('')}#community"><span>👥</span><b>Community</b></a>
  <a href="${href('')}#contact-section"><span>📧</span><b>Contact Us</b></a>
  <button class="etp-mobile-sound" type="button"><span>🔊</span><b>Sound</b></button>
</div>`;
header.querySelector('.etp-header-inner').prepend(mobileToggle);
header.querySelector('.etp-header-inner').append(mobilePanel);
function closeMobile(){
  mobilePanel.hidden=true;
  mobileToggle.classList.remove('open');
  mobileToggle.setAttribute('aria-expanded','false');
  mobileToggle.setAttribute('aria-label','Open navigation');
}
mobileToggle.addEventListener('click',()=>{
  const willOpen=mobilePanel.hidden;
  mobilePanel.hidden=!willOpen;
  mobileToggle.classList.toggle('open',willOpen);
  mobileToggle.setAttribute('aria-expanded',String(willOpen));
  mobileToggle.setAttribute('aria-label',willOpen?'Close navigation':'Open navigation');
});
mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMobile));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobile()});


if(!noFooter){
const footer=document.createElement('footer');footer.id='etpSiteFooter';footer.innerHTML=`
<div class="etp-footer-grid">
<div>
  <div class="etp-footer-title">LEARN</div>
  <a href="${href('lessons/us-history/')}">U.S. History</a>
  <a href="${href('lessons/world-history/')}">World History</a>
  <a href="${href('lessons/civics-government/')}">Civics & Government</a>
  <a href="${href('lessons/geography/')}">Geography</a>
  <a href="${href('lessons/black-history/')}">Black History</a>
  <a href="${href('lessons/world-religions/')}">World Religions</a>
  <a href="${href('lessons/')}">All Lessons</a>
</div>
<div>
  <div class="etp-footer-title">EXPLORE</div>
  <a href="${href('timeline/')}">Interactive Timeline</a>
  <a href="${href('maps/')}">History Maps</a>
  <a href="${href('today/')}">Today in History</a>
  <a href="${href('games/')}">History Unlocked</a>
  <a href="${href('current-events/')}">Current Events</a>
  <a href="${href('teacher-tools/movies-in-the-classroom/')}">Historical Movies</a>
  <a href="${href('shop/')}">Explore Hidden Treasures</a>
</div>
<div>
  <div class="etp-footer-title">TEACHER TOOLS</div>
  <a href="${href('teacher-tools/blooms-taxonomy/')}">Bloom's Taxonomy</a>
  <a href="${href('teacher-tools/classroom-management/')}">Classroom Management</a>
  <a href="${href('teacher-tools/movies-in-the-classroom/')}">Movies in the Classroom</a>
  <a href="${href('teacher-tools/learning-styles/')}">Learner Supports</a>
  <a href="${href('teacher-tools/')}">Curriculum Design</a>
  <a href="${href('teacher-tools/')}">AI in Education</a>
  <a href="${href('faq/')}">FAQ</a>
</div>
<div>
  <div class="etp-footer-title">LEGAL & SITE</div>
  <button class="etp-legal-link" data-legal="affiliate">Affiliate Disclosure</button>
  <a href="${href('careers/')}">Careers & Partnerships</a>
  <a href="${href('licensing/')}">Resource Licensing</a>
  <button class="etp-legal-link" data-legal="copyright">Copyright Policy</button>
  <button class="etp-legal-link" data-legal="dmca">DMCA Notice</button>
  <button class="etp-legal-link" data-legal="privacy">Privacy Policy</button>
  <button class="etp-legal-link" data-legal="terms">Terms of Service</button>
  <button class="etp-legal-link" data-legal="refund">Refund / Digital</button>
  <button class="etp-legal-link" data-legal="cookies">Cookie Policy</button>
  <a href="${href('')}#contact-section">Contact Us</a>
</div>
</div>
<div class="etp-community-wrap" id="community">
  <div class="etp-community-title">JOIN OUR COMMUNITY</div>
  <div class="etp-community">
    <a href="https://www.youtube.com/@ExamineThePast" target="_blank" rel="noopener" title="YouTube"><span class="brand-text etp-brand-youtube">▶</span></a>
    <a href="${href('')}#community" title="Facebook"><img src="${href('games/assets/share-facebook.webp')}" alt="Facebook"></a>
    <a href="${href('')}#community" title="Instagram"><img src="${href('games/assets/share-instagram.webp')}" alt="Instagram"></a>
    <a href="${href('')}#community" title="X"><span class="brand-text etp-brand-x">𝕏</span></a>
    <a href="${href('')}#community" title="Blogger"><span class="brand-text etp-brand-blogger">B</span></a>
    <a href="${href('')}#community" title="Teachers Pay Teachers"><span class="brand-text etp-brand-tpt">T</span></a>
    <a href="${href('')}#community" title="Redbubble"><span class="brand-text etp-brand-rb">RB</span></a>
    <a href="${href('')}#community" title="Zazzle"><span class="brand-text etp-brand-z">Z</span></a>
    <a href="${href('')}#community" title="Pinterest"><img src="${href('games/assets/share-pinterest.webp')}" alt="Pinterest"></a>
    <a href="${href('')}#community" title="Etsy"><span class="brand-text etp-brand-etsy">E</span></a>
  </div>
</div>
<div class="etp-footer-bottom">© 2026 Examine the Past. All Rights Reserved.</div>
<div class="etp-legal-overlay" hidden aria-hidden="true">
  <button class="etp-legal-backdrop" aria-label="Close legal notice"></button>
  <article class="etp-legal-card" role="dialog" aria-modal="true">
    <button class="etp-legal-close" aria-label="Close">×</button>
    <div class="etp-legal-kicker">EXAMINE THE PAST</div>
    <h2 class="etp-legal-title"></h2>
    <div class="etp-legal-copy"></div>
  </article>
</div>`;
document.body.append(footer);

header.querySelectorAll('.etp-nav-item>button').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();b.parentElement.classList.toggle('open')}));
const snd=header.querySelector('.etp-sound-btn'),mobileSnd=header.querySelector('.etp-mobile-sound');let sound=true;
function toggleSound(){sound=!sound;if(snd)snd.textContent=sound?'🔊':'🔇';if(mobileSnd)mobileSnd.querySelector('span').textContent=sound?'🔊':'🔇';window.ETPTransitions?.setSound(sound)}
snd?.addEventListener('click',toggleSound);mobileSnd?.addEventListener('click',toggleSound);
const legalContent={
privacy:["Privacy Policy","Examine the Past respects your privacy. We may receive information you voluntarily provide through forms, accounts, purchases, or newsletter signups, along with limited technical information used to operate, secure, and improve the site. Third-party services may have their own privacy practices."],
terms:["Terms of Service","By using Examine the Past, you agree to use the site and its educational resources lawfully. Original materials may not be copied, resold, republished, or redistributed except where a specific license permits it. Third-party materials remain the property of their respective owners."],
affiliate:["Affiliate Disclosure","Examine the Past may participate in affiliate programs and may earn a commission from qualifying purchases made through selected links. Compensation does not determine our historical conclusions or instructional recommendations."],
copyright:["Copyright Policy","Examine the Past respects intellectual-property rights. Original text, graphics, games, downloads, and other materials are protected by applicable law. Third-party and public-domain materials are identified where appropriate."],
dmca:["DMCA Notice","Examine the Past responds to properly submitted copyright notices. A notice should identify the copyrighted work, the allegedly infringing material and its location, contact information, and the statements required by applicable law."],
refund:["Refund / Digital Products","Digital products and downloads are generally treated according to the terms stated at purchase. If a file is defective, inaccessible, duplicated, or otherwise requires review, contact Examine the Past with the order details so the issue can be evaluated."],
cookies:["Cookie Policy","Examine the Past and services used to operate the site may use cookies or similar technologies for essential functions, preferences, analytics, security, and embedded third-party services. Browser settings can be used to limit or remove cookies."]
};
const overlay=footer.querySelector('.etp-legal-overlay'),title=footer.querySelector('.etp-legal-title'),copy=footer.querySelector('.etp-legal-copy');
function closeLegal(){overlay.hidden=true;overlay.setAttribute('aria-hidden','true');document.body.classList.remove('etp-legal-open')}
footer.querySelectorAll('.etp-legal-link').forEach(b=>b.addEventListener('click',()=>{const d=legalContent[b.dataset.legal]||['Legal','Information will be added here.'];title.textContent=d[0];copy.textContent=d[1];overlay.hidden=false;overlay.setAttribute('aria-hidden','false');document.body.classList.add('etp-legal-open')}));
footer.querySelector('.etp-legal-close')?.addEventListener('click',closeLegal);footer.querySelector('.etp-legal-backdrop')?.addEventListener('click',closeLegal);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)closeLegal()});
}

})();