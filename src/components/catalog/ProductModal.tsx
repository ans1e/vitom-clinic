"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { getVariants } from "@/lib/variants";
import { useCartStore } from "@/store/cart";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

const TELEGRAM_URL = "https://t.me/vitom_uz";

export function ProductModal({ product, open, onClose }: ProductModalProps): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const variants = getVariants(product.format);
  const variant = variants[variantIndex];

  useScrollLock(open);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setVariantIndex(0);
      setAdded(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const description =
    product.format === "shots"
      ? "Порционный формат VITOSHOTS для готового жидкого курса без подготовки. Выберите объём курса под свой ритм приёма."
      : `Желе VITOM со вкусом «${product.flavor.toLowerCase()}» для ежедневного приёма. Объём и цена меняются при выборе варианта.`;

  // The larger jar is shown for jelly variants beyond the first. Both images are
  // rendered together so the browser loads them upfront — switching variants then
  // cross-fades instantly instead of fetching the big jar on demand.
  const hasBig = product.format === "jelly" && !!product.bigImage;
  const showBig = hasBig && variantIndex >= 1;
  const activeImage = showBig ? product.bigImage! : product.image;

  const handleAdd = (): void => {
    addItem({
      id: `${product.id}__${variant.label}`,
      slug: product.slug,
      name: `${product.name} — ${product.flavor}, ${variant.label}`,
      flavor: product.flavor,
      price: variant.price,
      image: activeImage,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} — ${product.flavor}`}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-cream/30 backdrop-blur-2xl"
      />

      <div className="modal-pop relative w-full max-w-[860px] max-h-[90vh] overflow-y-auto scrollbar-hide bg-white shadow-[0_30px_90px_-20px_rgba(14,14,14,0.4)]">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center text-ink bg-white/70 hover:bg-line/60 transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="grid sm:grid-cols-[1fr_1.05fr]">
          {/* Image panel — both jelly jars are mounted and cross-fade. */}
          <div
            className={cn(
              product.gradient,
              "relative flex items-center justify-center overflow-hidden p-6 aspect-square sm:aspect-auto sm:min-h-[440px]",
            )}
          >
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={product.imageWidth}
              height={product.imageHeight}
              sizes="(max-width: 640px) 80vw, 380px"
              priority
              className={cn(
                "h-auto transition-opacity duration-300",
                product.imageWidthClass,
                showBig && "opacity-0",
              )}
            />
            {hasBig && (
              <Image
                src={product.bigImage!}
                alt={product.imageAlt}
                width={product.bigImageWidth!}
                height={product.bigImageHeight!}
                sizes="(max-width: 640px) 80vw, 380px"
                priority
                className={cn(
                  "absolute left-1/2 top-1/2 w-[58%] h-auto -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
                  showBig ? "opacity-100" : "opacity-0",
                )}
              />
            )}
          </div>

          {/* Content panel */}
          <div className="flex flex-col p-7 sm:p-9">
            <p className="eyebrow text-[10px] text-smoke mb-3">
              {product.category} / {product.flavor}
            </p>
            <h2 className="display text-[30px] sm:text-[36px] leading-[1.05] text-ink mb-4">
              {product.name}
            </h2>
            <p className="text-[14px] leading-[1.7] text-smoke mb-7">{description}</p>

            <p className="eyebrow text-[10px] text-smoke mb-3">Объём</p>
            <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Объём">
              {variants.map((v, i) => {
                const active = i === variantIndex;
                return (
                  <button
                    key={v.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setVariantIndex(i)}
                    className={cn(
                      "text-[12px] font-medium px-4 py-2 rounded-full border transition-colors duration-300",
                      active
                        ? "bg-ink text-white border-ink"
                        : "bg-transparent text-ink border-line hover:border-ink",
                    )}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-6 border-t border-line">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <p className="eyebrow text-[10px] text-smoke mb-1.5">Цена курса</p>
                  <p className="wordmark text-[26px] tracking-[0.03em] text-ink leading-none">
                    {formatPrice(variant.price, "")}
                  </p>
                </div>
                <p className="text-[13px] text-smoke">{variant.label}</p>
              </div>

              <div className="flex items-center gap-3">
                <Button type="button" variant="dark" size="sm" onClick={handleAdd} aria-live="polite" className="flex-1">
                  {added ? "Добавлено ✓" : "В корзину"}
                </Button>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}
                >
                  Написать
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
