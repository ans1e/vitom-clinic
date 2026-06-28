"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2 } from "lucide-react";

import { useCartStore } from "@/store/cart";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { buildOrderTelegramUrl } from "@/lib/order";
import { cn, formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps): React.JSX.Element {
  const { t, locale } = useLocale();
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
      className={cn("fixed inset-0 z-[70]", open ? "pointer-events-auto" : "pointer-events-none")}
    >
      <button
        type="button"
        aria-label={t.cart.closeAria}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[92%] max-w-[420px] bg-cream flex flex-col",
          "shadow-[-24px_0_60px_-24px_rgba(14,14,14,0.35)]",
          "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-[78px] px-6 border-b border-line shrink-0">
          <span className="eyebrow text-[12px] text-ink">
            {t.cart.title}{items.length > 0 ? ` · ${items.reduce((n, i) => n + i.quantity, 0)}` : ""}
          </span>
          <button
            type="button"
            aria-label={t.cart.closeAria}
            onClick={onClose}
            className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-ink hover:bg-line/50 transition-colors"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-6">
            <p className="display text-[26px] text-ink">{t.cart.empty}</p>
            <p className="text-[14px] text-smoke max-w-[240px]">{t.cart.emptyDesc}</p>
            <Link
              href="/catalog"
              onClick={onClose}
              className="btn-dark text-[12px] tracking-[0.18em] uppercase px-9 py-4"
            >
              {t.cart.toCatalog}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-5 divide-y divide-line">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5 first:pt-0">
                  <div className="shrink-0 w-[64px] h-[80px] bg-paper flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={80}
                      className="w-auto h-[72px] object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] leading-snug text-ink mb-1">{item.name}</p>
                    <p className="wordmark text-[13px] tracking-[0.03em] text-ink mb-3">
                      {formatPrice(item.price, locale)}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-line rounded-full">
                        <button
                          type="button"
                          aria-label={t.cart.decrease}
                          onClick={() => decrement(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-ink hover:opacity-60 transition-opacity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-[13px] text-ink tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={t.cart.increase}
                          onClick={() => increment(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-ink hover:opacity-60 transition-opacity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={t.cart.remove}
                        onClick={() => removeItem(item.id)}
                        className="text-smoke hover:text-ink transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-line px-6 py-6">
              <div className="flex items-center justify-between mb-5">
                <span className="eyebrow text-[11px] text-smoke">{t.cart.total}</span>
                <span className="wordmark text-[18px] tracking-[0.03em] text-ink">{formatPrice(total, locale)}</span>
              </div>
              <a
                href={buildOrderTelegramUrl(items)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="btn-dark w-full text-[12px] tracking-[0.18em] uppercase py-4 mb-3"
              >
                {t.cart.checkout}
              </a>
              <button
                type="button"
                onClick={clearCart}
                className="w-full text-center eyebrow text-[10px] text-smoke hover:text-ink transition-colors py-1"
              >
                {t.cart.clear}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
