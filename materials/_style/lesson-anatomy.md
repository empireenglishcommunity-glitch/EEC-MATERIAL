# EEC Lesson Anatomy (v1.0)

> **Sub-project:** `.kiro/specs/eec-lesson-materials/` · **Reads with:** `empire-style-guide.md`,
> `curriculum/02-lesson-template.md` (the Learning Loop this maps to).
> **Purpose:** the exact structure of every finished lesson + the Teacher-overlay convention + the
> per-lesson "done" checklist.
> **Enforced by:** `tools/audit/check-lesson-anatomy.mjs` (`cd tools/audit && npm run anatomy`). If this
> document and that script ever disagree, that is a bug in one of them — fix both in the same commit.

---

## 1. The fixed section order (Student's Edition)

Every lesson renders these **in this order**, mapped 1:1 to the Learning Loop and drawn from the blueprint.
Each section header shows the **Empire label + function + Arabic** (per the style guide §2).

| # | Section | Learning-Loop phase | Sourced from blueprint |
|--|--|--|--|
| 0 | **Header** (ID · title · rank/stage · time · prereq · blueprint citation) | — | metadata |
| 1 | **Your Conquest** — هدفك (objectives, bilingual) | (goal) | objectives (can-do) |
| 2 | **Why this matters** — ليه ده مهم (1–2 warm Arabic lines) | (motivation) | derived from theme/mindset |
| 3 | **Warm-up** — سخّن (recall) | Warm-up/recall | flow phase 1 |
| 4 | **Watch & Listen** — اسمع وشوف (dialogue/reading written out + Arabic gloss; media placeholder) | Input | flow phase 2 + target language |
| 5 | **Decode it** — القاعدة (grammar in clear Egyptian Arabic + English examples) | Notice | flow phase 3 + grammar |
| 6 | **Your Arsenal** — ذخيرتك (vocab table: English · Arabic · example) | (input/consolidate) | target vocab |
| 7 | **Accent Lab** — معمل النطق (sound + Arabic tip + minimal pairs + practice phrase + record-and-compare) | Accent Lab | Accent Lab focus |
| 8 | **Train** — تدرّب (written exercises) | Guided output | flow phase 5 |
| 9 | **Your Turn** — دورك (communicative task + record-yourself prompt) | Free output + feedback | flow phases 6–7 |
| 10 | **Your Orders** — مهمتك (assignment/homework + community post) | Assignment | assignment |
| 11 | **Remember** — افتكر (what resurfaces + spaced-review note) | Review/queue | review queue |
| 12 | **Self-check** — صحّح لنفسك (answer key to Train) | (self-study) | derived |
| — | **Empire sign-off** (honesty line + 👑) | — | style guide §1 |

### 1a. Mandatory sections, by lesson type

A **teaching lesson** — the default, and 41 of Stage 0's 55 — must carry all seven of:
Your Conquest, Watch & Listen, Decode it, Accent Lab, Your Turn (with record task), Your Orders, Self-check.
Accent Lab and the record task are never dropped from a teaching lesson: they carry the method and the proof
engine.

Four lesson types legitimately differ, because they are not teaching new language. They are listed here — and
in the checker — so that a deliberate variant is distinguishable from a lesson someone left half-finished:

| Type | Which lessons | Must carry | Why it differs |
|--|--|--|--|
| **teaching** | all others (41) | the seven above | the default |
| **unit-task** | every `L05` in Units 1–9 (10) | Your Conquest, Watch & Listen, Accent Lab, Your Turn, Your Orders, Self-check | the unit's speaking milestone: it **performs** the unit's language, so "Decode it" is replaced by a performance checklist and Accent Lab becomes a clinic on the learner's own flagged weak sound |
| **review** | `S0-U10-L01`, `L02`, `L04` (3) | Your Conquest, Your Turn, Your Orders, Self-check | consolidation across ten units — there is no single new rule to decode |
| **orientation** | `S0-U0-L01` (1) | Your Conquest, Your Turn, Your Orders | teaches no language at all; its job is commitment and emotional safety, and the first sounds lesson is `L03` |
| **stage-finale** | `S0-U10-L05` (1) | Your Conquest | an assessment script (quiz → speaking task → graduation sample → result → log), numbered by step rather than by anatomy section |

### 1b. Accepted Arabic sub-labels

Each section header is `Empire label — Arabic`. The Arabic may appear bare or with a parenthetical
qualifier — `هدفك` and `هدفك (milestone)` are both correct; a reworded label is not.

Some sections have more than one accepted Arabic label, because non-teaching lessons use a consistent
alternative vocabulary: a unit-task lesson shows **النموذج** (the model) rather than "اسمع وشوف", runs an
Accent **عيادة** (clinic) rather than a **معمل** (lab), and calls Your Turn **التسجيل** (the recording). A
pronunciation lesson explains **الطريقة** (the method) rather than **القاعدة** (the rule), because it is
teaching articulation and not grammar.

| Section | Accepted Arabic |
|--|--|
| Your Conquest | `هدفك` |
| Why this matters | `ليه ده مهم` |
| Warm-up | `سخّن` |
| Watch & Listen | `اسمع وشوف` · `اسمع` · `النموذج` |
| Decode it | `القاعدة` · `الطريقة` · `طقم النجاة` · `إزاي بقّك بيعمل الصوت` |
| Your Arsenal | `ذخيرتك` |
| Accent Lab | `معمل النطق` · `عيادة النطق` |
| Train | `تدرّب` · `البروفة الكاملة` |
| Your Turn | `دورك` · `التسجيل` |
| Your Orders | `مهمتك` |
| Remember | `افتكر` |
| Self-check | `صحّح لنفسك` · `Unit N mini-quiz` |

Adding a new label is a deliberate decision: put it in this table and in the checker, or don't use it.

## 2. The Teacher overlay (what makes it the Teacher's Edition)

Teacher-only content is written **inline** in the same file, inside fenced callouts:

```
> [!TEACHER]
> **At a glance:** objectives + total timing (phase minutes).
> **Delivery:** step-by-step "what to say/do" for the section it sits under.
> **Answers:** full key for that section's exercises.
> **Watch for:** the predictable Arabic-transfer errors + the fix (Handbook §11).
> **Support · Stretch:** differentiation.
> **Success check:** how you know they got it (rubric pointer where relevant).
```

Rules:
- Place a small `[!TEACHER]` block **under the section it supports** (e.g., delivery + answers under Train).
- Put **one "At a glance"** block near the top (objectives + timing + differentiation summary).
- **Student's Edition** = the file with all `[!TEACHER]` blocks stripped. **Teacher's Edition** = the full file.
- Never duplicate shared content into the overlay — the overlay only adds teacher value.

## 3. Bilingual dial by stage (from the blueprint / Handbook §6)

| Stage | Arabic in explanations | Practically |
|--|--|--|
| 0 (Recruit) | ~70% | most explanation + all glosses in Egyptian Arabic |
| 1 (Citizen) | ~40% | key concepts glossed in Arabic; more English |
| 2 (Legionary) | ~15% → none | Arabic only for the trickiest points; English-dominant |
| 3 (Confident) | none (immersion) | English-only |
| 4 (Sovereign) | none | English-only |

The **format visibly reflects** this (fewer Arabic callouts as stages rise).

## 4. Per-lesson "Done" checklist (the quality gate)

A lesson ships only when **all** are true:
- [ ] **Faithful to its blueprint** (objectives, target language, flow, Accent Lab focus, Arabic level, assignment) **and cites it** in the header.
- [ ] **Full anatomy** present (§1), in order; **Accent Lab + record task** included.
- [ ] Student's Edition is **self-contained** — a motivated learner could complete it alone (explanations + examples + practice + **self-check key**).
- [ ] **Teacher overlay** complete (at-a-glance, delivery, answers, watch-for, support/stretch, success check).
- [ ] **Bilingual dial matches the stage**; Arabic is warm, clear Egyptian colloquial; grammar terms glossed.
- [ ] **Empire voice + visual** applied; theme **light inside the lesson**; clarity always wins.
- [ ] **Honesty guardrails** respected (no native/overnight promises).
- [ ] **Culturally real** examples.
- [ ] Renders cleanly in the **portal** (RTL correct) and exports cleanly to **PDF**.

---

*If a lesson can't tick every box, it isn't done. This checklist + the style guide are the definition of "Empire-professional."*
