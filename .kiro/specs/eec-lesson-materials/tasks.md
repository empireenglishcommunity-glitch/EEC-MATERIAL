# EEC Lesson Materials — Implementation Plan (v1.0, draft for approval)

> **Sub-project of:** `.kiro/specs/eec-learning-ecosystem/` · **Reads with:** `./requirements.md`, `./design.md`.
> **How to use:** execute phases in order. **Pilot-first:** one lesson → review → Unit 1 → review → then roll
> out. Each finished lesson is built **from its blueprint** (`curriculum/…`) into a **Student's Edition** +
> **Teacher's Edition** from one source, in the **Empire** style. Check items off as completed.
> **Rule:** do not start Phase 1 until requirements + design are approved.

---

## Phase 0 — Approve the plan
- [ ] 0.1 Founder approves `requirements.md` + `design.md` + this `tasks.md` (and the Empire section-label/rank proposals, or edits them).
- [ ] 0.2 Add the breadcrumb link from the master `tasks.md` to this sub-spec.

## Phase 1 — Foundations of the material system (write the standard, then ONE lesson)
*Goal: lock the format on a single lesson before repeating it.*
- [ ] 1.1 Author `materials/_style/empire-style-guide.md` — full voice + visual + bilingual convention + final section labels + ranks + honesty lines.
- [ ] 1.2 Author `materials/_style/lesson-anatomy.md` — the fixed section spec + the per-lesson "done" checklist + the Teacher-overlay convention.
- [ ] 1.3 Build the **pilot lesson**: `materials/stage0/unit1/s0-u1-l01.md` — Student's Edition + Teacher overlay, **from blueprint `S0-U1-L01`** (single source).
- [ ] 1.4 Wire it into the **portal** (render the Student's Edition from `materials/…`, teacher blocks stripped, RTL correct) as the working sample.
- [ ] **1.5 CHECKPOINT — founder reviews the pilot lesson** (format, voice, bilingual dial, Empire feel, clarity). Refine until approved. *No further lessons until this passes.*

## Phase 2 — Prove consistency (complete Stage 0 · Unit 1)
- [ ] 2.1 Author `s0-u1-l02.md` … `s0-u1-l05.md` (both editions) from their blueprints, applying the locked format.
- [ ] 2.2 Author `unit1-front-matter.md` — the Empire unit wrapper (cover/"campaign" intro, rank, end-of-unit review) + the unit's formative check surfaced as material.
- [ ] 2.3 Render the full Unit 1 in the portal.
- [ ] **2.4 CHECKPOINT — founder reviews full Unit 1** (consistency across 5 lessons + the wrapper). Refine the style guide if needed.

## Phase 3 — Outputs: portal integration + send-ready PDF
- [ ] 3.1 Finalize portal rendering of finished material (Empire section styling, Accent Lab card, vocab table, self-check, RTL) — replacing the raw-blueprint rendering for Stage 0 Unit 1.
- [ ] 3.2 Choose + build the **PDF pipeline** (RTL-quality, Empire-branded): cover, TOC, unit dividers, page layout, footer branding.
- [ ] 3.3 Generate the **Student coursebook PDF** + **Teacher coursebook PDF** for Unit 1; keep-in-sync mechanism from the single source.
- [ ] **3.4 CHECKPOINT — founder reviews the send-ready PDF** (Unit 1) — must look like a real coursebook.

## Phase 4 — Roll out Stage 0 (remaining units)
- [ ] 4.1 Units 0 and 2–10 of Stage 0 — both editions, from blueprints, format locked. (Note: Stage 0 has Units 0–10; sequence Unit 0 → Unit 2 → … after the Unit-1 pilot.)
- [ ] 4.2 Stage 0 front-matter (stage cover, "Recruit" rank, roadmap) + Stage-0 glossary.
- [ ] 4.3 Regenerate the Stage 0 Student + Teacher coursebook PDFs.
- [ ] **4.4 CHECKPOINT — Stage 0 complete** (portal + PDF). This is the founding-cohort teaching set.

## Phase 5 — Roll out upper stages (in order)
- [ ] 5.1 **Stage 1 (A2)** — Units 1–10, both editions, front-matter, PDFs. *(Arabic dial fades per blueprint.)*
- [ ] 5.2 **Stage 2 (B1)** — Units 1–12, both editions, front-matter, PDFs.
- [ ] 5.3 **Stage 3 (B2)** — Units 1–12, both editions, front-matter, PDFs; the **"Coronation"** graduation wrapper.
- [ ] 5.4 **Stage 4 (C1)** — Units 1–10, both editions, front-matter, PDFs.
- [ ] 5.5 **Exam Track** — TOEFL + IELTS modules turned into finished teacher+student practice material.
- [ ] (Each sub-phase: build just ahead of the cohort per master design §3.4; checkpoint per stage.)

## Phase 6 — Wrap-up
- [ ] 6.1 Full library QA pass against the "done" checklist; consistency + honesty audit.
- [ ] 6.2 Master coursebook PDFs per stage (student + teacher), send-ready.
- [ ] 6.3 Update the master spec + this plan to reflect completion.

---

## Sequencing notes
- **Order matters:** Phase 1 (one lesson) must pass review before Phase 2; Stage 0 before upper stages.
- **Build just ahead:** align rollout with where the cohort is (only Stage 0 must be fully finished before the founding cohort teaches it).
- **Single-source discipline:** every lesson = one file → Student + Teacher + portal + PDF. Never fork editions.
- **From blueprint, always:** cite it; flag blueprint issues rather than changing curriculum here.
- **Checkpoints are hard gates:** 1.5, 2.4, 3.4, 4.4, and per-stage in Phase 5.

*This plan produces EEC's finished Empire coursebook — Student's + Teacher's Editions, portal + send-ready PDF —
built faithfully from the curriculum blueprints. Execution begins only after Phase 0 approval.*
