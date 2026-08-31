#!/usr/bin/env node
/* ==========================================================================
 * Empire English — quiz integrity check
 * --------------------------------------------------------------------------
 * Two properties, both of which have been violated in shipped content:
 *
 *   1. ROTATION IS LOSSLESS. The options a learner sees must be a permutation
 *      of the authored options, and the option at the graded position must be
 *      the authored correct answer. A rotation bug here would silently mark
 *      correct answers wrong for every learner, on every stage, with no error.
 *
 *   2. NO POSITIONAL TELL. "Always pick option N" must not beat chance by much.
 *      Before the rotation existed, the committed banks scored 100% (Stage 2)
 *      and 98% (Stage 1) against "always pick the first option", so the quizzes
 *      could be completed without reading any English — while still feeding the
 *      review queue and the stage determination as if they were evidence.
 *
 * Reads the TypeScript item bank directly rather than importing it, so the check
 * needs no build step and cannot be fooled by a stale one.
 *
 * Usage: node check-quiz-integrity.mjs [--verbose]
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const VERBOSE = process.argv.includes("--verbose");
const SRC = path.join(REPO, "web", "src", "content", "quizzes.ts");

/** Mirrors correctDisplayIndex() in quizzes.ts. Kept in step by property 1. */
function hashId(id) {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

const src = fs.readFileSync(SRC, "utf8");

/**
 * Pull every q("id", "prompt", [...options], answer) call out of the bank.
 * Brace/bracket aware, because prompts and options legitimately contain commas,
 * quotes, escaped quotes and parentheses.
 */
/** The unit key whose block a given offset falls inside ("u0", "s2-u1", …). */
function unitKeyAt(text, offset) {
  const re = /^\s{2}"?((?:s\d+-)?u\d+)"?:\s*\{/gm;
  let key = "?";
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > offset) break;
    key = m[1];
  }
  return key;
}

function parseItems(text) {
  const items = [];
  let i = 0;
  while ((i = text.indexOf("q(", i)) !== -1) {
    // must be a call, not part of a longer identifier
    if (/[A-Za-z0-9_$]/.test(text[i - 1] ?? "")) {
      i += 2;
      continue;
    }
    let depth = 0;
    let j = i + 1;
    let inStr = null;
    for (; j < text.length; j++) {
      const c = text[j];
      if (inStr) {
        if (c === "\\") j++;
        else if (c === inStr) inStr = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") inStr = c;
      else if (c === "(" || c === "[") depth++;
      else if (c === ")" || c === "]") {
        depth--;
        if (depth === 0) break;
      }
    }
    const call = text.slice(i, j + 1);
    i = j + 1;

    // The answer is the final top-level argument.
    const answerMatch = /,\s*(\d+)\s*\)$/.exec(call);
    const idMatch = /^q\(\s*"([^"]+)"/.exec(call);
    const optsStart = call.indexOf("[");
    const optsEnd = call.lastIndexOf("]");
    if (!answerMatch || !idMatch || optsStart === -1) continue;

    // Count top-level option STRING LITERALS.
    //
    // Not "top-level commas + 1", which is the obvious version and is wrong: the
    // multi-line option arrays in this bank carry a trailing comma after the last
    // option, so commas+1 reads a 3-option item as a 4-option item. That inflated
    // arity feeds `hash % n` and produces a display index the app never uses — so
    // the check computed the wrong expected position for 64 items and still
    // reported PASS. It was caught only by grading real submissions through the
    // live API. Count the strings; they cannot be off by a trailing separator.
    const optsBody = call.slice(optsStart + 1, optsEnd);
    let optCount = 0;
    let d = 0;
    let s = null;
    for (let k = 0; k < optsBody.length; k++) {
      const c = optsBody[k];
      if (s) {
        if (c === "\\") k++;
        else if (c === s) s = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        s = c;
        if (d === 0) optCount++;
      } else if (c === "[" || c === "(") d++;
      else if (c === "]" || c === ")") d--;
    }
    items.push({
      unit: unitKeyAt(text, i),
      id: idMatch[1],
      options: optCount,
      answer: parseInt(answerMatch[1], 10),
    });
  }
  return items;
}

const items = parseItems(src);

// --json exists so the end-to-end API test can drive itself from THIS parser
// rather than growing a second one that would drift from it.
if (process.argv.includes("--json")) {
  console.log(JSON.stringify(items.map((it) => ({ ...it, displayed: hashId(it.id) % it.options }))));
  process.exit(0);
}

let failures = 0;

console.log(`quiz items parsed: ${items.length}`);
if (items.length < 100) {
  console.error(`✗ parsed only ${items.length} items — the parser is broken, refusing to report a pass`);
  process.exit(1);
}

// ---- property 1: the rotation is a lossless permutation ----
let permutationProblems = 0;
for (const it of items) {
  const n = it.options;
  if (!(n >= 2)) {
    console.error(`  ✗ ${it.id}: ${n} options`);
    permutationProblems++;
    continue;
  }
  if (it.answer < 0 || it.answer >= n) {
    console.error(`  ✗ ${it.id}: answer index ${it.answer} out of range for ${n} options`);
    permutationProblems++;
    continue;
  }
  const t = hashId(it.id) % n;
  // display[i] = options[(answer + i - t + n*n) % n]
  const mapped = Array.from({ length: n }, (_, i) => (it.answer + i - t + n * n) % n);
  const distinct = new Set(mapped);
  if (distinct.size !== n) {
    console.error(`  ✗ ${it.id}: rotation is not a permutation (${[...mapped].join(",")})`);
    permutationProblems++;
    continue;
  }
  if (mapped[t] !== it.answer) {
    console.error(`  ✗ ${it.id}: graded position ${t} maps to option ${mapped[t]}, not the answer ${it.answer}`);
    permutationProblems++;
  }
}
if (permutationProblems) failures += permutationProblems;
console.log(`rotation is a lossless permutation for ${items.length - permutationProblems}/${items.length} items`);

// ---- property 2: no positional tell, before and after rotation ----
function distribution(positions, arity) {
  const counts = new Array(arity).fill(0);
  for (const p of positions) counts[p]++;
  return counts;
}

const byArity = new Map();
for (const it of items) {
  if (!byArity.has(it.options)) byArity.set(it.options, []);
  byArity.get(it.options).push(it);
}

console.log("");
for (const [arity, group] of [...byArity.entries()].sort((a, b) => a[0] - b[0])) {
  const authored = distribution(group.map((it) => it.answer), arity);
  const displayed = distribution(group.map((it) => hashId(it.id) % arity), arity);
  const chance = 100 / arity;
  const worstAuthored = (Math.max(...authored) / group.length) * 100;
  const worstDisplayed = (Math.max(...displayed) / group.length) * 100;

  console.log(`${arity}-option items (${group.length}):`);
  console.log(`  authored positions  ${authored.join(" / ")}   best fixed guess ${worstAuthored.toFixed(0)}%`);
  console.log(`  displayed positions ${displayed.join(" / ")}   best fixed guess ${worstDisplayed.toFixed(0)}%  (chance ${chance.toFixed(0)}%)`);

  // Allow generous slack: with ~60-140 items a hash will not be perfectly flat.
  const limit = chance + 15;
  if (worstDisplayed > limit) {
    console.error(
      `  ✗ a fixed guess still scores ${worstDisplayed.toFixed(0)}% on ${arity}-option items ` +
        `(limit ${limit.toFixed(0)}%) — the positional tell is not gone`,
    );
    failures++;
  }
  if (VERBOSE) {
    for (const it of group) console.log(`      ${it.id}  authored ${it.answer} -> displayed ${hashId(it.id) % arity}`);
  }
}

console.log("");
if (failures) {
  console.log(`FAIL  quiz integrity: ${failures} problem(s)`);
  process.exit(1);
}
console.log(`PASS  rotation is lossless, and no fixed option position beats chance by more than 15 points`);
