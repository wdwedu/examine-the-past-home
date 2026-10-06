from pathlib import Path
from PIL import Image
import sys

INBOX=Path("assets/legacy-images-inbox")
OUT=Path("assets/legacy-images")
OUT.mkdir(parents=True,exist_ok=True)

MAX_W=1400
QUALITY=68
count=0
saved=0

if not INBOX.exists():
    print("No legacy image inbox yet.")
    sys.exit(0)

for p in INBOX.rglob("*"):
    if not p.is_file() or p.suffix.lower() not in {".jpg",".jpeg",".png",".webp"}:
        continue
    try:
        im=Image.open(p)
        if im.mode not in ("RGB","RGBA"):
            im=im.convert("RGBA" if "A" in im.getbands() else "RGB")
        if im.width>MAX_W:
            h=round(im.height*(MAX_W/im.width))
            im=im.resize((MAX_W,h),Image.Resampling.LANCZOS)
        rel=p.relative_to(INBOX).with_suffix(".webp")
        dest=OUT/rel
        dest.parent.mkdir(parents=True,exist_ok=True)
        before=p.stat().st_size
        im.save(dest,"WEBP",quality=QUALITY,method=6)
        after=dest.stat().st_size
        count+=1
        saved+=max(0,before-after)
        print(f"{p} -> {dest}: {before} -> {after} bytes")
    except Exception as e:
        print("SKIP",p,e)
print("optimized",count,"images; bytes saved",saved)
