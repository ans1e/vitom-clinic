import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal } from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface CategoryBlockProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  ctaHref: string;
  products: Product[];
  /** First block on the page loads its banner eagerly for LCP. */
  priority?: boolean;
}

export function CategoryBlock({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  ctaHref,
  products,
  priority = false,
}: CategoryBlockProps): React.JSX.Element {
  return (
    <div>
      {/* Banner: image left, copy + CTA right (stacks on mobile). */}
      <Reveal className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-14 lg:mb-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover"
          />
        </div>

        <div className="lg:pl-4">
          <p className="eyebrow text-[11px] text-smoke mb-5">{eyebrow}</p>
          <h2 className="display text-[34px] sm:text-[48px] leading-[1.05] text-ink mb-5">{title}</h2>
          <p className="text-[16px] leading-[1.8] text-smoke max-w-[440px] mb-9">{subtitle}</p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: "dark", size: "lg" }))}>
            К покупкам
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
