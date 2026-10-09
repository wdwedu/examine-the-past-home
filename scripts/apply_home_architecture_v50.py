from pathlib import Path
import re

# Homepage: shared shell becomes header + footer, plus compact v50 architecture.
p=Path("index.html")
s=p.read_text(encoding="utf-8",errors="ignore")
if "home-structure-v50.css" not in s:
    s=s.replace("</head>",'<link rel="stylesheet" href="assets/home-structure-v50.css?v=50">\n</head>',1)
if "home-structure-v50.js" not in s:
    pos=s.rfind("</body>")
    insert='<script src="assets/home-structure-v50.js?v=50"></script>\n'
    s=s[:pos]+insert+s[pos:] if pos>=0 else s+insert
s=s.replace(' data-no-footer="true"','')
s=re.sub(r'assets/site-shell\.css\?v=\d+','assets/site-shell.css?v=50',s)
s=re.sub(r'assets/site-shell\.js\?v=\d+','assets/site-shell.js?v=50',s)
p.write_text(s,encoding="utf-8")

# All regular HTML pages get current shared shell cache version.
for q in Path(".").rglob("*.html"):
    txt=q.read_text(encoding="utf-8",errors="ignore")
    txt=re.sub(r'(?P<prefix>(?:\.\./)*)assets/site-shell\.css\?v=\d+',lambda m:f"{m.group('prefix')}assets/site-shell.css?v=50",txt)
    txt=re.sub(r'(?P<prefix>(?:\.\./)*)assets/site-shell\.js\?v=\d+',lambda m:f"{m.group('prefix')}assets/site-shell.js?v=50",txt)
    q.write_text(txt,encoding="utf-8")

# History Unlocked desktop nav now mirrors the universal shell architecture.
nav=Path("games/assets/nav.html")
nav.write_text('''<nav class="icon-nav etp-final-nav" aria-label="Examine the Past site navigation">
<div class="icon-row">
<a class="nav-item" href="/examine-the-past-home/" target="_top"><span class="nav-label">Home</span><span class="nav-icon">🏠</span></a>
<a class="nav-item" href="/examine-the-past-home/#about-us" target="_top"><span class="nav-label">About</span><span class="nav-icon">ℹ️</span></a>
<a class="nav-item" href="/examine-the-past-home/lessons/" target="_top"><span class="nav-label">History Hub</span><span class="nav-icon">🎓</span></a>
<a class="nav-item" href="/examine-the-past-home/timeline/" target="_top"><span class="nav-label">Timeline</span><span class="nav-icon">⏳</span></a>
<a class="nav-item" href="/examine-the-past-home/maps/" target="_top"><span class="nav-label">History Maps</span><span class="nav-icon">🗺️</span></a>
<a class="nav-item" href="/examine-the-past-home/today/" target="_top"><span class="nav-label">Today in History</span><span class="nav-icon">📅</span></a>
<a class="nav-item" href="/examine-the-past-home/games/" target="_top"><span class="nav-label">History Unlocked</span><span class="nav-icon">🎮</span></a>
<a class="nav-item" href="/examine-the-past-home/teacher-tools/" target="_top"><span class="nav-label">Teacher Tools</span><span class="nav-icon">🧰</span></a>
<a class="nav-item" href="https://www.etsy.com/shop/examinethepast"><span class="nav-label">Shop History</span><span class="nav-icon">🛍️</span></a>
<a class="nav-item" href="/examine-the-past-home/#community" target="_top"><span class="nav-label">Community</span><span class="nav-icon">👥</span></a>
<a class="nav-item" href="/examine-the-past-home/#contact-section" target="_top"><span class="nav-label">Contact Us</span><span class="nav-icon">📧</span></a>
<button class="nav-item sound-control" type="button" data-etp-action="lights"><span class="nav-label">Lights</span><span class="nav-icon">💡</span></button>
<button class="nav-item sound-control" type="button" data-etp-action="jukebox"><span class="nav-label">History Jukebox</span><span class="nav-icon">🎶</span></button>
</div><div class="nav-glow"></div></nav>''',encoding="utf-8")

# Make the game shell work on both examinethepast.com and the GitHub preview.
gp=Path("games/assets/site-shell.js")
g=gp.read_text(encoding="utf-8",errors="ignore")
g=g.replace('const BASE="/examine-the-past-home/games/assets/";','const SITE_ROOT=location.hostname.endsWith("github.io")?"/examine-the-past-home/":"/";\\n const BASE=SITE_ROOT+"games/assets/";')
# Direct destinations in the mobile menu.
repls={
'/examine-the-past-home/#us-history':'/examine-the-past-home/lessons/us-history/',
'/examine-the-past-home/#world-history':'/examine-the-past-home/lessons/world-history/',
'/examine-the-past-home/#civics-government':'/examine-the-past-home/lessons/civics-government/',
'/examine-the-past-home/#geography':'/examine-the-past-home/lessons/geography/',
'/examine-the-past-home/#black-history':'/examine-the-past-home/lessons/black-history/',
'/examine-the-past-home/#world-religions':'/examine-the-past-home/lessons/world-religions/',
'/examine-the-past-home/#timeline':'/examine-the-past-home/timeline/',
'/examine-the-past-home/#history-maps':'/examine-the-past-home/maps/',
'/examine-the-past-home/#today-history':'/examine-the-past-home/today/',
'/examine-the-past-home/#history-unlocked':'/examine-the-past-home/games/',
'/examine-the-past-home/#blooms-taxonomy':'/examine-the-past-home/teacher-tools/blooms-taxonomy/',
'/examine-the-past-home/#movies-classroom':'/examine-the-past-home/teacher-tools/movies-in-the-classroom/',
'/examine-the-past-home/#classroom-management':'/examine-the-past-home/teacher-tools/classroom-management/',
'/examine-the-past-home/#learner-supports':'/examine-the-past-home/teacher-tools/learning-styles/'
}
for a,b in repls.items(): g=g.replace(a,b)
# Rewrite GitHub-prefixed internal links at runtime for custom domain.
needle='await Promise.all([inject("game-shell-nav","nav.html"),inject("game-shell-footer","footer.html")]);'
addon=needle+'''
 document.querySelectorAll('a[href^="/examine-the-past-home/"]').forEach(a=>{const raw=a.getAttribute("href");a.setAttribute("href",SITE_ROOT+raw.replace(/^\\/examine-the-past-home\\//,""))});
 if(!document.querySelector('link[data-etp-game-experience]')){const l=document.createElement("link");l.rel="stylesheet";l.href=SITE_ROOT+"assets/etp-experience-v50.css?v=50";l.dataset.etpGameExperience="1";document.head.appendChild(l)}
 if(!document.querySelector('script[data-etp-game-experience]')){const x=document.createElement("script");x.src=SITE_ROOT+"assets/etp-experience-v50.js?v=50";x.dataset.etpGameExperience="1";x.onload=()=>window.ETPExperience&&window.ETPExperience.enableReader();document.head.appendChild(x)}
'''
if "data-etp-game-experience" not in g:g=g.replace(needle,addon)
# Add lights and jukebox to mobile menu.
needle2='mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));'
addon2='''const mobileLast=mobileMenu.querySelector(".game-mobile-last");if(mobileLast){mobileLast.insertAdjacentHTML("beforeend",'<button class="game-mobile-action" type="button" data-etp-action="lights">💡 <b>Lights</b></button><button class="game-mobile-action" type="button" data-etp-action="jukebox">🎶 <b>History Jukebox</b></button>')}\\n   '''+needle2
if "game-mobile-action" not in g:g=g.replace(needle2,addon2)
gp.write_text(g,encoding="utf-8")

# Game footer external paths become custom-domain safe through game-shell runtime; keep only one community footer.
print("Applied homepage v50 architecture, shared footer, direct navigation, and custom-domain-safe game shell.")
