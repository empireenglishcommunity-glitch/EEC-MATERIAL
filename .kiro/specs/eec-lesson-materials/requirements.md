# EEC Lesson Materials — Requirements (v1.0, draft for approval)

> **Sub-project of:** the EEC Learning Ecosystem (master spec: `.kiro/specs/eec-learning-ecosystem/`).
> **Turns:** the lesson **blueprints** in `curriculum/stage0…stage4/` into **finished, Empire-professional
> teaching & learning material** — a **Student's Edition** (learn-alone) and a **Teacher's Edition** (the
> Emperor's teaching copy), generated from **one source**.
> **Reads with:** `brand/01-brand-foundations.md`, `curriculum/02-lesson-template.md`,
> `methodology/01-eec-methodology-handbook.md` (§4 Learning Loop, §6 Arabic fade, §11 error handling),
> `curriculum/05-assessment-suite.md`, `curriculum/03-accent-lab-syllabus.md`.
> **Status:** requirements draft — no material is produced until this + the design are approved, then a
> pilot lesson is reviewed.

---

## 0. Problem & vision

The curriculum blueprints are **complete instructional designs** ("the architect's drawings"): objectives,
target language, lesson flow, Accent Lab focus, Arabic level, assignments — all specified. They are **not**
the finished text a learner reads or the teacher teaches from ("the built house").

**Vision:** a single, consistent, premium body of **written lesson material** — the *Empire coursebook* —
that (a) lets a motivated Arabic-speaking learner **learn on the page**, (b) gives the **Emperor** (teacher)
everything needed to deliver it live, and (c) reads like a **respected international academy's coursebook**,
not a solo-founder handout. Built strictly **from** the blueprints, in the **Empire** identity, honestly.

---

## 1. Scope

**In scope (this sub-project):** the **written/text material only** —
- A **Student's Edition** (self-contained, learn-alone) for every lesson.
- A **Teacher's Edition** (Student's Edition + teaching overlay) for every lesson.
- Delivered **portal-first** (rendered) + a **send-ready PDF "Empire coursebook."**
- The **Empire Style Guide** + fixed **lesson anatomy** that make it consistent and professional.

**Out of scope (parked for later phases/other work):** video production, audio recording pipelines,
slide-deck design, interactive-app widgets beyond what the portal already renders. (The material will
*reference* such assets where the blueprint lists them, but producing them is not this sub-project.)

---

## 2. Functional requirements

### R1 — Single source, two editions
**Story:** As the founder, I want each lesson authored once so the Student's and Teacher's Editions never drift.
- R1.1 Each lesson SHALL have **one source file**; the **Teacher's Edition = the Student's Edition + a clearly-marked teaching overlay**.
- R1.2 The overlay (answers, teaching steps, timings, error notes) SHALL be separable so the Student's Edition can be rendered/exported **without** it.
- R1.3 A change to shared content SHALL update both editions from the single source (no double-maintenance).

### R2 — Self-contained Student's Edition
**Story:** As a learner, I want to be able to learn a lesson on my own.
- R2.1 The Student's Edition SHALL include everything needed to learn the lesson alone: explanation, examples, practice, and a **self-check answer key**.
- R2.2 It SHALL still function as **live-lesson material** (flipped-classroom): the page teaches; the live session is for practice/feedback.

### R3 — Built strictly from the blueprints (traceability)
**Story:** As the founder, I want finished material to faithfully realize the approved design, not invent new curriculum.
- R3.1 Every finished lesson SHALL be produced **from its blueprint** in `curriculum/stageN/…` and SHALL cover its stated objectives, target language, lesson flow, Accent Lab focus, Arabic level, and assignment.
- R3.2 Each finished lesson SHALL **cite its blueprint** (lesson ID + source path). New curriculum content SHALL NOT be introduced; gaps/errors found in a blueprint SHALL be flagged for a blueprint edit, not silently changed.

### R4 — Bilingual per the blueprint's per-stage Arabic levels
**Story:** As an Arabic-speaking learner, I want the right amount of Egyptian-Arabic support for my level.
- R4.1 The Arabic-support level for each lesson SHALL follow **its blueprint** and the Handbook §6 **fade rule** (Stage 0 heavy ~70% → fading → immersion/none by B2–C1).
- R4.2 Explanations/scaffolding SHALL be in **Egyptian colloquial Arabic** (warm, jargon-free; grammar terms glossed); **target language + examples in English**; per brand voice (learner materials = English with Arabic support).
- R4.3 The **degree of Arabic SHALL be visible in the format** (heavier bilingual layout in Stage 0; English-dominant by upper stages) so the material *shows* progress.

### R5 — Consistent lesson anatomy
**Story:** As a learner/teacher, I want every lesson to have the same recognizable structure.
- R5.1 Every finished lesson SHALL follow one **fixed anatomy** mapped to the Learning Loop (warm-up → input → notice → Accent Lab → guided → free/task → feedback/record → assignment/review).
- R5.2 The structure SHALL be recognizable across all lessons/stages (predictability = trust + professionalism).

### R6 — Empire brand identity (Emperor voice + royal/gold visual)
**Story:** As the founder, I want the material to embody the Empire brand and the Emperor-teacher persona.
- R6.1 Voice SHALL be the **Emperor coach**: disciplined, encouraging, confident, warm, honest (per `brand` §7).
- R6.2 Visual identity SHALL be **royal-blue + gold**, premium and tasteful (per `brand` §8; matches the live web/portal).
- R6.3 An **Empire framing** (building your own empire; ranks; "Coronation" at B2 graduation; tasteful crest/seal motifs) SHALL flavor the **wrapper** (covers, unit intros, milestones, progress, section labels).
- R6.4 **Guardrail:** the Empire theme SHALL frame/motivate but NEVER obscure learning — inside a lesson the theme is light-touch; grammar/pronunciation explanations stay clear and practical.

### R7 — Honesty guardrails (GC-5)
- R7.1 Material SHALL promise a **clear, confident, neutral American accent** — never guaranteed native, never "fluent in X days."
- R7.2 Empire framing SHALL reinforce honesty ("an empire is built brick by brick — through consistency, not overnight").

### R8 — Two maintained outputs: portal-first + send-ready PDF
**Story:** As the founder, I want learners to study in the portal AND to always have a polished PDF I can send anytime.
- R8.1 The Student's Edition SHALL render **in the portal** (primary; mobile-first, RTL-correct, always up to date).
- R8.2 From the same source, a **send-ready, branded "Empire coursebook" PDF** SHALL be generatable — polished (cover, branding, layout), kept in sync, presentable to a student/lead/partner at any time.
- R8.3 A Teacher's-Edition PDF (with the overlay) SHALL also be generatable for the founder/teachers.
- R8.4 Sequence: portal rendering first; PDF generation a fast-follow — but the PDF is a **standing deliverable**, not optional polish.

### R9 — Teacher's overlay contents
- R9.1 The Teacher's Edition SHALL add: lesson-at-a-glance + timing, step-by-step delivery ("what to say/do"), **answer keys**, **common Arabic-transfer errors + fixes** (Handbook §11), support/stretch differentiation, and success-check/rubric pointers.

### R10 — Assessment & proof alignment
- R10.1 Each lesson SHALL include its blueprint's **formative check** (practice items / quiz) with a **self-check key** (Student's) and full key (Teacher's).
- R10.2 Each lesson SHALL include the blueprint's **record-yourself task** framed for the **before/after proof** timeline (with the consent norms from `curriculum/06`).

### R11 — Cultural relevance
- R11.1 Examples/contexts SHALL be **culturally real** for the audience (Egyptian + Gulf/diaspora: names, work, family, city life, InstaPay, travel) — never generic.

---

## 3. Non-functional requirements

### N1 — Accessibility & device
- N1.1 Material SHALL be **mobile-first** and **RTL-correct** for Arabic; readable on low bandwidth; equally clear on phone (portal) and paper (PDF).

### N2 — Maintainability & consistency
- N2.1 A written **EEC editorial style guide** (part of the design) SHALL define voice, bilingual convention, section labels, and formatting so every lesson meets the same bar.
- N2.2 A per-lesson **"done" checklist** SHALL gate quality (extends the lesson-template design checklist).

### N3 — Lean production (solo founder)
- N3.1 The format SHALL be **single-source** and **component-reusable** (dialogues, vocab, Accent Lab items) to minimize per-lesson effort at ~24–30 hrs/wk.

### N4 — Sustainability with the platform
- N4.1 The material SHALL integrate with the **existing portal** rendering (which currently renders raw blueprint markdown) and **replace/upgrade** it with the finished Student's Edition.

---

## 4. Process requirements (how we build it)

- P1 — **Spec approval first:** no material is produced until requirements + design are approved.
- P2 — **Pilot-first:** produce **Stage 0 · Unit 1 · Lesson 1** (both editions) → review the *format* → refine → then complete **Unit 1 (L02–L05)** → review → **only then** roll out in full.
- P3 — **Phased rollout, in order:** Stage 0 → 1 → 2 → 3 → 4 (+ exam tracks), unit by unit; committed + pushed in checkpoints.
- P4 — **Blueprint is source of truth:** always build from it; flag blueprint issues rather than改 silently.

---

## 5. Acceptance (definition of done for the sub-project)

- Every lesson has an approved **Student's Edition** (self-contained) + **Teacher's Edition** (overlay), from one source, faithful to its blueprint.
- Material renders in the **portal** and exports to a **send-ready Empire PDF** (student + teacher versions).
- All material conforms to the **Empire Style Guide** + honesty guardrails, with the Arabic fade visible by stage.
- Pilot reviewed and format locked before rollout; each stage reviewed on completion.

---

*Next: `design.md` — the lesson anatomy, the single-source Student/Teacher model, the Empire Style Guide,
the portal + PDF approach, and blueprint traceability. Then `tasks.md` — the phased plan (pilot first).*
