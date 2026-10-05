from pathlib import Path
import re, html
src=Path("index.html").read_text(encoding="utf-8",errors="ignore")
terms=["Home","About","History Hub","Resource Vault","On This Day","Historical Maps","Timeline","Bloom","Games","Community","Contact","Join Our Community","LEARN","EXPLORE","RESOURCES","LEGAL","Hidden Treasures","Educator"]
out=[]
out.append(f"bytes={len(src.encode('utf-8'))} chars={len(src)} lines={src.count(chr(10))+1}")
for term in terms:
    hits=list(re.finditer(re.escape(term),src,re.I))
    out.append("\n"+"="*70+"\n"+term+f" hits={len(hits)}")
    for m in hits[:8]:
        a=max(0,m.start()-900);b=min(len(src),m.end()+900)
        out.append(re.sub(r"\s+"," ",html.unescape(src[a:b])))
out.append("\n"+"="*70+"\nIDS AND CLASSES")
for m in re.finditer(r'<[^>]+(?:id|class)=["\'][^"\']*(?:nav|header|footer|resource|history|community|learn|explore|legal|contact|about|timeline|map|bloom|game)[^"\']*["\'][^>]*>',src,re.I):
    out.append(re.sub(r"\s+"," ",m.group(0))[:1500])
Path("audit").mkdir(exist_ok=True)
Path("audit/homepage-shell-audit.txt").write_text("\n".join(out),encoding="utf-8")
