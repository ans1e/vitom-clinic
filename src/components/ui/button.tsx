import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium uppercase tracking-[0.18em] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        dark: "btn-dark",
        outline: "btn-out",
      },
      size: {
        sm: "text-[11px] px-7 py-3",
        md: "text-[12px] px-9 py-4",
        lg: "text-[12px] px-10 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { Button };
