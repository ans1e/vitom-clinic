import type { ProductBadge } from "@/types";
import { cn } from "@/lib/utils";

const LABELS: Record<ProductBadge, string> = {
  new: "Новинка",
  sale: "Скидка",
  popular: "Хит",
};

const STYLES: Record<ProductBadge, string> = {
  new: "bg-sage text-ink",
  sale: "bg-pink text-ink",
  popular: "bg-ink text-white",
};

export function Badge({ badge, className }: { badge: ProductBadge; className?: string }): React.JSX.Element {
  return (
    <span
      className={cn(
        "eyebrow text-[9px] px-3 py-1 rounded-full",
        STYLES[badge],
        className,
      )}
    >
      {LABELS[badge]}
    </span>
  );
}
