#!/usr/bin/env python3
"""Writes lessons/*.html from the lesson data in tools/lessons/*.py.

Each page is a short HTML shell with its whole lesson as JSON; lesson.js draws it.
Run: python3 tools/build-lessons.py   (then node tools/progress-version.mjs)
The script also checks every lesson, so a broken one never ships.
"""
import html
import importlib.util
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHELL = (ROOT / "tools" / "lesson-shell.html").read_text(encoding="utf-8")


def load(path):
    spec = importlib.util.spec_from_file_location(path.stem, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.LESSONS


def is_text(value):
    return isinstance(value, str) or (isinstance(value, dict) and value.get("es") and value.get("en"))


def check(lesson):
    problems = []
    for key in ("file", "step", "title", "intro", "pybot", "look", "activities", "words", "home"):
        if key not in lesson:
            problems.append(f"missing {key}")
    ids = [activity["id"] for activity in lesson["activities"]]
    if len(ids) < 6:
        problems.append("needs at least 6 activities")
    if len(set(ids)) != len(ids):
        problems.append("repeated activity id")
    for activity in lesson["activities"]:
        if not activity["id"].startswith(lesson["step"] + "-"):
            problems.append(f"{activity['id']} must start with {lesson['step']}-")
        for key in ("prompt", "hint", "why"):
            if not is_text(activity.get(key)):
                problems.append(f"{activity['id']}: {key} needs es and en")
        if activity["type"] == "choice":
            if not 0 <= activity["answer"] < len(activity["options"]):
                problems.append(f"{activity['id']}: answer out of range")
        elif activity["type"] == "order":
            if len(activity["tiles"]) < 2:
                problems.append(f"{activity['id']}: order needs 2+ tiles")
        else:
            problems.append(f"{activity['id']}: unknown type")
    return problems


def main():
    lessons = []
    for path in sorted((ROOT / "tools" / "lessons").glob("*.py")):
        lessons.extend(load(path))
    failed = False
    for lesson in lessons:
        problems = check(lesson)
        if problems:
            failed = True
            print(f"{lesson.get('file')}: " + "; ".join(problems))
            continue
        data = {key: value for key, value in lesson.items() if key != "file"}
        page = (SHELL
                .replace("__TITLE__", html.escape(lesson["title"]["es"]))
                .replace("__DESC__", html.escape(lesson["intro"]["es"]))
                .replace("__STEP__", lesson["step"])
                .replace("__JSON__", json.dumps(data, ensure_ascii=False, indent=2).replace("</", "<\\/")))
        (ROOT / "lessons" / f"{lesson['file']}.html").write_text(page, encoding="utf-8")
        ids = ", ".join(f'"{activity["id"]}"' for activity in lesson["activities"])
        print(f"{lesson['file']}.html  ({len(lesson['activities'])} activities)\n  {lesson['step']}: [{ids}]")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
