import Link from "next/link";

import { getProducts } from "@/lib/api";
import { Reveal } from "@/components/shared/Reveal";
import { ProductShowcase } from "@/components/catalog/ProductShowcase";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function CatalogSection(): Promise<React.JSX.Element> {
  const products = await getProducts();

  // Lead the carousel with the hit shots. Keeping one shot at the end means the
  // looping carousel's left-neighbour of the centered first hit is a shot too,
  // so the row opens on VITOSHOTS rather than on jelly.
  const shots = products.filter((p) => p.format === "shots");
  const jelly = products.filter((p) => p.format === "jelly");
  const showcase = [...shots.slice(0, -1), ...jelly, ...shots.slice(-1)];

  return (
    <section id="catalog" className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal className="text-center mb-16">
          <p className="eyebrow text-[11px] text-smoke mb-5">Product catalog</p>
          <h2 className="display text-[40px] sm:text-[52px] text-ink mb-5">Два формата приёма</h2>
          <p className="text-[15px] leading-[1.7] text-smoke max-w-[520px] mx-auto">
            Шоты и желе VITOM представлены в трёх объёмах. Сверяйте каталог, чтобы
            выбрать формат и вкус.
          </p>
        </Reveal>

        <Reveal>
          <ProductShowcase products={showcase} />
        </Reveal>

        <Reveal className="text-center mt-16">
          <Link href="/catalog" className={cn(buttonVariants({ variant: "dark", size: "lg" }))}>
            Открыть весь каталог
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
