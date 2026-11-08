(()=>{if(document.getElementById("etpSiteHeader"))return;
const cur=document.currentScript,root=new URL("../",cur.src).pathname,noFooter=cur&&cur.dataset&&cur.dataset.noFooter==="true";
const u=p=>root+p;
document.body.dataset.etpShell="shared";
function loadCSS(href,key){if(document.querySelector('link[data-etp-load="'+key+'"]'))return;const l=document.createElement("link");l.rel="stylesheet";l.href=href;l.dataset.etpLoad=key;document.head.appendChild(l)}
function loadJS(src,key){if([...document.scripts].some(s=>s.src&&new URL(s.src).pathname===new URL(src,location.href).pathname))return;const x=document.createElement("script");x.src=src;x.async=false;x.dataset.etpLoad=key;document.head.appendChild(x)}
loadCSS(u("assets/site-shell.css?v=20261108-nav-timewarp-v11"),"shell-css");
loadCSS(u("assets/etp-transitions.css?v=20261104-cinematic-5-v1"),"transitions-css");loadJS(u("assets/etp-transitions.js?v=20261104-cinematic-5-v1"),"transitions-js");
loadCSS(u("assets/etp-experience-v50.css?v=20261015-etp-r2"),"experience-css");loadJS(u("assets/etp-experience-v50.js?v=20261102-history-jukebox"),"experience-js");
loadCSS(u("assets/repair-v63.css?v=20261107-reader-audit-v1"),"repair-css");loadJS(u("assets/repair-v63.js?v=20261107-reader-audit-v1"),"repair-js");
loadCSS(u("assets/nav-footer-parity.css?v=20261108-nav-timewarp-v11"),"nav-footer-parity");
if(/\/teacher-tools\/blooms-taxonomy\//.test(location.pathname))loadCSS(u("assets/blooms-dark-levels.css?v=20261107-v1"),"bloom-dark-levels");
if(![...document.scripts].some(x=>x.src&&x.src.includes("/app-assets/install.js")))loadJS(u("app-assets/install.js?v=20261104-unified-v1"),"install-js");
const header=document.createElement("header");header.id="etpSiteHeader";
header.innerHTML='<div class="etp-header-inner"><nav class="etp-icon-nav" aria-label="Site navigation">'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('')+'">🏠</a><span class="etp-tip">Home</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('')+'#about-us">ℹ️</a><span class="etp-tip">About</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('lessons/')+'" data-etp-transition="archive">🎓</a><span class="etp-tip">History Hub</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('timeline/')+'" data-etp-transition="timeline">⏳</a><span class="etp-tip">Timeline</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('maps/')+'" data-etp-transition="map">🗺️</a><span class="etp-tip">History Maps</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('today/')+'" data-etp-transition="stamp">📅</a><span class="etp-tip">Today in History</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('games/')+'" data-etp-transition="time">🎮</a><span class="etp-tip">Games</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('teacher-tools/')+'" data-etp-transition="page">🧰</a><span class="etp-tip">Teacher Tools</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('games/presidential-challenges/')+'" data-etp-transition="page" aria-label="Presidents"><img class="etp-nav-flag" src="'+u('assets/us-flag.svg')+'" alt=""></a><span class="etp-tip">Presidents</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('lessons/black-history/')+'" data-etp-transition="page" aria-label="Black History">✊🏾</a><span class="etp-tip">Black History</span></div>'+
'<div class="etp-nav-item"><button class="etp-icon-btn" type="button" data-etp-share aria-label="Share Examine the Past">↗</button><span class="etp-tip">Share</span></div>'+
'<div class="etp-nav-item"><a class="etp-icon-btn" href="'+u('')+'#contact-section">📧</a><span class="etp-tip">Contact Us</span></div>'+
'<div class="etp-nav-item"><button class="etp-icon-btn" type="button" data-etp-action="jukebox" aria-label="Open History Jukebox"><span class="etp-sound-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></button><span class="etp-tip">History Jukebox</span></div>'+
'</nav></div>';
header.innerHTML='<div class="etp-header-inner etp-header-minimal">'+
'<a class="etp-top-link etp-top-home" href="'+u('')+'" data-etp-transition="warp-tunnel" aria-label="Home"><img class="etp-top-logo" src="'+u('app-assets/icon-192.png')+'" alt=""><span class="etp-top-tip">Home</span></a>'+
'<div class="etp-middle-cluster"><nav class="etp-top-navigation" aria-label="Primary site navigation">'+
'<a class="etp-top-link" href="'+u('teacher-tools/')+'" data-etp-transition="warp-tunnel" aria-label="Tools"><span class="etp-top-emoji" aria-hidden="true">🛠️</span><span class="etp-top-tip">Tools</span></a>'+
'<a class="etp-top-link" href="'+u('games/')+'" data-etp-transition="warp-tunnel" aria-label="Games"><span class="etp-top-emoji" aria-hidden="true">🎮</span><span class="etp-top-tip">Games</span></a>'+
'<a class="etp-top-link" href="'+u('lessons/')+'" data-etp-transition="warp-tunnel" aria-label="Courses"><span class="etp-top-emoji" aria-hidden="true">📚</span><span class="etp-top-tip">Courses</span></a>'+
'</nav><nav class="etp-icon-nav" aria-label="Music"><div class="etp-nav-item"><button class="etp-icon-btn" type="button" data-etp-action="jukebox" aria-label="Open History Jukebox"><span class="etp-sound-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></button><span class="etp-tip">History Jukebox</span></div></nav></div></div>';
document.body.prepend(header);
// Handle homepage anchors even when the History Hub is inserted after initial document parsing.
if(["#teacher-tools","#history-unlocked","#history-hub-v50"].includes(location.hash)){
 const id=location.hash.slice(1);
 const jump=()=>{const target=document.getElementById(id);if(!target)return false;target.scrollIntoView({block:"start",behavior:"instant"});return true};
 const ready=()=>{if(jump())return;const observer=new MutationObserver(()=>{if(jump())observer.disconnect()});observer.observe(document.body,{childList:true,subtree:true});window.addEventListener("load",()=>{if(jump())observer.disconnect()},{once:true})};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready,{once:true});else ready();
}


const shareBox=document.createElement("div");shareBox.className="etp-share-overlay";shareBox.hidden=true;
shareBox.innerHTML='<div class="etp-share-shade" data-etp-share-close></div><section class="etp-share-dialog" role="dialog" aria-modal="true" aria-label="Share Examine the Past"><button type="button" class="etp-share-close" data-etp-share-close aria-label="Close sharing">×</button><div class="etp-share-kicker">EXAMINE THE PAST</div><h2>Share Historical Discovery</h2><p>Invite someone to explore Examine the Past.</p><div class="etp-share-social"></div><div class="etp-share-controls"><button type="button" data-etp-copy>Copy Page Link</button><button type="button" data-etp-native>More Sharing Options</button></div><small class="etp-share-status" role="status"></small></section>';
document.body.append(shareBox);
const shareTarget=()=>location.origin+location.pathname+location.search;
const buildShareLinks=()=>{
 const link=encodeURIComponent(shareTarget()),title=encodeURIComponent("Explore Examine the Past — History Built to Be Explored.");
 const links=[
 ["Facebook","https://www.facebook.com/sharer/sharer.php?u="+link,u("assets/social/facebook.svg")],
 ["Pinterest","https://pinterest.com/pin/create/button/?url="+link+"&description="+title,u("assets/social/pinterest.svg")],
 ["X","https://twitter.com/intent/tweet?url="+link+"&text="+title,u("assets/social/x.svg")],
 ["LinkedIn","https://www.linkedin.com/sharing/share-offsite/?url="+link,u("assets/social/linkedin.svg")],
 ["Email","mailto:?subject="+title+"&body="+link,u("assets/social/email.svg")]
 ];
 const area=shareBox.querySelector(".etp-share-social");area.replaceChildren();
 for(const [label,href,logo] of links){const a=document.createElement("a");a.href=href;a.target=label==="Email"?"_self":"_blank";a.rel="noopener noreferrer";a.setAttribute("aria-label","Share on "+label);if(logo){const img=document.createElement("img");img.src=logo;img.alt="";a.append(img)}else{a.textContent=label}const span=document.createElement("span");span.textContent=label;a.append(span);area.append(a)}
};
let sharePreviousFocus=null;
function closeShare(){if(shareBox.hidden)return;shareBox.hidden=true;document.body.classList.remove("etp-sharing");sharePreviousFocus?.focus?.()}
function openShare(){sharePreviousFocus=document.activeElement;buildShareLinks();shareBox.hidden=false;document.body.classList.add("etp-sharing");shareBox.querySelector(".etp-share-close")?.focus()}
document.addEventListener("click",e=>{if(e.target.closest("[data-etp-share]")){e.preventDefault();openShare()}if(e.target.closest("[data-etp-share-close]"))closeShare()});
shareBox.querySelector("[data-etp-copy]").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(shareTarget());shareBox.querySelector(".etp-share-status").textContent="Page link copied."}catch{shareBox.querySelector(".etp-share-status").textContent="Copy this link: "+shareTarget()}});
shareBox.querySelector("[data-etp-native]").addEventListener("click",async()=>{if(navigator.share){try{await navigator.share({title:"Examine the Past",text:"Explore history through interactive lessons and games.",url:shareTarget()})}catch{}}else{shareBox.querySelector(".etp-share-status").textContent="Choose a social network or Copy Page Link."}});
document.addEventListener("keydown",e=>{if(shareBox.hidden)return;if(e.key==="Escape"){e.preventDefault();closeShare()}if(e.key==="Tab"){const focusable=[...shareBox.querySelectorAll("button,a[href]")];if(!focusable.length)return;const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});

const toggle=document.createElement("button");toggle.className="etp-mobile-toggle";toggle.type="button";toggle.setAttribute("aria-label","Open navigation");toggle.setAttribute("aria-expanded","false");toggle.innerHTML="<span></span><span></span><span></span>";
toggle.classList.add("etp-yellow-menu");
toggle.style.setProperty("color","#fff200","important");
for(const bar of toggle.children){bar.style.setProperty("background-color","#fff200","important");bar.style.setProperty("background","#fff200","important");}

const panel=document.createElement("div");panel.className="etp-mobile-panel";panel.hidden=true;
panel.innerHTML='<div class="etp-mobile-install"><button type="button" data-etp-action="install"><span>⬇️</span><b>Install App</b></button></div>'+
'<div class="etp-mobile-heading">Navigate</div><div class="etp-mobile-list">'+
'<a href="'+u('')+'"><span>🏠</span><b>Home</b></a>'+
'<a href="'+u('')+'#about-us"><span>ℹ️</span><b>About</b></a>'+
'<a href="'+u('lessons/')+'" data-etp-transition="archive"><span>🎓</span><b>History Hub</b></a>'+
'<a href="'+u('lessons/us-history/')+'" data-etp-transition="page"><span>🇺🇸</span><b>U.S. History</b></a>'+
'<a href="'+u('games/presidential-challenges/')+'" data-etp-transition="page"><span>🏛️</span><b>Presidents</b></a>'+
'<a href="'+u('lessons/world-history/')+'" data-etp-transition="globe"><span>🌍</span><b>World History</b></a>'+
'<a href="'+u('lessons/civics-government/')+'" data-etp-transition="page"><span>🏛️</span><b>Civics & Government</b></a>'+
'<a href="'+u('lessons/geography/')+'" data-etp-transition="map"><span>🗺️</span><b>Geography</b></a>'+
'<a href="'+u('lessons/visual-history/')+'" data-etp-transition="earth-portal"><span>🎞️</span><b>Visual History</b></a>'+
'<a href="'+u('lessons/black-history/')+'" data-etp-transition="ink"><span>✊🏾</span><b>Black History</b></a>'+
'<a href="'+u('lessons/world-religions/')+'" data-etp-transition="mosaic"><span>🕊️</span><b>World Religions</b></a>'+
'<a href="'+u('timeline/')+'" data-etp-transition="timeline"><span>⏳</span><b>Timeline</b></a>'+
'<a href="'+u('maps/')+'" data-etp-transition="map"><span>🗺️</span><b>History Maps</b></a>'+
'<a href="'+u('today/')+'" data-etp-transition="stamp"><span>📅</span><b>Today in History</b></a>'+
'<a href="'+u('games/')+'" data-etp-transition="time"><span>🎮</span><b>Games</b></a>'+
'<a href="'+u('teacher-tools/')+'" data-etp-transition="page"><span>🧰</span><b>Teacher Tools</b></a>'+
'<button type="button" data-etp-share><span>↗</span><b>Share</b></button>'+
'<a href="'+u('')+'#contact-section"><span>📧</span><b>Contact Us</b></a>'+
'<button type="button" data-etp-action="jukebox"><span>🎵</span><b>History Jukebox</b></button>'+
'</div>';
// Unified expanded site menu: desktop and mobile use the same navigation tree.
// Sketch-matched site map: three open columns above a full-width History Hub.
const menuSections=[
 {title:"Home",icon:"🏠",href:"",links:[["About","about/"],["Contact","/#contact-section"],["Install ↓","@install"]]},
 {title:"Student / Teacher Tools",icon:"🛠️",href:"teacher-tools/",links:[
  ["On This Day in History","today/"],["Maps","maps/"],["Timeline","timeline/"],
  ["Movies in the Classroom","teacher-tools/movies-in-the-classroom/"],
  ["Bloom’s Taxonomy","teacher-tools/blooms-taxonomy/"],
  ["Classroom Management","teacher-tools/classroom-management/"],
  ["Learning Styles","teacher-tools/learning-styles/"],
  ["History Certification Prep","teacher-tools/certification-prep/"]]},
 {title:"Games",icon:"🎮",href:"games/",groups:[
  {title:"History Unlocked",href:"games/",links:[["All Games","games/"]]},
  {title:"Presidential Challenges",href:"games/presidential-challenges/",links:[
   ["Presidential Portraits","games/presidential-challenges/"],
   ["Presidents Bingo","games/presidential-challenges/"],
   ["Who Am I?","games/presidential-challenges/"],
   ["Presidential Connection","games/presidential-challenges/"],
   ["Challenge Board","games/presidential-challenges/"]]},
  {title:"Black History",href:"games/black-history-challenge/",links:[
   ["Black History Legends Hall","lessons/black-history-heroes/"],
   ["Black History Bingo","games/black-history-challenge/"],
   ["Who Am I?","games/black-history-challenge/"],
   ["Time Shuffle","games/time-rush/"]]}
 ]}
];
const grades=[
 ["5th · Early American","lessons/curriculum/grade-5-early-american-history/"],
 ["6th · Ancient World","lessons/curriculum/grade-6-ancient-world-history/"],
 ["7th · World Cultures","lessons/curriculum/grade-7-world-cultures-geography/"],
 ["8th · Early U.S. History","lessons/curriculum/grade-8-early-united-states-history/"],
 ["9th · U.S. History","lessons/curriculum/grade-9-united-states-history/"],
 ["10th · Civics & Government","lessons/curriculum/grade-10-civics-government/"],
 ["11th · Modern World","lessons/curriculum/grade-11-modern-world-history/"],
 ["12th · Social Studies Electives","lessons/curriculum/grade-12-social-studies-electives/"]
];
const safeText=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const menuLink=([name,path],css="")=>path==="@install"?
 '<button type="button" class="etp-map-link '+css+'" data-etp-action="install">'+safeText(name)+'</button>':
 '<a class="etp-map-link '+css+'" href="'+u(path.startsWith("/")?path.slice(1):path)+'">'+safeText(name)+'</a>';
const topMarkup=menuSections.map(section=>
 '<section class="etp-map-column" aria-label="'+safeText(section.title)+'">'+
 '<h2 class="etp-map-title"><a href="'+u(section.href)+'"><span class="etp-map-main-icon" aria-hidden="true">'+section.icon+'</span>'+safeText(section.title)+'</a></h2>'+
 (section.links?'<div class="etp-map-column-links">'+section.links.map(v=>menuLink(v)).join('')+'</div>':'')+
 (section.groups?section.groups.map(g=>'<div class="etp-map-subgroup"><h3><a href="'+u(g.href)+'">'+safeText(g.title)+'</a></h3>'+
 '<div class="etp-map-column-links">'+g.links.map(v=>menuLink(v)).join('')+'</div></div>').join(''):'')+
 '</section>').join('');
panel.innerHTML='<div class="etp-map-head"><span>EXAMINE THE PAST · EXPLORE</span><button type="button" class="etp-mega-close" aria-label="Close menu">×</button></div>'+
 '<div class="etp-map-content"><div class="etp-map-primary">'+topMarkup+'</div>'+
 '<section class="etp-map-history" aria-label="History Hub courses">'+
 '<h2 class="etp-map-title"><a href="'+u('lessons/')+'"><span class="etp-map-main-icon" aria-hidden="true">📚</span>History Hub · Courses</a></h2>'+
 '<div class="etp-map-grades">'+grades.map(v=>menuLink(v,"etp-map-grade")).join('')+'</div>'+
 '<div class="etp-map-history-bottom"><h3><a href="'+u('lessons/black-history/')+'">Black History</a></h3>'+
 '<div class="etp-map-history-links">'+
 menuLink(["Lessons","lessons/black-history/"])+menuLink(["Hall","lessons/black-history-heroes/"])+menuLink(["Games","games/black-history-challenge/"])+
 '</div></div></section></div>';
panel.querySelector(".etp-mega-close")?.addEventListener("click",()=>{panel.hidden=true;toggle.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.focus()});
header.querySelector(".etp-header-inner").append(toggle);header.querySelector(".etp-header-inner").append(panel);
panel.querySelector('[data-etp-action="install"]')?.addEventListener("click",e=>{e.preventDefault();if(typeof window.siteInstallApp==="function")window.siteInstallApp();else {const b=document.querySelector(".site-app-footer-text");if(b)b.click();}});
function closeMobile(){panel.hidden=true;toggle.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation")}
toggle.addEventListener("click",()=>{const open=panel.hidden;panel.hidden=!open;toggle.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});panel.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMobile));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMobile()});
if(!noFooter){const footer=document.createElement("footer");footer.id="etpSiteFooter";
footer.innerHTML='<div class="etp-footer-grid"><div><div class="etp-footer-title">Learn</div><a href="'+u('lessons/us-history/')+'">U.S. History</a><a href="'+u('lessons/world-history/')+'">World History</a><a href="'+u('lessons/civics-government/')+'">Civics & Government</a><a href="'+u('lessons/geography/')+'">Geography</a><a href="'+u('lessons/visual-history/')+'">Visual History</a><a href="'+u('lessons/black-history/')+'">Black History</a><a href="'+u('lessons/world-religions/')+'">World Religions</a><a href="'+u('lessons/')+'">All Lessons</a></div>'+
'<div><div class="etp-footer-title">Explore</div><a href="'+u('timeline/')+'">Interactive Timeline</a><a href="'+u('maps/')+'">History Maps</a><a href="'+u('today/')+'">Today in History</a><a href="'+u('games/')+'">Games</a><a href="'+u('games/presidential-challenges/')+'">Presidents</a><a href="'+u('lessons/black-history/')+'">Black History</a><a href="'+u('current-events/')+'">Current Events</a><a href="https://www.etsy.com/shop/examinethepast">Shop History</a></div>'+
'<div><div class="etp-footer-title">Teacher Tools</div><a href="'+u('teacher-tools/blooms-taxonomy/')+'">Bloom’s Taxonomy</a><a href="'+u('teacher-tools/classroom-management/')+'">Classroom Management</a><a href="'+u('teacher-tools/movies-in-the-classroom/')+'">Movies in the Classroom</a><a href="'+u('licensing/')+'">Resource Licensing</a><a href="'+u('teacher-tools/learning-styles/')+'">Learner Supports</a><a href="'+u('teacher-tools/')+'">All Teacher Tools</a><a href="'+u('sitemap/')+'">Site Map</a><a href="'+u('faq/')+'">FAQ</a></div>'+
'<div><div class="etp-footer-title">Legal & Site</div><a href="'+u('affiliate-disclosure/')+'">Affiliate Disclosure</a><a href="'+u('careers/')+'">Careers & Partnerships</a><a href="'+u('copyright/')+'">Copyright Policy</a><a href="'+u('copyright/')+'#rights-concerns">DMCA Notice</a><a href="'+u('privacy/')+'">Privacy Policy</a><a href="'+u('terms/')+'">Terms of Use</a><a href="'+u('cookies/')+'">Cookie Policy</a><a href="'+u('about/')+'">About</a><a href="'+u('')+'#contact-section">Contact Us</a></div></div>'+
'<div class="etp-community-wrap" id="community"><div class="etp-community-title">JOIN OUR COMMUNITY</div><div class="etp-community etp-community-logos">'+
'<a href="https://www.youtube.com/@ExamineThePast" target="_blank" rel="noopener" title="YouTube"><img src="'+u('assets/social/youtube.svg')+'" alt="YouTube"></a>'+
'<a href="https://www.tiktok.com/@examinethepast" target="_blank" rel="noopener" title="TikTok"><img src="'+u('assets/social/tiktok.svg')+'" alt="TikTok"></a>'+
'<a href="https://www.facebook.com/examinethepast" target="_blank" rel="noopener" title="Facebook"><img src="'+u('assets/social/facebook.svg')+'" alt="Facebook"></a>'+
'<a href="https://www.instagram.com/examinethepast/" target="_blank" rel="noopener" title="Instagram"><img src="'+u('assets/social/instagram.svg')+'" alt="Instagram"></a>'+
'<a href="https://www.pinterest.com/examinethepast/" target="_blank" rel="noopener" title="Pinterest"><img src="'+u('assets/social/pinterest.svg')+'" alt="Pinterest"></a>'+
'<a href="https://www.teacherspayteachers.com/store/examine-the-past" target="_blank" rel="noopener" title="Teachers Pay Teachers"><img src="'+u('assets/extracted/47484528cf35e39ccc1c.png')+'" alt="teacherspayteachers"></a>'+
'<a href="https://www.redbubble.com/people/examinethepast/shop" target="_blank" rel="noopener" title="Redbubble"><img src="'+u('assets/social/redbubble.svg')+'" alt="redbubble"></a>'+
'<a href="https://www.zazzle.com/store/examine_the_past" target="_blank" rel="noopener" title="Zazzle"><img src="'+u('assets/social/zazzle.svg')+'" alt="zazzle"></a>'+
'<a href="https://www.etsy.com/shop/examinethepast" target="_blank" rel="noopener" title="Etsy"><img src="'+u('assets/social/etsy.svg')+'" alt="etsy"></a>'+
'</div></div><div class="etp-footer-bottom">© 2026 Examine the Past. All Rights Reserved.</div><div class="etp-legal-overlay" hidden aria-hidden="true"><button class="etp-legal-backdrop" aria-label="Close legal notice"></button><article class="etp-legal-card" role="dialog" aria-modal="true"><button class="etp-legal-close" aria-label="Close">×</button><div class="etp-legal-kicker">EXAMINE THE PAST</div><h2 class="etp-legal-title"></h2><div class="etp-legal-copy"></div></article></div>';
document.body.append(footer);
const legal={privacy:["Privacy Policy","Examine the Past respects your privacy. Information voluntarily provided through forms, purchases, or newsletter signups may be used to operate and improve the site. Third-party services have their own privacy practices."],terms:["Terms of Service","Use Examine the Past and its educational resources lawfully. Original materials may not be copied, resold, republished, or redistributed except where a specific license permits it."],affiliate:["Affiliate Disclosure","Examine the Past may earn a commission from qualifying purchases made through selected affiliate links. Compensation does not determine historical conclusions or instructional recommendations."],copyright:["Copyright Policy","Original Examine the Past text, graphics, games, downloads, and other materials are protected by applicable law. Third-party and public-domain materials are identified where appropriate."],dmca:["DMCA Notice","Examine the Past responds to properly submitted copyright notices identifying the copyrighted work, allegedly infringing material, contact information, and statements required by applicable law."],refund:["Refund / Digital Products","Digital products are handled according to the terms stated at purchase and applicable marketplace policies. Contact Examine the Past with order details when a file is defective, inaccessible, or duplicated."],cookies:["Cookie Policy","Examine the Past and services used to operate the site may use cookies or similar technologies for essential functions, preferences, analytics, security, and embedded services."]};
const overlay=footer.querySelector(".etp-legal-overlay"),title=footer.querySelector(".etp-legal-title"),copy=footer.querySelector(".etp-legal-copy");function closeLegal(){overlay.hidden=true;overlay.setAttribute("aria-hidden","true");document.body.classList.remove("etp-legal-open")}footer.querySelectorAll(".etp-legal-link").forEach(b=>b.addEventListener("click",()=>{const d=legal[b.dataset.legal]||["Legal","Information will be added here."];title.textContent=d[0];copy.textContent=d[1];overlay.hidden=false;overlay.setAttribute("aria-hidden","false");document.body.classList.add("etp-legal-open")}));footer.querySelector(".etp-legal-close").addEventListener("click",closeLegal);footer.querySelector(".etp-legal-backdrop").addEventListener("click",closeLegal);document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!overlay.hidden)closeLegal()})}
})();