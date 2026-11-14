"""Install the approved Batch 04 WebP banners by exact Global Conflict card title."""
from pathlib import Path
import html
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets/images/timeline'
page = ROOT / 'timeline/index.html'
records = []
for part, span in [(1, '71-78'), (2, '79-86')]:
    archive = ROOT / f'ETP_Timeline_Batch_04_Part_{part}_Global_Conflict_{span}.zip'
    with zipfile.ZipFile(archive) as zipped:
        guide = next(n for n in zipped.namelist() if n.endswith('/placement.json'))
        prefix = guide.rsplit('/', 1)[0] + '/'
        for row in json.loads(zipped.read(guide)):
            data = zipped.read(prefix + row['web_file'])
            assert data[:4] == b'RIFF' and data[8:12] == b'WEBP'
            assert len(data) < 400_000
            filename = Path(row['web_file']).name
            (DEST / filename).write_bytes(data)
            records.append({'number': row['number'], 'title': row['title'], 'file': filename, 'bytes': len(data)})
assert [r['number'] for r in records] == list(range(71, 87))
by_title = {r['title']: r for r in records}
source = page.read_text()
section = re.search(r'<section class="era" id="conflict">.*?(?=<section class="era" id="contemporary">)', source, re.S)
assert section
installed = []
def replace_card(match):
    card = match.group()
    title = html.unescape(re.search(r'<h3>(.*?)</h3>', card, re.S)[1])
    record = by_title[title]
    visual = ('<div class="visual timeline-illustration">'
              f'<img src="../assets/images/timeline/{record["file"]}" '
              f'alt="Historical illustration for {html.escape(title, quote=True)}" '
              'width="1800" height="600" loading="lazy" decoding="async"/></div>')
    card, count = re.subn(r'<div class="visual(?: timeline-illustration)?">.*?</div>(?:</div>)?(?=<div class="event-body">)', visual, card, count=1, flags=re.S)
    assert count == 1, title
    installed.append(title)
    return card
updated = re.sub(r'<article\b[^>]*>.*?</article>', replace_card, section[0], flags=re.S)
assert installed == [r['title'] for r in records], installed
page.write_text(source[:section.start()] + updated + source[section.end():])
placement = DEST / 'placement.json'
catalog = json.loads(placement.read_text())
catalog['images'] = sorted([r for r in catalog['images'] if r['number'] not in range(71, 87)] + records, key=lambda r: r['number'])
catalog['artwork'] = 'Approved cinematic batches 1–4; exact-title placement'
placement.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + '\n')
print(f'Installed {len(installed)} Global Conflict banners, {sum(r["bytes"] for r in records):,} bytes total; lazy-loaded 1800x600 WebP.')
