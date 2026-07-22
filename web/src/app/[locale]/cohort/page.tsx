import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { Button, Container, Section } from "@/components/ui";

export default async function CohortPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const t = d.cohort;
  const base = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-royal-950 to-royal-800 text-white">
        <Container className="py-16 text-center sm:py-24">
          <h1 className="text-3xl font-extrabold sm:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-royal-100/90">{t.sub}</p>
          <div className="mt-8 flex justify-center">
            <Button href={`${base}/waitlist`}>{d.common.joinWaitlist}</Button>
          </div>
        </Container>
      </section>

      {/* Who for / not for */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-royal-100 bg-cream p-6">
            <h2 className="text-xl font-bold text-royal-900">{t.whoForTitle}</h2>
            <ul className="mt-4 space-y-3">
              {t.whoFor.map((x) => (
                <li key={x} className="flex gap-3 text-ink/80">
                  <span className="text-gold-600">✓</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-royal-100 bg-white p-6">
            <h2 className="text-xl font-bold text-royal-900">{t.whoNotTitle}</h2>
            <ul className="mt-4 space-y-3">
              {t.whoNot.map((x) => (
                <li key={x} className="flex gap-3 text-ink/70">
                  <span className="text-royal-400">✕</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Includes */}
      <Section className="bg-royal-50">
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.includesTitle}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.includes.map((x) => (
            <div key={x.title} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
              <h3 className="text-lg font-bold text-royal-900">{x.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{x.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.howTitle}</h2>
        <ul className="mx-auto mt-8 max-w-2xl space-y-3">
          {t.how.map((x) => (
            <li key={x} className="flex gap-3 rounded-xl border border-royal-100 bg-cream p-4 text-ink/80">
              <span className="text-gold-600">◆</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Guarantee */}
      <Section className="bg-royal-50">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-royal-900 to-royal-700 p-8 text-white sm:p-10">
          <h2 className="text-2xl font-extrabold text-gold-400">{t.guaranteeTitle}</h2>
          <p className="mt-4 leading-relaxed text-royal-100/90">{t.guaranteeDesc}</p>
        </div>
      </Section>

      {/* Pricing */}
      <Section>
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.pricingTitle}</h2>
        <p className="mt-3 text-center font-semibold text-gold-600">{t.pricingNote}</p>
        <ul className="mx-auto mt-8 max-w-2xl space-y-3">
          {t.pricingPoints.map((x) => (
            <li key={x} className="flex gap-3 text-ink/80">
              <span className="text-gold-600">✓</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href={`${base}/waitlist`}>{t.ctaButton}</Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-royal-50">
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.faqTitle}</h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          {t.faq.map((f) => (
            <div key={f.q} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
              <h3 className="font-bold text-royal-900">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-3xl border border-gold-500/30 bg-cream p-8 text-center sm:p-12">
          <h2 className="text-2xl font-extrabold text-royal-900">{t.ctaTitle}</h2>
          <div className="mt-6 flex justify-center">
            <Button href={`${base}/waitlist`}>{t.ctaButton}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
