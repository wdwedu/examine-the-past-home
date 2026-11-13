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
(DEST / 'placement.json').write_text(json.dumps({'page': '/timeline/', 'artwork': 'Approved cinematic batches 1, 2, and available final-section artwork', 'images': records}, indent=2) + '\n')
print(f'Installed {len(installed)} banners; total WebP bytes: {sum(r["bytes"] for r in records):,}')
