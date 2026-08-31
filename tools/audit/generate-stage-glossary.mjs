#!/usr/bin/env node
/* ========================================================================== 
 * Empire English — stage glossary generator
 * --------------------------------------------------------------------------
 * Builds `materials/stageN/stageN-glossary.md` from the **Your Arsenal**
 * tables in that stage's finished lessons.
 *
 * Stage 0 deliberately keeps its legacy positional parser and exact rendered
 * bytes: its 128-entry glossary is already approved and embedded in the live
 * portal. Stage 1 uses header-aware parsing because its Arsenal sections also
 * contain pronunciation, rule, and functional-language tables. Unknown Stage-1
 * schemas fail closed instead of silently putting English in the Arabic column.
 *
 * Usage:
 *   node generate-stage-glossary.mjs --stage 0
 *   node generate-stage-glossary.mjs --stage 1 --check
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");

const STAGES = {
  0: {
    title: "Stage 0",
    rank: "Recruit",
    cefr: "Pre-A1 → A1",
    lessonCount: 55,
    unitCount: 11,
    generatedBy: "tools/audit/generate-stage0-glossary.mjs",
    arabicIntro: "ذخيرتك كلها في مكان واحد. الترتيب بالوحدة والدرس، عشان تراجع بنفس ترتيب الكتاب.",
    footer: "*Empire English 👑 · Stage 0 — Foundations · لبنة كل يوم.*",
    unitTitles: {
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
    },
  },
  1: {
    title: "Stage 1",
    rank: "Citizen",
    cefr: "A2",
    lessonCount: 50,
    unitCount: 10,
    generatedBy: "tools/audit/generate-stage-glossary.mjs --stage 1",
    arabicIntro: "ذخيرتك في المرحلة كلها، مرتبة بنفس ترتيب الوحدات والدروس عشان ترجع للسياق مش تحفظ قايمة.",
    footer: "*Empire English 👑 · Stage 1 — Elementary · من دراسة الإنجليزي لاستخدامه.*",
    unitTitles: {
      1: "The Past (1) — Was & Were",
      2: "The Past (2) — Regular Verbs",
      3: "The Past (3) — Irregular Verbs & Questions",
      4: "Future Plans",
      5: "Making Comparisons",
      6: "Food, Quantity & Restaurants",
      7: "Health & Advice",
      8: "Travel & Transport",
      9: "People, Feelings & Everyday Situations",
      10: "Putting It Together (A2)",
    },
  },
};

function tableCells(line) {
  return line
    .trim()
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function arsenalTable(md) {
  const match = /^## .*Your Arsenal[^\n]*\n([\s\S]*?)(?=\n## |\n---)/m.exec(md);
  if (!match) return null;
  const rows = match[1]
    .split("\n")
    .filter((line) => line.trim().startsWith("|"))
    .map(tableCells)
    .filter((cells) => cells.length >= 2);
  if (!rows.length) return null;
  const data = rows.filter((cells) => !/^:?-{2,}/.test(cells[0]));
  return data.length ? { header: data[0], rows: data.slice(1) } : null;
}

/** Preserve the original Stage-0 parser's positional behaviour exactly. */
function legacyStage0Rows(md) {
  const match = /^## .*Your Arsenal[^\n]*\n([\s\S]*?)(?=\n## |\n---)/m.exec(md);
  if (!match) return [];
  const rows = [];
  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|")) continue;
    const cells = tableCells(trimmed);
    if (cells.length < 2 || /^:?-{2,}/.test(cells[0])) continue;
    if (/^(English|Topic \(Unit\)|Function \(Unit\))$/i.test(cells[0])) continue;
    rows.push({ en: cells[0], ar: cells[1] ?? "", ex: cells[2] ?? "" });
  }
  return rows;
}

function schemaKey(header) {
  return header.map((cell) => cell.replace(/\*+/g, "").trim().toLowerCase()).join("|");
}

/** Normalize every authored Stage-1 Arsenal schema into the glossary columns. */
function stage1Rows(md, source) {
  const table = arsenalTable(md);
  if (!table) return [];
  const key = schemaKey(table.header);
  const rows = table.rows;

  if (key === "english|بالعربي|example") {
    return rows.map((r) => ({ en: r[0] ?? "", ar: r[1] ?? "", ex: r[2] ?? "" }));
  }
  if (key === "rule|english|بالعربي|example") {
    return rows.map((r) => ({ en: r[1] ?? "", ar: r[2] ?? "", ex: r[3] ?? "" }));
  }
  if (key === "group|sound|verbs") {
    return rows.map((r) => ({ en: r[2] ?? "", ar: "", ex: `${r[0] ?? ""}: ${r[1] ?? ""}` }));
  }
  if (key === "job|language") {
    return rows.map((r) => ({ en: r[1] ?? "", ar: "", ex: r[0] ?? "" }));
  }
  if (key === "move|frame") {
    return rows.map((r) => ({ en: r[1] ?? "", ar: "", ex: r[0] ?? "" }));
  }
  if (key === "when you notice…|do this") {
    return rows.map((r) => ({ en: r[1] ?? "", ar: "", ex: r[0] ?? "" }));
  }

  throw new Error(`Unknown Your Arsenal table schema in ${source}: ${table.header.join(" | ")}`);
}

function collect(stage, config) {
  const base = path.join(REPO, "materials", `stage${stage}`);
  const unitDirs = fs
    .readdirSync(base)
    .filter((dir) => /^unit\d+$/.test(dir) && fs.statSync(path.join(base, dir)).isDirectory())
    .sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4)));

  if (unitDirs.length !== config.unitCount) {
    throw new Error(`Stage ${stage}: expected ${config.unitCount} unit directories, found ${unitDirs.length}`);
  }

  const units = [];
  let discoveredLessons = 0;
  for (const dir of unitDirs) {
    const unit = parseInt(dir.slice(4));
    const lessonPattern = new RegExp(`^s${stage}-u${unit}-l\\d+\\.md$`);
    const lessonFiles = fs
      .readdirSync(path.join(base, dir))
      .filter((file) => lessonPattern.test(file))
      .sort((a, b) => parseInt(a.match(/-l(\d+)\./)[1]) - parseInt(b.match(/-l(\d+)\./)[1]));
    discoveredLessons += lessonFiles.length;

    const entries = [];
    for (const file of lessonFiles) {
      const lesson = file.match(/-l(\d+)\./)[1];
      const relative = path.join("materials", `stage${stage}`, dir, file);
      const md = fs.readFileSync(path.join(base, dir, file), "utf8");
      const rows = stage === 0 ? legacyStage0Rows(md) : stage1Rows(md, relative);
      for (const row of rows) entries.push({ lesson, ...row });
    }
    if (entries.length) units.push({ num: unit, entries });
  }

  if (discoveredLessons !== config.lessonCount) {
    throw new Error(`Stage ${stage}: expected ${config.lessonCount} lessons, found ${discoveredLessons}`);
  }
  return units;
}

function render(stage, config, units) {
  const total = units.reduce((sum, unit) => sum + unit.entries.length, 0);
  const lines = [];
  lines.push(`# 🗡️ Stage ${stage} — Glossary`);
  lines.push("");
  lines.push(`**Empire English** · Stage ${stage} — **${config.rank}** (${config.cefr}) · **${total} entries**`);
  lines.push(`*Generated from the **Your Arsenal** tables of all ${config.lessonCount} Stage-${stage} lessons by*`);
  lines.push(`*\`${config.generatedBy}\` — do not edit by hand.*`);
  lines.push("");
  lines.push(`> ${config.arabicIntro}`);
  lines.push("");
  lines.push(
    `Every word here is taught somewhere in the book, and the lesson it comes from is named, so you can` +
      ` go back to the explanation rather than memorising a list out of context.`,
  );
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Contents");
  lines.push("");
  for (const unit of units) {
    lines.push(`- **Unit ${unit.num} — ${config.unitTitles[unit.num] ?? ""}** · ${unit.entries.length} entries`);
  }
  lines.push("");
  lines.push("---");

  for (const unit of units) {
    lines.push("");
    lines.push(`## Unit ${unit.num} — ${config.unitTitles[unit.num] ?? ""}`);
    lines.push("");
    lines.push("| Lesson | English | بالعربي | Example |");
    lines.push("|---|---|---|---|");
    for (const entry of unit.entries) {
      lines.push(`| L${entry.lesson} | ${entry.en} | ${entry.ar} | ${entry.ex} |`);
    }
  }

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(config.footer);
  return `${lines.join("\n")}\n`;
}

export function runGlossaryGenerator(stage, { check = process.argv.includes("--check") } = {}) {
  const config = STAGES[stage];
  if (!config) throw new Error(`Unsupported stage: ${stage}. Supported stages: ${Object.keys(STAGES).join(", ")}`);
  const base = path.join(REPO, "materials", `stage${stage}`);
  const out = path.join(base, `stage${stage}-glossary.md`);
  const units = collect(stage, config);
  const next = render(stage, config, units);
  const total = units.reduce((sum, unit) => sum + unit.entries.length, 0);

  if (check) {
    const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
    if (current === next) {
      console.log(`✓ Stage-${stage} glossary is in sync with the lessons (${total} entries)`);
      return;
    }
    console.error(`✗ Stage-${stage} glossary is STALE — materials/stage${stage}/stage${stage}-glossary.md does not match the lessons`);
    console.error(`  fix: node tools/audit/generate-stage-glossary.mjs --stage ${stage}`);
    process.exitCode = 1;
    return;
  }

  fs.writeFileSync(out, next);
  console.log(`✓ wrote ${path.relative(REPO, out)} — ${total} entries across ${units.length} units`);
}

function stageArgument() {
  const index = process.argv.indexOf("--stage");
  if (index < 0 || !process.argv[index + 1]) throw new Error("Missing required --stage 0|1 argument");
  return parseInt(process.argv[index + 1], 10);
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  try {
    runGlossaryGenerator(stageArgument());
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
}
