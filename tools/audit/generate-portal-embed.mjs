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

/** Every finished Stage-0 lesson, keyed by lesson id (s0-u<unit>-l<nn>). */
function collect() {
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
  // Lexicographic key order, so the generated file is stable across machines
  // and a diff only ever shows real content changes.
  const sorted = {};
  for (const k of Object.keys(out).sort()) sorted[k] = out[k];
  return sorted;
}

function render(lessons) {
  return `${BANNER}\n\nexport const FINISHED_LESSON_MD: Record<string, string> = ${JSON.stringify(lessons)};\n`;
}

const lessons = collect();
const next = render(lessons);
const ids = Object.keys(lessons);

if (CHECK) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current === next) {
    console.log(`✓ portal embed is in sync with materials/stage0 (${ids.length} lessons)`);
    process.exit(0);
  }
  console.error(`✗ portal embed is STALE — web/src/content/materials-stage0.ts does not match materials/stage0/`);
  // Say exactly which lessons differ, so the fix is obvious.
  const m = current.match(/Record<string, string> = (\{[\s\S]*\});?\s*$/);
  let old = {};
  try {
    old = m ? JSON.parse(m[1].replace(/;$/, "")) : {};
  } catch {
    console.error(`  (could not parse the committed embed — regenerate it)`);
  }
  const oldIds = Object.keys(old);
  const added = ids.filter((i) => !oldIds.includes(i));
  const removed = oldIds.filter((i) => !ids.includes(i));
  const changed = ids.filter((i) => oldIds.includes(i) && old[i] !== lessons[i]);
  if (added.length) console.error(`  added:   ${added.join(", ")}`);
  if (removed.length) console.error(`  removed: ${removed.join(", ")}`);
  if (changed.length) console.error(`  changed: ${changed.join(", ")}`);
  console.error(`  fix: node tools/audit/generate-portal-embed.mjs`);
  process.exit(1);
}

fs.writeFileSync(OUT, next);
console.log(`✓ wrote ${path.relative(REPO, OUT)} — ${ids.length} lessons`);
