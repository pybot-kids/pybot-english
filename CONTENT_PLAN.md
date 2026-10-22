# Plan de contenido — PyBot English

> Este documento es **el plan**, no el contenido. Dice qué se va a enseñar, en qué orden, con qué tipo de actividades y cómo saber que una página está lista. Las lecciones se escriben después, una zona a la vez, siguiendo este plan y las reglas del [README](README.md).

## 1. Propósito y alcance

- **Para quién:** niñas y niños de 8 a 10 años (útil hasta ~12) que hablan español y empiezan inglés **desde cero**. Nació para que María Ángel pueda ayudar a sus amigas y amigos.
- **Hasta dónde:** el camino actual cubre aproximadamente el nivel **Pre-A1 → A1** del Marco Común Europeo (MCER). Como referencia de vocabulario y temas se puede consultar la lista pública de *Cambridge English: Pre A1 Starters*, sin copiar sus materiales.
- **Qué NO es:** no es un curso de conversación ni evalúa la pronunciación. PyBot enseña **cómo suenan** las cosas; hablar se practica en casa con la familia y con amigas y amigos.
- **Resultado esperado al final del camino:** el niño saluda y se presenta, deletrea su nombre, cuenta hasta 20, describe cosas por color, forma y tamaño, habla de su familia, su cuerpo, sus gustos y su día, y hace y entiende preguntas simples con *what, who, where, how many*.

## 2. Principios pedagógicos (resumen operativo)

1. **Una idea por página.** Cada página enseña un solo objetivo.
2. **Pocas palabras nuevas:** de 5 a 8 por página, máximo 10. Se reciclan siempre las de páginas anteriores.
3. **Frases antes que reglas.** La gramática entra como bloques que se usan (*I like…*, *It is…*), y la regla se nombra después, en una línea.
4. **Mira → Escucha → Dila → Revisa → Practica en casa.** Ese orden se repite en todas las páginas.
5. **Las actividades revisan solo lectura, vocabulario, comprensión auditiva y gramática.** Nunca el habla.
6. **Spanglish de PyBot:** PyBot habla en español con 1 o 2 palabras en inglés por frase. Solo usa palabras que el niño ya vio o acaba de aprender, y la información importante nunca va solo en inglés. A medida que avanza el camino, el inglés de PyBot aumenta poco a poco.
7. **Errores amables:** una pista corta por intento, nunca una nota. Los botones 🔊 se pueden tocar sin límite.
8. **Paridad bilingüe:** toda la ayuda existe en ES y EN. El inglés que se aprende nunca se traduce "por encima": su significado aparece al lado.

## 3. Anatomía de una página de lección

Cada página sigue este orden. Es la plantilla de `lessons/_template.html` cuando exista.

| # | Sección | Qué contiene |
|---|---|---|
| 1 | **Pregunta de la página** | Título corto en español con la palabra o frase en inglés destacada. PyBot con su expresión. |
| 2 | **Mira** | 1 a 3 tarjetas con dibujo (emoji o ilustración CSS) + palabra en inglés + significado. |
| 3 | **Escucha** | Botón 🔊 en cada palabra y frase, con versión lenta 🐢 disponible. |
| 4 | **Dila** | "Dila en voz alta 3 veces". No se graba ni se evalúa. |
| 5 | **Cómo se usa** | Una o dos frases modelo con el bloque gramatical (por ejemplo *It is red.*), con la regla en una sola línea. |
| 6 | **Revisa** | Mínimo **6 actividades** (ver catálogo), con contador hecho / sin intentar / repasar y botón de reiniciar la página. |
| 7 | **Palabras nuevas** | Lista de las palabras de la página con 🔊. Alimenta "Mis palabras". |
| 8 | **Practica en casa** | Una tarjeta: un juego de menos de 5 minutos con las palabras de la página, más una línea para el adulto. |
| 9 | **Siguiente** | Un botón principal hacia la siguiente página. Atrás y Siguiente siempre en el mismo lugar. |

### Catálogo de tipos de actividad

Todas funcionan con toque o clic, sin teclado obligatorio.

| Tipo | Descripción | Revisa |
|---|---|---|
| `picture-word` | Ver un dibujo y elegir la palabra correcta | Vocabulario |
| `listen-pick` | Escuchar 🔊 y elegir el dibujo correcto | Comprensión auditiva |
| `read-pick` | Leer una frase y elegir el dibujo que la representa | Lectura |
| `gap-fill` | Completar una frase con un banco de palabras | Gramática |
| `word-order` | Ordenar fichas para armar una frase (*I / like / apples*) | Orden de palabras |
| `odd-one-out` | Elegir la palabra que no pertenece al grupo | Categorías |
| `true-false` | Una imagen y una frase: ¿verdadero o falso? | Lectura |
| `memory-pairs` | Parejas palabra ↔ dibujo (o inglés ↔ español) | Vocabulario |
| `letter-tiles` | Deletrear tocando letras en orden | Ortografía |
| `which-sounds` | Escuchar dos palabras parecidas y elegir cuál sonó (*ship/sheep*) | Discriminación auditiva |
| `fix-pybot` | PyBot escribió una frase con un error; elegir la corrección | Gramática (equivale a "Arregla el código de PyBot") |

**Reglas de rigor** (adaptadas de PyBot):

- Cada zona incluye al menos un `fix-pybot` y un `listen-pick`.
- Cada página termina con una variación que comprueba la transferencia: la misma idea con palabras recicladas.
- Ningún distractor puede ser "trampa" por ortografía rara. Los distractores son palabras reales y ya vistas.
- Las respuestas correctas explican el porqué en una línea.

### IDs, progreso y versiones

- IDs de actividad: `<pageId>-<slug>`, en minúsculas con guiones. Ejemplos: `colors-red`, `iLike-order`.
- Cada actividad nueva se agrega a la lista `activities` de su paso en `pathSteps` y al registro del README.
- Cada PR que agrega, renombra o quita IDs ejecuta `node tools/progress-version.mjs --bump "nota"`.
- Al publicar una página se quita `soon: true` de su paso.

## 4. Plan por zona y página

Formato de cada página: **objetivo · vocabulario · estructura · actividades sugeridas · práctica en casa**.

### Zona 00 — Hello! (antes de empezar) · sticker 👋

| Página | Plan |
|---|---|
| 00 `helloGoodbye` · Hola y adiós | **Obj:** saludar y despedirse. **Vocab:** hello, hi, goodbye, bye, see you, good morning, good afternoon, good night. **Estructura:** *Hello! / Goodbye!* **Act:** listen-pick (saludo según la hora: sol, tarde, luna), picture-word, memory-pairs, which-sounds (*hi / bye*), true-false, fix-pybot ("Good night" a las 8 a. m.). **Casa:** saludar a cada persona de la casa en inglés al llegar. |
| 00b `howAreYou` · How are you? | **Obj:** preguntar y responder cómo estás. **Vocab:** how are you?, I'm fine, I'm good, I'm OK, thank you, and you?, please. **Estructura:** *How are you? — I'm fine, thank you.* **Act:** word-order, gap-fill, listen-pick (caritas), read-pick, odd-one-out, fix-pybot. **Casa:** preguntarle *How are you?* a alguien y enseñarle a responder. |
| 00c `lookListenSay` · Mira, escucha, dila | **Obj:** aprender a usar el sitio: 🔊, 🐢, actividades, álbum, practicar en casa. **Vocab:** look, listen, say, repeat, yes, no. **Act:** recorrido guiado con mini actividades de cada tipo del catálogo, sin calificar. **Casa:** jugar "PyBot dice" (*Look! Listen! Say!*). |

### Zona 01 — Letters & Numbers · sticker 🔤

| Página | Plan |
|---|---|
| 01 `abcLetters` · Las letras | **Obj:** reconocer el nombre de las 26 letras. **Vocab:** A–Z (nombre de la letra), letter, alphabet. **Act:** listen-pick (letra), letter-tiles (ordenar A-B-C), which-sounds (letras que confunden a hispanohablantes: *E/I, G/J, A/E*), memory-pairs, odd-one-out, fix-pybot. **Casa:** canción del abecedario con la familia. |
| 01b `abcVowels` · Vocales | **Obj:** notar que las vocales suenan distinto que en español. **Vocab:** apple, egg, igloo, orange, umbrella (palabra ejemplo por vocal). **Act:** listen-pick, which-sounds, picture-word, gap-fill (letra que falta), true-false, fix-pybot. **Casa:** buscar en casa algo que empiece con cada vocal. |
| 01c `abcSpell` · Deletrea tu nombre | **Obj:** deletrear y preguntar cómo se deletrea. **Vocab:** spell, name, How do you spell…? **Estructura:** *How do you spell "cat"? — C-A-T.* **Act:** letter-tiles (cat, dog, sun), listen-pick (deletreo → palabra), word-order, read-pick, gap-fill, fix-pybot. **Casa:** deletrear el nombre de cada persona de la casa. |
| 01d `numbersTen` · Del 1 al 10 | **Obj:** contar del 0 al 10. **Vocab:** zero–ten, number. **Act:** listen-pick (número), picture-word (contar objetos), memory-pairs, odd-one-out, gap-fill (secuencias), fix-pybot. **Casa:** contar escalones o juguetes en inglés. |
| 01e `numbersTwenty` · Del 11 al 20 | **Obj:** contar del 11 al 20. **Vocab:** eleven–twenty. **Act:** which-sounds (*thirteen/thirty* como pista para más adelante), listen-pick, letter-tiles, gap-fill, true-false, fix-pybot. **Casa:** jugar al escondite contando hasta 20 en inglés. |
| 01f `numbersHowMany` · How many? | **Obj:** preguntar y responder cuántos hay, con plurales regulares. **Vocab:** how many?, plurales con -s (apples, cats). **Estructura:** *How many cats? — Three cats.* **Act:** read-pick, gap-fill (-s), word-order, listen-pick, true-false, fix-pybot ("three cat"). **Casa:** preguntar *How many…?* sobre cosas de la mesa. |

### Zona 02 — All About Me · sticker 🙂

| Página | Plan |
|---|---|
| 02 `myName` · My name is… | **Obj:** presentarse. **Vocab:** my name is…, I'm…, what's your name?, nice to meet you. **Act:** word-order, gap-fill, listen-pick, read-pick, odd-one-out, fix-pybot. **Casa:** presentar a un peluche en inglés. |
| 02b `myAge` · I am 9. | **Obj:** decir la edad. **Vocab:** how old are you?, I'm nine (years old), números reciclados. **Act:** listen-pick, gap-fill, word-order, true-false, read-pick, fix-pybot ("I have nine years", calco del español). **Casa:** preguntar la edad a la familia en inglés. |
| 02c `myFamily` · Mi familia | **Obj:** nombrar a la familia y usar *this is my…* **Vocab:** mom, dad, brother, sister, grandma, grandpa, baby, family. **Estructura:** *This is my sister.* **Act:** picture-word, memory-pairs, gap-fill, listen-pick, odd-one-out, fix-pybot. **Casa:** presentar a la familia con fotos o dibujos. |
| 02d `myBody` · Mi cuerpo | **Obj:** partes del cuerpo y plurales. **Vocab:** head, eyes, ears, nose, mouth, hands, arms, legs, feet. **Act:** listen-pick (señalar en un dibujo de PyBot), picture-word, which-sounds (*ear/eye*), gap-fill, true-false, fix-pybot ("two foot"). **Casa:** *Touch your nose!* con la familia. |
| 02e `feelings` · Emociones | **Obj:** nombrar emociones. **Vocab:** happy, sad, tired, angry, scared, hungry, excited. **Act:** listen-pick (caritas de PyBot usando sus moods reales), picture-word, memory-pairs, odd-one-out, read-pick, fix-pybot. **Casa:** dibujar caritas y adivinar la emoción en inglés. |
| 02f `iFeel` · I feel happy. | **Obj:** decir cómo te sientes y por qué, de forma sencilla. **Vocab:** I feel…, I'm…, today, because (solo como bloque). **Estructura:** *I feel happy today.* **Act:** word-order, gap-fill, read-pick, true-false, listen-pick, fix-pybot. **Casa:** contar en la cena cómo se sintió cada uno: *I feel…* |

### Zona 03 — Colors & Things · sticker 🎨

| Página | Plan |
|---|---|
| 03 `colors` · Los colores | **Obj:** nombrar 10 colores. **Vocab:** red, blue, yellow, green, pink, purple, orange, black, white, brown. **Act:** picture-word, listen-pick, memory-pairs, odd-one-out, which-sounds (*blue/brown*), fix-pybot. **Casa:** *I spy something red!* |
| 03b `shapes` · Las formas | **Obj:** formas básicas. **Vocab:** circle, square, triangle, star, heart, rectangle. **Act:** picture-word, listen-pick, letter-tiles, odd-one-out, true-false, fix-pybot. **Casa:** buscar formas en la cocina. |
| 03c `itIsRed` · It is red. | **Obj:** describir con *It is* y el adjetivo antes del sustantivo. **Vocab:** it is, it's, a red apple, a big star. **Estructura:** *It's a red circle.* (el color va primero). **Act:** word-order, fix-pybot ("an apple red"), gap-fill, read-pick, true-false, listen-pick. **Casa:** describir juguetes: *It's a blue car.* |
| 03d `backpack` · Mi mochila | **Obj:** útiles escolares y *a/an*. **Vocab:** pencil, pen, book, notebook, eraser, ruler, scissors, backpack. **Act:** picture-word, listen-pick, memory-pairs, gap-fill (a/an), odd-one-out, fix-pybot ("a eraser"). **Casa:** sacar cosas de la mochila nombrándolas en inglés. |
| 03e `thisThat` · This or that? | **Obj:** *this/that* con cerca/lejos. **Vocab:** this, that, what is this?, it's a… **Estructura:** *What's this? — It's a pencil.* **Act:** read-pick (cerca/lejos), gap-fill, word-order, listen-pick, true-false, fix-pybot. **Casa:** juego de señalar: *What's this? What's that?* |

### Zona 04 — Animals & Food · sticker 🐶

| Página | Plan |
|---|---|
| 04 `animals` · Animales | **Obj:** animales comunes. **Vocab:** cat, dog, bird, fish, rabbit, horse, cow, duck, lion, monkey. **Act:** picture-word, listen-pick, memory-pairs, odd-one-out (mascota/granja/selva), which-sounds, fix-pybot. **Casa:** imitar animales y que adivinen en inglés. |
| 04b `bigSmall` · Big or small? | **Obj:** adjetivos de tamaño y opuestos. **Vocab:** big, small, long, short, tall, fast, slow. **Estructura:** *The elephant is big.* **Act:** read-pick, true-false, gap-fill, word-order, odd-one-out, fix-pybot. **Casa:** comparar objetos de casa: *big or small?* |
| 04c `canCant` · It can fly! | **Obj:** habilidades con *can/can't*. **Vocab:** can, can't, fly, swim, run, jump, climb. **Estructura:** *A bird can fly. A fish can't run.* **Act:** true-false, gap-fill, word-order, read-pick, listen-pick, fix-pybot ("A fish can runs"). **Casa:** *I can jump! Can you?* |
| 04d `food` · Comida y bebida | **Obj:** comidas y bebidas frecuentes. **Vocab:** apple, banana, bread, egg, milk, water, juice, rice, pizza, ice cream. **Act:** picture-word, listen-pick, memory-pairs, odd-one-out (comida/bebida), letter-tiles, fix-pybot. **Casa:** nombrar en inglés lo que hay en el plato. |
| 04e `iLike` · I like… | **Obj:** expresar gustos. **Vocab:** I like…, I love…, yummy. **Estructura:** *I like apples.* (plural para gustos generales) **Act:** word-order, gap-fill, read-pick, listen-pick, true-false, fix-pybot. **Casa:** encuesta familiar: *Do you like pizza?* |
| 04f `iDontLike` · I don't like… | **Obj:** gustos en negativo y preguntar. **Vocab:** I don't like…, do you like…?, yes, I do / no, I don't. **Act:** gap-fill, word-order, read-pick, true-false, listen-pick, fix-pybot ("I no like"). **Casa:** tabla de gustos de la familia con 🙂 y 🙁. |

### Zona 05 — My Day · sticker ☀️

| Página | Plan |
|---|---|
| 05 `days` · Los días | **Obj:** días de la semana con mayúscula. **Vocab:** Monday–Sunday, today, week, weekend. **Act:** listen-pick, letter-tiles, gap-fill (secuencia), fix-pybot ("monday" en minúscula), memory-pairs, true-false. **Casa:** decir cada mañana *Today is…* |
| 05b `dayParts` · Mañana, tarde y noche | **Obj:** partes del día y saludos. **Vocab:** morning, afternoon, evening, night, good morning… **Act:** picture-word (sol/luna), listen-pick, read-pick, gap-fill, odd-one-out, fix-pybot. **Casa:** usar el saludo correcto según la hora. |
| 05c `routine` · Mi rutina | **Obj:** rutina en presente simple, primera persona. **Vocab:** I wake up, I get dressed, I eat breakfast, I go to school, I play, I go to bed. **Act:** word-order, ordenar la rutina (variante de word-order con tarjetas), gap-fill, read-pick, listen-pick, fix-pybot. **Casa:** dibujar la rutina y narrarla en inglés. |
| 05d `classWords` · Open, close, listen! | **Obj:** instrucciones de clase (imperativo). **Vocab:** open, close, listen, look, sit down, stand up, be quiet, raise your hand. **Act:** listen-pick (acción), picture-word, true-false, odd-one-out, read-pick, fix-pybot. **Casa:** jugar "PyBot dice" con estas órdenes. |

### Zona 06 — Where is it? · sticker 🧭

| Página | Plan |
|---|---|
| 06 `questions` · What? Who? Where? | **Obj:** palabras de pregunta. **Vocab:** what, who, where, how many (reciclado), how old (reciclado). **Estructura:** *What's this? Who is she? Where is the cat?* **Act:** gap-fill (palabra de pregunta), read-pick (pregunta ↔ respuesta), word-order, listen-pick, odd-one-out, fix-pybot. **Casa:** 20 preguntas en inglés sencillo. |
| 06b `inOnUnder` · In, on, under | **Obj:** preposiciones de lugar. **Vocab:** in, on, under, next to, behind. **Estructura:** *The cat is under the table.* **Act:** read-pick (escenas), true-false, gap-fill, listen-pick, word-order, fix-pybot. **Casa:** esconder un juguete y dar pistas con *in/on/under*. |
| 06c `house` · Las partes de la casa | **Obj:** partes y objetos de la casa. **Vocab:** house, kitchen, bathroom, bedroom, living room, door, window, table, chair, bed. **Act:** picture-word, listen-pick, memory-pairs, read-pick (*The bed is in the bedroom*), odd-one-out, fix-pybot. **Casa:** pegar etiquetas en inglés por la casa. |

### 🏁 Parada — Show what you know (`checkpoint1`)

- **Mezcla:** de 2 a 3 actividades por zona (00–06), sin palabras nuevas.
- **Retos más largos:** armar una presentación completa (*Hello! My name is… I'm nine. I like… I can…*) con fichas; leer una mini historia de 5 frases y responder.
- **Autoevaluación por zona** con caritas (good / okay / review), sin notas, como en PyBot. Las zonas marcadas "review" aparecen como **REPASAR** en el mapa.
- **Diploma** del camino completo.

## 5. Cómo crece el camino (después de A1 básico)

**Regla:** primero se agregan páginas a una zona existente. Solo se crea una zona nueva si ningún tema actual la cubre.

| Tema nuevo | Va en | Ejemplos de páginas |
|---|---|---|
| Ropa y clima | 03 Colors & Things / 05 My Day | *I'm wearing…*, *It's sunny/rainy* |
| Juguetes y posesivos | 03 Colors & Things | *my / your / his / her*, *It's Tom's ball* |
| Más animales y comidas | 04 Animals & Food | partes de animales, *some/any* básico |
| La hora | 05 My Day | *What time is it? It's three o'clock.* |
| *have got* / *there is / there are* | 06 Where is it? | *There is a bed in my room.* |
| **Zona nueva 07 — Right now** | presente continuo | *What are you doing? I'm playing.* |
| **Zona nueva 08 — Fun & Free Time** | deportes, hobbies, *can* para pedir permiso | *Can I play?*, *Let's…* |
| **Zona nueva 09 — Tell a story** | pasado simple básico | *Yesterday I played…*, verbos regulares y 8 irregulares frecuentes |
| **Zona nueva 10 — My Town** | lugares, direcciones simples | *Go straight, turn left* |

Cada zona nueva lleva su sticker, su diploma y, cada 3 o 4 zonas, una parada nueva.

## 6. Páginas de apoyo que faltan

| Página | Plan |
|---|---|
| **Mis palabras** (`words.html`) | Todas las palabras del camino con dibujo, 🔊, 🐢 y su significado. Búsqueda en ES y EN. Se genera a partir de `pybotWords` más las listas de cada página. Marca las palabras de zonas ya terminadas. |
| **Guía para familias y profes** (`guide.html`) | Por zona: qué se aprende, cuánto tiempo toma (15–20 min por página), dos juegos sin pantalla y un reto en papel para imprimir. Siempre dice que no hace falta saber inglés. |
| **Conoce a PyBot** (`meet-pybot.html`) | Galería de expresiones y la historia de por qué existe (la idea de María Ángel), como en PyBot. |

## 7. Audio, imágenes y créditos

- **Audio:** se pregenera un archivo por palabra y frase con una voz de licencia abierta (por ejemplo Kokoro-82M, Apache 2.0). Convención: `audio/en/<slug>.mp3` y `audio/en/slow/<slug>.mp3`. Un script lee las listas de vocabulario y genera solo lo que falta. Se acredita en `THIRD_PARTY_NOTICES.md`, junto a 🔊 y en las preguntas frecuentes **antes** de subir cualquier archivo. `speechSynthesis` queda como respaldo.
- **Imágenes:** emoji del sistema e ilustraciones CSS, como PyBot. Ninguna imagen de terceros sin licencia compatible y crédito.
- **Cualquier componente externo nuevo** sigue la regla de créditos del README.

## 8. Fases y criterios de "listo"

| Fase | Entrega | Listo cuando… |
|---|---|---|
| A | Plantilla de lección + zona 00 completa + flujo de audio | Las 3 páginas cumplen la checklist; el niño termina la zona 00 sin ayuda |
| B | Zonas 01 y 02 | Ídem, más la prueba con María Ángel y 2–3 amigas o amigos (observación, sin recoger datos) |
| C | Zonas 03 y 04 + "Mis palabras" | Ídem; "Mis palabras" lista todo lo publicado |
| D | Zonas 05 y 06 + parada + diploma final | Ídem; el camino completo se puede terminar |
| E | Guía para familias + Conoce a PyBot + revisión de accesibilidad | Auditoría a11y, varios navegadores, móvil |
| F | Crecimiento (sección 5) | Una zona o página a la vez, con la misma checklist |

### Checklist por página

- [ ] Una idea, de 5 a 8 palabras nuevas, el reciclaje anotado
- [ ] ES y EN completos, con la misma brevedad (títulos de menos de 7 palabras, PyBot con menos de 15)
- [ ] Mínimo 6 actividades, al menos un `fix-pybot` y un `listen-pick` por zona
- [ ] Todas las palabras y frases nuevas con 🔊 y 🐢
- [ ] Tarjeta "Practica en casa" con una línea para el adulto
- [ ] IDs registrados, `progress-version` actualizado, `soon` quitado
- [ ] Funciona en celular a 390 px, con teclado y con movimiento reducido
- [ ] Ningún micrófono ni evaluación del habla
- [ ] Créditos al día si se agregó algo externo

## 9. Prueba con niñas y niños

- Sesiones cortas de 15–20 minutos, con un adulto que **observa** sin ayudar de entrada.
- Se anota dónde dudan, qué tocan primero y qué no entienden. No se graba a nadie ni se recogen datos.
- Cada hallazgo se convierte en un cambio pequeño: una palabra más simple, una pista mejor o una actividad menos.
