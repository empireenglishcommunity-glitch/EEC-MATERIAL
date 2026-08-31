import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import CoursebookPage from "@/components/CoursebookPage";

/** Stage-0 front matter — the coursebook's opening pages: rank, roadmap, how to study. */
export default async function StageStartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <CoursebookPage
      locale={locale}
      pageId="stage0-front-matter"
      eyebrow={locale === "ar" ? "ابدأ من هنا · Stage 0" : "Start here · Stage 0"}
    />
  );
}
