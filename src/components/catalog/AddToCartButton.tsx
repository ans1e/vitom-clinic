"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }): React.JSX.Element {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (): void => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: `${product.name} — ${product.flavor}`,
      flavor: product.flavor,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Button type="button" variant="dark" size="lg" onClick={handleAdd} aria-live="polite">
      {added ? "Добавлено ✓" : "В корзину"}
    </Button>
  );
}
