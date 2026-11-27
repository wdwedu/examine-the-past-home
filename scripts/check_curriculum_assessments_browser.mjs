import assert from "node:assert/strict";
import { chromium, devices } from "playwright";

const root = new URL(process.env.ETP_TEST_URL || "http://127.0.0.1:8765/");
const courses = {
  9: "grade-9-united-states-history",
  10: "grade-10-civics-government",
  11: "grade-11-modern-world-history",
  12: "grade-12-social-studies-electives",
};
const getBank = async file => {
  const response = await fetch(new URL("assets/" + file, root));
  assert.ok(response.ok, `Could not load ${file}: ${response.status}`);
  return (await response.json()).units;
};
const [history, civics, upper] = await Promise.all([
  getBank("high-school-assessments-data.json"),
  getBank("grade10-civics-assessments-data.json"),
  getBank("upper-secondary-assessment-question-bank.json"),
]);

async function open(page, grade, unit) {
  const route = grade < 11
    ? `unit-${unit.replace(".", "-")}-assessment/`
    : `unit-assessments/?unit=${unit}`;
  const response = await page.goto(new URL(`lessons/curriculum/${courses[grade]}/${route}`, root).href,
    { waitUntil: "domcontentloaded" });
  assert.ok(response?.ok(), `Assessment request failed: ${unit}`);
}

async function checkGrade9Alignment(page) {
  const response = await fetch(new URL("assets/grade9-grade5-template-data.json", root));
  assert.ok(response.ok);
  const { lessons } = await response.json();
  const mapped = Object.entries(lessons).filter(([, lesson]) => lesson.marylandAlignment);
  assert.equal(mapped.length, 40);
  const imperialismCodes = mapped.filter(([, lesson]) => lesson.unit === "9.3")
    .flatMap(([, lesson]) => lesson.marylandAlignment.code.split(" and "));
  assert.deepEqual(imperialismCodes.sort(), ["USH.1.2.a", "USH.1.2.b", "USH.1.2.c", "USH.1.2.d"]);
  const warCodes = mapped.filter(([, lesson]) => lesson.unit === "9.4")
    .flatMap(([, lesson]) => lesson.marylandAlignment.code.split(" and "));
  assert.deepEqual(warCodes.sort(), ["USH.2.1.a", "USH.2.1.b", "USH.2.1.c", "USH.2.1.d",
    "USH.2.1.e", "USH.2.1.f", "USH.2.1.g"]);
  const twentiesCodes = mapped.filter(([, lesson]) => lesson.unit === "9.5")
    .flatMap(([, lesson]) => lesson.marylandAlignment.code.split(" and "));
  assert.deepEqual(twentiesCodes.sort(), ["USH.2.2.a", "USH.2.2.b", "USH.2.2.c", "USH.2.2.d",
    "USH.2.2.e", "USH.2.2.f", "USH.2.2.g"]);
  const depressionCodes = mapped.filter(([, lesson]) => lesson.unit === "9.6")
    .map(([, lesson]) => lesson.marylandAlignment.code);
  assert.deepEqual(depressionCodes.sort(), ["USH.2.3.a", "USH.2.3.b", "USH.2.3.c", "USH.2.3.d"]);
  const worldWarIICodes = mapped.filter(([, lesson]) => lesson.unit === "9.7")
    .flatMap(([, lesson]) => lesson.marylandAlignment.code.split(" and "));
  assert.deepEqual(worldWarIICodes.sort(), [
    "USH.2.4.a", "USH.2.4.b", "USH.2.4.c", "USH.2.4.d", "USH.2.4.e", "USH.2.4.f",
    "USH.2.5.a", "USH.2.5.b", "USH.2.5.c",
  ]);
  const coldWarCodes = mapped.filter(([, lesson]) => lesson.unit === "9.8")
    .flatMap(([, lesson]) => lesson.marylandAlignment.code.split(" and "));
  assert.deepEqual(coldWarCodes.sort(), [
    "USH.3.2.a", "USH.3.2.b", "USH.3.2.c", "USH.3.2.d", "USH.3.2.e", "USH.3.2.f",
    "USH.3.4.a", "USH.3.4.b", "USH.3.4.d",
  ]);
  const civilRightsCodes = mapped.filter(([, lesson]) => lesson.unit === "9.9")
    .flatMap(([, lesson]) => lesson.marylandAlignment.code.split(" and "));
  assert.deepEqual(civilRightsCodes.sort(), [
    "USH.3.3.a", "USH.3.3.b", "USH.3.3.c", "USH.3.3.d", "USH.3.3.e", "USH.3.3.i", "USH.3.3.l",
  ]);
  const lateCenturyCodes = mapped.filter(([, lesson]) => lesson.unit === "9.10")
    .flatMap(([, lesson]) => lesson.marylandAlignment.code.split(" and "));
  assert.deepEqual(lateCenturyCodes.sort(), [
    "USH.3.4.c", "USH.3.4.e", "USH.4.4.a", "USH.4.4.b", "USH.4.5.a", "USH.4.5.b", "USH.4.5.c",
    "USH.5.1.a", "USH.5.1.b", "USH.5.1.c",
  ]);
  const frameworkIds = { content: 17926, bridge: 17926, review: 17918 };
  for (const [slug, { unit, marylandAlignment: alignment }] of mapped) {
    const url = new URL(`lessons/curriculum/${courses[9]}/${slug}/`, root);
    assert.ok((await page.goto(url.href, { waitUntil: "domcontentloaded" }))?.ok(), slug);
    const standards = page.locator("#plan details").filter({ has: page.getByText("Standards", { exact: true }) });
    await standards.locator("summary").click();
    assert.ok((await standards.innerText()).includes(alignment.code), slug);
    assert.equal(await standards.getByRole("link", { name: "Open Maryland framework" }).getAttribute("href"),
      `https://msde.maryland.gov/media/${frameworkIds[alignment.kind]}#page=${alignment.page}`);
    const objectives = page.locator("#plan details").filter({ has: page.getByText("Objectives", { exact: true }) });
    await objectives.locator("summary").click();
    assert.ok((await objectives.innerText()).includes(alignment.objective));
    await standards.getByRole("link", { name: "Go to the exit ticket" }).click();
    assert.equal(new URL(page.url()).hash, "#g9-md-prompt");
    assert.equal(await page.locator("#g9-md-prompt").innerText(), alignment.prompt);
    assert.ok((await page.locator("#g9-md-criteria").innerText()).includes(alignment.criteria));
    const sources = page.getByRole("list", { name: "Sources for the exit ticket" }).getByRole("link");
    assert.deepEqual(await sources.evaluateAll(links => links.map(link => link.getAttribute("href"))),
      alignment.sources.map(source => source.url));
    const assessment = page.locator("#assess details").filter({ hasText: "Final Assessment" });
    await assessment.locator("summary").click();
    const assessmentLink = assessment.getByRole("link", { name: `Open the full Unit ${unit} Assessment` });
    assert.equal(await assessmentLink.getAttribute("href"), `../unit-${unit.replace(".", "-")}-assessment/`);
    const field = page.getByLabel("My evidence-based reflection");
    assert.equal(await field.getAttribute("aria-describedby"), "g9-md-prompt g9-md-criteria");
    await field.fill("I can support this claim with evidence.");
    assert.equal(await field.inputValue(), "I can support this claim with evidence.");
    if (alignment.reading) {
      const guided = page.locator("#discover");
      assert.ok(await guided.getByRole("heading", { name: alignment.readingTitle, exact: true }).isVisible());
      for (const paragraph of alignment.reading) {
        assert.ok((await guided.innerText()).includes(paragraph));
      }
    }
    if (slug === "america-and-the-global-economy") {
      await Promise.all([page.waitForURL("**/unit-9-10-assessment/"), assessmentLink.click()]);
      await page.getByRole("heading", { name: "Document D · Household Internet access" }).waitFor();
    }
    if (slug === "the-civil-rights-movement-s-lasting-impact") {
      await Promise.all([page.waitForURL("**/unit-9-9-assessment/"), assessmentLink.click()]);
      await page.getByRole("heading", { name: "Document D · Voting rights in practice" }).waitFor();
    }
    if (slug === "nuclear-competition-and-the-space-race") {
      await Promise.all([page.waitForURL("**/unit-9-8-assessment/"), assessmentLink.click()]);
      await page.getByRole("heading", { name: "Document D · The Cuban Missile Crisis" }).waitFor();
    }
    if (slug === "the-holocaust-and-human-rights") {
      await Promise.all([page.waitForURL("**/unit-9-7-assessment/"), assessmentLink.click()]);
      await page.getByRole("heading", { name: "Document D · U.S. refugee policy, 1938–41" }).waitFor();
    }
    if (slug === "living-through-the-great-depression") {
      await Promise.all([page.waitForURL("**/unit-9-6-assessment/"), assessmentLink.click()]);
      await page.getByRole("heading", { name: "Document D · Bank suspensions and deposit insurance" }).waitFor();
    }
    if (slug === "the-harlem-renaissance") {
      await Promise.all([page.waitForURL("**/unit-9-5-assessment/"), assessmentLink.click()]);
      await page.getByRole("heading", { name: "Document B · Indian Citizenship Act" }).waitFor();
    }
    if (slug === "the-spanish-american-war") {
      await Promise.all([page.waitForURL("**/unit-9-3-assessment/"), assessmentLink.click()]);
      await page.getByRole("heading", { name: "Document A · Treaty of Paris" }).waitFor();
    }
  }
  const crisisUrl = new URL(`lessons/curriculum/${courses[9]}/causes-of-world-war-i/`, root);
  assert.ok((await page.goto(crisisUrl.href, { waitUntil: "domcontentloaded" }))?.ok());
  const evidence = page.locator("#evidence");
  const diplomaticSources = evidence.getByRole("link");
  await evidence.getByText("Historical references and credits", { exact: true }).click();
  const sourceUrls = await diplomaticSources.evaluateAll(links => links.map(link => link.getAttribute("href")));
  assert.ok(sourceUrls.includes("https://history.state.gov/historicaldocuments/frus1914Supp/d30"));
  assert.ok(sourceUrls.includes("https://history.state.gov/historicaldocuments/frus1914Supp/d32"));
  const assessment = page.locator("#assess details").filter({ hasText: "Final Assessment" });
  await assessment.locator("summary").click();
  await Promise.all([
    page.waitForURL("**/unit-9-4-assessment/"),
    assessment.getByRole("link", { name: "Open the full Unit 9.4 Assessment" }).click(),
  ]);
  await page.getByRole("heading", { name: "Document C · Versailles, Article X" }).waitFor();
  console.log("PASS forty Grade 9 alignments, July Crisis source links, and lesson-to-assessment navigation");
}

const worldHistoryResponse = await fetch(new URL("assets/grade11-grade5-matched-data.json", root));
assert.ok(worldHistoryResponse.ok, "Could not load Grade 11 lesson alignment");
const worldHistory = await worldHistoryResponse.json();
assert.deepEqual(Object.keys(worldHistory.marylandUnitArguments).sort((a, b) => Number(a.split(".")[1]) - Number(b.split(".")[1])),
  Array.from({ length: 11 }, (_, index) => `11.${index + 1}`));

async function checkMarylandLessons(page) {
  const lessons = Object.entries(worldHistory.lessons).filter(([, lesson]) => lesson.marylandAlignment);
  assert.equal(lessons.length, 40);
  assert.equal(lessons.filter(([, lesson]) => lesson.marylandAlignment.inquiry).length, 4);
  const cases = lessons.flatMap(([, lesson]) => lesson.caseStudies ?? []);
  assert.equal(cases.length, 54);
  const coveredContent = new Set([
    ...lessons.filter(([, lesson]) => !lesson.marylandAlignment.inquiry).map(([, lesson]) => lesson.marylandAlignment.code),
    ...cases.map(study => study.code),
  ]);
  assert.equal(coveredContent.size, 83);
  assert.equal([...coveredContent].filter(code => code.startsWith("MWH.2.")).length, 25);
  assert.equal([...coveredContent].filter(code => code.startsWith("MWH.3.")).length, 32);
  assert.equal([...coveredContent].filter(code => code.startsWith("MWH.4.")).length, 17);
  for (const [slug, lesson] of lessons) {
    const url = new URL(`lessons/curriculum/${courses[11]}/${slug}/`, root);
    assert.ok((await page.goto(url.href, { waitUntil: "domcontentloaded" }))?.ok(), slug);
    const { code, page: frameworkPage, objective, evidence, criteria, inquiry } = lesson.marylandAlignment;
    const standards = page.locator("#plan details").filter({ has: page.getByText("Standards", { exact: true }) });
    await standards.locator("summary").click();
    const standardsText = await standards.innerText();
    assert.ok(standardsText.includes(code), slug + " Maryland code");
    assert.equal(standardsText.includes("Maryland inquiry skills"), Boolean(inquiry), slug + " alignment type");
    assert.ok((await standards.innerText()).includes(objective), slug + " objective");
    assert.equal(await standards.getByRole("link", { name: /Maryland Modern World History/ }).getAttribute("href"),
      `https://msde.maryland.gov/media/17929#page=${frameworkPage}`, slug + " framework page");
    const objectives = page.locator("#plan details").filter({ has: page.getByText("Objectives", { exact: true }) });
    await objectives.locator("summary").click();
    assert.ok((await objectives.innerText()).includes(objective), slug + " lesson objective");
    const closure = page.locator("#closure");
    const closureText = await closure.innerText();
    assert.ok(closureText.includes(evidence), slug + " exit ticket");
    assert.ok(closureText.includes(criteria), slug + " success criteria");
    assert.ok(await closure.getByLabel("My evidence-based reflection").isEditable(), slug + " response field");
    for (const study of lesson.caseStudies ?? []) {
      const id = "history-case-" + study.code.toLowerCase().replaceAll(".", "-");
      const jump = standards.getByRole("link", { name: study.title });
      assert.equal(await jump.getAttribute("href"), "#" + id);
      await jump.click();
      assert.equal(new URL(page.url()).hash, "#" + id, slug + " study navigation");
      const panel = page.locator("#" + id);
      assert.ok(await panel.getByRole("heading", { name: study.title }).isVisible(), slug + " study heading");
      const body = await panel.innerText();
      for (const text of [...study.reading, study.prompt, study.criteria]) {
        assert.ok(body.includes(text), slug + " study content");
      }
      const links = await panel.getByRole("link").evaluateAll(items => items.map(item => item.getAttribute("href")));
      assert.deepEqual(links, study.sources.map(source => source.url), slug + " study source links");
      const answerField = panel.getByLabel("My case-study response");
      await answerField.fill("I can support my claim with a dated detail.");
      assert.equal(await answerField.inputValue(), "I can support my claim with a dated detail.");
    }

  }
  console.log(`PASS Maryland objectives and exit tickets in all 40 Grade 11 lessons and ${cases.length} case studies`);
}

const answer = (page, index, value) => page.locator(`input[name="q${index}"][value="${value}"]`);

async function checkMixedFormat(page, data) {
  const questions = page.locator("#questions fieldset");
  await questions.first().waitFor();
  assert.equal(await questions.count(), data.questions.length);
  if (data.id === "9.3") {
    assert.match(await questions.first().innerText(), /Cuba from the Philippines/);
    assert.ok(await page.locator("#performance").getByText(data.writing, { exact: true }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document A · Treaty of Paris" }).isVisible());
  }

  if (data.id === "9.10") {
    assert.match(await questions.nth(5).innerText(), /INF Treaty/);
    assert.ok(await page.locator("#performance").getByText(data.writing, { exact: true }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document A · Watergate tape transcript" }).isVisible());
  }

  if (data.id === "9.9") {
    assert.match(await questions.nth(5).innerText(), /voter registration figures/);
    assert.ok(await page.locator("#performance").getByText(data.writing, { exact: true }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document D · Voting rights in practice" }).isVisible());
  }

  if (data.id === "9.8") {
    assert.match(await questions.nth(1).innerText(), /civil-defense training film/);
    assert.ok(await page.locator("#performance").getByText(data.writing, { exact: true }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document D · The Cuban Missile Crisis" }).isVisible());
  }

  if (data.id === "9.7") {
    assert.match(await questions.first().innerText(), /Neutrality Acts to Lend-Lease/);
    assert.ok(await page.locator("#performance").getByText(data.writing, { exact: true }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document D · U.S. refugee policy, 1938–41" }).isVisible());
  }

  if (data.id === "9.6") {
    assert.match(await questions.nth(3).innerText(), /banking panics/);
    assert.ok(await page.locator("#performance").getByText(data.writing, { exact: true }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document D · Bank suspensions and deposit insurance" }).isVisible());
  }

  if (data.id === "9.5") {
    assert.match(await questions.first().innerText(), /installment credit/);
    assert.ok(await page.locator("#performance").getByText(data.writing, { exact: true }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document A · Tennessee Butler Act" }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document D · Drinking during Prohibition" }).isVisible());
  }

  if (data.id === "9.4") {
    assert.match(await questions.first().innerText(), /Zimmermann Telegram/);
    assert.ok(await page.locator("#performance").getByText(data.writing, { exact: true }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document C · Versailles, Article X" }).isVisible());
    assert.ok(await page.getByRole("heading", { name: "Document D · Black migration and war work" }).isVisible());
  }

  await page.getByRole("button", { name: "Grade My Answers" }).click();
  assert.match(await page.locator("#result").innerText(), /Assessment incomplete/);

  for (const [index, item] of data.questions.entries()) {
    await answer(page, index, item.answer).check();
  }
  for (const [index, item] of data.matchingPrompts.entries()) {
    await page.locator("#matching select").nth(index).selectOption(String(item.answer));
  }
  for (const [index, value] of data.inquiryAnswers.entries()) {
    await page.locator("#sequence-card select").nth(index).selectOption(String(value));
  }
  for (const [index, supported] of data.conclusionKey.entries()) {
    await page.locator("#evidence-options input").nth(index).setChecked(supported);
  }
  await page.locator(".exam-writing").fill("Browser test response");
  await page.locator("#performance-rubric summary").click();
  for (let index = 0; index < 4; index++) {
    await page.locator(`input[name="rating${index}"][value="3"]`).check();
  }
  await page.getByRole("button", { name: "Grade My Answers" }).click();
  const result = await page.locator("#result").innerText();
  assert.match(result, /27\s*\/\s*27/);
  assert.match(result, /teacher.review/i);
  await page.getByRole("button", { name: "Reset and Try Again" }).click();
  assert.equal(await answer(page, 0, data.questions[0].answer).isChecked(), false);
  assert.equal(await page.locator(".exam-writing").inputValue(), "");
}

async function checkUpper(page, grade, unit, items, expectedUnits, mobile) {
  const picker = page.getByLabel("Choose unit");
  await picker.waitFor();
  assert.equal(await picker.inputValue(), unit);
  assert.deepEqual(await picker.locator("option").evaluateAll(options => options.map(option => option.value)), expectedUnits);
  assert.equal(await page.locator("#ua-form fieldset").count(), items.length);

  const alignment = grade === 11 ? worldHistory.marylandUnitArguments[unit] : undefined;
  if (alignment) {
    assert.equal(await page.locator("#ua-writing-prompt").innerText(), alignment.prompt);
    assert.equal(await page.getByLabel("Final written response").getAttribute("aria-describedby"), "ua-writing-prompt");
    for (const slug of alignment.lessons) {
      const source = page.getByRole("link", { name: worldHistory.lessons[slug].title, exact: true });
      assert.equal(await source.getAttribute("href"), `../${slug}/#evidence`);
    }
    const rubric = page.locator("details").filter({ has: page.getByText("Teacher review rubric · 12 points", { exact: true }) });
    await rubric.locator("summary").click();
    assert.ok((await rubric.innerText()).includes(alignment.review));
  }

  const correct = answer(page, 0, items[0].answer);
  await correct.press("Space");
  assert.equal(await correct.isChecked(), true);
  await answer(page, 1, (items[1].answer + 1) % items[1].options.length).check();
  await page.locator("#ua-sources").fill("Browser test source");
  await page.locator("#ua-writing").fill("Browser test argument");
  await page.getByRole("button", { name: "Check Part A" }).click();
  const status = page.locator("#ua-results");
  assert.match(await status.innerText(), new RegExp(`1 / ${items.length} correct \\(2 attempted\\)`));
  assert.match(await status.innerText(), /Parts B and C require teacher review/);
  const feedback = await page.locator("#ua-feedback li").allTextContents();
  assert.match(feedback[0], /Correct/);
  assert.match(feedback[1], /Needs review/);
  assert.match(feedback[2], /Not answered/);

  await page.getByRole("button", { name: "Save my answers in this browser" }).click();
  assert.match(await status.innerText(), /Responses saved/);
  await page.reload();
  await correct.waitFor();
  assert.equal(await correct.isChecked(), true);
  assert.equal(await page.locator("#ua-writing").inputValue(), "Browser test argument");

  const other = expectedUnits.find(id => id !== unit);
  await picker.selectOption(other);
  assert.equal(await page.locator("#ua-writing").inputValue(), "");
  await picker.selectOption(unit);
  assert.equal(await page.locator("#ua-writing").inputValue(), "Browser test argument");

  if (!mobile) {
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.getByRole("button", { name: "Copy my responses" }).click();
    await page.waitForFunction(() => document.querySelector("#ua-results").textContent.includes("copied"));
    const copy = await page.evaluate(() => navigator.clipboard.readText());
    assert.match(copy, /Browser test source[\s\S]*Browser test argument/);
  }
  page.once("dialog", dialog => dialog.accept());
  await page.getByRole("button", { name: "Clear this unit" }).click();
  assert.match(await status.innerText(), /Responses cleared/);
  assert.equal(await correct.isChecked(), false);
  assert.equal(await page.locator("#ua-writing").inputValue(), "");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true,
    `Grade ${grade}, unit ${unit}: page overflows horizontally`);
}

const browser = await chromium.launch();
try {
  for (const mobile of [false, true]) {
    const settings = mobile ? devices["Pixel 7"] : { viewport: { width: 1366, height: 900 } };
    const context = await browser.newContext({ ...settings, reducedMotion: "reduce" });
    try {
      for (const grade of [9, 10, 11, 12]) {
        const bank = grade === 9 ? history : grade === 10 ? civics : upper;
        const units = Object.keys(bank).filter(id => id.startsWith(grade + "."))
          .sort((a, b) => Number(a.split(".")[1]) - Number(b.split(".")[1]));
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        try {
          for (const unit of units) {
            await open(page, grade, unit);
            if (grade < 11) {
              await checkMixedFormat(page, bank[unit]);
            } else {
              await checkUpper(page, grade, unit, bank[unit], units, mobile);
            }
            assert.deepEqual(errors, [], `Grade ${grade} unit ${unit} browser errors`);
            console.log(`PASS Grade ${grade} · Unit ${unit} · ${mobile ? "mobile viewport" : "desktop"}`);
          }
          if (grade === 9) {
            await checkGrade9Alignment(page);
            assert.deepEqual(errors, [], "Grade 9 lesson browser errors");
          }
          if (grade === 11) {
            await checkMarylandLessons(page);
            assert.deepEqual(errors, [], "Grade 11 lesson browser errors");
          }
        } finally {
          await page.close();
        }
      }
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
