import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProduct, getProducts, getProductSlugs } from "@/lib/api";
import { ProductDetail } from "@/components/catalog/ProductDetail";
import { ProductTabs } from "@/components/catalog/ProductTabs";
import { RelatedProducts } from "@/components/catalog/RelatedProducts";
import { BackButton } from "@/components/catalog/BackButton";
import { getProductTabs } from "@/lib/product-content";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/metadata";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} — ${product.flavor}`,
    description: `${product.name} (${product.category.toLowerCase()}, вкус «${product.flavor}»). ${product.description}. ${formatPrice(product.price)}.`,
    path: `/catalog/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  // "Смотрите также" shows the opposite format: jelly when viewing shots, and
  // shots when viewing jelly.
  const relatedFormat = product.format === "shots" ? "jelly" : "shots";
  const related = (await getProducts(relatedFormat)).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${product.flavor}`,
    image: `${SITE_URL}${product.image}`,
    description: `${product.name}. ${product.description}. Вкус: ${product.flavor}.`,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "UZS",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/catalog/${product.slug}`,
    },
  };

  return (
    <section className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 lg:py-16">
        <BackButton />

        <ProductDetail product={product} />

        <div className="mt-16 lg:mt-24">
          <ProductTabs tabs={getProductTabs(product)} />
        </div>

        <RelatedProducts products={related} />
      </div>
    </section>
  );
}
