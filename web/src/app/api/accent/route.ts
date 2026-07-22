import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAccentPractice, saveAccentPractice } from "@/lib/store";
import { ACCENT_DRILL_IDS } from "@/content/accent-drills";

// Toggle an Accent Lab drill as "practiced" for the current learner.
// Body: { drillId: string, practiced: boolean }
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const { drillId, practiced } = (await req.json()) as { drillId?: string; practiced?: boolean };
    if (!drillId || !ACCENT_DRILL_IDS.includes(drillId)) {
      return NextResponse.json({ ok: false, error: "invalid_drill" }, { status: 400 });
    }
    const all = await getAccentPractice();
    const set = new Set(all[user.id] ?? []);
    if (practiced) set.add(drillId);
    else set.delete(drillId);
    all[user.id] = [...set];
    await saveAccentPractice(all);
    return NextResponse.json({ ok: true, practiced: all[user.id] });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
