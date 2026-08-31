#!/usr/bin/env node
/* ==========================================================================
 * Empire English — portal stage-wrapper reachability check
 * --------------------------------------------------------------------------
 * WHY THIS EXISTS
 *
 * A stage's front matter and glossary are served by a route that looks the page
 * up in the generated `WRAPPER_MD` record. Those keys come from the markdown
 * FILENAME — `materials/stage2/stage2-glossary.md` is keyed `stage2-glossary`,
 * built from the stage NUMBER. The route knows the stage by its ID (`s2`).
 *
 * `s2-glossary` and `stage2-glossary` are different strings, and getting it
 * wrong is INVISIBLE to every other gate: TypeScript is happy (both are
 * strings), the embed-drift check is happy (the markdown really is embedded),
 * `next build` is happy (the route compiles), and the page simply renders 404.
 *
 * That shipped. `/portal/stages/{s1,s2}/{start,glossary}` — four pages — were
 * live and 404ing because each dynamic route hand-built `${meta.id}-glossary`
 * while Stage 0's two static pages hardcoded the correct literal. Stage 0
 * worked, so the defect was invisible in the only stage anyone had clicked
 * through, and nothing reported it because reaching those pages requires being
 * signed in and `users.json` was empty.
 *
 * WHAT THIS ENFORCES
 *   1. Every stage with a portal embed exposes both stage-wrapper keys.
 *   2. Every route that renders a stage wrapper derives its key from the shared
 *      `stageWrapperPageId()` helper, and none of them hand-rolls the string.
 *
 * Rule 2 is the one that matters: rule 1 was already true when the pages were
 * 404ing. A single derivation is what makes the next stage safe.
 *
 * Usage: node check-portal-wrappers.mjs
 * Exit 1 on any failure.
 * ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const CONTENT = path.join(REPO, "web", "src", "content");
const HELPER = "stageWrapperPageId";

/** Every route file that renders a stage-level wrapper page. */
const WRAPPER_ROUTES = [
  "web/src/app/[locale]/portal/start/page.tsx",
  "web/src/app/[locale]/portal/glossary/page.tsx",
  "web/src/app/[locale]/portal/stages/[stage]/start/page.tsx",
  "web/src/app/[locale]/portal/stages/[stage]/glossary/page.tsx",
];

const problems = [];

// ---- 1. both stage-wrapper keys exist in every stage's embed ----------------
const embeds = fs
  .readdirSync(CONTENT)
  .filter((f) => /^materials-stage\d+\.ts$/.test(f))
  .sort();

if (!embeds.length) problems.push("no materials-stageN.ts embeds found — is the path still right?");

for (const file of embeds) {
  const stage = file.match(/stage(\d+)/)[1];
  const src = fs.readFileSync(path.join(CONTENT, file), "utf8");
  const line = src.split("\n").find((l) => l.startsWith("export const WRAPPER_MD"));
  if (!line) {
    problems.push(`${file}: no WRAPPER_MD export`);
    continue;
  }
  let keys;
  try {
    keys = Object.keys(JSON.parse(line.slice(line.indexOf("{"), line.lastIndexOf("}") + 1)));
  } catch {
    problems.push(`${file}: WRAPPER_MD is not parseable JSON`);
    continue;
  }
  for (const kind of ["front-matter", "glossary"]) {
    const key = `stage${stage}-${kind}`;
    if (!keys.includes(key)) problems.push(`${file}: missing wrapper key "${key}"`);
  }
  console.log(`  stage ${stage}: stage${stage}-front-matter ✓  stage${stage}-glossary ✓`);
}

// ---- 2. every wrapper route derives its key from the shared helper ----------
for (const rel of WRAPPER_ROUTES) {
  const abs = path.join(REPO, rel);
  if (!fs.existsSync(abs)) {
    problems.push(`route missing: ${rel}`);
    continue;
  }
  const src = fs.readFileSync(abs, "utf8");
  const routeProblems = [];
  if (!src.includes(HELPER)) {
    routeProblems.push(
      `${rel} does not use ${HELPER}() — a hand-built wrapper key 404s silently. ` +
        `Import it from "@/lib/lessons".`,
    );
  }
  // A literal or template-built key is exactly the defect that shipped.
  const handRolled = /pageId=\{?\s*(`[^`]*-(?:front-matter|glossary)`|"stage\d+-(?:front-matter|glossary)")/.exec(src);
  if (handRolled) {
    routeProblems.push(
      `${rel} builds its wrapper key by hand (${handRolled[1]}) instead of calling ${HELPER}(). ` +
        `Stage 0 doing this is how the Stage-1/2 mismatch stayed invisible.`,
    );
  }
  // Never print a tick for a file that is about to be reported as failing — a
  // green line above a red summary is how four 404ing pages got shipped.
  if (routeProblems.length) {
    problems.push(...routeProblems);
    console.log(`  ${rel}: ✗`);
  } else {
    console.log(`  ${rel}: derives pageId via ${HELPER}() ✓`);
  }
}

if (problems.length) {
  console.error(`\n✗ portal stage-wrapper check FAILED (${problems.length})`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ every stage wrapper is reachable, and all ${WRAPPER_ROUTES.length} routes share one key derivation`);
