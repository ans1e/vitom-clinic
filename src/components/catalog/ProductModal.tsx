"use client";

import { useEffect, useRef, useState } from "react";
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
  const scrollYRef = useRef(0);

  const variants = getVariants(product.format);
  const variant = variants[variantIndex];

  useEffect(() => setMounted(true), []);

  // Reset selection each time the modal opens.
  useEffect(() => {
    if (open) {
      setVariantIndex(0);
      setAdded(false);
    }
  }, [open]);

  // Scroll lock — depends only on `open` so changing the volume never re-runs it
  // (which previously snapped the page back to the top).
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    scrollYRef.current = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollYRef.current);
    };
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

  // Higher jelly volumes show the larger jar.
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
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center p-4",
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
          "relative w-full max-w-[600px] max-h-[92vh] overflow-y-auto bg-cream",
          "shadow-[0_30px_80px_-20px_rgba(14,14,14,0.45)]",
          "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
          open ? "translate-y-0" : "translate-y-4",
        )}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-ink hover:opacity-60 transition-opacity"
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
              sizes="(max-width: 640px) 80vw, 300px"
              className={cn("h-auto", imageClass)}
            />
          </div>

          <div className="p-6 flex flex-col">
            <p className="eyebrow text-[10px] text-smoke mb-2.5">
              {product.category} / {product.flavor}
            </p>
            <h2 className="display text-[28px] sm:text-[32px] leading-[1.05] text-ink mb-3.5">{product.name}</h2>
            <p className="text-[13px] leading-[1.65] text-smoke mb-5">{description}</p>

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

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[12px] px-3.5 py-2 rounded-full border border-line">
                <span className="text-smoke">Объём </span>
                <span className="text-ink font-medium">{variant.label}</span>
              </span>
              <span className="text-[12px] px-3.5 py-2 rounded-full border border-line">
                <span className="text-smoke">Вкус </span>
                <span className="text-ink font-medium">{product.flavor}</span>
              </span>
            </div>

            <p className="wordmark text-[22px] tracking-[0.04em] text-ink mb-5 mt-auto">{formatPrice(variant.price, "")}</p>

            <div className="flex items-center gap-3">
              <Button type="button" variant="dark" size="sm" className="flex-1" onClick={handleAdd} aria-live="polite">
                {added ? "Добавлено ✓" : "В корзину"}
              </Button>
              <a
                href="#contacts"
                onClick={onClose}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}
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
