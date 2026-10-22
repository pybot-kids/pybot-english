// Lesson pages. Each lessons/*.html keeps its whole lesson as JSON in
// <script type="application/json" id="lesson-data">, and this file draws it:
// Look, Listen, Say, How to use it, Check (activities), New words, Practice at home.
// Loaded after script.js, so it uses its translations, storage, PyBot and rewards.
// Text values are { "es": "…", "en": "…" }; plain strings are English being learned.

Object.assign(translations.es, {
  "lesson.zone": "ZONA {number} · {name}",
  "lesson.page": "Página {page} de {total}",
  "lesson.pybotSays": "PYBOT DICE",
  "lesson.lookTitle": "Mira y escucha",
  "lesson.listenTitle": "Escucha",
  "lesson.listenText": "Toca 🔊 para oír cada palabra. Toca 🐢 para oírla más despacio.",
  "lesson.sayTitle": "Dila",
  "lesson.sayText": "Dila en voz alta tres veces. Nadie te califica: así se aprende.",
  "lesson.useTitle": "Cómo se usa",
  "lesson.checkTitle": "Revisa",
  "lesson.checkText": "Elige la respuesta. Si te equivocas, PyBot te da una pista.",
  "lesson.wordsTitle": "Palabras nuevas",
  "lesson.homeTitle": "Practica en casa",
  "lesson.homeAdult": "Para adultos:",
  "lesson.listen": "Escuchar",
  "lesson.slow": "Más despacio",
  "lesson.meaning": "En español:",
  "lesson.activity": "Actividad {number}",
  "lesson.correct": "¡Muy bien!",
  "lesson.tryAgain": "Casi. Pista:",
  "lesson.orderHelp": "Toca las fichas en orden.",
  "lesson.orderClear": "Empezar otra vez",
  "lesson.done": "Hechas",
  "lesson.notTried": "Sin intentar",
  "lesson.review": "Para repasar",
  "lesson.reset": "Reiniciar esta página",
  "lesson.resetAsk": "¿Borrar las respuestas de esta página? Las demás páginas no cambian.",
  "lesson.resetYes": "Sí, reiniciar",
  "lesson.resetDone": "Listo. Puedes intentarlo otra vez.",
  "lesson.pageDone": "¡Terminaste esta página! Ya puedes seguir.",
  "lesson.back": "← Atrás",
  "lesson.next": "Siguiente →",
  "lesson.nextSoon": "La siguiente página llega muy pronto.",
  "lesson.toPath": "Volver al camino",
});

Object.assign(translations.en, {
  "lesson.zone": "ZONE {number} · {name}",
  "lesson.page": "Page {page} of {total}",
  "lesson.pybotSays": "PYBOT SAYS",
  "lesson.lookTitle": "Look and listen",
  "lesson.listenTitle": "Listen",
  "lesson.listenText": "Press 🔊 to hear each word. Press 🐢 to hear it slower.",
  "lesson.sayTitle": "Say",
  "lesson.sayText": "Say it out loud three times. Nobody grades you: that is how you learn.",
  "lesson.useTitle": "How to use it",
  "lesson.checkTitle": "Check",
  "lesson.checkText": "Pick the answer. If you make a mistake, PyBot gives you a hint.",
  "lesson.wordsTitle": "New words",
  "lesson.homeTitle": "Practice at home",
  "lesson.homeAdult": "For grown-ups:",
  "lesson.listen": "Listen",
  "lesson.slow": "Slower",
  "lesson.meaning": "In Spanish:",
  "lesson.activity": "Activity {number}",
  "lesson.correct": "Well done!",
  "lesson.tryAgain": "Almost. Hint:",
  "lesson.orderHelp": "Tap the tiles in order.",
  "lesson.orderClear": "Start again",
  "lesson.done": "Done",
  "lesson.notTried": "Not tried",
  "lesson.review": "To review",
  "lesson.reset": "Reset this page",
  "lesson.resetAsk": "Erase the answers on this page? Other pages don't change.",
  "lesson.resetYes": "Yes, reset",
  "lesson.resetDone": "Done. You can try again.",
  "lesson.pageDone": "You finished this page! You can go on.",
  "lesson.back": "← Back",
  "lesson.next": "Next →",
  "lesson.nextSoon": "The next page is coming soon.",
  "lesson.toPath": "Back to the path",
});

const lesson = JSON.parse(document.getElementById("lesson-data")?.textContent ?? "null");
// Answers given on this visit; a restored "complete" never replays the celebration.
const lessonTries = new Map();

const pick = (text) => (typeof text === "string" ? text : text[currentLanguage] ?? text.es);
const isEnglish = (text) => typeof text === "string";

function el(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

// Text that may be English being learned (keeps lang="en") or help in the interface language.
function textNode(tag, className, text) {
  const element = el(tag, className, pick(text));
  if (isEnglish(text)) {
    element.lang = "en";
  }
  return element;
}

function listenButtons(english) {
  const group = el("span", "listen-pair");
  const normal = el("button", "listen-button");
  normal.type = "button";
  normal.innerHTML = '<span aria-hidden="true">🔊</span>';
  normal.setAttribute("aria-label", `${textFor("lesson.listen")}: ${english}`);
  normal.addEventListener("click", () => say(english, normal));
  const slow = el("button", "listen-button listen-slow");
  slow.type = "button";
  slow.innerHTML = '<span aria-hidden="true">🐢</span>';
  slow.setAttribute("aria-label", `${textFor("lesson.slow")}: ${english}`);
  slow.addEventListener("click", () => say(english, slow, 0.55));
  group.append(normal, slow);
  return group;
}

function section(key, number, extraClass = "") {
  const box = el("section", `lesson-section ${extraClass}`.trim());
  const heading = el("h2", "lesson-section-title");
  heading.append(el("span", "lesson-step-number", String(number)), el("span", "", textFor(key)));
  box.append(heading);
  return box;
}

// ---------- Activities ----------

function activityState(id) {
  return storedActivityState(id);
}

function saveActivity(id, value) {
  writeStored(activityStorageKey(id), value);
}

function pageFinished() {
  return lesson.activities.every((activity) => activityState(activity.id) === "complete");
}

function markStepDone() {
  const done = storedList(PATH_DONE_KEY);
  if (!done.includes(lesson.step)) {
    writeStored(PATH_DONE_KEY, [...done, lesson.step].join(","));
  }
}

function answerActivity(activity, card, correct, feedback) {
  const wasComplete = activityState(activity.id) === "complete";
  lessonTries.set(activity.id, correct);
  if (correct) {
    saveActivity(activity.id, "complete");
  } else if (!wasComplete) {
    saveActivity(activity.id, "review");
    card.classList.remove("is-shaking");
    void card.offsetWidth;
    card.classList.add("is-shaking");
  }
  paintActivity(activity, card);
  updateSummary();
  if (correct && !wasComplete) {
    const finished = pageFinished();
    if (finished) {
      markStepDone();
    }
    buddyReact("correct", { pageDone: finished });
    checkRewards();
    renderStreak();
  } else if (!correct) {
    buddyReact("wrong");
  }
}

function paintActivity(activity, card) {
  const state = activityState(activity.id);
  const lastTry = lessonTries.get(activity.id);
  card.classList.toggle("is-complete", state === "complete");
  card.classList.toggle("needs-review", state === "review");
  const feedback = card.querySelector(".activity-feedback");
  feedback.replaceChildren();
  if (state === "complete") {
    feedback.append(el("b", "", textFor("lesson.correct")), document.createTextNode(` ${pick(activity.why)}`));
  } else if (lastTry === false) {
    feedback.append(el("b", "", textFor("lesson.tryAgain")), document.createTextNode(` ${pick(activity.hint)}`));
  }
  card.querySelectorAll("[data-option]").forEach((button) => {
    const isAnswer = Number(button.dataset.option) === activity.answer;
    button.classList.toggle("is-right", state === "complete" && isAnswer);
  });
  if (activity.type === "order" && state === "complete") {
    showOrder(activity, card, activity.tiles.length);
  }
}

function buildChoice(activity, card) {
  const options = el("div", "activity-options");
  activity.options.forEach((option, index) => {
    const button = textNode("button", "activity-option", option);
    button.type = "button";
    button.dataset.option = String(index);
    button.addEventListener("click", () => {
      const correct = index === activity.answer;
      if (!correct) {
        button.classList.add("is-wrong");
      }
      answerActivity(activity, card, correct, card.querySelector(".activity-feedback"));
    });
    options.append(button);
  });
  card.append(options);
}

// Word order: the tiles are shown shuffled; the learner taps them in order.
function showOrder(activity, card, placedCount) {
  const line = card.querySelector(".order-line");
  line.replaceChildren(...activity.tiles.slice(0, placedCount).map((tile) => {
    const chip = el("span", "order-chip", tile);
    chip.lang = "en";
    return chip;
  }));
  card.querySelectorAll(".order-tile").forEach((tile) => {
    tile.disabled = activityState(activity.id) === "complete" || Number(tile.dataset.used) === 1;
  });
}

function buildOrder(activity, card) {
  let placed = 0;
  card.append(el("p", "order-help", textFor("lesson.orderHelp")));
  const line = el("div", "order-line");
  line.setAttribute("aria-live", "polite");
  const bank = el("div", "order-bank");
  const order = activity.tiles.map((tile, index) => ({ tile, index }));
  // A fixed shuffle so the page looks the same on every visit.
  order.sort((a, b) => ((a.index * 7 + 3) % activity.tiles.length) - ((b.index * 7 + 3) % activity.tiles.length));
  if (order.every((item, position) => item.index === position)) {
    order.reverse();
  }
  order.forEach(({ tile, index }) => {
    const button = el("button", "order-tile", tile);
    button.type = "button";
    button.lang = "en";
    button.addEventListener("click", () => {
      if (index === placed) {
        button.dataset.used = "1";
        placed += 1;
        showOrder(activity, card, placed);
        if (placed === activity.tiles.length) {
          answerActivity(activity, card, true, card.querySelector(".activity-feedback"));
        }
      } else {
        answerActivity(activity, card, false, card.querySelector(".activity-feedback"));
      }
    });
    bank.append(button);
  });
  const clear = el("button", "order-clear", textFor("lesson.orderClear"));
  clear.type = "button";
  clear.addEventListener("click", () => {
    placed = 0;
    card.querySelectorAll(".order-tile").forEach((tile) => delete tile.dataset.used);
    showOrder(activity, card, 0);
  });
  card.append(line, bank, clear);
}

function buildActivity(activity, number) {
  const card = el("li", "activity");
  card.dataset.activity = activity.id;
  const head = el("div", "activity-head");
  head.append(el("span", "activity-number", textFor("lesson.activity").replace("{number}", String(number))));
  card.append(head);
  const prompt = el("p", "activity-prompt");
  prompt.append(document.createTextNode(pick(activity.prompt)));
  card.append(prompt);
  if (activity.listen) {
    const listen = el("div", "activity-listen");
    listen.append(listenButtons(activity.listen));
    card.append(listen);
  }
  if (activity.show) {
    card.append(textNode("p", "activity-show", activity.show));
  }
  if (activity.type === "order") {
    buildOrder(activity, card);
  } else {
    buildChoice(activity, card);
  }
  const feedback = el("p", "activity-feedback");
  feedback.setAttribute("role", "status");
  card.append(feedback);
  card.addEventListener("animationend", () => card.classList.remove("is-shaking"));
  paintActivity(activity, card);
  return card;
}

function updateSummary() {
  const summary = document.querySelector("[data-lesson-summary]");
  if (!summary) {
    return;
  }
  const states = lesson.activities.map((activity) => activityState(activity.id));
  const done = states.filter((state) => state === "complete").length;
  const review = states.filter((state) => state === "review").length;
  summary.querySelector("[data-count-done]").textContent = String(done);
  summary.querySelector("[data-count-new]").textContent = String(states.length - done - review);
  summary.querySelector("[data-count-review]").textContent = String(review);
  const note = document.querySelector("[data-lesson-finished]");
  if (note) {
    note.hidden = !pageFinished();
  }
}

// ---------- Page ----------

function renderLesson() {
  const main = document.querySelector("[data-lesson]");
  const step = stepById(lesson.step);
  const zone = pathZones.find((candidate) => candidate.steps.includes(lesson.step));
  const zoneIndex = pathZones.indexOf(zone);
  const pageIndex = zone.steps.indexOf(lesson.step);
  document.title = `${pick(lesson.title)} — PyBot English`;
  main.replaceChildren();

  // Hero: where we are, the page question, and PyBot.
  const hero = el("header", "lesson-hero");
  const copy = el("div", "lesson-hero-copy");
  const crumb = el("p", "eyebrow eyebrow-magenta");
  crumb.textContent = `${textFor("lesson.zone").replace("{number}", String(zoneIndex).padStart(2, "0")).replace("{name}", zone.name)} · ${textFor("lesson.page").replace("{page}", String(pageIndex + 1)).replace("{total}", String(zone.steps.length))}`;
  copy.append(crumb, el("h1", "", pick(lesson.title)), el("p", "lesson-intro", pick(lesson.intro)));
  const stage = el("div", "lesson-stage");
  const bubble = el("p", "lesson-bubble");
  bubble.append(el("span", "speech-kicker", textFor("lesson.pybotSays")), el("span", "", pick(lesson.pybot)));
  const figure = el("div", "lesson-pybot");
  figure.setAttribute("aria-hidden", "true");
  figure.innerHTML = pybotFigureHTML(lesson.mood ?? "happy");
  stage.append(bubble, figure);
  hero.append(copy, stage);
  main.append(hero);

  // 1 Look + 2 Listen: picture cards with sound.
  const look = section("lesson.lookTitle", 1, "lesson-look");
  look.append(el("p", "lesson-help", textFor("lesson.listenText")));
  const cards = el("ul", "look-grid");
  lesson.look.forEach((item) => {
    const card = el("li", "look-card");
    card.append(el("span", "look-icon", item.icon));
    const word = el("b", "look-word", item.word);
    word.lang = "en";
    card.append(word, el("span", "look-meaning", pick(item.meaning)), listenButtons(item.word));
    cards.append(card);
  });
  look.append(cards);
  main.append(look);

  // 3 Say.
  const sayBox = section("lesson.sayTitle", 2, "lesson-say");
  sayBox.append(el("p", "", textFor("lesson.sayText")));
  main.append(sayBox);

  // 4 How to use it: model sentences and the rule in one line.
  if (lesson.use) {
    const use = section("lesson.useTitle", 3, "lesson-use");
    const models = el("ul", "use-models");
    lesson.use.models.forEach((model) => {
      const item = el("li", "use-model");
      const sentence = el("b", "", model.en);
      sentence.lang = "en";
      item.append(sentence, listenButtons(model.en), el("span", "look-meaning", pick(model.meaning)));
      models.append(item);
    });
    use.append(models, el("p", "use-rule", pick(lesson.use.rule)));
    main.append(use);
  }

  // 5 Check: activities with a done / not tried / review summary and a page reset.
  const check = section("lesson.checkTitle", lesson.use ? 4 : 3, "lesson-check");
  check.append(el("p", "lesson-help", textFor("lesson.checkText")));
  const summary = el("div", "lesson-summary");
  summary.dataset.lessonSummary = "";
  [["done", "lesson.done"], ["new", "lesson.notTried"], ["review", "lesson.review"]].forEach(([key, label]) => {
    const box = el("p", `summary-box summary-${key}`);
    const count = el("b", "", "0");
    count.dataset[`count${key[0].toUpperCase()}${key.slice(1)}`] = "";
    box.append(count, el("span", "", textFor(label)));
    summary.append(box);
  });
  check.append(summary);
  const list = el("ol", "activity-list");
  lesson.activities.forEach((activity, index) => list.append(buildActivity(activity, index + 1)));
  check.append(list);
  const finished = el("p", "lesson-finished", textFor("lesson.pageDone"));
  finished.dataset.lessonFinished = "";
  finished.setAttribute("role", "status");
  check.append(finished);
  const resetRow = el("div", "lesson-reset");
  const reset = el("button", "lesson-reset-button", textFor("lesson.reset"));
  reset.type = "button";
  const resetStatus = el("p", "lesson-reset-status");
  resetStatus.setAttribute("role", "status");
  reset.addEventListener("click", async () => {
    const choice = await askChoice(reset, "lesson.resetAsk", [{ key: "lesson.resetYes", value: "reset" }]);
    if (!choice) {
      return;
    }
    lesson.activities.forEach((activity) => removeStored(activityStorageKey(activity.id)));
    writeStored(PATH_DONE_KEY, storedList(PATH_DONE_KEY).filter((id) => id !== lesson.step).join(","));
    lessonTries.clear();
    renderLesson();
    setStatus(document.querySelector(".lesson-reset-status"), "lesson.resetDone");
  });
  resetRow.append(reset, resetStatus);
  check.append(resetRow);
  main.append(check);

  // New words, with sound.
  const words = section("lesson.wordsTitle", lesson.use ? 5 : 4, "lesson-words");
  const wordList = el("ul", "word-list");
  lesson.words.forEach((entry) => {
    const item = el("li", "word-item");
    const word = el("b", "", entry.en);
    word.lang = "en";
    item.append(word, el("span", "look-meaning", pick(entry.meaning)), listenButtons(entry.en));
    wordList.append(item);
  });
  words.append(wordList);
  main.append(words);

  // Practice at home.
  const home = el("section", "lesson-home");
  home.append(el("p", "eyebrow eyebrow-magenta", textFor("lesson.homeTitle").toUpperCase()), el("h2", "", pick(lesson.home.title)), el("p", "", pick(lesson.home.text)));
  const adult = el("p", "lesson-home-adult");
  adult.append(el("b", "", textFor("lesson.homeAdult")), document.createTextNode(` ${pick(lesson.home.adult)}`));
  home.append(adult);
  main.append(home);

  // Back and Next stay in the same place on every page.
  const nav = el("nav", "lesson-nav");
  const stepIndex = pathSteps.indexOf(step);
  const previous = pathSteps[stepIndex - 1];
  const next = pathSteps[stepIndex + 1];
  const back = el("a", "lesson-back", textFor(previous && !previous.soon ? "lesson.back" : "lesson.toPath"));
  back.href = new URL(previous && !previous.soon ? previous.href : "course.html", scriptBaseUrl).href;
  nav.append(back);
  if (next && !next.soon) {
    const forward = el("a", "button button-primary lesson-next", textFor("lesson.next"));
    forward.href = new URL(next.href, scriptBaseUrl).href;
    nav.append(forward);
  } else {
    const soon = el("p", "lesson-next-soon");
    const toPath = el("a", "button button-primary", textFor("lesson.toPath"));
    toPath.href = new URL("course.html", scriptBaseUrl).href;
    soon.append(el("span", "", textFor("lesson.nextSoon")), toPath);
    nav.append(soon);
  }
  main.append(nav);
  updateSummary();
}

if (lesson) {
  document.addEventListener("DOMContentLoaded", () => {
    languageRenderers.push(renderLesson);
    renderLesson();
  });
}
