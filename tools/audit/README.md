# Content-integrity checks

Three checks over the finished coursebook material in `materials/`. Each one
exists because something it now catches had already gone wrong.

```bash
cd tools/audit && npm install    # marked + puppeteer
npm run all                      # drift, then anatomy, then bidi
```

| Script | What it answers | Why it exists |
|---|---|---|
| `npm run drift` | Are the generated portal embed and both stage glossaries exactly what their `materials/` sources imply? | The portal embed and glossaries are banner-marked generated files. Drift means the PDF and portal can ship different material, or a glossary can stop matching its lessons, with nothing else failing. |
| `npm run anatomy` | Does every lesson match `materials/_style/lesson-anatomy.md`? | The blueprint citation, mandatory sections, section order, Arabic sub-labels, Teacher overlay, record task and sign-off are the definition of "done". Checking by hand across 55 lessons does not scale. |
| `npm run bidi` | Does any line render its closing punctuation on the wrong side? | The Arabic locale sets `dir="rtl"` on `<html>`. Lesson prose inherited it, so **796 lines** of English rendered as `?Can you repeat, please`. The PDF stylesheet had already solved this; the portal had not. |
| `npm run dial` | Does each lesson deliver the Arabic support level **its own blueprint declares**? | The blueprints give every lesson an `Arabic support: ~N%` line but never said how to measure it, so it could not be checked. The target is read from the curriculum, not from a table here, so the gate cannot drift from the plan. Fails outside ±2 points. Stage 0 is grandfathered — see `lesson-anatomy.md` §3a. |

`anatomy`, `dial`, and `bidi` cover **every** stage under `materials/`. Glossary
generation covers Stage 0 and Stage 1; Stage 0 keeps its byte-stable legacy parser,
while Stage 1 parses heterogeneous Arsenal table schemas by header and fails closed
on an unknown schema. The portal embed remains Stage-0-scoped until Stage 1 is wired.

## Regenerating after a content edit

After editing lesson material:

```bash
cd tools/audit && npm run generate     # both glossaries, then the Stage-0 portal embed
npm run all                            # then verify all stages
```

Order matters for Stage 0: its glossary is itself content that gets embedded, so
generate the glossaries before the embed. Stage 1's glossary is consumed by the PDF
pipeline and will be embedded when Stage 1 portal generation is enabled.

**`generate-portal-embed.mjs`** rebuilds `web/src/content/materials-stage0.ts` —
55 lessons plus 13 wrapper pages (stage front matter, glossary, and each unit's
front matter). It was validated by reproducing the previously committed embed
byte-for-byte. `--check` verifies without writing and names what differs.

**`generate-stage0-glossary.mjs`** is the byte-compatible Stage-0 entry point.
**`generate-stage-glossary.mjs --stage 1`** rebuilds
`materials/stage1/stage1-glossary.md`. Both derive entries from **Your Arsenal**
tables so a glossary cannot silently teach language its lessons no longer use.
Stage 1's parser handles vocabulary, pronunciation, rule, and functional-language
tables explicitly; an unknown table header fails generation instead of shifting the
wrong data into the Arabic column. Source order is deliberate rather than alphabetical.

## Notes on the bidi probe

`bidi-render-probe.mjs` renders each lesson in headless Chromium under the
portal's real conditions — `<html dir="rtl">`, the `.lesson-prose` rules parsed
straight out of `web/src/app/globals.css`, and the same Teacher-overlay strip
`web/src/lib/lesson-content.ts` performs — then measures glyph boxes.

It reports two numbers, and the difference matters:

- **Failures** are lines the stylesheet governs: a line whose script is
  unambiguous but whose closing punctuation lands at the wrong end. These gate
  (exit 1).
- **Needs rewording** are lines that *start* in one script and are *mostly* the
  other. `unicode-bidi: plaintext` picks a base direction from the first strong
  character, so no stylesheet can place the punctuation correctly for these —
  only an editor can, by splitting the line or dropping trailing punctuation.
  Advisory only; run `npm run bidi:verbose` to list them.

Judging expected direction by which script *dominates* a line is wrong, and was
the second of two bugs in this probe: the browser keys off the **first strong
character**. Compare punctuation against the line's own first glyph, never
against the block's edges — a short left-aligned line sits nowhere near the
right edge of a wide block and an edge-based test reports it as broken.
