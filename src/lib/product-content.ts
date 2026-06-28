import type { Product } from "@/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate, localizeFlavor } from "@/lib/i18n/helpers";

export interface ProductTab {
  id: string;
  label: string;
  items: string[];
}

/** One-to-two sentence intro shown under the title, in the active locale. */
export function getShortDescription(product: Product, t: Dictionary): string {
  const flavor = localizeFlavor(product.flavor, t).toLowerCase();
  const template = product.format === "shots" ? t.product.shortDesc.shots : t.product.shortDesc.jelly;
  return interpolate(template, { flavor });
}

/** Tabbed long-form content for the product page, by format and locale. */
export function getProductTabs(product: Product, t: Dictionary): ProductTab[] {
  const flavor = localizeFlavor(product.flavor, t).toLowerCase();
  const src = product.format === "shots" ? t.tabs.shots : t.tabs.jelly;
  const fill = (items: readonly string[]): string[] =>
    items.map((item) => interpolate(item, { flavor }));

  return [
    { id: "specs", label: t.tabs.specs, items: fill(src.specs) },
    { id: "usage", label: t.tabs.usage, items: fill(src.usage) },
    { id: "composition", label: t.tabs.composition, items: fill(src.composition) },
    { id: "ingredients", label: t.tabs.ingredients, items: fill(src.ingredients) },
  ];
}
