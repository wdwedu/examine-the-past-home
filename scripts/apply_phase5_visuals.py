from pathlib import Path
import json,re

DATA=Path("assets/phase3-mini-labs-data.js")
raw=DATA.read_text(encoding="utf-8")
obj=json.loads(raw.removeprefix("window.ETP_PHASE3_LESSONS=").rstrip(";"))

def commons(filename,width=900):
    from urllib.parse import quote
    return "https://commons.wikimedia.org/wiki/Special:Redirect/file/"+quote(filename,safe="()'") + f"?width={width}"

def visual(kind,src,alt,caption,credit,source):
    return {"kind":kind,"src":src,"alt":alt,"caption":caption,"credit":credit,"sourceUrl":source}

obj["SS-V3L1"]["visual"]=visual(
    "primary-source",
    commons("Standard of ur.jpg"),
    "The Standard of Ur, an ancient Sumerian artifact",
    "The Standard of Ur, c. 2600–2400 BCE. Use this object to identify social hierarchy, specialization, warfare, and organized society.",
    "British Museum object image via Wikimedia Commons",
    "https://commons.wikimedia.org/wiki/File:Standard_of_ur.jpg")
obj["SS-V3L3"]["visual"]=visual(
    "primary-source",
    commons("Standard of Ur BM U.11164.jpg"),
    "The Standard of Ur showing scenes of peace and exchange",
    "The peace side of the Standard of Ur. Look for evidence of food surplus, status, labor specialization, and organized exchange.",
    "British Museum object image via Wikimedia Commons",
    "https://commons.wikimedia.org/wiki/File:Standard_of_Ur_BM_U.11164.jpg")
obj["SS-V5L2"]["visual"]=visual(
    "primary-source",
    commons("The Declaration of Independence, July 4, 1776, by John Trumbull.jpg"),
    "John Trumbull painting of the presentation of the Declaration of Independence",
    "John Trumbull's Declaration of Independence. Treat the painting as a later historical representation and ask what political ideals it chooses to emphasize.",
    "Public-domain artwork via Wikimedia Commons",
    "https://commons.wikimedia.org/wiki/File:The_Declaration_of_Independence,_July_4,_1776,_by_John_Trumbull.jpg")
obj["SS-V5L3"]["visual"]=visual(
    "primary-source",
    "https://tile.loc.gov/storage-services/service/pnp/det/4a20000/4a26000/4a26600/4a26642v.jpg",
    "Historical image representing the Boston Tea Party",
    "Boston Tea Party, photographed from a historical mural. Analyze how later generations represented colonial resistance.",
    "Library of Congress · LC-DIG-det-4a26642",
    "https://www.loc.gov/item/2016817483/")
obj["SS-V8L1"]["visual"]=visual(
    "primary-source",
    commons("Constitution of the United States, page 1.jpg"),
    "Page one of the Constitution of the United States",
    "The opening page of the U.S. Constitution. Use the Preamble and Article I as evidence for popular sovereignty and the structure of representative government.",
    "Public-domain document image via Wikimedia Commons / U.S. National Archives",
    "https://commons.wikimedia.org/wiki/File:Constitution_of_the_United_States,_page_1.jpg")
obj["SS-V8L2"]["visual"]=visual(
    "primary-source",
    "https://tile.loc.gov/storage-services/service/pnp/hec/16700/16798v.jpg",
    "Historic United States Supreme Court courtroom",
    "Historic U.S. Supreme Court courtroom. Use the institution itself as a prompt for thinking about constitutional interpretation, rights, and judicial authority.",
    "Library of Congress · LC-DIG-hec-16798 · no known restrictions",
    "https://www.loc.gov/item/2016857862/")
obj["WR-V3L3"]["visual"]=visual(
    "primary-source",
    commons("Book of the Dead of Hunefer sheet 1.jpg"),
    "Ancient Egyptian Book of the Dead papyrus",
    "Book of the Dead of Hunefer. Examine how text, image, ritual, and ideas about the afterlife reinforce sacred and political order.",
    "British Museum image via Wikimedia Commons; underlying work public domain",
    "https://commons.wikimedia.org/wiki/File:Book_of_the_Dead_of_Hunefer_sheet_1.jpg")
obj["WR-V4L2"]["visual"]=visual(
    "primary-source",
    commons("Torah Scroll (MS heb. a. 4).jpg"),
    "Historic Torah scroll fragment",
    "A Torah scroll fragment, probably 13th century. Use the manuscript to discuss transmission, sacred text, interpretation, and communal law.",
    "Bodleian/Jewish Museum project image via Wikimedia Commons; public domain",
    "https://commons.wikimedia.org/wiki/File:Torah_Scroll_(MS_heb._a._4).jpg")
obj["WR-V6L2"]["visual"]=visual(
    "primary-source",
    commons("Birmingham Quran manuscript.jpg"),
    "Early Qur'an manuscript folios",
    "The Birmingham Qur'an manuscript, written on parchment dated to the early Islamic period. Use it to distinguish manuscript evidence from later interpretation.",
    "University of Birmingham manuscript image via Wikimedia Commons; public domain",
    "https://commons.wikimedia.org/wiki/File:Birmingham_Quran_manuscript.jpg")

DATA.write_text("window.ETP_PHASE3_LESSONS="+json.dumps(obj,separators=(",",":"))+";",encoding="utf-8")

def fig(src,alt,label,caption,credit,source):
    return f'''<figure class="lesson-visual compact primary-source"><img loading="lazy" decoding="async" src="{src}" alt="{alt}"><figcaption><span class="visual-label">{label}</span>{caption}<span class="visual-credit">{credit} · <a href="{source}" target="_blank" rel="noopener">Source</a></span></figcaption></figure>'''

patches={
"lessons/geography/map-skills-spatial-thinking/index.html":fig(
    commons("Mercator 1569.png"),"Gerardus Mercator's 1569 world map","Primary Source",
    "Mercator's 1569 world map. Use it to investigate projection, distortion, scale, and the choices mapmakers make.",
    "Gerardus Mercator; public-domain historical map via Wikimedia Commons",
    "https://commons.wikimedia.org/wiki/File:Mercator_1569.png"),
"lessons/master-template/index.html":fig(
    commons("Great Migration.jpg"),"African American housing in Chicago during the Great Migration","Primary Source",
    "African American housing in Chicago, 1941. Use the photograph to connect migration with urban opportunity, segregation, housing, and community change.",
    "Library of Congress FSA/OWI image via Wikimedia Commons; public domain",
    "https://commons.wikimedia.org/wiki/File:Great_Migration.jpg"),
"lessons/world-history/first-civilizations/index.html":fig(
    commons("Standard of Ur - War.jpg"),"War side of the Standard of Ur","Primary Source",
    "The war side of the Standard of Ur, c. 2600 BCE. Examine what the artifact suggests about hierarchy, military organization, labor, and early urban society.",
    "Ancient Sumerian artifact image via Wikimedia Commons; underlying work public domain",
    "https://commons.wikimedia.org/wiki/File:Standard_of_Ur_-_War.jpg"),
"lessons/black-history/harlem-renaissance/index.html":fig(
    "https://tile.loc.gov/storage-services/service/pnp/van/5a52000/5a52100/5a52142v.jpg","Portrait of Zora Neale Hurston","Primary Source",
    "Zora Neale Hurston, photographed by Carl Van Vechten in 1938. Use the portrait as an entry point into literature, anthropology, identity, and cultural production.",
    "Library of Congress · Carl Van Vechten Collection",
    "https://www.loc.gov/item/2004663047/")
}

marker='<section class="block" id="source"><div class="eyebrow">6 · Explore Evidence</div><h2>Evidence Lab</h2>'
for path,figure in patches.items():
    p=Path(path)
    if not p.exists():
        continue
    s=p.read_text(encoding="utf-8")
    s=re.sub(r'<figure class="lesson-visual compact primary-source">.*?</figure>','',s,flags=re.S)
    if marker in s:
        s=s.replace(marker,marker+figure,1)
    p.write_text(s,encoding="utf-8")

print("Phase 5 visuals applied:",9,"shared-engine lessons +",len(patches),"full lessons")
