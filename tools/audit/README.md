# Content-integrity checks

Three checks over the finished coursebook material in `materials/`. Each one
exists because something it now catches had already gone wrong.

```bash
cd tools/audit && npm install    # marked + puppeteer
npm run all                      # drift, then anatomy, then bidi
```

| Script | What it answers | Why it exists |
|---|---|---|
| `npm run drift` | Are the two generated files still exactly what `materials/stage0/` implies — the portal embed and the Stage-0 glossary? | The embed is banner-marked "AUTO-GENERATED … do not edit by hand", but no generator was committed. The portal serves the embed, the PDF reads the markdown — so drift means the two ship **different lessons** with nothing failing. |
| `npm run anatomy` | Does every lesson match `materials/_style/lesson-anatomy.md`? | The blueprint citation, mandatory sections, section order, Arabic sub-labels, Teacher overlay, record task and sign-off are the definition of "done". Checking by hand across 55 lessons does not scale. |
| `npm run bidi` | Does any line render its closing punctuation on the wrong side? | The Arabic locale sets `dir="rtl"` on `<html>`. Lesson prose inherited it, so **796 lines** of English rendered as `?Can you repeat, please`. The PDF stylesheet had already solved this; the portal had not. |

## Regenerating after a content edit

After editing anything under `materials/stage0/`:

```bash
cd tools/audit && npm run generate     # glossary, then the portal embed
npm run all                            # then verify
```

Order matters: the glossary is itself content that gets embedded, so generate it
before the embed.

**`generate-portal-embed.mjs`** rebuilds `web/src/content/materials-stage0.ts` —
55 lessons plus 13 wrapper pages (stage front matter, glossary, and each unit's
front matter). It was validated by reproducing the previously committed embed
byte-for-byte. `--check` verifies without writing and names what differs.

**`generate-stage0-glossary.mjs`** rebuilds `materials/stage0/stage0-glossary.md`
from the **Your Arsenal** tables of all 55 lessons. It is derived rather than
written so it cannot teach a word the lessons no longer use. Deliberately not
alphabetised: many rows are grouped sets (`bank / pharmacy / hospital` glossed
`بنك / صيدلية / مستشفى`) and splitting them to sort risks pairing an English word
with the wrong Arabic gloss.

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
