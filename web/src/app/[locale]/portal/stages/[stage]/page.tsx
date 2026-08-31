import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { getStage } from "@/lib/lessons";
import { userCanAccessStage } from "@/lib/access";
import { getUserProgress } from "@/lib/store";
import StageDashboard from "@/components/StageDashboard";
import StageLocked from "@/components/StageLocked";

export default async function StageDashboardPage({
  params,
}: {
  params: Promise<{ locale: string; stage: string }>;
}) {
  const { locale, stage } = await params;
  if (!isLocale(locale)) notFound();
  // Stage 0 keeps its canonical /portal route; send its stage URL there.
  if (stage === "s0") redirect(`/${locale}/portal`);
  const meta = getStage(stage);
  if (!meta) notFound();

  const user = await getCurrentUser();
  if (!user) return null; // layout guards/redirects

  if (!(await userCanAccessStage(user, meta.id))) {
    return <StageLocked locale={locale} stageId={meta.id} doneLessonIds={await getUserProgress(user.id)} />;
  }

  return <StageDashboard locale={locale} stageId={meta.id} user={user} />;
}
