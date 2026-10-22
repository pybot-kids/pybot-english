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

### Local-first progress

Progress uses **the same scheme as PyBot** with its own `pybotenglish.` prefix, so both sites can live on `pybot-kids.github.io` without mixing their progress.

#### Local storage registry

| Key | Allowed value | Purpose | Include in backup |
|---|---|---|---|
| `pybotenglish.language` | `en` or `es` | Interface language; defaults to `es` | Yes |
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

A collapsed **For adults: erase all progress** section on the home page offers to save a backup first, asks for confirmation, and keeps only the language and the name.

### Rewards: stickers, streaks and diplomas

- **Common stickers:** first step (first finished activity), three days in a row, a whole week (seven in a row), ten learning days, one sticker per zone, and the PyBot English trophy for finishing every zone.
- **Streaks:** learning days are counted when a lesson page is opened. Missing a day never takes anything away; only runs and totals are celebrated.
- **Diplomas:** every finished zone unlocks a printable diploma (`diploma.html?zone=<first-step-id>`) with the learner's name, the zone, its sticker, and the date it was earned. `diploma.html?sample=1` shows a marked example.

## Learning path index

A short foundation, ten small zones, and a pit stop. Each zone has three pages. Lessons are not written yet; every step is marked `soon: true` in `pathSteps` until its page ships.

| Zone | Pages | Goal |
|---|---|---|
| 00 **Hello!** (before we start) | Hello and goodbye · How are you? · Look, listen, say | Greet, say goodbye, and learn how the site works |
| 01 **The ABC** | The letters · Vowels · Spell your name | Letter names and sounds; spell your own name |
| 02 **Numbers** | 1–10 · 11–20 · How many? | Count to 20 and ask how many |
| 03 **Colors & Shapes** | Colors · Shapes · It is red. | Name and describe colors and shapes |
| 04 **Me & My Family** | My name is… · I am 9. · My family | Introduce yourself and your family |
| 05 **My Body & Feelings** | My body · Feelings · I feel happy. | Body parts and how you feel |
| 06 **At School** | My backpack · This or that? · Open, close, listen! | Classroom things and classroom instructions |
| 07 **Animals** | Animals · Big or small? · It can fly! | Animals, size words, can / can't |
| 08 **Food** | Food and drinks · I like… · I don't like… | Food words and likes |
| 09 **My Day** | The days · Morning, afternoon, night · My routine | Days of the week and daily routines |
| 10 **Where is it?** | What? Who? Where? · In, on, under · Rooms in a house | Question words and place words |
| 🏁 **Show what you know** (pit stop) | One page | Mixed review, then a self-check and a diploma |

## Project structure

```text
index.html        Home: PyBot, name, kind-phrase mission, backup and reset
course.html       The learning path map
album.html        Stickers and the learning-days streak
diploma.html      Printable zone diplomas (and a sample)
faq.html          Questions for learners and grown-ups
styles.css        All styles (PyBot anatomy and moods included)
script.js         Translations, PyBot, progress, rewards, backup
extras.js         Album, diploma and FAQ rendering and copy
tools/            progress-version.mjs
progress-versions.json
```

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
- [ ] First lessons (zone 00)
- [ ] Word list (“My words”) and the guide for families and teachers
- [ ] Review with María Ángel and her friends
- [ ] GitHub Pages publication

## License

Code under the [MIT License](LICENSE). Course content and the PyBot character under [CC BY 4.0](LICENSE-CONTENT.md).
