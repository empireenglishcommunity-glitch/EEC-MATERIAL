import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/auth";
import { Container } from "@/components/ui";
import LogoutButton from "@/components/LogoutButton";

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const label = locale === "ar" ? "خروج" : "Log out";

  return (
    <div className="min-h-[60vh] bg-royal-50">
      <div className="border-b border-royal-100 bg-white">
        <Container className="flex h-14 items-center justify-between">
          <div className="font-bold text-royal-900">{locale === "ar" ? "لوحة الطالب" : "Student Portal"} · EEC</div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-ink/70">{user.name}</span>
            <LogoutButton locale={locale} label={label} />
          </div>
        </Container>
      </div>
      {children}
    </div>
  );
}
