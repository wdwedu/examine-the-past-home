(()=>{if(document.getElementById('etpSiteHeader'))return;const s=document.currentScript;const root=s?.dataset?.etpRoot||'./';const href=p=>root+p;
const header=document.createElement('header');header.id='etpSiteHeader';header.innerHTML=`
<div class="etp-header-inner"><nav class="etp-icon-nav" aria-label="Site navigation">
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#home">🏠</a><span class="etp-tip">Home</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#about">ℹ️</a><span class="etp-tip">About</span></div>
<div class="etp-nav-item"><button class="etp-icon-btn" aria-label="History Hub">🎓</button><span class="etp-tip">History Hub</span><div class="etp-drop">
<a href="${href('')}#us-history">🇺🇸 U.S. History</a><a href="${href('')}#world-history">🌍 World History</a><a href="${href('')}#civics-government">🏛️ Civics & Government</a><a href="${href('')}#geography">🗺️ Geography</a><a href="${href('')}#black-history">✊🏾 Black History</a><a href="${href('')}#world-religions">🕊️ World Religions</a></div></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#resource-vault">📖</a><span class="etp-tip">Resources</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#today-history">📅</a><span class="etp-tip">Today in History</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#history-maps">🌍</a><span class="etp-tip">History Maps</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#timeline">•••</a><span class="etp-tip">Interactive Timeline</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#blooms-taxonomy">▲</a><span class="etp-tip">Bloom's Generator</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#history-unlocked">🎮</a><span class="etp-tip">History Unlocked</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#community">👥</a><span class="etp-tip">Community</span></div>
<div class="etp-nav-item"><a class="etp-icon-btn" href="${href('')}#contact">📧</a><span class="etp-tip">Contact Us</span></div>
<button class="etp-sound-btn" aria-label="Toggle sound" title="Sound">🔊</button>
</nav></div>`;
document.body.prepend(header);

const footer=document.createElement('footer');footer.id='etpSiteFooter';footer.innerHTML=`
<div class="etp-footer-grid">
<div>
  <div class="etp-footer-title">LEARN</div>
  <div class="etp-footer-subtitle">SOCIAL STUDIES</div>
  <a href="${href('lessons/')}">V0: Start Here</a>
  <a href="${href('lessons/')}">V1: Foundations</a>
  <a href="${href('lessons/geography/')}">V2: Geography</a>
  <a href="${href('lessons/world-history/')}">V3: Civilizations</a>
  <a href="${href('lessons/civics-government/')}">V4: Government & Power</a>
  <a href="${href('lessons/world-history/')}">V5: Revolutions</a>
  <a href="${href('lessons/world-history/')}">V6: Modern World</a>
  <a href="${href('lessons/')}">V7: Economics</a>
  <a href="${href('lessons/us-history/')}">V8: America & Civic Life</a>
</div>
<div>
  <div class="etp-footer-title">EXPLORE</div>
  <div class="etp-footer-subtitle">WORLD RELIGIONS</div>
  <a href="${href('lessons/world-religions/')}">V0: Start Here (World Religion)</a>
  <a href="${href('lessons/world-religions/')}">V1: Introduction to Religion</a>
  <a href="${href('lessons/world-religions/')}">V2: African Origins of Spirituality</a>
  <a href="${href('lessons/world-religions/')}">V3: The Rise of Polytheism</a>
  <a href="${href('lessons/world-religions/')}">V4: Judaism and Monotheism</a>
  <a href="${href('lessons/world-religions/')}">V5: Christianity’s Emergence</a>
  <a href="${href('lessons/world-religions/')}">V6: The Rise of Islam</a>
  <a href="${href('lessons/world-religions/')}">V7: Power, Politics, and Religion</a>
  <a href="${href('lessons/world-religions/')}">V8: Religion Today in America</a>
</div>
<div>
  <div class="etp-footer-title">RESOURCES</div>
  <a href="${href('today/')}">On This Day in History</a>
  <a href="${href('timeline/')}">Interactive Timeline</a>
  <a href="${href('maps/')}">Historical Maps</a>
  <a href="${href('teacher-tools/blooms-taxonomy/')}">Blooms Generator</a>
  <a href="${href('')}#current-events">Current Events</a>
  <a href="${href('teacher-tools/movies-in-the-classroom/')}">Historical Movies</a>
  <a href="${href('games/')}">Games (History Unlocked)</a>
  <a href="${href('teacher-tools/')}">Curriculum Design</a>
  <a href="${href('teacher-tools/')}">AI in Education</a>
  <a href="${href('')}#faq">FAQ</a>
</div>
<div>
  <div class="etp-footer-title">LEGAL</div>
  <a href="${href('')}#affiliate">Affiliate Disclosure</a>
  <a href="${href('')}#careers">Careers & Partnerships</a>
  <a href="${href('')}#licensing">Resource Licensing</a>
  <a href="${href('')}#copyright">Copyright Policy</a>
  <a href="${href('')}#dmca">DMCA Notice</a>
  <a href="${href('')}#privacy">Privacy Policy</a>
  <a href="${href('')}#terms">Terms of Service</a>
  <a href="${href('')}#refund">Refund / Digital</a>
  <a href="${href('')}#cookies">Cookie Policy</a>
  <a href="${href('')}#contact">Contact Us</a>
</div>
</div>
<div class="etp-community-wrap" id="community">
  <div class="etp-community-title">JOIN OUR COMMUNITY</div>
  <div class="etp-community">
    <a href="https://www.youtube.com/@ExamineThePast" target="_blank" rel="noopener" title="YouTube"><span class="brand-text" style="color:#fff;background:#ff1f1f;width:100%;height:100%;display:grid;place-items:center">▶</span></a>
    <a href="${href('')}#community" title="Facebook"><img src="${href('games/assets/share-facebook.webp')}" alt="Facebook"></a>
    <a href="${href('')}#community" title="Instagram"><img src="${href('games/assets/share-instagram.webp')}" alt="Instagram"></a>
    <a href="${href('')}#community" title="X"><span class="brand-text" style="color:#fff">𝕏</span></a>
    <a href="${href('')}#community" title="Blogger"><span class="brand-text" style="color:#fff;background:#ff7a18;width:100%;height:100%;display:grid;place-items:center">B</span></a>
    <a href="${href('')}#community" title="Teachers Pay Teachers"><span class="brand-text" style="color:#fff;background:#20a77b;width:100%;height:100%;display:grid;place-items:center">T</span></a>
    <a href="${href('')}#community" title="Redbubble"><span class="brand-text" style="color:#fff;background:#ef3340;width:100%;height:100%;display:grid;place-items:center">RB</span></a>
    <a href="${href('')}#community" title="Zazzle"><span class="brand-text" style="color:#fff;background:#111;width:100%;height:100%;display:grid;place-items:center">Z</span></a>
    <a href="${href('')}#community" title="Pinterest"><img src="${href('games/assets/share-pinterest.webp')}" alt="Pinterest"></a>
    <a href="${href('')}#community" title="Etsy"><span class="brand-text" style="color:#fff;background:#f1641e;width:100%;height:100%;display:grid;place-items:center">E</span></a>
  </div>
</div>
<div class="etp-footer-bottom">© 2026 Examine the Past. All Rights Reserved.</div>`;
document.body.append(footer);

header.querySelectorAll('.etp-nav-item>button').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();b.parentElement.classList.toggle('open')}));
const snd=header.querySelector('.etp-sound-btn');let sound=true;snd.addEventListener('click',()=>{sound=!sound;snd.textContent=sound?'🔊':'🔇';window.ETPTransitions?.setSound(sound)});
})();