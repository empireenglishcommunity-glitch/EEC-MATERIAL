import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { getUserProgress } from "@/lib/store";
import { getFlatLesson, getAdjacentLessons } from "@/lib/lessons";
import { renderLessonHtml } from "@/lib/lesson-content";
import { Section } from "@/components/ui";
import MarkCompleteButton from "@/components/MarkCompleteButton";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; lessonId: string }>;
}) {
  const { locale, lessonId } = await params;
  if (!isLocale(locale)) notFound();

  const lesson = getFlatLesson(lessonId);
  const html = await renderLessonHtml(lessonId);
  if (!lesson || html == null) notFound();

  const user = await getCurrentUser();
  if (!user) return null; // layout guards/redirects

  const done = (await getUserProgress(user.id)).includes(lessonId);
  const { prev, next } = getAdjacentLessons(lessonId);
  const ar = locale === "ar";

  const t = {
    back: ar ? "‹ رجوع للوحة" : "‹ Back to dashboard",
    unit: ar ? "الوحدة" : "Unit",
    prev: ar ? "الدرس السابق" : "Previous",
    next: ar ? "الدرس التالي" : "Next",
    markDone: ar ? "علّم كمكتمل" : "Mark complete",
    done: ar ? "مكتمل" : "Completed",
    markUndone: ar ? "إلغاء" : "Undo",
  };

  return (
    <Section className="py-10 sm:py-14">
      <Link href={`/${locale}/portal`} className="text-sm font-semibold text-royal-700 hover:text-royal-900">
        {t.back}
      </Link>

      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-royal-500">
        {t.unit} {lesson.unitNum} — {lesson.unitTitle}
      </p>

      <article
        className="lesson-prose mt-4 rounded-2xl bg-white p-6 ring-1 ring-royal-100 sm:p-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <MarkCompleteButton
          lessonId={lessonId}
          initialDone={done}
          labels={{ markDone: t.markDone, done: t.done, markUndone: t.markUndone }}
        />
      </div>

      <nav className="mt-10 flex items-center justify-between gap-4 border-t border-royal-100 pt-6 text-sm">
        {prev ? (
          <Link href={`/${locale}/portal/lessons/${prev.id}`} className="font-semibold text-royal-700 hover:text-royal-900">
            ‹ {t.prev}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/${locale}/portal/lessons/${next.id}`}
            className="text-end font-semibold text-royal-700 hover:text-royal-900"
          >
            {t.next}: {next.title} ›
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Section>
  );
}
