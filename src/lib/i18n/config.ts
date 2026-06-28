export const LOCALES = ["ru", "uz"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ru" || value === "uz";
}

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "RU",
  uz: "UZ",
};
