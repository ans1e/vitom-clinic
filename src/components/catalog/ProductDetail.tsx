"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { getVariants } from "@/lib/variants";
import { getShortDescription } from "@/lib/product-content";
import { useCartStore } from "@/store/cart";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const TELEGRAM_URL = "https://t.me/vitom_uz";

export function ProductDetail({ product }: { product: Product }): React.JSX.Element {
  const variants = getVariants(product.format);
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const variant = variants[variantIndex];

  const hasBig = product.format === "jelly" && !!product.bigImage;
  const showBig = hasBig && variantIndex >= 1;
  const activeImage = showBig ? product.bigImage! : product.image;

  const handleAdd = (): void => {
    for (let i = 0; i < quantity; i += 1) {
      addItem({
        id: `${product.id}__${variant.label}`,
        slug: product.slug,
        name: `${product.name} — ${product.flavor}, ${variant.label}`,
        flavor: product.flavor,
        price: variant.price,
        image: activeImage,
      });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {/* Image — both jelly jars are mounted and cross-fade instantly. */}
      <div
        className={cn(
          product.gradient,
          "relative flex items-center justify-center overflow-hidden aspect-square lg:aspect-[4/5] p-8",
        )}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={product.imageWidth}
          height={product.imageHeight}
          priority
          sizes="(max-width: 1024px) 90vw, 600px"
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
            priority
            sizes="(max-width: 1024px) 90vw, 600px"
            className={cn(
              "absolute left-1/2 top-1/2 w-[56%] h-auto -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
              showBig ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </div>

      {/* Info */}
      <div className="lg:pt-4">
        <p className="eyebrow text-[11px] text-smoke mb-4">
          {product.category} / {product.flavor}
        </p>
        <h1 className="display text-[38px] sm:text-[52px] leading-[1.04] text-ink mb-5">
          {product.name}
        </h1>

        <p className="wordmark text-[30px] tracking-[0.03em] text-ink mb-6">
          {formatPrice(variant.price, "")}
        </p>

        <p className="text-[15px] leading-[1.75] text-smoke max-w-[480px] mb-9">
          {getShortDescription(product)}
        </p>

        <p className="eyebrow text-[10px] text-smoke mb-3">Объём</p>
        <div className="flex flex-wrap gap-2.5 mb-9" role="group" aria-label="Объём">
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

        {/* On mobile the stepper sits on its own line and the two CTAs share a
            row so "Написать" never drops below; on desktop everything is inline
            with fixed, equal button widths. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start border border-line rounded-full">
            <button
              type="button"
              aria-label="Уменьшить количество"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-12 h-12 flex items-center justify-center text-ink hover:bg-paper transition-colors rounded-l-full disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <span className="flex-1 sm:flex-none sm:w-10 text-center text-[15px] font-medium tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Увеличить количество"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-12 h-12 flex items-center justify-center text-ink hover:bg-paper transition-colors rounded-r-full"
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-3">
            {/* Fixed equal widths on desktop so the row never reflows when the
                label changes to "Добавлено ✓"; both CTAs read as a matched pair. */}
            <Button
              type="button"
              variant="dark"
              size="lg"
              onClick={handleAdd}
              aria-live="polite"
              className="w-full sm:w-[168px]"
            >
              {added ? "Добавлено ✓" : "В корзину"}
            </Button>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-[168px]")}
            >
              Написать
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
