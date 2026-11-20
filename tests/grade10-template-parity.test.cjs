"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const data=JSON.parse(read("assets/grade10-grade5-matched-data.json"));
const course=JSON.parse(read("assets/grade10-civics-course-data.json"));
const base=read("assets/grade5-lesson-engine.js");
const engine=read("assets/grade10-grade5-matched-engine.js");
const router=read("assets/history-hub-lesson.js");
assert.equal(Object.keys(data.units).length,9);
assert.equal(Object.keys(data.lessons).length,31);
const invariants=["g5-toolbar","g5-track","g5-duration","g5-clock","g5-start","g5-reset","g5-sound","g5-jumps","g5-credits-detail","g5-pre","g5-pre-result","g5-player","g5-investigation-display","g5-written","g5-copy","g5-mini-score","g5-answer-result","g5-source-result"];
for(const id of invariants){assert.ok(base.includes(id),"Grade 5 baseline missing "+id);assert.ok(engine.includes(id),"Grade 10 regression: missing "+id)}
assert.ok(router.includes("grade10-grade5-matched-engine.js"),"Grade 10 must use approved shared lesson structure");
assert.ok(!router.includes("grade10-civics-lesson.js"),"Grade 10 must not revert to simplified renderer");
new Function(engine);
new Function(router);
let media=0,game=0;
for(const [slug,l] of Object.entries(data.lessons)){
 assert.ok(course.units[l.unit].lessons[slug],slug+" not present in source course");
 assert.equal(l.paragraphs.length,3,slug+" must have 3 reading stages");
 assert.equal(l.investigation.length,3,slug+" must have 3 inquiry stages");
 assert.equal(l.checks.length,3,slug+" must have 3 formative checks");
 assert.equal(l.options.length,3,slug+" must have 3 answer options");
 assert.ok(Number.isInteger(l.correct)&&l.correct>=0&&l.correct<=2,slug+" answer key");
 assert.ok(Array.isArray(l.video)&&/^[\w-]{11}$/.test(l.video[1]),slug+" embedded video required");
 media++;
 if(l.isPresidentsGame)game++;
 const file="lessons/curriculum/grade-10-civics-government/"+slug+"/index.html";
 const html=read(file);
 assert.ok(html.includes("history-hub-lesson.js?v=20261120-civics-template-v1"),slug+" must load approved lesson router");
}
assert.equal(game,4);
const index=read("lessons/curriculum/grade-10-civics-government/index.html");
for(let i=1;i<=9;i++)assert.ok(index.includes("./unit-10-"+i+"-assessment/"),"missing assessment link 10."+i);
console.log("PASS Grade 10: 31 lessons, 9 units, 18 approved Grade 5 controls, 31 embedded media configurations, 4 Presidents game connections.");
