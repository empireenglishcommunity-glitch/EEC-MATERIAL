"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Labels = { markDone: string; done: string; markUndone: string };

export default function MarkCompleteButton({
  lessonId,
  initialDone,
  labels,
}: {
  lessonId: string;
  initialDone: boolean;
  labels: Labels;
}) {
  const [done, setDone] = useState(initialDone);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function toggle() {
    const next = !done;
    setDone(next); // optimistic
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, done: next }),
      });
      if (!res.ok) {
        setDone(!next); // revert on failure
        return;
      }
      startTransition(() => router.refresh());
    } catch {
      setDone(!next);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className={
        done
          ? "inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700 disabled:opacity-60"
          : "inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 font-bold text-royal-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
      }
    >
      {done ? `✓ ${labels.done}` : labels.markDone}
    </button>
  );
}
