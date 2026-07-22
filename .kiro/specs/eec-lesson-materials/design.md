# EEC Lesson Materials — Design (v1.0, draft for approval)

> **Sub-project of:** `.kiro/specs/eec-learning-ecosystem/` · **Requirements:** `./requirements.md`
> **Reads with:** `brand/01-brand-foundations.md`, `curriculum/02-lesson-template.md` (the Learning Loop),
> `methodology/01-eec-methodology-handbook.md`, `curriculum/03-accent-lab-syllabus.md`, `curriculum/05-assessment-suite.md`.
> **Purpose:** how we turn a blueprint into a finished, Empire-professional lesson — the file model, the
> lesson anatomy, the Student/Teacher single-source mechanics, the Empire Style Guide, and the portal + PDF outputs.

---

## 1. Design principles

1. **Single source → many outputs.** One authored file per lesson → Student's Edition (portal + PDF) + Teacher's Edition (PDF), always in sync.
2. **Built from the blueprint.** The blueprint is the source of truth; the finished lesson *realizes* it (never invents curriculum).
3. **Self-contained, but live-ready.** The page teaches; the Teacher's overlay makes it deliverable live (flipped classroom).
4. **Consistent anatomy.** Every lesson looks the same — the Learning Loop made visible.
5. **Empire frames, learning leads.** Theme lives in the wrapper + identity; inside a lesson it's light so clarity wins.
6. **Honesty always.** Clear/confident American accent; consistency over hype (GC-5).
7. **Lean + reusable.** Components (dialogues, vocab, Accent Lab items) are reusable across portal, PDF, live, and free content.

---

## 2. File & folder model

Finished material lives **separately from the blueprints** (which stay as the design source of truth):

```
curriculum/                      ← BLUEPRINTS (design source of truth; unchanged)
  stage0/ … stage4/

materials/                       ← FINISHED MATERIAL (this sub-project)
  _style/
    empire-style-guide.md        ← the editorial + visual + bilingual standard
    lesson-anatomy.md            ← the fixed section spec + author checklist
    components/                  ← reusable snippets (Accent Lab cards, glossary, rubric card)
  stage0/
    unit1/
      s0-u1-l01.md               ← ONE source file per lesson (student + teacher overlay)
      s0-u1-l02.md
      …
      unit1-front-matter.md      ← unit cover/intro (Empire wrapper) + end-of-unit review
  stage1/ … stage4/
```

- **One markdown file per lesson.** Shared (student) content + a fenced **Teacher overlay** (see §4).
- **Unit front-matter** carries the Empire wrapper (cover, "campaign" intro, rank, end-of-unit review).
- **Portal** reads `materials/…` (replacing today's raw-blueprint rendering). **PDF** is generated from the same files.

---

## 3. The finished lesson anatomy (Student's Edition)

Every lesson renders these sections **in order**, mapped 1:1 to the Learning Loop and the blueprint. (Empire
labels are proposed; **final labels confirmed in the pilot.** Functional clarity always shown alongside.)

| # | Section (Empire label · function) | What it contains | From blueprint field |
|--|--|--|--|
| 0 | **Lesson header** | Lesson ID, title, stage/rank, "~X min", prerequisites | metadata |
| 1 | **Your Conquest** (Objectives) | "By the end you'll be able to…" (bilingual) | objectives |
| 2 | **Why this matters** | 1–2 warm lines in Egyptian Arabic (motivation) | (derived from theme) |
| 3 | **Warm-up** (recall) | quick retrieval of prior language | flow phase 1 |
| 4 | **Watch & Listen** (Input) | the dialogue/reading **written out** in English + Egyptian-Arabic gloss; a media placeholder where the blueprint lists a clip | flow phase 2 + target language |
| 5 | **Decode it / القاعدة** (Notice) | the grammar/pattern explained **clearly in Egyptian Arabic**, with English examples; jargon-free | flow phase 3 + grammar |
| 6 | **Your Arsenal** (Vocabulary) | word table: English · Egyptian-Arabic · example sentence | target vocab |
| 7 | **Accent Lab** (signature) | the sound, Arabic articulation tip, minimal pairs, the practice phrase, record-and-compare prompt | Accent Lab focus |
| 8 | **Train** (Guided practice) | written exercises (fill-in, matching, transform, choose) | flow phase 5 |
| 9 | **Your Turn** (Free output / task) | the speaking/communicative task + the **record-yourself** prompt | flow phases 6–7 |
| 10 | **Your Orders** (Assignment) | homework (speaking-biased) + community post | assignment |
| 11 | **Remember** (Review) | what resurfaces + spaced-review note | review queue |
| 12 | **Self-check** (answer key) | answers to the Train exercises (for learn-alone) | derived |

- **Accent Lab, "Your Turn," and the record task are mandatory** (they carry EEC's method + proof engine).
- Section labels are **light-touch imperial**; the **functional name is always present** (e.g., "Decode it — القاعدة").

---

## 4. Single-source Student/Teacher mechanics

One file; the **Teacher overlay** is authored inline but clearly fenced so it can be stripped for the Student's Edition.

**Convention (to finalize in pilot — candidate approach):** teacher-only blocks are marked with a container the renderer/exporter recognizes, e.g.:

```
> [!TEACHER]
> **Delivery:** … what to say/do, timing …
> **Answers:** … full answer key …
> **Watch for:** … common Arabic-transfer errors + the fix (Handbook §11) …
> **Support / Stretch:** …
```

- **Student's Edition render/export:** strips all `[!TEACHER]` blocks → clean learner material + self-check key.
- **Teacher's Edition render/export:** includes them → the Emperor's full teaching copy.
- Shared content (input, notice, vocab, Accent Lab, exercises, task) is written **once**; only the overlay is teacher-only.

**Teacher overlay always contains (per R9):** lesson-at-a-glance + timing · step-by-step delivery · full answer keys · common errors + fixes · support/stretch · success-check/rubric pointers · live-session tie-in.

---

## 5. The Empire Style Guide (summary; full version → `materials/_style/empire-style-guide.md`)

**Voice — "the Emperor coach":** disciplined, encouraging, confident, warm, honest (brand §7). Speaks to
*"you."* Motivates through discipline + belonging, never hype. In Arabic sections: friendly Egyptian colloquial.

**Empire framing (where it lives):**
- **Strong** in the wrapper: **unit covers, "campaign" intros, ranks per stage, progress, and the B2 "Coronation."** Tasteful crest/seal/laurel motifs; royal-blue + gold.
- **Light** inside lessons: section labels carry a subtle imperial flavor **with the functional name always shown**; the actual teaching stays plain and clear.
- **Ranks (proposed, confirm in pilot):** Stage 0 *Recruit* → Stage 1 *Citizen* → Stage 2 *Legionary* → Stage 3 *Confident (Coronation)* → Stage 4 *Advanced/Sovereign*. (CEFR label always shown too.)
- **Proposed section labels (confirm in pilot):** Your Conquest · Watch & Listen · Decode it (القاعدة) · Your Arsenal · Accent Lab · Train · Your Turn · Your Orders · Remember · Self-check. **Guardrail: clarity first — cut any label that confuses beginners.**

**Visual standard:** royal-blue (`royal-900/950`) + gold (`gold-500`) from the live portal; premium, uncluttered, academy-not-influencer; consistent heading/callout/icon system; Arabic + Latin type pairing.

**Bilingual convention:**
- Egyptian **colloquial** Arabic for explanation/instruction/motivation (grammar terms glossed); **English** for target language + examples + the learner's output.
- **Arabic volume per stage** = the blueprint's fade level (Stage 0 heavy → immersion by B2–C1); the *format shows* the fade (more Arabic callouts early, fewer later).
- RTL-correct Arabic; clean mixing of RTL explanation + LTR English examples.

**Honesty lines (reusable):** "clear, confident American accent — not guaranteed native"; "an empire is built brick by brick"; "consistency beats intensity."

**Cultural relevance:** Egyptian + Gulf/diaspora names, jobs, contexts (Cairo, family, work, InstaPay, travel).

---

## 6. Portal integration (primary output)

- The portal today renders **raw blueprint markdown** from `curriculum/stage0/` (embedded server-side).
- **This sub-project switches the source to `materials/…`** and renders the **Student's Edition** (teacher blocks stripped).
- Renderer must: strip `[!TEACHER]` blocks, style the Empire sections (callouts, Accent Lab card, vocab table, self-check), handle RTL, and keep the existing record-and-compare + progress + quiz hooks.
- Teacher's Edition may be exposed behind the admin/teacher view (not to learners).
- **Sequence:** wire the finished Stage 0 Unit 1 into the portal during the pilot to validate rendering.

## 7. PDF generation (standing, send-ready output)

- From the same `materials/…` source, generate a **branded "Empire coursebook" PDF**:
  - **Cover** (Empire crest, title, stage/rank), table of contents, per-unit dividers, consistent page layout, RTL support, page numbers, footer branding.
  - **Student coursebook** (teacher blocks stripped) + a separate **Teacher's coursebook** (overlay included).
- Kept **in sync** with the source (regenerate on change) so a polished PDF is **always ready to send**.
- **Approach (decide in the PDF phase):** a markdown→PDF pipeline (e.g., a styled HTML→PDF step reusing the portal's Empire CSS, or Pandoc + a LaTeX/CSS template). Chosen for RTL quality + branding fidelity; runs from the single source.

## 8. Blueprint traceability

- Each finished lesson header cites its blueprint (**lesson ID + source path**, e.g., `curriculum/stage0/unit1-…md · S0-U1-L01`).
- The finished lesson must cover the blueprint's objectives, target language, flow, Accent Lab focus, Arabic level, assignment.
- Blueprint gaps/errors → **flagged for a blueprint edit** (a note to the founder), never silently changed here.

## 9. Quality bar / "done" checklist (per lesson)

A finished lesson is done only when all are true:
- [ ] Faithful to its blueprint (objectives, target language, flow, Accent Lab, Arabic level, assignment) + cites it.
- [ ] Full anatomy present (§3), in order; Accent Lab + record task included.
- [ ] Student's Edition is **self-contained** (explanations + examples + practice + **self-check key**).
- [ ] Teacher overlay complete (delivery, answers, common errors, differentiation, success check).
- [ ] Bilingual dial matches the stage fade; Arabic is warm, clear Egyptian colloquial; grammar terms glossed.
- [ ] Empire voice + visual conventions applied; theme light inside the lesson; **clarity first**.
- [ ] Honesty guardrails respected (no native/overnight promises).
- [ ] Culturally real examples.
- [ ] Renders cleanly in the portal (RTL correct) and exports cleanly to PDF.

## 10. Risks & mitigations

- **Over-theming hurts clarity** → guardrail R6.4; light-touch in-lesson; pilot review checks this.
- **Student/Teacher drift** → single-source with fenced overlay (§4).
- **Scope explosion (275 lessons)** → strict pilot-first + phased rollout; component reuse; lean single-source.
- **RTL/PDF fidelity** → validate RTL in the portal during pilot; choose a PDF pipeline proven for RTL + branding before the PDF phase.
- **Blueprint drift** → traceability + flag-don't-change rule (§8).

---

*Next: `tasks.md` — the phased plan (spec approval → pilot lesson → Unit 1 → outputs → full rollout).*
