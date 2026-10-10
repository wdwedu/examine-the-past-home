from pathlib import Path
import re

p=Path("teacher-tools/learning-styles/index.html")
s=p.read_text(encoding="utf-8",errors="ignore")

patch='''\n<!-- Examine the Past Learner Supports integration v58 -->\n<link rel="stylesheet" href="../../assets/site-shell.css?v=58">\n<style id="etp-learning-shell-v58">\nhtml,body{background:#000!important}\n#etpSiteHeader{position:sticky!important;top:0!important;z-index:2147483000!important}\n/* Tool-specific navigation stays inside the application and scrolls beneath the global shell. */\nbody>nav:not(.etp-icon-nav),main>nav,.tool-nav,.toolbar,.app-nav,.local-nav{position:relative!important;top:auto!important}\n#etpSiteFooter{margin-top:0!important}\n</style>\n'''
if "etp-learning-shell-v58" not in s:
    if "</head>" in s:s=s.replace("</head>",patch+"</head>",1)
    else:s=patch+s

shell='<script src="../../assets/site-shell.js?v=58" data-etp-root="../../"></script>'
if "site-shell.js" not in s:
    if "</body>" in s:s=s.replace("</body>",shell+"\\n</body>",1)
    else:s+=shell

# Reframe the browser title while preserving the original tool content.
s=re.sub(r"<title>.*?</title>","<title>Learner Supports & Learning Styles | Examine the Past</title>",s,count=1,flags=re.I|re.S)

# Remove old preview-domain references if embedded.
s=s.replace("https://wdwedu.github.io/examine-the-past-home/","https://examinethepast.com/")
s=s.replace("/examine-the-past-home/teacher-tools/learning-styles/","/teacher-tools/learning-styles/")

p.write_text(s,encoding="utf-8")

info=[
"# Learner Supports / Learning Styles Integration v58",
"",
f"- Imported bytes: {p.stat().st_size}",
f"- Has universal header/footer shell: {'site-shell.js?v=58' in s}",
f"- Source preserved as large self-contained application: {p.stat().st_size > 12000000}",
"- Tool-local navigation remains inside the application and scrolls beneath the universal sticky header.",
"- Permanent route: /teacher-tools/learning-styles/"
]
Path("audit/learning-styles-v58.md").write_text("\\n".join(info),encoding="utf-8")
print("\\n".join(info))
