#!/usr/bin/env node
/* ==========================================================================
 * Empire English — full-immersion check
 * --------------------------------------------------------------------------
 * When a blueprint declares "**Arabic support:** none" (or 0%), the lesson must
 * actually be in English. This asserts that.
 *
 * WHY THIS EXISTS AS A SEPARATE GATE
 * measure-arabic-dial.mjs answers "is the lesson at its declared level?" and it
 * answers it well — but only over "Decode it" and "Why this matters", with
 * table rows stripped. That scope is correct FOR THE DIAL: vocabulary tables are
 * English by design at every stage, so counting them would measure the
 * curriculum rather than the support level.
 *
 * The cost of that scope is a blind spot, and Stage 3 walked straight into it.
 * Thirty of its sixty lessons shipped with an "| English | بالعربي | Example |"
 * gloss column in Your Arsenal — 3,326 Arabic characters inside a stage whose
 * blueprint declares immersion in all twelve units and whose own front matter
 * promises "zero, in every unit". The dial reported all sixty lessons at
 * 0.4-0.6% and PASSED, correctly, because it never looks at table rows.
 *
 * So this gate uses the opposite scope on purpose: at 0% it looks at the WHOLE
 * student-visible page and allows Arabic in exactly one place.
 *
 * WHAT IS ALLOWED AT 0%
 *   Section headings only — "## 🎯 Your Conquest — هدفك". The Arabic sub-labels
 *   are the navigational furniture of the book, identical in every lesson of
 *   every stage, and check-lesson-anatomy.mjs enforces them by name. A learner
 *   finds "Decode it" by its icon and its Arabic label; removing those would
 *   break the book's structure, not its immersion.
 *
 * Anything else — a gloss column, a reassurance line, a mindset aside — is
 * Arabic support, and at 0% there is none.
 *
 * Usage: node check-immersion.mjs [--verbose]
 * Exit 1 if any immersion lesson contains Arabic outside a section heading.
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { citation, declaredTarget, lessons, REPO } from "./arabic-target.mjs";

const VERBOSE = process.argv.includes("--verbose");
const ARABIC = /[\u0600-\u06FF]/;

/** A markdown section heading, the one place Arabic is allowed at 0%. */
const isHeading = (line) => /^#{1,6}\s/.test(line);

let checked = 0;
let failures = 0;
let undeclared = 0;
const report = [];

for (const l of lessons()) {
  const md = fs.readFileSync(l.p, "utf8");
  const cite = citation(md);
  const target = cite ? declaredTarget(cite.blueprint, cite.id) : null;

  // A missing target is the dial's problem to fail on, not this gate's — it
  // already does, loudly. Counting it here too would just double the noise.
  if (target === null) {
    undeclared++;
    continue;
  }
  if (target !== 0) continue;

  checked++;
  const offenders = [];
  md.split("\n").forEach((line, i) => {
    if (!ARABIC.test(line) || isHeading(line)) return;
    offenders.push({ n: i + 1, text: line.trim() });
  });

  if (offenders.length) {
    failures++;
    report.push({ id: l.id, rel: path.relative(REPO, l.p), offenders });
  } else if (VERBOSE) {
    report.push({ id: l.id, rel: path.relative(REPO, l.p), offenders: [] });
  }
}

console.log(`Full-immersion check — lessons whose blueprint declares 0% / none`);
console.log("");
console.log(`immersion lessons: ${checked} · clean: ${checked - failures} · failing: ${failures}`);
if (undeclared) console.log(`(${undeclared} lessons declare no level; measure-arabic-dial.mjs fails on those)`);

for (const r of report) {
  if (!r.offenders.length) {
    console.log(`  ✓ ${r.id}`);
    continue;
  }
  console.log("");
  console.log(`  ✗ ${r.id} — ${r.offenders.length} line(s) with Arabic outside a section heading`);
  for (const o of r.offenders.slice(0, 6)) {
    console.log(`      ${r.rel}:${o.n}  ${o.text.slice(0, 96)}${o.text.length > 96 ? "…" : ""}`);
  }
  if (r.offenders.length > 6) console.log(`      … and ${r.offenders.length - 6} more`);
}

console.log("");
if (failures) {
  console.log(`FAIL  ${failures} immersion lesson(s) contain Arabic support`);
  console.log(`      At 0% the only Arabic permitted is the section sub-labels, which are`);
  console.log(`      structural and enforced by check-lesson-anatomy.mjs. A gloss column,`);
  console.log(`      an aside or a reassurance line is support, and this stage declares none.`);
  process.exit(1);
}
console.log(`PASS  every immersion lesson is English outside its section labels`);
