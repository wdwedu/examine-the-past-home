"""Build crawlable preview pages and stable exact-moment links from approved timeline cards."""
from pathlib import Path
from html.parser import HTMLParser
import html,json,re,unicodedata
ROOT=Path(__file__).resolve().parents[1]
page=ROOT/'timeline/index.html'
class Card(HTMLParser):
 def __init__(self):super().__init__();self.title='';self.description='';self.image='';self.date='';self.capture=''
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if tag=='h3':self.capture='title'
  elif tag=='p':self.capture='description'
  elif tag=='span' and 'date' in d.get('class','').split():self.capture='date'
  if tag=='img' and not self.image:self.image=d.get('src','')
 def handle_endtag(self,tag):
  if tag in ('h3','p','span'):self.capture=''
 def handle_data(self,s):
  if self.capture:setattr(self,self.capture,getattr(self,self.capture)+s)
records=[];slugs=set()
def update(match):
 card=match.group()
 if not re.search(r'class="event(?:\s|\")',card):return card
 c=Card();c.feed(card)
 slug=re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',c.title).encode('ascii','ignore').decode().lower()).strip('-')
 assert slug not in slugs and c.image and c.description,(slug,c.title);slugs.add(slug)
 image=(Path('timeline')/c.image).as_posix();image=re.sub(r'^timeline/\.\./','',image)
 assert (ROOT/image).is_file(),image
 record={'number':len(records)+1,'slug':slug,'title':c.title,'description':c.description,'date':c.date,'image':image}
 records.append(record)
 card=re.sub(r'\sdata-moment="[^"]*"','',card,count=1)
 return card.replace('<article ',f'<article data-moment="{slug}" ',1)
source=re.sub(r'<article\b[^>]*>.*?</article>',update,page.read_text(),flags=re.S)
assert len(records)==100,len(records)
page.write_text(source)
(ROOT/'timeline/media/moment-shares.json').write_text(json.dumps({'version':1,'moments':records},ensure_ascii=False,indent=2)+'\n')
for r in records:
 slug=r['slug'];dest=ROOT/'timeline/moments'/slug;dest.mkdir(parents=True,exist_ok=True)
 url='https://examinethepast.com/timeline/moments/'+slug+'/'
 image='https://examinethepast.com/'+r['image'];title=r['title']+' | Examine the Past';esc=lambda s:html.escape(s,quote=True)
 target='/timeline/#moment='+slug
 document=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title><meta name="description" content="{esc(r['description'])}">
<link rel="canonical" href="{url}"><meta property="og:type" content="article"><meta property="og:site_name" content="Examine the Past">
<meta property="og:title" content="{esc(r['title'])}"><meta property="og:description" content="{esc(r['description'])}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{esc(image)}"><meta property="og:image:type" content="image/webp"><meta property="og:image:width" content="1800"><meta property="og:image:height" content="600"><meta property="og:image:alt" content="Historical illustration for {esc(r['title'])}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(r['title'])}"><meta name="twitter:description" content="{esc(r['description'])}"><meta name="twitter:image" content="{esc(image)}"><meta name="twitter:image:alt" content="Historical illustration for {esc(r['title'])}">
<link rel="icon" href="../../../app-assets/icon-192.png"><link rel="stylesheet" href="../../../assets/site-shell.css?v=20261115-moment-sharing-1">
<style>body{{margin:0;background:#080c09;color:#f4eedc;font:18px/1.65 Georgia,serif}}main{{max-width:900px;margin:40px auto;padding:24px}}h1,a{{color:#ffe800}}img{{width:100%;height:auto;border-radius:14px}}.open-moment{{display:inline-block;padding:12px 18px;background:#ffe800;color:#111;border-radius:8px;font-weight:bold}}</style>
<script>location.replace({json.dumps(target)});</script>
<script defer src="../../../app-assets/install.js?v=20261108-native-menu-v17"></script></head>
<body><main><p>{esc(r['date'])}</p><h1>{esc(r['title'])}</h1><img src="../../../{esc(r['image'])}" width="1800" height="600" alt="Historical illustration for {esc(r['title'])}"><p>{esc(r['description'])}</p><a class="open-moment" href="{target}">Open this moment in the timeline</a></main><script src="../../../assets/site-shell.js?v=20261115-moment-sharing-1" data-etp-root="../../../"></script></body></html>
'''
 (dest/'index.html').write_text(document)
print(f'Built {len(records)} unique preview pages and exact-card routes.')
