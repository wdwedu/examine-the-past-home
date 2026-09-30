from pathlib import Path
from bs4 import BeautifulSoup
html=Path("index.html").read_text(encoding="utf-8",errors="ignore")
soup=BeautifulSoup(html,"html.parser")
lines=[]
for i,nav in enumerate(soup.find_all("nav")):
    text=" ".join(nav.stripped_strings)
    links=[]
    for a in nav.find_all("a"):
        label=" ".join(a.stripped_strings)
        links.append(f"{label} => {a.get('href')}")
    lines.append(f"NAV {i} classes={nav.get('class')}\nTEXT: {text[:800]}\n" + "\n".join(links[:30]))
footer=soup.find("footer")
if footer:
    lines.append("\nFOOTER TEXT:\n"+" | ".join(footer.stripped_strings))
    lines.append("\nFOOTER LINKS:")
    for a in footer.find_all("a"):
        lines.append(f"{' '.join(a.stripped_strings)} => {a.get('href')}")
Path(".github/site-links-snapshot.txt").write_text("\n\n".join(lines),encoding="utf-8")
print("done")
