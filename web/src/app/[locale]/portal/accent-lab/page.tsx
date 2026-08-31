import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import AccentLab from "@/components/AccentLab";

export default async function PortalAccentLab({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const user = await getCurrentUser();
  if (!user) return null; // layout guards

  return <AccentLab locale={locale} stageId="s0" user={user} />;
}
