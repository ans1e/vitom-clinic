import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getProduct, getProductSlugs } from "@/lib/api";
import { ProductDetail } from "@/components/catalog/ProductDetail";
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
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 eyebrow text-[10px] text-smoke hover:text-ink transition-colors mb-9"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Назад в каталог
        </Link>

        <ProductDetail product={product} />
      </div>
    </section>
  );
}
