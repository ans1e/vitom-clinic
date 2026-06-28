"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { useScrollLock } from "@/hooks/useScrollLock";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
}

export function MobileNav({ open, onClose, items }: MobileNavProps): React.JSX.Element {
  const { t } = useLocale();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.header.menu}
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t.common.close}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Right drawer */}
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[86%] max-w-[400px] bg-cream flex flex-col",
          "shadow-[-24px_0_60px_-24px_rgba(14,14,14,0.35)]",
          "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Close button alone in the top-right corner. */}
        <div className="flex items-center justify-end h-[64px] px-5 shrink-0">
          <button
            type="button"
            aria-label={t.common.close}
            onClick={onClose}
            className="text-ink hover:opacity-60 transition-opacity"
          >
            <X className="w-7 h-7" strokeWidth={1.5} />
          </button>
        </div>

        {/* Brand title + nav, centered and top-aligned (Bonya-style). */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <p className="wordmark text-[17px] text-ink text-center select-none mb-10">
            VITOM&nbsp;CLINIC
          </p>
          <nav className="flex flex-col items-center gap-7">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="text-[15px] sm:text-[16px] font-semibold uppercase tracking-[0.09em] leading-[1.35] text-balance text-center text-ink hover:opacity-55 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Language toggle pinned to the bottom of the drawer. */}
        <div className="shrink-0 px-6 pb-10 pt-4 flex justify-center">
          <LanguageSwitcher className="scale-110" />
        </div>
      </div>
    </div>
  );
}
