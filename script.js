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
const RESET_KEPT_KEYS = [LANGUAGE_KEY, "pybotenglish.buddy.enabled", LEARNER_NAME_KEY];
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
  { id: "numbersTen", page: "numbersTen", href: "lessons/01d-numbers-ten.html", soon: true, activities: [] },
  { id: "numbersTwenty", page: "numbersTwenty", href: "lessons/01e-numbers-twenty.html", soon: true, activities: [] },
  { id: "numbersHowMany", page: "numbersHowMany", href: "lessons/01f-numbers-how-many.html", soon: true, activities: [] },
  { id: "myName", page: "myName", href: "lessons/02-my-name.html", soon: true, activities: [] },
  { id: "myAge", page: "myAge", href: "lessons/02b-my-age.html", soon: true, activities: [] },
  { id: "myFamily", page: "myFamily", href: "lessons/02c-my-family.html", soon: true, activities: [] },
  { id: "myBody", page: "myBody", href: "lessons/02d-my-body.html", soon: true, activities: [] },
  { id: "feelings", page: "feelings", href: "lessons/02e-feelings.html", soon: true, activities: [] },
  { id: "iFeel", page: "iFeel", href: "lessons/02f-i-feel.html", soon: true, activities: [] },
  { id: "colors", page: "colors", href: "lessons/03-colors.html", soon: true, activities: [] },
  { id: "shapes", page: "shapes", href: "lessons/03b-shapes.html", soon: true, activities: [] },
  { id: "itIsRed", page: "itIsRed", href: "lessons/03c-it-is-red.html", soon: true, activities: [] },
  { id: "backpack", page: "backpack", href: "lessons/03d-backpack.html", soon: true, activities: [] },
  { id: "thisThat", page: "thisThat", href: "lessons/03e-this-that.html", soon: true, activities: [] },
  { id: "animals", page: "animals", href: "lessons/04-animals.html", soon: true, activities: [] },
  { id: "bigSmall", page: "bigSmall", href: "lessons/04b-big-small.html", soon: true, activities: [] },
  { id: "canCant", page: "canCant", href: "lessons/04c-can-cant.html", soon: true, activities: [] },
  { id: "food", page: "food", href: "lessons/04d-food.html", soon: true, activities: [] },
  { id: "iLike", page: "iLike", href: "lessons/04e-i-like.html", soon: true, activities: [] },
  { id: "iDontLike", page: "iDontLike", href: "lessons/04f-i-dont-like.html", soon: true, activities: [] },
  { id: "days", page: "days", href: "lessons/05-days.html", soon: true, activities: [] },
  { id: "dayParts", page: "dayParts", href: "lessons/05b-day-parts.html", soon: true, activities: [] },
  { id: "routine", page: "routine", href: "lessons/05c-routine.html", soon: true, activities: [] },
  { id: "classWords", page: "classWords", href: "lessons/05d-class-words.html", soon: true, activities: [] },
  { id: "questions", page: "questions", href: "lessons/06-questions.html", soon: true, activities: [] },
  { id: "inOnUnder", page: "inOnUnder", href: "lessons/06b-in-on-under.html", soon: true, activities: [] },
  { id: "house", page: "house", href: "lessons/06c-house.html", soon: true, activities: [] },
  { id: "checkpoint1", page: "checkpoint1", href: "lessons/07-checkpoint.html", soon: true, activities: [] },
];

// Zone names are English on purpose: they are part of what the learner learns.
const pathZones = [
  { id: "hello", name: "Hello!", icon: "👋", steps: ["helloGoodbye", "howAreYou", "lookListenSay"] },
  { id: "lettersNumbers", name: "Letters & Numbers", icon: "🔤", steps: ["abcLetters", "abcVowels", "abcSpell", "numbersTen", "numbersTwenty", "numbersHowMany"] },
  { id: "aboutMe", name: "All About Me", icon: "🙂", steps: ["myName", "myAge", "myFamily", "myBody", "feelings", "iFeel"] },
  { id: "colorsThings", name: "Colors & Things", icon: "🎨", steps: ["colors", "shapes", "itIsRed", "backpack", "thisThat"] },
  { id: "animalsFood", name: "Animals & Food", icon: "🐶", steps: ["animals", "bigSmall", "canCant", "food", "iLike", "iDontLike"] },
  { id: "myDay", name: "My Day", icon: "☀️", steps: ["days", "dayParts", "routine", "classWords"] },
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
    "meta.courseDescription": "Una base y seis zonas amplias para aprender inglés con PyBot.",
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
    "a11y.zonePages": "Páginas de la zona",
    "a11y.phrases": "Frases amables",
    "a11y.privacy": "Privacidad y progreso",
    "a11y.backTop": "PyBot English, volver arriba",
    "nav.home": "Inicio",
    "nav.path": "El camino",
    "nav.album": "Álbum",
    "nav.faq": "Preguntas",
    "nav.translator": "Traductor",
    "nav.menu": "Menú",
    "support.aria": "Apoya a PyBot en Patreon (se abre en una pestaña nueva)",
    "credit.voiceSummary": "La voz de PyBot viene de tu navegador ♥",
    "credit.voiceText": "Usamos la Web Speech API: cada navegador o sistema trae sus propias voces (de Google, Apple, Microsoft u otras). PyBot English no incluye ni modifica ninguna voz.",
    "credit.voiceLink": "Qué es la Web Speech API",
    "credit.allCredits": "Todos los créditos",
    "credit.translatorSummary": "Gracias a quienes hacen posible este traductor ♥",
    "credit.wordsTitle": "Lista de palabras:",
    "credit.wordsText": "hecha por PyBot English. Funciona sin internet.",
    "credit.browserTitle": "Traductor del navegador:",
    "credit.browserText": "la Translator API que trae tu navegador. En Chrome, el modelo es de Google y traduce dentro de tu dispositivo.",
    "credit.learnMore": "Más información",
    "credit.googleText": "un servicio de Google. Aquí solo aparece como enlace. Google Translate es una marca de Google LLC.",
    "credit.notAffiliated": "PyBot English no está afiliado a Google ni a ningún proveedor nombrado aquí.",
    "meta.translatorTitle": "Traductor — PyBot English",
    "meta.translatorDescription": "Escribe, traduce y escucha palabras en inglés con PyBot.",
    "extras.translator": "Mi traductor",
    "extras.translatorText": "Escribe una palabra, mira cómo se dice en inglés y escucha cómo suena.",
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
    "loop.step3Text": "Repítela en voz alta. Luego practícala en casa con tu familia.",
    "practice.eyebrow": "PRACTICA EN CASA",
    "practice.title": "El inglés se aprende hablando con tu gente.",
    "practice.intro": "PyBot te enseña cómo suena cada palabra. Hablar se practica en casa: con mamá, papá, tus hermanos y tus amigos.",
    "practice.teachTitle": "Tú enseñas",
    "practice.teachText": "Enséñale una palabra nueva a alguien de tu casa. Toquen 🔊 y escúchenla juntos.",
    "practice.echoTitle": "El juego del eco",
    "practice.echoText": "Una persona dice una palabra en inglés y la otra la repite. Luego cambian.",
    "practice.labelsTitle": "Etiquetas en casa",
    "practice.labelsText": "Pega papelitos con palabras en inglés: door, table, window. Léelas cada vez que pases.",
    "practice.adultsStrong": "Para adultos:",
    "practice.adultsText": "no hace falta saber inglés. El botón 🔊 dice cada palabra. Repítanla juntos y celebren el intento, no la perfección.",
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
    "path.titleEnd": "Luego 6 zonas y una parada.",
    "path.intro": "Cada zona es un tema grande con su propio camino de páginas. Ve despacio y toca una palabra para escucharla.",
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
    "zone1.concept": "LETRAS Y NÚMEROS",
    "zone1.text": "El abecedario, cómo suena cada letra y los números del 1 al 20.",
    "zone2.concept": "TODO SOBRE MÍ",
    "zone2.text": "Preséntate y habla de tu familia, tu cuerpo y cómo te sientes.",
    "zone3.concept": "COSAS Y COLORES",
    "zone3.text": "Colores, formas y las cosas de tu mochila. Di cómo son.",
    "zone4.concept": "ANIMALES Y COMIDA",
    "zone4.text": "Animales y lo que pueden hacer. Comidas y lo que te gusta.",
    "zone5.concept": "MI DÍA",
    "zone5.text": "Los días, tu rutina y lo que se dice en clase.",
    "zone6.concept": "PREGUNTAR Y ENCONTRAR",
    "zone6.text": "Pregunta qué, quién y dónde. Encuentra cosas en casa.",
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
    "route.checkpoint1": "Repaso final",
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
    "family.eyebrow": "LA FAMILIA PYBOT",
    "family.title": "¿Quieres aprender algo más?",
    "family.pythonAsk": "¿Quieres aprender Python?",
    "family.pythonText": "programa de verdad, un paso a la vez.",
    "family.englishAsk": "¿Quieres aprender inglés?",
    "family.englishText": "una palabra a la vez, con PyBot.",
    "family.blocksAsk": "¿Quieres aprender a usar Scratch?",
    "family.blocksText": "una guía sencilla para niñas, niños y familias.",
    "family.visit": "Visitar →",
    "voice.missing": "Este navegador no tiene voz. Pide ayuda a un adulto.",
  },
  en: {
    "meta.homeTitle": "PyBot English — one word at a time",
    "meta.courseTitle": "Learning path — PyBot English",
    "meta.albumTitle": "My album — PyBot English",
    "meta.diplomaTitle": "Diploma — PyBot English",
    "meta.faqTitle": "Questions — PyBot English",
    "meta.homeDescription": "PyBot English helps children take their first steps in English through tiny ideas, clear steps, and kind phrases.",
    "meta.courseDescription": "A short foundation and six broad zones to learn English with PyBot.",
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
    "a11y.zonePages": "Pages in this zone",
    "a11y.phrases": "Kind phrases",
    "a11y.privacy": "Privacy and progress",
    "a11y.backTop": "PyBot English, back to top",
    "nav.home": "Home",
    "nav.path": "The path",
    "nav.album": "Album",
    "nav.faq": "Questions",
    "nav.translator": "Translator",
    "nav.menu": "Menu",
    "support.aria": "Support PyBot on Patreon (opens in a new tab)",
    "credit.voiceSummary": "PyBot's voice comes from your browser ♥",
    "credit.voiceText": "We use the Web Speech API: each browser or system brings its own voices (from Google, Apple, Microsoft or others). PyBot English doesn't bundle or change any voice.",
    "credit.voiceLink": "What the Web Speech API is",
    "credit.allCredits": "All credits",
    "credit.translatorSummary": "Thanks to everyone who makes this translator possible ♥",
    "credit.wordsTitle": "Word list:",
    "credit.wordsText": "made by PyBot English. Works offline.",
    "credit.browserTitle": "Browser translator:",
    "credit.browserText": "the Translator API built into your browser. In Chrome, the model is Google's and translates on your device.",
    "credit.learnMore": "Learn more",
    "credit.googleText": "a Google service. It only appears here as a link. Google Translate is a trademark of Google LLC.",
    "credit.notAffiliated": "PyBot English is not affiliated with Google or any provider named here.",
    "meta.translatorTitle": "Translator — PyBot English",
    "meta.translatorDescription": "Type, translate and listen to English words with PyBot.",
    "extras.translator": "My translator",
    "extras.translatorText": "Type a word, see how to say it in English, and hear how it sounds.",
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
    "loop.step3Text": "Say it out loud. Then practice it at home with your family.",
    "practice.eyebrow": "PRACTICE AT HOME",
    "practice.title": "You learn English by talking with your people.",
    "practice.intro": "PyBot shows you how each word sounds. Speaking is practiced at home: with mom, dad, your brothers and sisters, and your friends.",
    "practice.teachTitle": "You teach",
    "practice.teachText": "Teach a new word to someone at home. Press 🔊 and listen to it together.",
    "practice.echoTitle": "The echo game",
    "practice.echoText": "One person says a word in English and the other repeats it. Then switch.",
    "practice.labelsTitle": "Labels at home",
    "practice.labelsText": "Stick notes with English words around the house: door, table, window. Read them every time you walk by.",
    "practice.adultsStrong": "For grown-ups:",
    "practice.adultsText": "you don't need to know English. The 🔊 button says every word. Repeat it together and celebrate the try, not perfection.",
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
    "path.titleEnd": "Then 6 zones and a pit stop.",
    "path.intro": "Each zone is a big theme with its own path of pages. Go slowly and tap a word to hear it.",
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
    "zone1.concept": "LETTERS AND NUMBERS",
    "zone1.text": "The alphabet, how each letter sounds, and numbers from 1 to 20.",
    "zone2.concept": "ALL ABOUT ME",
    "zone2.text": "Introduce yourself and talk about your family, your body, and how you feel.",
    "zone3.concept": "THINGS AND COLORS",
    "zone3.text": "Colors, shapes, and the things in your backpack. Say what they are like.",
    "zone4.concept": "ANIMALS AND FOOD",
    "zone4.text": "Animals and what they can do. Food and what you like.",
    "zone5.concept": "MY DAY",
    "zone5.text": "The days, your routine, and what people say in class.",
    "zone6.concept": "ASK AND FIND",
    "zone6.text": "Ask what, who, and where. Find things at home.",
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
    "route.checkpoint1": "Final review",
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
    "family.eyebrow": "THE PYBOT FAMILY",
    "family.title": "Want to learn something else?",
    "family.pythonAsk": "Want to learn Python?",
    "family.pythonText": "real code, one step at a time.",
    "family.englishAsk": "Want to learn English?",
    "family.englishText": "one word at a time, with PyBot.",
    "family.blocksAsk": "Want to learn to use Scratch?",
    "family.blocksText": "a simple guide for kids and families.",
    "family.visit": "Visit →",
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

function say(text, button, rate = 0.85) {
  if (!("speechSynthesis" in window)) {
    window.alert(textFor("voice.missing"));
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
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

// ---------- The PyBot family: each site gently points to its siblings ----------
// The same list lives in every PyBot site; each one hides itself with THIS_SITE.
// A sibling that is not published yet stays as "coming soon", without a link.
const THIS_SITE = "english";
const pybotFamily = [
  { id: "python", name: "PyBot", url: "https://pybot-kids.github.io/", icon: "</>", ask: "family.pythonAsk", text: "family.pythonText" },
  { id: "english", name: "PyBot English", url: "https://pybot-kids.github.io/pybot-english/", icon: "Aa", ask: "family.englishAsk", text: "family.englishText" },
  { id: "blocks", name: "PyBot Blocks", url: "https://pybot-kids.github.io/pybot-blocks/", icon: "🧩", ask: "family.blocksAsk", text: "family.blocksText", soon: true },
];

function renderFamily() {
  const list = document.querySelector("[data-pybot-family]");
  if (!list) {
    return;
  }
  list.replaceChildren(...pybotFamily.filter((site) => site.id !== THIS_SITE).map((site) => {
    const item = document.createElement("li");
    const card = document.createElement(site.soon ? "div" : "a");
    card.className = `family-card family-${site.id}`;
    if (!site.soon) {
      card.href = site.url;
    }
    const icon = document.createElement("span");
    icon.className = "family-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = site.icon;
    const copy = document.createElement("span");
    copy.className = "family-copy";
    const ask = document.createElement("b");
    ask.textContent = textFor(site.ask);
    const text = document.createElement("span");
    text.textContent = `${site.name}: ${textFor(site.text)}`;
    const action = document.createElement("small");
    action.textContent = textFor(site.soon ? "path.soon" : "family.visit");
    copy.append(ask, text, action);
    card.append(icon, copy);
    item.append(card);
    return item;
  }));
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
    [BUDDY_PREFERENCE_KEY]: (value) => value === "true" || value === "false",
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
      buddyReact("kindPhrase");
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
    buddyReact("nameSaved");
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

// ---------- The little PyBot companion in the corner ----------
// Same behavior as PyBot's buddy: it can be dragged, remembers its spot, follows
// the pointer with its eyes, naps when nobody moves, and gets dizzy when shaken.
// Its lines are kids' jokes, English riddles and tiny facts: no code talk.

Object.assign(translations.es, {
  "buddy.turnOn": "Mostrar al PyBot pequeño",
  "buddy.turnOff": "Esconder al PyBot pequeño",
  "buddy.hide": "Esconder al PyBot pequeño",
  "buddy.greetMorning": "Good morning",
  "buddy.greetAfternoon": "Good afternoon",
  "buddy.greetEvening": "Good evening",
  "buddy.greet": "{greet}! ¡Qué bueno verte!",
  "buddy.greetNamed": "{greet}, {name}! ¡Qué bueno verte!",
  "buddy.hover1": "¡Hola! Hi!",
  "buddy.hover2": "¿Me buscabas?",
  "buddy.hover3": "Hello, friend!",
  "buddy.correct1": "Yes! ¡Muy bien!",
  "buddy.correct2": "¡Lo lograste!",
  "buddy.correct3": "Great job!",
  "buddy.correct4": "¡Mis circuitos bailan de alegría!",
  "buddy.correctNamed": "Well done, {name}!",
  "buddy.wrong1": "¡Casi! Prueba otra.",
  "buddy.wrong2": "Equivocarse ayuda a aprender.",
  "buddy.wrong3": "Léelo otra vez. ¡Tú puedes!",
  "buddy.wrong4": "Mmm, pensemos juntos.",
  "buddy.pageDone": "¡Terminaste todo aquí! Hooray!",
  "buddy.pageDoneNamed": "{name}, ¡terminaste todo aquí! Hooray!",
  "buddy.nameSaved": "Nice to meet you, {name}!",
  "buddy.tip1": "Di la palabra en voz alta tres veces. ¡Ayuda mucho!",
  "buddy.tip2": "Enséñale a alguien de tu casa la palabra de hoy.",
  "buddy.tip3": "Toca 🔊 todas las veces que quieras. ¡No se gasta!",
  "buddy.tip4": "Equivocarse es parte de aprender. ¡Yo también me equivoco!",
  "buddy.tip5": "Respira hondo. Lo estás haciendo muy bien.",
  "buddy.tip6": "Los robots necesitan aceite y las niñas y los niños, agua. ¡Toma un poquito!",
  "buddy.tip7": "Busca algo rojo en tu casa. En inglés es red!",
  "buddy.tip8": "¡Me encanta aprender contigo!",
  "buddy.tip9": "Puedes moverme. ¡Arrástrame a donde quieras!",
  "buddy.tip10": "Canta una canción en inglés con tu familia.",
  "buddy.tip11": "Un poquito cada día es mejor que mucho un solo día.",
  "buddy.tip12": "Pega un papelito con una palabra en inglés en tu cuarto.",
  "buddy.joke1Q": "¿Qué le dijo un semáforo a otro?",
  "buddy.joke1A": "¡No me mires, que me estoy cambiando!",
  "buddy.joke2Q": "¿Por qué el libro de matemáticas estaba triste?",
  "buddy.joke2A": "¡Porque tenía muchos problemas!",
  "buddy.joke3Q": "¿Qué hace una abeja en el gimnasio?",
  "buddy.joke3A": "¡Zum-ba!",
  "buddy.joke4Q": "¿Qué le dijo el 1 al 10?",
  "buddy.joke4A": "¡Para ser como yo, tienes que ser sincero!",
  "buddy.joke5Q": "¿Cuál es el colmo de un jardinero?",
  "buddy.joke5A": "¡Que lo dejen plantado!",
  "buddy.joke6Q": "¿Qué le dijo la luna al sol?",
  "buddy.joke6A": "¡Tan grande y no te dejan salir de noche!",
  "buddy.riddle1Q": "Adivina: ¿cómo se dice «gato» en inglés?",
  "buddy.riddle1A": "Cat! 🐱",
  "buddy.riddle2Q": "Adivina: ¿cómo se dice «perro» en inglés?",
  "buddy.riddle2A": "Dog! 🐶",
  "buddy.riddle3Q": "Adivina: ¿cómo se dice «rojo» en inglés?",
  "buddy.riddle3A": "Red! 🔴",
  "buddy.riddle4Q": "Adivina: ¿cómo se dice «gracias» en inglés?",
  "buddy.riddle4A": "Thank you! 💛",
  "buddy.riddle5Q": "Adivina: ¿cómo se dice «tres» en inglés?",
  "buddy.riddle5A": "Three! 3️⃣",
  "buddy.riddle6Q": "Adivina: ¿cómo se dice «manzana» en inglés?",
  "buddy.riddle6A": "Apple! 🍎",
  "buddy.riddle7Q": "Adivina: ¿cómo se dice «hola» en inglés?",
  "buddy.riddle7A": "Hello! 👋",
  "buddy.riddle8Q": "Adivina: ¿cómo se dice «amigo» en inglés?",
  "buddy.riddle8A": "Friend! 🤝",
  "buddy.fact1": "En inglés, «I» (yo) siempre se escribe con mayúscula.",
  "buddy.fact2": "El inglés tiene 26 letras. ¡No tiene la «ñ»!",
  "buddy.fact3": "«Hello» y «hi» significan lo mismo. «Hi» es más relajado.",
  "buddy.fact4": "En inglés, los días empiezan con mayúscula: Monday, Tuesday…",
  "buddy.fact5": "«Animal», «chocolate» y «hotel» se escriben igual en inglés.",
  "buddy.fact6": "En inglés el color va primero: red apple es manzana roja.",
  "buddy.fact7": "«You» sirve para decir «tú» y también «ustedes».",
  "buddy.fact8": "La palabra que más se usa en inglés es «the».",
  "buddy.cheer1": "You are awesome! ¡Eres genial!",
  "buddy.cheer2": "Keep going! ¡Sigue así!",
  "buddy.cheer3": "¡Paso a paso se llega lejos!",
  "buddy.cheer4": "¡Qué bien lo haces!",
  "buddy.cheer5": "¡Estoy feliz de aprender contigo!",
  "buddy.cheer6": "Great job! ¡Muy bien hecho!",
  "buddy.sing": "La la la… I love English!",
  "buddy.stretch": "¡A estirarse! Up, up, up!",
  "buddy.scan": "Escaneando… ¡veo a alguien que aprende mucho!",
  "buddy.bottom": "¡Llegaste al final! The end!",
  "buddy.wake": "¡Uy! Me quedé dormido. Good morning!",
  "buddy.dragging": "¡Wiii! ¿A dónde vamos?",
  "buddy.dropped1": "¡Aquí me quedo!",
  "buddy.dropped2": "¡Buen lugar!",
  "buddy.dropped3": "Nice! ¡Me gusta aquí!",
  "buddy.shaking": "¡Ay, ay, ay! ¡Despacito!",
  "buddy.dizzy1": "Todo da vueltas…",
  "buddy.dizzy2": "¡Estoy mareado! Dizzy!",
  "buddy.dizzy3": "¡Uf! Veo estrellitas.",
  "buddy.poke1": "¡Jiji, cosquillas!",
  "buddy.poke2": "Hi! ¿Qué pasó?",
  "buddy.poke3": "¡Boop!",
  "buddy.pokeLots": "¡Jajaja! ¡Me rindo!",
});

Object.assign(translations.en, {
  "buddy.turnOn": "Show the little PyBot",
  "buddy.turnOff": "Hide the little PyBot",
  "buddy.hide": "Hide the little PyBot",
  "buddy.greetMorning": "Good morning",
  "buddy.greetAfternoon": "Good afternoon",
  "buddy.greetEvening": "Good evening",
  "buddy.greet": "{greet}! So nice to see you!",
  "buddy.greetNamed": "{greet}, {name}! So nice to see you!",
  "buddy.hover1": "Hi there!",
  "buddy.hover2": "Were you looking for me?",
  "buddy.hover3": "Hello, friend!",
  "buddy.correct1": "Yes! Well done!",
  "buddy.correct2": "You got it!",
  "buddy.correct3": "Great job!",
  "buddy.correct4": "My circuits are dancing!",
  "buddy.correctNamed": "Well done, {name}!",
  "buddy.wrong1": "Almost! Try another one.",
  "buddy.wrong2": "Mistakes help us learn.",
  "buddy.wrong3": "Read it again. You can do it!",
  "buddy.wrong4": "Hmm, let's think together.",
  "buddy.pageDone": "You finished everything here! Hooray!",
  "buddy.pageDoneNamed": "{name}, you finished everything here! Hooray!",
  "buddy.nameSaved": "Nice to meet you, {name}!",
  "buddy.tip1": "Say the word out loud three times. It really helps!",
  "buddy.tip2": "Teach today's word to someone at home.",
  "buddy.tip3": "Press 🔊 as many times as you like. It never runs out!",
  "buddy.tip4": "Mistakes are part of learning. I make them too!",
  "buddy.tip5": "Take a deep breath. You are doing great.",
  "buddy.tip6": "Robots need oil. Kids need water. Drink some!",
  "buddy.tip7": "Find something red at home. In English it's red!",
  "buddy.tip8": "I love learning with you!",
  "buddy.tip9": "You can move me! Drag me wherever you like.",
  "buddy.tip10": "Sing a song in English with your family.",
  "buddy.tip11": "A little every day beats a lot on one day.",
  "buddy.tip12": "Stick a note with an English word in your room.",
  "buddy.joke1Q": "Why did the teddy bear say no to dessert?",
  "buddy.joke1A": "It was already stuffed!",
  "buddy.joke2Q": "What do you call a sleeping dinosaur?",
  "buddy.joke2A": "A dino-snore!",
  "buddy.joke3Q": "Why are fish so smart?",
  "buddy.joke3A": "They live in schools!",
  "buddy.joke4Q": "What has ears but cannot hear?",
  "buddy.joke4A": "A cornfield!",
  "buddy.joke5Q": "What do you call a bear with no teeth?",
  "buddy.joke5A": "A gummy bear!",
  "buddy.joke6Q": "What did the ocean say to the beach?",
  "buddy.joke6A": "Nothing. It just waved!",
  "buddy.riddle1Q": "Guess: how do you say «gato» in English?",
  "buddy.riddle1A": "Cat! 🐱",
  "buddy.riddle2Q": "Guess: how do you say «perro» in English?",
  "buddy.riddle2A": "Dog! 🐶",
  "buddy.riddle3Q": "Guess: how do you say «rojo» in English?",
  "buddy.riddle3A": "Red! 🔴",
  "buddy.riddle4Q": "Guess: how do you say «gracias» in English?",
  "buddy.riddle4A": "Thank you! 💛",
  "buddy.riddle5Q": "Guess: how do you say «tres» in English?",
  "buddy.riddle5A": "Three! 3️⃣",
  "buddy.riddle6Q": "Guess: how do you say «manzana» in English?",
  "buddy.riddle6A": "Apple! 🍎",
  "buddy.riddle7Q": "Guess: how do you say «hola» in English?",
  "buddy.riddle7A": "Hello! 👋",
  "buddy.riddle8Q": "Guess: how do you say «amigo» in English?",
  "buddy.riddle8A": "Friend! 🤝",
  "buddy.fact1": "In English, “I” is always a capital letter.",
  "buddy.fact2": "English has 26 letters. There is no “ñ”!",
  "buddy.fact3": "“Hello” and “hi” mean the same. “Hi” is more relaxed.",
  "buddy.fact4": "In English, days start with a capital: Monday, Tuesday…",
  "buddy.fact5": "“Animal”, “chocolate” and “hotel” are spelled the same in Spanish.",
  "buddy.fact6": "In English the color comes first: a red apple.",
  "buddy.fact7": "“You” works for one person and for many people.",
  "buddy.fact8": "The most used word in English is “the”.",
  "buddy.cheer1": "You are awesome!",
  "buddy.cheer2": "Keep going!",
  "buddy.cheer3": "Step by step, you go far!",
  "buddy.cheer4": "You're doing so well!",
  "buddy.cheer5": "I'm happy to learn with you!",
  "buddy.cheer6": "Great job!",
  "buddy.sing": "La la la… I love English!",
  "buddy.stretch": "Stretch time! Up, up, up!",
  "buddy.scan": "Scanning… I see a great learner!",
  "buddy.bottom": "You reached the end! The end!",
  "buddy.wake": "Oops! I fell asleep. Good morning!",
  "buddy.dragging": "Wheee! Where are we going?",
  "buddy.dropped1": "I'll stay here!",
  "buddy.dropped2": "Nice spot!",
  "buddy.dropped3": "I like it here!",
  "buddy.shaking": "Whoa, whoa! Gently!",
  "buddy.dizzy1": "Everything is spinning…",
  "buddy.dizzy2": "I'm dizzy!",
  "buddy.dizzy3": "Phew! I see little stars.",
  "buddy.poke1": "Hee hee, that tickles!",
  "buddy.poke2": "Hi! What's up?",
  "buddy.poke3": "Boop!",
  "buddy.pokeLots": "Ha ha ha! I give up!",
});

const BUDDY_PREFERENCE_KEY = "pybotenglish.buddy.enabled";
const BUDDY_POSITION_KEY = "pybotenglish.buddy.position";
const BUDDY_GREETED_KEY = "pybotenglish.buddy.greeted";
const buddyScreenQuery = window.matchMedia("(min-width: 761px) and (min-height: 481px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const BUDDY_TIP_COUNT = 12;
const BUDDY_JOKE_COUNT = 6;
const BUDDY_RIDDLE_COUNT = 8;
const BUDDY_FACT_COUNT = 8;
const BUDDY_CHEER_COUNT = 6;
const BUDDY_MARGIN = 14;
// After this long without the learner moving or typing, PyBot takes a nap.
const BUDDY_NAP_AFTER_MS = 75_000;
// Idle antics: a mood, a body move, optional floating particles, and what PyBot may say.
const BUDDY_IDLE_ANTICS = [
  { mood: "happy", move: "wave" },
  { mood: "wink", move: "hop" },
  { mood: "curious", move: "look", tip: true },
  { mood: "counting", move: "", tip: true },
  { mood: "starry", move: "spin", particles: "✦" },
  { mood: "thinking", move: "", tip: true },
  { mood: "deciding", move: "look" },
  { mood: "welcoming", move: "wave", tip: true },
  { mood: "proud", move: "dance", particles: "♪", say: "buddy.sing" },
  { mood: "happy", move: "blink", tip: true },
  { mood: "surprised", move: "peek" },
  { mood: "happy", move: "stretch", say: "buddy.stretch" },
  { mood: "welcoming", move: "hop", particles: "♥" },
  { mood: "focused", move: "scan", say: "buddy.scan" },
  { mood: "celebrating", move: "flip" },
  { mood: "wink", move: "wiggle", tip: true },
  { mood: "wink", move: "hop", joke: true },
  { mood: "happy", move: "", joke: true },
  { mood: "thinking", move: "", riddle: true },
  { mood: "curious", move: "look", riddle: true },
  { mood: "curious", move: "look", fact: true },
  { mood: "starry", move: "", fact: true },
  { mood: "proud", move: "wave", cheer: true, particles: "♥" },
];
let buddyToggle = null;
let buddy = null;
let buddyEnabled = true;
let buddyIdleTimer = null;
let buddyRestTimer = null;
let buddyBubbleTimer = null;
let buddyBusyUntil = 0;
let buddyBubbleUntil = 0;
let buddyHovered = false;
let buddyAsleep = false;
let buddyLastInput = Date.now();
let buddyPosition = null;
let buddyLookFrame = 0;
let buddySpeechId = 0;
let buddyHoverAfter = 0;
let buddyPokes = [];
let buddySaidBottom = false;

// The spot is kept as fractions of the free space, so it survives resizing.
function storedBuddyPosition() {
  const [x, y] = (readStored(BUDDY_POSITION_KEY) ?? "").split(",").map(Number);
  return x >= 0 && x <= 1 && y >= 0 && y <= 1 ? { x, y } : { x: 1, y: 1 };
}

function buddyFreeSpace() {
  return {
    width: Math.max(0, window.innerWidth - buddy.offsetWidth - BUDDY_MARGIN * 2),
    height: Math.max(0, window.innerHeight - buddy.offsetHeight - BUDDY_MARGIN * 2),
  };
}

function placeBuddy(left, top) {
  const space = buddyFreeSpace();
  const x = Math.min(Math.max(left - BUDDY_MARGIN, 0), space.width);
  const y = Math.min(Math.max(top - BUDDY_MARGIN, 0), space.height);
  buddy.style.left = `${x + BUDDY_MARGIN}px`;
  buddy.style.top = `${y + BUDDY_MARGIN}px`;
  buddyPosition = { x: space.width ? x / space.width : 1, y: space.height ? y / space.height : 1 };
  // Keep the speech bubble on the screen.
  buddy.classList.toggle("bubble-right", x + BUDDY_MARGIN + buddy.offsetWidth / 2 < window.innerWidth / 2);
  buddy.classList.toggle("bubble-below", y + BUDDY_MARGIN < 150);
}

function restoreBuddyPosition() {
  if (!buddy || buddy.hidden) {
    return;
  }
  const space = buddyFreeSpace();
  const position = buddyPosition ?? storedBuddyPosition();
  placeBuddy(BUDDY_MARGIN + position.x * space.width, BUDDY_MARGIN + position.y * space.height);
}

function createBuddyToggle() {
  const nav = document.querySelector(".site-nav");
  if (!nav) {
    return null;
  }
  const button = document.createElement("button");
  button.className = "buddy-toggle";
  button.type = "button";
  button.innerHTML = '<span class="buddy-toggle-icon" aria-hidden="true"></span>';
  nav.insertBefore(button, nav.querySelector(".language-switch"));
  button.addEventListener("click", () => setBuddyEnabled(!buddyEnabled));
  return button;
}

function updateBuddyButton() {
  if (!buddyToggle) {
    return;
  }
  const label = textFor(buddyEnabled ? "buddy.turnOff" : "buddy.turnOn");
  buddyToggle.classList.toggle("is-on", buddyEnabled);
  buddyToggle.setAttribute("aria-pressed", String(buddyEnabled));
  buddyToggle.setAttribute("aria-label", label);
  buddyToggle.title = label;
  buddy?.querySelector(".buddy-hide")?.setAttribute("aria-label", textFor("buddy.hide"));
}

function createBuddy() {
  const element = document.createElement("div");
  element.className = "pybot-buddy";
  element.hidden = true;
  element.innerHTML = `
    <p class="buddy-bubble" aria-hidden="true"></p>
    <button class="buddy-hide" type="button">×</button>
    <div class="buddy-body" aria-hidden="true">
      <div class="pybot-wrap" data-mood="welcoming">
        <div class="pybot">
          <div class="antenna"><span></span></div>
          <div class="ear ear-left"></div>
          <div class="ear ear-right"></div>
          <div class="bot-head">
            <div class="bot-screen">
              <div class="brow brow-left"></div>
              <div class="brow brow-right"></div>
              <div class="eye eye-left"><span></span></div>
              <div class="eye eye-right"><span></span></div>
              <div class="cheek cheek-left"></div>
              <div class="cheek cheek-right"></div>
              <div class="mouth"></div>
            </div>
          </div>
          <div class="bot-neck"></div>
          <div class="arm arm-left"><span class="hand"></span></div>
          <div class="arm arm-right"><span class="hand"></span></div>
          <div class="bot-body">
            <div class="chest-light"></div>
            <span class="chest-code">Hi!</span>
          </div>
        </div>
      </div>
    </div>`;
  element.querySelector(".buddy-hide").addEventListener("click", () => {
    setBuddyEnabled(false);
    buddyToggle?.focus();
  });
  element.addEventListener("pointerenter", () => {
    buddyHovered = true;
    window.clearTimeout(buddyBubbleTimer);
    buddyHoverHello();
  });
  element.addEventListener("pointerleave", () => {
    buddyHovered = false;
    buddyHideBubbleLater(Math.max(1800, buddyBubbleUntil - Date.now()));
  });
  armBuddyDrag(element.querySelector(".buddy-body"));
  document.body.append(element);
  return element;
}

// Dragging moves PyBot; a tap without moving pokes it.
function armBuddyDrag(handle) {
  let drag = null;

  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }
    const box = buddy.getBoundingClientRect();
    drag = {
      id: event.pointerId, startX: event.clientX, startY: event.clientY, dx: event.clientX - box.left, dy: event.clientY - box.top,
      moved: false, lastX: event.clientX, lastY: event.clientY, dirX: 0, dirY: 0, turns: [], shook: false,
    };
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) {
      return;
    }
    if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 6) {
      return;
    }
    if (!drag.moved) {
      drag.moved = true;
      buddyWake(false);
      buddy.classList.add("is-dragging");
      buddyAct("surprised", "", textFor("buddy.dragging"), 60_000);
    }
    placeBuddy(event.clientX - drag.dx, event.clientY - drag.dy);
    noteBuddyShake(drag, event.clientX, event.clientY);
  });

  const end = (event) => {
    if (!drag || event.pointerId !== drag.id) {
      return;
    }
    const { moved, shook } = drag;
    drag = null;
    buddy.classList.remove("is-dragging", "is-shaking");
    if (moved) {
      writeStored(BUDDY_POSITION_KEY, `${buddyPosition.x.toFixed(3)},${buddyPosition.y.toFixed(3)}`);
      if (shook) {
        buddyAct("happy", "dizzy", buddyPick("buddy.dizzy", 3), 3800);
        buddyParticles("★", 5);
        return;
      }
      buddyAct("happy", "hop", buddyPick("buddy.dropped", 3), 2400);
    } else if (event.type === "pointerup") {
      buddyPoke();
    }
  };
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
}

// Quick back-and-forth while dragging counts as shaking, and makes PyBot dizzy.
function noteBuddyShake(drag, x, y) {
  const now = Date.now();
  [["X", x - drag.lastX], ["Y", y - drag.lastY]].forEach(([axis, delta]) => {
    if (Math.abs(delta) < 4) {
      return;
    }
    const direction = Math.sign(delta);
    if (drag[`dir${axis}`] && direction !== drag[`dir${axis}`]) {
      drag.turns.push(now);
    }
    drag[`dir${axis}`] = direction;
  });
  drag.lastX = x;
  drag.lastY = y;
  drag.turns = drag.turns.filter((time) => now - time < 1200);

  const shaking = drag.turns.length >= 5;
  buddy.classList.toggle("is-shaking", shaking);
  if (shaking && !drag.shook) {
    drag.shook = true;
    buddyShowBubble(textFor("buddy.shaking"));
  }
}

function buddyActive() {
  return Boolean(buddy) && buddyEnabled && buddyScreenQuery.matches && !document.hidden;
}

// Long messages stay longer, so there is time to read them.
function buddyReadingTime(text) {
  return Math.min(13_000, Math.max(4000, 1800 + text.length * 80));
}

function buddyHideBubbleLater(delay) {
  window.clearTimeout(buddyBubbleTimer);
  if (buddyHovered) {
    return;
  }
  buddyBubbleTimer = window.setTimeout(() => buddy?.querySelector(".buddy-bubble")?.classList.remove("is-visible"), delay);
}

function buddyShowBubble(text) {
  const bubble = buddy?.querySelector(".buddy-bubble");
  if (!bubble) {
    return;
  }
  const duration = buddyReadingTime(text);
  buddySpeechId += 1;
  bubble.textContent = text;
  bubble.classList.remove("is-visible");
  void bubble.offsetWidth;
  bubble.classList.add("is-visible");
  buddyBubbleUntil = Date.now() + duration;
  buddyHideBubbleLater(duration);
}

function buddyParticles(symbol, count = 5) {
  if (!buddy || reducedMotionQuery.matches) {
    return;
  }
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = "buddy-particle";
    particle.textContent = symbol;
    particle.style.setProperty("--particle-x", `${Math.round((Math.random() - 0.5) * 90)}px`);
    particle.style.setProperty("--particle-delay", `${index * 140}ms`);
    buddy.append(particle);
    window.setTimeout(() => particle.remove(), 1800 + index * 140);
  }
}

// Sets a mood and a move for a while, then PyBot goes back to resting.
function buddyAct(mood, move = "", text = "", duration = 2600) {
  if (!buddyActive()) {
    return;
  }
  const wrap = buddy.querySelector(".pybot-wrap");
  wrap.dataset.mood = mood;
  buddy.dataset.move = "";
  void buddy.offsetWidth;
  buddy.dataset.move = move;
  if (text) {
    buddyShowBubble(text);
  }
  // Wait until the learner had time to read before the next antic.
  buddyBusyUntil = Date.now() + Math.max(duration, text ? buddyReadingTime(text) : 0);
  window.clearTimeout(buddyRestTimer);
  buddyRestTimer = window.setTimeout(() => {
    wrap.dataset.mood = "happy";
    buddy.dataset.move = "";
  }, duration);
  scheduleBuddyIdle();
}

function buddyPick(prefix, count) {
  return fillName(textFor(`${prefix}${1 + Math.floor(Math.random() * count)}`));
}

function buddyPoke() {
  if (buddyAsleep) {
    buddyWake();
    return;
  }
  // Lots of quick pokes in a row: PyBot gives up, giggling.
  const now = Date.now();
  buddyPokes = buddyPokes.filter((time) => now - time < 4000).concat(now);
  if (buddyPokes.length >= 5) {
    buddyPokes = [];
    buddyAct("celebrating", "dance", textFor("buddy.pokeLots"), 3000);
    buddyParticles("♥", 6);
    return;
  }
  const roll = Math.random();
  if (roll < 0.3) {
    buddyAct("wink", "wiggle", buddyPick("buddy.poke", 3), 2200);
    buddyParticles("♥", 3);
  } else if (roll < 0.55) {
    buddyTellTwoPart("buddy.joke", BUDDY_JOKE_COUNT, "wink");
  } else if (roll < 0.8) {
    buddyTellTwoPart("buddy.riddle", BUDDY_RIDDLE_COUNT, "thinking");
  } else {
    buddyIdleAntic(true);
  }
}

// A joke or riddle: the question first, the answer once there was time to think.
function buddyTellTwoPart(prefix, count, mood) {
  const number = 1 + Math.floor(Math.random() * count);
  const question = textFor(`${prefix}${number}Q`);
  const wait = Math.max(3500, buddyReadingTime(question) - 500);
  buddyAct(mood, "", question, wait + 2000);
  const speech = buddySpeechId;
  window.setTimeout(() => {
    // Skip the answer when something else already took the bubble.
    if (speech !== buddySpeechId || !buddyActive() || buddyAsleep) {
      return;
    }
    buddyAct("celebrating", "hop", textFor(`${prefix}${number}A`), 3000);
    buddyParticles(prefix === "buddy.joke" ? "♪" : "✦", 4);
  }, wait);
}

function buddyHoverHello() {
  const now = Date.now();
  if (!buddyActive() || buddyAsleep || now < buddyBusyUntil || now < buddyHoverAfter || buddy.classList.contains("is-dragging")) {
    return;
  }
  buddyHoverAfter = now + 30_000;
  if (Math.random() < 0.6) {
    buddyAct("happy", "wave", buddyPick("buddy.hover", 3), 2000);
  }
}

function buddyGreeting() {
  const hour = new Date().getHours();
  const part = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
  const text = textFor(learnerName ? "buddy.greetNamed" : "buddy.greet");
  return fillName(text).replaceAll("{greet}", textFor(`buddy.greet${part}`));
}

// A small one-time reaction when the learner reaches the end of a long page.
function buddyNoticeScroll() {
  if (!buddyActive() || buddyAsleep || buddySaidBottom || Date.now() < buddyBusyUntil) {
    return;
  }
  const page = document.documentElement;
  if (page.scrollHeight > window.innerHeight * 1.5 && window.innerHeight + window.scrollY >= page.scrollHeight - 40) {
    buddySaidBottom = true;
    buddyAct("starry", "spin", textFor("buddy.bottom"), 2600);
    buddyParticles("✦", 5);
  }
}

function buddyIdleAntic(poked = false) {
  if (!buddyActive() || buddyAsleep || (!poked && Date.now() < buddyBusyUntil)) {
    scheduleBuddyIdle();
    return;
  }
  if (!poked && Date.now() - buddyLastInput > BUDDY_NAP_AFTER_MS) {
    buddySleep();
    return;
  }
  const antic = BUDDY_IDLE_ANTICS[Math.floor(Math.random() * BUDDY_IDLE_ANTICS.length)];
  if (antic.joke || antic.riddle) {
    buddyTellTwoPart(antic.joke ? "buddy.joke" : "buddy.riddle", antic.joke ? BUDDY_JOKE_COUNT : BUDDY_RIDDLE_COUNT, antic.mood);
    return;
  }
  let text = "";
  if (antic.say) {
    text = textFor(antic.say);
  } else if (antic.fact) {
    text = buddyPick("buddy.fact", BUDDY_FACT_COUNT);
  } else if (antic.cheer) {
    text = buddyPick("buddy.cheer", BUDDY_CHEER_COUNT);
  } else if (antic.tip && (poked || Math.random() < 0.6)) {
    text = buddyPick("buddy.tip", BUDDY_TIP_COUNT);
  }
  buddyAct(antic.mood, antic.move, text, 2400);
  if (antic.particles) {
    buddyParticles(antic.particles);
  }
}

function buddySleep() {
  buddyAsleep = true;
  buddy.querySelector(".pybot-wrap").dataset.mood = "happy";
  buddy.dataset.move = "sleep";
  buddy.querySelector(".buddy-bubble").classList.remove("is-visible");
  buddyParticles("z", 3);
  window.clearTimeout(buddyIdleTimer);
  // Little snores while napping.
  buddyIdleTimer = window.setInterval(() => buddyParticles("z", 3), 4000);
}

function buddyWake(greet = true) {
  if (!buddyAsleep) {
    return;
  }
  buddyAsleep = false;
  window.clearInterval(buddyIdleTimer);
  buddy.dataset.move = "";
  if (greet) {
    buddyAct("surprised", "hop", textFor("buddy.wake"), 2400);
  } else {
    scheduleBuddyIdle();
  }
}

function scheduleBuddyIdle() {
  if (buddyAsleep) {
    return;
  }
  window.clearTimeout(buddyIdleTimer);
  if (!buddyActive()) {
    return;
  }
  // Calmer when the learner prefers less motion.
  const delay = (reducedMotionQuery.matches ? 22000 : 9000) + Math.random() * 8000;
  buddyIdleTimer = window.setTimeout(buddyIdleAntic, delay);
}

// PyBot's eyes follow the pointer.
function buddyLookAt(clientX, clientY) {
  if (!buddyActive() || buddy.hidden || buddyLookFrame) {
    return;
  }
  buddyLookFrame = window.requestAnimationFrame(() => {
    buddyLookFrame = 0;
    const box = buddy.querySelector(".buddy-body").getBoundingClientRect();
    const dx = clientX - (box.left + box.width / 2);
    const dy = clientY - (box.top + box.height * 0.3);
    const distance = Math.hypot(dx, dy) || 1;
    const reach = Math.min(1, distance / 160);
    buddy.style.setProperty("--look-x", `${((dx / distance) * 11 * reach).toFixed(1)}px`);
    buddy.style.setProperty("--look-y", `${((dy / distance) * 8 * reach).toFixed(1)}px`);
  });
}

function noteBuddyInput(event) {
  buddyLastInput = Date.now();
  // A tap on PyBot itself wakes it through the poke.
  if (buddyAsleep && buddyActive() && !buddy.contains(event.target)) {
    buddyWake();
  }
}

// Called from the places that already tell the learner how they did.
// `pageDone` is true when the last activity of a lesson page was just finished.
function buddyReact(event, { pageDone = false } = {}) {
  if (!buddyActive()) {
    return;
  }
  buddyWake(false);

  if (event === "correct") {
    if (pageDone) {
      buddyAct("celebrating", "dance", fillName(textFor(learnerName ? "buddy.pageDoneNamed" : "buddy.pageDone")), 4200);
      buddyParticles("✦", 8);
      return;
    }
    const roll = Math.random();
    let text = buddyPick("buddy.correct", 4);
    if (learnerName && roll < 0.25) {
      text = fillName(textFor("buddy.correctNamed"));
    } else if (roll > 0.8) {
      text = buddyPick("buddy.cheer", BUDDY_CHEER_COUNT);
    }
    const mood = ["celebrating", "starry", "proud"][Math.floor(Math.random() * 3)];
    buddyAct(mood, "hop", text, 3000);
    buddyParticles("✦", 4);
  } else if (event === "wrong") {
    buddyAct("encouraging", "nod", buddyPick("buddy.wrong", 4), 3000);
  } else if (event === "nameSaved") {
    buddyAct("welcoming", "wave", fillName(textFor("buddy.nameSaved")), 3200);
    buddyParticles("♥", 4);
  } else if (event === "kindPhrase") {
    // The big PyBot answers; the little one just smiles along.
    buddyAct("wink", "hop", "", 1800);
    buddyParticles("♥", 3);
  }
}

function syncBuddy() {
  if (!buddy) {
    return;
  }
  const visible = buddyEnabled && buddyScreenQuery.matches;
  buddy.hidden = !visible;
  if (!visible || document.hidden) {
    window.clearTimeout(buddyIdleTimer);
    window.clearInterval(buddyIdleTimer);
    window.clearTimeout(buddyRestTimer);
    buddyAsleep = false;
    return;
  }
  restoreBuddyPosition();
  scheduleBuddyIdle();
}

function setBuddyEnabled(enabled) {
  buddyEnabled = enabled;
  writeStored(BUDDY_PREFERENCE_KEY, String(enabled));
  updateBuddyButton();
  syncBuddy();
  if (enabled) {
    buddyAct("welcoming", "wave", buddyGreeting(), 2800);
  }
}

function startBuddy() {
  buddyEnabled = readStored(BUDDY_PREFERENCE_KEY) !== "false";
  buddyToggle = createBuddyToggle();
  buddy = createBuddy();
  updateBuddyButton();
  syncBuddy();
  buddyScreenQuery.addEventListener("change", syncBuddy);
  document.addEventListener("visibilitychange", syncBuddy);
  window.addEventListener("resize", restoreBuddyPosition);
  document.addEventListener("pointermove", (event) => {
    noteBuddyInput(event);
    buddyLookAt(event.clientX, event.clientY);
  }, { passive: true });
  ["keydown", "scroll", "pointerdown"].forEach((type) => document.addEventListener(type, noteBuddyInput, { passive: true }));
  document.addEventListener("scroll", buddyNoticeScroll, { passive: true });
  languageRenderers.push(updateBuddyButton);
  // Say hello once per visit, not on every page.
  let greeted = false;
  try {
    greeted = sessionStorage.getItem(BUDDY_GREETED_KEY) === "true";
    sessionStorage.setItem(BUDDY_GREETED_KEY, "true");
  } catch {
    // Without storage PyBot greets on every page.
  }
  if (!greeted) {
    window.setTimeout(() => buddyAct("welcoming", "wave", buddyGreeting(), 3000), 900);
  }
}

// ---------- Shared header ----------
// Same strategy as PyBot: page links on the left, compact controls on the right,
// and below 900px the links move into a menu so the header stays one row.
// To add a page to the menu, add one line here; no HTML page needs editing.
const PATREON_URL = "https://www.patreon.com/pybot";
const headerPages = [
  { page: "course", href: "course.html", icon: "🗺️", label: "nav.path" },
  { page: "album", href: "album.html", icon: "★", label: "nav.album" },
  { page: "translator", href: "translator.html", icon: "Aa", label: "nav.translator" },
  { page: "faq", href: "faq.html", icon: "?", label: "nav.faq" },
];

function arrangeHeader() {
  const header = document.querySelector(".site-header");
  const tools = header?.querySelector(".site-nav");
  if (!tools) {
    return;
  }

  const links = document.createElement("nav");
  links.className = "header-links";
  links.id = "header-links";
  links.dataset.i18nAriaLabel = "a11y.mainNav";
  headerPages.forEach(({ page, href, icon, label }) => {
    const link = document.createElement("a");
    link.className = `header-link header-link-${page}`;
    link.href = new URL(href, scriptBaseUrl).href;
    if (document.body.dataset.page === page) {
      link.setAttribute("aria-current", "page");
    }
    link.innerHTML = `<span class="header-link-icon" aria-hidden="true"></span><span class="header-link-label" data-i18n="${label}"></span>`;
    link.querySelector(".header-link-icon").textContent = icon;
    links.append(link);
  });

  // Donations go to PyBot's Patreon, shared by the whole PyBot family.
  const support = document.createElement("a");
  support.className = "header-icon-button support-link";
  support.href = PATREON_URL;
  support.target = "_blank";
  support.rel = "noopener noreferrer";
  support.dataset.i18nAriaLabel = "support.aria";
  support.innerHTML = '<span class="support-link-icon" aria-hidden="true">♥</span>';
  languageRenderers.push(() => {
    support.title = textFor("support.aria");
  });

  const menuButton = document.createElement("button");
  menuButton.className = "header-icon-button header-menu-button";
  menuButton.type = "button";
  menuButton.dataset.i18nAriaLabel = "nav.menu";
  menuButton.setAttribute("aria-controls", links.id);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = '<span class="header-menu-icon" aria-hidden="true"></span>';

  const actions = document.createElement("div");
  actions.className = "header-actions";
  actions.append(...[support, buddyToggle, tools.querySelector(".language-switch"), menuButton].filter(Boolean));
  buddyToggle?.classList.add("header-icon-button");
  tools.replaceWith(links, actions);

  const setMenuOpen = (open) => {
    header.classList.toggle("is-menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  };
  menuButton.addEventListener("click", () => setMenuOpen(!header.classList.contains("is-menu-open")));
  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !header.contains(event.target)) {
      setMenuOpen(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
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
  startBuddy();
  arrangeHeader();
  languageRenderers.push(renderStreak, renderPathMap, renderFamily);
  setLanguage(currentLanguage, false);
  checkRewards();
});
