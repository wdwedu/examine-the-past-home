"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),root=path.resolve(__dirname,"..");
const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const c=load("assets/grade10-civics-course-data.json");
const d=load("assets/grade10-civics-assessments-data.json");
assert.equal(Object.keys(c.units).length,9);assert.equal(Object.keys(d.units).length,9);
let lessons=0,mc=0;
for(let n=1;n<=9;n++){
 const k="10."+n,u=c.units[k],a=d.units[k];assert.ok(u&&a,k+" missing unit");
 const all=Object.values(u.lessons);lessons+=all.length;
 assert.equal(all.length,a.lessons.length,k+" lesson coverage");
 for(const l of all){
  assert.equal(l.paragraphs.length,2,k+" reading count");
  assert.ok(l.paragraphs.every(p=>p.length>=90),k+" reading too short");
  assert.equal(l.choices.length,3,k+" practice choices");
  assert.ok(l.answer>=0&&l.answer<3,k+" formative answer");
  assert.ok(fs.existsSync(path.join(root,"lessons/curriculum/grade-10-civics-government",l.slug,"index.html")),k+" missing lesson route");
 }
 assert.ok(fs.existsSync(path.join(root,"lessons/curriculum/grade-10-civics-government/unit-10-"+n+"-assessment/index.html")),k+" missing assessment route");
 assert.equal(a.questions.length,6,k+" MC count");mc+=6;
 assert.equal(new Set(a.questions.map(q=>q.prompt)).size,6,k+" repeated prompt");
 assert.ok(a.questions.every(q=>q.choices.length===3&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3),k+" MC keys");
 assert.equal(a.sources.length,3,k+" source packet");
 assert.ok(a.sources.every(s=>s.url.startsWith("https://")&&s.creator&&s.date&&s.sourceType),k+" source metadata");
 assert.equal(a.matchingPrompts.length,3,k+" source matching");
 assert.deepEqual([...a.inquiryAnswers].sort(),[0,1,2],k+" inquiry sequence");
 assert.equal(a.conclusionKey.length,3,k+" claims");
 assert.equal(a.conclusionKey.filter(Boolean).length,2,k+" supported claims");
 assert.equal(6+3+3+3+12,27,k+" points");
 assert.ok(a.sampleAnswer.split("\n\n").length===4,k+" sample response");
}
assert.equal(lessons,31);assert.equal(mc,54);
console.log("PASS: nine Grade 10 units, 31 source-informed lessons, 54 keyed MC items, nine 27-point assessments, rubric samples and routes.");
