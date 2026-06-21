"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { getVariants } from "@/lib/variants";
import { useCartStore } from "@/store/cart";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function ProductModal({ product, open, onClose }: ProductModalProps): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const variants = getVariants(product.format);
  const variant = variants[variantIndex];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setVariantIndex(0);
    setAdded(false);
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const description =
    product.format === "shots"
      ? "Порционный формат VITOSHOTS для готового жидкого курса без подготовки. Выберите объём курса под свой ритм приёма."
      : `Желе VITOM со вкусом «${product.flavor.toLowerCase()}» для ежедневного приёма. Объём и цена меняются при выборе варианта.`;

  const handleAdd = (): void => {
    addItem({
      id: `${product.id}__${variant.label}`,
      slug: product.slug,
      name: `${product.name} — ${product.flavor}, ${variant.label}`,
      flavor: product.flavor,
      price: variant.price,
      image: product.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} — ${product.flavor}`}
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6",
        "transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Закрыть"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
      />

      <div
        className={cn(
          "relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto bg-cream",
          "shadow-[0_30px_80px_-20px_rgba(14,14,14,0.45)]",
          "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
          open ? "translate-y-0" : "translate-y-4",
        )}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-ink hover:opacity-60 transition-opacity"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>

        <div className="grid sm:grid-cols-2">
          <div className={cn(product.gradient, "flex items-center justify-center aspect-square sm:aspect-auto p-8")}>
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={product.imageWidth}
              height={product.imageHeight}
              sizes="(max-width: 640px) 90vw, 360px"
              className={cn("h-auto", product.imageWidthClass)}
            />
          </div>

          <div className="p-7 sm:p-8 flex flex-col">
            <p className="eyebrow text-[11px] text-smoke mb-3">
              {product.category} / {product.flavor}
            </p>
            <h2 className="display text-[34px] sm:text-[40px] leading-[1.05] text-ink mb-4">{product.name}</h2>
            <p className="text-[15px] leading-[1.7] text-smoke mb-7">{description}</p>

            <div className="flex flex-wrap gap-2.5 mb-5" role="group" aria-label="Объём">
              {variants.map((v, i) => {
                const active = i === variantIndex;
                return (
                  <button
                    key={v.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setVariantIndex(i)}
                    className={cn(
                      "text-[13px] font-medium px-5 py-2.5 rounded-full border transition-colors duration-300",
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

            <div className="flex flex-wrap gap-2.5 mb-7">
              <span className="text-[13px] px-4 py-2.5 rounded-full border border-line">
                <span className="text-smoke">Объём </span>
                <span className="text-ink font-medium">{variant.label}</span>
              </span>
              <span className="text-[13px] px-4 py-2.5 rounded-full border border-line">
                <span className="text-smoke">Вкус </span>
                <span className="text-ink font-medium">{product.flavor}</span>
              </span>
            </div>

            <p className="wordmark text-[24px] tracking-[0.04em] text-ink mb-6 mt-auto">{formatPrice(variant.price, "")}</p>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="dark" size="md" onClick={handleAdd} aria-live="polite">
                {added ? "Добавлено ✓" : "В корзину"}
              </Button>
              <a
                href="#contacts"
                onClick={onClose}
                className={cn(buttonVariants({ variant: "outline", size: "md" }))}
              >
                Написать
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
