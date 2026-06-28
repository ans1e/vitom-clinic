"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { getVariants } from "@/lib/variants";
import { getShortDescription } from "@/lib/product-content";
import { useCartStore } from "@/store/cart";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizeProduct, localizeVolume } from "@/lib/i18n/helpers";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const TELEGRAM_URL = "https://t.me/vitom_uz";

export function ProductDetail({ product: raw }: { product: Product }): React.JSX.Element {
  const { t, locale } = useLocale();
  const product = localizeProduct(raw, t);
  const variants = getVariants(product.format);
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  // 0 = the rendered product image; 1..n = lifestyle gallery photos.
  const [photoIndex, setPhotoIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const variant = variants[variantIndex];
  const gallery = product.gallery ?? [];
  const isProductView = photoIndex === 0;
  // Total = the rendered product image plus every lifestyle photo.
  const totalImages = gallery.length + 1;
  const goPrev = (): void => setPhotoIndex((i) => (i - 1 + totalImages) % totalImages);
  const goNext = (): void => setPhotoIndex((i) => (i + 1) % totalImages);

  const hasBig = product.format === "jelly" && !!product.bigImage;
  const showBig = hasBig && variantIndex >= 1;
  const activeImage = showBig ? product.bigImage! : product.image;

  const handleAdd = (): void => {
    for (let i = 0; i < quantity; i += 1) {
      addItem({
        id: `${product.id}__${variant.label}`,
        slug: product.slug,
        name: `${product.name} — ${product.flavor}, ${localizeVolume(variant.label, locale)}`,
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
      {/* Image gallery — the rendered product (with the jelly volume cross-fade)
          plus lifestyle photos, switched via arrows or the thumbnail strip. */}
      <div className="mx-auto w-full max-w-[520px] lg:max-w-none">
        {/* Fixed-size stage so the crossfade never shifts the layout. */}
        <div className="relative aspect-square lg:max-h-[560px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={photoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0"
          >
            {isProductView ? (
              <div
                className={cn(
                  product.gradient,
                  "relative flex items-center justify-center overflow-hidden h-full w-full p-8",
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
            ) : (
              <div className="relative overflow-hidden h-full w-full">
                <Image
                  src={gallery[photoIndex - 1]}
                  alt={`${product.name} — ${product.flavor}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 600px"
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={t.product.prevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-cream/85 backdrop-blur border border-line text-ink shadow-[0_8px_20px_-10px_rgba(14,14,14,0.5)] transition-colors hover:bg-cream"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={t.product.nextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-cream/85 backdrop-blur border border-line text-ink shadow-[0_8px_20px_-10px_rgba(14,14,14,0.5)] transition-colors hover:bg-cream"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </>
        )}
        </div>

        {gallery.length > 0 && (
          <div className="flex gap-3 mt-3">
            <button
              type="button"
              onClick={() => setPhotoIndex(0)}
              aria-label={t.product.productImage}
              aria-pressed={isProductView}
              className={cn(
                product.gradient,
                "relative flex items-center justify-center shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-colors",
                isProductView ? "border-ink" : "border-transparent hover:border-line",
              )}
            >
              <Image
                src={product.image}
                alt=""
                width={product.imageWidth}
                height={product.imageHeight}
                className={cn("h-auto w-[68%]")}
              />
            </button>
            {gallery.map((photo, i) => (
              <button
                key={photo}
                type="button"
                onClick={() => setPhotoIndex(i + 1)}
                aria-label={`${t.product.photo} ${i + 2}`}
                aria-pressed={photoIndex === i + 1}
                className={cn(
                  "relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-colors",
                  photoIndex === i + 1 ? "border-ink" : "border-transparent hover:border-line",
                )}
              >
                <Image src={photo} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="lg:pt-4">
        <p className="eyebrow text-[11px] text-smoke mb-4">{product.category}</p>
        <h1 className="display text-[24px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-ink mb-3">
          {product.name}
        </h1>
        <p className="text-[15px] text-smoke mb-6">
          {t.product.flavorLabel}: <span className="text-ink">{product.flavor}</span>
        </p>

        <p className="wordmark text-[30px] tracking-[0.03em] text-ink mb-8">
          {formatPrice(variant.price, locale)}
        </p>

        <p className="eyebrow text-[10px] text-smoke mb-3">{t.product.volume}</p>
        <div className="flex flex-wrap gap-2.5 mb-9" role="group" aria-label={t.product.volume}>
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
                {localizeVolume(v.label, locale)}
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
              aria-label={t.product.decrease}
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
              aria-label={t.product.increase}
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
            {added ? t.product.added : t.product.addToCart}
          </Button>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-[168px] rounded-full")}
          >
            {t.product.write}
          </a>
        </div>

        {/* Description sits below the actions, as the last thing in the column. */}
        <p className="text-[15px] leading-[1.75] text-smoke max-w-[480px] mt-8 lg:mt-10 lg:pt-8 lg:border-t lg:border-line">
          {getShortDescription(raw, t)}
        </p>
      </div>

      {/* Mobile: actions pinned to the bottom of the viewport (bonya-style) so
          add-to-cart is always reachable while the page scrolls. */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 backdrop-blur px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.85rem)]">
        <div className="flex items-center gap-2.5 max-w-[480px] mx-auto">
          <div className="flex items-center shrink-0 border border-line rounded-full">
            <button
              type="button"
              aria-label={t.product.decrease}
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
              aria-label={t.product.increase}
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
            {added ? t.product.added : t.product.addToCart}
          </Button>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.product.writeTelegram}
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
