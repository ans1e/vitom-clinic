"use client";

import { useEffect, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product } from "@/types";

/**
 * Auto-advancing, looping product carousel (embla). Drag to browse; it pauses
 * while hovered or focused so it never scrolls out from under the pointer.
 */
export function ProductShowcase({ products }: { products: Product[] }): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api || paused) return;
    const id = window.setInterval(() => api.scrollNext(), 2800);
    return () => window.clearInterval(id);
  }, [api, paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "center", dragFree: false }}
        plugins={[WheelGesturesPlugin()]}
        className="w-full"
      >
        <CarouselContent className="py-2">
          {products.map((product, i) => (
            <CarouselItem
              key={product.id}
              className="basis-[82%] sm:basis-1/2 lg:basis-1/3"
            >
              <ProductCard product={product} variant="grid" priority={i < 3} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
