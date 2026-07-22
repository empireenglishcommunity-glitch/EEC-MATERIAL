#!/usr/bin/env node
/* ==========================================================================
 * Empire English — Coursebook PDF generator
 * --------------------------------------------------------------------------
 * One markdown source  ->  two branded, send-ready PDF editions:
 *   - Student's Edition  (Teacher overlay `> [!TEACHER]` blocks stripped)
 *   - Teacher's Edition  (overlay rendered as gold callouts)
 *
 * Engine: marked (md->HTML) + puppeteer (HTML->PDF via headless Chromium),
 * chosen because the content is bilingual (RTL Arabic + LTR English) and a
 * browser lays out bidirectional text natively. Brand CSS lives in book.css.
 *
 * Usage:
 *   node build-book.mjs [--stage 0] [--edition student|teacher|both] [--unit N]
 * Output: web/public/coursebook/eec-stage<N>-<edition>.pdf
 * ========================================================================== */

import { marked } from "marked";
import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");

marked.setOptions({ gfm: true });

// ---- args ----
const args = process.argv.slice(2);
const getArg = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const STAGE = getArg("stage", "0");
const EDITION = getArg("edition", "both"); // student | teacher | both
const ONLY_UNIT = getArg("unit", null); // e.g. "3" to render a single unit

const STAGE_META = {
  "0": { rank: "Recruit", cefr: "Pre-A1 / A1", title: "Foundations", arabic: "الأساس — من الصفر لأول محادثة" },
  "1": { rank: "Citizen", cefr: "A2", title: "Elementary", arabic: "المواطن" },
  "2": { rank: "Legionary", cefr: "B1", title: "Intermediate", arabic: "الفيلق" },
  "3": { rank: "Confident", cefr: "B2", title: "Upper-Intermediate — The Coronation", arabic: "التتويج" },
  "4": { rank: "Sovereign", cefr: "C1 (+Exam)", title: "Advanced", arabic: "الإمبراطور" },
};

// ==========================================================================
// Markdown -> HTML, with edition-aware Teacher-overlay handling.
// Teacher blocks are contiguous blockquotes whose first line is `> [!TEACHER]`.
// ==========================================================================
function renderContent(md, edition) {
  const lines = md.split("\n");
  const parts = [];
  let buf = [];
  const flush = () => {
    if (buf.length) {
      parts.push(marked.parse(buf.join("\n")));
      buf = [];
    }
  };
  let i = 0;
  while (i < lines.length) {
    if (/^>\s*\[!TEACHER\]/i.test(lines[i])) {
      const inner = [];
      i++; // skip the [!TEACHER] marker line
      while (i < lines.length && lines[i].startsWith(">")) {
        inner.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      if (edition === "teacher") {
        flush();
        parts.push(
          `<div class="teacher-note"><div class="teacher-note__label">Teacher's Edition</div>${marked.parse(
            inner.join("\n")
          )}</div>`
        );
      }
      // student edition: block dropped
      if (i < lines.length && lines[i].trim() === "") i++; // eat one trailing blank
      continue;
    }
    buf.push(lines[i]);
    i++;
  }
  flush();
  return parts.join("\n");
}

// First H1 text of a markdown file (used for TOC + unit dividers).
function firstHeading(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : "";
}

// ==========================================================================
// Gather Stage units in order.
// ==========================================================================
function loadStage(stage) {
  const base = path.join(REPO, "materials", `stage${stage}`);
  const unitDirs = fs
    .readdirSync(base)
    .filter((d) => /^unit\d+$/.test(d) && fs.statSync(path.join(base, d)).isDirectory())
    .sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4)));

  const units = [];
  for (const dir of unitDirs) {
    const unitNum = dir.slice(4);
    if (ONLY_UNIT != null && unitNum !== ONLY_UNIT) continue;
    const dirPath = path.join(base, dir);
    const files = fs.readdirSync(dirPath);
    const fmFile = files.find((f) => /front-matter/.test(f));
    const lessonFiles = files
      .filter((f) => /^s\d+-u\d+-l\d+\.md$/.test(f))
      .sort((a, b) => {
        const la = parseInt(a.match(/-l(\d+)\.md$/)[1]);
        const lb = parseInt(b.match(/-l(\d+)\.md$/)[1]);
        return la - lb;
      });
    units.push({
      num: unitNum,
      frontMatter: fmFile ? fs.readFileSync(path.join(dirPath, fmFile), "utf8") : null,
      lessons: lessonFiles.map((f) => ({
        id: f.replace(/\.md$/, "").toUpperCase(),
        md: fs.readFileSync(path.join(dirPath, f), "utf8"),
      })),
    });
  }
  return units;
}

// ==========================================================================
// Assemble the full HTML document for one edition.
// ==========================================================================
function buildHtml(stage, edition, units) {
  const meta = STAGE_META[stage] || { rank: "", cefr: "", title: `Stage ${stage}`, arabic: "" };
  const css = fs.readFileSync(path.join(__dirname, "book.css"), "utf8");
  const editionLabel = edition === "teacher" ? "Teacher's Edition" : "Student's Edition";
  const year = new Date().getFullYear();

  // ---- Cover ----
  const cover = `
  <section class="cover">
    <div class="crest">&#128081;</div>
    <div class="brand">Empire English Community</div>
    <div class="rule"></div>
    <h1>Stage ${stage}: ${meta.title}</h1>
    <div class="stage">CEFR ${meta.cefr}</div>
    <div class="rank">Rank &middot; ${meta.rank}</div>
    <div class="arabic">${meta.arabic}</div>
    <div class="edition">${editionLabel}</div>
    <div class="foot">An empire is built brick by brick &mdash; &#1576;&#1604;&#1576;&#1606;&#1577; &#1603;&#1604; &#1610;&#1608;&#1605;. &nbsp;&middot;&nbsp; ${year}</div>
  </section>`;

  // ---- Table of contents ----
  let toc = `<section class="toc"><h1>Contents &mdash; &#1601;&#1607;&#1585;&#1587; &#1575;&#1604;&#1605;&#1581;&#1578;&#1608;&#1609;</h1>`;
  for (const u of units) {
    const unitTitle = u.frontMatter ? firstHeading(u.frontMatter) : `Unit ${u.num}`;
    toc += `<div class="unit-row">${escapeHtml(unitTitle)}</div>`;
    for (const l of u.lessons) {
      toc += `<div class="lesson-row"><span class="id">${l.id}</span>${escapeHtml(firstHeading(l.md))}</div>`;
    }
  }
  toc += `</section>`;

  // ---- Units + lessons ----
  let bodyHtml = "";
  for (const u of units) {
    const unitTitle = u.frontMatter ? firstHeading(u.frontMatter) : `Unit ${u.num}`;
    bodyHtml += `
    <section class="unit-divider">
      <div class="crest">&#128081;</div>
      <div class="num">Stage ${stage} &middot; Unit ${u.num}</div>
      <div class="rule"></div>
      <h2>${escapeHtml(stripUnitPrefix(unitTitle))}</h2>
    </section>`;
    if (u.frontMatter) {
      bodyHtml += `<section class="page front-matter">${renderContent(u.frontMatter, edition)}</section>`;
    }
    for (const l of u.lessons) {
      bodyHtml += `<section class="page lesson">${renderContent(l.md, edition)}</section>`;
    }
  }

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;700&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
${cover}
${toc}
${bodyHtml}
</body>
</html>`;
}

function stripUnitPrefix(t) {
  // "👑 Unit 3 — Things & Places 🏛️" -> "Things & Places"
  return t
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/gu, "")
    .replace(/^\s*Unit\s*\d+\s*[—\-:]\s*/i, "")
    .trim();
}

function escapeHtml(s) {
  return s
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/gu, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

// ==========================================================================
// Render one edition to PDF.
// ==========================================================================
async function renderPdf(browser, stage, edition, units) {
  const html = buildHtml(stage, edition, units);
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 120000 });
  try {
    await page.evaluateHandle("document.fonts.ready");
  } catch {}

  const outDir = path.join(REPO, "web", "public", "coursebook");
  fs.mkdirSync(outDir, { recursive: true });
  const suffix = ONLY_UNIT != null ? `-unit${ONLY_UNIT}` : "";
  const outPath = path.join(outDir, `eec-stage${stage}-${edition}${suffix}.pdf`);

  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family:'Source Sans 3',sans-serif;font-size:7pt;color:#9aa0b8;width:100%;padding:0 16mm;text-align:right;">Empire English &#128081; Stage ${stage} &middot; ${
      edition === "teacher" ? "Teacher's Edition" : "Student's Edition"
    }</div>`,
    footerTemplate: `<div style="font-family:'Source Sans 3',sans-serif;font-size:7pt;color:#9aa0b8;width:100%;padding:0 16mm;display:flex;justify-content:space-between;"><span>empireenglish.online</span><span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  });
  await page.close();
  const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`  ✓ ${path.relative(REPO, outPath)}  (${kb} KB)`);
  return outPath;
}

// ==========================================================================
(async () => {
  const units = loadStage(STAGE);
  const lessonCount = units.reduce((n, u) => n + u.lessons.length, 0);
  console.log(
    `Empire coursebook — Stage ${STAGE}: ${units.length} unit(s), ${lessonCount} lesson(s)${
      ONLY_UNIT != null ? ` (unit ${ONLY_UNIT} only)` : ""
    }`
  );

  const editions = EDITION === "both" ? ["student", "teacher"] : [EDITION];
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    for (const ed of editions) {
      console.log(`Rendering ${ed}'s edition…`);
      await renderPdf(browser, STAGE, ed, units);
    }
  } finally {
    await browser.close();
  }
  console.log("Done.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
