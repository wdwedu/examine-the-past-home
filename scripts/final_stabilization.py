from pathlib import Path
import re

def read(p): return Path(p).read_text(encoding="utf-8")
def write(p,s):
    Path(p).parent.mkdir(parents=True,exist_ok=True)
    Path(p).write_text(s,encoding="utf-8")

# Universal shell: replace nonexistent home-fragment footer links with real destinations.
p="assets/site-shell.js"; s=read(p)
s=s.replace('href="\${href(\'\')}#current-events"','href="\${href(\'current-events/\')}"')
s=s.replace('href="\${href(\'\')}#careers"','href="\${href(\'careers/\')}"')
s=s.replace('href="\${href(\'\')}#licensing"','href="\${href(\'licensing/\')}"')
s=s.replace('href="\${href(\'\')}#faq"','href="\${href(\'faq/\')}"')
s=s.replace('href="\${href(\'\')}#contact"','href="\${href(\'\')}#contact-section"')
write(p,s)

# Add premium transitions to collection routes.
for p,transition in [
 ("lessons/black-history-heroes/index.html","ink"),
 ("lessons/world-religions/index.html","mosaic"),
 ("lessons/social-studies-mini-labs/index.html","page")
]:
    s=read(p)
    s=re.sub(r'<a class="([^"]*\b(?:card|collection-card)[^"]*)" href="([^"]+)"(?![^>]*data-etp-transition)',rf'<a class="\1" href="\2" data-etp-transition="{transition}"',s)
    write(p,s)

# Replace dead staging anchors with non-clickable cards.
replacements={
"maps/index.html":(
'<a class="card" href="#"><span class="tag">Maps</span><h2>Interactive History Maps</h2><p>Historical geography, borders, migration, conflict, trade, and change over time.</p><span class="btn">Google Sites content migration next</span></a>',
'<article class="card"><span class="tag">Maps • Migration Remaining</span><h2>Interactive History Maps</h2><p>The permanent route is established. The full interactive map library still needs its Google Sites content migrated and rebuilt here.</p><span class="btn" aria-disabled="true">Not Yet Live</span></article>'
),
"today/index.html":(
'<a class="card" href="#"><span class="tag">Today</span><h2>Daily History</h2><p>The Google Sites daily-history content will be migrated here.</p><span class="btn">Migration staging</span></a>',
'<article class="card"><span class="tag">Today • Migration Remaining</span><h2>Daily History</h2><p>The permanent route is established. The daily event feed/content still needs migration into the GitHub experience.</p><span class="btn" aria-disabled="true">Not Yet Live</span></article>'
),
"shop/index.html":(
'<a class="card" href="#"><span class="tag">Featured</span><h2>Featured Examine the Past Resources</h2><p>Promote current digital resources and products here.</p><span class="btn">Product connections next</span></a><a class="card" href="#"><span class="tag">Sponsored</span><h2>Sponsored Store Links</h2><p>A clearly labeled area for selected sponsored or affiliate store links.</p><span class="btn">Store connections next</span></a>',
'<article class="card"><span class="tag">Featured</span><h2>Featured Examine the Past Resources</h2><p>The storefront route is ready for the final product catalog, purchase links, and featured resource merchandising.</p><span class="btn" aria-disabled="true">Catalog Connection Pending</span></article><article class="card"><span class="tag">Sponsored</span><h2>Sponsored Store Links</h2><p>This area is reserved for clearly labeled affiliate or sponsored history-related offers once partner links are finalized.</p><span class="btn" aria-disabled="true">Partner Links Pending</span></article>'
),
"teacher-tools/movies-in-the-classroom/index.html":(
'<a class="card" href="#"><span class="tag">Migration Staging</span><h2>Movies in the Classroom</h2><p>The Google Sites content will be transferred into this permanent route.</p><span class="btn">Content migration next</span></a>',
'<article class="card"><span class="tag">Migration Remaining</span><h2>Movies in the Classroom</h2><p>The permanent educator route is established. The existing long-form Google Sites material still needs to be transferred and modernized here.</p><span class="btn" aria-disabled="true">Content Migration Pending</span></article>'
)}
for p,(old,new) in replacements.items():
    s=read(p).replace(old,new)
    write(p,s)

# Map Quest family hub fixes a previously broken maps -> game-family destination.
mapquest='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Map Quest | History Unlocked | Examine the Past</title><link rel="stylesheet" href="../../assets/site-shell.css?v=46"><link rel="stylesheet" href="../../assets/etp-section.css"><link rel="stylesheet" href="../../assets/etp-transitions.css"></head><body><main class="wrap"><section class="hero"><div class="eyebrow">History Unlocked • Geography Games</div><h1>Map Quest</h1><p>Use geography as evidence. Choose a map challenge and connect location, movement, terrain, trade, settlement, empire, and conflict.</p></section><section class="grid">
<a class="card" href="empire-mapper/" data-etp-transition="map"><span class="tag">Map Quest</span><h2>Empire Mapper</h2><p>Identify territories and explain how geography shaped empires.</p><span class="btn">Play</span></a>
<a class="card" href="colonies-challenge/" data-etp-transition="map"><span class="tag">Map Quest</span><h2>Colonies Challenge</h2><p>Locate colonies and connect them to trade, settlement, and conflict.</p><span class="btn">Play</span></a>
<a class="card" href="trade-routes-quest/" data-etp-transition="map"><span class="tag">Map Quest</span><h2>Trade Routes Quest</h2><p>Trace routes that moved goods, ideas, technologies, and people.</p><span class="btn">Play</span></a>
<a class="card" href="battlefields-quest/" data-etp-transition="map"><span class="tag">Map Quest</span><h2>Battlefields Quest</h2><p>Investigate why terrain and distance mattered in conflict.</p><span class="btn">Play</span></a>
<a class="card" href="migration-paths/" data-etp-transition="map"><span class="tag">Map Quest</span><h2>Migration Paths</h2><p>Follow population movements through push-pull factors and geography.</p><span class="btn">Play</span></a>
<a class="card" href="ancient-civilizations-map-hunt/" data-etp-transition="map"><span class="tag">Map Quest</span><h2>Ancient Civilizations Map Hunt</h2><p>Use rivers, climate, and landforms to identify ancient societies.</p><span class="btn">Play</span></a>
</section></main><script src="../../assets/etp-transitions.js"></script><script src="../../assets/site-shell.js?v=46" data-etp-root="../../"></script></body></html>'''
write("games/map-quest/index.html",mapquest)

def institutional(title,kicker,intro,body):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} | Examine the Past</title><link rel="stylesheet" href="../assets/site-shell.css?v=46"><link rel="stylesheet" href="../assets/etp-section.css"><link rel="stylesheet" href="../assets/etp-transitions.css"></head><body><main class="wrap"><section class="hero"><div class="eyebrow">{kicker}</div><h1>{title}</h1><p>{intro}</p></section>{body}</main><script src="../assets/etp-transitions.js"></script><script src="../assets/site-shell.js?v=46" data-etp-root="../"></script></body></html>'''

write("faq/index.html",institutional("Frequently Asked Questions","Site Guide","Quick answers about lessons, games, sources, classroom use, and site access.",'''<section class="block"><details open><summary>Are the lessons free to use?</summary><p>Current public lessons and games can be explored through the site. Individual downloadable products or licensed resources may have separate terms.</p></details><details><summary>How are historical claims sourced?</summary><p>Lessons are designed around reputable historical references, archives, museums, government collections, and clearly identified public-domain or licensed visual sources.</p></details><details><summary>Can teachers use the activities in class?</summary><p>Yes for normal classroom instruction through the site. Redistribution, resale, or republishing of original Examine the Past materials requires permission or an applicable license.</p></details><details><summary>Are World Religions lessons devotional?</summary><p>No. The World Religions curriculum uses a historical and comparative academic approach and distinguishes belief narratives from historically verifiable claims.</p></details><details><summary>Where should I report a broken page?</summary><p>Use the Contact Us section on the Examine the Past homepage and include the page or game name.</p></details></section>'''))

write("licensing/index.html",institutional("Resource Licensing","Institutional Use","A clear destination for schools, organizations, publishers, and partners interested in broader use of Examine the Past materials.",'''<section class="grid"><article class="card"><span class="tag">Schools & Districts</span><h2>Instructional Licensing</h2><p>Expanded classroom, school, district, LMS, or training use can be structured separately from ordinary public-site access.</p></article><article class="card"><span class="tag">Publishers & Platforms</span><h2>Content Partnerships</h2><p>Selected lessons, games, interactive engines, and curriculum systems may be considered for licensing or partnership opportunities.</p></article><article class="card"><span class="tag">Business Inquiry</span><h2>Start a Conversation</h2><p>Use the Contact Us section on the homepage and identify the organization, intended use, audience size, and material of interest.</p></article></section>'''))

write("careers/index.html",institutional("Careers & Partnerships","Work With Examine the Past","A central destination for educational, content, distribution, sponsorship, and strategic partnership inquiries.",'''<section class="grid"><article class="card"><span class="tag">Partnerships</span><h2>Education & Distribution</h2><p>We are open to conversations involving schools, education platforms, publishers, museums, archives, and distribution partners where the fit supports strong history learning.</p></article><article class="card"><span class="tag">Contributors</span><h2>Subject Expertise</h2><p>Future expansion can include historians, educators, curriculum reviewers, artists, developers, and source specialists.</p></article><article class="card"><span class="tag">Contact</span><h2>Business Inquiries</h2><p>Use the Contact Us area on the homepage and include the purpose, organization, and proposed collaboration.</p></article></section>'''))

write("current-events/index.html",institutional("Current Events","History Meets the Present","A future-facing destination connecting present-day developments to historical context without turning Examine the Past into a breaking-news site.",'''<section class="grid"><a class="card" href="../timeline/" data-etp-transition="timeline"><span class="tag">Context</span><h2>Trace the Background</h2><p>Use the Interactive Timeline to place present-day issues inside longer historical developments.</p><span class="btn">Open Timeline</span></a><a class="card" href="../lessons/world-history/" data-etp-transition="globe"><span class="tag">World History</span><h2>Build Historical Context</h2><p>Use World History lessons to explore the institutions, conflicts, movements, and ideas behind current issues.</p><span class="btn">Open World History</span></a><article class="card"><span class="tag">Editorial Expansion</span><h2>Curated Current-Events Briefs</h2><p>A recurring, sourced current-events briefing system remains a product-expansion opportunity rather than an unfinished broken feature.</p><span class="btn" aria-disabled="true">Expansion Opportunity</span></article></section>'''))

print("Final stabilization patches applied.")
