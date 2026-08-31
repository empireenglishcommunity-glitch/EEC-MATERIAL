#!/usr/bin/env node
/* ==========================================================================
 * Empire English — lesson-anatomy conformance check
 * --------------------------------------------------------------------------
 * Checks every finished lesson against materials/_style/lesson-anatomy.md §1
 * and materials/_style/empire-style-guide.md §2/§6.
 *
 * WHAT IT ENFORCES
 *   1. Header cites its blueprint, and the cited lesson ID matches the filename.
 *   2. The mandatory sections for the lesson's TYPE are present.
 *   3. Present sections appear in the canonical order.
 *   4. Each lesson carries a Teacher overlay with an "At a glance" block.
 *   5. Each lesson carries a record-yourself task and an Empire sign-off.
 *   6. Section labels use the canonical English label + Arabic sub-label.
 *
 * ON LESSON TYPES — why this is not one flat rule
 * lesson-anatomy.md originally said the 12-section anatomy was mandatory "no
 * exceptions". The authored corpus disagrees for good pedagogical reasons: the
 * orientation lesson teaches no language, unit-task lessons replace "Decode it"
 * with a performance checklist, and the stage finale is an assessment script.
 * Rather than let 14 of 55 lessons sit in permanent violation of their own
 * standard, the types below are recognised explicitly — which keeps the check
 * meaningful for the 41 teaching lessons instead of being ignored by everyone.
 *
 * Usage: node check-lesson-anatomy.mjs [--verbose]
 * Exit 1 if any lesson fails.
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const VERBOSE = process.argv.includes("--verbose");

// Canonical section order, with the Arabic sub-labels each section is allowed
// to carry. A lesson may always append a parenthetical qualifier, e.g.
// "هدفك (milestone)" or "القاعدة (have / has)".
//
// Several sections have MORE THAN ONE accepted Arabic label, because the corpus
// uses a coherent alternative vocabulary in non-teaching lessons: a unit-task
// lesson shows "النموذج" (the model) rather than "اسمع وشوف", runs an Accent
// "عيادة" (clinic) rather than a "معمل" (lab), and calls Your Turn "التسجيل"
// (the recording). A pronunciation lesson explains "الطريقة" (the method)
// rather than "القاعدة" (the rule) — because it is teaching articulation, not
// grammar. These are listed rather than exempted so the vocabulary stays
// deliberate and a genuinely new label still fails the check.
// An accepted label must appear either bare or followed by a parenthetical, so
// "هدفك" and "هدفك (milestone)" pass but a silently reworded "الهدف بتاعك" or a
// creeping "هدفك من الدرس" does not.
const CANON = [
  { label: "Your Conquest", ar: ["هدفك"] },
  { label: "Why this matters", ar: ["ليه ده مهم"] },
  { label: "Warm-up", ar: ["سخّن"] },
  { label: "Watch & Listen", ar: ["اسمع وشوف", "اسمع", "النموذج"] },
  { label: "Decode it", ar: ["القاعدة", "الطريقة", "طقم النجاة", "إزاي بقّك بيعمل الصوت"] },
  { label: "Your Arsenal", ar: ["ذخيرتك"] },
  { label: "Accent Lab", ar: ["معمل النطق", "عيادة النطق"] },
  { label: "Train", ar: ["تدرّب", "البروفة الكاملة"] },
  { label: "Your Turn", ar: ["دورك", "التسجيل"] },
  { label: "Your Orders", ar: ["مهمتك"] },
  { label: "Remember", ar: ["افتكر"] },
  { label: "Self-check", ar: ["صحّح لنفسك", "Unit \\d+ mini-quiz"] },
];

/** True when `arPart` is an accepted label, bare or with a parenthetical qualifier. */
function labelOk(arPart, accepted) {
  return accepted.some((a) => new RegExp(`^${a}(\\s*\\(.*\\))?$`, "u").test(arPart));
}

const TEACHING = ["Your Conquest", "Watch & Listen", "Decode it", "Accent Lab", "Your Turn", "Your Orders", "Self-check"];

const MUST = {
  teaching: TEACHING,
  "unit-task": ["Your Conquest", "Watch & Listen", "Accent Lab", "Your Turn", "Your Orders", "Self-check"],
  review: ["Your Conquest", "Your Turn", "Your Orders", "Self-check"],
  orientation: ["Your Conquest", "Your Turn", "Your Orders"],
  "stage-finale": ["Your Conquest"],
};

/**
 * Per-stage exceptions to the default rules. Everything not listed here follows
 * the defaults: a lesson ending `-l05` is that unit's speaking task, anything
 * else is a teaching lesson.
 *
 * Only add a stage's entry once that stage's consolidation unit is authored —
 * guessing its shape in advance is how a checker ends up enforcing a rule the
 * content was never written to.
 */
const STAGE_RULES = {
  0: {
    orientation: ["s0-u0-l01"], // teaches no language: commitment and first sounds
    "stage-finale": ["s0-u10-l05"], // assessment script + graduation recording
    review: ["s0-u10-l01", "s0-u10-l02", "s0-u10-l04"], // consolidation across ten units
  },
  1: {
    "stage-finale": ["s1-u10-l05"], // A2 summative + separate standard milestone sample
    review: ["s1-u10-l01", "s1-u10-l02", "s1-u10-l04"], // retrieval reviews + full mock
  },
  2: {
    "stage-finale": ["s2-u12-l05"], // B1 summative + separate standard milestone sample
    review: ["s2-u12-l01", "s2-u12-l02", "s2-u12-l03", "s2-u12-l04"], // retrieval, clinic, mock
  },
  3: {
    "stage-finale": ["s3-u12-l05"], // B2 flagship benchmark + separate graduation sample
    review: ["s3-u12-l01", "s3-u12-l02", "s3-u12-l03", "s3-u12-l04"], // retrieval x2, clinic, full mock
  },
};

/** Lesson types, most specific first. */
function lessonType(id) {
  const stage = parseInt(/^s(\d+)-/.exec(id)?.[1] ?? "-1", 10);
  const rules = STAGE_RULES[stage] ?? {};
  for (const [type, ids] of Object.entries(rules)) {
    if (ids.includes(id)) return { type, must: MUST[type] };
  }
  if (/-l05$/.test(id)) return { type: "unit-task", must: MUST["unit-task"] };
  return { type: "teaching", must: MUST.teaching };
}

/** Every authored lesson across every stage that has a materials/ directory. */
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
        out.push({ id: f.replace(/\.md$/, ""), p: path.join(base, u, f) });
      }
    }
  }
  return out;
}

let failures = 0;
const report = [];

for (const { id, p } of lessons()) {
  const md = fs.readFileSync(p, "utf8");
  const { type, must } = lessonType(id);
  const problems = [];

  // 1. blueprint citation
  const cite = /Built from: `(curriculum\/[^`]+)` · \*\*([A-Z0-9-]+)\*\*/.exec(md);
  if (!cite) problems.push("no blueprint citation in the header");
  else {
    if (cite[2].toLowerCase() !== id) problems.push(`cited ID ${cite[2]} does not match filename ${id}`);
    if (!fs.existsSync(path.join(REPO, cite[1]))) problems.push(`cited blueprint does not exist: ${cite[1]}`);
  }

  // 2 + 3. sections present, and in canonical order
  const heads = md
    .split("\n")
    .filter((l) => /^##\s/.test(l))
    .map((l) => l.replace(/^##\s*/, "").trim());
  const positions = [];
  for (const [i, sec] of CANON.entries()) {
    const at = heads.findIndex((h) => h.includes(sec.label));
    if (at === -1) {
      if (must.includes(sec.label)) problems.push(`missing mandatory section for a ${type} lesson: ${sec.label}`);
      continue;
    }
    positions.push({ canon: i, at, sec, head: heads[at] });
  }
  for (let i = 1; i < positions.length; i++) {
    if (positions[i].at < positions[i - 1].at)
      problems.push(`section out of order: ${positions[i].sec.label} appears before ${positions[i - 1].sec.label}`);
  }

  // 6. Arabic sub-label on each present section
  for (const { sec, head } of positions) {
    if (!head.includes("—")) {
      problems.push(`section "${sec.label}" has no "— Arabic" sub-label`);
      continue;
    }
    const arPart = head.split("—").slice(1).join("—").trim();
    if (!labelOk(arPart, sec.ar))
      problems.push(
        `section "${sec.label}" sub-label is "${arPart}", expected one of: ${sec.ar.map((a) => `"${a}"`).join(", ")}` +
          ` (bare, or followed by a parenthetical)`,
      );
  }

  // 6a. No mixed-script section labels.
  //
  // A single wrong-script character inside a heading — a Latin "t" inside
  // "افتكر", an Arabic "م" inside "Warm-up" — is invisible to checks 2, 3 and 6
  // above, because those find a section with `head.includes(label)`. A corrupted
  // label simply does not match, so the section is treated as ABSENT: it is
  // reported only if it happens to be mandatory, and silently ignored otherwise.
  // Every non-mandatory section (Warm-up, Your Arsenal, Train, Remember) can
  // therefore be corrupted while the lesson still reports as conforming — which
  // is exactly how four of these shipped past a "145/145 conforming" run.
  // Adjacent Latin and Arabic characters never occur legitimately: the corpus
  // always separates the two scripts with a space, an em dash or punctuation.
  for (const head of heads) {
    const bad = /[A-Za-z][\u0600-\u06FF]|[\u0600-\u06FF][A-Za-z]/.exec(head);
    if (bad)
      problems.push(
        `mixed-script section label — a Latin and an Arabic character are adjacent in "${head}"` +
          ` (near "${bad[0]}"). One of them is a typo, and it makes the section invisible to this check.`,
      );
  }

  // 4. teacher overlay
  const teacherBlocks = (md.match(/^>\s*\[!TEACHER\]/gm) || []).length;
  if (!teacherBlocks) problems.push("no Teacher overlay blocks");
  if (!/At a glance/i.test(md)) problems.push('no "At a glance" block in the Teacher overlay');

  // 5. record task + sign-off
  if (!/🎙️|🎧|🎬/.test(md)) problems.push("no record-yourself task marker");
  if (!/Empire English 👑/.test(md)) problems.push("no Empire sign-off");

  if (problems.length) {
    failures++;
    report.push({ id, type, problems });
  } else if (VERBOSE) {
    report.push({ id, type, problems: [] });
  }
}

const all = lessons();
console.log(`lessons checked: ${all.length}`);
console.log(`conforming: ${all.length - failures} · failing: ${failures}`);
for (const r of report) {
  if (!r.problems.length) {
    console.log(`  ✓ ${r.id} (${r.type})`);
    continue;
  }
  console.log(`\n  ✗ ${r.id} (${r.type})`);
  for (const p of r.problems) console.log(`      - ${p}`);
}
process.exit(failures ? 1 : 0);
