from pathlib import Path
from html.parser import HTMLParser
import subprocess,tempfile,urllib.parse,os
root=Path('.');errors=[];checked=0;broken=[]
class P(HTMLParser):
 def __init__(self,f):super().__init__();self.f=f;self.in_script=False;self.buf='';self.script_no=0
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='script' and 'src' not in d:self.in_script=True;self.buf=''
  key='src' if t in ['script','img','audio','source'] else 'href' if t=='link' else None
  if key and key in d:
   u=d[key]
   if u.startswith(('http:','https:','data:','//','#')):return
   path=urllib.parse.unquote(u.split('?')[0].split('#')[0]);dest=root/path.lstrip('/') if path.startswith('/') else self.f.parent/path
   if path and not dest.exists():broken.append((str(self.f),u))
 def handle_data(self,d):
  if self.in_script:self.buf+=d
 def handle_endtag(self,t):
  global checked
  if t=='script' and self.in_script:
   self.in_script=False;self.script_no+=1;check(self.buf,str(self.f)+' inline '+str(self.script_no))
def check(s,label):
 global checked
 with tempfile.NamedTemporaryFile(suffix='.js',mode='w') as f:
  f.write(s);f.flush();r=subprocess.run(['node','--check',f.name],capture_output=True,text=True);checked+=1
  if r.returncode:errors.append((label,r.stderr[-1000:]))
for p in root.rglob('*.js'):check(p.read_text(),str(p))
for p in root.rglob('*.html'):P(p).feed(p.read_text())
print('JS checked',checked,'syntax failures',len(errors),'missing assets',len(broken));print('errors',errors[:15]);print('broken',broken[:20])
for name in ['index.html','timeline/index.html']:print(name,'bytes',len((root/name).read_bytes()))
Path('audit/repair-v64-verification.json').write_text(__import__('json').dumps({'js_checked':checked,'syntax_errors':errors,'missing_assets':broken},indent=2))

assert not errors and not broken, (errors,broken)
