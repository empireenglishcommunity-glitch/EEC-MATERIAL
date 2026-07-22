import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { getUserQuizResults } from "@/lib/store";
import { getQuiz } from "@/content/quizzes";
import { Section } from "@/components/ui";
import QuizRunner from "@/components/QuizRunner";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string; unit: string }>;
}) {
  const { locale, unit } = await params;
  if (!isLocale(locale)) notFound();

  const quiz = getQuiz(unit);
  if (!quiz) notFound();

  const user = await getCurrentUser();
  if (!user) return null; // layout guards

  const prev = (await getUserQuizResults(user.id))[quiz.unit];
  const ar = locale === "ar";

  // Never send the answer key to the client — strip it.
  const publicQuestions = quiz.questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    options: q.options,
  }));

  return (
    <Section className="py-10 sm:py-14">
      <Link href={`/${locale}/portal`} className="text-sm font-semibold text-royal-700 hover:text-royal-900">
        {ar ? "‹ رجوع للوحة" : "‹ Back to dashboard"}
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold text-royal-900">
        {ar ? "كويز الوحدة" : "Unit quiz"} {quiz.num} — {quiz.title}
      </h1>
      <p className="mt-2 text-ink/70">
        {ar
          ? "اختبار سريع للمراجعة. مفيش رسوب — الهدف إنك تراجع وتتأكد إنك فهمت."
          : "A quick review check. No pass/fail — it's for feedback and spaced review."}
        {prev ? (
          <span className="ms-1 font-semibold text-royal-800">
            {ar ? " أفضل نتيجة:" : " Best:"} {prev.best}/{prev.total}
          </span>
        ) : null}
      </p>

      <QuizRunner
        unit={quiz.unit}
        questions={publicQuestions}
        labels={{
          question: ar ? "سؤال" : "Question",
          submit: ar ? "صحّح إجاباتي" : "Check answers",
          submitting: ar ? "جارٍ التصحيح…" : "Checking…",
          retry: ar ? "حاول تاني" : "Try again",
          yourScore: ar ? "نتيجتك" : "Your score",
          correct: ar ? "الصح" : "correct",
          yourAnswer: ar ? "إجابتك" : "your answer",
          answerAll: ar ? "جاوب كل الأسئلة الأول" : "Answer all questions first",
          passNote: ar
            ? "راجع أي إجابة غلط، وحاول تاني لو حابب."
            : "Review anything you missed, then try again if you like.",
        }}
      />
    </Section>
  );
}
