import type { Metadata } from "next";
import { Suspense } from "react";

import { getProducts } from "@/lib/api";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Каталог",
  description:
    "Каталог VITOM: коллагеновые шоты VITOSHOTS и желе в трёх вкусах — смородина, яблоко, вишня. Фильтруйте по формату и выбирайте курс.",
  path: "/catalog",
});

export default async function CatalogPage(): Promise<React.JSX.Element> {
  const products = await getProducts();

  return (
    <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-center mb-14">
          <p className="eyebrow text-[11px] text-smoke mb-5">Choose format</p>
          <h1 className="display text-[44px] sm:text-[56px] text-ink mb-5">Каталог VITOM</h1>
          <p className="text-[15px] leading-[1.7] text-smoke max-w-[520px] mx-auto">
            Шоты и желе VITOM в трёх вкусах. Выберите формат и вкус для ежедневного ритуала.
          </p>
        </div>
        <Suspense>
          <CatalogBrowser products={products} />
        </Suspense>
      </div>
    </section>
  );
}
