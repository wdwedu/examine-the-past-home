from pathlib import Path
import json,re
pages=list(Path(".").rglob("*.html"))
report={"html_pages":len(pages),"missing_shell":[],"old_shell_versions":[],"github_preview_refs":[],"placeholder_hrefs":[],"missing_footer_hooks":[],"teacher_tool_routes":[]}
for p in pages:
    s=p.read_text(encoding="utf-8",errors="ignore")
    path=p.as_posix()
    # Universal shell can be standard site-shell.js or game shell placeholders.
    has_standard="site-shell.js" in s
    has_game=("game-shell-nav" in s and "game-shell-footer" in s) or ("games/assets/site-shell.js" in s)
    if not (has_standard or has_game):
        report["missing_shell"].append(path)
    for m in re.finditer(r'(?:\.\./)*assets/site-shell\.js\?v=(\d+)',s):
        if m.group(1)!="61": report["old_shell_versions"].append({"page":path,"version":m.group(1)})
    for pat in ["https://wdwedu.github.io/examine-the-past-home/","/examine-the-past-home/"]:
        if pat in s: report["github_preview_refs"].append({"page":path,"pattern":pat})
    if 'href="#"' in s: report["placeholder_hrefs"].append(path)
    if path.startswith("teacher-tools/") and path.endswith("index.html"):
        report["teacher_tool_routes"].append(path)
Path("audit/master-integration-v61.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
print(json.dumps({k:(len(v) if isinstance(v,list) else v) for k,v in report.items()},indent=2))
