from pathlib import Path
import re,subprocess
for p in Path('.').rglob('*.html'):
 s=p.read_text()
 s=re.sub(r'(assets/(?:site-shell\.js|etp-transitions\.js))\?v=\d+',r'\1?v=65',s)
 p.write_text(s)
subprocess.run(['python','scripts/verify_repair_v64.py'],check=True)
