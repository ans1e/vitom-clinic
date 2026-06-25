import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product } from "@/types";

export function RelatedProducts({ products }: { products: Product[] }): React.JSX.Element | null {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-line mt-20 lg:mt-28 pt-14 lg:pt-20">
      <h2 id="related-heading" className="display text-[30px] sm:text-[40px] text-ink mb-10 lg:mb-14">
        Смотрите также
      </h2>

      {/* Horizontal scroll row with snap. Negative margins + matching padding let
          cards scroll edge-to-edge on mobile without clipping hover lift. */}
      <div className="-mx-6 lg:-mx-10 px-6 lg:px-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-px-6 lg:scroll-px-10">
        <ul className="flex gap-6 lg:gap-8 pb-2">
          {products.map((product) => (
            <li key={product.id} className="snap-start shrink-0 w-[260px] sm:w-[300px]">
              <ProductCard product={product} variant="grid" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
