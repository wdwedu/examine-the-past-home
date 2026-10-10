from pathlib import Path
import re
p=Path("teacher-tools/blooms-taxonomy/index.html")
s=p.read_text(encoding="utf-8",errors="ignore")
patch='''\n<!-- Examine the Past Bloom's Taxonomy integration v60 -->\n<link rel="stylesheet" href="../../assets/site-shell.css?v=60">\n<style id="etp-blooms-shell-v60">\nhtml,body{background:#000!important}\n#etpSiteHeader{position:sticky!important;top:0!important;z-index:2147483000!important}\nbody>nav:not(.etp-icon-nav),main>nav,.tool-nav,.toolbar,.app-nav,.local-nav{position:relative!important;top:auto!important}\n#etpSiteFooter{margin-top:0!important}\n</style>\n'''
if "etp-blooms-shell-v60" not in s:
    s=s.replace("</head>",patch+"</head>",1) if "</head>" in s else patch+s
shell='<script src="../../assets/site-shell.js?v=60" data-etp-root="../../"></script>'
if "site-shell.js" not in s:
    s=s.replace("</body>",shell+"\\n</body>",1) if "</body>" in s else s+shell
s=s.replace("https://wdwedu.github.io/examine-the-past-home/","https://examinethepast.com/")
p.write_text(s,encoding="utf-8")
Path("audit/blooms-v60.md").write_text(f"# Bloom's Taxonomy Integration v60\\n\\n- Imported bytes: {p.stat().st_size}\\n- Universal shell: {'site-shell.js?v=60' in s}\\n- Permanent route: /teacher-tools/blooms-taxonomy/\\n",encoding="utf-8")
print("Bloom's integrated:",p.stat().st_size)
