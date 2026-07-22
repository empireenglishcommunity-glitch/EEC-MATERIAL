"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type PublicQuestion = { id: string; prompt: string; options: string[] };

type Labels = {
  question: string;
  submit: string;
  submitting: string;
  retry: string;
  yourScore: string;
  correct: string;
  yourAnswer: string;
  answerAll: string;
  passNote: string;
};

export default function QuizRunner({
  unit,
  questions,
  labels,
}: {
  unit: string;
  questions: PublicQuestion[];
  labels: Labels;
}) {
  const [selected, setSelected] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number; corrections: number[] } | null>(null);
  const router = useRouter();

  const allAnswered = selected.every((s) => s !== null);

  function choose(qi: number, oi: number) {
    if (result) return; // locked after submit
    setSelected((prev) => prev.map((v, i) => (i === qi ? oi : v)));
  }

  async function submit() {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unit, answers: selected }),
      });
      const data = await res.json();
      if (data.ok) {
        setResult({ score: data.score, total: data.total, corrections: data.corrections });
        router.refresh(); // update dashboard badge on return
      }
    } finally {
      setSubmitting(false);
    }
  }

  function retry() {
    setSelected(questions.map(() => null));
    setResult(null);
  }

  return (
    <div className="mt-6 space-y-6">
      {result && (
        <div className="rounded-2xl bg-royal-50 p-6 ring-1 ring-royal-100">
          <p className="text-2xl font-extrabold text-royal-900">
            {labels.yourScore}: {result.score}/{result.total}
          </p>
          <p className="mt-1 text-sm text-ink/60">{labels.passNote}</p>
        </div>
      )}

      {questions.map((q, qi) => {
        const correctIdx = result?.corrections[qi];
        return (
          <div key={q.id} className="rounded-2xl bg-white p-5 ring-1 ring-royal-100">
            <p className="font-semibold text-royal-900">
              {labels.question} {qi + 1}. {q.prompt}
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected[qi] === oi;
                const isCorrect = result != null && oi === correctIdx;
                const isWrongPick = result != null && isSelected && oi !== correctIdx;
                let cls =
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors ";
                if (isCorrect) cls += "border-green-500 bg-green-50 text-green-800";
                else if (isWrongPick) cls += "border-red-400 bg-red-50 text-red-700";
                else if (isSelected) cls += "border-royal-400 bg-royal-50 text-royal-900";
                else cls += "border-royal-100 hover:border-royal-300 text-ink/80";
                return (
                  <label key={oi} className={cls}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={isSelected}
                      onChange={() => choose(qi, oi)}
                      disabled={result != null}
                      className="accent-royal-600"
                    />
                    <span>{opt}</span>
                    {isCorrect && <span className="ms-auto font-bold">✓ {labels.correct}</span>}
                    {isWrongPick && <span className="ms-auto font-bold">✗ {labels.yourAnswer}</span>}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-4">
        {!result ? (
          <button
            type="button"
            onClick={submit}
            disabled={!allAnswered || submitting}
            className="rounded-xl bg-gold-500 px-6 py-3 font-bold text-royal-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? labels.submitting : labels.submit}
          </button>
        ) : (
          <button
            type="button"
            onClick={retry}
            className="rounded-xl bg-royal-700 px-6 py-3 font-bold text-white transition-colors hover:bg-royal-800"
          >
            {labels.retry}
          </button>
        )}
        {!allAnswered && !result && <span className="text-sm text-ink/50">{labels.answerAll}</span>}
      </div>
    </div>
  );
}
