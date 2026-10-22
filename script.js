// PyBot English — plain JavaScript, no build step.
// The English being learned is never translated away: only the help around it changes.
// Storage follows the same scheme as PyBot (pybot-kids.github.io) with its own
// "pybotenglish." prefix, so both sites can share one domain without mixing progress.

const STORAGE_PREFIX = "pybotenglish.";
const LANGUAGE_KEY = "pybotenglish.language";
const LEARNER_NAME_KEY = "pybotenglish.learner.name";
const PATH_CURRENT_KEY = "pybotenglish.path.current";
const PATH_VISITED_KEY = "pybotenglish.path.visited";
const PATH_DONE_KEY = "pybotenglish.path.done";
const PATH_KNOWN_KEY = "pybotenglish.path.known";
const SELF_CHECK_KEY = "pybotenglish.selfcheck";
const BADGES_KEY = "pybotenglish.badges";
const DAYS_KEY = "pybotenglish.days";
const PATH_LIST_KEYS = [PATH_VISITED_KEY, PATH_DONE_KEY, PATH_KNOWN_KEY];
const SELF_CHECK_RATINGS = ["good", "okay", "review"];
const BACKUP_FORMAT = "pybot-english-progress";
const BACKUP_SCHEMA_VERSION = 1;
// The version of the course content that saved progress belongs to. Bump it in
// every PR that adds, renames, or removes a step or activity id
// (`node tools/progress-version.mjs --bump`), and add a migration below when an
// id is renamed or removed.
const PROGRESS_VERSION = 1;
const PROGRESS_VERSION_KEY = "pybotenglish.progress.version";
const BACKUP_MAX_BYTES = 100_000;
// Preferences and the name survive an emergency progress reset.
const RESET_KEPT_KEYS = [LANGUAGE_KEY, LEARNER_NAME_KEY];
const DEFAULT_LANGUAGE = "es";
const DAYS_KEPT = 400;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// Each step lists its activities. `soon: true` marks a step whose lesson page
// is not written yet; remove it when the page ships.
const pathSteps = [
  { id: "helloGoodbye", page: "helloGoodbye", href: "lessons/00-hello-goodbye.html", soon: true, activities: [] },
  { id: "howAreYou", page: "howAreYou", href: "lessons/00b-how-are-you.html", soon: true, activities: [] },
  { id: "lookListenSay", page: "lookListenSay", href: "lessons/00c-look-listen-say.html", soon: true, activities: [] },
  { id: "abcLetters", page: "abcLetters", href: "lessons/01-abc-letters.html", soon: true, activities: [] },
  { id: "abcVowels", page: "abcVowels", href: "lessons/01b-abc-vowels.html", soon: true, activities: [] },
  { id: "abcSpell", page: "abcSpell", href: "lessons/01c-abc-spell.html", soon: true, activities: [] },
  { id: "numbersTen", page: "numbersTen", href: "lessons/02-numbers-ten.html", soon: true, activities: [] },
  { id: "numbersTwenty", page: "numbersTwenty", href: "lessons/02b-numbers-twenty.html", soon: true, activities: [] },
  { id: "numbersHowMany", page: "numbersHowMany", href: "lessons/02c-numbers-how-many.html", soon: true, activities: [] },
  { id: "colors", page: "colors", href: "lessons/03-colors.html", soon: true, activities: [] },
  { id: "shapes", page: "shapes", href: "lessons/03b-shapes.html", soon: true, activities: [] },
  { id: "itIsRed", page: "itIsRed", href: "lessons/03c-it-is-red.html", soon: true, activities: [] },
  { id: "myName", page: "myName", href: "lessons/04-my-name.html", soon: true, activities: [] },
  { id: "myAge", page: "myAge", href: "lessons/04b-my-age.html", soon: true, activities: [] },
  { id: "myFamily", page: "myFamily", href: "lessons/04c-my-family.html", soon: true, activities: [] },
  { id: "myBody", page: "myBody", href: "lessons/05-my-body.html", soon: true, activities: [] },
  { id: "feelings", page: "feelings", href: "lessons/05b-feelings.html", soon: true, activities: [] },
  { id: "iFeel", page: "iFeel", href: "lessons/05c-i-feel.html", soon: true, activities: [] },
  { id: "backpack", page: "backpack", href: "lessons/06-backpack.html", soon: true, activities: [] },
  { id: "thisThat", page: "thisThat", href: "lessons/06b-this-that.html", soon: true, activities: [] },
  { id: "classWords", page: "classWords", href: "lessons/06c-class-words.html", soon: true, activities: [] },
  { id: "animals", page: "animals", href: "lessons/07-animals.html", soon: true, activities: [] },
  { id: "bigSmall", page: "bigSmall", href: "lessons/07b-big-small.html", soon: true, activities: [] },
  { id: "canCant", page: "canCant", href: "lessons/07c-can-cant.html", soon: true, activities: [] },
  { id: "food", page: "food", href: "lessons/08-food.html", soon: true, activities: [] },
  { id: "iLike", page: "iLike", href: "lessons/08b-i-like.html", soon: true, activities: [] },
  { id: "iDontLike", page: "iDontLike", href: "lessons/08c-i-dont-like.html", soon: true, activities: [] },
  { id: "days", page: "days", href: "lessons/09-days.html", soon: true, activities: [] },
  { id: "dayParts", page: "dayParts", href: "lessons/09b-day-parts.html", soon: true, activities: [] },
  { id: "routine", page: "routine", href: "lessons/09c-routine.html", soon: true, activities: [] },
  { id: "questions", page: "questions", href: "lessons/10-questions.html", soon: true, activities: [] },
  { id: "inOnUnder", page: "inOnUnder", href: "lessons/10b-in-on-under.html", soon: true, activities: [] },
  { id: "house", page: "house", href: "lessons/10c-house.html", soon: true, activities: [] },
  { id: "checkpoint1", page: "checkpoint1", href: "lessons/11-checkpoint.html", soon: true, activities: [] },
];

// Zone names are English on purpose: they are part of what the learner learns.
const pathZones = [
  { id: "hello", name: "Hello!", icon: "👋", steps: ["helloGoodbye", "howAreYou", "lookListenSay"] },
  { id: "abc", name: "The ABC", icon: "🔤", steps: ["abcLetters", "abcVowels", "abcSpell"] },
  { id: "numbers", name: "Numbers", icon: "🔢", steps: ["numbersTen", "numbersTwenty", "numbersHowMany"] },
  { id: "colors", name: "Colors & Shapes", icon: "🎨", steps: ["colors", "shapes", "itIsRed"] },
  { id: "family", name: "Me & My Family", icon: "🏡", steps: ["myName", "myAge", "myFamily"] },
  { id: "body", name: "My Body & Feelings", icon: "🙂", steps: ["myBody", "feelings", "iFeel"] },
  { id: "school", name: "At School", icon: "🎒", steps: ["backpack", "thisThat", "classWords"] },
  { id: "animals", name: "Animals", icon: "🐶", steps: ["animals", "bigSmall", "canCant"] },
  { id: "food", name: "Food", icon: "🍎", steps: ["food", "iLike", "iDontLike"] },
  { id: "day", name: "My Day", icon: "☀️", steps: ["days", "dayParts", "routine"] },
  { id: "where", name: "Where is it?", icon: "🧭", steps: ["questions", "inOnUnder", "house"] },
  { id: "checkpoint1", name: "Show what you know", icon: "🏁", steps: ["checkpoint1"] },
];

const activityIds = pathSteps.flatMap((step) => step.activities);

// Upgrades saved progress, as { storageKey: value }, from the version before to
// the given PROGRESS_VERSION. Adding ids needs no migration. Renaming or removing one does, e.g.
//   2: (progress) => renameProgressActivity(progress, "colors-red", "colors-name"),
const progressMigrations = {};

const translations = {
  es: {
    "meta.homeTitle": "PyBot English — una palabra a la vez",
    "meta.courseTitle": "El camino — PyBot English",
    "meta.albumTitle": "Mi álbum — PyBot English",
    "meta.diplomaTitle": "Diploma — PyBot English",
    "meta.faqTitle": "Preguntas — PyBot English",
    "meta.homeDescription": "PyBot English ayuda a niñas y niños a dar sus primeros pasos en inglés con ideas pequeñas, pasos claros y frases amables.",
    "meta.courseDescription": "Una base y diez zonas pequeñas para aprender inglés con PyBot.",
    "meta.albumDescription": "Tus stickers de PyBot English, diplomas y días de aprendizaje.",
    "meta.diplomaDescription": "Un diploma de PyBot English para imprimir cuando terminas una zona.",
    "meta.faqDescription": "Preguntas frecuentes de PyBot English para aprendices y adultos.",
    "a11y.skip": "Saltar al contenido",
    "a11y.home": "PyBot English, inicio",
    "a11y.mainNav": "Navegación principal",
    "a11y.language": "Elige el idioma",
    "a11y.features": "Lo importante",
    "a11y.zones": "Zonas de aprendizaje",
    "a11y.words": "Palabras",
    "a11y.phrases": "Frases amables",
    "a11y.privacy": "Privacidad y progreso",
    "a11y.backTop": "PyBot English, volver arriba",
    "nav.home": "Inicio",
    "nav.path": "El camino",
    "nav.album": "Álbum",
    "nav.faq": "Preguntas",
    "hero.eyebrow": "Una aventura en inglés",
    "hero.titleStart": "Inglés, una palabra",
    "hero.titleEnd": "a la vez.",
    "hero.intro": "PyBot aprende inglés contigo. Mira una palabra. Escúchala. Dila en voz alta.",
    "hero.start": "Ver el camino",
    "hero.talk": "Habla con PyBot",
    "trust.accounts": "Sin cuentas",
    "trust.pace": "A tu ritmo",
    "trust.progress": "Tu progreso se queda contigo",
    "pybot.says": "PYBOT DICE",
    "pybot.listen": "Escuchar",
    "pybot.touch": "Saluda a PyBot",
    "mood.happyLabel": "PyBot está feliz y saluda",
    "mood.welcomingLabel": "PyBot abre los brazos con una gran sonrisa",
    "mood.curiousLabel": "PyBot inclina la cabeza con curiosidad",
    "mood.celebratingLabel": "PyBot celebra con los brazos arriba",
    "mood.encouragingLabel": "PyBot te anima con una sonrisa",
    "mood.winkLabel": "PyBot guiña un ojo",
    "mood.starryLabel": "PyBot tiene estrellas en los ojos",
    "name.question": "¿Cómo te gustaría que te llamara?",
    "name.placeholder": "Nombre o apodo",
    "name.save": "¡Así me llamo!",
    "name.privateNote": "Solo este navegador lo recordará.",
    "name.error": "Escribe un nombre o un apodo.",
    "name.savedPrefix": "PyBot te llama",
    "name.change": "Cambiar",
    "name.forget": "Olvidar este nombre",
    "loop.eyebrow": "ASÍ APRENDEMOS",
    "loop.intro": "Una idea en cada página. Una cosa clara para hacer.",
    "loop.step1Title": "Mira",
    "loop.step1Text": "PyBot te muestra una palabra con un dibujo.",
    "loop.step2Title": "Escucha",
    "loop.step2Text": "Presiona el botón y oye cómo suena.",
    "loop.step3Title": "Dila",
    "loop.step3Text": "Repítela en voz alta. Luego úsala en una frase corta.",
    "preview.eyebrow": "TU PRIMERA MISIÓN",
    "preview.title": "Dile algo amable a PyBot.",
    "preview.text": "Elige una frase. PyBot te responde en inglés. Escucha y repite.",
    "preview.noteStrong": "¿Te equivocas?",
    "preview.noteText": "No pasa nada. Así se aprende un idioma.",
    "preview.windowTitle": "Frases amables",
    "preview.answerLabel": "PYBOT RESPONDE",
    "preview.ready": "Elige una frase para empezar.",
    "phrase.helloHelp": "¡Hola, PyBot!",
    "phrase.howAreYouHelp": "¿Cómo estás?",
    "phrase.thanksHelp": "¡Gracias!",
    "phrase.friendHelp": "Eres mi amigo.",
    "phrase.learningHelp": "Estoy aprendiendo inglés.",
    "phrase.goodbyeHelp": "¡Nos vemos pronto!",
    "path.eyebrow": "TU CAMINO",
    "path.titleStart": "Primero, lo básico.",
    "path.titleEnd": "Luego 10 zonas pequeñas y una parada.",
    "path.intro": "Ve despacio. Cada zona tiene una idea y una actividad pequeña. Toca una palabra para escucharla.",
    "path.rule": "Una idea. Un paso claro.",
    "path.allSoon": "Las lecciones llegan muy pronto.",
    "path.start": "Empezar →",
    "path.continue": "Sigue aquí →",
    "path.soon": "Muy pronto",
    "path.zoneDone": "★ Zona terminada",
    "path.diploma": "Ver diploma",
    "status.done": "HECHO",
    "status.current": "SIGUE AQUÍ",
    "status.visited": "VISITADO",
    "zone0.concept": "ANTES DE EMPEZAR",
    "zone0.text": "Saluda, despídete y descubre cómo se aprende aquí.",
    "zone1.concept": "LETRAS Y SONIDOS",
    "zone1.text": "Las 26 letras, cómo suenan y cómo deletrear tu nombre.",
    "zone2.concept": "CONTAR",
    "zone2.text": "Cuenta del 1 al 20 y pregunta cuántos hay.",
    "zone3.concept": "VER Y DESCRIBIR",
    "zone3.text": "Nombra colores y formas. Di de qué color es algo.",
    "zone4.concept": "PRESENTARSE",
    "zone4.text": "Di tu nombre y tu edad. Presenta a tu familia.",
    "zone5.concept": "CUERPO Y EMOCIONES",
    "zone5.text": "Las partes del cuerpo y cómo te sientes hoy.",
    "zone6.concept": "EN CLASE",
    "zone6.text": "Objetos del salón y lo que dice quien enseña.",
    "zone7.concept": "PUEDE O NO PUEDE",
    "zone7.text": "Animales, grandes y pequeños, y lo que pueden hacer.",
    "zone8.concept": "GUSTOS",
    "zone8.text": "Comidas y bebidas. Di lo que te gusta y lo que no.",
    "zone9.concept": "RUTINAS",
    "zone9.text": "Los días de la semana y lo que haces cada día.",
    "zone10.concept": "PREGUNTAR Y ENCONTRAR",
    "zone10.text": "Pregunta qué, quién y dónde. Encuentra cosas en casa.",
    "pit.concept": "PARADA",
    "pit.text": "Un repaso corto con todo lo aprendido. Luego tu diploma.",
    "route.helloGoodbye": "Hola y adiós",
    "route.lookListenSay": "Mira, escucha, dila",
    "route.abcLetters": "Las letras",
    "route.abcVowels": "Vocales: a, e, i, o, u",
    "route.abcSpell": "Deletrea tu nombre",
    "route.numbersTen": "Del 1 al 10",
    "route.numbersTwenty": "Del 11 al 20",
    "route.colors": "Los colores",
    "route.shapes": "Las formas",
    "route.myFamily": "Mi familia",
    "route.myBody": "Mi cuerpo",
    "route.feelings": "Emociones",
    "route.backpack": "Mi mochila",
    "route.animals": "Animales",
    "route.food": "Comida y bebida",
    "route.days": "Los días",
    "route.dayParts": "Mañana, tarde y noche",
    "route.routine": "Mi rutina",
    "route.house": "Las partes de la casa",
    "extras.eyebrow": "MÁS PARA TI",
    "extras.title": "Stickers, palabras e ideas",
    "extras.album": "Mi álbum",
    "extras.albumText": "Tus stickers, diplomas y días de aprendizaje.",
    "extras.glossary": "Mis palabras",
    "extras.glossaryText": "Todas las palabras del camino, con dibujo y sonido.",
    "extras.faq": "Preguntas",
    "extras.faqText": "Respuestas para ti y para los adultos que te acompañan.",
    "local.eyebrow": "TU TRABAJO ES TUYO",
    "local.title": "Sin cuenta. Tu progreso se queda aquí.",
    "local.text": "Este navegador recuerda lo que haces. La voz la pone tu propio dispositivo. Pide permiso a un adulto antes de borrar sus datos.",
    "backup.title": "¿Vas a usar otro navegador?",
    "backup.text": "Guarda aquí una copia. Luego cárgala en el otro navegador.",
    "backup.export": "Guardar una copia",
    "backup.import": "Cargar una copia",
    "backup.exported": "Copia guardada. Guarda el archivo en un lugar seguro.",
    "backup.confirm": "¿Cambiar el progreso de este navegador por esta copia? Actividades terminadas en la copia: {count}.",
    "backup.loadYes": "Sí, cargar esta copia",
    "backup.imported": "Listo. Tu progreso volvió.",
    "backup.upgraded": "Listo. Tu progreso volvió, actualizado al PyBot English más nuevo.",
    "backup.versionLabel": "Versión del progreso",
    "backup.cancelled": "No cambió nada.",
    "backup.cancel": "Cancelar",
    "backup.invalid": "Este no es un archivo de copia de PyBot English. No cambió nada.",
    "backup.newer": "Esta copia viene de un PyBot English más nuevo. No cambió nada.",
    "backup.failed": "Este navegador no pudo guardar la copia. No cambió nada.",
    "reset.title": "Para adultos: borrar todo el progreso",
    "reset.text": "Úsalo solo en una emergencia. Borra las actividades terminadas, los stickers y el lugar en el camino en este navegador. El idioma y el nombre se quedan.",
    "reset.button": "Borrar todo el progreso",
    "reset.askBackup": "Antes de borrar, ¿quieres guardar una copia del progreso?",
    "reset.saveFirst": "Guardar una copia y seguir",
    "reset.skipBackup": "Seguir sin copia",
    "reset.confirm": "¿Borrar todo el progreso de este navegador? No se puede deshacer sin una copia.",
    "reset.eraseYes": "Sí, borrar todo",
    "reset.done": "Progreso borrado. PyBot empieza otra vez desde el principio.",
    "reset.cancelled": "No cambió nada.",
    "reset.failed": "Este navegador no pudo borrar el progreso. No cambió nada.",
    "reward.new": "¡Sticker nuevo: {name}!",
    "reward.newMany": "¡{count} stickers nuevos en tu álbum!",
    "reward.open": "Abrir mi álbum",
    "streak.days": "Has aprendido con PyBot {count} días.",
    "streak.oneDay": "Has aprendido con PyBot 1 día.",
    "streak.run": "¡{count} días seguidos!",
    "badge.firstStep": "Primer paso",
    "badge.firstStepHint": "Termina tu primera actividad.",
    "badge.days3": "Tres días seguidos",
    "badge.days3Hint": "Aprende 3 días seguidos.",
    "badge.days7": "Una semana entera",
    "badge.days7Hint": "Aprende 7 días seguidos.",
    "badge.days10": "Diez días aprendiendo",
    "badge.days10Hint": "Aprende 10 días distintos. No tienen que ser seguidos.",
    "badge.zoneHint": "Termina la zona {name} para ganarlo.",
    "badge.allZones": "Trofeo PyBot English",
    "badge.allZonesHint": "Termina todas las zonas.",
    "footer.line": "Pasos pequeños. Inglés de verdad.",
    "footer.status": "Primer prototipo",
    "footer.story": "Nació de una idea de María Ángel: ella aprendió inglés por su cuenta y quiere ayudar a sus amigos a aprenderlo también.",
    "footer.credit": "© 2026 Sorey Garcia. Código bajo MIT, contenido bajo CC BY 4.0.",
    "footer.family": "De la familia de",
    "voice.missing": "Este navegador no tiene voz. Pide ayuda a un adulto.",
  },
  en: {
    "meta.homeTitle": "PyBot English — one word at a time",
    "meta.courseTitle": "Learning path — PyBot English",
    "meta.albumTitle": "My album — PyBot English",
    "meta.diplomaTitle": "Diploma — PyBot English",
    "meta.faqTitle": "Questions — PyBot English",
    "meta.homeDescription": "PyBot English helps children take their first steps in English through tiny ideas, clear steps, and kind phrases.",
    "meta.courseDescription": "A short foundation and ten small zones to learn English with PyBot.",
    "meta.albumDescription": "Your PyBot English stickers, diplomas and learning days.",
    "meta.diplomaDescription": "A printable PyBot English diploma for a finished zone.",
    "meta.faqDescription": "Frequently asked questions about PyBot English for learners and grown-ups.",
    "a11y.skip": "Skip to content",
    "a11y.home": "PyBot English, home",
    "a11y.mainNav": "Main navigation",
    "a11y.language": "Choose language",
    "a11y.features": "Important features",
    "a11y.zones": "Learning zones",
    "a11y.words": "Words",
    "a11y.phrases": "Kind phrases",
    "a11y.privacy": "Privacy and progress",
    "a11y.backTop": "PyBot English, back to top",
    "nav.home": "Home",
    "nav.path": "The path",
    "nav.album": "Album",
    "nav.faq": "Questions",
    "hero.eyebrow": "An English adventure",
    "hero.titleStart": "English, one word",
    "hero.titleEnd": "at a time.",
    "hero.intro": "PyBot learns English with you. Look at a word. Listen to it. Say it out loud.",
    "hero.start": "See the path",
    "hero.talk": "Talk to PyBot",
    "trust.accounts": "No accounts",
    "trust.pace": "Your pace",
    "trust.progress": "Progress stays with you",
    "pybot.says": "PYBOT SAYS",
    "pybot.listen": "Listen",
    "pybot.touch": "Say hi to PyBot",
    "mood.happyLabel": "PyBot is happy and waves hello",
    "mood.welcomingLabel": "PyBot opens its arms with a big smile",
    "mood.curiousLabel": "PyBot tilts its head, curious",
    "mood.celebratingLabel": "PyBot celebrates with both arms up",
    "mood.encouragingLabel": "PyBot cheers you on with a smile",
    "mood.winkLabel": "PyBot winks",
    "mood.starryLabel": "PyBot has stars in its eyes",
    "name.question": "What would you like me to call you?",
    "name.placeholder": "Name or nickname",
    "name.save": "That's me!",
    "name.privateNote": "Only this browser remembers it.",
    "name.error": "Please type a name or nickname.",
    "name.savedPrefix": "PyBot calls you",
    "name.change": "Change",
    "name.forget": "Forget this name",
    "loop.eyebrow": "HOW WE LEARN",
    "loop.intro": "One idea on each page. One clear thing to do.",
    "loop.step1Title": "Mira",
    "loop.step1Text": "PyBot shows you one word with a picture.",
    "loop.step2Title": "Escucha",
    "loop.step2Text": "Press the button and hear how it sounds.",
    "loop.step3Title": "Dila",
    "loop.step3Text": "Say it out loud. Then use it in a short sentence.",
    "preview.eyebrow": "YOUR FIRST MISSION",
    "preview.title": "Say something kind to PyBot.",
    "preview.text": "Pick a phrase. PyBot answers in English. Listen and repeat.",
    "preview.noteStrong": "Made a mistake?",
    "preview.noteText": "That's okay. That is how you learn a language.",
    "preview.windowTitle": "Kind phrases",
    "preview.answerLabel": "PYBOT ANSWERS",
    "preview.ready": "Pick a phrase to start.",
    "phrase.helloHelp": "¡Hola, PyBot!",
    "phrase.howAreYouHelp": "¿Cómo estás?",
    "phrase.thanksHelp": "¡Gracias!",
    "phrase.friendHelp": "Eres mi amigo.",
    "phrase.learningHelp": "Estoy aprendiendo inglés.",
    "phrase.goodbyeHelp": "¡Nos vemos pronto!",
    "path.eyebrow": "YOUR PATH",
    "path.titleStart": "First, the basics.",
    "path.titleEnd": "Then 10 small zones and a pit stop.",
    "path.intro": "Go slowly. Each zone has one idea and one small activity. Tap a word to hear it.",
    "path.rule": "One idea. One clear next step.",
    "path.allSoon": "Lessons are coming soon.",
    "path.start": "Start →",
    "path.continue": "Continue here →",
    "path.soon": "Coming soon",
    "path.zoneDone": "★ Zone finished",
    "path.diploma": "See diploma",
    "status.done": "DONE",
    "status.current": "CONTINUE HERE",
    "status.visited": "VISITED",
    "zone0.concept": "BEFORE WE START",
    "zone0.text": "Say hello and goodbye, and see how learning works here.",
    "zone1.concept": "LETTERS AND SOUNDS",
    "zone1.text": "The 26 letters, how they sound, and how to spell your name.",
    "zone2.concept": "COUNTING",
    "zone2.text": "Count from 1 to 20 and ask how many there are.",
    "zone3.concept": "SEE AND DESCRIBE",
    "zone3.text": "Name colors and shapes. Say what color something is.",
    "zone4.concept": "INTRODUCE YOURSELF",
    "zone4.text": "Say your name and age. Introduce your family.",
    "zone5.concept": "BODY AND FEELINGS",
    "zone5.text": "Parts of the body and how you feel today.",
    "zone6.concept": "IN CLASS",
    "zone6.text": "Classroom things and what the teacher says.",
    "zone7.concept": "CAN OR CAN'T",
    "zone7.text": "Animals, big and small, and what they can do.",
    "zone8.concept": "LIKES",
    "zone8.text": "Food and drinks. Say what you like and don't like.",
    "zone9.concept": "ROUTINES",
    "zone9.text": "The days of the week and what you do each day.",
    "zone10.concept": "ASK AND FIND",
    "zone10.text": "Ask what, who, and where. Find things at home.",
    "pit.concept": "PIT STOP",
    "pit.text": "A short review of everything. Then your diploma.",
    "route.helloGoodbye": "Hello and goodbye",
    "route.lookListenSay": "Look, listen, say",
    "route.abcLetters": "The letters",
    "route.abcVowels": "Vowels: a, e, i, o, u",
    "route.abcSpell": "Spell your name",
    "route.numbersTen": "From 1 to 10",
    "route.numbersTwenty": "From 11 to 20",
    "route.colors": "Colors",
    "route.shapes": "Shapes",
    "route.myFamily": "My family",
    "route.myBody": "My body",
    "route.feelings": "Feelings",
    "route.backpack": "My backpack",
    "route.animals": "Animals",
    "route.food": "Food and drinks",
    "route.days": "The days",
    "route.dayParts": "Morning, afternoon, night",
    "route.routine": "My routine",
    "route.house": "Rooms in a house",
    "extras.eyebrow": "MORE FOR YOU",
    "extras.title": "Stickers, words and ideas",
    "extras.album": "My album",
    "extras.albumText": "Your stickers, diplomas and learning days.",
    "extras.glossary": "My words",
    "extras.glossaryText": "Every word on the path, with a picture and sound.",
    "extras.faq": "Questions",
    "extras.faqText": "Answers for you and for the grown-ups who help you.",
    "local.eyebrow": "YOUR WORK IS YOURS",
    "local.title": "No account. Your progress stays here.",
    "local.text": "This browser remembers your work. The voice comes from your own device. Ask an adult before clearing its data.",
    "backup.title": "Moving to another browser?",
    "backup.text": "Save a backup file here. Then load it in the other browser.",
    "backup.export": "Save a backup file",
    "backup.import": "Load a backup file",
    "backup.exported": "Backup saved. Keep the file somewhere safe.",
    "backup.confirm": "Replace the progress in this browser with this backup? Finished activities in the backup: {count}.",
    "backup.loadYes": "Yes, load this backup",
    "backup.imported": "Done. Your progress is back.",
    "backup.upgraded": "Done. Your progress is back, updated to the newest PyBot English.",
    "backup.versionLabel": "Progress version",
    "backup.cancelled": "Nothing changed.",
    "backup.cancel": "Cancel",
    "backup.invalid": "This is not a PyBot English backup file. Nothing changed.",
    "backup.newer": "This backup comes from a newer PyBot English. Nothing changed.",
    "backup.failed": "This browser could not save the backup. Nothing changed.",
    "reset.title": "For adults: erase all progress",
    "reset.text": "Use this only in an emergency. It erases finished activities, stickers and the place on the path in this browser. Language and the name stay.",
    "reset.button": "Erase all progress",
    "reset.askBackup": "Before erasing, do you want to save a backup file of the progress so far?",
    "reset.saveFirst": "Save a backup, then continue",
    "reset.skipBackup": "Continue without a backup",
    "reset.confirm": "Erase all progress in this browser? This cannot be undone without a backup file.",
    "reset.eraseYes": "Yes, erase everything",
    "reset.done": "Progress erased. PyBot starts again from the beginning.",
    "reset.cancelled": "Nothing changed.",
    "reset.failed": "This browser could not erase the progress. Nothing changed.",
    "reward.new": "New sticker: {name}!",
    "reward.newMany": "{count} new stickers in your album!",
    "reward.open": "Open my album",
    "streak.days": "You have learned with PyBot on {count} days.",
    "streak.oneDay": "You have learned with PyBot on 1 day.",
    "streak.run": "{count} days in a row!",
    "badge.firstStep": "First step",
    "badge.firstStepHint": "Finish your first activity.",
    "badge.days3": "Three days in a row",
    "badge.days3Hint": "Learn on 3 days in a row.",
    "badge.days7": "A whole week",
    "badge.days7Hint": "Learn on 7 days in a row.",
    "badge.days10": "Ten learning days",
    "badge.days10Hint": "Learn on 10 different days. They don't need to be in a row.",
    "badge.zoneHint": "Finish the zone {name} to earn it.",
    "badge.allZones": "PyBot English trophy",
    "badge.allZonesHint": "Finish every zone.",
    "footer.line": "Small steps. Real English.",
    "footer.status": "First prototype",
    "footer.story": "It started with María Ángel's idea: she taught herself English and wants to help her friends learn it too.",
    "footer.credit": "© 2026 Sorey Garcia. Code under MIT, content under CC BY 4.0.",
    "footer.family": "Part of the family of",
    "voice.missing": "This browser has no voice. Ask an adult for help.",
  },
};

// PyBot's sweet lines. English is what PyBot says; `help` keys hold the Spanish meaning.
const pybotGreetings = [
  { mood: "happy", en: "Hello! Nice to meet you.", enNamed: "Hello, {name}! Nice to see you.", es: "¡Hola! Mucho gusto.", esNamed: "¡Hola, {name}! Qué bueno verte." },
  { mood: "curious", en: "Do you want to learn one word?", es: "¿Quieres aprender una palabra?" },
  { mood: "welcoming", en: "I'm happy you are here.", es: "Me alegra que estés aquí." },
  { mood: "encouraging", en: "Mistakes are okay. Try again!", es: "Equivocarse está bien. ¡Inténtalo otra vez!" },
  { mood: "wink", en: "Learning with friends is fun.", es: "Aprender con amigos es divertido." },
  { mood: "celebrating", en: "You are doing great!", es: "¡Lo estás haciendo muy bien!" },
];

const kindAnswers = {
  hello: { mood: "welcoming", en: "Hello, friend! I'm so happy to see you.", enNamed: "Hello, {name}! I'm so happy to see you.", es: "¡Hola! Me alegra mucho verte.", esNamed: "¡Hola, {name}! Me alegra mucho verte." },
  howAreYou: { mood: "happy", en: "I'm great, thank you! And you?", es: "¡Estoy muy bien, gracias! ¿Y tú?" },
  thanks: { mood: "wink", en: "You're welcome!", es: "¡De nada!" },
  friend: { mood: "celebrating", en: "I'm your friend too!", es: "¡Yo también soy tu amigo!" },
  learning: { mood: "starry", en: "Great! One word at a time.", es: "¡Genial! Una palabra a la vez." },
  goodbye: { mood: "happy", en: "See you soon! Keep practicing.", es: "¡Nos vemos pronto! Sigue practicando." },
};

let currentLanguage = DEFAULT_LANGUAGE;
let learnerName = "";
const languageRenderers = [];

function textFor(key) {
  return translations[currentLanguage][key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
}

function readStored(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    // Storage failure must never block a page.
    return false;
  }
}

function removeStored(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to do: the page still works.
  }
}

// ---------- Language ----------

function setLanguage(language, persist = true) {
  currentLanguage = translations[language] ? language : DEFAULT_LANGUAGE;
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = textFor(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", textFor(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", textFor(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    element.setAttribute("content", textFor(element.dataset.i18nContent));
  });
  const titleKey = `meta.${document.body.dataset.page}Title`;
  if (translations[currentLanguage][titleKey]) {
    document.title = textFor(titleKey);
  }
  document.querySelectorAll("[data-language]").forEach((button) => {
    const active = button.dataset.language === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (persist) {
    writeStored(LANGUAGE_KEY, currentLanguage);
  }
  languageRenderers.forEach((render) => render());
}

// ---------- Listening (Web Speech API, the device's own voice) ----------

function pickEnglishVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang === "en-US") ?? voices.find((voice) => voice.lang.startsWith("en")) ?? null;
}

function say(text, button) {
  if (!("speechSynthesis" in window)) {
    window.alert(textFor("voice.missing"));
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  const voice = pickEnglishVoice();
  if (voice) {
    utterance.voice = voice;
  }
  utterance.onstart = () => button?.classList.add("is-speaking");
  utterance.onend = utterance.onerror = () => button?.classList.remove("is-speaking");
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// ---------- Learner name ----------

function normalizeLearnerName(value) {
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().replace(/\s+/g, " ").slice(0, 24);
}

function storedLearnerName() {
  return normalizeLearnerName(readStored(LEARNER_NAME_KEY) ?? "");
}

// ---------- Path progress ----------

const stepById = (id) => pathSteps.find((step) => step.id === id);
const isStep = (id) => Boolean(stepById(id));

function storedList(key) {
  const value = readStored(key);
  return value ? value.split(",").filter(isStep) : [];
}

function activityStorageKey(activityId) {
  return `${STORAGE_PREFIX}activity.${activityId}`;
}

function storedActivityState(activityId) {
  return readStored(activityStorageKey(activityId));
}

function isStepFinished(step) {
  return step.activities.length > 0 && step.activities.every((id) => storedActivityState(id) === "complete");
}

function isStepDone(id) {
  const step = stepById(id);
  return step.activities.length > 0
    ? storedList(PATH_DONE_KEY).includes(id) || isStepFinished(step)
    : storedList(PATH_VISITED_KEY).includes(id);
}

function zoneProgress() {
  return { done: new Set(pathZones.filter((zone) => zone.steps.every(isStepDone))) };
}

// A lesson page marks its step as current and visited, and counts the day.
function noteLessonVisit() {
  const step = pathSteps.find((candidate) => candidate.page === document.body.dataset.page);
  if (!step) {
    return;
  }
  writeStored(PATH_CURRENT_KEY, step.id);
  const visited = storedList(PATH_VISITED_KEY);
  if (!visited.includes(step.id)) {
    writeStored(PATH_VISITED_KEY, [...visited, step.id].join(","));
  }
  if (readStored(PATH_KNOWN_KEY) === null) {
    writeStored(PATH_KNOWN_KEY, pathSteps.map((candidate) => candidate.id).join(","));
  }
  noteLearningDay();
}

// ---------- Rewards: stickers, diplomas and a gentle count of learning days ----------

const zoneBadgeId = (zone) => `zone-${zone.steps[0]}`;
const todayString = (date = new Date()) => date.toLocaleDateString("en-CA");

function badgeList() {
  return [
    { id: "first-step", icon: "👣", title: "badge.firstStep", hint: "badge.firstStepHint", earned: (stats) => stats.activities > 0 },
    { id: "days-3", icon: "🔥", title: "badge.days3", hint: "badge.days3Hint", earned: (stats) => stats.bestRun >= 3 },
    { id: "days-7", icon: "🌈", title: "badge.days7", hint: "badge.days7Hint", earned: (stats) => stats.bestRun >= 7 },
    { id: "days-10", icon: "📅", title: "badge.days10", hint: "badge.days10Hint", earned: (stats) => stats.days.length >= 10 },
    ...pathZones.map((zone) => ({
      id: zoneBadgeId(zone),
      icon: zone.icon,
      name: zone.name,
      zone,
      earned: (stats) => stats.doneZones.has(zone),
    })),
    { id: "all-zones", icon: "🏆", title: "badge.allZones", hint: "badge.allZonesHint", earned: (stats) => pathZones.every((zone) => stats.doneZones.has(zone)) },
  ];
}

const badgeTitle = (badge) => badge.name ?? textFor(badge.title);
const badgeHint = (badge) => (badge.zone ? textFor("badge.zoneHint").replace("{name}", badge.name) : textFor(badge.hint));

function learningDays() {
  return (readStored(DAYS_KEY) ?? "").split(",").filter((day) => DATE_PATTERN.test(day));
}

// Missing a day is never punished: only runs and the total are celebrated.
function noteLearningDay() {
  const days = learningDays();
  const today = todayString();
  if (!days.includes(today)) {
    writeStored(DAYS_KEY, [...days, today].sort().slice(-DAYS_KEPT).join(","));
  }
}

function learningStreak() {
  const days = learningDays().sort();
  const dayNumber = (day) => Math.round(Date.parse(`${day}T12:00:00Z`) / 86_400_000);
  let run = 0;
  let bestRun = 0;
  days.forEach((day, index) => {
    run = index > 0 && dayNumber(day) - dayNumber(days[index - 1]) === 1 ? run + 1 : 1;
    bestRun = Math.max(bestRun, run);
  });
  const last = days.at(-1);
  const sinceLast = last ? dayNumber(todayString()) - dayNumber(last) : Infinity;
  return { days, bestRun, currentRun: sinceLast <= 1 ? run : 0 };
}

function storedBadges() {
  const badges = new Map();
  (readStored(BADGES_KEY) ?? "").split(",").forEach((pair) => {
    const [id, date] = pair.split(":");
    if (id && DATE_PATTERN.test(date ?? "")) {
      badges.set(id, date);
    }
  });
  return badges;
}

// Saves any sticker the learner just earned and says so once.
function checkRewards() {
  const stats = {
    ...learningStreak(),
    activities: activityIds.filter((id) => storedActivityState(id) === "complete").length,
    doneZones: zoneProgress().done,
  };
  const badges = storedBadges();
  const earned = badgeList().filter((badge) => !badges.has(badge.id) && badge.earned(stats));
  if (earned.length === 0) {
    return;
  }
  earned.forEach((badge) => badges.set(badge.id, todayString()));
  if (writeStored(BADGES_KEY, [...badges].map(([id, date]) => `${id}:${date}`).join(","))) {
    showRewardToast(earned);
  }
}

function showRewardToast(earned) {
  document.querySelector(".reward-toast")?.remove();
  const toast = document.createElement("p");
  toast.className = "reward-toast";
  toast.setAttribute("role", "status");
  const icon = document.createElement("span");
  icon.className = "reward-toast-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = earned[0].icon;
  const text = document.createElement("span");
  text.textContent = earned.length === 1
    ? textFor("reward.new").replace("{name}", badgeTitle(earned[0]))
    : textFor("reward.newMany").replace("{count}", String(earned.length));
  const link = document.createElement("a");
  link.href = new URL("album.html", scriptBaseUrl).href;
  link.textContent = textFor("reward.open");
  toast.append(icon, text, link);
  document.body.append(toast);
  window.setTimeout(() => toast.classList.add("is-leaving"), 7000);
  window.setTimeout(() => toast.remove(), 7600);
}

function renderStreak() {
  document.querySelectorAll("[data-streak]").forEach((element) => {
    const { days, currentRun } = learningStreak();
    element.hidden = days.length === 0;
    const total = days.length === 1 ? textFor("streak.oneDay") : textFor("streak.days").replace("{count}", String(days.length));
    element.textContent = currentRun >= 2 ? `🔥 ${textFor("streak.run").replace("{count}", String(currentRun))} ${total}` : total;
  });
}

// ---------- Saved progress: versions, backup and reset ----------

// The backup allowlist mirrors the storage registry in README.md.
function backupValidators() {
  const isStepList = (value) => value === "" || value.split(",").every(isStep);
  const validators = {
    [LANGUAGE_KEY]: (value) => Boolean(translations[value]),
    [LEARNER_NAME_KEY]: (value) => value.length > 0 && normalizeLearnerName(value) === value,
    [PATH_CURRENT_KEY]: isStep,
    [PATH_VISITED_KEY]: (value) => value.split(",").every(isStep),
    [PATH_DONE_KEY]: isStepList,
    [PATH_KNOWN_KEY]: isStepList,
    [SELF_CHECK_KEY]: (value) => value === "" || value.split(",").every((pair) => {
      const [id, rating] = pair.split(":");
      return isStep(id) && SELF_CHECK_RATINGS.includes(rating);
    }),
    [BADGES_KEY]: (value) => value === "" || value.split(",").every((pair) => {
      const [id, date] = pair.split(":");
      return badgeList().some((badge) => badge.id === id) && DATE_PATTERN.test(date ?? "");
    }),
    [DAYS_KEY]: (value) => value === "" || value.split(",").every((day) => DATE_PATTERN.test(day)),
  };
  activityIds.forEach((activityId) => {
    validators[activityStorageKey(activityId)] = (value) => value === "complete" || value === "review";
  });
  return validators;
}

function renameProgressStep(progress, from, to) {
  const rename = (id) => (id === from ? to : id);
  if (progress[PATH_CURRENT_KEY] === from) {
    progress[PATH_CURRENT_KEY] = to;
  }
  PATH_LIST_KEYS.filter((key) => typeof progress[key] === "string").forEach((key) => {
    progress[key] = progress[key].split(",").map(rename).join(",");
  });
  if (typeof progress[SELF_CHECK_KEY] === "string") {
    progress[SELF_CHECK_KEY] = progress[SELF_CHECK_KEY]
      .split(",")
      .map((pair) => pair.split(":"))
      .map(([id, rating]) => `${rename(id)}:${rating}`)
      .join(",");
  }
}

function renameProgressActivity(progress, from, to) {
  const fromKey = activityStorageKey(from);
  if (Object.hasOwn(progress, fromKey)) {
    progress[activityStorageKey(to)] ??= progress[fromKey];
    delete progress[fromKey];
  }
}

// Runs every migration after `fromVersion`, then drops steps and activities the
// current course no longer has, so progress from any older version still loads.
function upgradeProgress(progress, fromVersion) {
  const upgraded = { ...progress };
  if (fromVersion >= PROGRESS_VERSION) {
    return upgraded;
  }
  for (let version = fromVersion + 1; version <= PROGRESS_VERSION; version += 1) {
    progressMigrations[version]?.(upgraded);
  }
  const keepIds = (key, isKept) => {
    if (typeof upgraded[key] === "string") {
      upgraded[key] = upgraded[key].split(",").filter(isKept).join(",");
    }
  };
  PATH_LIST_KEYS.forEach((key) => keepIds(key, isStep));
  keepIds(SELF_CHECK_KEY, (pair) => isStep(pair.split(":")[0]));
  if (upgraded[PATH_VISITED_KEY] === "") {
    delete upgraded[PATH_VISITED_KEY];
  }
  if (Object.hasOwn(upgraded, PATH_CURRENT_KEY) && !isStep(upgraded[PATH_CURRENT_KEY])) {
    delete upgraded[PATH_CURRENT_KEY];
  }
  Object.keys(upgraded)
    .filter((key) => key.startsWith(activityStorageKey("")) && !activityIds.includes(key.slice(activityStorageKey("").length)))
    .forEach((key) => delete upgraded[key]);
  return upgraded;
}

// Brings the progress in this browser up to PROGRESS_VERSION after the course changes.
function upgradeStoredProgress() {
  try {
    const stored = Number.parseInt(localStorage.getItem(PROGRESS_VERSION_KEY) ?? "1", 10);
    const fromVersion = Number.isInteger(stored) && stored > 0 ? stored : 1;
    if (fromVersion > PROGRESS_VERSION) {
      return;
    }
    if (fromVersion < PROGRESS_VERSION) {
      const progress = {};
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (key?.startsWith(STORAGE_PREFIX) && key !== PROGRESS_VERSION_KEY) {
          progress[key] = localStorage.getItem(key);
        }
      }
      const upgraded = upgradeProgress(progress, fromVersion);
      Object.keys(progress).filter((key) => !Object.hasOwn(upgraded, key)).forEach((key) => localStorage.removeItem(key));
      Object.entries(upgraded).forEach(([key, value]) => localStorage.setItem(key, value));
    }
    localStorage.setItem(PROGRESS_VERSION_KEY, String(PROGRESS_VERSION));
  } catch {
    // Storage failure must never block a lesson.
  }
}

function createBackup() {
  const progress = {};
  Object.entries(backupValidators()).forEach(([key, isValid]) => {
    const value = localStorage.getItem(key);
    if (value !== null && isValid(value)) {
      progress[key] = value;
    }
  });
  return {
    format: BACKUP_FORMAT,
    schemaVersion: BACKUP_SCHEMA_VERSION,
    progressVersion: PROGRESS_VERSION,
    exportedAt: new Date().toISOString(),
    progress,
  };
}

// Returns the validated progress entries, or an error key when the file must be rejected.
function readBackup(text) {
  let backup;
  try {
    backup = JSON.parse(text);
  } catch {
    return { error: "backup.invalid" };
  }
  if (!backup || typeof backup !== "object" || backup.format !== BACKUP_FORMAT) {
    return { error: "backup.invalid" };
  }
  const progressVersion = backup.progressVersion ?? 1;
  if (
    (Number.isInteger(backup.schemaVersion) && backup.schemaVersion > BACKUP_SCHEMA_VERSION) ||
    (Number.isInteger(progressVersion) && progressVersion > PROGRESS_VERSION)
  ) {
    return { error: "backup.newer" };
  }
  const { progress } = backup;
  if (
    backup.schemaVersion !== BACKUP_SCHEMA_VERSION ||
    !Number.isInteger(progressVersion) ||
    progressVersion < 1 ||
    !progress ||
    typeof progress !== "object" ||
    Array.isArray(progress) ||
    !Object.values(progress).every((value) => typeof value === "string")
  ) {
    return { error: "backup.invalid" };
  }
  const validators = backupValidators();
  const entries = Object.entries(upgradeProgress(progress, progressVersion));
  const allValid = entries.every(([key, value]) => Object.hasOwn(validators, key) && validators[key](value));
  return allValid ? { entries, upgraded: progressVersion < PROGRESS_VERSION } : { error: "backup.invalid" };
}

function replaceProgress(entries) {
  const previous = Object.keys(backupValidators()).map((key) => [key, localStorage.getItem(key)]);
  try {
    previous.forEach(([key]) => localStorage.removeItem(key));
    entries.forEach(([key, value]) => localStorage.setItem(key, value));
  } catch (error) {
    previous.forEach(([key, value]) => {
      try {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      } catch {
        // Restoring the earlier progress is best effort.
      }
    });
    throw error;
  }
}

// Returns false when the browser could not build the backup file.
function downloadBackup() {
  let backup;
  try {
    backup = createBackup();
  } catch {
    return false;
  }
  const file = new Blob([`${JSON.stringify(backup, null, 2)}\n`], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = `pybot-english-backup-${backup.exportedAt.slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  return true;
}

// Keeps the preferences and the name, and drops every other registered key.
function progressAfterReset() {
  return RESET_KEPT_KEYS.map((key) => [key, localStorage.getItem(key)]).filter(([, value]) => value !== null);
}

function setStatus(element, key, replacements = {}) {
  if (!element) {
    return;
  }
  let text = key ? textFor(key) : "";
  Object.entries(replacements).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, value);
  });
  element.textContent = text;
}

// A small inline question with buttons. Resolves with the chosen value, or null.
function askChoice(after, questionKey, choices, replacements = {}) {
  after.parentElement.querySelector(".confirm-box")?.remove();
  return new Promise((resolve) => {
    const box = document.createElement("div");
    box.className = "confirm-box";
    box.setAttribute("role", "group");
    const question = document.createElement("p");
    setStatus(question, questionKey, replacements);
    const actions = document.createElement("div");
    actions.className = "confirm-actions";
    [...choices, { key: "backup.cancel", value: null }].forEach(({ key, value }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = textFor(key);
      button.addEventListener("click", () => {
        box.remove();
        resolve(value);
      });
      actions.append(button);
    });
    box.append(question, actions);
    after.after(box);
    actions.querySelector("button").focus();
  });
}

function setupBackupTools() {
  const exportButton = document.querySelector("[data-backup-export]");
  if (!exportButton) {
    return;
  }
  const importButton = document.querySelector("[data-backup-import]");
  const fileInput = document.querySelector("[data-backup-file]");
  const status = document.querySelector("[data-backup-status]");
  const resetButton = document.querySelector("[data-progress-reset]");
  const resetStatus = document.querySelector("[data-reset-status]");
  document.querySelectorAll("[data-progress-version]").forEach((element) => {
    element.textContent = String(PROGRESS_VERSION);
  });

  exportButton.addEventListener("click", () => {
    setStatus(status, downloadBackup() ? "backup.exported" : "backup.failed");
  });

  importButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const [file] = fileInput.files;
    fileInput.value = "";
    if (!file) {
      return;
    }
    if (file.size > BACKUP_MAX_BYTES) {
      setStatus(status, "backup.invalid");
      return;
    }
    const result = readBackup(await file.text());
    if (result.error) {
      setStatus(status, result.error);
      return;
    }
    const count = result.entries.filter(([key, value]) => key.startsWith(activityStorageKey("")) && value === "complete").length;
    const choice = await askChoice(importButton.parentElement, "backup.confirm", [{ key: "backup.loadYes", value: "load" }], { count: String(count) });
    if (!choice) {
      setStatus(status, "backup.cancelled");
      return;
    }
    try {
      replaceProgress(result.entries);
      localStorage.setItem(PROGRESS_VERSION_KEY, String(PROGRESS_VERSION));
    } catch {
      setStatus(status, "backup.failed");
      return;
    }
    learnerName = storedLearnerName();
    setLanguage(readStored(LANGUAGE_KEY) ?? currentLanguage, false);
    setStatus(status, result.upgraded ? "backup.upgraded" : "backup.imported");
  });

  resetButton?.addEventListener("click", async () => {
    const backupChoice = await askChoice(resetButton, "reset.askBackup", [
      { key: "reset.saveFirst", value: "save" },
      { key: "reset.skipBackup", value: "skip" },
    ]);
    if (!backupChoice) {
      setStatus(resetStatus, "reset.cancelled");
      return;
    }
    if (backupChoice === "save" && !downloadBackup()) {
      setStatus(resetStatus, "reset.failed");
      return;
    }
    const confirmChoice = await askChoice(resetButton, "reset.confirm", [{ key: "reset.eraseYes", value: "erase" }]);
    if (!confirmChoice) {
      setStatus(resetStatus, "reset.cancelled");
      return;
    }
    try {
      replaceProgress(progressAfterReset());
    } catch {
      setStatus(resetStatus, "reset.failed");
      return;
    }
    renderStreak();
    setStatus(resetStatus, "reset.done");
  });
}

// ---------- PyBot on the home page: sweet moods and kind phrases ----------

function fillName(text) {
  return text.replaceAll("{name}", learnerName);
}

let pybotLine = pybotGreetings[0];
let greetingIndex = 0;

function showPybotLine(line) {
  pybotLine = line;
  const wrap = document.querySelector(".pybot-wrap");
  const figure = document.querySelector("[data-pybot-figure]");
  const english = document.querySelector("[data-pybot-english]");
  const help = document.querySelector("[data-pybot-help]");
  if (!wrap || !english) {
    return;
  }
  wrap.dataset.mood = line.mood;
  figure?.setAttribute("aria-label", textFor(`mood.${line.mood}Label`));
  english.textContent = fillName(learnerName && line.enNamed ? line.enNamed : line.en);
  const meaning = fillName(learnerName && line.esNamed ? line.esNamed : line.es);
  help.textContent = currentLanguage === "es" ? meaning : `(${meaning})`;
}

function setupPybot() {
  const touch = document.querySelector("[data-pybot-touch]");
  if (!touch) {
    return;
  }
  touch.addEventListener("click", () => {
    greetingIndex = (greetingIndex + 1) % pybotGreetings.length;
    showPybotLine(pybotGreetings[greetingIndex]);
    say(document.querySelector("[data-pybot-english]").textContent);
  });
  document.querySelector("[data-pybot-listen]")?.addEventListener("click", (event) => {
    say(document.querySelector("[data-pybot-english]").textContent, event.currentTarget);
  });

  const answer = document.querySelector("[data-phrase-answer]");
  const answerHelp = document.querySelector("[data-phrase-answer-help]");
  let chosen = null;
  const renderAnswer = () => {
    if (!chosen) {
      return;
    }
    const line = kindAnswers[chosen];
    answer.textContent = fillName(learnerName && line.enNamed ? line.enNamed : line.en);
    delete answerHelp.dataset.i18n;
    const meaning = fillName(learnerName && line.esNamed ? line.esNamed : line.es);
    answerHelp.textContent = currentLanguage === "es" ? meaning : `(${meaning})`;
  };
  document.querySelectorAll("[data-phrase]").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      chosen = button.dataset.phrase;
      document.querySelectorAll("[data-phrase]").forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      renderAnswer();
      showPybotLine(kindAnswers[chosen]);
      say(answer.textContent);
    });
  });
  languageRenderers.push(() => {
    showPybotLine(pybotLine);
    renderAnswer();
  });
}

function setupNamePanel() {
  const form = document.querySelector("[data-name-form]");
  if (!form) {
    return;
  }
  const input = form.querySelector("input");
  const error = form.querySelector(".learner-name-error");
  const forget = form.querySelector("[data-name-forget]");
  const saved = document.querySelector("[data-name-saved]");

  const render = (showForm = !learnerName) => {
    form.hidden = !showForm;
    saved.hidden = showForm;
    forget.hidden = !learnerName;
    document.querySelectorAll("[data-learner-name]").forEach((element) => {
      element.textContent = learnerName;
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = normalizeLearnerName(input.value);
    error.hidden = Boolean(name);
    form.classList.toggle("is-invalid", !name);
    if (!name) {
      input.focus();
      return;
    }
    learnerName = name;
    writeStored(LEARNER_NAME_KEY, name);
    render(false);
    showPybotLine(pybotGreetings[0]);
    say(document.querySelector("[data-pybot-english]").textContent);
  });
  document.querySelector("[data-name-edit]").addEventListener("click", () => {
    input.value = learnerName;
    render(true);
    input.focus();
  });
  forget.addEventListener("click", () => {
    learnerName = "";
    input.value = "";
    removeStored(LEARNER_NAME_KEY);
    render(true);
    showPybotLine(pybotGreetings[0]);
  });
  render();
}

// ---------- Learning path map ----------

function renderPathMap() {
  const continueNote = document.querySelector("[data-path-continue]");
  if (!document.querySelector("[data-path-step]")) {
    return;
  }
  const current = readStored(PATH_CURRENT_KEY);
  const visited = storedList(PATH_VISITED_KEY);
  const doneZones = zoneProgress().done;

  document.querySelectorAll("[data-path-step]").forEach((item) => {
    const step = stepById(item.dataset.pathStep);
    let status = item.querySelector("[data-path-status]");
    if (!status) {
      status = document.createElement("small");
      status.dataset.pathStatus = "";
      item.append(status);
    }
    const state = isStepDone(step.id) ? "done" : step.id === current ? "current" : visited.includes(step.id) ? "visited" : "";
    item.classList.toggle("is-done", state === "done");
    item.classList.toggle("is-current", state === "current");
    status.textContent = state ? textFor(`status.${state}`) : "";
    status.hidden = !state;
  });

  document.querySelectorAll("[data-zone]").forEach((card) => {
    const zone = pathZones.find((candidate) => candidate.id === card.dataset.zone);
    const label = card.querySelector(".zone-status");
    if (!zone || !label) {
      return;
    }
    const isDone = doneZones.has(zone);
    const isSoon = zone.steps.every((id) => stepById(id).soon);
    label.dataset.i18n = isDone ? "path.zoneDone" : "path.soon";
    label.textContent = textFor(label.dataset.i18n);
    label.hidden = !isDone && !isSoon;
    card.classList.toggle("is-done", isDone);
  });

  if (continueNote) {
    const next = stepById(current) ?? pathSteps.find((step) => !step.soon);
    if (next && !next.soon) {
      continueNote.replaceChildren(Object.assign(document.createElement("a"), {
        href: next.href,
        textContent: textFor(current ? "path.continue" : "path.start"),
      }));
    }
  }
}

// ---------- Start ----------

const scriptBaseUrl = document.currentScript?.src ?? window.location.href;

upgradeStoredProgress();

document.addEventListener("DOMContentLoaded", () => {
  learnerName = storedLearnerName();
  currentLanguage = translations[readStored(LANGUAGE_KEY)] ? readStored(LANGUAGE_KEY) : DEFAULT_LANGUAGE;

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  document.querySelectorAll("[data-say]").forEach((button) => {
    button.addEventListener("click", () => say(button.dataset.say, button));
  });

  noteLessonVisit();
  setupPybot();
  setupNamePanel();
  setupBackupTools();
  languageRenderers.push(renderStreak, renderPathMap);
  setLanguage(currentLanguage, false);
  checkRewards();
});
