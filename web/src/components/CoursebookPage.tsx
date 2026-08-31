import Link from "next/link";
import { notFound } from "next/navigation";
import { renderWrapperHtml } from "@/lib/lesson-content";
import { Section } from "@/components/ui";

/**
 * Renders one non-lesson coursebook page — the stage front matter, the stage
 * glossary, or a unit's campaign front matter — from the same markdown the PDF
 * is built from.
 *
 * Shared rather than copied into each route so the three pages cannot drift in
 * how they strip the teacher overlay or style their prose. Auth is not checked
 * here: everything under /portal is already gated by the portal layout.
 */
export default async function CoursebookPage({
  locale,
  pageId,
  eyebrow,
  children,
}: {
  locale: string;
  pageId: string;
  eyebrow: string;
  children?: React.ReactNode;
}) {
  const html = await renderWrapperHtml(pageId);
  if (html == null) notFound();

  const ar = locale === "ar";

  return (
    <Section className="py-10 sm:py-14">
      <Link href={`/${locale}/portal`} className="text-sm font-semibold text-royal-700 hover:text-royal-900">
        {ar ? "‹ رجوع للوحة" : "‹ Back to dashboard"}
      </Link>

      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-royal-500">{eyebrow}</p>

      <article
        className="lesson-prose mt-4 rounded-2xl bg-white p-6 ring-1 ring-royal-100 sm:p-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {children}
    </Section>
  );
}
