"use client";

import Image from "next/image";
import { useQueryState, parseAsStringLiteral } from "nuqs";

import { ProductCard } from "@/components/catalog/ProductCard";
import { cn } from "@/lib/utils";
import type { Product, ProductFormat } from "@/types";

/** Order and imagery mirror the in-store category chips: Все · Желе · Шоты. */
const FILTERS = [
  { value: null, label: "Все", image: "/assets/filter-all.webp" },
  { value: "jelly", label: "Желе", image: "/assets/filter-jelly.webp" },
  { value: "shots", label: "Шоты", image: "/assets/filter-shots.webp" },
] as const;

export function CatalogBrowser({ products }: { products: Product[] }): React.JSX.Element {
  const [format, setFormat] = useQueryState(
    "format",
    parseAsStringLiteral(["shots", "jelly"] as const),
  );

  const visible = format ? products.filter((p) => p.format === format) : products;

  return (
    <div>
      {/* Photographic category chips — round, with the label beneath. */}
      <div
        className="flex items-start justify-center gap-7 sm:gap-12 mb-16"
        role="group"
        aria-label="Фильтр по формату"
      >
        {FILTERS.map((filter) => {
          const active = format === filter.value;
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={active}
              onClick={() => setFormat(filter.value as ProductFormat | null)}
              className="group flex flex-col items-center gap-3.5 focus-visible:outline-none"
            >
              <span
                className={cn(
                  "relative block w-[84px] h-[84px] sm:w-[108px] sm:h-[108px] rounded-full overflow-hidden",
                  "ring-1 ring-line transition-[box-shadow,scale] duration-300",
                  "group-focus-visible:ring-2 group-focus-visible:ring-ink",
                  active
                    ? "ring-2 ring-ink scale-[1.04]"
                    : "group-hover:ring-ink/50",
                )}
              >
                <Image
                  src={filter.image}
                  alt={filter.label}
                  fill
                  sizes="108px"
                  className={cn(
                    "object-cover transition-[scale] duration-500 group-hover:scale-[1.06]",
                    !active && "opacity-95",
                  )}
                />
              </span>
              <span
                className={cn(
                  "eyebrow text-[11px] transition-colors duration-300",
                  active ? "text-ink" : "text-smoke group-hover:text-ink",
                )}
              >
                {filter.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {visible.map((product, i) => (
          <ProductCard key={product.id} product={product} variant="grid" priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
