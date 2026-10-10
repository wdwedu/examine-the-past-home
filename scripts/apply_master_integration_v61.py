from pathlib import Path
import re,json,os

ROOT=Path(".")
patched_shell=[]
added_shell=[]
share_fallbacks=[]
preview_abs=[]

def rel_root(path:Path):
    # from page directory back to repo root
    depth=len(path.parent.parts)
    return "../"*depth if depth else "./"

for p in ROOT.rglob("*.html"):
    path=p.as_posix()
    if path.startswith("audit/"):
        continue
    s=p.read_text(encoding="utf-8",errors="ignore")

    # Convert absolute legacy preview-domain links to custom-domain links.
    if "https://wdwedu.github.io/examine-the-past-home/" in s:
        s=s.replace("https://wdwedu.github.io/examine-the-past-home/","https://examinethepast.com/")
        preview_abs.append(path)

    # Bump all shell cache versions (standard or game shell references).
    ns=re.sub(r'(site-shell\.css)\?v=\d+',r'\1?v=61',s)
    ns=re.sub(r'(site-shell\.js)\?v=\d+',r'\1?v=61',ns)
    if ns!=s:
        patched_shell.append(path)
        s=ns

    # Add universal standard shell to user-facing lesson pages that have no shell.
    # Game pages deliberately use the dedicated game shell.
    is_lesson=path.startswith("lessons/") and path.endswith("index.html")
    if is_lesson and "site-shell.js" not in s:
        root=rel_root(p)
        css=f'<link rel="stylesheet" href="{root}assets/site-shell.css?v=61">'
        js=f'<script src="{root}assets/site-shell.js?v=61" data-etp-root="{root}"></script>'
        if "</head>" in s:
            s=s.replace("</head>",css+"\n</head>",1)
        else:
            s=css+"\n"+s
        if "</body>" in s:
            s=s.replace("</body>",js+"\n</body>",1)
        else:
            s+="\n"+js
        added_shell.append(path)

    # Replace only dynamic share-link placeholder fallbacks with safe destinations.
    reps=[
      (r'<a([^>]*data-share="facebook"[^>]*)href="#"',r'<a\1href="https://www.facebook.com/"'),
      (r'<a([^>]*data-share="pinterest"[^>]*)href="#"',r'<a\1href="https://www.pinterest.com/"'),
      (r'<a([^>]*data-share="linkedin"[^>]*)href="#"',r'<a\1href="https://www.linkedin.com/"'),
      (r'<a([^>]*data-share="x"[^>]*)href="#"',r'<a\1href="https://x.com/"')
    ]
    before=s
    for pat,repl in reps:
        s=re.sub(pat,repl,s)
    if s!=before: share_fallbacks.append(path)

    p.write_text(s,encoding="utf-8")

# Final shared runtime cache bump.
for sp in [Path("assets/site-shell.js"),Path("games/assets/site-shell.js")]:
    if not sp.exists(): continue
    s=sp.read_text(encoding="utf-8",errors="ignore")
    s=re.sub(r'etp-transitions\.css\?v=\d+','etp-transitions.css?v=61',s)
    s=re.sub(r'etp-transitions\.js\?v=\d+','etp-transitions.js?v=61',s)
    s=re.sub(r'etp-experience-v50\.css\?v=\d+','etp-experience-v50.css?v=61',s)
    s=re.sub(r'etp-experience-v50\.js\?v=\d+','etp-experience-v50.js?v=61',s)
    sp.write_text(s,encoding="utf-8")


# Hard second pass: normalize every remaining site-shell cache reference.
for p in ROOT.rglob("*.html"):
    s=p.read_text(encoding="utf-8",errors="ignore")
    s=re.sub(r'site-shell\.css\?v=\d+','site-shell.css?v=61',s)
    s=re.sub(r'site-shell\.js\?v=\d+','site-shell.js?v=61',s)
    p.write_text(s,encoding="utf-8")

# Validation report (partials excluded from user-facing shell count).
pages=[]
missing=[]
stale=[]
placeholder=[]
legacy_abs=[]
for p in ROOT.rglob("*.html"):
    path=p.as_posix()
    if path in ("games/assets/nav.html","games/assets/footer.html"): continue
    s=p.read_text(encoding="utf-8",errors="ignore")
    pages.append(path)
    standard="site-shell.js" in s
    game=("game-shell-nav" in s and "game-shell-footer" in s) or ("games/assets/site-shell.js" in s)
    if not (standard or game): missing.append(path)
    if re.search(r'site-shell\.(?:js|css)\?v=(?!61\b)\d+',s): stale.append(path)
    if 'href="#"' in s: placeholder.append(path)
    if "https://wdwedu.github.io/examine-the-past-home/" in s: legacy_abs.append(path)

report={
 "user_facing_html_pages":len(pages),
 "shells_added":len(added_shell),
 "shell_versions_refreshed":len(set(patched_shell)),
 "share_fallbacks_cleaned":len(set(share_fallbacks)),
 "absolute_preview_links_converted":len(set(preview_abs)),
 "missing_shell":missing,
 "stale_shell_versions":stale,
 "placeholder_hrefs":placeholder,
 "legacy_absolute_preview_urls":legacy_abs,
 "added_shell_pages":added_shell
}
Path("audit/master-integration-v61-final.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
print(json.dumps({k:(len(v) if isinstance(v,list) else v) for k,v in report.items()},indent=2))
