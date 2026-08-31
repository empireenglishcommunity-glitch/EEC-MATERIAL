# EEC Lesson Materials — Implementation Plan (v1.0)

> **Sub-project of:** `.kiro/specs/eec-learning-ecosystem/` · **Reads with:** `./requirements.md`, `./design.md`.
> **How to use:** execute phases in order. **Pilot-first:** one lesson → review → Unit 1 → review → then roll
> out. Each finished lesson is built **from its blueprint** (`curriculum/…`) into a **Student's Edition** +
> **Teacher's Edition** from one source, in the **Empire** style.

## STATUS — 2026-08-31 (read this, not the checkboxes)

**Stage 0 is COMPLETE and shipping — content, portal and PDF. Everything still open is
either a founder review or Phase 5.**

Phases 1–4 are finished: 55 lessons, the 11 unit wrappers, the Stage-0 front matter and
the glossary, all rendered in both the portal and both PDF editions. The three remaining
checkpoints (2.4, 3.4, 4.4) need the founder to look and approve; nothing is blocked on
building. Phase 5 (Stages 1–4, 220 lessons) has not started.

The checkboxes below had drifted badly: every box in Phases 3–6 was unticked while
the PDF pipeline, both coursebook editions and all 55 lessons were already committed
and wired into the portal. They have been corrected against the repository, and each
claim now names the evidence that proves it. Re-derive rather than trust:

| Claim | Evidence | Command |
|---|---|---|
| 55 finished lessons, Stage 0 Units 0–10 | `materials/stage0/unit{0..10}/s0-u*-l*.md` | `find materials -name 's0-*-l*.md' \| wc -l` → 55 |
| 275 lesson blueprints exist across all 5 stages | `curriculum/stage{0..4}/` | `grep -rhoE 'S[0-9]-U[0-9]+-L[0-9]+' curriculum/ \| sort -u \| wc -l` → 275 |
| **20% of the programme is finished material** | 55 of 275 | Stages 1–4 have **no** `materials/` directory at all |
| Stage-0 wrapper exists | `stage0-front-matter.md`, `stage0-glossary.md`, 11 × `unit*-front-matter.md` | `ls materials/stage0/stage0-*.md` |
| Glossary matches the lessons it came from | generated from every **Your Arsenal** table | `cd tools/audit && npm run drift` → 128 entries in sync |
| Portal serves the finished material, not the blueprint | `web/src/lib/lesson-content.ts` | `npm run drift` → 55 lessons + 13 wrapper pages in sync |
| Every lesson meets the anatomy standard | `materials/_style/lesson-anatomy.md` | `npm run anatomy` → 55/55 |
| Both PDF editions are built and shipped | `web/private/coursebook/eec-stage0-{student,teacher}.pdf` | 204 pp / 222 pp; all 6 font families embedded |
| Coursebooks are not world-downloadable | `/api/coursebook/[edition]` | anon → 401/404 · student → 200/404 · teacher → 200/200 |
| Portal + PDF render bilingual text correctly | `globals.css` + `book.css` | `npm run bidi` → 0 failures, 0 advisories over 68 pages |

**Genuinely open, in priority order:**
1. **2.4 / 3.4 / 4.4 — three founder checkpoints.** Nothing is blocked on building;
   these need the founder to look and say yes.
2. **Phase 5 — 220 remaining lessons.** Not started. Build just ahead of the cohort.

**Deploy note:** merging does not deploy this repo's site. See `web/DEPLOY.md`. The
coursebook PDFs are served behind auth from `web/private/`, and **`tools/pdf/setup-env.sh`
must be run before rebuilding them** — a build with the wrong fonts succeeds silently and
drops every emoji and arrow.

---

## Phase 0 — Approve the plan
- [x] 0.1 Founder approves `requirements.md` + `design.md` + this `tasks.md` (and the Empire section-label/rank proposals, or edits them). ✅ *Approval evidenced by 1.5 ("all ok go ahead") and by Phases 1–4 having been executed.*
- [x] 0.2 Add the breadcrumb link from the master `tasks.md` to this sub-spec. ✅

## Phase 1 — Foundations of the material system (write the standard, then ONE lesson)
*Goal: lock the format on a single lesson before repeating it.*
- [x] 1.1 Author `materials/_style/empire-style-guide.md` — voice, ranks, section labels, bilingual convention, honesty lines. ✅
- [x] 1.2 Author `materials/_style/lesson-anatomy.md` — fixed 12-section spec + "done" checklist + Teacher-overlay convention. ✅
- [x] 1.3 Build the **pilot lesson** `materials/stage0/unit1/s0-u1-l01.md` (Student + Teacher overlay, from `S0-U1-L01`). ✅
- [x] 1.4 Wire into the **portal**: `web/src/content/materials-stage0.ts` (embedded) + `web/src/lib/lesson-content.ts` (prefer finished material, strip `[!TEACHER]`, fall back to blueprint). Build verified. ✅ *(live deploy pending — see note)*
- [x] **1.5 CHECKPOINT — pilot approved by founder** ("all ok go ahead"). Format locked. ✅

## Phase 2 — Prove consistency (complete Stage 0 · Unit 1)
- [x] 2.1 Author `s0-u1-l02.md` … `s0-u1-l05.md` (both editions) from blueprints, in the locked format. ✅
- [x] 2.2 Author `unit1-front-matter.md` — Empire campaign wrapper (cover/intro, rank, lessons table, end-of-unit check). ✅
- [x] 2.3 Render full Unit 1 in the portal (finished material embedded; student view strips teacher overlay; build verified). ✅
- [ ] **2.4 CHECKPOINT — founder reviews full Unit 1** (consistency across 5 lessons + the wrapper). ← *awaiting your review.* **Superseded in practice:** all 11 units were authored before this review happened, so reviewing Unit 1 alone no longer de-risks much. Fold it into 4.4.

> **Deploy note:** the portal wiring is code-complete and build-verified, but **merging is not deploying** for
> this repo — the site needs a VPS redeploy to appear on `empireenglish.online`. Runbook: `web/DEPLOY.md`
> and `operations/03-waitlist-n8n-and-redeploy.md`. Any temporary SSH key from an earlier session is expired;
> assume you are starting with no access.

## Phase 3 — Outputs: portal integration + send-ready PDF
- [x] 3.1 Finalize portal rendering of finished material (Empire section styling, Accent Lab card, vocab table, self-check, RTL) — replacing the raw-blueprint rendering for Stage 0 Unit 1. ✅ *`.lesson-prose` in `web/src/app/globals.css` styles headings, vocab tables (scrollable on mobile), blockquote callouts and rules.* **RTL was NOT actually done until 2026-08-31** — lesson prose inherited the page's RTL direction, so 796 English lines rendered their closing punctuation on the wrong side. Fixed via `unicode-bidi: plaintext` (796 misrendered lines → 0); regression-gated by `tools/audit/bidi-render-probe.mjs`.
- [x] 3.2 Choose + build the **PDF pipeline** (RTL-quality, Empire-branded): cover, TOC, unit dividers, page layout, footer branding. ✅ *`tools/pdf/build-book.mjs` (marked + Puppeteer) + `tools/pdf/book.css`; cover, contents, per-unit dividers, running header/footer.*
- [x] 3.3 Generate the **Student coursebook PDF** + **Teacher coursebook PDF** for Unit 1; keep-in-sync mechanism from the single source. ✅ *Built for the whole stage, not just Unit 1: `web/public/coursebook/eec-stage0-{student,teacher}.pdf` (4.4M / 5.3M). Sync is structural — the generator reads `materials/**` directly, and `--unit N` still renders one unit.*
- [ ] **3.4 CHECKPOINT — founder reviews the send-ready PDF** — must look like a real coursebook.

## Phase 4 — Roll out Stage 0 (remaining units)
- [x] 4.1 Units 0 and 2–10 of Stage 0 — both editions, from blueprints, format locked. ✅ *55 lessons across Units 0–10; every one cites its blueprint and passes `npm run anatomy`.*
- [x] 4.2 Stage 0 front-matter (stage cover, "Recruit" rank, roadmap) + Stage-0 glossary. ✅ *`materials/stage0/stage0-front-matter.md` — rank, the 11-unit roadmap, grammar spine, a "how to use this book" map of all 12 section labels, assessment placement and an explicit honesty section. `stage0-glossary.md` — **128 entries**, generated from every lesson's **Your Arsenal** table by `tools/audit/generate-stage0-glossary.mjs` so it cannot drift from what the lessons teach. Both render in the portal and in both PDF editions.*
- [x] 4.3 Regenerate the Stage 0 Student + Teacher coursebook PDFs. ✅ *204 pp student / 222 pp teacher, both including the new wrapper. Rebuild with `cd tools/pdf && ./setup-env.sh && npm run build`, then verify the embedded font list — see that README.*
- [ ] **4.4 CHECKPOINT — Stage 0 complete** (portal + PDF). This is the founding-cohort teaching set. *No longer blocked — 4.2 is done. Awaiting founder review.*
- [x] 4.5 Surface **unit front matter in the portal.** ✅ *(Added 2026-08-31 — a real gap between the two outputs, not in the original plan.)* The embed now carries **13 wrapper pages** alongside the 55 lessons, and three portal routes render them: `/portal/units/[unit]` (the unit campaign wrapper, linked from every unit heading on the dashboard), `/portal/start` (the stage front matter) and `/portal/glossary`.
- [x] 4.6 Serve the coursebook PDFs **behind authentication.** ✅ *(Added 2026-08-31 from the audit.)* They were in `web/public/`, so both editions — including the Teacher's Edition with its answer keys, timings and delivery notes — were downloadable by anyone who guessed the path. Moved to `web/private/` and served by `/api/coursebook/[edition]`: the student edition needs a session, the teacher edition needs `role: "teacher"` or the `ADMIN_TOKEN` header. Verified against a running server across all eight access paths.

## Phase 5 — Roll out upper stages (in order)

**Not started.** All 220 blueprints exist in `curriculum/`; none has been built into finished
material. Counts below are derived, not planned:
`grep -rhoE 'S[0-9]-U[0-9]+-L[0-9]+' curriculum/stageN/ | sort -u | wc -l`.

- [ ] 5.1 **Stage 1 (A2)** — Units 1–10, both editions, front-matter, PDFs. *(Arabic dial fades per blueprint.)* — **50 lessons**
- [ ] 5.2 **Stage 2 (B1)** — Units 1–12, both editions, front-matter, PDFs. — **60 lessons**
- [ ] 5.3 **Stage 3 (B2)** — Units 1–12, both editions, front-matter, PDFs; the **"Coronation"** graduation wrapper. — **60 lessons**
- [ ] 5.4 **Stage 4 (C1)** — Units 1–10, both editions, front-matter, PDFs. — **50 lessons**
- [ ] 5.5 **Exam Track** — TOEFL + IELTS modules turned into finished teacher+student practice material.
- [ ] (Each sub-phase: build just ahead of the cohort per master design §3.4; checkpoint per stage.)

## Phase 6 — Wrap-up
- [ ] 6.1 Full library QA pass against the "done" checklist; consistency + honesty audit. *Stage 0 passed on 2026-08-31 and the checklist is now automated (`cd tools/audit && npm run all`); this stays open until every stage exists to audit.*
- [ ] 6.2 Master coursebook PDFs per stage (student + teacher), send-ready. *Stage 0 done; Stages 1–4 pending their content.*
- [ ] 6.3 Update the master spec + this plan to reflect completion.

---

## Keeping this plan honest

Checkbox drift is the failure mode this spec has already had once: Phases 3 and 4 read
as untouched for weeks while their output was live in the portal and downloadable as a
PDF. Two habits prevent the repeat.

**Tick a box in the same commit as the work,** and name the artefact that proves it —
a path, a command and its output. A box with no evidence beside it is a claim, and
claims are what drifted.

**Re-derive counts, never copy them.** Every number in the status block above has the
command that produced it. If you find yourself writing "55 lessons" from memory, run
the `find` instead: this repo's own portal card, spec plan and PDFs each state counts
independently, and they can only stay equal if nobody guesses.

---

## Sequencing notes
- **Order matters:** Phase 1 (one lesson) must pass review before Phase 2; Stage 0 before upper stages.
- **Build just ahead:** align rollout with where the cohort is (only Stage 0 must be fully finished before the founding cohort teaches it).
- **Single-source discipline:** every lesson = one file → Student + Teacher + portal + PDF. Never fork editions.
- **From blueprint, always:** cite it; flag blueprint issues rather than changing curriculum here.
- **Checkpoints are hard gates:** 1.5, 2.4, 3.4, 4.4, and per-stage in Phase 5.

*This plan produces EEC's finished Empire coursebook — Student's + Teacher's Editions, portal + send-ready PDF —
built faithfully from the curriculum blueprints. Execution begins only after Phase 0 approval.*
