from pathlib import Path
import re,json
s=Path("index.html").read_text(encoding="utf-8",errors="ignore")
phrases=["FREE RESOURCES","Free Resources","WHAT EDUCATORS VALUE","What Educators Value","TEACHER TOOLS","Teacher Tools","EXPLORE HIDDEN TREASURES","Explore Hidden Treasures","ABOUT EXAMINE","About Examine"]
out={}
for ph in phrases:
    arr=[]
    start=0
    while True:
        i=s.find(ph,start)
        if i<0: break
        arr.append(s[max(0,i-500):min(len(s),i+900)])
        start=i+len(ph)
        if len(arr)>=8: break
    out[ph]=arr
Path("audit/home-v51-structure-inspect.json").write_text(json.dumps(out,indent=2),encoding="utf-8")
print(json.dumps({k:len(v) for k,v in out.items()}))
