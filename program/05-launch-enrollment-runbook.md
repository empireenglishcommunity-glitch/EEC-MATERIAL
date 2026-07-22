# Launch & Enrollment Runbook — Fill the Founding Cohort (v1.0)

> **Spec task:** 3.5 · **Requirements:** R8B, R10, R9
> **Reads with:** `content/05-launch-and-warmstart-plan.md`, `content/03-waitlist-funnel.md`,
> `content/04-entry-challenge.md`, `program/01-founding-cohort-offer.md`,
> `program/02-enrollment-and-onboarding.md`, `program/04-founding-cohort-success-criteria.md`.
> **Purpose:** The step-by-step campaign to actually **enrol the founding cohort** — a day-by-day
> sequence, a pre-launch readiness gate, the enrollment pipeline, and contingencies. Task 3.5 is
> execution work *the founder runs*; this runbook makes it turn-key. (Kiro can build the plan and
> templates; the founder performs the real-world outreach, publishing, and selling.)

---

## 1. Principles

1. **Don't open the cart until you can deliver Day 1.** Readiness gate first (§2).
2. **Warm audience before you sell.** Content + waitlist + warm-start create demand; the offer converts it.
3. **Real scarcity, honest urgency.** 15–30 spots + a true deadline — not fake countdowns.
4. **Sell the transformation + proof, not features.** Lead with the outcome and the guarantee.
5. **Track the pipeline.** Every lead has a status; nothing falls through.

---

## 2. Pre-launch readiness gate (all must be ✅ before opening enrollment)

> **Status (synced):** every *buildable* item is ✅ done, including the **live platform** (`empireenglish.online` —
> public site + waitlist + lead-magnet page + the learner portal with lessons/quizzes/Accent Lab, 3C.1–3C.2).
> The remaining ⬜ items are **founder real-world actions** (account/tool setup + running the campaign), not more building.

**Product (deliver Day 1):**
- [x] Stage 0 Units 0–2 fully ready (built); Units 3+ scheduled build-just-ahead. ✅ **All 11 units (0–10) built** — exceeds requirement (`curriculum/stage0/`), and **live in the portal** for delivery.
- [x] Accent Lab drills, Mindset M0–M2, assessment/placement + rubric ready. ✅ `curriculum/03` (Accent Lab, drills embedded in units + **live record-and-compare in the portal**) · `curriculum/04` (Mindset M0–M10) · `curriculum/05` (placement + 5-dim rubric).
- [ ] Community space + cohort chat + Zoom set up; unit-release schedule drafted. ⬜ **real-world setup — not done yet** (we do this together); dated unit-release schedule to be drafted at kickoff.

**Funnel & offer:**
- [~] Channels live + publishing (Phase 2); **waitlist** capturing (Task 2.3).
      ✅ **Waitlist page + form LIVE** (`empireenglish.online` → leads persist to the volume + optional n8n webhook); **lead-magnet `/guide` page LIVE** (`content/06-lead-magnet-5-sounds-guide.md`). ⬜ still founder-executed: content channels live + regular publishing.
- [~] **Entry challenge** ready to run (Task 2.4).
      ✅ **daily lessons built** (`content/07-entry-challenge-daily-lessons.md`) + design (`content/04`). ⬜ running it is founder-executed.
- [~] **Offer/sales page** live with checkout — **individual-first** (EGP: InstaPay/wallet/bank; USD: personal PayPal + fee on top), terms + guarantee (Task 3.1).
      ✅ **sales/cohort page LIVE** (`empireenglish.online/ar/cohort`) with terms + guarantee (copy `program/06-founding-cohort-sales-page.md`). ⬜ still to do: wire the individual-first payment details (your InstaPay handle + personal PayPal.me link).
- [x] **Onboarding flow** ready (form, placement, Day-1 sample, welcome sequence — Task 3.2).
      ✅ flow designed (`program/02`); onboarding-form fields + placement bank + per-unit formative quizzes (`curriculum/07`); Day-1 protocol (`curriculum/06`); **portal live** (login + lessons + quizzes + Accent Lab) with **admin account-provisioning API**. ⬜ live Google-Forms instances (if used pre-portal) are a founder setup step.

**Ops & measurement:**
- [~] Cohort Tracker live; consent form ready; SOPs/run-of-show ready (Task 3.3); success criteria set (Task 3.4).
      ✅ SOPs (`program/03`) · ✅ success criteria (`program/04`) · ✅ **consent form built** (`program/07-consent-form.md`) · ✅ tracker template (`operations/02` + csv). ⬜ tracker **go-live** (import the csv into a live sheet).
- [ ] Team briefed (founder + Egyptian editor + community manager). ⬜ later.

> If any product item isn't ready, you can still open enrollment as long as **Day 1 + week 1 are ready and
> the build stays ahead of the cohort** (build-just-ahead rule).

---

## 3. The launch campaign timeline

*(Weeks are relative; flex to the founder's 24–30 hrs/week. Sequence matters more than exact dates.)*

### Phase A — Warm up the audience (Weeks 1–4)
- Publish per the content calendar (Accent Lab shorts + founder story + system pieces + first YouTube).
- Grow the **waitlist**; deliver the lead magnet; run the nurture sequence.
- **Warm-start outreach** to the founder's network (30–100 contacts) → waitlist (launch/warm-start plan §4).
- Goal: a waitlist + warm list big enough that a ~15–30 cohort is realistic.

### Phase B — Entry challenge wave (Weeks 4–5)
- Open the **entry challenge** to the waitlist + network (paid, low price, credit-to-cohort).
- Run the 7-day challenge (each learner records Day-0 → Day-7 clip; gets a real win).
- Nurture the group; build trust + momentum. Day-7 = the emotional peak.

### Phase C — Cohort enrollment (Weeks 5–6)
- **Day 7 of the challenge → open cohort enrollment** with the graduate offer (discount + challenge credit + priority + deadline).
- Run the **enrollment sequence** (§4) to challenge grads + waitlist + warm list.
- **Close** on the deadline (or when spots fill). Confirm payments.

### Phase D — Onboard → Kickoff (Week 6)
- Run the **onboarding flow** for every enrolled learner (checkout → access → form → placement → Day-1 sample → community/pod → pre-kickoff sequence).
- Hit the **"Ready to teach Day 1" gate** (§7) → run the **kickoff live** → begin Stage 0.

---

## 4. The enrollment sequence (cart-open → close)

Run over ~5–7 days to challenge grads + waitlist + warm list (WhatsApp/Telegram + email + a live).

| # | Timing | Message / action | Focus |
|---|---|---|---|
| 1 | Open (Day 0) | "Enrollment is open — the founding cohort" + the offer + before/after proof from the challenge | Outcome + proof |
| 2 | Day 1 | How it works (hybrid, ~12 weeks, community) + the "Do the Work" guarantee | De-risk |
| 3 | Day 2 | Founder story + who it's for / not for | Fit + trust |
| 4 | Day 3 | **Live Q&A / info session** (answer objections, show the roadmap, soft close) | Convert |
| 5 | Day 4 | Objection-busters (time, "tried before", price/payment plan, is-the-accent-honest) | Remove blockers |
| 6 | Day 5 | Spots + deadline reminder (real scarcity) + payment-plan + challenge credit reminder | Urgency |
| 7 | Close day | "Last call — enrollment closes tonight" | Final push |
| — | Post-close | Thank + waitlist for the **next** cohort (for those who didn't join) | Retain demand |

**Objection kit (address honestly):** time (~20 min/day, consistency > intensity) · past failures (you had
tips, not a system + accountability) · price (tiered + installments + challenge credit + value vs years of
failed study) · accent honesty (clear/confident, not "guaranteed native") · "am I too weak?" (starts from zero, Arabic-scaffolded).

---

## 5. Warm-start outreach cadence (parallel to Phase A–C)

- Reach the 30–100 contact list **personally** (not a blast); deliver the lead magnet first.
- Invite to the challenge, then the cohort; ask for **referrals** ("تعرف حد نفسه يتعلم إنجليزي؟").
- Offer founding priority + discount in exchange for feedback + (consented) testimonials.
- Track each contact's status in the pipeline (§6).

---

## 6. Enrollment pipeline (track every lead)

Add a simple pipeline (sheet or CRM tags) — status per lead:
```
Lead (waitlist/warm) → Challenge signup → Challenge completed → Cohort invited
   → Applied/interested → Paid → Onboarded → Ready for Day 1
```
- Track **source** (which content/warm-start) for CAC + attribution.
- Daily: move leads forward; follow up the "interested but not paid."
- Feed final enrollees into the **Cohort Tracker** (Task 0.5).

---

## 7. "Ready to teach Day 1" gate (final go/no-go)

Before kickoff, confirm:
- [ ] Target enrollment reached (or the minimum viable ~12 — success criteria §2B).
- [ ] Every enrollee **onboarded** (paid, form, placement, **Day-1 sample logged**, community joined, pod assigned).
- [ ] Week 1 content + the kickoff live run-of-show ready; build stays ahead.
- [ ] Tracker populated; consent captured; team ready.
→ **Go:** run kickoff, start Stage 0 (hand to Phase 4: Run & Prove).

---

## 8. Contingencies

| Situation | Response |
|---|---|
| **Under-enrolled** (< ~12) | Extend the deadline; add a second challenge wave; lean harder on warm-start + referrals; or run a smaller "pilot" cohort (still valid for proof) |
| **Over-demand** (> capacity) | Cap it; waitlist the rest for cohort #2 (scarcity + a warm pipeline for next round) |
| **Low challenge→cohort conversion** | Diagnose (offer? price? pitch?); improve the sequence; re-invite; note for success-criteria review |
| **Payment friction (Egypt)** | Offer InstaPay/wallet + a bank-transfer/installment option (2–3 payments); assist 1:1 |
| **Weak audience/waitlist** | Delay the cohort; extend Phase A publishing + warm-start until the pipeline is real |

---

## 9. Roles
- **Founder:** publishing (on-camera), warm-start outreach, the live Q&A + enrollment close, kickoff.
- **Community manager/VA (EGP):** waitlist/challenge admin, pipeline tracking, onboarding chases, nudges.
- **Editor (EGP):** content cuts for the launch window.

## 10. Metrics (feeds R13 + success criteria)
Waitlist size · challenge signups + completion · **challenge→cohort conversion** · enrollment count ·
CAC + source attribution · onboarding completion · kickoff attendance.

## 11. Assets to produce  ✅ built → `program/08-launch-assets.md` (+ `operations/enrollment-pipeline-template.csv`)
- [x] The **enrollment sequence** messages (1–7) + the objection kit.
- [x] The **live Q&A / info-session** outline.
- [x] The **enrollment pipeline** sheet (or CRM tags) with statuses + source.
- [x] The **"Ready to teach Day 1"** go/no-go checklist (printable).
- [x] Post-close "next cohort waitlist" message.

---

*Traceability: implements R8B/R10/R9; sequences the offer (3.1), waitlist (2.3), challenge (2.4),
onboarding (3.2), SOPs (3.3), and success criteria (3.4) into an executable enrollment campaign.
**This is the buildable artifact for Task 3.5; actually filling the cohort is founder-executed.**
Completing it closes the buildable work of Phase 3 — next is Phase 4 (Run & Prove), which requires a
live cohort.*
