import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getStage } from "@/lib/lessons";
import { stageNav } from "@/lib/portal-nav";
import CoursebookPage from "@/components/CoursebookPage";

export default async function StageStartPage({
  params,
}: {
  params: Promise<{ locale: string; stage: string }>;
}) {
  const { locale, stage } = await params;
  if (!isLocale(locale)) notFound();
  if (stage === "s0") redirect(`/${locale}/portal/start`);
  const meta = getStage(stage);
  if (!meta) notFound();

  return (
    <CoursebookPage
      locale={locale}
      stageId={meta.id}
      pageId={`${meta.id}-front-matter`}
      eyebrow={locale === "ar" ? `ابدأ من هنا · Stage ${meta.num}` : `Start here · Stage ${meta.num}`}
      backHref={stageNav(locale, meta.id).dashboard}
    />
  );
}
