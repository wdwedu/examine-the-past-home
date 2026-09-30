from pathlib import Path
p=Path("index.html")
html=p.read_text(encoding="utf-8",errors="ignore")
old='<a class="mega-footer-link" href="https://www.examinethepast.com/school-district-services" rel="noopener" target="_blank">School &amp; District Services</a>'
new='<a class="mega-footer-link" href="https://wdwedu.github.io/examine-the-past-home/games/" rel="noopener">Games (History Unlocked)</a>'
if old not in html:
    raise SystemExit("Exact School & District Services footer link not found")
p.write_text(html.replace(old,new,1),encoding="utf-8")
print("Build 5 footer replacement complete")
