import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "metric" | "chart";
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", glow = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]",
        "transition-all duration-200",
        variant === "default" && "p-0",
        variant === "metric" && "p-4",
        variant === "chart" && "p-4 min-h-[300px]",
        glow && "shadow-lg shadow-[var(--color-doge-gold)]/10 border-[var(--color-doge-gold)]/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";
