/* ==========================================================================
 * Empire English — "what Arabic level does this lesson DECLARE?"
 * --------------------------------------------------------------------------
 * One implementation, shared by every check that needs the answer:
 *   measure-arabic-dial.mjs  — is the lesson AT its declared level?
 *   check-immersion.mjs      — if that level is 0%, is the lesson really English?
 *
 * This lives in its own module for one specific reason. The resolution rule
 * below has already been wrong once, in a way that silently ungated 110
 * lessons (see declaredTarget). A second copy of it in a second checker is a
 * second chance for the same class of bug, and the two would drift apart
 * exactly when it mattered. There is one copy, and both gates read it.
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** The blueprint path and lesson id a finished lesson cites in its header. */
export function citation(md) {
  const m = /Built from: `([^`]+)` · \*\*([A-Z0-9-]+)\*\*/.exec(md);
  return m ? { blueprint: m[1], id: m[2] } : null;
}

const blueprintCache = new Map();

/**
 * The Arabic level the blueprint declares for that specific lesson, as a
 * number of percentage points, or null when nothing is declared anywhere.
 */
export function declaredTarget(blueprintRel, lessonId) {
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

/** Every authored lesson across every stage that has a materials/ directory. */
export function lessons() {
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

export { REPO };
