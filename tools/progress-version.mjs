#!/usr/bin/env node
// Keeps PROGRESS_VERSION in script.js in step with the course content.
//
//   node tools/progress-version.mjs                 checks; fails when the steps or
//                                                   activities changed without a bump
//   node tools/progress-version.mjs --bump "note"   bumps PROGRESS_VERSION and records
//                                                   the new content in progress-versions.json
//
// progress-versions.json lists every step and activity id of each version, so an
// old backup's `progressVersion` tells exactly which content it was saved with.
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const scriptPath = new URL("script.js", root);
const historyPath = new URL("progress-versions.json", root);

const script = readFileSync(scriptPath, "utf8");
const history = JSON.parse(readFileSync(historyPath, "utf8"));

function between(start, end) {
  const from = script.indexOf(start);
  const to = script.indexOf(end, from);
  if (from === -1 || to === -1) {
    throw new Error(`Could not find ${start.trim()} in script.js`);
  }
  return script.slice(from + start.length, to);
}

const version = Number(script.match(/^const PROGRESS_VERSION = (\d+);$/m)?.[1]);
// pathSteps is a plain literal, so it can be evaluated on its own.
const pathSteps = new Function(`return [${between("const pathSteps = [", "\n];")}\n];`)();
const steps = Object.fromEntries(
  pathSteps.map((step) => [step.id, [...step.activities, ...(step.activitiesAddedLater ?? [])]]),
);
const migrated = new Set(
  [...between("const progressMigrations = {", "};").matchAll(/^\s*(\d+):/gm)].map((match) => Number(match[1])),
);

const ids = (content) => [
  ...Object.keys(content).map((id) => `step ${id}`),
  ...Object.values(content).flat().map((id) => `activity ${id}`),
];
const latest = history.versions.at(-1);
const changed = JSON.stringify(steps) !== JSON.stringify(latest.steps);

if (process.argv[2] === "--bump") {
  if (!changed) {
    console.log(`No step or activity changed since version ${latest.version}. Nothing to bump.`);
    process.exit(0);
  }
  const next = latest.version + 1;
  writeFileSync(scriptPath, script.replace(/^const PROGRESS_VERSION = \d+;$/m, `const PROGRESS_VERSION = ${next};`));
  history.versions.push({
    version: next,
    date: new Date().toISOString().slice(0, 10),
    note: process.argv[3] ?? "",
    steps,
  });
  writeFileSync(historyPath, `${JSON.stringify(history, null, 2)}\n`);
  console.log(`PROGRESS_VERSION is now ${next}.`);
  process.exit(0);
}

const problems = [];
if (version !== latest.version) {
  problems.push(`PROGRESS_VERSION is ${version}, but progress-versions.json ends at version ${latest.version}.`);
}
if (changed) {
  problems.push(
    "Steps or activities in pathSteps changed. Run: node tools/progress-version.mjs --bump \"what changed\"",
  );
}

history.versions.slice(1).forEach((entry, index) => {
  const current = new Set(ids(entry.steps));
  const removed = ids(history.versions[index].steps).filter((id) => !current.has(id));
  if (removed.length && !migrated.has(entry.version)) {
    console.warn(
      `Version ${entry.version} removed ${removed.join(", ")} without a migration. ` +
        "Old progress for them is dropped. If an id was renamed, add a progressMigrations entry.",
    );
  }
});

if (problems.length) {
  problems.forEach((problem) => console.error(problem));
  process.exit(1);
}
console.log(`Progress version ${version} matches the course content.`);
