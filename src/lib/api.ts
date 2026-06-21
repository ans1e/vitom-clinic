import { PRODUCTS } from "@/lib/products";
import type { Product, ProductFormat } from "@/types";

/**
 * Typed data-access wrappers. These mirror the signatures of real async fetch
 * calls (and stay `async`) so they can be swapped for a CMS/commerce API later
 * without touching the components that consume them.
 */

export async function getProducts(format?: ProductFormat): Promise<Product[]> {
  if (!format) return PRODUCTS;
  return PRODUCTS.filter((product) => product.format === format);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((product) => product.slug === slug);
}

export async function getProductSlugs(): Promise<string[]> {
  return PRODUCTS.map((product) => product.slug);
}
