#!/usr/bin/env node
/* ==========================================================================
 * Empire English — Stage-0 glossary generator
 * --------------------------------------------------------------------------
 * Builds `materials/stage0/stage0-glossary.md` from the **Your Arsenal**
 * vocabulary tables inside the 55 finished lessons.
 *
 * WHY IT IS GENERATED, NOT WRITTEN
 * A hand-written glossary is a second copy of the vocabulary, and a second copy
 * drifts: rewording a lesson's Arsenal row would silently leave the glossary
 * teaching something the lesson no longer says. Deriving it means the glossary
 * cannot disagree with the lessons — and it makes the count honest, because the
 * entries are whatever the lessons actually teach.
 *
 * Ordered by unit and lesson, which is revision order for a learner working
 * through the book. Deliberately NOT alphabetised: many rows are grouped sets
 * ("bank / pharmacy / hospital" glossed "بنك / صيدلية / مستشفى"), and splitting
 * them to sort would risk pairing an English word with the wrong Arabic gloss.
 *
 * Usage:
 *   node generate-stage0-glossary.mjs           # write the glossary
 *   node generate-stage0-glossary.mjs --check   # verify only; exit 1 on drift
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const BASE = path.join(REPO, "materials", "stage0");
const OUT = path.join(BASE, "stage0-glossary.md");
const CHECK = process.argv.includes("--check");

const UNIT_TITLES = {
  0: "Welcome & Sounds",
  1: "Introducing Yourself",
  2: "Family & People",
  3: "My Things & Places",
  4: "Daily Routine",
  5: "Free Time & Ability",
  6: "Food & Shopping",
  7: "Describing People & Things",
  8: "Places & Directions",
  9: "Happening Now",
  10: "Putting It Together",
};

/** Pull the rows of the `Your Arsenal` table out of one lesson. */
function arsenalRows(md) {
  const m = /^## .*Your Arsenal[^\n]*\n([\s\S]*?)(?=\n## |\n---)/m.exec(md);
  if (!m) return [];
  const rows = [];
  for (const line of m[1].split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    const cells = t
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 2) continue;
    if (/^:?-{2,}/.test(cells[0])) continue; // separator row
    // Header rows: the lessons use "English | بالعربي | Example" and, in the
    // Unit-10 review tables, "Topic (Unit) | Frame".
    if (/^(English|Topic \(Unit\)|Function \(Unit\))$/i.test(cells[0])) continue;
    rows.push(cells);
  }
  return rows;
}

function collect() {
  const units = [];
  for (const dir of fs
    .readdirSync(BASE)
    .filter((d) => /^unit\d+$/.test(d) && fs.statSync(path.join(BASE, d)).isDirectory())
    .sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4)))) {
    const num = parseInt(dir.slice(4));
    const entries = [];
    for (const f of fs
      .readdirSync(path.join(BASE, dir))
      .filter((f) => /^s0-u\d+-l\d+\.md$/.test(f))
      .sort((a, b) => parseInt(a.match(/-l(\d+)\./)[1]) - parseInt(b.match(/-l(\d+)\./)[1]))) {
      const lesson = f.match(/-l(\d+)\./)[1];
      for (const r of arsenalRows(fs.readFileSync(path.join(BASE, dir, f), "utf8"))) {
        entries.push({ lesson, en: r[0], ar: r[1] ?? "", ex: r[2] ?? "" });
      }
    }
    if (entries.length) units.push({ num, entries });
  }
  return units;
}

function render(units) {
  const total = units.reduce((n, u) => n + u.entries.length, 0);
  const L = [];
  L.push(`# 🗡️ Stage 0 — Glossary`);
  L.push(``);
  L.push(`**Empire English** · Stage 0 — **Recruit** (Pre-A1 → A1) · **${total} entries**`);
  L.push(`*Generated from the **Your Arsenal** tables of all 55 Stage-0 lessons by*`);
  L.push(`*\`tools/audit/generate-stage0-glossary.mjs\` — do not edit by hand.*`);
  L.push(``);
  L.push(`> ذخيرتك كلها في مكان واحد. الترتيب بالوحدة والدرس، عشان تراجع بنفس ترتيب الكتاب.`);
  L.push(``);
  L.push(
    `Every word here is taught somewhere in the book, and the lesson it comes from is named, so you can` +
      ` go back to the explanation rather than memorising a list out of context.`,
  );
  L.push(``);
  L.push(`---`);
  L.push(``);
  L.push(`## Contents`);
  L.push(``);
  for (const u of units) {
    L.push(`- **Unit ${u.num} — ${UNIT_TITLES[u.num] ?? ""}** · ${u.entries.length} entries`);
  }
  L.push(``);
  L.push(`---`);

  for (const u of units) {
    L.push(``);
    L.push(`## Unit ${u.num} — ${UNIT_TITLES[u.num] ?? ""}`);
    L.push(``);
    L.push(`| Lesson | English | بالعربي | Example |`);
    L.push(`|---|---|---|---|`);
    for (const e of u.entries) {
      L.push(`| L${e.lesson} | ${e.en} | ${e.ar} | ${e.ex} |`);
    }
  }

  L.push(``);
  L.push(`---`);
  L.push(``);
  L.push(`*Empire English 👑 · Stage 0 — Foundations · لبنة كل يوم.*`);
  return L.join("\n") + "\n";
}

const units = collect();
const next = render(units);
const total = units.reduce((n, u) => n + u.entries.length, 0);

if (CHECK) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current === next) {
    console.log(`✓ Stage-0 glossary is in sync with the lessons (${total} entries)`);
    process.exit(0);
  }
  console.error(`✗ Stage-0 glossary is STALE — materials/stage0/stage0-glossary.md does not match the lessons`);
  console.error(`  fix: node tools/audit/generate-stage0-glossary.mjs`);
  process.exit(1);
}

fs.writeFileSync(OUT, next);
console.log(`✓ wrote ${path.relative(REPO, OUT)} — ${total} entries across ${units.length} units`);
