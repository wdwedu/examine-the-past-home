from pathlib import Path
import re

p=Path("index.html")
s=p.read_text(encoding="utf-8",errors="ignore")
marker="ETP UNIVERSAL HOMEPAGE HEADER PATCH V48"

if marker not in s:
    css=r'''
<style id="etp-home-header-patch-v48">
/* ETP UNIVERSAL HOMEPAGE HEADER PATCH V48 */
.site-nav.final-nav.etp-nav-vnext,
.final-nav.etp-nav-vnext,
.site-nav.etp-nav-vnext,
nav.final-nav,
nav.site-nav{display:none!important}

/* Give major homepage destinations a clearer visual break without changing content */
#us-history,#world-history,#civics-government,#geography,#black-history,#world-religions,
#timeline,#history-maps,#today-history,#history-unlocked,
#blooms-taxonomy,#movies-classroom,#classroom-management,#learner-supports,
#hidden-treasures,#community,#contact-section{
  scroll-margin-top:86px;
  position:relative;
  border-top:1px solid rgba(255,255,255,.07)!important;
  box-shadow:inset 0 1px 0 rgba(255,242,0,.025);
}
#us-history,#civics-government,#black-history,
#timeline,#today-history,#blooms-taxonomy,#classroom-management,#hidden-treasures{
  background-color:#050705!important;
}
#world-history,#geography,#world-religions,
#history-maps,#history-unlocked,#movies-classroom,#learner-supports,#community,#contact-section{
  background-color:#090b09!important;
}
@media(max-width:759px){
  #us-history,#world-history,#civics-government,#geography,#black-history,#world-religions,
  #timeline,#history-maps,#today-history,#history-unlocked,
  #blooms-taxonomy,#movies-classroom,#classroom-management,#learner-supports,
  #hidden-treasures,#community,#contact-section{
    padding-top:max(38px,env(safe-area-inset-top))!important;
    padding-bottom:42px!important;
    border-top:1px solid rgba(255,242,0,.12)!important;
  }
}
</style>
<link rel="stylesheet" href="assets/site-shell.css?v=48">
'''
    if "</head>" in s:
        s=s.replace("</head>",css+"\n</head>",1)
    else:
        s=css+s

    shell='<script src="assets/site-shell.js?v=48" data-etp-root="./" data-no-footer="true"></script>'
    if "</body>" in s:
        s=s.replace("</body>",shell+"\n</body>",1)
    else:
        s+=shell

p.write_text(s,encoding="utf-8")

# Force all standard interior pages to load newest shared shell.
for q in Path(".").rglob("*.html"):
    if q==p: continue
    txt=q.read_text(encoding="utf-8",errors="ignore")
    txt=re.sub(r'assets/site-shell\.css\?v=\d+', 'assets/site-shell.css?v=48', txt)
    txt=re.sub(r'assets/site-shell\.js\?v=\d+', 'assets/site-shell.js?v=48', txt)
    txt=re.sub(r'\.\./assets/site-shell\.css\?v=\d+', '../assets/site-shell.css?v=48', txt)
    txt=re.sub(r'\.\./assets/site-shell\.js\?v=\d+', '../assets/site-shell.js?v=48', txt)
    txt=re.sub(r'\.\./\.\./assets/site-shell\.css\?v=\d+', '../../assets/site-shell.css?v=48', txt)
    txt=re.sub(r'\.\./\.\./assets/site-shell\.js\?v=\d+', '../../assets/site-shell.js?v=48', txt)
    txt=re.sub(r'\.\./\.\./\.\./assets/site-shell\.css\?v=\d+', '../../../assets/site-shell.css?v=48', txt)
    txt=re.sub(r'\.\./\.\./\.\./assets/site-shell\.js\?v=\d+', '../../../assets/site-shell.js?v=48', txt)
    q.write_text(txt,encoding="utf-8")

print("Homepage shared header injected; legacy nav hidden; shell cache bumped.")
