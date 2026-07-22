import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { Container } from "@/components/ui";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Already logged in? Go to the portal.
  const user = await getCurrentUser();
  if (user) redirect(`/${locale}/portal`);

  const t =
    locale === "ar"
      ? { title: "تسجيل الدخول", note: "لوحة الطالب — للطلاب المسجّلين في البرنامج.", email: "الإيميل", password: "كلمة السر", submit: "دخول", error: "بيانات غير صحيحة" }
      : { title: "Log in", note: "Student portal — for enrolled students.", email: "Email", password: "Password", submit: "Log in", error: "Invalid credentials" };

  return (
    <section className="bg-royal-50">
      <Container className="py-20">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg ring-1 ring-royal-100">
          <h1 className="text-2xl font-extrabold text-royal-900">{t.title}</h1>
          <p className="mt-2 text-sm text-ink/60">{t.note}</p>
          <LoginForm locale={locale} labels={t} />
        </div>
      </Container>
    </section>
  );
}
