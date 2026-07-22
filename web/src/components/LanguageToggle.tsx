"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, type Locale } from "@/i18n/config";

export default function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const other = locales.find((l) => l !== locale) ?? locale;

  const segments = pathname.split("/");
  segments[1] = other; // ["", "ar", ...] → swap the locale segment
  const target = segments.join("/") || `/${other}`;

  return (
    <Link
      href={target}
      className="rounded-lg px-3 py-2 text-sm font-bold text-royal-800 ring-1 ring-inset ring-royal-200 hover:bg-royal-50"
      aria-label="Switch language"
    >
      {localeLabel[other]}
    </Link>
  );
}
