/**
 * Browser-like smoke tests for the three history assessment pages.
 * Run from repository root after: npm install --no-save jsdom@24
 *   node scripts/check_certification_browser.mjs
 * This simulates DOM interactions; a visual desktop/mobile browser audit is separate.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { JSDOM } from "jsdom";

const root = resolve("teacher-tools/certification-prep");
const names = ["questions-world-early.json","questions-world-modern.json","questions-us-early.json","questions-us-modern.json"];
const banks = Object.fromEntries(["foundations","readiness","final"].map(name=>[name,
  names.flatMap(filename=>JSON.parse(readFileSync(resolve(root,name,filename),"utf8")))
]));
const delay = millis=>new Promise(resolve=>setTimeout(resolve,millis));
const inspected = [];

async function launch(exam, saved = null) {
  const dir = resolve(root,exam);
  const html = readFileSync(resolve(dir,"index.html"),"utf8");
  const dom = new JSDOM(html, {
    url: "https://example.com/teacher-tools/certification-prep/"+exam+"/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const { window } = dom;
  const { document } = window;
  window.scrollTo = () => {};
  window.matchMedia = () => ({matches:false,addListener(){},removeListener(){}});
  window.confirm = () => true;
  window.alert = msg=>{throw Error("Unexpected alert: "+msg)};
  let printed = 0;
  window.print = () => {printed++};
  window.fetch = async filepath => ({
    ok: true,
    status: 200,
    json: async () => JSON.parse(readFileSync(resolve(dir,String(filepath)),"utf8")),
  });
  if (saved) window.localStorage.setItem("etp-foundations-5941-v1",JSON.stringify(saved));
  const inline = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
     .map(m=>m[1]).filter(x=>x.includes("function init")||x.includes("async function init"));
  assert.equal(inline.length,1,exam+": application script not found");
  window.eval(inline[0]);
  for(let i=0;i<60;i++) {
    if(document.getElementById("loading").classList.contains("hidden"))break;
    await delay(5);
  }
  assert.equal(document.getElementById("loading").classList.contains("hidden"),true,exam+": loading never completed");
  const error=document.getElementById("error")||document.getElementById("load-error");
  assert.equal(error.classList.contains("hidden"),true,exam+": loader failed");
  const close=()=>dom.window.close();
  return {dom,document,window,close,get prints(){return printed}};
}

async function testFoundation() {
  const ctx=await launch("foundations"), {document:d,window:w}=ctx;
  assert.equal(d.querySelectorAll(".qjump").length,120);
  assert.equal(d.querySelectorAll('input[name="answer"]').length,4);
  d.querySelector('input[name="answer"]').click();
  const saved=JSON.parse(w.localStorage.getItem("etp-foundations-5941-v1"));
  assert.equal(Object.keys(saved.answers).length,1,"Foundations did not save response");
  d.getElementById("next").click();
  assert.match(d.getElementById("question-label").textContent,/2 OF 120/);
  d.getElementById("flag").click();
  assert.equal(JSON.parse(w.localStorage.getItem("etp-foundations-5941-v1")).flags[banks.foundations[1].id],true);
  d.getElementById("finish").click();
  assert.equal(d.getElementById("results").classList.contains("hidden"),false);
  assert.equal(d.getElementById("earned-certificate").classList.contains("hidden"),true,"Provisional report wrongly grants certificate");
  d.getElementById("back-to-practice").click();
  ctx.close();

  const full={answers:Object.fromEntries(banks.foundations.map(q=>[q.id,0])),flags:{},current:119,completedAt:null};
  const restored=await launch("foundations",full);
  const rd=restored.document;
  assert.equal(rd.getElementById("answered-count").textContent,"120","Saved progress did not restore");
  rd.getElementById("finish").click();
  assert.equal(rd.getElementById("result-score").textContent,"120 / 120");
  assert.equal(rd.getElementById("earned-certificate").classList.contains("hidden"),false,"Completed Lab certificate hidden");
  assert.equal(rd.getElementById("print-cert").disabled,false);
  rd.getElementById("print-cert").click();
  assert.equal(restored.prints,1,"Certificate print action did not run");
  restored.close();
  inspected.push("Foundations: load, saved answer, next, flag, provisional report, resume, 120/120 scoring, certificate print");
}

async function testTimed(exam) {
  const ctx=await launch(exam),{document:d,window:w}=ctx;
  assert.equal(d.getElementById("intro").classList.contains("hidden"),false);
  assert.equal(d.getElementById("start").disabled,true);
  d.getElementById("consent").checked=true;
  d.getElementById("consent").dispatchEvent(new w.Event("change",{bubbles:true}));
  assert.equal(d.getElementById("start").disabled,false);
  d.getElementById("start").click();
  assert.equal(d.getElementById("exam").classList.contains("hidden"),false);
  assert.equal(d.getElementById("navigator").children.length,120);
  assert.match(d.getElementById("clock").textContent,/^0[12]:[0-5]\d:[0-5]\d$/);
  d.querySelector('input[name="option"]').click();
  assert.match(d.getElementById("progress").textContent,/1 of 120 answered/);
  d.getElementById("next").click();
  assert.match(d.getElementById("questionNumber").textContent,/Question 2 of 120/);
  d.getElementById("flag").click();
  assert.match(d.getElementById("flag").textContent,/Flagged/);
  d.getElementById("submit").click();
  assert.equal(d.getElementById("results").classList.contains("hidden"),false);
  assert.equal(d.querySelectorAll(".review-item").length,120);
  assert.match(d.getElementById("summary").textContent,/119 unanswered/);
  assert.equal(w.localStorage.length,0,"Timed exam wrote to local storage");
  d.getElementById("printCert").click();
  assert.equal(ctx.prints,1,"Timed certificate print action did not run");
  ctx.close();

  const expired=await launch(exam),ed=expired.document,ew=expired.window;
  ed.getElementById("consent").checked=true;
  ed.getElementById("consent").dispatchEvent(new ew.Event("change",{bubbles:true}));
  ed.getElementById("start").click();
  const currentTime=ew.Date.now();
  ew.Date.now=()=>currentTime+121*60*1000;
  for(let i=0;i<30;i++){if(!ed.getElementById("results").classList.contains("hidden"))break;await delay(35)}
  assert.equal(ed.getElementById("results").classList.contains("hidden"),false,exam+": did not auto-submit on expiry");
  assert.match(ed.getElementById("summary").textContent,/Time expired/);
  expired.close();
  inspected.push(exam+": start, 120 navigator, timing, answer, flag, early submit, report, print, timeout auto-submit");
}

try{
  await testFoundation();
  await testTimed("readiness");
  await testTimed("final");
  for(const message of inspected)console.log("PASS",message);
  console.log("PASS: all three simulated-browser smoke tests");
}catch(error){
  console.error("FAIL",error);
  process.exitCode=1;
}
