"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { useScrollLock } from "@/hooks/useScrollLock";
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
      aria-label="Меню"
      className={cn(
        "fixed inset-0 z-[60] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Закрыть меню"
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
        <div className="flex items-center justify-between h-[78px] px-6 border-b border-line">
          <span className="wordmark text-[18px] text-ink select-none">VITOM&nbsp;CLINIC</span>
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={onClose}
            className="text-ink hover:opacity-60 transition-opacity"
          >
            <X className="w-7 h-7" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center gap-7 px-6 -mt-6">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="display text-[28px] text-ink hover:opacity-55 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
