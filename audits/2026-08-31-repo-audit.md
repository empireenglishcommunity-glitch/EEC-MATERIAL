# EEC-MATERIAL — full repository audit, 2026-08-31

Audit of the whole repo for unfinished work, with every claim re-derived from the
code rather than read from a document. Branch audited: `spec/eec-learning-ecosystem`
at `da579cd`.

**Headline: the content is in better shape than the documentation claimed, and the
portal had one serious rendering defect nobody had measured.** Stage 0 is genuinely
finished to a high standard — 55 lessons, all conforming, all in sync with what the
portal serves. But on the Arabic locale, **796 lines rendered their closing
punctuation on the wrong side**, and the spec plan showed two entire completed phases
as untouched.

> **Second pass, same day:** everything actionable in §2 was then fixed, and Stage 0 is
> now complete end to end — see [§2.6](#26-closed-later-the-same-day). What remains open
> is three founder reviews and Phase 5.

---

## 1. What was verified, and how

Nothing below is quoted from a document; each row is a command that was run.

| Check | Result | How |
|---|---|---|
| Finished lessons | **55** | `find materials -name 's0-*-l*.md' \| wc -l` |
| Lesson blueprints, all 5 stages | **275** | `grep -rhoE 'S[0-9]-U[0-9]+-L[0-9]+' curriculum/ \| sort -u \| wc -l` |
| Finished share of the programme | **20.0%** (55/275) | Stages 1–4 have no `materials/` directory |
| Portal embed vs markdown source | **55/55 byte-identical** | `tools/audit/generate-portal-embed.mjs --check` |
| Lesson-anatomy conformance | **55/55** | `tools/audit/check-lesson-anatomy.mjs` |
| TypeScript | **clean** | `cd web && npx tsc --noEmit` |
| Production build | **succeeds**, 28 routes | `cd web && npx next build` |
| Unit quizzes | **11/11 units** covered | `web/src/content/quizzes.ts` |
| Accent drills | **11** | `web/src/content/accent-drills.ts` |
| `en.json` / `ar.json` parity | **186 keys each, exact** | key-set diff, no missing or extra |
| Placeholder markers | **none** | swept for TODO/TBD/FIXME/PLACEHOLDER/lorem |
| Portal card claim "11 units · 55 lessons" | **accurate** | matches disk |

Two documented claims were checked specifically because they are the kind that rots,
and **both held**: the portal build really does succeed, and the generated embed really
was in sync with its source.

---

## 2. Findings

### 2.1 Portal misrendered bilingual punctuation on every Arabic page — FIXED

The severe one. `web/src/app/[locale]/layout.tsx` sets `dir="rtl"` for the `ar`
locale, and `.lesson-prose` had no per-block bidi handling, so every lesson block
inherited a right-to-left base direction. English sentences therefore placed their
closing `.`, `?` or `:` at the wrong end.

The vocabulary table in the survival-phrases lesson rendered its cell
`Can you repeat, please?` with the question mark on the **left**. In a course whose
whole job is teaching English punctuation and question forms to beginners, a
misplaced question mark is not cosmetic.

`tools/pdf/book.css` had solved this from the start — `unicode-bidi: plaintext` on
every text-bearing element, with a comment explaining why. **The PDF was correct and
only the portal was wrong**, from the same source content. This is the failure mode
where one output silently disagrees with another.

- **Fix:** mirror the PDF rule in `globals.css`.
- **Measured:** 796 misrendered lines → **0**, across all 55 lessons.
- **Guarded:** `tools/audit/bidi-render-probe.mjs` renders each lesson in headless
  Chromium under the portal's real conditions and exits non-zero on regression.

**Residue, deliberately not "fixed": 69 lines** open in one script and are mostly the
other. A renderer picks base direction from the first strong character, so no
stylesheet can place their punctuation correctly — only rewording can. Recorded in
`materials/_style/empire-style-guide.md` §4 with `npm run bidi:verbose` to list them.
An automated pass at these was written, inspected, and **thrown away**: it stripped
periods from complete English sentences that merely contain Arabic parentheticals, and
would have left bullet lists half-punctuated. That is worse than the artifact it fixed.

### 2.2 The "auto-generated" portal content had no generator — FIXED

`web/src/content/materials-stage0.ts` carries the banner *"AUTO-GENERATED … do not
edit by hand"*, but no generator existed anywhere in the repo. The only copy of the
content the portal serves was a build artefact nobody could rebuild, and nothing
detected divergence.

The 55 lessons happened to still be in sync — but the PDF reads the markdown while the
portal reads the embed, so drift means the two ship **different lessons with nothing
failing**.

`tools/audit/generate-portal-embed.mjs` now rebuilds it, and was validated by
reproducing the previously committed file **byte-for-byte**. `--check` is the drift
gate; it proved itself immediately by naming exactly the five lessons this audit
edited.

### 2.3 The spec plan showed two finished phases as untouched — FIXED

`.kiro/specs/eec-lesson-materials/tasks.md` had **every box in Phases 3–6 unticked**
while the PDF pipeline, both coursebook editions and all 55 lessons were committed and
live in the portal. Anyone reading it would conclude the coursebook did not exist.

Corrected against the repository, and given a status block where each claim names the
artefact and command that prove it. The master `eec-learning-ecosystem/tasks.md` was
checked too — its 30/42 ticks are **accurate**; its 12 open items are Phase 4–6
business delivery, not code. It gained a status block making that legible, and
correcting the impression that a complete curriculum means complete teaching material.

### 2.4 The standard forbade what 14 good lessons actually do — FIXED

`lesson-anatomy.md` declared seven sections mandatory with "no exceptions", and that
Accent Lab and the record task are "never dropped". Fourteen of 55 lessons break that
rule — and they are **right to**: the orientation lesson teaches no language, the ten
unit-task lessons replace "Decode it" with a performance checklist, and the stage
finale is an assessment script.

A rule 25% of the corpus violates is not a standard, it is noise. Replaced with five
named lesson types, each with its own mandatory set and the reason it differs
(`lesson-anatomy.md` §1a), now machine-checked.

Related: the unit-task lessons use a coherent **alternative** Arabic vocabulary —
`النموذج` (the model) instead of `اسمع وشوف`, an Accent `عيادة` (clinic) instead of a
`معمل` (lab), `التسجيل` (the recording) for Your Turn. That was deliberate and
consistent across all ten. It is now documented as accepted (§1b) rather than being
either flagged forever or silently normalised away.

### 2.5 Word-level inconsistencies — FIXED

- The style guide's §2 Arabic labels (`هدفك من الدرس`, `ذخيرتك من الكلمات`) were used by
  only **three** lessons — the earliest pilot ones. The other 52 use the short forms,
  as does `lesson-anatomy.md`. Two of the three source documents and 95% of the corpus
  agreed with each other and disagreed with the guide, so the **guide** was wrong.
  Corrected, and the three pilot lessons normalised.
- Two lessons carried a stray `⭐` on a section heading — which the style guide's own
  "emoji must stay consistent across all lessons" rule forbids. Removed.
- The bare-label-or-`label (qualifier)` convention is now enforced, so `هدفك (milestone)`
  passes and a quietly reworded label does not.

---

## 2.6 Closed later the same day

The findings above were reported first and fixed in a second pass. Recorded here so
this document is not read as a list of things still wrong.

- **Stage 0 is now complete.** The stage front matter (rank, roadmap, how to study,
  honesty section) and the glossary were written — closing the last content gap. The
  glossary is **generated** from every lesson's *Your Arsenal* table, so it cannot teach
  a word the lessons no longer use: **128 entries** across 11 units.
- **Unit front matter reaches the portal.** The embed now carries **13 wrapper pages**,
  and `/portal/units/[unit]`, `/portal/start` and `/portal/glossary` render them. The
  portal and the book finally show the same coursebook.
- **The coursebook PDFs are behind authentication.** Moved out of `web/public/` to
  `web/private/`, served by `/api/coursebook/[edition]`. Verified against a running
  server: anonymous → 401 student / 404 teacher; student session → 200 student /
  **404 teacher**; teacher role → 200; `ADMIN_TOKEN` header → 200; wrong token → 404;
  the old public paths → 404.
- **All 69 mixed-direction lines are gone** — 0 failures *and* 0 advisories across 68
  pages. Fixed by normalising three fragment templates (the sign-off, the chain-recall
  cue, the record-the-task line) and then rewording the remainder individually. Two of
  those individual edits were themselves wrong on first attempt — they dropped a period
  from a bullet whose siblings kept theirs — and were redone by keeping the punctuation
  and making the line unambiguous instead, once by glossing the grammar terms in Arabic,
  which improved the teaching as well.
- **The PDFs were rebuilt correctly**, after running `setup-env.sh`. All six font
  families embed, including `NotoColorEmoji` and `DejaVuSansMono`: 204 pp student,
  222 pp teacher.
- **A second implicit font dependency was found and fixed.** `book.css` styled `code`
  without naming a font, so code spans resolved to whatever generic monospace the build
  machine had — and every one of the 55 lessons sets its blueprint citation in a code
  span. The monospace stack is now pinned, and `setup-env.sh` installs it.

## 3. Still open

Ordered by what actually blocks value.

1. **Three founder checkpoints** (spec 2.4, 3.4, 4.4). Nothing is blocked on building.
   These need someone to look at Unit 1, the PDF, and Stage 0, and say yes.
2. **220 lessons for Stages 1–4** (spec Phase 5). Not started; all blueprints exist.
   Build just ahead of the cohort, per the design.

### Trap found the hard way: never rebuild the PDFs without running `setup-env.sh`

The first attempt at rebuilding the coursebooks produced files that **looked** fine — the
build printed success and both editions rendered — but were **degraded**: 4.4M → 4.1M,
with every `DejaVuSans` face gone from the embedded font list.

`tools/pdf/setup-env.sh` installs `dejavu-sans-fonts` "*because DejaVu covers
arrows/symbols*" and a colour-emoji font "*so the Empire section markers (🎯 🔁 👂 👑 …)
render, not tofu*". The machine had **0 emoji faces and 0 DejaVu faces installed**, so
that build would have replaced every section marker and every `→ ↗ ↘` in all 55 lessons
with missing glyphs, on every page of both editions.

Those files were discarded, `setup-env.sh` was run, and the rebuild verified. A
successful build is not evidence of a correct one: **check the embedded font list**, not
the exit code.

```bash
strings web/private/coursebook/eec-stage0-student.pdf \
  | grep -oE '(Cinzel|SourceSans3|NotoNaskhArabic|NotoSans|DejaVuSans|DejaVuSansMono)[A-Za-z-]*' \
  | sort -u
```

Chasing this turned up the same bug one level down: `book.css` styled `code` without
naming a font, so code spans took whatever generic monospace existed — and all 55
lessons set their blueprint citation in a code span. Pinned, and the font added to
`setup-env.sh`. Both were implicit dependencies on the build machine, which is the
category of defect to look for here.

### Items that were decisions rather than work

**~~The Teacher's Edition PDF is publicly downloadable.~~ — RESOLVED, see §2.6.**
Both editions were in `web/public/`, so both were downloadable at a guessable, ungated
URL; the `/portal` login never covered them. They now live in `web/private/` and are
served by `/api/coursebook/[edition]` — a session for the student edition, `role:
"teacher"` or the `ADMIN_TOKEN` header for the teacher edition. A learner who probes the
teacher URL gets a `404`, not a `403`, so the endpoint does not confirm that a teacher
edition exists.

One consequence worth knowing: `web/private/` is **not** copied into Next's standalone
output, so the Dockerfile copies it explicitly. If `/api/coursebook/student` ever
returns `503`, that `COPY` line is the first thing to check.

**This repo is missing from the ecosystem's memory hub.**
`empire-chronicle` is the canonical index, and `EEC-MATERIAL` appears **nowhere** in it
— not in the Repository Map in `README.md`, nor `SYSTEM-MAP.md`, `STATUS.md`, or
`SESSION_CONTINUITY.md`. The map lists eleven repos and omits this one. So the
curriculum source **and the live root-domain site** are invisible to anyone starting
from the hub, as the coursebook pipeline was. Needs a PR against `empire-chronicle`;
out of scope for this repo's audit, and noted so it does not get lost again.

---

## 4. Running these checks

```bash
cd tools/audit && npm install
npm run all          # embed drift, then anatomy, then bidi
```

Details, including two methodology mistakes made while building the bidi probe, are in
`tools/audit/README.md` — recorded because the wrong version of that check looked
convincing and produced hundreds of false positives.
