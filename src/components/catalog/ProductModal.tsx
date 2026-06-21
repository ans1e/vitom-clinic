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

  const showBig = product.format === "jelly" && variantIndex >= 1 && !!product.bigImage;
  const imageSrc = showBig ? product.bigImage! : product.image;
  const imageW = showBig ? product.bigImageWidth! : product.imageWidth;
  const imageH = showBig ? product.bigImageHeight! : product.imageHeight;
  const imageClass = showBig ? "w-[56%]" : product.imageWidthClass;

  const handleAdd = (): void => {
    addItem({
      id: `${product.id}__${variant.label}`,
      slug: product.slug,
      name: `${product.name} — ${product.flavor}, ${variant.label}`,
      flavor: product.flavor,
      price: variant.price,
      image: imageSrc,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} — ${product.flavor}`}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-cream/30 backdrop-blur-2xl"
      />

      <div className="relative w-full max-w-[680px] max-h-[92vh] overflow-y-auto bg-white shadow-[0_30px_90px_-20px_rgba(14,14,14,0.4)]">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-line/50 transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="grid sm:grid-cols-2">
          <div className={cn(product.gradient, "flex items-center justify-center aspect-square sm:aspect-auto p-6")}>
            <Image
              src={imageSrc}
              alt={product.imageAlt}
              width={imageW}
              height={imageH}
              sizes="(max-width: 640px) 80vw, 340px"
              className={cn("h-auto", imageClass)}
            />
          </div>

          <div className="p-7 flex flex-col">
            <p className="eyebrow text-[10px] text-smoke mb-2.5">
              {product.category} / {product.flavor}
            </p>
            <h2 className="display text-[30px] sm:text-[34px] leading-[1.05] text-ink mb-4">{product.name}</h2>
            <p className="text-[14px] leading-[1.7] text-smoke mb-6">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Объём">
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

            <div className="flex flex-wrap gap-2 mb-7">
              <span className="text-[12px] px-3.5 py-2 rounded-full border border-line">
                <span className="text-smoke">Объём </span>
                <span className="text-ink font-medium">{variant.label}</span>
              </span>
              <span className="text-[12px] px-3.5 py-2 rounded-full border border-line">
                <span className="text-smoke">Вкус </span>
                <span className="text-ink font-medium">{product.flavor}</span>
              </span>
            </div>

            <p className="wordmark text-[24px] tracking-[0.04em] text-ink mb-6 mt-auto">{formatPrice(variant.price, "")}</p>

            <div className="flex items-center gap-3">
              <Button type="button" variant="dark" size="sm" onClick={handleAdd} aria-live="polite">
                {added ? "Добавлено ✓" : "В корзину"}
              </Button>
              <a
                href="#contacts"
                onClick={onClose}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
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
