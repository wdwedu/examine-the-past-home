import {chromium} from "playwright";
import assert from "node:assert/strict";
const root="http://127.0.0.1:8765/";
const keys=["queen-makeda","piye","shabaka","taharqa","sundiata"];
let count=0;
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
try{
 for(const viewport of [{width:1366,height:850},{width:390,height:844}]){
  for(const key of keys){
   const context=await browser.newContext({viewport,ignoreHTTPSErrors:true});
   const page=await context.newPage();const failures=[];
   page.on("pageerror",err=>failures.push(err.message));
   await page.goto(root+"lessons/black-history-heroes/"+key+"/",{waitUntil:"domcontentloaded"});
   await page.waitForSelector("#mk-progress-dock",{timeout:12000});
   await page.waitForSelector(".mk-timer-panel",{timeout:12000});
   assert.equal(await page.locator(".mk-steps-nav a").count(),6,key+" chapter count");
   assert.equal(await page.locator(".mk-question").count(),8,key+" assessment count");
   assert.equal(await page.locator(".mk-timer-panel").count(),7,key+" optional timers count");
   assert.ok(await page.locator(".mk-hero img").evaluate(img=>img.complete&&img.naturalWidth>0),key+" hero portrait loaded");
   assert.ok(await page.locator("main .mk-video-placeholder,main .mk-video-screen").count()>=1,key+" video slot");
   const q=page.locator(".mk-question").first();
   await q.locator("input").first().check();
   await q.locator(".mk-check").click();
   await page.waitForTimeout(80);
   assert.ok(await q.getAttribute("data-checked")==="true",key+" first assessment scored");
   assert.ok((await q.locator(".mk-feedback").innerText()).length>12,key+" feedback");
   await page.locator(".mk-steps-nav a[href='#reading-two']").click();
   await page.waitForTimeout(800);
   const near=await page.evaluate(()=>{
    const t=document.querySelector("#reading-two");return Math.abs(t.getBoundingClientRect().top)<230;
   });
   assert.ok(near,key+" reading chapter jumps to destination");
   const timer=page.locator(".mk-timer-panel").first();
   await timer.locator(".mk-timer-start").click();
   assert.equal(await timer.locator(".mk-timer-pause").isVisible(),true,key+" timer started");
   await timer.locator(".mk-timer-pause").click();
   await timer.locator(".mk-timer-reset").click();
   assert.ok((await timer.locator(".mk-timer-readout").innerText()).includes(":"),key+" countdown visible");
   await page.locator("#mk-reflection").fill("I use evidence and acknowledge uncertainty.");
   await page.locator("#mk-save").click();
   assert.ok((await page.locator("#mk-save-status").innerText()).includes("Saved"),key+" reflection save");
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+5);
   assert.equal(overflow,false,key+" no horizontal overflow "+viewport.width);
   assert.deepEqual(failures,[],key+" page errors");
   count++;console.log("PASS",key,viewport.width,"checks");
   await context.close();
  }
 }
}finally{await browser.close()}
console.log("Passed all "+count+" lesson/browser/viewport combinations");
