# EEC Lean Tool Stack (v1.0)

> **Spec task:** 0.4 · **Requirements:** R11 (Operations/Tooling), R9 (Payments) · **Constraint:** GC-2 (no custom app in v1)
> **Purpose:** Define the tools EEC runs on, how they connect, and the decision criteria.
>
> ⚠️ **UPDATED — see revised GC-2 + tasks Phase 3C:** EEC now **builds its own platform** (public web →
> learner portal), hosted on our **own domain/server**, and **integrates** only: live video (Zoom),
> payments (**individual-first**: InstaPay/wallet + personal PayPal, fee-on-top — task 3B.3), and messaging
> (WhatsApp/Telegram). The **Skool/Circle course-platform** and **Paymob/Stripe** recommendations below are
> **no longer the delivery plan** — keep only the live-video / payments / messaging integration notes.
> This doc will be rewritten during Phase 3C-1.

---

## 1. Principles for choosing tools

1. **Buy, don't build (GC-2).** No custom software in v1.
2. **Egyptian payments must work — individual-first.** Accept **EGP** via InstaPay / wallet / bank transfer
   *and* **USD** via personal PayPal (fee-on-top). No company/merchant account in v1 (R9).
3. **Lean & consolidated.** Fewer tools, lower monthly cost, less glue work.
4. **Good enough now > perfect later.** We can migrate once the method is proven and revenue justifies it.
5. **Mobile-first.** Our learners live on phones (WhatsApp/Telegram, IG/TikTok).

---

## 2. Payments — the critical decision

> ✅ **Current plan = individual-first** (per the banner above): **EGP** via InstaPay/wallet/bank transfer
> + **USD** via **personal PayPal** (fee-on-top, added on top of the price). The Paymob/Fawry/Stripe
> content below is the **later Phase-2 upgrade** (after registering a sole proprietorship) — *not* the
> launch plan.

Egypt is a special case: most global course platforms rely on Stripe/PayPal, which are **limited or
awkward in Egypt** (e.g., PayPal can't link an Egyptian bank account and carries high fees). So we
**decouple payments from the course platform** and run **two rails**:

### Rail A — Egypt tier (EGP)
- **Recommendation:** a local Egyptian gateway — **Paymob** (the leading MENA payments enabler, profitable
  in Egypt, 250,000+ merchants) and/or **Fawry** (used by ~50M+ Egyptians for everyday payments).
- **Why:** accepts local Meeza/Visa/Mastercard, mobile wallets, Fawry cash/reference payments, and often
  installments — essential for Egyptian conversion and trust.
- Sources: [Paymob profitability/scale](https://techcrunch.com/2024/09/11/paymob-lands-another-22-million-and-is-profitable-in-egypt/), [Fawry reach](https://www.tap.company/en/products/payment-methods/fawry). *Content rephrased for compliance.*

### Rail B — Gulf / diaspora tier (USD / international)
- **Recommendation:** **Stripe** (or **PayPal Checkout**) for international cards, or a Gulf-friendly
  gateway (e.g., Tap/PayTabs) if we register there later.
- **Why:** frictionless USD collection from higher-paying learners.

### How this connects to delivery
- Sell via **hosted checkout / payment links** from Rail A or B, then **grant access** to the course/
  community platform (manually at first, automated later via Zapier/Make once volume grows).
- **Decision default:** start with **payment links + manual access grant** — zero integration work, works
  around Egypt's platform-payment gaps, launches immediately.

> ⚠️ **Action in Phase 0:** confirm current Paymob/Fawry onboarding requirements (commercial registration,
> fees, payout timing) and Stripe eligibility for the founder's setup before committing. Fees/rules change.

---

## 3. The delivery platform (course + community)

**Need:** host recorded lessons + run the community + basic engagement, on mobile, cheaply.

| Option | Best for | Notes |
|---|---|---|
| **Skool** | Community-first, simple, one flat price, built-in gamification & simple courses | Cheapest/simplest; great for cohort + community feel; lighter course/design features |
| **Circle** | Community + courses + events, ~2% transaction fee on lower tiers | More features/customization than Skool; strong all-round |
| **Kajabi** | All-in-one (courses + email + funnels + landing pages) | Most powerful marketing suite; most expensive; overkill for v1 |

*Sources: [Skool vs Kajabi](https://kourses.com/skool-vs-kajabi/), [Circle vs Kajabi](https://kourses.com/circle-vs-kajabi/). Content rephrased for compliance.*

**Recommendation for v1:** **Skool or Circle** (community-first, cheap, fast) — *not* Kajabi yet. Since
we decouple payments (Rail A/B above), we don't need the platform's native checkout, which removes the
usual Egypt blocker. Pick based on a quick trial:
- Choose **Skool** if we want dead-simple community + accountability + light courses at the lowest cost.
- Choose **Circle** if we want richer course structure, events, and branding now.

*(A free/near-free interim option is possible — e.g., a private Telegram/WhatsApp community + a simple
video host — but a proper platform is worth it for structure and credibility from cohort #1.)*

---

## 4. Live sessions

- **Recommendation:** **Zoom** (reliable, breakout rooms for peer pods, recording) or **Google Meet**
  (free, simple). Zoom's breakout rooms are valuable for the speaking-pod methodology (Handbook §13).

## 5. Chat, nudges & accountability

- **Recommendation:** **WhatsApp** (Egypt's default) and/or **Telegram** for cohort chat, daily
  practice prompts, and re-engagement nudges. Broadcast/community features support the accountability
  mechanics (Handbook §10). Discord only if the audience skews younger/gamer.

## 6. Scheduling & booking

- **Recommendation:** **Calendly** (or Google Calendar) for live-session slots, placement calls, and
  office hours.

## 7. Content production (free funnel)

- **Recording:** phone/camera + mic; **Editing:** CapCut (mobile/desktop, cheap/free) or Premiere/
  Descript — handled by the Egyptian part-time editor.
- **Publishing:** YouTube, TikTok, Instagram/Reels, Facebook (strong in Egypt).
- **Scheduling/organization:** a simple content calendar (spreadsheet or a tool like Metricool/Buffer).

## 8. Assessment & recording

- **Speaking samples:** recorded in Zoom or submitted as phone recordings/voice notes; stored in cloud
  (Google Drive) linked from the Cohort Tracker.
- **Quizzes/formative checks:** native platform quizzes (Skool/Circle) or Google Forms.

## 9. Analytics & KPIs

- **Cohort Tracker** (spreadsheet — see Task 0.5) as the source of truth, plus platform-native analytics
  and ad-platform analytics (Meta/TikTok/YouTube).

## 10. Automation (optional, later)

- **Zapier / Make** to auto-grant access after payment and trigger email/WhatsApp sequences — add once
  manual grants become a bottleneck. Not required for the founding cohort.

---

## 11. Recommended v1 stack (decision summary)

| Function | v1 pick | Why |
|---|---|---|
| Egypt payments | **InstaPay / wallet / bank transfer** | Personal, no company; fee-on-top; installments = 2–3 scheduled transfers |
| Intl payments | **Personal PayPal** | USD from Gulf/diaspora; fee-on-top |
| Course + community | **Skool or Circle** | Cheap, community-first, cohort-friendly; payments decoupled |
| Live sessions | **Zoom** | Breakout rooms for speaking pods + recording |
| Chat/nudges | **WhatsApp (+ Telegram)** | Egypt default; accountability + re-engagement |
| Scheduling | **Calendly** | Simple booking |
| Content editing | **CapCut** (editor-run) | Cheap/free, mobile-first |
| Tracking/KPIs | **Google Sheets** (Cohort Tracker) | Lean single source of truth |
| Automation | **Zapier/Make** (later) | Automate access + sequences once needed |

**Estimated monthly cost (v1):** roughly the platform subscription (~$40–150/mo depending on Skool vs
Circle vs annual deals) + payment processing fees (%) + minimal tool costs. Team + ads are in EGP.
**No development cost.** *(Confirm live prices at signup — vendor pricing changes.)*

---

## 12. Open actions before launch (Phase 0 close-out)

- [ ] Verify Paymob/Fawry onboarding (registration docs, fees, payout timing).
- [ ] Verify Stripe/PayPal eligibility for USD collection.
- [ ] Trial Skool vs Circle (1–2 days) and lock the platform.
- [ ] Set up WhatsApp/Telegram community + Zoom + Calendly.
- [ ] Stand up the Cohort Tracker (Task 0.5).

*Note: specific fees, features, and eligibility rules change frequently — re-verify at signup rather
than relying on this snapshot.*
