import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { getUserProgress, getUserQuizResults, getUserAccentPractice, isTeacher } from "@/lib/store";
import { STAGE0, TOTAL_LESSONS } from "@/lib/lessons";
import { QUIZZES } from "@/content/quizzes";
import { ACCENT_DRILLS } from "@/content/accent-drills";
import { Section } from "@/components/ui";

export default async function PortalDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const user = await getCurrentUser();
  if (!user) return null; // layout already guards/redirects

  const done = await getUserProgress(user.id);
  const quizResults = await getUserQuizResults(user.id);
  const accentPracticed = await getUserAccentPractice(user.id);
  const pct = TOTAL_LESSONS ? Math.round((done.length / TOTAL_LESSONS) * 100) : 0;
  const ar = locale === "ar";

  return (
    <Section>
      <h1 className="text-3xl font-extrabold text-royal-900">
        {ar ? `أهلاً ${user.name} 👋` : `Welcome, ${user.name} 👋`}
      </h1>
      <p className="mt-2 text-ink/70">
        {ar ? "مستواك" : "Level"}: {user.level} · {ar ? "تقدّمك" : "Progress"}: {done.length}/{TOTAL_LESSONS}{" "}
        {ar ? "درس" : "lessons"} ({pct}%)
      </p>
      <div className="mt-4 h-3 w-full max-w-md rounded-full bg-royal-100">
        <div className="h-3 rounded-full bg-gold-500" style={{ width: `${pct}%` }} />
      </div>

      <Link
        href={`/${locale}/portal/accent-lab`}
        className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-royal-900 to-royal-700 p-5 text-white transition-transform hover:scale-[1.01]"
      >
        <div>
          <p className="text-lg font-bold">🎙️ Accent Lab</p>
          <p className="mt-1 text-sm text-royal-100/90">
            {ar
              ? "اسمع، سجّل، وقارن نطقك — الأصوات اللي بيغلط فيها المصريون."
              : "Listen, record, compare — the sounds Egyptian speakers get wrong."}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold">
          {accentPracticed.length}/{ACCENT_DRILLS.length}
        </span>
      </Link>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link
          href={`/${locale}/portal/start`}
          className="rounded-2xl bg-white p-5 ring-1 ring-royal-100 transition-transform hover:scale-[1.01]"
        >
          <p className="font-bold text-royal-900">🧭 {ar ? "ابدأ من هنا" : "Start here"}</p>
          <p className="mt-1 text-sm text-ink/70">
            {ar
              ? "رُتبتك، خريطة المرحلة، وإزاي تذاكر الكتاب صح."
              : "Your rank, the stage roadmap, and how to study the book."}
          </p>
        </Link>
        <Link
          href={`/${locale}/portal/glossary`}
          className="rounded-2xl bg-white p-5 ring-1 ring-royal-100 transition-transform hover:scale-[1.01]"
        >
          <p className="font-bold text-royal-900">🗡️ {ar ? "الذخيرة" : "Glossary"}</p>
          <p className="mt-1 text-sm text-ink/70">
            {ar
              ? "كل كلمات المرحلة في مكان واحد، مرتّبة بالوحدة."
              : "Every word in the stage, in one place, by unit."}
          </p>
        </Link>
      </div>

      <a
        href="/api/coursebook/student"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-gold-500/50 bg-gradient-to-r from-cream to-white p-5 transition-transform hover:scale-[1.01]"
      >
        <div>
          <p className="text-lg font-bold text-royal-900">👑 {ar ? "كتاب الإمبراطورية — Stage 0" : "The Empire Coursebook — Stage 0"}</p>
          <p className="mt-1 text-sm text-ink/70">
            {ar
              ? "نزّل نسخة الطالب PDF كاملة (11 وحدة · 55 درس) — ذاكر أوفلاين أو اطبعها."
              : "Download the full Student's Edition PDF (11 units · 55 lessons) — study offline or print it."}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-gold-500 px-3 py-1.5 text-sm font-semibold text-royal-950">
          {ar ? "تحميل PDF" : "Download PDF"}
        </span>
      </a>

      {isTeacher(user) && (
        <a
          href="/api/coursebook/teacher"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-royal-300 bg-royal-900 p-5 text-white transition-transform hover:scale-[1.01]"
        >
          <div>
            <p className="text-lg font-bold">🎓 {ar ? "نسخة المدرّس — Stage 0" : "Teacher's Edition — Stage 0"}</p>
            <p className="mt-1 text-sm text-royal-100/90">
              {ar
                ? "نفس الكتاب + التوقيتات، الإجابات، وملاحظات التدريس. للمدرّسين فقط."
                : "The same book plus timings, answers and delivery notes. Teachers only."}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold">
            {ar ? "تحميل PDF" : "Download PDF"}
          </span>
        </a>
      )}

      <div className="mt-8 space-y-6">
        {STAGE0.map((u) => (
          <div key={u.id} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold text-royal-900">
                <Link href={`/${locale}/portal/units/${u.id}`} className="hover:text-royal-700">
                  {ar ? "الوحدة" : "Unit"} {u.num} — {u.title}
                </Link>
              </h2>
              <Link
                href={`/${locale}/portal/units/${u.id}`}
                className="text-xs font-semibold text-royal-600 hover:text-royal-900"
              >
                {ar ? "نظرة عامة على الوحدة ›" : "Unit overview ›"}
              </Link>
              {QUIZZES[u.id] && (
                <Link
                  href={`/${locale}/portal/quiz/${u.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-royal-50 px-3 py-1.5 text-xs font-semibold text-royal-700 transition-colors hover:bg-royal-100"
                >
                  {ar ? "كويز الوحدة" : "Unit quiz"}
                  {quizResults[u.id] && (
                    <span className="rounded bg-gold-500 px-1.5 py-0.5 text-royal-950">
                      {quizResults[u.id].best}/{quizResults[u.id].total}
                    </span>
                  )}
                </Link>
              )}
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {u.lessons.map((l) => {
                const c = done.includes(l.id);
                return (
                  <li key={l.id}>
                    <Link
                      href={`/${locale}/portal/lessons/${l.id}`}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-ink/80 transition-colors hover:bg-royal-50 hover:text-royal-900"
                    >
                      <span className={c ? "text-green-600" : "text-royal-300"}>{c ? "✓" : "○"}</span>
                      {l.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink/50">
        {ar
          ? "اضغط على أي درس عشان تفتح محتواه وتعلّمه كمكتمل، جرّب كويز كل وحدة، واتمرّن على نطقك في الـ Accent Lab."
          : "Open any lesson and mark it complete, try each unit's quiz, and practice your pronunciation in the Accent Lab."}
      </p>
    </Section>
  );
}
