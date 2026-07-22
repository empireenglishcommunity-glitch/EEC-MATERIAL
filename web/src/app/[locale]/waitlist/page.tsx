import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { Container } from "@/components/ui";
import WaitlistForm from "@/components/WaitlistForm";

export default async function WaitlistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const t = d.waitlist;

  return (
    <section className="bg-gradient-to-b from-royal-950 to-royal-900 text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-3xl font-extrabold sm:text-5xl">{t.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-royal-100/90">{t.sub}</p>
            <ul className="mt-8 space-y-3">
              {t.benefits.map((b) => (
                <li key={b} className="text-royal-100/90">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
            <WaitlistForm form={t.form} guideHref={`/${locale}/guide`} />
          </div>
        </div>
      </Container>
    </section>
  );
}
