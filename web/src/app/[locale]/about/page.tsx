import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { Button, Container, Section } from "@/components/ui";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const t = d.about;
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
        <div className="mx-auto max-w-2xl space-y-4 text-lg leading-relaxed text-ink/80">
          {t.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section className="bg-royal-50">
        <h2 className="text-center text-3xl font-extrabold text-royal-900">{t.valuesTitle}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {t.values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-white p-6 ring-1 ring-royal-100">
              <h3 className="text-lg font-bold text-royal-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href={`${base}/waitlist`}>{t.cta}</Button>
        </div>
      </Section>
    </>
  );
}
