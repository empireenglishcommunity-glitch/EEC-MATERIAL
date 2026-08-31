# Content-integrity checks

Three checks over the finished coursebook material in `materials/`. Each one
exists because something it now catches had already gone wrong.

```bash
cd tools/audit && npm install    # marked + puppeteer
npm run all                      # drift, then anatomy, then bidi
```

| Script | What it answers | Why it exists |
|---|---|---|
| `npm run drift` | Is `web/src/content/materials-stage0.ts` still exactly the markdown in `materials/stage0/`? | That file is banner-marked "AUTO-GENERATED … do not edit by hand", but no generator was committed. The portal serves the embed, the PDF reads the markdown — so drift means the two ship **different lessons** with nothing failing. |
| `npm run anatomy` | Does every lesson match `materials/_style/lesson-anatomy.md`? | The blueprint citation, mandatory sections, section order, Arabic sub-labels, Teacher overlay, record task and sign-off are the definition of "done". Checking by hand across 55 lessons does not scale. |
| `npm run bidi` | Does any line render its closing punctuation on the wrong side? | The Arabic locale sets `dir="rtl"` on `<html>`. Lesson prose inherited it, so **796 lines** of English rendered as `?Can you repeat, please`. The PDF stylesheet had already solved this; the portal had not. |

## Regenerating the portal embed

After editing any file under `materials/stage0/`:

```bash
node tools/audit/generate-portal-embed.mjs
```

`--check` verifies without writing and exits non-zero, naming the lessons that
differ. The generator reproduces the previously committed embed byte-for-byte,
which is how it was validated.

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
