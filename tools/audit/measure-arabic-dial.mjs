#!/usr/bin/env node
/* ==========================================================================
 * Empire English — Arabic-dial check
 * --------------------------------------------------------------------------
 * Every lesson blueprint in `curriculum/` declares its own Arabic support level
 * ("**Arabic support:** ~40%."). This reads that number straight out of the
 * blueprint each finished lesson cites, measures what the lesson actually
 * delivers, and fails when they disagree.
 *
 * Reading the target from the blueprint — rather than from a table kept here —
 * means the check cannot drift from the curriculum. Retune a blueprint and the
 * gate retunes with it.
 *
 * THE OPERATIONAL DEFINITION (the blueprints give a number but never a method)
 *   Arabic share = Arabic letters / (Arabic letters + Latin letters)
 *   over the STUDENT-VISIBLE EXPLANATION only:
 *     - Teacher overlay removed — coach-facing, and English by convention.
 *     - Only "Decode it" and "Why this matters" counted: the sections the dial
 *       is actually about.
 *     - Code spans, emphasis marks and table rows stripped. Vocabulary tables
 *       and target language are English BY DESIGN at every stage, so counting
 *       them would measure the curriculum instead of the support level.
 *   Whole-page share is the wrong measure and reads about half of this.
 *
 * Arabic omits short vowels, so it is denser per character than English: a 40%
 * character share is nearer parity in words than it sounds.
 *
 * Usage:
 *   node measure-arabic-dial.mjs              # check; exit 1 on a miss
 *   node measure-arabic-dial.mjs --report     # measure only, never fail
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const REPORT_ONLY = process.argv.includes("--report");

/** Percentage points a lesson may sit either side of its declared target. */
const TOLERANCE = 2;

/**
 * Stage 0 predates this check. It measures ~53% against a declared ~70%, and it
 * is founder-approved, shipping, and already printed into both coursebook PDFs.
 * Re-cutting 46 approved lessons to chase a number that was never operationally
 * defined when they were written is a content decision, not a lint fix — so it
 * is reported and excluded from the gate rather than silently "fixed".
 */
const GRANDFATHERED = new Set([0]);

function stripTeacher(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    if (/^>\s*\[!TEACHER\]/i.test(lines[i])) {
      i++;
      while (i < lines.length && lines[i].startsWith(">")) i++;
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  return out.join("\n");
}

function explanationText(md) {
  return stripTeacher(md)
    .split(/^## /m)
    .filter((s) => /^[^\n]*(Decode it|Why this matters)/.test(s))
    .join("\n")
    .replace(/`[^`]*`/g, "")
    .replace(/\*+/g, "")
    .replace(/^\|.*\|$/gm, "");
}

function counts(text) {
  const ar = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const la = (text.match(/[A-Za-z]/g) || []).length;
  return ar + la === 0 ? null : { ar, la, share: (ar / (ar + la)) * 100 };
}

/**
 * Arabic characters needed for a target share, given the Latin already present.
 * Useful when drafting: aim for this from the first pass instead of tuning.
 */
export function arabicNeededFor(targetPct, latinChars) {
  return Math.round((targetPct / 100) * latinChars / (1 - targetPct / 100));
}

/** The blueprint path and lesson id a finished lesson cites in its header. */
function citation(md) {
  const m = /Built from: `([^`]+)` · \*\*([A-Z0-9-]+)\*\*/.exec(md);
  return m ? { blueprint: m[1], id: m[2] } : null;
}

/** The `~N%` the blueprint declares for that specific lesson. */
const blueprintCache = new Map();
function declaredTarget(blueprintRel, lessonId) {
  if (!blueprintCache.has(blueprintRel)) {
    const p = path.join(REPO, blueprintRel);
    blueprintCache.set(blueprintRel, fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
  }
  const src = blueprintCache.get(blueprintRel);
  if (!src) return null;

  // Each lesson is a "## <ID> — ..." section; prefer the Arabic line inside it.
  //
  // Then fall back to the UNIT-LEVEL line in the same file. Both steps are load
  // bearing, and the second one used to be wrong in a way that mattered: the
  // fallback was `section ?? src`, so it only applied when the lesson section was
  // missing ENTIRELY. Stages 0-2 happen to restate the Arabic level inside every
  // lesson block, so a found-but-silent section never occurred. Stages 3 and 4
  // declare immersion ONCE per unit and never repeat it per lesson — which meant
  // every one of those 110 lessons resolved to "no target" and the gate passed by
  // not looking. Search the section, then the whole file.
  const sections = src.split(/^## /m);
  const section = sections.find((s) => s.startsWith(lessonId));
  const find = (scope) => /\*\*Arabic support:\*\*[^\n]*/.exec(scope)?.[0];
  const line = (section && find(section)) || find(src);
  if (!line) return null;

  // The curriculum writes the level three ways, and all three are a real target:
  //   "~15%"  the usual case
  //   "0%"    the Stage-2/3 finales — no tilde, because zero is exact, not approximate
  //   "none"  the immersion units from B1 onward — semantically 0%
  // Requiring the tilde silently ungated every lesson written the other two ways
  // (Stage 2 Unit 12 alone is five lessons), which is the worst outcome for a gate:
  // it reports "no target" and passes rather than failing.
  if (/\bnone\b/i.test(line)) return 0;
  const m = /~?(\d+)\s*%/.exec(line);
  return m ? parseInt(m[1], 10) : null;
}

function lessons() {
  const root = path.join(REPO, "materials");
  const out = [];
  for (const s of fs
    .readdirSync(root)
    .filter((d) => /^stage\d+$/.test(d))
    .sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5)))) {
    const base = path.join(root, s);
    for (const u of fs
      .readdirSync(base)
      .filter((d) => /^unit\d+$/.test(d) && fs.statSync(path.join(base, d)).isDirectory())
      .sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4)))) {
      for (const f of fs
        .readdirSync(path.join(base, u))
        .filter((f) => /^s\d+-u\d+-l\d+\.md$/.test(f))
        .sort((a, b) => parseInt(a.match(/-l(\d+)\./)[1]) - parseInt(b.match(/-l(\d+)\./)[1]))) {
        out.push({
          stage: parseInt(s.slice(5)),
          id: f.replace(/\.md$/, ""),
          p: path.join(base, u, f),
        });
      }
    }
  }
  return out;
}

const rows = [];
for (const l of lessons()) {
  const md = fs.readFileSync(l.p, "utf8");
  const c = counts(explanationText(md));
  if (c === null) continue; // no explanation section (task/finale lessons)
  const cite = citation(md);
  const target = cite ? declaredTarget(cite.blueprint, cite.id) : null;
  rows.push({ ...l, measured: c.share, ar: c.ar, la: c.la, target });
}

let failures = 0;
const byStage = new Map();
for (const r of rows) {
  if (!byStage.has(r.stage)) byStage.set(r.stage, []);
  byStage.get(r.stage).push(r);
}

console.log(`Arabic share of student-visible explanation, against each lesson's blueprint target`);
console.log(`tolerance ±${TOLERANCE} points\n`);

for (const [stage, list] of [...byStage.entries()].sort((a, b) => a[0] - b[0])) {
  const grandfathered = GRANDFATHERED.has(stage);
  const mean = list.reduce((a, b) => a + b.measured, 0) / list.length;
  const targets = list.map((r) => r.target).filter((t) => t != null);
  const meanTarget = targets.length ? targets.reduce((a, b) => a + b, 0) / targets.length : null;

  console.log(
    `  stage${stage}  ${list.length} lesson(s)  mean ${mean.toFixed(1)}%` +
      (meanTarget != null ? `  ·  mean target ${meanTarget.toFixed(1)}%` : "") +
      (grandfathered ? `   [GRANDFATHERED — reported, not gated]` : ""),
  );

  for (const r of list) {
    if (r.target == null) {
      // An undiscoverable target is a FAILURE, not a note. This used to print a
      // "?" and pass, which is the worst behaviour a gate can have: a mistyped
      // citation, a renamed blueprint or a stage that declares its level once per
      // unit all became invisible, and the run still said PASS. Stage 0 stays
      // report-only along with the rest of its grandfathering.
      if (!grandfathered) failures++;
      console.log(
        `      ${grandfathered ? "·" : "✗"}  ${r.id}  ${r.measured.toFixed(1)}%  — NO TARGET FOUND. ` +
          `Its blueprint declares no "**Arabic support:**" level for this lesson or its unit, ` +
          `or the header cites the wrong blueprint. An unmeasured lesson must not pass silently.`,
      );
      continue;
    }
    const delta = r.measured - r.target;
    const ok = Math.abs(delta) <= TOLERANCE;
    if (!ok && !grandfathered) failures++;
    const mark = ok ? "✓" : grandfathered ? "·" : "✗";
    // The actionable part: how much Arabic to add or cut to land on target.
    // Without this an author oscillates around the number for several passes.
    let hint = "";
    if (!ok) {
      const wantAr = Math.round((r.target / 100) * r.la / (1 - r.target / 100));
      const d = wantAr - r.ar;
      hint =
        `  →  ${d >= 0 ? "ADD" : "CUT"} ~${Math.abs(d)} Arabic chars ` +
        `(~${Math.max(1, Math.round(Math.abs(d) / 4.6))} words)`;
    }
    console.log(
      `      ${mark}  ${r.id}  ${r.measured.toFixed(1)}%  target ${r.target}%  ` +
        `(${delta >= 0 ? "+" : ""}${delta.toFixed(1)})${hint}`,
    );
  }
  console.log("");
}

if (GRANDFATHERED.size) {
  console.log(
    `  Stage 0 is excluded from the gate deliberately: it measures below its declared\n` +
      `  target, but it is founder-approved, shipping, and already printed into both\n` +
      `  coursebook PDFs. Re-cutting 46 approved lessons is a content decision, not a\n` +
      `  lint fix. See materials/_style/lesson-anatomy.md §3a.\n`,
  );
}

if (REPORT_ONLY) {
  console.log(`report-only mode — not gating`);
  process.exit(0);
}
console.log(failures ? `FAIL  ${failures} lesson(s) outside tolerance` : `PASS  every gated lesson is on target`);
process.exit(failures ? 1 : 0);
