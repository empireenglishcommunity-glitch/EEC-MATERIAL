import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import StageDashboard from "@/components/StageDashboard";

export default async function PortalDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const user = await getCurrentUser();
  if (!user) return null; // layout already guards/redirects

  return <StageDashboard locale={locale} stageId="s0" user={user} />;
}
