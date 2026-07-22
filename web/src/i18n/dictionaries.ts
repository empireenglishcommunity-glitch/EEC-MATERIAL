import type { Locale } from "./config";
import ar from "@/content/ar.json";
import en from "@/content/en.json";

// Static import keeps everything build-time (fast, static-friendly) and type-safe.
const dictionaries = { ar, en } as const;

export type Dictionary = typeof ar;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
