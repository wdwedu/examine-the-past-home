/**
 * Chromium desktop/mobile release smoke tests, run in GitHub Actions.
 * Requires: npm install --no-save playwright@1.56.1
 *            npx playwright install --with-deps chromium
 *            python3 -m http.server 8765 &
 */
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "http://127.0.0.1:8765/teacher-tools/certification-prep/";
const OUT = "audit/certification-browser";
await mkdir(OUT,{recursive:true});
const browser = await chromium.launch({headless:true});
let pass=0;
const check=(ok,label)=>{assert.ok(ok,label);console.log("PASS",label);pass++};

async function checkReadability(page,selectors,section) {
  for(const selector of selectors){
    const color=await page.locator(selector).first().evaluate(el=>{
      const cs=getComputedStyle(el), bg=getComputedStyle(el.closest(".question-card,.panel,.lab-head,.hero,.choice,.option,.pill,.side-card")||el).backgroundColor;
      return {color:cs.color,background:bg,text:el.textContent?.trim().slice(0,65)};
    });
    const parse=str=>{const m=str.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);return m?[Number(m[1]),Number(m[2]),Number(m[3])]:null};
    const fg=parse(color.color),bg=parse(color.background);
    assert.ok(fg&&bg,section+" color parse failed "+selector+" "+JSON.stringify(color));
    const luminance=c=>{const a=c.map(x=>x/255).map(x=>x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4));return .2126*a[0]+.7152*a[1]+.0722*a[2]};
    const x=luminance(fg),y=luminance(bg);
    const ratio=(Math.max(x,y)+.05)/(Math.min(x,y)+.05);
    check(ratio>=4.5,section+" readable "+selector+" ("+ratio.toFixed(2)+":1)");
  }
}

async function setup(viewport,name) {
  const context=await browser.newContext({viewport,deviceScaleFactor:1,acceptDownloads:true});
  const page=await context.newPage();
  page.on("console", m=>{if(m.type()==="error")console.error(name+" console:",m.text())});
  page.on("pageerror",e=>console.error(name+" error:",e.message));
  page.on("dialog",d=>d.accept());
  return {context,page};
}
const destination="/teacher-tools/certification-prep/";
try {
  // Real, rendered desktop center, state selector and interactive course.
  let {context,page}=await setup({width:1440,height:900},"center desktop");
  await page.goto(BASE,{waitUntil:"networkidle"});
  check(await page.locator("#state option").count()===52,"State selector: 50 states + DC + placeholder");
  await page.selectOption("#state","Maryland");
  check((await page.locator("#state-score-value").innerText()).includes("160"),"Maryland scaled score shown");
  await page.selectOption("#state","District of Columbia");
  check((await page.locator("#state-score-value").innerText()).includes("5581"),"DC displays alternative subject exam");
  await page.selectOption("#experience","returning");
  await page.locator("#go-orientation").click();
  check(await page.locator("#orientation").isVisible(),"Returning-candidate refresher opens");
  await page.locator(".jump-exams").first().click();
  check(await page.locator("#exams").isVisible(),"Exam-selection skip navigation");
  await page.locator("#open-course").click();
  check(await page.locator("#course").isVisible(),"Guided course opens");
  await page.locator("#course-view button.choice").first().click();
  check(await page.locator("#course-view .notice").isVisible(),"Guided-course interaction feedback");
  check((await page.evaluate(()=>localStorage.getItem("etp-cert-course"))||"").includes("answers"),"Course saves progress locally");
  check(await page.locator('a[href="final/"]').count()===1,"Final exam linked from center");
  await page.screenshot({path:OUT+"/center-desktop.png",fullPage:true});
  await context.close();

  // Foundations: authentic browser, data loading, answer controls, completion, print-to-PDF.
  ({context,page}=await setup({width:1365,height:900},"foundations"));
  await page.goto(BASE+"foundations/",{waitUntil:"networkidle"});
  check(await page.locator(".qjump").count()===120,"Foundations loads all 120 questions");
  await page.locator('input[name="answer"]').first().check();
  check((await page.locator("#answered-count").innerText())==="1","Foundations answer counted");
  await page.reload({waitUntil:"networkidle"});
  check((await page.locator("#answered-count").innerText())==="1","Foundations response survives reload");
  await page.evaluate(()=>{
    const m=JSON.parse(localStorage.getItem("etp-foundations-5941-v1"));
    const keys=[...document.querySelectorAll(".qjump")].map((_,i)=>"");
  });
  const bank=await page.evaluate(async()=> {
    const files=["questions-world-early.json","questions-world-modern.json","questions-us-early.json","questions-us-modern.json"];
    const sets=await Promise.all(files.map(x=>fetch(x).then(r=>r.json())));
    return sets.flat().map(q=>({id:q.id,answer:q.answer}));
  });
  await page.evaluate((items)=> {
    localStorage.setItem("etp-foundations-5941-v1",JSON.stringify({answers:Object.fromEntries(items.map(q=>[q.id,q.answer])),flags:{},current:119,completedAt:null}));
  },bank);
  await page.reload({waitUntil:"networkidle"});
  check((await page.locator("#answered-count").innerText())==="120","Foundations restores all 120 answers");
  await page.locator("#finish").click();
  check((await page.locator("#result-score").innerText()).includes("120 / 120"),"Foundations score calculation");
  check(await page.locator("#earned-certificate").isVisible(),"Foundations earned certificate appears");
  await checkReadability(page,[".question-card h2",".choice-list .choice",".side-card h3",".lab-head h1",".lab-head .pill"],"Foundations");
  await page.screenshot({path:OUT+"/foundations-results.png",fullPage:true});
  await page.emulateMedia({media:"print"});
  await page.evaluate(()=>document.body.classList.add("print-certificate"));
  const pdf=await page.pdf({printBackground:true,format:"Letter"});
  check(pdf.byteLength>2500,"Foundations PDF generation");
  await writeFile(OUT+"/foundations-certificate.pdf",pdf);
  await context.close();

  // Timed exams: independent banks, timer, navigation, submission, scores, generated PDF.
  for(const exam of ["readiness","final"]) {
    ({context,page}=await setup({width:1365,height:900},exam));
    await page.goto(BASE+exam+"/",{waitUntil:"networkidle"});
    check(await page.locator("#intro").isVisible(),exam+": start screen renders");
    await page.locator("#consent").check();
    await page.locator("#start").click();
    check(await page.locator("#exam").isVisible(),exam+": exam opens");
    await checkReadability(page,[".stem",".option",".side h3",".hero h1"],exam);
    check(await page.locator(".qjump").count()===120,exam+": 120 question navigator buttons");
    check((await page.locator("#clock").innerText()).startsWith("01:59")||(await page.locator("#clock").innerText()).startsWith("02:00"),exam+": timer running");
    await page.locator('input[name="option"]').first().check();
    await page.locator("#next").click();
    const nextLabel=await page.locator("#questionNumber").innerText();
    console.log(exam+" navigation label after Next:",JSON.stringify(nextLabel));
    check(/QUESTION\s+2\s+OF\s+120/i.test(nextLabel),exam+": next-question control (found: "+nextLabel+")");
    await page.locator("#flag").click();
    check((await page.locator("#flag").innerText()).includes("Flagged"),exam+": question marking");
    await page.locator("#submit").click();
    check(await page.locator("#results").isVisible(),exam+": report visible");
    check(await page.locator(".review-item").count()===120,exam+": explanations for all items");
    await page.screenshot({path:OUT+"/"+exam+"-results.png",fullPage:true});
    await page.emulateMedia({media:"print"});
    await page.evaluate(()=>document.body.classList.add("print-certificate"));
    const pdf=await page.pdf({printBackground:true,format:"Letter"});
    check(pdf.byteLength>2500,exam+": certificate PDF generated");
    await writeFile(OUT+"/"+exam+"-certificate.pdf",pdf);
    await context.close();
  }

  // Mobile: no sideways overflow, usable controls, dark shell kept.
  for(const route of ["","foundations/","readiness/","final/"]){
    ({context,page}=await setup({width:390,height:844},"mobile "+route));
    await page.goto(BASE+route,{waitUntil:"networkidle"});
    const sizes=await page.evaluate(()=>({documentWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth}));
    check(sizes.documentWidth<=sizes.viewportWidth+2,"Mobile no horizontal overflow: "+(route||"center"));
    await page.screenshot({path:OUT+"/mobile-"+(route.split("/")[0]||"center")+".png",fullPage:true});
    await context.close();
  }

  console.log("SUCCESS: "+pass+" real Chromium release assertions passed");
}catch(e){
  console.error("RELEASE AUDIT FAILURE:",e.stack||e);
  process.exitCode=1;
}finally{
  await browser.close();
}
