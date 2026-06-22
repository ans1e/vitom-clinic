"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface MenuHoverLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Nav link with a box-fill hover effect: a top/bottom border closes in while a
 * dark panel fills from the top and the label flips to white. Adapted to the
 * VITOM ink palette; animates only transform/opacity (no `transition-all`).
 */
export function MenuHoverLink({ href, children, className }: MenuHoverLinkProps): React.JSX.Element {
  return (
    <Link href={href} className={cn("relative inline-block group", className)}>
      <span className="relative z-10 block text-smoke transition-colors duration-300 group-hover:text-white px-3 py-1.5">
        {children}
      </span>
      {/* Top & bottom border animation */}
      <span
        aria-hidden="true"
        className="absolute inset-0 border-t-2 border-b-2 border-ink scale-y-[2] opacity-0 origin-center transition-[transform,opacity] duration-300 group-hover:scale-y-100 group-hover:opacity-100"
      />
      {/* Background fill animation */}
      <span
        aria-hidden="true"
        className="absolute top-[2px] left-0 w-full h-full bg-ink scale-0 opacity-0 origin-top transition-[transform,opacity] duration-300 group-hover:scale-100 group-hover:opacity-100"
      />
    </Link>
  );
}
