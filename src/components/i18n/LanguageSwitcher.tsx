"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/** RU / UZ pill toggle. Sized via className for the header or the burger menu. */
export function LanguageSwitcher({ className }: { className?: string }): React.JSX.Element {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Язык / Til"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-line p-0.5",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-3 py-1 text-[12px] font-medium tracking-[0.08em] transition-colors duration-300",
              active ? "bg-ink text-cream" : "text-smoke hover:text-ink",
            )}
          >
            {LOCALE_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
