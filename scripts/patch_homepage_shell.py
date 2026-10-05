from pathlib import Path
import re

INDEX=Path("index.html")
src=INDEX.read_text(encoding="utf-8",errors="ignore")

def matching_div(text,start):
    token=re.compile(r"<div\b[^>]*>|</div>",re.I)
    depth=0
    first=True
    for m in token.finditer(text,start):
        if m.group(0).lower().startswith("<div"):
            depth+=1
        else:
            depth-=1
            if depth==0:
                return m.end()
    raise RuntimeError("matching div not found")

# Shared assets
if "assets/home-expansion.css?v=41" not in src:
    src=src.replace("</head>",'<link rel="stylesheet" href="assets/home-expansion.css?v=41">\n<link rel="stylesheet" href="assets/etp-transitions.css?v=41">\n</head>',1)
if "assets/home-expansion.js?v=41" not in src:
    src=src.replace("</body>",'<script src="assets/etp-transitions.js?v=41"></script>\n<script src="assets/home-expansion.js?v=41"></script>\n</body>',1)

# Exact centered homepage nav, reusing the homepage's own class system.
nav='''<nav aria-label="Primary navigation" class="site-nav final-nav etp-nav-vnext">
<div class="final-nav-inner etp-nav-row">
  <a aria-label="Home" class="nav-item image-nav nav-home" href="#top"><span class="nav-label">Home</span><span aria-hidden="true" class="emoji-icon">🏠</span></a>
  <a aria-label="About" class="nav-item image-nav nav-about" href="#about-us"><span class="nav-label">About</span><span aria-hidden="true" class="emoji-icon">ℹ️</span></a>

  <div class="nav-drop">
    <button aria-expanded="false" class="nav-item image-nav drop-toggle" type="button"><span class="nav-label">History Hub</span><span class="emoji-icon history-emoji">🎓</span></button>
    <div class="drop-menu">
      <a href="#us-history">🇺🇸 U.S. History</a>
      <a href="#world-history">🌍 World History</a>
      <a href="#civics-government">🏛️ Civics &amp; Government</a>
      <a href="#geography">🗺️ Geography</a>
      <a href="#black-history">✊🏾 Black History</a>
      <a href="#world-religions">🕊️ World Religions</a>
    </div>
  </div>

  <a class="nav-item image-nav" href="#timeline"><span class="nav-label">Timeline</span><span class="emoji-icon">⏳</span></a>
  <a class="nav-item image-nav" href="#history-maps"><span class="nav-label">History Maps</span><span class="emoji-icon">🗺️</span></a>
  <a class="nav-item image-nav" href="#today-history"><span class="nav-label">Today in History</span><span class="emoji-icon">📅</span></a>
  <a class="nav-item image-nav" href="#history-unlocked"><span class="nav-label">History Unlocked</span><span class="emoji-icon">🎮</span></a>

  <div class="nav-drop">
    <button aria-expanded="false" class="nav-item image-nav drop-toggle" type="button"><span class="nav-label">Teacher Tools</span><span class="emoji-icon">🧰</span></button>
    <div class="drop-menu">
      <a href="#blooms-taxonomy">🧠 Bloom's Taxonomy</a>
      <a href="#movies-classroom">🎬 Movies in the Classroom</a>
      <a href="#classroom-management">🏫 Classroom Management</a>
      <a href="#learner-supports">👥 Learner Supports</a>
    </div>
  </div>

  <a class="nav-item image-nav" href="#hidden-treasures"><span class="nav-label">Shop History</span><span class="emoji-icon">🛍️</span></a>
  <a class="nav-item image-nav" href="#community"><span class="nav-label">Community</span><span class="emoji-icon community-emoji">👥</span></a>
  <a class="nav-item image-nav" href="#contact-section"><span class="nav-label">Contact Us</span><span class="emoji-icon">📧</span></a>
  <button aria-label="Turn background sound on" class="nav-item image-nav sound-toggle-single" id="soundToggle" type="button"><span class="nav-label" id="soundStatus">Sound</span><span class="sound-emoji">🔊</span></button>
</div>
<div class="nav-glow"></div>
</nav>'''
src,n=re.subn(r'<nav aria-label="Primary navigation" class="site-nav final-nav etp-nav-vnext">.*?</nav>',nav,src,count=1,flags=re.S|re.I)
if n!=1:
    raise RuntimeError(f"nav replacement count={n}")

directory='''<div class="etp-directory" id="etp-directory">
<section class="etp-appetizer" id="about-us"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">About Examine the Past</div><h2>History Built to Be Explored.</h2><p>Examine the Past combines interactive history learning, instructional design, maps, timelines, primary sources, games, and educator tools in one connected experience.</p></div><div class="etp-appetizer-card"><h3>One connected history hub</h3><ul class="etp-appetizer-list"><li>Interactive lessons and inquiry</li><li>Maps, timelines, source analysis, and games</li><li>Teacher tools and classroom resources</li></ul></div></div></section>

<section class="etp-appetizer" id="us-history"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">History Hub</div><h2>🇺🇸 U.S. History</h2><p>Explore American history through eras, turning points, primary sources, inquiry, and interactive lessons—from early America through the modern United States.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="lessons/us-history/" data-etp-transition="page">Explore U.S. History</a></div></div><div class="etp-appetizer-card"><h3>Inside the collection</h3><ul class="etp-appetizer-list"><li>Era and topic collections</li><li>Mini Labs, Full Lessons, Source Labs</li><li>Inquiry and Skill Labs</li></ul></div></div></section>

<section class="etp-appetizer" id="world-history"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">History Hub</div><h2>🌍 World History</h2><p>Study civilizations, exchange, conflict, innovation, empire, revolution, and global change across time and place.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="lessons/world-history/" data-etp-transition="globe">Explore World History</a></div></div><div class="etp-appetizer-card"><h3>Think globally</h3><ul class="etp-appetizer-list"><li>Ancient through modern eras</li><li>Comparative history</li><li>Evidence-centered inquiry</li></ul></div></div></section>

<section class="etp-appetizer" id="civics-government"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">History Hub</div><h2>🏛️ Civics &amp; Government</h2><p>Understand citizenship, rights, law, institutions, elections, constitutional principles, and how people participate in government.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="lessons/civics-government/" data-etp-transition="shutter">Explore Civics &amp; Government</a></div></div><div class="etp-appetizer-card"><h3>Government in action</h3><ul class="etp-appetizer-list"><li>Constitution and institutions</li><li>Rights and responsibilities</li><li>Civic participation and power</li></ul></div></div></section>

<section class="etp-appetizer" id="geography"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">History Hub</div><h2>🗺️ Geography</h2><p>Use maps and spatial thinking to understand location, movement, environment, regions, migration, trade, and historical change.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="lessons/geography/" data-etp-transition="compass">Explore Geography</a></div></div><div class="etp-appetizer-card"><h3>See history spatially</h3><ul class="etp-appetizer-list"><li>Map skills and geographic reasoning</li><li>Migration and movement</li><li>Connections to History Maps</li></ul></div></div></section>

<section class="etp-appetizer" id="black-history"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">History Hub</div><h2>✊🏾 Black History</h2><p>Explore African American history and the African diaspora through culture, resistance, achievement, migration, movements, and historical memory.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="lessons/black-history/" data-etp-transition="ink">Explore Black History</a></div></div><div class="etp-appetizer-card"><h3>Centered as a full collection</h3><ul class="etp-appetizer-list"><li>Dedicated topic and era pathways</li><li>Primary sources and historical voices</li><li>Inquiry, context, and connection</li></ul></div></div></section>

<section class="etp-appetizer" id="world-religions"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">History Hub</div><h2>🕊️ World Religions</h2><p>Study belief systems historically and respectfully, including origins, texts, practices, institutions, change, and relationships with society and power.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="lessons/world-religions/" data-etp-transition="mosaic">Explore World Religions</a></div></div><div class="etp-appetizer-card"><h3>Existing progression preserved</h3><ul class="etp-appetizer-list"><li>Start Here through V8</li><li>Interactive Mini Labs and deeper lessons</li><li>Comparative historical inquiry</li></ul></div></div></section>

<section class="etp-appetizer" id="timeline"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">Explore</div><h2>⏳ Interactive Timeline</h2><p>Trace chronology, turning points, cause and effect, and connections across eras.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="timeline/" data-etp-transition="timeline">Open the Timeline</a></div></div><div class="etp-appetizer-card"><h3>Build chronological thinking</h3><ul class="etp-appetizer-list"><li>Events in context</li><li>Cause and consequence</li><li>Links into lessons and games</li></ul></div></div></section>

<section class="etp-appetizer" id="history-maps"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">Explore</div><h2>🗺️ History Maps</h2><p>Investigate borders, movement, migration, trade, conflict, empire, and change through interactive historical geography.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="maps/" data-etp-transition="map">Explore History Maps</a></div></div><div class="etp-appetizer-card"><h3>Map the past</h3><ul class="etp-appetizer-list"><li>Historical geography</li><li>Spatial evidence</li><li>Connections to Geography and Map Quest</li></ul></div></div></section>

<section class="etp-appetizer" id="today-history"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">Explore</div><h2>📅 Today in History</h2><p>Use today's date as a doorway into people, events, themes, maps, timelines, and related lessons.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="today/" data-etp-transition="timeline">See Today in History</a></div></div><div class="etp-appetizer-card"><h3>A daily history doorway</h3><ul class="etp-appetizer-list"><li>Events and anniversaries</li><li>Related learning paths</li><li>Connections across the site</li></ul></div></div></section>

<section class="etp-appetizer" id="history-unlocked"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">Interactive Games</div><h2>🎮 History Unlocked</h2><p>Turn historical thinking into challenges, mysteries, maps, source analysis, chronology, and immersive games.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="games/" data-etp-transition="time">Enter History Unlocked</a></div></div><div class="etp-appetizer-card"><h3>Learn by doing</h3><ul class="etp-appetizer-list"><li>Time Rush and Map Quest</li><li>Case Files and Source Lab</li><li>Escape and Build the Past experiences</li></ul></div></div></section>

<section class="etp-appetizer" id="teacher-tools"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">Educator Resources</div><h2>🧰 Teacher Tools</h2><p>Move beyond the old Resource Vault into a connected educator section with practical instructional tools and professional resources.</p><div class="etp-teacher-grid">
<a id="blooms-taxonomy" href="teacher-tools/blooms-taxonomy/" data-etp-transition="shutter"><strong>🧠 Bloom's Taxonomy</strong><span>Questioning, objectives, and cognitive demand.</span></a>
<a id="movies-classroom" href="teacher-tools/movies-in-the-classroom/" data-etp-transition="film"><strong>🎬 Movies in the Classroom</strong><span>Use film intentionally in instruction.</span></a>
<a id="classroom-management" href="teacher-tools/classroom-management/" data-etp-transition="page"><strong>🏫 Classroom Management</strong><span>Practical systems for organized learning.</span></a>
<a id="learner-supports" href="teacher-tools/learning-styles/" data-etp-transition="shutter"><strong>👥 Learner Supports</strong><span>Flexible supports and UDL-informed resources.</span></a>
</div><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="teacher-tools/" data-etp-transition="shutter">Explore All Teacher Tools</a></div></div><div class="etp-appetizer-card"><h3>Built for educators</h3><ul class="etp-appetizer-list"><li>Curriculum and lesson design</li><li>Classroom strategies</li><li>AI in Education and future tools</li></ul></div></div></section>

<section class="etp-appetizer" id="hidden-treasures"><div class="etp-appetizer-inner"><div><div class="etp-appetizer-kicker">Explore Hidden Treasures</div><h2>🛍️ Shop History</h2><p>Discover featured Examine the Past resources, classroom products, sponsored selections, and store links.</p><div class="etp-appetizer-actions"><a class="etp-appetizer-btn" href="shop/" data-etp-transition="gold">Explore Hidden Treasures</a></div></div><div class="etp-appetizer-card"><h3>Resources worth keeping</h3><ul class="etp-appetizer-list"><li>Featured Examine the Past products</li><li>Digital and classroom resources</li><li>Clearly labeled sponsored links</li></ul></div></div></section>
</div>'''

if 'id="etp-directory"' not in src:
    marker='<section class="contact-section" id="contact-section">'
    if marker not in src:
        raise RuntimeError("contact section marker missing")
    src=src.replace(marker,directory+"\n"+marker,1)

# Rebuild footer columns while preserving current community logos + detailed legal modals.
start=src.find('<div class="footer-grid footer-master-grid">')
if start<0: raise RuntimeError("footer grid missing")
end=matching_div(src,start)
grid='''<div class="footer-grid footer-master-grid">
<section class="footer-group">
  <h3 class="footer-heading">LEARN</h3>
  <a class="mega-footer-link" href="lessons/us-history/">U.S. History</a>
  <a class="mega-footer-link" href="lessons/world-history/">World History</a>
  <a class="mega-footer-link" href="lessons/civics-government/">Civics &amp; Government</a>
  <a class="mega-footer-link" href="lessons/geography/">Geography</a>
  <a class="mega-footer-link" href="lessons/black-history/">Black History</a>
  <a class="mega-footer-link" href="lessons/world-religions/">World Religions</a>
  <a class="mega-footer-link" href="lessons/">All Lessons</a>
</section>
<section class="footer-group">
  <h3 class="footer-heading">EXPLORE</h3>
  <a class="mega-footer-link" href="timeline/">Interactive Timeline</a>
  <a class="mega-footer-link" href="maps/">History Maps</a>
  <a class="mega-footer-link" href="today/">Today in History</a>
  <a class="mega-footer-link" href="games/">History Unlocked</a>
  <a class="mega-footer-link" href="#current-events">Current Events</a>
  <a class="mega-footer-link" href="teacher-tools/movies-in-the-classroom/">Historical Movies</a>
  <a class="mega-footer-link" href="shop/">Explore Hidden Treasures</a>
</section>
<section class="footer-group">
  <h3 class="footer-heading">TEACHER TOOLS</h3>
  <a class="mega-footer-link" href="teacher-tools/blooms-taxonomy/">Bloom's Taxonomy</a>
  <a class="mega-footer-link" href="teacher-tools/classroom-management/">Classroom Management</a>
  <a class="mega-footer-link" href="teacher-tools/movies-in-the-classroom/">Movies in the Classroom</a>
  <a class="mega-footer-link" href="teacher-tools/learning-styles/">Learner Supports</a>
  <a class="mega-footer-link" href="teacher-tools/">Curriculum Design</a>
  <a class="mega-footer-link" href="teacher-tools/">AI in Education</a>
  <a class="mega-footer-link" href="#faq">FAQ</a>
</section>
<section class="footer-group legal-group">
  <h3 class="footer-heading">LEGAL &amp; SITE</h3>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="affiliate" type="button">Affiliate Disclosure</button>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="careers" type="button">Careers &amp; Partnerships</button>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="licensing" type="button">Resource Licensing</button>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="copyright" type="button">Copyright Policy</button>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="dmca" type="button">DMCA Notice</button>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="privacy" type="button">Privacy Policy</button>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="terms" type="button">Terms of Service</button>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="refunds" type="button">Refund / Digital</button>
  <button aria-haspopup="dialog" class="mega-footer-link legal-open-v4" data-legal="cookies" type="button">Cookie Policy</button>
  <a class="mega-footer-link" href="#contact-section">Contact Us</a>
</section>
</div>'''
src=src[:start]+grid+src[end:]

if 'footer-community-title-home' not in src:
    src=src.replace('<div class="footer-social">','<div class="footer-community-title-home" id="community">JOIN OUR COMMUNITY</div>\n<div class="footer-social">',1)

INDEX.write_text(src,encoding="utf-8")

# Force fresh shell/assets across all non-home pages.
for p in Path(".").rglob("*.html"):
    if p == INDEX: continue
    text=p.read_text(encoding="utf-8",errors="ignore")
    new=re.sub(r'(site-shell\.(?:css|js))\?v=\d+',r'\1?v=41',text)
    new=re.sub(r'(lesson-template\.(?:css|js))\?v=\d+',r'\1?v=41',new)
    if new!=text:p.write_text(new,encoding="utf-8")
