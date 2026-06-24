"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getVariants } from "@/lib/variants";
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

  const description =
    product.format === "shots"
      ? "Порционный формат VITOSHOTS — готовый жидкий курс без подготовки. Морской коллаген с высокой биодоступностью, без сахара и искусственных красителей. Один приём в день для ежедневного ритуала красоты и тонуса."
      : "Желе VITOM — мягкий домашний формат курса на морском коллагене. Без сахара и искусственных красителей, удобная порция на каждый день. Объём и цена меняются при выборе варианта.";

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
        <h1 className="display text-[38px] sm:text-[52px] leading-[1.04] text-ink mb-3">
          {product.name}
        </h1>
        <p className="text-[13px] text-smoke mb-7">
          Артикул: <span className="text-ink">{product.id.toUpperCase()}</span>
        </p>

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

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center border border-line rounded-full">
            <button
              type="button"
              aria-label="Уменьшить количество"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-11 h-11 flex items-center justify-center text-ink hover:bg-paper transition-colors rounded-l-full disabled:opacity-40"
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
              className="w-11 h-11 flex items-center justify-center text-ink hover:bg-paper transition-colors rounded-r-full"
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          <Button type="button" variant="dark" size="lg" onClick={handleAdd} aria-live="polite">
            {added ? "Добавлено ✓" : "В корзину"}
          </Button>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-out text-[12px] px-7 py-3.5 rounded-full"
          >
            Написать
          </a>
        </div>

        <div className="border-t border-line pt-8 space-y-4 max-w-[520px]">
          <p className="text-[15px] leading-[1.8] text-smoke">{description}</p>
          <p className="text-[15px] leading-[1.8] text-smoke">
            Вкус «{product.flavor.toLowerCase()}» — натуральный, без приторности. Заказ и
            доставка по Узбекистану — через Uzum Market.
          </p>
        </div>
      </div>
    </div>
  );
}
