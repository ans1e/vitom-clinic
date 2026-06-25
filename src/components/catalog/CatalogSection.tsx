import { getProducts } from "@/lib/api";
import { CategoryBlock } from "@/components/catalog/CategoryBlock";

export async function CatalogSection(): Promise<React.JSX.Element> {
  const shots = await getProducts("shots");
  const jelly = await getProducts("jelly");

  return (
    <section id="catalog" className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28 space-y-24 lg:space-y-36">
        <CategoryBlock
          eyebrow="VITOSHOTS"
          title="Коллагеновые шоты"
          subtitle="Готовый жидкий курс морского коллагена — один шот в день для кожи, волос и ногтей. Порционный формат без подготовки."
          image="/assets/shots-banner.webp"
          imageAlt="VITOSHOTS — коллагеновые шоты"
          ctaHref="/catalog?format=shots"
          products={shots}
          priority
        />

        <CategoryBlock
          eyebrow="Коллаген желе"
          title="Коллагеновое желе"
          subtitle="Мягкий желейный формат курса — удобная порция морского коллагена каждый день, с натуральным вкусом."
          image="/assets/jelly-banner.webp"
          imageAlt="VITOM — коллагеновое желе"
          ctaHref="/catalog?format=jelly"
          products={jelly}
        />
      </div>
    </section>
  );
}
