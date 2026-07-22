import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import LanguageToggle from "./LanguageToggle";
import { Button, Container } from "./ui";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const links = [
    { href: base, label: dict.nav.home },
    { href: `${base}/cohort`, label: dict.nav.cohort },
    { href: `${base}/accent-lab`, label: dict.nav.accentLab },
    { href: `${base}/about`, label: dict.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-royal-100 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={base} className="flex items-center gap-2 font-extrabold text-royal-900">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-royal-900 text-xs font-black text-gold-400">
            EEC
          </span>
          <span className="hidden text-base sm:inline">{dict.common.brand}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-ink/80 transition-colors hover:text-royal-800"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} />
          <Button href={`${base}/waitlist`} className="px-4 py-2 text-sm">
            {dict.common.joinWaitlist}
          </Button>
        </div>
      </Container>
    </header>
  );
}
