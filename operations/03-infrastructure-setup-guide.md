# Infrastructure Setup Guide (v1.0)

> **Type:** Launch-critical execution asset (makes Type-B setup follow-the-steps)
> **Reads with:** `operations/01-tool-stack.md` (the decisions), `operations/02-cohort-tracker.md`,
> `content/03-waitlist-funnel.md`, `program/02-enrollment-and-onboarding.md`, `program/05-launch-enrollment-runbook.md`.
> **Purpose:** A step-by-step guide to stand up the entire lean infrastructure so you can open the
> waitlist, take payments, and deliver the cohort. Do these in the order below; each section ends with a
> **"Done when"** check. This unblocks the runbook's readiness gate.

> ⚠️ **Honesty note:** exact signup steps, fees, and requirements for third-party tools **change over
> time** and I can't see your accounts. Treat provider specifics below as a **checklist of what to do +
> what to confirm**, and verify the current details on each provider's site when you sign up.

---

## 0. Before you start

- **Have ready:** business/personal ID + (if available) commercial registration/tax ID (some Egyptian
  payment providers require it), a bank account for payouts, a logo/handle, an email for accounts.
- **Accounts to create with one consistent handle:** `@EmpireEnglishCommunity` / `EEC` (or your final choice).
- **Budget:** platform subscription (~$40–150/mo depending on choice) + payment processing % fees.
  Team + ads are in EGP. No development cost.

**Recommended setup order (dependency-first):**
```
1. Google Workspace basics (Drive + Forms + Sheets)   → free, everything hangs off this
2. Cohort Tracker (import the CSV)                     → your source of truth
3. Payments Rail A (Egypt: Paymob/Fawry) + Rail B (Stripe/PayPal)
4. Community/course platform (Skool or Circle)
5. Waitlist landing page + lead-capture form + lead magnet delivery
6. WhatsApp/Telegram community + broadcast
7. Zoom (live sessions)
8. Scheduler (Calendly)
9. Connect the flow (payment link → manual access grant) + test end-to-end
```
**Time estimate:** ~1–2 focused days for a basic, working setup (excluding payment-provider approval,
which can take longer — start that first).

---

## 1. Google Workspace basics (Drive + Forms + Sheets)
**For:** storage, quizzes/placement, the tracker. Free with a Google account.
- [ ] Create a Google account/Workspace for EEC (not your personal one, if possible).
- [ ] In Drive, create the top folder `EEC/` with subfolders: `Samples/`, `Forms/`, `Tracker/`, `Content/`, `Templates/`.
- **Done when:** you have an EEC Drive with the folder structure.

## 2. Cohort Tracker (source of truth)
**For:** every learner's progress + KPIs.
- [ ] Import `operations/cohort-tracker-template.csv` into Google Sheets as tab **`Learners`**.
- [ ] Add a **`Dashboard`** tab; paste the KPI formulas from `operations/02-cohort-tracker.md` §4.
- [ ] Restrict sharing to you + community manager.
- **Done when:** the tracker opens, formulas calculate, access is restricted.

## 3. Payments (start this FIRST — approval can take days)

### Rail A — Egypt (EGP): Paymob and/or Fawry
**For:** local cards, wallets, Fawry cash, installments.
- [ ] Create a **Paymob** merchant account (leading Egyptian gateway); complete KYC/merchant onboarding.
- [ ] Confirm: accepted methods (Meeza/Visa/Mastercard, wallets, **Fawry**), **fees**, **payout timing**,
      and whether **installments** are available.
- [ ] Enable **hosted payment links** (so you can sell without building integration).
- [ ] (Optional) Fawry directly or via an aggregator if you want Fawry-reference/cash payments.
- **Done when:** you can generate a working EGP payment link and see where payouts land.

### Rail B — Gulf/diaspora (USD/international): Stripe or PayPal
**For:** USD from higher-paying learners.
- [ ] Create **Stripe** (check current Egypt eligibility for your setup) **or** **PayPal** business.
- [ ] Enable **payment links / hosted checkout**.
- [ ] Confirm fees + payout method.
- **Done when:** you can generate a working USD payment link.

> If Stripe isn't available to you, use PayPal and/or a Gulf gateway (Tap/PayTabs) later. For launch,
> **payment links + manual access grant** avoid all integration work.

## 4. Community / course platform (Skool or Circle)
**For:** hosting recorded lessons + the community.
- [ ] **Decide:** **Skool** (simplest/cheapest, community-first) or **Circle** (more course/branding features).
      Trial both for a day if unsure (tool-stack §3).
- [ ] Create the space; set branding (name, logo, colors — brand §8); create the **founding cohort** group.
- [ ] Create the course structure: **Stage 0 → Units 0–10** (start with Units 0–2 content ready).
- [ ] Set it **private** (access on payment); decide free vs paid areas.
- **Done when:** a branded private space exists with the Unit 0 shell ready to fill.

## 5. Waitlist landing page + lead-capture form + lead magnet
**For:** capturing the owned audience (content §03 funnel).
- [ ] Build a simple landing page (a page tool, your platform's page, or a link-in-bio tool) using the
      **copy already written** in `content/03-waitlist-funnel.md` §5.
- [ ] Create the **lead-capture form** (Google Form or the page's form): name, WhatsApp/email, country
      (→tier), goal, level.
- [ ] Create/host the **lead magnet** ("5 sounds Egyptians get wrong" — I can produce this content next)
      and set up **instant delivery** (auto-reply/redirect with the link).
- [ ] Put the page link in **every profile bio**.
- **Done when:** you can submit the form as a test and instantly receive the lead magnet.

## 6. WhatsApp / Telegram community + broadcast
**For:** cohort chat, nudges, nurture (Egypt default).
- [ ] Create a **WhatsApp** community/broadcast (or Telegram channel + group).
- [ ] Create a **click-to-chat link** (wa.me/…) for high-intent capture.
- [ ] Draft the auto-welcome message (from waitlist §6 sequence).
- **Done when:** the click-to-chat link works and a welcome goes out.

## 7. Zoom (live sessions)
**For:** weekly live speaking + kickoff (breakout rooms for pods).
- [ ] Create a Zoom account (paid tier for >40 min + breakout rooms).
- [ ] Set a recurring meeting for the weekly live; enable **breakout rooms** + cloud recording.
- **Done when:** you have a recurring live link + recording enabled.

## 8. Scheduler (Calendly)
**For:** placement calls / office hours / session slots.
- [ ] Create Calendly (or Google Calendar appointment slots); connect your calendar.
- **Done when:** someone can book a slot and it lands on your calendar.

## 9. Connect the flow + test end-to-end (critical)
Wire the lean "no-integration" flow (tool-stack §2):
```
Learner clicks pay (EGP or USD payment link) → payment confirmed
   → YOU (or community mgr) manually: grant platform access + add to cohort chat
   → send confirmation + onboarding form link
   → learner does onboarding form + placement + Day-1 sample
```
- [ ] **Do a full test purchase** on each rail (small amount / test mode) and run yourself through the
      whole onboarding → confirm access, form, and tracker entry all work.
- **Done when:** a test learner can pay → get access → be onboarded, with no dead ends.

---

## 10. Master infrastructure readiness checklist (maps to runbook §2 gate)

- [ ] Google Drive + Forms + Sheets set up; **Cohort Tracker** live.
- [ ] **Payments** working on both rails (test link succeeds); fees/payouts confirmed.
- [ ] **Community/course platform** live, branded, private; Units 0–2 shell ready.
- [ ] **Waitlist page + form + lead magnet** live; instant delivery works.
- [ ] **WhatsApp/Telegram** community + click-to-chat + welcome ready.
- [ ] **Zoom** recurring live + breakout + recording ready.
- [ ] **Scheduler** live.
- [ ] **End-to-end test** passed (pay → access → onboard).
- [ ] Team (editor + community manager) invited to the tools they need.

→ When all boxes are ticked, the **infrastructure half of the runbook readiness gate is met.** The
remaining gate items are content/assets (waitlist page copy ✅ done; lead magnet + first video batch +
quiz banks — produced as Type-A assets) and the ops docs (✅ already built).

---

## 11. What I can produce next (Type-A assets to fill these tools)

Now that the tools have a home, the content that goes *into* them — all buildable by me:
- The **lead magnet** ("5 sounds Egyptians get wrong" guide) — for §5.
- The **placement quiz + per-unit quizzes** (Google Form question banks) — for §1/§4.
- The full **waitlist/landing copy** is done; the **sales page copy**, **email/WhatsApp sequences**, and
  **setup-ready templates** can be finalized next.

---

*Traceability: operationalizes the tool stack (01) for launch; satisfies the infrastructure portion of the
runbook readiness gate (Task 3.5 §2). This is the first launch-critical execution asset.*
