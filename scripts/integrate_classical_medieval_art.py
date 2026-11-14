"""Install approved Batch 05 banners by exact timeline title and position."""
from pathlib import Path
import hashlib
import html
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets/images/timeline'
page = ROOT / 'timeline/index.html'
records = []
assets = {}
for part, era, span in [(1, 'Classical_World', '21-29'), (2, 'Medieval_Worlds', '30-36'), (3, 'Medieval_Worlds', '37-42')]:
    archive = ROOT / f'ETP_Timeline_Batch_05_Part_{part}_{era}_{span}.zip'
    with zipfile.ZipFile(archive) as zipped:
        guide = next(n for n in zipped.namelist() if n.endswith('/placement.json'))
        prefix = guide.rsplit('/', 1)[0] + '/'
        for row in json.loads(zipped.read(guide)):
            data = zipped.read(prefix + row['web_file'])
            assert data[:4] == b'RIFF' and data[8:12] == b'WEBP'
            assert len(data) == row['web_bytes'] < 500_000
            assert hashlib.sha256(data).hexdigest() == row['sha256']
            filename = Path(row['web_file']).name
            assets[filename] = data
            records.append({'number': row['number'], 'title': row['title'], 'file': filename, 'bytes': len(data)})
assert [r['number'] for r in records] == list(range(21, 43))
by_title = {r['title']: r for r in records}
assert len(by_title) == 22
source = page.read_text()
installed = []
card_number = 0
def replace_card(match):
    global card_number
    card = match.group()
    if 'class="event' not in card:
        return card
    card_number += 1
    heading = re.search(r'<h3>(.*?)</h3>', card, re.S)
    title = html.unescape(heading[1]) if heading else ''
    record = by_title.get(title)
    if not record:
        return card
    assert card_number == record['number'], (card_number, record)
    visual = ('<div class="visual timeline-illustration">'
              f'<img src="../assets/images/timeline/{record["file"]}" '
              f'alt="Historical illustration for {html.escape(title, quote=True)}" '
              'width="1800" height="600" loading="lazy" decoding="async"/></div>')
    card, count = re.subn(r'<div class="visual(?: timeline-illustration)?">.*?</div>(?:</div>)?(?=<div class="event-body">)', visual, card, count=1, flags=re.S)
    assert count == 1, title
    installed.append(title)
    return card
updated = re.sub(r'<article\b[^>]*>.*?</article>', replace_card, source, flags=re.S)
assert installed == [r['title'] for r in records], installed
assert card_number == 100
for filename, data in assets.items():
    (DEST / filename).write_bytes(data)
page.write_text(updated)
placement = DEST / 'placement.json'
catalog = json.loads(placement.read_text())
catalog['images'] = sorted([r for r in catalog['images'] if r['number'] not in range(21, 43)] + records, key=lambda r: r['number'])
catalog['artwork'] = 'Approved cinematic batches 1–5; exact-title placement'
placement.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + '\n')
print(f'Installed {len(installed)} banners, {sum(r["bytes"] for r in records):,} bytes total; lazy-loaded 1800x600 WebP.')
