# EEC Learning Ecosystem — Implementation Plan

> **Spec:** EEC Learning Ecosystem
> **Version:** 1.0 (draft for approval)
> **Reads with:** `requirements.md` and `design.md`
> **How to use:** Execute phases in order. Each task is a discrete, reviewable deliverable (mostly
> documents and materials, since v1 builds no custom software). Check items off as completed.
> `Req:` tags trace each task to requirements. Phases 0–4 get EEC to a proven, revenue-generating
> founding cohort; Phases 5–6 scale.

---

## Phase 0 — Foundations & setup
*Goal: lock the operating basis so building is fast and consistent.*

- [x] 0.1 Approve the Foundational Strategy and this spec (strategy already drafted). `Req: all`
- [x] 0.2 Author the **EEC Methodology Handbook** — the detailed "how we teach": the learning loop,
      skill weighting, Arabic-scaffold fade rules, feedback model, and spaced-review policy. `Req: 1`
      → `methodology/01-eec-methodology-handbook.md`
- [x] 0.3 Define **brand foundations** — positioning line, tone of voice, visual standards, and the
      founder-story narrative used across touchpoints. `Req: 12` → `brand/01-brand-foundations.md`
- [x] 0.4 Select and set up the **lean tool stack** — community/course platform, live video, chat,
      payments (EGP + USD), scheduling, analytics. Confirm Egyptian payment support. `Req: 11, 9`
      → `operations/01-tool-stack.md` *(design/decisions done; live account setup is an operator action)*
- [x] 0.5 Create the **Cohort Tracker** template and KPI dashboard (spreadsheet). `Req: 13, 3`
      → `operations/02-cohort-tracker.md` + `operations/cohort-tracker-template.csv`

## Phase 1 — Core learning system (first levels + assessment)
*Goal: a complete, teachable Stage 0, plus the measurement backbone.*

- [x] 1.1 Define the **CEFR roadmap**: all stages with entry/exit criteria, vocab/grammar targets,
      Accent Lab focus, mindset focus, and study-hour budgets. `Req: 2` → `curriculum/01-cefr-roadmap.md`
- [x] 1.2 Finalize the **standard lesson anatomy template** (reusable for all lessons). `Req: 1, 2`
      → `curriculum/02-lesson-template.md`
- [x] 1.3 Build **Stage 0 (Pre-A1/A1) curriculum in full** — units and lessons following the template,
      with Arabic scaffolding. `Req: 2, 1`
      → COMPLETE: `curriculum/stage0/` — unit map + all 11 units (Units 0–10, ~55 lessons) authored in full,
      assessment-backed, with Day-1↔graduation before/after proof built in
- [x] 1.4 Build the **Accent Lab syllabus** and Stage-0 drills (interference-driven). `Req: 4`
      → `curriculum/03-accent-lab-syllabus.md` (full interference map, per-sound teaching cards, prosody module, stage-by-stage sequence, rubric link, dialect-aware Egyptian notes); Stage-0 drills are embedded in the Stage-0 unit lessons
- [x] 1.5 Build the **mindset/habit track** lessons that run alongside Stage 0. `Req: 5`
      → `curriculum/04-mindset-and-accountability-track.md` (Stage-0 mindset arc M0–M10 mapped to units, accountability system, habit toolkit, re-engagement rules, delivery format, KPIs)
- [x] 1.6 Build the **assessment suite**: placement test, formative checks, Stage-0 summative, and the
      CEFR-aligned speaking rubric. `Req: 3` → `curriculum/05-assessment-suite.md` (placement w/ bands + standard prompt, 5-dimension rubric with 0–5 descriptors, A1 thresholds, formative + summative design, exam track, scoring workflow)
- [x] 1.7 Define the **before/after speaking-sample protocol** (prompts + consent + storage). `Req: 3`
      → `curriculum/06-before-after-protocol.md` (fixed prompts, capture protocol, layered consent tiers, storage/naming, paired-clip production, integration points)

## Phase 2 — Content engine & audience
*Goal: build trust and an audience before selling.*

- [x] 2.1 Define the **content strategy & calendar** — pillars, formats, cadence, platforms, CTAs. `Req: 6`
      → `content/01-content-strategy-and-calendar.md` (positioning, 6 pillars, platform roles, funnel + CTA rules, short-form template + hook bank, weekly calendar, production/repurposing workflow, metrics, 30-day starter plan)
- [x] 2.2 Produce the flagship **Accent Lab free-content series** (Egyptian Arabic). `Req: 6, 4`
      → `content/02-accent-lab-series-scripts.md` (12 ready-to-film short scripts AL-01–12 + 2 YouTube outlines, Egyptian-Arabic narration, CTAs, production/repurposing notes); filming/editing is an operator action
- [x] 2.3 Set up **lead capture / waitlist** and the content→waitlist funnel. `Req: 6, 10`
      → `content/03-waitlist-funnel.md` (funnel map, capture mechanics, lead magnet, full bilingual landing-page copy, 8-step nurture sequence, segmentation, metrics); live page/form setup is an operator action
- [x] 2.4 Define and prepare the **low-cost entry challenge** (7–14 days, first quick win). `Req: 9, 10`
      → `content/04-entry-challenge.md` ("7 Days to Your First English Conversation": full day-by-day plan reusing Stage 0 U0–U1 + Accent Lab + Mindset, before/after clips, tiered pricing + credit-to-cohort, conversion mechanics, metrics)
- [x] 2.5 Launch consistent publishing and begin **warm-starting** the founder's network. `Req: 6, 10`
      → `content/05-launch-and-warmstart-plan.md` (pre-launch checklist, weeks 1–4 publishing plan, warm-start outreach playbook, timeline to founding cohort, roles, metrics); execution is an operator action

## Phase 3 — Founding cohort offer & launch prep
*Goal: a fully defined, sellable first cohort.*

- [x] 3.1 Design the **founding-cohort offer**: scope (Stage 0[–A2]), size (~15–30), founding price
      (tiered EGP/USD), duration, deliverables, guarantee/promise wording. `Req: 8B, 9`
      → `program/01-founding-cohort-offer.md` (EEC Foundations: scope/size/duration/format, deliverables, honest "Do the Work" guarantee, tiered pricing + challenge credit + installments, founding-member exchange, positioning, enrollment terms, sales-page skeleton, success criteria)
- [x] 3.2 Build the **enrollment & onboarding flow**: sales page, checkout (EGP+USD), placement,
      Day-1 speaking sample, welcome sequence. `Req: 8B, 9, 3`
      → `program/02-enrollment-and-onboarding.md` (end-to-end flow, checkout on both rails, onboarding form + layered consent, placement + Day-1 baseline, community onboarding + pods, pre-kickoff sequence, kickoff run-of-show, per-learner checklist, metrics)
- [ ] 3.3 Write the **cohort run-of-show & SOPs**: weekly delivery, live-session format, feedback loop,
      accountability/nudge rules. `Req: 7, 5, 11`
- [ ] 3.4 Define **success criteria** for the founding cohort (completion %, avg CEFR gain, # testimonials). `Req: 8B, 13`
- [ ] 3.5 Run enrollment and **fill the founding cohort**. `Req: 10, 8B`

## Phase 4 — Run & prove
*Goal: deliver transformation and capture proof.*

- [ ] 4.1 **Deliver the founding cohort** (recorded + live + community + accountability). `Req: 7, 5`
- [ ] 4.2 Run **formative + summative assessments**; record graduation speaking samples. `Req: 3`
- [ ] 4.3 Produce **documented results**: paired before/after clips + written/video testimonials. `Req: 3, 6`
- [ ] 4.4 Review **KPIs** (education + business) and capture lessons learned. `Req: 13`
- [ ] 4.5 Decide **go/scale**: confirm phase-1 win and readiness to expand / go full-time. `Req: all`

## Phase 5 — Community & repeatable cohorts
*Goal: retention, recurring revenue, and a repeatable launch machine.*

- [ ] 5.1 Launch the **community membership** (speaking clubs, live practice, challenges) and the
      graduate transition path. `Req: 8`
- [ ] 5.2 Refine curriculum/assessment from cohort feedback; **build A2 (and B1 as cohort climbs)**. `Req: 2, 1`
- [ ] 5.3 Productize the **repeatable cohort-launch playbook**; run **cohort #2** at scaled price/size. `Req: 7, 9, 10`
- [ ] 5.4 Optimize the **funnel & unit economics** (CAC down, conversion up). `Req: 9, 10, 13`

## Phase 6 — Expansion
*Goal: extend the ecosystem once the core is proven.*

- [ ] 6.1 Build **B2 curriculum** to the flagship graduation benchmark; validate B2 outcomes. `Req: 2, 3`
- [ ] 6.2 Add **Exam Tracks** (TOEFL/IELTS) at upper levels. `Req: 3`
- [ ] 6.3 Expand audience segments (teens; later kids with separate pedagogy/safeguarding). `Req: strategy`
- [ ] 6.4 Plan **team scale / teacher-training** to grow beyond founder capacity. `Req: 11, strategy`
- [ ] 6.5 Evaluate **custom tech** (app/LMS) only if validated demand justifies it. `Req: strategy`

---

## Execution notes

- **Order matters:** Phase 0 → 4 is the critical path to first revenue + proof. Do not start Phase 3
  (selling) before Phase 1 (a real, teachable Stage 0) exists.
- **Build just ahead:** only Stage 0 must be fully built before launch; later stages are built as the
  cohort climbs (design §3.4) to protect quality and founder capacity.
- **Recommended immediate next task after approval:** **0.2 — the EEC Methodology Handbook**, since the
  curriculum, Accent Lab, and cohort delivery all depend on it. (If speed-to-revenue is the priority, we
  can parallel-track 3.1 the founding-cohort offer, but the method should lead.)
- Each task, when executed, should be delivered as its own reviewable artifact (document/material) on a
  branch, mapped back to its `Req:` tag.
