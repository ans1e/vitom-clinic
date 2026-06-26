"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, MessageCircle } from "lucide-react";

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
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start pb-28 lg:pb-0">
      {/* Image — square so it always fits the viewport; both jelly jars are
          mounted and cross-fade instantly. */}
      <div
        className={cn(
          product.gradient,
          "relative flex items-center justify-center overflow-hidden aspect-square lg:max-h-[560px] p-8 mx-auto w-full max-w-[520px] lg:max-w-none",
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

        <p className="wordmark text-[30px] tracking-[0.03em] text-ink mb-8">
          {formatPrice(variant.price, "")}
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

        {/* Desktop: actions inline, with fixed equal button widths so the row
            never reflows when the label changes to "Добавлено ✓". On mobile the
            same controls live in the sticky bar below. */}
        <div className="hidden lg:flex lg:flex-wrap lg:items-center gap-3">
          <div className="flex items-center border border-line rounded-full">
            <button
              type="button"
              aria-label="Уменьшить количество"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-12 h-12 flex items-center justify-center text-ink hover:bg-paper transition-colors rounded-l-full disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <span className="w-10 text-center text-[15px] font-medium tabular-nums" aria-live="polite">
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

          <Button
            type="button"
            variant="dark"
            size="lg"
            onClick={handleAdd}
            aria-live="polite"
            className="w-[168px] rounded-full"
          >
            {added ? "Добавлено ✓" : "В корзину"}
          </Button>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-[168px] rounded-full")}
          >
            Написать
          </a>
        </div>

        {/* Description sits below the actions, as the last thing in the column. */}
        <p className="text-[15px] leading-[1.75] text-smoke max-w-[480px] mt-8 lg:mt-10 lg:pt-8 lg:border-t lg:border-line">
          {getShortDescription(product)}
        </p>
      </div>

      {/* Mobile: actions pinned to the bottom of the viewport (bonya-style) so
          add-to-cart is always reachable while the page scrolls. */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 backdrop-blur px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.85rem)]">
        <div className="flex items-center gap-2.5 max-w-[480px] mx-auto">
          <div className="flex items-center shrink-0 border border-line rounded-full">
            <button
              type="button"
              aria-label="Уменьшить количество"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-11 flex items-center justify-center text-ink rounded-l-full disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <span className="w-7 text-center text-[15px] font-medium tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Увеличить количество"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-11 flex items-center justify-center text-ink rounded-r-full"
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          <Button
            type="button"
            variant="dark"
            size="lg"
            onClick={handleAdd}
            aria-live="polite"
            className="flex-1 min-w-0 px-3 rounded-full"
          >
            {added ? "Добавлено ✓" : "В корзину"}
          </Button>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "shrink-0 w-11 h-11 rounded-full",
            )}
          >
            <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </div>
  );
}
