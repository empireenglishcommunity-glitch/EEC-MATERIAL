import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { getUserProgress } from "@/lib/store";
import { STAGE0, TOTAL_LESSONS } from "@/lib/lessons";
import { Section } from "@/components/ui";

export default async function PortalDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const user = await getCurrentUser();
  if (!user) return null; // layout already guards/redirects

  const done = await getUserProgress(user.id);
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

      <div className="mt-10 space-y-6">
        {STAGE0.map((u) => (
          <div key={u.id} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
            <h2 className="font-bold text-royal-900">
              {ar ? "الوحدة" : "Unit"} {u.num} — {u.title}
            </h2>
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
          ? "اضغط على أي درس عشان تفتح محتواه وتعلّمه كمكتمل. الكويزات + Accent Lab جايين في التحديثات الجاية."
          : "Tap any lesson to open its content and mark it complete. Quizzes + Accent Lab are coming in the next updates."}
      </p>
    </Section>
  );
}
