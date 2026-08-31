import Link from "next/link";
import { getUserAccentPractice, type User } from "@/lib/store";
import { getStageAccentDrills } from "@/content/accent-drills";
import { STAGES, type StageId } from "@/lib/lessons";
import { stageNav } from "@/lib/portal-nav";
import { Section } from "@/components/ui";
import AccentRecorder from "@/components/AccentRecorder";

/** One stage's Accent Lab: record-and-compare cards filtered to that stage. */
export default async function AccentLab({
  locale,
  stageId,
  user,
}: {
  locale: string;
  stageId: StageId;
  user: User;
}) {
  const ar = locale === "ar";
  const nav = stageNav(locale, stageId);
  const drills = getStageAccentDrills(stageId);
  const practicedAll = await getUserAccentPractice(user.id);
  const drillIds = new Set(drills.map((d) => d.id));
  const practiced = practicedAll.filter((id) => drillIds.has(id));

  const recLabels = {
    playModel: ar ? "اسمع النموذج" : "Play model",
    record: ar ? "سجّل صوتك" : "Record",
    stop: ar ? "إيقاف" : "Stop",
    playYours: ar ? "تسجيلك" : "Your recording",
    recording: ar ? "بيسجّل…" : "recording…",
    compareHint: ar
      ? "اسمع النموذج وتسجيلك ورا بعض — قارن الفرق وأعد المحاولة."
      : "Play the model and your recording back-to-back — compare and try again.",
    markPracticed: ar ? "علّم كمُتَمرَّن" : "Mark practiced",
    practiced: ar ? "اتمرّنت" : "Practiced",
    noSupport: ar ? "المتصفح لا يدعم النموذج الصوتي" : "Your browser doesn't support the model voice",
    micDenied: ar
      ? "مش قادرين نوصل للمايك — اسمح بالإذن وجرّب تاني."
      : "Couldn't access your mic — allow permission and try again.",
    modelNote: ar
      ? "الصوت النموذجي مرجع أمريكاني آلي للتدريب — سجّل نفسك وقارن."
      : "The model is an automated American reference for practice — record yourself and compare.",
  };

  return (
    <Section className="py-10 sm:py-14">
      <Link href={nav.dashboard} className="text-sm font-semibold text-royal-700 hover:text-royal-900">
        {ar ? "‹ رجوع للوحة" : "‹ Back to dashboard"}
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold text-royal-900">Accent Lab</h1>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-royal-500">
        Stage {STAGES[stageId].num} — {STAGES[stageId].title}
      </p>
      <p className="mt-2 max-w-3xl text-ink/70">
        {ar
          ? "أصوات المرحلة دي. اسمع النموذج، سجّل صوتك، وقارن. الهدف نطق أمريكاني واضح وواثق — مش لهجة أصلية مضمونة."
          : "This stage's target sounds. Listen, record, compare. The goal is clear, confident American pronunciation — not a guaranteed native accent."}
      </p>
      <p className="mt-2 text-sm font-semibold text-royal-800">
        {ar ? "اتمرّنت على" : "Practiced"}: {practiced.length}/{drills.length}
      </p>

      <div className="mt-8 space-y-5">
        {drills.map((d) => (
          <div key={d.id} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-bold text-royal-900">{ar && d.titleAr ? d.titleAr : d.titleEn}</h2>
              <span className="rounded bg-royal-100 px-2 py-0.5 font-mono text-sm text-royal-700">{d.sound}</span>
              {d.unit != null && (
                <span className="rounded bg-royal-50 px-2 py-0.5 text-xs font-semibold text-royal-600">
                  {ar ? "وحدة" : "Unit"} {d.unit}
                </span>
              )}
              {d.signature && (
                <span className="rounded bg-gold-500 px-2 py-0.5 text-xs font-bold text-royal-950">
                  {ar ? "أهم تصحيح" : "Highest-value fix"}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink/80">{ar && d.cueAr ? d.cueAr : d.cueEn}</p>

            <p className="mt-3 text-lg font-semibold text-royal-900">&ldquo;{d.phrase}&rdquo;</p>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/60">
              <span>
                <span className="font-semibold text-royal-700">{ar ? "كلمات:" : "Words:"}</span>{" "}
                {d.words.join(" · ")}
              </span>
              <span>
                <span className="font-semibold text-royal-700">{ar ? "أزواج:" : "Pairs:"}</span>{" "}
                {d.pairs.join(" · ")}
              </span>
            </div>

            <AccentRecorder
              drillId={d.id}
              phrase={d.phrase}
              initialPracticed={practiced.includes(d.id)}
              labels={recLabels}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
