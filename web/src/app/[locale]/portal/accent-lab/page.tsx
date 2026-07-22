import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { getUserAccentPractice } from "@/lib/store";
import { ACCENT_DRILLS } from "@/content/accent-drills";
import { Section } from "@/components/ui";
import AccentRecorder from "@/components/AccentRecorder";

export default async function PortalAccentLab({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const user = await getCurrentUser();
  if (!user) return null; // layout guards

  const practiced = await getUserAccentPractice(user.id);
  const ar = locale === "ar";

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
    micDenied: ar ? "مش قادرين نوصل للمايك — اسمح بالإذن وجرّب تاني." : "Couldn't access your mic — allow permission and try again.",
    modelNote: ar
      ? "الصوت النموذجي مرجع أمريكاني آلي للتدريب — سجّل نفسك وقارن."
      : "The model is an automated American reference for practice — record yourself and compare.",
  };

  return (
    <Section className="py-10 sm:py-14">
      <Link href={`/${locale}/portal`} className="text-sm font-semibold text-royal-700 hover:text-royal-900">
        {ar ? "‹ رجوع للوحة" : "‹ Back to dashboard"}
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold text-royal-900">Accent Lab</h1>
      <p className="mt-2 max-w-3xl text-ink/70">
        {ar
          ? "الأصوات اللي بيغلط فيها المصريون أكتر. اسمع النموذج، سجّل صوتك، وقارن. الهدف نطق أمريكاني واضح وواثق — مش لهجة أصلية مضمونة."
          : "The sounds Egyptian speakers get wrong most. Listen, record, compare. The goal is clear, confident American pronunciation — not a guaranteed native accent."}
      </p>
      <p className="mt-2 text-sm font-semibold text-royal-800">
        {ar ? "اتمرّنت على" : "Practiced"}: {practiced.length}/{ACCENT_DRILLS.length}
      </p>

      <div className="mt-8 space-y-5">
        {ACCENT_DRILLS.map((d) => (
          <div key={d.id} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-bold text-royal-900">
                {ar ? d.titleAr : d.titleEn}
              </h2>
              <span className="rounded bg-royal-100 px-2 py-0.5 font-mono text-sm text-royal-700">{d.sound}</span>
              {d.signature && (
                <span className="rounded bg-gold-500 px-2 py-0.5 text-xs font-bold text-royal-950">
                  {ar ? "أهم تصحيح" : "Highest-value fix"}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink/80">{ar ? d.cueAr : d.cueEn}</p>

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
