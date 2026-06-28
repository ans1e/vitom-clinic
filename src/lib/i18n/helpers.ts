import type { Product } from "@/types";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries";

/** Replaces {key} placeholders in a template. */
export function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}

/** Localized flavour name for a product (falls back to the source value). */
export function localizeFlavor(flavor: string, t: Dictionary): string {
  return t.products.flavors[flavor] ?? flavor;
}

/**
 * Returns the product with display fields (name, category, description, flavor)
 * swapped to the active locale. Non-display fields (id, slug, images, price…)
 * are untouched, so it can be used anywhere a Product is expected.
 */
export function localizeProduct(product: Product, t: Dictionary): Product {
  const isShots = product.format === "shots";
  return {
    ...product,
    name: isShots ? t.products.nameShots : t.products.nameJelly,
    category: isShots ? t.products.categoryShots : t.products.categoryJelly,
    description: isShots ? t.products.descShots : t.products.descJelly,
    flavor: localizeFlavor(product.flavor, t),
  };
}

/** Displays a volume label in the active locale ("700 мл" → "700 ml" in UZ). */
export function localizeVolume(label: string, locale: Locale): string {
  if (locale === "ru") return label;
  return label.replace("мл", "ml").replace("г", "g");
}
