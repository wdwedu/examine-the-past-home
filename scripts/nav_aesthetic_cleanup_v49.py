from pathlib import Path
import re

ROOT=Path(".")

# ---------- Standard shared shell JS ----------
p=Path("assets/site-shell.js")
s=p.read_text(encoding="utf-8",errors="ignore")
s=s.replace('>HISTORY HUB<','>History Hub<')
s=s.replace('>EXPLORE<','>Explore<')
s=s.replace('>TEACHER TOOLS<','>Teacher Tools<')
p.write_text(s,encoding="utf-8")

# ---------- Standard shared shell CSS ----------
p=Path("assets/site-shell.css")
s=p.read_text(encoding="utf-8",errors="ignore")
lock=r'''
/* ETP aesthetic navigation + typography lock v49 */
body h1,
body h2,
body h3,
body .hero h1,
body .hero h2,
body .card h2,
body .collection-card h2,
body .featured-lesson h2,
body .etp-appetizer h2,
body .section-title,
body .hero-title,
body .page-title,
body .resource-title{
  font-family:Georgia,"Times New Roman",serif!important;
}

@media(max-width:759px){
  #etpSiteHeader{
    position:sticky!important;
    top:0!important;
    z-index:2147483000!important;
    height:46px!important;
    min-height:46px!important;
    max-height:46px!important;
    background:#000!important;
    border-bottom:1px solid #242424!important;
    box-shadow:0 5px 14px rgba(0,0,0,.28)!important;
  }
  #etpSiteHeader .etp-header-inner{
    height:46px!important;
    min-height:46px!important;
    max-height:46px!important;
    padding:0 9px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:flex-end!important;
    overflow:visible!important;
  }
  #etpSiteHeader .etp-icon-nav{display:none!important}
  #etpSiteHeader .etp-mobile-toggle{
    order:50!important;
    display:flex!important;
    width:42px!important;
    height:42px!important;
    min-width:42px!important;
    margin:2px 0 2px auto!important;
    padding:0!important;
    align-items:center!important;
    justify-content:center!important;
    flex-direction:column!important;
    gap:5px!important;
    background:transparent!important;
    border:0!important;
    border-radius:7px!important;
  }
  #etpSiteHeader .etp-mobile-toggle span{
    width:25px!important;
    height:2px!important;
    background:#f7f7f2!important;
  }
  #etpSiteHeader .etp-mobile-panel{
    top:100%!important;
    left:0!important;
    right:0!important;
    max-height:calc(100vh - 46px)!important;
    padding:10px 13px 15px!important;
    background:linear-gradient(180deg,#0b0d0b,#050605 88%)!important;
  }
  #etpSiteHeader .etp-mobile-heading{
    color:#fff200!important;
    text-transform:none!important;
    font-family:Georgia,"Times New Roman",serif!important;
    font-size:.79rem!important;
    line-height:1.15!important;
    letter-spacing:.06em!important;
    margin:11px 4px 7px!important;
  }
  #etpSiteHeader .etp-mobile-panel a b,
  #etpSiteHeader .etp-mobile-sound b{
    font-family:Georgia,"Times New Roman",serif!important;
    font-size:.82rem!important;
    text-transform:none!important;
  }
}
'''
if "ETP aesthetic navigation + typography lock v49" not in s:
    s += lock
p.write_text(s,encoding="utf-8")

# ---------- Game shell JS ----------
p=Path("games/assets/site-shell.js")
s=p.read_text(encoding="utf-8",errors="ignore")
s=s.replace('>HISTORY HUB<','>History Hub<')
s=s.replace('>EXPLORE<','>Explore<')
s=s.replace('>TEACHER TOOLS<','>Teacher Tools<')
p.write_text(s,encoding="utf-8")

# ---------- Game shell CSS ----------
p=Path("games/assets/site-shell.css")
s=p.read_text(encoding="utf-8",errors="ignore")
glock=r'''
/* History Unlocked aesthetic navigation + typography lock v49 */
body h1,body h2,body h3,body .title,body .game-title,body .section-title{
  font-family:Georgia,"Times New Roman",serif!important;
}
@media(max-width:759px){
  #game-shell-nav,
  #game-shell-nav .icon-nav{
    position:sticky!important;
    top:0!important;
    z-index:2147483000!important;
    height:46px!important;
    min-height:46px!important;
    max-height:46px!important;
    background:#000!important;
    border-bottom:1px solid #242424!important;
    overflow:visible!important;
  }
  #game-shell-nav .icon-nav{
    display:flex!important;
    justify-content:flex-end!important;
    align-items:center!important;
    padding:0 9px!important;
  }
  #game-shell-nav .icon-row{display:none!important}
  #game-shell-nav .game-mobile-toggle{
    order:50!important;
    width:42px!important;
    height:42px!important;
    margin:2px 0 2px auto!important;
    padding:0!important;
  }
  #game-shell-nav .game-mobile-toggle span{
    width:25px!important;
    height:2px!important;
  }
  #game-shell-nav .game-mobile-menu{
    top:100%!important;
    left:0!important;
    right:0!important;
    max-height:calc(100vh - 46px)!important;
    padding:10px 13px 15px!important;
    background:linear-gradient(180deg,#0b0d0b,#050605 88%)!important;
  }
  #game-shell-nav .game-mobile-heading{
    color:#fff200!important;
    text-transform:none!important;
    font-family:Georgia,"Times New Roman",serif!important;
    font-size:.79rem!important;
    letter-spacing:.06em!important;
    margin:11px 4px 7px!important;
  }
  #game-shell-nav .game-mobile-menu a b{
    font-family:Georgia,"Times New Roman",serif!important;
    font-size:.82rem!important;
    text-transform:none!important;
  }
}
'''
if "History Unlocked aesthetic navigation + typography lock v49" not in s:
    s += glock
p.write_text(s,encoding="utf-8")

# ---------- Homepage direct cleanup ----------
p=Path("index.html")
s=p.read_text(encoding="utf-8",errors="ignore")
s=s.replace("RESOURCE VAULT","TEACHER TOOLS")
s=s.replace("Resource Vault","Teacher Tools")

home_style=r'''
<style id="etp-home-aesthetic-v49">
/* Homepage typography + thin mobile header v49 */
body h1,
body h2,
body h3,
body .hero-title,
body .section-title,
body .page-title,
body .resource-title,
body [class*="headline"]{
  font-family:Georgia,"Times New Roman",serif!important;
}
@media(max-width:759px){
  #etpSiteHeader{
    height:46px!important;
    min-height:46px!important;
    max-height:46px!important;
    position:sticky!important;
    top:0!important;
  }
}
</style>
'''
if "etp-home-aesthetic-v49" not in s:
    s=s.replace("</head>",home_style+"\n</head>",1)

# cache bump homepage-injected shell
s=re.sub(r'assets/site-shell\.css\?v=\d+','assets/site-shell.css?v=49',s)
s=re.sub(r'assets/site-shell\.js\?v=\d+','assets/site-shell.js?v=49',s)
p.write_text(s,encoding="utf-8")

# ---------- Cache bump all HTML using shared shells ----------
for q in ROOT.rglob("*.html"):
    txt=q.read_text(encoding="utf-8",errors="ignore")
    txt=re.sub(r'(?P<prefix>(?:\.\./)*)assets/site-shell\.css\?v=\d+',lambda m:f"{m.group('prefix')}assets/site-shell.css?v=49",txt)
    txt=re.sub(r'(?P<prefix>(?:\.\./)*)assets/site-shell\.js\?v=\d+',lambda m:f"{m.group('prefix')}assets/site-shell.js?v=49",txt)
    q.write_text(txt,encoding="utf-8")

print("Applied v49 thin mobile header, right-side hamburger, yellow Title Case menu headings, Georgia titles, and homepage label cleanup.")
