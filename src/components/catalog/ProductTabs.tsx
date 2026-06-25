"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { ProductTab } from "@/lib/product-content";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

export function ProductTabs({ tabs }: { tabs: ProductTab[] }): React.JSX.Element {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      {/* Tab bar — spreads across the full width on desktop (bonya-style),
          scrolls horizontally on small screens. */}
      <div
        className="flex gap-7 sm:gap-4 sm:justify-between overflow-x-auto scrollbar-hide border-b border-line"
        role="tablist"
      >
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
              {selected && (
                <motion.span
                  layoutId="product-tab-underline"
                  className="absolute left-0 -bottom-px h-0.5 w-full bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={current.id}
          id={`tab-${current.id}`}
          role="tabpanel"
          variants={listVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
          className="mt-8 space-y-3.5 max-w-[680px]"
        >
          {current.items.map((item) => (
            <motion.li
              key={item}
              variants={itemVariants}
              className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.6] text-smoke"
            >
              <span aria-hidden="true" className="mt-[0.6em] h-[5px] w-[5px] shrink-0 rounded-full bg-ink/50" />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
