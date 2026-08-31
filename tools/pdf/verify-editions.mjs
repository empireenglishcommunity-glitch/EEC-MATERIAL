#!/usr/bin/env node
/* ==========================================================================
 * Empire English — coursebook edition verifier
 * --------------------------------------------------------------------------
 * Asserts that a Student's Edition PDF really does NOT contain the Teacher
 * overlay, and that the Teacher's Edition really does.
 *
 * WHY THIS IS NOT A ONE-LINE grep
 * The obvious check — `strings book.pdf | grep "At a glance"` — is worthless
 * here, and worse than worthless, because it returns 0 for BOTH editions and so
 * reads as a pass. The pages are rendered by Chromium with subsetted fonts and
 * custom glyph encodings, so no editorial text survives as literal bytes. "0
 * occurrences, good" from that grep is not evidence of absence; it is evidence
 * that the tool cannot see the content at all. The Teacher's Edition, which
 * definitely does contain the overlay, scores exactly the same 0.
 *
 * So this extracts the real text layer with pdf.js and searches that. It also
 * refuses to pass when extraction yields implausibly little text, because "I
 * found no teacher markers" is only meaningful once "I can read this document"
 * has been established.
 *
 * Usage: node verify-editions.mjs --stage 3
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");

const stageIdx = process.argv.indexOf("--stage");
const STAGE = stageIdx >= 0 ? process.argv[stageIdx + 1] : null;
if (!STAGE) {
  console.error("✗ usage: node verify-editions.mjs --stage N");
  process.exit(1);
}

/** Phrases that appear ONLY inside a Teacher overlay, anywhere in the corpus. */
const TEACHER_MARKERS = ["At a glance", "Coach notes", "Success check", "Differentiation"];

/** Below this, extraction has failed and no conclusion may be drawn. */
const MIN_PLAUSIBLE_CHARS = 50_000;

const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
pdfjs.GlobalWorkerOptions.workerSrc = require.resolve("pdfjs-dist/legacy/build/pdf.worker.mjs");

async function extractText(pdfPath) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjs.getDocument({ data, useSystemFonts: false }).promise;
  let out = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const content = await (await pdf.getPage(i)).getTextContent();
    out += content.items.map((it) => it.str).join(" ") + "\n";
  }
  return { text: out, pages: pdf.numPages };
}

let failures = 0;
const seen = {};

for (const edition of ["student", "teacher"]) {
  const p = path.join(REPO, "web", "private", "coursebook", `eec-stage${STAGE}-${edition}.pdf`);
  if (!fs.existsSync(p)) {
    console.error(`✗ missing ${path.relative(REPO, p)}`);
    failures++;
    continue;
  }

  const { text, pages } = await extractText(p);
  const chars = text.replace(/\s+/g, "").length;
  const found = TEACHER_MARKERS.filter((m) => text.includes(m));
  seen[edition] = { pages, chars, found };

  console.log(
    `  ${edition.padEnd(7)} ${String(pages).padStart(4)} pages · ${chars.toLocaleString()} text chars · ` +
      `teacher markers: ${found.length ? found.join(", ") : "none"}`,
  );

  if (chars < MIN_PLAUSIBLE_CHARS) {
    console.error(`✗ ${edition}: only ${chars} chars extracted — verification INCONCLUSIVE, refusing to pass`);
    failures++;
    continue;
  }
  if (edition === "student" && found.length) {
    console.error(`✗ STUDENT EDITION LEAKS TEACHER CONTENT: ${found.join(", ")}`);
    failures++;
  }
  if (edition === "teacher" && !found.length) {
    console.error(`✗ TEACHER EDITION IS MISSING ITS OVERLAY — none of: ${TEACHER_MARKERS.join(", ")}`);
    failures++;
  }
}

// A teacher edition that is not longer than the student edition means the
// overlay was dropped even if a marker happened to appear in ordinary prose.
if (seen.student && seen.teacher && seen.teacher.pages <= seen.student.pages) {
  console.error(
    `✗ teacher edition (${seen.teacher.pages}pp) is not longer than the student edition ` +
      `(${seen.student.pages}pp) — the overlay cannot be there`,
  );
  failures++;
}

console.log("");
if (failures) {
  console.log(`FAIL  Stage ${STAGE} editions did not verify (${failures} problem(s))`);
  process.exit(1);
}
console.log(
  `PASS  Stage ${STAGE}: student edition carries no teacher overlay; teacher edition does ` +
    `(+${seen.teacher.pages - seen.student.pages}pp)`,
);
