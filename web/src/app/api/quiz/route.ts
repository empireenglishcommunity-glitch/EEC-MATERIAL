import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getQuizResults, saveQuizResults, type QuizResult } from "@/lib/store";
import { getQuiz, correctDisplayIndex, isCorrectChoice } from "@/content/quizzes";
import { stageOfQuizKey, userCanAccessStage } from "@/lib/access";

// Grade a unit's formative quiz server-side (never trust client scoring).
// Body: { unit: "u1", answers: number[] }
// Returns: { ok, score, total, corrections: number[] (correct DISPLAY index per question), best }
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const { unit, answers } = (await req.json()) as { unit?: string; answers?: number[] };
    const quiz = unit ? getQuiz(unit) : null;
    if (!quiz) {
      return NextResponse.json({ ok: false, error: "invalid_unit" }, { status: 400 });
    }
    if (!(await userCanAccessStage(user, stageOfQuizKey(quiz.unit)))) {
      return NextResponse.json({ ok: false, error: "stage_locked" }, { status: 403 });
    }
    if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return NextResponse.json({ ok: false, error: "invalid_answers" }, { status: 400 });
    }

    // Grade against the DISPLAY order the learner actually saw. The rotation is
    // derived from the question id, so it is identical here and in the page —
    // grading against the authored index would mark every rotated item wrong.
    let score = 0;
    const corrections = quiz.questions.map((question, i) => {
      if (isCorrectChoice(question, answers[i])) score++;
      return correctDisplayIndex(question);
    });
    const total = quiz.questions.length;

    const all = await getQuizResults();
    const forUser = all[user.id] ?? {};
    const prev = forUser[quiz.unit];
    const result: QuizResult = {
      best: Math.max(score, prev?.best ?? 0),
      total,
      lastScore: score,
      attempts: (prev?.attempts ?? 0) + 1,
      at: new Date().toISOString(),
    };
    forUser[quiz.unit] = result;
    all[user.id] = forUser;
    await saveQuizResults(all);

    return NextResponse.json({ ok: true, score, total, corrections, best: result.best });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
