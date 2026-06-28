import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Locale } from "@/lib/i18n/config";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const priceFormatter = new Intl.NumberFormat("ru-RU");

/**
 * Formats a UZS price localized per locale, e.g. "от 650 000 сум" (ru) or
 * "650 000 so'mdan" (uz). When `from` is false the prefix/suffix is dropped.
 */
export function formatPrice(value: number, locale: Locale = "ru", from = false): string {
  const amount = priceFormatter.format(value);
  if (locale === "uz") {
    return from ? `${amount} so'mdan` : `${amount} so'm`;
  }
  return from ? `от ${amount} сум` : `${amount} сум`;
}
