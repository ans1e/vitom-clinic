"use client";

import { useEffect, useRef } from "react";

/**
 * Locks background scrolling while `active` (iOS-safe position:fixed technique)
 * and restores the exact scroll position on release — without any smooth-scroll
 * animation, so closing an overlay never visibly moves the page.
 */
export function useScrollLock(active: boolean): void {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const body = document.body;
    const html = document.documentElement;
    scrollYRef.current = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollYRef.current);
      html.style.scrollBehavior = prevBehavior;
    };
  }, [active]);
}
