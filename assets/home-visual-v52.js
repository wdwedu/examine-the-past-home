(()=>{function run(){
const qs=s=>document.querySelector(s);
const hero=[...document.querySelectorAll("h1,h2")].find(n=>/EXAMINE THE PAST/i.test((n.textContent||"").trim()));if(hero)hero.classList.add("etp-main-hero-title");
const contact=qs("#contact-section h1,#contact-section h2");if(contact)contact.textContent="Contact";
const toolCopy=[
["Interactive Timeline","Travel across eras, compare turning points, and see how events connect across centuries rather than in isolation."],
["History Maps","Use location, borders, movement, resources, trade, and terrain as historical evidence."],
["Today in History","Choose a date and uncover the people, events, inventions, conflicts, and cultural moments tied to it."],
["History Unlocked","Enter interactive games and challenges built around chronology, evidence, geography, and historical reasoning."],
["Bloom’s Taxonomy","Build stronger questions, objectives, tasks, and assessments across increasing levels of thinking."],
["Movies in the Classroom","Turn historical film into structured observation, sourcing, comparison, discussion, and evidence-based writing."],
["Classroom Management","Use practical classroom systems, routines, planning tools, and organization strategies that support learning."],
["Learner Supports","Build access through scaffolds, UDL-informed supports, flexible pathways, and learner-centered instructional choices."]
];
document.querySelectorAll("#teacher-tools-v50 .etp-tool-card").forEach((card,i)=>{if(toolCopy[i]){const h=card.querySelector("h3"),p=card.querySelector("p");if(h)h.textContent=toolCopy[i][0];if(p)p.textContent=toolCopy[i][1]}});
const hubCopy=[
"Explore American history through major eras, primary sources, political change, social movements, conflict, culture, and civic development.",
"Study civilizations, exchange, empire, belief, technology, conflict, migration, and global change across time and place.",
"Investigate systems of government, rights, citizenship, institutions, public policy, elections, and civic participation.",
"Read maps as evidence through movement, terrain, settlement, trade, borders, resources, migration, and spatial change.",
"Explore African, diasporic, and Black American histories through people, ideas, resistance, culture, movement, and achievement.",
"Study belief, practice, institutions, sacred texts, historical change, and religious diversity through a comparative academic lens."
];
document.querySelectorAll("#history-hub-v50 .etp-hub-card p").forEach((p,i)=>{if(hubCopy[i])p.textContent=hubCopy[i]});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run()})();