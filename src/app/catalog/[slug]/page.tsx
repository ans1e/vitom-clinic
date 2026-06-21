import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct, getProductSlugs } from "@/lib/api";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/metadata";
import { cn, formatPrice } from "@/lib/utils";

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
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <nav aria-label="Хлебные крошки" className="eyebrow text-[10px] text-smoke mb-10 flex gap-2">
          <Link href="/catalog" className="hover:text-ink transition-colors">
            Каталог
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">{product.flavor}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={cn(product.gradient, "overflow-hidden aspect-square flex items-center justify-center")}>
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={product.imageWidth}
              height={product.imageHeight}
              priority
              sizes="(max-width: 1024px) 90vw, 600px"
              className={cn("h-auto", product.imageWidthClass)}
            />
          </div>

          <div>
            <p className="eyebrow text-[11px] text-smoke mb-5">
              {product.category} / {product.flavor}
            </p>
            <h1 className="display text-[40px] sm:text-[52px] text-ink mb-4">{product.name}</h1>
            <p className="text-[16px] leading-[1.7] text-smoke max-w-[440px] mb-8">
              {product.description}. Вкус «{product.flavor}» — без сахара, без искусственных
              красителей, 100% натуральный.
            </p>
            <p className="wordmark text-[26px] tracking-[0.04em] text-ink mb-10">
              {formatPrice(product.price)}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AddToCartButton product={product} />
              <Link href="/catalog" className="navlink eyebrow text-[11px] text-ink">
                Назад в каталог
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
