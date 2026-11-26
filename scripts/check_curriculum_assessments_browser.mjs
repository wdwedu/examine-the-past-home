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
