import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { Button, Container, Section, Badge } from "@/components/ui";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const t = d.home;
  const base = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-royal-950 to-royal-800 text-white">
        <Container className="py-20 text-center sm:py-28">
          <div className="flex justify-center">
            <Badge>{t.heroBadge}</Badge>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">{t.heroTitle}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-royal-100/90">{t.heroSub}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={`${base}/waitlist`}>{t.heroPrimary}</Button>
            <Button href={`${base}/cohort`} variant="secondary">{t.heroSecondary}</Button>
          </div>
          <p className="mt-4 text-sm font-semibold text-gold-400">{t.heroNote}</p>
        </Container>
      </section>

      {/* Problem */}
      <Section>
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.problemTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-ink/70">{t.problemSub}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {t.problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-royal-100 bg-cream p-6">
              <h3 className="text-lg font-bold text-royal-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* System / pillars */}
      <Section className="bg-royal-50">
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.systemTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-ink/70">{t.systemSub}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.pillars.map((p, i) => (
            <div key={p.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-royal-100">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-royal-900 font-black text-gold-400">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-bold text-royal-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Outcome */}
      <Section>
        <div className="rounded-3xl bg-gradient-to-br from-royal-900 to-royal-700 p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-extrabold">{t.outcomeTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-royal-100/90">{t.outcomeDesc}</p>
        </div>
      </Section>

      {/* Steps */}
      <Section className="bg-royal-50">
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.stepsTitle}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
              <h3 className="text-lg font-bold text-royal-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA band */}
      <Section>
        <div className="rounded-3xl border border-gold-500/30 bg-cream p-8 text-center sm:p-12">
          <h2 className="text-3xl font-extrabold text-royal-900">{t.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink/70">{t.ctaSub}</p>
          <div className="mt-6 flex justify-center">
            <Button href={`${base}/waitlist`}>{t.ctaButton}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
