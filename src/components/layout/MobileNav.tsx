"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

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
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Меню"
      className={cn(
        "fixed inset-0 z-[60] md:hidden bg-cream flex flex-col",
        "transition-[opacity,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none",
      )}
    >
      <div className="flex items-center justify-between h-[78px] px-6 border-b border-line">
        <span className="wordmark text-[19px] text-ink select-none">VITOM&nbsp;CLINIC</span>
        <button
          type="button"
          aria-label="Закрыть меню"
          onClick={onClose}
          className="text-ink hover:opacity-60 transition-opacity"
        >
          <X className="w-7 h-7" strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col items-center justify-center gap-7 px-6 -mt-10">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="display text-[30px] text-ink hover:opacity-55 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="eyebrow text-[10px] text-smoke text-center pb-10">Marine collagen · wellness</p>
    </div>
  );
}
