#!/usr/bin/env node
/* ==========================================================================
 * Empire English — portal bidi render probe
 * --------------------------------------------------------------------------
 * WHY THIS EXISTS
 * The coursebook PDF stylesheet (tools/pdf/book.css) sets
 * `unicode-bidi: plaintext` on every text-bearing element, so each paragraph
 * picks its OWN base direction from its first strong character. The portal
 * stylesheet (web/src/app/globals.css, `.lesson-prose`) did not. Because
 * web/src/app/[locale]/layout.tsx sets `dir="rtl"` for the `ar` locale, every
 * English paragraph inside a lesson inherited an RTL base direction, which
 * moves its trailing ASCII punctuation to the wrong visual side.
 *
 * This probe reproduces the portal's exact rendering conditions in headless
 * Chromium and MEASURES the result, so the defect (and the fix) is evidence
 * rather than assertion.
 *
 * WHAT IT MEASURES
 * For every rendered paragraph/list-item whose text is majority-Latin and ends
 * in ASCII punctuation, it compares the x-position of the final punctuation
 * glyph against the x-position of that same line's FIRST glyph. English text
 * reads left-to-right, so its closing punctuation must sit to the RIGHT of the
 * character the sentence starts with. When it sits to the LEFT, the punctuation
 * has been reordered onto the wrong side and the line is misrendered.
 *
 * Note: the comparison is deliberately against the sentence's own first glyph,
 * NOT against the block's edges. A short left-aligned line legitimately has its
 * punctuation close to the left edge of a wide block, so an edge-based test
 * reports false positives.
 *
 * Usage:
 *   node bidi-render-probe.mjs                 # probe current globals.css
 *   node bidi-render-probe.mjs --patched       # probe with the bidi fix applied
 *   node bidi-render-probe.mjs --lesson s0-u1-l01 --png out.png
 * Exit code 1 if any misrendered line is found (so CI can gate on it).
 * ========================================================================== */

import { marked } from "marked";
import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");

const args = process.argv.slice(2);
const getArg = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : d;
};
const PATCHED = args.includes("--patched");
const LESSON = getArg("lesson", null);
const PNG = getArg("png", null);
const VERBOSE = args.includes("--verbose");

marked.setOptions({ gfm: true });

/** Same teacher-overlay strip the portal uses (web/src/lib/lesson-content.ts). */
function stripTeacherBlocks(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    if (/^>\s*\[!TEACHER\]/i.test(lines[i])) {
      i++;
      while (i < lines.length && lines[i].startsWith(">")) i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  return out.join("\n");
}

/**
 * Every page the learner can be shown: the 55 lessons, the 11 unit front-matter
 * wrappers, and the stage front matter + glossary. All of it renders through the
 * same two stylesheets, so all of it has to be probed — scanning lessons alone
 * would have missed the stage wrapper entirely.
 */
function lessonFiles() {
  const root = path.join(REPO, "materials");
  const out = [];
  const add = (id, p) => {
    if (LESSON && id !== LESSON) return;
    out.push({ id, p });
  };

  for (const s of fs
    .readdirSync(root)
    .filter((d) => /^stage\d+$/.test(d))
    .sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5)))) {
    const base = path.join(root, s);
    for (const f of fs.readdirSync(base).filter((f) => /^stage\d+-.*\.md$/.test(f)).sort()) {
      add(f.replace(/\.md$/, ""), path.join(base, f));
    }
    for (const d of fs
      .readdirSync(base)
      .filter((d) => /^unit\d+$/.test(d) && fs.statSync(path.join(base, d)).isDirectory())
      .sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4)))) {
      for (const f of fs
        .readdirSync(path.join(base, d))
        .filter((f) => f.endsWith(".md"))
        .sort()) {
        add(f.replace(/\.md$/, ""), path.join(base, d, f));
      }
    }
  }
  return out;
}

/** The portal's real lesson stylesheet, plus the candidate fix. */
function css() {
  const globals = fs.readFileSync(path.join(REPO, "web", "src", "app", "globals.css"), "utf8");
  // Pull only the .lesson-prose rules so the probe tests the real thing.
  const rules = globals
    .split("\n")
    .join("\n")
    .match(/\.lesson-prose[^{]*\{[^}]*\}/g);
  let out = (rules || []).join("\n");
  if (PATCHED) {
    out += `
.lesson-prose p, .lesson-prose li, .lesson-prose td, .lesson-prose th,
.lesson-prose blockquote, .lesson-prose h1, .lesson-prose h2,
.lesson-prose h3, .lesson-prose h4, .lesson-prose dt, .lesson-prose dd {
  unicode-bidi: plaintext;
  text-align: start;
}`;
  }
  return out;
}

const html = (body) => `<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><style>
  body { font-family: system-ui, "DejaVu Sans", sans-serif; margin: 0; padding: 24px; width: 820px; }
  ${css()}
</style></head>
<body><article class="lesson-prose">${body}</article></body>
</html>`;

/**
 * Map a rendered line back to the markdown line that produced it, so a report is
 * something you can act on rather than something you have to go hunting for.
 * Matching is on text with markdown syntax stripped and whitespace collapsed.
 */
const norm = (s) =>
  s
    .replace(/`([^`]*)`/g, "$1")
    .replace(/[*_>#|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const sourceCache = new Map();
function withSource(hit, file) {
  if (!sourceCache.has(file)) {
    sourceCache.set(
      file,
      fs
        .readFileSync(file, "utf8")
        .split("\n")
        .map((l, i) => ({ n: i + 1, norm: norm(l) })),
    );
  }
  const needle = norm(hit.text);
  const probe = needle.slice(0, 60);
  const line = sourceCache.get(file).find((l) => l.norm && (l.norm.includes(probe) || needle.includes(l.norm)));
  return { ...hit, file: path.relative(REPO, file), line: line ? line.n : null };
}

const PROBE = () => {
  const LAT = /[A-Za-z]/;
  const bad = [];
  const ambiguous = [];
  const els = document.querySelectorAll(
    ".lesson-prose p, .lesson-prose li, .lesson-prose td, .lesson-prose th, .lesson-prose blockquote, .lesson-prose h1, .lesson-prose h2, .lesson-prose h3",
  );
  for (const el of els) {
    const txt = (el.textContent || "").trim();
    if (!txt || !LAT.test(txt) || !/[.,:;!?]$/.test(txt)) continue;
    const ar = (txt.match(/[\u0600-\u06FF]/g) || []).length;
    const la = (txt.match(/[A-Za-z]/g) || []).length;

    // `unicode-bidi: plaintext` picks a line's base direction from its FIRST
    // strong character. A line is only unambiguous when that first character
    // agrees with the script that dominates the line. When they disagree (an
    // English-first line that ends in Arabic, or vice versa) the correct side
    // for the closing punctuation is a matter of editorial judgement, not a
    // defect — those are reported as advisories, never gated on.
    const firstStrong = /[A-Za-z]|[\u0600-\u06FF]/.exec(txt);
    if (!firstStrong) continue;
    const startsLtr = /[A-Za-z]/.test(firstStrong[0]);
    const majorityLtr = la > ar;
    const isAmbiguous = startsLtr !== majorityLtr;
    const wantLtr = majorityLtr;

    // Collect the text nodes so we can measure the first and last glyphs.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
    if (!nodes.length) continue;

    const last = nodes[nodes.length - 1];
    const s = last.nodeValue;
    const li = s.length - 1;
    if (!/[.,:;!?]/.test(s[li])) continue;

    // First strong glyph of the element (what the line starts with), in the
    // script that governs the line's direction.
    const first = nodes[0];
    const fi = first.nodeValue.search(wantLtr ? /[A-Za-z]/ : /[\u0600-\u06FF]/);
    if (fi === -1) continue;

    const rectOf = (node, i) => {
      const r = document.createRange();
      r.setStart(node, i);
      r.setEnd(node, i + 1);
      return r.getBoundingClientRect();
    };
    const punct = rectOf(last, li);
    const head = rectOf(first, fi);
    if (!punct.width || !head.width) continue;
    // Only compare glyphs laid out on the same visual line.
    if (Math.abs(punct.top - head.top) > 2) continue;

    // An LTR line's closing punctuation must sit to the RIGHT of its first
    // glyph; an RTL line's must sit to the LEFT. Either way the punctuation has
    // to land at the END of the reading order, not the start.
    const misrendered = wantLtr ? punct.left < head.left : punct.left > head.left;
    if (!misrendered) continue;
    const hit = {
      tag: el.tagName.toLowerCase(),
      want: wantLtr ? "ltr" : "rtl",
      dir: getComputedStyle(el).direction,
      bidi: getComputedStyle(el).unicodeBidi,
      punctX: Math.round(punct.left),
      headX: Math.round(head.left),
      text: txt.slice(0, 100),
    };
    // A line the stylesheet can fix is a hard failure. A line that mixes scripts
    // so that NO base direction puts the punctuation right can only be fixed by
    // rewording, so it is reported separately and does not gate.
    if (isAmbiguous) ambiguous.push(hit);
    else bad.push(hit);
  }
  return { bad, ambiguous };
};

(async () => {
  const files = lessonFiles();
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  let total = 0;
  let ambig = 0;
  const perLesson = [];
  const ambigLines = [];
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 860, height: 1200 });
    for (const f of files) {
      const md = stripTeacherBlocks(fs.readFileSync(f.p, "utf8"));
      await page.setContent(html(marked.parse(md)), { waitUntil: "domcontentloaded" });
      const { bad, ambiguous } = await page.evaluate(PROBE);
      total += bad.length;
      ambig += ambiguous.length;
      if (bad.length) perLesson.push({ id: f.id, bad: bad.map((b) => withSource(b, f.p)) });
      for (const a of ambiguous) ambigLines.push({ id: f.id, ...withSource(a, f.p) });
      if (PNG && LESSON) await page.screenshot({ path: PNG, fullPage: true });
    }
  } finally {
    await browser.close();
  }

  console.log(`mode: ${PATCHED ? "PATCHED (unicode-bidi: plaintext)" : "globals.css as committed"}`);
  console.log(`pages probed:   ${files.length}`);
  console.log(
    `${total ? "FAIL" : "PASS"}  misrendered lines (closing punctuation on the wrong side): ${total}`,
  );
  console.log(`note  needs rewording (mixed-direction line, no base direction is right): ${ambig}`);

  if (total) {
    for (const l of perLesson.slice(0, 6)) {
      console.log(`\n  ${l.id} — ${l.bad.length} line(s)`);
      for (const b of l.bad.slice(0, 3)) {
        console.log(
          `    <${b.tag}> reads=${b.want} dir=${b.dir} bidi=${b.bidi} | punct x=${b.punctX}, line starts x=${b.headX}`,
        );
        console.log(`      "${b.text}"`);
      }
    }
    const worst = [...perLesson].sort((a, b) => b.bad.length - a.bad.length).slice(0, 8);
    console.log(`\n  worst lessons: ${worst.map((w) => `${w.id}(${w.bad.length})`).join(" ")}`);
  }

  if (VERBOSE && ambig) {
    console.log(`\n  Lines needing an editor, grouped by file. A renderer picks base direction from the`);
    console.log(`  first strong character, so these cannot be fixed in CSS — see empire-style-guide.md §4.\n`);
    const byFile = new Map();
    for (const a of ambigLines) {
      if (!byFile.has(a.file)) byFile.set(a.file, []);
      byFile.get(a.file).push(a);
    }
    for (const [file, hits] of byFile) {
      console.log(`  ${file}`);
      for (const h of hits) {
        console.log(`    ${h.line ? `:${h.line}` : "(line ?)"}  reads ${h.want}`);
        console.log(`        ${h.text}`);
      }
    }
  }

  process.exit(total ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(2);
});
