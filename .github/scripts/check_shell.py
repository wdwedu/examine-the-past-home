"""Catch divergent game shells, missing app support, and broken shared asset paths."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re
ROOT=Path('.').resolve()
class References(HTMLParser):
 def __init__(self):super().__init__();self.scripts=[]
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if tag=='script' and 'src' in d:self.scripts.append(d['src'])
checked=0
for page in ROOT.rglob('*.html'):
 if 'assets' in page.relative_to(ROOT).parts:continue
 parser=References();parser.feed(page.read_text())
 shells=[x for x in parser.scripts if 'assets/site-shell.js' in x]
 assert len(shells)==1,(page,'Expected one shared shell',shells)
 shell=(page.parent/unquote(urlsplit(shells[0]).path)).resolve()
 assert shell==ROOT/'assets/site-shell.js',(page,'Legacy or incorrect game shell',shell)
 installers=[x for x in parser.scripts if 'app-assets/install.js' in x]
 assert len(installers)==1,(page,'Missing or duplicate installation support')
 assert (page.parent/urlsplit(installers[0]).path).resolve()==ROOT/'app-assets/install.js',page
 checked+=1
shell=(ROOT/'assets/site-shell.js').read_text()
for asset in re.findall(r"u\('([^']+\.(?:svg|png|webp))'\)",shell):assert (ROOT/asset).is_file(),asset
assert 'Page lighting' not in (ROOT/'app-assets/site-experience.js').read_text()
assert 'host.append(toggle)' in (ROOT/'app-assets/site-experience.js').read_text()
print(f'PASS: {checked} pages share one header/footer and installer; footer brand assets exist.')
