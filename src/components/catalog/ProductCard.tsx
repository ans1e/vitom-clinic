"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** Carousel slides get a fixed width; grid cells stay fluid. */
  variant?: "slide" | "grid";
  priority?: boolean;
}

export function ProductCard({ product, variant = "grid", priority = false }: ProductCardProps): React.JSX.Element {
  const href = `/catalog/${product.slug}`;

  return (
    <motion.article
      className={cn(
        "card group text-center",
        variant === "slide" && "snap-start shrink-0 w-[280px] sm:w-[320px]",
      )}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href} className="block">
        <div
          className={cn(
            product.gradient,
            "relative overflow-hidden aspect-square flex items-center justify-center mb-5",
          )}
        >
          {product.badge && <Badge badge={product.badge} className="absolute top-4 left-4 z-10" />}
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={product.imageWidth}
            height={product.imageHeight}
            priority={priority}
            sizes="(max-width: 640px) 80vw, 320px"
            className={cn("card-img h-auto", product.imageWidthClass)}
          />
        </div>
        <p className="eyebrow text-[10px] text-smoke mb-2.5">
          {product.category} / {product.flavor}
        </p>
        <h3 className="wordmark text-[19px] tracking-[0.06em] text-ink mb-5">{product.name}</h3>
      </Link>
      <div className="flex flex-col items-center gap-4 border-t border-line pt-5">
        <span className="wordmark text-[15px] tracking-[0.04em] text-ink">{formatPrice(product.price)}</span>
        <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Подробнее
        </Link>
      </div>
    </motion.article>
  );
}
