import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { stageWrapperPageId } from "@/lib/lessons";
import CoursebookPage from "@/components/CoursebookPage";

/** Stage-0 glossary — every "Your Arsenal" entry from all 55 lessons, by unit. */
export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <CoursebookPage
      locale={locale}
      stageId="s0"
      pageId={stageWrapperPageId("s0", "glossary")}
      eyebrow={locale === "ar" ? "ذخيرتك · Stage 0" : "Glossary · Stage 0"}
    />
  );
}
