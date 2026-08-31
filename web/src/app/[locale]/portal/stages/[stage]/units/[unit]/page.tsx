import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { getStage } from "@/lib/lessons";
import { userCanAccessStage } from "@/lib/access";
import { unitFrontMatterId, hasWrapperPage } from "@/lib/lesson-content";
import { stageNav } from "@/lib/portal-nav";
import CoursebookPage from "@/components/CoursebookPage";

export default async function StageUnitOverviewPage({
  params,
}: {
  params: Promise<{ locale: string; stage: string; unit: string }>;
}) {
  const { locale, stage, unit } = await params;
  if (!isLocale(locale)) notFound();
  if (stage === "s0") redirect(`/${locale}/portal/units/${unit}`);
  const meta = getStage(stage);
  if (!meta) notFound();

  const user = await getCurrentUser();
  if (!user) return null;
  if (!(await userCanAccessStage(user, meta.id))) redirect(stageNav(locale, meta.id).dashboard);

  const unitMeta = meta.units.find((u) => u.id === unit);
  const pageId = unitFrontMatterId(unit);
  if (!unitMeta || !pageId || !hasWrapperPage(meta.id, pageId)) notFound();

  const ar = locale === "ar";
  const nav = stageNav(locale, meta.id);
  const first = unitMeta.lessons[0];

  return (
    <CoursebookPage
      locale={locale}
      stageId={meta.id}
      pageId={pageId}
      eyebrow={`${ar ? "الوحدة" : "Unit"} ${unitMeta.num} — ${unitMeta.title}`}
      backHref={nav.dashboard}
    >
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {first && (
          <Link
            href={nav.lesson(first.id)}
            className="rounded-lg bg-royal-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-royal-800"
          >
            {ar ? `ابدأ الوحدة — ${first.title}` : `Start the unit — ${first.title}`}
          </Link>
        )}
        <Link
          href={nav.glossary}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-royal-700 ring-1 ring-royal-200 transition-colors hover:bg-royal-50"
        >
          {ar ? "الذخيرة" : "Glossary"}
        </Link>
      </div>
    </CoursebookPage>
  );
}
