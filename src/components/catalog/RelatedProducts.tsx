"use client";

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/catalog/ProductCard";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Product } from "@/types";

export function RelatedProducts({ products }: { products: Product[] }): React.JSX.Element | null {
  const { t } = useLocale();
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-line mt-20 lg:mt-28 pt-14 lg:pt-20">
      <h2 id="related-heading" className="display text-[30px] sm:text-[40px] text-ink mb-10 lg:mb-14">
        {t.product.related}
      </h2>

      {/* Center-aligned carousel: the focused card sits in the middle with its
          neighbours peeking on both sides; drag or swipe to browse. */}
      <Carousel
        opts={{ align: "center", loop: products.length > 1, dragFree: false }}
        plugins={[WheelGesturesPlugin()]}
        className="w-full"
      >
        <CarouselContent className="py-2">
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-[78%] sm:basis-1/2 lg:basis-1/3">
              <ProductCard product={product} variant="grid" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
