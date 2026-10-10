from pathlib import Path
import re

p=Path("timeline/index.html")
s=p.read_text(encoding="utf-8",errors="ignore")

# Preserve the timeline application itself; only add the Examine the Past shell.
head_patch='''\n<!-- Examine the Past universal shell integration v54 -->\n<link rel="stylesheet" href="../assets/site-shell.css?v=54">\n<style id="etp-timeline-shell-v54">\nhtml,body{background:#000!important}\n#etpSiteHeader{position:sticky!important;top:0!important;z-index:2147483000!important}\n/* A timeline-specific navigation/control bar belongs to the page, not the global shell. */\nbody>nav:not(.etp-icon-nav),main>nav,.timeline-nav,.timeline-controls,.toolbar{position:relative!important;top:auto!important}\n#etpSiteFooter{margin-top:0!important}\n</style>\n'''
if "etp-timeline-shell-v54" not in s:
    if "</head>" in s:
        s=s.replace("</head>",head_patch+"</head>",1)
    else:
        s=head_patch+s

shell='<script src="../assets/site-shell.js?v=54" data-etp-root="../"></script>'
if "site-shell.js" not in s:
    if "</body>" in s:
        s=s.replace("</body>",shell+"\n</body>",1)
    else:
        s+=shell

# Remove old hard-coded GitHub preview prefix if it appears in links generated inside the timeline.
s=s.replace('https://wdwedu.github.io/examine-the-past-home/','https://examinethepast.com/')
p.write_text(s,encoding="utf-8")
print("Integrated existing Interactive Timeline into Examine the Past universal shell.")
