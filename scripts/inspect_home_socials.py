from pathlib import Path
import re, json
s=Path("index.html").read_text(encoding="utf-8",errors="ignore")
urls=sorted(set(re.findall(r'https?://[^"\'<>\s)]+',s)))
keep=[u for u in urls if any(k in u.lower() for k in ["facebook","instagram","pinterest","etsy","redbubble","zazzle","youtube","twitter.com","x.com","blogger","teacherspayteachers"])]
Path("audit").mkdir(exist_ok=True)
Path("audit/home-social-urls.json").write_text(json.dumps(keep,indent=2),encoding="utf-8")
print(json.dumps(keep,indent=2))
