from pathlib import Path

p = Path("index.html")
html = p.read_text(encoding="utf-8")
games_url = "https://wdwedu.github.io/examine-the-past-home/games/"

blooms = """<a class="nav-item image-nav" href="https://www.examinethepast.com/resources/blooms-taxonomy" rel="noopener" target="_blank">
<span class="nav-label">Bloom's</span>
<span class="emoji-icon blooms-symbol">▲</span>
</a>"""

games = blooms + f"""
<a class="nav-item image-nav" href="{games_url}" rel="noopener">
<span class="nav-label">Games</span>
<span aria-hidden="true" class="emoji-icon">🎮</span>
</a>"""

if '<span class="nav-label">Games</span>' not in html:
    if blooms not in html:
        raise SystemExit("Bloom navigation block not found; refusing unsafe patch.")
    html = html.replace(blooms, games, 1)

old_star = """<a aria-label="Classroom Management" class="nav-star st3" href="https://www.examinethepast.com/resources/classroom-management" rel="noopener" target="_blank"><i aria-hidden="true"></i><span>Classroom Management</span></a>"""
new_star = f"""<a aria-label="Games" class="nav-star st3" href="{games_url}" rel="noopener"><i aria-hidden="true"></i><span>Games</span></a>"""

if old_star in html:
    html = html.replace(old_star, new_star, 1)
elif 'aria-label="Games" class="nav-star st3"' not in html:
    raise SystemExit("Classroom Management star not found; refusing unsafe patch.")

if '<span class="nav-label">Games</span>' not in html:
    raise SystemExit("Games nav verification failed.")
if 'aria-label="Games" class="nav-star st3"' not in html:
    raise SystemExit("Games star verification failed.")

p.write_text(html, encoding="utf-8")
print("Build 1 navigation patch verified.")
