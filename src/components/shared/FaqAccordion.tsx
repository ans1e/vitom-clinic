"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: readonly FaqItem[] }): React.JSX.Element {
  // Single-open accordion; the first item starts open as an affordance.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const open = i === openIndex;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[18px] sm:text-[21px] text-ink leading-snug">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-line text-ink",
                    "transition-[rotate,background-color,color] duration-300 group-hover:border-ink",
                    open && "rotate-45 bg-ink text-white border-ink",
                  )}
                >
                  <Plus className="w-5 h-5" strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-[15px] sm:text-[16px] leading-[1.8] text-smoke max-w-[640px] pb-7">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
