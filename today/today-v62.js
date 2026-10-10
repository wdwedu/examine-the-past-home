(() => {
  const local = window.ETP_TODAY_DATA || {};
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const monthSelect = document.getElementById("monthSelect");
  const daySelect = document.getElementById("daySelect");
  const images = document.getElementById("imageSelect");
  const grid = document.getElementById("calendarGrid");
  const calTitle = document.getElementById("calendarTitle");
  const label = document.getElementById("selectedDateLabel");
  const results = document.getElementById("todayResults");
  const empty = document.getElementById("todayEmpty");
  const count = document.getElementById("eventCount");
  const heading = document.getElementById("resultsHeading");
  const feedStatus = document.getElementById("feedStatus");
  const flash = document.getElementById("timeFlash");

  let filter = "all";
  let calendarYear = new Date().getFullYear();
  let calendarMonth = new Date().getMonth();
  let rowsCache = [];

  monthNames.forEach((name, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = name;
    monthSelect.appendChild(option);
  });

  const pad = n => String(n).padStart(2, "0");
  const dateKey = (m, d) => pad(m) + "-" + pad(d);
  const maxDays = (m, y = 2024) => new Date(y, m, 0).getDate();

  function fillDays(month, keep) {
    const previous = keep || Number(daySelect.value) || 1;
    daySelect.innerHTML = "";
    for (let d = 1; d <= maxDays(month); d++) {
      const option = document.createElement("option");
      option.value = d;
      option.textContent = d;
      daySelect.appendChild(option);
    }
    daySelect.value = Math.min(previous, maxDays(month));
  }

  function categoryLabel(c) {
    return ({
      us: "U.S. History",
      world: "World History",
      black: "Black History",
      civics: "Civics & Government",
      science: "Science & Technology",
      culture: "Culture"
    })[c] || c;
  }

  function inferCategories(text) {
    const t = String(text || "").toLowerCase();
    const cats = ["world"];
    if (/united states|u\.s\.|american |washington|congress|president/.test(t)) cats.unshift("us");
    if (/black|african american|civil rights|slavery|enslaved|apartheid|mandela|king jr|rosa parks/.test(t)) cats.unshift("black");
    if (/constitution|supreme court|law|government|election|treaty|rights/.test(t)) cats.unshift("civics");
    if (/science|space|moon|satellite|technology|invent|discover|medical|physics|astronom/.test(t)) cats.unshift("science");
    if (/music|film|art|book|novel|theater|culture|album/.test(t)) cats.unshift("culture");
    return [...new Set(cats)];
  }

  function iconFor(cats) {
    if (cats.includes("science")) return "🔭";
    if (cats.includes("black")) return "✊🏾";
    if (cats.includes("civics")) return "🏛️";
    if (cats.includes("culture")) return "🎭";
    if (cats.includes("us")) return "🇺🇸";
    return "🌍";
  }

  function normalizeLocal(e) {
    return {
      year: e.year,
      title: e.title,
      text: e.text,
      cats: e.cats || ["world"],
      links: e.links || [],
      source: "Examine the Past",
      url: (e.links && e.links[0] && e.links[0][1]) || "",
      image: e.image || ""
    };
  }

  function wikiRow(e) {
    const page = (e.pages || [])[0] || {};
    const url =
      (page.content_urls && page.content_urls.desktop && page.content_urls.desktop.page) ||
      (page.content_urls && page.content_urls.mobile && page.content_urls.mobile.page) ||
      "";
    const image =
      (page.thumbnail && page.thumbnail.source) ||
      (page.originalimage && page.originalimage.source) ||
      "";
    const title =
      (page.titles && page.titles.normalized) ||
      page.title ||
      (e.text ? e.text.split(".")[0] : "") ||
      "Historical event";

    return {
      year: e.year,
      title,
      text: e.text || page.extract || "",
      cats: inferCategories((e.text || "") + " " + (page.description || "")),
      links: [],
      source: "Wikipedia historical feed",
      url,
      image
    };
  }

  async function fetchWiki(month, day) {
    const url = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/" + pad(month) + "/" + pad(day);
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error("Historical feed " + response.status);
    const payload = await response.json();
    const seen = new Set();
    const out = [];
    const sourceRows = [...(payload.selected || []), ...(payload.events || [])];

    sourceRows.forEach(event => {
      const row = wikiRow(event);
      const id = row.year + "|" + row.title;
      if (!seen.has(id)) {
        seen.add(id);
        out.push(row);
      }
    });

    return out.slice(0, 35);
  }

  function showFlash() {
    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");
    if (window.ETPTransitions && window.ETPTransitions.clickSound) {
      window.ETPTransitions.clickSound("time");
    }
  }

  function dateText(month, day) {
    return monthNames[month - 1] + " " + day;
  }

  function buildCalendar() {
    calTitle.textContent = monthNames[calendarMonth] + " " + calendarYear;
    grid.innerHTML = "";

    const firstWeekday = new Date(calendarYear, calendarMonth, 1).getDay();
    const days = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const activeMonth = Number(monthSelect.value);
    const activeDay = Number(daySelect.value);

    for (let i = 0; i < firstWeekday; i++) {
      const blank = document.createElement("span");
      blank.className = "calendar-day empty";
      grid.appendChild(blank);
    }

    for (let day = 1; day <= days; day++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "calendar-day";
      button.textContent = day;

      if (local[dateKey(calendarMonth + 1, day)]) button.classList.add("has-local");
      if (activeMonth === calendarMonth + 1 && activeDay === day) button.classList.add("active");

      button.addEventListener("click", () => {
        monthSelect.value = calendarMonth + 1;
        fillDays(calendarMonth + 1, day);
        daySelect.value = day;
        travel(true);
      });

      grid.appendChild(button);
    }
  }

  function card(row) {
    const showImages = images.value === "on";
    let visual = "";

    if (showImages) {
      visual = row.image
        ? '<img class="today-thumb" loading="lazy" src="' + row.image + '" alt="">'
        : '<div class="today-thumb-fallback" aria-hidden="true">' + iconFor(row.cats) + "</div>";
    }

    const className = "today-card" + (showImages ? "" : " no-image");
    const localLinks = (row.links || [])
      .map(link => '<a href="' + link[1] + '">' + link[0] + "</a>")
      .join("");

    const sourceLink = row.url
      ? '<a class="today-source" href="' + row.url + '" target="_blank" rel="noopener">Source ↗</a>'
      : "";

    return (
      '<article class="' + className + '">' +
        visual +
        "<div>" +
          '<div class="today-card-top">' +
            '<span class="today-card-year">' + row.year + "</span>" +
            '<span class="today-card-cat">' + row.cats.map(categoryLabel).join(" • ") + "</span>" +
          "</div>" +
          "<h3>" + row.title + "</h3>" +
          "<p>" + row.text + "</p>" +
          '<div class="today-card-links">' +
            localLinks +
            '<a href="../timeline/" data-etp-transition="timeline">Timeline</a>' +
            '<a href="../maps/" data-etp-transition="map">Map</a>' +
            sourceLink +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function paint() {
    const rows = filter === "all"
      ? rowsCache
      : rowsCache.filter(row => row.cats.includes(filter));

    results.innerHTML = rows.map(card).join("");
    count.textContent = rows.length + " event" + (rows.length === 1 ? "" : "s");
    empty.hidden = rows.length !== 0;

    const selected = dateText(Number(monthSelect.value), Number(daySelect.value));
    heading.textContent = selected;
    label.textContent = "Showing events for " + selected + ".";
    history.replaceState(null, "", "#" + dateKey(Number(monthSelect.value), Number(daySelect.value)));
  }

  async function travel(animated = false) {
    const month = Number(monthSelect.value);
    const day = Number(daySelect.value);

    if (animated) showFlash();

    calendarMonth = month - 1;
    calendarYear = new Date().getFullYear();
    buildCalendar();

    const localRows = (local[dateKey(month, day)] || []).map(normalizeLocal);
    rowsCache = [...localRows];

    feedStatus.textContent = localRows.length
      ? "Loading broader historical feed…"
      : "Loading historical feed…";
    paint();

    try {
      const remote = await fetchWiki(month, day);
      const ids = new Set(rowsCache.map(row => row.year + "|" + row.title.toLowerCase()));

      remote.forEach(row => {
        const id = row.year + "|" + row.title.toLowerCase();
        if (!ids.has(id)) {
          ids.add(id);
          rowsCache.push(row);
        }
      });

      feedStatus.textContent = "Examine the Past curated entries + Wikipedia historical feed";
    } catch (error) {
      feedStatus.textContent = "Examine the Past curated entries • live feed unavailable";
    }

    paint();
  }

  document.querySelectorAll(".today-filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".today-filter").forEach(x => x.classList.remove("active"));
      button.classList.add("active");
      filter = button.dataset.filter;
      if (window.ETPTransitions && window.ETPTransitions.clickSound) {
        window.ETPTransitions.clickSound("tap");
      }
      paint();
    });
  });

  monthSelect.addEventListener("change", () => {
    fillDays(Number(monthSelect.value), 1);
    calendarMonth = Number(monthSelect.value) - 1;
    buildCalendar();
  });

  daySelect.addEventListener("change", buildCalendar);
  images.addEventListener("change", paint);
  document.getElementById("travelBtn").addEventListener("click", () => travel(true));

  document.getElementById("calendarPrev").addEventListener("click", () => {
    calendarMonth--;
    if (calendarMonth < 0) {
      calendarMonth = 11;
      calendarYear--;
    }
    buildCalendar();
  });

  document.getElementById("calendarNext").addEventListener("click", () => {
    calendarMonth++;
    if (calendarMonth > 11) {
      calendarMonth = 0;
      calendarYear++;
    }
    buildCalendar();
  });

  let initial = new Date();
  const hash = location.hash.match(/^#(\d{2})-(\d{2})$/);

  if (hash) {
    const m = Number(hash[1]);
    const d = Number(hash[2]);
    if (m >= 1 && m <= 12 && d >= 1 && d <= maxDays(m)) {
      initial = new Date(initial.getFullYear(), m - 1, d);
    }
  }

  monthSelect.value = initial.getMonth() + 1;
  fillDays(initial.getMonth() + 1, initial.getDate());
  daySelect.value = initial.getDate();
  calendarMonth = initial.getMonth();
  calendarYear = initial.getFullYear();
  buildCalendar();
  travel(false);
})();