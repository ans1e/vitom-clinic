export type ProductFormat = "shots" | "jelly";
export type ProductGradient = "grad-blue" | "grad-green" | "grad-pink";
export type ProductBadge = "new" | "sale" | "popular";

export interface Product {
  id: string;
  slug: string;
  /** Product line, e.g. "VITOSHOTS" or "Коллаген желе". */
  name: string;
  format: ProductFormat;
  /** Display category label, e.g. "Шоты" / "Желе". */
  category: string;
  flavor: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  gradient: ProductGradient;
  /** Image width inside the card frame, e.g. "w-[78%]". */
  imageWidthClass: string;
  /** Larger jar shown for higher volume variants (jelly only). */
  bigImage?: string;
  bigImageWidth?: number;
  bigImageHeight?: number;
  /** Additional lifestyle photos shown in the product gallery. */
  gallery?: string[];
  badge?: ProductBadge;
}
