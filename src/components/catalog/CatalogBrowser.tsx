"use client";

import { useQueryState, parseAsStringLiteral } from "nuqs";

import { ProductCard } from "@/components/catalog/ProductCard";
import { cn } from "@/lib/utils";
import type { Product, ProductFormat } from "@/types";

const FILTERS = [
  { value: null, label: "Все" },
  { value: "shots", label: "Шоты" },
  { value: "jelly", label: "Желе" },
] as const;

export function CatalogBrowser({ products }: { products: Product[] }): React.JSX.Element {
  const [format, setFormat] = useQueryState(
    "format",
    parseAsStringLiteral(["shots", "jelly"] as const),
  );

  const visible = format ? products.filter((p) => p.format === format) : products;

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-14" role="group" aria-label="Фильтр по формату">
        {FILTERS.map((filter) => {
          const active = format === filter.value;
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={active}
              onClick={() => setFormat(filter.value as ProductFormat | null)}
              className={cn(
                "eyebrow text-[11px] px-6 py-3 rounded-full border transition-colors duration-300",
                active
                  ? "bg-ink text-white border-ink"
                  : "bg-transparent text-smoke border-line hover:border-ink hover:text-ink",
              )}
            >
              {filter.label}
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
