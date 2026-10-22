Hola. Soy Sorey Garcia (GitHub: soreygarcia). Háblame en español. Quiero crear el tercer proyecto de la familia **PyBot**: un sitio para que niñas y niños aprendan a programar con bloques usando **Scratch**. En esta sesión solo quiero llegar **hasta el plan**: el sitio con su índice, el camino, los extras y un plan de contenido documentado. **No escribas lecciones.** Tengo un presupuesto de nube limitado, así que trabaja de forma económica (lee la sección "Cómo trabajar").

---

## 1. La familia PyBot (contexto)

- **PyBot (Python)** — el original y la referencia de estrategia: `https://github.com/pybot-kids/pybot-kids.github.io` (público, sitio en `https://pybot-kids.github.io/`). Sitio estático en HTML/CSS/JS puro, sin compilación, bilingüe EN/ES, progreso local en el navegador, mascota PyBot hecha con HTML y CSS, zonas con rutas de páginas, álbum de stickers, rachas, diplomas, preguntas frecuentes, un PyBot pequeño acompañante, una cabecera con menú, créditos a Pyodide y botón ♥ a Patreon.
- **PyBot English** — el hermano que hicimos en otra sesión, con la misma estrategia, para aprender inglés. Si existe el repositorio `pybot-kids/pybot-english` o `soreygarcia/pybot-english`, **úsalo como plantilla principal** (clónalo y adáptalo: es mucho más barato que reconstruir). Si no puedes acceder, reconstruye a partir de PyBot (Python) siguiendo las especificaciones de este prompt.
- **Este proyecto (nombre por decidir)** — programación con bloques en Scratch, para niñas y niños de **8 a 10 años** (útil hasta ~12), hispanohablantes. Bilingüe EN/ES con **español por defecto** (como PyBot English).

## 2. Nombre y marcas (importante)

- "PyBot" es nuestra marca y se mantiene.
- **"Scratch" es marca registrada** (Scratch Foundation / MIT). Lo que encontré: sin licencia no se puede usar para nombrar, promover ni respaldar un producto o servicio, y el gato de Scratch y sus personajes también están protegidos. **Verifica los términos actuales** (Terms of Use de scratch.mit.edu y el archivo TRADEMARK del repositorio oficial `scratch-gui`) antes de decidir.
- Por eso el nombre del producto **no debe incluir "Scratch"**. Propónme de 4 a 5 opciones (por ejemplo **PyBot Blocks**, PyBot Bloques, PyBot Builds…) y usa **"PyBot Blocks"** como nombre provisional mientras decido. Dentro del sitio se puede decir "aprende a programar con Scratch" solo como referencia a la herramienta, con una nota visible: *"Scratch es un proyecto de la Scratch Foundation. PyBot Blocks no está afiliado ni respaldado por ella."* No uses el logo, el gato ni personajes de Scratch.

## 3. Identidad visual

- **Paleta verde y azul**, que no se sienta ni "de niñas" ni "de niños". Propón tokens (tinta oscura para texto y contornos, verde, verde oscuro, azul, azul oscuro, cielo suave, amarillo sol para detalles, fondo claro y blanco) y **verifica el contraste AA** de cada combinación de texto con un script.
- **Mascota: el mismo PyBot** (misma anatomía HTML/CSS y los mismos estados de ánimo del original), con la paleta nueva. En PyBot English, después de iterar, la usuaria eligió: **cabeza y brazos de un color, cuerpo de otro, y las bolitas de las manos amarillas** (también orejas, cuello y la luz de la antena). Propón aquí cabeza y brazos verdes, cuerpo azul y manos amarillas, y **muéstrame una captura antes de seguir**.
- El logo de la cabecera y el favicon son la cabeza de PyBot con el color de la cabeza.
- Tipografía: la misma pila del sistema que PyBot (Trebuchet MS, Avenir Next, Segoe UI). Sin fuentes externas.
- Comportamiento de PyBot: **dulce, amable y animador**. Al tocarlo cambia de expresión y dice frases cortas y cálidas.

## 4. Qué debe tener el sitio (paridad con PyBot English)

Construye en `/home/user/<carpeta-del-proyecto>`, en archivos separados como en PyBot: `index.html`, `course.html`, `album.html`, `diploma.html`, `faq.html`, una página de herramienta (ver punto 6), `styles.css`, `script.js` (compartido) y `extras.js` (álbum, diploma, preguntas y herramienta).

1. **Inicio (`index.html`)**
   - Hero con PyBot grande, que cambia de ánimo al tocarlo.
   - Tarjeta "¿Cómo te gustaría que te llamara?" (nombre o apodo, guardado solo en el navegador).
   - Ciclo de aprendizaje en 3 pasos adaptado a Scratch (por ejemplo *Mira → Prueba → Crea*).
   - "Tu primera misión" interactiva y sencilla **sin evaluar creaciones**; por ejemplo, ordenar 3 bloques para que un personaje camine, con bloques dibujados en HTML/CSS o con una librería con licencia compatible.
   - Sección **"Prueba sin pantalla"**: actividades desconectadas para hacer con mamá, papá, hermanos y amigos.
   - Franja "Más para ti" (álbum, herramienta, preguntas).
   - Tarjeta "Tu trabajo es tuyo", con guardar y cargar una copia de seguridad, la versión del progreso y "Para adultos: borrar todo el progreso" con confirmación en la propia página (nada de `confirm()`).
   - Pie de página con © 2026 Sorey Garcia, código MIT y contenido CC BY 4.0, y "De la familia de PyBot".
2. **El camino (`course.html`)**: **pocas zonas amplias**, cada una con **su ruta de páginas adentro** como en PyBot. Regla de crecimiento: un tema nuevo entra como página dentro de su zona, y solo se crea una zona nueva si ningún tema existente la cubre. Todas las páginas van marcadas `soon: true` ("Muy pronto") porque aún no hay lecciones. Agrega una parada final (🏁) con autoevaluación y diploma. Una propuesta para que la ajustes:
   - 00 *Hola, Scratch*: qué es, el escenario, los objetos.
   - 01 *Mover y mirar*: movimiento y apariencia.
   - 02 *Cuando pase algo*: eventos, bandera, teclas, clics.
   - 03 *Repetir*: bucles.
   - 04 *Decidir*: condicionales y sensores.
   - 05 *Recordar*: variables y puntaje.
   - 06 *Sonido y música*.
   - 07 *Contar historias*: diálogos y mensajes.
   - 08 *Mis juegos*: proyectos guiados.
   - 🏁 Parada.
3. **Álbum (`album.html`)**: stickers comunes (primer paso, 3 días seguidos, una semana, 10 días, uno por zona y trofeo final) y racha de días **que nunca castiga** cuando se falta un día.
4. **Diploma (`diploma.html`)**: `?zone=<id del primer paso>` muestra el diploma de una zona terminada, y `?sample=1` muestra un ejemplo marcado; botón para imprimir.
5. **Preguntas frecuentes (`faq.html`)**: para aprendices y para adultos. Incluye: qué es, cuenta (no hay), por dónde empezar, errores (son pistas), idioma, álbum, rachas, esconder al PyBot pequeño, por qué existe, la familia PyBot, dónde se guarda el progreso, si se puede perder, cambiar de navegador, copias viejas, qué datos se recogen (ninguno), por qué pide un nombre, empezar de cero, dispositivos, si es gratis, **cómo apoyar (Patreon)**, ayuda o soporte, licencia y **"¿Qué herramientas de otros usa?" con `id="credits"`**.
6. **Página de herramienta** (el equivalente al "Traductor" de PyBot English). **Antes de construirla, propónme 2 opciones.** Por ejemplo: un visor que dibuja bloques a partir de texto con la librería `scratchblocks` (MIT, de Tim Radvan), o una guía para abrir y compartir proyectos en Scratch con enlaces.
7. **PyBot pequeño acompañante** (igual que en PyBot):
   - En la esquina; se arrastra y recuerda su lugar; sus ojos siguen el puntero.
   - Duerme si nadie lo toca y se marea si lo sacuden.
   - Saluda una vez por visita según la hora.
   - Se esconde con un botón de la cabecera o con su ×, y no aparece en celulares.
   - **Lo que dice: chistes infantiles** (escritos por separado en ES y EN para que el chiste funcione), adivinanzas sencillas, curiosidades, consejos para practicar sin pantalla y ánimos. Nada de humor técnico difícil; si hay un chiste de programación, que lo entienda un niño de 8 años.
8. **Cabecera compartida (estrategia de PyBot)**:
   - `arrangeHeader()` la arma en todas las páginas a partir de una sola lista `headerPages`.
   - Enlaces con ícono y nombre a la izquierda, con la página actual resaltada.
   - A la derecha, botones compactos: **♥ a `https://www.patreon.com/pybot`** (el mismo Patreon de toda la familia, en pestaña nueva), PyBot pequeño, EN/ES y menú ☰.
   - Por debajo de 900 px los enlaces pasan al menú ☰, para que la cabecera siempre ocupe una fila.
9. **Progreso con el mismo esquema que PyBot**, con **prefijo propio** (por ejemplo `pybotblocks.`) para no mezclarse con los otros sitios en el mismo dominio:
   - Claves: `language`, `buddy.enabled`, `buddy.position`, `buddy.greeted` (en sessionStorage), `learner.name`, `path.current`, `path.visited`, `path.done`, `path.known`, `selfcheck`, `badges`, `days`, `activity.<id>` y `progress.version`.
   - Copia de seguridad en JSON con `format` propio, `schemaVersion: 1` y `progressVersion`, validación completa y límite de 100 KB.
   - Migraciones, `tools/progress-version.mjs`, `progress-versions.json` con la versión 1 de base, y el workflow `.github/workflows/progress-version.yml` (cópialos de PyBot).
   - Registro de claves documentado en el README.
10. **Créditos de todo componente externo**: un archivo `THIRD_PARTY_NOTICES.md`, un bloque "♥ Gracias a…" junto a donde se usa cada componente y la respuesta en las preguntas frecuentes. Antes de usar algo externo, investiga y **verifica su licencia o términos**; solo se usa si es compatible. Candidatos a verificar: `scratchblocks` (MIT); `scratch-blocks` (fork de Blockly, Apache 2.0); incrustar proyectos públicos de Scratch con su iframe oficial (revisa los términos; los proyectos compartidos son CC BY-SA); `scratch-gui` y `scratch-vm`; TurboWarp (GPL, ojo con la compatibilidad). Nunca des a entender afiliación.
11. **Licencias**: `LICENSE` (MIT, © 2026 Sorey Garcia) y `LICENSE-CONTENT.md` (CC BY 4.0, con línea de crédito).
12. **Privacidad y seguridad**: sin cuentas, sin analítica, sin micrófono ni cámara, y nada de lo que el niño escribe se guarda salvo el nombre que él elige. Las actividades revisan comprensión de conceptos; **las creaciones se celebran, nunca se califican**.
13. **README** en inglés, con la estructura del de PyBot: visión, motivación, principios, audiencia, modelo de páginas, mascota, guía visual con tabla de colores, arquitectura, registro de almacenamiento, copia de seguridad, versiones, créditos, cabecera, recompensas, índice del camino, estructura, cómo ejecutarlo y estado.
14. **`CONTENT_PLAN.md`** (en español, largo y robusto; **solo el plan, no el contenido**), con las mismas secciones que el plan de PyBot English:
    1. propósito y alcance;
    2. principios pedagógicos;
    3. anatomía de una página de lección y catálogo de tipos de actividad (por ejemplo: ordenar bloques, ¿qué hace este programa?, encuentra el bloque que falta, arregla el programa de PyBot, predice antes de ejecutar, empareja bloque ↔ resultado);
    4. IDs y versiones de progreso;
    5. plan zona por zona y página por página (objetivo, conceptos, bloques, actividades, actividad sin pantalla);
    6. crecimiento futuro;
    7. páginas de apoyo (Mis bloques o glosario, guía para familias, Conoce a PyBot);
    8. recursos y créditos;
    9. fases con criterios de "listo" y checklist por página;
    10. pruebas con niños (observar, sin recoger datos).

## 5. Lecciones aprendidas (no las repitas)

- Agrega `[hidden] { display: none !important; }` en el CSS: si no, los botones con `display` propio ignoran `hidden`.
- Las zonas deben ser **amplias desde el principio**; temas muy pequeños hacen crecer el mapa sin control.
- La cabecera debe armarse desde una sola lista desde el principio; en PyBot (Python) creció tanto que se veía mal en el celular.
- Los textos del PyBot pequeño deben ser **infantiles** desde el principio, no adaptados de PyBot (Python).
- Los créditos se agregan **al mismo tiempo** que el componente, no después.
- En la página de herramienta, cualquier API del navegador puede no existir o quedarse colgada: pon tiempos límite y una alternativa.
- El PyBot pequeño flota, así que en Playwright los clics sobre él necesitan `{ force: true }`.

## 6. Entorno y entrega

- **No puedes crear repositorios** desde la sesión (la API solo permite repos ya conectados). Construye local, haz `git init -b main` y commits pequeños con atribución. Al final pídeme crear un **repositorio vacío** (sugiere el nombre) y conéctalo con `add_repo` (acceso `push`) para subirlo.
- **Vista previa:** publícala como Artifact desde una copia en el scratchpad (título de 2 a 4 palabras, sin guiones explicativos, y el resto de archivos con `files`). Avísame que en la vista previa no funcionan imprimir ni el micrófono, y que el PyBot pequeño solo aparece en ventanas anchas.
- **Pruebas:** Playwright está instalado globalmente (`require(\`${npm root -g}/playwright\`)`). Prueba todas las páginas a 1280 px y a 390 px: sin errores de consola, sin desplazamiento horizontal y con la cabecera en una sola fila. Mira una captura por cambio importante, no más.
- Desde el contenedor, el proxy bloquea descargas de Hugging Face y jsDelivr con curl; `npm view` y `npm pack` sí funcionan para revisar licencias de paquetes.

## 7. Cómo trabajar (presupuesto limitado)

- Sin subagentes ni workflows. Reutiliza código (de PyBot English si existe) en vez de reescribir.
- Ediciones pequeñas en vez de reescribir archivos completos. Una sola verificación visual por cambio.
- Al empezar, pregúntame solo lo indispensable, en un solo mensaje: el nombre (con tus opciones) y la confirmación de la paleta y la mascota (con captura). Si no respondo, sigue con los valores por defecto de este prompt.
- Cierra con: ruta de la carpeta, enlace de la vista previa, lista de commits, lo que quedó pendiente y el paso para crear el repositorio.
