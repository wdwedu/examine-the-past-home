from pathlib import Path
s=Path("timeline/index.html").read_text(encoding="utf-8",errors="ignore")
needle='href="#"'
out=[]
start=0
while True:
    i=s.find(needle,start)
    if i<0: break
    out.append(s[max(0,i-300):i+500])
    start=i+len(needle)
Path("audit/timeline-placeholder-context.txt").write_text("\n\n---\n\n".join(out),encoding="utf-8")
print(len(out))
