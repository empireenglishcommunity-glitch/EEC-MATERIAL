# EEC Learning Ecosystem — Requirements

> **Spec:** EEC Learning Ecosystem
> **Version:** 1.0 (draft for approval)
> **Governing document:** `strategy/01-foundational-strategy.md` (the Foundational Strategy)
> **Purpose:** Define *what* the EEC ecosystem must deliver — as testable requirements — before
> designing *how*. Each requirement has a user story and acceptance criteria in EARS style
> ("WHEN / IF ... THE SYSTEM SHALL ..."). Here "the system" means the EEC ecosystem: its method,
> curriculum, assessments, content, program, community, and operations.

## Reference

#[[file:strategy/01-foundational-strategy.md]]

## Definitions

- **EEC** — Empire English Community.
- **The system** — the complete EEC ecosystem (pedagogy + program + content + community + operations).
- **Learner / student** — a beachhead user: motivated Arabic-speaking adult (~18–35), starting from beginner.
- **CEFR** — Common European Framework of Reference (A1–C1), EEC's internal proficiency spine.
- **B2 benchmark** — the flagship graduation outcome: a natural 20–30 minute conversation on everyday
  and professional topics, clearly and confidently, with a neutral American accent.
- **Cohort** — a group of learners who start and progress through a program together on a schedule.
- **Accent Lab** — EEC's signature contrastive American-pronunciation system for Arabic speakers.

## Global constraints (apply to all requirements)

- **GC-1** — The system SHALL prioritize measurable learner outcomes over reach or entertainment.
- **GC-2** — The system SHALL be delivered lean, using off-the-shelf tools, with **no custom app** in v1.
- **GC-3** — The system SHALL be operable by the founder at 24–30 hrs/week plus a small Egyptian team.
- **GC-4** — The system SHALL keep its cost base in EGP while supporting tiered USD/Gulf pricing.
- **GC-5** — The system SHALL never promise a guaranteed native accent; it promises a clear, neutral
  American accent with native-like fluency as an aspirational ceiling.

---

## Requirement 1 — Learning Methodology

**User story:** As a learner, I want a coherent, evidence-based teaching method, so that my effort
reliably compounds into real speaking ability instead of scattered knowledge.

**Acceptance criteria**
1. THE SYSTEM SHALL define a single documented methodology (the "EEC Method") built on six pillars:
   comprehensible input, pushed output with feedback, spaced repetition/retrieval, Arabic-first
   scaffolding that fades, the Accent Lab, and a mindset/accountability layer.
2. WHEN a lesson is designed, THE SYSTEM SHALL require both an input component and a pushed-output
   component with a feedback mechanism.
3. THE SYSTEM SHALL weight speaking and listening ahead of reading and writing at every level.
4. THE SYSTEM SHALL teach grammar in service of communication, not as isolated rule memorization.
5. WHERE a concept was previously taught, THE SYSTEM SHALL resurface it on a spaced-review schedule.
6. THE SYSTEM SHALL specify, per CEFR level, how much Arabic support is permitted, decreasing to zero
   by the immersion levels.

## Requirement 2 — Curriculum & CEFR Roadmap

**User story:** As a learner starting from zero, I want a clear step-by-step roadmap with defined
levels and milestones, so that I always know where I am and what comes next.

**Acceptance criteria**
1. THE SYSTEM SHALL organize learning into CEFR-mapped stages (Pre-A1/A1 → A2 → B1 → B2 → C1).
2. THE SYSTEM SHALL define, for each level, explicit entry criteria, exit criteria, target vocabulary
   range, target grammar/functions, and the "can-do" outcomes a learner achieves.
3. THE SYSTEM SHALL define a standard lesson anatomy that every lesson follows.
4. THE SYSTEM SHALL sequence levels so that B2 corresponds to the flagship graduation benchmark.
5. WHERE a full level is not yet built, THE SYSTEM SHALL still allow a cohort to run by building
   content just ahead of the cohort's progress (level-by-level build strategy).
6. THE SYSTEM SHALL map each level to a rough learner time budget (study hours) for planning.

## Requirement 3 — Assessment & Progress Tracking

**User story:** As a learner, I want objective proof of my progress, so that I can trust the system is
working and stay motivated.

**Acceptance criteria**
1. THE SYSTEM SHALL provide a placement assessment that assigns a new learner to the correct level.
2. THE SYSTEM SHALL provide formative checks within levels and a summative assessment at each level's end.
3. THE SYSTEM SHALL assess speaking using a documented rubric aligned to CEFR (fluency, accuracy,
   pronunciation/accent, range, interaction).
4. WHEN a learner completes a level assessment, THE SYSTEM SHALL record a result and a CEFR-aligned
   level determination.
5. THE SYSTEM SHALL capture a "before" and "after" recorded speaking sample for every enrolled learner
   to produce measurable transformation evidence.
6. THE SYSTEM SHALL make each learner's current level and progress visible to them at any time.
7. THE SYSTEM SHALL provide an optional upper-level Exam Track aligned to TOEFL and IELTS.

## Requirement 4 — Accent Lab (Signature Module)

**User story:** As an Arabic speaker, I want targeted pronunciation training for the exact sounds Arabic
makes hard, so that I develop a clear American accent efficiently.

**Acceptance criteria**
1. THE SYSTEM SHALL provide a contrastive American-pronunciation curriculum built from the predictable
   Arabic→English interference set (consonant clusters/vowel insertion, /p/–/b/, vowel system, /v/,
   /θ/–/ð/, word stress, and intonation).
2. THE SYSTEM SHALL integrate Accent Lab drills into levels using spaced repetition.
3. THE SYSTEM SHALL provide a way for learners to record themselves and receive pronunciation feedback.
4. THE SYSTEM SHALL package selected Accent Lab material as free top-of-funnel content.

## Requirement 5 — Mindset, Habit & Accountability

**User story:** As a learner who has quit courses before, I want a system that keeps me consistent, so
that I actually finish and reach fluency.

**Acceptance criteria**
1. THE SYSTEM SHALL include explicit mindset/habit instruction (identity, goal-setting, habit design,
   overcoming plateaus) as scheduled curriculum, not optional extras.
2. THE SYSTEM SHALL run learners in cohorts with a shared start date and schedule.
3. THE SYSTEM SHALL provide accountability mechanisms (check-ins, streak/practice tracking, peer
   groups, coach touchpoints) without relying on gamification as the primary motivator.
4. WHEN a learner misses activity for a defined period, THE SYSTEM SHALL trigger a re-engagement action.
5. THE SYSTEM SHALL target a cohort completion rate of at least 70%.

## Requirement 6 — Free Content Engine (Top of Funnel)

**User story:** As a potential student scrolling social media, I want valuable, structured English
content, so that I trust EEC and want to join the paid program.

**Acceptance criteria**
1. THE SYSTEM SHALL produce structured, system-driven content (not isolated hacks) for YouTube, TikTok,
   Instagram/Reels, primarily in Egyptian Arabic.
2. THE SYSTEM SHALL maintain a defined content cadence and a content calendar tied to the funnel.
3. THE SYSTEM SHALL include clear calls-to-action routing viewers to the entry challenge or waitlist.
4. THE SYSTEM SHALL feature documented student results/testimonials as a recurring content pillar.

## Requirement 7 — Flagship Cohort Program (Core Product)

**User story:** As a paying student, I want a structured hybrid program with live coaching and
community, so that I get real transformation and support, not just videos.

**Acceptance criteria**
1. THE SYSTEM SHALL deliver the paid program in a hybrid format: recorded lessons + live sessions +
   community + accountability.
2. THE SYSTEM SHALL define a cohort structure (duration, weekly cadence, live-session rhythm, workload).
3. THE SYSTEM SHALL define the delivery tool stack (course/community platform, live video, payments,
   chat) using off-the-shelf tools.
4. WHEN a cohort completes, THE SYSTEM SHALL produce documented outcomes (CEFR gains + testimonials).
5. THE SYSTEM SHALL define a repeatable process to launch each subsequent cohort.

## Requirement 8 — Community / Membership (Retention)

**User story:** As a graduate (or not-yet-ready learner), I want an ongoing practice community, so that
I keep improving and stay connected to EEC.

**Acceptance criteria**
1. THE SYSTEM SHALL offer a recurring, lower-priced membership with ongoing speaking practice, live
   Q&A/practice sessions, and challenges.
2. THE SYSTEM SHALL define how graduates transition from the flagship program into the membership.
3. THE SYSTEM SHALL track membership retention as a core KPI.

## Requirement 8B — Founding Cohort (First Sellable Pilot)

**User story:** As the founder, I want a well-defined founding cohort offer, so that I can generate
first revenue and proof quickly with a small group.

**Acceptance criteria**
1. THE SYSTEM SHALL define a founding-cohort offer: scope (levels covered), size (~15–30), price
   (founding discount), duration, and deliverables.
2. THE SYSTEM SHALL define the enrollment/onboarding flow, including placement and the "before" sample.
3. THE SYSTEM SHALL define what constitutes a successful founding cohort (completion %, level gains,
   number of testimonials).

## Requirement 9 — Business Model, Pricing & Payments

**User story:** As the founder, I want a sustainable, tiered monetization model, so that EEC is
profitable while remaining accessible in Egypt and premium for the Gulf/diaspora.

**Acceptance criteria**
1. THE SYSTEM SHALL implement the three-layer model: free content → paid cohort → recurring membership,
   plus a low-cost entry challenge as an on-ramp.
2. THE SYSTEM SHALL support tiered pricing: an EGP-friendly Egypt tier and a USD Gulf/diaspora tier.
3. THE SYSTEM SHALL support collecting payments in both EGP and USD/international methods.
4. THE SYSTEM SHALL define per-cohort unit economics (revenue, cost, margin) leveraging the EGP cost base.
5. THE SYSTEM SHALL anchor pricing on transformation value, not on undercutting free competitors.

## Requirement 10 — Go-to-Market & Acquisition

**User story:** As the founder, I want a low-cost, high-reach acquisition engine, so that I can fill
cohorts affordably using my Egyptian cost advantage.

**Acceptance criteria**
1. THE SYSTEM SHALL use Egyptian social organic + paid ads as the primary acquisition channel.
2. THE SYSTEM SHALL define a funnel from content → lead capture (waitlist) → entry challenge → cohort.
3. THE SYSTEM SHALL warm-start the first cohort from the founder's existing Dubai/Egyptian network.
4. THE SYSTEM SHALL operate a proof flywheel: each cohort's results feed the next cohort's marketing.
5. THE SYSTEM SHALL track cost-per-acquired-student and target its reduction over time.

## Requirement 11 — Operations, Team & Tooling

**User story:** As the founder, I want lean operations, so that EEC runs on my part-time hours plus a
cheap Egyptian team until revenue justifies scaling.

**Acceptance criteria**
1. THE SYSTEM SHALL define required roles: founder (teacher/face), part-time video editor, part-time
   community manager/VA — hired in Egypt, paid in EGP.
2. THE SYSTEM SHALL define the operational tool stack and how the tools connect (content, LMS/community,
   live, payments, analytics).
3. THE SYSTEM SHALL define standard operating procedures for the recurring work (content production,
   cohort launch, onboarding, live sessions, feedback, assessment).
4. THE SYSTEM SHALL NOT require custom software development in v1.

## Requirement 12 — Brand & Presentation Quality

**User story:** As a prospective student comparing EEC to international programs, I want a professional,
trustworthy brand, so that I feel confident investing.

**Acceptance criteria**
1. THE SYSTEM SHALL define brand foundations: name usage (Empire English Community / EEC), positioning
   line, tone of voice, and visual standards.
2. THE SYSTEM SHALL ensure all learner-facing materials meet a defined quality bar comparable to
   internationally respected English programs.
3. THE SYSTEM SHALL present the founder's authentic story consistently across touchpoints.

## Requirement 13 — Measurement & KPIs

**User story:** As the founder, I want to track the metrics that prove educational and business success,
so that I make decisions on evidence, not guesswork.

**Acceptance criteria**
1. THE SYSTEM SHALL track educational KPIs: completion rate, average CEFR level gain per cohort,
   % reaching the B2 benchmark, and number of documented transformations.
2. THE SYSTEM SHALL track business KPIs: cohort revenue and margin, funnel conversion, cost-per-student,
   and membership MRR/retention.
3. THE SYSTEM SHALL define a lightweight, off-the-shelf way to record and review these KPIs per cohort.

---

## Out of scope for v1

- Custom mobile/web application development.
- Teacher-training / franchising (planned for later expansion).
- Dedicated kids' program (separate pedagogy and safeguarding; later phase).
- Full C1/C2 curriculum build (upper levels built after B2 is proven).
