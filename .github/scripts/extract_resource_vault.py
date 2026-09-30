from pathlib import Path
from bs4 import BeautifulSoup
import re
html=Path("index.html").read_text(encoding="utf-8",errors="ignore")
soup=BeautifulSoup(html,"html.parser")
node=soup.find(id="resource-vault")
parts=[]
if node:
    parts.append("=== RESOURCE HTML ===\n"+str(node)[:30000])
    classes=set()
    for el in node.find_all(True):
        for c in el.get("class",[]): classes.add(c)
    parts.append("\n=== CLASSES ===\n"+"\n".join(sorted(classes)))
    selectors=[]
    for style in soup.find_all("style"):
        txt=style.get_text("\n")
        for m in re.finditer(r'([^{}]+)\{([^{}]*)\}',txt,re.S):
            sel=m.group(1).strip(); body=m.group(2).strip()
            if any(("."+c) in sel for c in classes):
                selectors.append(sel+"{"+body+"}")
    parts.append("\n=== MATCHING CSS ===\n"+"\n".join(selectors))
else:
    parts.append("resource-vault not found")
Path(".github/resource-vault-snapshot.txt").write_text("\n".join(parts),encoding="utf-8")
print("wrote", sum(map(len,parts)))
