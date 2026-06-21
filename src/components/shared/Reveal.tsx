"use client";

import type { ElementType, ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Client wrapper that fades/slides its children in on scroll. Lets parent
 * sections stay Server Components.
 */
export function Reveal({ children, className, as: Tag = "div" }: RevealProps): React.JSX.Element {
  const reveal = useReveal();
  return (
    <Tag ref={reveal} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
}
