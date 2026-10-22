# Third-party notices

PyBot English bundles no third-party code, fonts, images, or audio. It uses features that already live in the learner's browser, and it links to one outside service. Each one is credited here and next to the place where it is used.

## Browser voices (Web Speech API)

Every 🔊 button reads English aloud with the browser's built-in speech synthesis (`speechSynthesis`, the Web Speech API).

- Specification: https://webaudio.github.io/web-speech-api/
- Documentation: https://developer.mozilla.org/docs/Web/API/Web_Speech_API
- The voices belong to the browser or operating system that provides them (for example Google, Apple, or Microsoft) and are used under that provider's terms. PyBot English does not ship, copy, or modify any voice.
- Some browsers use an online voice service. In that case the browser sends only the words being read; PyBot English never sends a name or progress.

Credited on the page: home page (kind phrases), translator page.

## Browser translator (Translator API)

The translator page first looks in PyBot English's own word list. When a phrase is not there, it asks the browser's built-in Translator API, available in recent desktop versions of Google Chrome.

- Documentation: https://developer.chrome.com/docs/ai/translator-api
- The translation model is provided by the browser vendor (Google, in Chrome) and runs on the learner's device. Its use is subject to that browser's terms.
- PyBot English does not ship, copy, or modify the model.

Credited on the page: translator page, and the result note says when this translator was used.

## Google Translate (link only)

When neither the word list nor the browser can translate, the translator page shows a link that opens Google Translate in a new tab with the typed text filled in. Nothing is sent until someone taps the link.

- Service: https://translate.google.com/
- Google Translate is a trademark of Google LLC. It is used here only to name the service the link opens.

Credited on the page: translator page.

## PyBot

The PyBot character, its HTML/CSS anatomy and moods, the little companion, and the local-first progress scheme come from PyBot (https://pybot-kids.github.io/), by the same author, under the MIT License (code) and CC BY 4.0 (character and content).

## Planned

Pre-generated audio with an openly licensed voice (for example Kokoro-82M, Apache 2.0) is planned. It will be listed here, with its license and credit line, before any file is added.

---

PyBot English does not claim authorship of, sponsorship by, or affiliation with Google, Apple, Microsoft, Mozilla, the W3C, or any provider named above.
