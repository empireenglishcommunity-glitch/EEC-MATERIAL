import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { Container } from "./ui";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const links = [
    { href: base, label: dict.nav.home },
    { href: `${base}/cohort`, label: dict.nav.cohort },
    { href: `${base}/accent-lab`, label: dict.nav.accentLab },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/waitlist`, label: dict.nav.waitlist },
  ];

  return (
    <footer className="bg-royal-950 text-royal-100">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="text-xl font-extrabold text-white">{dict.common.brand}</div>
            <p className="mt-2 font-semibold text-gold-400">{dict.common.tagline}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-royal-200/80">
              {dict.footer.honesty}
            </p>
          </div>
          <div className="sm:text-end">
            <div className="font-bold text-white">{dict.footer.navTitle}</div>
            <ul className="mt-3 space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-royal-200 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-royal-200/70">
          © {new Date().getFullYear()} {dict.common.brand}. {dict.footer.rights}
        </div>
      </Container>
    </footer>
  );
}
