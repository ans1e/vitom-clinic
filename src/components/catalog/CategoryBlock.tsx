import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal } from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface CategoryBlockProps {
  title: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  ctaHref: string;
  products: Product[];
  /** First block on the page loads its banner eagerly for LCP. */
  priority?: boolean;
}

export function CategoryBlock({
  title,
  ctaLabel,
  image,
  imageAlt,
  ctaHref,
  products,
  priority = false,
}: CategoryBlockProps): React.JSX.Element {
  return (
    <div>
      {/* Banner: image left, title + CTA right. On mobile it stacks and centres
          (bonya-style): image, then title, then a full-width button. */}
      <Reveal className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-14 lg:mb-20">
        <div className="relative w-full max-w-[420px] mx-auto lg:mx-0 aspect-[3/4] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover"
          />
        </div>

        <div className="text-center max-w-[440px] mx-auto lg:mx-0 lg:pl-4">
          <h2 className="display text-[clamp(1.75rem,6vw,48px)] leading-[1.08] text-ink text-balance mb-8">{title}</h2>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: "dark", size: "lg" }), "w-full")}>
            {ctaLabel}
          </Link>
        </div>
      </Reveal>

      {/* Product row: horizontal scroll on mobile, 3-up grid on desktop. */}
      <Reveal>
        <div className="-mx-6 lg:mx-0 px-6 lg:px-0 overflow-x-auto scrollbar-hide lg:overflow-visible">
          <ul className="flex gap-6 lg:grid lg:grid-cols-3 lg:gap-8">
            {products.map((product, i) => (
              <li key={product.id} className="shrink-0 w-[72%] sm:w-[46%] lg:w-auto">
                <ProductCard product={product} variant="grid" priority={priority && i === 0} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
