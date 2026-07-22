import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { Button, Container, Section } from "@/components/ui";

export default async function GuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const t = d.guide;
  const base = `/${locale}`;

  return (
    <>
      <section className="bg-gradient-to-b from-royal-950 to-royal-800 text-white">
        <Container className="py-16 text-center sm:py-24">
          <h1 className="text-3xl font-extrabold sm:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-royal-100/90">{t.sub}</p>
        </Container>
      </section>

      <Section>
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-ink/80">{t.intro}</p>
      </Section>

      <Section className="bg-royal-50">
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.soundsTitle}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.sounds.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
              <h3 className="text-lg font-bold text-royal-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.fix}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.planTitle}</h2>
        <ul className="mx-auto mt-8 max-w-2xl space-y-3">
          {t.plan.map((p) => (
            <li key={p} className="flex gap-3 rounded-xl border border-royal-100 bg-cream p-4 text-ink/80">
              <span className="text-gold-600">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-royal-50">
        <div className="rounded-3xl border border-gold-500/30 bg-white p-8 text-center sm:p-12">
          <h2 className="text-2xl font-extrabold text-royal-900">{t.ctaTitle}</h2>
          <div className="mt-6 flex justify-center">
            <Button href={`${base}/waitlist`}>{t.cta}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
