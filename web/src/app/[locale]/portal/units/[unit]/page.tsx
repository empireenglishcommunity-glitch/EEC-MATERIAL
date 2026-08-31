import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { STAGE0 } from "@/lib/lessons";
import { unitFrontMatterId, hasWrapperPage } from "@/lib/lesson-content";
import CoursebookPage from "@/components/CoursebookPage";

// Stage-0 unit overview. Stage 1 uses /portal/stages/s1/units/[unit].

/**
 * A unit's campaign front matter — the mission, the lesson table, the prize and
 * the end-of-unit check. This is what the PDF opens each unit with.
 */
export default async function UnitOverviewPage({
  params,
}: {
  params: Promise<{ locale: string; unit: string }>;
}) {
  const { locale, unit } = await params;
  if (!isLocale(locale)) notFound();

  const meta = STAGE0.find((u) => u.id === unit);
  const pageId = unitFrontMatterId(unit);
  if (!meta || !pageId || !hasWrapperPage("s0", pageId)) notFound();

  const ar = locale === "ar";
  const first = meta.lessons[0];

  return (
    <CoursebookPage
      locale={locale}
      stageId="s0"
      pageId={pageId}
      eyebrow={`${ar ? "الوحدة" : "Unit"} ${meta.num} — ${meta.title}`}
    >
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {first && (
          <Link
            href={`/${locale}/portal/lessons/${first.id}`}
            className="rounded-lg bg-royal-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-royal-800"
          >
            {ar ? `ابدأ الوحدة — ${first.title}` : `Start the unit — ${first.title}`}
          </Link>
        )}
        <Link
          href={`/${locale}/portal/glossary`}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-royal-700 ring-1 ring-royal-200 transition-colors hover:bg-royal-50"
        >
          {ar ? "الذخيرة" : "Glossary"}
        </Link>
      </div>
    </CoursebookPage>
  );
}
