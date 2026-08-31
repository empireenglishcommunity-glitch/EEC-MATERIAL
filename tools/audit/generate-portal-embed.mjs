#!/usr/bin/env node
/* ========================================================================== 
 * Empire English — portal lesson-embed generator
 * --------------------------------------------------------------------------
 * Regenerates `web/src/content/materials-stageN.ts` from finished markdown in
 * `materials/stageN/`. The embed keeps coursebook content server-side in the
 * Next bundle; the portal never depends on repository files at request time.
 *
 * Usage:
 *   node generate-portal-embed.mjs              # Stage 0 compatibility default
 *   node generate-portal-embed.mjs --stage 1
 *   node generate-portal-embed.mjs --stage 1 --check
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const CHECK = process.argv.includes("--check");
const stageIndex = process.argv.indexOf("--stage");
const STAGE = stageIndex >= 0 ? Number(process.argv[stageIndex + 1]) : 0;
const EXPECTED = { 0: { lessons: 55, wrappers: 13 }, 1: { lessons: 50, wrappers: 12 } };

if (!Number.isInteger(STAGE) || !(STAGE in EXPECTED)) {
  console.error(`✗ unsupported or missing stage: ${process.argv[stageIndex + 1] ?? STAGE}`);
  process.exit(1);
}

const BASE = path.join(REPO, "materials", `stage${STAGE}`);
const OUT = path.join(REPO, "web", "src", "content", `materials-stage${STAGE}.ts`);
const BANNER = `// AUTO-GENERATED from materials/stage${STAGE}/**/*.md — do not edit by hand.`;

function sortKeys(record) {
  const sorted = {};
  for (const key of Object.keys(record).sort()) sorted[key] = record[key];
  return sorted;
}

function collectLessons() {
  const lessons = {};
  const pattern = new RegExp(`^s${STAGE}-u\\d+-l\\d+\\.md$`);
  const units = fs
    .readdirSync(BASE)
    .filter((dir) => /^unit\d+$/.test(dir) && fs.statSync(path.join(BASE, dir)).isDirectory());
  for (const unit of units) {
    for (const file of fs.readdirSync(path.join(BASE, unit)).filter((name) => pattern.test(name))) {
      lessons[file.replace(/\.md$/, "")] = fs.readFileSync(path.join(BASE, unit, file), "utf8");
    }
  }
  return sortKeys(lessons);
}

function collectWrappers() {
  const wrappers = {};
  const stagePattern = new RegExp(`^stage${STAGE}-.*\\.md$`);
  for (const file of fs.readdirSync(BASE).filter((name) => stagePattern.test(name))) {
    wrappers[file.replace(/\.md$/, "")] = fs.readFileSync(path.join(BASE, file), "utf8");
  }
  for (const unit of fs.readdirSync(BASE).filter((dir) => /^unit\d+$/.test(dir))) {
    for (const file of fs.readdirSync(path.join(BASE, unit)).filter((name) => /front-matter\.md$/.test(name))) {
      wrappers[file.replace(/\.md$/, "")] = fs.readFileSync(path.join(BASE, unit, file), "utf8");
    }
  }
  return sortKeys(wrappers);
}

function render(lessons, wrappers) {
  return (
    `${BANNER}\n\n` +
    `export const FINISHED_LESSON_MD: Record<string, string> = ${JSON.stringify(lessons)};\n\n` +
    `/** Stage front matter, stage glossary, and each unit's campaign front matter. */\n` +
    `export const WRAPPER_MD: Record<string, string> = ${JSON.stringify(wrappers)};\n`
  );
}

function parseExport(current, name) {
  const line = current.split("\n").find((candidate) => candidate.startsWith(`export const ${name}`));
  if (!line) return null;
  const json = line.slice(line.indexOf("{"), line.lastIndexOf("}") + 1);
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function reportChanges(current, name, nextRecord) {
  const old = parseExport(current, name);
  if (old == null) {
    console.error(`  ${name}: missing or unparseable in the committed file`);
    return;
  }
  const nextKeys = Object.keys(nextRecord);
  const oldKeys = Object.keys(old);
  const added = nextKeys.filter((key) => !oldKeys.includes(key));
  const removed = oldKeys.filter((key) => !nextKeys.includes(key));
  const changed = nextKeys.filter((key) => oldKeys.includes(key) && old[key] !== nextRecord[key]);
  if (!added.length && !removed.length && !changed.length) return;
  console.error(`  ${name}:`);
  if (added.length) console.error(`    added:   ${added.join(", ")}`);
  if (removed.length) console.error(`    removed: ${removed.join(", ")}`);
  if (changed.length) console.error(`    changed: ${changed.join(", ")}`);
}

const lessons = collectLessons();
const wrappers = collectWrappers();
const lessonCount = Object.keys(lessons).length;
const wrapperCount = Object.keys(wrappers).length;
const expected = EXPECTED[STAGE];

if (lessonCount !== expected.lessons || wrapperCount !== expected.wrappers) {
  console.error(
    `✗ Stage ${STAGE} source count mismatch: expected ${expected.lessons} lessons/${expected.wrappers} wrappers, ` +
      `found ${lessonCount}/${wrapperCount}`,
  );
  process.exit(1);
}

const next = render(lessons, wrappers);
if (CHECK) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current === next) {
    console.log(`✓ Stage-${STAGE} portal embed is in sync (${lessonCount} lessons, ${wrapperCount} wrapper pages)`);
    process.exit(0);
  }
  console.error(`✗ portal embed is STALE — ${path.relative(REPO, OUT)} does not match materials/stage${STAGE}/`);
  reportChanges(current, "FINISHED_LESSON_MD", lessons);
  reportChanges(current, "WRAPPER_MD", wrappers);
  console.error(`  fix: node tools/audit/generate-portal-embed.mjs --stage ${STAGE}`);
  process.exit(1);
}

fs.writeFileSync(OUT, next);
console.log(`✓ wrote ${path.relative(REPO, OUT)} — ${lessonCount} lessons, ${wrapperCount} wrapper pages`);
