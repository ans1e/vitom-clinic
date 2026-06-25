"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ProductTab } from "@/lib/product-content";

export function ProductTabs({ tabs }: { tabs: ProductTab[] }): React.JSX.Element {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      {/* Tab bar — scrolls horizontally on small screens. */}
      <div className="flex gap-7 sm:gap-10 overflow-x-auto scrollbar-hide border-b border-line" role="tablist">
        {tabs.map((tab) => {
          const selected = tab.id === current.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative whitespace-nowrap pb-4 text-[15px] sm:text-[17px] font-medium transition-colors",
                selected ? "text-ink" : "text-smoke hover:text-ink",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "absolute left-0 -bottom-px h-0.5 bg-ink transition-[width] duration-300 ease-out",
                  selected ? "w-full" : "w-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <ul id={`tab-${current.id}`} role="tabpanel" className="mt-8 space-y-3.5 max-w-[680px]">
        {current.items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.6] text-smoke">
            <span aria-hidden="true" className="mt-[0.6em] h-[5px] w-[5px] shrink-0 rounded-full bg-ink/50" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
