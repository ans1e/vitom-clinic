import type { Metadata } from "next";
import { Suspense } from "react";

import { getProducts } from "@/lib/api";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { PageHero } from "@/components/shared/PageHero";
import { getDictionary } from "@/lib/i18n/server";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Каталог",
  description:
    "Каталог VITOM: коллагеновые шоты VITOSHOTS и желе в трёх вкусах — смородина, яблоко, вишня. Фильтруйте по формату и выбирайте курс.",
  path: "/catalog",
});

export default async function CatalogPage(): Promise<React.JSX.Element> {
  const products = await getProducts();
  const t = await getDictionary();

  return (
    <>
      <PageHero
        title={t.catalog.title}
        image="/assets/hero-catalog.webp"
        imageMobile="/assets/hero-catalog-m.webp"
        imageAlt="Каталог VITOM — шоты и желе"
      />

      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <Suspense>
            <CatalogBrowser products={products} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
