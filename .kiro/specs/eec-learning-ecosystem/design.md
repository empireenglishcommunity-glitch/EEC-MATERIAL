# EEC Learning Ecosystem — Design

> **Spec:** EEC Learning Ecosystem
> **Version:** 1.0 (draft for approval)
> **Reads with:** `requirements.md` (what) and `strategy/01-foundational-strategy.md` (why)
> **Purpose:** Define *how* the EEC ecosystem is architected — the pedagogy engine, curriculum
> structure, assessment design, signature systems, delivery model, business mechanics, tooling, and
> quality standards — at a level detailed enough to implement from.

---

## 1. System overview

EEC is architected as a **funnel of nested learning experiences**, each stage increasing commitment,
support, and outcome:

```
                 ┌─────────────────────────────────────────────┐
                 │  LAYER 1: FREE CONTENT ENGINE (reach/trust)   │
                 │  YouTube · TikTok · IG/Reels · Egyptian Arabic│
                 └───────────────────┬───────────────────────────┘
                                     │  CTA → waitlist
                 ┌───────────────────▼───────────────────────────┐
                 │  ENTRY CHALLENGE (7–14 days, low price)        │
                 │  filters serious learners · first quick win    │
                 └───────────────────┬───────────────────────────┘
                                     │  upsell
                 ┌───────────────────▼───────────────────────────┐
                 │  LAYER 2: FLAGSHIP COHORT PROGRAM (core)       │
                 │  hybrid: recorded + live + community + coaching │
                 │  CEFR levels · Accent Lab · mindset engine     │
                 └───────────────────┬───────────────────────────┘
                                     │  on graduation
                 ┌───────────────────▼───────────────────────────┐
                 │  LAYER 3: COMMUNITY MEMBERSHIP (retention/MRR) │
                 │  speaking clubs · live practice · challenges    │
                 └─────────────────────────────────────────────────┘
```

Cross-cutting engines that run through every layer: **the EEC Method**, **assessment/measurement**,
**the Accent Lab**, **the mindset/accountability system**, and **brand**.

---

## 2. The EEC Method (pedagogy engine)

**Design principle:** every learning experience is a loop — *Input → Notice → Produce → Feedback →
Review* — repeated at increasing difficulty.

### 2.1 The learning loop (applied to every lesson)

1. **Input (i+1):** learner consumes level-appropriate, interesting English (audio/video/text) that is
   ~90% comprehensible with some new language.
2. **Notice:** the target structure/sound/vocabulary is made salient (highlighted, explained — in
   Arabic at low levels, in English at higher levels).
3. **Produce (pushed output):** learner is required to speak/write using the target, early and often.
4. **Feedback:** correction from coach, peer, self-check, or model comparison — especially on speaking.
5. **Review (spaced):** the item resurfaces on a spaced schedule in later lessons and challenges.

### 2.2 Skill weighting by level

| Level | Speaking | Listening | Reading | Writing | Arabic support |
|------|:--:|:--:|:--:|:--:|:--|
| Pre-A1 / A1 | ●●● | ●●● | ● | ● | Heavy (explanations in Arabic) |
| A2 | ●●● | ●●● | ●● | ●● | Moderate (fading) |
| B1 | ●●● | ●●● | ●● | ●● | Light |
| B2 | ●●● | ●●● | ●●● | ●●● | None (immersion) |
| C1 / Exam | ●●● | ●●● | ●●● | ●●● | None |

### 2.3 The Arabic-scaffold fade

Arabic is a *scaffold*, not a crutch. Design rule: at each level, the proportion of Arabic in
explanations, instructions, and examples steps down (e.g., ~70% → 40% → 15% → 0%). Learner-facing
instructions cross to English-only by B1.

---

## 3. Curriculum architecture

### 3.1 Hierarchy

```
Program
 └── Stage (CEFR level: Pre-A1/A1, A2, B1, B2, C1)
      └── Unit (theme, e.g., "Introducing Yourself", "Work & Careers")
           └── Lesson (single learning loop; ~20–40 min)
                └── Components: Input · Language focus · Accent Lab drill · Output task · Review
```

### 3.2 Level blueprint (each Stage defines these)

- **Entry & exit criteria** (measurable "can-do" statements).
- **Target vocabulary range** (e.g., A1 ≈ first 500–800 high-frequency words).
- **Target grammar & functions** (e.g., present simple, questions, there is/are…).
- **Accent Lab focus** (which interference points are drilled).
- **Mindset focus** (which habit/identity lessons run).
- **Estimated study-hours budget** (for planning cohort length).
- **Summative assessment** (speaking-weighted, CEFR-aligned).

### 3.3 Standard lesson anatomy (template)

1. **Warm-up / activation** (recall prior + spaced review).
2. **Input** (story/dialogue/video, comprehensible).
3. **Language focus** (grammar/vocab in context; Arabic support per level).
4. **Accent Lab micro-drill** (target sounds/prosody).
5. **Guided output** (controlled practice).
6. **Free output** (communicative speaking task).
7. **Feedback & self-record** (produce evidence).
8. **Assignment + spaced-review queue** (what resurfaces later).

### 3.4 Build strategy

Build **just ahead of the founding cohort**: complete Stage 0 (Pre-A1/A1) fully before launch, then
build A2, B1, B2 as the cohort climbs. CEFR blueprint keeps everything coherent even while incremental.

---

## 4. Assessment & measurement design

### 4.1 Assessment types

- **Placement test:** short adaptive quiz + a 2–3 min speaking sample → assigns starting level.
- **Formative checks:** end-of-unit low-stakes quizzes + speaking tasks (feedback, not gatekeeping).
- **Summative level test:** end-of-stage; determines level completion; speaking-weighted.
- **Exam Track (optional, upper levels):** TOEFL iBT / IELTS practice + mock tests.

### 4.2 Speaking rubric (CEFR-aligned, 5 dimensions, 0–5 each)

| Dimension | What it measures |
|---|---|
| Fluency | Flow, pace, hesitation |
| Accuracy | Grammar & word choice correctness |
| Pronunciation/Accent | Intelligibility + American-accent targets (Accent Lab) |
| Range | Vocabulary and structure variety |
| Interaction | Turn-taking, responding, sustaining conversation |

Level thresholds map total scores to CEFR bands. The **B2 benchmark** = defined minimum across all five
dimensions on a 20–30 min conversation task.

### 4.3 Transformation evidence (the proof engine)

- Every enrolled learner records a **"Day 1" speaking sample** and a **"graduation" sample** on a set
  prompt. Paired before/after clips (with consent) become the strongest marketing asset and the
  objective proof of results.
- Store results in a simple tracker (see §9): learner, start level, end level, scores, testimonial link.

---

## 5. Accent Lab design (signature)

### 5.1 Interference-driven syllabus

Built directly from the predictable Arabic→English map:

1. **Consonant clusters / vowel insertion** — "street," "school," "asked" without inserted vowels.
2. **/p/ vs /b/** — "pat/bat," "cap/cab."
3. **Vowel system** — English short/long and diphthong contrasts absent in Arabic (ship/sheep, etc.).
4. **/v/ vs /f/**, **hard /g/**, **/θ/–/ð/** ("think," "this").
5. **Word stress** — stress placement changing meaning/naturalness.
6. **Sentence intonation & rhythm** — American stress-timing, linking, reductions ("gonna," "wanna").

### 5.2 Drill mechanics

- **Minimal-pair listening + production**, **shadowing** (imitating native audio), **record-and-compare**
  against a model, and **spaced re-drilling** of previously weak sounds.
- Each Accent Lab item tagged so the review engine can resurface a learner's specific weak points.

### 5.3 Content spin-off

The most visual/relatable Accent Lab items become a flagship **free content series** (e.g., "the sounds
Arabic speakers always get wrong") — high shareability, direct demonstration of method.

---

## 6. Mindset, habit & accountability system

### 6.1 Curriculum thread

A parallel, scheduled track running alongside language lessons: identity ("I'm becoming an English
speaker"), goal-setting, habit stacking, dealing with plateaus/embarrassment, and consistency systems.

### 6.2 Accountability mechanics (not gamification-first)

- **Cohort cadence:** shared start date, weekly rhythm, group moving together.
- **Practice tracking:** simple daily/weekly practice log (streaks as a *support*, not the core reward).
- **Peer pods:** small speaking groups within a cohort.
- **Coach touchpoints:** live sessions + periodic personal feedback.
- **Re-engagement:** WHEN a learner goes inactive for X days, an automated + human nudge fires.
- **Public commitment:** learners set and share goals at kickoff.

Target: **≥70% completion** (vs. 3–10% for self-paced).

---

## 7. Delivery model — the flagship cohort program

### 7.1 Structure (reference design — tune with pilot)

- **Format:** hybrid. Recorded lessons (self-paced within the week) + weekly **live sessions**
  (speaking practice, feedback, Q&A) + community channel + accountability.
- **Cadence:** weekly module release; 1–2 live sessions/week; daily light practice expectation.
- **Cohort length per stage:** derived from the level's study-hour budget (e.g., a stage ≈ 6–10 weeks).
- **Group size:** small enough for real feedback; scale via peer pods and TA support later.

### 7.2 Tool stack (off-the-shelf, no custom app — GC-2)

| Need | Reference tool options |
|---|---|
| Course + community home | An all-in-one community/course platform (e.g., Circle-style, Skool-style, Teachable/Kajabi-style) |
| Live sessions | Zoom / Google Meet |
| Chat & nudges | WhatsApp / Telegram / Discord |
| Payments (EGP + USD) | A processor supporting both local Egyptian and international cards |
| Scheduling | Calendly-style booking |
| Analytics/KPIs | Spreadsheet + platform analytics (see §9) |

*(Exact vendors chosen in Phase 0 based on Egypt payment support and cost.)*

### 7.3 Repeatable cohort launch process

Waitlist warm-up → open enrollment window → placement + onboarding → kickoff live → weekly delivery →
mid-point check → summative + graduation samples → testimonials → membership transition.

---

## 8. Business & offer design

### 8.1 Offer ladder

| Offer | Purpose | Price posture |
|---|---|---|
| Free content | Reach & trust | $0 |
| Entry challenge (7–14 days) | Filter + quick win + on-ramp | Low (impulse) |
| Flagship cohort | Transformation + core revenue | Value/outcome-anchored, tiered |
| Community membership | Retention + MRR | Low monthly, tiered |

### 8.2 Tiered pricing (structural advantage)

- **Egypt tier** (EGP) — accessible, volume.
- **Gulf/diaspora tier** (USD) — ~3–5× Egypt tier for the same program.
- Payment support for both regions; price points **validated with the founding cohort** (founding
  discount for the first group in exchange for feedback + testimonials).

### 8.3 Unit economics model (per cohort)

`Cohort profit = (Σ enrollments × tier price) − (ad spend + platform + team time)`

The EGP cost base (Egyptian ads + Egyptian team) against partly-USD revenue is the margin engine.
Track CAC and payback so the proof flywheel drives CAC down cohort over cohort.

---

## 9. Data, tracking & KPIs

**Lean approach:** a single **Cohort Tracker** (spreadsheet) + platform-native analytics. No custom DB.

- **Learner records:** name, tier, start level, placement score, Day-1 sample link, weekly activity,
  end level, final scores, testimonial link, membership conversion.
- **Educational KPIs:** completion %, avg CEFR gain, % hitting B2 benchmark, # documented transformations.
- **Business KPIs:** revenue, margin, funnel conversion (view → lead → challenge → cohort), CAC,
  membership MRR & retention.
- **Cadence:** reviewed at cohort mid-point and close; feeds decisions for the next cohort.

---

## 10. Team & operations design

- **Founder** — teacher, on-camera face, method owner, live sessions (24–30 hrs/wk).
- **Video editor (Egypt, EGP, part-time)** — content and lesson editing.
- **Community manager / VA (Egypt, EGP, part-time)** — moderation, nudges, onboarding admin, scheduling.
- **SOPs** authored for: content production, cohort launch, onboarding, live-session run-of-show,
  feedback/grading, and assessment.
- Scale triggers: add a TA/second coach only when cohort size or count justifies it; teacher-training
  and additional coaches are a later-phase expansion.

---

## 11. Brand & presentation standards

- **Name:** Empire English Community (EEC).
- **Positioning line:** "A real system, not viral tricks — the disciplined path from zero to confident,
  American-accented English, built for Arabic speakers, with results you can measure."
- **Tone:** honest, disciplined, encouraging, premium-but-relatable; Egyptian-Arabic in content,
  professional English in materials.
- **Visual bar:** clean, consistent templates for lessons, slides, thumbnails, and certificates —
  quality comparable to internationally respected programs.
- **Founder story** woven consistently: Egyptian → near-native English, Faculty of Commerce (English),
  6 years of daily English in Dubai across 200+ nationalities.

---

## 12. Requirements → design traceability

| Requirement | Where designed |
|---|---|
| R1 Methodology | §2 |
| R2 Curriculum & roadmap | §3 |
| R3 Assessment & tracking | §4, §9 |
| R4 Accent Lab | §5 |
| R5 Mindset & accountability | §6 |
| R6 Free content engine | §1, §5.3, §8.1 |
| R7 Flagship cohort | §7 |
| R8 Community/membership | §1, §8.1 |
| R8B Founding cohort | §7.3, §8.2 |
| R9 Business & pricing | §8 |
| R10 GTM & acquisition | §1, §8.3 |
| R11 Operations, team, tooling | §7.2, §10 |
| R12 Brand & presentation | §11 |
| R13 Measurement & KPIs | §9 |

---

## 13. Key design decisions & rationale

1. **Cohort-first, app-later** — completion (the real problem) is solved by cohorts/community, not
   software. Lowest cost, highest results, fastest to launch.
2. **CEFR as spine, B2 as promise** — objective, universal measurement; B2 is life-changing and provable.
3. **Arabic-first fade** — reduces beginner anxiety and dropout, then forces immersion for fluency.
4. **Accent Lab as signature** — turns a known weakness (Arabic interference) into a differentiator and
   a marketing engine.
5. **EGP cost / tiered revenue** — structural margin advantage funding aggressive, cheap Egyptian reach.
6. **Build-just-ahead** — protects quality and founder capacity; ship value without building everything first.
