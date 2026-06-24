"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { useScrollLock } from "@/hooks/useScrollLock";

interface AccountPopupProps {
  open: boolean;
  onClose: () => void;
}

export function AccountPopup({ open, onClose }: AccountPopupProps): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);

  useScrollLock(open);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Личный кабинет"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-cream/30 backdrop-blur-2xl"
      />

      <div className="modal-pop relative w-full max-w-[360px] bg-white p-9 text-center shadow-[0_30px_90px_-20px_rgba(14,14,14,0.4)]">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-line/50 transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <p className="eyebrow text-[10px] text-smoke mb-5">Личный кабинет</p>
        <p className="display text-[44px] text-ink mb-4">Скоро</p>
        <p className="text-[14px] leading-[1.7] text-smoke">
          Профиль и история заказов появятся здесь в ближайшее время.
        </p>
      </div>
    </div>,
    document.body,
  );
}
