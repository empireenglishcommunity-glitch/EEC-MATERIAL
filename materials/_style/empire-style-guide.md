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

> **⚠️ PALETTE CHANGED 2026-08-31 — two palettes are live during the transition.**
> The public brand is now **obsidian + antique gold**, matching
> `assessment.empireenglish.online` (owner decision, 2026-08-31). The royal-blue
> palette below remains correct for the **portal/web** (`web/`) and the coursebook
> PDFs **until they are rethemed**, which is tracked but not scheduled. Check which
> surface you are designing for before picking a palette.

### Public brand — obsidian + antique gold (new, canonical for public surfaces)
Used by `assessment.empireenglish.online` and `empire-agora` (the sales site).
Tokens are defined in `empire-agora/src/app/globals.css`; derived by measuring the
live assessment app rather than from description.

| Role | Token | Hex |
|--|--|--|
| Page base | `obsidian` | `#0a0a0a` |
| Raised surface | `obsidian-2` | `#111118` |
| Card / elevated panel | `midnight` | `#1a1a2e` |
| Primary accent | `gold` | `#c9a84c` |
| Gradient highlight | `gold-bright` | `#e8d48b` |
| Tertiary accent | `bronze` | `#cd7f32` |
| Primary text on dark | `parchment` | `#e8e0d0` |
| Secondary text | `bronze-muted` | `#a08a68` |

Signature treatments: gold **gradient text fill** on display headings, a
gold-gradient primary button with a soft outer glow, an outlined-gold secondary,
hairline gold rules above section eyebrows, card borders at gold 20% alpha, and a
radial vignette as page atmosphere.

> **Accessibility, non-negotiable:** the assessment app's secondary text
> `#8b7355` on `#0a0a0a` measures **4.43:1** — *below* the WCAG AA 4.5:1 floor for
> body text. Use **`#a08a68`** (≈6.2:1) for anything at body size. `#8b7355` is
> permitted only for large display text and decorative rules, where AA Large (3:1)
> applies. Matching the feel of a surface never means inheriting its defects.

> **Not part of the brand:** the assessment app's cinematic **entry gate**, its
> **ambient audio**, and its **scroll-reveal-gated content** (section content sits
> at `opacity: 0` until an IntersectionObserver fires, so there is no content
> without JavaScript). None of these may be reproduced on a commercial or
> student-facing page: an interstitial between a reader and the offer costs
> conversions, and content that requires JS is invisible to crawlers and to a slow
> Egyptian mobile connection.

### Portal / coursebook — royal-blue + gold (still current for `web/` and PDFs)
- **Palette:** royal-blue (`royal-900/950`) + gold (`gold-500`) — matches the live portal/web. Premium, uncluttered, **academy not influencer.**
- Consistent heading hierarchy, callout boxes, and a fixed **Accent Lab card** + **vocab table** + **self-check** look.
- Arabic + Latin type pairing; generous spacing; mobile-first; **RTL-correct**.
- The theme = restraint + dignity (a real empire's gravitas), never gaudy.

## 4. Bilingual convention
- **Egyptian colloquial Arabic** (Arabic script) for explanation, instruction, and motivation; **English** for target language, examples, and the learner's own output.

> **Register on COMMERCIAL surfaces differs by market (added 2026-08-31).**
> The rule above governs **lesson and learning content**, whose audience is
> Egyptian. On **sales and marketing** surfaces the audience is split, and the
> register follows the currency the visitor is being sold in:
>
> | Path | Register | Why |
> |--|--|--|
> | EGP (inside Egypt) | **Egyptian colloquial**, as above | Same audience as the lessons; warmth and familiarity convert |
> | USD (Gulf & diaspora) | **Light MSA** — clean, warm, no heavy Egyptian idiom | Heavy Egyptian colloquial reads as *foreign* to a Gulf buyer, and the Gulf tier is priced ~3× higher, so it is the segment least able to absorb friction |
>
> This costs nothing to implement: the sales site already shows exactly one
> currency per visitor session, so the register follows a decision that has
> already been made. **Arabic remains the default and canonical path in both
> cases** — English is a secondary surface, never the primary sales language.
> Selling English lessons *in English* filters out the beginners who are the
> largest winnable segment.
>
> This is a narrow extension of this section, not an exception to it. It was
> written into the guide rather than applied behind its back — see
> `empire-agora/.kiro/specs/eec-commercial-and-sales-page/requirements.md` R9.5.
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
