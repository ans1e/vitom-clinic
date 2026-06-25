import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product } from "@/types";

export function RelatedProducts({ products }: { products: Product[] }): React.JSX.Element | null {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-line mt-20 lg:mt-28 pt-14 lg:pt-20">
      <h2 id="related-heading" className="display text-[30px] sm:text-[40px] text-ink mb-10 lg:mb-14">
        Смотрите также
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="grid" />
        ))}
      </div>
    </section>
  );
}
