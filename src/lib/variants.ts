import type { ProductFormat } from "@/types";

export interface ProductVariant {
  /** Display label including unit, e.g. "700 мл" or "650 г". */
  label: string;
  price: number;
}

const SHOT_VARIANTS: ProductVariant[] = [
  { label: "700 мл", price: 650000 },
  { label: "1400 мл", price: 1200000 },
  { label: "2100 мл", price: 1750000 },
];

const JELLY_VARIANTS: ProductVariant[] = [
  { label: "650 г", price: 500000 },
  { label: "1100 г", price: 800000 },
  { label: "1750 г", price: 1150000 },
];

/** Volume/weight options shown in the quick-view modal, by product format. */
export function getVariants(format: ProductFormat): ProductVariant[] {
  return format === "shots" ? SHOT_VARIANTS : JELLY_VARIANTS;
}
