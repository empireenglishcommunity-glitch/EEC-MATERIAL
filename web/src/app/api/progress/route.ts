import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getProgress, saveProgress } from "@/lib/store";
import { ALL_LESSON_IDS } from "@/lib/lessons";

// Toggle a lesson's completion for the currently-signed-in learner.
// Body: { lessonId: string, done: boolean }
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const { lessonId, done } = (await req.json()) as { lessonId?: string; done?: boolean };
    if (!lessonId || !ALL_LESSON_IDS.includes(lessonId)) {
      return NextResponse.json({ ok: false, error: "invalid_lesson" }, { status: 400 });
    }
    const progress = await getProgress();
    const set = new Set(progress[user.id] ?? []);
    if (done) set.add(lessonId);
    else set.delete(lessonId);
    progress[user.id] = [...set];
    await saveProgress(progress);
    return NextResponse.json({ ok: true, done: progress[user.id] });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
