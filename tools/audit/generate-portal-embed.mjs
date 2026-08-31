#!/usr/bin/env node
/* ==========================================================================
 * Empire English — portal lesson-embed generator
 * --------------------------------------------------------------------------
 * Regenerates `web/src/content/materials-stage0.ts` from the finished lesson
 * markdown in `materials/stage0/**​/*.md`.
 *
 * WHY THIS EXISTS
 * That file carries the banner "AUTO-GENERATED … do not edit by hand", but the
 * generator was never committed — so the only copy of the content the portal
 * actually serves was a build artefact nobody could rebuild. The 55 embedded
 * lessons happened to be byte-identical to their sources when this was written,
 * but nothing enforced it: editing a lesson and forgetting to re-embed would
 * change the PDF and leave the portal serving the old text, silently.
 *
 * The embed exists (rather than reading the markdown at request time) so lesson
 * content stays server-side and ships with the bundle. Keep it generated.
 *
 * Usage:
 *   node generate-portal-embed.mjs           # rewrite the embed
 *   node generate-portal-embed.mjs --check    # verify only; exit 1 on drift
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const OUT = path.join(REPO, "web", "src", "content", "materials-stage0.ts");
const CHECK = process.argv.includes("--check");

const BANNER = "// AUTO-GENERATED from materials/stage0/**/*.md — do not edit by hand.";

/** Lexicographic key order, so the file is stable and a diff shows only real changes. */
function sortKeys(o) {
  const out = {};
  for (const k of Object.keys(o).sort()) out[k] = o[k];
  return out;
}

/** Every finished Stage-0 lesson, keyed by lesson id (s0-u<unit>-l<nn>). */
function collectLessons() {
  const base = path.join(REPO, "materials", "stage0");
  const out = {};
  const units = fs
    .readdirSync(base)
    .filter((d) => /^unit\d+$/.test(d) && fs.statSync(path.join(base, d)).isDirectory());
  for (const u of units) {
    for (const f of fs.readdirSync(path.join(base, u)).filter((f) => /^s0-u\d+-l\d+\.md$/.test(f))) {
      out[f.replace(/\.md$/, "")] = fs.readFileSync(path.join(base, u, f), "utf8");
    }
  }
  return sortKeys(out);
}

/**
 * The wrapper pages around the lessons: the stage front matter, the stage
 * glossary, and each unit's campaign front matter. Keyed by filename stem
 * (`stage0-front-matter`, `stage0-glossary`, `unit3-front-matter`).
 *
 * These reached the PDF from the start but never reached the portal, so a
 * student on the site never saw the unit wrapper the book opens each unit with.
 */
function collectWrappers() {
  const base = path.join(REPO, "materials", "stage0");
  const out = {};
  for (const f of fs.readdirSync(base).filter((f) => /^stage\d+-.*\.md$/.test(f))) {
    out[f.replace(/\.md$/, "")] = fs.readFileSync(path.join(base, f), "utf8");
  }
  for (const u of fs.readdirSync(base).filter((d) => /^unit\d+$/.test(d))) {
    for (const f of fs.readdirSync(path.join(base, u)).filter((f) => /front-matter\.md$/.test(f))) {
      out[f.replace(/\.md$/, "")] = fs.readFileSync(path.join(base, u, f), "utf8");
    }
  }
  return sortKeys(out);
}

function render(lessons, wrappers) {
  return (
    `${BANNER}\n\n` +
    `export const FINISHED_LESSON_MD: Record<string, string> = ${JSON.stringify(lessons)};\n\n` +
    `/** Stage front matter, stage glossary, and each unit's campaign front matter. */\n` +
    `export const WRAPPER_MD: Record<string, string> = ${JSON.stringify(wrappers)};\n`
  );
}

const lessons = collectLessons();
const wrappers = collectWrappers();
const next = render(lessons, wrappers);
const ids = Object.keys(lessons);

if (CHECK) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current === next) {
    console.log(
      `✓ portal embed is in sync with materials/stage0 ` +
        `(${ids.length} lessons, ${Object.keys(wrappers).length} wrapper pages)`,
    );
    process.exit(0);
  }
  console.error(`✗ portal embed is STALE — web/src/content/materials-stage0.ts does not match materials/stage0/`);
  // Say exactly which pages differ, so the fix is obvious. Each export is parsed
  // on its own line — matching across the whole file would grab both objects.
  const parseExport = (name) => {
    const line = current.split("\n").find((l) => l.startsWith(`export const ${name}`));
    if (!line) return null;
    const json = line.slice(line.indexOf("{"), line.lastIndexOf("}") + 1);
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  for (const [name, next_] of [
    ["FINISHED_LESSON_MD", lessons],
    ["WRAPPER_MD", wrappers],
  ]) {
    const old = parseExport(name);
    if (old == null) {
      console.error(`  ${name}: missing or unparseable in the committed file`);
      continue;
    }
    const nextIds = Object.keys(next_);
    const oldIds = Object.keys(old);
    const added = nextIds.filter((i) => !oldIds.includes(i));
    const removed = oldIds.filter((i) => !nextIds.includes(i));
    const changed = nextIds.filter((i) => oldIds.includes(i) && old[i] !== next_[i]);
    if (!added.length && !removed.length && !changed.length) continue;
    console.error(`  ${name}:`);
    if (added.length) console.error(`    added:   ${added.join(", ")}`);
    if (removed.length) console.error(`    removed: ${removed.join(", ")}`);
    if (changed.length) console.error(`    changed: ${changed.join(", ")}`);
  }
  console.error(`  fix: node tools/audit/generate-portal-embed.mjs`);
  process.exit(1);
}

fs.writeFileSync(OUT, next);
console.log(
  `✓ wrote ${path.relative(REPO, OUT)} — ${ids.length} lessons, ` +
    `${Object.keys(wrappers).length} wrapper pages`,
);
