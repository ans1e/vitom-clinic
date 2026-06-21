"use client";

import { useCallback } from "react";

/**
 * Returns a callback ref that adds the `in` class to a `.reveal` element once it
 * scrolls into view. A timeout fallback guarantees nothing stays hidden if the
 * observer misses it.
 */
export function useReveal(): (node: HTMLElement | null) => void {
  return useCallback((node: HTMLElement | null): void => {
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    window.setTimeout(() => node.classList.add("in"), 1600);
  }, []);
}
