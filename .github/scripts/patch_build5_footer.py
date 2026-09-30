from pathlib import Path
html=Path("index.html").read_text(encoding="utf-8",errors="ignore")
old='<a href="https://www.examinethepast.com/school-district-services">School &amp; District Services</a>'
new='<a href="https://wdwedu.github.io/examine-the-past-home/games/" rel="noopener">Games (History Unlocked)</a>'
if old not in html:
    # tolerate literal ampersand variant
    old='<a href="https://www.examinethepast.com/school-district-services">School & District Services</a>'
if old not in html:
    raise SystemExit("School & District Services footer link not found")
html=html.replace(old,new,1)
Path("index.html").write_text(html,encoding="utf-8")
print("Footer Games link inserted")
