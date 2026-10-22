#!/usr/bin/env python3
"""Writes lessons/*.html from the lesson data in tools/lessons/*.py.

Each page is a short HTML shell with its whole lesson as JSON; lesson.js draws it.
The script also:
- checks every lesson, so a broken one never ships;
- publishes each built lesson in script.js (`pathSteps`): removes `soon: true`
  and writes its activity ids;
- rewrites the activity-id registry in README.md between its markers.
Run: python3 tools/build-lessons.py, then node tools/progress-version.mjs --bump "note".
"""
import html
import importlib.util
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
LESSON_DIR = ROOT / "tools" / "lessons"
SHELL = (ROOT / "tools" / "lesson-shell.html").read_text(encoding="utf-8")
sys.path.insert(0, str(LESSON_DIR))


def load(path):
    spec = importlib.util.spec_from_file_location(path.stem, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.LESSONS


def is_text(value):
    return isinstance(value, str) or (isinstance(value, dict) and value.get("es") and value.get("en"))


def check(lesson):
    problems = []
    required = ["file", "step", "title", "intro", "pybot", "activities", "home"]
    if not lesson.get("review"):
        required += ["look", "words"]
    for key in required:
        if not lesson.get(key):
            problems.append(f"missing {key}")
    ids = [activity["id"] for activity in lesson.get("activities", [])]
    if len(ids) < 6:
        problems.append("needs at least 6 activities")
    if len(set(ids)) != len(ids):
        problems.append("repeated activity id")
    for activity in lesson.get("activities", []):
        if not activity["id"].startswith(lesson["step"] + "-"):
            problems.append(f"{activity['id']} must start with {lesson['step']}-")
        for key in ("prompt", "hint", "why"):
            if not is_text(activity.get(key)):
                problems.append(f"{activity['id']}: {key} needs es and en")
        if activity["type"] == "choice":
            if not 0 <= activity["answer"] < len(activity["options"]):
                problems.append(f"{activity['id']}: answer out of range")
            if not all(is_text(option) for option in activity["options"]):
                problems.append(f"{activity['id']}: every option needs text")
        elif activity["type"] == "order":
            if len(activity["tiles"]) < 2 or len(set(activity["tiles"])) != len(activity["tiles"]):
                problems.append(f"{activity['id']}: order needs 2+ different tiles")
        else:
            problems.append(f"{activity['id']}: unknown type")
    return problems


STEP_PATTERN = re.compile(
    r'\{ id: "(?P<id>\w+)", page: "(?P<page>\w+)", href: "(?P<href>[^"]+)"(?P<soon>, soon: true)?,\s*'
    r'activities: \[(?P<activities>[^\]]*)\],?\s*\}',
    re.S,
)


def publish_steps(built):
    script_path = ROOT / "script.js"
    script = script_path.read_text(encoding="utf-8")
    start = script.index("const pathSteps = [\n") + len("const pathSteps = [\n")
    end = script.index("\n];", start)
    lines = []
    for match in STEP_PATTERN.finditer(script[start:end]):
        step_id = match["id"]
        activities = re.findall(r'"([^"]+)"', match["activities"])
        soon = bool(match["soon"])
        if step_id in built:
            activities, soon = built[step_id], False
        head = f'  {{ id: "{step_id}", page: "{match["page"]}", href: "{match["href"]}"'
        if soon:
            lines.append(f"{head}, soon: true, activities: [] }},")
        else:
            body = "\n".join(f'      "{activity}",' for activity in activities)
            lines.append(f"{head},\n    activities: [\n{body}\n    ],\n  }},")
    script_path.write_text(script[:start] + "\n".join(lines) + script[end:], encoding="utf-8")


def write_registry(lessons):
    readme_path = ROOT / "README.md"
    readme = readme_path.read_text(encoding="utf-8")
    begin, finish = "<!-- activity-registry:start -->", "<!-- activity-registry:end -->"
    if begin not in readme:
        return
    rows = []
    for lesson in lessons:
        ids = ", ".join(f"`{activity['id']}`" for activity in lesson["activities"])
        rows.append(f"- `{lesson['step']}` ({lesson['title']['en']}): {ids}")
    before, rest = readme.split(begin, 1)
    after = rest.split(finish, 1)[1]
    readme_path.write_text(f"{before}{begin}\n" + "\n".join(rows) + f"\n{finish}{after}", encoding="utf-8")


def main():
    lessons = []
    for path in sorted(LESSON_DIR.glob("*.py")):
        if not path.name.startswith("_"):
            lessons.extend(load(path))
    failed = False
    built = {}
    for lesson in lessons:
        problems = check(lesson)
        if problems:
            failed = True
            print(f"{lesson.get('file')}: " + "; ".join(problems))
            continue
        data = {key: value for key, value in lesson.items() if key != "file" and value is not None}
        page = (SHELL
                .replace("__TITLE__", html.escape(lesson["title"]["es"]))
                .replace("__DESC__", html.escape(lesson["intro"]["es"]))
                .replace("__STEP__", lesson["step"])
                .replace("__JSON__", json.dumps(data, ensure_ascii=False, indent=2).replace("</", "<\\/")))
        (ROOT / "lessons" / f"{lesson['file']}.html").write_text(page, encoding="utf-8")
        built[lesson["step"]] = [activity["id"] for activity in lesson["activities"]]
        print(f"{lesson['file']}.html  ({len(lesson['activities'])} activities)")
    if failed:
        sys.exit(1)
    publish_steps(built)
    write_registry(lessons)
    print(f"{len(built)} lessons built and published in pathSteps.")


if __name__ == "__main__":
    main()
