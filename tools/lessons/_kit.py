"""Small helpers to write lesson data with less repetition.

Texts in the interface language are (es, en) tuples. Plain strings are English
being learned. Spanish meanings of English words are written once and shown in
both interface languages, because learners speak Spanish.
"""


def t(es, en=None):
    return {"es": es, "en": en if en is not None else es}


def tx(value):
    if isinstance(value, tuple):
        return t(*value)
    return value


TF = [t("Verdadero", "True"), t("Falso", "False")]


def look(icon, word, meaning):
    return {"icon": icon, "word": word, "meaning": t(meaning)}


def model(english, meaning):
    return {"en": english, "meaning": t(meaning)}


def ch(id, prompt, options, answer, hint, why, listen=None, show=None):
    activity = {"id": id, "type": "choice", "prompt": tx(prompt), "options": [tx(option) for option in options],
                "answer": answer, "hint": tx(hint), "why": tx(why)}
    if listen:
        activity["listen"] = listen
    if show:
        activity["show"] = show
    return activity


def order(id, prompt, tiles, hint, why):
    return {"id": id, "type": "order", "prompt": tx(prompt), "tiles": tiles, "hint": tx(hint), "why": tx(why)}


def lesson(file, step, mood, title, intro, pybot, looks, models, rule, activities, home, words=None):
    return {
        "file": file,
        "step": step,
        "mood": mood,
        "title": tx(title),
        "intro": tx(intro),
        "pybot": tx(pybot),
        "look": looks,
        "use": {"models": models, "rule": tx(rule)} if models else None,
        "activities": activities,
        "words": words or [{"en": item["word"], "meaning": item["meaning"]} for item in looks],
        "home": {"title": tx(home[0]), "text": tx(home[1]), "adult": tx(home[2])},
    }
