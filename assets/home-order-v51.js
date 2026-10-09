(()=>{function run(){
const q=s=>document.querySelector(s),id=x=>document.getElementById(x);
const oldVault=id("resource-vault"),oldTeacher=id("teacher-tools"),oldShop=id("hidden-treasures");
[oldVault,oldTeacher,oldShop].forEach(n=>{if(n)n.hidden=true});
document.querySelectorAll("section").forEach(sec=>{const t=(sec.textContent||"");if(t.includes("Teacher Packet PDF")&&t.includes("Open Complete Download Folder")){sec.classList.add("etp-free-resource-legacy");sec.hidden=true}});
const tools=id("teacher-tools-v50"),testimonials=id("testimonials"),hub=id("history-hub-v50"),shops=id("shops"),about=id("about-us"),contact=id("contact-section");
const heroTitle=[...document.querySelectorAll("h1,h2")].find(n=>/EXAMINE THE PAST/i.test((n.textContent||"").trim()));const hero=(heroTitle&&heroTitle.closest("section"))||q("section.hero")||q("main section")||q("body > section");
if(hero&&tools)hero.insertAdjacentElement("afterend",tools);
if(tools&&testimonials)tools.insertAdjacentElement("afterend",testimonials);
if(testimonials&&hub)testimonials.insertAdjacentElement("afterend",hub);
if(hub&&shops)hub.insertAdjacentElement("afterend",shops);
if(shops&&about)shops.insertAdjacentElement("afterend",about);
if(about&&contact)about.insertAdjacentElement("afterend",contact);
if(about){
 const h=about.querySelector("h1,h2");if(h)h.textContent="About";
 const k=about.querySelector(".etp-appetizer-kicker");if(k)k.textContent="History Built to Be Explored.";
 const firstP=about.querySelector(".etp-appetizer-inner>div>p");if(firstP)firstP.remove();
 let copy=about.querySelector(".etp-about-copy");if(!copy){copy=document.createElement("div");copy.className="etp-about-copy";const main=about.querySelector(".etp-appetizer-inner>div");if(main)main.appendChild(copy)}
 if(copy)copy.innerHTML='<p>Examine the Past is built around a simple idea: history becomes more meaningful when people can explore it rather than simply memorize it. We bring together interactive lessons, primary sources, maps, timelines, games, visual storytelling, and practical teacher tools so learners can move from curiosity to evidence and from evidence to understanding.</p><p>Our mission is to make rigorous historical learning approachable, engaging, and useful for real classrooms and independent learners. The site is designed to support questioning, comparison, source analysis, geographic thinking, chronology, and historical argument while giving educators flexible materials they can adapt to different learners and teaching situations.</p><p>Examine the Past also serves as a growing digital history studio. We continue to build new lesson collections, classroom resources, interactive experiences, and historical tools while preserving a clear distinction between evidence, interpretation, and opinion. The goal is not simply to tell people what happened, but to help them investigate how we know, why it mattered, and how the past continues to shape the present.</p><div class="etp-about-values"><div class="etp-about-value"><strong>Explore Evidence</strong><span>Primary sources, maps, images, timelines, and historical context are treated as tools for investigation.</span></div><div class="etp-about-value"><strong>Teach for Understanding</strong><span>Lessons are structured around inquiry, scaffolding, active learning, and deeper thinking rather than recall alone.</span></div><div class="etp-about-value"><strong>Keep History Human</strong><span>People, choices, cultures, conflicts, and consequences remain at the center of the learning experience.</span></div></div>';
 const card=about.querySelector(".etp-appetizer-card");if(card)card.hidden=true;
}
if(contact){const h=contact.querySelector("h1,h2");if(h)h.textContent="Contact ExamineThePast"}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run()})();