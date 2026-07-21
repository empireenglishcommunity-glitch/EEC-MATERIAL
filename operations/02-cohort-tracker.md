# EEC Cohort Tracker & KPI Dashboard (v1.0)

> **Spec task:** 0.5 · **Requirements:** R13 (Measurement & KPIs), R3 (Assessment & Progress)
> **Companion file:** `operations/cohort-tracker-template.csv` (import into Google Sheets)
> **Purpose:** One lean, single-source-of-truth spreadsheet that records every learner's journey and
> rolls up into the KPIs that prove EEC works — educationally and as a business. No custom software (GC-2).

---

## 1. How to use it

1. Import `cohort-tracker-template.csv` into **Google Sheets** as the **`Learners`** tab.
2. Add one row per enrolled learner. Fill fields as the cohort progresses.
3. Create a **`Dashboard`** tab with the KPI formulas in §4 (they read from `Learners`).
4. Review the dashboard at **cohort mid-point** and **cohort close**; feed insights into the next cohort.
5. Keep speaking-sample and testimonial links pointing to a shared Drive folder (with consent).

**Privacy:** store only what you need, keep the sheet access-restricted, and never publish a learner's
clip/quote without `consent_to_use = yes`.

---

## 2. Learner record — field definitions

| Field | Meaning |
|---|---|
| `learner_id` | Unique ID (e.g., EEC-001) |
| `full_name` | Learner name |
| `tier` | Pricing/region tier: `Egypt` or `Gulf` (diaspora → Gulf tier) |
| `country` | ISO country (EG, AE, SA…) |
| `contact` | WhatsApp/phone or email |
| `enrollment_date` | Date joined |
| `cohort_id` | Cohort code (e.g., C1 = founding cohort) |
| `placement_level` | CEFR level from placement test (Pre-A1/A1/A2/B1/B2/C1) |
| `placement_score` | Placement quiz score (0–100) |
| `day1_sample_link` | Link to the "Day 1" speaking recording (baseline proof) |
| `day1_speaking_score` | Baseline speaking rubric score (avg of 5 dims, 0–5) |
| `mindset_goal` | The learner's stated kickoff goal (accountability) |
| `week1_active … week8_active` | `yes`/`no` weekly activity flags (drive completion + re-engagement) |
| `last_active_date` | Last recorded activity (feeds inactivity nudge) |
| `completed` | `yes`/`no` — finished the program |
| `end_level` | CEFR level at graduation |
| `final_speaking_score` | Graduation speaking rubric score (0–5) |
| `cefr_gain` | Levels gained (end minus start), e.g., A1→A2 = 1 |
| `hit_b2_benchmark` | `yes`/`no` — met the B2 conversation benchmark |
| `graduation_sample_link` | Link to the "after" speaking recording (proof) |
| `testimonial_link` | Link to written/video testimonial |
| `consent_to_use` | `yes`/`no` — permission to use clip/quote in marketing |
| `membership_converted` | `yes`/`no` — moved into the community membership |
| `amount_paid` | Amount paid |
| `currency` | `EGP` or `USD` |
| `notes` | Free notes (progress, issues, standout wins) |

*(Adjust `weekN_active` columns to match the actual cohort length.)*

---

## 3. The speaking score (from the rubric)

`day1_speaking_score` and `final_speaking_score` are the **average of the 5 rubric dimensions** (Fluency,
Accuracy, Pronunciation/Accent, Range, Interaction), each 0–5 — as defined in the Methodology Handbook
(§16) and the assessment suite (spec Task 1.6). The **B2 benchmark** is a defined minimum across all five
dimensions on a 20–30 min conversation task.

---

## 4. KPI Dashboard — formulas

Put these on a `Dashboard` tab (assumes data in `Learners`, rows 2:1000). Adjust ranges/columns to match.

### Educational KPIs (the ones that matter most)

```
Enrolled                 =COUNTA(Learners!A2:A1000)
Completed                =COUNTIF(Learners!<completed>, "yes")
Completion rate (%)      =Completed / Enrolled                         'target ≥ 70%
Avg CEFR level gain      =AVERAGE(Learners!<cefr_gain>)
% reaching B2 benchmark  =COUNTIF(Learners!<hit_b2_benchmark>,"yes") / Enrolled
Avg speaking gain        =AVERAGE(Learners!<final_speaking_score>) - AVERAGE(Learners!<day1_speaking_score>)
Documented transformations =COUNTIFS(Learners!<graduation_sample_link>,"<>", Learners!<consent_to_use>,"yes")
```

### Business KPIs

```
Cohort revenue (EGP)     =SUMIFS(Learners!<amount_paid>, Learners!<currency>,"EGP")
Cohort revenue (USD)     =SUMIFS(Learners!<amount_paid>, Learners!<currency>,"USD")
Total revenue (norm.)    =Revenue_USD + (Revenue_EGP / <EGP_per_USD rate>)
Ad spend (EGP)           = <entered manually from ad platforms>
Team cost (EGP)          = <entered manually>
Platform/tool cost       = <entered manually>
Cohort margin            = Total revenue − (ad + team + tools, normalized)
CAC (cost per student)   = (ad spend + attributable costs) / Enrolled     'target: falls each cohort
Membership conversion(%) =COUNTIF(Learners!<membership_converted>,"yes") / Completed
```

### Funnel KPIs (tracked alongside, from ad/platform analytics)

```
Content views → Leads (waitlist) → Challenge buyers → Cohort enrollments
Conversion rate at each step = next step / previous step
```

---

## 5. Targets (v1 defaults — refine after founding cohort)

| KPI | Target |
|---|---|
| Completion rate | ≥ 70% |
| Avg CEFR gain (per stage cohort) | ≥ 1 level |
| Documented transformations (with consent) | ≥ 10 from founding cohort |
| Membership conversion | Establish a baseline (then improve) |
| CAC | Establish a baseline; reduce cohort-over-cohort via the proof flywheel |

---

## 6. Review cadence

- **Mid-cohort:** check `weekN_active` + `last_active_date` → trigger re-engagement (Handbook §10).
- **Cohort close:** compute all KPIs, capture before/after proof, log lessons learned.
- **Between cohorts:** use results to update pricing, funnel, and curriculum (spec Phase 5.4).

---

*This tracker is the measurement backbone referenced by the Founding Cohort success criteria (Task 3.4)
and the Run & Prove phase (Phase 4).*
