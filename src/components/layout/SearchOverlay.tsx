"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

import { PRODUCTS } from "@/lib/products";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

/** Normalizes a string for accent/case-insensitive substring matching. */
function norm(value: string): string {
  return value.toLowerCase().trim();
}

/** Ranks a product against the query across name, flavor and category. */
function matches(product: Product, q: string): boolean {
  const haystack = norm(`${product.name} ${product.flavor} ${product.category}`);
  return q.split(/\s+/).every((token) => haystack.includes(token));
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useScrollLock(open);
  useEffect(() => setMounted(true), []);

  // Reset and focus each time the overlay opens.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const q = norm(query);
  const results = useMemo(() => (q ? PRODUCTS.filter((p) => matches(p, q)) : []), [q]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Поиск по каталогу"
      className="fixed inset-0 z-[80] flex flex-col"
    >
      <button
        type="button"
        aria-label="Закрыть поиск"
        onClick={onClose}
        className="absolute inset-0 bg-cream/40 backdrop-blur-2xl"
      />

      <div className="modal-pop relative mx-auto w-full max-w-[760px] px-6 pt-[max(18vh,96px)]">
        <div className="flex items-center gap-3 border-b-2 border-ink pb-4">
          <Search className="w-6 h-6 text-ink shrink-0" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название, вкус или категория…"
            aria-label="Поисковый запрос"
            className="flex-1 bg-transparent text-[20px] sm:text-[26px] text-ink placeholder:text-smoke/70 outline-none [&::-webkit-search-cancel-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Закрыть поиск"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-ink/5 transition-colors"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-6 max-h-[52vh] overflow-y-auto scrollbar-hide">
          {!q && (
            <p className="text-[14px] text-smoke py-4">
              Начните вводить — ищем по названию, вкусу и категории.
            </p>
          )}

          {q && results.length === 0 && (
            <p className="text-[15px] text-ink py-4">
              По запросу «{query.trim()}» ничего не найдено.
            </p>
          )}

          <ul className="flex flex-col">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/catalog/${product.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 py-3 border-b border-line/70 transition-colors hover:bg-ink/[0.03] -mx-3 px-3 rounded-lg"
                >
                  <span
                    className={cn(
                      product.gradient,
                      "relative shrink-0 w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center",
                    )}
                  >
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      width={product.imageWidth}
                      height={product.imageHeight}
                      sizes="56px"
                      className="w-[78%] h-auto"
                    />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block wordmark text-[15px] tracking-[0.04em] text-ink truncate">
                      {product.name}
                    </span>
                    <span className="block text-[13px] text-smoke">
                      {product.category} · {product.flavor}
                    </span>
                  </span>
                  <span className="shrink-0 text-[13px] text-smoke group-hover:text-ink transition-colors">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
