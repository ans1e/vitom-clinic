"use client";

import type { ProductBadge } from "@/types";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const STYLES: Record<ProductBadge, string> = {
  new: "bg-sage text-ink",
  sale: "bg-pink text-ink",
  popular: "bg-ink text-white",
};

export function Badge({ badge, className }: { badge: ProductBadge; className?: string }): React.JSX.Element {
  const { t } = useLocale();
  return (
    <span
      className={cn(
        "eyebrow text-[9px] px-3 py-1 rounded-full",
        STYLES[badge],
        className,
      )}
    >
      {t.badge[badge]}
    </span>
  );
}
