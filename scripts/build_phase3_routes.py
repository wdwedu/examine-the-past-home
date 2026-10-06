from pathlib import Path
import re, html

SOCIAL = {
"V3 • Civilizations & Culture":[
("V3L1","What Makes a Civilization?"),("V3L2","Culture, Belief, and Social Order"),("V3L3","Cities, Trade, and Specialization"),("V3L4","Empires, Exchange, and Cultural Diffusion"),("V3L5","Comparing Civilizations: Patterns and Differences")],
"V4 • Government & Civic Life":[
("V4L1","Why Governments Form"),("V4L2","Power, Authority, and Legitimacy"),("V4L3","Democracy, Republics, and Representation"),("V4L4","Rights, Laws, and Citizenship"),("V4L5","Comparing Government Systems")],
"V5 • Revolutions & Change":[
("V5L1","Why Revolutions Begin"),("V5L2","Enlightenment Ideas and Political Change"),("V5L3","American Revolution: Independence and Government"),("V5L4","French and Haitian Revolutions"),("V5L5","Industrial Revolution and Social Change")],
"V6 • Modern World Connections":[
("V6L1","World Wars and Global Shifts"),("V6L2","Cold War and Ideological Conflict"),("V6L3","Decolonization and New Nations"),("V6L4","Technology and Global Connections"),("V6L5","Modern Global Challenges")],
"V7 • Economics & Global Systems":[
("V7L1","Scarcity, Choice, and Opportunity Cost"),("V7L2","Supply, Demand, and Markets"),("V7L3","Economic Systems: Market, Command, and Mixed"),("V7L4","Trade, Globalization, and Interdependence"),("V7L5","Personal Finance, Public Policy, and Economic Decision-Making")],
"V8 • American & Civic Life Capstone":[
("V8L1","Foundations of American Government"),("V8L2","Rights, Liberties, and Responsibilities"),("V8L3","Elections, Media, and Civic Participation"),("V8L4","Public Policy and Local Action"),("V8L5","Civic Life Capstone: Evidence, Deliberation, and Action")]
}

WORLD = {
"V3 • The Rise of Polytheism":[
("V3L1","Why Many Gods? Systems of Divine Roles"),("V3L2","Mesopotamia: City-States, Temples, and Priests"),("V3L3","Egypt: Divine Kingship and the Afterlife"),("V3L4","Greece & Rome: Myth, Civic Life, and Empire"),("V3L5","Religion and Power in Ancient States")],
"V4 • Judaism and Monotheism":[
("V4L1","Origins and Covenant (Abraham to Early Israel)"),("V4L2","Torah, Law, and Ethical Living"),("V4L3","Kingdom, Temple, and National Story"),("V4L4","Exile, Return, and Survival"),("V4L5","Judaism Under Empires (Persian to Roman Context)")],
"V5 • Christianity’s Emergence from Judaism":[
("V5L1","Judea Under Rome: The World of Jesus"),("V5L2","Jesus: Teachings, Movement, and Tension"),("V5L3","Crucifixion: Roman Authority and Local Leadership"),("V5L4","From Jewish Sect to Gentile Faith"),("V5L5","Rome and the Rise of a State Religion")],
"V6 • The Rise of Islam":[
("V6L1","Arabia Before Islam: Society, Trade, and Belief"),("V6L2","Muhammad and the Qur’an"),("V6L3","The Ummah: Community, Law, and Identity"),("V6L4","Expansion and Caliphates"),("V6L5","Sunni and Shia: A Historical Split")],
"V7 • Power, Politics, and Religion":[
("V7L1","Religion and State Power: Basic Patterns"),("V7L2","Empire, Conversion, and Cultural Blending"),("V7L3","Conflict: When Politics Wears a Religious Label"),("V7L4","The Crusades as a Case Study"),("V7L5","Tolerance, Pluralism, and Persecution")],
"V8 • Religion Today in America":[
("V8L1","Religious Freedom and the American Framework"),("V8L2","Christianity in America: Diversity and Influence"),("V8L3","Judaism in America: Community and Identity"),("V8L4","Islam in America: Community and Misconceptions"),("V8L5","Dialogue Skills: Disagreeing with Respect")]
}

def slug(s):
    s=s.lower().replace("&","and").replace("’","").replace("'","")
    s=re.sub(r"[^a-z0-9]+","-",s).strip("-")
    return s

LOADER='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} | Examine the Past</title><link rel="stylesheet" href="../../../assets/site-shell.css?v=45"><link rel="stylesheet" href="../../../assets/lesson-template.css?v=45"><link rel="stylesheet" href="../../../assets/lesson-backgrounds.css?v=45"><link rel="stylesheet" href="../../../assets/phase3-mini-lab.css?v=45"><link rel="stylesheet" href="../../../assets/etp-transitions.css"></head><body data-lesson-id="{lesson_id}" data-etp-root="../../../"><div class="phase3-loading">Loading {code}…</div><script src="../../../assets/phase3-mini-labs-data.js?v=45"></script><script src="../../../assets/phase3-mini-lab-engine.js?v=45"></script></body></html>'''

def lesson_path(base, prefix, code, title):
    return Path(base)/f"{code.lower()}-{slug(title)}"/"index.html"

def volume_path(base, label):
    code=label.split(" ")[0].lower()
    title=label.split("•",1)[1].strip()
    return Path(base)/f"{code}-{slug(title)}"/"index.html"

def hub_html(label, items, prefix, base_rel, bg):
    volume=label.split("•",1)[1].strip()
    cards=[]
    for code,title in items:
        href=f"../{code.lower()}-{slug(title)}/"
        cards.append(f'<a class="card" href="{href}" data-etp-transition="page"><span class="tag">{code}</span><h2>{html.escape(title)}</h2><p>Interactive Mini Lab in the rebuilt Examine the Past lesson engine.</p><span class="btn">Open Lesson</span></a>')
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(volume)} | Examine the Past</title><link rel="stylesheet" href="../../../assets/site-shell.css?v=45"><link rel="stylesheet" href="../../../assets/etp-section.css"><link rel="stylesheet" href="../../../assets/subject-hub.css"><link rel="stylesheet" href="../../../assets/lesson-backgrounds.css?v=45"><link rel="stylesheet" href="../../../assets/etp-transitions.css"></head><body class="lesson-subject-bg {bg}"><main class="wrap"><section class="hero"><div class="eyebrow">{prefix} • {label.split(" ")[0]}</div><h1>{html.escape(volume)}</h1><p>Five connected Mini Labs with pre-assessment, context, vocabulary, evidence analysis, checks for understanding, writing, and application.</p></section><section class="grid">{''.join(cards)}</section></main><script src="../../../assets/etp-transitions.js"></script><script src="../../../assets/site-shell.js?v=45" data-etp-root="../../../"></script></body></html>'''

count=0
for prefix, base, vols in [
    ("Social Studies Mini Labs","lessons/social-studies-mini-labs",SOCIAL),
    ("World Religions Mini Labs","lessons/world-religions",WORLD)
]:
    for label, items in vols.items():
        for code,title in items:
            lesson_id=("SS-" if prefix.startswith("Social") else "WR-")+code
            p=lesson_path(base,prefix,code,title)
            p.parent.mkdir(parents=True,exist_ok=True)
            p.write_text(LOADER.format(title=html.escape(title),lesson_id=lesson_id,code=code),encoding="utf-8")
            count+=1
        if prefix.startswith("Social"):
            vnum=int(label[1])
            bg="subject-civics-government" if vnum==4 else ("subject-us-history" if vnum==8 else "subject-world-history")
        else:
            bg="subject-world-religions"
        hp=volume_path(base,label)
        hp.parent.mkdir(parents=True,exist_ok=True)
        hp.write_text(hub_html(label,items,prefix,base,bg),encoding="utf-8")

# Update Social Studies master roadmap V3-V8 to live links
p=Path("lessons/social-studies-mini-labs/index.html")
if p.exists():
    s=p.read_text(encoding="utf-8")
    for label in SOCIAL:
        code=label.split(" ")[0]
        title=label.split("•",1)[1].strip()
        href=f"{code.lower()}-{slug(title)}/"
        pattern=rf'<article class="collection-card"><div class="count">{code} • NEXT</div><h2>.*?</h2><p>Queued for the next migration wave using the same engine.</p><span style="color:#777;font-size:.82rem">Migration staging</span></article>'
        replacement=f'<article class="collection-card"><div class="count">{code} • 5 LESSONS LIVE</div><h2>{html.escape(title)}</h2><p>Interactive Phase 3 volume in the shared lightweight lesson engine.</p><a href="{href}">Open Volume →</a></article>'
        s=re.sub(pattern,replacement,s,count=1,flags=re.S)
    p.write_text(s,encoding="utf-8")

# Update World Religions subject page V3-V8 to live links
p=Path("lessons/world-religions/index.html")
if p.exists():
    s=p.read_text(encoding="utf-8")
    for label in WORLD:
        code=label.split(" ")[0]
        title=label.split("•",1)[1].strip()
        href=f"{code.lower()}-{slug(title)}/"
        pattern=rf'<article class="collection-card"><div class="count">{code}</div><h2>.*?</h2><p>.*?</p><span style="color:#777;font-size:.82rem">Lessons migrate here next</span></article>'
        replacement=f'<article class="collection-card"><div class="count">{code} • 5 LESSONS LIVE</div><h2>{html.escape(title)}</h2><p>Five interactive Mini Labs preserved in the rebuilt sequence.</p><a href="{href}">Open Volume →</a></article>'
        s=re.sub(pattern,replacement,s,count=1,flags=re.S)
    p.write_text(s,encoding="utf-8")
print("generated",count,"lesson routes and",len(SOCIAL)+len(WORLD),"volume hubs")
