# Enrollment & Onboarding Flow (v1.0)

> **Spec task:** 3.2 · **Requirements:** R8B (Founding Cohort), R9 (payments), R3 (placement/baseline)
> **Reads with:** `program/01-founding-cohort-offer.md`, `content/03-waitlist-funnel.md`,
> `curriculum/05-assessment-suite.md`, `curriculum/06-before-after-protocol.md`,
> `curriculum/04-mindset-and-accountability-track.md` (M0), `operations/01-tool-stack.md`, `operations/02-cohort-tracker.md`.
> **Purpose:** The exact, repeatable path from "I want in" → paid → placed → baseline-captured → welcomed
> → ready for kickoff. A smooth onboarding sets expectations, captures the Day-1 proof, builds belonging
> from minute one, and directly protects completion (a strong onboarding = fewer early dropouts).

---

## 1. Principles

1. **Frictionless to pay, thorough to onboard.** Make buying easy; make the *first week* intentional.
2. **Capture the baseline immediately.** The Day-1 speaking sample is non-negotiable (it's the proof + placement).
3. **Belonging from minute one.** Get them into the community and introduced fast (early connection → retention).
4. **Set honest expectations.** Time commitment, how it works, the guarantee — no surprises.
5. **Lean ops.** Manual access-grant first (works around Egypt payment/platform gaps); automate later.

---

## 2. The end-to-end flow

```
  Offer / sales page  →  CHECKOUT (EGP: Paymob/Fawry · USD: Stripe/PayPal · plan · challenge credit)
        │  payment confirmed
        ▼
  ACCESS GRANT (manual first) + instant confirmation email/WhatsApp
        │
        ▼
  ONBOARDING FORM (contact, tier, goal, level self-rating, consent tiers, schedule fit)
        │
        ▼
  PLACEMENT (adaptive quiz + Day-1 speaking sample on the standard prompt) → level confirmed + baseline logged
        │
        ▼
  COMMUNITY ONBOARDING (join WhatsApp/Telegram + platform · intro post · meet your pod)
        │
        ▼
  PRE-KICKOFF SEQUENCE (welcome, goal-setting M0, expectations, tech check)
        │
        ▼
  KICKOFF LIVE SESSION  →  Day 1 of the program
```

---

## 3. Step-by-step

### Step 1 — Checkout
- From the offer/sales page (offer §10). Two payment rails (tool stack §2):
  - **Egypt (EGP):** Paymob/Fawry; offer the **installment plan** (2–3 payments) if chosen.
  - **Gulf/diaspora (USD):** Stripe/PayPal.
- Apply **entry-challenge credit** if applicable (Task 2.4).
- Show clear **terms** (guarantee, refund, payment plan) at checkout.
- On success → instant **confirmation** (email + WhatsApp) with "what happens next in 3 steps."

### Step 2 — Access grant (lean)
- **Manual grant** at first: add the learner to the course/community platform + the cohort chat.
  (Automate later via Zapier/Make once volume justifies it.)
- SLA: grant + welcome within a few hours (fast response = trust + momentum).

### Step 3 — Onboarding form
Short form capturing what the Cohort Tracker needs (Task 0.5):
- Name, WhatsApp/email, country → **tier**, **goal**, **self-rated level**.
- **Consent selection** (layered: Tier 0 internal / Tier 1 community / Tier 2 marketing — before/after protocol §4).
- **Schedule fit** (which live-session time works) + timezone.
- Agreement to the **"Do the Work" guarantee** expectations (attendance + assignments + assessments).

### Step 4 — Placement + Day-1 baseline (Assessment Suite §3)
- **Adaptive quiz** (Google Form) → provisional level.
- **Day-1 speaking sample** on the **standard prompt** (*"Tell me about yourself, your family, and your
  typical day"*; beginner fallback allowed) — recorded, stored, and scored on the 5-dimension rubric.
- **Confirm starting point** (Stage 0 from Unit 0 for true beginners). Log `placement_level`,
  `placement_score`, `day1_speaking_score`, `day1_sample_link` in the tracker.
- Frame it warmly: *"مش امتحان — ده الـ 'before' اللي هنقارن بيه تقدمك."*

### Step 5 — Community onboarding
- Add to the **private community** (platform) + **cohort WhatsApp/Telegram**.
- Prompt an **intro post** (name, city, goal, one fun fact) — reply to everyone (founder/community manager).
- Assign to a **peer pod** (3–5 learners; mix levels) — introduce pod-mates.

### Step 6 — Pre-kickoff sequence (the ~1 week before Day 1)
Warm messages that reduce anxiety and increase show-up:
| When | Message | Purpose |
|---|---|---|
| On enroll | Welcome + 3 next steps + confirmation | Reassure, orient |
| −5 days | How the program works + weekly rhythm + time commitment | Set expectations |
| −4 days | Do your placement + Day-1 recording (if not done) | Capture baseline |
| −3 days | Meet your pod + post your intro | Belonging |
| −2 days | Mindset M0: set your goal + daily practice slot | Commitment |
| −1 day | Tech check (Zoom link, platform login) + kickoff details | Remove friction |
| Kickoff day | Reminder + "see you live!" | Attendance |

### Step 7 — Kickoff live session
- Warm welcome + founder story + the promise + how we win (consistency).
- Everyone introduces themselves (breakout pods) — first live speaking (low stakes).
- Walk the roadmap, the weekly rhythm, the community, the guarantee.
- Public goal-setting (Mindset M0). End on energy → straight into Unit 0.

---

## 4. Per-learner onboarding checklist (must be done before Day 1)

- [ ] Payment confirmed + access granted.
- [ ] Onboarding form completed (contact, tier, goal, level, **consent**, schedule).
- [ ] Placement quiz done + **Day-1 speaking sample recorded & logged**.
- [ ] Joined community + cohort chat; intro posted; pod assigned.
- [ ] Goal + daily practice slot set (M0).
- [ ] Tech check passed (Zoom + platform login).
- [ ] All fields recorded in the **Cohort Tracker**.

---

## 5. Consent capture (ethical, layered)

- Captured in the onboarding form (before/after protocol §4): Tier 0 (internal) / Tier 1 (community) /
  Tier 2 (marketing), with name/face options and the right to withdraw.
- Store the record; mark `consent_to_use` (+ tier) in the tracker. **Never** use a clip beyond the granted tier.

---

## 6. Setting expectations (say this clearly up front)

- **Time:** ~20 min/day + the weekly live session; consistency > intensity.
- **How it works:** hybrid (recorded + live + community + accountability); build just ahead, level by level.
- **The guarantee:** effort-based — show up, do the work, take the assessments.
- **Honesty:** clear, confident English + American-leaning accent; not "fluent in weeks," not "guaranteed native."

---

## 7. Roles

- **Community manager / VA (EGP):** access grants, onboarding-form chasing, community welcomes, tech
  checks, tracker data entry, nudges.
- **Founder:** placement speaking samples (or reviews recordings), the kickoff live, personal welcomes.

## 8. Metrics (feeds R13)

- **Onboarding completion rate** (checklist done before Day 1) — a leading indicator of retention.
- **Day-1 sample capture rate** (target 100% — it's the proof baseline).
- **Kickoff show-up rate.**
- **Time-to-onboard** (enroll → ready).

## 9. Assets to produce

- [ ] **Checkout** pages (EGP + USD) with terms + challenge-credit handling.
- [ ] **Confirmation** + welcome templates (email + WhatsApp).
- [ ] The **onboarding form** (with consent tiers + schedule fit).
- [ ] **Placement quiz** + Day-1 recording instructions (+ warm framing script).
- [ ] The **pre-kickoff message sequence** (−5 → kickoff).
- [ ] **Kickoff live** run-of-show (also referenced in Task 3.3).
- [ ] Community welcome + pod-assignment process.

---

*Traceability: implements R8B/R9/R3; consumes the offer (3.1), waitlist/challenge (2.3/2.4), assessment
suite + before/after protocol, and the tool stack; feeds the cohort run-of-show & SOPs (Task 3.3) and the
Cohort Tracker. Next per plan: Task 3.3 — the cohort run-of-show & SOPs (weekly delivery, live-session
format, feedback loop, accountability rules).*
