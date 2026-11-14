"""Install the approved timeline banners from the uploaded, numbered ZIPs."""
from pathlib import Path
import csv
import html
import io
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets/images/timeline'
page = ROOT / 'timeline/index.html'
records = []
for archive in sorted(ROOT.glob('ETP_Timeline_Batch_0[12]_Part_*.zip')):
    with zipfile.ZipFile(archive) as zipped:
        guide = next(n for n in zipped.namelist() if n.endswith('Timeline_Image_Placement_Guide.csv'))
        for row in csv.DictReader(io.StringIO(zipped.read(guide).decode('utf-8-sig'))):
            number = int(row['Timeline display order'])
            title = row.get('Exact section title') or row['Exact timeline section title']
            filename = row.get('WebP filename') or row['Website filename']
            member = next(n for n in zipped.namelist() if n.endswith('/Website_WebP/' + filename))
            data = zipped.read(member)
            assert data[:4] == b'RIFF' and data[8:12] == b'WEBP', filename
            DEST.mkdir(parents=True, exist_ok=True)
            (DEST / filename).write_bytes(data)
            records.append({'number': number, 'title': title, 'file': filename, 'bytes': len(data)})

# Batch 3 contains both seven-image folders, each with an exact-title guide.
final_archive = ROOT / 'ETP_Timeline_Batch_03_All_14_Images_87-100.zip'
expected_numbers = list(range(1, 21))
if final_archive.is_file():
    with zipfile.ZipFile(final_archive) as zipped:
        guides = sorted(n for n in zipped.namelist() if n.endswith('/placement.json'))
        assert len(guides) == 2, 'Expected both final-section placement guides'
        for guide in guides:
            prefix = guide.rsplit('/', 1)[0] + '/'
            for row in json.loads(zipped.read(guide)):
                member = prefix + row['web_file']
                filename = Path(member).name
                data = zipped.read(member)
                assert data[:4] == b'RIFF' and data[8:12] == b'WEBP', filename
                DEST.mkdir(parents=True, exist_ok=True)
                (DEST / filename).write_bytes(data)
                records.append({'number': row['timeline_position'], 'title': row['title'],
                                'file': filename, 'bytes': len(data)})
    expected_numbers += list(range(87, 101))

# Final approved Early Modern / Revolutions banners (uploaded as three ZIPs).
# Match both the stable display position and the exact title-derived filename.
catalog = json.loads((ROOT / 'timeline/media/deeper-learning.json').read_text())
for first, last, batch in [(43, 52, 1), (53, 62, 2), (63, 70, 3)]:
    archive = ROOT / f'ETP_Timeline_Batch_{batch:02}_{first:03}-{last:03}.zip'
    if not archive.is_file():
        continue
    with zipfile.ZipFile(archive) as zipped:
        members = [n for n in zipped.namelist() if n.endswith('.webp')]
        assert len(members) == last - first + 1, archive
        for number in range(first, last + 1):
            title = catalog['topics'][number - 1]['cardTitle']
            slug = re.sub(r'[^A-Za-z0-9]+', '_', title).strip('_')
            filename = f'{number:03}_{slug}.webp'
            member = next(n for n in members if Path(n).name == filename)
            data = zipped.read(member)
            assert data[:4] == b'RIFF' and data[8:12] == b'WEBP' and len(data) < 1_000_000, filename
            DEST.mkdir(parents=True, exist_ok=True)
            (DEST / filename).write_bytes(data)
            records.append({'number': number, 'title': title, 'file': filename, 'bytes': len(data)})
    expected_numbers += list(range(first, last + 1))
expected_numbers.sort()

records.sort(key=lambda item: item['number'])
assert [r['number'] for r in records] == expected_numbers, 'Missing or duplicate approved timeline artwork'
by_title = {r['title']: r for r in records}
assert len(by_title) == len(expected_numbers)
source = page.read_text()
installed = []
def replace_article(match):
    article = match.group()
    heading = re.search(r'<h3>(.*?)</h3>', article, re.S)
    title = html.unescape(re.sub('<[^>]+>', '', heading[1])) if heading else ''
    record = by_title.get(title)
    if not record:
        return article
    image = ('<div class="visual timeline-illustration">'
             f'<img src="../assets/images/timeline/{html.escape(record["file"], quote=True)}" '
             f'alt="Illustration for {html.escape(title, quote=True)}" '
             'width="1800" height="600" loading="lazy" decoding="async"/>'
             '</div>')
    article, count = re.subn(r'<div class="visual(?: timeline-illustration)?">.*?</div>(?:</div>)?(?=<div class="event-body">)', image, article, count=1, flags=re.S)
    assert count == 1, title
    installed.append(title)
    return article

source = re.sub(r'<article\b[^>]*>.*?</article>', replace_article, source, flags=re.S)
assert len(installed) == len(expected_numbers), installed
css = '''/* Approved cinematic timeline artwork; retain the existing responsive card height. */
.timeline-illustration img{display:block;width:100%;height:100%;object-fit:cover;object-position:center}
'''
if css not in source:
    source = source.replace('.event-body{', css + '.event-body{', 1)
page.write_text(source)
placement = DEST / 'placement.json'
previous = json.loads(placement.read_text())['images'] if placement.exists() else []
merged = {r['number']: r for r in previous}
merged.update({r['number']: r for r in records})
placement.write_text(json.dumps({'page': '/timeline/', 'artwork': 'Approved cinematic banners; exact-title placement', 'images': sorted(merged.values(), key=lambda r: r['number'])}, indent=2) + '\n')
print(f'Installed {len(installed)} banners; total WebP bytes: {sum(r["bytes"] for r in records):,}')
