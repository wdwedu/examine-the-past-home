"""Validate public timeline/media joins and the integrity of factual visual data."""
from pathlib import Path
from html.parser import HTMLParser
import json
import re

ROOT = Path(__file__).resolve().parents[1]


class Timeline(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inside = False
        self.heading = False
        self.card = None
        self.cards = []
        self.legacy_footer = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main' and 'timeline' in attrs.get('class', '').split():
            self.inside = True
        if tag == 'footer' and attrs.get('id') == 'site-footer':
            self.legacy_footer = True
        if self.inside and tag == 'article':
            self.card = {'title': '', 'button': False}
            self.cards.append(self.card)
        if self.card is not None and tag == 'h3':
            self.heading = True
        if self.card is not None and tag == 'button' and 'explore' in attrs.get('class', '').split():
            assert 'data-chart' not in attrs, 'Unmeasured legacy score chart'
            self.card['button'] = True

    def handle_data(self, data):
        if self.heading:
            self.card['title'] += data

    def handle_endtag(self, tag):
        if tag == 'h3':
            self.heading = False
        if tag == 'article':
            self.card = None
        if tag == 'main':
            self.inside = False


page = Timeline()
page.feed((ROOT / 'timeline/index.html').read_text())
catalog = json.loads((ROOT / 'timeline/media/deeper-learning.json').read_text())
assert len(page.cards) == len(catalog['topics']) == 100
assert not page.legacy_footer
references = set()
for number, (card, topic) in enumerate(zip(page.cards, catalog['topics']), 1):
    assert card['button'] and card['title'] == topic['cardTitle'], (number, card)
    assert topic['number'] == number and topic['videoIds']
    references.update(topic['videoIds'])
    assert all(topic.get(key) for key in ('why', 'evidence', 'context', 'question', 'sources'))
    assert len(topic['visual']['nodes']) >= 3
    for source in topic['sources']:
        assert source['title'] and source['url'].startswith('https://')
    visual = topic['visual']
    if visual['kind'] == 'bars':
        assert visual['unit'] and visual['note'] and topic['sources']
        assert len(visual['values']) == len(visual['nodes'])
        assert all(0 <= value <= visual['maximum'] for value in visual['values'])
    if 'map' in topic:
        m = topic['map']
        assert m['note'] and m['source'] and len(m['points']) >= 3
        for point in m['points']:
            assert -180 <= point['lon'] <= 180 and -90 <= point['lat'] <= 90
assert references == set(catalog['videos']), 'Unreferenced or missing media entry'
for key, video in catalog['videos'].items():
    assert video['title'] and video['publisher'] and video['verified_on']
    if video.get('provider') == 'brightcove':
        assert video['embedUrl'].startswith('https://players.brightcove.net/')
        assert video['watchUrl'].startswith('https://www.911memorial.org/')
    else:
        assert re.fullmatch(r'[A-Za-z0-9_-]{11}', video['id'])
print(f"PASS: 100 exact-title pop-ups; {len(references)} verified video entries; 100 visuals; one shared footer")
