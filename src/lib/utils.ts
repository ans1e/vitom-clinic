import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const priceFormatter = new Intl.NumberFormat("ru-RU");

/** Formats a UZS price as e.g. "от 650 000 сум". */
export function formatPrice(value: number, prefix = "от "): string {
  return `${prefix}${priceFormatter.format(value)} сум`;
}
