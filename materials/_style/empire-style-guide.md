# EEC Empire Style Guide (v1.0)

> **Sub-project:** `.kiro/specs/eec-lesson-materials/` · **Reads with:** `brand/01-brand-foundations.md`,
> `curriculum/02-lesson-template.md`, `methodology/01-eec-methodology-handbook.md` (§6 Arabic fade).
> **Purpose:** the single editorial + visual + bilingual standard every finished lesson follows, so the whole
> Empire coursebook feels consistent, premium, and unmistakably EEC. Applies to both the **Student's Edition**
> and the **Teacher's Edition** (which is the Student's Edition + a fenced overlay).

---

## 1. Voice — "the Emperor coach"
- **Disciplined, encouraging, confident, warm, honest.** Speaks directly to *"you."*
- Motivates through **discipline + belonging + small wins** — never hype.
- Arabic sections: **friendly Egyptian colloquial** (like a warm mentor, not a formal textbook), grammar terms glossed.
- English (target language + examples + the learner's output): clear, natural, modern American English.
- **Honesty is non-negotiable (GC-5):** promise *clear, confident, neutral American accent* — never "native," never "fluent in X days." Reusable lines:
  - *"An empire is built brick by brick — بلبنة كل يوم."*
  - *"Consistency beats intensity — الاستمرار أهم من الشدّة."*
  - *"Clear and confident, not 'native'."*

## 2. Empire framing — where the theme lives
- **Strong** in the **wrapper**: unit/stage covers, "campaign" intros, **ranks**, progress, and the B2 **"Coronation."** Tasteful crest / seal / laurel motifs.
- **Light** inside a lesson: section labels carry a subtle imperial flavor **with the functional name + Arabic always shown**. The actual teaching stays plain and clear.
- **Guardrail:** the theme *frames and motivates*; it must **never** obscure learning. If a label would confuse a scared Stage-0 beginner, the functional/Arabic name leads.

### Ranks (stage titles) — CEFR always shown alongside
| Stage | CEFR | Empire rank |
|--|--|--|
| 0 | Pre-A1 / A1 | **Recruit** |
| 1 | A2 | **Citizen** |
| 2 | B1 | **Legionary** |
| 3 | B2 | **Confident** (the **Coronation** — flagship graduation) |
| 4 | C1 (+Exam) | **Sovereign** |

### Section labels (Student's Edition) — label · function · Arabic
| Order | Empire label | Function | Arabic |
|--|--|--|--|
| 1 | **Your Conquest** | Objectives | هدفك |
| 2 | **Why this matters** | Motivation hook | ليه ده مهم |
| 3 | **Warm-up** | Recall/retrieval | سخّن |
| 4 | **Watch & Listen** | Input | اسمع وشوف |
| 5 | **Decode it** | Grammar/pattern (in Arabic) | القاعدة |
| 6 | **Your Arsenal** | Vocabulary | ذخيرتك |
| 7 | **Accent Lab** | Pronunciation (signature) | معمل النطق |
| 8 | **Train** | Guided practice | تدرّب |
| 9 | **Your Turn** | Free output + record task | دورك |
| 10 | **Your Orders** | Assignment/homework | مهمتك |
| 11 | **Remember** | Review + spaced-review note | افتكر |
| 12 | **Self-check** | Answer key (learn-alone) | صحّح لنفسك |

A label may carry a **parenthetical qualifier** — `هدفك (milestone)`, `القاعدة (have / has)`,
`سخّن (سلسلة)` — but the label itself is fixed. Non-teaching lessons use a small set of accepted
**alternative** labels (`النموذج`, `عيادة النطق`, `التسجيل`, `الطريقة`); the full table lives in
`lesson-anatomy.md` §1b and is enforced by `tools/audit/check-lesson-anatomy.mjs`.

*(Emoji/icon per section is allowed for scannability but must stay consistent across all lessons — so
decorate the label set, never a single lesson's copy of it.)*

## 3. Visual standard
- **Palette:** royal-blue (`royal-900/950`) + gold (`gold-500`) — matches the live portal/web. Premium, uncluttered, **academy not influencer.**
- Consistent heading hierarchy, callout boxes, and a fixed **Accent Lab card** + **vocab table** + **self-check** look.
- Arabic + Latin type pairing; generous spacing; mobile-first; **RTL-correct**.
- The theme = restraint + dignity (a real empire's gravitas), never gaudy.

## 4. Bilingual convention
- **Egyptian colloquial Arabic** (Arabic script) for explanation, instruction, and motivation; **English** for target language, examples, and the learner's own output.
- **Arabic volume per stage = the blueprint's fade level** (Stage 0 heavy ~70% → immersion by B2–C1). The **format shows the fade**: many Arabic callouts/glosses early; fewer later; by B2 the page is English-only.
- **Layout for mixed content:** use tables (English | Arabic) or an English line immediately followed by an Arabic gloss/explanation. Keep RTL Arabic and LTR English cleanly separated (don't interleave within a single run).
- Grammar terms: gloss in plain Arabic (e.g., "الـ *to be* — فعل الكينونة").
- **Bidi rule — a line should not start in one script and be mostly the other.** Renderers pick a line's
  base direction from its **first strong character**, so a line that opens in Arabic but is mostly English
  (or the reverse) has no correct place to put its closing `.` or `?` — the punctuation lands at the wrong
  end and reads as a typo. Prefer a table row, or two lines, or an Arabic line that closes in Arabic. Both
  renderers set `unicode-bidi: plaintext` (`tools/pdf/book.css`, `web/src/app/globals.css`), which handles
  every line whose direction is unambiguous; these mixed-opening lines are the residue only an editor can
  fix. Find them with `cd tools/audit && npm run bidi:verbose`.

## 5. Cultural relevance
- Names, jobs, places, and situations are **real for the audience**: Egyptian + Gulf/diaspora (Cairo, Alexandria, family, work, university, InstaPay, travel to the Gulf). Never generic "John and Mary in London."

## 6. Formatting conventions (mechanics)
- **Lesson file header** cites the blueprint: `Built from: curriculum/…​ · <LESSON-ID>`.
- **Teacher overlay** = fenced callouts the exporter/renderer recognizes and can strip:
  ```
  > [!TEACHER]
  > **At a glance / Delivery / Answers / Watch for / Support · Stretch / Success check**
  ```
  Everything **outside** `[!TEACHER]` blocks = the Student's Edition. Everything **inside** = teacher-only.
- **Shared content is written once;** only the overlay is teacher-only (no forked editions).
- **Self-check** (student answer key) lives at the end of the Student's Edition; the Teacher overlay also carries full answers inline where useful.
- Honesty lines and the Empire sign-off close each lesson.

## 7. The per-lesson "done" bar
A lesson ships only when it passes the checklist in `lesson-anatomy.md` §Done-Checklist (faithful to blueprint,
full anatomy, self-contained, complete teacher overlay, correct Arabic dial, Empire voice/visual with clarity
first, honesty intact, culturally real, renders clean in portal + PDF).

---

*This guide is the source of truth for style. If a lesson and this guide disagree, the guide wins (and we fix the lesson).*
