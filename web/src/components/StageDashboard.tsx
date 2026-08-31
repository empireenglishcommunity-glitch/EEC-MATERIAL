import Link from "next/link";
import { getUserProgress, getUserQuizResults, getUserAccentPractice, isTeacher, type User } from "@/lib/store";
import { STAGES, getStageLessonIds, type StageId } from "@/lib/lessons";
import { canAccessStage } from "@/lib/access";
import { getUnitQuiz, quizKey } from "@/content/quizzes";
import { getStageAccentDrills } from "@/content/accent-drills";
import { stageNav } from "@/lib/portal-nav";
import { Section } from "@/components/ui";

/**
 * Renders one stage's dashboard. Progress, quiz badges, and Accent Lab counts
 * are all filtered to the selected stage so numbers never mix across stages.
 */
export default async function StageDashboard({
  locale,
  stageId,
  user,
}: {
  locale: string;
  stageId: StageId;
  user: User;
}) {
  const stage = STAGES[stageId];
  const nav = stageNav(locale, stageId);
  const ar = locale === "ar";

  const stageLessonIds = getStageLessonIds(stageId);
  const totalLessons = stageLessonIds.length;
  const doneAll = await getUserProgress(user.id);
  const done = doneAll.filter((id) => stageLessonIds.includes(id));
  const quizResults = await getUserQuizResults(user.id);
  const accentPracticedAll = await getUserAccentPractice(user.id);

  const stageDrills = getStageAccentDrills(stageId);
  const stageDrillIds = new Set(stageDrills.map((d) => d.id));
  const accentPracticed = accentPracticedAll.filter((id) => stageDrillIds.has(id));

  const pct = totalLessons ? Math.round((done.length / totalLessons) * 100) : 0;

  return (
    <Section>
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(STAGES) as StageId[]).map((sid) => {
          const active = sid === stageId;
          const unlocked = canAccessStage(user, sid, doneAll);
          const label = `Stage ${STAGES[sid].num} · ${STAGES[sid].rank}`;
          if (active) {
            return (
              <span key={sid} className="rounded-full bg-royal-900 px-4 py-1.5 text-sm font-semibold text-white">
                {label}
              </span>
            );
          }
          if (!unlocked) {
            return (
              <span
                key={sid}
                title={ar ? "مقفولة — خلّص المرحلة السابقة الأول" : "Locked — finish the previous stage first"}
                className="cursor-not-allowed rounded-full bg-royal-50 px-4 py-1.5 text-sm font-semibold text-royal-400 ring-1 ring-royal-100"
              >
                🔒 {label}
              </span>
            );
          }
          return (
            <Link
              key={sid}
              href={stageNav(locale, sid).dashboard}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-royal-700 ring-1 ring-royal-200 hover:bg-royal-50"
            >
              {label}
            </Link>
          );
        })}
      </div>

      <h1 className="mt-4 text-3xl font-extrabold text-royal-900">
        {ar ? `أهلاً ${user.name} 👋` : `Welcome, ${user.name} 👋`}
      </h1>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-royal-500">
        Stage {stage.num} — {stage.title} · CEFR {stage.cefr} · {ar ? "رُتبة" : "Rank"} {stage.rank}
      </p>
      <p className="mt-2 text-ink/70">
        {ar ? "تقدّمك في المرحلة دي" : "Your progress in this stage"}: {done.length}/{totalLessons}{" "}
        {ar ? "درس" : "lessons"} ({pct}%)
      </p>
      {stageId !== "s0" && (
        <p className="mt-2 rounded-xl bg-cream px-4 py-2 text-sm text-ink/70 ring-1 ring-gold-500/30">
          {ar
            ? "المرحلة دي مبنية على إنك خلّصت A1 (Stage 0) أو أثبتّه في تحديد المستوى."
            : "This stage assumes you have achieved A1 (Stage 0) or evidenced it at placement."}
        </p>
      )}

      <div className="mt-4 h-3 w-full max-w-md rounded-full bg-royal-100">
        <div className="h-3 rounded-full bg-gold-500" style={{ width: `${pct}%` }} />
      </div>

      <Link
        href={nav.accentLab}
        className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-royal-900 to-royal-700 p-5 text-white transition-transform hover:scale-[1.01]"
      >
        <div>
          <p className="text-lg font-bold">🎙️ Accent Lab</p>
          <p className="mt-1 text-sm text-royal-100/90">
            {ar
              ? "اسمع، سجّل، وقارن نطقك — أصوات المرحلة دي."
              : "Listen, record, compare — this stage's target sounds."}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold">
          {accentPracticed.length}/{stageDrills.length}
        </span>
      </Link>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link
          href={nav.start}
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
          href={nav.glossary}
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
        href={nav.coursebookStudent}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-gold-500/50 bg-gradient-to-r from-cream to-white p-5 transition-transform hover:scale-[1.01]"
      >
        <div>
          <p className="text-lg font-bold text-royal-900">
            👑 {ar ? `كتاب الإمبراطورية — Stage ${stage.num}` : `The Empire Coursebook — Stage ${stage.num}`}
          </p>
          <p className="mt-1 text-sm text-ink/70">
            {ar
              ? `نزّل نسخة الطالب PDF كاملة (${stage.units.length} وحدة · ${totalLessons} درس).`
              : `Download the full Student's Edition PDF (${stage.units.length} units · ${totalLessons} lessons).`}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-gold-500 px-3 py-1.5 text-sm font-semibold text-royal-950">
          {ar ? "تحميل PDF" : "Download PDF"}
        </span>
      </a>

      {isTeacher(user) && (
        <a
          href={nav.coursebookTeacher}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-royal-300 bg-royal-900 p-5 text-white transition-transform hover:scale-[1.01]"
        >
          <div>
            <p className="text-lg font-bold">
              🎓 {ar ? `نسخة المدرّس — Stage ${stage.num}` : `Teacher's Edition — Stage ${stage.num}`}
            </p>
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
        {stage.units.map((u) => {
          const quiz = getUnitQuiz(stageId, u.id);
          const result = quizResults[quizKey(stageId, u.id)];
          return (
            <div key={u.id} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-royal-900">
                  <Link href={nav.unit(u.id)} className="hover:text-royal-700">
                    {ar ? "الوحدة" : "Unit"} {u.num} — {u.title}
                  </Link>
                </h2>
                <Link href={nav.unit(u.id)} className="text-xs font-semibold text-royal-600 hover:text-royal-900">
                  {ar ? "نظرة عامة على الوحدة ›" : "Unit overview ›"}
                </Link>
                {quiz && (
                  <Link
                    href={nav.quiz(u.id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-royal-50 px-3 py-1.5 text-xs font-semibold text-royal-700 transition-colors hover:bg-royal-100"
                  >
                    {ar ? "كويز الوحدة" : "Unit quiz"}
                    {result && (
                      <span className="rounded bg-gold-500 px-1.5 py-0.5 text-royal-950">
                        {result.best}/{result.total}
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
                        href={nav.lesson(l.id)}
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
          );
        })}
      </div>

      <p className="mt-8 text-sm text-ink/50">
        {ar
          ? "اضغط على أي درس عشان تفتح محتواه وتعلّمه كمكتمل، جرّب كويز كل وحدة، واتمرّن على نطقك في الـ Accent Lab."
          : "Open any lesson and mark it complete, try each unit's quiz, and practice your pronunciation in the Accent Lab."}
      </p>
    </Section>
  );
}
