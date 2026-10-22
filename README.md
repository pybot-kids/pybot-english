# PyBot English

> Working name. See **Name options** below.

PyBot English is a local-first, child-friendly website that helps children take their first steps in English through short, guided, playful activities. It is a sibling of [PyBot](https://pybot-kids.github.io/), the Python course, and keeps the same mascot, the same plain-language rules, and the same progress scheme.

## Why it exists

The idea comes from María Ángel. She taught herself English, and she noticed that her friends found it hard. She wants to help them with something simple, kind, and free of pressure. PyBot English is that tool: one word, one phrase, and one encouraging response at a time.

## Product principles

Same as PyBot:

1. **One clear step at a time.** Each screen has one learning goal and an obvious next action.
2. **Show before explaining.** Pictures, sound, and examples come before rules.
3. **Use short language.** Instructions are concrete, friendly, and easy to scan.
4. **Treat mistakes as information.** A mistake leads to a gentle clue, never a punishment.
5. **Keep encouragement measured and sweet.** PyBot is warm and kind without constant praise.
6. **Preserve the child's work.** Progress stays on the device unless the learner exports it.
7. **Avoid unnecessary complexity.** Every feature must support learning.

## Audience and languages

- Primary age range: 8–10 years old (useful up to about 12)
- Learners: Spanish-speaking children starting English from zero
- Interface: Spanish (default) and English, switched with `EN / ES`
- The English being learned (words, phrases, zone names) is never translated away. Its Spanish meaning appears as help next to it, the same way Python keywords stay in English in PyBot.
- Both interface languages ship together for every page.

## Plain-language and page model

Unchanged from PyBot: one idea per page, one dominant button, headings under about seven words, instructions under two short sentences, PyBot speech under about fifteen words, extra help only on request, and Back/Next always in the same place.

## The learning loop: Look. Listen. Say.

1. **Look (Mira):** PyBot shows one word or phrase with a picture.
2. **Listen (Escucha):** the learner presses a button and hears it in English.
3. **Say (Dila):** the learner repeats it out loud. Nobody grades it.
4. **Check:** a small reading, vocabulary, or grammar activity confirms the idea.
5. **Practice at home:** one tiny idea to try with mom, dad, siblings, or friends.
6. **Continue:** progress is saved and the next step opens.

## Speaking and listening: what PyBot does and does not do

PyBot **teaches how things sound**; it **never evaluates speaking**.

- **Does:** plays the sound of every new word and phrase, shows the Spanish meaning, and checks understanding with text activities only (reading, vocabulary, grammar, word order).
- **Does not:** use the microphone, record, run speech recognition, or score pronunciation. No page asks for microphone permission.
- **Speaking is social:** every lesson ends with a **Practice at home** card: a short game to do out loud with family or friends (teach someone the word, the echo game, labels around the house). The card speaks to the grown-up too: they don't need to know English, because the 🔊 button says the word.
- **Feedback on activities** stays gentle: a wrong choice gets one short hint, never a grade.

Audio today comes from the browser's Web Speech API (`speechSynthesis`, `en-US`, slightly slow). The plan is to pre-generate one audio file per word and phrase with an openly licensed voice (for example Kokoro-82M, Apache 2.0), ship the files with the site, and credit the voice in `THIRD_PARTY_NOTICES.md` and the FAQ, the way PyBot credits Pyodide. `speechSynthesis` stays as the fallback.

### Lesson rule: Practice at home card

- One idea per lesson, doable in under five minutes, with no screen needed after the first listen.
- Uses only the words from that lesson.
- Written for the child, with one short line for the grown-up.
- Never asks anyone to judge pronunciation; it celebrates trying.

## PyBot here

PyBot is the same character, built from the same HTML/CSS anatomy and moods (`happy`, `welcoming`, `curious`, `celebrating`, `encouraging`, `wink`, `starry`, …), with the new palette. Its behavior is sweet: instead of code, it trades **kind phrases** with the learner.

- Touching PyBot cycles through gentle greetings, and PyBot says each one aloud.
- The home page's first mission replaces the Python runner: the learner picks a kind phrase (“Hello, PyBot!”, “Thank you!”, “You are my friend.”…) and PyBot answers in English with a matching mood and the Spanish meaning.
- If the learner saved a name, PyBot uses it (“Hello, Sam! I'm so happy to see you.”).

### The little PyBot in the corner

Like in PyBot, a small PyBot keeps the learner company on every page (computer and tablet screens; hidden on phones so it never covers a lesson). It can be dragged and remembers its spot, its eyes follow the pointer, it naps after a while without movement, gets dizzy if shaken, and can be hidden with the header button or its ×. It says hello once per visit and reacts to the learner (name saved, kind phrases, and later right or wrong answers).

Its lines are **for kids, never about code**: classic children's jokes, English riddles (“How do you say «gato» in English? Cat!”), tiny facts about English, home-practice tips, and gentle cheers. Jokes are written separately for each interface language so the punchline works.

## Visual language

### Brand colors

Blue and magenta, balanced by a deep ink and a sunny yellow so the palette reads as playful for every child, not as “for girls” or “for boys”. All text pairs meet WCAG AA.

| Token | Value | Primary use |
|---|---|---|
| Ink | `#1A1F4E` | Main text, outlines, dark surfaces |
| Ink soft | `#4A5080` | Secondary text (7.6:1 on white) |
| Cobalt | `#2D5BE3` | Primary actions, PyBot's shell (white text 5.6:1) |
| Cobalt dark | `#1E3FA8` | Blue text and links |
| Sky | `#5FB4FF` | Decorative circles, mascot stage |
| Sky soft | `#DCECFF` | Large soft surfaces |
| Magenta | `#C2287E` | PyBot's body, accents, second highlight (white text 5.4:1) |
| Magenta dark | `#8E1B5E` | Magenta text, PyBot's mouth |
| Magenta mid | `#E36BAE` | Decorative shapes |
| Magenta soft | `#FBE3F0` | Notes and soft badges |
| Violet | `#6B4DE6` | Focus rings, the foundation zone |
| Sun | `#FFC93C` | PyBot's details, small highlights (ink text 10:1) |
| Mist | `#F4F6FF` | Page background |
| White | `#FFFFFF` | Cards and reading surfaces |

PyBot keeps its roles: shell (head, arms) in **cobalt**, body in **magenta**, ears, neck, hands and antenna light in **sun**, outlines in **ink**. Numbered sequences rotate cobalt, magenta and sun. Typography, shapes, shadows and motion rules are the same as PyBot's design guide, including `prefers-reduced-motion`.

## Technical architecture

A static site, like PyBot: plain HTML, CSS and JavaScript, no build step, hosted on GitHub Pages, no server, no database, no accounts, no analytics.

### Third-party components and credit

Every outside component gets credit, the way PyBot credits Pyodide:

- It is listed in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) with what it does, where it comes from, its license or terms, and where it is credited on the site.
- It is credited **next to the place where it is used**, in a small "♥" details block, and in the FAQ answer "What outside tools does PyBot English use?".
- It is used only under a license or terms compatible with the project, never implies affiliation, and is never bundled without its required notices.

Today that covers the browser voices (Web Speech API), the browser translator (Translator API, by Google in Chrome), and the Google Translate link. PyBot English bundles no outside code, fonts, images, or audio.

### Shared header

Same strategy as PyBot, so the menu can grow without breaking on phones: `arrangeHeader()` in `script.js` builds the header on every page from one list, `headerPages`. Page links (icon + name, current page highlighted) sit on the left and compact icon controls (♥ support, little PyBot, language, menu) on the right. The ♥ button opens PyBot's Patreon (`https://www.patreon.com/pybot`, `PATREON_URL` in `script.js`), shared by the whole PyBot family; support is always optional and every lesson stays free and ad-free. Below 900px the links move into a ☰ menu, so the header always stays one row. To add a page to the menu, add one line to `headerPages`; no HTML file needs editing.

### Local-first progress

Progress uses **the same scheme as PyBot** with its own `pybotenglish.` prefix, so both sites can live on `pybot-kids.github.io` without mixing their progress.

#### Local storage registry

| Key | Allowed value | Purpose | Include in backup |
|---|---|---|---|
| `pybotenglish.language` | `en` or `es` | Interface language; defaults to `es` | Yes |
| `pybotenglish.buddy.enabled` | `true` or `false` | Shows the little PyBot in the corner; defaults to `true` | Yes |
| `pybotenglish.buddy.position` | Two numbers from 0 to 1, comma-separated (for example `1.000,1.000`) | Where the learner dragged the little PyBot, as fractions of the free screen space; this device only | No |
| `pybotenglish.buddy.greeted` | `true` (session storage, cleared when the tab closes) | Lets the little PyBot say hello once per visit | No |
| `pybotenglish.learner.name` | A trimmed name or nickname of 1–24 characters | Lets PyBot greet the learner; stored only in this browser | Yes |
| `pybotenglish.path.current` | A step id from `pathSteps` | The learner's current place on the path | Yes |
| `pybotenglish.path.visited` | Comma-separated step ids | Pages the learner has opened | Yes |
| `pybotenglish.path.done` | Comma-separated step ids (may be empty) | Steps the learner finished | Yes |
| `pybotenglish.path.known` | Comma-separated step ids (may be empty) | Steps that existed when the learner started, so later steps show as new | Yes |
| `pybotenglish.selfcheck` | Comma-separated `<step-id>:<rating>`, rating `good`, `okay`, or `review` | The learner's own rating at a pit stop | Yes |
| `pybotenglish.badges` | Comma-separated `<badge-id>:<YYYY-MM-DD>` | Stickers in the album and the day each was earned; a zone sticker (`zone-<first-step-id>`) unlocks its diploma | Yes |
| `pybotenglish.days` | Comma-separated `YYYY-MM-DD`, sorted, last 400 kept | Days the learner opened a lesson, for the gentle streak count | Yes |
| `pybotenglish.activity.<activity-id>` | `complete` or `review` | A finished activity, or one to review | Yes |
| `pybotenglish.progress.version` | A whole number up to `PROGRESS_VERSION` | Course content version the saved progress belongs to | No; the file carries `progressVersion` |

Registered activity IDs: none yet. Each lesson adds its ids to its step in `pathSteps` and to this list.

Storage rules (same as PyBot): only a learner-chosen name or nickname; never store typed answers, audio, or other personal data; a missing key means its default; storage failure never blocks a page; every page that stores progress has a labeled reset; backup includes only registered keys and is fully validated on import.

#### Backup file

**Save a backup file** downloads `pybot-english-backup-YYYY-MM-DD.json`; **Load a backup file** validates the whole file, asks for confirmation, then replaces every registered key.

```json
{
  "format": "pybot-english-progress",
  "schemaVersion": 1,
  "progressVersion": 1,
  "exportedAt": "2026-10-22T00:00:00.000Z",
  "progress": {
    "pybotenglish.language": "es",
    "pybotenglish.learner.name": "Sam"
  }
}
```

Validation rules, file size limit (100 KB), and the upgrade of older backups are the same as PyBot's. The allowlist lives in `backupValidators()` in `script.js`.

#### Progress versions

Same rule as PyBot: if a pull request adds, renames, or removes a step or activity id in `pathSteps`, run `node tools/progress-version.mjs --bump "what changed"`; renames and removals also need an entry in `progressMigrations`. The **Progress version** workflow checks this on every pull request.

#### Emergency progress reset

A collapsed **For adults: erase all progress** section on the home page offers to save a backup first, asks for confirmation, and keeps only the language, the little PyBot preference, and the name.

### Rewards: stickers, streaks and diplomas

- **Common stickers:** first step (first finished activity), three days in a row, a whole week (seven in a row), ten learning days, one sticker per zone, and the PyBot English trophy for finishing every zone.
- **Streaks:** learning days are counted when a lesson page is opened. Missing a day never takes anything away; only runs and totals are celebrated.
- **Diplomas:** every finished zone unlocks a printable diploma (`diploma.html?zone=<first-step-id>`) with the learner's name, the zone, its sticker, and the date it was earned. `diploma.html?sample=1` shows a marked example.

## Learning path index

The full content plan (what each page teaches, vocabulary, activity types, phases, and the "done" checklist) lives in [`CONTENT_PLAN.md`](CONTENT_PLAN.md).


A short foundation, **six broad zones**, and a pit stop. English is wide, so the path grows **inside** zones, like PyBot's Python zones: each zone is a big theme with its own route of pages on the map, and the learner moves through that route before the next zone.

**Growth rule:** a new topic becomes a new page in the route of the zone it belongs to. A new zone is added only for a theme no existing zone covers (for example, a future "Tell a story" zone for past tense). This keeps the map short even when the course grows.

Lessons are not written yet; every page is marked `soon: true` in `pathSteps` until it ships.

| Zone | Pages in its route | Goal |
|---|---|---|
| 00 **Hello!** (before we start) | Hello and goodbye · How are you? · Look, listen, say | Greet, say goodbye, and learn how the site works |
| 01 **Letters & Numbers** | The letters · Vowels · Spell your name · 1–10 · 11–20 · How many? | The alphabet and its sounds; count to 20 |
| 02 **All About Me** | My name is… · I am 9. · My family · My body · Feelings · I feel happy. | Introduce yourself, your family, your body, and how you feel |
| 03 **Colors & Things** | Colors · Shapes · It is red. · My backpack · This or that? | Describe things around you |
| 04 **Animals & Food** | Animals · Big or small? · It can fly! · Food and drinks · I like… · I don't like… | Animals, can / can't, food, and likes |
| 05 **My Day** | The days · Morning, afternoon, night · My routine · Open, close, listen! | Days, routines, and classroom instructions |
| 06 **Where is it?** | What? Who? Where? · In, on, under · Rooms in a house | Question words and place words |
| 🏁 **Show what you know** (pit stop) | Final review | Mixed review, then a self-check and a diploma |

## Translator page

`translator.html` has two tools:

- **Translator** (Spanish → English or English → Spanish). It answers in this order:
  1. **PyBot English's own word list** (`pybotWords` in `extras.js`): every word on the path plus everyday basics. Instant, offline, nothing leaves the site. The same list will feed the future "My words" page.
  2. **The browser's built-in translator** (the Translator API in recent desktop Chrome). It runs on the device; the first use may download the language.
  3. Otherwise, a **link to Google Translate** with the text filled in. It only opens in a new tab if someone taps it, and the page asks the child to check with an adult first.
- **Type and listen:** the learner types English and hears it at normal speed or slower (🐢), with example phrases to tap.

Rules: no microphone, nothing typed is stored, a 200-character limit, and a visible note that automatic translations can be wrong.

## Project structure

```text
index.html        Home: PyBot, name, kind-phrase mission, backup and reset
course.html       The learning path map
album.html        Stickers and the learning-days streak
diploma.html      Printable zone diplomas (and a sample)
faq.html          Questions for learners and grown-ups (credits at #credits)
translator.html   Translator and type-and-listen tool
styles.css        All styles (PyBot anatomy and moods included)
script.js         Translations, PyBot, progress, rewards, backup
extras.js         Album, diploma, FAQ and translator logic and copy
tools/            progress-version.mjs
THIRD_PARTY_NOTICES.md  Credits and terms for every outside component
progress-versions.json
```

## Publishing

The site lives at **https://pybot-kids.github.io/pybot-english/**, as a GitHub Pages project site of the `pybot-kids` organization: the repository `pybot-kids/pybot-english` is published from the `main` branch root (Settings → Pages → Deploy from a branch → `main` / `(root)`). PyBot itself is the organization site at `https://pybot-kids.github.io/`. All links in this site are relative, so it works inside the `/pybot-english/` path.

## Running it

No build step. Open `index.html`, or serve the folder:

```bash
python -m http.server 8000
```

## Name options

“PyBot English” is a working name. Renaming is a find-and-replace of the visible name; the storage prefix (`pybotenglish.`) and backup format can stay as they are.

## Current status

- [x] Product direction and motivation documented
- [x] PyBot mascot in the new blue–magenta palette, with sweet moods and kind phrases
- [x] Home page, learning path index, album, diploma, and FAQ (EN/ES)
- [x] Progress, stickers, streaks, diplomas, backup, and reset on the PyBot scheme
- [x] Long-term content plan ([`CONTENT_PLAN.md`](CONTENT_PLAN.md))
- [ ] First lessons (zone 00)
- [ ] Word list (“My words”) and the guide for families and teachers
- [ ] Review with María Ángel and her friends
- [ ] GitHub Pages publication

## License

Code under the [MIT License](LICENSE). Course content and the PyBot character under [CC BY 4.0](LICENSE-CONTENT.md).
