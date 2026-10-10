from pathlib import Path
import re

p=Path("teacher-tools/classroom-management/index.html")
s=p.read_text(encoding="utf-8",errors="ignore")

patch='''\n<!-- Examine the Past Classroom Management integration v57 -->\n<link rel="stylesheet" href="../../assets/site-shell.css?v=57">\n<style id="etp-classroom-shell-v57">\nhtml,body{background:#000!important}\n#etpSiteHeader{position:sticky!important;top:0!important;z-index:2147483000!important}\n/* Tool-local controls remain part of the Classroom Management experience and scroll beneath the global shell. */\nbody>nav:not(.etp-icon-nav),main>nav,.tool-nav,.toolbar,.app-nav,.local-nav{position:relative!important;top:auto!important}\n#etpSiteFooter{margin-top:0!important}\n</style>\n'''
if "etp-classroom-shell-v57" not in s:
    if "</head>" in s:s=s.replace("</head>",patch+"</head>",1)
    else:s=patch+s

shell='<script src="../../assets/site-shell.js?v=57" data-etp-root="../../"></script>'
if "site-shell.js" not in s:
    if "</body>" in s:s=s.replace("</body>",shell+"\\n</body>",1)
    else:s+=shell

# Remove old Examine the Past GitHub-preview root if embedded anywhere.
s=s.replace("https://wdwedu.github.io/examine-the-past-home/","https://examinethepast.com/")
s=s.replace("/examine-the-past-home/teacher-tools/classroom-management/","/teacher-tools/classroom-management/")

p.write_text(s,encoding="utf-8")

# Small audit record for future maintenance.
text=p.read_text(encoding="utf-8",errors="ignore")
info=[
"# Classroom Management Integration v57",
"",
f"- Imported bytes: {p.stat().st_size}",
f"- Has universal header shell: {'site-shell.js?v=57' in text}",
f"- Source remains self-contained: {p.stat().st_size > 7000000}",
"- Local tool navigation remains inside the tool and is not made globally sticky.",
"- Permanent route: /teacher-tools/classroom-management/"
]
Path("audit/classroom-management-v57.md").write_text("\\n".join(info),encoding="utf-8")
print("\\n".join(info))
