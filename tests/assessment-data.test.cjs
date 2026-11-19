"use strict";
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const middle=read("assets/middle-school-assessments-data.json").units;
const high=read("assets/high-school-assessments-data.json").units;
const expectMiddleCount=20;
assert.equal(Object.keys(middle).length,expectMiddleCount);
const all={...middle,...high};
let count=0;
for(const [key,unit] of Object.entries(all)){
 count++;
 assert.equal(unit.id,key);
 assert.ok(unit.grade>=6&&unit.grade<=9);
 assert.equal(unit.questions.length,6,key+": MC count");
 assert.equal(unit.matchingPrompts.length,3,key+": source matching");
 assert.equal(unit.matchingOptions.length,3,key+": matching choices");
 assert.equal(unit.inquirySteps.length,3,key+": inquiry steps");
 assert.deepEqual([...unit.inquiryAnswers].sort(),[0,1,2],key+": inquiry key");
 assert.equal(unit.conclusions.length,3,key+": evidence claims");
 assert.equal(unit.conclusionKey.length,3,key+": evidence keys");
 assert.equal(unit.conclusionKey.filter(Boolean).length,2,key+": supported claims");
 assert.equal(unit.conclusionKey.filter(v=>!v).length,1,key+": unsupported claim");
 assert.ok(unit.lessons.length>=3,key+": lesson coverage");
 assert.ok(unit.sources.length>=3,key+": source packet");
 for(const q of unit.questions){
  assert.equal(q.choices.length,3,key+": MC options");
  assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3,key+": MC key");
  assert.ok(q.prompt.length>15,key+": prompt");
  assert.ok(q.choices[q.answer].length>10,key+": keyed answer");
 }
 for(const m of unit.matchingPrompts)assert.ok(m.answer>=0&&m.answer<3,key+": match index");
 for(const s of unit.sources){
  assert.ok(s.excerpt.length>100,key+": source text too short");
  assert.ok(/[.!?][\"”']?$/.test(s.excerpt.trim()),key+": incomplete excerpt");
 }
 const mc=unit.questions.length,match=unit.matchingPrompts.length,inquiry=unit.inquirySteps.length,claims=unit.conclusionKey.length,writing=4*3;
 assert.equal(mc+match+inquiry+claims+writing,27,key+": total");
 const full=unit.questions.reduce((v,q,i)=>v+(q.answer===q.answer?1:0),0)+match+inquiry+claims+writing;
 assert.equal(full,27,key+": max scoring case");
 const zero=0+0+0+0+0;
 assert.equal(zero,0,key+": min scoring case");
 if(unit.grade===9){
  assert.ok(unit.sources.filter(s=>s.sourceType.startsWith("Primary")).length>=3,"9.1 primary source count");
  assert.ok(unit.sources.every(s=>s.creator&&s.date&&s.url),"9.1 provenance");
 }
}
console.log("PASS: "+count+" assessments, "+Object.values(all).reduce((a,u)=>a+u.questions.length,0)+" MC items, 27-point totals, keys, sources, and lesson coverage.");
