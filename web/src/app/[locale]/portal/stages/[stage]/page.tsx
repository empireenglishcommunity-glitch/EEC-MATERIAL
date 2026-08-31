import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { getStage } from "@/lib/lessons";
import StageDashboard from "@/components/StageDashboard";

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

  return <StageDashboard locale={locale} stageId={meta.id} user={user} />;
}
