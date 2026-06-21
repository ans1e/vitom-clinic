"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductModal } from "@/components/catalog/ProductModal";
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
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

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
            "relative overflow-hidden aspect-[4/5] flex items-center justify-center mb-7",
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
        <p className="eyebrow text-[10px] text-smoke mb-3">
          {product.category} / {product.flavor}
        </p>
        <h3 className="wordmark text-[20px] tracking-[0.06em] text-ink mb-2">{product.name}</h3>
        <p className="text-[14px] text-smoke mb-1">{product.description}</p>
        <p className="text-[14px] text-smoke mb-6">{product.flavor}</p>
      </Link>
      <div className="flex flex-col items-center gap-4 border-t border-line pt-6">
        <span className="wordmark text-[15px] tracking-[0.04em] text-ink">{formatPrice(product.price)}</span>
        <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(true)}>
          Подробнее
        </Button>
      </div>

      <ProductModal product={product} open={modalOpen} onClose={closeModal} />
    </motion.article>
  );
}
